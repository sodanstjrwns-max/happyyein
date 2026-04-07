// R2 이미지 업로드 API
import { Hono } from 'hono'

type Bindings = {
  R2: R2Bucket;
}

const upload = new Hono<{ Bindings: Bindings }>()

// POST /api/upload - 이미지 업로드 (multipart/form-data)
upload.post('/', async (c) => {
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

    // R2 public URL 반환 (로컬 개발시에는 /api/images/... 경로로)
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

// GET /api/images/:key+ - R2에서 이미지 서빙
upload.get('/images/*', async (c) => {
  const key = c.req.path.replace('/api/images/', '')
  
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

export default upload
