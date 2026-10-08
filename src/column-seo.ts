// 칼럼(블로그)·비포애프터 SEO/AEO 헬퍼 — PFWE-COLUMN-CASE-SEO.md 표준 (2026-10-03)
// - 진료 매핑: 자동 블로그 토픽 풀(seo_keyword → internalLinks 의 /treatments/*) 우선, 없으면 제목 키워드
// - 핵심 답변 박스: 본문 첫 문단에서 자동(새 문장 생성 없음)
// - FAQPage: 화면에 렌더되는 질문형 H3 + 바로 다음 문단에서만 추출
import { ALL_TOPICS } from './auto-blog'
import { allTreatmentLinks } from './treatments'

export const SITE_URL = 'https://happyyein.kr'
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const DR_HAN_ID = `${SITE_URL}/#dr-han` // pages.ts /doctors Physician @id

// ===== 칼럼 작성 주체 (2026-10-08, 사용자 승인) =====
// 자동 생성 칼럼(auto-blog.ts 파이프라인, posts.auto_generated=1)과 대행사 시드 글(seed-c4-posts.sql,
// 커밋 988d152 — id 106·107·108, auto_generated=0 이지만 원장 작성 아님)은 원장이 쓰거나 검토한 근거가 없다.
// → 작성·발행 = 병원(Organization), reviewedBy·'원장 감수' 표시 없음, 화면엔 일반 정보 안내 문구.
// 관리자 화면에서 병원이 직접 올린 글(auto_generated=0, 시드 제외)만 기존 표시(원장 감수)를 유지한다.
export const AGENCY_SEED_POST_IDS = new Set([106, 107, 108])
export const CLINIC_GENERAL_INFO_NOTE = '일반 건강정보입니다. 진료 판단은 내원 상담에서 원장이 직접 합니다.'
export function isClinicGeneratedPost(p: { id: number | string; auto_generated?: number | string | null }): boolean {
  return Number(p.auto_generated) === 1 || AGENCY_SEED_POST_IDS.has(Number(p.id))
}

export function treatmentTitle(slug: string): string {
  return allTreatmentLinks.find(t => t.slug === slug)?.title || ''
}

const TITLE_RULES: [RegExp, string][] = [
  [/임플란트|뼈이식|상악동|틀니|올온포/, 'implant'],
  [/교정|인비절라인|브라켓|유지장치|덧니/, 'orthodontics'],
  [/라미네이트|미백|심미|앞니 레진|잇몸 성형/, 'aesthetic'],
  [/신경치료|충치|크라운|인레이|온레이|레진|보존|시린|시림|균열|치수|아말감/, 'preservation'],
  [/스케일링|잇몸|사랑니|검진|예방|불소|치주|구취|양치/, 'general'],
]

/** 글 → 관련 진료 slug (토픽 풀 internalLinks 우선, 다음 제목 키워드). 없으면 '' */
export function treatmentForPost(seoKeyword: string | null | undefined, title: string): string {
  if (seoKeyword) {
    const topic = ALL_TOPICS.find(t => t.keyword === seoKeyword)
    const link = topic?.internalLinks.find(l => l.startsWith('/treatments/'))
    if (link) return link.replace('/treatments/', '')
  }
  const hay = `${seoKeyword || ''} ${title || ''}`
  for (const [re, slug] of TITLE_RULES) if (re.test(hay)) return slug
  return ''
}

export function stripTags(html: string): string {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()
}

export function escHtml(s: string): string {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

/** 첫 2~3문장 (최대 약 220자) */
function firstSentences(text: string, max = 3): string {
  const parts = text.match(/[^.!?。]+[.!?。]+(\s|$)/g) || [text]
  let out = ''
  for (const p of parts.slice(0, max)) {
    if (out && (out + p).length > 220) break
    out += p
  }
  return out.trim() || text.slice(0, 220)
}

/**
 * 핵심 답변 박스.
 * - 본문이 <p>로 시작하면 그 첫 문단을 박스로 감싼다(이동 — 중복 없음)
 * - <h2>로 시작하는 글은 첫 <p>의 앞 2~3문장을 박스에 요약으로 보여준다(본문 그대로 인용)
 */
export function withAnswerSummary(content: string): { html: string; summary: string } {
  const label = '<p class="answer-summary-label">핵심 답변</p>'
  const lead = content.match(/^\s*<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/i)
  if (lead) {
    const summary = stripTags(lead[1])
    if (summary.length >= 20) {
      const box = `<div class="answer-summary" id="answer-summary">${label}<p>${lead[1]}</p></div>`
      return { html: box + content.slice(lead[0].length), summary }
    }
  }
  const firstP = content.match(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/i)
  if (firstP) {
    const text = stripTags(firstP[1])
    if (text.length >= 40) {
      const summary = firstSentences(text)
      return { html: `<div class="answer-summary" id="answer-summary">${label}<p>${escHtml(summary)}</p></div>` + content, summary }
    }
  }
  return { html: content, summary: '' }
}

/** 질문형 H3(?로 끝남) + 바로 다음 <p> → FAQ. 화면에 보이는 문장만 사용. */
export function faqsFromArticleHtml(content: string): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = []
  const re = /<h3[^>]*>((?:(?!<\/h3>)[\s\S])*)<\/h3>\s*<p(?:\s[^>]*)?>((?:(?!<\/p>)[\s\S])*)<\/p>/gi
  let m: RegExpExecArray | null
  const seen = new Set<string>()
  while ((m = re.exec(content)) !== null) {
    const q = stripTags(m[1]).replace(/^(Q[.:]?|질문[.:]?)\s*/i, '').trim()
    const a = stripTags(m[2]).replace(/^(A[.:]?|답변[.:]?)\s*/i, '').trim()
    if (!q || !a || seen.has(q)) continue
    if (!/[?？]$/.test(q)) continue
    seen.add(q)
    out.push({ q, a })
  }
  return out.slice(0, 10)
}

/** 본문 이미지: alt 없으면 제목 기반, 첫 이미지 제외 loading=lazy, decoding=async */
export function enhanceContentImages(content: string, title: string): string {
  let i = 0
  return content.replace(/<img\b([^>]*)>/gi, (_all, attrs: string) => {
    let a = attrs.replace(/\s*\/\s*$/, '')
    i++
    if (!/\salt\s*=\s*["'][^"']+["']/i.test(a)) {
      a = a.replace(/\salt\s*=\s*["']\s*["']/i, '')
      a += ` alt="${escHtml(title)} 관련 이미지${i > 1 ? ' ' + i : ''}"`
    }
    if (i > 1 && !/\sloading\s*=/i.test(a)) a += ' loading="lazy"'
    if (!/\sdecoding\s*=/i.test(a)) a += ' decoding="async"'
    return `<img${a}>`
  })
}

export function ymd(d: string | null | undefined): string {
  return d ? String(d).substring(0, 10) : ''
}

/** D1 datetime('now') = UTC 'YYYY-MM-DD HH:MM:SS' → ISO 8601 KST */
export function isoKst(d: string | null | undefined): string | undefined {
  if (!d) return undefined
  const s = String(d)
  const t = Date.parse(s.includes('T') ? s : s.replace(' ', 'T') + 'Z')
  if (isNaN(t)) return undefined
  const k = new Date(t + 9 * 3600 * 1000).toISOString().slice(0, 19)
  return `${k}+09:00`
}

export function kstYmd(d: string | null | undefined): string {
  return (isoKst(d) || '').slice(0, 10) || ymd(d)
}
