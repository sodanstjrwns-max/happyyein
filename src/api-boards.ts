// 게시판 CRUD API (비포애프터, 블로그, 공지사항)
import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
  R2: R2Bucket;
}

const boards = new Hono<{ Bindings: Bindings }>()

// ============================================================
// GET /api/boards/:board - 게시글 리스트
// ============================================================
boards.get('/:board', async (c) => {
  const board = c.req.param('board')
  if (!['before-after', 'blog', 'notice'].includes(board)) {
    return c.json({ error: '잘못된 게시판입니다.' }, 400)
  }

  const page = parseInt(c.req.query('page') || '1')
  const limit = parseInt(c.req.query('limit') || '12')
  const offset = (page - 1) * limit

  try {
    // 총 게시글 수
    const countResult = await c.env.DB.prepare(
      'SELECT COUNT(*) as total FROM posts WHERE board = ? AND is_published = 1'
    ).bind(board).first<{ total: number }>()

    const total = countResult?.total || 0

    // 게시글 리스트
    const { results: posts } = await c.env.DB.prepare(
      `SELECT p.id, p.board, p.title, p.thumbnail_url, p.view_count, p.created_at, p.updated_at,
              (SELECT COUNT(*) FROM post_images WHERE post_id = p.id) as image_count
       FROM posts p
       WHERE p.board = ? AND p.is_published = 1
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`
    ).bind(board, limit, offset).all()

    return c.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================
// GET /api/boards/:board/:id - 게시글 상세
// ============================================================
boards.get('/:board/:id', async (c) => {
  const board = c.req.param('board')
  const id = parseInt(c.req.param('id'))

  try {
    // 조회수 증가
    await c.env.DB.prepare(
      'UPDATE posts SET view_count = view_count + 1 WHERE id = ? AND board = ?'
    ).bind(id, board).run()

    // 게시글
    const post = await c.env.DB.prepare(
      'SELECT * FROM posts WHERE id = ? AND board = ?'
    ).bind(id, board).first()

    if (!post) {
      return c.json({ error: '게시글을 찾을 수 없습니다.' }, 404)
    }

    // 이미지
    const { results: images } = await c.env.DB.prepare(
      'SELECT * FROM post_images WHERE post_id = ? ORDER BY sort_order ASC'
    ).bind(id).all()

    return c.json({ post, images })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================
// POST /api/boards/:board - 게시글 작성
// ============================================================
boards.post('/:board', async (c) => {
  const board = c.req.param('board')
  if (!['before-after', 'blog', 'notice'].includes(board)) {
    return c.json({ error: '잘못된 게시판입니다.' }, 400)
  }

  try {
    const body = await c.req.json()
    const { title, content, thumbnail_url, images } = body

    if (!title) {
      return c.json({ error: '제목은 필수입니다.' }, 400)
    }

    // 게시글 저장
    const result = await c.env.DB.prepare(
      `INSERT INTO posts (board, title, content, thumbnail_url, is_published, created_at, updated_at)
       VALUES (?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
    ).bind(board, title, content || '', thumbnail_url || null).run()

    const postId = result.meta.last_row_id

    // 이미지 저장
    if (images && Array.isArray(images) && images.length > 0) {
      const stmts = images.map((img: { url: string; type: string; sort_order: number }) =>
        c.env.DB.prepare(
          `INSERT INTO post_images (post_id, image_url, image_type, sort_order) VALUES (?, ?, ?, ?)`
        ).bind(postId, img.url, img.type || 'content', img.sort_order || 0)
      )
      await c.env.DB.batch(stmts)
    }

    return c.json({ success: true, id: postId })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================
// PUT /api/boards/:board/:id - 게시글 수정
// ============================================================
boards.put('/:board/:id', async (c) => {
  const board = c.req.param('board')
  const id = parseInt(c.req.param('id'))

  try {
    const body = await c.req.json()
    const { title, content, thumbnail_url, images } = body

    // 게시글 수정
    await c.env.DB.prepare(
      `UPDATE posts SET title = ?, content = ?, thumbnail_url = ?, updated_at = datetime('now')
       WHERE id = ? AND board = ?`
    ).bind(title, content || '', thumbnail_url || null, id, board).run()

    // 기존 이미지 삭제 후 새로 저장
    if (images && Array.isArray(images)) {
      await c.env.DB.prepare('DELETE FROM post_images WHERE post_id = ?').bind(id).run()
      
      if (images.length > 0) {
        const stmts = images.map((img: { url: string; type: string; sort_order: number }) =>
          c.env.DB.prepare(
            `INSERT INTO post_images (post_id, image_url, image_type, sort_order) VALUES (?, ?, ?, ?)`
          ).bind(id, img.url, img.type || 'content', img.sort_order || 0)
        )
        await c.env.DB.batch(stmts)
      }
    }

    return c.json({ success: true })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================
// DELETE /api/boards/:board/:id - 게시글 삭제
// ============================================================
boards.delete('/:board/:id', async (c) => {
  const board = c.req.param('board')
  const id = parseInt(c.req.param('id'))

  try {
    // R2에서 이미지도 삭제
    const { results: images } = await c.env.DB.prepare(
      'SELECT image_url FROM post_images WHERE post_id = ?'
    ).bind(id).all()

    for (const img of images) {
      const key = (img.image_url as string).replace('/api/images/', '')
      await c.env.R2.delete(key).catch(() => {})
    }

    // DB에서 삭제 (CASCADE로 이미지도 삭제)
    await c.env.DB.prepare('DELETE FROM posts WHERE id = ? AND board = ?').bind(id, board).run()

    return c.json({ success: true })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

export default boards
