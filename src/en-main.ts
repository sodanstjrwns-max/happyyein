// =============================================
// English Main Page — /en
// Full English homepage with KO ↔ EN switching
// =============================================

const SITE_DOMAIN = 'https://happyyein.kr'

export function englishMainPage(): string {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalOrganization", "LocalBusiness"],
    "@id": `${SITE_DOMAIN}/en#organization`,
    "name": "Happy Yein Dental Clinic",
    "alternateName": ["행복한예인치과", "Happy Yein Dental"],
    "url": `${SITE_DOMAIN}/en`,
    "logo": { "@type": "ImageObject", "url": `${SITE_DOMAIN}/static/img/logo.png` },
    "image": `${SITE_DOMAIN}/static/img/dr-han-logo.jpg`,
    "telephone": "+82-2-756-2828",
    "email": "yein2828@naver.com",
    "foundingDate": "2013",
    "description": "English-speaking dental clinic in central Seoul. 5-min walk from City Hall Station, 8-min from Myeongdong. Immediate implants, root canal specialists, orthodontics. Wednesday night clinic until 8 PM.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil",
      "addressLocality": "Jung-gu",
      "addressRegion": "Seoul",
      "postalCode": "04530",
      "addressCountry": "KR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 37.5596, "longitude": 126.9784 },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Thursday","Friday"], "opens": "09:30", "closes": "18:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:30", "closes": "20:00" }
    ],
    "priceRange": "$$",
    "availableLanguage": [
      { "@type": "Language", "name": "Korean" },
      { "@type": "Language", "name": "English" }
    ],
    "medicalSpecialty": ["Dentistry", "Oral Surgery", "Orthodontics", "Endodontics"],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": { "@type": "EntryPoint", "urlTemplate": "https://naver.me/G0DXGZbi", "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"], "inLanguage": "en" },
      "result": { "@type": "Reservation", "name": "Dental appointment at Happy Yein Dental Clinic" }
    },
    "sameAs": ["https://blog.naver.com/yein2828", "http://pf.kakao.com/_Nxfczxh", "https://place.map.kakao.com/7840173"]
  }).replace(/</g, '\\u003c')

  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Do the dentists speak English?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Dr. Han Seung-dae and our coordinators provide treatment explanations, consent forms, and cost estimates in English. Many of our patients are expats and tourists from the Myeongdong and City Hall area." } },
      { "@type": "Question", "name": "Where is Happy Yein Dental Clinic located?", "acceptedAnswer": { "@type": "Answer", "text": "3F Hyodeok Building, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul. 5-minute walk from City Hall Station (Line 1·2, Exit 4/5), 8 minutes from Myeongdong Station (Line 4), 6 minutes from Hoehyeon Station, 7 minutes from Euljiro 1-ga Station." } },
      { "@type": "Question", "name": "Can I walk in without an appointment?", "acceptedAnswer": { "@type": "Answer", "text": "Walk-ins are welcome for dental emergencies. For regular treatment we recommend booking by phone (+82-2-756-2828) or via Naver Booking to avoid waiting." } },
      { "@type": "Question", "name": "What are your opening hours?", "acceptedAnswer": { "@type": "Answer", "text": "Mon·Tue·Thu·Fri 09:30–18:30, Wednesday 09:30–20:00 (night clinic), lunch break 13:00–14:00. Closed on weekends and public holidays." } },
      { "@type": "Question", "name": "Do you accept international insurance or provide receipts?", "acceptedAnswer": { "@type": "Answer", "text": "We issue itemized English receipts and treatment certificates that you can submit to your travel or international health insurance for reimbursement. Payment by international credit cards is accepted." } },
      { "@type": "Question", "name": "How much does dental treatment cost in Seoul?", "acceptedAnswer": { "@type": "Answer", "text": "Typical ranges at our clinic: check-up & X-ray from ₩10,000–30,000 with Korean NHIS or around ₩50,000 without, fillings ₩50,000–250,000, root canal ₩100,000–350,000, dental implant ₩1,200,000–2,000,000 per tooth. Exact costs are confirmed after diagnosis — no hidden fees." } }
    ]
  }).replace(/</g, '\\u003c')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Happy Yein Dental Clinic Seoul | English-Speaking Dentist near Myeongdong & City Hall</title>
<meta name="description" content="English-speaking dental clinic in central Seoul — 5 min from City Hall Station, 8 min from Myeongdong. Implants, root canals, orthodontics by board-certified specialists. Wednesday night clinic. Call +82-2-756-2828.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE_DOMAIN}/en">
<link rel="alternate" hreflang="ko" href="${SITE_DOMAIN}/">
<link rel="alternate" hreflang="en" href="${SITE_DOMAIN}/en">
<link rel="alternate" hreflang="x-default" href="${SITE_DOMAIN}/">
<meta property="og:type" content="website">
<meta property="og:title" content="Happy Yein Dental Clinic — English-Speaking Dentist in Seoul">
<meta property="og:description" content="Board-certified specialists in implants, root canals & orthodontics. 5 min from City Hall Stn, 8 min from Myeongdong. English receipts for insurance.">
<meta property="og:url" content="${SITE_DOMAIN}/en">
<meta property="og:image" content="${SITE_DOMAIN}/static/img/dr-han-logo.jpg">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<script type="application/ld+json">${jsonLd}</script>
<script type="application/ld+json">${faqLd}</script>
<style>
:root{--gold:#F7BA18;--navy:#013C88;--dark:#0A0A0A;--white:#F5F2ED;--gray:#B5B0A8;}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:var(--dark);color:var(--white);font-family:'Noto Sans KR',sans-serif;-webkit-font-smoothing:antialiased;line-height:1.7;}
a{color:inherit;text-decoration:none;}
img{max-width:100%;display:block;}
.container{max-width:1100px;margin:0 auto;padding:0 24px;}
/* header */
header.en-header{position:sticky;top:0;z-index:999;background:rgba(10,10,10,0.92);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.06);}
.en-header-inner{max-width:1100px;margin:0 auto;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;gap:12px;}
.en-brand{font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;}
.en-brand em{color:var(--gold);font-style:normal;}
.en-header-links{display:flex;gap:18px;align-items:center;font-size:0.8rem;}
.en-header-links a:hover{color:var(--gold);}
.lang-pill{display:inline-flex;border:1px solid rgba(255,255,255,0.18);border-radius:50px;overflow:hidden;font-size:0.72rem;font-weight:700;}
.lang-pill a{padding:7px 14px;}
.lang-pill a.on{background:var(--gold);color:#0A0A0A;}
.tel-btn{background:var(--gold);color:#0A0A0A;padding:9px 18px;border-radius:50px;font-weight:700;font-size:0.78rem;white-space:nowrap;}
/* hero */
.en-hero{padding:80px 0 56px;background:radial-gradient(ellipse at 50% 0%,rgba(247,186,24,0.07),transparent 55%);text-align:center;}
.en-hero h1{font-family:'Syne',sans-serif;font-size:clamp(1.9rem,5vw,3.2rem);font-weight:800;line-height:1.2;margin-bottom:18px;}
.en-hero h1 em{color:var(--gold);font-style:normal;}
.en-hero p.sub{color:var(--gray);max-width:640px;margin:0 auto 26px;font-size:1rem;}
.chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:30px;}
.chip{padding:6px 14px;border-radius:20px;background:rgba(247,186,24,0.09);border:1px solid rgba(247,186,24,0.25);color:var(--gold);font-size:0.74rem;font-weight:700;}
.hero-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.btn{display:inline-flex;align-items:center;gap:9px;padding:15px 30px;border-radius:12px;font-weight:700;font-size:0.9rem;transition:all 0.25s;}
.btn-gold{background:var(--gold);color:#0A0A0A;}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 14px 34px rgba(247,186,24,0.28);}
.btn-line{border:1px solid rgba(255,255,255,0.22);}
.btn-line:hover{border-color:var(--gold);color:var(--gold);}
.reply-note{margin-top:16px;color:var(--gray);font-size:0.78rem;}
.reply-note strong{color:var(--gold);}
/* sections */
section{padding:64px 0;}
.sec-label{font-family:'Syne',sans-serif;font-size:0.68rem;letter-spacing:5px;text-transform:uppercase;color:var(--gold);margin-bottom:10px;text-align:center;}
h2.sec-title{font-family:'Syne',sans-serif;font-size:clamp(1.5rem,3.4vw,2.2rem);font-weight:800;text-align:center;margin-bottom:36px;line-height:1.3;}
h2.sec-title em{color:var(--gold);font-style:normal;}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;}
.card{background:rgba(22,22,22,0.85);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:26px;transition:all 0.25s;}
.card:hover{border-color:rgba(247,186,24,0.3);transform:translateY(-3px);}
.card .ico{font-size:1.5rem;color:var(--gold);margin-bottom:12px;}
.card h3{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;margin-bottom:8px;}
.card p{color:var(--gray);font-size:0.82rem;}
.card a.more{display:inline-block;margin-top:12px;color:var(--gold);font-size:0.76rem;font-weight:700;}
/* doctors */
.doc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;}
.doc-card{background:rgba(22,22,22,0.85);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:26px;text-align:center;}
.doc-card .avatar{width:84px;height:84px;border-radius:50%;background:rgba(247,186,24,0.1);border:2px solid rgba(247,186,24,0.3);display:flex;align-items:center;justify-content:center;font-size:1.8rem;margin:0 auto 14px;}
.doc-card h3{font-family:'Syne',sans-serif;font-size:1.05rem;margin-bottom:4px;}
.doc-card .role{color:var(--gold);font-size:0.76rem;font-weight:700;margin-bottom:10px;}
.doc-card p{color:var(--gray);font-size:0.78rem;}
/* info */
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;}
.info-box{background:rgba(22,22,22,0.85);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:26px;}
.info-box h3{font-family:'Syne',sans-serif;font-size:0.95rem;color:var(--gold);margin-bottom:14px;}
.info-box table{width:100%;border-collapse:collapse;font-size:0.84rem;}
.info-box td{padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:var(--gray);}
.info-box td:last-child{text-align:right;color:var(--white);}
.info-box p{color:var(--gray);font-size:0.84rem;margin-bottom:8px;}
.info-box p strong{color:var(--white);}
/* faq */
details.faq{background:rgba(22,22,22,0.85);border:1px solid rgba(255,255,255,0.07);border-radius:12px;margin-bottom:10px;overflow:hidden;}
details.faq summary{padding:18px 22px;cursor:pointer;font-weight:700;font-size:0.9rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;}
details.faq summary::after{content:'+';color:var(--gold);font-size:1.2rem;flex-shrink:0;}
details.faq[open] summary::after{content:'−';}
details.faq .a{padding:0 22px 18px;color:var(--gray);font-size:0.85rem;}
/* guides */
.guide-banner{background:linear-gradient(135deg,rgba(1,60,136,0.15),rgba(247,186,24,0.07));border:1px solid rgba(247,186,24,0.18);border-radius:20px;padding:36px;text-align:center;}
.guide-banner h3{font-family:'Syne',sans-serif;font-size:1.25rem;font-weight:800;margin-bottom:10px;}
.guide-banner p{color:var(--gray);font-size:0.86rem;margin-bottom:20px;}
/* cta + footer */
.final-cta{text-align:center;background:radial-gradient(ellipse at 50% 100%,rgba(247,186,24,0.08),transparent 60%);}
footer.en-footer{border-top:1px solid rgba(255,255,255,0.06);padding:36px 0 90px;text-align:center;color:#777;font-size:0.75rem;line-height:2;}
footer.en-footer a{color:var(--gray);}
footer.en-footer a:hover{color:var(--gold);}
/* mobile bar */
.mbar{position:fixed;bottom:0;left:0;right:0;z-index:998;display:none;gap:1px;background:rgba(10,10,10,0.98);border-top:1px solid rgba(247,186,24,0.15);}
.mbar a{flex:1;padding:14px 8px;text-align:center;font-size:0.78rem;font-weight:700;}
.mbar .m-call{background:var(--gold);color:#0A0A0A;}
.mbar .m-kakao{background:#FAE100;color:#3C1E1E;}
.mbar .m-book{background:#03C75A;color:#fff;}
@media(max-width:768px){
  .mbar{display:flex;}
  .en-header-links .hide-m{display:none;}
  section{padding:48px 0;}
}
</style>
</head>
<body>

<header class="en-header">
  <div class="en-header-inner">
    <a href="/en" class="en-brand"><em>Yein</em> Dental</a>
    <nav class="en-header-links" aria-label="Main navigation">
      <a href="#treatments" class="hide-m">Treatments</a>
      <a href="#doctors" class="hide-m">Doctors</a>
      <a href="#visit" class="hide-m">Visit Us</a>
      <a href="#faq" class="hide-m">FAQ</a>
      <a href="/en/guides" class="hide-m">Guides</a>
      <span class="lang-pill"><a href="/" title="한국어">KO</a><a href="/en" class="on" title="English">EN</a></span>
      <a href="tel:+82-2-756-2828" class="tel-btn"><i class="fas fa-phone-alt"></i> +82-2-756-2828</a>
    </nav>
  </div>
</header>

<main>
<section class="en-hero" id="top">
  <div class="container">
    <h1>English-Speaking Dentist<br>in <em>Central Seoul</em></h1>
    <p class="sub">Board-certified specialists in implants, root canals and orthodontics — 5 minutes from City Hall Station, 8 minutes from Myeongdong. Trusted at the same location since 2013.</p>
    <div class="chips">
      <span class="chip">Same-day immediate implants (80%+ of cases)</span>
      <span class="chip">3 board-certified specialists</span>
      <span class="chip">English receipts for insurance</span>
      <span class="chip">Wednesday night clinic until 8 PM</span>
    </div>
    <div class="hero-ctas">
      <a href="tel:+82-2-756-2828" class="btn btn-gold"><i class="fas fa-phone-alt"></i> Call Now</a>
      <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener" class="btn btn-line"><i class="fas fa-calendar-check"></i> Book Online</a>
      <a href="http://pf.kakao.com/_Nxfczxh" target="_blank" rel="noopener" class="btn btn-line" style="border-color:rgba(250,225,0,0.4);color:#FAE100;"><i class="fas fa-comment"></i> KakaoTalk</a>
    </div>
    <p class="reply-note">💬 KakaoTalk messages answered <strong>within 30 minutes</strong> during clinic hours · emails <strong>within 24 hours</strong>.</p>
  </div>
</section>

<section id="treatments">
  <div class="container">
    <p class="sec-label">Treatments</p>
    <h2 class="sec-title">What brings you in <em>today?</em></h2>
    <div class="grid3">
      <div class="card">
        <div class="ico"><i class="fas fa-tooth"></i></div>
        <h3>Dental Implants</h3>
        <p>In 8 out of 10 cases we place the implant on the same day the tooth is extracted — cutting total treatment time in half. CT-guided planning, NYU Implant Institute trained.</p>
        <a class="more" href="/en/dental-implant-seoul-korea">Implant cost guide →</a>
      </div>
      <div class="card">
        <div class="ico"><i class="fas fa-heartbeat"></i></div>
        <h3>Root Canal (Save Your Tooth)</h3>
        <p>Our endodontic specialist works under a microscope at up to 20x magnification. If your tooth can be saved, we save it — extraction is always the last resort.</p>
        <a class="more" href="/en/toothache-seoul-tourist">Toothache guide →</a>
      </div>
      <div class="card">
        <div class="ico"><i class="fas fa-smile"></i></div>
        <h3>Clear Aligners & Braces</h3>
        <p>Orthodontic specialist offering Invisalign-style clear aligners. Appointments every 4–8 weeks fit expat and business schedules.</p>
        <a class="more" href="/en/english-speaking-dentist-myeongdong">Meet our team →</a>
      </div>
      <div class="card">
        <div class="ico"><i class="fas fa-gem"></i></div>
        <h3>Cosmetic Dentistry</h3>
        <p>Minimal-prep laminates, resin bonding and whitening for front teeth. Natural results — no over-treatment, ever.</p>
        <a class="more" href="/en/teeth-whitening-myeongdong">Whitening guide →</a>
      </div>
      <div class="card">
        <div class="ico"><i class="fas fa-shield-alt"></i></div>
        <h3>Check-ups & Cleaning</h3>
        <p>Scaling, digital X-rays and prevention. With Korean NHIS, annual scaling costs around ₩20,000. Perfect lunch-break visit — done in 30–40 minutes.</p>
        <a class="more" href="/en/dental-checkup-cleaning-seoul">Cleaning guide →</a>
      </div>
      <div class="card">
        <div class="ico"><i class="fas fa-star-of-life"></i></div>
        <h3>Emergency Care</h3>
        <p>Broken tooth, knocked-out tooth, lost crown, severe pain — walk-ins welcome. Call ahead and we will prepare for your arrival.</p>
        <a class="more" href="/en/emergency-dentist-myeongdong">Emergency guide →</a>
      </div>
    </div>
  </div>
</section>

<section id="doctors" style="background:rgba(255,255,255,0.015);">
  <div class="container">
    <p class="sec-label">Our Specialists</p>
    <h2 class="sec-title">Every field, treated by <em>its own specialist</em></h2>
    <div class="doc-grid">
      <div class="doc-card">
        <div class="avatar">👨‍⚕️</div>
        <h3>Dr. Han Seung-dae</h3>
        <div class="role">Director · Board-Certified in Integrative Dentistry · Ph.D.</div>
        <p>Implant surgery & full-mouth care. NYU Implant Institute graduate. 13 years of implant cases at this location, with 80%+ immediate-placement rate. Speaks English.</p>
      </div>
      <div class="doc-card">
        <div class="avatar">👩‍⚕️</div>
        <h3>Dr. Shin Jung-hee</h3>
        <div class="role">Board-Certified Endodontist · Ph.D.</div>
        <p>Root canals and retreatment under the microscope. Kyung Hee University conservative dentistry residency. Her mission: keep your natural tooth.</p>
      </div>
      <div class="doc-card">
        <div class="avatar">👩‍⚕️</div>
        <h3>Dr. Park Hyun-mi</h3>
        <div class="role">Orthodontic Specialist · M.S. (Yonsei Univ.)</div>
        <p>Clear aligner and lingual orthodontics. Designs treatment plans that respect your work schedule and appearance needs.</p>
      </div>
    </div>
    <p style="text-align:center;margin-top:22px;color:var(--gray);font-size:0.82rem;">Our philosophy: <em style="color:var(--gold);">"We never start a treatment we wouldn't recommend to our own family."</em></p>
  </div>
</section>

<section id="visit">
  <div class="container">
    <p class="sec-label">Visit Us</p>
    <h2 class="sec-title">5 minutes from <em>City Hall Station</em></h2>
    <div class="info-grid">
      <div class="info-box">
        <h3><i class="fas fa-clock"></i> Opening Hours</h3>
        <table>
          <tr><td>Mon · Tue · Thu · Fri</td><td>09:30 – 18:30</td></tr>
          <tr><td>Wednesday (night clinic)</td><td>09:30 – 20:00</td></tr>
          <tr><td>Lunch break</td><td>13:00 – 14:00</td></tr>
          <tr><td>Weekends & holidays</td><td>Closed</td></tr>
        </table>
      </div>
      <div class="info-box">
        <h3><i class="fas fa-map-marker-alt"></i> Address & Directions</h3>
        <p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
        <p>🚇 City Hall Stn (Line 1·2) Exit 4/5 — 5 min walk<br>
        🚇 Myeongdong Stn (Line 4) — 8 min walk<br>
        🚇 Hoehyeon Stn (Line 4) — 6 min walk<br>
        🚇 Euljiro 1-ga Stn (Line 2) — 7 min walk</p>
        <p><a href="https://map.naver.com/v5/entry/place/36682457" target="_blank" rel="noopener" style="color:var(--gold);font-weight:700;">Open in Naver Map →</a></p>
      </div>
      <div class="info-box">
        <h3><i class="fas fa-credit-card"></i> Payment & Insurance</h3>
        <p>✓ International credit cards accepted<br>
        ✓ Itemized <strong>English receipts & treatment certificates</strong> for travel / international insurance claims<br>
        ✓ Korean NHIS accepted<br>
        ✓ Transparent estimates before treatment — no hidden fees</p>
      </div>
    </div>
  </div>
</section>

<section id="faq" style="background:rgba(255,255,255,0.015);">
  <div class="container" style="max-width:800px;">
    <p class="sec-label">FAQ</p>
    <h2 class="sec-title">Questions from <em>international patients</em></h2>
    <details class="faq"><summary>Do the dentists speak English?</summary><div class="a">Yes. Dr. Han and our coordinators explain diagnoses, treatment options and costs in English. Consent forms and receipts are available in English as well.</div></details>
    <details class="faq"><summary>Can I walk in without an appointment?</summary><div class="a">For emergencies, yes — walk-ins are welcome. For regular care, call +82-2-756-2828 or book via Naver Booking to skip the wait. KakaoTalk messages are answered within 30 minutes during clinic hours.</div></details>
    <details class="faq"><summary>How much will my treatment cost?</summary><div class="a">Check-up & X-ray from ₩10,000–30,000 with NHIS (≈₩50,000 without), fillings ₩50,000–250,000, root canal ₩100,000–350,000, implants ₩1,200,000–2,000,000 per tooth. You receive a written estimate before any treatment begins.</div></details>
    <details class="faq"><summary>Can I claim the cost on my insurance?</summary><div class="a">Yes. We issue itemized English receipts and doctor's notes that most travel and international health insurers accept for reimbursement.</div></details>
    <details class="faq"><summary>I'm only in Seoul for a few days. Can you finish treatment quickly?</summary><div class="a">We prioritize travelers. Emergencies are stabilized on the day; many treatments (fillings, crowns prep, cleaning, whitening) can be completed or staged within a short stay. Tell us your departure date and we plan around it.</div></details>
    <details class="faq"><summary>Is the night clinic really open until 8 PM?</summary><div class="a">Yes — every Wednesday we run a night clinic until 20:00. Last reception is one hour before closing. It is popular with expats working in the CBD, so booking ahead is recommended.</div></details>
  </div>
</section>

<section>
  <div class="container">
    <div class="guide-banner">
      <h3>🌍 44 Free Dental Guides in EN · 日本語 · 中文</h3>
      <p>Emergency care, costs in Korea, whitening, implants, wisdom teeth and more — written for tourists and expats in Seoul.</p>
      <a href="/en/guides" class="btn btn-gold"><i class="fas fa-book-open"></i> Browse All Guides</a>
    </div>
  </div>
</section>

<section class="final-cta">
  <div class="container">
    <h2 class="sec-title">Tooth trouble in Seoul?<br><em>We're 5 minutes away.</em></h2>
    <div class="hero-ctas">
      <a href="tel:+82-2-756-2828" class="btn btn-gold"><i class="fas fa-phone-alt"></i> +82-2-756-2828</a>
      <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener" class="btn btn-line"><i class="fas fa-calendar-check"></i> Book Online</a>
      <a href="http://pf.kakao.com/_Nxfczxh" target="_blank" rel="noopener" class="btn btn-line" style="border-color:rgba(250,225,0,0.4);color:#FAE100;"><i class="fas fa-comment"></i> KakaoTalk</a>
    </div>
    <p class="reply-note">Happy Yein Dental Clinic · Since 2013 · Jung-gu, Seoul</p>
  </div>
</section>
</main>

<footer class="en-footer">
  <div class="container">
    <strong style="color:var(--white);">Happy Yein Dental Clinic (행복한예인치과의원)</strong><br>
    3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul · Director: Han Seung-dae<br>
    Tel +82-2-756-2828 · KakaoTalk replies within 30 min (clinic hours) · Email within 24h<br>
    <a href="/">한국어 홈</a> · <a href="/en/guides">All Guides</a> · <a href="/en/emergency-dentist-myeongdong">Emergency</a> · <a href="https://blog.naver.com/yein2828" target="_blank" rel="noopener">Blog</a><br>
    © 2005–2026 Happy Yein Dental Clinic. All rights reserved.
  </div>
</footer>

<div class="mbar">
  <a href="tel:+82-2-756-2828" class="m-call"><i class="fas fa-phone-alt"></i> Call</a>
  <a href="https://naver.me/G0DXGZbi" target="_blank" rel="noopener" class="m-book"><i class="fas fa-calendar-check"></i> Book</a>
  <a href="http://pf.kakao.com/_Nxfczxh" target="_blank" rel="noopener" class="m-kakao"><i class="fas fa-comment"></i> Kakao</a>
</div>

</body>
</html>`
}
