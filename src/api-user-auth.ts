// 회원 인증 API — 회원가입, 로그인, 프로필
import { Hono } from 'hono'

type Bindings = { DB: D1Database }
const userAuthApi = new Hono<{ Bindings: Bindings }>()

// ===== 설정 =====
const JWT_SECRET = 'yein-dental-user-secret-2026'
const TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000  // 7일

// ===== JWT 유틸리티 (Web Crypto API) =====
async function createJWT(payload: Record<string, any>): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const fullPayload = { ...payload, iat: now, exp: now + (TOKEN_EXPIRY / 1000) }
  const encodedHeader = b64url(JSON.stringify(header))
  const encodedPayload = b64url(JSON.stringify(fullPayload))
  const data = `${encodedHeader}.${encodedPayload}`
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(JWT_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return `${data}.${b64urlFromBytes(signature)}`
}

async function verifyUserJWT(token: string): Promise<Record<string, any> | null> {
  try {
    const [eh, ep, es] = token.split('.')
    if (!eh || !ep || !es) return null
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(JWT_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
    // Decode base64url signature to bytes
    let sigB64 = es.replace(/-/g, '+').replace(/_/g, '/')
    while (sigB64.length % 4) sigB64 += '='
    const sigBinary = atob(sigB64)
    const sigBytes = new Uint8Array(sigBinary.length)
    for (let i = 0; i < sigBinary.length; i++) sigBytes[i] = sigBinary.charCodeAt(i)
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(`${eh}.${ep}`))
    if (!valid) return null
    const payload = JSON.parse(b64dec(ep))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch { return null }
}

function b64url(str: string): string {
  // UTF-8 safe base64url encoding
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function b64urlFromBytes(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function b64dec(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  const binary = atob(str)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

// ===== 비밀번호 해싱 (Web Crypto — SHA-256 + salt) =====
async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  const data = new TextEncoder().encode(saltHex + password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
  return `${saltHex}:${hashHex}`
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, storedHash] = stored.split(':')
  if (!saltHex || !storedHash) return false
  const data = new TextEncoder().encode(saltHex + password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex === storedHash
}

// ============================================================
// POST /api/user/register — 회원가입
// ============================================================
userAuthApi.post('/register', async (c) => {
  try {
    const body = await c.req.json<{
      email: string
      password: string
      name: string
      phone?: string
      birth_date?: string
      gender?: string
      consents: {
        privacy_collection: boolean  // 필수
        privacy_provision: boolean   // 필수
        marketing_sms?: boolean
        marketing_email?: boolean
        marketing_push?: boolean
      }
    }>()

    // 유효성 검사
    if (!body.email || !body.password || !body.name) {
      return c.json({ error: '이메일, 비밀번호, 이름은 필수입니다.' }, 400)
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return c.json({ error: '올바른 이메일 형식이 아닙니다.' }, 400)
    }
    if (body.password.length < 8) {
      return c.json({ error: '비밀번호는 8자 이상이어야 합니다.' }, 400)
    }
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(body.password)) {
      return c.json({ error: '비밀번호는 영문과 숫자를 포함해야 합니다.' }, 400)
    }
    if (!body.consents?.privacy_collection || !body.consents?.privacy_provision) {
      return c.json({ error: '개인정보 수집·이용 동의와 제3자 제공 동의는 필수입니다.' }, 400)
    }
    if (body.phone && !/^01[0-9]-?\d{3,4}-?\d{4}$/.test(body.phone.replace(/-/g, '').replace(/^01/, '01'))) {
      // 간단한 검증 — 너무 엄격하지 않게
    }

    const db = c.env.DB

    // 이메일 중복 확인
    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(body.email).first()
    if (existing) {
      return c.json({ error: '이미 가입된 이메일입니다.' }, 409)
    }

    // 비밀번호 해시
    const passwordHash = await hashPassword(body.password)

    // 유저 생성
    const result = await db.prepare(
      `INSERT INTO users (email, password_hash, name, phone, birth_date, gender)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      body.email.trim().toLowerCase(),
      passwordHash,
      body.name.trim(),
      body.phone?.trim() || null,
      body.birth_date || null,
      body.gender || null
    ).run()

    const userId = result.meta.last_row_id

    // 동의 기록 저장
    const ip = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || 'unknown'
    const ua = c.req.header('User-Agent') || 'unknown'
    const now = new Date().toISOString()

    const consentTypes = [
      { type: 'privacy_collection', agreed: body.consents.privacy_collection },
      { type: 'privacy_provision', agreed: body.consents.privacy_provision },
      { type: 'marketing_sms', agreed: body.consents.marketing_sms || false },
      { type: 'marketing_email', agreed: body.consents.marketing_email || false },
      { type: 'marketing_push', agreed: body.consents.marketing_push || false },
    ]

    // batch로 한 번에 INSERT (성능 최적화)
    const consentStmts = consentTypes.map(consent =>
      db.prepare(
        `INSERT INTO user_consents (user_id, consent_type, is_agreed, agreed_at, ip_address, user_agent, consent_version)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        userId,
        consent.type,
        consent.agreed ? 1 : 0,
        consent.agreed ? now : null,
        ip, ua, '1.0'
      )
    )
    await db.batch(consentStmts)

    // JWT 토큰 발급
    const token = await createJWT({ id: userId, email: body.email, name: body.name, role: 'user' })

    return c.json({
      success: true,
      token,
      user: { id: userId, email: body.email, name: body.name },
      message: '회원가입이 완료되었습니다.'
    })
  } catch (err: any) {
    console.error('Register error:', err)
    return c.json({ error: '회원가입 중 오류가 발생했습니다.' }, 500)
  }
})

// ============================================================
// POST /api/user/login — 로그인
// ============================================================
userAuthApi.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json<{ email: string; password: string }>()

    if (!email || !password) {
      return c.json({ error: '이메일과 비밀번호를 입력하세요.' }, 400)
    }

    const db = c.env.DB
    const user = await db.prepare(
      'SELECT id, email, password_hash, name, role, is_active FROM users WHERE email = ?'
    ).bind(email.trim().toLowerCase()).first<{
      id: number; email: string; password_hash: string; name: string; role: string; is_active: number
    }>()

    if (!user) {
      return c.json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' }, 401)
    }
    if (!user.is_active) {
      return c.json({ error: '탈퇴한 계정입니다.' }, 403)
    }

    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return c.json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' }, 401)
    }

    // last_login 갱신
    await db.prepare('UPDATE users SET last_login_at = datetime("now") WHERE id = ?').bind(user.id).run()

    const token = await createJWT({ id: user.id, email: user.email, name: user.name, role: user.role })

    return c.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      message: '로그인 성공'
    })
  } catch (err: any) {
    return c.json({ error: '로그인 중 오류가 발생했습니다.' }, 500)
  }
})

// ============================================================
// POST /api/user/verify — 토큰 검증
// ============================================================
userAuthApi.post('/verify', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ valid: false }, 401)
  }
  const payload = await verifyUserJWT(authHeader.substring(7))
  if (!payload) return c.json({ valid: false }, 401)
  return c.json({ valid: true, user: { id: payload.id, email: payload.email, name: payload.name, role: payload.role } })
})

// ============================================================
// GET /api/user/profile — 내 프로필
// ============================================================
userAuthApi.get('/profile', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: '로그인이 필요합니다.' }, 401)
  }
  const payload = await verifyUserJWT(authHeader.substring(7))
  if (!payload) return c.json({ error: '인증이 만료되었습니다.' }, 401)

  const db = c.env.DB
  const user = await db.prepare(
    'SELECT id, email, name, phone, birth_date, gender, created_at FROM users WHERE id = ?'
  ).bind(payload.id).first()
  if (!user) return c.json({ error: '사용자를 찾을 수 없습니다.' }, 404)

  // 동의 정보
  const consents = await db.prepare(
    'SELECT consent_type, is_agreed, agreed_at, revoked_at FROM user_consents WHERE user_id = ? ORDER BY id'
  ).bind(payload.id).all()

  return c.json({ user, consents: consents.results })
})

// ============================================================
// POST /api/user/check-email — 이메일 중복 확인
// ============================================================
userAuthApi.post('/check-email', async (c) => {
  const { email } = await c.req.json<{ email: string }>()
  if (!email) return c.json({ error: '이메일을 입력하세요.' }, 400)
  const db = c.env.DB
  const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email.trim().toLowerCase()).first()
  return c.json({ available: !existing })
})

export { verifyUserJWT }
export default userAuthApi
