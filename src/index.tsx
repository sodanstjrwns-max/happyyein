import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>행복한예인치과 | 13년의 신뢰, 한자리의 약속</title>
<meta name="description" content="서울 시청역 5분, 13년간 한자리에서 쌓아온 신뢰. 발치즉시 임플란트, 보존치료, 심미치료 전문. 행복한예인치과 한승대 원장">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>
:root {
  --gold: #F7BA18;
  --gold-light: #FDD85D;
  --gold-dark: #D4960A;
  --gold-pale: #FFF8E1;
  --dark: #1A1A1A;
  --dark-warm: #2C2418;
  --gray-900: #1a1a2e;
  --gray-800: #333;
  --gray-600: #666;
  --gray-400: #999;
  --gray-200: #e8e8e8;
  --gray-100: #f5f5f0;
  --white: #FFFFFF;
  --cream: #FDFBF7;
  --warm-white: #FAF8F5;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  color: var(--dark);
  background: var(--white);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ==================== CUSTOM CURSOR ==================== */
.cursor-dot {
  width: 8px; height: 8px;
  background: var(--gold);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  transition: transform 0.1s;
  mix-blend-mode: difference;
}
.cursor-ring {
  width: 40px; height: 40px;
  border: 2px solid var(--gold);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 99998;
  transition: all 0.15s ease-out;
  opacity: 0.5;
}

/* ==================== NAVIGATION ==================== */
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
nav.scrolled {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  padding: 12px 0;
  box-shadow: 0 1px 30px rgba(0,0,0,0.06);
}
.nav-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.nav-logo img {
  height: 36px;
}
.nav-logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--dark);
  letter-spacing: -0.5px;
}
.nav-logo-text span { color: var(--gold); }

.nav-links {
  display: flex;
  gap: 36px;
  align-items: center;
}
.nav-links a {
  text-decoration: none;
  color: var(--gray-600);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: -0.3px;
  position: relative;
  transition: color 0.3s;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gold);
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-links a:hover { color: var(--dark); }
.nav-links a:hover::after { width: 100%; }

.nav-cta {
  background: var(--gold) !important;
  color: var(--white) !important;
  padding: 10px 24px !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  transition: all 0.3s !important;
}
.nav-cta:hover {
  background: var(--gold-dark) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(247, 186, 24, 0.4);
}
.nav-cta::after { display: none !important; }

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 20px;
  position: relative;
}
.mobile-menu-btn span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--dark);
  position: absolute;
  transition: all 0.3s;
}
.mobile-menu-btn span:nth-child(1) { top: 0; }
.mobile-menu-btn span:nth-child(2) { top: 50%; transform: translateY(-50%); }
.mobile-menu-btn span:nth-child(3) { bottom: 0; }
.mobile-menu-btn.active span:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
.mobile-menu-btn.active span:nth-child(2) { opacity: 0; }
.mobile-menu-btn.active span:nth-child(3) { bottom: 50%; transform: translateY(50%) rotate(-45deg); }

.mobile-menu {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100vh;
  background: var(--white);
  z-index: 999;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  opacity: 0;
  transition: opacity 0.4s;
}
.mobile-menu.active { display: flex; opacity: 1; }
.mobile-menu a {
  text-decoration: none;
  color: var(--dark);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* ==================== HERO ==================== */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--cream) 0%, var(--white) 50%, var(--gold-pale) 100%);
}
.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(247,186,24,0.08) 0%, transparent 70%);
  border-radius: 50%;
}
.hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(247,186,24,0.05) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 40px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(247,186,24,0.1);
  border: 1px solid rgba(247,186,24,0.2);
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.85rem;
  color: var(--gold-dark);
  font-weight: 600;
  margin-bottom: 24px;
  animation: fadeInUp 0.8s ease-out;
}
.hero-badge i { font-size: 0.75rem; }

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -2px;
  margin-bottom: 28px;
  animation: fadeInUp 0.8s ease-out 0.1s both;
}
.hero-title .line { display: block; }
.hero-title .gold { color: var(--gold); }
.hero-title .serif {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
}

.hero-sub {
  font-size: 1.15rem;
  color: var(--gray-600);
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 480px;
  font-weight: 300;
  letter-spacing: -0.3px;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.hero-actions {
  display: flex;
  gap: 16px;
  animation: fadeInUp 0.8s ease-out 0.3s both;
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--gold);
  color: var(--white);
  padding: 16px 36px;
  border-radius: 60px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(247,186,24,0.35);
}
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: var(--dark);
  padding: 16px 36px;
  border-radius: 60px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid var(--gray-200);
  transition: all 0.3s;
  cursor: pointer;
}
.btn-outline:hover {
  border-color: var(--gold);
  color: var(--gold-dark);
  background: var(--gold-pale);
}

.hero-stats {
  display: flex;
  gap: 40px;
  margin-top: 48px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}
.hero-stat .number {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--gold);
  font-family: 'Playfair Display', serif;
}
.hero-stat .label {
  font-size: 0.82rem;
  color: var(--gray-400);
  font-weight: 400;
  margin-top: 4px;
}

.hero-image {
  position: relative;
  animation: fadeInRight 1s ease-out 0.3s both;
}
.hero-image-main {
  width: 100%;
  max-width: 520px;
  border-radius: 30px;
  object-fit: cover;
  aspect-ratio: 3/4;
  box-shadow: 0 40px 80px rgba(0,0,0,0.1);
}
.hero-image-float {
  position: absolute;
  background: var(--white);
  border-radius: 20px;
  padding: 20px 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.08);
  animation: float 3s ease-in-out infinite;
}
.hero-image-float.top-right {
  top: 40px;
  right: -30px;
}
.hero-image-float.bottom-left {
  bottom: 60px;
  left: -30px;
}
.float-icon {
  font-size: 1.5rem;
  margin-bottom: 8px;
}
.float-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--dark);
}
.float-desc {
  font-size: 0.75rem;
  color: var(--gray-400);
  margin-top: 2px;
}

/* ==================== PHILOSOPHY SECTION ==================== */
.philosophy {
  padding: 160px 40px;
  background: var(--dark-warm);
  color: var(--white);
  position: relative;
  overflow: hidden;
}
.philosophy::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F7BA18' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.philosophy-inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--gold);
  font-weight: 600;
  margin-bottom: 24px;
}
.section-label::before {
  content: '';
  width: 30px;
  height: 1px;
  background: var(--gold);
}
.philosophy-quote {
  font-size: 2.8rem;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: -1.5px;
  max-width: 900px;
  margin-bottom: 60px;
}
.philosophy-quote em {
  font-family: 'Playfair Display', serif;
  color: var(--gold);
  font-style: italic;
}
.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 60px;
}
.philosophy-card {
  padding: 40px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  transition: all 0.4s;
}
.philosophy-card:hover {
  background: rgba(255,255,255,0.08);
  transform: translateY(-4px);
}
.philosophy-card-icon {
  width: 48px;
  height: 48px;
  background: rgba(247,186,24,0.15);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--gold);
  margin-bottom: 24px;
}
.philosophy-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}
.philosophy-card p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.6);
  font-weight: 300;
}

/* ==================== TREATMENTS ==================== */
.treatments {
  padding: 160px 40px;
  background: var(--white);
}
.treatments-inner {
  max-width: 1400px;
  margin: 0 auto;
}
.section-header {
  text-align: center;
  margin-bottom: 80px;
}
.section-header .section-label {
  justify-content: center;
}
.section-title {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: -2px;
  margin-bottom: 20px;
  line-height: 1.3;
}
.section-title .gold { color: var(--gold); }
.section-desc {
  font-size: 1.05rem;
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: 300;
}

.treatment-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.treatment-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: var(--gray-100);
  padding: 48px;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: 1px solid transparent;
}
.treatment-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.08);
  border-color: rgba(247,186,24,0.2);
}
.treatment-card.featured {
  background: linear-gradient(135deg, var(--gold) 0%, #E8A708 100%);
  color: var(--white);
  grid-column: span 2;
  min-height: 400px;
  flex-direction: row;
  align-items: center;
  gap: 60px;
}
.treatment-number {
  font-family: 'Playfair Display', serif;
  font-size: 5rem;
  font-weight: 700;
  opacity: 0.1;
  position: absolute;
  top: 30px;
  right: 40px;
  line-height: 1;
}
.treatment-card.featured .treatment-number {
  opacity: 0.2;
  color: var(--white);
}
.treatment-icon {
  width: 56px;
  height: 56px;
  background: rgba(247,186,24,0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--gold);
  margin-bottom: 24px;
}
.treatment-card.featured .treatment-icon {
  background: rgba(255,255,255,0.2);
  color: var(--white);
}
.treatment-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}
.treatment-card .subtitle {
  font-size: 0.85rem;
  color: var(--gold-dark);
  font-weight: 600;
  margin-bottom: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.treatment-card.featured .subtitle {
  color: rgba(255,255,255,0.8);
}
.treatment-card p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--gray-600);
  font-weight: 300;
}
.treatment-card.featured p {
  color: rgba(255,255,255,0.85);
}
.treatment-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}
.treatment-tag {
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  background: rgba(247,186,24,0.08);
  color: var(--gold-dark);
}
.treatment-card.featured .treatment-tag {
  background: rgba(255,255,255,0.2);
  color: var(--white);
}
.treatment-featured-img {
  flex-shrink: 0;
  width: 320px;
  height: 320px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

/* ==================== TEAM ==================== */
.team {
  padding: 160px 40px;
  background: var(--warm-white);
}
.team-inner {
  max-width: 1400px;
  margin: 0 auto;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.team-card {
  background: var(--white);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s;
  border: 1px solid var(--gray-200);
}
.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.08);
  border-color: var(--gold);
}
.team-card.primary {
  border-color: var(--gold);
  box-shadow: 0 10px 40px rgba(247,186,24,0.1);
}
.team-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
}
.team-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.team-card:hover .team-img-wrap img {
  transform: scale(1.05);
}
.team-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--gold);
  color: var(--white);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
}
.team-info {
  padding: 28px;
}
.team-info h3 {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}
.team-info .role {
  font-size: 0.85rem;
  color: var(--gold-dark);
  font-weight: 600;
  margin-bottom: 16px;
}
.team-info .credentials {
  list-style: none;
  font-size: 0.82rem;
  color: var(--gray-600);
  line-height: 1.8;
}
.team-info .credentials li {
  padding-left: 16px;
  position: relative;
}
.team-info .credentials li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 5px;
  height: 5px;
  background: var(--gold);
  border-radius: 50%;
}

/* ==================== EXPERIENCE SECTION ==================== */
.experience {
  padding: 160px 40px;
  background: var(--white);
}
.experience-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.experience-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.experience-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.experience-images img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 1;
}
.experience-images img:first-child {
  grid-column: span 2;
  aspect-ratio: 16/9;
}
.exp-content h2 {
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: -1.5px;
  margin-bottom: 24px;
  line-height: 1.3;
}
.exp-content h2 .gold { color: var(--gold); }
.exp-text {
  font-size: 1rem;
  line-height: 1.9;
  color: var(--gray-600);
  font-weight: 300;
  margin-bottom: 36px;
}
.exp-features {
  list-style: none;
}
.exp-features li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--gray-200);
}
.exp-features li:last-child { border-bottom: none; }
.exp-feature-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: var(--gold-pale);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  font-size: 1rem;
}
.exp-feature-text h4 {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.exp-feature-text p {
  font-size: 0.85rem;
  color: var(--gray-400);
  font-weight: 300;
}

/* ==================== GALLERY ==================== */
.gallery {
  padding: 120px 0;
  background: var(--cream);
  overflow: hidden;
}
.gallery-header {
  text-align: center;
  padding: 0 40px;
  margin-bottom: 60px;
}
.gallery-scroll {
  display: flex;
  gap: 20px;
  padding: 0 40px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.gallery-scroll::-webkit-scrollbar { display: none; }
.gallery-item {
  flex-shrink: 0;
  width: 360px;
  height: 280px;
  border-radius: 20px;
  overflow: hidden;
  scroll-snap-align: start;
  position: relative;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.gallery-item:hover img {
  transform: scale(1.05);
}
.gallery-item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
  color: var(--white);
}
.gallery-item-overlay span {
  font-size: 0.85rem;
  font-weight: 600;
}

/* ==================== INFO SECTION ==================== */
.info {
  padding: 160px 40px;
  background: var(--white);
}
.info-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}
.info-map {
  border-radius: 24px;
  overflow: hidden;
  height: 480px;
  background: var(--gray-100);
}
.info-map iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
.info-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info-item {
  padding: 24px 0;
  border-bottom: 1px solid var(--gray-200);
}
.info-item:last-child { border-bottom: none; }
.info-item-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gold-dark);
  font-weight: 600;
  margin-bottom: 10px;
}
.info-item-value {
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.7;
  color: var(--dark);
}
.info-item-value small {
  display: block;
  font-size: 0.85rem;
  color: var(--gray-400);
  font-weight: 300;
  margin-top: 4px;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}
.schedule-table td {
  padding: 8px 0;
  font-size: 0.9rem;
  border-bottom: 1px solid var(--gray-200);
  vertical-align: top;
}
.schedule-table td:first-child {
  font-weight: 600;
  width: 80px;
  color: var(--dark);
}
.schedule-table td:last-child {
  color: var(--gray-600);
}
.schedule-table .rest {
  color: var(--gold-dark);
  font-weight: 500;
}

/* ==================== CONTACT CTA ==================== */
.contact-cta {
  padding: 120px 40px;
  background: linear-gradient(135deg, var(--dark-warm) 0%, #1a1815 100%);
  text-align: center;
  color: var(--white);
  position: relative;
  overflow: hidden;
}
.contact-cta::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(247,186,24,0.1) 0%, transparent 70%);
  border-radius: 50%;
}
.contact-cta-inner {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.contact-cta h2 {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: -2px;
  margin-bottom: 20px;
  line-height: 1.3;
}
.contact-cta h2 .gold { color: var(--gold); }
.contact-cta p {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  margin-bottom: 40px;
  font-weight: 300;
}
.contact-btns {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
.contact-btn-phone {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--gold);
  color: var(--white);
  padding: 18px 40px;
  border-radius: 60px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s;
}
.contact-btn-phone:hover {
  background: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(247,186,24,0.35);
}
.contact-btn-naver {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #03C75A;
  color: var(--white);
  padding: 18px 40px;
  border-radius: 60px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s;
}
.contact-btn-naver:hover {
  background: #02b350;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(3,199,90,0.35);
}

/* ==================== FOOTER ==================== */
footer {
  padding: 60px 40px;
  background: var(--dark);
  color: rgba(255,255,255,0.4);
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}
.footer-left {
  font-size: 0.82rem;
  line-height: 1.8;
}
.footer-left strong {
  color: rgba(255,255,255,0.7);
}
.footer-right {
  display: flex;
  gap: 24px;
}
.footer-right a {
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  font-size: 0.82rem;
  transition: color 0.3s;
}
.footer-right a:hover {
  color: var(--gold);
}

/* ==================== ANIMATIONS ==================== */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* ==================== SCROLL PROGRESS ==================== */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--gold);
  z-index: 10000;
  transition: width 0.1s;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .hero-title { font-size: 2.6rem; }
  .hero-image { display: flex; justify-content: center; }
  .hero-image-main { max-width: 400px; }
  .hero-image-float { display: none; }
  .philosophy-quote { font-size: 2rem; }
  .philosophy-grid { grid-template-columns: 1fr; }
  .treatment-card.featured { grid-column: span 2; flex-direction: column; }
  .treatment-featured-img { width: 100%; height: 240px; }
  .team-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
  .experience-grid { grid-template-columns: 1fr; gap: 40px; }
  .info-grid { grid-template-columns: 1fr; }
  .info-map { height: 300px; }
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-menu-btn { display: block; }
  .hero { min-height: auto; }
  .hero-inner { padding: 100px 24px 60px; }
  .hero-title { font-size: 2rem; }
  .hero-sub { font-size: 1rem; }
  .hero-actions { flex-direction: column; }
  .hero-stats { gap: 24px; }
  .hero-stat .number { font-size: 1.6rem; }
  .philosophy { padding: 100px 24px; }
  .philosophy-quote { font-size: 1.5rem; }
  .treatments { padding: 100px 24px; }
  .treatment-grid { grid-template-columns: 1fr; }
  .treatment-card.featured { grid-column: span 1; }
  .section-title { font-size: 2rem; }
  .team { padding: 100px 24px; }
  .experience { padding: 100px 24px; }
  .gallery { padding: 80px 0; }
  .gallery-item { width: 280px; height: 220px; }
  .info { padding: 100px 24px; }
  .contact-cta { padding: 80px 24px; }
  .contact-cta h2 { font-size: 2rem; }
  .contact-btns { flex-direction: column; align-items: center; }
  footer { padding: 40px 24px; }
  .footer-inner { flex-direction: column; text-align: center; }
  .exp-content h2 { font-size: 1.8rem; }
  .cursor-dot, .cursor-ring { display: none; }
}

@media (max-width: 480px) {
  .hero-title { font-size: 1.7rem; letter-spacing: -1px; }
  .hero-stats { flex-wrap: wrap; gap: 20px; }
  .hero-stat .number { font-size: 1.4rem; }
  .section-title { font-size: 1.6rem; }
  .philosophy-quote { font-size: 1.3rem; }
  .treatment-card { padding: 32px; min-height: 280px; }
  .treatment-card.featured { min-height: 300px; }
  .contact-cta h2 { font-size: 1.6rem; }
}
</style>
</head>
<body>

<!-- Scroll Progress -->
<div class="scroll-progress" id="scrollProgress"></div>

<!-- Custom Cursor -->
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>

<!-- Navigation -->
<nav id="navbar">
  <div class="nav-inner">
    <a href="#" class="nav-logo">
      <img src="https://www.genspark.ai/api/files/s/3kOiUrPx" alt="행복한예인치과 로고">
    </a>
    <div class="nav-links">
      <a href="#philosophy">원장 소개</a>
      <a href="#treatments">진료 안내</a>
      <a href="#team">의료진</a>
      <a href="#experience">진료 경험</a>
      <a href="#info">오시는 길</a>
      <a href="tel:02-756-2828" class="nav-cta"><i class="fas fa-phone-alt"></i> 예약 상담</a>
    </div>
    <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="메뉴">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobileMenu">
  <a href="#philosophy" onclick="closeMobile()">원장 소개</a>
  <a href="#treatments" onclick="closeMobile()">진료 안내</a>
  <a href="#team" onclick="closeMobile()">의료진</a>
  <a href="#experience" onclick="closeMobile()">진료 경험</a>
  <a href="#info" onclick="closeMobile()">오시는 길</a>
  <a href="tel:02-756-2828" class="btn-primary" onclick="closeMobile()"><i class="fas fa-phone-alt"></i> 예약 상담</a>
</div>

<!-- Hero -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-content">
      <div class="hero-badge"><i class="fas fa-map-marker-alt"></i> 시청역 4번 출구 도보 5분</div>
      <h1 class="hero-title">
        <span class="line">13년 전의 진료를</span>
        <span class="line">오늘까지 <span class="gold">책임</span>지며,</span>
        <span class="line">함께 <span class="serif">나이 들어가는</span></span>
        <span class="line"><span class="gold">주치의</span>입니다.</span>
      </h1>
      <p class="hero-sub">
        바쁜 직장 생활 속에서 치료를 미루고 계셨나요?<br>
        과장 없이, 숨김 없이. 내 가족에게 권할 수 없는 치료는 하지 않습니다.
      </p>
      <div class="hero-actions">
        <a href="tel:02-756-2828" class="btn-primary">
          <i class="fas fa-phone-alt"></i> 02-756-2828
        </a>
        <a href="#treatments" class="btn-outline">
          진료 안내 <i class="fas fa-arrow-right"></i>
        </a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="number">13+</div>
          <div class="label">년 한자리 진료</div>
        </div>
        <div class="hero-stat">
          <div class="number">458</div>
          <div class="label">건 환자 리뷰</div>
        </div>
        <div class="hero-stat">
          <div class="number">80%+</div>
          <div class="label">발치즉시 임플란트</div>
        </div>
      </div>
    </div>
    <div class="hero-image">
      <img class="hero-image-main" src="https://www.genspark.ai/api/files/s/ztzdipBZ" alt="한승대 대표원장">
      <div class="hero-image-float top-right">
        <div class="float-icon">
          <i class="fas fa-award" style="color:var(--gold)"></i>
        </div>
        <div class="float-title">통합치의학과 전문의</div>
        <div class="float-desc">경희대 치의학 박사</div>
      </div>
      <div class="hero-image-float bottom-left">
        <div class="float-icon">
          <i class="fas fa-heart" style="color:var(--gold)"></i>
        </div>
        <div class="float-title">변하지 않는 그 자리</div>
        <div class="float-desc">2013년부터 지금까지</div>
      </div>
    </div>
  </div>
</section>

<!-- Philosophy -->
<section class="philosophy" id="philosophy">
  <div class="philosophy-inner">
    <div class="section-label">PHILOSOPHY</div>
    <div class="philosophy-quote reveal">
      내 가족에게 <em>권할 수 없는</em> 치료는<br>
      시작도 하지 않습니다.<br>
      <span style="font-size:0.6em;color:rgba(255,255,255,0.4);font-weight:400;">
        단기적인 매출보다 장기적인 신뢰를 우선합니다 &mdash; 한승대
      </span>
    </div>
    <div class="philosophy-grid">
      <div class="philosophy-card reveal">
        <div class="philosophy-card-icon"><i class="fas fa-handshake"></i></div>
        <h3>신뢰</h3>
        <p>"원장님은 믿거든요" 라는 말씀을 많이 듣습니다. 과장하지 않고 숨김없는 진료, 불필요한 설명이나 과장 없이 진심을 전합니다.</p>
      </div>
      <div class="philosophy-card reveal">
        <div class="philosophy-card-icon"><i class="fas fa-hand-holding-heart"></i></div>
        <h3>배려</h3>
        <p>환자의 시간, 상황, 선택을 존중합니다. 사회초년생들의 부담을 줄이기 위해 진료 할인율을 높이는 등 실질적인 배려를 실천합니다.</p>
      </div>
      <div class="philosophy-card reveal">
        <div class="philosophy-card-icon"><i class="fas fa-infinity"></i></div>
        <h3>지속가능성</h3>
        <p>환자, 직원, 병원 모두 오래 갈 수 있는 방향을 모색합니다. 결과보다 치료 과정에서의 경험을 더 중요하게 생각합니다.</p>
      </div>
    </div>
  </div>
</section>

<!-- Treatments -->
<section class="treatments" id="treatments">
  <div class="treatments-inner">
    <div class="section-header">
      <div class="section-label">TREATMENTS</div>
      <h2 class="section-title reveal">각 상황에 맞는 <span class="gold">정확한 치료</span></h2>
      <p class="section-desc reveal">빠른 치료, 빠른 선택보다 환자 한 분 한 분의 상황에 맞는 최선의 치료를 제안합니다.</p>
    </div>
    <div class="treatment-grid">
      <div class="treatment-card featured reveal">
        <div>
          <div class="treatment-number">01</div>
          <div class="treatment-icon"><i class="fas fa-bolt"></i></div>
          <div class="subtitle">Core Treatment</div>
          <h3>발치즉시 임플란트</h3>
          <p>발치와 동시에 임플란트를 식립하여 치료 기간을 획기적으로 단축합니다. 80% 이상의 케이스에서 발치즉시 식립을 시행하며, 고난이도 케이스도 가능합니다. 환자분의 시간을 아끼고 불편감을 최소화합니다.</p>
          <div class="treatment-tags">
            <span class="treatment-tag">치료기간 단축</span>
            <span class="treatment-tag">고난이도 가능</span>
            <span class="treatment-tag">80%+ 즉시식립</span>
          </div>
        </div>
        <img class="treatment-featured-img" src="https://www.genspark.ai/api/files/s/4QFpv2o4" alt="임플란트 시술">
      </div>
      <div class="treatment-card reveal">
        <div class="treatment-number">02</div>
        <div class="treatment-icon"><i class="fas fa-tooth"></i></div>
        <div class="subtitle">Preservation</div>
        <h3>치아 보존 치료</h3>
        <p>보존과 전문의가 직접 치료하는 치아살리는 보존 중심의 신경치료 및 보존치료. 최대한 자연 치아를 살리는 방향으로 치료합니다.</p>
        <div class="treatment-tags">
          <span class="treatment-tag">보존과 전문의</span>
          <span class="treatment-tag">자연치아 보존</span>
        </div>
      </div>
      <div class="treatment-card reveal">
        <div class="treatment-number">03</div>
        <div class="treatment-icon"><i class="fas fa-sparkles"></i></div>
        <div class="subtitle">Aesthetic</div>
        <h3>앞니 심미 치료</h3>
        <p>치아 삭제량을 최소화하는 전치부 레진 및 라미네이트 치료. 자연스럽고 아름다운 미소를 위한 심미 수복에 진심을 다합니다.</p>
        <div class="treatment-tags">
          <span class="treatment-tag">최소 삭제</span>
          <span class="treatment-tag">레진 / 라미네이트</span>
        </div>
      </div>
      <div class="treatment-card reveal">
        <div class="treatment-number">04</div>
        <div class="treatment-icon"><i class="fas fa-smile-beam"></i></div>
        <div class="subtitle">Orthodontics</div>
        <h3>치아 교정</h3>
        <p>교정과 전문의의 체계적인 교정 치료. 투명교정부터 설측교정까지 환자분의 라이프스타일에 맞는 교정 방법을 제안합니다.</p>
        <div class="treatment-tags">
          <span class="treatment-tag">교정과 전문의</span>
          <span class="treatment-tag">투명교정 / 설측교정</span>
        </div>
      </div>
      <div class="treatment-card reveal">
        <div class="treatment-number">05</div>
        <div class="treatment-icon"><i class="fas fa-shield-alt"></i></div>
        <div class="subtitle">General</div>
        <h3>일반 / 예방 치료</h3>
        <p>정기검진, 스케일링, 충치치료 등 기본에 충실한 치료. 치과가 무서운 분들도 편안하게 내원할 수 있는 환경을 만들었습니다.</p>
        <div class="treatment-tags">
          <span class="treatment-tag">정기검진</span>
          <span class="treatment-tag">편안한 진료</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Team -->
<section class="team" id="team">
  <div class="team-inner">
    <div class="section-header">
      <div class="section-label">DOCTORS</div>
      <h2 class="section-title reveal"><span class="gold">협진 시스템</span>으로<br>더욱 신뢰감 있는 진료</h2>
      <p class="section-desc reveal">각 분야 전문의가 함께하여 최적의 치료 결과를 만들어냅니다.</p>
    </div>
    <div class="team-grid">
      <div class="team-card primary reveal">
        <div class="team-img-wrap">
          <img src="https://www.genspark.ai/api/files/s/1xv530Ip" alt="한승대 대표원장">
          <div class="team-badge">대표원장</div>
        </div>
        <div class="team-info">
          <h3>한승대 원장</h3>
          <div class="role">통합치의학과 전문의 / 치의학 박사</div>
          <ul class="credentials">
            <li>보건복지부 인증 통합치의학과 전문의</li>
            <li>경희대 치의학전문대학원 치의학박사 Ph.D</li>
            <li>고려대학교 졸업</li>
            <li>NYU Implant Institute Course 수료</li>
            <li>대한악안면임플란트학회 정회원</li>
          </ul>
        </div>
      </div>
      <div class="team-card reveal">
        <div class="team-img-wrap" style="background:linear-gradient(135deg,var(--gold-pale),var(--gray-100));display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;">
            <i class="fas fa-user-md" style="font-size:4rem;color:var(--gold);opacity:0.3;"></i>
          </div>
        </div>
        <div class="team-info">
          <h3>신정희 원장</h3>
          <div class="role">치과보존과 전문의</div>
          <ul class="credentials">
            <li>경희대학교 치과대학 졸업</li>
            <li>경희대학교 대학원 치의학 박사</li>
            <li>보건복지부인증 치과보존과 전문의</li>
            <li>경희대 치과보존과 레지던트 수료</li>
            <li>경희대 치과보존과 외래강사 역임</li>
          </ul>
        </div>
      </div>
      <div class="team-card reveal">
        <div class="team-img-wrap" style="background:linear-gradient(135deg,var(--gold-pale),var(--gray-100));display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;">
            <i class="fas fa-user-md" style="font-size:4rem;color:var(--gold);opacity:0.3;"></i>
          </div>
        </div>
        <div class="team-info">
          <h3>박현미 원장</h3>
          <div class="role">교정과 전문의</div>
          <ul class="credentials">
            <li>연세대학교 졸업</li>
            <li>연세대학교 치의학대학원 교정과 석사</li>
            <li>경희대학교 치과병원 인턴</li>
            <li>인비절라인 투명교정 수료</li>
            <li>Columbia University CE 수료</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Experience -->
<section class="experience" id="experience">
  <div class="experience-inner">
    <div class="experience-grid">
      <div class="experience-images reveal">
        <img src="https://www.genspark.ai/api/files/s/9Tv8JF9w" alt="상담 장면">
        <img src="https://www.genspark.ai/api/files/s/vxRijLs3" alt="X-ray 설명">
        <img src="https://www.genspark.ai/api/files/s/tqlF25HE" alt="진료 장면">
      </div>
      <div class="exp-content reveal">
        <div class="section-label">EXPERIENCE</div>
        <h2>치과를 다녀간 뒤<br><span class="gold">안도감</span>을 느끼셨으면 합니다</h2>
        <p class="exp-text">
          결과도 중요하지만, 치료를 받는 과정에서의 경험이 더 중요하다고 생각합니다.
          불필요한 치료를 지양하고, 환자분들이 불안해하지 않고 편하게 내원할 수 있는 곳을 만들고 있습니다.
        </p>
        <ul class="exp-features">
          <li>
            <div class="exp-feature-icon"><i class="fas fa-hand-sparkles"></i></div>
            <div class="exp-feature-text">
              <h4>부드러운 마취와 치료</h4>
              <p>"손이 부드럽고 편안하다"는 말씀을 자주 들을 때 보람을 느낍니다</p>
            </div>
          </li>
          <li>
            <div class="exp-feature-icon"><i class="fas fa-clock"></i></div>
            <div class="exp-feature-text">
              <h4>직장인 중심 설계</h4>
              <p>진료 기준, 상담, 예약 운영까지 바쁜 분들의 시간을 고려합니다</p>
            </div>
          </li>
          <li>
            <div class="exp-feature-icon"><i class="fas fa-comments"></i></div>
            <div class="exp-feature-text">
              <h4>충분한 설명</h4>
              <p>X-ray 앞에서 이해가 될 때까지, 궁금한 점이 없을 때까지</p>
            </div>
          </li>
          <li>
            <div class="exp-feature-icon"><i class="fas fa-user-shield"></i></div>
            <div class="exp-feature-text">
              <h4>사후 관리까지 책임</h4>
              <p>치료 후에도 꾸준한 관리와 케어로 오래 건강한 치아를 유지합니다</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Gallery -->
<section class="gallery">
  <div class="gallery-header">
    <div class="section-label" style="justify-content:center;">GALLERY</div>
    <h2 class="section-title reveal">진료 <span class="gold">현장</span></h2>
  </div>
  <div class="gallery-scroll">
    <div class="gallery-item">
      <img src="https://www.genspark.ai/api/files/s/SI2rNsv1" alt="상담">
      <div class="gallery-item-overlay"><span>1:1 맞춤 상담</span></div>
    </div>
    <div class="gallery-item">
      <img src="https://www.genspark.ai/api/files/s/yZhTDJht" alt="진료 설명">
      <div class="gallery-item-overlay"><span>X-ray 기반 정밀 진단</span></div>
    </div>
    <div class="gallery-item">
      <img src="https://www.genspark.ai/api/files/s/oMAXh11u" alt="진료">
      <div class="gallery-item-overlay"><span>정밀 진료</span></div>
    </div>
    <div class="gallery-item">
      <img src="https://www.genspark.ai/api/files/s/cZc5FX3M" alt="치료">
      <div class="gallery-item-overlay"><span>세심한 치료 과정</span></div>
    </div>
    <div class="gallery-item">
      <img src="https://www.genspark.ai/api/files/s/KLYGAldi" alt="원장 프로필">
      <div class="gallery-item-overlay"><span>한승대 대표원장</span></div>
    </div>
    <div class="gallery-item">
      <img src="https://www.genspark.ai/api/files/s/Ifp4ODKF" alt="상담 장면">
      <div class="gallery-item-overlay"><span>환자 중심 상담</span></div>
    </div>
  </div>
</section>

<!-- Info -->
<section class="info" id="info">
  <div class="info-inner">
    <div class="section-header">
      <div class="section-label">LOCATION</div>
      <h2 class="section-title reveal"><span class="gold">시청역</span>에서 도보 5분</h2>
      <p class="section-desc reveal">서울 중구 남대문로9길 51, 효덕빌딩 3층 301호</p>
    </div>
    <div class="info-grid reveal">
      <div class="info-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.5!2d126.978!3d37.566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb1a2f4b7d%3A0x!2z7ISc7Jq4IOykkSDrgqjrjIDrrLjroZw56ri4IDUxIOuztOuNleu5jOuUqSAz7Li1IDMwMQ!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr" allowfullscreen="" loading="lazy"></iframe>
      </div>
      <div class="info-details">
        <div class="info-item">
          <div class="info-item-label">Address</div>
          <div class="info-item-value">
            서울 중구 남대문로9길 51 효덕빌딩 3층 301호
            <small>1호선 시청역 4, 5번 출구 도보 5분</small>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-label">Contact</div>
          <div class="info-item-value">
            <a href="tel:02-756-2828" style="color:var(--gold);text-decoration:none;font-weight:700;font-size:1.3rem;">02-756-2828</a>
            <small>FAX 02-754-8188</small>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-label">Hours</div>
          <div class="info-item-value">
            <table class="schedule-table">
              <tr><td>월</td><td>09:30 - 18:30</td></tr>
              <tr><td>화</td><td>09:30 - 18:30</td></tr>
              <tr><td>수</td><td>09:30 - <strong>20:00</strong> <span style="color:var(--gold);font-size:0.8rem;">(야간진료)</span></td></tr>
              <tr><td>목</td><td>09:30 - 18:30</td></tr>
              <tr><td>금</td><td>09:30 - 18:30</td></tr>
              <tr><td class="rest">토/일</td><td class="rest">휴진</td></tr>
            </table>
            <small>점심시간 13:00 - 14:00 | 접수마감 진료종료 1시간 전</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contact CTA -->
<section class="contact-cta">
  <div class="contact-cta-inner">
    <h2 class="reveal">치료를 미루고 계셨다면<br>지금이 <span class="gold">그때</span>입니다</h2>
    <p class="reveal">긴장하고 오셨다가, 생각보다 아프지 않아서 놀라셨다는 말씀.<br>그 한마디가 저희에게 가장 큰 보람입니다.</p>
    <div class="contact-btns reveal">
      <a href="tel:02-756-2828" class="contact-btn-phone">
        <i class="fas fa-phone-alt"></i> 02-756-2828
      </a>
      <a href="https://blog.naver.com/yein2828" target="_blank" class="contact-btn-naver">
        <i class="fab fa-naver"></i> 네이버 블로그
      </a>
    </div>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-inner">
    <div class="footer-left">
      <strong>행복한예인치과의원</strong><br>
      서울 중구 남대문로9길 51 효덕빌딩 3층 301호<br>
      대표자: 한승대 | 사업자등록번호: 104-91-44744<br>
      TEL 02-756-2828 | FAX 02-754-8188<br>
      COPYRIGHT 2005~2026 ALL RIGHT RESERVED
    </div>
    <div class="footer-right">
      <a href="#">이용약관</a>
      <a href="#">개인정보처리방침</a>
      <a href="#">비급여비용안내</a>
      <a href="https://blog.naver.com/yein2828" target="_blank">블로그</a>
    </div>
  </div>
</footer>

<script>
// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

// ==================== NAVBAR SCROLL ====================
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>50);
  // Scroll progress
  const h=document.documentElement;
  const pct=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  document.getElementById('scrollProgress').style.width=pct+'%';
});

// ==================== MOBILE MENU ====================
const mBtn=document.getElementById('mobileMenuBtn');
const mMenu=document.getElementById('mobileMenu');
mBtn.addEventListener('click',()=>{
  mBtn.classList.toggle('active');
  mMenu.classList.toggle('active');
  document.body.style.overflow=mMenu.classList.contains('active')?'hidden':'';
});
function closeMobile(){
  mBtn.classList.remove('active');
  mMenu.classList.remove('active');
  document.body.style.overflow='';
}

// ==================== REVEAL ON SCROLL ====================
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('active');
    }
  });
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// ==================== CUSTOM CURSOR ====================
const dot=document.getElementById('cursorDot');
const ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  dot.style.left=mx-4+'px';
  dot.style.top=my-4+'px';
});
function animCursor(){
  rx+=(mx-rx)*0.15;
  ry+=(my-ry)*0.15;
  ring.style.left=rx-20+'px';
  ring.style.top=ry-20+'px';
  requestAnimationFrame(animCursor);
}
animCursor();

// Hover effect on links
document.querySelectorAll('a,button,.treatment-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    ring.style.transform='scale(1.5)';
    ring.style.opacity='0.3';
  });
  el.addEventListener('mouseleave',()=>{
    ring.style.transform='scale(1)';
    ring.style.opacity='0.5';
  });
});

// ==================== GALLERY DRAG SCROLL ====================
const gallery=document.querySelector('.gallery-scroll');
let isDown=false,startX,scrollL;
gallery.addEventListener('mousedown',e=>{
  isDown=true;startX=e.pageX-gallery.offsetLeft;scrollL=gallery.scrollLeft;
  gallery.style.cursor='grabbing';
});
gallery.addEventListener('mouseleave',()=>{isDown=false;gallery.style.cursor='grab';});
gallery.addEventListener('mouseup',()=>{isDown=false;gallery.style.cursor='grab';});
gallery.addEventListener('mousemove',e=>{
  if(!isDown)return;e.preventDefault();
  const x=e.pageX-gallery.offsetLeft;
  gallery.scrollLeft=scrollL-(x-startX)*2;
});
gallery.style.cursor='grab';
</script>
</body>
</html>`)
})

// API routes
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
