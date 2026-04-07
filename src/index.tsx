import { Hono } from 'hono'
import { renderTreatmentPage } from './treatments'
import { philosophyPage, doctorsPage, experiencePage, locationPage } from './pages'
import { boardListPage, boardDetailPage, boardWritePage, boardEditPage } from './board-pages'
import { uploadApi, imagesApi } from './api-upload'
import boardsApi from './api-boards'
import authApi, { requireAdmin } from './api-auth'
import userAuthApi from './api-user-auth'
import { adminLoginPage, adminDashboardPage } from './admin-pages'
import { registerPage, loginPage } from './auth-pages'

type Bindings = { DB: D1Database; R2: R2Bucket }
const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  const SITE_DOMAIN = 'https://yein-dental.pages.dev';
  const mainDesc = '서울 시청역 5분, 13년간 한자리에서 쌓아온 신뢰의 치과. 발치즉시 임플란트 성공률 80% 이상, 보존과·교정과 전문의 협진. 수요일 야간진료. 행복한예인치과 02-756-2828.';
  const mainTitle = '행복한예인치과 | 서울 시청역 치과 - 임플란트·보존·심미·교정 전문의 협진';
  const ogImage = `${SITE_DOMAIN}/static/img/dr-han-logo.jpg`;

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
    "hasMap": "https://maps.google.com/?cid=행복한예인치과",
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
      { "@type": "AdministrativeArea", "name": "용산구" }
    ],
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
        "@type": "Dentist",
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
        "@type": "Dentist",
        "name": "신정희",
        "jobTitle": "보존과 전문의",
        "description": "치과보존과 전문의, 치의학 박사. 경희대 치과보존과 레지던트 수료.",
        "medicalSpecialty": "Endodontics"
      },
      {
        "@type": "Dentist",
        "name": "박현미",
        "jobTitle": "교정 전문의",
        "description": "교정과 전문의. 연세대 치의학대학원 교정과 석사. 인비절라인 투명교정 수료.",
        "medicalSpecialty": "Orthodontics"
      }
    ],
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "458", "bestRating": "5" },
    "sameAs": [
      "https://blog.naver.com/yein2828",
      "https://naver.me/G0DXGZbi"
    ]
  });

  // 2) FAQPage 스키마 (AEO 핵심)
  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "행복한예인치과는 어디에 있나요?",
        "acceptedAnswer": { "@type": "Answer", "text": "서울특별시 중구 남대문로9길 51 효덕빌딩 3층 301호에 위치하고 있습니다. 1호선·2호선 시청역 4번·5번 출구에서 도보 5분 거리입니다." }
      },
      {
        "@type": "Question",
        "name": "행복한예인치과 진료시간은 어떻게 되나요?",
        "acceptedAnswer": { "@type": "Answer", "text": "월·화·목·금 09:30~18:30, 수요일은 야간진료로 09:30~20:00까지 진료합니다. 점심시간은 13:00~14:00이며, 토·일·공휴일은 휴진입니다. 마감 1시간 전까지 접수 가능합니다." }
      },
      {
        "@type": "Question",
        "name": "발치즉시 임플란트란 무엇인가요?",
        "acceptedAnswer": { "@type": "Answer", "text": "발치즉시 임플란트는 치아를 발치하는 동시에 임플란트를 식립하는 시술입니다. 별도의 치유 기간 없이 바로 진행하여 전체 치료 기간을 크게 단축합니다. 행복한예인치과는 80% 이상의 케이스에서 즉시식립을 시행하고 있습니다." }
      },
      {
        "@type": "Question",
        "name": "행복한예인치과에는 어떤 전문의가 있나요?",
        "acceptedAnswer": { "@type": "Answer", "text": "한승대 대표원장(통합치의학과 전문의, 치의학 박사), 신정희 원장(치과보존과 전문의, 치의학 박사), 박현미 원장(교정과 전문의) 총 3명의 보건복지부 인증 전문의가 각 분야를 직접 진료합니다." }
      },
      {
        "@type": "Question",
        "name": "행복한예인치과 예약은 어떻게 하나요?",
        "acceptedAnswer": { "@type": "Answer", "text": "전화(02-756-2828) 또는 네이버 예약(https://naver.me/G0DXGZbi)으로 예약하실 수 있습니다. 수요일 야간진료도 예약 가능합니다." }
      },
      {
        "@type": "Question",
        "name": "시청역 근처 치과를 찾고 있는데 추천할 곳이 있나요?",
        "acceptedAnswer": { "@type": "Answer", "text": "행복한예인치과는 1호선·2호선 시청역 4번·5번 출구에서 도보 5분 거리에 위치한 치과입니다. 2013년부터 13년간 같은 자리에서 운영하고 있으며, 통합치의학·보존과·교정과 3명의 전문의가 협진합니다. 환자 리뷰 458건, 발치즉시 임플란트 성공률 80% 이상의 실적을 보유하고 있습니다." }
      },
      {
        "@type": "Question",
        "name": "행복한예인치과의 진료 철학은 무엇인가요?",
        "acceptedAnswer": { "@type": "Answer", "text": "행복한예인치과의 진료 철학은 '내 가족에게 권할 수 없는 치료는 시작도 하지 않습니다'입니다. 과장 없는 진료, 투명한 설명, 환자 존중을 기본으로 13년간 같은 자리에서 신뢰를 쌓아왔습니다." }
      }
    ]
  });

  // 3) WebSite 스키마 (사이트링크 검색 최적화)
  const websiteJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "행복한예인치과",
    "alternateName": "Happy Yein Dental",
    "url": SITE_DOMAIN,
    "publisher": { "@id": `${SITE_DOMAIN}/#organization` }
  });

  // 4) WebPage 스키마
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
    "dateModified": "2026-04-07",
    "inLanguage": "ko"
  });

  // 5) BreadcrumbList 스키마
  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": SITE_DOMAIN }
    ]
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

<!-- Naver 검색 최적화 -->
<meta name="naver-site-verification" content="">
<meta property="og:article:author" content="행복한예인치과">

<!-- 추가 메타 -->
<meta name="theme-color" content="#F7BA18">
<meta name="author" content="행복한예인치과">
<meta name="format-detection" content="telephone=yes">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="keywords" content="행복한예인치과, 시청역 치과, 서울 시청역 치과, 발치즉시 임플란트, 즉시식립 임플란트, 보존치료, 신경치료, 치과보존과 전문의, 앞니 심미치료, 라미네이트, 치아교정, 투명교정, 인비절라인, 서울 중구 치과, 야간진료 치과, 수요일 야간, 시청역 임플란트, 직장인 치과, 통합치의학 전문의">
<meta name="geo.region" content="KR-11">
<meta name="geo.placename" content="서울특별시 중구">
<meta name="geo.position" content="37.566;126.978">
<meta name="ICBM" content="37.566, 126.978">
<link rel="icon" type="image/png" href="/static/img/logo.png">

<!-- 구조화 데이터 (JSON-LD) - SEO + AEO -->
<script type="application/ld+json">${orgJsonLd}</script>
<script type="application/ld+json">${faqJsonLd}</script>
<script type="application/ld+json">${websiteJsonLd}</script>
<script type="application/ld+json">${webpageJsonLd}</script>
<script type="application/ld+json">${breadcrumbJsonLd}</script>

<!-- 폰트 & 아이콘 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
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
.faq-a.open{max-height:300px;padding-bottom:28px;}
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
  <a href="/doctors" class="mob-link" onclick="closeMob()">Doctors</a>
  <a href="/experience" class="mob-link" onclick="closeMob()">Experience</a>
  <a href="/before-after" class="mob-link" onclick="closeMob()">Contents</a>
  <a href="/before-after" class="mob-link mob-link-sub" onclick="closeMob()">비포 & 애프터</a>
  <a href="/blog" class="mob-link mob-link-sub" onclick="closeMob()">블로그</a>
  <a href="/notice" class="mob-link mob-link-sub" onclick="closeMob()">공지사항</a>
  <a href="/location" class="mob-link" onclick="closeMob()">Location</a>
  <a href="/register" class="mob-link" onclick="closeMob()" style="color:var(--gold);font-size:clamp(0.9rem,2.5vw,1.2rem)!important;">회원가입</a>
  <a href="/login" class="mob-link mob-link-sub" onclick="closeMob()">로그인</a>
  <a href="tel:02-756-2828" class="mob-link" onclick="closeMob()" style="color:var(--gold)">02.756.2828</a>
  <div class="mob-menu-footer">Est. 2013 &mdash; Seoul</div>
</div>

<!-- ===== HERO ===== -->
<main>
<section class="hero" role="banner">
  <div class="hero-video-bg">
    <img src="/static/img/dr-han-smile.jpg" alt="행복한예인치과 한승대 대표원장 - 서울 시청역 치과">
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
        바쁜 직장 생활 속에서 미뤄왔던 치료,<br>
        이제 더 이상 미루지 않아도 됩니다.<br>
        과장 없이, 숨김 없이. 시청역 도보 5분.
      </p>
      <div class="hero-cta-group">
        <a href="tel:02-756-2828" class="btn btn-gold"><i class="fas fa-phone-alt"></i> 전화예약</a>
        <a href="https://naver.me/G0DXGZbi" target="_blank" class="btn btn-naver"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
      </div>
    </div>
  </div>
  <!-- TICKER -->
  <div class="hero-ticker">
    <div class="ticker-track">
      <span class="ticker-item"><span class="dot"></span>Immediate Implant</span>
      <span class="ticker-item"><span class="dot"></span>13+ Years Same Place</span>
      <span class="ticker-item"><span class="dot"></span>Conservation Specialist</span>
      <span class="ticker-item"><span class="dot"></span>Orthodontics</span>
      <span class="ticker-item"><span class="dot"></span>Aesthetic Dentistry</span>
      <span class="ticker-item"><span class="dot"></span>Night Clinic Wed</span>
      <span class="ticker-item"><span class="dot"></span>City Hall Stn 5min</span>
      <span class="ticker-item"><span class="dot"></span>Immediate Implant</span>
      <span class="ticker-item"><span class="dot"></span>13+ Years Same Place</span>
      <span class="ticker-item"><span class="dot"></span>Conservation Specialist</span>
      <span class="ticker-item"><span class="dot"></span>Orthodontics</span>
      <span class="ticker-item"><span class="dot"></span>Aesthetic Dentistry</span>
      <span class="ticker-item"><span class="dot"></span>Night Clinic Wed</span>
      <span class="ticker-item"><span class="dot"></span>City Hall Stn 5min</span>
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
      <p class="desc">한자리에서 쌓아온 신뢰.<br>변하지 않는 곳에서, 변함없는 진료를.</p>
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
    <h2 class="sec-title rv">치료의 <em>본질</em>에 집중합니다</h2>
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
    <h2 class="sec-title rv">정확한 진단, <em>최적의</em> 치료</h2>
    <div class="treat-grid">
      <!-- Featured: Immediate Implant -->
      <a href="/treatments/implant" class="treat-card treat-featured rv" style="text-decoration:none;color:inherit;">
        <div class="treat-card-content">
          <div class="treat-card-num">01</div>
          <div class="treat-card-tag">Core Treatment</div>
          <h3>발치즉시 임플란트</h3>
          <p>발치와 동시에 임플란트를 식립하여 치료 기간을 획기적으로 단축. 80% 이상의 케이스에서 즉시식립을 시행하며, 고난이도 케이스까지 대응합니다.</p>
          <div class="treat-pills">
            <span class="treat-pill">Time-Saving</span>
            <span class="treat-pill">High Difficulty</span>
            <span class="treat-pill">80%+ Immediate</span>
          </div>
        </div>
        <div class="treat-featured-img">
          <img src="/static/img/treat-1.jpg" alt="행복한예인치과 발치즉시 임플란트 시술 - 80% 이상 즉시식립">
        </div>
      </a>
      <!-- Conservation -->
      <a href="/treatments/preservation" class="treat-card rv" style="text-decoration:none;color:inherit;">
        <div class="treat-card-bg"><img src="/static/img/treat-2.jpg" alt="치아보존치료 - 보존과 전문의 직접 신경치료"></div>
        <div class="treat-card-content">
          <div class="treat-card-num">02</div>
          <div class="treat-card-tag">Preservation</div>
          <h3>치아 보존 치료</h3>
          <p>보존과 전문의가 직접 치료. 최대한 자연 치아를 살리는 신경치료 및 보존 수복.</p>
          <div class="treat-pills">
            <span class="treat-pill">Specialist</span>
            <span class="treat-pill">Natural Tooth</span>
          </div>
        </div>
      </a>
      <!-- Aesthetic -->
      <a href="/treatments/aesthetic" class="treat-card rv rv-d1" style="text-decoration:none;color:inherit;">
        <div class="treat-card-bg"><img src="/static/img/treat-3.jpg" alt="앞니 심미치료 - 최소삭제 라미네이트 레진"></div>
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
        <div class="treat-card-bg"><img src="/static/img/treat-4.jpg" alt="치아교정 - 교정과 전문의 투명교정 설측교정"></div>
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
        <div class="treat-card-bg"><img src="/static/img/treat-5.jpg" alt="일반 예방 치료 - 정기검진 스케일링 충치치료"></div>
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
    <h2 class="sec-title rv">각 분야 <em>전문의</em> 협진</h2>
    <div class="team-grid">
      <div class="team-card lead rv">
        <div class="team-photo">
          <img src="/static/img/dr-han-profile.jpg" alt="한승대 대표원장 - 통합치의학과 전문의 치의학박사">
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
          <h3>신정희</h3>
          <div class="role">Conservative Dentistry, Ph.D.</div>
          <ul class="team-creds">
            <li>경희대학교 치과대학 졸업</li>
            <li>경희대 대학원 치의학 박사</li>
            <li>보건복지부 인증 치과보존과 전문의</li>
            <li>경희대 치과보존과 레지던트 수료</li>
            <li>경희대 치과보존과 외래강사 역임</li>
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
        <img src="/static/img/consult-2.jpg" alt="행복한예인치과 환자 상담 장면">
        <img src="/static/img/xray-1.jpg" alt="X-ray 디지털 진단 장비">
        <img src="/static/img/treat-2.jpg" alt="행복한예인치과 보존 치료 진료">
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
            <p>마취부터 치료까지, 부드럽고 편안한 진료</p>
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
    <img src="/static/img/consult-1.jpg" alt="행복한예인치과 환자 상담">
    <img src="/static/img/treat-6.jpg" alt="치과 치료 시술 장면">
    <img src="/static/img/treat-4.jpg" alt="교정 치료 진행">
    <img src="/static/img/dr-han-logo.jpg" alt="행복한예인치과 로고">
    <img src="/static/img/consult-3.jpg" alt="X-ray 진단 상담">
    <img src="/static/img/treat-7.jpg" alt="정밀 치과 시술">
    <img src="/static/img/treat-5.jpg" alt="예방 치료 스케일링">
    <img src="/static/img/xray-3.jpg" alt="파노라마 X-ray 촬영">
    <img src="/static/img/dr-han-front.jpg" alt="한승대 원장 진료">
    <img src="/static/img/xray-2.jpg" alt="구강내 진단 촬영">
    <!-- duplicate for seamless loop -->
    <img src="/static/img/consult-1.jpg" alt="행복한예인치과 환자 상담">
    <img src="/static/img/treat-6.jpg" alt="치과 치료 시술 장면">
    <img src="/static/img/treat-4.jpg" alt="교정 치료 진행">
    <img src="/static/img/dr-han-logo.jpg" alt="행복한예인치과 로고">
    <img src="/static/img/consult-3.jpg" alt="X-ray 진단 상담">
    <img src="/static/img/treat-7.jpg" alt="정밀 치과 시술">
    <img src="/static/img/treat-5.jpg" alt="예방 치료 스케일링">
    <img src="/static/img/xray-3.jpg" alt="파노라마 X-ray 촬영">
    <img src="/static/img/dr-han-front.jpg" alt="한승대 원장 진료">
    <img src="/static/img/xray-2.jpg" alt="구강내 진단 촬영">
  </div>
</div>

<!-- ===== LOCATION ===== -->
<section class="location sec-pad" id="location">
  <div class="sec-inner">
    <div class="sec-label" style="color:var(--gold-deep)">Location</div>
    <h2 class="sec-title rv">시청역에서 <em>도보 5분</em></h2>
    <div class="location-grid">
      <div class="location-map rv-scale">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d790.6!2d126.978!3d37.566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb1a2f4b7d%3A0x!2z7ISc7Jq4IOykkSDrgqjrjIDrrLjroZw56ri4IDUx!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr" allowfullscreen="" loading="lazy"></iframe>
      </div>
      <div class="loc-info">
        <div class="loc-block rv">
          <div class="loc-label">Address</div>
          <div class="loc-value">
            서울 중구 남대문로9길 51<br>효덕빌딩 3층 301호
            <small>1호선 시청역 4, 5번 출구 도보 5분</small>
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

<!-- ===== FAQ (AEO 최적화) ===== -->
<section class="faq sec-pad" id="faq" itemscope itemtype="https://schema.org/FAQPage">
  <div class="sec-inner">
    <div class="sec-label">FAQ</div>
    <h2 class="sec-title rv">자주 묻는 <em>질문</em></h2>
    <div class="faq-list">
      <div class="faq-item rv" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4 itemprop="name">행복한예인치과는 어디에 있나요?</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">서울특별시 중구 남대문로9길 51 효덕빌딩 3층 301호에 위치하고 있습니다. 1호선·2호선 시청역 4번·5번 출구에서 도보 5분 거리입니다.</p>
        </div>
      </div>
      <div class="faq-item rv rv-d1" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4 itemprop="name">진료시간은 어떻게 되나요?</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">월·화·목·금 09:30~18:30, 수요일은 야간진료로 09:30~20:00까지 진료합니다. 점심시간은 13:00~14:00이며, 토·일·공휴일은 휴진입니다. 마감 1시간 전까지 접수 가능합니다.</p>
        </div>
      </div>
      <div class="faq-item rv rv-d1" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4 itemprop="name">발치즉시 임플란트란 무엇인가요?</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">발치즉시 임플란트는 치아를 발치하는 동시에 임플란트를 식립하는 시술입니다. 별도의 치유 기간 없이 바로 진행하여 전체 치료 기간을 크게 단축합니다. 행복한예인치과는 80% 이상의 케이스에서 즉시식립을 시행하고 있습니다.</p>
        </div>
      </div>
      <div class="faq-item rv rv-d2" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4 itemprop="name">어떤 전문의가 있나요?</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">한승대 대표원장(통합치의학과 전문의, 치의학 박사), 신정희 원장(치과보존과 전문의, 치의학 박사), 박현미 원장(교정과 전문의) 총 3명의 보건복지부 인증 전문의가 각 분야를 직접 진료합니다.</p>
        </div>
      </div>
      <div class="faq-item rv rv-d2" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4 itemprop="name">예약은 어떻게 하나요?</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">전화(02-756-2828) 또는 네이버 예약으로 예약하실 수 있습니다. 수요일 야간진료도 예약 가능합니다.</p>
        </div>
      </div>
      <div class="faq-item rv rv-d3" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4 itemprop="name">시청역 근처에서 좋은 치과를 찾고 있어요.</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">행복한예인치과는 시청역 4번·5번 출구에서 도보 5분 거리에 위치합니다. 2013년부터 13년간 같은 자리에서 운영하고 있으며, 통합치의학·보존과·교정과 3명의 전문의가 협진합니다. 환자 리뷰 458건, 발치즉시 임플란트 성공률 80% 이상의 실적을 보유하고 있습니다.</p>
        </div>
      </div>
      <div class="faq-item rv rv-d3" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4 itemprop="name">행복한예인치과의 진료 철학이 궁금해요.</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">'내 가족에게 권할 수 없는 치료는 시작도 하지 않습니다'가 행복한예인치과의 진료 철학입니다. 과장 없는 진료, 투명한 설명, 환자 존중을 기본으로 13년간 같은 자리에서 신뢰를 쌓아왔습니다.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== CTA ===== -->
<section class="cta sec-pad">
  <div class="cta-inner">
    <h2 class="rv">치료를 미루고 계셨다면,<br>지금이 <em>그때</em>입니다.</h2>
    <p class="rv rv-d1">언젠가가 아니라, 지금 치료받을 수 있는<br>신뢰할 수 있는 치과를 만들고 싶었습니다.</p>
    <div class="cta-btns rv rv-d2">
      <a href="tel:02-756-2828" class="btn btn-gold"><i class="fas fa-phone-alt"></i> 전화예약</a>
      <a href="https://naver.me/G0DXGZbi" target="_blank" class="btn btn-naver"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
      <a href="https://blog.naver.com/yein2828" target="_blank" class="btn btn-ghost"><i class="fab fa-blogger-b"></i> Naver Blog</a>
    </div>
  </div>
</section>
</main>

<!-- ===== FOOTER ===== -->
<footer>
  <div class="footer-inner">
    <div class="footer-left">
      <strong>행복한예인치과의원</strong><br>
      서울 중구 남대문로9길 51 효덕빌딩 3층 301호<br>
      대표자: 한승대 | 사업자등록번호: 104-91-44744<br>
      TEL 02-756-2828 | FAX 02-754-8188<br>
      &copy; 2005–2026 Happy Yein Dental Clinic. All rights reserved.
    </div>
    <div class="footer-right">
      <a href="/register">Register</a>
      <a href="/login">Login</a>
      <a href="https://blog.naver.com/yein2828" target="_blank">Blog</a>
      <a href="https://naver.me/G0DXGZbi" target="_blank">Reservation</a>
    </div>
  </div>
</footer>

<!-- MOBILE BOTTOM BAR -->
<div class="mob-bottom-bar">
  <a href="tel:02-756-2828" class="mob-bottom-btn btn-call"><i class="fas fa-phone-alt"></i> 전화 상담</a>
  <a href="https://blog.naver.com/yein2828" target="_blank" class="mob-bottom-btn btn-blog"><i class="fab fa-blogger-b"></i> 네이버 블로그</a>
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
app.get('/philosophy', (c) => c.html(philosophyPage()))
app.get('/doctors', (c) => c.html(doctorsPage()))
app.get('/experience', (c) => c.html(experiencePage()))
app.get('/location', (c) => c.html(locationPage()))

// ===== TREATMENT DETAIL PAGES =====
app.get('/treatments/:slug', (c) => {
  const slug = c.req.param('slug')
  const html = renderTreatmentPage(slug)
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

// ===== ADMIN PAGES =====
app.get('/admin/login', (c) => c.html(adminLoginPage()))
app.get('/admin', (c) => c.html(adminDashboardPage()))

// ===== BOARD PAGE ROUTES =====
// 비포 & 애프터
app.get('/before-after', (c) => c.html(boardListPage('before-after')))
app.get('/before-after/write', (c) => c.html(boardWritePage('before-after')))
app.get('/before-after/:id/edit', (c) => c.html(boardEditPage('before-after')))
app.get('/before-after/:id', (c) => c.html(boardDetailPage('before-after')))

// 블로그
app.get('/blog', (c) => c.html(boardListPage('blog')))
app.get('/blog/write', (c) => c.html(boardWritePage('blog')))
app.get('/blog/:id/edit', (c) => c.html(boardEditPage('blog')))
app.get('/blog/:id', (c) => c.html(boardDetailPage('blog')))

// 공지사항
app.get('/notice', (c) => c.html(boardListPage('notice')))
app.get('/notice/write', (c) => c.html(boardWritePage('notice')))
app.get('/notice/:id/edit', (c) => c.html(boardEditPage('notice')))
app.get('/notice/:id', (c) => c.html(boardDetailPage('notice')))

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

// ===== SEO: robots.txt =====
app.get('/robots.txt', (c) => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/
Allow: /api/info

Sitemap: https://yein-dental.pages.dev/sitemap.xml

# 행복한예인치과 - Happy Yein Dental Clinic
# https://yein-dental.pages.dev
`;
  return c.text(robotsTxt, 200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' });
})

// ===== SEO: sitemap.xml =====
app.get('/sitemap.xml', (c) => {
  const domain = 'https://yein-dental.pages.dev';
  const today = new Date().toISOString().split('T')[0];
  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/philosophy', priority: '0.8', changefreq: 'monthly' },
    { loc: '/doctors', priority: '0.8', changefreq: 'monthly' },
    { loc: '/experience', priority: '0.7', changefreq: 'monthly' },
    { loc: '/location', priority: '0.8', changefreq: 'monthly' },
    { loc: '/treatments/implant', priority: '0.9', changefreq: 'monthly' },
    { loc: '/treatments/preservation', priority: '0.8', changefreq: 'monthly' },
    { loc: '/treatments/aesthetic', priority: '0.8', changefreq: 'monthly' },
    { loc: '/treatments/orthodontics', priority: '0.8', changefreq: 'monthly' },
    { loc: '/treatments/general', priority: '0.7', changefreq: 'monthly' },
    { loc: '/before-after', priority: '0.7', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.7', changefreq: 'weekly' },
    { loc: '/notice', priority: '0.6', changefreq: 'weekly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${domain}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  return c.text(sitemap, 200, { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' });
})

export default app
