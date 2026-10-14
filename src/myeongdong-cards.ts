// =====================================================================
// 명동 진료 안내 사진 카드 (2026-10-14) — 홈·명동 치과 허브(/local/myeongdong)에서 /local/myeongdong-* 핵심 6개로.
// 카드 사진 = 각 하위 페이지의 og:image·본문 첫 사진·스키마 image·사이트맵 image:image 와 같은 실제 원내 사진
//   (1200×630 jpg: /static/img/cards/local-{id}.jpg, 정사각 600×600 webp: /static/img/cards/myeongdong-{id}-600.webp)
// 한 줄 설명은 레포에 이미 있는 진료 정보(local-seo·treatments·myeongdong-hub)에서만 가져온다.
// =====================================================================

const DOMAIN = 'https://happyyein.kr'

export type MyeongdongCard = { id: string; name: string; tag: string; line: string; href: string; card: string; og: string }

export const MYEONGDONG_CARDS: MyeongdongCard[] = [
  { id: 'implant', name: '명동 임플란트', tag: 'IMPLANT', line: '조건이 맞으면 발치한 날 바로 심는 발치즉시 임플란트 — 한승대 대표원장 진료' },
  { id: 'preservation', name: '명동 신경치료', tag: 'ROOT CANAL', line: '미세현미경으로 확대해 보며 자연치아를 살리는 신경치료 — 박미나 원장 진료' },
  { id: 'aesthetic', name: '명동 라미네이트', tag: 'LAMINATE', line: '앞니 모양과 색을 다듬는 라미네이트·레진·미백 상담' },
  { id: 'orthodontics', name: '명동 교정', tag: 'ORTHODONTICS', line: '투명교정·설측교정 — 교정과 전문의 박현미 원장 진료' },
  { id: 'general', name: '명동 스케일링·잇몸치료', tag: 'SCALING', line: '만 19세 이상 연 1회 건강보험 스케일링, 잇몸치료와 정기검진' },
  { id: 'wisdom', name: '명동 사랑니 발치', tag: 'WISDOM TOOTH', line: '엑스레이·CT로 신경 위치를 먼저 확인하고 매복 사랑니까지 건강보험으로' },
].map((c) => ({
  ...c,
  href: `/local/myeongdong-${c.id}`,
  card: `/static/img/cards/myeongdong-${c.id}-600.webp`,
  og: `/static/img/cards/local-${c.id}.jpg`,
}))

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** 사진 카드 그리드. theme: 'dark'(홈) | 'light'(허브·하위 페이지). exclude: 현재 페이지 id(형제 카드용) */
export function myeongdongCardGrid(theme: 'dark' | 'light', idPrefix: string, exclude = ''): string {
  const cards = MYEONGDONG_CARDS.filter((c) => c.id !== exclude)
  return `<ul class="md-cards md-cards--${theme}" role="list">${cards.map((c, i) => `<li><a class="md-card" href="${c.href}" aria-labelledby="${idPrefix}-${c.id}"><span class="md-card-img"><img src="${c.card}" width="600" height="600" loading="lazy" decoding="async" alt="${esc(c.name)}"></span><span class="md-card-body"><span class="md-card-tag" aria-hidden="true">${String(i + 1).padStart(2, '0')} / ${c.tag}</span><strong class="md-card-title" id="${idPrefix}-${c.id}">${esc(c.name)}</strong><span class="md-card-line">${esc(c.line)}</span></span></a></li>`).join('')}</ul>`
}

/** 카드 그리드 공통 스타일 (한 페이지에 한 번) */
export const MYEONGDONG_CARD_CSS = `<style>
.md-cards{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.md-card{display:flex;flex-direction:column;height:100%;border-radius:16px;overflow:hidden;text-decoration:none;transition:transform .2s,box-shadow .2s,border-color .2s}
.md-card-img{display:block;aspect-ratio:1/1;overflow:hidden}
.md-card-img img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s}
.md-card:hover .md-card-img img,.md-card:focus-visible .md-card-img img{transform:scale(1.04)}
.md-card-body{display:flex;flex-direction:column;gap:6px;padding:16px 18px 20px}
.md-card-tag{font-size:.7rem;letter-spacing:.12em;font-weight:600}
.md-card-title{font-size:1.08rem;line-height:1.35}
.md-card-line{font-size:.88rem;line-height:1.6}
.md-card:focus-visible{outline:3px solid #f7ba18;outline-offset:3px}
.md-cards--dark .md-card{background:rgba(255,255,255,.03);border:1px solid rgba(247,186,24,.18)}
.md-cards--dark .md-card:hover{border-color:rgba(247,186,24,.5);transform:translateY(-3px)}
.md-cards--dark .md-card-tag{color:#f7ba18}
.md-cards--dark .md-card-title{color:#fff}
.md-cards--dark .md-card-line{color:rgba(255,255,255,.62)}
.md-cards--light .md-card{background:#fff;border:1px solid #d6e9f8;box-shadow:0 2px 10px rgba(26,82,118,.06)}
.md-cards--light .md-card:hover{border-color:#2e86c1;transform:translateY(-3px);box-shadow:0 8px 22px rgba(46,134,193,.16)}
.md-cards--light .md-card-tag{color:#2e86c1}
.md-cards--light .md-card-title{color:#1a5276}
.md-cards--light .md-card-line{color:#555}
@media(max-width:900px){.md-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}}
@media(max-width:520px){.md-cards{gap:10px}.md-card-body{padding:12px 12px 14px}.md-card-title{font-size:.98rem}.md-card-line{display:none}}
@media(prefers-reduced-motion:reduce){.md-card,.md-card-img img{transition:none}}
</style>`

/** 화면 카드와 1:1인 ItemList (같은 순서·이름·URL·사진) */
export function myeongdongCardItemList(listPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${DOMAIN}${listPath}#myeongdong-cards`,
    name: '명동 진료 안내',
    numberOfItems: MYEONGDONG_CARDS.length,
    itemListElement: MYEONGDONG_CARDS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `${DOMAIN}${c.href}`,
      image: `${DOMAIN}${c.card}`,
    })),
  }
}
