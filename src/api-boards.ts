// 게시판 CRUD API (비포애프터, 블로그, 공지사항)
import { Hono } from 'hono'
import { requireAdmin } from './api-auth'

type Bindings = {
  DB: D1Database;
  R2: R2Bucket;
}

const boards = new Hono<{ Bindings: Bindings }>()

// ============================================================
// GET /api/boards/stats/overview - 관리자 대시보드 통계
// ============================================================
boards.get('/stats/overview', async (c) => {
  try {
    // 게시판별 통계
    const boardStats = await c.env.DB.prepare(`
      SELECT board,
             COUNT(*) as total,
             SUM(view_count) as total_views,
             MAX(created_at) as last_post
      FROM posts WHERE is_published = 1
      GROUP BY board
    `).all()

    // 전체 이미지 수
    const imgCount = await c.env.DB.prepare(
      'SELECT COUNT(*) as total FROM post_images'
    ).first<{ total: number }>()

    // 최근 7일 게시글 수
    const recentCount = await c.env.DB.prepare(
      `SELECT COUNT(*) as total FROM posts WHERE is_published = 1 AND created_at >= datetime('now', '-7 days')`
    ).first<{ total: number }>()

    // 가장 많이 본 글 Top5
    const { results: topPosts } = await c.env.DB.prepare(
      `SELECT id, board, title, view_count, created_at FROM posts
       WHERE is_published = 1 ORDER BY view_count DESC LIMIT 5`
    ).all()

    // 최근 10개 게시글 (전체 게시판 통합)
    const { results: recentPosts } = await c.env.DB.prepare(
      `SELECT p.id, p.board, p.title, p.thumbnail_url, p.view_count, p.created_at,
              (SELECT COUNT(*) FROM post_images WHERE post_id = p.id) as image_count
       FROM posts p WHERE p.is_published = 1
       ORDER BY p.created_at DESC LIMIT 10`
    ).all()

    // 게시판별 숫자
    const stats: Record<string, { total: number; views: number; lastPost: string | null }> = {
      'before-after': { total: 0, views: 0, lastPost: null },
      'blog': { total: 0, views: 0, lastPost: null },
      'notice': { total: 0, views: 0, lastPost: null },
    }
    let totalPosts = 0
    let totalViews = 0

    for (const row of (boardStats.results || [])) {
      const b = row.board as string
      if (stats[b]) {
        stats[b].total = row.total as number
        stats[b].views = row.total_views as number || 0
        stats[b].lastPost = row.last_post as string || null
        totalPosts += stats[b].total
        totalViews += stats[b].views
      }
    }

    return c.json({
      success: true,
      totalPosts,
      totalViews,
      totalImages: imgCount?.total || 0,
      recentWeekPosts: recentCount?.total || 0,
      boards: stats,
      topPosts: topPosts || [],
      recentPosts: recentPosts || []
    })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================
// GET /api/boards/:board - 게시글 리스트
// ============================================================
boards.get('/:board', async (c) => {
  const board = c.req.param('board')
  if (!['before-after', 'blog', 'notice'].includes(board)) {
    return c.json({ error: '잘못된 게시판입니다.' }, 400)
  }

  const page = Math.max(1, parseInt(c.req.query('page') || '1') || 1)
  const limit = Math.min(50, Math.max(1, parseInt(c.req.query('limit') || '12') || 12))
  const offset = (page - 1) * limit

  try {
    // 총 게시글 수
    const countResult = await c.env.DB.prepare(
      'SELECT COUNT(*) as total FROM posts WHERE board = ? AND is_published = 1'
    ).bind(board).first<{ total: number }>()

    const total = countResult?.total || 0

    // 게시글 리스트 (비포애프터는 이미지 URL도 함께 가져옴)
    const { results: posts } = await c.env.DB.prepare(
      `SELECT p.id, p.board, p.title, p.thumbnail_url, p.view_count, p.created_at, p.updated_at,
              (SELECT COUNT(*) FROM post_images pi WHERE pi.post_id = p.id) as image_count
       FROM posts p
       WHERE p.board = ? AND p.is_published = 1
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`
    ).bind(board, limit, offset).all()

    // 비포애프터인 경우 각 게시글의 이미지도 가져옴 (리스트 카드에 Before/After 표시)
    if (board === 'before-after' && posts.length > 0) {
      const postIds = posts.map(p => p.id)
      for (const post of posts) {
        const { results: imgs } = await c.env.DB.prepare(
          'SELECT image_url, image_type FROM post_images WHERE post_id = ? ORDER BY sort_order ASC'
        ).bind(post.id).all()
        ;(post as any).images = imgs || []
      }
    }

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
// POST /api/boards/:board - 게시글 작성 (관리자 인증 필요)
// ============================================================
boards.post('/:board', requireAdmin, async (c) => {
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

    // 이미지 저장 (url/type 또는 image_url/image_type 양쪽 지원)
    if (images && Array.isArray(images) && images.length > 0) {
      const stmts = images
        .filter((img: any) => (img.url || img.image_url))  // URL 없는 항목 제외
        .map((img: any, i: number) =>
          c.env.DB.prepare(
            `INSERT INTO post_images (post_id, image_url, image_type, sort_order) VALUES (?, ?, ?, ?)`
          ).bind(
            postId,
            img.url || img.image_url,
            img.type || img.image_type || 'content',
            img.sort_order ?? i
          )
        )
      if (stmts.length > 0) await c.env.DB.batch(stmts)
    }

    return c.json({ success: true, id: postId })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================
// PUT /api/boards/:board/:id - 게시글 수정 (관리자 인증 필요)
// ============================================================
boards.put('/:board/:id', requireAdmin, async (c) => {
  const board = c.req.param('board')
  const id = parseInt(c.req.param('id'))

  try {
    const body = await c.req.json()
    const { title, content, thumbnail_url, images } = body

    // 게시글 존재 여부 확인
    const existing = await c.env.DB.prepare(
      'SELECT id FROM posts WHERE id = ? AND board = ?'
    ).bind(id, board).first()

    if (!existing) {
      return c.json({ error: '게시글을 찾을 수 없습니다.' }, 404)
    }

    // 게시글 수정
    await c.env.DB.prepare(
      `UPDATE posts SET title = ?, content = ?, thumbnail_url = ?, updated_at = datetime('now')
       WHERE id = ? AND board = ?`
    ).bind(title, content || '', thumbnail_url || null, id, board).run()

    // 기존 이미지 삭제 후 새로 저장
    if (images && Array.isArray(images)) {
      await c.env.DB.prepare('DELETE FROM post_images WHERE post_id = ?').bind(id).run()
      
      if (images.length > 0) {
        const stmts = images
          .filter((img: any) => (img.url || img.image_url))
          .map((img: any, i: number) =>
            c.env.DB.prepare(
              `INSERT INTO post_images (post_id, image_url, image_type, sort_order) VALUES (?, ?, ?, ?)`
            ).bind(
              id,
              img.url || img.image_url,
              img.type || img.image_type || 'content',
              img.sort_order ?? i
            )
          )
        if (stmts.length > 0) await c.env.DB.batch(stmts)
      }
    }

    return c.json({ success: true })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================
// DELETE /api/boards/:board/:id - 게시글 삭제 (관리자 인증 필요)
// ============================================================
boards.delete('/:board/:id', requireAdmin, async (c) => {
  const board = c.req.param('board')
  const id = parseInt(c.req.param('id'))

  try {
    // 게시글 존재 여부 확인
    const existing = await c.env.DB.prepare(
      'SELECT id FROM posts WHERE id = ? AND board = ?'
    ).bind(id, board).first()

    if (!existing) {
      return c.json({ error: '게시글을 찾을 수 없습니다.' }, 404)
    }

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
