-- =============================================
-- 비급여 진료비(수가) 테이블 — 원장 직접 편집 + 항목별 공개/비공개
-- =============================================

CREATE TABLE IF NOT EXISTS fee_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,               -- 진료 항목 그룹
  name TEXT NOT NULL,                   -- 항목명
  price TEXT,                           -- 금액 (범위·상담 등 텍스트 허용)
  note TEXT,                            -- 비고
  is_published INTEGER DEFAULT 1,       -- 1=공개, 0=비공개
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_fee_items_published ON fee_items(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_fee_items_category ON fee_items(category, sort_order);
