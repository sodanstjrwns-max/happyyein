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
      // ── 확장 토픽 ──
      { keyword: '임플란트 브랜드', angle: '오스템 vs 스트라우만 vs 노벨바이오케어 — 임플란트 브랜드 비교', internalLinks: ['/treatments/implant', '/encyclopedia/implant'] },
      { keyword: '임플란트 보험', angle: '2026년 임플란트 건강보험 적용 대상과 본인부담금 총정리', internalLinks: ['/treatments/implant', '/encyclopedia/senior-implant'] },
      { keyword: '무절개 임플란트', angle: '무절개(Flapless) 임플란트란? 절개 없이 가능한 조건', internalLinks: ['/treatments/implant', '/encyclopedia/guided-surgery'] },
      { keyword: '임플란트 흡연', angle: '흡연자 임플란트, 실패율이 3배? 금연 시기와 주의사항', internalLinks: ['/treatments/implant', '/encyclopedia/implant-failure'] },
      { keyword: '임플란트 나사 풀림', angle: '임플란트 나사가 풀렸을 때 — 원인과 즉시 대처법', internalLinks: ['/treatments/implant', '/encyclopedia/implant-maintenance'] },
      { keyword: '원데이 임플란트', angle: '원데이 임플란트 가능한 경우와 불가능한 경우', internalLinks: ['/treatments/implant', '/encyclopedia/immediate-implant'] },
      { keyword: '임플란트 수술 시간', angle: '임플란트 수술 시간, 실제로 얼마나 걸릴까?', internalLinks: ['/treatments/implant', '/encyclopedia/implant'] },
      { keyword: '어금니 임플란트', angle: '어금니 임플란트 특징 — 앞니와 다른 점은?', internalLinks: ['/treatments/implant', '/encyclopedia/implant'] },
      { keyword: '임플란트 MRI', angle: '임플란트 하면 MRI 못 찍나요? 의료 상식 바로잡기', internalLinks: ['/treatments/implant', '/encyclopedia/implant'] },
      { keyword: '당뇨 임플란트', angle: '당뇨환자 임플란트 — 혈당 관리와 수술 가능 기준', internalLinks: ['/treatments/implant', '/encyclopedia/implant-failure'] },
      { keyword: '임플란트 부작용', angle: '임플란트 부작용 총정리 — 알고 하면 두렵지 않다', internalLinks: ['/treatments/implant', '/encyclopedia/peri-implantitis'] },
      { keyword: '미니 임플란트', angle: '미니 임플란트란? 적용 사례와 일반 임플란트와의 차이', internalLinks: ['/treatments/implant', '/encyclopedia/implant'] },
      { keyword: '임플란트 유지 관리', angle: '임플란트 식립 후 정기검진이 중요한 이유', internalLinks: ['/treatments/implant', '/encyclopedia/implant-maintenance'] },
      { keyword: '지르코니아 임플란트', angle: '지르코니아 vs 티타늄 임플란트 — 소재별 장단점 비교', internalLinks: ['/treatments/implant', '/encyclopedia/crown'] },
      { keyword: '임플란트 2차 수술', angle: '임플란트 2차 수술이란? 과정과 회복 기간 안내', internalLinks: ['/treatments/implant', '/encyclopedia/implant'] },
      { keyword: '골다공증 임플란트', angle: '골다공증이 있어도 임플란트 가능할까?', internalLinks: ['/treatments/implant', '/encyclopedia/bone-graft'] },
      { keyword: '임플란트 틀니', angle: '임플란트 틀니(오버덴처)란? 일반 틀니와의 차이', internalLinks: ['/treatments/implant', '/encyclopedia/all-on-4'] },
      { keyword: '임플란트 후 양치', angle: '임플란트 주변 양치법 — 워터픽과 치간칫솔 활용 가이드', internalLinks: ['/treatments/implant', '/encyclopedia/implant-maintenance'] },
      { keyword: '임플란트 잇몸 내려앉음', angle: '임플란트 후 잇몸이 내려앉았다면? 원인과 해결법', internalLinks: ['/treatments/implant', '/encyclopedia/peri-implantitis'] },
      { keyword: '임플란트 재수술', angle: '임플란트 재수술 — 실패 후 다시 할 수 있을까?', internalLinks: ['/treatments/implant', '/encyclopedia/implant-failure'] },
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
      // ── 확장 토픽 ──
      { keyword: '충치 단계', angle: '충치 1단계~4단계 — 단계별 증상과 치료법 총정리', internalLinks: ['/treatments/preservation', '/encyclopedia/cavity'] },
      { keyword: '금 인레이 vs 세라믹', angle: '금 인레이 vs 세라믹 인레이 — 무엇이 더 나을까?', internalLinks: ['/treatments/preservation', '/encyclopedia/inlay'] },
      { keyword: '신경치료 크라운', angle: '신경치료 후 크라운을 꼭 씌워야 하는 이유', internalLinks: ['/treatments/preservation', '/encyclopedia/crown'] },
      { keyword: '치아 균열', angle: '치아 균열 증후군 — 씹을 때 찌릿한 통증의 정체', internalLinks: ['/treatments/preservation', '/encyclopedia/tooth-fracture'] },
      { keyword: '뿌리 끝 염증', angle: '치근단 농양이란? 뿌리 끝에 생기는 고름의 원인과 치료', internalLinks: ['/treatments/preservation', '/encyclopedia/root-canal'] },
      { keyword: '충치 안 아파도', angle: '통증 없는 충치가 더 위험한 이유', internalLinks: ['/treatments/preservation', '/encyclopedia/cavity'] },
      { keyword: '지르코니아 크라운 수명', angle: '지르코니아 크라운 수명은? 10년 후 교체해야 할까?', internalLinks: ['/treatments/preservation', '/encyclopedia/crown'] },
      { keyword: '크라운 탈락', angle: '크라운이 빠졌을 때 — 응급 대처와 재접착 안내', internalLinks: ['/treatments/preservation', '/encyclopedia/crown'] },
      { keyword: '아말감 제거', angle: '아말감 충전물 제거해야 할까? 수은 걱정 바로잡기', internalLinks: ['/treatments/preservation', '/encyclopedia/resin'] },
      { keyword: '이차 충치', angle: '보철물 아래 이차 충치 — 왜 생기고 어떻게 예방할까?', internalLinks: ['/treatments/preservation', '/encyclopedia/cavity'] },
      { keyword: '치수 보존', angle: '신경 안 죽이고 살리는 치수 보존 치료란?', internalLinks: ['/treatments/preservation', '/encyclopedia/pulpitis'] },
      { keyword: '치아 보존 중요성', angle: '자연치아 보존이 임플란트보다 나은 이유', internalLinks: ['/treatments/preservation', '/treatments/implant'] },
      { keyword: '크라운 가격 비교', angle: '2026년 크라운 가격 — 종류별 비용과 보험 적용 여부', internalLinks: ['/treatments/preservation', '/encyclopedia/crown'] },
      { keyword: '치아 외상', angle: '넘어져서 치아가 흔들릴 때 — 외상 후 응급처치 가이드', internalLinks: ['/treatments/preservation', '/encyclopedia/tooth-fracture'] },
      { keyword: '레진 변색', angle: '레진 충전물 변색 — 언제 교체해야 할까?', internalLinks: ['/treatments/preservation', '/encyclopedia/resin'] },
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
      // ── 확장 토픽 ──
      { keyword: '교정 발치', angle: '교정 시 발치가 필요한 경우 vs 비발치 가능한 경우', internalLinks: ['/treatments/orthodontics', '/encyclopedia/extraction-ortho'] },
      { keyword: '투명교정 vs 메탈교정', angle: '투명교정 vs 메탈 브라켓 — 나에게 맞는 교정은?', internalLinks: ['/treatments/orthodontics', '/encyclopedia/clear-aligner'] },
      { keyword: '교정 고무줄', angle: '교정 고무줄(엘라스틱) 착용 안 하면 어떻게 될까?', internalLinks: ['/treatments/orthodontics', '/encyclopedia/bracket'] },
      { keyword: '교정 중 음식', angle: '교정 중 먹으면 안 되는 음식 vs 괜찮은 음식', internalLinks: ['/treatments/orthodontics', '/encyclopedia/bracket'] },
      { keyword: '앞니 교정', angle: '앞니만 교정 가능할까? 부분교정의 조건과 비용', internalLinks: ['/treatments/orthodontics', '/encyclopedia/clear-aligner'] },
      { keyword: '교정 비용 분할', angle: '치아교정 비용, 무이자 분할납부 방법 총정리', internalLinks: ['/treatments/orthodontics', '/encyclopedia/orthodontics'] },
      { keyword: '덧니 교정', angle: '덧니 교정 방법과 기간 — 발치가 꼭 필요할까?', internalLinks: ['/treatments/orthodontics', '/encyclopedia/malocclusion'] },
      { keyword: '주걱턱 교정', angle: '주걱턱(반대교합), 교정만으로 개선 가능한 경우', internalLinks: ['/treatments/orthodontics', '/encyclopedia/malocclusion'] },
      { keyword: '교정 재발', angle: '교정 후 치아가 다시 벌어졌다면? 재발 원인과 대처법', internalLinks: ['/treatments/orthodontics', '/encyclopedia/retainer'] },
      { keyword: '교정 양치법', angle: '교정 중 올바른 양치 방법 — 충치 예방 핵심 가이드', internalLinks: ['/treatments/orthodontics', '/encyclopedia/brushing'] },
      { keyword: '교정 치료 종류', angle: '2026년 치아교정 종류 총정리 — 메탈·세라믹·설측·투명', internalLinks: ['/treatments/orthodontics', '/encyclopedia/orthodontics'] },
      { keyword: '과개교합', angle: '위 이가 아래 이를 덮는다면? 과개교합의 문제와 교정', internalLinks: ['/treatments/orthodontics', '/encyclopedia/malocclusion'] },
      { keyword: '개방교합', angle: '앞니가 안 물린다면? 개방교합 원인과 치료법', internalLinks: ['/treatments/orthodontics', '/encyclopedia/malocclusion'] },
      { keyword: '50대 교정', angle: '50대에도 교정 가능할까? 중장년 교정의 모든 것', internalLinks: ['/treatments/orthodontics', '/encyclopedia/orthodontics'] },
      { keyword: '교정 상담 체크리스트', angle: '교정 상담 전 꼭 확인해야 할 10가지 질문', internalLinks: ['/treatments/orthodontics', '/philosophy'] },
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
      // ── 확장 토픽 ──
      { keyword: '글로우네이트', angle: '글로우네이트란? 라미네이트보다 얇고 자연스러운 심미 치료', internalLinks: ['/treatments/aesthetic', '/encyclopedia/laminate'] },
      { keyword: '라미네이트 부작용', angle: '라미네이트 부작용과 후회하지 않기 위한 체크 포인트', internalLinks: ['/treatments/aesthetic', '/encyclopedia/laminate'] },
      { keyword: '미백 유지 기간', angle: '치아 미백 후 얼마나 유지될까? 오래 가는 비결', internalLinks: ['/treatments/aesthetic', '/encyclopedia/bleaching'] },
      { keyword: '라미네이트 가격', angle: '2026년 라미네이트 가격 — 개당 비용과 선택 기준', internalLinks: ['/treatments/aesthetic', '/encyclopedia/laminate'] },
      { keyword: '올세라믹', angle: '올세라믹 크라운이란? 앞니에 최적인 심미 보철', internalLinks: ['/treatments/aesthetic', '/encyclopedia/crown'] },
      { keyword: '치아 성형', angle: '치아 성형의 종류 — 라미네이트·본딩·컨투어링 차이', internalLinks: ['/treatments/aesthetic', '/encyclopedia/laminate'] },
      { keyword: '테트라사이클린 변색', angle: '테트라사이클린 치아 변색, 미백으로 해결 가능할까?', internalLinks: ['/treatments/aesthetic', '/encyclopedia/tooth-discoloration'] },
      { keyword: '잇몸 미백', angle: '잇몸이 까만 이유 — 잇몸 미백(멜라닌 제거) 치료법', internalLinks: ['/treatments/aesthetic', '/encyclopedia/gummy-smile'] },
      { keyword: '임시치아', angle: '임시치아(임시 보철) 기간과 주의사항 총정리', internalLinks: ['/treatments/aesthetic', '/encyclopedia/crown'] },
      { keyword: '결혼 전 치아 관리', angle: '결혼식 전 치아 성형 & 미백 — 최적의 타이밍은?', internalLinks: ['/treatments/aesthetic', '/encyclopedia/bleaching'] },
      { keyword: '치아 보험 심미', angle: '라미네이트·미백은 보험이 될까? 심미치료 보험 가이드', internalLinks: ['/treatments/aesthetic', '/encyclopedia/laminate'] },
      { keyword: '누런 이 원인', angle: '이가 누런 이유 — 생활습관부터 치료법까지', internalLinks: ['/treatments/aesthetic', '/encyclopedia/bleaching'] },
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
      // ── 확장 토픽 ──
      { keyword: '잇몸 내려앉음', angle: '잇몸이 내려앉는 이유와 예방법 — 치은퇴축 완벽 가이드', internalLinks: ['/treatments/general', '/encyclopedia/periodontal-disease'] },
      { keyword: '전동칫솔 추천', angle: '전동칫솔 vs 일반칫솔 — 치과의사가 추천하는 선택 기준', internalLinks: ['/treatments/general', '/encyclopedia/brushing'] },
      { keyword: '치간칫솔 사용법', angle: '치간칫솔 크기 선택법과 올바른 사용 가이드', internalLinks: ['/treatments/general', '/encyclopedia/floss'] },
      { keyword: '워터픽 효과', angle: '워터픽(구강세정기) 진짜 효과 있을까? 사용법과 추천', internalLinks: ['/treatments/general', '/encyclopedia/floss'] },
      { keyword: '사랑니 매복', angle: '매복 사랑니 발치 — 일반 발치와 다른 점과 주의사항', internalLinks: ['/treatments/general', '/encyclopedia/wisdom-tooth'] },
      { keyword: '치주 수술', angle: '잇몸 수술(치주 수술)이 필요한 경우와 과정', internalLinks: ['/treatments/general', '/encyclopedia/periodontal-disease'] },
      { keyword: '입마름 구강건조증', angle: '입이 자주 마른다면? 구강건조증 원인과 해결법', internalLinks: ['/treatments/general', '/encyclopedia/halitosis'] },
      { keyword: '발치 후 주의사항', angle: '치아 발치 후 24시간 행동 수칙 — 이것만 지키세요', internalLinks: ['/treatments/general', '/encyclopedia/wisdom-tooth'] },
      { keyword: '잇몸약 효과', angle: '잇몸약, 정말 효과 있을까? 치과의사의 솔직한 답변', internalLinks: ['/treatments/general', '/encyclopedia/gingivitis'] },
      { keyword: '치석 제거', angle: '치석이 생기는 이유와 제거하지 않으면 생기는 문제', internalLinks: ['/treatments/general', '/encyclopedia/insurance-scaling'] },
      { keyword: '수면 치과', angle: '수면 치료(진정 치과)란? 자면서 치료받는 방법', internalLinks: ['/treatments/general', '/encyclopedia/dental-phobia'] },
      { keyword: '임산부 치과', angle: '임산부 치과 치료 — 가능한 시기와 주의사항 총정리', internalLinks: ['/treatments/general', '/encyclopedia/dental-checkup'] },
      { keyword: '치아 보험 가입', angle: '치아 보험 가입 전 알아야 할 핵심 사항 5가지', internalLinks: ['/treatments/general', '/encyclopedia/medical-deduction'] },
      { keyword: '불소 도포', angle: '불소 도포의 효과 — 어린이·성인 모두에게 필요한 이유', internalLinks: ['/treatments/general', '/encyclopedia/sealant'] },
      { keyword: '잇몸 붓기', angle: '잇몸이 부었을 때 집에서 할 수 있는 응급처치', internalLinks: ['/treatments/general', '/encyclopedia/gingivitis'] },
      { keyword: '혀 통증', angle: '혀가 아플 때 — 설통의 원인과 치과 치료법', internalLinks: ['/treatments/general', '/encyclopedia/stomatitis'] },
      { keyword: '치아 건강 음식', angle: '치아 건강에 좋은 음식 vs 나쁜 음식 TOP 10', internalLinks: ['/treatments/general', '/encyclopedia/cavity'] },
      { keyword: '치아 보존액', angle: '빠진 치아, 우유에 넣어라? 치아 보존 응급처치 가이드', internalLinks: ['/treatments/general', '/encyclopedia/tooth-fracture'] },
      { keyword: '나이트가드', angle: '나이트가드 맞춤 제작 vs 기성품 — 차이점과 선택법', internalLinks: ['/treatments/general', '/encyclopedia/bruxism'] },
      { keyword: '구강암 초기 증상', angle: '구강암 초기 증상 체크리스트 — 이런 증상이면 검사받으세요', internalLinks: ['/treatments/general', '/encyclopedia/dental-checkup'] },
    ]
  },
  {
    category: '치과 장비·기술',
    topics: [
      { keyword: 'CT 촬영', angle: '치과 CT(CBCT)란? 일반 엑스레이와 다른 점', internalLinks: ['/treatments/implant', '/encyclopedia/cbct'] },
      { keyword: '디지털 치과', angle: '디지털 치과 시대 — 구강스캐너부터 3D프린팅까지', internalLinks: ['/treatments/implant', '/encyclopedia/digital-dentistry'] },
      { keyword: '감염관리', angle: '치과 감염관리, 이 정도면 안심 — 멸균 시스템 공개', internalLinks: ['/treatments/general', '/encyclopedia/infection-control'] },
      { keyword: '치과 레이저', angle: '치과 레이저 치료란? 통증 적고 회복 빠른 비밀', internalLinks: ['/treatments/aesthetic', '/encyclopedia/laser'] },
      // ── 확장 토픽 ──
      { keyword: '3D 프린팅 치과', angle: '3D 프린팅으로 만드는 치아 — 디지털 보철의 미래', internalLinks: ['/treatments/implant', '/encyclopedia/digital-dentistry'] },
      { keyword: '구강스캐너', angle: '구강스캐너(iTero) — 본뜨기 없는 편안한 치과 치료', internalLinks: ['/treatments/orthodontics', '/encyclopedia/digital-dentistry'] },
      { keyword: 'CAD CAM 보철', angle: 'CAD/CAM 보철이란? 당일 제작 가능한 디지털 크라운', internalLinks: ['/treatments/preservation', '/encyclopedia/crown'] },
      { keyword: '에어샤워 치과', angle: '에어샤워 시스템이 있는 치과 — 감염관리 최전선', internalLinks: ['/treatments/general', '/encyclopedia/infection-control'] },
      { keyword: '파노라마 엑스레이', angle: '치과 파노라마 촬영, 방사선 안전할까?', internalLinks: ['/treatments/general', '/encyclopedia/cbct'] },
      { keyword: 'AI 치과 진단', angle: 'AI가 충치를 발견한다? AI 기반 치과 진단 기술의 현재', internalLinks: ['/treatments/general', '/encyclopedia/digital-dentistry'] },
      { keyword: '멸균 소독', angle: '치과 기구 멸균 과정 — 오토클레이브부터 개별포장까지', internalLinks: ['/treatments/general', '/encyclopedia/infection-control'] },
      { keyword: '치과 마취 종류', angle: '치과 마취 종류 총정리 — 국소마취·진정·전신마취 차이', internalLinks: ['/treatments/general', '/encyclopedia/local-anesthesia'] },
      { keyword: '피에조 수술', angle: '피에조(초음파) 수술이란? 뼈를 안전하게 다루는 기술', internalLinks: ['/treatments/implant', '/encyclopedia/bone-graft'] },
      { keyword: '수술용 현미경', angle: '수술용 현미경이 치과 치료 성공률을 높이는 이유', internalLinks: ['/treatments/preservation', '/encyclopedia/microscope-treatment'] },
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
      // ── 확장 토픽 ──
      { keyword: '서울역 치과', angle: '서울역 근처 치과 — 퇴근 후 진료 가능한 곳 찾기', internalLinks: ['/location', '/treatments/general'] },
      { keyword: '종로 치과', angle: '종로·종각역 직장인을 위한 치과 진료 가이드', internalLinks: ['/location', '/treatments/general'] },
      { keyword: '충무로 치과', angle: '충무로·동대입구 치과 — 접근성 좋은 동네 치과 이야기', internalLinks: ['/location', '/philosophy'] },
      { keyword: '회현역 치과', angle: '회현역·남대문 근처 치과 — 점심시간 빠른 진료', internalLinks: ['/location', '/treatments/general'] },
      { keyword: '중구 임플란트', angle: '서울 중구 임플란트 — 전문의 협진으로 안전하게', internalLinks: ['/location', '/treatments/implant', '/doctors'] },
      { keyword: '명동 교정', angle: '명동 치아교정 — 직장인 투명교정 맞춤 플랜', internalLinks: ['/location', '/treatments/orthodontics'] },
      { keyword: '을지로 미백', angle: '을지로 치아 미백 — 점심시간에 가능한 화이트닝', internalLinks: ['/location', '/treatments/aesthetic'] },
      { keyword: '서울 중구 야간 치과', angle: '야간 진료 가능한 서울 중구 치과 — 진료시간 안내', internalLinks: ['/location', '/treatments/general'] },
      { keyword: '시청 라미네이트', angle: '시청역 라미네이트 — 자연스러운 앞니 심미 치료', internalLinks: ['/location', '/treatments/aesthetic'] },
      { keyword: '남대문 치과', angle: '남대문시장 근처 치과 — 13년 한자리 신뢰의 진료', internalLinks: ['/location', '/philosophy'] },
      { keyword: '덕수궁 근처 치과', angle: '덕수궁·정동길 산책 후 들르는 치과 정기검진', internalLinks: ['/location', '/treatments/general'] },
      { keyword: '을지로 스케일링', angle: '을지로 스케일링 보험 적용 치과 — 1만원대 관리', internalLinks: ['/location', '/treatments/general'] },
    ]
  },
  {
    category: '환자 경험·소통',
    topics: [
      { keyword: '치과 선택법', angle: '좋은 치과 고르는 법 — 치과의사가 알려주는 7가지 기준', internalLinks: ['/philosophy', '/doctors'] },
      { keyword: '치료 전 질문', angle: '치과 가기 전 꼭 물어봐야 할 질문 5가지', internalLinks: ['/philosophy', '/experience'] },
      { keyword: '전문의 협진', angle: '전문의 협진이 중요한 이유 — 분과별 전문 치료의 차이', internalLinks: ['/doctors', '/encyclopedia/specialist'] },
      { keyword: '치과 후기', angle: '환자 후기로 보는 좋은 치과의 조건', internalLinks: ['/experience', '/philosophy'] },
      // ── 확장 토픽 ──
      { keyword: '치과 상담 팁', angle: '첫 치과 상담에서 꼭 확인해야 할 것들', internalLinks: ['/philosophy', '/experience'] },
      { keyword: '세컨드 오피니언', angle: '치과 세컨드 오피니언이 필요한 순간 — 과잉진료 예방법', internalLinks: ['/philosophy', '/doctors'] },
      { keyword: '치과 의사 선택', angle: '치과의사를 고르는 기준 — 경력·전문의·장비를 보세요', internalLinks: ['/doctors', '/philosophy'] },
      { keyword: '치료 계획 이해', angle: '치과 치료 계획서 읽는 법 — 이 용어만 알면 된다', internalLinks: ['/philosophy', '/experience'] },
      { keyword: '치과 불만 처리', angle: '치과 치료 결과가 불만족스러울 때 현명하게 대처하는 법', internalLinks: ['/philosophy', '/experience'] },
      { keyword: '환자 권리', angle: '치과 환자가 알아야 할 권리와 의무 — 의료법 가이드', internalLinks: ['/philosophy', '/experience'] },
      { keyword: '가족 치과', angle: '온 가족이 다니는 치과의 조건 — 소아부터 노인까지', internalLinks: ['/philosophy', '/doctors'] },
      { keyword: '치과 공포 극복 후기', angle: '치과 공포증을 극복한 환자들의 이야기', internalLinks: ['/experience', '/encyclopedia/dental-phobia'] },
      { keyword: '치과 비용 상담', angle: '치과 비용이 부담될 때 — 합리적 치료 계획 세우기', internalLinks: ['/philosophy', '/experience'] },
      { keyword: '통합치의학', angle: '통합치의학 전문의란? 한 번에 종합 진료하는 치과', internalLinks: ['/doctors', '/philosophy'] },
    ]
  },
  {
    category: '계절·시의성',
    topics: [
      { keyword: '봄 알레르기 구강', angle: '봄 알레르기가 구강 건강에 미치는 영향 — 코막힘과 입호흡의 위험', internalLinks: ['/treatments/general', '/encyclopedia/halitosis'] },
      { keyword: '여름 치과 검진', angle: '여름방학 치과 검진 — 아이 충치 예방 골든타임', internalLinks: ['/treatments/general', '/encyclopedia/sealant'] },
      { keyword: '겨울 시린 이', angle: '겨울에 유독 이가 시린 이유와 해결법', internalLinks: ['/treatments/preservation', '/encyclopedia/tooth-sensitivity'] },
      { keyword: '명절 치통 응급', angle: '명절 연휴 갑자기 이가 아플 때 — 응급 대처 가이드', internalLinks: ['/treatments/general', '/encyclopedia/pulpitis'] },
      { keyword: '새해 치과 계획', angle: '새해 구강 건강 목표 세우기 — 1년 치과 체크리스트', internalLinks: ['/treatments/general', '/encyclopedia/dental-checkup'] },
      { keyword: '수능 후 교정', angle: '수능 끝! 대학 입학 전 치아교정 시작 가이드', internalLinks: ['/treatments/orthodontics', '/encyclopedia/clear-aligner'] },
      { keyword: '졸업 미백', angle: '졸업 시즌 치아 미백 — 최적의 시작 시기와 방법', internalLinks: ['/treatments/aesthetic', '/encyclopedia/bleaching'] },
      { keyword: '장마철 구강 관리', angle: '장마철 습한 날씨, 구강 세균 번식 주의보', internalLinks: ['/treatments/general', '/encyclopedia/gingivitis'] },
      { keyword: '가을 치과 정기검진', angle: '환절기 면역력 저하와 잇몸 질환의 관계', internalLinks: ['/treatments/general', '/encyclopedia/periodontal-disease'] },
      { keyword: '어린이날 치과', angle: '어린이날 특집 — 우리 아이 치아 건강 Q&A 10선', internalLinks: ['/treatments/general', '/encyclopedia/nursing-caries'] },
      { keyword: '추석 치과 응급', angle: '추석 연휴 치과 응급 상황 대처법 — 이것만 알면 된다', internalLinks: ['/treatments/general', '/encyclopedia/tooth-fracture'] },
      { keyword: '크리스마스 미소', angle: '연말 모임 전 빛나는 미소 만들기 — 미백·라미네이트 플랜', internalLinks: ['/treatments/aesthetic', '/encyclopedia/bleaching'] },
    ]
  },
  {
    category: '생활·건강 연계',
    topics: [
      { keyword: '당뇨와 잇몸', angle: '당뇨병과 잇몸 질환의 놀라운 관계 — 혈당 관리가 치아도 살린다', internalLinks: ['/treatments/general', '/encyclopedia/periodontal-disease'] },
      { keyword: '흡연 치아', angle: '흡연이 치아에 미치는 영향 — 변색부터 임플란트 실패까지', internalLinks: ['/treatments/general', '/encyclopedia/tooth-discoloration'] },
      { keyword: '스트레스 이갈이', angle: '스트레스가 이갈이를 유발한다? 심리와 구강 건강의 연결', internalLinks: ['/treatments/general', '/encyclopedia/bruxism'] },
      { keyword: '다이어트 치아', angle: '다이어트가 치아를 망친다? 영양 불균형과 구강 건강', internalLinks: ['/treatments/general', '/encyclopedia/tooth-sensitivity'] },
      { keyword: '커피 치아 착색', angle: '커피 마시면 이가 누래진다? 착색 예방과 관리법', internalLinks: ['/treatments/aesthetic', '/encyclopedia/bleaching'] },
      { keyword: '수면무호흡 치과', angle: '수면무호흡증, 치과에서도 치료한다 — 구강 장치 요법', internalLinks: ['/treatments/general', '/encyclopedia/bruxism'] },
      { keyword: '역류성식도염 치아', angle: '역류성식도염이 치아를 녹인다? 산 부식 예방법', internalLinks: ['/treatments/preservation', '/encyclopedia/tooth-sensitivity'] },
      { keyword: '골다공증 잇몸', angle: '골다공증 약(비스포스포네이트)과 치과 치료 시 주의사항', internalLinks: ['/treatments/general', '/encyclopedia/bone-graft'] },
      { keyword: '항혈전제 발치', angle: '혈액 희석제 복용 중 발치 — 약을 끊어야 할까?', internalLinks: ['/treatments/general', '/encyclopedia/wisdom-tooth'] },
      { keyword: '치매 예방 치아', angle: '치아가 많으면 치매 위험이 줄어든다? 구강 건강과 뇌 건강', internalLinks: ['/treatments/general', '/encyclopedia/dental-checkup'] },
      { keyword: '비타민 잇몸', angle: '비타민 C·D 부족이 잇몸 질환을 부른다?', internalLinks: ['/treatments/general', '/encyclopedia/gingivitis'] },
      { keyword: '탄산음료 치아', angle: '탄산음료가 치아에 미치는 영향 — 산도(pH) 실험 결과', internalLinks: ['/treatments/preservation', '/encyclopedia/cavity'] },
    ]
  },
  {
    category: '특수 대상',
    topics: [
      { keyword: '임산부 치과 치료 시기', angle: '임신 중 치과 치료, 언제가 안전할까? 삼분기별 가이드', internalLinks: ['/treatments/general', '/encyclopedia/dental-checkup'] },
      { keyword: '어린이 첫 치과', angle: '아이 첫 치과 방문 가이드 — 몇 살부터, 어떻게?', internalLinks: ['/treatments/general', '/encyclopedia/nursing-caries'] },
      { keyword: '노인 구강 관리', angle: '70대 이상 구강 관리 — 틀니 관리와 건조증 극복법', internalLinks: ['/treatments/general', '/encyclopedia/dental-checkup'] },
      { keyword: '장애인 치과', angle: '장애인 환자를 위한 치과 진료 환경과 진정 치료', internalLinks: ['/treatments/general', '/encyclopedia/dental-phobia'] },
      { keyword: '외국인 치과', angle: '외국인을 위한 서울 치과 진료 가이드(English-friendly)', internalLinks: ['/location', '/treatments/general'] },
      { keyword: '수험생 치아 관리', angle: '수험생 치아 관리 팁 — 시험 기간 구강 건강 지키기', internalLinks: ['/treatments/general', '/encyclopedia/cavity'] },
      { keyword: '유치 관리', angle: '유치가 중요한 이유 — 빠질 이라고 방치하면 안 되는 이유', internalLinks: ['/treatments/general', '/encyclopedia/nursing-caries'] },
      { keyword: '사춘기 교정', angle: '사춘기 자녀 교정 — 부모가 알아야 할 심리적 고려사항', internalLinks: ['/treatments/orthodontics', '/encyclopedia/orthodontics'] },
      { keyword: '갱년기 구강', angle: '갱년기 여성의 구강 변화 — 호르몬과 잇몸의 관계', internalLinks: ['/treatments/general', '/encyclopedia/periodontal-disease'] },
      { keyword: '직장인 구강 건강', angle: '바쁜 직장인을 위한 최소한의 구강 관리 루틴', internalLinks: ['/treatments/general', '/encyclopedia/brushing'] },
    ]
  },
  {
    category: '치과 상식·궁금증',
    topics: [
      { keyword: '치아 개수', angle: '사람 치아는 몇 개? 치아 번호와 명칭 총정리', internalLinks: ['/encyclopedia/tooth-structure', '/treatments/general'] },
      { keyword: '치아 재생', angle: '치아 재생 기술은 어디까지 왔을까? 2026년 최신 연구', internalLinks: ['/treatments/general', '/encyclopedia/implant'] },
      { keyword: '치아 색깔', angle: '건강한 치아 색깔은? 너무 하얀 이도 문제일 수 있다', internalLinks: ['/treatments/aesthetic', '/encyclopedia/bleaching'] },
      { keyword: '치과 방사선 안전', angle: '치과 엑스레이, 방사선 걱정해야 할까? 안전성 총정리', internalLinks: ['/treatments/general', '/encyclopedia/cbct'] },
      { keyword: '마취 안 듣는 이유', angle: '치과 마취가 안 먹히는 사람이 있다? 원인과 해결법', internalLinks: ['/treatments/general', '/encyclopedia/local-anesthesia'] },
      { keyword: '치아 보험 비교', angle: '2026년 치아 보험 상품 비교 — 가입 전 꼭 체크할 것', internalLinks: ['/treatments/general', '/encyclopedia/medical-deduction'] },
      { keyword: '치과 용어 정리', angle: '치과에서 자주 듣는 용어 20가지 — 쉽게 풀어드립니다', internalLinks: ['/encyclopedia', '/treatments/general'] },
      { keyword: '치아에 좋은 습관', angle: '치과의사가 매일 하는 구강 관리 습관 5가지', internalLinks: ['/treatments/general', '/encyclopedia/brushing'] },
      { keyword: '치과 진료 과목', angle: '치과 진료 과목 완벽 가이드 — 보존·보철·교정·외과 차이', internalLinks: ['/doctors', '/encyclopedia/specialist'] },
      { keyword: '치아 변색 원인 음식', angle: '치아 변색시키는 음식 TOP 10과 예방법', internalLinks: ['/treatments/aesthetic', '/encyclopedia/tooth-discoloration'] },
      { keyword: '양치 타이밍', angle: '식후 바로 양치 vs 30분 후? 올바른 양치 타이밍', internalLinks: ['/treatments/general', '/encyclopedia/brushing'] },
      { keyword: '가글 효과', angle: '가글(구강 세정제) 매일 써도 될까? 올바른 사용법', internalLinks: ['/treatments/general', '/encyclopedia/gingivitis'] },
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
