// 치료비용 SEO 전용 랜딩페이지 — "임플란트 비용", "교정 가격" 등 전환율 최고 키워드 대응
import { head, nav, footer, scripts } from './layout'

interface CostPage {
  slug: string;
  treatment: string;
  title: string;
  metaDesc: string;
  keywords: string;
  heroTitle: string;
  heroDesc: string;
  priceRange: string;
  insuranceNote: string;
  factors: { title: string; desc: string; icon: string }[];
  process: { step: string; desc: string; cost: string }[];
  whyUs: string[];
  faq: { q: string; a: string }[];
  relatedTreatments: string[];
  ctaText: string;
  doctor: string;
}

const SITE_DOMAIN = 'https://happyyein.kr';

const costPages: CostPage[] = [
  {
    slug: 'implant-cost',
    treatment: '임플란트',
    title: '임플란트 비용 안내 | 행복한예인치과 시청역·명동',
    metaDesc: '시청역·명동 임플란트 비용 투명 안내. 발치즉시 임플란트 80%+ 시행, 65세 이상 건강보험 적용. CT 정밀진단 후 맞춤 비용. 과잉진료 없는 합리적 가격. 행복한예인치과 02-756-2828',
    keywords: '임플란트 비용, 임플란트 가격, 시청역 임플란트 비용, 명동 임플란트 가격, 임플란트 얼마, 발치즉시 임플란트 비용, 임플란트 보험',
    heroTitle: '임플란트 비용,<br>솔직하게 알려드립니다',
    heroDesc: 'CT 촬영 기반 정밀 진단 후, 환자 상태에 맞는 정확한 비용을 안내합니다. 불필요한 추가 비용 없이 투명하게.',
    priceRange: '65세 이상 건강보험 적용 시 본인부담 약 30~50만원 / 비보험 개별 상담',
    insuranceNote: '65세 이상 환자분은 평생 2개까지 건강보험 적용이 가능합니다. 보험 적용 여부와 절차를 상세히 안내해 드립니다.',
    factors: [
      { title: '잔존 골량', desc: '뼈가 충분하면 골이식 없이 바로 식립 가능. 골이식이 필요하면 추가 비용이 발생합니다.', icon: 'fas fa-bone' },
      { title: '식립 위치', desc: '앞니/어금니, 상악/하악에 따라 난이도가 달라집니다. 상악동 거상술 필요 시 별도 안내.', icon: 'fas fa-tooth' },
      { title: '보철물 종류', desc: '지르코니아, PFM 등 보철 재질에 따라 비용 차이. 내구성·심미성 기준으로 최적 추천.', icon: 'fas fa-crown' },
      { title: '추가 시술', desc: '발치, 골이식, 상악동 거상술 등 동시 시행 여부에 따라 최종 비용이 결정됩니다.', icon: 'fas fa-plus-circle' },
    ],
    process: [
      { step: 'CT 촬영 & 상담', desc: '3D CT로 잔존 골량, 신경 위치 등을 정밀 분석합니다.', cost: '상담 무료' },
      { step: '치료 계획 수립', desc: '환자 맞춤 치료 계획과 정확한 비용을 안내합니다.', cost: '추가 비용 없음' },
      { step: '임플란트 식립', desc: '발치즉시 or 일반 식립. 80%+ 즉시식립 시행.', cost: '식립비 포함' },
      { step: '치유 기간', desc: '2~4개월 골유착 기간. 임시 보철로 심미성 유지.', cost: '추가 비용 없음' },
      { step: '최종 보철', desc: '맞춤 크라운 제작 및 장착으로 치료 완료.', cost: '보철비 포함' },
    ],
    whyUs: [
      '통합치의학 전문의·치의학 박사 한승대 원장 직접 시술',
      '80% 이상 발치즉시 임플란트 — 내원 횟수 최소화',
      '13년간 한자리 — 장기 A/S 및 관리 보장',
      '65세 이상 건강보험 적용 안내 및 절차 지원',
      '과잉진료 없는 투명한 비용 안내',
    ],
    faq: [
      { q: '임플란트 1개 비용이 얼마인가요?', a: '임플란트 비용은 환자의 골 상태, 식립 위치, 보철 재질에 따라 달라집니다. CT 촬영 후 정확한 비용을 안내해 드리며, 65세 이상은 건강보험 적용으로 본인부담이 크게 줄어듭니다. 상담은 무료이니 부담 없이 내원해 주세요.' },
      { q: '골이식 비용은 별도인가요?', a: '골이식이 필요한 경우 별도 비용이 발생합니다. 다만 행복한예인치과에서는 발치즉시 임플란트 시 소량의 골이식은 기본 포함되는 경우가 많습니다. 정확한 비용은 CT 진단 후 안내합니다.' },
      { q: '분할 납부가 가능한가요?', a: '네, 무이자 분할 납부가 가능합니다. 카드 할부, 치과 자체 분할 납부 등 다양한 결제 방식을 지원합니다. 상담 시 안내해 드립니다.' },
      { q: '다른 치과보다 비싼가요? 싼가요?', a: '행복한예인치과는 합리적인 가격을 유지합니다. 무조건 싼 가격보다는 정확한 진단, 전문의 직접 시술, 장기적 결과를 중요시합니다. 불필요한 치료를 권하지 않아 총 치료비가 오히려 낮은 경우가 많습니다.' },
      { q: '임플란트 수명은 얼마나 되나요?', a: '올바른 관리 시 10~20년 이상 사용 가능합니다. 행복한예인치과에서는 정기 검진과 관리 프로그램을 통해 임플란트 수명을 최대한 연장해 드립니다. 13년 한자리 치과이기에 장기 관리가 가능합니다.' },
    ],
    relatedTreatments: ['preservation-cost', 'orthodontics-cost'],
    ctaText: '임플란트 비용 상담 예약',
    doctor: '한승대 대표원장 (통합치의학 전문의, 치의학 박사)',
  },
  {
    slug: 'preservation-cost',
    treatment: '신경치료',
    title: '신경치료 비용 안내 | 행복한예인치과 보존과 전문의',
    metaDesc: '시청역·명동 신경치료 비용 안내. 보존과 전문의 미세현미경 신경치료. 건강보험 적용 항목. 자연치아 최대한 보존. 행복한예인치과 02-756-2828',
    keywords: '신경치료 비용, 신경치료 가격, 근관치료 비용, 시청역 신경치료, 명동 신경치료, 미세현미경 신경치료 비용',
    heroTitle: '신경치료 비용,<br>보험 적용부터 안내합니다',
    heroDesc: '보존과 전문의 신정희 원장의 미세현미경 정밀 신경치료. 건강보험 적용으로 부담을 줄여드립니다.',
    priceRange: '건강보험 적용 시 본인부담 약 3~8만원 (치아 위치·근관 수에 따라)',
    insuranceNote: '신경치료는 건강보험 적용 항목입니다. 본인부담금만으로 치료가 가능하며, 치아 위치(앞니/어금니)와 근관 수에 따라 비용이 달라집니다.',
    factors: [
      { title: '치아 위치', desc: '앞니(1개 근관)와 어금니(3~4개 근관)는 난이도와 시간이 다릅니다.', icon: 'fas fa-tooth' },
      { title: '재신경치료 여부', desc: '이전 신경치료 실패 후 재치료는 난이도가 높아 비용이 달라질 수 있습니다.', icon: 'fas fa-redo' },
      { title: '보철물 종류', desc: '신경치료 후 크라운 재질(지르코니아, PFM, 금)에 따라 보철 비용이 달라집니다.', icon: 'fas fa-crown' },
      { title: '미세현미경 사용', desc: '미세현미경 활용 시 정밀도가 높아져 성공률이 크게 향상됩니다.', icon: 'fas fa-microscope' },
    ],
    process: [
      { step: '진단 & X-ray', desc: '디지털 X-ray로 감염 범위와 근관 상태를 확인합니다.', cost: '보험 적용' },
      { step: '마취 & 접근', desc: '충분한 마취 후 충치 제거 및 근관 접근.', cost: '보험 적용' },
      { step: '근관 세척·성형', desc: '미세현미경으로 근관 내부를 정밀 세척·소독합니다.', cost: '보험 적용' },
      { step: '근관 충전', desc: '세척된 근관을 충전재로 밀봉합니다.', cost: '보험 적용' },
      { step: '크라운 보철', desc: '신경치료 완료 후 크라운으로 치아를 보호합니다.', cost: '재질별 별도' },
    ],
    whyUs: [
      '보존과 전문의 신정희 원장 직접 시행',
      '미세현미경(10~25배 확대) 정밀 치료',
      '치의학 박사 학위 — 학술적 근거 기반',
      '건강보험 적용으로 합리적 비용',
      '자연치아 보존 최우선 원칙',
    ],
    faq: [
      { q: '신경치료 비용이 얼마인가요?', a: '신경치료는 건강보험이 적용되어 본인부담 약 3~8만원입니다. 치아 위치(앞니/어금니)와 근관 수에 따라 달라지며, 치료 후 크라운은 재질에 따라 별도 비용이 발생합니다.' },
      { q: '신경치료는 몇 번 내원해야 하나요?', a: '보통 2~3회 내원이 필요합니다. 감염 정도에 따라 달라질 수 있으며, 미세현미경 치료로 정밀하게 진행하기 때문에 재치료 가능성을 최소화합니다.' },
      { q: '신경치료 후 크라운을 꼭 해야 하나요?', a: '네, 대부분의 경우 크라운이 필요합니다. 신경치료를 받은 치아는 혈액 공급이 끊겨 약해지므로, 크라운으로 보호해야 장기적으로 치아를 유지할 수 있습니다.' },
      { q: '미세현미경 신경치료가 일반 치료보다 비싼가요?', a: '미세현미경 사용 자체에 추가 비용은 없습니다. 행복한예인치과에서는 보존과 전문의가 모든 신경치료에 미세현미경을 사용하며, 이는 치료 성공률을 크게 높입니다.' },
    ],
    relatedTreatments: ['implant-cost', 'aesthetic-cost'],
    ctaText: '신경치료 비용 상담 예약',
    doctor: '신정희 원장 (보존과 전문의, 치의학 박사)',
  },
  {
    slug: 'orthodontics-cost',
    treatment: '치아교정',
    title: '교정 비용 안내 | 투명교정·메탈교정 | 행복한예인치과',
    metaDesc: '시청역·명동 교정 비용 안내. 교정 전문의 박현미 원장 직접 시행. 투명교정(인비절라인), 메탈교정, 부분교정 비용 투명 안내. 행복한예인치과 02-756-2828',
    keywords: '교정 비용, 치아교정 가격, 투명교정 비용, 인비절라인 가격, 시청역 교정 비용, 명동 교정, 부분교정 비용',
    heroTitle: '교정 비용,<br>전문의가 직접 안내합니다',
    heroDesc: '교정 전문의 박현미 원장이 교합 상태를 진단하고, 최적의 교정 방법과 정확한 비용을 안내합니다.',
    priceRange: '교합 상태별 맞춤 안내 / 부분교정~전체교정 / 분할 납부 가능',
    insuranceNote: '교정치료는 비보험 항목이나, 분할 납부(무이자 할부)로 부담을 줄일 수 있습니다. 부분교정의 경우 전체교정 대비 합리적 비용.',
    factors: [
      { title: '교정 범위', desc: '부분교정(앞니 6개)과 전체교정(전체 치아)은 비용 차이가 큽니다.', icon: 'fas fa-arrows-alt-h' },
      { title: '장치 종류', desc: '투명교정(인비절라인), 세라믹, 메탈 등 장치 종류에 따라 비용이 달라집니다.', icon: 'fas fa-align-center' },
      { title: '교정 기간', desc: '교합 복잡도에 따라 6개월~2년. 기간이 길수록 유지 관리 비용 포함.', icon: 'fas fa-calendar-alt' },
      { title: '발치 여부', desc: '교정을 위한 발치가 필요한 경우 별도 비용이 발생할 수 있습니다.', icon: 'fas fa-minus-circle' },
    ],
    process: [
      { step: '교정 상담', desc: '교정 전문의가 교합 상태를 진단하고 치료 방향을 설명합니다.', cost: '상담 무료' },
      { step: '정밀 검사', desc: '세팔로, 파노라마, 구강 스캔으로 정밀 분석합니다.', cost: '검사비 포함' },
      { step: '치료 계획', desc: '3D 시뮬레이션으로 예상 결과를 미리 확인합니다.', cost: '계획 수립 포함' },
      { step: '교정 장치 장착', desc: '선택한 장치(투명/세라믹/메탈)를 장착합니다.', cost: '장치비 포함' },
      { step: '정기 내원', desc: '4~6주 간격 내원하여 조정합니다.', cost: '조정비 포함' },
    ],
    whyUs: [
      '교정 전문의 박현미 원장 직접 시행',
      '투명교정(인비절라인) — 직장인 맞춤, 티 안 남',
      '3D 디지털 교정 시뮬레이션',
      '시청역·명동·을지로 접근성 — 정기 내원 편리',
      '수요일 야간진료 — 퇴근 후 교정 조정 가능',
    ],
    faq: [
      { q: '투명교정 비용이 메탈교정보다 비싼가요?', a: '일반적으로 투명교정이 메탈교정보다 비용이 높습니다. 하지만 심미성, 편의성, 구강 위생 관리 측면에서 장점이 크며, 특히 직장인분들에게 인기가 높습니다. 정확한 비용 차이는 상담 시 안내합니다.' },
      { q: '교정 비용을 한 번에 내야 하나요?', a: '아닙니다. 무이자 분할 납부가 가능합니다. 카드 할부, 치과 자체 분할 등 다양한 결제 방식을 제공합니다.' },
      { q: '부분교정은 비용이 얼마나 저렴한가요?', a: '부분교정은 전체교정 대비 상당히 합리적입니다. 앞니 6개 정도만 교정하는 경우 기간도 짧고 비용도 낮아집니다. 교정 전문의 진단 후 부분교정 가능 여부를 판단합니다.' },
      { q: '교정 기간은 보통 얼마나 걸리나요?', a: '부분교정 6개월~1년, 전체교정 1~2년이 일반적입니다. 교합 상태에 따라 달라지며, 교정 전문의가 정확한 예상 기간을 안내합니다.' },
    ],
    relatedTreatments: ['aesthetic-cost', 'implant-cost'],
    ctaText: '교정 비용 상담 예약',
    doctor: '박현미 원장 (교정 전문의)',
  },
  {
    slug: 'aesthetic-cost',
    treatment: '심미치료',
    title: '라미네이트·레진 비용 안내 | 행복한예인치과',
    metaDesc: '시청역·명동 라미네이트·레진 심미치료 비용 안내. 앞니 심미보철, 라미네이트, 레진 충전, 치아미백 비용. 최소삭제 원칙. 행복한예인치과 02-756-2828',
    keywords: '라미네이트 비용, 레진 가격, 앞니 치료 비용, 심미치료 가격, 치아미백 비용, 시청역 라미네이트, 명동 심미치료',
    heroTitle: '심미치료 비용,<br>아름다움에도 합리적 가격을',
    heroDesc: '최소삭제 원칙의 라미네이트, 당일 완성 레진, 치아미백까지. 투명하고 합리적인 비용.',
    priceRange: '레진 1개당 / 라미네이트 1개당 / 미백 별도 — 개별 상담',
    insuranceNote: '심미치료는 비보험 항목이나, 레진 충전의 경우 충치 치료 목적이면 건강보험 일부 적용 가능합니다.',
    factors: [
      { title: '시술 종류', desc: '레진, 라미네이트, 올세라믹 크라운 등 선택에 따라 비용 차이.', icon: 'fas fa-star' },
      { title: '치아 개수', desc: '시술 치아 수에 따라 총 비용이 달라집니다. 여러 개 동시 시 패키지 안내.', icon: 'fas fa-list-ol' },
      { title: '치아 상태', desc: '변색, 파절, 간격 등 현재 상태에 따라 적합한 시술이 달라집니다.', icon: 'fas fa-search' },
      { title: '재료 등급', desc: '국산/수입 라미네이트, 레진 브랜드에 따라 비용 차이.', icon: 'fas fa-gem' },
    ],
    process: [
      { step: '상담 & 디자인', desc: '원하는 치아 모양과 색상을 상담합니다.', cost: '상담 무료' },
      { step: '치아 준비', desc: '최소삭제 원칙으로 치아를 준비합니다.', cost: '시술비 포함' },
      { step: '제작 & 장착', desc: '맞춤 제작 후 정밀 접착합니다.', cost: '재료비 포함' },
      { step: '사후 관리', desc: '장착 후 교합 확인 및 관리 안내.', cost: '추가 비용 없음' },
    ],
    whyUs: [
      '최소삭제 원칙 — 치아 보존 최우선',
      '라미네이트 권하지 않을 땐 솔직히 "레진으로 충분합니다" 안내',
      '즉일 완성 가능한 레진 심미 수복',
      '자연스러운 색상 매칭 기술',
      '13년 심미치료 경험',
    ],
    faq: [
      { q: '라미네이트와 레진 중 뭐가 좋은가요?', a: '변색 범위가 작거나 간격이 좁으면 레진으로 충분한 경우가 많습니다. 행복한예인치과에서는 무조건 라미네이트를 권하지 않고, 레진으로 해결 가능하면 레진을 추천합니다. 비용 대비 최적의 방법을 안내합니다.' },
      { q: '레진 수복은 오래 가나요?', a: '레진은 평균 5~7년 유지됩니다. 정기 검진과 올바른 관리 시 더 오래 사용할 수 있습니다. 라미네이트(10~15년)보다 수명은 짧지만, 추가 삭제 없이 교체가 가능합니다.' },
      { q: '앞니 레진 비용은 얼마인가요?', a: '앞니 레진 비용은 시술 범위와 개수에 따라 달라집니다. 충치 치료 목적이면 보험 적용이 될 수 있고, 심미 목적이면 비보험입니다. 정확한 비용은 상담 시 안내합니다.' },
      { q: '라미네이트는 치아를 많이 깎나요?', a: '행복한예인치과에서는 최소삭제 원칙을 적용합니다. 0.3~0.5mm 정도만 삭제하며, 최근에는 무삭제 라미네이트도 가능한 경우가 있습니다. 치아 상태에 따라 최적 방법을 안내합니다.' },
    ],
    relatedTreatments: ['preservation-cost', 'orthodontics-cost'],
    ctaText: '심미치료 비용 상담 예약',
    doctor: '한승대 대표원장 (통합치의학 전문의)',
  },
  {
    slug: 'scaling-cost',
    treatment: '스케일링',
    title: '스케일링 비용 안내 | 건강보험 적용 | 행복한예인치과',
    metaDesc: '스케일링 비용 건강보험 적용 연 1회. 본인부담 약 1~2만원. 시청역·명동·을지로 직장인 점심시간·수요일 야간 이용 가능. 행복한예인치과 02-756-2828',
    keywords: '스케일링 비용, 스케일링 가격, 스케일링 보험, 치석 제거 비용, 시청역 스케일링, 명동 스케일링',
    heroTitle: '스케일링 비용,<br>보험으로 부담 없이',
    heroDesc: '건강보험 적용 연 1회, 본인부담 약 1~2만원. 점심시간이나 수요일 야간에 편하게 받으세요.',
    priceRange: '건강보험 적용 시 본인부담 약 1~2만원 (연 1회)',
    insuranceNote: '만 19세 이상 건강보험 가입자는 연 1회 스케일링 보험 적용이 가능합니다. 1월 1일 기준 매년 갱신됩니다.',
    factors: [
      { title: '보험 적용 여부', desc: '연 1회 보험 적용 시 본인부담 1~2만원. 추가 시 비보험 적용.', icon: 'fas fa-shield-alt' },
      { title: '잇몸 상태', desc: '치주질환이 동반된 경우 잇몸치료(큐렛, SRP)가 추가될 수 있습니다.', icon: 'fas fa-leaf' },
      { title: '치석 정도', desc: '치석이 많은 경우 시간이 더 소요될 수 있으나 추가 비용은 없습니다.', icon: 'fas fa-layer-group' },
    ],
    process: [
      { step: '구강 검진', desc: '치아·잇몸 상태를 전체 점검합니다.', cost: '보험 적용' },
      { step: '스케일링', desc: '초음파 기구로 치석을 제거합니다.', cost: '보험 본인부담 1~2만원' },
      { step: '연마 & 관리', desc: '치아 표면 연마 후 관리법을 안내합니다.', cost: '추가 비용 없음' },
    ],
    whyUs: [
      '예약 시간 철저 준수 — 대기 시간 최소',
      '점심시간 이용 가능 (시청역 5분, 을지로 7분)',
      '수요일 야간진료(20시까지) — 퇴근 후 편리',
      '잇몸 상태 동시 점검 — 조기 발견·조기 치료',
    ],
    faq: [
      { q: '스케일링 비용이 얼마인가요?', a: '건강보험 적용 시 본인부담 약 1~2만원입니다. 연 1회 보험 적용이 가능하며, 만 19세 이상이면 누구나 해당됩니다. 추가 스케일링은 비보험으로 진행됩니다.' },
      { q: '스케일링은 얼마나 자주 받아야 하나요?', a: '건강보험 기준 연 1회이나, 잇몸 상태에 따라 6개월~1년 간격을 권장합니다. 흡연자, 치주질환 위험군은 더 자주 받는 것이 좋습니다.' },
      { q: '스케일링 후 이가 시린 건 정상인가요?', a: '스케일링 후 일시적으로 시린 증상이 있을 수 있습니다. 치석이 제거되면서 노출된 치아 면이 민감해지는 것으로, 보통 1~2주 내 자연 완화됩니다.' },
    ],
    relatedTreatments: ['preservation-cost', 'implant-cost'],
    ctaText: '스케일링 예약',
    doctor: '행복한예인치과 전문 위생사',
  },
  {
    slug: 'crown-cost',
    treatment: '크라운(보철)',
    title: '크라운 비용 안내 | 지르코니아·PFM·금 | 행복한예인치과',
    metaDesc: '시청역·명동 크라운 비용 안내. 지르코니아, PFM, 금 크라운 재질별 투명 비용. 신경치료·충치 후 크라운 보철. 행복한예인치과 02-756-2828',
    keywords: '크라운 비용, 지르코니아 크라운 가격, PFM 크라운, 금 크라운 비용, 보철 비용, 시청역 크라운',
    heroTitle: '크라운 비용,<br>재질별 솔직 안내',
    heroDesc: '지르코니아, PFM, 금 크라운. 재질별 장단점과 비용을 투명하게 안내합니다.',
    priceRange: '재질별(지르코니아/PFM/금) 개별 안내',
    insuranceNote: '크라운은 기본적으로 비보험이나, 12세 이하 아동의 기성 크라운은 건강보험 적용됩니다.',
    factors: [
      { title: '재질 선택', desc: '지르코니아(심미+강도), PFM(심미), 금(내구성) 등 재질별 비용 차이.', icon: 'fas fa-crown' },
      { title: '치아 위치', desc: '앞니(심미 중요)와 어금니(강도 중요)에 따라 추천 재질이 달라집니다.', icon: 'fas fa-tooth' },
      { title: '기초 치료', desc: '신경치료, 코어(지대주) 포함 여부에 따라 총 비용 달라짐.', icon: 'fas fa-tools' },
    ],
    process: [
      { step: '상담 & 재질 선택', desc: '치아 상태와 예산에 맞는 최적 재질을 추천합니다.', cost: '상담 무료' },
      { step: '치아 삭제 & 인상', desc: '크라운을 씌우기 위해 치아를 다듬고 본을 뜹니다.', cost: '시술비 포함' },
      { step: '임시 크라운', desc: '최종 크라운 제작 기간(약 1주) 동안 임시 크라운 장착.', cost: '추가 비용 없음' },
      { step: '최종 장착', desc: '맞춤 제작된 크라운을 정밀 접착합니다.', cost: '재질비 포함' },
    ],
    whyUs: [
      '환자 상태·예산에 맞는 솔직한 재질 추천',
      '고품질 국내 기공소 협력 — 정밀 제작',
      '교합 정밀 조정 — 불편감 최소화',
      '보증 기간 내 무상 A/S',
    ],
    faq: [
      { q: '지르코니아 크라운과 PFM 크라운의 차이는?', a: '지르코니아는 강도와 심미성이 모두 뛰어나 최근 가장 많이 선택됩니다. PFM은 금속 위에 도자기를 올린 것으로 비용이 더 합리적이나, 잇몸 변색 가능성이 있습니다.' },
      { q: '금 크라운은 언제 추천하나요?', a: '어금니 중 교합력이 강한 부위에 추천합니다. 금은 생체친화성이 좋고 마모율이 자연치아와 유사해 장기 사용에 유리합니다.' },
      { q: '크라운 수명은 얼마나 되나요?', a: '재질에 따라 다르지만, 지르코니아·금 크라운은 10~15년 이상 사용 가능합니다. 올바른 관리와 정기 검진이 수명 연장의 핵심입니다.' },
    ],
    relatedTreatments: ['preservation-cost', 'implant-cost'],
    ctaText: '크라운 비용 상담 예약',
    doctor: '한승대 대표원장 (통합치의학 전문의)',
  },
  {
    slug: 'whitening-cost',
    treatment: '치아미백',
    title: '치아미백 비용 안내 | 행복한예인치과 시청역·명동',
    metaDesc: '시청역·명동 치아미백 비용 안내. 전문 오피스 블리칭, 자가 미백(홈 블리칭). 변색 정도별 맞춤 미백 방법 추천. 행복한예인치과 02-756-2828',
    keywords: '치아미백 비용, 치아미백 가격, 미백 치과, 오피스 블리칭 비용, 홈 블리칭, 시청역 미백, 명동 치아미백',
    heroTitle: '치아미백 비용,<br>밝은 미소의 시작',
    heroDesc: '전문 미백(오피스 블리칭)과 자가 미백(홈 블리칭). 변색 상태에 맞는 최적 방법을 안내합니다.',
    priceRange: '오피스 블리칭 / 홈 블리칭 / 듀얼 미백 — 개별 상담',
    insuranceNote: '치아미백은 비보험 심미시술입니다. 변색 원인에 따라 스케일링(보험)으로 해결되는 경우도 있어 먼저 진단합니다.',
    factors: [
      { title: '미백 방법', desc: '오피스(치과 시술), 홈(자가), 듀얼(병행) 중 선택.', icon: 'fas fa-sun' },
      { title: '변색 정도', desc: '경미한 변색은 1~2회, 심한 변색은 여러 회 필요.', icon: 'fas fa-palette' },
      { title: '변색 원인', desc: '외인성(커피, 흡연)과 내인성(약물, 신경치료)은 미백 효과가 다릅니다.', icon: 'fas fa-search' },
    ],
    process: [
      { step: '변색 원인 진단', desc: '스케일링으로 해결 가능한지 먼저 판단합니다.', cost: '상담 무료' },
      { step: '미백 방법 선택', desc: '오피스/홈/듀얼 중 최적 방법 추천.', cost: '방법별 안내' },
      { step: '미백 시술', desc: '전문 미백제 도포 후 LED 조사 (오피스 기준).', cost: '시술비 포함' },
      { step: '유지 관리', desc: '미백 후 관리법 안내 및 유지 프로그램.', cost: '안내 제공' },
    ],
    whyUs: [
      '변색 원인 정확 진단 — 불필요한 미백 방지',
      '전문 미백제 + LED 장비 보유',
      '시술 후 시린 증상 최소화 프로토콜',
      '스케일링으로 해결되면 미백 안 권함 (솔직 상담)',
    ],
    faq: [
      { q: '치아미백은 안전한가요?', a: '전문 치과에서 시행하는 미백은 안전합니다. 미백 후 일시적으로 시린 증상이 있을 수 있지만 대부분 자연 소실됩니다.' },
      { q: '미백 효과는 얼마나 지속되나요?', a: '보통 1~2년 지속됩니다. 커피, 와인, 흡연 등 착색 원인을 줄이면 더 오래 유지됩니다. 주기적 터치업으로 효과를 연장할 수 있습니다.' },
      { q: '스케일링만으로 치아가 하얘질 수 있나요?', a: '네, 치석과 착색이 원인이라면 스케일링만으로도 상당히 밝아집니다. 먼저 스케일링을 받고 추가 미백이 필요한지 판단하는 것을 권장합니다.' },
    ],
    relatedTreatments: ['aesthetic-cost', 'scaling-cost'],
    ctaText: '미백 비용 상담 예약',
    doctor: '한승대 대표원장',
  },
  {
    slug: 'extraction-cost',
    treatment: '발치(사랑니 포함)',
    title: '발치·사랑니 발치 비용 안내 | 행복한예인치과',
    metaDesc: '시청역·명동 발치·사랑니 발치 비용 안내. 건강보험 적용. 매복 사랑니, 일반 발치 비용 투명 안내. 행복한예인치과 02-756-2828',
    keywords: '발치 비용, 사랑니 발치 비용, 사랑니 발치 가격, 매복 사랑니 비용, 시청역 사랑니, 명동 발치',
    heroTitle: '발치·사랑니 비용,<br>보험 적용으로 부담 없이',
    heroDesc: '발치는 건강보험 적용 항목입니다. 매복 사랑니도 보험 적용 가능. 정확한 비용을 안내합니다.',
    priceRange: '일반 발치 보험 적용 본인부담 약 1~3만원 / 매복 사랑니 약 3~8만원',
    insuranceNote: '발치는 건강보험 적용 항목이며, 매복 사랑니도 보험 적용됩니다. 난이도에 따라 본인부담금이 달라집니다.',
    factors: [
      { title: '발치 난이도', desc: '단순 발치와 매복(뼈 속에 묻힌) 사랑니는 난이도가 크게 다릅니다.', icon: 'fas fa-tooth' },
      { title: '매복 유형', desc: '수평매복, 수직매복, 완전매복 등 유형에 따라 시간·비용 차이.', icon: 'fas fa-arrows-alt' },
      { title: '마취 방법', desc: '국소마취가 기본이며, 불안감이 심한 경우 추가 진정 옵션.', icon: 'fas fa-syringe' },
    ],
    process: [
      { step: 'X-ray 진단', desc: '파노라마 촬영으로 사랑니 위치·형태를 정밀 확인.', cost: '보험 적용' },
      { step: '마취', desc: '표면 마취 후 주사 마취로 통증 최소화.', cost: '보험 포함' },
      { step: '발치 시술', desc: '최소 침습 방식으로 안전하게 발치.', cost: '보험 본인부담' },
      { step: '지혈 & 사후 관리', desc: '지혈 확인 후 주의사항 안내.', cost: '추가 비용 없음' },
    ],
    whyUs: [
      '건강보험 적용으로 합리적 비용',
      '최소 침습 발치 — 통증·부종 최소화',
      '매복 사랑니 풍부한 경험',
      '발치 후 임플란트 필요 시 즉시식립 가능',
    ],
    faq: [
      { q: '사랑니 발치 비용이 얼마인가요?', a: '사랑니 발치는 건강보험이 적용되어 본인부담 약 1~8만원입니다. 단순 발치는 1~3만원, 매복 사랑니는 3~8만원 정도입니다. 난이도에 따라 차이가 있으며, X-ray 촬영 후 정확한 비용을 안내합니다.' },
      { q: '매복 사랑니도 보험이 되나요?', a: '네, 매복 사랑니도 건강보험이 적용됩니다. 발치 자체뿐 아니라 X-ray 촬영, 마취, 봉합까지 모두 보험 적용됩니다.' },
      { q: '사랑니 발치 후 얼마나 아픈가요?', a: '시술 중에는 마취로 통증이 없습니다. 시술 후 2~3일간 부종과 통증이 있을 수 있으나, 처방된 진통제로 충분히 관리 가능합니다. 대부분 1주일 내 회복됩니다.' },
    ],
    relatedTreatments: ['implant-cost', 'scaling-cost'],
    ctaText: '발치 비용 상담 예약',
    doctor: '한승대 대표원장 (통합치의학 전문의)',
  },
  {
    slug: 'denture-cost',
    treatment: '틀니',
    title: '틀니 비용 안내 | 건강보험 적용 | 행복한예인치과',
    metaDesc: '시청역·명동 틀니 비용 안내. 65세 이상 건강보험 적용. 부분틀니·완전틀니 비용 투명 안내. 행복한예인치과 02-756-2828',
    keywords: '틀니 비용, 틀니 가격, 틀니 보험, 부분틀니 비용, 완전틀니 가격, 시청역 틀니, 명동 틀니',
    heroTitle: '틀니 비용,<br>보험 적용으로 편안하게',
    heroDesc: '65세 이상 건강보험 적용. 부분틀니·완전틀니 비용을 투명하게 안내합니다.',
    priceRange: '65세 이상 건강보험 적용 시 본인부담 약 12~49만원 (종류별)',
    insuranceNote: '65세 이상은 틀니 건강보험이 적용됩니다. 완전틀니(위+아래 각 1개)와 부분틀니 모두 보험 대상이며, 7년마다 재제작이 가능합니다.',
    factors: [
      { title: '틀니 종류', desc: '완전틀니(전체)와 부분틀니(일부), 금속상/레진상 선택.', icon: 'fas fa-teeth' },
      { title: '보험 적용', desc: '65세 이상 보험 적용 시 본인부담 크게 감소.', icon: 'fas fa-shield-alt' },
      { title: '잔존 치아 상태', desc: '남은 치아 상태에 따라 부분틀니 설계가 달라집니다.', icon: 'fas fa-tooth' },
    ],
    process: [
      { step: '구강 검진', desc: '잔존 치아, 잇몸 상태를 종합 평가합니다.', cost: '보험 적용' },
      { step: '인상 채득', desc: '정밀한 본을 떠서 맞춤 틀니를 설계합니다.', cost: '보험 포함' },
      { step: '제작 & 시적', desc: '기공소 맞춤 제작 후 착용감을 확인합니다.', cost: '보험 포함' },
      { step: '장착 & 조정', desc: '최종 장착 후 교합 조정 및 사용법 안내.', cost: '보험 포함' },
    ],
    whyUs: [
      '65세 이상 건강보험 적용 안내 및 절차 지원',
      '편안한 착용감을 위한 정밀 조정',
      '정기 검진을 통한 지속적 관리',
      '임플란트 오버덴쳐 옵션도 상담 가능',
    ],
    faq: [
      { q: '틀니 보험 적용 비용이 얼마인가요?', a: '65세 이상 건강보험 적용 시 완전틀니 본인부담 약 30~49만원, 부분틀니 약 12~24만원입니다. 재질(레진상/금속상)에 따라 달라지며, 7년마다 재제작 보험 적용이 가능합니다.' },
      { q: '임플란트와 틀니 중 뭐가 좋을까요?', a: '임플란트가 기능적으로 우수하지만, 전체적인 건강 상태, 잔존 골량, 예산 등을 종합 고려해야 합니다. 틀니도 잘 제작하면 충분히 만족스러운 결과를 얻을 수 있습니다. 두 방법의 장단점을 솔직하게 비교 설명드립니다.' },
      { q: '틀니 적응 기간은 얼마나 걸리나요?', a: '보통 2~4주의 적응 기간이 필요합니다. 처음에는 이물감이 있으나 점차 익숙해집니다. 불편한 부분은 내원하시면 조정해 드립니다.' },
    ],
    relatedTreatments: ['implant-cost', 'scaling-cost'],
    ctaText: '틀니 비용 상담 예약',
    doctor: '한승대 대표원장 (통합치의학 전문의)',
  },
  {
    slug: 'pediatric-cost',
    treatment: '소아 치과',
    title: '소아 치과 비용 안내 | 실란트·불소 보험 | 행복한예인치과',
    metaDesc: '시청역·명동 소아 치과 비용 안내. 실란트·불소도포 건강보험 적용. 소아 충치 치료, 유치 발치 보험. 아이 첫 치과 방문 가이드. 행복한예인치과 02-756-2828',
    keywords: '소아치과 비용, 실란트 비용, 불소도포 비용, 아이 충치 치료, 소아 치과 보험, 유치 발치 비용',
    heroTitle: '소아 치과 비용,<br>대부분 보험 적용됩니다',
    heroDesc: '실란트, 불소도포, 유치 치료 대부분 건강보험 적용. 아이의 첫 치과가 편안한 경험이 되도록.',
    priceRange: '실란트(보험) 본인부담 약 1만원/개 | 불소도포(보험) 약 1만원',
    insuranceNote: '만 18세 이하 실란트(제1·2대구치), 만 5세 이하 불소도포(6개월마다) 건강보험 적용. 유치 충치 치료도 보험 적용.',
    factors: [
      { title: '아이 나이', desc: '연령에 따라 보험 적용 항목이 달라집니다.', icon: 'fas fa-child' },
      { title: '치료 내용', desc: '실란트, 불소, 충치 치료, 발치 등 항목별 보험 여부.', icon: 'fas fa-list-check' },
      { title: '치아 상태', desc: '유치·영구치 여부, 충치 범위에 따라 비용 차이.', icon: 'fas fa-tooth' },
    ],
    process: [
      { step: '구강 검진', desc: '아이의 치아 발달 상태와 충치 여부를 확인합니다.', cost: '보험 적용' },
      { step: '예방 치료', desc: '실란트, 불소도포로 충치를 예방합니다.', cost: '보험 적용' },
      { step: '충치 치료', desc: '충치가 있으면 레진·기성 크라운으로 치료합니다.', cost: '보험 적용' },
      { step: '정기 관리', desc: '6개월마다 정기 검진을 권장합니다.', cost: '보험 적용' },
    ],
    whyUs: [
      '아이 눈높이에 맞춘 친절하고 편안한 진료',
      '대부분의 소아 치과 항목 건강보험 적용',
      '충치 예방 중심의 진료 철학',
      '부모님 동반 진료 가능',
    ],
    faq: [
      { q: '실란트 비용은 얼마인가요?', a: '실란트는 건강보험 적용으로 본인부담 약 1만원/개입니다. 만 18세 이하의 제1·2대구치에 적용 가능하며, 충치 예방 효과가 매우 높습니다.' },
      { q: '불소도포 비용은?', a: '만 5세 이하(60개월 미만) 아동은 6개월마다 불소도포 건강보험이 적용되어 본인부담 약 1만원입니다.' },
      { q: '아이가 치과를 무서워하는데 어떻게 하나요?', a: '행복한예인치과에서는 아이의 불안을 최소화하는 부드러운 접근 방식을 사용합니다. 치료 전 충분히 설명하고, 아이가 편안해지는 시간을 드립니다. 첫 방문에는 검진만 하고 적응시키는 것도 좋은 방법입니다.' },
    ],
    relatedTreatments: ['scaling-cost', 'preservation-cost'],
    ctaText: '소아 치과 예약',
    doctor: '행복한예인치과 의료진',
  },
];

// ===== 모든 비용 슬러그 반환 =====
export function getAllCostSlugs(): string[] {
  return costPages.map(p => p.slug);
}

// ===== 비용 허브 페이지 =====
export function costIndexPage(): string {
  const today = new Date().toISOString().split('T')[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "행복한예인치과 치료비용 안내",
    "description": "임플란트, 교정, 신경치료, 스케일링 등 모든 치료 비용을 투명하게 안내합니다.",
    "url": `${SITE_DOMAIN}/cost`,
    "isPartOf": { "@id": `${SITE_DOMAIN}/#website` },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": costPages.length,
      "itemListElement": costPages.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${SITE_DOMAIN}/cost/${p.slug}`,
        "name": `${p.treatment} 비용 안내`
      }))
    }
  };

  return `${head({
    title: '치료비용 안내 | 임플란트·교정·신경치료·스케일링 | 행복한예인치과',
    description: '시청역·명동·을지로 행복한예인치과 치료비용 투명 안내. 임플란트, 교정, 신경치료, 스케일링 등 건강보험 적용 항목과 비보험 비용을 솔직하게 안내합니다. 02-756-2828',
    path: '/cost',
    keywords: '치과 비용, 치과 가격, 임플란트 비용, 교정 비용, 신경치료 비용, 스케일링 비용, 시청역 치과 비용',
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '치료비용 안내', url: '/cost' },
    ],
    jsonLd: [jsonLd],
  })}
${nav()}
<section class="sub-hero">
  <div class="sub-hero-bg" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);"></div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">치료비용 안내</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">Treatment Cost Guide</div>
    <h1>치료비용,<br><em>투명하게</em> 안내합니다</h1>
    <p style="color:var(--gray);margin-top:16px;font-size:0.9rem;font-family:var(--font-kr);line-height:1.8;">
      행복한예인치과는 불필요한 추가 비용 없이,<br>환자 상태에 맞는 정확한 비용을 안내합니다.
    </p>
  </div>
</section>

<section class="page-section" style="padding:80px 24px;">
  <div class="page-inner" style="max-width:1100px;margin:0 auto;">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:24px;">
      ${costPages.map(p => `
      <a href="/cost/${p.slug}" style="display:block;padding:32px;border-radius:16px;background:var(--dark-card);border:1px solid rgba(255,255,255,0.06);transition:all 0.3s;text-decoration:none;">
        <div style="font-family:var(--font-kr);font-size:0.7rem;color:var(--gold);text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">${p.treatment}</div>
        <h3 style="font-family:var(--font-kr);font-size:1.15rem;font-weight:700;color:var(--white);margin-bottom:12px;">${p.treatment} 비용 안내</h3>
        <p style="font-family:var(--font-kr);font-size:0.82rem;color:var(--gray);line-height:1.7;margin-bottom:16px;">${p.priceRange}</p>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-family:var(--font-kr);font-size:0.75rem;color:var(--gold);font-weight:600;">자세히 보기 →</span>
        </div>
      </a>`).join('')}
    </div>

    <div style="margin-top:64px;padding:40px;border-radius:16px;background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.15);text-align:center;">
      <h3 style="font-family:var(--font-kr);font-size:1.1rem;font-weight:700;color:var(--gold);margin-bottom:12px;">💡 비용 상담은 무료입니다</h3>
      <p style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gray);line-height:1.8;margin-bottom:24px;">
        CT 촬영 기반 정밀 진단 후, 환자 상태에 맞는 정확한 비용을 안내합니다.<br>
        과잉진료 없는 투명한 비용. 부담 없이 상담해 주세요.
      </p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="tel:02-756-2828" style="padding:14px 28px;border-radius:50px;background:var(--gold);color:var(--black);font-weight:700;font-size:0.85rem;font-family:var(--font-kr);text-decoration:none;"><i class="fas fa-phone-alt"></i> 02-756-2828</a>
        <a href="https://naver.me/G0DXGZbi" target="_blank" style="padding:14px 28px;border-radius:50px;background:#03C75A;color:#fff;font-weight:700;font-size:0.85rem;font-family:var(--font-kr);text-decoration:none;"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
      </div>
    </div>
  </div>
</section>
${footer()}
${scripts()}
</body></html>`;
}

// ===== 개별 비용 페이지 렌더 =====
export function renderCostPage(slug: string): string | null {
  const page = costPages.find(p => p.slug === slug);
  if (!page) return null;

  const today = new Date().toISOString().split('T')[0];

  // JSON-LD: MedicalWebPage + Service + PriceSpecification + FAQPage + BreadcrumbList
  const medicalPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": page.title,
    "description": page.metaDesc,
    "url": `${SITE_DOMAIN}/cost/${page.slug}`,
    "datePublished": "2026-05-26",
    "dateModified": today,
    "inLanguage": "ko",
    "isPartOf": { "@id": `${SITE_DOMAIN}/#website` },
    "about": {
      "@type": "MedicalProcedure",
      "name": page.treatment,
      "procedureType": "http://schema.org/NoninvasiveProcedure",
      "howPerformed": page.process.map(s => s.desc).join('. '),
    },
    "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".cost-hero-title", ".cost-hero-desc", ".cost-price-range"]
    },
    "lastReviewed": today,
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "행복한예인치과",
    "@id": `${SITE_DOMAIN}/#organization`,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${page.treatment} 비용 안내`,
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": page.treatment,
          "description": page.metaDesc,
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "KRW",
          "description": page.priceRange,
        },
        "availableAtOrFrom": {
          "@type": "Dentist",
          "name": "행복한예인치과",
          "address": { "@type": "PostalAddress", "addressLocality": "서울 중구", "streetAddress": "남대문로9길 51 효덕빌딩 3층" }
        }
      }]
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": SITE_DOMAIN },
      { "@type": "ListItem", "position": 2, "name": "치료비용 안내", "item": `${SITE_DOMAIN}/cost` },
      { "@type": "ListItem", "position": 3, "name": `${page.treatment} 비용`, "item": `${SITE_DOMAIN}/cost/${page.slug}` },
    ]
  };

  return `${head({
    title: page.title,
    description: page.metaDesc,
    path: `/cost/${page.slug}`,
    keywords: page.keywords,
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '치료비용 안내', url: '/cost' },
      { name: `${page.treatment} 비용`, url: `/cost/${page.slug}` },
    ],
    jsonLd: [medicalPageJsonLd, serviceJsonLd, faqJsonLd, breadcrumbJsonLd],
  })}
${nav()}
<section class="sub-hero">
  <div class="sub-hero-bg" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);"></div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <a href="/cost">치료비용</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">${page.treatment}</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">${page.treatment} Cost Guide</div>
    <h1 class="cost-hero-title">${page.heroTitle}</h1>
    <p class="cost-hero-desc" style="color:var(--gray);margin-top:16px;font-size:0.9rem;font-family:var(--font-kr);line-height:1.8;">${page.heroDesc}</p>
  </div>
</section>

<section class="page-section" style="padding:80px 24px;">
  <div class="page-inner" style="max-width:900px;margin:0 auto;">

    <!-- 가격 범위 -->
    <div class="cost-price-range" style="padding:32px;border-radius:16px;background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.15);margin-bottom:48px;text-align:center;">
      <div style="font-family:var(--font-kr);font-size:0.75rem;color:var(--gold);text-transform:uppercase;letter-spacing:3px;margin-bottom:8px;">💰 비용 안내</div>
      <p style="font-family:var(--font-kr);font-size:1.1rem;font-weight:700;color:var(--white);line-height:1.6;">${page.priceRange}</p>
      <p style="font-family:var(--font-kr);font-size:0.82rem;color:var(--gray);margin-top:12px;line-height:1.7;">${page.insuranceNote}</p>
    </div>

    <!-- 비용 결정 요인 -->
    <h2 style="font-family:var(--font-kr);font-size:1.3rem;font-weight:800;color:var(--white);margin-bottom:24px;">📋 비용을 결정하는 요인</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:48px;">
      ${page.factors.map(f => `
      <div style="padding:24px;border-radius:12px;background:var(--dark-card);border:1px solid rgba(255,255,255,0.06);">
        <i class="${f.icon}" style="color:var(--gold);font-size:1.2rem;margin-bottom:12px;display:block;"></i>
        <h3 style="font-family:var(--font-kr);font-size:0.95rem;font-weight:700;color:var(--white);margin-bottom:8px;">${f.title}</h3>
        <p style="font-family:var(--font-kr);font-size:0.82rem;color:var(--gray);line-height:1.7;">${f.desc}</p>
      </div>`).join('')}
    </div>

    <!-- 치료 과정 & 비용 -->
    <h2 style="font-family:var(--font-kr);font-size:1.3rem;font-weight:800;color:var(--white);margin-bottom:24px;">🔄 치료 과정별 비용 구조</h2>
    <div style="margin-bottom:48px;">
      ${page.process.map((s, i) => `
      <div style="display:flex;gap:20px;align-items:flex-start;padding:20px 0;${i < page.process.length - 1 ? 'border-bottom:1px solid rgba(255,255,255,0.06);' : ''}">
        <div style="min-width:36px;height:36px;border-radius:50%;background:rgba(247,186,24,0.15);display:flex;align-items:center;justify-content:center;font-family:var(--font-number);font-size:1rem;color:var(--gold);">${i + 1}</div>
        <div style="flex:1;">
          <h4 style="font-family:var(--font-kr);font-size:0.95rem;font-weight:700;color:var(--white);margin-bottom:4px;">${s.step}</h4>
          <p style="font-family:var(--font-kr);font-size:0.82rem;color:var(--gray);line-height:1.6;">${s.desc}</p>
        </div>
        <div style="padding:6px 14px;border-radius:20px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);font-family:var(--font-kr);font-size:0.72rem;color:var(--gold);white-space:nowrap;">${s.cost}</div>
      </div>`).join('')}
    </div>

    <!-- 행복한예인치과를 선택해야 하는 이유 -->
    <h2 style="font-family:var(--font-kr);font-size:1.3rem;font-weight:800;color:var(--white);margin-bottom:24px;">✨ 행복한예인치과에서 ${page.treatment}을(를) 받아야 하는 이유</h2>
    <div style="padding:32px;border-radius:16px;background:var(--dark-card);border:1px solid rgba(255,255,255,0.06);margin-bottom:48px;">
      <p style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gold);margin-bottom:16px;font-weight:600;"><i class="fas fa-user-md" style="margin-right:8px;"></i>${page.doctor}</p>
      <ul style="list-style:none;padding:0;">
        ${page.whyUs.map(w => `<li style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gray-light);line-height:2;padding-left:20px;position:relative;"><span style="position:absolute;left:0;color:var(--gold);">✓</span>${w}</li>`).join('')}
      </ul>
    </div>

    <!-- FAQ -->
    <h2 style="font-family:var(--font-kr);font-size:1.3rem;font-weight:800;color:var(--white);margin-bottom:24px;">❓ 자주 묻는 질문</h2>
    <div itemscope itemtype="https://schema.org/FAQPage" style="margin-bottom:48px;">
      ${page.faq.map(f => `
      <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="padding:24px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <h4 itemprop="name" style="font-family:var(--font-kr);font-size:0.95rem;font-weight:700;color:var(--white);margin-bottom:8px;cursor:pointer;">Q. ${f.q}</h4>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text" style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gray);line-height:1.8;">${f.a}</p>
        </div>
      </div>`).join('')}
    </div>

    <!-- 관련 치료 비용 -->
    ${page.relatedTreatments.length > 0 ? `
    <h2 style="font-family:var(--font-kr);font-size:1.3rem;font-weight:800;color:var(--white);margin-bottom:24px;">🔗 관련 치료비용 안내</h2>
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:48px;">
      ${page.relatedTreatments.map(slug => {
        const related = costPages.find(p => p.slug === slug);
        return related ? `<a href="/cost/${related.slug}" style="padding:10px 20px;border-radius:24px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:var(--gold);font-size:0.82rem;font-family:var(--font-kr);text-decoration:none;transition:all 0.2s;">${related.treatment} 비용 →</a>` : '';
      }).join('')}
      <a href="/cost" style="padding:10px 20px;border-radius:24px;background:rgba(247,186,24,0.15);border:1px solid rgba(247,186,24,0.3);color:var(--gold);font-size:0.82rem;font-family:var(--font-kr);text-decoration:none;font-weight:600;">전체 비용 안내 →</a>
    </div>` : ''}

    <!-- CTA -->
    <div style="text-align:center;padding:48px 32px;border-radius:16px;background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.15);">
      <h3 style="font-family:var(--font-kr);font-size:1.2rem;font-weight:800;color:var(--white);margin-bottom:12px;">${page.ctaText}</h3>
      <p style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gray);line-height:1.8;margin-bottom:24px;">CT 촬영 기반 정밀 진단 후 정확한 비용을 안내합니다.<br>상담은 무료입니다.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="tel:02-756-2828" style="padding:14px 28px;border-radius:50px;background:var(--gold);color:var(--black);font-weight:700;font-size:0.85rem;font-family:var(--font-kr);text-decoration:none;"><i class="fas fa-phone-alt"></i> 02-756-2828</a>
        <a href="https://naver.me/G0DXGZbi" target="_blank" style="padding:14px 28px;border-radius:50px;background:#03C75A;color:#fff;font-weight:700;font-size:0.85rem;font-family:var(--font-kr);text-decoration:none;"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
      </div>
    </div>
  </div>
</section>
${footer()}
${scripts()}
</body></html>`;
}
