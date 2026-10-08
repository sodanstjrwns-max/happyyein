// =====================================================================
// "명동 치과" 대표 키워드 허브(/local/myeongdong)로 모으는 내부 링크 (2026-10-08)
// - 앵커 문구는 항상 정확히 "명동 치과", nofollow 없음
// - 한 페이지에 허브 링크 최대 2개(푸터 1 + 본문 1). 허브 자신에는 넣지 않는다.
// - 블로그 상세 끝 안내 문장은 4가지 문형 중 글 id 해시로 고정 선택(글마다 같은 문장 반복 방지)
// - 사실 정보는 레포에 이미 있는 값만: 명동역 3번 출구 도보 약 8분·시청역 약 5분(local-seo 지역 데이터), 수요일 20:00 야간진료(허브 FAQ)
// =====================================================================

export const HUB_PATH = '/local/myeongdong'
export const HUB_ANCHOR = '명동 치과'

export function hubAnchor(style = ''): string {
  return `<a href="${HUB_PATH}"${style ? ` style="${style}"` : ''}>${HUB_ANCHOR}</a>`
}

function hashSeed(seed: string): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h
}

/** 블로그(칼럼) 상세 본문 끝 지역 안내 한 문장. seed = 글 id(또는 slug) */
export function blogHubNote(seed: string, topic?: string): string {
  const a = hubAnchor('color:var(--gold);text-decoration:underline;text-underline-offset:3px;')
  const what = topic ? `${topic} 상담` : '진료 상담'
  const forms = [
    `행복한예인치과는 ${a}를 찾는 명동·시청·을지로 일대 직장인과 주민분들께 ${what} 일정과 진료시간을 안내합니다.`,
    `${a}를 찾으신다면 명동역 3번 출구에서 걸어서 약 8분 거리인 행복한예인치과의 위치와 진료시간을 먼저 확인해 보세요.`,
    `점심시간이나 퇴근 뒤에 ${a}를 알아보시는 분들을 위해 행복한예인치과는 수요일 20:00까지 야간진료를 합니다.`,
    `회현역·시청역 근처에서 ${a}를 찾는 분들께 행복한예인치과의 의료진과 진료 과목, 찾아오는 길을 한곳에 정리해 두었습니다.`,
  ]
  return `<p class="post-hub-note" style="margin:28px 0 0;padding:16px 20px;border-left:3px solid var(--gold);background:rgba(247,186,24,0.06);border-radius:0 12px 12px 0;font-family:var(--font-kr);font-size:0.92rem;line-height:1.8;color:var(--gray-light);">${forms[hashSeed(seed) % forms.length]}</p>`
}
