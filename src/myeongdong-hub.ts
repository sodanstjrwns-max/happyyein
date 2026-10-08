// =====================================================================
// "명동 치과" 대표 키워드 허브 — /local/myeongdong (2026-10-08)
// 위치·찾아오는 길·진료시간·의료진·주요 진료 링크·FAQ. 회현역·시청역은 본문에서 자연스럽게 함께 안내.
// 사실 정보는 레포에 이미 있는 값만 사용: 주소·전화·진료시간(홈/레이아웃 스키마), 출구·도보 시간(local-seo 지역 데이터),
// 의료진 학력(/doctors), 주차·영어 소통·준비물(홈 FAQ), 네이버 플레이스·예약 링크(홈 스키마).
// =====================================================================
import { head, nav, footer, scripts } from './layout'

export const MYEONGDONG_HUB_PATH = '/local/myeongdong'
export const MYEONGDONG_HUB_MODIFIED = '2026-10-08'

const FAQ: { q: string; a: string }[] = [
  { q: '명동역에서 행복한예인치과까지 얼마나 걸리나요?', a: '4호선 명동역 3번 출구에서 시청 방향으로 걸어서 약 8분입니다. 주소는 서울 중구 남대문로9길 51 효덕빌딩 3층 301호입니다.' },
  { q: '회현역이나 남대문시장 쪽에서는 어떻게 오나요?', a: '4호선 회현역 7번 출구에서 걸어서 약 6분, 남대문시장에서는 약 3분 거리입니다. 시청역 4·5번 출구에서도 도보 약 5분입니다.' },
  { q: '진료시간과 야간진료는 어떻게 되나요?', a: '월·화·목·금 09:30~18:30, 수요일은 야간진료로 09:30~20:00까지 진료합니다. 점심시간은 13:00~14:00이며, 마감 1시간 전까지 접수합니다.' },
  { q: '주말이나 공휴일에도 진료하나요?', a: '토·일·공휴일은 휴진입니다. 평일 저녁이 필요하시면 수요일 야간진료(20:00까지)를 이용해 주세요.' },
  { q: '차를 가져가도 되나요?', a: '효덕빌딩 주변 유료 주차장을 이용하실 수 있지만 공간이 제한적입니다. 명동역·회현역·시청역에서 걸어서 5~8분이라 대중교통을 권해 드립니다.' },
  { q: '외국인이나 처음 방문하는 사람도 예약할 수 있나요?', a: '네. 기본적인 영어 소통이 가능하며 전화(02-756-2828)나 네이버 예약으로 예약하시면 됩니다. 신분증과 건강보험증, 다른 치과에서 찍은 엑스레이가 있으면 함께 가져와 주세요.' },
]

export function myeongdongHubPage(): string {
  const domain = 'https://happyyein.kr'
  const url = `${domain}${MYEONGDONG_HUB_PATH}`
  const title = '명동 치과 · 회현역 치과'
  const description = '명동 치과 행복한예인치과 안내. 명동역 3번 출구 도보 8분, 회현역 7번 출구 6분, 시청역 5분. 월·화·목·금 09:30~18:30, 수 20:00까지 야간진료. 임플란트·신경치료·앞니 심미·교정·스케일링, 원장 3인 협진.'

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      '@id': `${url}#webpage`,
      name: `${title} | 행복한예인치과`,
      url,
      description,
      inLanguage: 'ko',
      isPartOf: { '@type': 'WebSite', url: domain },
      about: { '@id': `${domain}/#organization` },
      mainEntity: { '@id': `${domain}/#organization` },
      areaServed: [
        { '@type': 'Place', name: '서울 중구 명동' },
        { '@type': 'Place', name: '회현역·남대문시장' },
        { '@type': 'Place', name: '시청역·소공동' },
        { '@type': 'AdministrativeArea', name: '서울특별시 중구' },
      ],
      publisher: { '@id': `${domain}/#organization` },
      dateModified: MYEONGDONG_HUB_MODIFIED,
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hub-answer'] },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]

  const h2 = 'font-size:1.45rem;font-weight:700;color:#1a5276;margin:44px 0 16px;line-height:1.4;'
  const p = 'font-size:1.02rem;line-height:1.85;color:#444;margin:0 0 12px;'
  const li = 'padding:8px 0;border-bottom:1px solid #e8f0fe;font-size:.98rem;color:#444;line-height:1.7;'
  const td = 'padding:10px 12px;border-bottom:1px solid #e8f0fe;font-size:.98rem;color:#333;'
  const a = 'color:#2e86c1;font-weight:600;text-decoration:none;'

  return `${head({
    title,
    description,
    path: MYEONGDONG_HUB_PATH,
    ogType: 'website',
    keywords: '명동 치과, 회현역 치과, 시청역 치과, 명동역 치과, 남대문시장 치과, 서울 중구 치과, 행복한예인치과',
    jsonLd,
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '지역별 진료 안내', url: '/local' },
      { name: '명동 치과', url: MYEONGDONG_HUB_PATH },
    ],
  })}
<body>
${nav()}
<main class="local-seo-content">
<section class="hero-title" style="background:linear-gradient(135deg,#1a5276 0%,#2e86c1 60%,#3498db 100%);padding:84px 20px 60px;color:#fff;">
  <div style="max-width:900px;margin:0 auto;">
    <nav style="font-size:.85rem;margin-bottom:20px;opacity:.85;" aria-label="현재 위치"><a href="/" style="color:#fff;text-decoration:none;">홈</a><span style="margin:0 8px;">›</span><a href="/local" style="color:#fff;text-decoration:none;">지역별 진료</a><span style="margin:0 8px;">›</span><span>명동 치과</span></nav>
    <h1 style="font-size:2.6rem;font-weight:800;margin-bottom:6px;line-height:1.25;">명동 치과</h1>
    <p style="font-size:1.25rem;font-weight:400;opacity:.92;margin:0 0 14px;">회현역·시청역에서도 걸어서 5~8분, 행복한예인치과</p>
    <p class="hub-answer" style="font-size:1.08rem;line-height:1.8;opacity:.95;max-width:680px;">행복한예인치과는 서울 중구 남대문로9길 51 효덕빌딩 3층에 있는 치과입니다. 명동역 3번 출구에서 약 8분, 회현역 7번 출구에서 약 6분, 시청역 4·5번 출구에서 약 5분 거리이며, 2013년부터 같은 자리에서 진료하고 있습니다.</p>
    <div style="margin-top:26px;display:flex;gap:12px;flex-wrap:wrap;">
      <a href="tel:02-756-2828" style="display:inline-block;padding:14px 30px;background:#fff;color:#1a5276;border-radius:50px;font-weight:700;text-decoration:none;">📞 02-756-2828</a>
      <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener" style="display:inline-block;padding:14px 30px;background:#03c75a;color:#fff;border-radius:50px;font-weight:700;text-decoration:none;">네이버 예약</a>
      <a href="https://map.naver.com/p/entry/place/13148712" target="_blank" rel="noopener" style="display:inline-block;padding:14px 30px;background:rgba(255,255,255,.15);color:#fff;border:2px solid rgba(255,255,255,.5);border-radius:50px;font-weight:600;text-decoration:none;">📍 네이버 지도</a>
    </div>
  </div>
</section>

<article style="max-width:900px;margin:0 auto;padding:20px 20px 60px;">
  <h2 style="${h2}">명동에서 행복한예인치과까지 찾아오는 길</h2>
  <p style="${p}">명동 쇼핑거리나 명동성당 쪽에서 오신다면 명동역을 지나 시청 방향으로 내려오시면 됩니다. 남대문로9길 안쪽 효덕빌딩 3층 301호이며, 큰길에서 한 블록 들어온 골목이라 처음에는 지도를 함께 보시면 편합니다.</p>
  <ul style="list-style:none;padding:0;margin:0 0 12px;">
    <li style="${li}">🚇 <strong>4호선 명동역</strong> 3번 출구 → 시청 방향 도보 약 8분</li>
    <li style="${li}">🚇 <strong>4호선 회현역</strong> 7번 출구 → 도보 약 6분 (남대문시장에서 약 3분)</li>
    <li style="${li}">🚇 <strong>1·2호선 시청역</strong> 4·5번 출구 → 도보 약 5분</li>
    <li style="${li}">🚇 <strong>2호선 을지로입구역</strong> 1번 출구 → 시청 방향 도보 약 7분</li>
    <li style="${li}">🚌 버스 402·405·501·507·7017·7021번 등 남대문로·소공로 정류장 이용</li>
  </ul>
  <p style="${p}">건물 주변에는 유료 주차장이 있지만 공간이 넉넉하지 않아 대중교통을 권해 드립니다. 회현역·남대문시장 쪽 상인분들과 소공동·북창동 직장인분들이 점심시간에 많이 찾으시고, 지하철 4호선 덕분에 사당·노원 방면에서도 갈아타지 않고 오실 수 있습니다.</p>

  <h2 style="${h2}">진료시간 — 수요일은 저녁 8시까지</h2>
  <table style="width:100%;border-collapse:collapse;margin:4px 0 12px;background:#f8fbff;border-radius:12px;overflow:hidden;">
    <tbody>
      <tr><td style="${td}"><strong>월 · 화 · 목 · 금</strong></td><td style="${td}">09:30 ~ 18:30</td></tr>
      <tr><td style="${td}"><strong>수요일 (야간진료)</strong></td><td style="${td}"><strong>09:30 ~ 20:00</strong></td></tr>
      <tr><td style="${td}">점심시간</td><td style="${td}">13:00 ~ 14:00</td></tr>
      <tr><td style="padding:10px 12px;font-size:.98rem;color:#333;">토 · 일 · 공휴일</td><td style="padding:10px 12px;font-size:.98rem;color:#333;">휴진</td></tr>
    </tbody>
  </table>
  <p style="${p}">마감 1시간 전까지 접수를 받습니다. 예약제로 운영하고 있어 전화나 네이버 예약으로 시간을 잡고 오시면 기다리는 시간이 줄어듭니다. 점심시간(13:00~14:00)을 피해 예약하시면 직장인분들도 짧게 다녀가실 수 있습니다.</p>

  <h2 style="${h2}">어떤 원장이 진료하나요?</h2>
  <ul style="list-style:none;padding:0;margin:0 0 12px;">
    <li style="${li}"><strong>한승대 대표원장</strong> — 보건복지부 인증 통합치의학과 전문의, 경희대학교 치의학 박사. 임플란트와 발치즉시 임플란트, 앞니 심미치료를 맡고 있습니다.</li>
    <li style="${li}"><strong>박미나 원장</strong> — 치과보존과 진료(연세대 보존과 석사). 미세현미경을 활용한 신경치료와 자연치아 보존 치료를 맡고 있습니다.</li>
    <li style="${li}"><strong>박현미 원장</strong> — 교정과 전문의. 투명교정(인비절라인), 설측교정, 성인 교정을 맡고 있습니다.</li>
  </ul>
  <p style="${p}">분야가 다른 원장 세 명이 한 치과에서 함께 진료하기 때문에, 예를 들어 신경치료 뒤 크라운이나 교정 뒤 앞니 모양 다듬기처럼 여러 분야가 이어지는 치료도 한곳에서 계획할 수 있습니다. 자세한 약력은 <a href="/doctors" style="${a}">의료진 소개</a>에 있습니다.</p>

  <h2 style="${h2}">명동 치과에서 주로 찾는 진료</h2>
  <ul style="list-style:none;padding:0;margin:0 0 12px;">
    <li style="${li}"><a href="/treatments/implant" style="${a}">임플란트</a> — 조건이 맞으면 발치와 같은 날 심는 발치즉시 임플란트 (<a href="/local/myeongdong-implant" style="${a}">명동 임플란트 안내</a>)</li>
    <li style="${li}"><a href="/treatments/preservation" style="${a}">신경치료·보존치료</a> — 충치·금 간 치아를 살리는 치료 (<a href="/local/hoehyeon-preservation" style="${a}">회현역 신경치료 안내</a>)</li>
    <li style="${li}"><a href="/treatments/aesthetic" style="${a}">앞니 심미치료</a> — 라미네이트·레진·미백 (<a href="/local/myeongdong-aesthetic" style="${a}">명동 라미네이트 안내</a>)</li>
    <li style="${li}"><a href="/treatments/orthodontics" style="${a}">치아교정</a> — 투명교정·설측교정 (<a href="/local/myeongdong-orthodontics" style="${a}">명동 교정 안내</a>)</li>
    <li style="${li}"><a href="/treatments/general" style="${a}">스케일링·잇몸치료·정기검진</a> — 만 19세 이상 연 1회 스케일링 건강보험 적용 (<a href="/local/myeongdong-general" style="${a}">명동 스케일링·잇몸치료 안내</a>)</li>
  </ul>
  <p style="${p}">비급여 진료비는 <a href="/fees" style="${a}">비급여 진료비 안내</a>에 공개해 두었고, 치료 전에 엑스레이를 함께 보며 꼭 필요한 치료와 지켜봐도 되는 부분을 나눠 설명드립니다. 증상별로 먼저 알아보고 싶다면 <a href="/symptoms" style="${a}">증상별 안내</a>와 <a href="/encyclopedia" style="${a}">치과 백과사전</a>도 참고해 주세요.</p>

  <h2 style="${h2}">처음 오시는 분께</h2>
  <p style="${p}">신분증과 건강보험증을 챙겨 오시고, 다른 치과에서 찍은 엑스레이나 진료 기록이 있으면 함께 가져오시면 진단에 도움이 됩니다. 예약 시간 10분 전에 오시면 접수와 문진표 작성을 여유 있게 마칠 수 있습니다. 명동을 찾은 외국인 방문객도 기본적인 영어로 상담할 수 있으니 전화로 미리 알려 주세요.</p>

  <section class="faq-section" style="margin-top:48px;">
    <h2 style="${h2}">명동 치과 자주 묻는 질문</h2>
    ${FAQ.map(f => `<details style="background:#f8fbff;border:1px solid #d6e9f8;border-radius:12px;margin-bottom:10px;padding:0 18px;">
      <summary style="cursor:pointer;padding:16px 0;font-weight:700;color:#1a5276;font-size:1rem;">${f.q}</summary>
      <p style="margin:0 0 16px;color:#444;line-height:1.8;font-size:.97rem;">${f.a}</p>
    </details>`).join('')}
  </section>

  <p style="margin-top:36px;font-size:.85rem;color:#888;">최종 수정 <time datetime="${MYEONGDONG_HUB_MODIFIED}">${MYEONGDONG_HUB_MODIFIED}</time> · 진료시간·휴진은 <a href="/notice" style="${a}">공지사항</a>에서 먼저 안내합니다.</p>
</article>
</main>
${footer()}
${scripts()}
</body></html>`
}
