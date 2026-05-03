-- =============================================
-- 자동 블로그 SEO 시스템 — posts 테이블 확장
-- =============================================

-- SEO 키워드 (자동 생성 시 사용된 메인 키워드)
ALTER TABLE posts ADD COLUMN seo_keyword TEXT;

-- SEO 메타 디스크립션
ALTER TABLE posts ADD COLUMN seo_description TEXT;

-- SEO 태그 (JSON 배열 문자열)
ALTER TABLE posts ADD COLUMN seo_tags TEXT;

-- 자동 생성 여부 (1=AI 자동생성, 0=수동 작성)
ALTER TABLE posts ADD COLUMN auto_generated INTEGER DEFAULT 0;

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_seo_keyword ON posts(seo_keyword);
CREATE INDEX IF NOT EXISTS idx_posts_auto_generated ON posts(board, auto_generated);
