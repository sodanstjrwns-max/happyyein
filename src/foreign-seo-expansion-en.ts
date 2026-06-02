// =============================================
// 외국인 SEO 대확장 — ENGLISH Pages (Phase F)
// Dental Tourism · Emergency · Cosmetic · Preventive · Cost · Expat
// 15 additional EN pages targeting ALL tourist search scenarios
// =============================================

import type { ForeignPage } from './foreign-emergency-seo'

const CLINIC_TEL = '+82-2-756-2828'

export const EXPANSION_EN_PAGES: ForeignPage[] = [

  // ===== 1. WISDOM TOOTH =====
  {
    slug: 'wisdom-tooth-extraction-seoul',
    lang: 'en', heroEmoji: '🦷',
    title: 'Wisdom Tooth Extraction in Seoul — Same-Day for Tourists & Expats',
    metaDesc: 'Wisdom tooth pain in Seoul? Happy Yein Dental offers same-day wisdom tooth extraction near Myeongdong. Impacted, infected, or painful wisdom teeth treated by Seoul National University-trained surgeons.',
    h1: 'Wisdom Tooth Extraction in Seoul',
    keywords: 'wisdom tooth extraction seoul, wisdom tooth removal korea, impacted wisdom tooth myeongdong, wisdom teeth pain seoul tourist, oral surgery korea foreigner',
    introParagraph: `A <strong>painful wisdom tooth</strong> can turn your Seoul trip into a nightmare. Whether it's suddenly flaring up or you've been putting off extraction back home, <strong>Happy Yein Dental Clinic</strong> offers same-day wisdom tooth assessment and extraction. Our surgeons trained at <strong>Seoul National University</strong> perform hundreds of extractions yearly — including difficult <strong>impacted wisdom teeth</strong>. Located 2 minutes from Hoehyeon Station in Myeongdong.`,
    sections: [
      { heading: '🔍 Do You Need Wisdom Tooth Extraction?', content: `<ul>
<li><strong>Pain or swelling</strong> at the back of your jaw</li>
<li><strong>Partially erupted tooth</strong> — food gets trapped, causing infection</li>
<li><strong>Impacted tooth</strong> — pressing against neighboring teeth, visible on X-ray</li>
<li><strong>Pericoronitis</strong> — inflamed gum tissue around a partially erupted tooth</li>
<li><strong>Recurring infections</strong> — antibiotics give only temporary relief</li>
</ul>
<p>We take a <strong>panoramic X-ray and CT scan</strong> to assess the position of your wisdom teeth and plan the safest extraction approach.</p>` },
      { heading: '⚡ Same-Day Extraction Process', content: `<ol>
<li><strong>Walk in or call</strong> — No appointment required for pain cases</li>
<li><strong>Digital X-ray + CT scan</strong> — Complete diagnosis in 10 minutes</li>
<li><strong>Treatment plan</strong> — We explain the procedure and cost in English before starting</li>
<li><strong>Local anesthesia</strong> — You won't feel pain during the procedure</li>
<li><strong>Extraction</strong> — Simple: 15-30 min | Surgical (impacted): 30-60 min</li>
<li><strong>Aftercare kit</strong> — Written instructions in English, pain medication, antibiotics if needed</li>
</ol>` },
      { heading: '💰 Wisdom Tooth Extraction Cost in Korea', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Procedure</th><th style="padding:10px 12px;text-align:left;">Cost (KRW)</th><th style="padding:10px 12px;text-align:left;">Approx. USD</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Simple extraction</td><td style="padding:8px 12px;">₩100,000 – ₩200,000</td><td style="padding:8px 12px;">$75 – $150</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Surgical extraction (impacted)</td><td style="padding:8px 12px;">₩200,000 – ₩400,000</td><td style="padding:8px 12px;">$150 – $300</td></tr>
<tr><td style="padding:8px 12px;">CT scan + consultation</td><td style="padding:8px 12px;">₩50,000 – ₩80,000</td><td style="padding:8px 12px;">$37 – $60</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">Compare: US wisdom tooth extraction costs $300–$800+ per tooth. Korea is 60-70% cheaper!</p>` },
      { heading: '✈️ Can I Fly After Wisdom Tooth Extraction?', content: `<p>This is the #1 question from tourists:</p>
<ul>
<li><strong>Simple extraction</strong> — You can fly after 24-48 hours in most cases</li>
<li><strong>Surgical extraction</strong> — Wait 48-72 hours if possible. Cabin pressure rarely affects healing.</li>
<li><strong>We provide</strong> — Extra gauze, pain medication, and a post-op care sheet in English for your flight</li>
</ul>
<p>If you're flying the same day, we'll discuss timing with you and provide special aftercare instructions.</p>` },
      { heading: '📍 Location — Myeongdong Area', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>🚇 Hoehyeon Station Exit 1 — 2 min walk | 🚇 Myeongdong Station — 5 min walk</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'Can you extract an impacted wisdom tooth the same day?', a: 'In most cases, yes. After CT scan assessment, we can perform surgical extraction immediately. Very complex cases (close to nerve) may require a planned surgery.' },
      { q: 'How long does wisdom tooth extraction take?', a: 'Simple extraction: 15-30 minutes. Surgical extraction of impacted tooth: 30-60 minutes. You can walk out of the clinic afterward.' },
      { q: 'Will I be unconscious during the procedure?', a: 'We use local anesthesia (you\'re awake but feel no pain). IV sedation is available for anxious patients — please ask when you call.' },
      { q: 'I\'m a tourist — can I get all 4 wisdom teeth removed at once?', a: 'We can remove 2 on the same side in one visit. Removing all 4 at once is possible but not recommended for tourists as recovery is more challenging.' }
    ],
    ctaText: 'Get Your Wisdom Tooth Assessed Today',
    ctaSubtext: 'CT scan + consultation · Same-day extraction available',
    priceRange: '₩100,000 – ₩400,000'
  },

  // ===== 2. TEETH WHITENING =====
  {
    slug: 'teeth-whitening-myeongdong',
    lang: 'en', heroEmoji: '✨',
    title: 'Teeth Whitening in Myeongdong Seoul — Professional In-Office, 1 Hour',
    metaDesc: 'Get professional teeth whitening in Myeongdong, Seoul. In-office whitening done in 1 hour. K-beauty smile upgrade! Affordable prices, walk-in welcome. Happy Yein Dental near Hoehyeon Station.',
    h1: 'Teeth Whitening in Myeongdong — K-Beauty Smile Upgrade',
    keywords: 'teeth whitening myeongdong, teeth whitening seoul, professional whitening korea, k-beauty teeth whitening, dental whitening tourist seoul, zoom whitening korea',
    introParagraph: `You came to Seoul for K-beauty — now <strong>complete the look with a brighter smile</strong>! Professional teeth whitening at <strong>Happy Yein Dental Clinic</strong> takes just <strong>1 hour</strong> and delivers results 4-8 shades whiter. Located in Myeongdong, the K-beauty capital — upgrade your smile between shopping and sightseeing. Walk-in friendly, no appointment needed.`,
    sections: [
      { heading: '💎 Our Whitening Options', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">⚡ Express Whitening</strong> — 30 min, 2-4 shades<br>
Perfect if you're short on time. Quick application, immediate results.<br>
<span style="color:#F7BA18;font-weight:700;">₩150,000 (~$112 USD)</span>
</div>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">✨ Premium Whitening</strong> — 60 min, 4-8 shades<br>
Full professional whitening with LED activation. Maximum whitening effect.<br>
<span style="color:#F7BA18;font-weight:700;">₩300,000 (~$225 USD)</span>
</div>
<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);padding:16px;border-radius:12px;">
<strong>🏠 Take-Home Kit</strong> — Custom trays + whitening gel<br>
Gradual whitening over 2 weeks. Great add-on to in-office treatment.<br>
<span style="color:#F7BA18;font-weight:700;">₩200,000 (~$150 USD)</span>
</div>
</div>` },
      { heading: '🌟 Why Seoul for Teeth Whitening?', content: `<ul>
<li><strong>60-80% cheaper</strong> than US/UK/Australia (US average: $500-$1,000+)</li>
<li><strong>Same professional-grade products</strong> — we use the same whitening agents used worldwide</li>
<li><strong>Done in 1 hour</strong> — fit it between Myeongdong shopping and Namdaemun Market</li>
<li><strong>Instagram-worthy results</strong> — thousands of tourists whiten their teeth while visiting Korea</li>
<li><strong>K-beauty bonus</strong> — combine with a skincare routine for the ultimate glow-up!</li>
</ul>` },
      { heading: '⏱️ What to Expect', content: `<ol>
<li><strong>Consultation</strong> — Shade assessment and teeth check (10 min)</li>
<li><strong>Cleaning</strong> — Professional scaling to remove surface stains (15 min)</li>
<li><strong>Whitening gel application</strong> — Professional-grade peroxide gel applied</li>
<li><strong>LED light activation</strong> — 15-20 min per cycle, 2-3 cycles</li>
<li><strong>Results!</strong> — See your new shade, take a selfie, show off in Myeongdong! 📸</li>
</ol>` },
      { heading: '⚠️ Good to Know', content: `<ul>
<li>Mild sensitivity for 24-48 hours is normal — we provide sensitivity toothpaste</li>
<li>Avoid dark-colored food/drinks (coffee, wine, kimchi stew) for 48 hours</li>
<li>Results last 6-12 months with proper care</li>
<li>Not recommended if you have unfilled cavities (we'll check first)</li>
</ul>` },
      { heading: '📍 Location & Walk-In', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>🚇 Hoehyeon Station Exit 1 — 2 min | In the heart of Myeongdong K-beauty district</p>
<p>No appointment needed — walk in and ask about same-day whitening!</p>` }
    ],
    faq: [
      { q: 'How long does teeth whitening take?', a: 'Express whitening takes 30 minutes, premium whitening takes about 1 hour. You can walk in and get it done between shopping!' },
      { q: 'Is teeth whitening in Korea safe?', a: 'Absolutely. We use the same FDA-approved whitening agents used worldwide, applied by licensed dentists. Professional whitening is much safer than DIY kits.' },
      { q: 'How many shades whiter will my teeth get?', a: 'Typically 4-8 shades whiter with premium whitening. Results depend on your original shade and tooth condition. We\'ll show you a shade guide before starting.' },
      { q: 'Can I eat Korean BBQ after whitening?', a: 'We recommend waiting 48 hours before eating heavily pigmented foods like kimchi, gochujang, or drinking coffee. Plain rice, tofu, and light foods are fine immediately after.' }
    ],
    ctaText: 'Get Your K-Beauty Smile Today',
    ctaSubtext: 'Walk-in friendly · Done in 1 hour · From ₩150,000',
    priceRange: '₩150,000 – ₩300,000'
  },

  // ===== 3. DENTAL CHECKUP & CLEANING =====
  {
    slug: 'dental-checkup-cleaning-seoul',
    lang: 'en', heroEmoji: '🔍',
    title: 'Dental Check-Up & Cleaning in Seoul — Affordable for Tourists',
    metaDesc: 'Get a comprehensive dental check-up and professional cleaning in Seoul near Myeongdong. Digital X-ray included, from ₩50,000. Walk-in welcome, English-speaking dentist. Happy Yein Dental.',
    h1: 'Dental Check-Up & Professional Cleaning in Seoul',
    keywords: 'dental checkup seoul tourist, teeth cleaning korea, dental scaling myeongdong, affordable dental exam seoul, preventive dentistry korea foreigner',
    introParagraph: `Smart travelers take advantage of Korea's <strong>incredibly affordable dental care</strong>. A comprehensive dental check-up with professional cleaning at <strong>Happy Yein Dental Clinic</strong> costs a fraction of what you'd pay back home — and you get <strong>state-of-the-art diagnostics</strong> including digital X-rays and CT scanning. Located in Myeongdong, perfect for a quick health stop during your Seoul trip.`,
    sections: [
      { heading: '📋 What\'s Included', content: `<ul>
<li><strong>Comprehensive oral examination</strong> — teeth, gums, bite, jaw joint</li>
<li><strong>Digital panoramic X-ray</strong> — full view of all teeth, jaw, and sinuses</li>
<li><strong>Cavity detection</strong> — we'll find problems before they become emergencies</li>
<li><strong>Gum health assessment</strong> — checking for periodontal disease</li>
<li><strong>Professional scaling (cleaning)</strong> — tartar and plaque removal</li>
<li><strong>Polishing</strong> — smooth, clean tooth surfaces</li>
<li><strong>Written report in English</strong> — take it home for your regular dentist</li>
</ul>` },
      { heading: '💰 Check-Up Pricing — Seriously Affordable', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Service</th><th style="padding:10px 12px;text-align:left;">Cost (KRW)</th><th style="padding:10px 12px;text-align:left;">Approx. USD</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Consultation + panoramic X-ray</td><td style="padding:8px 12px;">₩30,000 – ₩50,000</td><td style="padding:8px 12px;">$22 – $37</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Professional scaling (cleaning)</td><td style="padding:8px 12px;">₩50,000 – ₩100,000</td><td style="padding:8px 12px;">$37 – $75</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">CT scan (3D, if needed)</td><td style="padding:8px 12px;">₩50,000 – ₩100,000</td><td style="padding:8px 12px;">$37 – $75</td></tr>
<tr><td style="padding:8px 12px;"><strong>Complete check-up + cleaning package</strong></td><td style="padding:8px 12px;"><strong>₩80,000 – ₩150,000</strong></td><td style="padding:8px 12px;"><strong>$60 – $112</strong></td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">US average: Check-up + cleaning = $200-$400. You save 60-70% in Korea!</p>` },
      { heading: '💡 Why Get a Check-Up in Seoul?', content: `<ul>
<li>🦷 Catch cavities before they become expensive emergencies at home</li>
<li>💰 Save money — same quality for a fraction of the price</li>
<li>🏥 Access advanced diagnostics (CT, digital X-ray) often not included in basic check-ups elsewhere</li>
<li>📄 Get a dental report to bring home — your dentist will appreciate the detailed records</li>
<li>⏱️ Takes only 30-45 minutes — easy to fit into your travel schedule</li>
</ul>` },
      { heading: '📍 Walk-In Friendly', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>Mon–Fri: 09:30–18:30 | Wed: 09:30–20:00 | Sat: 09:30–14:00</p>
<p>🚇 Hoehyeon Station Exit 1 — 2 min | No appointment needed for check-ups</p>` }
    ],
    faq: [
      { q: 'How long does a dental check-up and cleaning take?', a: 'About 30-45 minutes for a complete check-up with cleaning. If additional X-rays or CT scan are needed, add 10-15 minutes.' },
      { q: 'Can I get a dental report in English?', a: 'Yes! We provide written findings and X-ray images that you can share with your dentist back home.' },
      { q: 'Do I need to fast before a dental check-up?', a: 'No fasting needed. Just brush your teeth normally before your visit.' },
      { q: 'What if you find cavities during the check-up?', a: 'We\'ll explain what we found, show you on the X-ray, and discuss treatment options with pricing. You can choose to treat it here (often much cheaper than back home) or take the report to your regular dentist.' }
    ],
    ctaText: 'Book a Check-Up Today',
    ctaSubtext: 'Full exam + cleaning from ₩80,000 · Walk-in welcome',
    priceRange: '₩50,000 – ₩150,000'
  },

  // ===== 4. DENTAL IMPLANTS =====
  {
    slug: 'dental-implant-seoul-korea',
    lang: 'en', heroEmoji: '🔩',
    title: 'Dental Implants in Seoul Korea — World-Class, 50% Cheaper Than US',
    metaDesc: 'Dental implants in Seoul, Korea from ₩1,200,000 ($900). Seoul National University-trained implant specialists. Osstem, Straumann, Nobel Biocare available. Happy Yein Dental Myeongdong.',
    h1: 'Dental Implants in Seoul — World-Class at Half the Price',
    keywords: 'dental implant seoul, dental implant korea cost, tooth implant myeongdong, osstem implant korea, dental implant tourism korea, best implant dentist seoul',
    introParagraph: `Korea is the <strong>world's #1 dental implant market</strong> — and for good reason. Korean dentists place more implants per capita than any other country, meaning unmatched expertise. At <strong>Happy Yein Dental Clinic</strong>, our implant specialists trained at <strong>Seoul National University</strong> have placed thousands of implants. We use premium systems (Osstem, Straumann, Nobel Biocare) at prices <strong>50-70% lower than the US or Europe</strong>.`,
    sections: [
      { heading: '💎 Implant Options & Pricing', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Implant System</th><th style="padding:10px 12px;text-align:left;">Cost per Tooth (KRW)</th><th style="padding:10px 12px;text-align:left;">Approx. USD</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Osstem (Korean premium)</td><td style="padding:8px 12px;">₩1,200,000 – ₩1,500,000</td><td style="padding:8px 12px;">$900 – $1,125</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Straumann (Swiss)</td><td style="padding:8px 12px;">₩1,800,000 – ₩2,200,000</td><td style="padding:8px 12px;">$1,350 – $1,650</td></tr>
<tr><td style="padding:8px 12px;">Nobel Biocare (Swedish)</td><td style="padding:8px 12px;">₩2,000,000 – ₩2,500,000</td><td style="padding:8px 12px;">$1,500 – $1,875</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">US average: $3,000–$6,000 per implant. UK: £2,000–£3,500. Australia: AUD $4,000–$6,000.</p>
<p><strong>Price includes:</strong> implant fixture + abutment + crown + CT scan + all follow-up visits.</p>` },
      { heading: '🏆 Why Korea for Dental Implants?', content: `<ul>
<li><strong>#1 in the world</strong> for implant volume — Korean dentists have unmatched experience</li>
<li><strong>Osstem is Korean</strong> — the world's 3rd largest implant manufacturer, born here</li>
<li><strong>Latest technology</strong> — CT-guided surgery, digital planning, immediate loading available</li>
<li><strong>Seoul National University doctors</strong> — Korea's top medical school graduates</li>
<li><strong>50-70% cost savings</strong> — even including flights and hotel, you save thousands</li>
</ul>` },
      { heading: '📅 Treatment Timeline for Tourists', content: `<p>Implant treatment typically requires <strong>2 visits to Seoul</strong>:</p>
<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">Visit 1 (Day 1-2):</strong> Consultation + CT scan → Implant placement surgery → Post-op check<br>
<span style="font-size:0.85rem;color:#aaa;">Stay in Seoul: 2-3 days minimum</span>
</div>
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">Visit 2 (3-6 months later):</strong> Healing check → Abutment + crown placement<br>
<span style="font-size:0.85rem;color:#aaa;">Stay in Seoul: 2-3 days</span>
</div>
</div>
<p style="margin-top:12px;"><strong>Same-day implant</strong> (immediate loading) may be possible for select cases — ask during consultation.</p>` },
      { heading: '📍 Located in Myeongdong — Easy Access', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>🚇 Hoehyeon Station Exit 1 — 2 min walk | Close to major hotels and tourist areas</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'Can I get a dental implant during a short trip to Seoul?', a: 'The implant placement (surgery) takes about 1-2 hours and can be done on day 1. However, the final crown is placed after 3-6 months of healing. Plan for 2 trips to Seoul, or ask about same-day immediate loading options.' },
      { q: 'Which implant brand do you recommend?', a: 'For most patients, Osstem offers excellent quality at the best value. For premium cases, Straumann or Nobel Biocare are available. Our doctors will recommend the best option based on your bone condition and needs.' },
      { q: 'Is dental implant surgery painful?', a: 'The surgery is done under local anesthesia — you won\'t feel pain during the procedure. Post-surgery discomfort is mild and managed with painkillers for 2-3 days.' },
      { q: 'Do you offer full-mouth implant reconstruction?', a: 'Yes! Our director, Dr. Han, specializes in full-mouth rehabilitation. All-on-4 and All-on-6 solutions are available at significantly lower costs than Western countries.' }
    ],
    ctaText: 'Get a Free Implant Consultation',
    ctaSubtext: 'CT scan · Treatment plan · Cost estimate — in one visit',
    priceRange: '₩1,200,000 – ₩2,500,000'
  },

  // ===== 5. DENTAL VENEERS =====
  {
    slug: 'dental-veneers-seoul-korea',
    lang: 'en', heroEmoji: '😁',
    title: 'Dental Veneers in Seoul Korea — Celebrity Smile from ₩500,000',
    metaDesc: 'Get porcelain veneers in Seoul, Korea at 50-70% less than US prices. Natural-looking, custom-made veneers by Seoul National University specialists. Perfect for dental tourists. Happy Yein Dental.',
    h1: 'Dental Veneers in Seoul — Your Celebrity Smile Awaits',
    keywords: 'dental veneers seoul, porcelain veneers korea, laminate veneers myeongdong, smile makeover korea, cosmetic dentistry seoul tourist, veneer cost korea',
    introParagraph: `K-pop stars, K-drama actors, and now YOU — get the <strong>perfect Korean celebrity smile</strong> with porcelain veneers at <strong>Happy Yein Dental Clinic</strong>. Veneers in Korea cost <strong>50-70% less than in the US or UK</strong>, with the same premium materials and craftsmanship. Our cosmetic dentists design natural-looking, beautiful smiles customized to your face shape and preferences.`,
    sections: [
      { heading: '💎 Veneer Options', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Type</th><th style="padding:10px 12px;text-align:left;">Cost per Tooth</th><th style="padding:10px 12px;text-align:left;">Duration</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Composite veneer (direct)</td><td style="padding:8px 12px;">₩200,000 – ₩350,000 (~$150-$260)</td><td style="padding:8px 12px;">Same-day, 1 visit</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Porcelain veneer (traditional)</td><td style="padding:8px 12px;">₩500,000 – ₩800,000 (~$375-$600)</td><td style="padding:8px 12px;">2 visits, 5-7 days</td></tr>
<tr><td style="padding:8px 12px;">Minimal prep / no-prep veneer</td><td style="padding:8px 12px;">₩600,000 – ₩1,000,000 (~$450-$750)</td><td style="padding:8px 12px;">2 visits, 5-7 days</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">US porcelain veneers: $1,500–$3,000 per tooth. UK: £500–£1,000. You save 50-70%!</p>` },
      { heading: '🌟 Why Veneers in Korea?', content: `<ul>
<li>🎬 <strong>K-beauty standard</strong> — Korean labs create the most natural-looking veneers in Asia</li>
<li>💰 <strong>Huge savings</strong> — 8 veneers in Korea = cost of 2-3 veneers in the US</li>
<li>🔬 <strong>Advanced technology</strong> — digital smile design, shade matching, same-day temporaries</li>
<li>👨‍⚕️ <strong>Expert cosmetic dentists</strong> — Seoul National University trained</li>
<li>📸 <strong>Instagram-worthy results</strong> — perfect for before/after photos!</li>
</ul>` },
      { heading: '📅 Timeline for Tourists', content: `<p><strong>Option A — Composite Veneers (1 visit):</strong></p>
<p>Done in a single appointment (2-3 hours for 4-8 teeth). Walk in, walk out with a new smile!</p>
<p><strong>Option B — Porcelain Veneers (2 visits over 5-7 days):</strong></p>
<ol>
<li>Day 1: Consultation, digital smile design, tooth preparation, temporary veneers placed</li>
<li>Day 5-7: Final porcelain veneers bonded. Done!</li>
</ol>
<p>Plan a <strong>1-week Seoul trip</strong> and come home with a brand new smile. 🌟</p>` },
      { heading: '📍 Myeongdong Location', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a> — Call for cosmetic consultation</p>` }
    ],
    faq: [
      { q: 'Can I get veneers in one visit?', a: 'Composite veneers can be completed in one visit (2-3 hours). Porcelain veneers require 2 visits over about a week — you\'ll wear natural-looking temporaries in between.' },
      { q: 'Do veneers damage my natural teeth?', a: 'Traditional veneers require minimal enamel removal (0.3-0.5mm). No-prep veneers preserve even more tooth structure. Our dentists use conservative approaches to protect your natural teeth.' },
      { q: 'How long do veneers last?', a: 'Porcelain veneers last 10-20 years with proper care. Composite veneers last 5-7 years. Both look beautiful and natural!' },
      { q: 'What if I don\'t like the result?', a: 'We use digital smile design to preview your new smile BEFORE starting. Temporary veneers let you "test drive" the look before final placement.' }
    ],
    ctaText: 'Design Your New Smile',
    ctaSubtext: 'Free digital smile preview · Porcelain from ₩500,000',
    priceRange: '₩200,000 – ₩1,000,000'
  },

  // ===== 6. DENTAL COST GUIDE =====
  {
    slug: 'dental-cost-korea-vs-usa-guide',
    lang: 'en', heroEmoji: '💰',
    title: 'Dental Cost in Korea vs USA/UK/Australia — 2026 Price Comparison',
    metaDesc: 'Complete dental cost comparison: Korea vs USA, UK, Australia. See how much you can save on implants, crowns, whitening, root canals in Seoul. Updated 2026 prices. Happy Yein Dental Myeongdong.',
    h1: 'Dental Costs in Korea vs USA/UK/Australia — Full 2026 Price Guide',
    keywords: 'dental cost korea, dentist price korea vs usa, dental tourism korea cost, cheap dental care seoul, dental treatment price comparison korea, dental implant cost korea vs us',
    introParagraph: `Everyone's heard that dental care in Korea is cheap — but <strong>how much cheaper?</strong> This comprehensive guide compares real 2026 prices across Korea, the US, UK, and Australia. Spoiler: you can <strong>save 50-80%</strong> on most treatments at <strong>Happy Yein Dental Clinic</strong> in Myeongdong, Seoul — even without Korean health insurance.`,
    sections: [
      { heading: '📊 Complete Price Comparison Table', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:0.85rem;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 8px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Treatment</th><th style="padding:10px 8px;text-align:center;">🇰🇷 Korea</th><th style="padding:10px 8px;text-align:center;">🇺🇸 USA</th><th style="padding:10px 8px;text-align:center;">🇬🇧 UK</th><th style="padding:10px 8px;text-align:center;">🇦🇺 Australia</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Check-up + X-ray</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">$22-37</td><td style="padding:8px;text-align:center;">$150-300</td><td style="padding:8px;text-align:center;">£50-150</td><td style="padding:8px;text-align:center;">A$200-400</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Professional cleaning</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">$37-75</td><td style="padding:8px;text-align:center;">$100-200</td><td style="padding:8px;text-align:center;">£50-100</td><td style="padding:8px;text-align:center;">A$150-300</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Composite filling</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">$60-150</td><td style="padding:8px;text-align:center;">$200-500</td><td style="padding:8px;text-align:center;">£100-250</td><td style="padding:8px;text-align:center;">A$200-500</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Root canal</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">$150-300</td><td style="padding:8px;text-align:center;">$700-1,500</td><td style="padding:8px;text-align:center;">£250-500</td><td style="padding:8px;text-align:center;">A$800-1,500</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Porcelain crown</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">$225-450</td><td style="padding:8px;text-align:center;">$1,000-2,000</td><td style="padding:8px;text-align:center;">£400-800</td><td style="padding:8px;text-align:center;">A$1,200-2,000</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Dental implant</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">$900-1,875</td><td style="padding:8px;text-align:center;">$3,000-6,000</td><td style="padding:8px;text-align:center;">£2,000-3,500</td><td style="padding:8px;text-align:center;">A$4,000-6,000</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Teeth whitening</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">$112-225</td><td style="padding:8px;text-align:center;">$500-1,000</td><td style="padding:8px;text-align:center;">£200-500</td><td style="padding:8px;text-align:center;">A$500-1,000</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Porcelain veneer (per tooth)</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">$375-600</td><td style="padding:8px;text-align:center;">$1,500-3,000</td><td style="padding:8px;text-align:center;">£500-1,000</td><td style="padding:8px;text-align:center;">A$1,200-2,500</td></tr>
<tr><td style="padding:8px;">Wisdom tooth extraction</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">$75-300</td><td style="padding:8px;text-align:center;">$300-800</td><td style="padding:8px;text-align:center;">£150-400</td><td style="padding:8px;text-align:center;">A$300-600</td></tr>
</table>
<p style="font-size:0.8rem;color:#aaa;">* All prices approximate for self-pay patients. Korea prices based on Happy Yein Dental Clinic rates. Updated June 2026.</p>` },
      { heading: '✈️ Is Dental Tourism to Korea Worth It?', content: `<p>Let's do the math for a common scenario — <strong>2 dental implants</strong>:</p>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:20px;border-radius:12px;margin:12px 0;">
<p><strong>In the USA:</strong> 2 implants × $4,500 = <span style="color:#ff6b6b;">$9,000</span></p>
<p><strong>In Korea:</strong> 2 implants × $1,200 + flights ($800) + hotel 5 nights ($500) = <span style="color:#F7BA18;">$3,900</span></p>
<p style="font-size:1.1rem;font-weight:700;color:#F7BA18;margin-top:12px;">💰 You save $5,100 — even including travel!</p>
</div>
<p>For bigger treatments (multiple implants, full-mouth rehab, smile makeover), the savings are even more dramatic.</p>` },
      { heading: '🏥 Why Happy Yein Dental?', content: `<ul>
<li>✅ <strong>Seoul National University-trained doctors</strong> — Korea's #1 dental school</li>
<li>✅ <strong>CT scanner, surgical microscope, digital X-ray</strong> — advanced diagnostics</li>
<li>✅ <strong>Myeongdong location</strong> — easy access from any Seoul hotel</li>
<li>✅ <strong>English-speaking assistance</strong> — clear communication about treatment and costs</li>
<li>✅ <strong>Transparent pricing</strong> — written estimate before any treatment begins</li>
<li>✅ <strong>Travel insurance documentation</strong> — English receipts for reimbursement claims</li>
</ul>` },
      { heading: '📍 Visit Us in Myeongdong', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'Why is dental care so cheap in Korea?', a: 'Lower operating costs, government-regulated pricing for basic treatments, high competition among clinics, and a large dental materials manufacturing industry (Osstem, etc.) all contribute to lower prices — without sacrificing quality.' },
      { q: 'Is the quality as good as in Western countries?', a: 'Korea consistently ranks among the top 5 countries globally for healthcare quality. Our doctors trained at Seoul National University, and we use the same materials and equipment as top clinics worldwide.' },
      { q: 'Do I need to speak Korean to visit a dentist?', a: 'No! At Happy Yein Dental, we provide English-language assistance for consultations, treatment explanations, cost estimates, and aftercare instructions.' },
      { q: 'Can I use my travel insurance for dental treatment in Korea?', a: 'We provide detailed English receipts and documentation for insurance claims. Coverage depends on your specific policy — contact your insurer before treatment.' }
    ],
    ctaText: 'Get a Free Cost Estimate',
    ctaSubtext: 'Walk-in or call · Transparent pricing · English assistance',
  },

  // ===== 7. TRAVEL INSURANCE =====
  {
    slug: 'travel-insurance-dental-korea',
    lang: 'en', heroEmoji: '🛡️',
    title: 'Using Travel Insurance for Dental Care in Korea — Complete Guide',
    metaDesc: 'How to use travel insurance for dental treatment in Seoul, Korea. What\'s covered, how to file claims, documentation we provide. Happy Yein Dental Clinic, Myeongdong.',
    h1: 'Travel Insurance & Dental Care in Korea — What You Need to Know',
    keywords: 'travel insurance dental korea, dental emergency travel insurance seoul, dental claim korea tourist, insurance receipt english dentist korea, dental coverage abroad korea',
    introParagraph: `Had an <strong>unexpected dental emergency in Seoul</strong>? Wondering if your travel insurance covers it? This guide explains everything: what's typically covered, how to file a claim, and how <strong>Happy Yein Dental Clinic</strong> helps with <strong>English documentation</strong> for your insurance company.`,
    sections: [
      { heading: '✅ What Travel Insurance Usually Covers', content: `<ul>
<li><strong>Emergency dental treatment</strong> — sudden toothache, broken tooth, lost filling/crown</li>
<li><strong>Dental injury from accident</strong> — fall, sports injury, traffic accident</li>
<li><strong>Emergency pain relief</strong> — medication and temporary treatment</li>
<li><strong>Emergency extraction</strong> — when medically necessary</li>
</ul>
<p style="margin-top:12px;"><strong style="color:#ff6b6b;">Usually NOT covered:</strong></p>
<ul>
<li>Pre-existing conditions (problems that started before your trip)</li>
<li>Cosmetic procedures (whitening, veneers)</li>
<li>Planned treatments (dental tourism procedures)</li>
<li>Routine check-ups and cleaning</li>
</ul>` },
      { heading: '📋 What We Provide for Insurance Claims', content: `<ul>
<li>📄 <strong>Detailed English receipt</strong> — itemized with treatment codes and descriptions</li>
<li>📄 <strong>Diagnosis letter in English</strong> — explaining the emergency and medical necessity</li>
<li>🦷 <strong>X-ray images</strong> — digital copies on USB or emailed to you</li>
<li>📄 <strong>Treatment records</strong> — complete treatment documentation</li>
<li>📋 <strong>Insurance claim form assistance</strong> — help filling out common forms</li>
</ul>
<p style="margin-top:8px;"><strong>All provided free of charge</strong> as part of your treatment.</p>` },
      { heading: '📝 How to File a Dental Insurance Claim', content: `<ol>
<li><strong>Contact your insurance company</strong> — report the emergency ASAP (some require within 24 hours)</li>
<li><strong>Get treatment</strong> — visit Happy Yein Dental for emergency care</li>
<li><strong>Collect documents</strong> — we provide receipt, diagnosis letter, and X-rays</li>
<li><strong>Pay at the clinic</strong> — most travel insurers use pay-then-claim (reimbursement model)</li>
<li><strong>Submit your claim</strong> — send documents to your insurance within their deadline (usually 30-90 days)</li>
</ol>
<p><strong>💡 Pro tip:</strong> Take photos of all documents and email them to yourself as backup.</p>` },
      { heading: '💰 Costs Are Affordable Even Without Insurance', content: `<p>Even if your insurance doesn't cover dental treatment, Korea's prices are extremely affordable:</p>
<ul>
<li>Emergency consultation + X-ray: ₩30,000–50,000 ($22–37 USD)</li>
<li>Filling: ₩80,000–200,000 ($60–150 USD)</li>
<li>Crown re-cementation: ₩50,000–100,000 ($37–75 USD)</li>
<li>Root canal: ₩200,000–400,000 ($150–300 USD)</li>
</ul>
<p>Many patients find it's <strong>cheaper to pay out of pocket in Korea</strong> than to meet their insurance deductible back home!</p>` },
      { heading: '📍 Visit Us', content: `<p><strong>Happy Yein Dental Clinic — Myeongdong</strong></p>
<p>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'Do I need to pay upfront or can you bill my insurance directly?', a: 'In most cases, you pay at the clinic and submit documents to your insurance for reimbursement. Direct billing is not available for most international travel insurance policies.' },
      { q: 'How quickly can I get insurance documents?', a: 'We provide all documents (receipt, diagnosis letter, X-rays) on the day of treatment. No waiting period.' },
      { q: 'My insurance asks for specific forms — can you help?', a: 'Yes! Bring any forms your insurance company requires, and we\'ll help fill in the medical sections.' },
      { q: 'What if my insurance denies the claim?', a: 'This is between you and your insurer. However, our detailed documentation in English maximizes your chance of successful claims. The medical necessity letter we provide helps justify emergency treatment.' }
    ],
    ctaText: 'Get Emergency Care + Insurance Docs',
    ctaSubtext: 'English receipts · Diagnosis letter · X-ray copies included',
  },

  // ===== 8. SATURDAY DENTIST =====
  {
    slug: 'saturday-dentist-myeongdong',
    lang: 'en', heroEmoji: '📅',
    title: 'Saturday Dentist Near Myeongdong Seoul — Open Until 2PM',
    metaDesc: 'Need a dentist on Saturday in Seoul? Happy Yein Dental is open Saturdays 09:30-14:00, near Myeongdong. Walk-in welcome, English-speaking staff, emergency and regular dental care available.',
    h1: 'Saturday Dentist in Myeongdong — Open 09:30–14:00',
    keywords: 'saturday dentist myeongdong, weekend dentist seoul, dentist open saturday seoul, dental care saturday korea, walk-in dentist saturday myeongdong',
    introParagraph: `Most tourists are out <strong>shopping in Myeongdong on Saturday</strong> — and that's exactly when dental problems love to strike. Good news: <strong>Happy Yein Dental Clinic</strong> is open every Saturday from <strong>09:30 to 14:00</strong>. Walk-in welcome, English assistance available. Whether it's an emergency or you want to squeeze in a check-up between shopping trips, we've got you covered.`,
    sections: [
      { heading: '⏰ Our Full Schedule', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Day</th><th style="padding:10px 12px;text-align:left;">Hours</th><th style="padding:10px 12px;text-align:left;">Note</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Monday, Tuesday, Thursday, Friday</td><td style="padding:8px 12px;">09:30 – 18:30</td><td style="padding:8px 12px;">Regular hours</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>Wednesday</strong></td><td style="padding:8px 12px;"><strong>09:30 – 20:00</strong></td><td style="padding:8px 12px;color:#F7BA18;font-weight:700;">🌙 Night hours!</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>Saturday</strong></td><td style="padding:8px 12px;"><strong>09:30 – 14:00</strong></td><td style="padding:8px 12px;color:#F7BA18;font-weight:700;">✅ Open!</td></tr>
<tr><td style="padding:8px 12px;">Sunday & Holidays</td><td style="padding:8px 12px;">Closed</td><td style="padding:8px 12px;">—</td></tr>
</table>` },
      { heading: '🦷 Services Available on Saturday', content: `<ul>
<li>🚨 <strong>Emergency care</strong> — toothache, broken tooth, lost crown</li>
<li>🔍 <strong>Check-up & cleaning</strong> — comprehensive exam with X-ray</li>
<li>🦷 <strong>Fillings & restorations</strong> — composite fillings, temporary crowns</li>
<li>✨ <strong>Teeth whitening</strong> — in-office whitening in 1 hour</li>
<li>💊 <strong>Pain relief</strong> — medication and temporary treatment</li>
</ul>
<p>For complex procedures (implant surgery, extractions requiring CT), Saturday consultation + treatment planned for a weekday may be recommended.</p>` },
      { heading: '📍 Myeongdong Location', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>🚇 Hoehyeon Station Exit 1 — 2 min walk | Right next to Saturday shopping at Namdaemun Market & Myeongdong</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'Do I need an appointment for Saturday?', a: 'Walk-ins are welcome, especially for emergencies. For non-urgent care, calling ahead is helpful since Saturday hours are shorter (09:30-14:00).' },
      { q: 'Is the Saturday dentist the same quality?', a: 'Absolutely — the same Seoul National University-trained doctors work on Saturdays. Same equipment, same quality.' },
      { q: 'What if I have an emergency on Sunday?', a: 'We are closed on Sundays. For Sunday dental emergencies, Seoul has 24-hour emergency dental clinics. Call us on Monday or visit Saturday morning instead if possible.' }
    ],
    ctaText: 'Visit Us This Saturday',
    ctaSubtext: 'Open 09:30–14:00 · Walk-in welcome · Myeongdong',
  },

  // ===== 9. WEDNESDAY NIGHT DENTIST =====
  {
    slug: 'night-dentist-myeongdong-wednesday',
    lang: 'en', heroEmoji: '🌙',
    title: 'Night Dentist in Myeongdong — Open Until 8PM Wednesdays',
    metaDesc: 'Need a dentist after work or dinner? Happy Yein Dental is open until 8PM on Wednesdays. Night dental care in Myeongdong, Seoul. Walk-in, English-speaking, emergency & regular care.',
    h1: 'Night Dentist in Myeongdong — Wednesdays Until 8PM',
    keywords: 'night dentist myeongdong, evening dentist seoul, after hours dental care myeongdong, dentist open late seoul, wednesday night dentist korea',
    introParagraph: `Had a long day exploring Seoul and now your tooth is killing you? Or maybe you noticed a dental problem but couldn't visit during the day? <strong>Happy Yein Dental Clinic</strong> is open until <strong>8:00 PM every Wednesday</strong> — perfect for tourists, expats, and busy professionals who need evening dental care in the Myeongdong area.`,
    sections: [
      { heading: '🌙 Wednesday Night Hours', content: `<div style="background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.15);padding:24px;border-radius:16px;text-align:center;">
<p style="font-size:1.3rem;font-weight:800;font-family:'Syne',sans-serif;">Every Wednesday</p>
<p style="font-size:2rem;font-weight:800;color:#F7BA18;font-family:'Syne',sans-serif;">09:30 – 20:00</p>
<p style="color:#B5B0A8;font-size:0.85rem;">Last walk-in accepted at 19:00 for new patients</p>
</div>` },
      { heading: '🦷 Available on Wednesday Evenings', content: `<ul>
<li>🚨 <strong>Emergency dental care</strong> — pain relief, broken tooth, lost crown</li>
<li>🔍 <strong>Check-up & X-ray</strong> — quick evening assessment</li>
<li>✨ <strong>Teeth whitening</strong> — 1-hour express whitening</li>
<li>🦷 <strong>Fillings & minor procedures</strong></li>
<li>📋 <strong>Consultations for implants, veneers, orthodontics</strong></li>
</ul>` },
      { heading: '💡 Perfect For', content: `<ul>
<li>🏨 Tourists who spent the day sightseeing and need evening dental care</li>
<li>💼 Expats who can't take time off work during the day</li>
<li>🛍️ Shoppers in Myeongdong who want to fit in a quick dental visit</li>
<li>🚶 Walk-ins with unexpected dental problems after dinner</li>
</ul>` },
      { heading: '📍 Location', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>🚇 Hoehyeon Station Exit 1 — 2 min | Myeongdong Station — 5 min</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'What time is the last appointment on Wednesday?', a: 'We accept walk-ins until 7:00 PM for new patients. If you call ahead, we can sometimes accommodate later arrivals.' },
      { q: 'Are all services available at night?', a: 'Most services are available, including emergency care, fillings, whitening, and consultations. Complex surgeries are typically scheduled during regular hours.' },
      { q: 'Do I need to call ahead for Wednesday evening?', a: 'Walk-ins are welcome, but calling ahead helps us ensure a doctor is available for your specific needs.' }
    ],
    ctaText: 'Visit Wednesday Evening',
    ctaSubtext: 'Open until 8PM · Walk-in welcome',
  },

  // ===== 10. DENTAL ABSCESS / SWOLLEN FACE =====
  {
    slug: 'dental-abscess-swollen-face-seoul',
    lang: 'en', heroEmoji: '🔴',
    title: 'Dental Abscess & Swollen Face in Seoul — Urgent Treatment Myeongdong',
    metaDesc: 'Dental abscess or swollen face in Seoul? Get urgent treatment at Happy Yein Dental near Myeongdong. Drainage, antibiotics, pain relief same-day. English-speaking, walk-in priority.',
    h1: 'Dental Abscess & Swollen Face — Urgent Care in Seoul',
    keywords: 'dental abscess seoul, swollen face dentist korea, infected tooth seoul tourist, tooth infection treatment myeongdong, dental abscess emergency korea',
    introParagraph: `A <strong>dental abscess</strong> is one of the most serious dental emergencies — your face is swollen, you're in severe pain, and the infection can spread. <strong>Don't wait.</strong> Happy Yein Dental Clinic in Myeongdong provides <strong>immediate abscess drainage, antibiotics, and pain relief</strong>. Walk-in priority for abscess patients.`,
    sections: [
      { heading: '🚨 Warning Signs — Come In Immediately If:', content: `<ul>
<li>😰 <strong>Swollen cheek, jaw, or face</strong> — especially if getting worse</li>
<li>🤒 <strong>Fever</strong> — sign of spreading infection</li>
<li>😫 <strong>Throbbing, constant pain</strong> — not responding to painkillers</li>
<li>🦷 <strong>Pus or foul taste</strong> in your mouth</li>
<li>😮 <strong>Difficulty opening your mouth or swallowing</strong> — seek care urgently</li>
</ul>
<p style="color:#ff6b6b;font-weight:700;margin-top:12px;">⚠️ If you have difficulty breathing or swallowing, call 119 (Korean emergency number) immediately.</p>` },
      { heading: '⚡ Our Treatment Process', content: `<ol>
<li><strong>Immediate assessment</strong> — X-ray to locate the abscess</li>
<li><strong>Pain relief</strong> — local anesthesia and medication</li>
<li><strong>Incision & drainage</strong> — if the abscess is ready to be drained</li>
<li><strong>Antibiotics</strong> — prescription to fight the infection</li>
<li><strong>Root cause treatment</strong> — root canal or extraction once infection is controlled</li>
<li><strong>Follow-up plan</strong> — written instructions in English</li>
</ol>` },
      { heading: '💰 Treatment Cost', content: `<ul>
<li>Emergency consultation + X-ray: ₩30,000–50,000 ($22–37)</li>
<li>Incision & drainage: ₩50,000–100,000 ($37–75)</li>
<li>Antibiotics prescription: ₩10,000–30,000 ($7–22)</li>
<li>Root canal (if needed): ₩200,000–400,000 ($150–300)</li>
</ul>` },
      { heading: '🏥 While You Wait — First Aid', content: `<ul>
<li>Take <strong>ibuprofen</strong> (400-600mg) for pain and swelling</li>
<li><strong>Warm salt water rinse</strong> — gently, don't swish vigorously</li>
<li><strong>Cold compress</strong> on the outside of your cheek</li>
<li><strong>Don't</strong> squeeze or try to pop the abscess yourself</li>
<li><strong>Come see us ASAP</strong> — dental infections can become serious quickly</li>
</ul>` },
      { heading: '📍 Walk-In Priority', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a> — Call ahead and mention abscess for priority</p>` }
    ],
    faq: [
      { q: 'Can a dental abscess be dangerous?', a: 'Yes — untreated dental infections can spread to the jaw, head, neck, or even bloodstream. That\'s why we prioritize abscess patients. Seek care the same day if possible.' },
      { q: 'Can I fly with a dental abscess?', a: 'It\'s not recommended to fly with an untreated abscess — pressure changes can worsen pain. Get treatment first, then fly once antibiotics have started working (usually 24-48 hours).' },
      { q: 'How long does treatment take?', a: 'Initial emergency treatment (drainage + antibiotics) takes about 30-60 minutes. The underlying cause (root canal or extraction) may require a follow-up visit.' }
    ],
    ctaText: 'Get Urgent Abscess Treatment',
    ctaSubtext: 'Walk-in priority · Same-day drainage · Antibiotics',
    priceRange: '₩30,000 – ₩400,000'
  },

  // ===== 11. KNOCKED OUT TOOTH =====
  {
    slug: 'knocked-out-tooth-seoul',
    lang: 'en', heroEmoji: '🥊',
    title: 'Knocked-Out Tooth in Seoul? Emergency Reimplantation — 1 Hour Matters!',
    metaDesc: 'Knocked out a tooth in Seoul? TIME IS CRITICAL. Happy Yein Dental near Myeongdong can reimplant teeth within 1 hour. Save the tooth in milk, call immediately. English-speaking emergency dental.',
    h1: 'Knocked-Out Tooth in Seoul — Every Minute Counts',
    keywords: 'knocked out tooth seoul, avulsed tooth reimplantation korea, tooth fell out accident seoul, emergency dental reimplant myeongdong, lost tooth seoul tourist',
    introParagraph: `<strong style="color:#ff6b6b;">⏰ A knocked-out tooth can be saved if reimplanted within 30-60 minutes!</strong> Whether it happened playing sports in Hangang Park, a slip near Myeongdong, or an accident — <strong>call us immediately</strong> and get to Happy Yein Dental Clinic ASAP. Every minute counts.`,
    sections: [
      { heading: '🚨 DO THIS RIGHT NOW — Emergency Steps', content: `<ol>
<li style="color:#F7BA18;font-weight:700;">Find the tooth — pick it up by the CROWN (white part), NOT the root</li>
<li>Gently rinse with water if dirty (do NOT scrub or remove tissue)</li>
<li><strong>Try to put it back in the socket</strong> — bite on a handkerchief to hold it in place</li>
<li><strong>If you can't reinsert it</strong> — put the tooth in:
  <ul>
    <li>🥛 <strong>Cold milk</strong> (best option — available at any convenience store)</li>
    <li>💧 <strong>Saliva</strong> — hold it inside your cheek</li>
    <li>🧂 <strong>Saline solution</strong> — if you have contact lens solution</li>
    <li>❌ Do NOT put it in water, tissue, or let it dry out</li>
  </ul>
</li>
<li style="color:#F7BA18;font-weight:700;">CALL US: <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;">${CLINIC_TEL}</a> — We'll prepare for your arrival</li>
</ol>` },
      { heading: '⏱️ Time Is Everything', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Time After Injury</th><th style="padding:10px 12px;text-align:left;">Success Rate</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);color:#F7BA18;font-weight:700;">Within 30 minutes</td><td style="padding:8px 12px;color:#4ade80;font-weight:700;">Up to 90% success</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">30-60 minutes</td><td style="padding:8px 12px;">50-70% success</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">1-2 hours (kept moist)</td><td style="padding:8px 12px;">20-40% success</td></tr>
<tr><td style="padding:8px 12px;">Over 2 hours / dried out</td><td style="padding:8px 12px;color:#ff6b6b;">Very low chance</td></tr>
</table>` },
      { heading: '🏥 Our Emergency Reimplantation Process', content: `<ol>
<li><strong>Immediate assessment</strong> — check the tooth and socket condition</li>
<li><strong>Cleaning</strong> — gently clean the tooth and socket</li>
<li><strong>Reimplantation</strong> — carefully place the tooth back in position</li>
<li><strong>Splinting</strong> — wire splint to hold the tooth in place for 1-2 weeks</li>
<li><strong>Root canal</strong> — typically needed later (we can schedule or refer to your home dentist)</li>
</ol>` },
      { heading: '📍 We\'re in Myeongdong — Get Here Fast', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>🚇 Hoehyeon Station Exit 1 — 2 min walk</p>
<p>🚕 Tell taxi driver: "회현역 1번출구" (Hoehyeon-yeok 1-beon chulgu)</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;font-size:1.2rem;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'Can a knocked-out adult tooth really be saved?', a: 'Yes! If the tooth is kept moist and reimplanted within 30-60 minutes, success rates are high. This is why acting fast is critical.' },
      { q: 'What if it\'s a baby tooth that was knocked out?', a: 'Baby teeth are NOT reimplanted. But you should still see a dentist to check for damage to the developing adult teeth underneath.' },
      { q: 'I can\'t find the tooth — what now?', a: 'Come in immediately anyway. We\'ll assess the socket, control bleeding, and discuss replacement options (temporary flipper, bridge, or future implant).' }
    ],
    ctaText: 'CALL NOW — Tooth Emergency',
    ctaSubtext: 'Time is critical — keep the tooth moist, get here fast!',
    priceRange: '₩100,000 – ₩300,000'
  },

  // ===== 12. SAME-DAY CROWN =====
  {
    slug: 'same-day-dental-crown-seoul',
    lang: 'en', heroEmoji: '👑',
    title: 'Same-Day Dental Crown in Seoul — Get It Done in One Visit',
    metaDesc: 'Need a dental crown in Seoul? Happy Yein Dental near Myeongdong offers premium crowns with fast turnaround. Perfect for tourists — consultation to crown in minimal visits.',
    h1: 'Same-Day Dental Crown in Seoul — Perfect for Tourists',
    keywords: 'same day crown seoul, one day crown korea, dental crown myeongdong tourist, fast crown restoration seoul, porcelain crown seoul same day',
    introParagraph: `Need a <strong>dental crown</strong> but only in Seoul for a few days? At <strong>Happy Yein Dental Clinic</strong>, we provide rapid crown services — from consultation to crown placement in as few visits as possible. Our lab works fast, and we use premium materials (zirconia, porcelain) at prices <strong>50-70% lower than Western countries</strong>.`,
    sections: [
      { heading: '💎 Crown Options & Pricing', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Crown Type</th><th style="padding:10px 12px;text-align:left;">Cost (KRW)</th><th style="padding:10px 12px;text-align:left;">Approx. USD</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Zirconia crown (most popular)</td><td style="padding:8px 12px;">₩400,000 – ₩600,000</td><td style="padding:8px 12px;">$300 – $450</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">All-ceramic (e.max) crown</td><td style="padding:8px 12px;">₩400,000 – ₩600,000</td><td style="padding:8px 12px;">$300 – $450</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">PFM (porcelain-fused-to-metal)</td><td style="padding:8px 12px;">₩300,000 – ₩400,000</td><td style="padding:8px 12px;">$225 – $300</td></tr>
<tr><td style="padding:8px 12px;">Temporary crown (same-day)</td><td style="padding:8px 12px;">₩100,000 – ₩200,000</td><td style="padding:8px 12px;">$75 – $150</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">US crown cost: $1,000–$2,000. You save 50-70% in Korea!</p>` },
      { heading: '⏱️ Tourist-Friendly Timeline', content: `<p><strong>For short-stay tourists (1-3 days):</strong></p>
<ol>
<li>Day 1: Consultation + preparation + temporary crown</li>
<li>Day 3-5: Final crown cemented (our lab prioritizes tourist cases)</li>
</ol>
<p><strong>Alternative if you can't wait:</strong></p>
<ul>
<li>We place a durable temporary crown that lasts 3-6 months</li>
<li>Get the permanent crown from your dentist at home</li>
<li>We provide all records and digital impressions</li>
</ul>` },
      { heading: '📍 Location', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'Can I really get a crown in one visit?', a: 'We can prepare and place a strong temporary crown the same day. The permanent crown typically requires 3-5 days for our lab. For some cases, expedited 2-day turnaround is possible.' },
      { q: 'What crown material do you recommend?', a: 'Zirconia crowns offer the best combination of strength and aesthetics. For front teeth, all-ceramic (e.max) gives the most natural look.' },
      { q: 'How long will the crown last?', a: 'A well-made zirconia or ceramic crown typically lasts 10-15+ years with proper care.' }
    ],
    ctaText: 'Get Your Crown Fast',
    ctaSubtext: 'Premium materials · Tourist-friendly timeline · From ₩300,000',
    priceRange: '₩300,000 – ₩600,000'
  },

  // ===== 13. EXPAT DENTAL CARE =====
  {
    slug: 'expat-dentist-seoul',
    lang: 'en', heroEmoji: '🏠',
    title: 'Expat Dentist in Seoul — Regular & Emergency Dental Care in English',
    metaDesc: 'English-speaking dentist for expats in Seoul. Happy Yein Dental near Myeongdong. Regular check-ups, emergency care, insurance documentation. NHI accepted. Trusted by expat community.',
    h1: 'Expat Dentist in Seoul — Your Long-Term Dental Home',
    keywords: 'expat dentist seoul, english speaking dentist korea, foreigner dental care seoul, english dentist myeongdong, dental clinic for expats korea, NHI dental korea',
    introParagraph: `Living in Seoul and need a <strong>reliable English-speaking dentist</strong>? Happy Yein Dental Clinic in Myeongdong/Hoehyeon is the dental home for hundreds of expats — English teachers, corporate professionals, diplomats, and international students. We accept <strong>Korean National Health Insurance (NHI)</strong> and provide the same comprehensive care as we do for Korean patients, with <strong>English communication</strong>.`,
    sections: [
      { heading: '🌍 Why Expats Choose Us', content: `<ul>
<li>🗣️ <strong>English-speaking communication</strong> — no confusion about treatment plans</li>
<li>🏥 <strong>NHI (National Health Insurance) accepted</strong> — covered treatments at covered prices</li>
<li>📋 <strong>English documentation</strong> — for your employer, insurance, or home dentist</li>
<li>🏫 <strong>Seoul National University-trained doctors</strong> — Korea's top medical school</li>
<li>📍 <strong>Central location</strong> — easy to reach from any Seoul neighborhood</li>
<li>🔬 <strong>Full-service clinic</strong> — general, cosmetic, implants, orthodontics, root canals</li>
</ul>` },
      { heading: '📋 Korean NHI Coverage for Expats', content: `<p>If you have <strong>Korean National Health Insurance</strong> (mandatory for most employees and long-term residents), these dental services are partially or fully covered:</p>
<ul>
<li>✅ <strong>Scaling (cleaning)</strong> — 1x per year covered</li>
<li>✅ <strong>Fillings</strong> — amalgam fillings covered, resin fillings partially</li>
<li>✅ <strong>Extractions</strong> — covered</li>
<li>✅ <strong>Root canal</strong> — partially covered</li>
<li>✅ <strong>Check-up & X-ray</strong> — covered</li>
<li>ℹ️ <strong>Crowns, implants, whitening, veneers</strong> — NOT covered by NHI (but still very affordable)</li>
</ul>` },
      { heading: '📅 Recommended Schedule for Expats', content: `<ul>
<li>Every 6 months: Check-up + professional cleaning (scaling)</li>
<li>Annually: Panoramic X-ray to catch hidden problems</li>
<li>As needed: Cavity treatment, wisdom tooth assessment</li>
</ul>
<p>We keep your <strong>complete dental records</strong> in our system — no need to explain your history every visit.</p>` },
      { heading: '📍 Location & Contact', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>Mon–Fri: 09:30–18:30 | Wed: 09:30–20:00 (evening!) | Sat: 09:30–14:00</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'Do I need Korean NHI to visit?', a: 'No! We welcome all patients. NHI holders get covered rates for eligible treatments, but self-pay patients are also welcome at very affordable prices.' },
      { q: 'Can you transfer my dental records to my next dentist?', a: 'Yes! We provide X-rays (digital), treatment records, and a summary letter in English that you can bring to your next dentist when you leave Korea.' },
      { q: 'I\'m an English teacher — do you see many English speakers?', a: 'Yes! We regularly treat English teachers, corporate expats, embassy staff, and international students. English communication is available for all appointments.' },
      { q: 'Can my children come too?', a: 'Absolutely. We provide family dental care including pediatric check-ups, cavity treatment, and orthodontic assessments for children.' }
    ],
    ctaText: 'Become Our Patient Today',
    ctaSubtext: 'NHI accepted · English communication · All treatments available',
  },

  // ===== 14. DENTIST NEAR SEOUL STATION =====
  {
    slug: 'dentist-near-seoul-station',
    lang: 'en', heroEmoji: '🚂',
    title: 'Dentist Near Seoul Station — 10-Min Walk, English-Speaking',
    metaDesc: 'Need a dentist near Seoul Station? Happy Yein Dental is just 10 min walk (1 subway stop) from Seoul Station. KTX/AREX connected. English-speaking, walk-in, affordable dental care.',
    h1: 'Dentist Near Seoul Station — Just 1 Subway Stop Away',
    keywords: 'dentist near seoul station, dental clinic seoul station, teeth doctor near KTX station, dentist hoehyeon station, dental care near arex seoul',
    introParagraph: `Just arrived at Seoul Station by <strong>KTX, AREX (airport express), or subway</strong>? Need dental care before or after your journey? <strong>Happy Yein Dental Clinic</strong> is just <strong>1 subway stop from Seoul Station</strong> (take Line 4 one stop to Hoehyeon) or a <strong>10-minute walk</strong>. Perfect for travelers who need quick dental care near a major transit hub.`,
    sections: [
      { heading: '🚇 How to Get Here from Seoul Station', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">🚇 By Subway (Fastest):</strong><br>
Seoul Station → Line 4 → 1 stop → Hoehyeon Station → Exit 1 → 2 min walk<br>
<span style="font-size:0.85rem;color:#aaa;">Total: 5-7 minutes</span>
</div>
<div style="background:rgba(255,255,255,0.02);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>🚶 Walking:</strong><br>
Seoul Station Gate 4 → Walk south along Namdaemun-ro → Turn right at Namdaemun-ro 9-gil → Hyodeok Building 3F<br>
<span style="font-size:0.85rem;color:#aaa;">Total: 10-12 minutes</span>
</div>
<div style="background:rgba(255,255,255,0.02);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>🚕 By Taxi:</strong><br>
Tell driver: "회현역 1번출구" (Hoehyeon-yeok 1-beon chulgu)<br>
<span style="font-size:0.85rem;color:#aaa;">₩4,000-5,000 from Seoul Station</span>
</div>
</div>` },
      { heading: '✈️ Perfect for Travelers', content: `<ul>
<li>🛬 <strong>Airport connection</strong> — AREX from Incheon/Gimpo → Seoul Station → 1 stop to us</li>
<li>🚅 <strong>KTX travelers</strong> — dental emergency during a cross-country trip? Stop by!</li>
<li>🧳 <strong>Luggage-friendly</strong> — we have space for bags while you get treated</li>
<li>⏰ <strong>Quick visits possible</strong> — check-up in 30 min, whitening in 1 hour</li>
</ul>` },
      { heading: '📍 Clinic Details', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>Mon–Fri: 09:30–18:30 | Wed: 09:30–20:00 | Sat: 09:30–14:00</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'Can I store my luggage while getting dental treatment?', a: 'Yes, we have space in our waiting area for bags and suitcases. You can also use Seoul Station\'s coin lockers before walking over.' },
      { q: 'How far is it from Incheon Airport?', a: 'Take AREX Express to Seoul Station (43 min), then Line 4 one stop to Hoehyeon Station (3 min). Total: about 50 minutes door to door.' },
      { q: 'I have a 4-hour layover at Seoul Station — can I get dental work done?', a: 'Yes! Check-up + cleaning takes 30-45 min, whitening takes 1 hour, emergency treatment takes 30-60 min. You have time!' }
    ],
    ctaText: 'Visit After Your Train Ride',
    ctaSubtext: '1 stop from Seoul Station · Walk-in welcome',
  },

  // ===== 15. DENTAL SEDATION / ANXIETY =====
  {
    slug: 'dental-sedation-anxiety-seoul',
    lang: 'en', heroEmoji: '😌',
    title: 'Dental Sedation for Nervous Patients — Painless Dentistry Seoul',
    metaDesc: 'Dental anxiety? Scared of the dentist? Happy Yein Dental in Seoul offers sedation options for nervous patients. Painless dentistry with gentle care. English-speaking, foreigner-friendly.',
    h1: 'Dental Anxiety & Sedation — Painless Dentistry in Seoul',
    keywords: 'dental sedation seoul, painless dentist korea, dental anxiety korea, sedation dentistry myeongdong, scared of dentist seoul, gentle dental care korea foreigner',
    introParagraph: `We get it — <strong>dental anxiety is real</strong>, and it doesn't take a vacation just because you're in Seoul. At <strong>Happy Yein Dental Clinic</strong>, we provide <strong>gentle, patient-centered care</strong> with sedation options for nervous patients. Our doctors are trained to work with anxious patients, and we take the time to explain everything in English before any treatment.`,
    sections: [
      { heading: '😌 Our Approach to Nervous Patients', content: `<ul>
<li>🗣️ <strong>Full explanation before treatment</strong> — no surprises, everything in English</li>
<li>🤝 <strong>Go at your pace</strong> — we stop whenever you need a break</li>
<li>💉 <strong>Painless anesthesia technique</strong> — topical numbing gel before injection</li>
<li>🎧 <strong>Distractions available</strong> — music, TV, stress balls</li>
<li>👨‍⚕️ <strong>Experienced, gentle doctors</strong> — trained in patient comfort techniques</li>
</ul>` },
      { heading: '💊 Sedation Options', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">Local Anesthesia (Standard)</strong><br>
Numbing injection — you're awake but feel no pain. Used for all procedures. Topical gel applied first so you don't feel the needle.
</div>
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">Oral Sedation (Available)</strong><br>
Anti-anxiety medication taken before your appointment. You'll be relaxed and drowsy but conscious. Need someone to accompany you.
</div>
<div style="background:rgba(255,255,255,0.02);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>IV Sedation (For extensive procedures)</strong><br>
Conscious sedation via IV drip. You'll be deeply relaxed and may not remember the procedure. Available for implant surgery and complex extractions.
</div>
</div>` },
      { heading: '🌟 Patient Reviews', content: `<div style="background:rgba(255,255,255,0.02);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);margin-bottom:12px;">
<p style="font-style:italic;color:#B5B0A8;">"I haven't been to a dentist in 5 years because of my phobia. The doctors at Happy Yein were incredibly patient and gentle. Didn't feel a thing!"</p>
<p style="font-size:0.8rem;color:#888;margin-top:8px;">— Michael, English teacher, Gangnam</p>
</div>
<div style="background:rgba(255,255,255,0.02);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<p style="font-style:italic;color:#B5B0A8;">"They explained every step before doing it. The numbing gel before the injection made a huge difference. Best dental experience I've ever had."</p>
<p style="font-size:0.8rem;color:#888;margin-top:8px;">— Sarah, digital nomad, visiting from Australia</p>
</div>` },
      { heading: '📍 Comfortable Clinic Environment', content: `<p><strong>3F Hyodeok Bldg, 51 Namdaemun-ro 9-gil, Jung-gu, Seoul</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a> — Let us know about your dental anxiety when you call</p>` }
    ],
    faq: [
      { q: 'I\'m extremely scared of dentists — will you judge me?', a: 'Absolutely not! Dental phobia is incredibly common (affects 36% of people). Our doctors have extensive experience with anxious patients and will never judge or rush you.' },
      { q: 'Can I bring a friend for support?', a: 'Yes! You\'re welcome to bring a friend or family member into the treatment room for support and translation if needed.' },
      { q: 'How much does sedation cost?', a: 'Local anesthesia is included in all treatment costs. Oral sedation adds ₩30,000-50,000. IV sedation adds ₩200,000-300,000 depending on duration.' },
      { q: 'I haven\'t been to a dentist in years — will it be bad?', a: 'No judgment! We see patients who haven\'t visited in years all the time. We\'ll do a gentle, thorough check-up and discuss priorities. You don\'t have to fix everything in one visit.' }
    ],
    ctaText: 'Book a Gentle Visit',
    ctaSubtext: 'No judgment · Sedation available · Your comfort is our priority',
  },
]
