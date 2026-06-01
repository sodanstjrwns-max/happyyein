// =============================================
// 색인 모니터링 시스템
// Google / Naver / Bing 색인 상태 추적
// =============================================
import { Hono } from 'hono'

const SITE_DOMAIN = 'https://happyyein.kr'

// ===== URL 그룹 정의 (샘플링 대상) =====
export const URL_GROUPS: { group: string; label: string; urls: string[] }[] = [
  {
    group: 'core', label: '🏠 핵심 페이지',
    urls: ['/', '/philosophy', '/doctors', '/experience', '/location']
  },
  {
    group: 'treatment', label: '🦷 치료 페이지',
    urls: ['/treatments/implant', '/treatments/preservation', '/treatments/aesthetic', '/treatments/orthodontics', '/treatments/general']
  },
  {
    group: 'local', label: '📍 지역 SEO (샘플 10)',
    urls: ['/local/myeongdong-implant', '/local/seoul-station-implant', '/local/hoehyeon-implant',
      '/local/myeongdong-orthodontics', '/local/euljiro-implant', '/local/chungmuro-implant',
      '/local/namdaemun-implant', '/local/junggu-implant', '/local/seoul-station-orthodontics',
      '/local/myeongdong-aesthetic']
  },
  {
    group: 'symptom', label: '🩺 증상 SEO (샘플 10)',
    urls: ['/symptoms/toothache', '/symptoms/swollen-gums', '/symptoms/sensitive-teeth',
      '/symptoms/bleeding-gums', '/symptoms/bad-breath', '/symptoms/broken-tooth',
      '/symptoms/wisdom-tooth-pain', '/symptoms/loose-tooth', '/symptoms/jaw-pain',
      '/symptoms/tooth-discoloration']
  },
  {
    group: 'cost', label: '💰 비용 SEO (샘플 5)',
    urls: ['/cost/implant-cost', '/cost/orthodontics-cost', '/cost/aesthetic-cost',
      '/cost/crown-cost', '/cost/scaling-cost']
  },
  {
    group: 'compare', label: '⚖️ 비교 SEO (샘플 4)',
    urls: ['/compare/implant-vs-bridge', '/compare/laminate-vs-resin',
      '/compare/clear-vs-metal-braces', '/compare/implant-vs-denture']
  },
  {
    group: 'hub', label: '📚 허브 페이지',
    urls: ['/local', '/symptoms', '/cost', '/compare', '/encyclopedia', '/blog', '/before-after', '/notice']
  },
  {
    group: 'encyclopedia', label: '📖 백과사전 (샘플 5)',
    urls: ['/encyclopedia/implant', '/encyclopedia/root-canal', '/encyclopedia/orthodontics',
      '/encyclopedia/laminate', '/encyclopedia/scaling']
  }
]

// 전체 샘플 URL 수
export function getTotalSampleUrls(): number {
  return URL_GROUPS.reduce((sum, g) => sum + g.urls.length, 0)
}

// ===== 검색엔진별 색인 확인 (site: 쿼리) =====
async function checkGoogleIndexed(url: string): Promise<boolean> {
  try {
    const fullUrl = url === '/' ? SITE_DOMAIN + '/' : SITE_DOMAIN + url
    const searchUrl = `https://www.google.com/search?q=site:${encodeURIComponent(fullUrl)}&num=1`
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8'
      }
    })
    const html = await res.text()
    // Google 검색 결과에서 해당 URL이 나오면 색인됨
    const domain = 'happyyein.kr'
    return html.includes(domain) && !html.includes('did not match any documents') && !html.includes('검색결과가 없습니다')
  } catch {
    return false
  }
}

async function checkNaverIndexed(url: string): Promise<boolean> {
  try {
    const fullUrl = url === '/' ? SITE_DOMAIN + '/' : SITE_DOMAIN + url
    const searchUrl = `https://search.naver.com/search.naver?query=site:${encodeURIComponent(fullUrl)}`
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9'
      }
    })
    const html = await res.text()
    return html.includes('happyyein.kr') && !html.includes('검색결과가 없습니다')
  } catch {
    return false
  }
}

async function checkBingIndexed(url: string): Promise<boolean> {
  try {
    const fullUrl = url === '/' ? SITE_DOMAIN + '/' : SITE_DOMAIN + url
    const searchUrl = `https://www.bing.com/search?q=site:${encodeURIComponent(fullUrl)}`
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8'
      }
    })
    const html = await res.text()
    return html.includes('happyyein.kr') && !html.includes('No results found') && !html.includes('There are no results for')
  } catch {
    return false
  }
}

// ===== API 라우트 =====
type Bindings = { DB: D1Database }
const indexingApi = new Hono<{ Bindings: Bindings }>()

// --- 색인 체크 실행 (수동 트리거) ---
indexingApi.post('/check', async (c) => {
  const db = c.env.DB
  const engine = (await c.req.json().catch(() => ({}))).engine || 'google'
  const validEngines = ['google', 'naver', 'bing']
  if (!validEngines.includes(engine)) {
    return c.json({ error: 'Invalid engine. Use: google, naver, bing' }, 400)
  }

  const checkFn = engine === 'google' ? checkGoogleIndexed
    : engine === 'naver' ? checkNaverIndexed
    : checkBingIndexed

  const results: { url: string; group: string; indexed: boolean }[] = []
  let indexedCount = 0
  let totalUrls = 0

  for (const grp of URL_GROUPS) {
    for (const url of grp.urls) {
      const indexed = await checkFn(url)
      results.push({ url, group: grp.group, indexed })
      if (indexed) indexedCount++
      totalUrls++

      // DB에 기록
      await db.prepare(
        'INSERT INTO indexing_checks (url, url_group, engine, indexed) VALUES (?, ?, ?, ?)'
      ).bind(url, grp.group, engine, indexed ? 1 : 0).run()

      // Rate limiting — 요청 간 200ms 간격
      await new Promise(r => setTimeout(r, 200))
    }
  }

  // 스냅샷 저장
  const indexRate = totalUrls > 0 ? Math.round((indexedCount / totalUrls) * 10000) / 100 : 0
  await db.prepare(
    'INSERT INTO indexing_snapshots (engine, total_urls, indexed_count, index_rate) VALUES (?, ?, ?, ?)'
  ).bind(engine, totalUrls, indexedCount, indexRate).run()

  return c.json({
    engine,
    total: totalUrls,
    indexed: indexedCount,
    rate: indexRate,
    results
  })
})

// --- 전체 3엔진 동시 체크 (간소화 — 도메인 레벨만) ---
indexingApi.post('/check-all-quick', async (c) => {
  const db = c.env.DB
  const engines = ['google', 'naver', 'bing'] as const
  const summary: Record<string, { total: number; indexed: number; rate: number }> = {}

  for (const engine of engines) {
    const checkFn = engine === 'google' ? checkGoogleIndexed
      : engine === 'naver' ? checkNaverIndexed
      : checkBingIndexed

    // 핵심 5페이지만 빠르게 체크
    const quickUrls = ['/', '/treatments/implant', '/doctors', '/local/myeongdong-implant', '/blog']
    let indexedCount = 0
    for (const url of quickUrls) {
      const indexed = await checkFn(url)
      if (indexed) indexedCount++
      await db.prepare(
        'INSERT INTO indexing_checks (url, url_group, engine, indexed) VALUES (?, ?, ?, ?)'
      ).bind(url, 'quick', engine, indexed ? 1 : 0).run()
      await new Promise(r => setTimeout(r, 300))
    }

    const rate = Math.round((indexedCount / quickUrls.length) * 10000) / 100
    summary[engine] = { total: quickUrls.length, indexed: indexedCount, rate }

    await db.prepare(
      'INSERT INTO indexing_snapshots (engine, total_urls, indexed_count, index_rate) VALUES (?, ?, ?, ?)'
    ).bind(engine, quickUrls.length, indexedCount, rate).run()
  }

  return c.json({ summary, checked_at: new Date().toISOString() })
})

// --- 이력 조회 ---
indexingApi.get('/history', async (c) => {
  const db = c.env.DB
  const engine = c.req.query('engine') || 'google'
  const limit = parseInt(c.req.query('limit') || '30')

  const snapshots = await db.prepare(
    'SELECT * FROM indexing_snapshots WHERE engine = ? ORDER BY checked_at DESC LIMIT ?'
  ).bind(engine, limit).all()

  return c.json({ engine, snapshots: snapshots.results })
})

// --- 최신 URL별 상태 ---
indexingApi.get('/latest', async (c) => {
  const db = c.env.DB
  const engine = c.req.query('engine') || 'google'

  // 각 URL의 가장 최근 체크 결과
  const results = await db.prepare(`
    SELECT ic.url, ic.url_group, ic.indexed, ic.checked_at
    FROM indexing_checks ic
    INNER JOIN (
      SELECT url, engine, MAX(checked_at) as max_checked
      FROM indexing_checks
      WHERE engine = ?
      GROUP BY url, engine
    ) latest ON ic.url = latest.url AND ic.engine = latest.engine AND ic.checked_at = latest.max_checked
    WHERE ic.engine = ?
    ORDER BY ic.url_group, ic.url
  `).bind(engine, engine).all()

  return c.json({ engine, results: results.results })
})

// --- 그룹별 색인율 ---
indexingApi.get('/group-stats', async (c) => {
  const db = c.env.DB
  const engine = c.req.query('engine') || 'google'

  const results = await db.prepare(`
    SELECT url_group,
      COUNT(*) as total,
      SUM(CASE WHEN indexed = 1 THEN 1 ELSE 0 END) as indexed_count,
      ROUND(CAST(SUM(CASE WHEN indexed = 1 THEN 1 ELSE 0 END) AS REAL) / COUNT(*) * 100, 1) as index_rate
    FROM indexing_checks ic
    INNER JOIN (
      SELECT url, engine, MAX(checked_at) as max_checked
      FROM indexing_checks
      WHERE engine = ?
      GROUP BY url, engine
    ) latest ON ic.url = latest.url AND ic.engine = latest.engine AND ic.checked_at = latest.max_checked
    WHERE ic.engine = ?
    GROUP BY url_group
    ORDER BY url_group
  `).bind(engine, engine).all()

  return c.json({ engine, groups: results.results })
})

// --- 스냅샷 트렌드 (차트용) ---
indexingApi.get('/trend', async (c) => {
  const db = c.env.DB
  const engine = c.req.query('engine') || 'google'
  const days = parseInt(c.req.query('days') || '30')

  const snapshots = await db.prepare(`
    SELECT engine, total_urls, indexed_count, index_rate,
      strftime('%Y-%m-%d', checked_at) as date,
      checked_at
    FROM indexing_snapshots
    WHERE engine = ? AND checked_at >= datetime('now', '-' || ? || ' days')
    ORDER BY checked_at ASC
  `).bind(engine, days).all()

  return c.json({ engine, days, trend: snapshots.results })
})

export default indexingApi

// ===== 관리자 대시보드 페이지 =====
export function indexingDashboardPage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>색인 모니터링 — 행복한예인치과 Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{min-height:100vh;background:#0A0A0A;color:#F5F2ED;font-family:'Noto Sans KR','DM Sans',sans-serif;-webkit-font-smoothing:antialiased;}
a{text-decoration:none;color:inherit;}

/* === HEADER === */
.idx-header{padding:24px 40px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(247,186,24,0.08);background:rgba(16,16,16,0.95);backdrop-filter:blur(20px);position:sticky;top:0;z-index:50;}
.idx-logo{display:flex;align-items:center;gap:16px;}
.idx-logo h1{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:4px;}
.idx-logo h1 em{color:#F7BA18;font-style:normal;}
.idx-logo .badge{background:rgba(247,186,24,0.12);color:#F7BA18;font-family:'Space Grotesk',monospace;font-size:0.6rem;padding:4px 10px;border-radius:6px;letter-spacing:1px;font-weight:600;}
.idx-nav{display:flex;gap:8px;align-items:center;}
.idx-nav a{padding:8px 16px;border-radius:10px;font-size:0.8rem;font-weight:500;color:#888;transition:all 0.3s;}
.idx-nav a:hover{color:#F5F2ED;background:rgba(255,255,255,0.04);}
.idx-nav a.active{color:#F7BA18;background:rgba(247,186,24,0.08);}

/* === MAIN === */
.idx-main{max-width:1400px;margin:0 auto;padding:32px 40px;}

/* === ENGINE TABS === */
.engine-tabs{display:flex;gap:8px;margin-bottom:28px;}
.engine-tab{padding:12px 24px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);background:rgba(22,22,22,0.8);font-family:'Syne',sans-serif;font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:2px;color:#888;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:10px;}
.engine-tab:hover{border-color:rgba(247,186,24,0.15);color:#F5F2ED;}
.engine-tab.active{border-color:#F7BA18;color:#F7BA18;background:rgba(247,186,24,0.06);}
.engine-tab .engine-icon{width:20px;height:20px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;}
.engine-tab[data-engine="google"] .engine-icon{background:rgba(66,133,244,0.15);color:#4285F4;}
.engine-tab[data-engine="naver"] .engine-icon{background:rgba(3,199,90,0.15);color:#03C75A;}
.engine-tab[data-engine="bing"] .engine-icon{background:rgba(0,137,203,0.15);color:#0089CB;}

/* === STAT CARDS === */
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;}
.s-card{background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:20px;position:relative;overflow:hidden;transition:all 0.4s;}
.s-card:hover{border-color:rgba(247,186,24,0.12);transform:translateY(-2px);}
.s-card-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:0.85rem;margin-bottom:12px;}
.s-card:nth-child(1) .s-card-icon{background:rgba(247,186,24,0.12);color:#F7BA18;}
.s-card:nth-child(2) .s-card-icon{background:rgba(74,222,128,0.12);color:#4ADE80;}
.s-card:nth-child(3) .s-card-icon{background:rgba(251,191,36,0.12);color:#FBBF24;}
.s-card:nth-child(4) .s-card-icon{background:rgba(56,189,248,0.12);color:#38BDF8;}
.s-card-num{font-family:'Bebas Neue',sans-serif;font-size:2.2rem;line-height:1;letter-spacing:2px;}
.s-card-label{font-family:'Syne',sans-serif;font-size:0.55rem;text-transform:uppercase;letter-spacing:3px;color:#888;margin-top:4px;font-weight:500;}
.s-card-bar{margin-top:10px;height:3px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;}
.s-card-bar-fill{height:100%;border-radius:3px;transition:width 1.5s cubic-bezier(0.16,1,0.3,1);}

/* === CHART === */
.chart-section{display:grid;grid-template-columns:1.5fr 1fr;gap:16px;margin-bottom:28px;}
.chart-card{background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:24px;transition:border-color 0.3s;}
.chart-card:hover{border-color:rgba(247,186,24,0.1);}
.chart-title{font-family:'Syne',sans-serif;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.chart-title i{color:#F7BA18;font-size:0.75rem;}
.chart-wrap{position:relative;height:260px;}

/* === GROUP BARS === */
.group-bar{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.03);}
.group-bar:last-child{border-bottom:none;}
.group-label{width:140px;font-size:0.78rem;color:#B5B0A8;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.group-track{flex:1;height:22px;background:rgba(255,255,255,0.04);border-radius:6px;overflow:hidden;position:relative;}
.group-fill{height:100%;border-radius:6px;background:linear-gradient(90deg,#F7BA18,#D4A010);transition:width 1.2s cubic-bezier(0.16,1,0.3,1);display:flex;align-items:center;justify-content:flex-end;padding-right:8px;min-width:0;}
.group-fill span{font-family:'Space Grotesk',monospace;font-size:0.62rem;font-weight:600;color:#0A0A0A;white-space:nowrap;}
.group-count{width:70px;text-align:right;font-family:'Space Grotesk',monospace;font-size:0.72rem;color:#888;}

/* === URL TABLE === */
.url-table-card{background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:24px;margin-bottom:28px;}
.url-table{width:100%;border-collapse:collapse;}
.url-table th{font-family:'Syne',sans-serif;font-size:0.6rem;text-transform:uppercase;letter-spacing:3px;color:#888;font-weight:600;padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.06);}
.url-table td{padding:10px 12px;font-size:0.82rem;border-bottom:1px solid rgba(255,255,255,0.03);vertical-align:middle;}
.url-table tr:hover td{background:rgba(247,186,24,0.02);}
.url-path{font-family:'Space Grotesk',monospace;font-size:0.78rem;color:#B5B0A8;}
.idx-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:6px;font-family:'Space Grotesk',monospace;font-size:0.68rem;font-weight:600;}
.idx-badge.yes{background:rgba(74,222,128,0.1);color:#4ADE80;}
.idx-badge.no{background:rgba(239,68,68,0.1);color:#EF4444;}
.idx-badge.pending{background:rgba(251,191,36,0.1);color:#FBBF24;}
.group-tag{display:inline-block;padding:3px 8px;border-radius:5px;font-family:'Space Grotesk',monospace;font-size:0.62rem;background:rgba(255,255,255,0.04);color:#888;letter-spacing:0.5px;}

/* === ACTION BUTTONS === */
.action-bar{display:flex;gap:12px;margin-bottom:28px;flex-wrap:wrap;}
.action-btn{padding:12px 24px;border-radius:12px;border:1px solid rgba(247,186,24,0.15);background:rgba(247,186,24,0.06);color:#F7BA18;font-family:'Syne',sans-serif;font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:2px;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:8px;}
.action-btn:hover{background:rgba(247,186,24,0.12);border-color:#F7BA18;transform:translateY(-1px);box-shadow:0 8px 24px rgba(247,186,24,0.1);}
.action-btn:disabled{opacity:0.4;cursor:not-allowed;transform:none;box-shadow:none;}
.action-btn.secondary{border-color:rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:#888;}
.action-btn.secondary:hover{border-color:rgba(255,255,255,0.2);color:#F5F2ED;}
.action-btn.danger{border-color:rgba(239,68,68,0.15);background:rgba(239,68,68,0.06);color:#EF4444;}

/* === STATUS === */
.status-bar{padding:14px 20px;border-radius:12px;margin-bottom:20px;font-size:0.82rem;display:none;align-items:center;gap:10px;animation:fadeIn 0.4s;}
.status-bar.info{display:flex;background:rgba(56,189,248,0.06);border:1px solid rgba(56,189,248,0.15);color:#38BDF8;}
.status-bar.success{display:flex;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15);color:#4ADE80;}
.status-bar.error{display:flex;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);color:#EF4444;}
.status-bar .spinner{width:16px;height:16px;border:2px solid rgba(56,189,248,0.3);border-top-color:#38BDF8;border-radius:50%;animation:spin 0.8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}

/* === LAST CHECK === */
.last-check{font-family:'Space Grotesk',monospace;font-size:0.72rem;color:#888;letter-spacing:0.5px;padding:8px 16px;background:rgba(255,255,255,0.02);border-radius:8px;display:inline-flex;align-items:center;gap:8px;}

/* === RESPONSIVE === */
@media(max-width:900px){
  .stat-row{grid-template-columns:repeat(2,1fr);}
  .chart-section{grid-template-columns:1fr;}
  .idx-header{padding:16px 20px;flex-direction:column;gap:12px;}
  .idx-main{padding:20px;}
  .group-label{width:100px;font-size:0.7rem;}
}
@media(max-width:600px){
  .stat-row{grid-template-columns:1fr;}
  .engine-tabs{flex-direction:column;}
  .action-bar{flex-direction:column;}
}
</style>
</head>
<body>

<!-- HEADER -->
<header class="idx-header">
  <div class="idx-logo">
    <h1>Happy Y<em>e</em>in <em>·</em> Index</h1>
    <span class="badge">MONITORING</span>
  </div>
  <nav class="idx-nav">
    <a href="/admin">← 어드민</a>
    <a href="/" target="_blank"><i class="fas fa-external-link-alt"></i> 사이트</a>
  </nav>
</header>

<!-- MAIN -->
<main class="idx-main">

  <!-- ENGINE TABS -->
  <div class="engine-tabs">
    <div class="engine-tab active" data-engine="google" onclick="switchEngine('google')">
      <div class="engine-icon"><i class="fab fa-google"></i></div> Google
    </div>
    <div class="engine-tab" data-engine="naver" onclick="switchEngine('naver')">
      <div class="engine-icon"><b>N</b></div> Naver
    </div>
    <div class="engine-tab" data-engine="bing" onclick="switchEngine('bing')">
      <div class="engine-icon"><i class="fab fa-microsoft"></i></div> Bing
    </div>
  </div>

  <!-- STATUS -->
  <div id="statusBar" class="status-bar"></div>

  <!-- ACTION BAR -->
  <div class="action-bar">
    <button class="action-btn" id="btnCheckFull" onclick="runCheck()">
      <i class="fas fa-search"></i> 전체 샘플 체크 (58 URLs)
    </button>
    <button class="action-btn secondary" id="btnCheckQuick" onclick="runQuickCheck()">
      <i class="fas fa-bolt"></i> 3엔진 빠른 체크 (핵심 5개)
    </button>
    <button class="action-btn secondary" onclick="loadDashboard()">
      <i class="fas fa-sync-alt"></i> 새로고침
    </button>
    <div class="last-check" id="lastCheck">
      <i class="far fa-clock"></i> <span>아직 체크하지 않았습니다</span>
    </div>
  </div>

  <!-- STAT CARDS -->
  <div class="stat-row" id="statCards">
    <div class="s-card">
      <div class="s-card-icon"><i class="fas fa-globe"></i></div>
      <div class="s-card-num" id="statTotal">—</div>
      <div class="s-card-label">전체 샘플 URL</div>
    </div>
    <div class="s-card">
      <div class="s-card-icon"><i class="fas fa-check-circle"></i></div>
      <div class="s-card-num" id="statIndexed">—</div>
      <div class="s-card-label">색인 완료</div>
    </div>
    <div class="s-card">
      <div class="s-card-icon"><i class="fas fa-percentage"></i></div>
      <div class="s-card-num" id="statRate">—</div>
      <div class="s-card-label">색인율</div>
    </div>
    <div class="s-card">
      <div class="s-card-icon"><i class="fas fa-chart-line"></i></div>
      <div class="s-card-num" id="statChange">—</div>
      <div class="s-card-label">전회 대비 변동</div>
    </div>
  </div>

  <!-- CHART + GROUP BARS -->
  <div class="chart-section">
    <div class="chart-card">
      <div class="chart-title"><i class="fas fa-chart-area"></i> 색인율 추이</div>
      <div class="chart-wrap"><canvas id="trendChart"></canvas></div>
    </div>
    <div class="chart-card">
      <div class="chart-title"><i class="fas fa-layer-group"></i> 그룹별 색인율</div>
      <div id="groupBars">
        <p style="color:#555;font-size:0.82rem;padding:20px 0;">체크를 실행하면 그룹별 결과가 표시됩니다.</p>
      </div>
    </div>
  </div>

  <!-- URL TABLE -->
  <div class="url-table-card">
    <div class="chart-title" style="margin-bottom:16px;"><i class="fas fa-list-ul"></i> URL별 색인 상태</div>
    <div style="overflow-x:auto;">
      <table class="url-table" id="urlTable">
        <thead>
          <tr><th>그룹</th><th>URL</th><th>색인</th><th>체크 시간</th></tr>
        </thead>
        <tbody id="urlTableBody">
          <tr><td colspan="4" style="text-align:center;color:#555;padding:32px;">색인 체크를 실행하면 결과가 표시됩니다.</td></tr>
        </tbody>
      </table>
    </div>
  </div>

</main>

<script>
let currentEngine = 'google';
let trendChart = null;

const GROUP_LABELS = {
  core: '🏠 핵심',
  treatment: '🦷 치료',
  local: '📍 지역',
  symptom: '🩺 증상',
  cost: '💰 비용',
  compare: '⚖️ 비교',
  hub: '📚 허브',
  encyclopedia: '📖 백과',
  quick: '⚡ 빠른체크'
};

function switchEngine(engine) {
  currentEngine = engine;
  document.querySelectorAll('.engine-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-engine="'+engine+'"]').classList.add('active');
  loadDashboard();
}

function showStatus(msg, type) {
  const bar = document.getElementById('statusBar');
  bar.className = 'status-bar ' + type;
  bar.innerHTML = (type === 'info' ? '<div class="spinner"></div>' : '<i class="fas fa-'+(type==='success'?'check-circle':'exclamation-circle')+'"></i>') + ' ' + msg;
}
function hideStatus() {
  document.getElementById('statusBar').className = 'status-bar';
}

async function runCheck() {
  const btn = document.getElementById('btnCheckFull');
  btn.disabled = true;
  showStatus(currentEngine.toUpperCase() + ' 색인 체크 중... (58개 URL, 약 15초 소요)', 'info');
  try {
    const res = await fetch('/api/indexing/check', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ engine: currentEngine })
    });
    const data = await res.json();
    showStatus(currentEngine.toUpperCase() + ' 체크 완료! ' + data.indexed + '/' + data.total + ' 색인됨 (' + data.rate + '%)', 'success');
    loadDashboard();
  } catch(e) {
    showStatus('체크 실패: ' + e.message, 'error');
  }
  btn.disabled = false;
}

async function runQuickCheck() {
  const btn = document.getElementById('btnCheckQuick');
  btn.disabled = true;
  showStatus('Google + Naver + Bing 빠른 체크 중... (핵심 5개 × 3엔진)', 'info');
  try {
    const res = await fetch('/api/indexing/check-all-quick', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    const parts = Object.entries(data.summary).map(([e, s]) =>
      e.charAt(0).toUpperCase()+e.slice(1)+': '+s.indexed+'/'+s.total+' ('+s.rate+'%)'
    );
    showStatus('빠른 체크 완료! ' + parts.join(' · '), 'success');
    loadDashboard();
  } catch(e) {
    showStatus('체크 실패: ' + e.message, 'error');
  }
  btn.disabled = false;
}

async function loadDashboard() {
  // Load latest URL statuses
  try {
    const [latestRes, trendRes, groupRes] = await Promise.all([
      fetch('/api/indexing/latest?engine=' + currentEngine),
      fetch('/api/indexing/trend?engine=' + currentEngine + '&days=30'),
      fetch('/api/indexing/group-stats?engine=' + currentEngine)
    ]);
    const latest = await latestRes.json();
    const trend = await trendRes.json();
    const groups = await groupRes.json();

    // Update stat cards
    const results = latest.results || [];
    const indexed = results.filter(r => r.indexed === 1).length;
    const total = results.length;
    const rate = total > 0 ? Math.round(indexed/total*100*100)/100 : 0;

    document.getElementById('statTotal').textContent = total || '—';
    document.getElementById('statIndexed').textContent = indexed || '—';
    document.getElementById('statRate').textContent = total > 0 ? rate + '%' : '—';

    // Change from previous
    const trendData = trend.trend || [];
    if (trendData.length >= 2) {
      const prev = trendData[trendData.length - 2].index_rate;
      const curr = trendData[trendData.length - 1].index_rate;
      const diff = Math.round((curr - prev) * 100) / 100;
      document.getElementById('statChange').textContent = (diff >= 0 ? '+' : '') + diff + '%';
      document.getElementById('statChange').style.color = diff > 0 ? '#4ADE80' : diff < 0 ? '#EF4444' : '#888';
    } else {
      document.getElementById('statChange').textContent = '—';
    }

    // Last check time
    if (results.length > 0) {
      const lastTime = results[0].checked_at;
      document.getElementById('lastCheck').querySelector('span').textContent =
        '마지막 체크: ' + new Date(lastTime + 'Z').toLocaleString('ko-KR');
    }

    // Render trend chart
    renderTrendChart(trendData);

    // Render group bars
    renderGroupBars(groups.groups || []);

    // Render URL table
    renderUrlTable(results);

  } catch(e) {
    console.error('Dashboard load error:', e);
  }
}

function renderTrendChart(data) {
  const ctx = document.getElementById('trendChart').getContext('2d');
  if (trendChart) trendChart.destroy();

  const labels = data.map(d => {
    const dt = new Date(d.checked_at + 'Z');
    return dt.toLocaleDateString('ko-KR', {month:'short', day:'numeric'}) + ' ' +
      dt.toLocaleTimeString('ko-KR', {hour:'2-digit', minute:'2-digit'});
  });
  const rates = data.map(d => d.index_rate);
  const counts = data.map(d => d.indexed_count);

  trendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: '색인율 (%)',
          data: rates,
          borderColor: '#F7BA18',
          backgroundColor: 'rgba(247,186,24,0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#F7BA18',
          yAxisID: 'y'
        },
        {
          label: '색인 수',
          data: counts,
          borderColor: '#4ADE80',
          backgroundColor: 'rgba(74,222,128,0.08)',
          fill: false,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#4ADE80',
          borderDash: [5, 3],
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: { color: '#888', font: { family: 'Space Grotesk', size: 11 }, usePointStyle: true, pointStyle: 'circle' }
        },
        tooltip: {
          backgroundColor: 'rgba(16,16,16,0.95)',
          titleColor: '#F7BA18',
          bodyColor: '#F5F2ED',
          borderColor: 'rgba(247,186,24,0.2)',
          borderWidth: 1,
          titleFont: { family: 'Syne', weight: '700' },
          bodyFont: { family: 'Space Grotesk' }
        }
      },
      scales: {
        x: {
          ticks: { color: '#555', font: { family: 'Space Grotesk', size: 10 }, maxRotation: 45 },
          grid: { color: 'rgba(255,255,255,0.03)' }
        },
        y: {
          type: 'linear', position: 'left',
          min: 0, max: 100,
          ticks: { color: '#F7BA18', font: { family: 'Space Grotesk', size: 11 }, callback: v => v + '%' },
          grid: { color: 'rgba(255,255,255,0.03)' }
        },
        y1: {
          type: 'linear', position: 'right',
          min: 0,
          ticks: { color: '#4ADE80', font: { family: 'Space Grotesk', size: 11 } },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}

function renderGroupBars(groups) {
  const container = document.getElementById('groupBars');
  if (!groups.length) {
    container.innerHTML = '<p style="color:#555;font-size:0.82rem;padding:20px 0;">체크를 실행하면 그룹별 결과가 표시됩니다.</p>';
    return;
  }
  container.innerHTML = groups.map(g => {
    const label = GROUP_LABELS[g.url_group] || g.url_group;
    const pct = g.index_rate || 0;
    const color = pct >= 80 ? '#4ADE80' : pct >= 40 ? '#FBBF24' : '#EF4444';
    return '<div class="group-bar">' +
      '<div class="group-label">' + label + '</div>' +
      '<div class="group-track"><div class="group-fill" style="width:'+pct+'%;background:linear-gradient(90deg,'+color+','+color+'88)"><span>' + (pct > 10 ? pct+'%' : '') + '</span></div></div>' +
      '<div class="group-count">' + g.indexed_count + '/' + g.total + '</div>' +
      '</div>';
  }).join('');
}

function renderUrlTable(results) {
  const tbody = document.getElementById('urlTableBody');
  if (!results.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#555;padding:32px;">색인 체크를 실행하면 결과가 표시됩니다.</td></tr>';
    return;
  }
  tbody.innerHTML = results.map(r => {
    const group = GROUP_LABELS[r.url_group] || r.url_group;
    const badge = r.indexed === 1
      ? '<span class="idx-badge yes"><i class="fas fa-check"></i> 색인됨</span>'
      : '<span class="idx-badge no"><i class="fas fa-times"></i> 미색인</span>';
    const time = r.checked_at ? new Date(r.checked_at + 'Z').toLocaleString('ko-KR') : '—';
    return '<tr>' +
      '<td><span class="group-tag">' + group + '</span></td>' +
      '<td><span class="url-path">' + r.url + '</span></td>' +
      '<td>' + badge + '</td>' +
      '<td style="font-family:Space Grotesk;font-size:0.72rem;color:#888;">' + time + '</td>' +
      '</tr>';
  }).join('');
}

// Initial load
loadDashboard();
</script>
</body>
</html>`
}
