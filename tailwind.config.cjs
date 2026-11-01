// Tailwind 빌드 설정 — 2026-11-01 CDN 실행(cdn.tailwindcss.com)에서 전환. CDN 은 인라인 설정 없이 기본 테마였으므로 테마 확장 없음.
// Tailwind 를 쓰는 화면은 /search(통합 검색)와 404 뿐이다. 두 화면에 함께 그려지는 공통 레이아웃(layout.ts)의 class 도
// CDN 이 그대로 유틸리티로 해석했으므로 content 에 포함한다(빠지면 nav·footer 모양이 달라질 수 있음).
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/search.ts', './src/layout.ts', './src/index.tsx'],
  theme: { extend: {} },
  plugins: [],
}
