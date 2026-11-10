// =====================================================================
// 정보 글(치과 백과사전 상세·칼럼 상세) 본문 끝 상담 블록 (2026-11-10)
// - 버튼은 레포에 이미 정의된 채널만: 전화예약 · 네이버 예약 · 카톡 문의 (layout.ts footer() 와 같은 링크)
// - 각 버튼 링크에 data-cta="article-end" (대시보드 비콘·GA4 측정용)
// - 색은 사이트 토큰(검정·노랑)만, 버튼은 공용 .btn 컴포넌트. 그라데이션 글씨(background-clip:text) 쓰지 않는다.
// - 문구는 효과·결과를 약속하거나 재촉하지 않는다(의료광고법).
// - 증상·비용·비교 상세와 외국어 가이드는 템플릿에 이미 글 끝 버튼 블록이 있어 data-cta 속성만 붙였다.
// =====================================================================

const AEC_STYLE = `<style>
.article-end-cta{margin:48px 0 0;padding:36px 32px;border-radius:16px;background:var(--black-warm);border:1px solid rgba(247,186,24,0.22);text-align:center;font-family:var(--font-kr);}
.article-end-cta .aec-title{font-family:var(--font-kr);font-size:1.25rem;font-weight:800;color:var(--white);margin:0 0 10px;line-height:1.5;letter-spacing:-0.5px;word-break:keep-all;}
.article-end-cta .aec-desc{font-size:0.9rem;font-weight:400;color:var(--gray-light);line-height:1.8;margin:0 0 24px;word-break:keep-all;}
.article-end-cta .aec-desc span{display:inline-block;}
.article-end-cta .aec-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}
.article-end-cta .btn{padding:14px 26px;font-family:var(--font-kr);font-size:0.85rem;letter-spacing:0;text-transform:none;}
@media(max-width:768px){
  .article-end-cta{margin-top:40px;padding:28px 20px;}
  .article-end-cta .btn{width:100%;justify-content:center;}
}
</style>`

/**
 * 글 끝 상담 블록.
 * generalNote: 바로 위에 "일반 정보" 고지 문장이 이미 있는 템플릿은 false(같은 말 반복 방지).
 */
export function articleEndCta(opts: { generalNote?: boolean } = {}): string {
  // 문장 단위로만 줄이 바뀌게 문장마다 span(inline-block)
  const desc = [
    ...(opts.generalNote === false ? [] : ['이 글은 일반 정보입니다.']),
    '내 상태는 진료실에서 확인해야 정확합니다.',
    '진료 시간 안에 행복한예인치과로 문의하세요.',
  ].map(x => `<span>${x}</span>`).join(' ')
  return `${AEC_STYLE}
<aside class="article-end-cta" aria-label="진료 문의">
  <h2 class="aec-title">직접 확인이 필요하다면</h2>
  <p class="aec-desc">${desc}</p>
  <div class="aec-btns">
    <a href="tel:02-756-2828" class="btn btn-gold" data-cta="article-end"><i class="fas fa-phone-alt"></i> 전화예약</a>
    <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener" class="btn btn-naver" data-cta="article-end"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
    <a href="http://pf.kakao.com/_Nxfczxh" target="_blank" rel="noopener" class="btn btn-ghost" style="border-color:rgba(250,225,0,0.4);color:#FAE100;" data-cta="article-end"><i class="fas fa-comment"></i> 카톡 문의</a>
  </div>
</aside>`
}
