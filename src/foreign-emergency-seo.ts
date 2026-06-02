// =============================================
// 외국인 응급치과 SEO 랜딩페이지
// 영어(EN) · 일본어(JA) · 중국어(ZH) 다국어 지원
// 명동·서울역·을지로 — 관광객 긴급 치과 키워드 공략
// =============================================

const SITE_DOMAIN = 'https://happyyein.kr'
const CLINIC = {
  name: { ko: '행복한예인치과', en: 'Happy Yein Dental Clinic', ja: 'ハッピーイェイン歯科', zh: '幸福艺人牙科诊所' },
  address: { ko: '서울 중구 남대문로9길 51 효덕빌딩 3층 301호', en: '3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul', ja: 'ソウル市中区南大門路9キル51 ヒョドクビル3F', zh: '首尔市中区南大门路9街51号 孝德大厦3楼' },
  tel: '02-756-2828',
  intlTel: '+82-2-756-2828',
  hours: { weekday: '09:30–18:30', wed: '09:30–20:00 (Night)', sat: '09:30–14:00', sunHoliday: 'Closed' },
  directions: { en: '2-min walk from Hoehyeon Station Exit 1 (Line 4), 5-min walk from Myeongdong Station', ja: '会賢駅1番出口 徒歩2分(4号線), 明洞駅 徒歩5分', zh: '会贤站1号出口步行2分钟(4号线), 明洞站步行5分钟' },
  coords: { lat: 37.5596, lng: 126.9784 },
  nearbyLandmarks: { en: 'Myeongdong, Seoul Station, Namdaemun Market, Euljiro', ja: '明洞, ソウル駅, 南大門市場, 乙支路', zh: '明洞, 首尔站, 南大门市场, 乙支路' }
}

// ===== 페이지 데이터 정의 =====
export interface ForeignPage {
  slug: string
  lang: 'en' | 'ja' | 'zh'
  title: string
  metaDesc: string
  h1: string
  keywords: string
  heroEmoji: string
  introParagraph: string
  sections: { heading: string; content: string }[]
  faq: { q: string; a: string }[]
  ctaText: string
  ctaSubtext: string
  // 가격 범위 (해당되는 경우)
  priceRange?: string
}

import { EXPANSION_EN_PAGES } from './foreign-seo-expansion-en'
import { EXPANSION_JA_PAGES } from './foreign-seo-expansion-ja'
import { EXPANSION_ZH_PAGES } from './foreign-seo-expansion-zh'

const BASE_PAGES: ForeignPage[] = [
  // ===== ENGLISH PAGES =====
  {
    slug: 'emergency-dentist-myeongdong',
    lang: 'en', heroEmoji: '🚨',
    title: 'Emergency Dentist in Myeongdong Seoul — Walk-In Same-Day Care',
    metaDesc: 'Dental emergency in Myeongdong? Happy Yein Dental Clinic offers same-day walk-in care for tourists. Broken tooth, lost crown, severe toothache — English-speaking staff, 2 min from Hoehyeon Station.',
    h1: 'Emergency Dentist in Myeongdong, Seoul',
    keywords: 'emergency dentist myeongdong, dental emergency seoul, walk-in dentist myeongdong, english speaking dentist seoul, urgent dental care korea',
    introParagraph: `Having a dental emergency while traveling in Seoul? Don't panic — <strong>Happy Yein Dental Clinic</strong> is located in the heart of Myeongdong, just a 2-minute walk from Hoehyeon Station (Line 4). We provide <strong>same-day emergency dental care</strong> for tourists and expats with English-speaking assistance. Whether you've broken a tooth eating Korean BBQ, lost a crown while exploring Namdaemun Market, or have a sudden severe toothache — we can help you <strong>today</strong>.`,
    sections: [
      { heading: '🦷 Common Dental Emergencies We Treat', content: `<ul>
<li><strong>Broken or chipped tooth</strong> — from hard food, accidents, or falls</li>
<li><strong>Lost crown or filling</strong> — temporary or permanent re-cementation available</li>
<li><strong>Severe toothache</strong> — diagnosis & pain relief within the hour</li>
<li><strong>Swollen gums or abscess</strong> — infection control & antibiotics</li>
<li><strong>Knocked-out tooth</strong> — emergency reimplantation (bring the tooth!)</li>
<li><strong>Broken denture</strong> — same-day repair when possible</li>
</ul>` },
      { heading: '⏱️ What to Expect — Same-Day Process', content: `<ol>
<li><strong>Walk in or call</strong> — No appointment needed for emergencies. Call <a href="tel:${CLINIC.intlTel}" style="color:#F7BA18;font-weight:700;">${CLINIC.intlTel}</a></li>
<li><strong>Quick diagnosis</strong> — Digital X-ray & CT scan within 10 minutes</li>
<li><strong>Treatment plan</strong> — Clear explanation in English with cost estimate before treatment</li>
<li><strong>Same-day treatment</strong> — Most emergency procedures completed in one visit</li>
<li><strong>Aftercare instructions</strong> — Written in English, with emergency contact number</li>
</ol>` },
      { heading: '💰 Emergency Dental Cost in Seoul (Affordable!)', content: `<p>Korea's dental care is <strong>significantly cheaper</strong> than the US, UK, Australia, or Japan — even without Korean insurance:</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Treatment</th><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Approx. Cost (KRW)</th><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Approx. USD</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Emergency consultation + X-ray</td><td style="padding:8px 12px;">₩30,000 – ₩50,000</td><td style="padding:8px 12px;">$22 – $37</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Temporary filling</td><td style="padding:8px 12px;">₩30,000 – ₩80,000</td><td style="padding:8px 12px;">$22 – $60</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Crown re-cementation</td><td style="padding:8px 12px;">₩50,000 – ₩100,000</td><td style="padding:8px 12px;">$37 – $75</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Composite filling</td><td style="padding:8px 12px;">₩80,000 – ₩200,000</td><td style="padding:8px 12px;">$60 – $150</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Emergency root canal</td><td style="padding:8px 12px;">₩200,000 – ₩400,000</td><td style="padding:8px 12px;">$150 – $300</td></tr>
<tr><td style="padding:8px 12px;">Tooth extraction (simple)</td><td style="padding:8px 12px;">₩50,000 – ₩150,000</td><td style="padding:8px 12px;">$37 – $112</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">* Prices are approximate for self-pay (uninsured) patients. Actual costs may vary.</p>` },
      { heading: '📍 Location — In the Heart of Myeongdong', content: `<p>${CLINIC.address.en}</p>
<p><strong>Nearest stations:</strong></p>
<ul>
<li>🚇 <strong>Hoehyeon Station</strong> (Line 4) — Exit 1, 2-min walk</li>
<li>🚇 <strong>Myeongdong Station</strong> (Line 4) — Exit 5, 5-min walk</li>
<li>🚇 <strong>Seoul Station</strong> (Line 1/4/KTX) — 10-min walk or 1 subway stop</li>
</ul>
<p>We're right next to <strong>Namdaemun Market</strong> and a short walk from <strong>Myeongdong Shopping Street</strong>.</p>` },
      { heading: '🏥 Why Choose Happy Yein Dental Clinic?', content: `<ul>
<li>✅ <strong>English-speaking assistance</strong> available</li>
<li>✅ <strong>Same-day emergency care</strong> — walk-ins welcome</li>
<li>✅ <strong>Seoul National University-trained doctors</strong> — specialists in implants, restorative, and orthodontics</li>
<li>✅ <strong>Advanced equipment</strong> — CT scanner, digital X-ray, surgical microscope (25× magnification)</li>
<li>✅ <strong>Air shower infection control</strong> — hospital-grade sterilization system</li>
<li>✅ <strong>Transparent pricing</strong> — cost explained before treatment, no surprise charges</li>
<li>✅ <strong>Credit cards accepted</strong> — Visa, Mastercard, AMEX, UnionPay</li>
</ul>` }
    ],
    faq: [
      { q: 'Do I need an appointment for emergency dental care?', a: 'No appointment is needed for dental emergencies. Walk in during our office hours, or call ahead at +82-2-756-2828 so we can prepare for your visit.' },
      { q: 'Do you have English-speaking staff?', a: 'Yes, we have staff who can communicate in English to explain your diagnosis, treatment options, and costs clearly.' },
      { q: 'Can you treat me the same day?', a: 'Yes! Most emergency treatments — fillings, crown re-cementation, extractions, and pain relief — are completed in a single visit.' },
      { q: 'How much does emergency dental care cost without Korean insurance?', a: 'Emergency consultation with X-ray typically costs ₩30,000–50,000 (about $22–37 USD). Treatment costs vary but are significantly lower than Western countries. We provide a cost estimate before any treatment.' },
      { q: 'I broke my tooth — what should I do right now?', a: 'Save any broken pieces, rinse your mouth with warm water, and come to our clinic as soon as possible. Apply a cold compress to reduce swelling. Avoid chewing on that side.' },
      { q: 'Do you accept travel insurance?', a: 'We provide detailed receipts and documentation in English that you can submit to your travel insurance company for reimbursement.' },
      { q: 'Where exactly is the clinic?', a: `We're at ${CLINIC.address.en} — a 2-minute walk from Hoehyeon Station Exit 1 (Line 4), in the Myeongdong/Namdaemun area.` }
    ],
    ctaText: 'Call Now for Emergency Care',
    ctaSubtext: 'Walk-ins welcome · Same-day treatment · English assistance',
    priceRange: '₩30,000 – ₩400,000'
  },
  {
    slug: 'broken-tooth-seoul',
    lang: 'en', heroEmoji: '💥',
    title: 'Broken Tooth in Seoul? Same-Day Repair Near Myeongdong',
    metaDesc: 'Broke a tooth in Seoul? Happy Yein Dental near Myeongdong offers same-day broken tooth repair for tourists. Composite bonding, crowns, emergency extraction. English-speaking dentist.',
    h1: 'Broke a Tooth in Seoul? We Can Fix It Today',
    keywords: 'broken tooth seoul, chipped tooth repair korea, cracked tooth myeongdong, dental bonding seoul, same day crown korea',
    introParagraph: `It happens more often than you'd think — biting into <strong>fried chicken</strong>, slipping on a wet street in Myeongdong, or cracking a tooth on a <strong>hard Korean snack</strong>. If you've broken, chipped, or cracked a tooth while visiting Seoul, <strong>Happy Yein Dental Clinic</strong> can repair it the same day. We're located just 2 minutes from Hoehyeon Station in the Myeongdong area.`,
    sections: [
      { heading: '🔍 Types of Broken Tooth Damage', content: `<ul>
<li><strong>Minor chip</strong> — Cosmetic repair with composite bonding (30 min, from ₩80,000)</li>
<li><strong>Moderate crack</strong> — Filling or onlay restoration (1 hour, from ₩150,000)</li>
<li><strong>Major break</strong> — Crown placement, possibly temporary crown same-day (1-2 hours)</li>
<li><strong>Vertical root fracture</strong> — May require extraction + temporary replacement</li>
<li><strong>Tooth knocked out completely</strong> — Emergency reimplantation possible within 1 hour of injury</li>
</ul>` },
      { heading: '🛠️ Our Same-Day Treatment Options', content: `<ul>
<li><strong>Composite bonding</strong> — Tooth-colored resin sculpted to match your natural tooth. Done in one visit.</li>
<li><strong>Temporary crown</strong> — Protective cap placed immediately while a permanent crown is fabricated.</li>
<li><strong>Emergency extraction</strong> — When the tooth cannot be saved, gentle extraction with aftercare guidance.</li>
<li><strong>Pain management</strong> — Immediate relief with local anesthesia and medication prescription.</li>
</ul>` },
      { heading: '⚡ What To Do Right Now (First Aid)', content: `<ol>
<li><strong>Save the broken piece</strong> — Put it in milk or saliva. We may be able to re-bond it.</li>
<li><strong>Rinse gently</strong> — Warm water only. Don't use hot/cold water.</li>
<li><strong>Stop the bleeding</strong> — Bite on clean gauze or a tea bag for 10 minutes.</li>
<li><strong>Reduce swelling</strong> — Cold compress on cheek (10 min on, 10 min off).</li>
<li><strong>Come see us</strong> — Walk in or call <a href="tel:${CLINIC.intlTel}" style="color:#F7BA18;font-weight:700;">${CLINIC.intlTel}</a></li>
</ol>` },
      { heading: '📍 Easy to Find Near Myeongdong', content: `<p>${CLINIC.address.en}</p>
<p>Just <strong>2 minutes from Hoehyeon Station Exit 1</strong> — right in the heart of Myeongdong's tourist district. Near Namdaemun Market and Lotte Department Store.</p>` }
    ],
    faq: [
      { q: 'Can a broken tooth be fixed in one visit?', a: 'Yes! Minor chips can be repaired with composite bonding in about 30 minutes. Larger breaks may need a temporary crown placed same-day.' },
      { q: 'How much does broken tooth repair cost in Korea?', a: 'Composite bonding starts at ₩80,000 (~$60 USD). Crowns range from ₩300,000–600,000 (~$225–450 USD) — much cheaper than in the US or Europe.' },
      { q: 'I found the broken piece — can you reattach it?', a: 'In some cases, yes! Bring the piece stored in milk or saliva. The sooner you come, the better the chance of successful re-bonding.' },
      { q: 'Will it hurt?', a: 'We use effective local anesthesia so you won\'t feel pain during treatment. Post-treatment discomfort is minimal and managed with over-the-counter painkillers.' }
    ],
    ctaText: 'Get Your Tooth Fixed Today',
    ctaSubtext: 'Composite bonding · Crowns · Emergency extraction',
    priceRange: '₩80,000 – ₩600,000'
  },
  {
    slug: 'lost-crown-filling-seoul',
    lang: 'en', heroEmoji: '👑',
    title: 'Lost a Crown or Filling in Seoul? Quick Re-cementation Near Myeongdong',
    metaDesc: 'Lost a dental crown or filling while traveling in Seoul? Happy Yein Dental near Myeongdong offers same-day crown re-cementation. Walk-in, English-speaking dentist, affordable prices.',
    h1: 'Lost a Crown or Filling in Seoul? We\'ll Fix It Fast',
    keywords: 'lost crown seoul, dental crown fell off korea, filling fell out myeongdong, crown recement seoul, temporary crown tourist korea',
    introParagraph: `There's nothing worse than having a <strong>crown fall off</strong> or a <strong>filling come loose</strong> in the middle of your trip. It's uncomfortable, embarrassing, and you're worried about making it worse. <strong>Good news</strong> — Happy Yein Dental Clinic in Myeongdong can re-cement your crown or replace your filling <strong>within the hour</strong>. No appointment needed.`,
    sections: [
      { heading: '🔧 What We Can Do Same-Day', content: `<ul>
<li><strong>Crown re-cementation</strong> — If you still have the crown, we can re-bond it in 20 minutes (from ₩50,000)</li>
<li><strong>New temporary crown</strong> — If the crown is lost or damaged, we place a protective temporary</li>
<li><strong>Filling replacement</strong> — Composite (tooth-colored) filling placed in 30-40 minutes</li>
<li><strong>Inlay/onlay repair</strong> — Partial crown restoration for larger cavities</li>
</ul>` },
      { heading: '💡 Bring the Crown If You Have It!', content: `<p>If your crown fell out, <strong>save it!</strong> In many cases, we can re-cement the original crown. Keep it in a small bag or wrap it in tissue. Don't try to glue it yourself — superglue can damage both the crown and your tooth.</p>
<p>If you've <strong>swallowed the crown</strong> — don't worry, it will pass safely. We'll fit you with a new temporary crown.</p>` },
      { heading: '⚠️ Temporary DIY Tips (Before You Get Here)', content: `<ol>
<li><strong>Don't chew on that side</strong></li>
<li><strong>Avoid hot/cold foods</strong> — the exposed tooth is very sensitive</li>
<li><strong>If it hurts</strong> — take ibuprofen (available at any Korean pharmacy, called "약국")</li>
<li><strong>Temporary dental cement</strong> — available at some pharmacies, but it's best to come in ASAP</li>
</ol>` },
      { heading: '📍 Location & Hours', content: `<p><strong>${CLINIC.address.en}</strong></p>
<p>Mon–Fri: ${CLINIC.hours.weekday} | Wed: ${CLINIC.hours.wed} | Sat: ${CLINIC.hours.sat}</p>
<p>🚇 Hoehyeon Station Exit 1 (Line 4) — 2 min walk</p>
<p>📞 <a href="tel:${CLINIC.intlTel}" style="color:#F7BA18;font-weight:700;">${CLINIC.intlTel}</a></p>` }
    ],
    faq: [
      { q: 'How much does it cost to re-cement a crown in Korea?', a: 'Crown re-cementation typically costs ₩50,000–100,000 (~$37–75 USD). A new temporary crown costs ₩100,000–200,000.' },
      { q: 'My filling fell out — is this an emergency?', a: 'While not a life-threatening emergency, you should see a dentist within 1-2 days. The exposed tooth is vulnerable to further decay and sensitivity.' },
      { q: 'Can I fly with a missing crown?', a: 'Yes, but the exposed tooth may be very sensitive to pressure changes. We recommend getting a temporary crown before your flight.' }
    ],
    ctaText: 'Walk In for Quick Crown Repair',
    ctaSubtext: 'Re-cementation in 20 min · No appointment needed',
    priceRange: '₩50,000 – ₩200,000'
  },
  {
    slug: 'english-speaking-dentist-myeongdong',
    lang: 'en', heroEmoji: '🌍',
    title: 'English-Speaking Dentist in Myeongdong Seoul — Happy Yein Dental',
    metaDesc: 'Looking for an English-speaking dentist near Myeongdong, Seoul? Happy Yein Dental offers complete dental care with English assistance. Walk-in welcome, affordable prices, Seoul National University-trained doctors.',
    h1: 'English-Speaking Dentist Near Myeongdong Station',
    keywords: 'english speaking dentist myeongdong, dentist near myeongdong english, english dental clinic seoul, foreigner dentist korea, expat dentist seoul',
    introParagraph: `Finding a <strong>reliable English-speaking dentist</strong> in Seoul can be stressful — especially when you're in pain. Happy Yein Dental Clinic is located in the Myeongdong/Hoehyeon area, one of Seoul's most foreigner-friendly neighborhoods. Our doctors graduated from <strong>Seoul National University</strong> (Korea's #1 university) and have years of experience treating international patients.`,
    sections: [
      { heading: '👨‍⚕️ Our Doctors', content: `<div style="display:grid;gap:16px;">
<div style="background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>Dr. Han Seungdae</strong> — Director<br>
Seoul National University (DDS & MS) · Integrated Dentistry Specialist<br>
Specialties: Implants, Full-mouth rehabilitation, Complex restorations
</div>
<div style="background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>Dr. Shin Jeonghee</strong> — Conservative Dentistry<br>
Seoul National University · Endodontics Specialist<br>
Specialties: Root canal, Tooth-colored fillings, Microscope dentistry
</div>
<div style="background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>Dr. Park Hyunmi</strong> — Orthodontics<br>
Seoul National University · Orthodontics Specialist<br>
Specialties: Clear aligners, Braces, Bite correction
</div>
</div>` },
      { heading: '🦷 Services Available in English', content: `<ul>
<li>🚨 <strong>Emergency dental care</strong> — same-day walk-in</li>
<li>🔍 <strong>Check-up & cleaning</strong> — comprehensive exam with digital X-ray</li>
<li>🦷 <strong>Implant surgery</strong> — from ₩1,200,000 per tooth</li>
<li>😁 <strong>Teeth whitening</strong> — professional in-office whitening</li>
<li>📐 <strong>Orthodontics</strong> — clear aligners & traditional braces</li>
<li>🎨 <strong>Cosmetic dentistry</strong> — veneers, bonding, smile design</li>
<li>🔬 <strong>Root canal treatment</strong> — with surgical microscope (25× magnification)</li>
</ul>` },
      { heading: '💳 Payment & Insurance', content: `<ul>
<li>✅ Cash (KRW), Credit/Debit cards (Visa, Mastercard, AMEX, UnionPay, JCB)</li>
<li>✅ Detailed English receipts for travel insurance reimbursement</li>
<li>✅ Transparent pricing — written estimate before any treatment</li>
<li>✅ Korean National Health Insurance accepted (for covered residents)</li>
</ul>` },
      { heading: '📍 Easy Access from Myeongdong', content: `<p><strong>${CLINIC.address.en}</strong></p>
<p>🚇 Hoehyeon Station Exit 1 — 2 min walk | 🚇 Myeongdong Station Exit 5 — 5 min walk</p>
<p>Right next to Namdaemun Market, near Lotte Department Store and Myeongdong Shopping Street.</p>` }
    ],
    faq: [
      { q: 'Does the dentist speak English?', a: 'Our clinical staff can communicate in English for consultations, treatment explanations, and aftercare instructions.' },
      { q: 'Can foreigners get dental treatment in Korea?', a: 'Absolutely! Korea is one of the world\'s top destinations for dental tourism. Our clinic regularly treats tourists, expats, and international students.' },
      { q: 'Do I need to make an appointment?', a: 'Walk-ins are welcome, especially for emergencies. For non-urgent treatments, calling ahead at +82-2-756-2828 helps us prepare for your visit.' },
      { q: 'Are dental prices in Korea really cheaper?', a: 'Yes! Dental implants, crowns, and cosmetic procedures in Korea cost 50-80% less than the US, UK, or Australia, with world-class quality.' }
    ],
    ctaText: 'Book Your Visit Today',
    ctaSubtext: 'English assistance · Walk-ins welcome · Affordable care',
  },
  {
    slug: 'toothache-seoul-tourist',
    lang: 'en', heroEmoji: '😫',
    title: 'Severe Toothache in Seoul? Urgent Relief Near Myeongdong',
    metaDesc: 'Sudden toothache while visiting Seoul? Get urgent pain relief at Happy Yein Dental near Myeongdong. Same-day diagnosis & treatment. English-speaking dentist, walk-in welcome.',
    h1: 'Toothache in Seoul? Get Relief Within the Hour',
    keywords: 'toothache seoul, tooth pain korea tourist, urgent dental pain myeongdong, dentist for toothache seoul, dental pain relief korea',
    introParagraph: `A <strong>throbbing toothache</strong> can ruin your entire trip. Whether it started suddenly at your hotel in Myeongdong or has been getting worse over the past few days, you need <strong>fast, professional care</strong>. Happy Yein Dental Clinic can diagnose your problem and provide relief <strong>within the hour</strong> — no appointment needed.`,
    sections: [
      { heading: '⚡ Quick Pain Relief Process', content: `<ol>
<li><strong>Walk in</strong> — We prioritize patients in pain</li>
<li><strong>Digital X-ray</strong> — Find the exact cause in 5 minutes</li>
<li><strong>Immediate relief</strong> — Local anesthesia & medication</li>
<li><strong>Treatment</strong> — Filling, root canal, or extraction as needed</li>
<li><strong>Aftercare</strong> — Prescription & English written instructions</li>
</ol>` },
      { heading: '🔍 Common Causes of Toothache', content: `<ul>
<li><strong>Cavity/decay</strong> — The #1 cause. Treated with filling or crown.</li>
<li><strong>Cracked tooth</strong> — Often from hard foods. May need crown or bonding.</li>
<li><strong>Dental abscess</strong> — Infected tooth or gum. Needs antibiotics + drainage.</li>
<li><strong>Wisdom tooth</strong> — Impacted or partially erupted. May need extraction.</li>
<li><strong>Gum disease</strong> — Inflammation causing pain. Deep cleaning helps.</li>
</ul>` },
      { heading: '💊 While You Wait — Temporary Pain Relief', content: `<ul>
<li><strong>Ibuprofen</strong> (이부프로펜) — Available at Korean pharmacies (약국). Take 400mg.</li>
<li><strong>Cold compress</strong> — 10 min on, 10 min off on the outside of your cheek.</li>
<li><strong>Salt water rinse</strong> — 1 tsp salt in warm water. Rinse gently.</li>
<li><strong>Avoid</strong> hot, cold, and sweet foods until you see us.</li>
</ul>` },
      { heading: '📍 Find Us Near Myeongdong', content: `<p><strong>${CLINIC.address.en}</strong></p>
<p>📞 <a href="tel:${CLINIC.intlTel}" style="color:#F7BA18;font-weight:700;">${CLINIC.intlTel}</a></p>
<p>🚇 Hoehyeon Station Exit 1 — 2 min walk · Myeongdong Station — 5 min walk</p>` }
    ],
    faq: [
      { q: 'What should I do if I have a toothache at night?', a: 'Take ibuprofen for pain relief, use a cold compress, and visit us first thing when we open. If it\'s extremely severe, Seoul has 24-hour emergency dental clinics, but they tend to be more expensive.' },
      { q: 'How much does toothache treatment cost?', a: 'Simple filling: ₩80,000–200,000. Root canal: ₩200,000–400,000. Prices are much more affordable than in most Western countries.' },
      { q: 'I\'m leaving Seoul tomorrow — can you help today?', a: 'Yes! We can provide emergency treatment same-day. For complex issues, we\'ll stabilize the situation and provide documentation for follow-up treatment at home.' }
    ],
    ctaText: 'Get Pain Relief Now',
    ctaSubtext: 'Walk-in priority for pain patients',
    priceRange: '₩30,000 – ₩400,000'
  },

  // ===== JAPANESE PAGES =====
  {
    slug: 'ja/emergency-dentist-myeongdong',
    lang: 'ja', heroEmoji: '🚨',
    title: '明洞の緊急歯科｜当日対応・外国人OK｜ハッピーイェイン歯科',
    metaDesc: '明洞で急な歯のトラブル？ハッピーイェイン歯科は会賢駅徒歩2分。歯が折れた・被せ物が取れた・激しい歯痛に当日対応。予約不要・外国人歓迎・日本語案内あり。',
    h1: '明洞エリアの緊急歯科治療',
    keywords: '明洞 歯医者 緊急, ソウル 歯科 日本語, 明洞 歯が折れた, 韓国 歯医者 外国人, ソウル 歯科 当日',
    introParagraph: `ソウル旅行中に<strong>歯のトラブル</strong>が起きてしまった方へ — <strong>ハッピーイェイン歯科</strong>は明洞の中心、会賢駅1番出口から徒歩2分の場所にあります。<strong>予約なしの当日治療</strong>に対応しており、旅行中の急な歯の痛み、歯の欠け、被せ物の脱離などを迅速に治療いたします。`,
    sections: [
      { heading: '🦷 対応可能な緊急症状', content: `<ul>
<li><strong>歯が折れた・欠けた</strong> — 食事中や転倒による破損</li>
<li><strong>被せ物（クラウン）が取れた</strong> — 当日再接着または仮歯</li>
<li><strong>詰め物が外れた</strong> — 即日新しい詰め物に交換</li>
<li><strong>激しい歯の痛み</strong> — 診断・痛み止め・根管治療</li>
<li><strong>歯茎の腫れ・膿</strong> — 感染対策・抗生物質処方</li>
<li><strong>親知らずの痛み</strong> — 診断・必要に応じて抜歯</li>
</ul>` },
      { heading: '💰 韓国の歯科治療費（日本よりお手頃！）', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">治療内容</th><th style="padding:10px 12px;text-align:left;">費用（ウォン）</th><th style="padding:10px 12px;text-align:left;">日本円（目安）</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">緊急診察 + レントゲン</td><td style="padding:8px 12px;">₩30,000〜50,000</td><td style="padding:8px 12px;">約3,300〜5,500円</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">クラウン再接着</td><td style="padding:8px 12px;">₩50,000〜100,000</td><td style="padding:8px 12px;">約5,500〜11,000円</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">コンポジット充填</td><td style="padding:8px 12px;">₩80,000〜200,000</td><td style="padding:8px 12px;">約8,800〜22,000円</td></tr>
<tr><td style="padding:8px 12px;">根管治療</td><td style="padding:8px 12px;">₩200,000〜400,000</td><td style="padding:8px 12px;">約22,000〜44,000円</td></tr>
</table>` },
      { heading: '📍 アクセス', content: `<p><strong>${CLINIC.address.ja}</strong></p>
<p>🚇 <strong>会賢（フェヒョン）駅</strong> 1番出口 徒歩2分（4号線）</p>
<p>🚇 <strong>明洞駅</strong> 5番出口 徒歩5分</p>
<p>📞 <a href="tel:${CLINIC.intlTel}" style="color:#F7BA18;font-weight:700;">${CLINIC.intlTel}</a></p>` },
      { heading: '🏥 当院の特徴', content: `<ul>
<li>✅ ソウル大学校出身の専門医チーム</li>
<li>✅ 予約不要・当日対応</li>
<li>✅ CT・デジタルレントゲン完備</li>
<li>✅ エアシャワー感染管理システム</li>
<li>✅ クレジットカード対応（VISA, Mastercard, JCB, AMEX）</li>
<li>✅ 海外旅行保険用の診断書・領収書（英文）発行</li>
</ul>` }
    ],
    faq: [
      { q: '予約なしで行けますか？', a: 'はい、緊急の場合は予約不要です。診療時間内にお越しください。事前にお電話いただければスムーズにご案内できます。' },
      { q: '日本語は通じますか？', a: '英語での対応が可能です。日本語は簡単なコミュニケーションが可能ですが、複雑な説明は翻訳アプリ等を併用いたします。' },
      { q: '海外旅行保険は使えますか？', a: '直接の保険適用はできませんが、英文の診断書・領収書を発行いたします。帰国後に保険会社へ請求いただけます。' },
      { q: '歯が折れました。すぐに行くべきですか？', a: 'はい、できるだけ早くお越しください。折れた破片があればお持ちください（牛乳に浸けると保存状態が良くなります）。' }
    ],
    ctaText: '今すぐお電話ください',
    ctaSubtext: '予約不要 · 当日治療 · 外国人歓迎',
    priceRange: '₩30,000 – ₩400,000'
  },
  {
    slug: 'ja/broken-tooth-seoul',
    lang: 'ja', heroEmoji: '💥',
    title: 'ソウルで歯が折れた時の対処法｜明洞エリア当日修復',
    metaDesc: 'ソウル旅行中に歯が折れてしまった？明洞近くのハッピーイェイン歯科で当日修復可能。コンポジットボンディング、仮歯、応急処置。外国人対応。',
    h1: 'ソウルで歯が折れた？当日修復します',
    keywords: 'ソウル 歯 折れた, 韓国 歯 欠けた 旅行, 明洞 歯科 修復, ソウル 歯 応急処置',
    introParagraph: `韓国料理の<strong>チキンの骨</strong>を噛んでしまった、明洞の石畳で転んでしまった — 旅行中に<strong>歯が折れる</strong>のは珍しいことではありません。ハッピーイェイン歯科は会賢駅から徒歩2分、<strong>当日中に応急修復</strong>が可能です。`,
    sections: [
      { heading: '🔍 歯の損傷の種類と治療法', content: `<ul>
<li><strong>小さな欠け</strong> — コンポジットボンディング（約30分、₩80,000〜）</li>
<li><strong>中程度の亀裂</strong> — 詰め物・インレー修復（約1時間、₩150,000〜）</li>
<li><strong>大きな破折</strong> — 仮クラウン即日装着（1〜2時間）</li>
<li><strong>歯の完全脱臼</strong> — 1時間以内なら再植の可能性あり</li>
</ul>` },
      { heading: '🚑 応急処置（来院前にできること）', content: `<ol>
<li><strong>折れた破片を保存</strong> — 牛乳か唾液に浸ける</li>
<li><strong>ぬるま湯で口をすすぐ</strong> — 冷水・熱湯は避ける</li>
<li><strong>出血を止める</strong> — 清潔なガーゼを10分間噛む</li>
<li><strong>頬を冷やす</strong> — 冷たいタオルを当てる</li>
<li><strong>すぐにお越しください</strong> — 📞 <a href="tel:${CLINIC.intlTel}" style="color:#F7BA18;">${CLINIC.intlTel}</a></li>
</ol>` },
      { heading: '📍 アクセス情報', content: `<p><strong>${CLINIC.address.ja}</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 · 明洞駅 徒歩5分</p>` }
    ],
    faq: [
      { q: '折れた歯は1回の通院で治りますか？', a: 'はい、小さな欠けはコンポジットボンディングで約30分で修復できます。大きな破損は仮歯を即日装着します。' },
      { q: '費用はいくらですか？', a: 'コンポジット修復: ₩80,000〜（約8,800円〜）、クラウン: ₩300,000〜600,000（約33,000〜66,000円）です。' }
    ],
    ctaText: '歯の修復はお任せください',
    ctaSubtext: 'コンポジットボンディング · 仮歯 · 応急処置',
    priceRange: '₩80,000 – ₩600,000'
  },

  // ===== CHINESE PAGES =====
  {
    slug: 'zh/emergency-dentist-myeongdong',
    lang: 'zh', heroEmoji: '🚨',
    title: '明洞紧急牙科｜当天治疗・外国人欢迎｜幸福艺人牙科',
    metaDesc: '在明洞遇到牙齿急症？幸福艺人牙科距会贤站步行2分钟。牙齿断裂、牙冠脱落、剧烈牙痛当天处理。无需预约、外国人友好、价格实惠。',
    h1: '明洞地区紧急牙科治疗',
    keywords: '明洞 牙科 急诊, 首尔 牙医 中文, 明洞 牙齿断了, 韩国 牙科 外国人, 首尔 牙科 当天',
    introParagraph: `在首尔旅游时突然<strong>牙齿出问题</strong>？别担心——<strong>幸福艺人牙科</strong>位于明洞中心地带，距会贤站1号出口仅2分钟步行路程。我们提供<strong>当天紧急牙科治疗</strong>，无需预约，外国人欢迎。无论是吃烤肉时牙齿断裂、牙冠脱落还是突然剧烈牙痛，我们都能<strong>当天解决</strong>。`,
    sections: [
      { heading: '🦷 可处理的紧急症状', content: `<ul>
<li><strong>牙齿断裂/碎裂</strong> — 进食或意外导致的损伤</li>
<li><strong>牙冠脱落</strong> — 当天重新粘合或安装临时牙冠</li>
<li><strong>补牙材料脱落</strong> — 即日更换新的补牙材料</li>
<li><strong>剧烈牙痛</strong> — 诊断、止痛、根管治疗</li>
<li><strong>牙龈肿胀/脓肿</strong> — 感染控制、抗生素处方</li>
<li><strong>智齿疼痛</strong> — 诊断及必要时拔除</li>
</ul>` },
      { heading: '💰 韩国牙科治疗费用（比中国更实惠！）', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">治疗项目</th><th style="padding:10px 12px;text-align:left;">费用（韩元）</th><th style="padding:10px 12px;text-align:left;">人民币（参考）</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">急诊检查 + X光</td><td style="padding:8px 12px;">₩30,000~50,000</td><td style="padding:8px 12px;">约150~250元</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">牙冠重新粘合</td><td style="padding:8px 12px;">₩50,000~100,000</td><td style="padding:8px 12px;">约250~500元</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">树脂补牙</td><td style="padding:8px 12px;">₩80,000~200,000</td><td style="padding:8px 12px;">约400~1,000元</td></tr>
<tr><td style="padding:8px 12px;">根管治疗</td><td style="padding:8px 12px;">₩200,000~400,000</td><td style="padding:8px 12px;">约1,000~2,000元</td></tr>
</table>` },
      { heading: '📍 交通指南', content: `<p><strong>${CLINIC.address.zh}</strong></p>
<p>🚇 <strong>会贤站</strong> 1号出口 步行2分钟（4号线）</p>
<p>🚇 <strong>明洞站</strong> 5号出口 步行5分钟</p>
<p>📞 <a href="tel:${CLINIC.intlTel}" style="color:#F7BA18;font-weight:700;">${CLINIC.intlTel}</a></p>` },
      { heading: '🏥 为什么选择我们？', content: `<ul>
<li>✅ 首尔大学毕业的专业医疗团队</li>
<li>✅ 无需预约，当天治疗</li>
<li>✅ CT扫描、数字X光等先进设备</li>
<li>✅ 空气淋浴感染控制系统</li>
<li>✅ 支持信用卡（VISA、万事达、银联、JCB、AMEX）</li>
<li>✅ 可开具英文诊断证明和收据（用于旅行保险报销）</li>
</ul>` }
    ],
    faq: [
      { q: '不预约可以直接去吗？', a: '可以！紧急情况无需预约，在诊疗时间内直接来院即可。提前致电可以更快安排就诊。' },
      { q: '有中文服务吗？', a: '我们提供英语沟通服务。建议您准备好翻译APP或简单的英文描述，我们会尽力确保沟通顺畅。' },
      { q: '可以用旅行保险吗？', a: '不能直接使用保险，但我们提供英文诊断证明和收据，您可以回国后向保险公司申请报销。' },
      { q: '牙齿断了，该怎么办？', a: '请尽快来院。如果有断裂碎片，请用牛奶浸泡保存带来。来院前可用冷敷减轻肿胀。' }
    ],
    ctaText: '立即拨打电话',
    ctaSubtext: '无需预约 · 当天治疗 · 外国人欢迎',
    priceRange: '₩30,000 – ₩400,000'
  },
  {
    slug: 'zh/broken-tooth-seoul',
    lang: 'zh', heroEmoji: '💥',
    title: '在首尔牙齿碎了怎么办？明洞附近当天修复',
    metaDesc: '在首尔旅游时牙齿断裂？明洞附近的幸福艺人牙科提供当天修复服务。树脂修复、临时牙冠、紧急拔牙。外国人友好，价格透明。',
    h1: '首尔旅行中牙齿碎了？当天修复',
    keywords: '首尔 牙齿碎了, 韩国 牙断了 旅游, 明洞 牙科 修复, 首尔 牙齿 急诊',
    introParagraph: `在韩国旅行中咬到<strong>炸鸡骨头</strong>、在明洞街头不小心摔倒——旅途中<strong>牙齿断裂</strong>并不罕见。幸福艺人牙科距会贤站仅步行2分钟，可以<strong>当天完成应急修复</strong>。`,
    sections: [
      { heading: '🔍 牙齿损伤类型与治疗方案', content: `<ul>
<li><strong>小缺口</strong> — 树脂修复（约30分钟，₩80,000起）</li>
<li><strong>中度裂缝</strong> — 补牙/嵌体修复（约1小时，₩150,000起）</li>
<li><strong>严重断裂</strong> — 当天安装临时牙冠（1~2小时）</li>
<li><strong>牙齿完全脱落</strong> — 1小时内有可能再植</li>
</ul>` },
      { heading: '🚑 来院前的急救措施', content: `<ol>
<li><strong>保存碎片</strong> — 放入牛奶或唾液中</li>
<li><strong>温水漱口</strong> — 避免冷热水</li>
<li><strong>止血</strong> — 咬住干净纱布10分钟</li>
<li><strong>冷敷</strong> — 用冷毛巾敷在脸颊外侧</li>
<li><strong>尽快来院</strong> — 📞 <a href="tel:${CLINIC.intlTel}" style="color:#F7BA18;">${CLINIC.intlTel}</a></li>
</ol>` },
      { heading: '📍 交通信息', content: `<p><strong>${CLINIC.address.zh}</strong></p>
<p>🚇 会贤站1号出口步行2分钟 · 明洞站步行5分钟</p>` }
    ],
    faq: [
      { q: '断牙可以一次治好吗？', a: '可以！小的缺口用树脂修复约30分钟。大的断裂当天安装临时牙冠。' },
      { q: '费用大概多少？', a: '树脂修复: ₩80,000起（约400元人民币起），牙冠: ₩300,000~600,000（约1,500~3,000元）。' }
    ],
    ctaText: '立即预约修复',
    ctaSubtext: '树脂修复 · 临时牙冠 · 急诊处理',
    priceRange: '₩80,000 – ₩600,000'
  },
]

// ===== 전체 페이지 통합 (기존 9 + 확장 EN 15 + JA 10 + ZH 10 = 44페이지) =====
const PAGES: ForeignPage[] = [
  ...BASE_PAGES,
  ...EXPANSION_EN_PAGES,
  ...EXPANSION_JA_PAGES,
  ...EXPANSION_ZH_PAGES,
]

// ===== 전체 슬러그 목록 (sitemap용) =====
export function getAllForeignSeoSlugs(): string[] {
  return PAGES.map(p => p.slug)
}

// ===== 렌더링 함수 =====
export function renderForeignSeoPage(slug: string): string | null {
  const page = PAGES.find(p => p.slug === slug)
  if (!page) return null

  const fullUrl = `${SITE_DOMAIN}/en/${page.slug.startsWith('ja/') || page.slug.startsWith('zh/') ? page.slug : page.slug}`
  const canonicalUrl = `${SITE_DOMAIN}/en/${page.slug}`
  const langCode = page.lang
  const langLabel = langCode === 'en' ? 'English' : langCode === 'ja' ? '日本語' : '中文'
  const homeLabel = langCode === 'en' ? 'Home' : langCode === 'ja' ? 'ホーム' : '首页'
  const emergencyLabel = langCode === 'en' ? 'Emergency Dental' : langCode === 'ja' ? '緊急歯科' : '紧急牙科'
  const callLabel = langCode === 'en' ? 'Call Now' : langCode === 'ja' ? '今すぐ電話' : '立即致电'
  const directionsLabel = langCode === 'en' ? 'Get Directions' : langCode === 'ja' ? '道案内' : '导航'

  const today = new Date().toISOString().split('T')[0]

  // JSON-LD: EmergencyService + MedicalClinic + FAQPage
  const emergencyServiceSchema = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": CLINIC.name[langCode],
    "alternateName": [CLINIC.name.ko, CLINIC.name.en],
    "description": page.metaDesc,
    "url": canonicalUrl,
    "telephone": CLINIC.intlTel,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "남대문로9길 51 효덕빌딩 3층",
      "addressLocality": "Jung-gu",
      "addressRegion": "Seoul",
      "postalCode": "04527",
      "addressCountry": "KR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": CLINIC.coords.lat, "longitude": CLINIC.coords.lng },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Thursday","Friday"], "opens": "09:30", "closes": "18:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:30", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:30", "closes": "14:00" }
    ],
    "availableLanguage": [
      { "@type": "Language", "name": "Korean" },
      { "@type": "Language", "name": "English" }
    ],
    ...(page.priceRange ? { "priceRange": page.priceRange } : {}),
    "currenciesAccepted": "KRW",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "image": `${SITE_DOMAIN}/static/img/dr-han-smile.jpg`,
    "sameAs": [
      "https://map.naver.com/v5/entry/place/11684573",
      "https://maps.app.goo.gl/YbP8Q8Z8Z8Z8Z8Z8A"
    ]
  }

  const faqSchema = page.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  } : null

  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": page.title,
    "description": page.metaDesc,
    "url": canonicalUrl,
    "inLanguage": langCode,
    "dateModified": today,
    "about": { "@type": "MedicalCondition", "name": "Dental Emergency" },
    "audience": { "@type": "MedicalAudience", "audienceType": "Tourist, Expat, Foreigner" },
    "lastReviewed": today,
    "mainContentOfPage": { "@type": "WebPageElement", "cssSelector": ".article-content" }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": homeLabel, "item": SITE_DOMAIN },
      { "@type": "ListItem", "position": 2, "name": emergencyLabel, "item": `${SITE_DOMAIN}/en` },
      { "@type": "ListItem", "position": 3, "name": page.h1, "item": canonicalUrl }
    ]
  }

  // hreflang 대응 페이지 찾기
  const baseSlug = page.slug.replace(/^(ja|zh)\//, '')
  const koPage = `/treatments/general` // 한국어 대응
  const enPage = PAGES.find(p => p.lang === 'en' && p.slug === baseSlug)
  const jaPage = PAGES.find(p => p.lang === 'ja' && p.slug === `ja/${baseSlug}`)
  const zhPage = PAGES.find(p => p.lang === 'zh' && p.slug === `zh/${baseSlug}`)

  const hreflangTags = [
    `<link rel="alternate" hreflang="ko" href="${SITE_DOMAIN}${koPage}">`,
    enPage ? `<link rel="alternate" hreflang="en" href="${SITE_DOMAIN}/en/${enPage.slug}">` : '',
    jaPage ? `<link rel="alternate" hreflang="ja" href="${SITE_DOMAIN}/en/${jaPage.slug}">` : '',
    zhPage ? `<link rel="alternate" hreflang="zh" href="${SITE_DOMAIN}/en/${zhPage.slug}">` : '',
    `<link rel="alternate" hreflang="x-default" href="${SITE_DOMAIN}/en/${baseSlug}">`
  ].filter(Boolean).join('\n')

  const safeJsonLd = (obj: any) => JSON.stringify(obj).replace(/</g, '\\u003c')

  const jsonLdScripts = [
    `<script type="application/ld+json">${safeJsonLd(emergencyServiceSchema)}</script>`,
    `<script type="application/ld+json">${safeJsonLd(medicalWebPageSchema)}</script>`,
    `<script type="application/ld+json">${safeJsonLd(breadcrumbSchema)}</script>`,
    faqSchema ? `<script type="application/ld+json">${safeJsonLd(faqSchema)}</script>` : ''
  ].filter(Boolean).join('\n')

  return `<!DOCTYPE html>
<html lang="${langCode}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<meta name="description" content="${page.metaDesc}">
<meta name="keywords" content="${page.keywords}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonicalUrl}">
${hreflangTags}
<meta property="og:type" content="article">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.metaDesc}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:image" content="${SITE_DOMAIN}/static/img/dr-han-smile.jpg">
<meta property="og:locale" content="${langCode === 'en' ? 'en_US' : langCode === 'ja' ? 'ja_JP' : 'zh_CN'}">
<meta name="google-site-verification" content="vYZPm8cqMVJjj5dT_4SefF1Vb064qJHCCcQgz1QYsHw">
<meta name="naver-site-verification" content="b09b795ebd645faf0bf690fee790d98d6874d9fb">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
${jsonLdScripts}
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0A0A0A;color:#F5F2ED;font-family:${langCode === 'ja' ? "'Noto Sans JP'" : langCode === 'zh' ? "'Noto Sans SC'" : "'Noto Sans KR'"},sans-serif;-webkit-font-smoothing:antialiased;}
a{color:#F7BA18;text-decoration:none;}a:hover{text-decoration:underline;}

/* HEADER */
.fh{background:rgba(16,16,16,0.97);border-bottom:1px solid rgba(247,186,24,0.1);padding:16px 24px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:50;backdrop-filter:blur(20px);}
.fh-logo{font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:800;text-transform:uppercase;letter-spacing:3px;color:#F5F2ED;}
.fh-logo em{color:#F7BA18;font-style:normal;}
.fh-actions{display:flex;gap:10px;align-items:center;}
.fh-btn{padding:8px 16px;border-radius:8px;font-size:0.78rem;font-weight:600;transition:all 0.3s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;}
.fh-btn.call{background:#F7BA18;color:#0A0A0A;}.fh-btn.call:hover{background:#D4A010;text-decoration:none;}
.fh-btn.dir{background:rgba(255,255,255,0.06);color:#F5F2ED;border:1px solid rgba(255,255,255,0.1);}.fh-btn.dir:hover{border-color:#F7BA18;text-decoration:none;}
.fh-lang{display:flex;gap:4px;}
.fh-lang a{padding:4px 8px;border-radius:6px;font-size:0.65rem;color:#888;font-weight:600;letter-spacing:0.5px;}.fh-lang a:hover,.fh-lang a.active{color:#F7BA18;background:rgba(247,186,24,0.08);text-decoration:none;}

/* HERO */
.hero{text-align:center;padding:60px 24px 40px;background:radial-gradient(ellipse at 50% 0%,rgba(247,186,24,0.06),transparent 60%);}
.hero-emoji{font-size:3rem;margin-bottom:16px;display:block;}
.hero h1{font-family:'Syne',sans-serif;font-size:clamp(1.5rem,4vw,2.2rem);font-weight:800;line-height:1.3;max-width:700px;margin:0 auto 16px;}
.hero h1 em{color:#F7BA18;font-style:normal;}
.hero-sub{font-size:0.95rem;color:#B5B0A8;max-width:600px;margin:0 auto;line-height:1.7;}

/* BREADCRUMB */
.bread{padding:12px 24px;font-size:0.72rem;color:#888;max-width:900px;margin:0 auto;}
.bread a{color:#888;}.bread a:hover{color:#F7BA18;}
.bread span{margin:0 6px;color:#555;}

/* ARTICLE */
.article{max-width:820px;margin:0 auto;padding:0 24px 60px;}
.article-content{font-size:0.95rem;line-height:1.9;color:#D5D0C8;}
.article-content h2{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:700;margin:40px 0 16px;color:#F5F2ED;padding-bottom:8px;border-bottom:1px solid rgba(247,186,24,0.1);}
.article-content ul,.article-content ol{margin:12px 0 12px 20px;}
.article-content li{margin-bottom:8px;}
.article-content p{margin-bottom:16px;}
.article-content strong{color:#F5F2ED;}
.article-content table{border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;}
.article-content th{font-family:'Syne',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:1px;}

/* FAQ */
.faq-section{margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.06);}
.faq-title{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;margin-bottom:24px;display:flex;align-items:center;gap:8px;}
.faq-title i{color:#F7BA18;}
.faq-item{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:12px;margin-bottom:10px;overflow:hidden;transition:border-color 0.3s;}
.faq-item:hover{border-color:rgba(247,186,24,0.15);}
.faq-q{padding:16px 20px;font-weight:600;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-size:0.9rem;}
.faq-q::after{content:'＋';color:#F7BA18;font-size:1.1rem;transition:transform 0.3s;}
.faq-item.open .faq-q::after{transform:rotate(45deg);}
.faq-a{padding:0 20px;max-height:0;overflow:hidden;transition:max-height 0.4s ease,padding 0.3s;font-size:0.88rem;color:#B5B0A8;line-height:1.8;}
.faq-item.open .faq-a{max-height:300px;padding:0 20px 16px;}

/* CTA */
.cta-box{margin-top:48px;text-align:center;padding:40px 24px;background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);border-radius:20px;}
.cta-box h3{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;margin-bottom:8px;}
.cta-box p{color:#B5B0A8;font-size:0.85rem;margin-bottom:20px;}
.cta-call{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;border-radius:14px;background:#F7BA18;color:#0A0A0A;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;letter-spacing:1px;transition:all 0.3s;text-decoration:none;}
.cta-call:hover{background:#D4A010;transform:translateY(-2px);box-shadow:0 16px 40px rgba(247,186,24,0.2);text-decoration:none;}
.cta-tel{display:block;margin-top:12px;font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#F7BA18;letter-spacing:2px;}

/* FOOTER */
.ff{text-align:center;padding:32px 24px;border-top:1px solid rgba(255,255,255,0.04);font-size:0.72rem;color:#555;}
.ff a{color:#888;}.ff a:hover{color:#F7BA18;}

@media(max-width:600px){
  .fh{flex-direction:column;gap:10px;}
  .hero{padding:40px 16px 24px;}
  .article{padding:0 16px 40px;}
}
</style>
</head>
<body>

<header class="fh">
  <a href="/" class="fh-logo">Happy Y<em>e</em>in</a>
  <div class="fh-actions">
    <div class="fh-lang">
      <a href="/en/emergency-dentist-myeongdong" class="${langCode === 'en' ? 'active' : ''}">EN</a>
      <a href="/en/ja/emergency-dentist-myeongdong" class="${langCode === 'ja' ? 'active' : ''}">JA</a>
      <a href="/en/zh/emergency-dentist-myeongdong" class="${langCode === 'zh' ? 'active' : ''}">ZH</a>
      <a href="/">KO</a>
    </div>
    <a href="https://map.naver.com/v5/entry/place/11684573" target="_blank" class="fh-btn dir"><i class="fas fa-map-marker-alt"></i> ${directionsLabel}</a>
    <a href="tel:${CLINIC.intlTel}" class="fh-btn call"><i class="fas fa-phone-alt"></i> ${callLabel}</a>
  </div>
</header>

<nav class="bread">
  <a href="/">${homeLabel}</a><span>›</span>
  <a href="/en/emergency-dentist-myeongdong">${emergencyLabel}</a><span>›</span>
  ${page.h1}
</nav>

<section class="hero">
  <span class="hero-emoji">${page.heroEmoji}</span>
  <h1>${page.h1}</h1>
  <p class="hero-sub">${page.metaDesc}</p>
</section>

<article class="article">
  <div class="article-content">
    <p>${page.introParagraph}</p>
    ${page.sections.map(s => `<h2>${s.heading}</h2>\n${s.content}`).join('\n')}

    ${page.faq.length > 0 ? `
    <div class="faq-section">
      <div class="faq-title"><i class="fas fa-question-circle"></i> ${langCode === 'en' ? 'Frequently Asked Questions' : langCode === 'ja' ? 'よくある質問' : '常见问题'}</div>
      ${page.faq.map(f => `
      <div class="faq-item" onclick="this.classList.toggle('open')">
        <div class="faq-q">${f.q}</div>
        <div class="faq-a">${f.a}</div>
      </div>`).join('')}
    </div>` : ''}

    <div class="cta-box">
      <h3>${page.ctaText}</h3>
      <p>${page.ctaSubtext}</p>
      <a href="tel:${CLINIC.intlTel}" class="cta-call"><i class="fas fa-phone-alt"></i> ${callLabel}</a>
      <div class="cta-tel">${CLINIC.intlTel}</div>
    </div>
  </div>
</article>

<footer class="ff">
  <p>${CLINIC.name.ko} · ${CLINIC.address.ko} · <a href="tel:${CLINIC.intlTel}">${CLINIC.intlTel}</a></p>
  <p style="margin-top:8px;">&copy; ${new Date().getFullYear()} Happy Yein Dental Clinic. All rights reserved.</p>
</footer>

</body>
</html>`
}

// ===== 카테고리 정의 (Hub 페이지용) =====
interface PageCategory {
  id: string
  emoji: string
  en: string
  ja: string
  zh: string
  slugs: string[] // EN slug 기준
}

const CATEGORIES: PageCategory[] = [
  { id: 'emergency', emoji: '🚨', en: 'Emergency & Urgent Care', ja: '緊急・応急処置', zh: '急诊处理',
    slugs: ['emergency-dentist-myeongdong', 'broken-tooth-seoul', 'lost-crown-filling-seoul', 'toothache-seoul-tourist', 'dental-abscess-swollen-face-seoul', 'knocked-out-tooth-seoul'] },
  { id: 'cosmetic', emoji: '✨', en: 'Cosmetic & Beauty', ja: '審美・ホワイトニング', zh: '美容牙科',
    slugs: ['teeth-whitening-myeongdong', 'dental-veneers-seoul-korea', 'same-day-dental-crown-seoul'] },
  { id: 'surgery', emoji: '🔩', en: 'Implants & Surgery', ja: 'インプラント・外科', zh: '种植牙·手术',
    slugs: ['dental-implant-seoul-korea', 'wisdom-tooth-extraction-seoul'] },
  { id: 'preventive', emoji: '🔍', en: 'Check-Up & Prevention', ja: '検診・予防', zh: '检查·预防',
    slugs: ['dental-checkup-cleaning-seoul', 'english-speaking-dentist-myeongdong'] },
  { id: 'practical', emoji: '📋', en: 'Practical Info & Cost', ja: '費用・実用情報', zh: '费用·实用信息',
    slugs: ['dental-cost-korea-vs-usa-guide', 'travel-insurance-dental-korea', 'saturday-dentist-myeongdong', 'night-dentist-myeongdong-wednesday', 'dentist-near-seoul-station'] },
  { id: 'special', emoji: '🏠', en: 'Special Needs', ja: '特別なケア', zh: '特殊需求',
    slugs: ['expat-dentist-seoul', 'dental-sedation-anxiety-seoul'] },
]

// Helper: 카테고리별 페이지 그룹 생성
function getCategoryPages(lang: 'en' | 'ja' | 'zh') {
  return CATEGORIES.map(cat => {
    const pages = cat.slugs
      .map(baseSlug => {
        const slug = lang === 'en' ? baseSlug : `${lang}/${baseSlug}`
        return PAGES.find(p => p.slug === slug)
      })
      .filter((p): p is ForeignPage => p != null)
    return { ...cat, pages }
  }).filter(cat => cat.pages.length > 0)
}

// ===== 인덱스 페이지 (다국어 허브 — 카테고리별 정리) =====
export function foreignEmergencyIndexPage(): string {
  const totalPages = PAGES.length
  const enCount = PAGES.filter(p => p.lang === 'en').length
  const jaCount = PAGES.filter(p => p.lang === 'ja').length
  const zhCount = PAGES.filter(p => p.lang === 'zh').length

  // 각 언어별 카테고리 그룹
  const enCategories = getCategoryPages('en')
  const jaCategories = getCategoryPages('ja')
  const zhCategories = getCategoryPages('zh')

  const renderCategoryCards = (categories: ReturnType<typeof getCategoryPages>, langLabel: string) => {
    return categories.map(cat => `
      <div class="cat-section">
        <div class="cat-label">${cat.emoji} ${langLabel === 'en' ? cat.en : langLabel === 'ja' ? cat.ja : cat.zh}</div>
        <div class="page-grid">
          ${cat.pages.map(p => `<a href="/en/${p.slug}" class="page-card"><h3>${p.heroEmoji} ${p.h1}</h3><p>${p.metaDesc.substring(0, 90)}...</p></a>`).join('')}
        </div>
      </div>
    `).join('')
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dental Care for Tourists & Expats in Seoul — ${totalPages} Pages in EN/JA/ZH — Happy Yein Dental</title>
<meta name="description" content="Complete dental care guide for foreigners in Seoul: ${enCount} English, ${jaCount} Japanese, ${zhCount} Chinese pages covering emergencies, cosmetic dentistry, implants, cost guides, and more. Walk-in welcome, Myeongdong.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE_DOMAIN}/en">
<link rel="alternate" hreflang="en" href="${SITE_DOMAIN}/en">
<link rel="alternate" hreflang="ko" href="${SITE_DOMAIN}/">
<link rel="alternate" hreflang="x-default" href="${SITE_DOMAIN}/en">
<meta property="og:type" content="website">
<meta property="og:title" content="Dental Care for Tourists in Myeongdong Seoul — ${totalPages} Multilingual Pages">
<meta property="og:description" content="Emergency, cosmetic, implant, and preventive dental care for tourists and expats. English, Japanese, Chinese.">
<meta property="og:url" content="${SITE_DOMAIN}/en">
<meta property="og:image" content="${SITE_DOMAIN}/static/img/dr-han-smile.jpg">
<meta name="google-site-verification" content="vYZPm8cqMVJjj5dT_4SefF1Vb064qJHCCcQgz1QYsHw">
<meta name="naver-site-verification" content="b09b795ebd645faf0bf690fee790d98d6874d9fb">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "EmergencyService"],
    "name": "Happy Yein Dental Clinic",
    "alternateName": ["행복한예인치과", "ハッピーイェイン歯科", "幸福艺人牙科诊所"],
    "url": `${SITE_DOMAIN}/en`,
    "telephone": CLINIC.intlTel,
    "address": { "@type": "PostalAddress", "streetAddress": "51 Namdaemun-ro 9-gil, Hyodeok Bldg 3F", "addressLocality": "Jung-gu", "addressRegion": "Seoul", "addressCountry": "KR" },
    "geo": { "@type": "GeoCoordinates", "latitude": 37.5596, "longitude": 126.9784 },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Thursday","Friday"], "opens": "09:30", "closes": "18:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:30", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:30", "closes": "14:00" }
    ],
    "availableLanguage": [{ "@type": "Language", "name": "Korean" }, { "@type": "Language", "name": "English" }],
    "medicalSpecialty": ["Dentistry", "Emergency Medicine"]
  }).replace(/</g, '\\u003c')}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0A0A0A;color:#F5F2ED;font-family:'Noto Sans KR',sans-serif;-webkit-font-smoothing:antialiased;}
a{color:#F7BA18;text-decoration:none;}a:hover{text-decoration:underline;}
.hub{max-width:1000px;margin:0 auto;padding:40px 24px 60px;}
.hub-hero{text-align:center;padding:48px 0;margin-bottom:40px;background:radial-gradient(ellipse at 50% 0%,rgba(247,186,24,0.06),transparent 60%);}
.hub-hero h1{font-family:'Syne',sans-serif;font-size:clamp(1.6rem,4vw,2.4rem);font-weight:800;margin-bottom:12px;line-height:1.3;}
.hub-hero h1 em{color:#F7BA18;font-style:normal;}
.hub-hero p{color:#B5B0A8;font-size:0.95rem;max-width:650px;margin:0 auto;line-height:1.6;}
.stat-bar{display:flex;justify-content:center;gap:32px;margin-top:20px;flex-wrap:wrap;}
.stat-item{text-align:center;}
.stat-num{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:800;color:#F7BA18;}
.stat-label{font-size:0.72rem;color:#888;text-transform:uppercase;letter-spacing:1px;}
.lang-tab-row{display:flex;gap:8px;margin-bottom:24px;justify-content:center;flex-wrap:wrap;}
.lang-tab{padding:10px 24px;border-radius:10px;font-size:0.85rem;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,0.08);background:rgba(22,22,22,0.8);color:#888;transition:all 0.3s;}
.lang-tab.active,.lang-tab:hover{border-color:#F7BA18;color:#F7BA18;background:rgba(247,186,24,0.06);}
.lang-panel{display:none;}.lang-panel.active{display:block;}
.cat-section{margin-bottom:28px;}
.cat-label{font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#F7BA18;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid rgba(247,186,24,0.1);}
.page-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;}
.page-card{background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px;transition:all 0.3s;display:block;color:#F5F2ED;}
.page-card:hover{border-color:rgba(247,186,24,0.2);transform:translateY(-2px);text-decoration:none;}
.page-card h3{font-size:0.88rem;font-weight:600;margin-bottom:4px;display:flex;align-items:center;gap:6px;}
.page-card p{font-size:0.75rem;color:#888;line-height:1.5;}
.cta-bar{text-align:center;padding:40px;background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);border-radius:20px;margin-top:40px;}
.cta-bar h2{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;margin-bottom:12px;}
.cta-bar a{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;background:#F7BA18;color:#0A0A0A;font-weight:700;border-radius:12px;font-size:0.95rem;transition:all 0.3s;text-decoration:none;margin-top:8px;}
.cta-bar a:hover{background:#D4A010;transform:translateY(-2px);}
.back-link{display:inline-flex;align-items:center;gap:6px;padding:10px 0;font-size:0.85rem;color:#888;}
.back-link:hover{color:#F7BA18;}
@media(max-width:600px){.stat-bar{gap:16px;}.stat-num{font-size:1.4rem;}}
</style>
</head>
<body>
<div class="hub">
  <a href="/" class="back-link"><i class="fas fa-arrow-left"></i> 행복한예인치과 홈</a>

  <div class="hub-hero">
    <h1>🌍 <em>Dental Care</em> for Tourists<br>& Expats in Seoul</h1>
    <p>Complete dental care guide in your language. Emergency, cosmetic, implants, check-ups, cost guides — everything you need near Myeongdong Station.</p>
    <div class="stat-bar">
      <div class="stat-item"><div class="stat-num">${totalPages}</div><div class="stat-label">Total Pages</div></div>
      <div class="stat-item"><div class="stat-num">${enCount}</div><div class="stat-label">English</div></div>
      <div class="stat-item"><div class="stat-num">${jaCount}</div><div class="stat-label">日本語</div></div>
      <div class="stat-item"><div class="stat-num">${zhCount}</div><div class="stat-label">中文</div></div>
    </div>
  </div>

  <div class="lang-tab-row">
    <div class="lang-tab active" onclick="switchLang('en')">🇺🇸 English (${enCount})</div>
    <div class="lang-tab" onclick="switchLang('ja')">🇯🇵 日本語 (${jaCount})</div>
    <div class="lang-tab" onclick="switchLang('zh')">🇨🇳 中文 (${zhCount})</div>
  </div>

  <div id="panel-en" class="lang-panel active">
    ${renderCategoryCards(enCategories, 'en')}
  </div>

  <div id="panel-ja" class="lang-panel">
    ${renderCategoryCards(jaCategories, 'ja')}
  </div>

  <div id="panel-zh" class="lang-panel">
    ${renderCategoryCards(zhCategories, 'zh')}
  </div>

  <div class="cta-bar">
    <h2>📞 Need Help? Call Now</h2>
    <p style="color:#B5B0A8;">No appointment needed · Walk-in welcome · English assistance</p>
    <a href="tel:${CLINIC.intlTel}"><i class="fas fa-phone-alt"></i> ${CLINIC.intlTel}</a>
  </div>
</div>
<script>
function switchLang(lang) {
  document.querySelectorAll('.lang-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('panel-' + lang).classList.add('active');
  event.target.classList.add('active');
}
</script>
</body>
</html>`
}
