# 행복한예인치과 공식 웹사이트

> **https://happyyein.kr** | Cloudflare Pages + Hono + D1 + R2

## 프로젝트 개요

- **클리닉**: 행복한예인치과 (경기도 수원)
- **대표원장**: 한승대 (서울대 치의학과, 통합치의학과 전문의)
- **기술스택**: Hono (TypeScript) + Cloudflare Pages/Workers + D1 (SQLite) + R2 (이미지)
- **프론트엔드**: Tailwind CSS (CDN) + Vanilla JS + SSR (서버사이드 렌더링)

## 주요 기능

### 페이지 구성
| 경로 | 설명 |
|------|------|
| `/` | 메인 랜딩 페이지 (히어로, 진료과목, 의료진 소개, 시설, 리뷰) |
| `/philosophy` | 진료 철학 |
| `/doctors` | 의료진 소개 |
| `/experience` | 진료 경험 (시설 안내) |
| `/treatments` | 진료과목 안내 |
| `/treatments/:slug` | 개별 진료 상세 (임플란트, 교정, 심미, 일반, 소아, 예방) |
| `/encyclopedia` | 치과백과사전 |
| `/blog` | 블로그 목록 (페이지네이션) |
| `/blog/:id` | 블로그 상세 (BlogPosting JSON-LD) |
| `/before-after` | 비포애프터 목록 |
| `/before-after/:id` | 비포애프터 상세 (MedicalWebPage + MedicalProcedure JSON-LD) |
| `/notice` | 공지사항 |
| `/location` | 오시는 길 (카카오맵) |
| `/contact` | 상담 예약 |
| `/local` | **지역별 진료 안내** (Local SEO 목록 — 6지역 × 5진료) |
| `/local/:slug` | **지역+진료 전용 랜딩페이지** (30개, 예: `/local/sicheong-implant`) |
| `/symptoms` | **증상별 진료 가이드** (Symptom SEO 허브 — 20개 증상 목록) |
| `/symptoms/:slug` | **증상별 전용 랜딩페이지** (20개, 예: `/symptoms/toothache`) |
| `/cost` | **치료비용 안내** (Cost SEO 허브 — 10개 치료 비용 목록) |
| `/cost/:slug` | **치료비용 전용 랜딩페이지** (10개, 예: `/cost/implant-cost`) |
| `/compare` | **치료 비교 가이드** (Comparison SEO 허브 — 8개 비교 목록) |
| `/compare/:slug` | **치료 비교 전용 랜딩페이지** (8개, 예: `/compare/implant-vs-bridge`) |

### 관리자 기능
| 경로 | 설명 |
|------|------|
| `/admin` | 관리자 대시보드 (비밀번호 보호) |
| `/admin/posts` | 게시판 관리 (블로그, 비포애프터, 공지사항 CRUD) |
| `/admin/auto-blog` | 자동 블로그 설정 및 수동 발행 |

### API 엔드포인트
| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/boards/:board` | 게시판 목록 조회 (페이지네이션, 검색) |
| GET | `/api/boards/:board/:id` | 게시물 상세 조회 |
| POST | `/api/boards/:board` | 게시물 작성 (관리자) |
| PUT | `/api/boards/:board/:id` | 게시물 수정 (관리자) |
| DELETE | `/api/boards/:board/:id` | 게시물 삭제 (관리자) |
| POST | `/api/upload` | 이미지 업로드 (R2) |
| POST | `/api/auto-blog/generate` | 자동 블로그 수동 발행 |
| GET | `/api/auto-blog/status` | 자동 블로그 상태 확인 |
| GET | `/api/auto-blog/topics` | 토픽 풀 조회 |
| GET | `/sitemap.xml` | 동적 사이트맵 (DB 기반, 개별 포스트 URL 포함) |
| GET | `/robots.txt` | 크롤러 가이드 |

### Local SEO 전용 랜딩페이지 (2026-05-26 슈퍼 업그레이드)

**6개 지역 × 5개 핵심 진료 = 30개 전용 랜딩페이지** — 구글 "지역명 + 진료" 검색 상위 노출 목적

| 지역 | 역 | 도보 | URL 패턴 |
|------|-----|------|----------|
| 시청역 | 1·2호선 시청역 | 5분 | `/local/sicheong-*` |
| 명동 | 4호선 명동역 | 8분 | `/local/myeongdong-*` |
| 을지로 | 2호선 을지로입구역 | 7분 | `/local/euljiro-*` |
| 회현역 | 4호선 회현역 | 6분 | `/local/hoehyeon-*` |
| 광화문·종로 | 5호선 광화문역 | 10분 | `/local/gwanghwamun-*` |
| 서울역 | 1·4호선 서울역 | 12분 | `/local/seoul-station-*` |

| 진료 | ID | 예시 URL |
|------|------|----------|
| 임플란트 | `implant` | `/local/sicheong-implant` |
| 신경치료 | `preservation` | `/local/myeongdong-preservation` |
| 라미네이트 | `aesthetic` | `/local/euljiro-aesthetic` |
| 교정 | `orthodontics` | `/local/hoehyeon-orthodontics` |
| 스케일링 | `general` | `/local/gwanghwamun-general` |

**각 페이지 SEO 요소:**
- URL에 키워드 포함 (`/local/sicheong-implant`)
- `<title>`에 정확한 키워드 매칭 (`시청역 임플란트 | 행복한예인치과`)
- `<h1>`에 키워드 (`시청역 임플란트 전문 치과 행복한예인치과`)
- MedicalBusiness + Service + GeoCircle JSON-LD
- FAQPage JSON-LD (페이지당 7~8개 전용 FAQ)
- MedicalWebPage + BreadcrumbList 스키마
- 지역별 교통/랜드마크 유니크 콘텐츠
- 양방향 내부 링크 네트워크 (치료페이지 ↔ 지역SEO, 지역 간 ↔ 진료 간)

### 증상별 SEO 전용 랜딩페이지 (2026-05-26 3차 슈퍼 업그레이드)

**20개 증상별 전용 랜딩페이지** — 환자가 실제 검색하는 증상 키워드 대응

| 증상 | Slug | 예시 검색어 |
|------|------|----------|
| 이가 아파요 | `toothache` | "치통 원인", "이 아플때" |
| 이가 시려요 | `sensitive-teeth` | "시린이", "이 시림" |
| 잇몸 출혈 | `bleeding-gums` | "잇몸에서 피", "양치질 피" |
| 잇몸 부음 | `swollen-gums` | "잇몸 붓다", "잇몸 딩딩" |
| 입냄새 | `bad-breath` | "구취", "입냄새 원인" |
| 치아 흔들림 | `loose-teeth` | "이가 흔들려요", "치아 흔들" |
| 사랑니 통증 | `wisdom-tooth-pain` | "사랑니 아파요", "사랑니 발치" |
| 치아 금 | `cracked-tooth` | "치아 금갔어요", "금이 간 치아" |
| 잇몸 퇴축 | `gum-recession` | "잇몸 내려앨아요", "치아미가 드러남" |
| 이 갈이 | `teeth-grinding` | "이갈이", "이를 갈아요" |
| 치아 변색 | `tooth-discoloration` | "치아가 누렇다", "치아 변색" |
| 벌어진 치아 | `gap-teeth` | "앞니 사이 벌어짐", "치간" |
| 턱관절 통증 | `jaw-pain` | "턱관절 통증", "입 볌륜 소리" |
| 치아 상실 | `missing-tooth` | "치아 빠졌어요", "치아 없은 부위" |
| 충치 | `cavity` | "충치 증상", "충치 초기" |
| 앞니 깨짐 | `broken-front-tooth` | "앞니 깨졌어요", "앞니 파절" |
| 교정 상담 | `need-orthodontics` | "교정 해야하나요", "덮니" |
| 임플란트 상담 | `implant-consultation` | "임플란트 물어보기", "임플란트 비용" |
| 구내염 | `mouth-ulcer` | "구내염", "입안 염증" |
| 치과 공포증 | `dental-anxiety` | "치과 무서워요", "치과 공포증" |

**각 페이지 SEO 요소:**
- MedicalWebPage + MedicalCondition + MedicalSignOrSymptom + MedicalTherapy JSON-LD
- FAQPage JSON-LD (4~6개 전용 FAQ/페이지)
- BreadcrumbList JSON-LD (홈 → 증상별 가이드 → [증상])
- 긴급도 표시 (high/medium/low)
- 원인 섹션 + 치료법 섹션 (진료페이지 링크 + 담당의 권어)
- 관련 증상 크로스링크
- CTA (전화/네이버 예약)

### 치료비용 SEO 전용 랜딩페이지 (2026-05-26 4차 슈퍼 업그레이드)

**10개 치료비용 전용 랜딩페이지** — 높은 전환율의 비용 검색 키워드 대응

| 치료 | Slug | 예시 검색어 |
|------|------|----------|
| 임플란트 | `implant-cost` | "임플란트 비용", "임플란트 가격" |
| 치아보존 | `preservation-cost` | "신경치료 비용", "치아보존 가격" |
| 교정 | `orthodontics-cost` | "치아교정 비용", "투명교정 가격" |
| 심미치료 | `aesthetic-cost` | "라미네이트 비용", "심미보철 가격" |
| 스케일링 | `scaling-cost` | "스케일링 비용", "스케일링 가격" |
| 크라운 | `crown-cost` | "크라운 비용", "치관 가격" |
| 미백 | `whitening-cost` | "치아미백 비용", "화이트닝 가격" |
| 발치 | `extraction-cost` | "사랑니 발치 비용", "발치 가격" |
| 틀니 | `denture-cost` | "틀니 비용", "의치 가격" |
| 소아치과 | `pediatric-cost` | "소아치과 비용", "아이 치료비" |

**각 페이지 SEO 요소:**
- MedicalWebPage + speakable + lastReviewed JSON-LD
- Dentist + OfferCatalog + Offer + PriceSpecification JSON-LD
- FAQPage JSON-LD (3~5개 전용 FAQ/페이지)
- BreadcrumbList JSON-LD (홈 → 치료비용 안내 → [치료])
- 가격 범위 + 보험 적용 안내
- 비용 영향 요인 + 치료 과정별 비용 구조
- 관련 치료 크로스링크 + CTA

### 치료 비교 SEO 콘텐츠 (2026-05-26 4차 슈퍼 업그레이드)

**8개 치료 비교 콘텐츠** — 의사결정 단계 검색 키워드 대응

| 비교 | Slug | 예시 검색어 |
|------|------|----------|
| 임플란트 vs 브릿지 | `implant-vs-bridge` | "임플란트 브릿지 차이" |
| 라미네이트 vs 레진 | `laminate-vs-resin` | "라미네이트 레진 비교" |
| 투명교정 vs 메탈교정 | `clear-vs-metal-braces` | "투명교정 메탈교정 차이" |
| 임플란트 vs 틀니 | `implant-vs-denture` | "임플란트 틀니 비교" |
| 지르코니아 vs PFM vs 금 | `zirconia-vs-pfm-vs-gold` | "크라운 종류 비교" |
| 전문미백 vs 자가미백 | `office-vs-home-whitening` | "미백 종류 비교" |
| 즉시임플란트 vs 지연임플란트 | `immediate-vs-delayed-implant` | "즉시 임플란트 장단점" |
| 스케일링 vs 딥클리닝 | `scaling-vs-deep-cleaning` | "스케일링 딥클리닝 차이" |

**각 페이지 SEO 요소:**
- MedicalWebPage + speakable + lastReviewed JSON-LD
- FAQPage JSON-LD (2~4개 전용 FAQ/페이지)
- BreadcrumbList JSON-LD (홈 → 치료 비교 → [A vs B])
- 양쪽 장단점 비교 그리드
- "이런 분에게 추천" 섹션
- 전문의 소견 + CTA

### HowTo + Physician + SearchAction 스키마 (2026-05-27 5차 슈퍼 업그레이드)

**5개 치료페이지 HowTo 스키마** — Google 리치 스니펫 (단계별 치료 과정)
- 각 치료페이지에 HowTo + HowToStep (5단계) + totalTime + estimatedCost
- Google에서 "임플란트 치료 과정" 검색 시 단계별 리치 스니펫 노출 가능

**5개 치료페이지 Service + PriceSpecification** — 비용 정보 구조화
- 임플란트: 120만~300만원, 보존: 5만~30만원, 심미: 30만~150만원, 교정: 300만~700만원, 일반: 3만~20만원
- 보험 적용 안내 포함

**3명 전문의 Physician 스키마** — Google Knowledge Panel 대응
- 한승대 (통합치의학과 전문의, 치의학 박사)
- 신정희 (치과보존과 전문의, 치의학 박사)
- 박현미 (교정과 전문의, 인비젤라인 인증)
- 각 의사별: hasCredential, alumniOf, memberOf, availableService, knowsAbout

**SearchAction (Sitelinks Searchbox)** — Google 검색결과 사이트 내 검색창
- WebSite 스키마에 potentialAction: SearchAction 추가

**AboutPage + MedicalClinic** — 진료철학 페이지 구조화
- amenityFeature 6개 (에어샤워, CT, 미세현미경, 독립 수술실, 야간진료, 장애인 편의시설)
- knowsLanguage: ko, en

### 홈페이지 추가 스키마 (2026-05-26 3차 슈퍼 업그레이드)
- **Review 스키마 (10개 개별 리뷰)** — Google 별점 노출 (평점 4.9, 10개 리뷰)
- **Service + PriceSpecification** — 5개 진료 서비스 (임플란트, 신경치료, 투명교정, 심미치료, 스케일링)
- **hreflang (ko/en/x-default)** — 다국어 SEO 신호
- **dateModified 동적 자동화** — 매일 자동 업데이트 (Google 프레시니스 향상)

## GPT-5.5 자동 블로그 시스템

- **매일 오전 7시 (KST)** Cloudflare Cron Worker가 자동 발행
- **232개 치과 SEO 토픽** (8개월치 커버리지)
- 카테고리: 임플란트, 교정, 심미보철, 소아치과, 예방, 일반, 계절/시의성, 생활/건강, 특수대상, 치과상식
- GPT-5.5가 **SEO 최적화 본문 + meta_description + tags + FAQ 데이터** 자동 생성
- 내부링크 자동 삽입 (진료과목, 비포애프터, 상담예약 페이지)
- 발행 즉시 **IndexNow + Google Ping** 검색엔진 알림

## SEO / AEO 최적화 (2026-05-14 메가 업그레이드)

### 구조화 데이터 (JSON-LD)
| 스키마 | 적용 페이지 | 설명 |
|--------|-------------|------|
| `Dentist` | 전체 | 치과 조직 정보 (이름, 주소, 전화, 영업시간, 의사) |
| `BreadcrumbList` | 전체 | 경로 네비게이션 (홈 → 섹션 → 상세) |
| `BlogPosting` | `/blog/:id` | 블로그 글 (author, publisher, datePublished/Modified, wordCount, image, keywords) |
| `FAQPage` | `/blog/:id` | FAQ 자동 추출 (data-faq 속성 또는 H3 Q&A 패턴) |
| `MedicalWebPage` | `/before-after/:id` | 의료 웹페이지 (medicalAudience: Patient) |
| `MedicalProcedure` | `/before-after/:id` | 의료 시술 정보 (performedBy: Dentist, status: EventCompleted) |
| `ImageObject` | `/before-after/:id` | 시술 전후 이미지 (before_intra, after_intra, before_pano, after_pano) |
| `MedicalBusiness` | `/local/:slug` | 치과 + 서비스 + GeoCircle (지역 SEO) |
| `MedicalWebPage` | `/local/:slug` | 의료 웹페이지 + speakable |
| `FAQPage` | `/local/:slug` | 지역+진료 전용 FAQ (7~8개/페이지) |
| `CollectionPage` | `/local` | 지역별 진료 목록 (ItemList 30개) |
| `Review` (10개) | `/` | 개별 환자 리뷰 (Google 별점 노출) |
| `Service` + `PriceSpecification` | `/` | 5개 진료 서비스 및 비용 정보 |
| `MedicalWebPage` | `/symptoms/:slug` | 의료 웹페이지 + speakable |
| `MedicalCondition` | `/symptoms/:slug` | 증상/질환 정보 (signOrSymptom, possibleTreatment) |
| `MedicalSignOrSymptom` | `/symptoms/:slug` | 의료 증상 스키마 |
| `MedicalTherapy` | `/symptoms/:slug` | 치료법 정보 (performedBy: Dentist) |
| `FAQPage` | `/symptoms/:slug` | 증상별 전용 FAQ (4~6개/페이지) |
| `MedicalWebPage` | `/cost/:slug` | 치료비용 의료 웹페이지 + speakable + lastReviewed |
| `Dentist` + `OfferCatalog` | `/cost/:slug` | 치과 + 서비스 + 가격 정보 |
| `PriceSpecification` | `/cost/:slug` | 치료 비용 범위 |
| `FAQPage` | `/cost/:slug` | 비용 전용 FAQ (3~5개/페이지) |
| `MedicalWebPage` | `/compare/:slug` | 치료비교 의료 웹페이지 + speakable |
| `FAQPage` | `/compare/:slug` | 비교 전용 FAQ (2~4개/페이지) |
| `CollectionPage` | `/cost`, `/compare` | 비용/비교 목록 (ItemList) |
| `HowTo` + `HowToStep` | `/treatments/:slug` | 단계별 치료 과정 (Google 리치 스니펫) |
| `Service` + `PriceSpecification` | `/treatments/:slug` | 치료별 비용 범위 + 보험 정보 |
| `Physician` (3명) | `/doctors` | 전문의 개별 스키마 (hasCredential, alumniOf) |
| `SearchAction` | `/` | Sitelinks Searchbox (potentialAction) |
| `AboutPage` | `/philosophy` | 진료철학 + MedicalClinic + amenityFeature |

### 검색엔진 즉시 알림
- **IndexNow API** → Bing, Yandex, Naver Yeti 동시 알림
- **Google Ping** → sitemap 기반 크롤 요청
- **Bing Direct IndexNow** → Bing 전용 즉시 인덱싱
- **Naver SearchAdvisor IndexNow** → 네이버 전용
- IndexNow 인증 키: `/a1b2c3d4e5f6g7h8i9j0happyyein2026.txt`

### 메타태그 최적화
- DB의 `seo_description` 우선 사용 (없으면 본문 자동 추출)
- DB의 `seo_keyword` + `seo_tags` → `<meta name="keywords">` 강화
- Open Graph + Twitter Card 메타태그 (이미지, 제목, 설명)
- `article:published_time` / `article:modified_time` 메타 지원
- Canonical URL 자동 설정

### 사이트맵
- **총 312개 URL** (기존 68 → 312, +244 URLs)
- 치료비용 11 + 치료비교 9 + 백과사전 203 + 기존 89
- **동적 생성**: D1 DB에서 모든 게시물 URL 자동 포함
- `<image:image>` 태그로 이미지 사이트맵 지원
- `<lastmod>` 게시물 수정일 기반 동적 업데이트
- `<changefreq>` + `<priority>` 페이지별 최적화

## 데이터 아키텍처

### Cloudflare D1 (SQLite)
- **데이터베이스**: `yein-dental-db` (production ID: `00671886-3f10-49d2-8731-6766e944223e`)
- **posts 테이블**: id, board, title, content, author, thumbnail, category, views, seo_keyword, seo_description, seo_tags, auto_generated, created_at, updated_at
- **before-after 전용 필드**: treatment_type, patient_age, patient_gender, treatment_duration, before_intra, after_intra, before_pano, after_pano, description
- **마이그레이션**: `migrations/0001_*.sql` ~ `0003_auto_blog.sql`

### Cloudflare R2 (이미지 스토리지)
- **버킷**: `yein-dental-images`
- 업로드 경로: `uploads/{timestamp}-{random}.{ext}`
- 최대 5MB, 허용 타입: JPEG, PNG, GIF, WebP

## 배포

### 프로덕션
- **플랫폼**: Cloudflare Pages
- **프로젝트명**: `happyyein`
- **도메인**: https://happyyein.kr (커스텀), https://happyyein.pages.dev (기본)
- **상태**: ✅ Active
- **마지막 배포**: 2026-05-26

### Cron Worker
- **프로젝트명**: `happyyein-cron`
- **스케줄**: 매일 오전 7시 KST (`0 22 * * *` UTC)
- **역할**: 자동 블로그 발행 트리거

### GitHub
- **저장소**: https://github.com/sodanstjrwns-max/happyyein
- **브랜치**: `main`

## 로컬 개발

```bash
# 빌드
npm run build

# 개발 서버 (PM2)
pm2 start ecosystem.config.cjs

# D1 마이그레이션 (로컬)
npx wrangler d1 migrations apply yein-dental-db --local

# 시드 데이터
npx wrangler d1 execute yein-dental-db --local --file=./seed.sql

# DB 리셋
npm run db:reset
```

## 프로젝트 구조

```
webapp/
├── src/
│   ├── index.tsx          # 메인 앱 엔트리 (라우팅, sitemap, robots.txt, IndexNow 키)
│   ├── layout.ts          # HTML 레이아웃 (head, footer, JSON-LD, safeJsonLd)
│   ├── pages.ts           # 정적 페이지 (메인, 진료철학, 의료진, 시설 등)
│   ├── board-pages.ts     # 게시판 페이지 (블로그, 비포애프터, 공지 + SEO/AEO 스키마)
│   ├── api-boards.ts      # 게시판 API (CRUD + IndexNow 알림)
│   ├── api-upload.ts      # 이미지 업로드 API (R2)
│   ├── auto-blog.ts       # GPT-5.5 자동 블로그 (생성 + FAQ + IndexNow)
│   ├── admin-pages.ts     # 관리자 페이지
│   ├── treatments.ts      # 진료과목 상세 페이지
│   ├── local-seo.ts       # 🆕 Local SEO 30개 랜딩페이지 (지역×진료)
│   ├── symptom-seo.ts     # 🆕 Symptom SEO 20개 랜딩페이지 (증상별 가이드)
│   ├── cost-seo.ts        # 🆕 Cost SEO 10개 랜딩페이지 (치료비용 안내)
│   ├── comparison-seo.ts  # 🆕 Comparison SEO 8개 랜딩페이지 (치료 비교)
│   ├── encyclopedia.ts    # 치과백과사전 (215개 용어, 사이트맵 확장)
│   └── renderer.tsx       # JSX 렌더러
├── public/static/         # 정적 자산 (CSS, JS, 이미지)
├── migrations/            # D1 마이그레이션 SQL
├── cron-worker/           # 자동 블로그 Cron Worker (별도 배포)
├── wrangler.jsonc         # Cloudflare 설정 (D1, R2 바인딩)
├── vite.config.ts         # Vite 빌드 설정
├── ecosystem.config.cjs   # PM2 설정
├── .dev.vars              # 로컬 환경변수 (OPENAI_API_KEY 등)
└── package.json           # 의존성 및 스크립트
```

## 향후 개선 사항

- [x] ✅ Local SEO 슈퍼 업그레이드 — 지역×진료 30개 전용 랜딩페이지 (2026-05-26)
- [x] ✅ 3차 SEO 슈퍼 업그레이드 — 증상별 20개 랜딩페이지 + Review/Service 스키마 + hreflang (2026-05-26)
- [x] ✅ 4차 SEO 슈퍼 업그레이드 — 치료비용 10개 + 치료비교 8개 + 사이트맵 312URL + SameAs 확장 (2026-05-26)
- [x] ✅ 5차 SEO 슈퍼 업그레이드 — HowTo 5개 + Physician 3명 + SearchAction + Service/Price + AboutPage (2026-05-27)
- [ ] Google Search Console 연동 및 인덱싱 현황 모니터링
- [ ] 비포애프터 게시물 등록 후 MedicalProcedure 스키마 프로덕션 검증
- [ ] 자동 블로그 FAQ 품질 모니터링 (FAQPage 스키마 Google 리치 결과 확인)
- [ ] Core Web Vitals 최적화 (LCP, CLS, INP)
- [ ] 예약 시스템 온라인 통합

---

**Built with Hono + Cloudflare Pages** | Last updated: 2026-05-27 (5차 SEO 슈퍼 업그레이드)

### SEO 컨텐츠 총계 (전체 랜딩페이지 현황)
| 카테고리 | 개수 | 파일 |
|----------|------|------|
| 메인 + 정적 페이지 | ~15 | index.tsx, pages.ts, treatments.ts |
| Local SEO (지역별) | 30 | local-seo.ts |
| Symptom SEO (증상별) | 20 | symptom-seo.ts |
| Cost SEO (치료비용) | 10 | cost-seo.ts |
| Comparison SEO (치료비교) | 8 | comparison-seo.ts |
| 백과사전 | 215 | encyclopedia.ts |
| 블로그 (동적) | 232+ | auto-blog.ts + D1 DB |
| **사이트맵 총 URL** | **312+** | sitemap.xml (동적 생성) |
