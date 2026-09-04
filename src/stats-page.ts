// ============================================================
// 관리자 통계 페이지 — 중앙 대시보드(PF Web Engine) 연동
// GET /admin/stats
//  - ?key=<토큰> 일치 → SSR 렌더 (200)
//  - key 없음 → 관리자 JWT 부트스트랩 (401, localStorage admin_token 검증 후 리다이렉트)
//  - key 불일치 → 404
// 토큰은 서버사이드에서만 중앙 API 호출에 사용된다.
// ============================================================
import { Hono } from 'hono'
import { requireAdmin } from './api-auth'

const STATS_API_URL = 'https://pf-dashboard-2nt.pages.dev/api/stats/happyyein.kr'
const STATS_TOKEN = '2b08a3d64b857e0f5f830de10696b801e3d3e8282152d84f'
const MASTER_KEY = 'pfwe-b4f42f06'

// ---------- 데이터 ----------
async function fetchStats(): Promise<any | null> {
  try {
    const res = await fetch(STATS_API_URL, {
      headers: { Authorization: `Bearer ${STATS_TOKEN}` },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

// ---------- 유틸 ----------
function esc(s: any): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
const fmt = (n: any) => (n == null || isNaN(Number(n)) ? '—' : Number(n).toLocaleString('ko-KR'))

function deltaBadge(v: number | null | undefined, invert = false): string {
  if (v == null || !isFinite(Number(v))) return ''
  const n = Number(v)
  if (n === 0) return `<span class="st-delta flat">— 0%</span>`
  const up = n > 0
  const good = invert ? !up : up
  return `<span class="st-delta ${good ? 'good' : 'bad'}">${up ? '▲' : '▼'} ${Math.abs(n).toFixed(1)}%</span>`
}

function sparkline(values: number[], color: string): string {
  if (!values || values.length < 2) return '<div class="st-spark-empty">데이터 수집 중</div>'
  const w = 600, h = 72
  const max = Math.max(...values, 1)
  const stepX = w / (values.length - 1)
  const pts = values.map((v, i) => [i * stepX, h - 8 - (v / max) * (h - 18)] as const)
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`
  const last = pts[pts.length - 1]
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:72px;display:block" role="img" aria-label="추이 그래프">
    <path d="${area}" fill="${color}" opacity="0.1"/>
    <path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3" fill="${color}"/>
  </svg>`
}

// ---------- 규칙 기반 인사이트 ----------
function buildInsights(d: any): string[] {
  const out: string[] = []
  const g = d?.gsc, a = d?.ga, ai = d?.ai
  if (!d || !d.configured) {
    return [
      '중앙 대시보드 데이터 연동이 완료되면 이 자리에 자동 인사이트가 표시됩니다.',
      '사이트맵·IndexNow·구조화데이터 등 검색 가속 세팅은 이미 적용되어 운영 중입니다.',
      '블로그·진료 콘텐츠가 쌓일수록 롱테일 키워드 노출이 먼저 늘어납니다.',
    ]
  }
  if (g) {
    if ((g.clicks ?? 0) < 100) {
      out.push(`최근 28일 검색 클릭 ${fmt(g.clicks)}회 — 아직 색인·순위 안착 단계입니다. 지금은 클릭보다 노출(${fmt(g.impressions)}회) 증가 추세가 더 중요한 신호입니다.`)
    } else if (g.delta?.clicks != null) {
      out.push(
        g.delta.clicks >= 0
          ? `최근 28일 검색 클릭 ${fmt(g.clicks)}회 — 직전 기간 대비 ${Number(g.delta.clicks).toFixed(1)}% 증가했습니다.`
          : `최근 28일 검색 클릭 ${fmt(g.clicks)}회 — 직전 기간 대비 ${Math.abs(Number(g.delta.clicks)).toFixed(1)}% 감소했습니다. 계절 요인 또는 순위 변동을 지켜볼 필요가 있습니다.`
      )
    }
    if ((g.impressions ?? 0) >= 200 && g.ctr != null && g.ctr < 0.02) {
      out.push(`노출 대비 클릭률(CTR ${(g.ctr * 100).toFixed(1)}%)이 아직 낮습니다. 노출이 쌓이는 초기에는 자연스러운 현상이며, 순위가 오르면 클릭률도 함께 개선됩니다.`)
    }
    if (g.position != null) {
      out.push(
        g.position <= 10
          ? `평균 노출 순위 ${Number(g.position).toFixed(1)}위 — 검색 1페이지에 노출되는 키워드가 형성되고 있습니다.`
          : `평균 노출 순위 ${Number(g.position).toFixed(1)}위 — 롱테일 키워드부터 순위가 형성되는 정상적인 초기 흐름입니다.`
      )
    }
    if (g.topQueries?.length) out.push(`가장 많이 유입된 검색어는 "${esc(g.topQueries[0].query)}" 입니다.`)
  }
  if (a && (a.leads ?? 0) > 0) out.push(`예약·상담 등 전환(리드)이 최근 28일 ${fmt(a.leads)}건 발생했습니다.`)
  if (ai && (ai.sessions ?? 0) > 0) out.push(`ChatGPT 등 AI 검색을 통한 방문이 ${fmt(ai.sessions)}회(전체 세션의 ${ai.share}%) 발생했습니다. AEO 구조가 작동하고 있다는 신호입니다.`)
  while (out.length < 3) {
    const fillers = [
      '사이트맵·IndexNow·구조화데이터 등 검색 가속 세팅이 적용되어 운영 중입니다.',
      '콘텐츠가 쌓일수록 지역+진료 조합 키워드의 노출이 단계적으로 늘어납니다.',
      '검색 순위는 6개월 이후 본격적인 경쟁 구간에 진입합니다.',
    ]
    const f = fillers[out.length % fillers.length]
    if (out.includes(f)) break
    out.push(f)
  }
  return out.slice(0, 5)
}

// ---------- 페이지 렌더 ----------
const TIMELINE = [
  { p: '0~1개월', t: '색인' },
  { p: '1~3개월', t: '롱테일 노출' },
  { p: '3~6개월', t: '지역+진료 키워드' },
  { p: '6개월~', t: '경쟁 키워드 본순위' },
]

function timelineHtml(): string {
  return `<div class="st-timeline">${TIMELINE.map((s, i) => `
    <div class="st-tl-step">
      <div class="st-tl-dot">${i + 1}</div>
      <div class="st-tl-period">${s.p}</div>
      <div class="st-tl-label">${s.t}</div>
    </div>`).join('<div class="st-tl-line"></div>')}</div>`
}

function expectationCard(large: boolean): string {
  if (large) {
    return `<section class="st-expect st-expect-lg">
      <div class="st-expect-icon"><i class="fas fa-hourglass-half"></i></div>
      <h2>검색 순위는 시간이 필요합니다</h2>
      <p>신규 사이트는 색인과 순위 안착까지 시간이 걸립니다. 본격적인 순위 경쟁은 개설 6개월부터 시작됩니다.<br/>사이트맵·IndexNow·구조화데이터 등 검색 가속 세팅은 모두 완료되어 있습니다.</p>
      ${timelineHtml()}
    </section>`
  }
  return `<section class="st-expect st-expect-sm">
    <div class="st-expect-sm-head"><i class="fas fa-hourglass-half"></i> 검색 순위는 시간이 필요합니다</div>
    ${timelineHtml()}
  </section>`
}

function metricCard(label: string, value: string, delta: string, icon: string, sub = ''): string {
  return `<div class="st-card">
    <div class="st-card-label"><i class="fas ${icon}"></i> ${label}</div>
    <div class="st-card-value">${value}</div>
    <div class="st-card-foot">${delta}${sub ? `<span class="st-card-sub">${sub}</span>` : ''}</div>
  </div>`
}

function tableHtml(title: string, heads: string[], rows: string[][]): string {
  if (!rows.length) return `<div class="st-table-wrap"><h3>${title}</h3><div class="st-empty">데이터 수집 중입니다</div></div>`
  return `<div class="st-table-wrap"><h3>${title}</h3>
  <table class="st-table">
    <thead><tr>${heads.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((cell, i) => `<td class="${i === 0 ? 'tl' : 'tr'}">${cell}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`
}

const AI_SOURCE_LABELS: Record<string, string> = {
  chatgpt: 'ChatGPT', perplexity: 'Perplexity', claude: 'Claude', gemini: 'Gemini', etc: '기타 AI',
}

function statsBody(d: any): string {
  const configured = !!(d && d.configured)
  const g = d?.gsc, a = d?.ga, ai = d?.ai
  const lowTraffic = !configured || !g || (g.clicks ?? 0) < 100

  let inner = ''
  inner += expectationCard(lowTraffic)

  if (!configured) {
    inner += `<section class="st-pending">
      <i class="fas fa-plug"></i>
      <h3>데이터 연동 대기 중</h3>
      <p>검색콘솔·애널리틱스 데이터 연동이 준비되는 대로 이 페이지에 지표가 자동 표시됩니다.</p>
    </section>`
  } else {
    // 지표 카드
    inner += `<div class="st-sec-title">검색 성과 <span>Google Search Console · 최근 28일</span></div>`
    if (g) {
      inner += `<div class="st-grid">
        ${metricCard('검색 클릭', fmt(g.clicks), deltaBadge(g.delta?.clicks), 'fa-arrow-pointer')}
        ${metricCard('검색 노출', fmt(g.impressions), deltaBadge(g.delta?.impressions), 'fa-eye')}
        ${metricCard('CTR', g.ctr != null ? (g.ctr * 100).toFixed(1) + '%' : '—', deltaBadge(g.delta?.ctr), 'fa-percent')}
        ${metricCard('평균 순위', g.position != null ? Number(g.position).toFixed(1) + '위' : '—', deltaBadge(g.delta?.position, true), 'fa-ranking-star')}
      </div>`
      const daily = (g.dailyClicks ?? []).map((x: any) => Number(x.clicks) || 0)
      inner += `<div class="st-spark"><div class="st-spark-title">일별 검색 클릭</div>${sparkline(daily, '#F7BA18')}</div>`
    } else {
      inner += `<div class="st-empty">검색콘솔 데이터 수집 중입니다</div>`
    }

    inner += `<div class="st-sec-title">방문 성과 <span>Google Analytics · 최근 28일</span></div>`
    if (a) {
      inner += `<div class="st-grid">
        ${metricCard('사용자', fmt(a.users), deltaBadge(a.delta?.users), 'fa-user')}
        ${metricCard('세션', fmt(a.sessions), deltaBadge(a.delta?.sessions), 'fa-chart-line')}
        ${metricCard('리드(전환)', fmt(a.leads), deltaBadge(a.delta?.leads), 'fa-phone')}
        ${metricCard('AI 유입', ai ? `${fmt(ai.sessions)} <em class="st-share">(${ai.share ?? 0}%)</em>` : '—', ai ? deltaBadge(ai.delta) : '', 'fa-robot')}
      </div>`
      const dailyU = (a.dailyUsers ?? []).map((x: any) => Number(x.users) || 0)
      inner += `<div class="st-spark"><div class="st-spark-title">일별 사용자</div>${sparkline(dailyU, '#7CC4FF')}</div>`
    } else {
      inner += `<div class="st-empty">${d.hasGa ? '애널리틱스 데이터 수집 중입니다' : '애널리틱스 연동 대기 중입니다'}</div>`
    }

    // 인사이트
    const ins = buildInsights(d)
    inner += `<section class="st-insight"><h3><i class="fas fa-lightbulb"></i> 자동 인사이트</h3><ul>${ins.map((l) => `<li>${l}</li>`).join('')}</ul></section>`

    // 테이블
    inner += `<div class="st-tables">`
    inner += tableHtml('상위 검색어 TOP 10', ['검색어', '클릭', '노출'],
      (g?.topQueries ?? []).slice(0, 10).map((q: any) => [esc(q.query), fmt(q.clicks), fmt(q.impressions)]))
    inner += tableHtml('상위 페이지 TOP 10', ['페이지', '클릭', '노출'],
      (g?.topPages ?? []).slice(0, 10).map((q: any) => [`<span class="st-path">${esc(String(q.page ?? '').replace(/^https?:\/\/[^/]+/, '') || '/')}</span>`, fmt(q.clicks), fmt(q.impressions)]))
    const aiRows = ai
      ? Object.entries(ai.bySource ?? {}).filter(([, v]) => Number(v) > 0).sort((x, y) => Number(y[1]) - Number(x[1])).map(([k, v]) => [AI_SOURCE_LABELS[k] ?? esc(k), fmt(v), ''])
      : []
    inner += tableHtml('AI 소스별 유입', ['AI 소스', '세션', ''], aiRows.map((r) => [r[0], r[1], r[2]]))
    inner += `</div>`
  } // configured end

  const ins2 = !configured ? buildInsights(d) : null
  if (ins2) {
    inner += `<section class="st-insight"><h3><i class="fas fa-lightbulb"></i> 자동 인사이트</h3><ul>${ins2.map((l) => `<li>${l}</li>`).join('')}</ul></section>`
  }
  return inner
}

const STATS_CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0A0A0A;color:#F5F2ED;font-family:'Noto Sans KR',sans-serif;-webkit-font-smoothing:antialiased;min-height:100vh}
a{color:inherit;text-decoration:none}
.st-wrap{max-width:1080px;margin:0 auto;padding:40px 24px 80px}
.st-head{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:28px}
.st-head h1{font-family:'Syne','Noto Sans KR',sans-serif;font-size:1.3rem;font-weight:800;letter-spacing:2px}
.st-head h1 em{color:#F7BA18;font-style:normal}
.st-head .st-back{font-size:0.8rem;color:#888;border:1px solid rgba(255,255,255,0.1);padding:8px 16px;border-radius:10px;transition:all .3s}
.st-head .st-back:hover{color:#F7BA18;border-color:rgba(247,186,24,0.3)}
.st-range{font-size:0.72rem;color:#666;font-family:'Space Grotesk',monospace;letter-spacing:1px}
.st-expect{background:rgba(22,22,22,0.9);border:1px solid rgba(247,186,24,0.12);border-radius:20px;margin-bottom:28px}
.st-expect-lg{padding:44px 36px;text-align:center;background:linear-gradient(160deg,rgba(247,186,24,0.06),rgba(22,22,22,0.95) 55%);border-color:rgba(247,186,24,0.25)}
.st-expect-lg .st-expect-icon{width:56px;height:56px;border-radius:16px;background:rgba(247,186,24,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:#F7BA18;font-size:1.4rem}
.st-expect-lg h2{font-size:1.5rem;font-weight:900;margin-bottom:14px}
.st-expect-lg p{color:#aaa;font-size:0.92rem;line-height:1.8;margin-bottom:28px}
.st-expect-sm{padding:18px 24px}
.st-expect-sm-head{font-size:0.85rem;font-weight:700;color:#F7BA18;margin-bottom:12px}
.st-timeline{display:flex;align-items:stretch;justify-content:center;gap:0;flex-wrap:wrap}
.st-tl-step{flex:1;min-width:110px;text-align:center;padding:6px 4px}
.st-tl-dot{width:30px;height:30px;border-radius:50%;background:rgba(247,186,24,0.12);border:1px solid rgba(247,186,24,0.4);color:#F7BA18;font-weight:700;font-size:0.8rem;display:flex;align-items:center;justify-content:center;margin:0 auto 8px}
.st-tl-period{font-size:0.7rem;color:#F7BA18;font-weight:700;letter-spacing:1px;margin-bottom:3px}
.st-tl-label{font-size:0.8rem;color:#ccc}
.st-tl-line{flex:0 0 24px;height:1px;background:rgba(247,186,24,0.25);align-self:center;margin-top:-24px}
.st-pending{background:rgba(22,22,22,0.9);border:1px dashed rgba(255,255,255,0.15);border-radius:20px;padding:44px 24px;text-align:center;margin-bottom:28px}
.st-pending i{font-size:1.6rem;color:#666;margin-bottom:14px}
.st-pending h3{font-size:1.05rem;margin-bottom:8px}
.st-pending p{color:#888;font-size:0.85rem;line-height:1.7}
.st-sec-title{font-family:'Syne','Noto Sans KR',sans-serif;font-size:0.95rem;font-weight:800;letter-spacing:2px;margin:32px 0 14px;color:#F5F2ED}
.st-sec-title span{font-size:0.65rem;color:#666;letter-spacing:1px;margin-left:10px;font-weight:500}
.st-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:16px}
@media(max-width:820px){.st-grid{grid-template-columns:repeat(2,1fr)}}
.st-card{background:rgba(22,22,22,0.9);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:20px}
.st-card-label{font-size:0.7rem;color:#888;letter-spacing:1px;margin-bottom:10px}
.st-card-label i{color:#F7BA18;margin-right:5px;font-size:0.7rem}
.st-card-value{font-family:'Space Grotesk','Noto Sans KR',monospace;font-size:1.7rem;font-weight:700;color:#F5F2ED}
.st-card-value .st-share{font-style:normal;font-size:0.85rem;color:#F7BA18}
.st-card-foot{margin-top:8px;min-height:18px;display:flex;align-items:center;gap:8px}
.st-card-sub{font-size:0.68rem;color:#666}
.st-delta{font-size:0.72rem;font-weight:700;padding:2px 8px;border-radius:6px}
.st-delta.good{color:#5BD98A;background:rgba(91,217,138,0.08)}
.st-delta.bad{color:#FF7A7A;background:rgba(255,122,122,0.08)}
.st-delta.flat{color:#888;background:rgba(255,255,255,0.04)}
.st-spark{background:rgba(22,22,22,0.9);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:18px 20px 12px;margin-bottom:8px}
.st-spark-title{font-size:0.7rem;color:#888;letter-spacing:1px;margin-bottom:10px}
.st-spark-empty{color:#555;font-size:0.8rem;padding:20px 0;text-align:center}
.st-insight{background:linear-gradient(160deg,rgba(247,186,24,0.05),rgba(22,22,22,0.9) 60%);border:1px solid rgba(247,186,24,0.15);border-radius:16px;padding:24px 26px;margin:28px 0}
.st-insight h3{font-size:0.9rem;color:#F7BA18;margin-bottom:14px}
.st-insight ul{list-style:none}
.st-insight li{font-size:0.85rem;color:#ccc;line-height:1.7;padding:6px 0 6px 20px;position:relative}
.st-insight li::before{content:'·';color:#F7BA18;position:absolute;left:6px;font-weight:900}
.st-tables{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:900px){.st-tables{grid-template-columns:1fr}}
.st-table-wrap{background:rgba(22,22,22,0.9);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:20px}
.st-table-wrap h3{font-size:0.8rem;letter-spacing:1px;color:#F5F2ED;margin-bottom:14px}
.st-table{width:100%;border-collapse:collapse;font-size:0.8rem}
.st-table th{text-align:right;color:#666;font-weight:600;font-size:0.65rem;letter-spacing:1px;padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06)}
.st-table th:first-child{text-align:left}
.st-table td{padding:8px;border-bottom:1px solid rgba(255,255,255,0.04);color:#ccc}
.st-table td.tl{text-align:left;max-width:0;width:60%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.st-table td.tr{text-align:right;font-family:'Space Grotesk',monospace}
.st-table tr:last-child td{border-bottom:none}
.st-path{color:#7CC4FF}
.st-empty{color:#555;font-size:0.8rem;padding:24px 0;text-align:center}
`

export function statsPage(d: any): string {
  const range = d?.range ? `${d.range.start} ~ ${d.range.end}` : ''
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex,nofollow">
<title>통계 | 해피예인치과 관리자</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<style>${STATS_CSS}</style>
</head>
<body>
<div class="st-wrap">
  <div class="st-head">
    <h1>HAPPY <em>YEIN</em> · 통계</h1>
    <div style="display:flex;align-items:center;gap:14px">
      ${range ? `<span class="st-range">${range}</span>` : ''}
      <a href="/admin" class="st-back"><i class="fas fa-arrow-left"></i> 관리자 홈</a>
    </div>
  </div>
  ${statsBody(d)}
</div>
</body>
</html>`
}

function bootstrapPage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex,nofollow">
<title>통계 | 해피예인치과 관리자</title>
<style>body{background:#0A0A0A;color:#888;font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}</style>
</head>
<body>
<p>관리자 인증 확인 중...</p>
<script>
(async function(){
  var t = localStorage.getItem('admin_token');
  if(!t){ location.replace('/admin/login'); return; }
  try{
    var r = await fetch('/api/auth/stats-key', { headers: { 'Authorization': 'Bearer ' + t } });
    if(!r.ok){ location.replace('/admin/login'); return; }
    var d = await r.json();
    location.replace('/admin/stats?key=' + encodeURIComponent(d.key));
  }catch(e){ location.replace('/admin/login'); }
})();
</script>
</body>
</html>`
}

// ---------- 라우트 ----------
const statsApp = new Hono()

statsApp.get('/admin/stats', async (c) => {
  const key = c.req.query('key')
  if (key === undefined) {
    return c.html(bootstrapPage(), 401, { 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex, nofollow' })
  }
  if (key !== STATS_TOKEN && key !== MASTER_KEY) return c.notFound()
  const data = await fetchStats()
  return c.html(statsPage(data), 200, { 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex, nofollow' })
})

// 관리자 JWT → 통계 접근 키 교환 (대시보드 '통계' 메뉴에서 사용)
statsApp.get('/api/auth/stats-key', requireAdmin, (c) => c.json({ key: STATS_TOKEN }))

export default statsApp
