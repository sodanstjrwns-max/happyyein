-- =============================================
-- 게시판 테이블: 비포애프터, 블로그, 공지사항
-- =============================================

-- 게시글 테이블 (3개 게시판 통합)
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  board TEXT NOT NULL CHECK(board IN ('before-after', 'blog', 'notice')),
  title TEXT NOT NULL,
  content TEXT,                        -- 블로그/공지사항 본문 (HTML 허용)
  thumbnail_url TEXT,                  -- 리스트 대표 이미지 URL (R2)
  is_published INTEGER DEFAULT 1,      -- 1=공개, 0=비공개
  view_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 게시글 이미지 테이블
CREATE TABLE IF NOT EXISTS post_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,              -- R2 URL
  image_type TEXT DEFAULT 'content',    -- 'content' | 'before_intra' | 'after_intra' | 'before_pano' | 'after_pano'
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_board ON posts(board);
CREATE INDEX IF NOT EXISTS idx_posts_board_published ON posts(board, is_published);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_images_post_id ON post_images(post_id);
