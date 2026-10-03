import { Hono } from 'hono'
import { renderTreatmentPage } from './treatments'
import { philosophyPage, doctorsPage, experiencePage, locationPage } from './pages'
import { boardListPage, boardDetailPage, boardWritePage, boardEditPage, relatedForTreatment, fetchLitePosts } from './board-pages'
import { treatmentForPost, kstYmd } from './column-seo'
import { uploadApi, imagesApi } from './api-upload'
import boardsApi from './api-boards'
import authApi, { requireAdmin } from './api-auth'
import userAuthApi from './api-user-auth'
import { adminLoginPage, adminDashboardPage } from './admin-pages'
import statsApp from './stats-page'
import { registerPage, loginPage } from './auth-pages'
import { encyclopediaListPage, encyclopediaDetailPage } from './encyclopedia'
import autoBlogApi, { handleScheduled, notifySearchEngines } from './auto-blog'
import { renderLocalSeoPage, localSeoIndexPage, getAllLocalSeoSlugs } from './local-seo'
import { renderSymptomPage, symptomIndexPage, getAllSymptomSlugs } from './symptom-seo'
import { renderCostPage, costIndexPage, getAllCostSlugs } from './cost-seo'
import { renderComparisonPage, comparisonIndexPage, getAllComparisonSlugs } from './comparison-seo'
import { terms as encyclopediaTerms } from './encyclopedia'
import indexingApi, { indexingDashboardPage } from './indexing-monitor'
import { renderForeignSeoPage, foreignEmergencyIndexPage, getAllForeignSeoSlugs } from './foreign-emergency-seo'
import { englishMainPage } from './en-main'
import { generateLlmsTxt, generateLlmsFullTxt } from './llms-txt'
import { renderSearchPage } from './search'
import feesApi, { getPublishedFees } from './api-fees'
import { feesPublicPage, feesAdminPage } from './fees-page'

type Bindings = { DB: D1Database; R2: R2Bucket; OPENAI_API_KEY?: string; OPENAI_BASE_URL?: string; AUTO_BLOG_SECRET?: string }
const app = new Hono<{ Bindings: Bindings }>()

// ===== A4: www → 비www 301 통일 (canonical 정합성) =====
app.use('*', async (c, next) => {
  const url = new URL(c.req.url)
  if (url.hostname === 'www.happyyein.kr') {
    url.hostname = 'happyyein.kr'
    url.protocol = 'https:'
    return c.redirect(url.toString(), 301)
  }
  await next()
})

// ===== 분석 태그 보강: 태그가 빠진 공개 HTML 페이지에 GA4·Clarity·비콘 삽입 =====
// 메인(/)과 /en 템플릿에만 태그가 있어 한국어 하위 페이지(블로그·백과·진료 등)가 집계되지 않던 문제 (2026-09-29)
const ANALYTICS_TAGS = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XLNXRXGGJM"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XLNXRXGGJM',{anonymize_ip:true});</script>
<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","yc827a3fst");</script>
<script defer src="https://pf-dashboard-2nt.pages.dev/beacon.js"></script>
`
app.use('*', async (c, next) => {
  await next()
  const path = c.req.path
  if (path.startsWith('/admin') || path.startsWith('/api/') || path.startsWith('/stats')) return
  if (!(c.res.headers.get('Content-Type') || '').includes('text/html')) return
  const html = await c.res.clone().text()
  if (html.includes('G-XLNXRXGGJM') || !html.includes('</head>')) return
  const res = new Response(html.replace('</head>', ANALYTICS_TAGS + '</head>'), c.res)
  res.headers.delete('Content-Length')
  c.res = undefined
  c.res = res
})

// ===== 보안 헤더 미들웨어 (SEO/보안 최적화) =====
app.use('*', async (c, next) => {
  await next()
  // 보안 헤더
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'SAMEORIGIN')
  c.header('X-XSS-Protection', '1; mode=block')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self "https://map.naver.com" "https://maps.google.com"), payment=()')
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  c.header('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://pf-dashboard-2nt.pages.dev https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://openapi.map.naver.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: https: blob:; connect-src 'self' https:; frame-src https://map.naver.com https://maps.google.com https://www.google.com;")
  c.header('X-DNS-Prefetch-Control', 'on')
  // 정적 리소스 캐싱
  const path = c.req.path
  if (path.startsWith('/static/')) {
    c.header('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (path === '/robots.txt' || path === '/sitemap.xml' || path === '/llms.txt' || path === '/llms-full.txt' || path === '/feed.xml') {
    c.header('Cache-Control', 'public, max-age=86400')
  } else {
    c.header('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400')
  }
})

app.get('/', (c) => {
  const SITE_DOMAIN = 'https://happyyein.kr';
  const mainDesc = '서울 시청역·명동·을지로·광화문에서 도보 5~10분. 13년간 한자리에서 쌓아온 신뢰의 치과. 발치즉시 임플란트 80%+, 보존과·교정과 원장 3인 협진. 수요일 야간진료. 행복한예인치과 02-756-2828.';
  const mainTitle = '행복한예인치과 | 시청역·명동·을지로 치과 - 임플란트·보존·심미·교정 전문의 협진';
  const ogImage = `${SITE_DOMAIN}/static/img/dr-han-logo.jpg`;
  const today = '2026-06-11'; // CONTENT_REVIEWED — 메인페이지 dateModified용 고정 검수일

  // 1) Dentist + LocalBusiness 통합 스키마
  const orgJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalOrganization", "LocalBusiness"],
    "@id": `${SITE_DOMAIN}/#organization`,
    "name": "행복한예인치과",
    "alternateName": ["Happy Yein Dental Clinic", "행복한예인치과의원"],
    "url": SITE_DOMAIN,
    "logo": { "@type": "ImageObject", "url": `${SITE_DOMAIN}/static/img/logo.png`, "width": 512, "height": 512 },
    "image": [ogImage, `${SITE_DOMAIN}/static/img/dr-han-profile.jpg`],
    "telephone": "+82-2-756-2828",
    "email": "yein2828@naver.com",
    "foundingDate": "2013",
    "description": mainDesc,
    "slogan": "내 가족에게 권할 수 없는 치료는 시작도 하지 않습니다",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "남대문로9길 51 효덕빌딩 3층 301호",
      "addressLocality": "중구",
      "addressRegion": "서울특별시",
      "postalCode": "04530",
      "addressCountry": "KR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 37.566, "longitude": 126.978 },
    "hasMap": "https://map.naver.com/p/entry/place/13148712", // 레포의 네이버 예약 링크(naver.me/G0DXGZbi)가 가리키는 실제 플레이스 (2026-09-29)
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Thursday","Friday"], "opens": "09:30", "closes": "18:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:30", "closes": "20:00", "description": "수요일 야간진료" }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "KRW",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "areaServed": [
      { "@type": "City", "name": "서울특별시" },
      { "@type": "AdministrativeArea", "name": "중구" },
      { "@type": "AdministrativeArea", "name": "종로구" },
      { "@type": "AdministrativeArea", "name": "용산구" },
      { "@type": "AdministrativeArea", "name": "마포구" },
      { "@type": "AdministrativeArea", "name": "영등포구" },
      { "@type": "AdministrativeArea", "name": "강남구" },
      { "@type": "AdministrativeArea", "name": "서초구" },
      { "@type": "AdministrativeArea", "name": "성동구" },
      { "@type": "AdministrativeArea", "name": "동대문구" },
      { "@type": "AdministrativeArea", "name": "광진구" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "행복한예인치과 진료 서비스",
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "발치즉시 임플란트 (시청역·명동·을지로)", "description": "발치와 동시에 임플란트를 식립하여 치료 기간을 획기적으로 단축" },
        { "@type": "OfferCatalog", "name": "치아보존치료·신경치료 (보존과 담당 원장)", "description": "보존과 담당 원장가 직접 시행하는 정밀 신경치료" },
        { "@type": "OfferCatalog", "name": "투명교정·인비절라인 (교정과 전문의)", "description": "교정과 전문의의 체계적인 투명교정 치료" },
        { "@type": "OfferCatalog", "name": "앞니 심미치료·라미네이트", "description": "최소삭제 라미네이트, 레진 심미보철" },
        { "@type": "OfferCatalog", "name": "스케일링·정기검진·충치치료", "description": "직장인을 위한 효율적인 예방 진료" }
      ]
    },
    "medicalSpecialty": ["Dentistry", "Oral Surgery", "Orthodontics", "Endodontics", "Prosthodontics"],
    "availableService": [
      { "@type": "MedicalProcedure", "name": "발치즉시 임플란트", "procedureType": "Surgical" },
      { "@type": "MedicalProcedure", "name": "치아보존치료(신경치료)", "procedureType": "Noninvasive" },
      { "@type": "MedicalProcedure", "name": "치아교정(투명교정, 설측교정)", "procedureType": "Noninvasive" },
      { "@type": "MedicalProcedure", "name": "앞니 심미치료(라미네이트, 레진)", "procedureType": "Noninvasive" },
      { "@type": "MedicalProcedure", "name": "일반진료(스케일링, 충치치료)", "procedureType": "Noninvasive" }
    ],
    "member": [
      {
        "@type": "Physician",
        "@id": `${SITE_DOMAIN}/#dr-han`,
        "name": "한승대",
        "jobTitle": "대표원장",
        "description": "통합치의학과 전문의, 치의학 박사. 경희대 치의학전문대학원 졸업. NYU Implant Institute 수료.",
        "medicalSpecialty": "Integrative Dentistry",
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "고려대학교" },
          { "@type": "CollegeOrUniversity", "name": "경희대학교 치의학전문대학원" }
        ],
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "보건복지부 인증 통합치의학과 전문의" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "치의학 박사 (Ph.D.)" }
        ]
      },
      {
        "@type": "Physician",
        "@id": `${SITE_DOMAIN}/#dr-park-mina`,
        "name": "박미나",
        "jobTitle": "보존과 담당 원장",
        "description": "치과보존과 담당. 연세대 보존과 석사, 세브란스 보존과 수련, 연세대 치과보존과 외래교수 역임.",
        "medicalSpecialty": "Endodontics"
      },
      {
        "@type": "Physician",
        "@id": `${SITE_DOMAIN}/#dr-park`,
        "name": "박현미",
        "jobTitle": "교정 전문의",
        "description": "교정과 전문의. 연세대 치의학대학원 교정과 석사. 인비절라인 투명교정 수료.",
        "medicalSpecialty": "Orthodontics"
      }
    ],
    "sameAs": [
      "https://blog.naver.com/yein2828",
      "https://naver.me/G0DXGZbi",
      "https://map.naver.com/p/entry/place/13148712",
      "http://pf.kakao.com/_Nxfczxh",
      "https://place.map.kakao.com/7840173"
    ],
    "contactPoint": [
      { "@type": "ContactPoint", "telephone": "+82-2-756-2828", "contactType": "reservations", "availableLanguage": ["Korean", "English"], "contactOption": "TollFree" },
      { "@type": "ContactPoint", "url": "http://pf.kakao.com/_Nxfczxh", "contactType": "customer support", "description": "카카오톡 채널 문의 — 진료시간 내 30분 이내 답변" }
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://naver.me/G0DXGZbi",
        "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
        "inLanguage": "ko"
      },
      "result": { "@type": "Reservation", "name": "행복한예인치과 진료 예약" }
    }
  });

  // 2) FAQPage — 화면 FAQ(#faqList)와 스키마를 한 배열에서 렌더 (문항·답변 1:1 동일, 2026-09-29)
  //    기존: 스키마 전용 70문항(화면과 다른 문장) + 화면 마이크로데이터 FAQPage 중복 → 화면 문장으로 통일
  const escFaq = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const mainFaqData: { cat: string; q: string; a: string }[] = [
    {"cat": "basic", "q": "행복한예인치과는 어디에 있나요?", "a": "서울특별시 중구 남대문로9길 51 효덕빌딩 3층 301호에 위치합니다. 시청역 5분, 명동역 8분, 을지로입구역 7분, 회현역 6분, 서울역 12분 거리입니다. 광화문·종로·충무로에서도 10분 이내입니다."},
    {"cat": "basic", "q": "진료시간은 어떻게 되나요?", "a": "월·화·목·금 09:30~18:30, 수요일은 야간진료로 09:30~20:00까지 진료합니다. 점심시간은 13:00~14:00이며, 토·일·공휴일은 휴진입니다. 마감 1시간 전까지 접수 가능합니다."},
    {"cat": "basic", "q": "어떤 전문의가 있나요?", "a": "한승대 대표원장(보건복지부 인증 통합치의학과 전문의, 치의학 박사), 박미나 원장(치과보존과, 연세대 보존과 석사), 박현미 원장(교정과 전문의) 3인의 원장이 각 분야를 직접 진료합니다."},
    {"cat": "basic", "q": "예약은 어떻게 하나요?", "a": "전화(02-756-2828) 또는 네이버 예약으로 예약하실 수 있습니다. 수요일 야간진료도 예약 가능합니다. 예약 시간을 지켜주시면 대기 시간 없이 바로 진료받으실 수 있습니다."},
    {"cat": "basic", "q": "행복한예인치과의 진료 철학이 궁금해요.", "a": "'내 가족에게 권할 수 없는 치료는 시작도 하지 않습니다'가 행복한예인치과의 진료 철학입니다. 과장 없는 진료, X-ray 앞에서 투명한 설명, 환자 존중을 기본으로 13년간 같은 자리에서 신뢰를 쌓아왔습니다."},
    {"cat": "basic", "q": "주차가 가능한가요?", "a": "효덕빌딩 주변 유료 주차장을 이용하실 수 있습니다. 다만 주차 공간이 제한적이므로 대중교통 이용을 권장합니다. 시청역(1·2호선) 도보 5분, 명동역(4호선) 8분, 을지로입구역(2호선) 7분이면 오실 수 있습니다."},
    {"cat": "basic", "q": "초진(첫 방문) 시 무엇을 준비해야 하나요?", "a": "신분증과 건강보험증을 지참해 주시면 됩니다. 다른 치과에서 받은 X-ray나 진료기록이 있으면 함께 가져오시면 더 정확한 진단에 도움이 됩니다. 예약 시간 10분 전에 내원하시면 접수와 문진표 작성을 여유 있게 진행할 수 있습니다."},
    {"cat": "basic", "q": "건강보험 적용이 되나요?", "a": "네, 행복한예인치과는 건강보험 적용 치과입니다. 스케일링(연 1회), 충치치료, 신경치료, 발치, 잇몸치료 등 보험 적용 항목에 대해 건강보험 혜택을 받으실 수 있습니다. 임플란트, 라미네이트, 교정 등 일부 항목은 비급여입니다."},
    {"cat": "treatment", "q": "발치즉시 임플란트란 무엇인가요?", "a": "발치즉시 임플란트는 치아를 발치하는 동시에 임플란트를 식립하는 시술입니다. 별도의 치유 기간(3~6개월) 없이 바로 진행하여 전체 치료 기간을 크게 단축합니다. 행복한예인치과 한승대 원장은 80% 이상의 케이스에서 즉시식립을 시행합니다."},
    {"cat": "treatment", "q": "임플란트 비용은 얼마인가요?", "a": "임플란트 비용은 식립 위치, 골이식(잇몸뼈 이식) 필요 여부, 보철물(씌우는 치아) 종류에 따라 달라집니다. CT 촬영과 정밀 진단 후 정확한 비용을 투명하게 안내해 드립니다. 과잉 진료 없이 꼭 필요한 시술만 제안드리며, 분할 납부 상담도 가능합니다."},
    {"cat": "treatment", "q": "신경치료는 얼마나 아픈가요?", "a": "충분한 마취 후 치료를 진행하므로 시술 중 통증은 거의 없습니다. 표면 마취제를 먼저 도포하여 주사 통증까지 최소화합니다. 보존과 박미나 원장이 미세현미경을 활용하여 정밀하게 시술하므로 불필요한 자극이 줄어듭니다."},
    {"cat": "treatment", "q": "치아 교정은 성인도 가능한가요?", "a": "물론입니다. 성인 교정은 매우 흔하며, 치조골(잇몸뼈) 상태만 건강하다면 나이에 관계없이 가능합니다. 박현미 원장(교정 전문의)은 투명교정(인비절라인), 설측교정 등 티 안 나는 교정을 제공합니다."},
    {"cat": "treatment", "q": "투명교정(인비절라인)과 일반 교정의 차이는?", "a": "일반 교정(브라켓)은 치아에 장치를 부착하고, 투명교정(인비절라인)은 투명한 틀을 착용합니다. 투명교정은 외관상 거의 보이지 않고 탈착이 가능하여 직장인에게 인기가 많습니다. 교정과 전문의가 케이스에 맞는 최적의 방식을 추천해 드립니다."},
    {"cat": "treatment", "q": "라미네이트와 레진 치료의 차이는?", "a": "레진은 치아에 직접 재료를 쌓아올려 즉일 완성하는 방식이고, 라미네이트는 세라믹 쉘을 제작하여 접착합니다. 레진은 비용이 낮고 즉시 결과를, 라미네이트는 내구성과 심미성이 뛰어납니다. 행복한예인치과에서는 최소 삭제를 원칙으로 합니다."},
    {"cat": "treatment", "q": "스케일링은 아프나요? 얼마나 자주 받아야 하나요?", "a": "스케일링은 약간의 시림 증상이 있을 수 있지만 통증은 거의 없습니다. 건강보험 기준 연 1회 보험 적용이 가능하며, 잇몸 상태에 따라 6개월~1년 간격을 권장합니다. 시청역·명동·을지로 직장인분들이 점심시간에 많이 이용하십니다."},
    {"cat": "treatment", "q": "치과 공포증이 있는데 진료받을 수 있을까요?", "a": "물론 가능합니다. 치료 전 충분한 설명, 표면 마취를 통한 통증 최소화, 시술 중 지속적인 소통으로 불안감을 줄입니다. '생각보다 안 아팠다'는 후기가 가장 많습니다."},
    {"cat": "location", "q": "시청역 근처에서 좋은 치과를 찾고 있어요.", "a": "행복한예인치과는 1·2호선 시청역 4번·5번 출구에서 도보 5분 거리입니다. 2013년부터 13년간 같은 자리에서 운영하며 전문의 3명이 협진합니다. 환자 리뷰 458건, 발치즉시 임플란트 성공률 80% 이상입니다. 전화 02-756-2828로 예약해 주세요."},
    {"cat": "location", "q": "명동 근처에서 임플란트 잘하는 치과를 찾고 있어요.", "a": "명동에서 도보 8분 거리에 있는 행복한예인치과는 발치즉시 임플란트 전문 치과입니다. 80% 이상 즉시식립, 통합치의학과 전문의가 직접 수술합니다. 4호선 명동역 3번 출구에서 시청 방향으로 도보 8분입니다."},
    {"cat": "location", "q": "을지로 근처 신경치료 잘하는 치과 있나요?", "a": "을지로입구역에서 도보 7분 거리에 보존과 박미나 원장이 미세현미경 정밀 신경치료를 직접 시행합니다. 자연 치아를 최대한 살리는 보존 치료 전문입니다. 2호선 을지로입구역 1번 출구에서 시청 방향으로 도보 7분입니다."},
    {"cat": "location", "q": "광화문·종로에서 가까운 교정 치과를 찾고 있어요.", "a": "광화문역에서 도보 10분, 종로에서 10분 이내에 행복한예인치과가 있습니다. 교정과 전문의 박현미 원장이 인비절라인 투명교정부터 설측교정까지 직접 진료합니다. 5호선 광화문역 6번 출구에서 남쪽으로 내려오시면 됩니다."},
    {"cat": "location", "q": "서울역 근처에서 야간진료 하는 치과 있나요?", "a": "서울역에서 도보 12분, 1호선 한 정거장 거리에 있는 행복한예인치과는 매주 수요일 야간진료(09:30~20:00)를 시행합니다. 바쁜 직장인도 퇴근 후 진료를 받으실 수 있습니다."},
    {"cat": "location", "q": "회현역·남대문시장 근처 치과를 찾고 있어요.", "a": "4호선 회현역에서 도보 6분, 남대문시장에서 도보 3분 거리에 행복한예인치과가 있습니다. 13년간 같은 자리에서 운영하며 전문의 3명이 협진합니다. 남대문로9길 51 효덕빌딩 3층입니다."},
    {"cat": "location", "q": "충무로역 근처 치과를 찾고 있어요.", "a": "3·4호선 충무로역에서 도보 10분 거리에 행복한예인치과가 있습니다. 충무로에서 명동·남대문 방향으로 이동하면 접근 가능합니다. 발치즉시 임플란트, 보존치료, 교정 등 전문의 협진 체제로 운영합니다."},
    {"cat": "location", "q": "북창동·다동·무교동에서 가까운 치과가 있나요?", "a": "행복한예인치과는 북창동에서 도보 3~5분, 다동·무교동에서 도보 5~7분 거리입니다. 서울시청·덕수궁 바로 남쪽, 남대문로9길 51 효덕빌딩 3층에 위치합니다. 전문의 3인 협진 치과입니다."},
    {"cat": "location", "q": "소공동·남산에서 가까운 치과를 찾고 있어요.", "a": "소공동에서 도보 약 8분, 남산(한옥마을)에서 도보 약 12분 거리에 행복한예인치과가 있습니다. 시청역·명동역 사이에 위치하여 소공동·남산 주변에서 접근이 편리합니다."},
    {"cat": "location", "q": "을지로3가·을지로4가에서 어떻게 가나요?", "a": "2호선 을지로3가역·을지로4가역에서 을지로입구역 방향으로 한두 정거장 이동 후, 1번 출구에서 시청 방향 도보 7분이면 도착합니다. 명동역(4호선) 경유 도보 8분으로도 올 수 있습니다."},
    {"cat": "location", "q": "서울 중구에서 전문의가 직접 진료하는 치과를 찾고 있어요.", "a": "행복한예인치과는 서울 중구 남대문로에 위치하며, 통합치의학과 전문의, 보존과, 교정과 3인의 원장이 직접 진료합니다. 각 분야 담당 원장이 직접 시술하므로 안심하고 진료받으실 수 있습니다. 전화 02-756-2828."},
    {"cat": "location", "q": "명동·을지로 직장인인데 점심시간에 진료받을 수 있나요?", "a": "시청역·명동·을지로 직장인 밀집 지역에 위치하여 점심시간 진료가 가능합니다. 점심시간(13:00~14:00) 외 시간에 예약하시면 대기 없이 빠른 진료가 가능합니다. 수요일은 야간진료(~20:00)도 가능합니다."},
    {"cat": "life", "q": "수요일 야간진료는 몇 시까지 하나요?", "a": "매주 수요일 저녁 8시(20:00)까지 진료합니다. 시청역·명동·을지로·광화문 직장인분들이 퇴근 후 많이 이용하십니다. 야간진료 마감 1시간 전(19:00)까지 접수 가능합니다. 전화 02-756-2828로 예약하세요."},
    {"cat": "life", "q": "사회초년생 할인이 있나요?", "a": "사회초년생 등 젊은 직장인분들을 위한 배려 프로그램을 운영하고 있습니다. 자세한 내용은 내원 상담 시 안내해 드립니다. 과잉 진료 없이 꼭 필요한 치료만 제안하는 것이 기본 원칙입니다."},
    {"cat": "life", "q": "환자 후기가 궁금해요.", "a": "네이버 등 온라인에 458건 이상의 환자 리뷰가 등록되어 있으며, 평균 4.9점입니다. '생각보다 안 아팠다', '설명이 자세하다', '불필요한 치료를 권하지 않아 신뢰가 간다' 등의 후기가 가장 많습니다."},
    {"cat": "life", "q": "행복한예인치과는 언제 개원했나요?", "a": "2013년에 서울 중구 남대문로에서 개원하여, 2026년 현재 13년간 같은 자리에서 진료를 이어오고 있습니다. 변하지 않는 곳에서 변함없는 원칙으로 진료합니다."},
    {"cat": "life", "q": "외국어 진료가 가능한가요?", "a": "기본적인 영어 소통이 가능합니다. 시청역·명동·을지로 지역 특성상 외국인 환자분도 방문하시며, 사전에 전화(02-756-2828)로 문의해 주시면 더 원활한 진료 준비가 가능합니다."},
    {"cat": "life", "q": "카드 결제, 분할 납부가 가능한가요?", "a": "신용카드·체크카드 결제와 무이자 할부가 가능합니다. 임플란트, 교정 등 고액 치료의 경우 분할 납부 상담도 가능합니다. 자세한 결제 방법은 내원 시 안내해 드립니다."},
    {"cat": "life", "q": "어린이 치과 진료도 가능한가요?", "a": "네, 어린이 충치치료, 정기검진, 실란트 등 소아 치과 진료도 가능합니다. 아이가 치과에 대한 두려움을 갖지 않도록 부드럽고 친절한 진료를 지향합니다. 가족 단위 방문도 환영합니다."},
    {"cat": "basic", "q": "행복한예인치과에서 진료 가능한 과목은?", "a": "임플란트, 보존치료(신경치료·충치치료), 앞니 심미치료(라미네이트·레진), 치아교정(투명교정·설측교정), 일반진료(스케일링·정기검진·잇몸치료), 사랑니 발치 등 치과 전 분야가 가능합니다."},
    {"cat": "basic", "q": "의료진의 학력이 궁금해요.", "a": "한승대 원장(고려대 졸업, 경희대 치의학 박사), 박미나 원장(연세대 치의학과 졸업, 연세대 보존과 석사), 박현미 원장(연세대 졸업, 연세대 교정과 석사). 각 분야를 전공한 원장이 직접 진료합니다."},
    {"cat": "basic", "q": "진료 환경과 장비는 어떤가요?", "a": "CBCT(3차원 CT)로 신경관 위치를 0.1mm 단위로 확인하고, 미세현미경으로 육안의 20배까지 확대해 신경치료합니다. 독립된 진료실로 프라이버시를 보장합니다."},
    {"cat": "basic", "q": "상담만 받을 수도 있나요?", "a": "물론입니다. 상담만 받고 치료 여부는 충분히 생각하신 후 결정하셔도 됩니다. X-ray 촬영 후 현재 상태와 치료 옵션을 투명하게 설명해 드립니다."},
    {"cat": "basic", "q": "예약 없이 방문해도 되나요?", "a": "예약제 운영이므로 사전 예약을 권장합니다. 응급 상황(극심한 통증, 외상)은 내원 시 최대한 수용합니다. 전화 02-756-2828로 예약해 주세요."},
    {"cat": "basic", "q": "치과 위생사도 전문 교육을 받나요?", "a": "네, 전 직원이 면허 소지자이며 정기적으로 내부 교육과 외부 세미나를 수료합니다. 스케일링, 환자 안내, 감염 관리 등 모든 업무에서 전문성을 유지합니다."},
    {"cat": "basic", "q": "위생·감염 관리 기준은 어떤가요?", "a": "오토클레이브로 기구를 철저히 멸균하며, 1인 1팩 포장 기구 사용, 일회용 커버·글러브 환자마다 교체, 진료실 표면 소독과 공기 정화를 매 진료 후 시행합니다."},
    {"cat": "basic", "q": "다른 치과에서 받던 치료를 이어서 받을 수 있나요?", "a": "가능합니다. 임플란트, 교정, 보존치료 등을 이어서 진행할 수 있습니다. 기존 X-ray나 진료 기록을 가져오시면 더 정확한 연속 치료가 가능합니다."},
    {"cat": "treatment", "q": "임플란트 수명은 얼마나 되나요?", "a": "관리에 따라 10~20년 이상 사용 가능하며, 정기 검진과 올바른 구강 관리를 병행하면 반영구적으로 유지됩니다."},
    {"cat": "treatment", "q": "골이식(잇몸뼈 이식)이 필요하다는데 꼭 해야 하나요?", "a": "뼈가 부족한 경우 임플란트 장기 안정성을 위해 골이식(잇몸뼈 이식)이 필요합니다. 한승대 원장은 상악동(위턱 공간) 거상술, 블록본 이식 등 고난이도 골이식(잇몸뼈 이식) 경험이 풍부합니다."},
    {"cat": "treatment", "q": "잇몸병(치주질환) 치료는 어떻게 하나요?", "a": "스케일링과 치근 활택술로 시작하며, 심한 경우 잇몸 수술이 필요할 수 있습니다. 단계적 치료와 함께 가정 관리 방법도 안내합니다."},
    {"cat": "treatment", "q": "앞니가 벌어졌는데 어떤 치료가 좋을까요?", "a": "레진 본딩, 라미네이트, 교정 등 다양한 방법이 있으며, 벌어진 정도와 교합 상태에 따라 최적의 방법이 달라집니다. 상담 시 각 옵션의 장단점과 비용을 안내합니다."},
    {"cat": "treatment", "q": "치아 미백은 안전한가요?", "a": "전문 치과에서 시행하는 미백은 안전합니다. 일시적 시림이 있을 수 있으나 자연 소실됩니다. 오피스 블리칭과 홈 블리칭 모두 가능합니다."},
    {"cat": "treatment", "q": "임플란트와 브릿지 중 뭐가 좋은가요?", "a": "임플란트는 인접 치아 비손상, 브릿지는 빠른 시술과 낮은 비용이 장점입니다. 구강 상태·예산·선호에 맞춰 전문의가 최적의 방법을 제안합니다."},
    {"cat": "treatment", "q": "사랑니를 꼭 뽑아야 하나요?", "a": "바르게 나서 기능하면 유지 가능하지만, 비스듬히 나거나 충치·염증이 반복되면 발치를 권합니다. X-ray로 정확한 위치 확인 후 안내합니다."},
    {"cat": "treatment", "q": "충치 치료 후 이가 시린 건 정상인가요?", "a": "깊은 충치 치료 후 일시적 시림은 정상이며 1~2주 내 완화됩니다. 3주 이상 지속되면 재내원해 주세요."},
    {"cat": "location", "q": "덕수궁·서울시청 근처 치과를 찾고 있어요.", "a": "행복한예인치과는 서울시청·덕수궁 바로 남쪽, 시청역 도보 5분 거리입니다. 덕수궁 돌담길에서도 7~8분이면 도착합니다."},
    {"cat": "location", "q": "서소문·서소문공원 근처 치과 있나요?", "a": "서소문에서 도보 약 8분 거리에 행복한예인치과가 있습니다. 발치즉시 임플란트 80%+ 성공률의 전문 치과입니다."},
    {"cat": "location", "q": "남산타워·남산한옥마을에서 가까운 치과가 있나요?", "a": "남산에서 택시 5분, 도보 약 15분, 명동역 경유 도보 8분으로도 올 수 있습니다. 관광 중 갑작스러운 통증에도 당일 예약 상담 가능합니다."},
    {"cat": "location", "q": "종각역·인사동 근처에서 치과를 찾고 있어요.", "a": "종각역에서 시청역 한 정거장, 도보 약 12분입니다. 인사동에서도 대중교통 10분 이내. 교정·보존과 담당 원장가 직접 진료합니다."},
    {"cat": "location", "q": "동대문·종로5가에서 행복한예인치과 가려면?", "a": "1호선 또는 4호선으로 시청역까지 약 10분, 시청역 4번 출구에서 도보 5분이면 도착합니다."},
    {"cat": "location", "q": "여의도·마포에서 행복한예인치과 가기 편한가요?", "a": "여의도에서 5호선 광화문역까지 약 15분, 광화문역에서 도보 10분. 마포에서도 공덕역→시청역 경유 20분 이내입니다."},
    {"cat": "location", "q": "용산·이태원에서 가까운 전문의 치과 있나요?", "a": "용산에서 1호선으로 시청역까지 2정거장(약 7분), 이태원에서 6호선→1호선 환승 15분 이내에 도착합니다. 전문의 3인 협진 치과입니다."},
    {"cat": "location", "q": "강남·서초에서 행복한예인치과를 찾아가는 방법은?", "a": "2호선 강남역에서 시청역까지 약 20분, 3호선 교대역에서 충무로 환승 후 약 15분. 강남 못지않은 전문성을 합리적으로 제공합니다."},
    {"cat": "location", "q": "성수동·건대에서 행복한예인치과 가기 편한가요?", "a": "2호선으로 을지로입구역까지 10~15분, 을지로입구역 1번 출구에서 시청 방향 도보 7분이면 도착합니다."},
    {"cat": "location", "q": "서울 중구 남대문로에서 행복한예인치과의 차별점은?", "a": "전문의 3명 직접 진료, 13년간 같은 자리 운영, 발치즉시 임플란트 80%+ 시행률, 458건+ 리뷰 평균 4.9점, 수요일 야간진료가 차별점입니다."},
    {"cat": "location", "q": "퇴근 후 저녁에 진료하는 시청역 치과 있나요?", "a": "행복한예인치과는 매주 수요일 20시까지 야간진료합니다. 시청역 도보 5분 거리. 전화 02-756-2828로 예약하세요."},
    {"cat": "location", "q": "주말 진료는 가능한가요?", "a": "토·일·공휴일 휴진입니다. 대신 수요일 야간진료(20시까지)를 운영합니다. 월~금 09:30~18:30(수요일 20:00) 중 예약해 주세요."},
    {"cat": "life", "q": "임산부도 치과 치료가 가능한가요?", "a": "가능합니다. 임신 중기(4~6개월)가 가장 안전한 치료 시기이며, 스케일링과 간단한 충치치료는 임신 중에도 가능합니다. 상담 시 임신 사실을 반드시 알려주세요."},
    {"cat": "life", "q": "고령자(어르신) 임플란트도 가능한가요?", "a": "가능합니다. 65세 이상은 임플란트 건강보험 적용(상·하악 각 1개)도 받으실 수 있습니다. 전신 건강 상태 확인 후 안전한 시술 계획을 수립합니다."},
    {"cat": "life", "q": "치실과 치간칫솔, 꼭 써야 하나요?", "a": "칫솔만으로는 치아 사이 치태를 완전히 제거하기 어렵습니다. 치실이나 치간칫솔 병용이 충치·잇몸병 예방에 매우 효과적입니다. 맞춤 도구와 사용법을 안내합니다."},
    {"cat": "life", "q": "전동칫솔이 일반 칫솔보다 좋은가요?", "a": "전동칫솔은 일정한 압력과 회전으로 치태 제거에 효과적이지만, 올바른 사용법이 중요합니다. 칫솔 종류보다 올바른 습관이 핵심이며, 내원 시 맞춤 교육을 제공합니다."},
    {"cat": "life", "q": "오래 치과를 안 갔는데 지금 와도 괜찮을까요?", "a": "물론입니다. 오랫동안 미루신 분들일수록 빨리 오시는 것이 중요합니다. 판단 없이 현재 상태를 설명해 드리고 우선순위에 따라 치료 계획을 세워드립니다."},
    {"cat": "life", "q": "직장인인데 치료 기간이 오래 걸리면 어떡하죠?", "a": "발치즉시 임플란트로 내원 횟수를 최소화하고, 한 번 방문 시 여러 치료를 병행합니다. 점심시간 방문과 수요일 야간진료(20시)도 활용하실 수 있습니다."},
    {"cat": "life", "q": "치과 치료비로 연말정산 세액공제가 가능한가요?", "a": "네, 치과 치료비는 의료비 세액공제 대상입니다. 임플란트, 교정, 라미네이트 등 비급여도 포함됩니다. 국세청 자동 제출하며, 별도 영수증도 발급 가능합니다."},
  ];

  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainFaqData.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  });

  // 3) WebSite 스키마 (사이트링크 검색 최적화 + SearchAction)
  const websiteJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_DOMAIN}/#website`,
    "name": "행복한예인치과",
    "alternateName": ["Happy Yein Dental", "Happy Yein Dental Clinic"],
    "url": SITE_DOMAIN,
    "publisher": { "@id": `${SITE_DOMAIN}/#organization` },
    "inLanguage": "ko",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_DOMAIN}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  });

  // 4) WebPage 스키마 (AEO: speakable 추가)
  const webpageJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_DOMAIN}/#webpage`,
    "url": SITE_DOMAIN,
    "name": mainTitle,
    "description": mainDesc,
    "isPartOf": { "@id": `${SITE_DOMAIN}/#website` },
    "about": { "@id": `${SITE_DOMAIN}/#organization` },
    "datePublished": "2013-01-01",
    "dateModified": today,
    "inLanguage": "ko",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".hero-title", ".hero-desc", ".faq-q h4", ".faq-a p"]
    }
  });

  // 5) MedicalClinic 스키마 (AEO 강화)
  const medicalClinicJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_DOMAIN}/#organization`, // @id 없는 중복 병원 노드 → 주 엔티티에 병합 (2026-09-29)
    "name": "행복한예인치과",
    "url": SITE_DOMAIN,
    "medicalSpecialty": [
      { "@type": "MedicalSpecialty", "name": "Dentistry" },
      { "@type": "MedicalSpecialty", "name": "Orthodontics" },
      { "@type": "MedicalSpecialty", "name": "Endodontics" },
      { "@type": "MedicalSpecialty", "name": "Prosthodontics" }
    ],
    "availableService": [
      { "@type": "MedicalTherapy", "name": "발치즉시 임플란트", "alternateName": "Immediate Implant Placement" },
      { "@type": "MedicalTherapy", "name": "치아보존치료", "alternateName": "Endodontic Treatment" },
      { "@type": "MedicalTherapy", "name": "투명교정", "alternateName": "Clear Aligner Orthodontics" },
      { "@type": "MedicalTherapy", "name": "심미치료", "alternateName": "Cosmetic Dentistry" },
      { "@type": "MedicalTherapy", "name": "예방치료", "alternateName": "Preventive Dentistry" }
    ],
    "isAcceptingNewPatients": true,
    "smokingAllowed": false
  });

  // 6) BreadcrumbList 스키마
  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": SITE_DOMAIN }
    ]
  });

  // 7) Review/AggregateRating 스키마 제거 (2026-09-29, PFWE-SPEC §6 — 근거 없는 별점·후기 스키마 금지)

  // 8) Service + PriceSpecification 스키마 (치료별 서비스 정보)
  const servicesJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "행복한예인치과",
    "@id": `${SITE_DOMAIN}/#services`,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "행복한예인치과 진료 서비스 및 비용 안내",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "발치즉시 임플란트", "procedureType": "Surgical", "description": "발치와 동시에 임플란트를 식립하여 치료 기간을 대폭 단축. 80% 이상 즉시식립 시행." }, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "CT 촬영 후 정밀 진단 기반 개인 맞춤 비용 안내. 65세 이상 건강보험 적용 가능." } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "치아보존치료(신경치료)", "procedureType": "Noninvasive", "description": "보존과 담당 원장의 미세현미경 활용 정밀 신경치료. 자연치아를 최대한 보존." }, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용 항목. 치아 상태에 따른 투명한 비용 안내." } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "투명교정(인비절라인)", "procedureType": "Noninvasive", "description": "교정 전문의 직접 시행. 티 안 나는 투명한 교정 장치로 직장인에게 인기." }, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "교합 상태별 맞춤 비용 안내. 분할 납부 가능." } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "앞니 심미치료(라미네이트/레진)", "procedureType": "Noninvasive", "description": "최소삭제 원칙의 라미네이트, 즉일 완성 가능한 레진 심미보철." }, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "시술 범위에 따른 맞춤 비용 안내." } },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "스케일링", "procedureType": "Noninvasive", "description": "건강보험 적용(연 1회). 치석 제거로 잇몸 건강 유지." }, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용 시 본인부담 약 1~2만원." } }
      ]
    }
  });

  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- SEO 기본 -->
<title>${mainTitle}</title>
<meta name="description" content="${mainDesc}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${SITE_DOMAIN}/">

<!-- Open Graph (Facebook, KakaoTalk, Naver) -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="행복한예인치과">
<meta property="og:title" content="${mainTitle}">
<meta property="og:description" content="${mainDesc}">
<meta property="og:url" content="${SITE_DOMAIN}/">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ko_KR">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${mainTitle}">
<meta name="twitter:description" content="${mainDesc}">
<meta name="twitter:image" content="${ogImage}">

<!-- 검색엔진 사이트 인증 -->
<meta name="google-site-verification" content="vYZPm8cqMVJjj5dT_4SefF1Vb064qJHCCcQgz1QYsHw">
<meta name="naver-site-verification" content="b09b795ebd645faf0bf690fee790d98d6874d9fb">
<meta property="og:article:author" content="행복한예인치과">

<!-- hreflang (다국어 SEO) -->
<link rel="alternate" hreflang="ko" href="${SITE_DOMAIN}/">
<link rel="alternate" hreflang="en" href="${SITE_DOMAIN}/en">
<link rel="alternate" hreflang="x-default" href="${SITE_DOMAIN}/">

<!-- RSS 피드 자동발견 (검색엔진·AI 크롤러) -->
<link rel="alternate" type="application/rss+xml" title="행복한예인치과 블로그 RSS" href="${SITE_DOMAIN}/rss.xml">

<!-- 추가 메타 -->
<meta name="theme-color" content="#F7BA18">
<meta name="author" content="행복한예인치과">
<meta name="format-detection" content="telephone=yes">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="keywords" content="행복한예인치과, 시청역 치과, 명동 치과, 을지로 치과, 광화문 치과, 종로 치과, 서울역 치과, 회현역 치과, 충무로 치과, 남대문 치과, 서울 중구 치과, 발치즉시 임플란트, 즉시식립 임플란트, 명동 임플란트, 시청역 임플란트, 을지로 임플란트, 보존치료, 신경치료, 치과보존과 담당 원장, 명동 신경치료, 앞니 심미치료, 라미네이트, 치아교정, 투명교정, 인비절라인, 명동 교정, 을지로 교정, 야간진료 치과, 수요일 야간, 직장인 치과, 통합치의학 전문의, 서울 직장인 치과, 남산 치과, 북창동 치과, 다동 치과, 무교동 치과">
<meta name="geo.region" content="KR-11">
<meta name="geo.placename" content="서울특별시 중구">
<meta name="geo.position" content="37.566;126.978">
<meta name="ICBM" content="37.566, 126.978">
<link rel="icon" type="image/png" href="/static/img/logo.png">

<!-- DNS Prefetch & Preconnect (성능 최적화) -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>

<!-- 히어로 이미지 프리로드 (LCP 최적화) -->
<link rel="preload" as="image" href="/static/img/dr-han-smile.webp" fetchpriority="high">

<!-- 폰트 프리로드 (렌더링 차단 방지) -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap">

<!-- 구조화 데이터 (JSON-LD) - SEO + AEO -->
<script type="application/ld+json">${orgJsonLd}</script>
<script type="application/ld+json">${faqJsonLd}</script>
<script type="application/ld+json">${websiteJsonLd}</script>
<script type="application/ld+json">${webpageJsonLd}</script>
<script type="application/ld+json">${medicalClinicJsonLd}</script>
<script type="application/ld+json">${breadcrumbJsonLd}</script>
<script type="application/ld+json">${servicesJsonLd}</script>

<!-- 폰트 & 아이콘 -->
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>
:root {
  --gold: #F7BA18;
  --gold-deep: #D4A010;
  --gold-light: rgba(247,186,24,0.12);
  --gold-glow: rgba(247,186,24,0.25);
  --black: #0A0A0A;
  --black-warm: #111111;
  --dark: #1A1A1A;
  --dark-card: #161616;
  --white: #F5F2ED;
  --white-pure: #FFFFFF;
  --cream: #EDE8E0;
  --gray: #888;
  --gray-dark: #555;
  --gray-light: #B5B0A8;
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', 'Space Grotesk', sans-serif;
  --font-number: 'Bebas Neue', sans-serif;
  --font-kr: 'Noto Sans KR', sans-serif;
  --font-mono: 'Space Grotesk', monospace;
}
*{margin:0;padding:0;box-sizing:border-box;}
html{font-size:16px;scroll-behavior:smooth;overflow-x:hidden;}
body{font-family:var(--font-body);color:var(--white);background:var(--black);overflow-x:hidden;-webkit-font-smoothing:antialiased;}
::selection{background:var(--gold);color:var(--black);}
img{max-width:100%;display:block;}
a{text-decoration:none;color:inherit;}

/* ===== SMOOTH SCROLL CONTAINER ===== */
.smooth-wrap{position:relative;}

/* ===== CUSTOM CURSOR ===== */
.cursor-dot{position:fixed;width:8px;height:8px;background:var(--gold);border-radius:50%;pointer-events:none;z-index:99999;transition:transform 0.15s;mix-blend-mode:difference;}
.cursor-ring{position:fixed;width:40px;height:40px;border:1.5px solid var(--gold);border-radius:50%;pointer-events:none;z-index:99998;transition:all 0.2s ease-out;opacity:0.5;}
.cursor-ring.hover{width:70px;height:70px;opacity:0.3;border-color:var(--gold);}

/* ===== PRELOADER ===== */
.preloader{position:fixed;inset:0;background:var(--black);z-index:100000;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all 1s cubic-bezier(0.76,0,0.24,1);}
.preloader.done{clip-path:polygon(0 0,100% 0,100% 0,0 0);}
.preloader-counter{font-family:var(--font-number);font-size:clamp(4rem,12vw,10rem);color:var(--gold);line-height:1;letter-spacing:4px;}
.preloader-bar{width:200px;height:2px;background:rgba(255,255,255,0.1);margin-top:32px;border-radius:2px;overflow:hidden;}
.preloader-bar-fill{height:100%;background:var(--gold);width:0%;transition:width 0.1s;}
.preloader-label{font-family:var(--font-display);font-size:0.65rem;text-transform:uppercase;letter-spacing:6px;color:var(--gray);margin-top:16px;}

/* ===== SCROLL PROGRESS ===== */
.scroll-progress{position:fixed;top:0;left:0;height:2px;background:var(--gold);z-index:10000;transition:width 0.05s;width:0%;}

/* ===== NAV ===== */
nav{position:fixed;top:0;width:100%;z-index:9999;padding:28px 0;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);}
nav.scrolled{background:rgba(10,10,10,0.95);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);padding:16px 0;border-bottom:1px solid rgba(247,186,24,0.06);}
.nav-inner{max-width:1800px;margin:0 auto;padding:0 clamp(24px,4vw,60px);display:flex;justify-content:space-between;align-items:center;}
.nav-brand{font-family:var(--font-display);font-size:1.2rem;font-weight:800;text-transform:uppercase;letter-spacing:4px;color:var(--white);}
.nav-brand em{color:var(--gold);font-style:normal;}
.nav-links{display:flex;gap:40px;align-items:center;}
.nav-link{font-family:var(--font-display);font-size:0.7rem;font-weight:500;text-transform:uppercase;letter-spacing:3px;color:var(--gray-light);transition:color 0.3s;position:relative;}
.nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--gold);transition:width 0.3s;}
.nav-link:hover{color:var(--gold);}
.nav-link:hover::after{width:100%;}
.nav-link.active{color:var(--gold);}
.nav-link.active::after{width:100%;}
/* NAV DROPDOWN */
.nav-dropdown-wrap{position:relative;}
.nav-dropdown{position:absolute;top:calc(100% + 16px);left:50%;background:rgba(10,10,10,0.97);backdrop-filter:blur(40px);border:1px solid rgba(247,186,24,0.1);border-radius:16px;padding:12px 8px;min-width:220px;opacity:0;visibility:hidden;transition:all 0.3s cubic-bezier(0.16,1,0.3,1);transform:translateX(-50%) translateY(10px);}
.nav-dropdown-wrap:hover .nav-dropdown{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);}
.nav-dropdown-item{display:block;padding:10px 20px;font-family:var(--font-kr);font-size:0.82rem;color:var(--gray-light);border-radius:10px;transition:all 0.2s;font-weight:400;white-space:nowrap;}
.nav-dropdown-item:hover{background:rgba(247,186,24,0.08);color:var(--gold);}
.nav-tel{font-family:var(--font-mono);font-weight:700;color:var(--gold)!important;font-size:0.85rem!important;letter-spacing:2px!important;}
.hamburger{display:none;flex-direction:column;gap:7px;cursor:pointer;z-index:10001;padding:8px;}
.hamburger span{width:28px;height:1.5px;background:var(--white);transition:all 0.4s cubic-bezier(0.76,0,0.24,1);transform-origin:center;}
.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(6px,6px);}
.hamburger.active span:nth-child(2){opacity:0;transform:scaleX(0);}
.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(6px,-6px);}

/* ===== MOBILE FULLSCREEN MENU ===== */
.mob-menu{position:fixed;inset:0;background:var(--black);z-index:10000;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0;clip-path:circle(0% at calc(100% - 44px) 44px);transition:clip-path 0.8s cubic-bezier(0.76,0,0.24,1);}
.mob-menu.open{clip-path:circle(150% at calc(100% - 44px) 44px);}
.mob-link{font-family:var(--font-display);font-size:clamp(2rem,6vw,3.5rem);font-weight:800;text-transform:uppercase;letter-spacing:4px;color:var(--white);padding:16px 0;transition:all 0.3s;opacity:0;transform:translateY(30px);}
.mob-menu.open .mob-link{opacity:1;transform:translateY(0);}
.mob-link:nth-child(1){transition-delay:0.2s;}
.mob-link:nth-child(2){transition-delay:0.25s;}
.mob-link:nth-child(3){transition-delay:0.3s;}
.mob-link:nth-child(4){transition-delay:0.35s;}
.mob-link:nth-child(5){transition-delay:0.4s;}
.mob-link:nth-child(6){transition-delay:0.45s;}
.mob-link:nth-child(7){transition-delay:0.48s;}
.mob-link:nth-child(8){transition-delay:0.5s;}
.mob-link:nth-child(9){transition-delay:0.52s;}
.mob-link-sub{font-size:clamp(0.9rem,2.5vw,1.2rem)!important;font-weight:500!important;letter-spacing:1px!important;color:var(--gray-light)!important;padding:8px 0!important;}
.mob-link-sub:hover{color:var(--gold)!important;}
.mob-link:hover{color:var(--gold);-webkit-text-stroke:0;}
.mob-menu-footer{position:absolute;bottom:60px;font-family:var(--font-mono);font-size:0.8rem;color:var(--gray);letter-spacing:2px;}

/* ===== HERO - CINEMATIC FULLSCREEN ===== */
.hero{height:100vh;position:relative;display:flex;align-items:flex-end;overflow:hidden;}
.hero-video-bg{position:absolute;inset:0;}
.hero-video-bg img{width:100%;height:100%;object-fit:cover;object-position:center 20%;filter:brightness(0.3) contrast(1.1);}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,0.3) 0%,rgba(10,10,10,0.1) 40%,rgba(10,10,10,0.85) 100%);}
.hero-noise{position:absolute;inset:0;opacity:0.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.hero-content{position:relative;z-index:2;width:100%;max-width:1800px;margin:0 auto;padding:0 clamp(24px,4vw,60px) 80px;}
.hero-eyebrow{font-family:var(--font-display);font-size:0.65rem;text-transform:uppercase;letter-spacing:8px;color:var(--gold);margin-bottom:28px;display:flex;align-items:center;gap:16px;opacity:0;animation:fadeUp 1s 1.8s forwards;}
.hero-eyebrow::before{content:'';width:50px;height:1px;background:var(--gold);}
.hero-title{opacity:0;animation:fadeUp 1s 2s forwards;}
.hero-title-line{font-family:var(--font-kr);font-size:clamp(2.8rem,7vw,6.5rem);line-height:1.05;font-weight:900;letter-spacing:-3px;display:block;overflow:hidden;}
.hero-title-line .word{display:inline-block;transform:translateY(100%);animation:wordUp 1s cubic-bezier(0.16,1,0.3,1) forwards;opacity:0;}
.hero-title-line:nth-child(1) .word{animation-delay:2.1s;}
.hero-title-line:nth-child(2) .word{animation-delay:2.3s;}
.hero-title-line:nth-child(3) .word{animation-delay:2.5s;}
.hero-title-line .accent{color:var(--gold);}
.hero-title-line .en{font-family:var(--font-display);font-weight:800;text-transform:uppercase;letter-spacing:2px;}
.hero-title-line .outline-text{-webkit-text-stroke:1.5px var(--white);color:transparent;font-family:var(--font-display);font-weight:800;text-transform:uppercase;letter-spacing:4px;}
.hero-bottom{display:flex;justify-content:space-between;align-items:flex-end;margin-top:48px;opacity:0;animation:fadeUp 1s 2.7s forwards;}
.hero-desc{max-width:380px;font-family:var(--font-kr);font-size:0.88rem;line-height:2;color:var(--gray-light);font-weight:300;}
.hero-cta-group{display:flex;gap:16px;align-items:center;}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes wordUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}

/* ===== BUTTONS ===== */
.btn{display:inline-flex;align-items:center;gap:10px;padding:18px 44px;border-radius:100px;font-family:var(--font-display);font-weight:700;font-size:0.78rem;text-transform:uppercase;letter-spacing:3px;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);cursor:pointer;border:none;position:relative;overflow:hidden;}
.btn-gold{background:var(--gold);color:var(--black);}
.btn-gold:hover{background:var(--gold-deep);transform:translateY(-3px);box-shadow:0 20px 50px rgba(247,186,24,0.35);}
.btn-ghost{background:transparent;color:var(--white);border:1px solid rgba(255,255,255,0.15);}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-3px);}
.btn-naver{background:#03C75A;color:var(--white-pure);}
.btn-naver:hover{transform:translateY(-3px);box-shadow:0 20px 50px rgba(3,199,90,0.3);}

/* ===== HORIZONTAL SCROLL TICKER ===== */
.hero-ticker{position:absolute;bottom:0;left:0;width:100%;overflow:hidden;border-top:1px solid rgba(255,255,255,0.05);z-index:3;background:rgba(10,10,10,0.6);backdrop-filter:blur(20px);}
.ticker-track{display:flex;animation:tickerScroll 30s linear infinite;white-space:nowrap;}
.ticker-item{flex-shrink:0;padding:18px 60px;font-family:var(--font-display);font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:5px;color:var(--gray);display:flex;align-items:center;gap:24px;}
.ticker-item .dot{width:4px;height:4px;background:var(--gold);border-radius:50%;}
@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ===== TWO KEY NUMBERS — HERO EMPHASIS ===== */
.key-nums{display:grid;grid-template-columns:1fr 1fr;background:var(--black);position:relative;overflow:hidden;}
.key-nums::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(247,186,24,0.06),transparent 70%);pointer-events:none;}
.key-num{padding:clamp(60px,8vw,120px) clamp(24px,4vw,60px);position:relative;overflow:hidden;transition:all 0.6s;}
.key-num::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(247,186,24,0.04),transparent 60%);opacity:0;transition:opacity 0.6s;}
.key-num:hover::before{opacity:1;}
.key-num:first-child{border-right:1px solid rgba(255,255,255,0.04);}
.key-num-inner{max-width:520px;margin:0 auto;position:relative;}
.key-num:first-child .key-num-inner{margin-left:auto;margin-right:0;text-align:right;}
.key-num:last-child .key-num-inner{margin-left:0;margin-right:auto;text-align:left;}
/* Giant emphasized number */
.key-num .big-wrap{position:relative;display:inline-block;}
.key-num .big{font-family:var(--font-number);font-size:clamp(7rem,14vw,15rem);color:var(--gold);line-height:0.8;letter-spacing:-2px;display:block;position:relative;z-index:2;}
.key-num .big-ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--font-number);font-size:clamp(14rem,28vw,30rem);color:rgba(247,186,24,0.03);line-height:1;letter-spacing:-4px;pointer-events:none;z-index:0;white-space:nowrap;}
.key-num:first-child .big-ghost{right:0;left:auto;transform:translate(10%,-50%);}
.key-num:last-child .big-ghost{left:0;transform:translate(-10%,-50%);}
.key-num .big-unit{font-family:var(--font-display);font-size:clamp(1.4rem,2.5vw,2.8rem);color:var(--gold);text-transform:uppercase;letter-spacing:6px;vertical-align:super;font-weight:700;opacity:0.8;}
/* Separator dot */
.key-num .sep-dot{display:flex;align-items:center;gap:8px;margin-top:24px;}
.key-num:first-child .sep-dot{justify-content:flex-end;}
.sep-dot span{width:4px;height:4px;border-radius:50%;background:var(--gold);opacity:0.5;}
.sep-dot span:nth-child(2){width:20px;height:2px;border-radius:1px;opacity:0.7;}
/* Labels */
.key-num .label{font-family:var(--font-display);font-size:clamp(0.6rem,0.9vw,0.8rem);text-transform:uppercase;letter-spacing:clamp(5px,0.8vw,10px);color:var(--gold);margin-top:16px;display:block;font-weight:700;opacity:0.9;}
.key-num .desc{font-family:var(--font-kr);font-size:clamp(0.85rem,1.1vw,1rem);color:var(--gray-light);font-weight:300;margin-top:12px;line-height:1.8;}
/* Sub-stats row */
.key-num .sub-stats{display:flex;gap:32px;margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);}
.key-num:first-child .sub-stats{justify-content:flex-end;}
.sub-stat{text-align:center;}
.sub-stat .sub-val{font-family:var(--font-number);font-size:clamp(1.4rem,2vw,2rem);color:var(--white);display:block;letter-spacing:1px;}
.sub-stat .sub-label{font-family:var(--font-kr);font-size:0.65rem;color:var(--gray);margin-top:4px;display:block;letter-spacing:1px;}

/* ===== FAQ (main page) ===== */
.faq{background:var(--black-warm, #111);}
.faq-list{max-width:800px;margin:60px auto 0;}
.faq-item{border-bottom:1px solid rgba(255,255,255,0.06);overflow:hidden;}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:28px 0;cursor:pointer;transition:color 0.3s;}
.faq-q:hover{color:var(--gold);}
.faq-q h4{font-family:var(--font-kr);font-size:1rem;font-weight:500;}
.faq-q i{color:var(--gold);transition:transform 0.3s;font-size:0.8rem;}
.faq-q.open i{transform:rotate(180deg);}
.faq-a{max-height:0;overflow:hidden;transition:all 0.4s ease;}
.faq-a.open{max-height:500px;padding-bottom:28px;}
.faq-a p{font-family:var(--font-kr);font-size:0.88rem;line-height:2;color:var(--gray);font-weight:300;}

/* ===== SECTION COMMONS ===== */
.sec-pad{padding:clamp(100px,12vw,200px) clamp(24px,4vw,60px);}
.sec-label{font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:8px;color:var(--gold);margin-bottom:24px;display:flex;align-items:center;gap:16px;font-weight:600;}
.sec-label::before{content:'';width:40px;height:1px;background:var(--gold);}
.sec-title{font-family:var(--font-kr);font-size:clamp(2rem,4vw,3.8rem);font-weight:900;line-height:1.2;letter-spacing:-2px;}
.sec-title em{font-style:normal;color:var(--gold);}
.sec-inner{max-width:1400px;margin:0 auto;}

/* ===== PHILOSOPHY - FULL SCREEN TEXT ===== */
.philosophy{background:var(--white);color:var(--black);min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;}
.philosophy::before{content:'"';position:absolute;top:-80px;right:5%;font-family:var(--font-number);font-size:clamp(20rem,40vw,50rem);color:rgba(0,0,0,0.025);line-height:1;pointer-events:none;}
.philosophy-inner{max-width:1200px;margin:0 auto;padding:0 clamp(24px,4vw,60px);}
.philosophy-text{font-family:var(--font-kr);font-size:clamp(2rem,4.5vw,4.2rem);line-height:1.5;font-weight:900;letter-spacing:-2px;}
.philosophy-text em{font-style:normal;color:var(--gold-deep);}
.philosophy-text .thin{font-weight:300;color:var(--gray);}
.philosophy-credit{margin-top:48px;font-family:var(--font-display);font-size:0.7rem;text-transform:uppercase;letter-spacing:5px;color:var(--gray);font-weight:500;display:flex;align-items:center;gap:16px;}
.philosophy-credit::before{content:'';width:40px;height:1px;background:var(--gold-deep);}

/* ===== VALUES - BENTO GRID ===== */
.values{background:var(--black);position:relative;overflow:hidden;}
.values::after{content:'';position:absolute;top:50%;left:50%;width:600px;height:600px;background:radial-gradient(circle,rgba(247,186,24,0.03),transparent 70%);transform:translate(-50%,-50%);pointer-events:none;}
.values-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:80px;}
.v-card{background:var(--dark-card);padding:52px 36px;position:relative;overflow:hidden;transition:all 0.6s cubic-bezier(0.16,1,0.3,1);cursor:default;border:1px solid transparent;}
.v-card:hover{border-color:rgba(247,186,24,0.15);background:rgba(247,186,24,0.03);transform:translateY(-4px);}
.v-card-num{font-family:var(--font-number);font-size:5rem;position:absolute;top:-8px;right:12px;color:rgba(247,186,24,0.04);line-height:1;letter-spacing:3px;pointer-events:none;transition:color 0.5s;}
.v-card:hover .v-card-num{color:rgba(247,186,24,0.1);}
.v-card-icon{width:48px;height:48px;border-radius:14px;background:rgba(247,186,24,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:28px;color:var(--gold);font-size:1.1rem;transition:all 0.5s;}
.v-card:hover .v-card-icon{background:var(--gold);color:var(--black);}
.v-card h3{font-family:var(--font-display);font-size:1.1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:14px;color:var(--white);}
.v-card p{font-family:var(--font-kr);font-size:0.85rem;line-height:1.9;color:var(--gray);font-weight:300;}

/* ===== TREATMENTS - STAGGERED CARDS ===== */
.treatments{background:var(--black-warm);position:relative;}
.treat-grid{margin-top:80px;display:grid;grid-template-columns:1fr 1fr;gap:2px;}
.treat-card{position:relative;background:var(--dark-card);overflow:hidden;transition:all 0.6s;min-height:380px;display:flex;flex-direction:column;justify-content:flex-end;cursor:pointer;}
.treat-card-bg{position:absolute;inset:0;transition:all 0.8s cubic-bezier(0.16,1,0.3,1);}
.treat-card-bg img{width:100%;height:100%;object-fit:cover;opacity:0;transition:all 0.8s;filter:brightness(0.3);}
.treat-card:hover .treat-card-bg img{opacity:1;}
.treat-card:hover .treat-card-bg{transform:scale(1.05);}
.treat-card-content{position:relative;z-index:2;padding:48px 40px;}
.treat-card-num{font-family:var(--font-number);font-size:7rem;position:absolute;top:-10px;right:30px;color:rgba(247,186,24,0.05);line-height:1;pointer-events:none;letter-spacing:4px;transition:color 0.5s;}
.treat-card:hover .treat-card-num{color:rgba(247,186,24,0.12);}
.treat-card-tag{font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:5px;color:var(--gold);margin-bottom:14px;font-weight:600;}
.treat-card h3{font-family:var(--font-kr);font-size:1.5rem;font-weight:700;margin-bottom:12px;letter-spacing:-0.5px;}
.treat-card p{font-family:var(--font-kr);font-size:0.85rem;line-height:1.8;color:var(--gray-light);font-weight:300;max-width:420px;}
.treat-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px;}
.treat-pill{padding:7px 18px;border:1px solid rgba(247,186,24,0.2);border-radius:50px;font-family:var(--font-display);font-size:0.65rem;color:var(--gold);text-transform:uppercase;letter-spacing:2px;transition:all 0.3s;font-weight:500;}
.treat-card:hover .treat-pill{border-color:var(--gold);background:rgba(247,186,24,0.1);}
/* Featured treatment - full width */
.treat-featured{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr;min-height:500px;}
.treat-featured .treat-card-content{display:flex;flex-direction:column;justify-content:center;padding:60px 56px;}
.treat-featured-img{position:relative;overflow:hidden;}
.treat-featured-img img{width:100%;height:100%;object-fit:cover;object-position:center top;filter:grayscale(20%);transition:all 0.8s;}
.treat-featured:hover .treat-featured-img img{filter:grayscale(0%);transform:scale(1.03);}

/* ===== TEAM - EDITORIAL LAYOUT ===== */
.team{background:var(--white);color:var(--black);position:relative;overflow:hidden;}
.team-grid{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:28px;margin-top:80px;}
.team-card{position:relative;overflow:hidden;border-radius:20px;background:var(--cream);transition:all 0.6s cubic-bezier(0.16,1,0.3,1);}
.team-card:hover{transform:translateY(-8px);box-shadow:0 40px 80px rgba(0,0,0,0.1);}
.team-card.lead{background:var(--black);color:var(--white);grid-row:span 1;}
.team-photo{aspect-ratio:3/4;overflow:hidden;position:relative;}
.team-photo img{width:100%;height:100%;object-fit:cover;object-position:center top;transition:transform 0.8s cubic-bezier(0.16,1,0.3,1);}
.team-card:hover .team-photo img{transform:scale(1.06);}
.team-photo-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,0.6) 0%,transparent 50%);opacity:0;transition:opacity 0.5s;}
.team-card:hover .team-photo-overlay{opacity:1;}
.team-photo-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--cream),var(--white));}
.team-card.lead .team-photo-placeholder{background:linear-gradient(135deg,#1a1a1a,#2a2a2a);}
.team-photo-placeholder i{font-size:3rem;color:var(--gold);opacity:0.15;}
.team-badge{position:absolute;top:16px;left:16px;background:var(--gold);color:var(--black);padding:6px 16px;border-radius:50px;font-family:var(--font-display);font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;z-index:2;}
.team-info{padding:28px 28px 32px;}
.team-info h3{font-family:var(--font-display);font-size:1.3rem;font-weight:700;margin-bottom:6px;letter-spacing:1px;}
.team-info .role{font-family:var(--font-display);font-size:0.72rem;font-weight:600;color:var(--gold-deep);margin-bottom:18px;text-transform:uppercase;letter-spacing:2px;}
.team-card.lead .role{color:var(--gold);}
.team-creds{list-style:none;font-family:var(--font-kr);font-size:0.78rem;line-height:2;color:var(--gray);}
.team-creds li{padding-left:14px;position:relative;}
.team-creds li::before{content:'';position:absolute;left:0;top:10px;width:4px;height:4px;background:var(--gold);border-radius:50%;}

/* ===== EXPERIENCE - ASYMMETRIC SPLIT ===== */
.experience{background:var(--black);position:relative;}
.exp-grid{display:grid;grid-template-columns:1.1fr 1fr;min-height:100vh;}
.exp-images{position:relative;overflow:hidden;}
.exp-images-grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1.3fr 1fr;height:100%;gap:3px;}
.exp-images-grid img{width:100%;height:100%;object-fit:cover;filter:grayscale(30%);transition:all 0.6s;}
.exp-images-grid img:hover{filter:grayscale(0%);transform:scale(1.02);}
.exp-images-grid img:first-child{grid-column:span 2;}
.exp-text{padding:clamp(60px,8vw,120px) clamp(32px,5vw,72px);display:flex;flex-direction:column;justify-content:center;}
.exp-text h2{font-family:var(--font-kr);font-size:clamp(2rem,3.5vw,3rem);font-weight:900;line-height:1.35;margin-bottom:28px;letter-spacing:-2px;}
.exp-text h2 em{font-style:normal;color:var(--gold);}
.exp-text>p{font-family:var(--font-kr);font-size:0.88rem;line-height:2;color:var(--gray-light);font-weight:300;margin-bottom:48px;}
.exp-list{list-style:none;display:flex;flex-direction:column;}
.exp-item{display:flex;gap:20px;padding:24px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
.exp-item:last-child{border-bottom:none;}
.exp-item-icon{width:44px;height:44px;flex-shrink:0;border:1px solid rgba(247,186,24,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:0.9rem;transition:all 0.3s;}
.exp-item:hover .exp-item-icon{background:rgba(247,186,24,0.1);border-color:var(--gold);}
.exp-item h4{font-family:var(--font-display);font-size:0.85rem;font-weight:600;margin-bottom:4px;letter-spacing:1px;text-transform:uppercase;}
.exp-item p{font-family:var(--font-kr);font-size:0.8rem;color:var(--gray);font-weight:300;}

/* ===== PHOTO MARQUEE ===== */
.photo-marquee{padding:80px 0;background:var(--dark);overflow:hidden;border-top:1px solid rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.03);}
.photo-track{display:flex;gap:20px;animation:photoScroll 50s linear infinite;}
.photo-track img{height:260px;width:auto;border-radius:16px;object-fit:contain;flex-shrink:0;filter:grayscale(30%);transition:all 0.5s;opacity:0.7;}
.photo-track img:hover{filter:grayscale(0%);opacity:1;transform:scale(1.04);}
@keyframes photoScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ===== LOCATION ===== */
.location{background:var(--white);color:var(--black);}
.location-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:60px;margin-top:80px;}
.location-map{border-radius:24px;overflow:hidden;height:560px;background:var(--cream);position:relative;}
.location-map iframe{width:100%;height:100%;border:0;filter:grayscale(90%) contrast(1.1);transition:filter 0.6s;}
.location-map:hover iframe{filter:grayscale(0%);}
.loc-info{display:flex;flex-direction:column;justify-content:center;}
.loc-block{padding:28px 0;border-bottom:1px solid rgba(0,0,0,0.06);}
.loc-block:last-child{border-bottom:none;}
.loc-label{font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:5px;color:var(--gold-deep);font-weight:600;margin-bottom:14px;}
.loc-value{font-family:var(--font-kr);font-size:0.95rem;font-weight:400;line-height:1.9;color:var(--black);}
.loc-value small{display:block;font-size:0.82rem;color:var(--gray);font-weight:300;margin-top:4px;}
.loc-value a{color:var(--gold-deep);text-decoration:none;font-weight:700;font-size:1.4rem;font-family:var(--font-mono);letter-spacing:2px;}
.loc-value a:hover{color:var(--gold);}
.hours-grid{display:grid;grid-template-columns:56px 1fr;gap:4px 16px;font-size:0.88rem;}
.hours-grid .day{font-weight:600;color:var(--black);font-family:var(--font-display);font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;}
.hours-grid .time{color:var(--gray-dark);font-family:var(--font-mono);font-size:0.85rem;}
.hours-grid .off{color:var(--gold-deep);font-weight:500;}
.night-badge{display:inline-block;background:var(--gold);color:var(--black);padding:2px 10px;border-radius:20px;font-size:0.6rem;font-weight:700;margin-left:8px;font-family:var(--font-display);text-transform:uppercase;letter-spacing:1px;}

/* ===== CTA ===== */
.cta{background:var(--black);text-align:center;position:relative;overflow:hidden;}
.cta::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;background:radial-gradient(circle,rgba(247,186,24,0.06),transparent 65%);border-radius:50%;pointer-events:none;}
.cta-inner{position:relative;z-index:1;}
.cta-inner h2{font-family:var(--font-kr);font-size:clamp(2.2rem,4.5vw,4.2rem);font-weight:900;letter-spacing:-2px;line-height:1.25;margin-bottom:24px;}
.cta-inner h2 em{font-style:normal;color:var(--gold);}
.cta-inner>p{font-family:var(--font-kr);font-size:0.92rem;color:var(--gray);font-weight:300;line-height:2;margin-bottom:48px;max-width:460px;margin-left:auto;margin-right:auto;}
.cta-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}

/* ===== FOOTER ===== */
footer{padding:56px clamp(24px,4vw,60px);background:var(--black);color:var(--gray);border-top:1px solid rgba(255,255,255,0.04);}
.footer-inner{max-width:1800px;margin:0 auto;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:24px;}
.footer-left{font-family:var(--font-kr);font-size:0.76rem;line-height:2;font-weight:300;}
.footer-left strong{color:var(--gray-light);font-weight:500;}
.footer-right{display:flex;gap:28px;}
.footer-right a{color:var(--gray);font-family:var(--font-display);font-size:0.68rem;text-transform:uppercase;letter-spacing:3px;transition:color 0.3s;font-weight:500;}
.footer-right a:hover{color:var(--gold);}

/* ===== SCROLL REVEAL ===== */
.rv{opacity:0;transform:translateY(60px);transition:all 1.2s cubic-bezier(0.16,1,0.3,1);}
.rv.vis{opacity:1;transform:translateY(0);}
.rv-d1{transition-delay:0.1s;}
.rv-d2{transition-delay:0.2s;}
.rv-d3{transition-delay:0.3s;}
.rv-d4{transition-delay:0.4s;}
.rv-scale{opacity:0;transform:scale(0.9);transition:all 1.2s cubic-bezier(0.16,1,0.3,1);}
.rv-scale.vis{opacity:1;transform:scale(1);}

/* ===== RESPONSIVE ===== */
@media(max-width:1200px){
  .values-grid{grid-template-columns:repeat(2,1fr);}
  .team-grid{grid-template-columns:1fr 1fr;}
  .team-card.lead{grid-column:span 2;}
  .team-card.lead .team-photo{aspect-ratio:16/9;}
}
@media(max-width:1024px){
  .nav-dropdown{display:none;}
  .treat-grid{grid-template-columns:1fr;}
  .treat-featured{grid-column:span 1;grid-template-columns:1fr;}
  .treat-featured-img{min-height:300px;}
  .exp-grid{grid-template-columns:1fr;}
  .exp-images-grid{height:400px;}
  .location-grid{grid-template-columns:1fr;}
  .location-map{height:350px;}
}
@media(max-width:768px){
  .nav-links{display:none;}
  .hamburger{display:flex;}
  .cursor-dot,.cursor-ring{display:none;}
  /* HERO 모바일 */
  .hero{height:100svh;min-height:600px;}
  .hero-content{padding:0 20px 60px;}
  .hero-eyebrow{font-size:0.55rem;letter-spacing:5px;margin-bottom:20px;}
  .hero-title-line{font-size:clamp(2rem,8vw,3.5rem)!important;letter-spacing:-1px;}
  .hero-bottom{flex-direction:column;gap:24px;align-items:flex-start;margin-top:32px;}
  .hero-desc{font-size:0.82rem;max-width:100%;}
  .hero-cta-group{flex-direction:column;width:100%;gap:12px;}
  .btn{width:100%;justify-content:center;padding:16px 32px;font-size:0.72rem;}
  .hero-ticker{display:none;}
  /* 숫자 스트립 */
  .key-nums{grid-template-columns:1fr;}
  .key-num{padding:56px 24px;}
  .key-num:first-child{border-right:none;border-bottom:1px solid rgba(255,255,255,0.04);}
  .key-num:first-child .key-num-inner,.key-num:last-child .key-num-inner{text-align:center;margin:0 auto;}
  .key-num:first-child .sep-dot,.key-num:first-child .sub-stats{justify-content:center;}
  .key-num .big{font-size:clamp(5rem,16vw,8rem);}
  .key-num .big-ghost{font-size:clamp(10rem,32vw,18rem);}
  .key-num:first-child .big-ghost,.key-num:last-child .big-ghost{left:50%;transform:translate(-50%,-50%);}
  .key-num .label{margin-top:14px;}
  .key-num .desc{font-size:0.85rem;}
  .key-num .sub-stats{justify-content:center;}
  /* PHILOSOPHY */
  .philosophy{min-height:auto;padding:80px 0;}
  .philosophy::before{font-size:15rem;top:-40px;right:-10%;}
  .philosophy-text{font-size:clamp(1.6rem,5vw,2.2rem)!important;}
  .philosophy-credit{margin-top:32px;font-size:0.6rem;}
  /* VALUES */
  .values-grid{grid-template-columns:1fr;}
  .v-card{padding:36px 28px;}
  .v-card-num{font-size:3.5rem;}
  /* TREATMENTS */
  .treat-card{min-height:280px;}
  .treat-card-content{padding:32px 24px;}
  .treat-card h3{font-size:1.2rem;}
  .treat-card-num{font-size:4rem;right:16px;}
  .treat-featured .treat-card-content{padding:36px 24px;}
  .treat-pills{gap:6px;}
  .treat-pill{padding:5px 12px;font-size:0.58rem;}
  /* TEAM */
  .team-grid{grid-template-columns:1fr!important;max-width:440px;margin-left:auto;margin-right:auto;gap:20px;}
  .team-card.lead{grid-column:span 1;}
  .team-card.lead .team-photo{aspect-ratio:3/4;}
  .team-info{padding:24px 20px 28px;}
  .team-info h3{font-size:1.1rem;}
  /* EXPERIENCE */
  .exp-text{padding:48px 20px;}
  .exp-text h2{font-size:clamp(1.6rem,5vw,2rem);margin-bottom:20px;}
  .exp-text>p{font-size:0.82rem;margin-bottom:32px;}
  .exp-images-grid{height:300px;}
  .exp-item h4{font-size:0.78rem;}
  /* PHOTO MARQUEE */
  .photo-marquee{padding:48px 0;}
  .photo-track img{height:140px;border-radius:12px;}
  /* LOCATION */
  .location-map{height:280px;border-radius:16px;}
  .loc-block{padding:20px 0;}
  /* CTA */
  .cta-inner h2{font-size:clamp(1.6rem,5vw,2.4rem);}
  .cta-inner>p{font-size:0.85rem;margin-bottom:32px;}
  /* FOOTER */
  footer{padding:32px 20px;}
  .footer-inner{flex-direction:column;text-align:center;gap:20px;}
  .footer-left{font-size:0.72rem;line-height:1.9;}
  .footer-right{flex-wrap:wrap;justify-content:center;gap:20px;}
  /* SECTION */
  .sec-pad{padding:clamp(60px,10vw,120px) 20px;}
  .sec-title{font-size:clamp(1.6rem,5vw,2.4rem)!important;letter-spacing:-1px;}
  .sec-label{font-size:0.55rem;letter-spacing:5px;}
  /* 모바일 메뉴 */
  .mob-link{font-size:clamp(1.3rem,4.5vw,2rem);padding:10px 0;letter-spacing:2px;}
  .mob-link-sub{font-size:clamp(0.8rem,2.2vw,1rem)!important;padding:6px 0!important;}
  .mob-menu-footer{bottom:32px;font-size:0.7rem;}
}
@media(max-width:480px){
  .hero-title-line{font-size:clamp(1.7rem,7.5vw,2.5rem)!important;}
  .key-num{padding:40px 16px;}
  .key-num .big{font-size:clamp(4rem,14vw,6rem);}
  .key-num .big-ghost{font-size:clamp(9rem,28vw,14rem);}
  .key-num .big-unit{font-size:clamp(1rem,3vw,1.4rem);}
  .key-num .label{font-size:0.55rem;letter-spacing:4px;}
  .key-num .sub-stats{gap:24px;}
  .sub-stat .sub-val{font-size:1.2rem;}
  .philosophy-text{font-size:clamp(1.3rem,4.5vw,1.6rem)!important;}
  .v-card{padding:28px 20px;}
  .v-card h3{font-size:0.9rem;}
  .treat-card{min-height:240px;}
  .treat-card h3{font-size:1.05rem;}
  .treat-card p{font-size:0.78rem;}
  .sec-pad{padding:48px 16px;}
  .btn{padding:14px 24px;font-size:0.68rem;letter-spacing:2px;}
  .exp-text{padding:36px 16px;}
  .exp-images-grid{height:220px;}
  .photo-track img{height:110px;}
  .cta-inner h2{font-size:clamp(1.4rem,5vw,2rem);}
  .mob-link{font-size:clamp(1.1rem,4vw,1.6rem);letter-spacing:1px;}
  .mob-link-sub{font-size:clamp(0.75rem,2vw,0.85rem)!important;}
  /* 하단 고정 전화 버튼 */
}
/* 모바일 전용: 하단 고정 전화 + 네이버 버튼 */
@media(max-width:768px){
  .mob-bottom-bar{position:fixed;bottom:0;left:0;right:0;z-index:9998;display:flex;gap:1px;background:rgba(10,10,10,0.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(247,186,24,0.15);padding:0;safe-area-inset-bottom:env(safe-area-inset-bottom);}
  .mob-bottom-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:16px 12px;font-family:var(--font-display);font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(--white);transition:all 0.3s;text-decoration:none;}
  .mob-bottom-btn i{font-size:0.9rem;}
  .mob-bottom-btn.btn-call{background:var(--gold);color:var(--black);}
  .mob-bottom-btn.btn-blog{background:rgba(255,255,255,0.06);}
  .mob-bottom-btn.btn-blog:hover{background:rgba(247,186,24,0.1);}
  /* CTA, 푸터 하단 여백 */
  .cta{padding-bottom:100px!important;}
  footer{padding-bottom:80px!important;}
}
@media(min-width:769px){
  .mob-bottom-bar{display:none;}
}
</style>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XLNXRXGGJM"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XLNXRXGGJM',{anonymize_ip:true});</script>
<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","yc827a3fst");</script>
<script defer src="https://pf-dashboard-2nt.pages.dev/beacon.js"></script>
</head>
<body>

<!-- CUSTOM CURSOR -->
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>

<!-- PRELOADER -->
<div class="preloader" id="preloader">
  <div class="preloader-counter" id="preloaderCount">0</div>
  <div class="preloader-bar"><div class="preloader-bar-fill" id="preloaderBar"></div></div>
  <div class="preloader-label">Loading Experience</div>
</div>

<!-- SCROLL PROGRESS -->
<div class="scroll-progress" id="scrollProgress"></div>

<!-- NAV -->
<nav id="nav">
  <div class="nav-inner">
    <a href="#" class="nav-brand"><em>Yein</em> Dental</a>
    <div class="nav-links">
      <a href="/philosophy" class="nav-link">Philosophy</a>
      <div class="nav-dropdown-wrap">
        <a href="/treatments/implant" class="nav-link">Treatments <i class="fas fa-chevron-down" style="font-size:0.45rem;margin-left:4px;"></i></a>
        <div class="nav-dropdown">
          <a href="/treatments/implant" class="nav-dropdown-item">발치즉시 임플란트</a>
          <a href="/treatments/preservation" class="nav-dropdown-item">치아 보존 치료</a>
          <a href="/treatments/aesthetic" class="nav-dropdown-item">앞니 심미 치료</a>
          <a href="/treatments/orthodontics" class="nav-dropdown-item">치아 교정</a>
          <a href="/treatments/general" class="nav-dropdown-item">일반 / 예방 치료</a>
          <div style="border-top:1px solid rgba(255,255,255,0.08);margin:4px 0;"></div>
          <a href="/local" class="nav-dropdown-item">📍 지역별 진료 안내</a>
          <a href="/symptoms" class="nav-dropdown-item">🩺 증상별 가이드</a>
          <a href="/cost" class="nav-dropdown-item">💰 치료비용 안내</a>
          <a href="/compare" class="nav-dropdown-item">⚖️ 치료 비교</a>
        </div>
      </div>
      <a href="/doctors" class="nav-link">Doctors</a>
      <a href="/experience" class="nav-link">Experience</a>
      <div class="nav-dropdown-wrap">
        <a href="/before-after" class="nav-link">Contents <i class="fas fa-chevron-down" style="font-size:0.45rem;margin-left:4px;"></i></a>
        <div class="nav-dropdown">
          <a href="/before-after" class="nav-dropdown-item">비포 & 애프터</a>
          <a href="/blog" class="nav-dropdown-item">블로그</a>
          <a href="/notice" class="nav-dropdown-item">공지사항</a>
        </div>
      </div>
      <a href="/location" class="nav-link">Location</a>
      <a href="/en" class="nav-link" title="English" style="padding:8px 14px;border:1px solid rgba(255,255,255,0.15);border-radius:50px;font-size:0.62rem;letter-spacing:1px;"><i class="fas fa-globe" style="font-size:0.6rem;margin-right:4px;"></i>EN</a>
      <a href="/register" class="nav-link" style="padding:10px 24px;border:1px solid rgba(247,186,24,0.3);border-radius:50px;color:var(--gold);font-size:0.65rem;">회원가입</a>
      <a href="tel:02-756-2828" class="nav-link nav-tel">02.756.2828</a>
    </div>
    <div class="hamburger" id="hamburger">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>

<!-- MOBILE MENU -->
<div class="mob-menu" id="mobMenu">
  <a href="/" class="mob-link" onclick="closeMob()">Home</a>
  <a href="/philosophy" class="mob-link" onclick="closeMob()">Philosophy</a>
  <a href="/treatments/implant" class="mob-link mob-link-sub" onclick="closeMob()">발치즉시 임플란트</a>
  <a href="/treatments/preservation" class="mob-link mob-link-sub" onclick="closeMob()">치아 보존 치료</a>
  <a href="/treatments/aesthetic" class="mob-link mob-link-sub" onclick="closeMob()">앞니 심미 치료</a>
  <a href="/treatments/orthodontics" class="mob-link mob-link-sub" onclick="closeMob()">치아 교정</a>
  <a href="/treatments/general" class="mob-link mob-link-sub" onclick="closeMob()">일반 / 예방 치료</a>
  <a href="/local" class="mob-link" onclick="closeMob()" style="color:#4da3ff;font-weight:600;">📍 지역별 진료</a>
  <a href="/symptoms" class="mob-link" onclick="closeMob()" style="color:#4da3ff;font-weight:600;">🩺 증상별 가이드</a>
  <a href="/cost" class="mob-link" onclick="closeMob()" style="color:#4da3ff;font-weight:600;">💰 치료비용 안내</a>
  <a href="/compare" class="mob-link" onclick="closeMob()" style="color:#4da3ff;font-weight:600;">⚖️ 치료 비교</a>
  <a href="/doctors" class="mob-link" onclick="closeMob()">Doctors</a>
  <a href="/experience" class="mob-link" onclick="closeMob()">Experience</a>
  <a href="/before-after" class="mob-link" onclick="closeMob()">Contents</a>
  <a href="/before-after" class="mob-link mob-link-sub" onclick="closeMob()">비포 & 애프터</a>
  <a href="/blog" class="mob-link mob-link-sub" onclick="closeMob()">블로그</a>
  <a href="/notice" class="mob-link mob-link-sub" onclick="closeMob()">공지사항</a>
  <a href="/location" class="mob-link" onclick="closeMob()">Location</a>
  <a href="/en" class="mob-link" onclick="closeMob()" style="color:#6db3f8;">🌐 English Page</a>
  <a href="/register" class="mob-link" onclick="closeMob()" style="color:var(--gold);font-size:clamp(0.9rem,2.5vw,1.2rem)!important;">회원가입</a>
  <a href="/login" class="mob-link mob-link-sub" onclick="closeMob()">로그인</a>
  <a href="tel:02-756-2828" class="mob-link" onclick="closeMob()" style="color:var(--gold)">02.756.2828</a>
  <div class="mob-menu-footer">Est. 2013 &mdash; Seoul</div>
</div>

<!-- ===== HERO ===== -->
<main>
<section class="hero" role="banner">
  <div class="hero-video-bg">
    <img src="/static/img/dr-han-smile.webp" alt="행복한예인치과 한승대 대표원장 - 서울 시청역·명동·을지로 치과" width="1200" height="800" fetchpriority="high">
    <div class="hero-overlay"></div>
    <div class="hero-noise"></div>
  </div>
  <div class="hero-content">
    <div class="hero-eyebrow">Happy Yein Dental &mdash; Since 2013</div>
    <h1 class="hero-title">
      <span class="hero-title-line"><span class="word">13년,</span></span>
      <span class="hero-title-line"><span class="word"><span class="accent">한자리</span>의 약속</span></span>
      <span class="hero-title-line"><span class="word outline-text">TRUST</span></span>
    </h1>
    <div class="hero-bottom">
      <p class="hero-desc">
        명동·을지로·광화문 직장인 여러분,<br>
        미뤄두셨던 치료, 이제 시작해보세요.<br>
        시청역 5분 · 명동역 8분 · 수요일 야간진료
      </p>
      <div class="hero-evidence" style="display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 4px;">
        <span style="padding:5px 12px;border-radius:20px;background:rgba(247,186,24,0.1);border:1px solid rgba(247,186,24,0.25);color:var(--gold);font-family:var(--font-kr);font-size:0.68rem;font-weight:700;">발치즉시 임플란트 80%+</span>
        <span style="padding:5px 12px;border-radius:20px;background:rgba(247,186,24,0.1);border:1px solid rgba(247,186,24,0.25);color:var(--gold);font-family:var(--font-kr);font-size:0.68rem;font-weight:700;">보존·교정·통합치의학 원장 3인</span>
        <span style="padding:5px 12px;border-radius:20px;background:rgba(247,186,24,0.1);border:1px solid rgba(247,186,24,0.25);color:var(--gold);font-family:var(--font-kr);font-size:0.68rem;font-weight:700;">NYU Implant Institute 수료</span>
        <span style="padding:5px 12px;border-radius:20px;background:rgba(247,186,24,0.1);border:1px solid rgba(247,186,24,0.25);color:var(--gold);font-family:var(--font-kr);font-size:0.68rem;font-weight:700;">2013년 개원 · 13년 한자리</span>
      </div>
      <div class="hero-cta-group">
        <a href="tel:02-756-2828" class="btn btn-gold"><i class="fas fa-phone-alt"></i> 전화예약</a>
        <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener" class="btn btn-naver"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
      </div>
    </div>
  </div>
  <!-- TICKER -->
  <div class="hero-ticker">
    <div class="ticker-track">
      <span class="ticker-item"><span class="dot"></span>Immediate Implant</span>
      <span class="ticker-item"><span class="dot"></span>City Hall Stn 5min</span>
      <span class="ticker-item"><span class="dot"></span>Myeong-dong 8min</span>
      <span class="ticker-item"><span class="dot"></span>Conservation Specialist</span>
      <span class="ticker-item"><span class="dot"></span>Euljiro 7min</span>
      <span class="ticker-item"><span class="dot"></span>Orthodontics</span>
      <span class="ticker-item"><span class="dot"></span>Gwanghwamun 10min</span>
      <span class="ticker-item"><span class="dot"></span>Night Clinic Wed</span>
      <span class="ticker-item"><span class="dot"></span>Hoehyeon 6min</span>
      <span class="ticker-item"><span class="dot"></span>13+ Years Same Place</span>
      <span class="ticker-item"><span class="dot"></span>Immediate Implant</span>
      <span class="ticker-item"><span class="dot"></span>City Hall Stn 5min</span>
      <span class="ticker-item"><span class="dot"></span>Myeong-dong 8min</span>
      <span class="ticker-item"><span class="dot"></span>Conservation Specialist</span>
      <span class="ticker-item"><span class="dot"></span>Euljiro 7min</span>
      <span class="ticker-item"><span class="dot"></span>Orthodontics</span>
      <span class="ticker-item"><span class="dot"></span>Gwanghwamun 10min</span>
      <span class="ticker-item"><span class="dot"></span>Night Clinic Wed</span>
      <span class="ticker-item"><span class="dot"></span>Hoehyeon 6min</span>
      <span class="ticker-item"><span class="dot"></span>13+ Years Same Place</span>
    </div>
  </div>
</section>

<!-- ===== NUMBER STRIP ===== -->
<div class="key-nums">
  <div class="key-num rv">
    <div class="key-num-inner">
      <div class="big-wrap">
        <span class="big-ghost">13</span>
        <span class="big">13<span class="big-unit">yr+</span></span>
      </div>
      <div class="sep-dot"><span></span><span></span><span></span></div>
      <span class="label">Since 2013 &mdash; Same Place</span>
      <p class="desc">시청역·명동·을지로에서 쌓아온 신뢰.<br>변하지 않는 곳에서, 변함없는 진료를.</p>
      <div class="sub-stats">
        <div class="sub-stat"><span class="sub-val">458</span><span class="sub-label">환자 리뷰</span></div>
        <div class="sub-stat"><span class="sub-val">80%+</span><span class="sub-label">즉시 식립률</span></div>
      </div>
    </div>
  </div>
  <div class="key-num rv rv-d1">
    <div class="key-num-inner">
      <div class="big-wrap">
        <span class="big-ghost">3</span>
        <span class="big">3<span class="big-unit">specialists</span></span>
      </div>
      <div class="sep-dot"><span></span><span></span><span></span></div>
      <span class="label">Board-Certified Experts</span>
      <p class="desc">보존과 · 보철과 · 교정과<br>각 분야 전문의가 직접 진료합니다.</p>
      <div class="sub-stats">
        <div class="sub-stat"><span class="sub-val">통합치의학</span><span class="sub-label">한승대 원장</span></div>
        <div class="sub-stat"><span class="sub-val">보존과</span><span class="sub-label">전문의 협진</span></div>
        <div class="sub-stat"><span class="sub-val">교정과</span><span class="sub-label">전문의 협진</span></div>
      </div>
    </div>
  </div>
</div>

<!-- ===== PHILOSOPHY ===== -->
<section class="philosophy sec-pad" id="philosophy">
  <div class="philosophy-inner">
    <p class="philosophy-text rv">
      내 가족에게<br>
      <em>권할 수 없는 치료</em>는<br>
      <span class="thin">시작도 하지 않습니다.</span>
    </p>
    <div class="philosophy-credit rv rv-d1">&mdash; Han Seungdae, D.M.D., Ph.D.</div>
  </div>
</section>

<!-- ===== VALUES ===== -->
<section class="values sec-pad">
  <div class="sec-inner">
    <div class="sec-label">Our Values</div>
    <h2 class="sec-title rv">꾸미지 않은, <em>꼭 필요한</em> 치료만 받고 싶다면</h2>
    <div class="values-grid">
      <div class="v-card rv">
        <div class="v-card-num">01</div>
        <div class="v-card-icon"><i class="fas fa-handshake"></i></div>
        <h3>Trust</h3>
        <p>"원장님은 믿거든요" 라는 말씀을 자주 듣습니다. 과장하지 않고 숨김없는 진료. 13년간 같은 자리에서 쌓아온 신뢰.</p>
      </div>
      <div class="v-card rv rv-d1">
        <div class="v-card-num">02</div>
        <div class="v-card-icon"><i class="fas fa-hand-holding-heart"></i></div>
        <h3>Care</h3>
        <p>환자의 시간, 상황, 선택을 존중합니다. 사회초년생 할인부터, 바쁜 직장인을 위한 효율적인 예약 시스템까지.</p>
      </div>
      <div class="v-card rv rv-d2">
        <div class="v-card-num">03</div>
        <div class="v-card-icon"><i class="fas fa-infinity"></i></div>
        <h3>Sustain</h3>
        <p>환자, 직원, 병원 모두 오래 갈 수 있는 방향을 모색합니다. 단기 매출보다 장기적 관계를 우선합니다.</p>
      </div>
      <div class="v-card rv rv-d3">
        <div class="v-card-num">04</div>
        <div class="v-card-icon"><i class="fas fa-feather-alt"></i></div>
        <h3>Comfort</h3>
        <p>치료 결과만큼 과정에서의 경험도 중요합니다. 치과를 다녀간 뒤 안도감을 느끼실 수 있도록.</p>
      </div>
    </div>
  </div>
</section>

<!-- ===== TREATMENTS ===== -->
<section class="treatments sec-pad" id="treatments">
  <div class="sec-inner">
    <div class="sec-label">Treatments</div>
    <h2 class="sec-title rv">내 치아, 지금 <em>어떤 상태</em>일까요?</h2>
    <div class="treat-grid">
      <!-- Featured: Immediate Implant -->
      <a href="/treatments/implant" class="treat-card treat-featured rv" style="text-decoration:none;color:inherit;">
        <div class="treat-card-content">
          <div class="treat-card-num">01</div>
          <div class="treat-card-tag">Core Treatment</div>
          <h3>발치즉시 임플란트</h3>
          <p>발치와 동시에 임플란트를 식립하여 치료 기간을 획기적으로 단축. 시청역·명동·을지로 직장인의 바쁜 일정에 맞춘 효율적 치료. 80% 이상 즉시식립, 고난이도 케이스까지 대응합니다.</p>
          <div class="treat-pills">
            <span class="treat-pill">Time-Saving</span>
            <span class="treat-pill">High Difficulty</span>
            <span class="treat-pill">80%+ Immediate</span>
          </div>
        </div>
        <div class="treat-featured-img">
          <img src="/static/img/treat-1.webp" alt="행복한예인치과 발치즉시 임플란트 시술 - 80% 이상 즉시식립" width="600" height="400" loading="lazy">
        </div>
      </a>
      <!-- Conservation -->
      <a href="/treatments/preservation" class="treat-card rv" style="text-decoration:none;color:inherit;">
        <div class="treat-card-bg"><img src="/static/img/treat-2.webp" alt="치아보존치료 - 보존과 담당 원장 직접 신경치료" width="600" height="400" loading="lazy"></div>
        <div class="treat-card-content">
          <div class="treat-card-num">02</div>
          <div class="treat-card-tag">Preservation</div>
          <h3>치아 보존 치료</h3>
          <p>보존과 담당 원장가 직접 치료. 최대한 자연 치아를 살리는 신경치료 및 보존 수복.</p>
          <div class="treat-pills">
            <span class="treat-pill">Specialist</span>
            <span class="treat-pill">Natural Tooth</span>
          </div>
        </div>
      </a>
      <!-- Aesthetic -->
      <a href="/treatments/aesthetic" class="treat-card rv rv-d1" style="text-decoration:none;color:inherit;">
        <div class="treat-card-bg"><img src="/static/img/treat-3.webp" alt="앞니 심미치료 - 최소삭제 라미네이트 레진" width="600" height="400" loading="lazy"></div>
        <div class="treat-card-content">
          <div class="treat-card-num">03</div>
          <div class="treat-card-tag">Aesthetic</div>
          <h3>앞니 심미 치료</h3>
          <p>치아 삭제량을 최소화하는 전치부 레진 및 라미네이트 치료. 자연스러운 미소 설계.</p>
          <div class="treat-pills">
            <span class="treat-pill">Minimal Prep</span>
            <span class="treat-pill">Laminate</span>
          </div>
        </div>
      </a>
      <!-- Orthodontics -->
      <a href="/treatments/orthodontics" class="treat-card rv" style="text-decoration:none;color:inherit;">
        <div class="treat-card-bg"><img src="/static/img/treat-4.webp" alt="치아교정 - 교정과 전문의 투명교정 설측교정" width="600" height="400" loading="lazy"></div>
        <div class="treat-card-content">
          <div class="treat-card-num">04</div>
          <div class="treat-card-tag">Orthodontics</div>
          <h3>치아 교정</h3>
          <p>교정과 전문의의 체계적인 교정. 투명교정부터 설측교정까지.</p>
          <div class="treat-pills">
            <span class="treat-pill">Invisalign</span>
            <span class="treat-pill">Lingual</span>
          </div>
        </div>
      </a>
      <!-- General -->
      <a href="/treatments/general" class="treat-card rv rv-d1" style="text-decoration:none;color:inherit;">
        <div class="treat-card-bg"><img src="/static/img/treat-5.webp" alt="일반 예방 치료 - 정기검진 스케일링 충치치료" width="600" height="400" loading="lazy"></div>
        <div class="treat-card-content">
          <div class="treat-card-num">05</div>
          <div class="treat-card-tag">General Care</div>
          <h3>일반 / 예방 치료</h3>
          <p>정기검진, 스케일링, 충치치료. 기본에 충실하되 편안함을 더합니다.</p>
          <div class="treat-pills">
            <span class="treat-pill">Check-up</span>
            <span class="treat-pill">Painless</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- ===== TEAM ===== -->
<section class="team sec-pad" id="team">
  <div class="sec-inner">
    <div class="sec-label" style="color:var(--gold-deep);">Doctors</div>
    <h2 class="sec-title rv">임플란트도 교정도, <em>전문의에게</em> 직접 받고 싶다면</h2>
    <div class="team-grid">
      <div class="team-card lead rv">
        <div class="team-photo">
          <img src="/static/img/dr-han-profile.webp" alt="한승대 대표원장 - 통합치의학과 전문의 치의학박사" width="400" height="533" loading="lazy">
          <div class="team-photo-overlay"></div>
          <div class="team-badge">Lead Doctor</div>
        </div>
        <div class="team-info">
          <h3>한승대</h3>
          <div class="role">Integrative Dentistry Specialist, Ph.D.</div>
          <ul class="team-creds">
            <li>보건복지부 인증 통합치의학과 전문의</li>
            <li>경희대 치의학전문대학원 치의학박사</li>
            <li>고려대학교 졸업</li>
            <li>NYU Implant Institute Course 수료</li>
            <li>대한악안면임플란트학회 정회원</li>
          </ul>
        </div>
      </div>
      <div class="team-card rv rv-d1">
        <div class="team-photo">
          <div class="team-photo-placeholder"><i class="fas fa-user-md"></i></div>
        </div>
        <div class="team-info">
          <h3>박미나</h3>
          <div class="role">Conservative Dentistry</div>
          <ul class="team-creds">
            <li>연세대학교 치과대학 치의학과 졸업</li>
            <li>연세대학교 치과대학 보존과 석사</li>
            <li>연세대 신촌 세브란스 치과병원 보존과 수련</li>
            <li>연세대 치과대학 치과보존과 외래교수 역임</li>
            <li>SCI 논문 등재 (J Endod 2014)</li>
          </ul>
        </div>
      </div>
      <div class="team-card rv rv-d2">
        <div class="team-photo">
          <div class="team-photo-placeholder"><i class="fas fa-user-md"></i></div>
        </div>
        <div class="team-info">
          <h3>박현미</h3>
          <div class="role">Orthodontics Specialist</div>
          <ul class="team-creds">
            <li>연세대학교 졸업</li>
            <li>연세대 치의학대학원 교정과 석사</li>
            <li>에이플러스치과병원 교정과 전임의</li>
            <li>인비절라인 투명교정 수료</li>
            <li>Columbia University CE 수료</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== EXPERIENCE ===== -->
<section class="experience" id="experience">
  <div class="exp-grid">
    <div class="exp-images">
      <div class="exp-images-grid">
        <img src="/static/img/consult-2.webp" alt="행복한예인치과 환자 상담 장면" width="600" height="400" loading="lazy">
        <img src="/static/img/xray-1.webp" alt="X-ray 디지털 진단 장비" width="600" height="400" loading="lazy">
        <img src="/static/img/treat-2.webp" alt="행복한예인치과 보존 치료 진료" width="600" height="400" loading="lazy">
      </div>
    </div>
    <div class="exp-text">
      <div class="sec-label">Patient Experience</div>
      <h2 class="rv">치과를 다녀간 뒤<br><em>안도감</em>을 느끼셨으면.</h2>
      <p class="rv rv-d1">긴장하고 오셨다가 생각보다 아프지 않아서 놀라셨다는 말씀.<br>그 한마디가 저희에게 가장 큰 보람입니다.</p>
      <ul class="exp-list">
        <li class="exp-item rv rv-d1">
          <div class="exp-item-icon"><i class="fas fa-hand-sparkles"></i></div>
          <div>
            <h4>Gentle Touch</h4>
            <p>마취 주사 전 도포마취 적용 — 바늘 들어가는 순간부터 다릅니다</p>
          </div>
        </li>
        <li class="exp-item rv rv-d2">
          <div class="exp-item-icon"><i class="fas fa-clock"></i></div>
          <div>
            <h4>Time-Efficient</h4>
            <p>바쁜 직장인을 기준으로 설계된 진료 프로세스</p>
          </div>
        </li>
        <li class="exp-item rv rv-d2">
          <div class="exp-item-icon"><i class="fas fa-comments"></i></div>
          <div>
            <h4>Clear Communication</h4>
            <p>X-ray 앞에서 이해가 될 때까지 설명합니다</p>
          </div>
        </li>
        <li class="exp-item rv rv-d3">
          <div class="exp-item-icon"><i class="fas fa-shield-alt"></i></div>
          <div>
            <h4>Aftercare</h4>
            <p>치료 후에도 꾸준한 관리와 사후 케어</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<!-- ===== PHOTO MARQUEE ===== -->
<div class="photo-marquee">
  <div class="photo-track">
    <img src="/static/img/consult-1.webp" alt="행복한예인치과 환자 상담" width="390" height="260" loading="lazy">
    <img src="/static/img/treat-6.webp" alt="치과 치료 시술 장면" width="390" height="260" loading="lazy">
    <img src="/static/img/treat-4.webp" alt="교정 치료 진행" width="390" height="260" loading="lazy">
    <img src="/static/img/dr-han-logo.webp" alt="행복한예인치과 로고" width="390" height="260" loading="lazy">
    <img src="/static/img/consult-3.webp" alt="X-ray 진단 상담" width="390" height="260" loading="lazy">
    <img src="/static/img/treat-7.webp" alt="정밀 치과 시술" width="390" height="260" loading="lazy">
    <img src="/static/img/treat-5.webp" alt="예방 치료 스케일링" width="390" height="260" loading="lazy">
    <img src="/static/img/xray-3.webp" alt="파노라마 X-ray 촬영" width="390" height="260" loading="lazy">
    <img src="/static/img/dr-han-front.webp" alt="한승대 원장 진료" width="390" height="260" loading="lazy">
    <img src="/static/img/xray-2.webp" alt="구강내 진단 촬영" width="390" height="260" loading="lazy">
    <!-- duplicate for seamless loop -->
    <img src="/static/img/consult-1.webp" alt="행복한예인치과 환자 상담" width="390" height="260" loading="lazy">
    <img src="/static/img/treat-6.webp" alt="치과 치료 시술 장면" width="390" height="260" loading="lazy">
    <img src="/static/img/treat-4.webp" alt="교정 치료 진행" width="390" height="260" loading="lazy">
    <img src="/static/img/dr-han-logo.webp" alt="행복한예인치과 로고" width="390" height="260" loading="lazy">
    <img src="/static/img/consult-3.webp" alt="X-ray 진단 상담" width="390" height="260" loading="lazy">
    <img src="/static/img/treat-7.webp" alt="정밀 치과 시술" width="390" height="260" loading="lazy">
    <img src="/static/img/treat-5.webp" alt="예방 치료 스케일링" width="390" height="260" loading="lazy">
    <img src="/static/img/xray-3.webp" alt="파노라마 X-ray 촬영" width="390" height="260" loading="lazy">
    <img src="/static/img/dr-han-front.webp" alt="한승대 원장 진료" width="390" height="260" loading="lazy">
    <img src="/static/img/xray-2.webp" alt="구강내 진단 촬영" width="390" height="260" loading="lazy">
  </div>
</div>

<!-- ===== LOCATION ===== -->
<section class="location sec-pad" id="location">
  <div class="sec-inner">
    <div class="sec-label" style="color:var(--gold-deep)">Location</div>
    <h2 class="sec-title rv">시청역·명동·을지로에서 <em>도보 5~10분</em></h2>
    <div class="location-grid">
      <div class="location-map rv-scale">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d790.6!2d126.978!3d37.566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb1a2f4b7d%3A0x!2z7ISc7Jq4IOykkSDrgqjrjIDrrLjroZw56ri4IDUx!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr" allowfullscreen="" loading="lazy" title="행복한예인치과 위치 - 서울 중구 남대문로9길 51"></iframe>
      </div>
      <div class="loc-info">
        <div class="loc-block rv">
          <div class="loc-label">Address</div>
          <div class="loc-value">
            서울 중구 남대문로9길 51<br>효덕빌딩 3층 301호
            <small>시청역 5분 · 명동역 8분 · 을지로입구역 7분 · 회현역 6분</small>
          </div>
        </div>
        <div class="loc-block rv rv-d1">
          <div class="loc-label">Contact</div>
          <div class="loc-value">
            <a href="tel:02-756-2828">02.756.2828</a>
            <small>FAX 02-754-8188</small>
          </div>
        </div>
        <div class="loc-block rv rv-d2">
          <div class="loc-label">Hours</div>
          <div class="loc-value">
            <div class="hours-grid">
              <span class="day">Mon</span><span class="time">09:30 – 18:30</span>
              <span class="day">Tue</span><span class="time">09:30 – 18:30</span>
              <span class="day">Wed</span><span class="time">09:30 – 20:00 <span class="night-badge">Night</span></span>
              <span class="day">Thu</span><span class="time">09:30 – 18:30</span>
              <span class="day">Fri</span><span class="time">09:30 – 18:30</span>
              <span class="day off">Sat</span><span class="time off">Closed</span>
              <span class="day off">Sun</span><span class="time off">Closed</span>
            </div>
            <small style="margin-top:12px;display:block;">Lunch 13:00–14:00 / Last reception 1hr before closing</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== FAQ (AEO 최적화) - 35개 질문 ===== -->
<section class="faq sec-pad" id="faq">
  <div class="sec-inner">
    <div class="sec-label">FAQ</div>
    <h2 class="sec-title rv">자주 묻는 <em>질문</em></h2>

    <!-- FAQ 카테고리 필터 -->
    <div class="faq-categories rv" style="display:flex;gap:10px;justify-content:center;margin:32px 0 0;flex-wrap:wrap;">
      <button class="faq-cat-btn active" onclick="filterFaq('all',this)" style="padding:8px 22px;border-radius:50px;border:1px solid rgba(247,186,24,0.3);background:rgba(247,186,24,0.1);color:var(--gold);font-family:var(--font-kr);font-size:0.78rem;cursor:pointer;transition:all 0.3s;">전체</button>
      <button class="faq-cat-btn" onclick="filterFaq('basic',this)" style="padding:8px 22px;border-radius:50px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--gray-light);font-family:var(--font-kr);font-size:0.78rem;cursor:pointer;transition:all 0.3s;">기본 정보</button>
      <button class="faq-cat-btn" onclick="filterFaq('treatment',this)" style="padding:8px 22px;border-radius:50px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--gray-light);font-family:var(--font-kr);font-size:0.78rem;cursor:pointer;transition:all 0.3s;">치료 안내</button>
      <button class="faq-cat-btn" onclick="filterFaq('location',this)" style="padding:8px 22px;border-radius:50px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--gray-light);font-family:var(--font-kr);font-size:0.78rem;cursor:pointer;transition:all 0.3s;">찾아오시는 길</button>
      <button class="faq-cat-btn" onclick="filterFaq('life',this)" style="padding:8px 22px;border-radius:50px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--gray-light);font-family:var(--font-kr);font-size:0.78rem;cursor:pointer;transition:all 0.3s;">직장인·생활</button>
    </div>

    <div class="faq-list" id="faqList">
${mainFaqData.map(f => `      <div class="faq-item rv" data-cat="${f.cat}">
        <div class="faq-q" role="button" tabindex="0" aria-expanded="false" onclick="toggleFaq(this)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleFaq(this);}"><h4>${escFaq(f.q)}</h4><i class="fas fa-chevron-down"></i></div>
        <div class="faq-a"><p>${escFaq(f.a)}</p></div>
      </div>`).join('\n')}
    </div>
  </div>
</section>

<!-- ===== 지역 SEO 섹션 (AEO + Local SEO) ===== -->
<section class="sec-pad" style="background:var(--dark);border-top:1px solid rgba(255,255,255,0.03);">
  <div class="sec-inner" style="text-align:center;">
    <div class="sec-label" style="justify-content:center;">Nearby Access</div>
    <h2 class="sec-title rv" style="margin-bottom:16px;">어디서든 <em>가까운</em> 행복한예인치과</h2>
    <p class="rv rv-d1" style="font-family:var(--font-kr);font-size:0.92rem;color:var(--gray-light);font-weight:300;line-height:2;max-width:700px;margin:0 auto 48px;">
      시청역·명동·을지로·광화문·종로·서울역·회현·충무로·남산 등<br>
      서울 도심 어디에서든 대중교통으로 5~15분이면 도착합니다.
    </p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;max-width:1000px;margin:0 auto;">
      <div class="rv" style="background:var(--dark-card);border-radius:16px;padding:28px 20px;border:1px solid rgba(255,255,255,0.04);">
        <div style="font-family:var(--font-number);font-size:2rem;color:var(--gold);line-height:1;">5<span style="font-size:0.7rem;letter-spacing:2px;">MIN</span></div>
        <div style="font-family:var(--font-kr);font-size:0.85rem;color:var(--white);margin-top:8px;font-weight:500;">시청역</div>
        <div style="font-family:var(--font-kr);font-size:0.72rem;color:var(--gray);margin-top:4px;">1·2호선 4·5번 출구</div>
      </div>
      <div class="rv rv-d1" style="background:var(--dark-card);border-radius:16px;padding:28px 20px;border:1px solid rgba(255,255,255,0.04);">
        <div style="font-family:var(--font-number);font-size:2rem;color:var(--gold);line-height:1;">6<span style="font-size:0.7rem;letter-spacing:2px;">MIN</span></div>
        <div style="font-family:var(--font-kr);font-size:0.85rem;color:var(--white);margin-top:8px;font-weight:500;">회현역</div>
        <div style="font-family:var(--font-kr);font-size:0.72rem;color:var(--gray);margin-top:4px;">4호선 남대문시장 방향</div>
      </div>
      <div class="rv rv-d2" style="background:var(--dark-card);border-radius:16px;padding:28px 20px;border:1px solid rgba(255,255,255,0.04);">
        <div style="font-family:var(--font-number);font-size:2rem;color:var(--gold);line-height:1;">7<span style="font-size:0.7rem;letter-spacing:2px;">MIN</span></div>
        <div style="font-family:var(--font-kr);font-size:0.85rem;color:var(--white);margin-top:8px;font-weight:500;">을지로입구역</div>
        <div style="font-family:var(--font-kr);font-size:0.72rem;color:var(--gray);margin-top:4px;">2호선 1번 출구</div>
      </div>
      <div class="rv rv-d3" style="background:var(--dark-card);border-radius:16px;padding:28px 20px;border:1px solid rgba(255,255,255,0.04);">
        <div style="font-family:var(--font-number);font-size:2rem;color:var(--gold);line-height:1;">8<span style="font-size:0.7rem;letter-spacing:2px;">MIN</span></div>
        <div style="font-family:var(--font-kr);font-size:0.85rem;color:var(--white);margin-top:8px;font-weight:500;">명동역</div>
        <div style="font-family:var(--font-kr);font-size:0.72rem;color:var(--gray);margin-top:4px;">4호선 3번 출구</div>
      </div>
      <div class="rv rv-d3" style="background:var(--dark-card);border-radius:16px;padding:28px 20px;border:1px solid rgba(255,255,255,0.04);">
        <div style="font-family:var(--font-number);font-size:2rem;color:var(--gold);line-height:1;">10<span style="font-size:0.7rem;letter-spacing:2px;">MIN</span></div>
        <div style="font-family:var(--font-kr);font-size:0.85rem;color:var(--white);margin-top:8px;font-weight:500;">광화문·종로·충무로</div>
        <div style="font-family:var(--font-kr);font-size:0.72rem;color:var(--gray);margin-top:4px;">5호선·1호선·3호선</div>
      </div>
      <div class="rv rv-d4" style="background:var(--dark-card);border-radius:16px;padding:28px 20px;border:1px solid rgba(255,255,255,0.04);">
        <div style="font-family:var(--font-number);font-size:2rem;color:var(--gold);line-height:1;">12<span style="font-size:0.7rem;letter-spacing:2px;">MIN</span></div>
        <div style="font-family:var(--font-kr);font-size:0.85rem;color:var(--white);margin-top:8px;font-weight:500;">서울역</div>
        <div style="font-family:var(--font-kr);font-size:0.72rem;color:var(--gray);margin-top:4px;">1호선 시청역 방향 1정거장</div>
      </div>
    </div>
    <p class="rv" style="font-family:var(--font-kr);font-size:0.78rem;color:var(--gray);margin-top:32px;line-height:1.9;max-width:800px;margin-left:auto;margin-right:auto;">
      행복한예인치과는 서울 중구 남대문로9길 51 효덕빌딩 3층에 위치합니다.<br>
      북창동·다동·무교동·남산·소공동 등 도심 생활권에서 도보 이동이 가능하며,<br>
      시청역·명동역·을지로입구역·회현역·광화문역·종로3가역·충무로역·서울역 등 주변 지하철역과 인접해 있습니다.
    </p>
    <!-- 지역별 진료 빠른 링크 -->
    <div style="margin-top:40px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.06);">
      <h3 class="rv" style="font-family:var(--font-kr);font-size:0.95rem;color:var(--gold);margin-bottom:16px;font-weight:600;">📍 지역별 전문 진료 바로가기</h3>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:900px;margin:0 auto;">
        <a href="/local/sicheong-implant" style="padding:8px 16px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.78rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">시청역 임플란트</a>
        <a href="/local/myeongdong-implant" style="padding:8px 16px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.78rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">명동 임플란트</a>
        <a href="/local/euljiro-preservation" style="padding:8px 16px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.78rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">을지로 신경치료</a>
        <a href="/local/gwanghwamun-orthodontics" style="padding:8px 16px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.78rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">광화문 교정</a>
        <a href="/local/hoehyeon-aesthetic" style="padding:8px 16px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.78rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">회현역 라미네이트</a>
        <a href="/local/seoul-station-general" style="padding:8px 16px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.78rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">서울역 스케일링</a>
        <a href="/local" style="padding:8px 16px;border-radius:20px;background:rgba(247,186,24,0.15);border:1px solid rgba(247,186,24,0.3);color:var(--gold);font-size:0.78rem;font-family:var(--font-kr);text-decoration:none;font-weight:600;transition:all 0.2s;">전체 보기 →</a>
      </div>
    </div>
  </div>
</section>

<!-- ===== 증상별 가이드 바로가기 ===== -->
<section class="sec-pad" style="background:var(--black-warm);border-top:1px solid rgba(255,255,255,0.03);padding-top:80px;padding-bottom:80px;">
  <div style="max-width:1200px;margin:0 auto;text-align:center;">
    <p class="rv" style="font-family:var(--font-display);font-size:0.65rem;text-transform:uppercase;letter-spacing:6px;color:var(--gold);margin-bottom:12px;">Symptom Guide</p>
    <h2 class="rv" style="font-family:var(--font-kr);font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;letter-spacing:-1px;margin-bottom:16px;">🩺 이런 증상이 있으신가요?</h2>
    <p class="rv" style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gray);line-height:1.9;margin-bottom:40px;">증상에 맞는 전문 진료 가이드를 확인하세요. 행복한예인치과 전문의가 원인과 치료법을 안내합니다.</p>
    <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:1000px;margin:0 auto;">
      <a href="/symptoms/toothache" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">🦷 이가 아파요</a>
      <a href="/symptoms/sensitive-teeth" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">🥶 이가 시려요</a>
      <a href="/symptoms/bleeding-gums" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">🩸 잇몸 출혈</a>
      <a href="/symptoms/swollen-gums" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">😣 잇몸 부음</a>
      <a href="/symptoms/bad-breath" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">💨 입냄새</a>
      <a href="/symptoms/wisdom-tooth-pain" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">🦷 사랑니 통증</a>
      <a href="/symptoms/dental-anxiety" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">😰 치과 공포증</a>
      <a href="/symptoms/broken-front-tooth" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">💔 앞니 깨짐</a>
      <a href="/symptoms/jaw-pain" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">😖 턱관절 통증</a>
      <a href="/symptoms/implant-consultation" style="padding:10px 18px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">🏥 임플란트 상담</a>
      <a href="/symptoms" style="padding:10px 20px;border-radius:24px;background:rgba(247,186,24,0.15);border:1px solid rgba(247,186,24,0.3);color:var(--gold);font-size:0.8rem;font-family:var(--font-kr);text-decoration:none;font-weight:700;transition:all 0.2s;">전체 증상 가이드 →</a>
    </div>
  </div>
</section>

<!-- ===== 치료비용 & 비교 바로가기 ===== -->
<section class="sec-pad" style="background:linear-gradient(135deg,rgba(1,60,136,0.06),rgba(247,186,24,0.04));border-top:1px solid rgba(255,255,255,0.03);padding-top:80px;padding-bottom:80px;">
  <div style="max-width:1200px;margin:0 auto;text-align:center;">
    <p class="rv" style="font-family:var(--font-display);font-size:0.65rem;text-transform:uppercase;letter-spacing:6px;color:var(--gold);margin-bottom:12px;">Treatment Cost & Comparison</p>
    <h2 class="rv" style="font-family:var(--font-kr);font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;letter-spacing:-1px;margin-bottom:16px;">💰 치료비용이 궁금하신가요?</h2>
    <p class="rv" style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gray);line-height:1.9;margin-bottom:40px;">투명한 치료비용 안내와 치료법 비교로 최적의 선택을 도와드립니다.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;max-width:1000px;margin:0 auto 32px;">
      <div style="background:rgba(247,186,24,0.05);border:1px solid rgba(247,186,24,0.12);border-radius:16px;padding:24px;text-align:left;">
        <h3 style="font-family:var(--font-kr);font-size:1rem;font-weight:700;color:var(--white);margin-bottom:12px;">💰 치료비용 안내</h3>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <a href="/cost/implant-cost" style="padding:6px 14px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">임플란트 비용</a>
          <a href="/cost/orthodontics-cost" style="padding:6px 14px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">교정 비용</a>
          <a href="/cost/aesthetic-cost" style="padding:6px 14px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">심미치료 비용</a>
          <a href="/cost/crown-cost" style="padding:6px 14px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">크라운 비용</a>
          <a href="/cost/scaling-cost" style="padding:6px 14px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">스케일링 비용</a>
          <a href="/cost" style="padding:6px 16px;border-radius:20px;background:rgba(247,186,24,0.15);border:1px solid rgba(247,186,24,0.3);color:var(--gold);font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;font-weight:700;transition:all 0.2s;">전체 비용 안내 →</a>
        </div>
      </div>
      <div style="background:rgba(1,60,136,0.05);border:1px solid rgba(1,60,136,0.12);border-radius:16px;padding:24px;text-align:left;">
        <h3 style="font-family:var(--font-kr);font-size:1rem;font-weight:700;color:var(--white);margin-bottom:12px;">⚖️ 치료 비교</h3>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <a href="/compare/implant-vs-bridge" style="padding:6px 14px;border-radius:20px;background:rgba(1,60,136,0.08);border:1px solid rgba(1,60,136,0.15);color:#6db3f8;font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">임플란트 vs 브릿지</a>
          <a href="/compare/laminate-vs-resin" style="padding:6px 14px;border-radius:20px;background:rgba(1,60,136,0.08);border:1px solid rgba(1,60,136,0.15);color:#6db3f8;font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">라미네이트 vs 레진</a>
          <a href="/compare/clear-vs-metal-braces" style="padding:6px 14px;border-radius:20px;background:rgba(1,60,136,0.08);border:1px solid rgba(1,60,136,0.15);color:#6db3f8;font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">투명교정 vs 메탈교정</a>
          <a href="/compare/implant-vs-denture" style="padding:6px 14px;border-radius:20px;background:rgba(1,60,136,0.08);border:1px solid rgba(1,60,136,0.15);color:#6db3f8;font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">임플란트 vs 틀니</a>
          <a href="/compare" style="padding:6px 16px;border-radius:20px;background:rgba(1,60,136,0.15);border:1px solid rgba(1,60,136,0.3);color:#6db3f8;font-size:0.75rem;font-family:var(--font-kr);text-decoration:none;font-weight:700;transition:all 0.2s;">전체 비교 가이드 →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== CTA ===== -->
<section class="cta sec-pad">
  <div class="cta-inner">
    <h2 class="rv">치료를 미루고 계셨다면,<br>지금이 <em>그때</em>입니다.</h2>
    <p class="rv rv-d1">명동·을지로·광화문에서 10분 이내,<br>시청역 도보 5분. 수요일 야간진료까지.</p>
    <div class="cta-btns rv rv-d2">
      <a href="tel:02-756-2828" class="btn btn-gold"><i class="fas fa-phone-alt"></i> 전화예약</a>
      <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener" class="btn btn-naver"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
      <a href="http://pf.kakao.com/_Nxfczxh" target="_blank" rel="noopener" class="btn btn-ghost" style="border-color:rgba(250,225,0,0.4);color:#FAE100;"><i class="fas fa-comment"></i> 카톡 문의</a>
    </div>
    <p class="rv rv-d2" style="margin-top:18px;font-family:var(--font-kr);font-size:0.78rem;color:var(--gray);">💬 카카오톡 채널·네이버 톡톡 문의 시 <strong style="color:var(--gold);">진료시간 내 30분 이내</strong>, 이메일 문의는 <strong style="color:var(--gold);">24시간 이내</strong> 답변드립니다.</p>
  </div>
</section>
</main>

<!-- ===== FOOTER ===== -->
<footer>
  <div class="footer-sitemap" role="navigation" aria-label="주요 콘텐츠 바로가기" style="max-width:1200px;margin:0 auto;padding:32px 24px 8px;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:24px;font-size:0.78rem;">
    <div>
      <strong style="display:block;color:#F7BA18;margin-bottom:10px;font-size:0.7rem;letter-spacing:1.5px;text-transform:uppercase;">진료과목</strong>
      <a href="/treatments/implant" style="display:block;color:#999;padding:3px 0;">발치즉시 임플란트</a>
      <a href="/treatments/preservation" style="display:block;color:#999;padding:3px 0;">신경치료·보존</a>
      <a href="/treatments/orthodontics" style="display:block;color:#999;padding:3px 0;">투명교정</a>
      <a href="/treatments/aesthetic" style="display:block;color:#999;padding:3px 0;">앞니 심미치료</a>
      <a href="/treatments/general" style="display:block;color:#999;padding:3px 0;">스케일링·예방</a>
    </div>
    <div>
      <strong style="display:block;color:#F7BA18;margin-bottom:10px;font-size:0.7rem;letter-spacing:1.5px;text-transform:uppercase;">환자 가이드</strong>
      <a href="/symptoms" style="display:block;color:#999;padding:3px 0;">증상별 가이드</a>
      <a href="/cost" style="display:block;color:#999;padding:3px 0;">치료비용 안내</a>
      <a href="/compare" style="display:block;color:#999;padding:3px 0;">치료 비교</a>
      <a href="/encyclopedia" style="display:block;color:#999;padding:3px 0;">치과백과사전</a>
      <a href="/search" style="display:block;color:#999;padding:3px 0;">통합 검색</a>
    </div>
    <div>
      <strong style="display:block;color:#F7BA18;margin-bottom:10px;font-size:0.7rem;letter-spacing:1.5px;text-transform:uppercase;">병원 안내</strong>
      <a href="/doctors" style="display:block;color:#999;padding:3px 0;">의료진 소개</a>
      <a href="/philosophy" style="display:block;color:#999;padding:3px 0;">진료 철학</a>
      <a href="/location" style="display:block;color:#999;padding:3px 0;">오시는 길</a>
      <a href="/local" style="display:block;color:#999;padding:3px 0;">지역별 안내</a>
      <a href="/blog" style="display:block;color:#999;padding:3px 0;">블로그</a>
    </div>
    <div>
      <strong style="display:block;color:#F7BA18;margin-bottom:10px;font-size:0.7rem;letter-spacing:1.5px;text-transform:uppercase;">International</strong>
      <a href="/en" style="display:block;color:#999;padding:3px 0;">English / 日本語 / 中文</a>
      <a href="/en/emergency-dentist-myeongdong" style="display:block;color:#999;padding:3px 0;">Emergency Dental</a>
      <a href="/en/english-speaking-dentist-myeongdong" style="display:block;color:#999;padding:3px 0;">English-Speaking Dentist</a>
      <a href="/before-after" style="display:block;color:#999;padding:3px 0;">치료 사례</a>
      <a href="/notice" style="display:block;color:#999;padding:3px 0;">공지사항</a>
    </div>
  </div>
  <div class="footer-inner">
    <div class="footer-left">
      <strong>행복한예인치과의원</strong><br>
      서울 중구 남대문로9길 51 효덕빌딩 3층 301호<br>
      대표자: 한승대 | 사업자등록번호: 104-91-44744<br>
      TEL 02-756-2828 | FAX 02-754-8188 | 카톡채널 @행복한예인치과<br>
      문의 답변: 카톡·톡톡은 진료시간 내 30분 이내, 이메일은 24시간 이내<br>
      &copy; 2005–2026 Happy Yein Dental Clinic. All rights reserved.
    </div>
    <div class="footer-right">
      <a href="/register">Register</a>
      <a href="/login">Login</a>
      <a href="https://blog.naver.com/yein2828" target="_blank" rel="noopener">Blog</a>
      <a href="http://pf.kakao.com/_Nxfczxh" target="_blank" rel="noopener">KakaoTalk</a>
      <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener">Reservation</a>
    </div>
  </div>
</footer>

<!-- MOBILE BOTTOM BAR -->
<div class="mob-bottom-bar">
  <a href="tel:02-756-2828" class="mob-bottom-btn btn-call"><i class="fas fa-phone-alt"></i> 전화 상담</a>
  <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener" class="mob-bottom-btn btn-naver-m" style="background:#03C75A;color:#fff;"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
  <a href="http://pf.kakao.com/_Nxfczxh" target="_blank" rel="noopener" class="mob-bottom-btn btn-blog" style="background:#FAE100;color:#3C1E1E;"><i class="fas fa-comment"></i> 카톡문의</a>
</div>

<script>
// ===== PRELOADER WITH COUNTER =====
(function(){
  const counter = document.getElementById('preloaderCount');
  const bar = document.getElementById('preloaderBar');
  const preloader = document.getElementById('preloader');
  let n = 0;
  const interval = setInterval(() => {
    n += Math.floor(Math.random() * 8) + 2;
    if(n > 100) n = 100;
    counter.textContent = n;
    bar.style.width = n + '%';
    if(n >= 100) {
      clearInterval(interval);
      setTimeout(() => preloader.classList.add('done'), 400);
    }
  }, 50);
})();

// ===== CUSTOM CURSOR =====
(function(){
  if(window.innerWidth < 768) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor(){
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    dot.style.left = mx - 4 + 'px';
    dot.style.top = my - 4 + 'px';
    ring.style.left = rx - 20 + 'px';
    ring.style.top = ry - 20 + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a, button, .treat-card, .v-card, .team-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const p = (window.scrollY / h) * 100;
  document.getElementById('scrollProgress').style.width = p + '%';
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 80));

// ===== HAMBURGER =====
const hb = document.getElementById('hamburger');
const mm = document.getElementById('mobMenu');
hb.addEventListener('click', () => {
  hb.classList.toggle('active');
  mm.classList.toggle('open');
  document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
});
function closeMob(){
  hb.classList.remove('active');
  mm.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== SCROLL REVEAL =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.rv, .rv-scale').forEach(el => io.observe(el));

// ===== PARALLAX HERO IMAGE =====
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-video-bg img');
  if(heroImg && window.scrollY < window.innerHeight) {
    heroImg.style.transform = 'scale(' + (1 + window.scrollY * 0.0003) + ') translateY(' + (window.scrollY * 0.15) + 'px)';
  }
});

// ===== FAQ TOGGLE & FILTER =====
function toggleFaq(el){
  const isOpen = el.classList.toggle('open');
  el.nextElementSibling.classList.toggle('open');
  el.setAttribute('aria-expanded', isOpen);
}
function filterFaq(cat,btn){
  document.querySelectorAll('.faq-cat-btn').forEach(b=>{b.style.borderColor='rgba(255,255,255,0.08)';b.style.background='transparent';b.style.color='var(--gray-light)';b.classList.remove('active');});
  btn.style.borderColor='rgba(247,186,24,0.3)';btn.style.background='rgba(247,186,24,0.1)';btn.style.color='var(--gold)';btn.classList.add('active');
  document.querySelectorAll('.faq-item').forEach(item=>{
    if(cat==='all'||item.dataset.cat===cat){item.style.display='';}
    else{item.style.display='none';}
  });
}

// ===== NUMBER COUNTER ANIMATION =====
const numObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const numMatch = text.match(/(\\d+)/);
      if(numMatch) {
        const target = parseInt(numMatch[1]);
        const suffix = text.replace(numMatch[1], '').trim();
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if(current >= target) { current = target; clearInterval(timer); }
          el.innerHTML = current + (el.querySelector('.unit') ? '<span class="unit">' + el.querySelector('.unit').textContent + '</span>' : '');
        }, 30);
      }
      numObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.num-item .num').forEach(el => numObserver.observe(el));
</script>

</body>
</html>`)
})

// ===== INDIVIDUAL PAGES =====
// ===== 통합 검색 (SearchAction 스키마 타겟) =====
app.get('/search', async (c) => {
  const q = c.req.query('q') || '';
  return c.html(await renderSearchPage(q, c.env.DB));
})

app.get('/philosophy', (c) => c.html(philosophyPage()))
app.get('/doctors', (c) => c.html(doctorsPage()))
app.get('/experience', (c) => c.html(experiencePage()))
app.get('/location', (c) => c.html(locationPage()))

// ===== TREATMENT DETAIL PAGES =====
app.get('/treatments/:slug', async (c) => {
  const slug = c.req.param('slug')
  // 진료 상세에 같은 진료의 최신 칼럼·치료 사례 링크 노출 (DB 실패 시 빈 목록)
  const related = await relatedForTreatment(c.env.DB, slug).catch(() => ({ columns: [], cases: [] }))
  const html = renderTreatmentPage(slug, related)
  if (!html) return c.notFound()
  return c.html(html)
})

// ===== LOCAL SEO: 지역×진료 전용 랜딩페이지 (30개+) =====
app.get('/local', (c) => c.html(localSeoIndexPage()))
app.get('/local/:slug', (c) => {
  const slug = c.req.param('slug')
  const html = renderLocalSeoPage(slug)
  if (!html) return c.notFound()
  return c.html(html)
})

// ===== SYMPTOM SEO: 증상별 전용 랜딩페이지 (20개) =====
app.get('/symptoms', (c) => c.html(symptomIndexPage()))
app.get('/symptoms/:slug', (c) => {
  const slug = c.req.param('slug')
  const html = renderSymptomPage(slug)
  if (!html) return c.notFound()
  return c.html(html)
})

// ===== COST SEO: 치료비용 전용 랜딩페이지 (10개) =====
app.get('/cost', (c) => c.html(costIndexPage()))
app.get('/cost/:slug', (c) => {
  const slug = c.req.param('slug')
  const html = renderCostPage(slug)
  if (!html) return c.notFound()
  return c.html(html)
})

// ===== COMPARISON SEO: 치료 비교 콘텐츠 (8개) =====
// 비급여 진료비 안내 (공개) — D1 fee_items 공개 항목만, 폴백 내장
app.get('/fees', async (c) => {
  const items = await getPublishedFees(c.env.DB)
  return c.html(feesPublicPage(items))
})

app.get('/compare', (c) => c.html(comparisonIndexPage()))
app.get('/compare/:slug', (c) => {
  const slug = c.req.param('slug')
  const html = renderComparisonPage(slug)
  if (!html) return c.notFound()
  return c.html(html)
})

// ===== ENGLISH MAIN PAGE: 영어 메인 홈페이지 (한↔영 전환) =====
app.get('/en', (c) => c.html(englishMainPage()))

// ===== FOREIGN EMERGENCY SEO: 외국인 가이드 허브 다국어 (EN/JA/ZH) =====
app.get('/en/guides', (c) => c.html(foreignEmergencyIndexPage()))
app.get('/en/:slug', (c) => {
  const slug = c.req.param('slug')
  const html = renderForeignSeoPage(slug)
  if (!html) return c.notFound()
  return c.html(html)
})
app.get('/en/ja/:slug', (c) => {
  const slug = `ja/${c.req.param('slug')}`
  const html = renderForeignSeoPage(slug)
  if (!html) return c.notFound()
  return c.html(html)
})
app.get('/en/zh/:slug', (c) => {
  const slug = `zh/${c.req.param('slug')}`
  const html = renderForeignSeoPage(slug)
  if (!html) return c.notFound()
  return c.html(html)
})

// ===== AUTH API =====
app.route('/api/auth', authApi)
app.route('/api/user', userAuthApi)

// ===== USER AUTH PAGES =====
app.get('/register', (c) => c.html(registerPage()))
app.get('/login', (c) => c.html(loginPage()))

// ===== BOARD API ROUTES =====
app.route('/api/upload', uploadApi)
app.route('/api/images', imagesApi)
app.route('/api/boards', boardsApi)
app.route('/api/auto-blog', autoBlogApi)
app.route('/api/fees', feesApi)

// ===== ADMIN PAGES =====
app.get('/admin/login', (c) => c.html(adminLoginPage()))
app.get('/admin', (c) => c.html(adminDashboardPage()))
app.get('/admin/indexing', (c) => c.html(indexingDashboardPage()))
app.get('/admin/fees', (c) => c.html(feesAdminPage()))

// ===== ADMIN STATS (중앙 대시보드 연동 통계) =====
app.route('/', statsApp)

// ===== INDEXING MONITOR API =====
app.route('/api/indexing', indexingApi)

// ===== BOARD PAGE ROUTES =====
// 비포 & 애프터
app.get('/before-after', async (c) => c.html(await boardListPage('before-after', c.env.DB, parseInt(c.req.query('page') || '1'), c.req.query('cat') || '')))
app.get('/before-after/write', (c) => c.html(boardWritePage('before-after')))
app.get('/before-after/:id/edit', (c) => c.html(boardEditPage('before-after')))
app.get('/before-after/:id', async (c) => {
  const html = await boardDetailPage('before-after', c.env.DB, c.req.param('id'))
  if (!html) return c.notFound() // 없는 글은 soft 404 대신 404
  return c.html(html)
})

// 블로그
app.get('/blog', async (c) => c.html(await boardListPage('blog', c.env.DB, parseInt(c.req.query('page') || '1'), c.req.query('cat') || '')))
app.get('/blog/write', (c) => c.html(boardWritePage('blog')))
app.get('/blog/:id/edit', (c) => c.html(boardEditPage('blog')))
app.get('/blog/:id', async (c) => {
  const html = await boardDetailPage('blog', c.env.DB, c.req.param('id'))
  if (!html) return c.notFound() // 없는 글은 soft 404 대신 404
  return c.html(html)
})

// 공지사항
app.get('/notice', async (c) => c.html(await boardListPage('notice', c.env.DB, parseInt(c.req.query('page') || '1'), c.req.query('cat') || '')))
app.get('/notice/write', (c) => c.html(boardWritePage('notice')))
app.get('/notice/:id/edit', (c) => c.html(boardEditPage('notice')))
app.get('/notice/:id', async (c) => {
  const html = await boardDetailPage('notice', c.env.DB, c.req.param('id'))
  if (!html) return c.notFound() // 없는 글은 soft 404 대신 404
  return c.html(html)
})

// 치과 백과사전
app.get('/encyclopedia', (c) => c.html(encyclopediaListPage()))
// 블로그 본문 등에 남은 옛/오타 용어 주소 → 실제 용어로 301 (크롤 감사 2026-09 404 6건 + 자동블로그 tooth-structure)
const ENCYCLOPEDIA_ALIASES: Record<string, string> = {
  'caries': 'cavity',
  'chijogol': 'alveolar-bone',
  'osseo': 'osseointegration',
  'osseo-integration': 'osseointegration',
  'dental-ct': 'cbct',
  'ct': 'cbct',
  'tooth-structure': 'dental-formula',
}
app.get('/encyclopedia/:id', (c) => {
  const alias = ENCYCLOPEDIA_ALIASES[c.req.param('id')]
  if (alias) return c.redirect(`/encyclopedia/${alias}`, 301)
  const html = encyclopediaDetailPage(c.req.param('id'))
  if (!html) return c.notFound()
  return c.html(html)
})

app.get('/api/info', (c) => {
  return c.json({
    name: '행복한예인치과의원',
    address: '서울 중구 남대문로9길 51 효덕빌딩 3층 301호',
    tel: '02-756-2828',
    fax: '02-754-8188',
    representative: '한승대',
    business_number: '104-91-44744'
  })
})

// ===== SEO: IndexNow 검증 키 =====
// ===== Naver Search Advisor 소유 확인 HTML =====
app.get('/naver8ab260368363ce856b9dacb72bd69fb8.html', (c) => {
  return c.html('b09b795ebd645faf0bf690fee790d98d6874d9fb', 200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'public, max-age=604800'
  });
})

app.get('/a1b2c3d4e5f6g7h8i9j0happyyein2026.txt', (c) => {
  return c.text('a1b2c3d4e5f6g7h8i9j0happyyein2026', 200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=604800'
  });
})

// ===== SEO: robots.txt (검색엔진 + AI 크롤러 전면 허용) =====
app.get('/916056a8b3464834b7dca5b2c1dfd406.txt', (c) => c.text('916056a8b3464834b7dca5b2c1dfd406'))
app.get('/robots.txt', (c) => {
  const robotsTxt = `# 행복한예인치과 - Happy Yein Dental Clinic
# https://happyyein.kr
# AI 답변엔진을 위한 사이트 요약: https://happyyein.kr/llms.txt

User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/
Allow: /api/info

# ===== 검색엔진 크롤러 =====
User-agent: Googlebot
Allow: /

User-agent: Yeti
Allow: /

User-agent: Bingbot
Allow: /

# ===== AI 답변엔진 크롤러 (AEO/GEO — 명시적 허용) =====
# OpenAI (ChatGPT 검색/학습)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Anthropic (Claude)
User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# Google AI (Gemini/AI Overviews)
User-agent: Google-Extended
Allow: /

# Meta AI
User-agent: meta-externalagent
Allow: /

User-agent: FacebookBot
Allow: /

# Apple Intelligence
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Amazon (Alexa)
User-agent: Amazonbot
Allow: /

# Common Crawl (LLM 학습 데이터셋)
User-agent: CCBot
Allow: /

# ByteDance
User-agent: Bytespider
Allow: /

# Cohere
User-agent: cohere-ai
Allow: /

# DuckDuckGo AI
User-agent: DuckAssistBot
Allow: /

# Mistral
User-agent: MistralAI-User
Allow: /

Sitemap: https://happyyein.kr/sitemap.xml
`;
  return c.text(robotsTxt, 200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' });
})

// ===== AEO: llms.txt (AI 답변엔진용 사이트 요약 — llmstxt.org 표준) =====
app.get('/llms.txt', (c) => {
  return c.text(generateLlmsTxt(), 200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=86400'
  });
})

app.get('/llms-full.txt', (c) => {
  return c.text(generateLlmsFullTxt(), 200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=86400'
  });
})

// ===== SEO/AEO: RSS 2.0 피드 (블로그 — 검색엔진·AI 크롤러 신규 콘텐츠 발견용) =====
// /rss.xml(표준 경로) + /feed.xml(기존 제출분 호환) 동일 피드 서빙
const rssFeedHandler = async (c: any) => {
  const domain = 'https://happyyein.kr';
  const escXmlF = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const stripTags = (s: string) => (s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  let items = '';
  let lastBuild = new Date().toUTCString();
  try {
    const posts = await c.env.DB.prepare(
      `SELECT id, title, content, thumbnail_url, created_at, updated_at
       FROM posts WHERE is_published = 1 AND board = 'blog'
       ORDER BY created_at DESC LIMIT 30`
    ).all();
    const rows = (posts.results || []) as any[];
    if (rows.length > 0) {
      lastBuild = new Date(rows[0].created_at + 'Z').toUTCString();
    }
    items = rows.map(p => {
      const url = `${domain}/blog/${p.id}`;
      const desc = stripTags(p.content).substring(0, 300);
      const pubDate = new Date((p.created_at || '') + 'Z').toUTCString();
      return `    <item>
      <title>${escXmlF(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escXmlF(desc)}</description>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>한승대 (통합치의학과 전문의)</dc:creator>${p.thumbnail_url ? `
      <enclosure url="${escXmlF(p.thumbnail_url.startsWith('http') ? p.thumbnail_url : domain + p.thumbnail_url)}" type="image/jpeg" length="0"/>` : ''}
    </item>`;
    }).join('\n');
  } catch (e) { /* DB 오류 시 빈 피드 */ }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>행복한예인치과 블로그</title>
    <link>${domain}/blog</link>
    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>시청역·명동 행복한예인치과 전문의가 전하는 치과 건강 정보 — 임플란트, 신경치료, 교정, 심미치료</description>
    <language>ko</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;
  return c.text(rss, 200, { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=1800' });
}
app.get('/rss.xml', rssFeedHandler)
app.get('/feed.xml', rssFeedHandler)

// ===== SEO: sitemap.xml (DB 동적 생성 — 모든 포스트 개별 URL 포함) =====
app.get('/sitemap.xml', async (c) => {
  const domain = 'https://happyyein.kr';
  // [SEO] lastmod에 매일 바뀌는 today를 쓰면 Google이 lastmod 신호 자체를 무시함.
  // 정적 페이지는 실제 콘텐츠 갱신 시에만 이 상수를 업데이트할 것.
  const today = '2026-06-11'; // STATIC_CONTENT_LASTMOD — 콘텐츠 대규모 변경 시 수동 갱신
  const db = c.env.DB;

  // 정적 페이지
  const staticUrls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: today, images: [
      { url: '/static/img/dr-han-smile.jpg', title: '한승대 대표원장 - 행복한예인치과' },
      { url: '/static/img/dr-han-profile.jpg', title: '한승대 원장 프로필' },
      { url: '/static/img/logo.png', title: '행복한예인치과 로고' }
    ]},
    { loc: '/philosophy', priority: '0.8', changefreq: 'monthly', lastmod: today, images: [
      { url: '/static/img/dr-han-logo.jpg', title: '행복한예인치과 진료 철학' }
    ]},
    { loc: '/doctors', priority: '0.8', changefreq: 'monthly', lastmod: today, images: [
      { url: '/static/img/dr-han-front.jpg', title: '행복한예인치과 의료진' },
      { url: '/static/img/dr-han-profile.jpg', title: '한승대 대표원장' }
    ]},
    { loc: '/experience', priority: '0.7', changefreq: 'monthly', lastmod: today, images: [
      { url: '/static/img/consult-2.jpg', title: '행복한예인치과 환자 경험' }
    ]},
    { loc: '/location', priority: '0.8', changefreq: 'monthly', lastmod: today, images: [
      { url: '/static/img/dr-han-logo.jpg', title: '행복한예인치과 오시는 길' }
    ]},
    { loc: '/treatments/implant', priority: '0.9', changefreq: 'monthly', lastmod: today, images: [
      { url: '/static/img/treat-1.jpg', title: '발치즉시 임플란트 시술' }
    ]},
    { loc: '/treatments/preservation', priority: '0.8', changefreq: 'monthly', lastmod: today, images: [
      { url: '/static/img/treat-2.jpg', title: '치아보존치료 신경치료' }
    ]},
    { loc: '/treatments/aesthetic', priority: '0.8', changefreq: 'monthly', lastmod: today, images: [
      { url: '/static/img/treat-3.jpg', title: '앞니 심미치료 라미네이트' }
    ]},
    { loc: '/treatments/orthodontics', priority: '0.8', changefreq: 'monthly', lastmod: today, images: [
      { url: '/static/img/treat-4.jpg', title: '치아교정 투명교정' }
    ]},
    { loc: '/treatments/general', priority: '0.7', changefreq: 'monthly', lastmod: today, images: [
      { url: '/static/img/treat-5.jpg', title: '일반 예방 치료' }
    ]},
    { loc: '/before-after', priority: '0.7', changefreq: 'daily', lastmod: today, images: [] },
    { loc: '/blog', priority: '0.8', changefreq: 'daily', lastmod: today, images: [] },
    { loc: '/notice', priority: '0.5', changefreq: 'weekly', lastmod: today, images: [] },
    { loc: '/encyclopedia', priority: '0.8', changefreq: 'weekly', lastmod: today, images: [] },
    { loc: '/search', priority: '0.6', changefreq: 'monthly', lastmod: today, images: [] },
    // Local SEO: 지역×진료 전용 랜딩페이지 (30개+)
    { loc: '/local', priority: '0.8', changefreq: 'weekly', lastmod: today, images: [] },
    ...getAllLocalSeoSlugs().map(s => ({
      loc: `/local/${s}`,
      priority: '0.9',
      changefreq: 'weekly' as const,
      lastmod: today,
      images: [] as { url: string; title: string }[],
    })),
    // Symptom SEO: 증상별 전용 랜딩페이지 (20개)
    { loc: '/symptoms', priority: '0.8', changefreq: 'weekly', lastmod: today, images: [] },
    ...getAllSymptomSlugs().map(s => ({
      loc: `/symptoms/${s}`,
      priority: '0.9',
      changefreq: 'weekly' as const,
      lastmod: today,
      images: [] as { url: string; title: string }[],
    })),
    // Cost SEO: 치료비용 전용 랜딩페이지 (10개)
    { loc: '/cost', priority: '0.8', changefreq: 'weekly', lastmod: today, images: [] },
    ...getAllCostSlugs().map(s => ({
      loc: `/cost/${s}`,
      priority: '0.9',
      changefreq: 'weekly' as const,
      lastmod: today,
      images: [] as { url: string; title: string }[],
    })),
    // Comparison SEO: 치료 비교 콘텐츠 (8개)
    { loc: '/compare', priority: '0.8', changefreq: 'weekly', lastmod: today, images: [] },
    ...getAllComparisonSlugs().map(s => ({
      loc: `/compare/${s}`,
      priority: '0.85',
      changefreq: 'weekly' as const,
      lastmod: today,
      images: [] as { url: string; title: string }[],
    })),
    // Encyclopedia: 치과 백과사전 개별 용어 (215개)
    ...encyclopediaTerms.map(t => ({
      loc: `/encyclopedia/${t.id}`,
      priority: '0.6',
      changefreq: 'monthly' as const,
      lastmod: today,
      images: [] as { url: string; title: string }[],
    })),
    // Foreign Emergency SEO: 외국인 응급치과 다국어 페이지 (EN/JA/ZH)
    { loc: '/en', priority: '0.9', changefreq: 'weekly', lastmod: today, images: [] },
    { loc: '/en/guides', priority: '0.8', changefreq: 'weekly', lastmod: today, images: [] },
    ...getAllForeignSeoSlugs().map(s => ({
      loc: `/en/${s}`,
      priority: '0.9',
      changefreq: 'weekly' as const,
      lastmod: today,
      images: [] as { url: string; title: string }[],
    })),
  ];

  // 게시물이 0건인 목록(/notice·/before-after·/blog)은 얇은 페이지라 noindex 처리되므로 사이트맵에서도 뺀다.
  // DB 조회 실패 시에는 기존대로 유지한다(일시 오류로 URL이 빠지지 않도록).
  try {
    const cnt = await db.prepare(
      `SELECT board, COUNT(*) AS n FROM posts WHERE is_published = 1 AND board IN ('blog','before-after','notice') GROUP BY board`
    ).all();
    const counts: Record<string, number> = {};
    for (const r of (cnt.results || []) as any[]) counts[r.board] = Number(r.n) || 0;
    for (const board of ['blog', 'before-after', 'notice']) {
      if (!counts[board]) {
        const i = staticUrls.findIndex(u => u.loc === `/${board}`);
        if (i >= 0) staticUrls.splice(i, 1);
      }
    }
  } catch (e) { /* 목록 URL 유지 */ }

  // DB에서 모든 발행된 포스트 조회 (블로그 + 비포애프터 개별 URL)
  let postUrls: typeof staticUrls = [];
  try {
    const posts = await db.prepare(
      `SELECT p.id, p.board, p.title, p.thumbnail_url, p.updated_at, p.created_at, p.seo_keyword
       FROM posts p WHERE p.is_published = 1 AND p.board IN ('blog','before-after')
       ORDER BY p.created_at DESC`
    ).all();

    for (const post of (posts.results || []) as any[]) {
      const slug = post.board === 'before-after' ? 'before-after' : 'blog';
      const postDate = kstYmd(post.updated_at || post.created_at) || today; // D1 UTC → KST 날짜 (스키마 dateModified 와 일치)
      const images: { url: string; title: string }[] = [];

      // 썸네일 이미지
      if (post.thumbnail_url) {
        images.push({ url: post.thumbnail_url, title: post.title });
      }

      // 비포애프터는 치료사진 이미지도 추가
      if (post.board === 'before-after') {
        try {
          const imgs = await db.prepare(
            'SELECT image_url, image_type FROM post_images WHERE post_id = ? ORDER BY sort_order'
          ).bind(post.id).all();
          for (const img of (imgs.results || []) as any[]) {
            const typeLabel = img.image_type === 'before_intra' ? '치료 전' : img.image_type === 'after_intra' ? '치료 후' : img.image_type === 'before_pano' ? '치료 전 파노라마' : '치료 후 파노라마';
            images.push({ url: img.image_url, title: `${post.title} ${typeLabel}` });
          }
        } catch {}
      }

      postUrls.push({
        loc: `/${slug}/${post.id}`,
        priority: post.board === 'blog' ? '0.7' : '0.6',
        changefreq: 'monthly',
        lastmod: postDate,
        images,
      });
    }
  } catch (e) { /* DB 오류 시 정적 URL만 */ }

  // 목록(/blog·/before-after) lastmod = 그 게시판 최신 글 날짜(고정 상수 대신 실제 값),
  // 진료별 칼럼·사례 목록(?cat=)도 글이 있는 진료만 포함 (2026-10-03 칼럼·케이스 표준)
  try {
    const lite = await fetchLitePosts(db);
    for (const board of ['blog', 'before-after']) {
      const rows = lite.filter(p => p.board === board);
      if (!rows.length) continue;
      const latestOf = (rs: typeof rows) => rs.map(p => kstYmd(p.updated_at || p.created_at)).sort().pop() || today;
      const listEntry = staticUrls.find(u => u.loc === `/${board}`);
      if (listEntry) listEntry.lastmod = latestOf(rows);
      const byCat: Record<string, typeof rows> = {};
      for (const p of rows) { const s = treatmentForPost(p.seo_keyword, p.title); if (s) (byCat[s] = byCat[s] || []).push(p); }
      for (const [cat, rs] of Object.entries(byCat)) {
        postUrls.push({ loc: `/${board}?cat=${cat}`, priority: '0.6', changefreq: 'weekly', lastmod: latestOf(rs), images: [] });
      }
    }
  } catch (e) { /* 목록 lastmod 기존값 유지 */ }

  const allUrls = [...staticUrls, ...postUrls];

  // XML 특수문자 이스케이프
  const escXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls.map(u => `  <url>
    <loc>${domain}${escXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.images.map(img => `
    <image:image>
      <image:loc>${img.url.startsWith('http') ? escXml(img.url) : domain + escXml(img.url)}</image:loc>
      <image:title>${escXml(img.title)}</image:title>
    </image:image>`).join('')}
  </url>`).join('\n')}
</urlset>`;
  return c.text(sitemap, 200, { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=1800' });
})

// ===== SEO: 커스텀 404 페이지 (내부링크로 크롤러·사용자 재유도) =====
app.notFound((c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>페이지를 찾을 수 없습니다 | 행복한예인치과</title>
<meta name="robots" content="noindex, follow">
<script src="https://cdn.tailwindcss.com"></script>
<style>body{background:#0a0a0a;color:#fff;font-family:'Noto Sans KR',sans-serif;}</style>
</head>
<body class="min-h-screen flex items-center justify-center p-6">
<main class="max-w-xl text-center">
  <p class="text-7xl font-black text-yellow-400 mb-4">404</p>
  <h1 class="text-2xl font-bold mb-3">페이지를 찾을 수 없습니다</h1>
  <p class="text-gray-400 mb-8">주소가 변경되었거나 삭제된 페이지입니다.<br>아래에서 찾으시는 정보로 이동해 보세요.</p>
  <nav class="grid grid-cols-2 gap-3 text-sm" aria-label="주요 페이지 바로가기">
    <a href="/" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition">🏠 홈페이지</a>
    <a href="/treatments/implant" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition">🦷 임플란트</a>
    <a href="/symptoms" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition">🩺 증상별 가이드</a>
    <a href="/cost" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition">💰 치료비용 안내</a>
    <a href="/blog" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition">📝 블로그</a>
    <a href="/location" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition">📍 오시는 길</a>
  </nav>
  <p class="mt-8 text-gray-500 text-sm">전화 상담: <a href="tel:02-756-2828" class="text-yellow-400 font-bold">02-756-2828</a></p>
</main>
</body>
</html>`, 404)
})

// ===== Cloudflare Cron Trigger — 매일 자동 블로그 생성 =====
export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: Bindings, ctx: ExecutionContext) {
    ctx.waitUntil(handleScheduled(env))
  },
}
