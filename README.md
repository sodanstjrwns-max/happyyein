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
- **마지막 배포**: 2026-05-14

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
│   ├── treatment-pages.ts # 진료과목 상세 페이지
│   ├── encyclopedia.ts    # 치과백과사전
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

- [ ] Google Search Console 연동 및 인덱싱 현황 모니터링
- [ ] 비포애프터 게시물 등록 후 MedicalProcedure 스키마 프로덕션 검증
- [ ] 자동 블로그 FAQ 품질 모니터링 (FAQPage 스키마 Google 리치 결과 확인)
- [ ] 환자 리뷰/후기 구조화 데이터 (Review 스키마) 추가
- [ ] 다국어 지원 (영어 페이지) 검토
- [ ] Core Web Vitals 최적화 (LCP, CLS, INP)
- [ ] 예약 시스템 온라인 통합

---

**Built with Hono + Cloudflare Pages** | Last updated: 2026-05-14
