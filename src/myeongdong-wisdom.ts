// =====================================================================
// 명동 사랑니 발치 — /local/myeongdong-wisdom (2026-10-14, 명동 진료 안내 6번째 하위 페이지)
// 사실 정보는 레포에 이미 있는 값만 사용: 담당(한승대 원장, symptom-seo 사랑니 통증), 단순·수술적 발치·소염 처치
// (symptom-seo), 건강보험 적용·비용 안내(cost-seo extraction-cost, /fees), CT 확인(treatments general FAQ),
// 위치·진료시간(myeongdong-hub). 의료광고 금지 표현(최고·유일·무통·보장·할인·전후 비교) 쓰지 않는다.
// =====================================================================
import { head, nav, footer, scripts } from './layout'
import { myeongdongCardGrid, MYEONGDONG_CARD_CSS } from './myeongdong-cards'

export const MYEONGDONG_WISDOM_PATH = '/local/myeongdong-wisdom'
export const MYEONGDONG_WISDOM_MODIFIED = '2026-10-14'
const IMG = '/static/img/cards/local-wisdom.jpg'

const FAQ: { q: string; a: string }[] = [
  { q: '사랑니는 모두 뽑아야 하나요?', a: '아닙니다. 바르게 나서 위아래가 맞물리고 칫솔이 닿는 사랑니는 그대로 써도 됩니다. 비스듬히 누워 앞 치아를 밀거나, 반쯤 나와 음식물이 끼고 붓기를 반복하거나, 앞 치아에 충치를 만들고 있다면 발치를 권합니다. 엑스레이를 함께 보며 어느 경우인지 설명드립니다.' },
  { q: '매복 사랑니도 명동 행복한예인치과에서 뽑을 수 있나요?', a: '네. 잇몸이나 뼈 안에 묻힌 매복 사랑니는 먼저 CT로 뿌리와 아래턱 신경의 거리를 확인한 뒤, 잇몸을 열고 치아를 나눠 꺼내는 수술적 발치로 진행합니다. 한승대 대표원장이 진단부터 발치까지 직접 맡습니다.' },
  { q: '사랑니 발치도 건강보험이 되나요?', a: '사랑니를 포함한 발치는 건강보험 적용 항목이고 매복 사랑니도 보험이 적용됩니다. 난이도에 따라 본인부담금이 달라지므로, 대략적인 범위는 발치·사랑니 발치 비용 안내와 비급여 진료비 안내 페이지를 참고해 주세요.' },
  { q: '퇴근 후나 점심시간에 뽑아도 괜찮을까요?', a: '단순 발치는 점심시간 안에 끝나는 경우가 많지만, 매복 사랑니는 발치 후 2~3일 붓기와 통증이 있을 수 있어 다음 날 일정이 가벼운 날을 권합니다. 수요일은 저녁 8시까지 진료하니 퇴근 후 예약도 가능합니다.' },
  { q: '사랑니 4개를 한 번에 뽑을 수 있나요?', a: '일반적으로 한쪽(위·아래 2개)씩 나누어 뽑기를 권합니다. 한쪽으로는 식사를 할 수 있어야 회복이 편하기 때문입니다. 염증이 심하게 부어 있는 상태라면 먼저 소염 처치로 붓기를 가라앉힌 뒤 날을 잡습니다.' },
]

export function myeongdongWisdomPage(): string {
  const domain = 'https://happyyein.kr'
  const url = `${domain}${MYEONGDONG_WISDOM_PATH}`
  const title = '명동 사랑니 발치 - 매복 사랑니는 CT로 신경 위치부터'
  const description = '명동 사랑니 발치 안내. 뽑아야 하는 사랑니와 두어도 되는 사랑니 구분, 매복 사랑니 CT 확인과 수술적 발치, 건강보험 적용, 발치 후 관리. 4호선 명동역 3번 출구 도보 8분, 수요일 20시까지 진료.'

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
      image: { '@type': 'ImageObject', url: `${domain}${IMG}`, width: 1200, height: 630, caption: '명동 사랑니 발치' },
      primaryImageOfPage: { '@type': 'ImageObject', url: `${domain}${IMG}` },
      about: { '@type': 'MedicalProcedure', name: '사랑니 발치', alternateName: ['매복 사랑니 발치', '제3대구치 발치'] },
      mainEntity: { '@id': `${domain}/#organization` },
      publisher: { '@id': `${domain}/#organization` },
      dateModified: MYEONGDONG_WISDOM_MODIFIED,
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.wis-answer'] },
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
  const a = 'color:#2e86c1;font-weight:600;text-decoration:none;'

  return `${head({
    title,
    description,
    path: MYEONGDONG_WISDOM_PATH,
    ogType: 'article',
    ogImage: IMG,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: '명동 사랑니 발치',
    keywords: '명동 사랑니, 명동 사랑니 발치, 명동역 사랑니, 회현역 사랑니 발치, 매복 사랑니 발치, 사랑니 발치 보험, 행복한예인치과',
    jsonLd,
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '명동 치과', url: '/local/myeongdong' },
      { name: '명동 사랑니 발치', url: MYEONGDONG_WISDOM_PATH },
    ],
  })}
<body>
${nav()}
<main class="local-seo-content">
<section class="hero-title" style="background:linear-gradient(135deg,#1a5276 0%,#2e86c1 60%,#3498db 100%);padding:84px 20px 56px;color:#fff;">
  <div style="max-width:900px;margin:0 auto;">
    <nav style="font-size:.85rem;margin-bottom:20px;opacity:.85;" aria-label="현재 위치"><a href="/" style="color:#fff;text-decoration:none;">홈</a><span style="margin:0 8px;">›</span><a href="/local/myeongdong" style="color:#fff;text-decoration:none;">명동 치과</a><span style="margin:0 8px;">›</span><span>명동 사랑니 발치</span></nav>
    <h1 style="font-size:2.5rem;font-weight:800;margin-bottom:8px;line-height:1.25;">명동 사랑니 발치</h1>
    <p style="font-size:1.2rem;opacity:.92;margin:0 0 14px;">뽑을지 둘지부터, 엑스레이를 같이 보며 정합니다</p>
    <p class="wis-answer" style="font-size:1.05rem;line-height:1.8;opacity:.95;max-width:700px;">사랑니가 모두 뽑아야 하는 치아는 아닙니다. 행복한예인치과는 사랑니의 방향과 뿌리, 아래턱 신경과의 거리를 엑스레이·CT로 먼저 확인하고, 발치가 필요할 때만 한승대 대표원장이 직접 뽑습니다. 사랑니 발치는 매복 사랑니를 포함해 건강보험이 적용됩니다.</p>
  </div>
</section>

<article style="max-width:900px;margin:0 auto;padding:36px 20px 60px;">
  <figure style="margin:0 0 28px;">
    <img src="${IMG}" width="1200" height="630" fetchpriority="high" decoding="async" alt="명동 사랑니 발치" style="display:block;width:100%;height:auto;border-radius:18px;box-shadow:0 6px 24px rgba(26,82,118,.12);">
    <figcaption style="margin-top:10px;font-size:.85rem;color:#888;">행복한예인치과 진료실 — 엑스레이를 함께 보며 사랑니 위치를 설명하는 모습</figcaption>
  </figure>

  <h2 style="${h2}">뽑아야 하는 사랑니, 두어도 되는 사랑니</h2>
  <p style="${p}">사랑니는 입안 가장 안쪽에서 20대 전후에 나오는 어금니라 칫솔이 잘 닿지 않고, 턱에 자리가 부족하면 비스듬히 눕거나 잇몸 속에 묻힌 채 남습니다. 그렇다고 모든 사랑니가 문제를 일으키지는 않습니다. 위아래가 바르게 맞물려 음식을 씹는 데 쓰이고 양치가 되는 사랑니는 정기검진으로 지켜보면 됩니다.</p>
  <ul style="list-style:none;padding:0;margin:0 0 12px;">
    <li style="${li}"><strong>사랑니 주위염</strong> — 반쯤 나온 사랑니 주변 잇몸에 음식물이 끼어 붓고, 입 벌리기 힘든 증상이 반복될 때</li>
    <li style="${li}"><strong>앞 치아 충치</strong> — 비스듬히 누운 사랑니가 바로 앞 어금니를 밀거나, 그 사이에 충치가 생겼을 때</li>
    <li style="${li}"><strong>매복 사랑니 주변 낭종</strong> — 뼈 안에 묻힌 사랑니 주위에 물주머니(낭종)가 보일 때</li>
    <li style="${li}"><strong>교정·보철 계획</strong> — 교정이나 어금니 치료 계획에 사랑니가 걸림돌이 될 때</li>
  </ul>
  <p style="${p}">이런 경우에 해당하는지는 엑스레이 한 장으로 대부분 판단할 수 있습니다. 증상이 아직 없더라도 앞 치아에 영향을 주기 시작했다면 통증이 생기기 전에 계획을 세우는 편이 회복도 수월합니다. 증상별 설명은 <a href="/symptoms/wisdom-tooth-pain" style="${a}">사랑니가 아플 때</a>에 정리해 두었습니다.</p>

  <h2 style="${h2}">매복 사랑니는 CT로 신경 위치부터 확인합니다</h2>
  <p style="${p}">아래 사랑니 뿌리 가까이에는 아랫입술과 턱의 감각을 담당하는 신경관이 지나갑니다. 일반 엑스레이에서 뿌리와 신경관이 겹쳐 보이면 CT(3차원 촬영)로 실제 거리를 확인한 뒤 발치 방법을 정합니다. 잘 나와 있는 사랑니는 단순 발치로 끝나지만, 잇몸이나 뼈에 묻힌 사랑니는 잇몸을 열고 치아를 몇 조각으로 나눠 꺼내는 수술적 발치로 진행합니다. 붓기와 염증이 심한 날에는 먼저 소염 처치로 가라앉힌 뒤 날을 다시 잡습니다.</p>
  <p style="${p}">행복한예인치과에서는 통합치의학과 전문의 한승대 대표원장이 사랑니 진단과 발치를 직접 맡습니다. 같은 원장이 임플란트와 발치즉시 임플란트도 진료하고 있어, 사랑니 때문에 앞 어금니가 상한 경우에도 이후 치료까지 한 번에 계획할 수 있습니다.</p>

  <h2 style="${h2}">발치 당일과 그 뒤 며칠</h2>
  <ul style="list-style:none;padding:0;margin:0 0 12px;">
    <li style="${li}">발치 후 거즈는 1~2시간 정도 꼭 물고 계시고, 당일에는 침을 뱉거나 빨대를 쓰지 않습니다.</li>
    <li style="${li}">매복 사랑니는 2~3일 정도 붓기와 통증이 있을 수 있으며, 처방해 드리는 약으로 관리합니다.</li>
    <li style="${li}">당일 음주·흡연·격한 운동은 피하고, 식사는 반대쪽으로 부드러운 음식부터 드십니다.</li>
    <li style="${li}">봉합한 경우 약 1주 뒤 실밥을 풀며, 그때 아무는 상태를 함께 확인합니다.</li>
  </ul>
  <p style="${p}">명동·회현역·시청역 직장인분들은 점심시간이나 수요일 저녁(20:00까지)에 많이 오십니다. 단순 발치는 점심시간 안에 끝나는 경우가 많지만 매복 사랑니는 다음 날 일정이 가벼운 날을 권합니다. 비용은 <a href="/cost/extraction-cost" style="${a}">발치·사랑니 발치 비용 안내</a>와 <a href="/fees" style="${a}">비급여 진료비 안내</a>에서 먼저 보실 수 있습니다.</p>

  <h2 style="${h2}">명동에서 오시는 길</h2>
  <p style="${p}">서울 중구 남대문로9길 51 효덕빌딩 3층 301호입니다. 4호선 명동역 3번 출구에서 시청 방향으로 걸어서 약 8분, 회현역 7번 출구에서 약 6분, 시청역 4·5번 출구에서 약 5분 걸립니다. 월·화·목·금 09:30~18:30, 수요일 09:30~20:00 진료하며 점심시간은 13:00~14:00입니다. 위치·진료시간·의료진은 <a href="/local/myeongdong" style="${a}">명동 치과 종합 안내</a>에, 스케일링·충치·잇몸 진료는 <a href="/treatments/general" style="${a}">일반·예방 진료</a>에 있습니다.</p>

  <section class="faq-section" style="margin-top:48px;">
    <h2 style="${h2}">명동 사랑니 발치 자주 묻는 질문</h2>
    ${FAQ.map(f => `<details style="background:#f8fbff;border:1px solid #d6e9f8;border-radius:12px;margin-bottom:10px;padding:0 18px;">
      <summary style="cursor:pointer;padding:16px 0;font-weight:700;color:#1a5276;font-size:1rem;">${f.q}</summary>
      <p style="margin:0 0 16px;color:#444;line-height:1.8;font-size:.97rem;">${f.a}</p>
    </details>`).join('')}
  </section>

  <section style="margin-top:52px;">
    <h2 style="${h2}">명동 근처 다른 진료 안내</h2>
    ${myeongdongCardGrid('light', 'sib', 'wisdom')}
  </section>

  <div style="margin-top:36px;display:flex;gap:12px;flex-wrap:wrap;">
    <a href="tel:02-756-2828" style="display:inline-block;padding:14px 30px;background:#2e86c1;color:#fff;border-radius:50px;font-weight:700;text-decoration:none;">📞 02-756-2828</a>
    <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener" style="display:inline-block;padding:14px 30px;background:#03c75a;color:#fff;border-radius:50px;font-weight:700;text-decoration:none;">네이버 예약</a>
  </div>
  <p style="margin-top:28px;font-size:.85rem;color:#888;">최종 수정 <time datetime="${MYEONGDONG_WISDOM_MODIFIED}">${MYEONGDONG_WISDOM_MODIFIED}</time> · 개인의 사랑니 상태에 따라 발치 여부와 방법이 달라지므로 진찰 후 결정합니다.</p>
</article>
</main>
${MYEONGDONG_CARD_CSS}
${footer({ hubLink: false })}
${scripts()}
</body></html>`
}
