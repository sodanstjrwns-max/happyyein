-- =============================================
-- 회원 테이블 + 동의 기록
-- =============================================

-- 회원 테이블
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,           -- bcrypt/scrypt 해시
  name TEXT NOT NULL,                    -- 이름
  phone TEXT,                            -- 전화번호 (선택)
  birth_date TEXT,                       -- 생년월일 (선택, YYYY-MM-DD)
  gender TEXT CHECK(gender IN ('M','F',NULL)),  -- 성별 (선택)
  role TEXT DEFAULT 'user' CHECK(role IN ('user','admin')),
  is_active INTEGER DEFAULT 1,           -- 1=활성, 0=탈퇴
  last_login_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 동의 기록 테이블 (법적 증빙용)
CREATE TABLE IF NOT EXISTS user_consents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  consent_type TEXT NOT NULL CHECK(consent_type IN (
    'privacy_collection',     -- 개인정보 수집·이용 동의 (필수)
    'privacy_provision',      -- 개인정보 제3자 제공 동의 (필수)
    'marketing_sms',          -- 마케팅 SMS 수신 동의 (선택)
    'marketing_email',        -- 마케팅 이메일 수신 동의 (선택)
    'marketing_push'          -- 마케팅 푸시알림 수신 동의 (선택)
  )),
  is_agreed INTEGER NOT NULL DEFAULT 0,  -- 1=동의, 0=미동의
  agreed_at TEXT,                         -- 동의 일시
  revoked_at TEXT,                        -- 철회 일시
  ip_address TEXT,                        -- 동의 시 IP (법적 증빙)
  user_agent TEXT,                        -- 동의 시 브라우저 (법적 증빙)
  consent_version TEXT DEFAULT '1.0',     -- 약관 버전
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_user_consents_user_id ON user_consents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_consents_type ON user_consents(consent_type);
