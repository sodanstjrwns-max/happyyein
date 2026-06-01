-- =============================================
-- 색인 모니터링 시스템 — indexing_checks, indexing_snapshots
-- =============================================

-- 개별 URL 색인 체크 기록
CREATE TABLE IF NOT EXISTS indexing_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  url_group TEXT NOT NULL DEFAULT 'other',
  engine TEXT NOT NULL DEFAULT 'google',
  indexed INTEGER NOT NULL DEFAULT 0,
  checked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 전체 스냅샷 (한 번의 체크 실행 결과 요약)
CREATE TABLE IF NOT EXISTS indexing_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  engine TEXT NOT NULL,
  total_urls INTEGER NOT NULL DEFAULT 0,
  indexed_count INTEGER NOT NULL DEFAULT 0,
  index_rate REAL NOT NULL DEFAULT 0,
  checked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_ic_url ON indexing_checks(url);
CREATE INDEX IF NOT EXISTS idx_ic_engine ON indexing_checks(engine);
CREATE INDEX IF NOT EXISTS idx_ic_checked ON indexing_checks(checked_at);
CREATE INDEX IF NOT EXISTS idx_ic_group ON indexing_checks(url_group);
CREATE INDEX IF NOT EXISTS idx_is_engine ON indexing_snapshots(engine);
CREATE INDEX IF NOT EXISTS idx_is_checked ON indexing_snapshots(checked_at);
