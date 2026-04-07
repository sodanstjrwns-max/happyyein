import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>행복한예인치과 | YEIN DENTAL</title>
<meta name="description" content="서울 시청역 5분. 13년간 한자리에서 쌓아온 신뢰. 발치즉시 임플란트, 보존치료, 심미치료 전문.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700;900&family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css');
}
:root {
  --gold: #F7BA18;
  --gold-deep: #C8930A;
  --gold-glow: rgba(247,186,24,0.15);
  --black: #0A0A0A;
  --black-light: #141414;
  --black-card: #1A1A1A;
  --white: #F5F2ED;
  --white-pure: #FFFFFF;
  --cream: #EDE8E0;
  --gray: #888;
  --gray-dark: #555;
  --gray-light: #B8B4AE;
  --accent-font: 'Syne', 'Bebas Neue', sans-serif;
  --display-font: 'Syne', 'Space Grotesk', sans-serif;
  --body-font: 'DM Sans', 'Space Grotesk', 'Noto Sans KR', sans-serif;
  --korean-font: 'Noto Sans KR', sans-serif;
  --heading-kr: 'Noto Sans KR', sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box;}
html{font-size:16px;scroll-behavior:smooth;overflow-x:hidden;}
body{font-family:var(--body-font);color:var(--black);background:var(--white);overflow-x:hidden;-webkit-font-smoothing:antialiased;}
::selection{background:var(--gold);color:var(--black);}

/* ========= LOADER ========= */
.loader{position:fixed;inset:0;background:var(--black);z-index:99999;display:flex;align-items:center;justify-content:center;transition:opacity 0.6s,visibility 0.6s;}
.loader.done{opacity:0;visibility:hidden;pointer-events:none;}
.loader-text{font-family:var(--accent-font);font-size:clamp(2rem,5vw,4rem);color:var(--gold);font-style:normal;font-weight:800;text-transform:uppercase;letter-spacing:8px;opacity:0;animation:loaderIn 1.2s ease forwards;}
@keyframes loaderIn{0%{opacity:0;transform:translateY(20px);letter-spacing:15px}50%{opacity:1}100%{opacity:1;transform:translateY(0);letter-spacing:2px}}


/* ========= NAV ========= */
nav{position:fixed;top:0;width:100%;z-index:1000;padding:24px 0;mix-blend-mode:difference;transition:all 0.5s;}
nav.scrolled{mix-blend-mode:normal;background:rgba(10,10,10,0.92);backdrop-filter:blur(30px);padding:14px 0;}
.nav-inner{max-width:1600px;margin:0 auto;padding:0 48px;display:flex;justify-content:space-between;align-items:center;}
.nav-brand{font-family:var(--accent-font);font-size:1.4rem;color:var(--white-pure);text-decoration:none;font-style:normal;font-weight:800;letter-spacing:3px;text-transform:uppercase;}
.nav-brand em{color:var(--gold);font-style:normal;}
.nav-links{display:flex;gap:32px;align-items:center;}
.nav-links a{text-decoration:none;color:var(--white-pure);font-family:var(--display-font);font-size:0.8rem;font-weight:500;text-transform:uppercase;letter-spacing:2px;transition:color 0.3s;position:relative;}
.nav-links a:hover{color:var(--gold);}
.nav-tel{font-family:var(--display-font);font-weight:700;color:var(--gold)!important;font-size:0.85rem!important;letter-spacing:1px!important;}
.hamburger{display:none;flex-direction:column;gap:6px;cursor:pointer;z-index:1001;}
.hamburger span{width:28px;height:2px;background:var(--white-pure);transition:all 0.3s;}
.hamburger.active span:nth-child(1){transform:rotate(45deg) translateY(5.5px);}
.hamburger.active span:nth-child(2){opacity:0;}
.hamburger.active span:nth-child(3){transform:rotate(-45deg) translateY(-5.5px);}
.mob-menu{position:fixed;inset:0;background:var(--black);z-index:999;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:40px;opacity:0;visibility:hidden;transition:all 0.5s;}
.mob-menu.open{opacity:1;visibility:visible;}
.mob-menu a{font-family:var(--accent-font);font-size:2.5rem;color:var(--white);text-decoration:none;font-style:normal;font-weight:800;text-transform:uppercase;letter-spacing:4px;transition:color 0.3s;}
.mob-menu a:hover{color:var(--gold);}

/* ========= HERO ========= */
.hero{min-height:100vh;background:var(--black);color:var(--white);display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden;padding:0 48px 80px;}
.hero-bg{position:absolute;inset:0;overflow:hidden;}
.hero-bg img{position:absolute;right:0;bottom:0;height:100%;width:60%;object-fit:contain;object-position:right bottom;opacity:0.35;filter:grayscale(30%);mask-image:linear-gradient(to left,rgba(0,0,0,0.8) 30%,transparent 80%);}
.hero-grain{position:absolute;inset:0;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");}
.hero-content{position:relative;z-index:2;max-width:1600px;width:100%;margin:0 auto;}
.hero-eyebrow{font-family:var(--display-font);font-size:0.7rem;text-transform:uppercase;letter-spacing:6px;color:var(--gold);margin-bottom:32px;display:flex;align-items:center;gap:16px;}
.hero-eyebrow::before{content:'';width:40px;height:1px;background:var(--gold);}
.hero-title{font-family:var(--heading-kr);font-size:clamp(2.8rem,7.5vw,7rem);line-height:1;letter-spacing:-4px;font-weight:900;margin-bottom:40px;}
.hero-title .accent{color:var(--gold);font-family:var(--accent-font);font-weight:800;text-transform:uppercase;letter-spacing:2px;}
.hero-title .outline{-webkit-text-stroke:2px var(--white);color:transparent;font-family:var(--accent-font);font-weight:800;text-transform:uppercase;letter-spacing:2px;}
.hero-bottom{display:flex;justify-content:space-between;align-items:flex-end;margin-top:40px;}
.hero-desc{max-width:420px;font-family:var(--korean-font);font-size:0.92rem;line-height:1.9;color:var(--gray-light);font-weight:300;}
.hero-cta-group{display:flex;gap:16px;align-items:center;}
.btn-gold{display:inline-flex;align-items:center;gap:10px;background:var(--gold);color:var(--black);padding:18px 40px;border-radius:60px;text-decoration:none;font-family:var(--display-font);font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;transition:all 0.4s;border:none;cursor:pointer;}
.btn-gold:hover{background:var(--gold-deep);transform:translateY(-2px);box-shadow:0 15px 40px rgba(247,186,24,0.3);}
.btn-ghost{display:inline-flex;align-items:center;gap:10px;background:transparent;color:var(--white);padding:18px 40px;border-radius:60px;text-decoration:none;font-family:var(--display-font);font-weight:500;font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;border:1px solid rgba(255,255,255,0.2);transition:all 0.4s;cursor:pointer;}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold);}
.hero-scroll{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;}
.hero-scroll span{font-family:var(--display-font);font-size:0.65rem;text-transform:uppercase;letter-spacing:3px;color:var(--gray);writing-mode:vertical-rl;}
.hero-scroll-line{width:1px;height:60px;background:linear-gradient(to bottom,var(--gold),transparent);animation:scrollLine 2s ease-in-out infinite;}
@keyframes scrollLine{0%,100%{opacity:0.3;transform:scaleY(0.5)}50%{opacity:1;transform:scaleY(1)}}

/* ========= HORIZONTAL NUMBER STRIP ========= */
.num-strip{display:flex;border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);background:var(--black);}
.num-item{flex:1;padding:48px;text-align:center;border-right:1px solid rgba(255,255,255,0.08);transition:background 0.4s;}
.num-item:last-child{border-right:none;}
.num-item:hover{background:rgba(247,186,24,0.05);}
.num-item .num{font-family:'Bebas Neue',var(--accent-font);font-size:3.5rem;color:var(--gold);font-style:normal;line-height:1;letter-spacing:2px;}
.num-item .txt{font-family:var(--korean-font);font-size:0.78rem;color:var(--gray);margin-top:12px;font-weight:300;letter-spacing:-0.3px;}

/* ========= TEXT REVEAL SECTION ========= */
.big-text-section{padding:200px 48px;background:var(--white);position:relative;overflow:hidden;}
.big-text-inner{max-width:1400px;margin:0 auto;}
.big-text{font-family:var(--heading-kr);font-size:clamp(2.5rem,5.5vw,5rem);line-height:1.35;color:var(--black);font-weight:900;letter-spacing:-3px;}
.big-text em{font-style:normal;color:var(--gold);}
.big-text .light{color:var(--gray-light);font-weight:300;}
.big-text-credit{margin-top:40px;font-family:var(--display-font);font-size:0.75rem;text-transform:uppercase;letter-spacing:4px;color:var(--gray);font-weight:500;}

/* ========= VALUES (Horizontal Scroll) ========= */
.values-section{padding:160px 0;background:var(--cream);overflow:hidden;}
.values-header{padding:0 48px;max-width:1600px;margin:0 auto 60px;}
.sec-label{font-family:var(--display-font);font-size:0.7rem;text-transform:uppercase;letter-spacing:6px;color:var(--gold-deep);margin-bottom:20px;display:flex;align-items:center;gap:16px;}
.sec-label::before{content:'';width:30px;height:1px;background:var(--gold-deep);}
.sec-title{font-family:var(--heading-kr);font-size:clamp(2rem,4vw,3.5rem);font-weight:900;letter-spacing:-2px;line-height:1.2;}
.sec-title em{font-style:normal;color:var(--gold);}
.values-track{display:flex;gap:24px;padding:0 48px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-ms-overflow-style:none;cursor:grab;}
.values-track::-webkit-scrollbar{display:none;}
.value-card{flex-shrink:0;width:420px;padding:56px 44px;background:var(--white-pure);border-radius:24px;scroll-snap-align:start;transition:all 0.5s;position:relative;overflow:hidden;border:1px solid transparent;}
.value-card:hover{border-color:var(--gold);transform:translateY(-4px);box-shadow:0 30px 60px rgba(0,0,0,0.06);}
.value-card::before{content:attr(data-num);position:absolute;top:-15px;right:20px;font-family:'Bebas Neue',var(--accent-font);font-size:8rem;color:rgba(247,186,24,0.06);font-style:normal;line-height:1;pointer-events:none;letter-spacing:4px;}
.value-card h3{font-family:var(--display-font);font-size:1.3rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;}
.value-card p{font-family:var(--korean-font);font-size:0.9rem;line-height:1.9;color:var(--gray-dark);font-weight:300;}
.value-card-icon{width:52px;height:52px;background:var(--gold);border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:28px;font-size:1.2rem;color:var(--black);}

/* ========= TREATMENTS ========= */
.treatments{padding:160px 48px;background:var(--black);color:var(--white);}
.treatments-inner{max-width:1600px;margin:0 auto;}
.treat-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:80px;}
.treat-card{position:relative;padding:60px 48px;background:var(--black-light);min-height:340px;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;transition:all 0.5s;cursor:pointer;}
.treat-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(247,186,24,0.05),transparent);opacity:0;transition:opacity 0.5s;}
.treat-card:hover::before{opacity:1;}
.treat-card:hover{background:var(--black-card);}
.treat-num{position:absolute;top:40px;right:48px;font-family:'Bebas Neue',var(--accent-font);font-size:6rem;font-style:normal;font-weight:400;color:rgba(247,186,24,0.08);line-height:1;letter-spacing:4px;}
.treat-card:hover .treat-num{color:rgba(247,186,24,0.15);}
.treat-tag{font-family:var(--display-font);font-size:0.65rem;text-transform:uppercase;letter-spacing:4px;color:var(--gold);margin-bottom:12px;}
.treat-card h3{font-family:var(--korean-font);font-size:1.6rem;font-weight:700;margin-bottom:12px;letter-spacing:-0.5px;}
.treat-card p{font-family:var(--korean-font);font-size:0.88rem;line-height:1.8;color:var(--gray);font-weight:300;max-width:400px;}
.treat-card-featured{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr;gap:0;padding:0;min-height:500px;}
.treat-card-featured .treat-content{padding:60px 48px;display:flex;flex-direction:column;justify-content:center;}
.treat-card-featured .treat-img{position:relative;overflow:hidden;}
.treat-card-featured .treat-img img{width:100%;height:100%;object-fit:cover;object-position:center top;filter:grayscale(20%);transition:all 0.6s;}
.treat-card-featured:hover .treat-img img{filter:grayscale(0%);transform:scale(1.03);}
.treat-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px;}
.treat-pill{padding:8px 18px;border:1px solid rgba(247,186,24,0.25);border-radius:50px;font-family:var(--display-font);font-size:0.72rem;color:var(--gold);text-transform:uppercase;letter-spacing:1px;transition:all 0.3s;}
.treat-card:hover .treat-pill{border-color:var(--gold);background:rgba(247,186,24,0.1);}

/* ========= TEAM ========= */
.team-section{padding:160px 48px;background:var(--white);}
.team-inner{max-width:1600px;margin:0 auto;}
.team-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;margin-top:80px;}
.team-card{position:relative;overflow:hidden;border-radius:20px;background:var(--cream);transition:all 0.5s;}
.team-card:hover{transform:translateY(-6px);box-shadow:0 40px 60px rgba(0,0,0,0.08);}
.team-card.lead{background:var(--black);color:var(--white);}
.team-photo{aspect-ratio:3/4;overflow:hidden;position:relative;}
.team-photo img{width:100%;height:100%;object-fit:cover;object-position:center top;transition:transform 0.6s;}
.team-card:hover .team-photo img{transform:scale(1.04);}
.team-photo-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--cream),var(--white));}
.team-card.lead .team-photo-placeholder{background:linear-gradient(135deg,#1a1a1a,#2a2a2a);}
.team-photo-placeholder i{font-size:3rem;color:var(--gold);opacity:0.2;}
.team-label{position:absolute;top:16px;left:16px;background:var(--gold);color:var(--black);padding:6px 16px;border-radius:50px;font-family:var(--display-font);font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;}
.team-info{padding:28px 28px 32px;}
.team-info h3{font-family:var(--display-font);font-size:1.25rem;font-weight:700;margin-bottom:4px;}
.team-info .role{font-family:var(--display-font);font-size:0.8rem;font-style:normal;font-weight:600;color:var(--gold);margin-bottom:16px;text-transform:uppercase;letter-spacing:1px;}
.team-creds{list-style:none;font-family:var(--korean-font);font-size:0.78rem;line-height:1.9;color:var(--gray);}
.team-card.lead .team-creds{color:var(--gray);}
.team-creds li{padding-left:14px;position:relative;}
.team-creds li::before{content:'';position:absolute;left:0;top:9px;width:4px;height:4px;background:var(--gold);border-radius:50%;}

/* ========= EXPERIENCE SPLIT ========= */
.exp-section{padding:0;background:var(--black);color:var(--white);}
.exp-grid{display:grid;grid-template-columns:1fr 1fr;min-height:100vh;}
.exp-images{position:relative;overflow:hidden;}
.exp-images-inner{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;height:100%;}
.exp-images-inner img{width:100%;height:100%;object-fit:cover;object-position:center center;filter:grayscale(20%);transition:filter 0.4s;}
.exp-images-inner img:hover{filter:grayscale(0%);}
.exp-images-inner img:first-child{grid-column:span 2;}
.exp-text{padding:100px 72px;display:flex;flex-direction:column;justify-content:center;}
.exp-text h2{font-family:var(--heading-kr);font-size:clamp(2rem,3.5vw,3.2rem);font-weight:900;line-height:1.3;margin-bottom:32px;letter-spacing:-2px;}
.exp-text h2 em{font-style:normal;color:var(--gold);}
.exp-text>p{font-family:var(--korean-font);font-size:0.92rem;line-height:1.9;color:var(--gray-light);font-weight:300;margin-bottom:48px;}
.exp-list{list-style:none;display:flex;flex-direction:column;gap:0;}
.exp-item{display:flex;align-items:flex-start;gap:20px;padding:24px 0;border-bottom:1px solid rgba(255,255,255,0.06);}
.exp-item:last-child{border-bottom:none;}
.exp-item-icon{width:44px;height:44px;flex-shrink:0;border:1px solid rgba(247,186,24,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:0.95rem;}
.exp-item h4{font-family:var(--display-font);font-size:0.9rem;font-weight:600;margin-bottom:4px;letter-spacing:0.5px;}
.exp-item p{font-family:var(--korean-font);font-size:0.82rem;color:var(--gray);font-weight:300;}

/* ========= PHOTO MARQUEE ========= */
.photo-marquee{padding:80px 0;background:var(--cream);overflow:hidden;}
.photo-track{display:flex;gap:16px;animation:photoScroll 40s linear infinite;}
.photo-track img{height:280px;width:auto;border-radius:16px;object-fit:contain;flex-shrink:0;filter:grayscale(20%);transition:filter 0.3s;}
.photo-track img:hover{filter:grayscale(0%);}
@keyframes photoScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ========= LOCATION ========= */
.location{padding:160px 48px;background:var(--white);}
.location-inner{max-width:1400px;margin:0 auto;}
.location-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-top:80px;}
.location-map{border-radius:24px;overflow:hidden;height:520px;background:var(--cream);}
.location-map iframe{width:100%;height:100%;border:0;filter:grayscale(80%);transition:filter 0.5s;}
.location-map:hover iframe{filter:grayscale(0%);}
.loc-info{display:flex;flex-direction:column;justify-content:center;}
.loc-block{padding:28px 0;border-bottom:1px solid rgba(0,0,0,0.06);}
.loc-block:last-child{border-bottom:none;}
.loc-block-label{font-family:var(--display-font);font-size:0.65rem;text-transform:uppercase;letter-spacing:4px;color:var(--gold-deep);font-weight:600;margin-bottom:12px;}
.loc-block-value{font-family:var(--korean-font);font-size:1rem;font-weight:400;line-height:1.8;color:var(--black);}
.loc-block-value small{display:block;font-size:0.82rem;color:var(--gray);font-weight:300;margin-top:4px;}
.loc-block-value a{color:var(--gold-deep);text-decoration:none;font-weight:700;font-size:1.4rem;font-family:var(--display-font);letter-spacing:1px;}
.loc-block-value a:hover{color:var(--gold);}
.hours-grid{display:grid;grid-template-columns:60px 1fr;gap:4px 16px;font-size:0.9rem;}
.hours-grid .day{font-weight:600;color:var(--black);}
.hours-grid .time{color:var(--gray-dark);}
.hours-grid .off{color:var(--gold-deep);font-weight:500;}
.night-badge{display:inline-block;background:var(--gold);color:var(--black);padding:2px 10px;border-radius:20px;font-size:0.7rem;font-weight:700;margin-left:8px;font-family:var(--display-font);text-transform:uppercase;letter-spacing:1px;}

/* ========= CTA SECTION ========= */
.cta-section{padding:160px 48px;background:var(--black);text-align:center;position:relative;overflow:hidden;}
.cta-section::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:500px;background:radial-gradient(circle,rgba(247,186,24,0.08),transparent 70%);border-radius:50%;}
.cta-inner{position:relative;z-index:1;}
.cta-inner h2{font-family:var(--heading-kr);font-size:clamp(2.5rem,5vw,4.5rem);color:var(--white);font-weight:900;letter-spacing:-3px;line-height:1.2;margin-bottom:24px;}
.cta-inner h2 em{font-style:normal;color:var(--gold);}
.cta-inner p{font-family:var(--korean-font);font-size:0.95rem;color:var(--gray);font-weight:300;line-height:1.8;margin-bottom:48px;max-width:500px;margin-left:auto;margin-right:auto;}
.cta-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
.btn-naver{display:inline-flex;align-items:center;gap:10px;background:#03C75A;color:var(--white-pure);padding:18px 40px;border-radius:60px;text-decoration:none;font-family:var(--display-font);font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;transition:all 0.4s;}
.btn-naver:hover{transform:translateY(-2px);box-shadow:0 15px 40px rgba(3,199,90,0.3);}

/* ========= FOOTER ========= */
footer{padding:48px;background:var(--black-light);color:var(--gray);border-top:1px solid rgba(255,255,255,0.05);}
.footer-inner{max-width:1600px;margin:0 auto;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:24px;}
.footer-left{font-family:var(--korean-font);font-size:0.78rem;line-height:1.9;font-weight:300;}
.footer-left strong{color:var(--gray-light);font-weight:500;}
.footer-right{display:flex;gap:24px;}
.footer-right a{color:var(--gray);text-decoration:none;font-family:var(--display-font);font-size:0.72rem;text-transform:uppercase;letter-spacing:2px;transition:color 0.3s;}
.footer-right a:hover{color:var(--gold);}

/* ========= SCROLL REVEAL ========= */
.reveal{opacity:0;transform:translateY(50px);transition:all 1s cubic-bezier(0.16,1,0.3,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-delay-1{transition-delay:0.1s;}
.reveal-delay-2{transition-delay:0.2s;}
.reveal-delay-3{transition-delay:0.3s;}

/* ========= TEXT CHAR ANIMATION ========= */
.char-reveal span{display:inline-block;opacity:0;transform:translateY(100%);transition:all 0.6s cubic-bezier(0.16,1,0.3,1);}
.char-reveal.visible span{opacity:1;transform:translateY(0);}

/* ========= RESPONSIVE ========= */
@media(max-width:1024px){
  .hero{padding:0 32px 60px;}
  .hero-title{font-size:clamp(2.5rem,7vw,5rem);}
  .hero-bottom{flex-direction:column;gap:32px;align-items:flex-start;}
  .num-strip{flex-wrap:wrap;}
  .num-item{flex:1 1 50%;border-bottom:1px solid rgba(255,255,255,0.08);}
  .treat-grid{grid-template-columns:1fr;}
  .treat-card-featured{grid-column:span 1;grid-template-columns:1fr;}
  .treat-card-featured .treat-img{min-height:300px;}
  .team-grid{grid-template-columns:1fr;max-width:440px;margin-left:auto;margin-right:auto;}
  .exp-grid{grid-template-columns:1fr;}
  .exp-images-inner{height:400px;}
  .exp-text{padding:80px 48px;}
  .location-grid{grid-template-columns:1fr;}
  .location-map{height:350px;}
}
@media(max-width:768px){
  .nav-links{display:none;}
  .hamburger{display:flex;}
  .hero{padding:0 24px 50px;min-height:90vh;}
  .hero-title{letter-spacing:-1px;}
  .hero-eyebrow{font-size:0.6rem;letter-spacing:4px;}
  .hero-cta-group{flex-direction:column;width:100%;}
  .btn-gold,.btn-ghost{width:100%;justify-content:center;}
  .hero-scroll{display:none;}
  .num-item{padding:32px 24px;}
  .num-item .num{font-size:2.5rem;}
  .big-text-section{padding:120px 24px;}
  .big-text{font-size:clamp(1.8rem,5vw,3rem);}
  .values-section{padding:100px 0;}
  .value-card{width:320px;padding:40px 32px;}
  .treatments{padding:100px 24px;}
  .treat-card{padding:40px 32px;min-height:280px;}
  .treat-card-featured .treat-content{padding:40px 32px;}
  .team-section{padding:100px 24px;}
  .exp-text{padding:60px 24px;}
  .photo-track img{height:200px;width:auto;}
  .location{padding:100px 24px;}
  .cta-section{padding:100px 24px;}
  .cta-inner h2{font-size:clamp(2rem,5vw,3rem);}
  footer{padding:32px 24px;}
  .footer-inner{flex-direction:column;text-align:center;}
  .footer-right{flex-wrap:wrap;justify-content:center;}
}
</style>
</head>
<body>

<!-- LOADER -->
<div class="loader" id="loader">
  <div class="loader-text">Yein Dental</div>
</div>


<!-- NAV -->
<nav id="nav">
  <div class="nav-inner">
    <a href="#" class="nav-brand"><em>Yein</em> Dental</a>
    <div class="nav-links">
      <a href="#philosophy">Philosophy</a>
      <a href="#treatments">Treatments</a>
      <a href="#team">Doctors</a>
      <a href="#experience">Experience</a>
      <a href="#location">Location</a>
      <a href="tel:02-756-2828" class="nav-tel">02.756.2828</a>
    </div>
    <div class="hamburger" id="hamburger">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>

<!-- MOBILE MENU -->
<div class="mob-menu" id="mobMenu">
  <a href="#philosophy" onclick="closeMob()">Philosophy</a>
  <a href="#treatments" onclick="closeMob()">Treatments</a>
  <a href="#team" onclick="closeMob()">Doctors</a>
  <a href="#experience" onclick="closeMob()">Experience</a>
  <a href="#location" onclick="closeMob()">Location</a>
  <a href="tel:02-756-2828" onclick="closeMob()" style="color:var(--gold)">02.756.2828</a>
</div>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg">
    <img src="https://www.genspark.ai/api/files/s/KLYGAldi" alt="">
    <div class="hero-grain"></div>
  </div>
  <div class="hero-content">
    <div class="hero-eyebrow">Happy Yein Dental Clinic &mdash; Est. 2013</div>
    <h1 class="hero-title">
      13년 전의<br>
      진료를 <span class="accent">오늘까지</span><br>
      <span class="outline">TRUST</span> 의 치과
    </h1>
    <div class="hero-bottom">
      <p class="hero-desc">
        바쁜 직장 생활 속에서 미뤄왔던 치료,<br>
        이제 더 이상 미루지 않아도 됩니다.<br>
        과장 없이, 숨김 없이. 시청역 도보 5분.
      </p>
      <div class="hero-cta-group">
        <a href="tel:02-756-2828" class="btn-gold"><i class="fas fa-phone-alt"></i> Book Now</a>
        <a href="#treatments" class="btn-ghost">Explore <i class="fas fa-arrow-down"></i></a>
      </div>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="hero-scroll-line"></div>
  </div>
</section>

<!-- NUMBER STRIP -->
<div class="num-strip">
  <div class="num-item">
    <div class="num">13+</div>
    <div class="txt">Years in One Place</div>
  </div>
  <div class="num-item">
    <div class="num">458</div>
    <div class="txt">Patient Reviews</div>
  </div>
  <div class="num-item">
    <div class="num">80%+</div>
    <div class="txt">Immediate Implant</div>
  </div>
  <div class="num-item">
    <div class="num">3</div>
    <div class="txt">Specialist Doctors</div>
  </div>
</div>

<!-- BIG TEXT -->
<section class="big-text-section" id="philosophy">
  <div class="big-text-inner">
    <p class="big-text reveal">
      내 가족에게<br>
      <em>권할 수 없는 치료</em>는<br>
      <span class="light">시작도 하지 않습니다.</span>
    </p>
    <div class="big-text-credit reveal reveal-delay-1">&mdash; Han Seungdae, D.M.D., Ph.D.</div>
  </div>
</section>

<!-- VALUES -->
<section class="values-section">
  <div class="values-header">
    <div class="sec-label">Our Values</div>
    <h2 class="sec-title reveal">치료의 <em>본질</em>에 집중합니다</h2>
  </div>
  <div class="values-track">
    <div class="value-card" data-num="01">
      <div class="value-card-icon"><i class="fas fa-handshake"></i></div>
      <h3>Trust</h3>
      <p>"원장님은 믿거든요" 라는 말씀을 자주 듣습니다. 과장하지 않고 숨김없는 진료. 13년간 같은 자리에서 쌓아온 신뢰가 우리의 가장 큰 자산입니다.</p>
    </div>
    <div class="value-card" data-num="02">
      <div class="value-card-icon"><i class="fas fa-hand-holding-heart"></i></div>
      <h3>Care</h3>
      <p>환자의 시간, 상황, 선택을 존중합니다. 사회초년생들의 부담을 줄이기 위한 진료 할인부터, 바쁜 직장인을 위한 효율적인 예약 시스템까지.</p>
    </div>
    <div class="value-card" data-num="03">
      <div class="value-card-icon"><i class="fas fa-infinity"></i></div>
      <h3>Sustain</h3>
      <p>환자, 직원, 병원 모두 오래 갈 수 있는 방향을 모색합니다. 단기적인 매출보다 장기적인 관계를 우선합니다.</p>
    </div>
    <div class="value-card" data-num="04">
      <div class="value-card-icon"><i class="fas fa-feather-alt"></i></div>
      <h3>Comfort</h3>
      <p>치료 결과도 중요하지만 과정에서의 경험을 더 중요하게 생각합니다. 치과를 다녀간 뒤 피곤함보다 안도감을 느낄 수 있도록.</p>
    </div>
  </div>
</section>

<!-- TREATMENTS -->
<section class="treatments" id="treatments">
  <div class="treatments-inner">
    <div class="sec-label" style="color:var(--gold);">Treatments</div>
    <h2 class="sec-title reveal" style="color:var(--white);">정확한 진단, <em>최적의</em> 치료</h2>
    <div class="treat-grid">
      <div class="treat-card treat-card-featured reveal">
        <div class="treat-content">
          <div class="treat-num">01</div>
          <div class="treat-tag">Core Treatment</div>
          <h3>발치즉시 임플란트</h3>
          <p>발치와 동시에 임플란트를 식립하여 치료 기간을 획기적으로 단축. 80% 이상의 케이스에서 즉시식립을 시행하며, 고난이도 케이스까지 대응합니다.</p>
          <div class="treat-pills">
            <span class="treat-pill">Time-Saving</span>
            <span class="treat-pill">High Difficulty</span>
            <span class="treat-pill">80%+ Immediate</span>
          </div>
        </div>
        <div class="treat-img">
          <img src="https://www.genspark.ai/api/files/s/4QFpv2o4" alt="임플란트 시술">
        </div>
      </div>
      <div class="treat-card reveal">
        <div class="treat-num">02</div>
        <div class="treat-tag">Preservation</div>
        <h3>치아 보존 치료</h3>
        <p>보존과 전문의가 직접 치료. 최대한 자연 치아를 살리는 방향의 신경치료 및 보존 수복.</p>
        <div class="treat-pills">
          <span class="treat-pill">Specialist</span>
          <span class="treat-pill">Natural Tooth</span>
        </div>
      </div>
      <div class="treat-card reveal">
        <div class="treat-num">03</div>
        <div class="treat-tag">Aesthetic</div>
        <h3>앞니 심미 치료</h3>
        <p>치아 삭제량을 최소화하는 전치부 레진 및 라미네이트 치료. 자연스러운 미소를 설계합니다.</p>
        <div class="treat-pills">
          <span class="treat-pill">Minimal Prep</span>
          <span class="treat-pill">Laminate</span>
        </div>
      </div>
      <div class="treat-card reveal">
        <div class="treat-num">04</div>
        <div class="treat-tag">Orthodontics</div>
        <h3>치아 교정</h3>
        <p>교정과 전문의의 체계적인 교정. 투명교정부터 설측교정까지 라이프스타일에 맞는 솔루션.</p>
        <div class="treat-pills">
          <span class="treat-pill">Invisalign</span>
          <span class="treat-pill">Lingual</span>
        </div>
      </div>
      <div class="treat-card reveal">
        <div class="treat-num">05</div>
        <div class="treat-tag">General Care</div>
        <h3>일반 / 예방 치료</h3>
        <p>정기검진, 스케일링, 충치치료. 기본에 충실하되 편안함을 더한 진료를 제공합니다.</p>
        <div class="treat-pills">
          <span class="treat-pill">Check-up</span>
          <span class="treat-pill">Painless</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TEAM -->
<section class="team-section" id="team">
  <div class="team-inner">
    <div class="sec-label">Doctors</div>
    <h2 class="sec-title reveal">각 분야 <em>전문의</em> 협진</h2>
    <div class="team-grid">
      <div class="team-card lead reveal">
        <div class="team-photo">
          <img src="https://www.genspark.ai/api/files/s/aZ1AVpoe" alt="한승대 대표원장">
          <div class="team-label">Lead Doctor</div>
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
      <div class="team-card reveal reveal-delay-1">
        <div class="team-photo">
          <div class="team-photo-placeholder"><i class="fas fa-user-md"></i></div>
        </div>
        <div class="team-info">
          <h3>신정희</h3>
          <div class="role">Conservative Dentistry Specialist, Ph.D.</div>
          <ul class="team-creds">
            <li>경희대학교 치과대학 졸업</li>
            <li>경희대학교 대학원 치의학 박사</li>
            <li>보건복지부 인증 치과보존과 전문의</li>
            <li>경희대 치과보존과 레지던트 수료</li>
            <li>경희대 치과보존과 외래강사 역임</li>
          </ul>
        </div>
      </div>
      <div class="team-card reveal reveal-delay-2">
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

<!-- EXPERIENCE -->
<section class="exp-section" id="experience">
  <div class="exp-grid">
    <div class="exp-images">
      <div class="exp-images-inner">
        <img src="https://www.genspark.ai/api/files/s/9Tv8JF9w" alt="상담">
        <img src="https://www.genspark.ai/api/files/s/vxRijLs3" alt="X-ray">
        <img src="https://www.genspark.ai/api/files/s/tqlF25HE" alt="진료">
      </div>
    </div>
    <div class="exp-text">
      <div class="sec-label" style="color:var(--gold);">Patient Experience</div>
      <h2>치과를 다녀간 뒤<br><em>안도감</em>을 느끼셨으면.</h2>
      <p>긴장하고 오셨다가 생각보다 아프지 않아서 놀라셨다는 말씀. 그 한마디가 저희에게 가장 큰 보람입니다.</p>
      <ul class="exp-list">
        <li class="exp-item">
          <div class="exp-item-icon"><i class="fas fa-hand-sparkles"></i></div>
          <div>
            <h4>Gentle Touch</h4>
            <p>마취부터 치료까지, 부드럽고 편안한 진료</p>
          </div>
        </li>
        <li class="exp-item">
          <div class="exp-item-icon"><i class="fas fa-clock"></i></div>
          <div>
            <h4>Time-Efficient</h4>
            <p>바쁜 직장인을 기준으로 설계된 진료 프로세스</p>
          </div>
        </li>
        <li class="exp-item">
          <div class="exp-item-icon"><i class="fas fa-comments"></i></div>
          <div>
            <h4>Clear Communication</h4>
            <p>X-ray 앞에서 이해가 될 때까지 설명합니다</p>
          </div>
        </li>
        <li class="exp-item">
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

<!-- PHOTO MARQUEE -->
<div class="photo-marquee">
  <div class="photo-track">
    <img src="https://www.genspark.ai/api/files/s/SI2rNsv1" alt="">
    <img src="https://www.genspark.ai/api/files/s/oMAXh11u" alt="">
    <img src="https://www.genspark.ai/api/files/s/cZc5FX3M" alt="">
    <img src="https://www.genspark.ai/api/files/s/ztzdipBZ" alt="">
    <img src="https://www.genspark.ai/api/files/s/Ifp4ODKF" alt="">
    <img src="https://www.genspark.ai/api/files/s/RPl9UxsF" alt="">
    <img src="https://www.genspark.ai/api/files/s/pNaPRPWE" alt="">
    <img src="https://www.genspark.ai/api/files/s/yZhTDJht" alt="">
    <img src="https://www.genspark.ai/api/files/s/jXurzPZE" alt="">
    <img src="https://www.genspark.ai/api/files/s/TNxmWlgT" alt="">
    <!-- duplicate for seamless loop -->
    <img src="https://www.genspark.ai/api/files/s/SI2rNsv1" alt="">
    <img src="https://www.genspark.ai/api/files/s/oMAXh11u" alt="">
    <img src="https://www.genspark.ai/api/files/s/cZc5FX3M" alt="">
    <img src="https://www.genspark.ai/api/files/s/ztzdipBZ" alt="">
    <img src="https://www.genspark.ai/api/files/s/Ifp4ODKF" alt="">
    <img src="https://www.genspark.ai/api/files/s/RPl9UxsF" alt="">
    <img src="https://www.genspark.ai/api/files/s/pNaPRPWE" alt="">
    <img src="https://www.genspark.ai/api/files/s/yZhTDJht" alt="">
    <img src="https://www.genspark.ai/api/files/s/jXurzPZE" alt="">
    <img src="https://www.genspark.ai/api/files/s/TNxmWlgT" alt="">
  </div>
</div>

<!-- LOCATION -->
<section class="location" id="location">
  <div class="location-inner">
    <div class="sec-label">Location</div>
    <h2 class="sec-title reveal">시청역에서 <em>도보 5분</em></h2>
    <div class="location-grid">
      <div class="location-map reveal">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.5!2d126.978!3d37.566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb1a2f4b7d%3A0x!2z7ISc7Jq4IOykkSDrgqjrjIDrrLjroZw56ri4IDUx!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr" allowfullscreen="" loading="lazy"></iframe>
      </div>
      <div class="loc-info">
        <div class="loc-block reveal">
          <div class="loc-block-label">Address</div>
          <div class="loc-block-value">
            서울 중구 남대문로9길 51<br>효덕빌딩 3층 301호
            <small>1호선 시청역 4, 5번 출구 도보 5분</small>
          </div>
        </div>
        <div class="loc-block reveal reveal-delay-1">
          <div class="loc-block-label">Contact</div>
          <div class="loc-block-value">
            <a href="tel:02-756-2828">02.756.2828</a>
            <small>FAX 02-754-8188</small>
          </div>
        </div>
        <div class="loc-block reveal reveal-delay-2">
          <div class="loc-block-label">Hours</div>
          <div class="loc-block-value">
            <div class="hours-grid">
              <span class="day">MON</span><span class="time">09:30 &ndash; 18:30</span>
              <span class="day">TUE</span><span class="time">09:30 &ndash; 18:30</span>
              <span class="day">WED</span><span class="time">09:30 &ndash; 20:00 <span class="night-badge">Night</span></span>
              <span class="day">THU</span><span class="time">09:30 &ndash; 18:30</span>
              <span class="day">FRI</span><span class="time">09:30 &ndash; 18:30</span>
              <span class="day off">SAT</span><span class="time off">Closed</span>
              <span class="day off">SUN</span><span class="time off">Closed</span>
            </div>
            <small style="margin-top:12px;display:block;">Lunch 13:00&ndash;14:00 / Last reception 1hr before closing</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="cta-inner">
    <h2 class="reveal">치료를 미루고 계셨다면,<br>지금이 <em>그때</em>입니다.</h2>
    <p class="reveal reveal-delay-1">언젠가가 아니라, 지금 치료받을 수 있는<br>신뢰할 수 있는 치과를 만들고 싶었습니다.</p>
    <div class="cta-btns reveal reveal-delay-2">
      <a href="tel:02-756-2828" class="btn-gold"><i class="fas fa-phone-alt"></i> 02.756.2828</a>
      <a href="https://blog.naver.com/yein2828" target="_blank" class="btn-naver"><i class="fab fa-blogger-b"></i> Blog</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-left">
      <strong>행복한예인치과의원</strong><br>
      서울 중구 남대문로9길 51 효덕빌딩 3층 301호<br>
      대표자: 한승대 | 사업자등록번호: 104-91-44744<br>
      TEL 02-756-2828 | FAX 02-754-8188<br>
      &copy; 2005&ndash;2026 Happy Yein Dental Clinic. All rights reserved.
    </div>
    <div class="footer-right">
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
      <a href="https://blog.naver.com/yein2828" target="_blank">Blog</a>
      <a href="#">Instagram</a>
    </div>
  </div>
</footer>

<script>
// LOADER
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loader').classList.add('done'),1800);
});

// NAV SCROLL
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>80));

// HAMBURGER
const hb=document.getElementById('hamburger'),mm=document.getElementById('mobMenu');
hb.addEventListener('click',()=>{hb.classList.toggle('active');mm.classList.toggle('open');document.body.style.overflow=mm.classList.contains('open')?'hidden':'';});
function closeMob(){hb.classList.remove('active');mm.classList.remove('open');document.body.style.overflow='';}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});});
});

// SCROLL REVEAL
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.12,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// VALUES DRAG SCROLL
const vt=document.querySelector('.values-track');
if(vt){let down=false,sx,sl;
vt.addEventListener('mousedown',e=>{down=true;sx=e.pageX-vt.offsetLeft;sl=vt.scrollLeft;vt.style.cursor='grabbing';});
vt.addEventListener('mouseleave',()=>{down=false;vt.style.cursor='grab';});
vt.addEventListener('mouseup',()=>{down=false;vt.style.cursor='grab';});
vt.addEventListener('mousemove',e=>{if(!down)return;e.preventDefault();vt.scrollLeft=sl-(e.pageX-vt.offsetLeft-sx)*1.5;});}
</script>
</body>
</html>`)
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

export default app
