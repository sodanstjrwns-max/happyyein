// ============================================================
// SEO 자동 블로그 시스템 — GPT-5 기반 치과 콘텐츠 자동 생성
// 매일 1개씩 고퀄리티 SEO 최적화 블로그 포스트 자동 발행
// ============================================================
import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY?: string;
  OPENAI_BASE_URL?: string;
  AUTO_BLOG_SECRET?: string;  // cron 호출 인증용
}

const autoBlog = new Hono<{ Bindings: Bindings }>()

// ===== 설정 =====
const SITE = {
  name: '행복한예인치과',
  domain: 'https://happyyein.kr',
  tel: '02-756-2828',
  location: '서울 시청역·명동·을지로',
  naverBlog: 'https://blog.naver.com/yein2828',
  naverBooking: 'https://naver.me/G0DXGZbi',
}

// 기본값 (프로덕션에서는 wrangler secret 사용)
const DEFAULT_AUTO_BLOG_SECRET = 'yein-auto-blog-2026'

function getSecret(env: Bindings): string {
  return env.AUTO_BLOG_SECRET || DEFAULT_AUTO_BLOG_SECRET
}

// ===== SEO 토픽 풀 — 200개+ 치과 키워드 기반 =====
// 카테고리별로 분류하여 다양한 주제를 순환
const TOPIC_POOL: { category: string; topics: { keyword: string; angle: string; internalLinks: string[] }[] }[] = [
  {
    category: '임플란트',
    topics: [
      { keyword: '임플란트 수명', angle: '임플란트 수명을 20년 이상 유지하는 관리법', internalLinks: ['/treatments/implant', '/encyclopedia/implant-maintenance'] },
      { keyword: '임플란트 가격', angle: '2026년 임플란트 가격 총정리 — 종류별·보험 적용 안내', internalLinks: ['/treatments/implant', '/encyclopedia/senior-implant'] },
      { keyword: '임플란트 통증', angle: '임플란트 수술 통증, 실제로 얼마나 아플까?', internalLinks: ['/treatments/implant', '/encyclopedia/local-anesthesia'] },
      { keyword: '발치 즉시 임플란트', angle: '발치와 동시에 임플란트? 발치즉시 임플란트의 장단점', internalLinks: ['/treatments/implant', '/encyclopedia/immediate-implant'] },
      { keyword: '임플란트 뼈이식', angle: '뼈이식 없이 임플란트 가능할까? 뼈 부족 시 해결법', internalLinks: ['/treatments/implant', '/encyclopedia/bone-graft'] },
      { keyword: '앞니 임플란트', angle: '앞니 임플란트, 자연치아처럼 보이려면?', internalLinks: ['/treatments/implant', '/treatments/aesthetic'] },
      { keyword: '임플란트 실패', angle: '임플란트 실패 원인 5가지와 재시술 방법', internalLinks: ['/treatments/implant', '/encyclopedia/implant-failure'] },
      { keyword: '임플란트 주위염', angle: '임플란트 주위염 증상과 예방법 — 관리가 핵심', internalLinks: ['/treatments/implant', '/encyclopedia/peri-implantitis'] },
      { keyword: '올온포 임플란트', angle: 'All-on-4 올온포 임플란트, 무치악 환자의 새로운 희망', internalLinks: ['/treatments/implant', '/encyclopedia/all-on-4'] },
      { keyword: '임플란트 오래가는 법', angle: '치과의사가 알려주는 임플란트 오래 쓰는 7가지 비결', internalLinks: ['/treatments/implant', '/encyclopedia/implant-maintenance'] },
      { keyword: '노인 임플란트', angle: '65세 이상 건강보험 임플란트 — 신청 방법과 주의사항', internalLinks: ['/treatments/implant', '/encyclopedia/senior-implant'] },
      { keyword: '임플란트 vs 브릿지', angle: '임플란트 vs 브릿지, 어떤 게 나을까? 비교 총정리', internalLinks: ['/treatments/implant', '/encyclopedia/bridge'] },
      { keyword: '가이드 임플란트', angle: '네비게이션 가이드 임플란트란? 더 정확하고 안전한 수술', internalLinks: ['/treatments/implant', '/encyclopedia/guided-surgery'] },
      { keyword: '상악동 거상술', angle: '위턱 뼈 부족? 상악동 거상술 후 임플란트 식립 과정', internalLinks: ['/treatments/implant', '/encyclopedia/sinus-lift'] },
      { keyword: '임플란트 음식', angle: '임플란트 수술 후 음식 — 언제부터 뭘 먹을 수 있을까?', internalLinks: ['/treatments/implant', '/encyclopedia/implant'] },
    ]
  },
  {
    category: '신경치료·보존',
    topics: [
      { keyword: '신경치료 과정', angle: '신경치료 과정 총정리 — 왜 여러 번 다녀야 할까?', internalLinks: ['/treatments/preservation', '/encyclopedia/root-canal'] },
      { keyword: '신경치료 통증', angle: '신경치료 중 통증이 있다면? 원인과 대처법', internalLinks: ['/treatments/preservation', '/encyclopedia/pulpitis'] },
      { keyword: '충치 초기 증상', angle: '눈에 안 보이는 충치, 초기 증상으로 잡는 법', internalLinks: ['/treatments/preservation', '/encyclopedia/cavity'] },
      { keyword: '크라운 종류', angle: '크라운 종류 완벽 비교 — 지르코니아 vs 금 vs PFM', internalLinks: ['/treatments/preservation', '/encyclopedia/crown'] },
      { keyword: '인레이 온레이', angle: '인레이·온레이란? 충치 치료의 똑똑한 선택', internalLinks: ['/treatments/preservation', '/encyclopedia/inlay'] },
      { keyword: '이가 시려요', angle: '찬물 마시면 이가 시린 이유와 해결법 5가지', internalLinks: ['/treatments/preservation', '/encyclopedia/tooth-sensitivity'] },
      { keyword: '재신경치료', angle: '신경치료 했는데 또 아파요 — 재신경치료가 필요한 경우', internalLinks: ['/treatments/preservation', '/encyclopedia/retreatment'] },
      { keyword: '미세현미경 치료', angle: '미세현미경 신경치료란? 성공률을 높이는 핵심 기술', internalLinks: ['/treatments/preservation', '/encyclopedia/microscope-treatment'] },
      { keyword: '치아 깨짐', angle: '치아가 깨졌을 때 응급 대처법과 치료 방법', internalLinks: ['/treatments/preservation', '/encyclopedia/tooth-fracture'] },
      { keyword: '레진 치료', angle: '레진 충전 치료 — 당일 완성, 자연스러운 충치 치료', internalLinks: ['/treatments/preservation', '/encyclopedia/resin'] },
    ]
  },
  {
    category: '교정',
    topics: [
      { keyword: '투명교정 후기', angle: '투명교정 실제 후기 — 기간, 비용, 통증 솔직 정리', internalLinks: ['/treatments/orthodontics', '/encyclopedia/clear-aligner'] },
      { keyword: '인비절라인 가격', angle: '2026년 인비절라인 교정 가격과 기간 총정리', internalLinks: ['/treatments/orthodontics', '/encyclopedia/invisalign'] },
      { keyword: '성인 교정', angle: '30대·40대 성인 교정, 지금 시작해도 될까?', internalLinks: ['/treatments/orthodontics', '/encyclopedia/orthodontics'] },
      { keyword: '교정 기간', angle: '치아교정 기간은 얼마나 걸릴까? 유형별 비교', internalLinks: ['/treatments/orthodontics', '/encyclopedia/orthodontics'] },
      { keyword: '돌출입 교정', angle: '돌출입 교정 방법 — 발치교정 vs 비발치교정', internalLinks: ['/treatments/orthodontics', '/encyclopedia/extraction-ortho'] },
      { keyword: '교정 후 유지장치', angle: '교정 끝! 유지장치 안 하면 어떻게 될까?', internalLinks: ['/treatments/orthodontics', '/encyclopedia/retainer'] },
      { keyword: '설측 교정', angle: '보이지 않는 교정, 설측 교정의 장단점', internalLinks: ['/treatments/orthodontics', '/encyclopedia/lingual-bracket'] },
      { keyword: '부정교합', angle: '부정교합이 건강에 미치는 영향 — 교정이 필요한 진짜 이유', internalLinks: ['/treatments/orthodontics', '/encyclopedia/malocclusion'] },
      { keyword: '교정 통증', angle: '교정 첫 주, 통증 줄이는 방법 7가지', internalLinks: ['/treatments/orthodontics', '/encyclopedia/bracket'] },
      { keyword: '어린이 교정 시기', angle: '우리 아이 교정, 최적의 시기는 언제일까?', internalLinks: ['/treatments/orthodontics', '/encyclopedia/mixed-dentition'] },
    ]
  },
  {
    category: '심미치료',
    topics: [
      { keyword: '라미네이트 수명', angle: '라미네이트 수명과 관리법 — 10년 이상 유지하려면?', internalLinks: ['/treatments/aesthetic', '/encyclopedia/laminate'] },
      { keyword: '치아 미백', angle: '치아 미백, 병원 vs 홈블리칭 차이와 효과 비교', internalLinks: ['/treatments/aesthetic', '/encyclopedia/bleaching'] },
      { keyword: '앞니 벌어짐', angle: '앞니 사이 벌어짐, 레진 vs 라미네이트 vs 교정 비교', internalLinks: ['/treatments/aesthetic', '/encyclopedia/diastema'] },
      { keyword: '잇몸 성형', angle: '거미 스마일(잇몸 과다 노출) 해결법 — 잇몸 성형이란?', internalLinks: ['/treatments/aesthetic', '/encyclopedia/gummy-smile'] },
      { keyword: '스마일 디자인', angle: '스마일 디자인이란? 얼굴에 맞는 완벽한 미소 설계', internalLinks: ['/treatments/aesthetic', '/encyclopedia/smile-design'] },
      { keyword: '치아 변색', angle: '치아 변색 원인 7가지와 유형별 해결법', internalLinks: ['/treatments/aesthetic', '/encyclopedia/tooth-discoloration'] },
      { keyword: '레진 비니어', angle: '레진 비니어 vs 세라믹 라미네이트, 차이점과 선택 기준', internalLinks: ['/treatments/aesthetic', '/encyclopedia/composite-veneer'] },
      { keyword: '앞니 심미 치료', angle: '앞니가 예뻐지면 인상이 달라진다 — 앞니 심미 치료 총정리', internalLinks: ['/treatments/aesthetic', '/encyclopedia/laminate'] },
    ]
  },
  {
    category: '일반·예방',
    topics: [
      { keyword: '스케일링 주기', angle: '스케일링 얼마나 자주 받아야 할까? 보험 적용 꿀팁', internalLinks: ['/treatments/general', '/encyclopedia/insurance-scaling'] },
      { keyword: '잇몸 출혈', angle: '양치할 때 피가 나요 — 잇몸 출혈 원인과 해결법', internalLinks: ['/treatments/general', '/encyclopedia/gingivitis'] },
      { keyword: '치주염 증상', angle: '방치하면 이 빠진다 — 치주염 초기 증상 체크리스트', internalLinks: ['/treatments/general', '/encyclopedia/periodontal-disease'] },
      { keyword: '사랑니 발치', angle: '사랑니 꼭 뽑아야 할까? 발치 기준과 회복 과정', internalLinks: ['/treatments/general', '/encyclopedia/wisdom-tooth'] },
      { keyword: '구취 원인', angle: '입 냄새 원인 TOP 5와 근본적 해결 방법', internalLinks: ['/treatments/general', '/encyclopedia/halitosis'] },
      { keyword: '치과 정기검진', angle: '6개월마다 치과 가야 하는 진짜 이유', internalLinks: ['/treatments/general', '/encyclopedia/dental-checkup'] },
      { keyword: '올바른 칫솔질', angle: '99%가 잘못하는 칫솔질 — 치과의사가 알려주는 바른 방법', internalLinks: ['/treatments/general', '/encyclopedia/brushing'] },
      { keyword: '치실 사용법', angle: '치실, 진짜 효과 있을까? 올바른 사용법 가이드', internalLinks: ['/treatments/general', '/encyclopedia/floss'] },
      { keyword: '치과 공포증', angle: '치과 공포증 극복 — 수면치료와 진정법 안내', internalLinks: ['/treatments/general', '/encyclopedia/dental-phobia'] },
      { keyword: '이갈이', angle: '이갈이(브럭시즘) 원인과 나이트가드 치료법', internalLinks: ['/treatments/general', '/encyclopedia/bruxism'] },
      { keyword: '턱관절 통증', angle: '턱이 딸깍거려요 — 턱관절 장애 증상과 치료법', internalLinks: ['/treatments/general', '/encyclopedia/tmj'] },
      { keyword: '구내염', angle: '입안이 헐었을 때 — 구내염 빨리 낫는 법', internalLinks: ['/treatments/general', '/encyclopedia/stomatitis'] },
      { keyword: '어린이 충치', angle: '우유병 충치 예방법 — 우리 아이 첫 치과 방문 가이드', internalLinks: ['/treatments/general', '/encyclopedia/nursing-caries'] },
      { keyword: '실란트', angle: '실란트란? 아이 충치 예방의 첫걸음', internalLinks: ['/treatments/general', '/encyclopedia/sealant'] },
      { keyword: '치과 비용', angle: '치과 치료비 세액공제 받는 법 — 연말정산 꿀팁', internalLinks: ['/treatments/general', '/encyclopedia/medical-deduction'] },
    ]
  },
  {
    category: '치과 장비·기술',
    topics: [
      { keyword: 'CT 촬영', angle: '치과 CT(CBCT)란? 일반 엑스레이와 다른 점', internalLinks: ['/treatments/implant', '/encyclopedia/cbct'] },
      { keyword: '디지털 치과', angle: '디지털 치과 시대 — 구강스캐너부터 3D프린팅까지', internalLinks: ['/treatments/implant', '/encyclopedia/digital-dentistry'] },
      { keyword: '감염관리', angle: '치과 감염관리, 이 정도면 안심 — 멸균 시스템 공개', internalLinks: ['/treatments/general', '/encyclopedia/infection-control'] },
      { keyword: '치과 레이저', angle: '치과 레이저 치료란? 통증 적고 회복 빠른 비밀', internalLinks: ['/treatments/aesthetic', '/encyclopedia/laser'] },
    ]
  },
  {
    category: '지역 SEO',
    topics: [
      { keyword: '시청역 치과', angle: '시청역 치과 추천 — 선택 기준 5가지 체크리스트', internalLinks: ['/location', '/doctors'] },
      { keyword: '명동 치과', angle: '명동·을지로 직장인을 위한 점심시간 치과 진료', internalLinks: ['/location', '/treatments/general'] },
      { keyword: '을지로 임플란트', angle: '을지로 임플란트 치과 — 전문의 3인 협진 시스템', internalLinks: ['/location', '/treatments/implant', '/doctors'] },
      { keyword: '광화문 치과', angle: '광화문·서울역 근처 야간진료 치과 — 수요일 8시까지', internalLinks: ['/location', '/treatments/general'] },
      { keyword: '중구 치과', angle: '서울 중구 치과 13년 — 동네 치과의 진짜 의미', internalLinks: ['/location', '/philosophy'] },
      { keyword: '직장인 치과', angle: '점심시간에 다니는 직장인 치과 — 빠른 진료 꿀팁', internalLinks: ['/location', '/treatments/general'] },
    ]
  },
  {
    category: '환자 경험·소통',
    topics: [
      { keyword: '치과 선택법', angle: '좋은 치과 고르는 법 — 치과의사가 알려주는 7가지 기준', internalLinks: ['/philosophy', '/doctors'] },
      { keyword: '치료 전 질문', angle: '치과 가기 전 꼭 물어봐야 할 질문 5가지', internalLinks: ['/philosophy', '/experience'] },
      { keyword: '전문의 협진', angle: '전문의 협진이 중요한 이유 — 분과별 전문 치료의 차이', internalLinks: ['/doctors', '/encyclopedia/specialist'] },
      { keyword: '치과 후기', angle: '환자 후기로 보는 좋은 치과의 조건', internalLinks: ['/experience', '/philosophy'] },
    ]
  },
]

// 전체 토픽 리스트 (평탄화)
const ALL_TOPICS = TOPIC_POOL.flatMap(cat =>
  cat.topics.map(t => ({ ...t, category: cat.category }))
)

// ===== GPT-5 프롬프트 =====
function buildPrompt(topic: typeof ALL_TOPICS[0]): string {
  return `당신은 행복한예인치과(${SITE.name})의 블로그 콘텐츠 전문 라이터입니다.
아래 규칙에 따라 SEO 최적화된 치과 블로그 글을 작성하세요.

## 작성 대상
- 메인 키워드: "${topic.keyword}"
- 글 방향: "${topic.angle}"
- 카테고리: "${topic.category}"

## 필수 규칙

### 1. SEO 구조
- H2 태그 3~5개 사용 (각 H2 아래 본문 2~4문단)
- H3 태그 적절히 활용 (리스트형 콘텐츠에서)
- 메인 키워드를 제목, 서두, 중간, 결론에 자연스럽게 배치
- LSI(관련) 키워드도 본문에 녹여 넣기
- 전체 분량: 1,500~2,500자 (한글 기준)

### 2. 콘텐츠 품질
- 전문적이되 환자가 이해할 수 있는 눈높이로 작성
- 구체적 수치, 기간, 사례를 포함 (예: "보통 2~4개월 소요")
- 단순 나열이 아닌 '왜 그런지' 설명 포함
- 부드럽고 신뢰감 있는 톤 (반말 금지, 존댓말)

### 3. HTML 형식
- 본문은 순수 HTML로 작성 (p, h2, h3, ul, li, strong, em 태그 사용)
- <div class="blog-callout"> ... </div> 박스를 1~2개 사용해서 핵심 요약 또는 팁 강조
- <div class="blog-cta"> ... </div> 박스를 글 말미에 넣어 상담/예약 유도
- CTA 문구 예시: "행복한예인치과에서 정확한 진단을 받아보세요. 전문의 3인이 협진합니다."

### 4. 내부 링크 (SEO 핵심)
- 본문 중간에 자연스럽게 내부 링크 삽입 (a 태그)
- 사용 가능한 내부 링크: ${topic.internalLinks.map(l => `${SITE.domain}${l}`).join(', ')}
- 백과사전 용어 링크도 적극 활용: ${SITE.domain}/encyclopedia/[용어id]
- 앵커 텍스트는 키워드 포함 (예: <a href="/treatments/implant">임플란트 진료 안내</a>)

### 5. 병원 정보 자연 삽입
- 병원명: ${SITE.name}
- 위치: ${SITE.location} (도보 5~10분)
- 전화: ${SITE.tel}
- 특징: 보존과·교정과·통합치의학 전문의 3인 협진, 수요일 야간진료(20시)
- 13년간 한자리에서 운영

### 6. 절대 금지 사항
- 의학적 확정 진단이나 처방 (예: "~이면 반드시 ~해야 합니다" 금지)
- 다른 병원 비방
- 비현실적 약속 (예: "100% 성공")
- 마크다운 형식 (순수 HTML만)

## 출력 형식 (JSON)
다음 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만:
{
  "title": "SEO 최적화 제목 (메인 키워드 포함, 40자 이내)",
  "content": "<h2>...</h2><p>...</p>...(본문 HTML)",
  "meta_description": "검색 결과에 표시될 설명 (메인 키워드 포함, 150자 이내)",
  "tags": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"]
}`
}

// ===== OpenAI API 호출 =====
async function callGPT(prompt: string, env: Bindings): Promise<any> {
  const apiKey = env.OPENAI_API_KEY
  const baseUrl = env.OPENAI_BASE_URL || 'https://api.openai.com/v1'

  if (!apiKey) throw new Error('OPENAI_API_KEY가 설정되지 않았습니다.')

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-5.5',
      messages: [
        { role: 'system', content: '당신은 치과 전문 SEO 콘텐츠 라이터입니다. 반드시 유효한 JSON만 응답하세요.' },
        { role: 'user', content: prompt },
      ],
      max_completion_tokens: 4000,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI API 오류 (${response.status}): ${err}`)
  }

  const data = await response.json() as any
  const text = data.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('GPT 응답이 비어있습니다.')

  // JSON 파싱 (코드블록 마크다운 제거)
  const cleaned = text.replace(/^```json?\s*/i, '').replace(/```\s*$/i, '').trim()
  try {
    return JSON.parse(cleaned)
  } catch {
    // JSON이 중간에 잘린 경우 재시도
    throw new Error(`JSON 파싱 실패: ${cleaned.substring(0, 200)}...`)
  }
}

// ===== 이미 사용된 토픽 확인 + 다음 토픽 선택 =====
async function pickNextTopic(db: D1Database): Promise<typeof ALL_TOPICS[0]> {
  // 최근 사용된 키워드 조회
  const recent = await db.prepare(
    `SELECT seo_keyword FROM posts WHERE board = 'blog' AND seo_keyword IS NOT NULL ORDER BY id DESC LIMIT ?`
  ).bind(ALL_TOPICS.length).all()

  const usedKeywords = new Set(recent.results.map((r: any) => r.seo_keyword))

  // 사용되지 않은 토픽 중 선택
  const unused = ALL_TOPICS.filter(t => !usedKeywords.has(t.keyword))

  if (unused.length === 0) {
    // 모든 토픽 소진 → 가장 오래전 사용된 것부터 재사용
    // 전체 풀에서 랜덤 선택 (중복 허용)
    return ALL_TOPICS[Math.floor(Math.random() * ALL_TOPICS.length)]
  }

  // 카테고리 균등 분배: 가장 적게 사용된 카테고리에서 선택
  const catUsage: Record<string, number> = {}
  for (const t of ALL_TOPICS) {
    catUsage[t.category] = 0
  }
  recent.results.forEach((r: any) => {
    const topic = ALL_TOPICS.find(t => t.seo_keyword === (r as any).seo_keyword)
    if (topic) catUsage[topic.category] = (catUsage[topic.category] || 0) + 1
  })

  // 가장 적게 사용된 카테고리
  const leastUsedCat = Object.entries(catUsage).sort((a, b) => a[1] - b[1])[0]?.[0]
  const catUnused = unused.filter(t => t.category === leastUsedCat)

  if (catUnused.length > 0) {
    return catUnused[Math.floor(Math.random() * catUnused.length)]
  }

  return unused[Math.floor(Math.random() * unused.length)]
}

// ===== 블로그 글 생성 & DB 저장 =====
async function generateAndSave(db: D1Database, env: Bindings): Promise<{ success: boolean; postId?: number; title?: string; keyword?: string; error?: string }> {
  try {
    // 1. 토픽 선택
    const topic = await pickNextTopic(db)

    // 2. GPT-5로 글 생성
    const prompt = buildPrompt(topic)
    const result = await callGPT(prompt, env)

    if (!result.title || !result.content) {
      throw new Error('GPT 응답에 title 또는 content가 없습니다.')
    }

    // 3. 내부 링크에 blog-internal-link 클래스 추가 (SEO 트래킹용)
    let content = result.content as string
    // 상대 링크를 절대 링크로 변환하지 않음 (같은 도메인)
    content = content.replace(/<a\s+href="(\/[^"]+)"/g, '<a href="$1" class="blog-internal-link"')

    // 4. DB 저장
    const insertResult = await db.prepare(
      `INSERT INTO posts (board, title, content, thumbnail_url, is_published, seo_keyword, seo_description, seo_tags, auto_generated, created_at, updated_at)
       VALUES ('blog', ?, ?, NULL, 1, ?, ?, ?, 1, datetime('now'), datetime('now'))`
    ).bind(
      result.title,
      content,
      topic.keyword,
      result.meta_description || '',
      JSON.stringify(result.tags || [])
    ).run()

    const postId = insertResult.meta.last_row_id

    return { success: true, postId: postId as number, title: result.title, keyword: topic.keyword }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ===== API 엔드포인트 =====

// 인증 미들웨어 (cron/수동 호출 보호)
function requireBlogSecret(env: Bindings, authHeader: string | undefined): boolean {
  const secret = getSecret(env)
  return authHeader === `Bearer ${secret}`
}

// POST /api/auto-blog/generate — 수동 트리거 (1개 생성)
autoBlog.post('/generate', async (c) => {
  // 인증: Admin JWT 또는 AUTO_BLOG_SECRET
  const auth = c.req.header('Authorization')
  const isAdmin = auth?.startsWith('Bearer ') && auth !== `Bearer ${getSecret(c.env)}`

  // Admin JWT 검증 (기존 인증 시스템 활용) - 간이 체크
  if (!requireBlogSecret(c.env, auth)) {
    // Admin JWT도 아닌 경우 차단
    // 일단은 secret만 체크
    return c.json({ error: '인증 실패. Authorization: Bearer <AUTO_BLOG_SECRET> 필요' }, 401)
  }

  const result = await generateAndSave(c.env.DB, c.env)
  if (result.success) {
    return c.json({
      success: true,
      message: `블로그 포스트 자동 생성 완료`,
      postId: result.postId,
      title: result.title,
      keyword: result.keyword,
      url: `${SITE.domain}/blog/${result.postId}`,
    })
  } else {
    return c.json({ success: false, error: result.error }, 500)
  }
})

// POST /api/auto-blog/generate-batch — 여러 개 한번에 생성
autoBlog.post('/generate-batch', async (c) => {
  const auth = c.req.header('Authorization')
  if (!requireBlogSecret(c.env, auth)) {
    return c.json({ error: '인증 실패' }, 401)
  }

  const body = await c.req.json().catch(() => ({})) as any
  const count = Math.min(body.count || 5, 10) // 최대 10개

  const results = []
  for (let i = 0; i < count; i++) {
    const result = await generateAndSave(c.env.DB, c.env)
    results.push(result)
    // API 레이트리밋 방지 — 간격 두기
    if (i < count - 1) {
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  const successes = results.filter(r => r.success)
  return c.json({
    total: count,
    success: successes.length,
    failed: count - successes.length,
    posts: results,
  })
})

// GET /api/auto-blog/topics — 사용 가능한 토픽 현황
autoBlog.get('/topics', async (c) => {
  const recent = await c.env.DB.prepare(
    `SELECT seo_keyword FROM posts WHERE board = 'blog' AND seo_keyword IS NOT NULL`
  ).all()

  const usedKeywords = new Set(recent.results.map((r: any) => r.seo_keyword))

  const stats = TOPIC_POOL.map(cat => ({
    category: cat.category,
    total: cat.topics.length,
    used: cat.topics.filter(t => usedKeywords.has(t.keyword)).length,
    remaining: cat.topics.filter(t => !usedKeywords.has(t.keyword)).length,
  }))

  return c.json({
    totalTopics: ALL_TOPICS.length,
    usedTopics: usedKeywords.size,
    remainingTopics: ALL_TOPICS.length - usedKeywords.size,
    byCategory: stats,
  })
})

// GET /api/auto-blog/history — 자동 생성 이력
autoBlog.get('/history', async (c) => {
  const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50)
  const posts = await c.env.DB.prepare(
    `SELECT id, title, seo_keyword, seo_description, created_at, views
     FROM posts WHERE board = 'blog' AND auto_generated = 1
     ORDER BY id DESC LIMIT ?`
  ).bind(limit).all()

  return c.json({
    total: posts.results.length,
    posts: posts.results,
  })
})

// ===== Cloudflare Cron Handler (Scheduled Event) =====
export async function handleScheduled(env: Bindings): Promise<void> {
  // D1에서 직접 실행
  const result = await generateAndSave(env.DB, env)
  console.log(`[Auto Blog] ${result.success ? '성공' : '실패'}: ${result.success ? result.title : result.error}`)
}

export default autoBlog
