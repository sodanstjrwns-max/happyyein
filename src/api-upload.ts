// R2 이미지 업로드 & 서빙 API
import { Hono } from 'hono'

type Bindings = {
  R2: R2Bucket;
}

// ===== 업로드 API =====
// index.tsx에서 app.route('/api/upload', uploadApi)로 마운트
export const uploadApi = new Hono<{ Bindings: Bindings }>()

// POST /api/upload → POST /
uploadApi.post('/', async (c) => {
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return c.json({ error: '파일이 없습니다.' }, 400)
    }

    // 이미지 타입 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: '허용되지 않는 파일 형식입니다. (jpg, png, webp, gif만 가능)' }, 400)
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ error: '파일 크기는 10MB 이하만 가능합니다.' }, 400)
    }

    // 고유 파일명 생성
    const ext = file.name.split('.').pop() || 'jpg'
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    const key = `uploads/${timestamp}-${random}.${ext}`

    // R2에 업로드
    await c.env.R2.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type,
      },
    })

    // URL은 /api/images/uploads/... 형태
    const url = `/api/images/${key}`

    return c.json({ 
      success: true, 
      url,
      key,
      size: file.size,
      type: file.type
    })
  } catch (err: any) {
    return c.json({ error: '업로드 실패: ' + (err.message || '알 수 없는 오류') }, 500)
  }
})


// ===== 이미지 서빙 API =====
// index.tsx에서 app.route('/api/images', imagesApi)로 마운트
export const imagesApi = new Hono<{ Bindings: Bindings }>()

// GET /api/images/uploads/xxx → R2 key: uploads/xxx
imagesApi.get('/*', async (c) => {
  // c.req.path는 원본 전체 경로 (예: /api/images/uploads/xxx)
  // route prefix를 제거하여 R2 key 추출
  const key = c.req.path.replace(/^\/api\/images\//, '')
  
  if (!key) {
    return c.notFound()
  }

  try {
    const object = await c.env.R2.get(key)
    if (!object) {
      return c.notFound()
    }

    const headers = new Headers()
    headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg')
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    
    return new Response(object.body, { headers })
  } catch {
    return c.notFound()
  }
})
