// 공통 레이아웃: head, nav, footer, scripts

// 사이트 기본 정보 상수
const SITE = {
  name: '행복한예인치과',
  nameEn: 'Happy Yein Dental Clinic',
  domain: 'https://yein-dental.pages.dev',
  ogImage: '/static/img/dr-han-logo.jpg',
  locale: 'ko_KR',
  phone: '02-756-2828',
  address: '서울 중구 남대문로9길 51 효덕빌딩 3층 301호',
  geo: { lat: '37.566', lng: '126.978' },
};

interface HeadOptions {
  title: string;
  description: string;
  path: string;           // canonical 경로 (예: '/', '/philosophy')
  ogType?: string;        // 'website' | 'article' 등
  ogImage?: string;       // 커스텀 OG 이미지 (없으면 기본 사용)
  noindex?: boolean;      // true면 noindex
  jsonLd?: object | object[];  // 추가 JSON-LD 구조화 데이터 (단일 또는 배열)
  keywords?: string;      // 페이지별 키워드
  articlePublishedTime?: string; // 게시일 (article 타입)
  articleModifiedTime?: string;  // 수정일
  breadcrumbs?: { name: string; url: string }[]; // 브레드크럼 경로
}

export function head(opts: HeadOptions | string, descriptionLegacy?: string, pathLegacy?: string) {
  // 하위 호환: head('title','desc') 형태도 지원, 단 path 필수 추가
  let o: HeadOptions;
  if (typeof opts === 'string') {
    o = {
      title: opts,
      description: descriptionLegacy || '',
      path: pathLegacy || '/',
      ogType: 'website',
    };
  } else {
    o = opts;
  }

  const fullTitle = o.path === '/'
    ? `${o.title}`
    : `${o.title} | ${SITE.name}`;
  const canonicalUrl = `${SITE.domain}${o.path}`;
  const ogImage = o.ogImage
    ? (o.ogImage.startsWith('http') ? o.ogImage : `${SITE.domain}${o.ogImage}`)
    : `${SITE.domain}${SITE.ogImage}`;
  const ogType = o.ogType || 'website';
  const robots = o.noindex ? 'noindex, nofollow' : 'index, follow';

  // JSON-LD: 기본 DentalClinic + 페이지별 추가
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": SITE.name,
    "alternateName": SITE.nameEn,
    "url": SITE.domain,
    "logo": `${SITE.domain}/static/img/logo.png`,
    "image": ogImage,
    "telephone": SITE.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "남대문로9길 51 효덕빌딩 3층 301호",
      "addressLocality": "중구",
      "addressRegion": "서울특별시",
      "postalCode": "04530",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE.geo.lat,
      "longitude": SITE.geo.lng
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Thursday","Friday"], "opens": "09:30", "closes": "18:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:30", "closes": "20:00" }
    ],
    "priceRange": "$$",
    "areaServed": { "@type": "City", "name": "Seoul" },
    "sameAs": ["https://blog.naver.com/yein2828"]
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = o.breadcrumbs && o.breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": o.breadcrumbs.map((bc, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": bc.name,
      "item": bc.url.startsWith('http') ? bc.url : `${SITE.domain}${bc.url}`
    }))
  } : null;

  const jsonLdScripts = [
    `<script type="application/ld+json">${JSON.stringify(orgJsonLd)}</script>`
  ];
  if (breadcrumbJsonLd) {
    jsonLdScripts.push(`<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`);
  }
  if (o.jsonLd) {
    if (Array.isArray(o.jsonLd)) {
      o.jsonLd.forEach(ld => jsonLdScripts.push(`<script type="application/ld+json">${JSON.stringify(ld)}</script>`));
    } else {
      jsonLdScripts.push(`<script type="application/ld+json">${JSON.stringify(o.jsonLd)}</script>`);
    }
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- SEO 기본 -->
<title>${fullTitle}</title>
<meta name="description" content="${o.description}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${canonicalUrl}">

<!-- Open Graph (Facebook, KakaoTalk, Naver) -->
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${o.description}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:image" content="${ogImage}">
<meta property="og:locale" content="${SITE.locale}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${fullTitle}">
<meta name="twitter:description" content="${o.description}">
<meta name="twitter:image" content="${ogImage}">

<!-- Naver 검색 최적화 -->
<meta name="naver-site-verification" content="">
<meta property="og:article:author" content="${SITE.name}">
${o.articlePublishedTime ? `<meta property="article:published_time" content="${o.articlePublishedTime}">` : ''}
${o.articleModifiedTime ? `<meta property="article:modified_time" content="${o.articleModifiedTime}">` : ''}

<!-- 추가 메타 -->
<meta name="theme-color" content="#F7BA18">
<meta name="author" content="${SITE.name}">
<meta name="format-detection" content="telephone=yes">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
${o.keywords ? `<meta name="keywords" content="${o.keywords}">` : ''}
<meta name="geo.region" content="KR-11">
<meta name="geo.placename" content="서울특별시 중구">
<meta name="geo.position" content="${SITE.geo.lat};${SITE.geo.lng}">
<meta name="ICBM" content="${SITE.geo.lat}, ${SITE.geo.lng}">
<link rel="icon" type="image/png" href="/static/img/logo.png">

<!-- 구조화 데이터 (JSON-LD) -->
${jsonLdScripts.join('\n')}

<!-- 폰트 & 아이콘 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>
${commonCSS}
${subpageCSS}
</style>
</head>
<body>`;
}

export function nav(activeMenu?: string) {
  const items = [
    { label: 'Philosophy', href: '/philosophy' },
    { label: 'Treatments', href: '/treatments/implant', dropdown: true },
    { label: 'Doctors', href: '/doctors' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contents', href: '/before-after', dropdown2: true },
    { label: 'Location', href: '/location' },
  ];
  const dropdownItems = [
    { label: '발치즉시 임플란트', href: '/treatments/implant' },
    { label: '치아 보존 치료', href: '/treatments/preservation' },
    { label: '앞니 심미 치료', href: '/treatments/aesthetic' },
    { label: '치아 교정', href: '/treatments/orthodontics' },
    { label: '일반 / 예방 치료', href: '/treatments/general' },
  ];
  const contentsDropdown = [
    { label: '비포 & 애프터', href: '/before-after' },
    { label: '블로그', href: '/blog' },
    { label: '공지사항', href: '/notice' },
  ];

  return `
<!-- CURSOR -->
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>
<!-- SCROLL PROGRESS -->
<div class="scroll-progress" id="scrollProgress"></div>

<nav id="nav">
  <div class="nav-inner">
    <a href="/" class="nav-brand"><em>Yein</em> Dental</a>
    <div class="nav-links">
      ${items.map(item => {
        if (item.dropdown) {
          return `<div class="nav-dropdown-wrap">
            <a href="${item.href}" class="nav-link ${activeMenu === 'treatments' ? 'active' : ''}">${item.label} <i class="fas fa-chevron-down" style="font-size:0.5rem;margin-left:4px;"></i></a>
            <div class="nav-dropdown">
              ${dropdownItems.map(d => `<a href="${d.href}" class="nav-dropdown-item">${d.label}</a>`).join('')}
            </div>
          </div>`;
        }
        if ((item as any).dropdown2) {
          return `<div class="nav-dropdown-wrap">
            <a href="${item.href}" class="nav-link ${['before-after','blog','notice'].includes(activeMenu || '') ? 'active' : ''}">${item.label} <i class="fas fa-chevron-down" style="font-size:0.5rem;margin-left:4px;"></i></a>
            <div class="nav-dropdown">
              ${contentsDropdown.map(d => `<a href="${d.href}" class="nav-dropdown-item">${d.label}</a>`).join('')}
            </div>
          </div>`;
        }
        const isActive = activeMenu === item.label.toLowerCase();
        return `<a href="${item.href}" class="nav-link ${isActive ? 'active' : ''}">${item.label}</a>`;
      }).join('')}
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
  ${dropdownItems.map(d => `<a href="${d.href}" class="mob-link mob-link-sub" onclick="closeMob()">${d.label}</a>`).join('')}
  <a href="/doctors" class="mob-link" onclick="closeMob()">Doctors</a>
  <a href="/experience" class="mob-link" onclick="closeMob()">Experience</a>
  <a href="/before-after" class="mob-link" onclick="closeMob()">Contents</a>
  ${contentsDropdown.map(d => `<a href="${d.href}" class="mob-link mob-link-sub" onclick="closeMob()">${d.label}</a>`).join('')}
  <a href="/location" class="mob-link" onclick="closeMob()">Location</a>
  <a href="tel:02-756-2828" class="mob-link" onclick="closeMob()" style="color:var(--gold)">02.756.2828</a>
  <div class="mob-menu-footer">Est. 2013 — Seoul</div>
</div>`;
}

export function footer() {
  return `
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
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
      <a href="https://blog.naver.com/yein2828" target="_blank">Blog</a>
      <a href="#">Instagram</a>
    </div>
  </div>
</footer>
<!-- MOBILE BOTTOM BAR -->
<div class="mob-bottom-bar">
  <a href="tel:02-756-2828" class="mob-bottom-btn btn-call"><i class="fas fa-phone-alt"></i> 전화</a>
  <a href="https://naver.me/G0DXGZbi" target="_blank" class="mob-bottom-btn btn-naver-m"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
  <a href="https://blog.naver.com/yein2828" target="_blank" class="mob-bottom-btn btn-blog"><i class="fab fa-blogger-b"></i> 블로그</a>
</div>`;
}

export function scripts() {
  return `<script>
// CURSOR
(function(){
  if(window.innerWidth < 768) return;
  const dot=document.getElementById('cursorDot'),ring=document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  function anim(){rx+=(mx-rx)*0.15;ry+=(my-ry)*0.15;dot.style.left=mx-4+'px';dot.style.top=my-4+'px';ring.style.left=rx-20+'px';ring.style.top=ry-20+'px';requestAnimationFrame(anim);}
  anim();
  document.querySelectorAll('a,button,.treat-card,.v-card,.team-card,.process-card').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));});
})();
// SCROLL PROGRESS
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;document.getElementById('scrollProgress').style.width=(window.scrollY/h)*100+'%';});
// NAV
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>80));
// HAMBURGER
const hb=document.getElementById('hamburger'),mm=document.getElementById('mobMenu');
hb.addEventListener('click',()=>{hb.classList.toggle('active');mm.classList.toggle('open');document.body.style.overflow=mm.classList.contains('open')?'hidden':'';});
function closeMob(){hb.classList.remove('active');mm.classList.remove('open');document.body.style.overflow='';}
// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});});});
// SCROLL REVEAL
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');});},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.rv,.rv-scale').forEach(el=>io.observe(el));
</script>
</body>
</html>`;
}

// ===========================
// COMMON CSS
// ===========================
const commonCSS = `
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

/* CURSOR */
.cursor-dot{position:fixed;width:8px;height:8px;background:var(--gold);border-radius:50%;pointer-events:none;z-index:99999;transition:transform 0.15s;mix-blend-mode:difference;}
.cursor-ring{position:fixed;width:40px;height:40px;border:1.5px solid var(--gold);border-radius:50%;pointer-events:none;z-index:99998;transition:all 0.2s ease-out;opacity:0.5;}
.cursor-ring.hover{width:70px;height:70px;opacity:0.3;}

/* SCROLL PROGRESS */
.scroll-progress{position:fixed;top:0;left:0;height:2px;background:var(--gold);z-index:10000;transition:width 0.05s;width:0%;}

/* NAV */
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
.nav-tel{font-family:var(--font-mono);font-weight:700;color:var(--gold)!important;font-size:0.85rem!important;letter-spacing:2px!important;}

/* NAV DROPDOWN */
.nav-dropdown-wrap{position:relative;}
.nav-dropdown{position:absolute;top:calc(100% + 16px);left:50%;transform:translateX(-50%);background:rgba(10,10,10,0.97);backdrop-filter:blur(40px);border:1px solid rgba(247,186,24,0.1);border-radius:16px;padding:12px 8px;min-width:220px;opacity:0;visibility:hidden;transition:all 0.3s cubic-bezier(0.16,1,0.3,1);transform:translateX(-50%) translateY(10px);}
.nav-dropdown-wrap:hover .nav-dropdown{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);}
.nav-dropdown-item{display:block;padding:10px 20px;font-family:var(--font-kr);font-size:0.82rem;color:var(--gray-light);border-radius:10px;transition:all 0.2s;font-weight:400;white-space:nowrap;}
.nav-dropdown-item:hover{background:rgba(247,186,24,0.08);color:var(--gold);}

/* HAMBURGER */
.hamburger{display:none;flex-direction:column;gap:7px;cursor:pointer;z-index:10001;padding:8px;}
.hamburger span{width:28px;height:1.5px;background:var(--white);transition:all 0.4s cubic-bezier(0.76,0,0.24,1);transform-origin:center;}
.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(6px,6px);}
.hamburger.active span:nth-child(2){opacity:0;transform:scaleX(0);}
.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(6px,-6px);}

/* MOBILE MENU */
.mob-menu{position:fixed;inset:0;background:var(--black);z-index:10000;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0;clip-path:circle(0% at calc(100% - 44px) 44px);transition:clip-path 0.8s cubic-bezier(0.76,0,0.24,1);overflow-y:auto;}
.mob-menu.open{clip-path:circle(150% at calc(100% - 44px) 44px);}
.mob-link{font-family:var(--font-display);font-size:clamp(1.4rem,4vw,2.5rem);font-weight:800;text-transform:uppercase;letter-spacing:3px;color:var(--white);padding:12px 0;transition:all 0.3s;opacity:0;transform:translateY(30px);}
.mob-link-sub{font-size:clamp(0.9rem,2.5vw,1.2rem)!important;font-weight:500!important;letter-spacing:1px!important;color:var(--gray-light)!important;padding:8px 0!important;}
.mob-link-sub:hover{color:var(--gold)!important;}
.mob-menu.open .mob-link{opacity:1;transform:translateY(0);}
.mob-link:nth-child(1){transition-delay:0.15s;}
.mob-link:nth-child(2){transition-delay:0.2s;}
.mob-link:nth-child(3){transition-delay:0.22s;}
.mob-link:nth-child(4){transition-delay:0.24s;}
.mob-link:nth-child(5){transition-delay:0.26s;}
.mob-link:nth-child(6){transition-delay:0.28s;}
.mob-link:nth-child(7){transition-delay:0.3s;}
.mob-link:nth-child(8){transition-delay:0.32s;}
.mob-link:nth-child(9){transition-delay:0.34s;}
.mob-link:hover{color:var(--gold);}
.mob-menu-footer{position:absolute;bottom:40px;font-family:var(--font-mono);font-size:0.8rem;color:var(--gray);letter-spacing:2px;}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:10px;padding:18px 44px;border-radius:100px;font-family:var(--font-display);font-weight:700;font-size:0.78rem;text-transform:uppercase;letter-spacing:3px;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);cursor:pointer;border:none;position:relative;overflow:hidden;}
.btn-gold{background:var(--gold);color:var(--black);}
.btn-gold:hover{background:var(--gold-deep);transform:translateY(-3px);box-shadow:0 20px 50px rgba(247,186,24,0.35);}
.btn-ghost{background:transparent;color:var(--white);border:1px solid rgba(255,255,255,0.15);}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-3px);}
.btn-naver{background:#03C75A;color:var(--white-pure);}
.btn-naver:hover{transform:translateY(-3px);box-shadow:0 20px 50px rgba(3,199,90,0.3);}
.btn-outline{background:transparent;color:var(--gold);border:1px solid var(--gold);}
.btn-outline:hover{background:var(--gold);color:var(--black);transform:translateY(-3px);}

/* SECTION COMMONS */
.sec-pad{padding:clamp(100px,12vw,200px) clamp(24px,4vw,60px);}
.sec-label{font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:8px;color:var(--gold);margin-bottom:24px;display:flex;align-items:center;gap:16px;font-weight:600;}
.sec-label::before{content:'';width:40px;height:1px;background:var(--gold);}
.sec-title{font-family:var(--font-kr);font-size:clamp(2rem,4vw,3.8rem);font-weight:900;line-height:1.2;letter-spacing:-2px;}
.sec-title em{font-style:normal;color:var(--gold);}
.sec-inner{max-width:1400px;margin:0 auto;}

/* CTA */
.cta{background:var(--black);text-align:center;position:relative;overflow:hidden;}
.cta::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;background:radial-gradient(circle,rgba(247,186,24,0.06),transparent 65%);border-radius:50%;pointer-events:none;}
.cta-inner{position:relative;z-index:1;}
.cta-inner h2{font-family:var(--font-kr);font-size:clamp(2.2rem,4.5vw,4.2rem);font-weight:900;letter-spacing:-2px;line-height:1.25;margin-bottom:24px;}
.cta-inner h2 em{font-style:normal;color:var(--gold);}
.cta-inner>p{font-family:var(--font-kr);font-size:0.92rem;color:var(--gray);font-weight:300;line-height:2;margin-bottom:48px;max-width:460px;margin-left:auto;margin-right:auto;}
.cta-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}

/* FOOTER */
footer{padding:56px clamp(24px,4vw,60px);background:var(--black);color:var(--gray);border-top:1px solid rgba(255,255,255,0.04);}
.footer-inner{max-width:1800px;margin:0 auto;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:24px;}
.footer-left{font-family:var(--font-kr);font-size:0.76rem;line-height:2;font-weight:300;}
.footer-left strong{color:var(--gray-light);font-weight:500;}
.footer-right{display:flex;gap:28px;}
.footer-right a{color:var(--gray);font-family:var(--font-display);font-size:0.68rem;text-transform:uppercase;letter-spacing:3px;transition:color 0.3s;font-weight:500;}
.footer-right a:hover{color:var(--gold);}

/* SCROLL REVEAL */
.rv{opacity:0;transform:translateY(60px);transition:all 1.2s cubic-bezier(0.16,1,0.3,1);}
.rv.vis{opacity:1;transform:translateY(0);}
.rv-d1{transition-delay:0.1s;}
.rv-d2{transition-delay:0.2s;}
.rv-d3{transition-delay:0.3s;}
.rv-d4{transition-delay:0.4s;}
.rv-scale{opacity:0;transform:scale(0.9);transition:all 1.2s cubic-bezier(0.16,1,0.3,1);}
.rv-scale.vis{opacity:1;transform:scale(1);}

/* RESPONSIVE */
@media(max-width:1024px){
  .nav-dropdown{display:none;}
}
@media(max-width:768px){
  .nav-links{display:none;}
  .hamburger{display:flex;}
  .cursor-dot,.cursor-ring{display:none;}
  .btn{width:100%;justify-content:center;padding:16px 32px;font-size:0.72rem;}
  .sec-pad{padding:clamp(60px,10vw,120px) 20px;}
  .sec-title{font-size:clamp(1.6rem,5vw,2.4rem)!important;letter-spacing:-1px;}
  .sec-label{font-size:0.55rem;letter-spacing:5px;}
  .cta-inner h2{font-size:clamp(1.6rem,5vw,2.4rem);}
  .cta-inner>p{font-size:0.85rem;margin-bottom:32px;}
  .cta{padding-bottom:100px!important;}
  footer{padding:32px 20px;padding-bottom:80px!important;}
  .footer-inner{flex-direction:column;text-align:center;gap:20px;}
  .footer-left{font-size:0.72rem;}
  .footer-right{flex-wrap:wrap;justify-content:center;gap:20px;}
  .mob-link{font-size:clamp(1.3rem,4.5vw,2rem);padding:10px 0;letter-spacing:2px;}
  .mob-link-sub{font-size:clamp(0.8rem,2.2vw,1rem)!important;padding:6px 0!important;}
  .mob-menu-footer{bottom:32px;font-size:0.7rem;}
  /* 모바일 하단 바 */
  .mob-bottom-bar{position:fixed;bottom:0;left:0;right:0;z-index:9998;display:flex;gap:1px;background:rgba(10,10,10,0.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(247,186,24,0.15);}
  .mob-bottom-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:16px 12px;font-family:var(--font-display);font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(--white);transition:all 0.3s;text-decoration:none;}
  .mob-bottom-btn i{font-size:0.9rem;}
  .mob-bottom-btn.btn-call{background:var(--gold);color:var(--black);}
  .mob-bottom-btn.btn-naver-m{background:#03C75A;color:#fff;}
  .mob-bottom-btn.btn-blog{background:rgba(255,255,255,0.06);}
}
@media(max-width:480px){
  .sec-pad{padding:48px 16px;}
  .btn{padding:14px 24px;font-size:0.68rem;letter-spacing:2px;}
  .mob-link{font-size:clamp(1.1rem,4vw,1.6rem);}
}
@media(min-width:769px){
  .mob-bottom-bar{display:none;}
}
`;

// ===========================
// SUBPAGE CSS (treatment detail pages)
// ===========================
const subpageCSS = `
/* ===== SUBPAGE HERO ===== */
.sub-hero{min-height:60vh;display:flex;align-items:flex-end;position:relative;overflow:hidden;background:var(--black);}
.sub-hero-bg{position:absolute;inset:0;}
.sub-hero-bg img{width:100%;height:100%;object-fit:cover;filter:brightness(0.25) contrast(1.1);object-position:center center;}
.sub-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,0.2) 0%,rgba(10,10,10,0.85) 100%);}
.sub-hero-content{position:relative;z-index:2;padding:0 clamp(24px,4vw,60px) 80px;max-width:1400px;margin:0 auto;width:100%;}
.sub-hero-tag{font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:8px;color:var(--gold);margin-bottom:20px;display:flex;align-items:center;gap:16px;font-weight:600;}
.sub-hero-tag::before{content:'';width:40px;height:1px;background:var(--gold);}
.sub-hero h1{font-family:var(--font-kr);font-size:clamp(2.5rem,6vw,5rem);font-weight:900;letter-spacing:-3px;line-height:1.15;margin-bottom:20px;}
.sub-hero h1 em{font-style:normal;color:var(--gold);}
.sub-hero-desc{font-family:var(--font-kr);font-size:1rem;color:var(--gray-light);font-weight:300;line-height:2;max-width:600px;}
.sub-hero-breadcrumb{position:absolute;top:110px;left:clamp(24px,4vw,60px);z-index:2;font-family:var(--font-display);font-size:0.65rem;text-transform:uppercase;letter-spacing:3px;color:var(--gray);display:flex;align-items:center;gap:8px;}
.sub-hero-breadcrumb a{color:var(--gray);transition:color 0.3s;}
.sub-hero-breadcrumb a:hover{color:var(--gold);}
.sub-hero-breadcrumb .sep{color:var(--gold);font-size:0.5rem;}

/* ===== TREATMENT INTRO ===== */
.treat-intro{background:var(--white);color:var(--black);}
.treat-intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1400px;margin:0 auto;}
.treat-intro-text h2{font-family:var(--font-kr);font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;letter-spacing:-2px;line-height:1.3;margin-bottom:24px;}
.treat-intro-text h2 em{font-style:normal;color:var(--gold-deep);}
.treat-intro-text p{font-family:var(--font-kr);font-size:0.92rem;line-height:2.1;color:var(--gray-dark);font-weight:300;margin-bottom:20px;}
.treat-intro-img{border-radius:24px;overflow:hidden;position:relative;}
.treat-intro-img img{width:100%;aspect-ratio:4/3;object-fit:cover;transition:transform 0.8s;}
.treat-intro-img:hover img{transform:scale(1.03);}

/* ===== HIGHLIGHTS / FEATURES ===== */
.highlights{background:var(--black);}
.highlights-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px;}
.hl-card{background:var(--dark-card);padding:52px 40px;position:relative;overflow:hidden;transition:all 0.5s;border:1px solid transparent;}
.hl-card:hover{border-color:rgba(247,186,24,0.15);background:rgba(247,186,24,0.03);}
.hl-card-icon{width:52px;height:52px;border-radius:14px;background:rgba(247,186,24,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:24px;color:var(--gold);font-size:1.2rem;transition:all 0.5s;}
.hl-card:hover .hl-card-icon{background:var(--gold);color:var(--black);}
.hl-card h3{font-family:var(--font-display);font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;}
.hl-card p{font-family:var(--font-kr);font-size:0.85rem;line-height:1.9;color:var(--gray);font-weight:300;}

/* ===== PROCESS STEPS ===== */
.process{background:var(--white);color:var(--black);}
.process-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px;margin-top:60px;counter-reset:step;}
.process-card{background:var(--cream);border-radius:20px;padding:40px 32px;position:relative;overflow:hidden;transition:all 0.5s;counter-increment:step;}
.process-card::before{content:counter(step,decimal-leading-zero);position:absolute;top:16px;right:20px;font-family:var(--font-number);font-size:4rem;color:rgba(0,0,0,0.04);line-height:1;letter-spacing:2px;pointer-events:none;}
.process-card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,0.06);background:var(--white-pure);}
.process-card h4{font-family:var(--font-display);font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(--gold-deep);margin-bottom:12px;}
.process-card p{font-family:var(--font-kr);font-size:0.85rem;line-height:1.9;color:var(--gray-dark);font-weight:300;}
.process-connector{display:flex;align-items:center;justify-content:center;margin-top:40px;gap:0;}
.process-dot{width:8px;height:8px;border-radius:50%;background:var(--gold);}
.process-line{flex:1;height:1px;background:linear-gradient(90deg,var(--gold),rgba(247,186,24,0.1));}

/* ===== FAQ ===== */
.faq{background:var(--black-warm);}
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

/* ===== OTHER TREATMENTS NAV ===== */
.other-treats{background:var(--dark);padding:80px clamp(24px,4vw,60px);}
.other-treats-inner{max-width:1400px;margin:0 auto;}
.other-treats-label{font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:6px;color:var(--gray);margin-bottom:32px;font-weight:600;}
.other-treats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;}
.other-treat-link{display:block;padding:24px;background:var(--dark-card);border-radius:16px;border:1px solid transparent;transition:all 0.4s;text-align:center;}
.other-treat-link:hover{border-color:rgba(247,186,24,0.2);background:rgba(247,186,24,0.03);transform:translateY(-2px);}
.other-treat-link.current{border-color:var(--gold);background:rgba(247,186,24,0.06);}
.other-treat-link h4{font-family:var(--font-kr);font-size:0.9rem;font-weight:500;margin-bottom:4px;}
.other-treat-link span{font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:2px;color:var(--gold);font-weight:600;}

/* ===== PAGE SECTIONS (shared) ===== */
.page-section{padding:clamp(100px,12vw,180px) clamp(24px,4vw,60px);}
.page-inner{max-width:1400px;margin:0 auto;}
.bg-white{background:var(--white);}
.bg-black{background:var(--black);}
.bg-dark{background:var(--dark);}
.sub-hero-tall{min-height:70vh;}

/* ===== PHILOSOPHY PAGE ===== */
.philo-quote-block{text-align:center;position:relative;padding:40px 0;}
.philo-quote-mark{font-family:var(--font-number);font-size:clamp(6rem,14vw,12rem);color:rgba(212,160,16,0.08);line-height:0.6;pointer-events:none;margin-bottom:-20px;}
.philo-quote-text{font-family:var(--font-kr);font-size:clamp(1.4rem,3vw,2.4rem);font-weight:700;line-height:1.7;letter-spacing:-1px;color:var(--black);max-width:800px;margin:0 auto;}
.philo-quote-credit{font-family:var(--font-display);font-size:0.7rem;text-transform:uppercase;letter-spacing:5px;color:var(--gray);margin-top:40px;font-weight:500;}

.philo-values-list{margin-top:60px;display:flex;flex-direction:column;gap:0;}
.philo-value-item{display:flex;gap:40px;padding:48px 0;border-bottom:1px solid rgba(255,255,255,0.06);align-items:flex-start;}
.philo-value-item:last-child{border-bottom:none;}
.philo-value-num{font-family:var(--font-number);font-size:4rem;color:rgba(247,186,24,0.12);line-height:1;letter-spacing:3px;flex-shrink:0;min-width:80px;}
.philo-value-content h3{font-family:var(--font-kr);font-size:1.3rem;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:12px;}
.philo-value-content h3 i{color:var(--gold);font-size:1rem;}
.philo-value-content p{font-family:var(--font-kr);font-size:0.92rem;line-height:2.1;color:var(--gray-light);font-weight:300;}

.story-timeline{margin-top:60px;position:relative;}
.story-timeline::before{content:'';position:absolute;left:60px;top:0;bottom:0;width:1px;background:rgba(247,186,24,0.15);}
.story-item{display:flex;gap:40px;padding:40px 0;position:relative;}
.story-year{font-family:var(--font-number);font-size:2.5rem;color:var(--gold);letter-spacing:3px;flex-shrink:0;min-width:90px;text-align:center;position:relative;}
.story-year::after{content:'';position:absolute;right:-21px;top:50%;transform:translateY(-50%);width:10px;height:10px;border-radius:50%;background:var(--gold);border:3px solid var(--dark);}
.story-text h4{font-family:var(--font-display);font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;}
.story-text p{font-family:var(--font-kr);font-size:0.88rem;line-height:2;color:var(--gray-light);font-weight:300;}

.philo-numbers{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;text-align:center;}
.philo-num-item{padding:60px 24px;background:var(--dark-card);border:1px solid transparent;transition:all 0.5s;}
.philo-num-item:hover{border-color:rgba(247,186,24,0.15);}
.philo-num-big{font-family:var(--font-number);font-size:clamp(3rem,5vw,5rem);color:var(--gold);line-height:1;letter-spacing:3px;}
.philo-num-unit{font-family:var(--font-display);font-size:0.7rem;text-transform:uppercase;letter-spacing:3px;color:var(--gold);margin-top:4px;font-weight:600;}
.philo-num-desc{font-family:var(--font-kr);font-size:0.8rem;color:var(--gray);margin-top:12px;font-weight:300;}

/* ===== DOCTORS PAGE ===== */
.doc-lead-grid{display:grid;grid-template-columns:400px 1fr;gap:60px;align-items:start;margin-top:40px;}
.doc-lead-photo{position:relative;border-radius:24px;overflow:hidden;aspect-ratio:3/4;}
.doc-lead-photo img{width:100%;height:100%;object-fit:cover;object-position:center top;}
.doc-lead-badge{position:absolute;top:16px;left:16px;background:var(--gold);color:var(--black);padding:8px 20px;border-radius:50px;font-family:var(--font-display);font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;}
.doc-lead-info h2{font-family:var(--font-kr);font-size:clamp(2rem,3.5vw,3rem);font-weight:900;letter-spacing:-2px;margin-bottom:8px;}
.doc-name-en{font-family:var(--font-display);font-size:0.8rem;font-weight:500;text-transform:uppercase;letter-spacing:3px;color:var(--gray);margin-left:12px;}
.doc-role{font-family:var(--font-display);font-size:0.75rem;text-transform:uppercase;letter-spacing:2px;color:var(--gold-deep);font-weight:600;margin-bottom:28px;}
.doc-quote{font-family:var(--font-kr);font-size:1.1rem;line-height:1.9;color:var(--gray-dark);font-weight:400;font-style:italic;padding:24px;background:var(--cream);border-left:3px solid var(--gold);border-radius:0 12px 12px 0;margin-bottom:32px;}
.doc-creds-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
.doc-cred-section h4{font-family:var(--font-display);font-size:0.7rem;text-transform:uppercase;letter-spacing:3px;color:var(--gold-deep);margin-bottom:14px;font-weight:600;}
.doc-cred-section ul{list-style:none;font-family:var(--font-kr);font-size:0.85rem;line-height:2.2;color:var(--gray-dark);font-weight:300;}
.doc-cred-section li{padding-left:16px;position:relative;}
.doc-cred-section li::before{content:'';position:absolute;left:0;top:11px;width:5px;height:5px;background:var(--gold);border-radius:50%;}

.doc-card-horizontal{display:flex;gap:48px;align-items:flex-start;margin-top:40px;}
.doc-h-icon{width:80px;height:80px;flex-shrink:0;border-radius:20px;background:rgba(247,186,24,0.08);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:2rem;}
.doc-h-info{flex:1;}
.doc-h-info h2{font-family:var(--font-kr);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:900;letter-spacing:-1px;margin-bottom:8px;}
.doc-h-desc{font-family:var(--font-kr);font-size:0.95rem;line-height:2;color:var(--gray-light);font-weight:300;margin-top:16px;margin-bottom:24px;}
.doc-creds-simple{display:flex;flex-direction:column;gap:8px;margin-bottom:24px;}
.doc-creds-simple span{font-family:var(--font-kr);font-size:0.85rem;color:var(--gray);font-weight:300;display:flex;align-items:center;gap:10px;}
.doc-creds-simple i{color:var(--gold);font-size:0.75rem;width:20px;text-align:center;}
.doc-specialty-tags{display:flex;flex-wrap:wrap;gap:10px;}
.doc-specialty-tags span{padding:8px 20px;border:1px solid rgba(247,186,24,0.25);border-radius:50px;font-family:var(--font-display);font-size:0.7rem;color:var(--gold);text-transform:uppercase;letter-spacing:2px;font-weight:500;transition:all 0.3s;}
.doc-specialty-tags span:hover{background:rgba(247,186,24,0.1);border-color:var(--gold);}

.team-approach-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;}
.team-approach-card{background:var(--cream);border-radius:20px;padding:48px 36px;transition:all 0.5s;}
.team-approach-card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,0.06);background:var(--white-pure);}
.team-approach-icon{width:56px;height:56px;border-radius:16px;background:rgba(212,160,16,0.1);display:flex;align-items:center;justify-content:center;color:var(--gold-deep);font-size:1.3rem;margin-bottom:24px;transition:all 0.5s;}
.team-approach-card:hover .team-approach-icon{background:var(--gold);color:var(--black);}
.team-approach-card h4{font-family:var(--font-kr);font-size:1.1rem;font-weight:700;margin-bottom:14px;color:var(--black);}
.team-approach-card p{font-family:var(--font-kr);font-size:0.88rem;line-height:2;color:var(--gray-dark);font-weight:300;}

/* ===== EXPERIENCE PAGE ===== */
.exp-pillar{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-bottom:120px;}
.exp-pillar:last-child{margin-bottom:0;}
.exp-pillar-reverse{direction:rtl;}
.exp-pillar-reverse>*{direction:ltr;}
.exp-pillar-img{border-radius:24px;overflow:hidden;position:relative;}
.exp-pillar-img img{width:100%;aspect-ratio:4/3;object-fit:cover;transition:transform 0.8s;}
.exp-pillar-img:hover img{transform:scale(1.03);}
.exp-pillar-num{font-family:var(--font-number);font-size:5rem;color:rgba(212,160,16,0.08);line-height:1;letter-spacing:3px;margin-bottom:-10px;}
.exp-pillar-text h3{font-family:var(--font-display);font-size:0.8rem;text-transform:uppercase;letter-spacing:4px;color:var(--gold-deep);margin-bottom:12px;font-weight:700;}
.exp-pillar-text h4{font-family:var(--font-kr);font-size:clamp(1.4rem,2.5vw,2rem);font-weight:900;letter-spacing:-1px;margin-bottom:20px;color:var(--black);}
.exp-pillar-text p{font-family:var(--font-kr);font-size:0.92rem;line-height:2.1;color:var(--gray-dark);font-weight:300;margin-bottom:16px;}

.exp-gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.exp-gallery-item{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:4/3;}
.exp-gallery-item img{width:100%;height:100%;object-fit:cover;filter:grayscale(30%);transition:all 0.6s;}
.exp-gallery-item:hover img{filter:grayscale(0%);transform:scale(1.05);}
.exp-gallery-item span{position:absolute;bottom:16px;left:16px;font-family:var(--font-kr);font-size:0.8rem;color:var(--white);background:rgba(0,0,0,0.5);backdrop-filter:blur(10px);padding:6px 14px;border-radius:8px;font-weight:400;opacity:0;transform:translateY(10px);transition:all 0.4s;}
.exp-gallery-item:hover span{opacity:1;transform:translateY(0);}

.review-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;text-align:left;}
.review-card{background:var(--dark-card);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;transition:all 0.5s;}
.review-card:hover{border-color:rgba(247,186,24,0.15);transform:translateY(-4px);}
.review-stars{color:var(--gold);font-size:0.8rem;margin-bottom:20px;display:flex;gap:4px;}
.review-card p{font-family:var(--font-kr);font-size:0.92rem;line-height:2;color:var(--gray-light);font-weight:300;margin-bottom:20px;}
.review-author{font-family:var(--font-display);font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;color:var(--gray);font-weight:500;}

/* ===== LOCATION PAGE ===== */
.loc-full-grid{display:grid;grid-template-columns:1.3fr 1fr;gap:60px;}
.loc-full-map{border-radius:24px;overflow:hidden;height:600px;background:var(--cream);position:relative;}
.loc-full-map iframe{width:100%;height:100%;border:0;filter:grayscale(80%) contrast(1.1);transition:filter 0.6s;}
.loc-full-map:hover iframe{filter:grayscale(0%);}
.loc-full-info{display:flex;flex-direction:column;justify-content:center;gap:8px;}
.loc-info-card{display:flex;gap:24px;padding:28px 0;border-bottom:1px solid rgba(0,0,0,0.06);align-items:flex-start;}
.loc-info-card:last-child{border-bottom:none;}
.loc-info-icon{width:48px;height:48px;flex-shrink:0;border-radius:14px;background:rgba(212,160,16,0.1);display:flex;align-items:center;justify-content:center;color:var(--gold-deep);font-size:1.1rem;}
.loc-info-card h4{font-family:var(--font-display);font-size:0.7rem;text-transform:uppercase;letter-spacing:3px;color:var(--gold-deep);font-weight:600;margin-bottom:10px;}
.loc-info-card p{font-family:var(--font-kr);font-size:0.95rem;line-height:1.8;color:var(--black);font-weight:400;}
.loc-detail{font-family:var(--font-kr);font-size:0.82rem;color:var(--gray);font-weight:300;display:block;margin-top:4px;}
.loc-hours-grid{display:grid;grid-template-columns:56px 1fr;gap:4px 16px;font-size:0.88rem;}
.loc-day{font-weight:600;color:var(--black);font-family:var(--font-display);font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;}
.loc-time{color:var(--gray-dark);font-family:var(--font-mono);font-size:0.85rem;}
.loc-off{color:var(--gold-deep)!important;font-weight:500;}
.loc-night{display:inline-block;background:var(--gold);color:var(--black);padding:2px 10px;border-radius:20px;font-size:0.6rem;font-weight:700;font-family:var(--font-display);text-transform:uppercase;letter-spacing:1px;}

.dir-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.dir-card{background:var(--dark-card);border-radius:20px;padding:48px 36px;border:1px solid transparent;transition:all 0.5s;}
.dir-card:hover{border-color:rgba(247,186,24,0.15);transform:translateY(-4px);}
.dir-icon{width:52px;height:52px;border-radius:14px;background:rgba(247,186,24,0.08);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:1.3rem;margin-bottom:24px;transition:all 0.5s;}
.dir-card:hover .dir-icon{background:var(--gold);color:var(--black);}
.dir-card h4{font-family:var(--font-display);font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;}
.dir-card p{font-family:var(--font-kr);font-size:0.88rem;line-height:2;color:var(--gray);font-weight:300;}
.dir-card strong{color:var(--white);font-weight:500;}

.clinic-info-row{display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-top:20px;}
.clinic-info-item{background:var(--dark-card);border-radius:16px;padding:24px 32px;border:1px solid rgba(255,255,255,0.06);transition:all 0.3s;}
.clinic-info-item:hover{border-color:rgba(247,186,24,0.15);}
.clinic-info-label{display:block;font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:3px;color:var(--gold);font-weight:600;margin-bottom:8px;}
.clinic-info-value{font-family:var(--font-kr);font-size:0.95rem;color:var(--white);font-weight:400;}

/* RESPONSIVE SUBPAGE */
@media(max-width:1024px){
  .treat-intro-grid{grid-template-columns:1fr;gap:40px;}
  .highlights-grid{grid-template-columns:1fr;}
  .doc-lead-grid{grid-template-columns:1fr;gap:40px;}
  .doc-lead-photo{max-width:400px;margin:0 auto;}
  .doc-creds-grid{grid-template-columns:1fr;}
  .doc-card-horizontal{flex-direction:column;gap:24px;}
  .team-approach-grid{grid-template-columns:1fr;}
  .exp-pillar{grid-template-columns:1fr;gap:40px;}
  .exp-pillar-reverse{direction:ltr;}
  .exp-gallery-grid{grid-template-columns:repeat(2,1fr);}
  .review-cards{grid-template-columns:1fr;}
  .loc-full-grid{grid-template-columns:1fr;}
  .loc-full-map{height:400px;}
  .dir-grid{grid-template-columns:1fr;}
  .philo-numbers{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:768px){
  .sub-hero{min-height:40vh;}
  .sub-hero-tall{min-height:50vh;}
  .sub-hero h1{font-size:clamp(1.8rem,5vw,2.5rem);letter-spacing:-1px;}
  .sub-hero-content{padding:0 20px 48px;}
  .sub-hero-breadcrumb{top:80px;left:20px;font-size:0.58rem;}
  .sub-hero-tag{font-size:0.55rem;letter-spacing:5px;}
  .sub-hero-desc{font-size:0.88rem;}
  .page-section{padding:clamp(60px,10vw,100px) 20px;}
  .process-steps{grid-template-columns:1fr;gap:20px;}
  .process-card{padding:32px 24px;}
  .philo-value-item{flex-direction:column;gap:12px;}
  .philo-value-num{font-size:2.5rem;min-width:auto;}
  .philo-value-content h3{font-size:1.1rem;}
  .philo-value-content p{font-size:0.85rem;}
  .story-timeline::before{display:none;}
  .story-item{flex-direction:column;gap:12px;padding:28px 0;}
  .story-year{text-align:left;min-width:auto;font-size:2rem;}
  .story-year::after{display:none;}
  .philo-numbers{grid-template-columns:1fr 1fr;}
  .philo-num-item{padding:36px 16px;}
  .philo-num-big{font-size:clamp(2.5rem,6vw,3.5rem);}
  /* DOCTORS */
  .doc-lead-photo{max-width:280px;margin:0 auto;}
  .doc-lead-info h2{font-size:clamp(1.8rem,5vw,2.2rem);text-align:center;}
  .doc-name-en{display:block;margin-left:0;text-align:center;margin-top:4px;}
  .doc-role{text-align:center;}
  .doc-quote{font-size:0.95rem;padding:20px;}
  .doc-creds-grid{grid-template-columns:1fr;gap:24px;}
  .doc-card-horizontal{flex-direction:column;align-items:center;gap:20px;}
  .doc-h-icon{width:64px;height:64px;}
  .doc-h-info h2{font-size:clamp(1.5rem,4vw,1.8rem);text-align:center;}
  .doc-h-desc{font-size:0.88rem;text-align:center;}
  .doc-specialty-tags{justify-content:center;}
  .team-approach-card{padding:32px 24px;}
  /* EXPERIENCE */
  .exp-pillar{grid-template-columns:1fr;gap:32px;margin-bottom:80px;}
  .exp-pillar-num{font-size:3rem;}
  .exp-pillar-text h4{font-size:clamp(1.2rem,4vw,1.5rem);}
  .exp-pillar-text p{font-size:0.85rem;}
  .exp-gallery-grid{grid-template-columns:1fr;gap:12px;}
  .exp-gallery-item{aspect-ratio:16/10;}
  .review-card{padding:28px 24px;}
  .review-card p{font-size:0.85rem;}
  .clinic-info-row{flex-direction:column;align-items:stretch;}
  /* LOCATION */
  .loc-full-map{height:280px;border-radius:16px;}
  .loc-info-card{gap:16px;padding:20px 0;}
  .loc-info-icon{width:40px;height:40px;border-radius:10px;font-size:0.9rem;}
  .loc-info-card h4{font-size:0.62rem;}
  .loc-info-card p{font-size:0.88rem;}
  .loc-hours-grid{font-size:0.82rem;}
  .dir-card{padding:32px 24px;}
}
@media(max-width:480px){
  .sub-hero{min-height:35vh;}
  .sub-hero h1{font-size:clamp(1.5rem,5vw,2rem);}
  .page-section{padding:48px 16px;}
  .philo-num-big{font-size:clamp(2rem,5vw,2.5rem);}
  .doc-lead-photo{max-width:240px;}
  .process-card{padding:24px 20px;}
}
`;
