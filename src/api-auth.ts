// 관리자 인증 API — JWT 기반 비밀번호 인증
import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const authApi = new Hono<{ Bindings: Bindings }>()

// ===== 설정 =====
// 프로덕션에서는 환경변수로 관리하세요 (wrangler secret put ADMIN_PASSWORD)
const ADMIN_PASSWORD = 'yein2828!admin'
const JWT_SECRET = 'yein-dental-admin-secret-2026'
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000  // 24시간

// ===== JWT 유틸리티 (Web Crypto API 사용 — Cloudflare Workers 호환) =====
async function createJWT(payload: Record<string, any>): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const fullPayload = { ...payload, iat: now, exp: now + (TOKEN_EXPIRY / 1000) }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload))
  const data = `${encodedHeader}.${encodedPayload}`

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  const encodedSignature = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)))

  return `${data}.${encodedSignature}`
}

async function verifyJWT(token: string): Promise<Record<string, any> | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [encodedHeader, encodedPayload, encodedSignature] = parts
    const data = `${encodedHeader}.${encodedPayload}`

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const signatureBytes = Uint8Array.from(base64UrlDecode(encodedSignature), c => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, signatureBytes, new TextEncoder().encode(data))

    if (!valid) return null

    const payload = JSON.parse(base64UrlDecode(encodedPayload))
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) return null

    return payload
  } catch {
    return null
  }
}

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  return atob(str)
}

// ============================================================
// POST /api/auth/login — 관리자 로그인
// ============================================================
authApi.post('/login', async (c) => {
  try {
    const { password } = await c.req.json<{ password: string }>()

    if (!password) {
      return c.json({ error: '비밀번호를 입력하세요.' }, 400)
    }

    if (password !== ADMIN_PASSWORD) {
      return c.json({ error: '비밀번호가 일치하지 않습니다.' }, 401)
    }

    const token = await createJWT({ role: 'admin', clinic: 'yein-dental' })

    return c.json({
      success: true,
      token,
      message: '로그인 성공'
    })
  } catch (err: any) {
    return c.json({ error: '로그인 처리 중 오류가 발생했습니다.' }, 500)
  }
})

// ============================================================
// POST /api/auth/verify — 토큰 유효성 확인
// ============================================================
authApi.post('/verify', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ valid: false, error: '토큰이 없습니다.' }, 401)
    }

    const token = authHeader.substring(7)
    const payload = await verifyJWT(token)

    if (!payload) {
      return c.json({ valid: false, error: '토큰이 만료되었거나 유효하지 않습니다.' }, 401)
    }

    return c.json({ valid: true, role: payload.role })
  } catch {
    return c.json({ valid: false, error: '검증 실패' }, 500)
  }
})

// ============================================================
// POST /api/auth/logout — 로그아웃 (클라이언트에서 토큰 삭제)
// ============================================================
authApi.post('/logout', (c) => {
  return c.json({ success: true, message: '로그아웃 완료' })
})

// ===== 인증 미들웨어 (다른 라우터에서 사용) =====
export async function requireAdmin(c: any, next: () => Promise<void>) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: '로그인이 필요합니다.' }, 401)
  }

  const token = authHeader.substring(7)
  const payload = await verifyJWT(token)

  if (!payload || payload.role !== 'admin') {
    return c.json({ error: '인증이 만료되었습니다. 다시 로그인하세요.' }, 401)
  }

  await next()
}

export { verifyJWT }
export default authApi
