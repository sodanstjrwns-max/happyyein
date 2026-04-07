// 공통 레이아웃: head, nav, footer, scripts

export function head(title: string, description: string) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | 행복한예인치과</title>
<meta name="description" content="${description}">
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
    { label: 'Philosophy', href: '/#philosophy' },
    { label: 'Treatments', href: '/treatments/implant', dropdown: true },
    { label: 'Doctors', href: '/#team' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Location', href: '/#location' },
  ];
  const dropdownItems = [
    { label: '발치즉시 임플란트', href: '/treatments/implant' },
    { label: '치아 보존 치료', href: '/treatments/preservation' },
    { label: '앞니 심미 치료', href: '/treatments/aesthetic' },
    { label: '치아 교정', href: '/treatments/orthodontics' },
    { label: '일반 / 예방 치료', href: '/treatments/general' },
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
        return `<a href="${item.href}" class="nav-link">${item.label}</a>`;
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
  ${dropdownItems.map(d => `<a href="${d.href}" class="mob-link mob-link-sub" onclick="closeMob()">${d.label}</a>`).join('')}
  <a href="/#team" class="mob-link" onclick="closeMob()">Doctors</a>
  <a href="/#location" class="mob-link" onclick="closeMob()">Location</a>
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
      <a href="tel:02-756-2828" class="btn btn-gold"><i class="fas fa-phone-alt"></i> 02.756.2828</a>
      <a href="https://blog.naver.com/yein2828" target="_blank" class="btn btn-naver"><i class="fab fa-blogger-b"></i> Naver Blog</a>
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
</footer>`;
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
  .btn{width:100%;justify-content:center;}
  footer{padding:40px 24px;}
  .footer-inner{flex-direction:column;text-align:center;}
  .footer-right{flex-wrap:wrap;justify-content:center;}
  .cursor-dot,.cursor-ring{display:none;}
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

/* RESPONSIVE SUBPAGE */
@media(max-width:1024px){
  .treat-intro-grid{grid-template-columns:1fr;gap:40px;}
  .highlights-grid{grid-template-columns:1fr;}
}
@media(max-width:768px){
  .sub-hero{min-height:50vh;}
  .sub-hero h1{font-size:clamp(2rem,5vw,3rem);}
  .sub-hero-breadcrumb{top:90px;}
  .process-steps{grid-template-columns:1fr;}
}
`;
