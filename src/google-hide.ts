// ===== 구글 전용 검색 제외 (2026-11-10) =====
// 배경: 방문의 대부분은 네이버에서 백과·용어 페이지로 들어오는데, 구글에서는 대량 생성 구역 때문에
//       사이트 단위 평가가 낮아졌다. 그래서 백과 구역을 "구글 크롤러에게만" 검색 제외로 알린다.
// 방식: 요청 User-Agent 가 구글 크롤러(Googlebot · Google-InspectionTool)이고, 대상 경로이고,
//       200 HTML 응답일 때만 응답 헤더 `X-Robots-Tag: googlebot: noindex` 를 붙인다.
//       - 네이버(Yeti)·Bing·일반 브라우저·AI 봇 응답은 헤더와 본문이 한 글자도 바뀌지 않는다.
//       - HTML 메타 태그, robots.txt, sitemap, canonical, 제목, 본문, 스키마는 건드리지 않는다.
//       - 301·404 에는 붙이지 않는다.
//       - Google-Extended · GoogleOther · AdsBot · Mediapartners 는 대상이 아니다.
// 범위: 이 사이트는 "백과만" — /encyclopedia (목록) 와 /encyclopedia/<용어>.
//       지역(/local)·증상·비용·비교·칼럼(/blog)·외국어(/en) 등 다른 구역은 전부 그대로 둔다.
// 캐시: 이 앱은 응답을 caches.default·KV 에 저장하지 않고, 운영 도메인의 HTML 은 엣지 캐시를 타지 않는다
//       (cf-cache-status: DYNAMIC). 나중에 HTML 엣지 캐시를 켜면 구글용 헤더가 다른 방문자에게
//       재사용되지 않도록 이 헤더를 캐시 바깥에서 붙이도록 바꿔야 한다.
// 되돌리기: isGoogleHiddenPath 가 항상 false 를 돌려주게 하면 끝(재배포).

import type { Context } from 'hono'

const GOOGLE_HIDE_HEADER = 'googlebot: noindex'

/** 구글 검색 크롤러인가 (대소문자 무시). */
export function isGoogleCrawler(userAgent: string | undefined | null): boolean {
  if (!userAgent) return false
  return /googlebot|google-inspectiontool/i.test(userAgent)
}

/** 구글에만 검색 제외할 경로인가. 대상 구역 판정은 이 함수 한 곳에서만 한다. */
export function isGoogleHiddenPath(path: string): boolean {
  return path === '/encyclopedia' || path.startsWith('/encyclopedia/')
}

/** 맨 바깥 미들웨어에서 `await next()` 뒤에 호출한다. */
export function applyGoogleHide(c: Context): void {
  if (!isGoogleHiddenPath(c.req.path)) return
  if (!isGoogleCrawler(c.req.header('User-Agent'))) return
  if (c.res.status !== 200) return
  if (!(c.res.headers.get('Content-Type') || '').includes('text/html')) return
  c.header('X-Robots-Tag', GOOGLE_HIDE_HEADER)
}
