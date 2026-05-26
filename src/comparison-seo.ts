// 치료 비교 SEO 콘텐츠 — "임플란트 vs 브릿지", "라미네이트 vs 레진" 등 의사결정 검색어 대응
import { head, nav, footer, scripts } from './layout'

interface ComparisonPage {
  slug: string;
  title: string;
  metaDesc: string;
  keywords: string;
  optionA: { name: string; pros: string[]; cons: string[]; bestFor: string; link: string };
  optionB: { name: string; pros: string[]; cons: string[]; bestFor: string; link: string };
  heroTitle: string;
  heroDesc: string;
  verdict: string;
  faq: { q: string; a: string }[];
  doctor: string;
}

const SITE_DOMAIN = 'https://happyyein.kr';

const comparisons: ComparisonPage[] = [
  {
    slug: 'implant-vs-bridge',
    title: '임플란트 vs 브릿지 | 어떤 게 나을까? | 행복한예인치과',
    metaDesc: '임플란트와 브릿지 장단점 비교. 비용, 수명, 시술기간, 인접치아 영향까지. 시청역·명동 행복한예인치과 전문의가 솔직하게 비교합니다. 02-756-2828',
    keywords: '임플란트 vs 브릿지, 임플란트 브릿지 차이, 임플란트 브릿지 비교, 임플란트 브릿지 장단점',
    optionA: {
      name: '임플란트',
      pros: ['인접 치아 삭제 불필요', '자연치아와 가장 유사한 기능', '10~20년 이상 수명', '독립적인 구조 — 다른 치아에 영향 없음', '뼈 흡수 방지 효과'],
      cons: ['수술 필요 (골이식 가능)', '치유 기간 2~4개월', '비보험 (65세 이상 일부 보험)', '골량 부족 시 추가 시술'],
      bestFor: '장기적인 관점에서 인접 치아를 보존하고 싶은 분',
      link: '/treatments/implant',
    },
    optionB: {
      name: '브릿지',
      pros: ['수술 없이 진행', '치료 기간 짧음 (2~3주)', '건강보험 일부 적용 가능', '즉각적인 심미 회복'],
      cons: ['양쪽 건강한 치아 삭제 필요', '수명 7~10년 (짧음)', '브릿지 아래 청결 관리 어려움', '지지 치아에 과부하'],
      bestFor: '수술이 부담스럽거나 빠른 치료가 필요한 분',
      link: '/treatments/implant',
    },
    heroTitle: '임플란트 vs 브릿지<br>어떤 게 나을까요?',
    heroDesc: '치아를 잃었을 때 가장 많이 고민하는 두 가지. 전문의가 솔직하게 비교합니다.',
    verdict: '행복한예인치과에서는 대부분의 경우 임플란트를 권장합니다. 인접 치아를 보존할 수 있고 장기적 수명이 우수하기 때문입니다. 다만 전신 건강 상태, 골량, 예산 등을 종합 고려하여 브릿지가 적합한 경우에는 솔직하게 안내합니다.',
    faq: [
      { q: '임플란트가 브릿지보다 비싼가요?', a: '초기 비용은 임플란트가 높지만, 브릿지는 7~10년 후 교체가 필요하고 인접 치아 손상 위험이 있어 장기적으로는 임플란트가 경제적일 수 있습니다.' },
      { q: '브릿지를 한 곳에 나중에 임플란트로 바꿀 수 있나요?', a: '가능합니다. 다만 브릿지를 위해 삭제된 양쪽 치아는 되돌릴 수 없습니다. 가능하면 처음부터 신중한 선택을 권합니다.' },
      { q: '65세 이상인데 임플란트 보험이 되나요?', a: '네, 65세 이상은 평생 2개까지 임플란트 건강보험 적용이 가능합니다. 보험 적용 시 본인부담이 크게 줄어듭니다.' },
      { q: '브릿지 치료 기간은 얼마나 걸리나요?', a: '브릿지는 보통 2~3주면 완성됩니다. 인접 치아 삭제 → 본뜨기 → 기공소 제작 → 장착 순서로 진행됩니다.' },
    ],
    doctor: '한승대 대표원장 (통합치의학 전문의, 치의학 박사)',
  },
  {
    slug: 'laminate-vs-resin',
    title: '라미네이트 vs 레진 | 앞니 심미 비교 | 행복한예인치과',
    metaDesc: '라미네이트와 레진 장단점 비교. 비용, 수명, 삭제량, 심미성. 행복한예인치과는 레진으로 충분하면 솔직히 레진을 권합니다. 02-756-2828',
    keywords: '라미네이트 vs 레진, 라미네이트 레진 차이, 앞니 치료 비교, 라미네이트 레진 비용 비교',
    optionA: {
      name: '라미네이트',
      pros: ['뛰어난 심미성 (색상·형태 완벽 조절)', '10~15년 장기 수명', '변색에 강함', '넓은 범위 수복 가능'],
      cons: ['치아 표면 삭제 필요 (0.3~0.5mm)', '비용이 높음', '제작 기간 필요 (1~2주)', '한번 삭제하면 되돌릴 수 없음'],
      bestFor: '넓은 범위의 심미 개선이 필요하거나 장기 유지를 원하는 분',
      link: '/treatments/aesthetic',
    },
    optionB: {
      name: '레진',
      pros: ['치아 삭제 최소 or 불필요', '당일 완성 가능', '합리적 비용', '추가 삭제 없이 보수/교체 가능'],
      cons: ['5~7년 수명 (라미네이트보다 짧음)', '시간이 지나면 변색 가능', '넓은 범위에는 부적합', '강도가 라미네이트보다 낮음'],
      bestFor: '소규모 수복, 보존적 치료를 원하거나 비용 부담이 있는 분',
      link: '/treatments/aesthetic',
    },
    heroTitle: '라미네이트 vs 레진<br>앞니, 어떻게 해야 할까요?',
    heroDesc: '앞니 심미치료의 두 가지 선택지. 삭제량, 비용, 수명을 솔직하게 비교합니다.',
    verdict: '행복한예인치과에서는 "레진으로 충분하면 레진을 권합니다." 무조건 라미네이트를 추천하지 않고, 치아 삭제를 최소화하는 것이 원칙입니다. 간격이 좁거나 소규모 변색은 레진이 더 적합하고, 넓은 범위의 심미 개선이 필요하면 라미네이트를 안내합니다.',
    faq: [
      { q: '앞니 사이 벌어진 것은 레진으로 되나요?', a: '1~2mm 정도의 간격은 레진으로 충분히 개선 가능합니다. 넓은 간격(3mm 이상)은 라미네이트나 교정이 더 적합할 수 있습니다.' },
      { q: '레진이 깨지면 어떻게 하나요?', a: '레진은 추가 치아 삭제 없이 보수가 가능합니다. 깨진 부분만 제거하고 새 레진을 충전하면 됩니다. 이것이 레진의 큰 장점입니다.' },
      { q: '라미네이트를 한 번 하면 평생 써야 하나요?', a: '라미네이트 수명은 10~15년이며, 교체가 필요할 수 있습니다. 다만 교체 시 추가 삭제는 최소화됩니다.' },
    ],
    doctor: '한승대 대표원장 (통합치의학 전문의)',
  },
  {
    slug: 'clear-vs-metal-braces',
    title: '투명교정 vs 메탈교정 | 교정 방법 비교 | 행복한예인치과',
    metaDesc: '투명교정(인비절라인)과 메탈교정 장단점 비교. 심미성, 비용, 효과, 기간. 교정 전문의 박현미 원장 직접 비교. 행복한예인치과 02-756-2828',
    keywords: '투명교정 vs 메탈교정, 인비절라인 메탈 비교, 교정 방법 비교, 투명교정 메탈 장단점',
    optionA: {
      name: '투명교정 (인비절라인)',
      pros: ['거의 보이지 않는 심미성', '탈착 가능 — 식사·칫솔질 편리', '구강 위생 관리 용이', '직장인에게 최적'],
      cons: ['환자 협조(착용 시간 22시간+) 필수', '복잡한 케이스에 제한적', '비용이 메탈보다 높음', '장치 분실·파손 주의'],
      bestFor: '심미성 중시, 직장인, 자기관리 가능한 분',
      link: '/treatments/orthodontics',
    },
    optionB: {
      name: '메탈교정',
      pros: ['강력한 교정력 — 복잡한 케이스도 가능', '비용이 합리적', '환자 협조 의존도 낮음', '오랜 임상 역사'],
      cons: ['눈에 잘 보임', '구강 위생 관리 어려움', '구내 자극 가능', '탈착 불가'],
      bestFor: '복잡한 교합 문제, 비용 우선, 청소년',
      link: '/treatments/orthodontics',
    },
    heroTitle: '투명교정 vs 메탈교정<br>나에게 맞는 방법은?',
    heroDesc: '교정 전문의가 두 방법의 장단점을 솔직 비교. 환자 상태에 맞는 최적 추천.',
    verdict: '행복한예인치과 교정 전문의 박현미 원장은 환자의 교합 상태, 생활 패턴, 예산을 종합 고려하여 최적의 방법을 추천합니다. 시청역·명동·을지로 직장인분들에게는 투명교정이 인기지만, 복잡한 케이스에서는 메탈교정이 더 효과적일 수 있습니다.',
    faq: [
      { q: '투명교정으로 못 고치는 경우가 있나요?', a: '심한 골격성 부정교합이나 복잡한 회전·정출이 필요한 경우 메탈교정이 더 적합할 수 있습니다. 교정 전문의 진단 후 가능 여부를 안내합니다.' },
      { q: '투명교정 착용 시간을 안 지키면 어떻게 되나요?', a: '하루 20~22시간 착용이 권장됩니다. 착용 시간이 부족하면 교정 효과가 떨어지고 기간이 늘어날 수 있습니다.' },
      { q: '성인도 메탈교정이 가능한가요?', a: '물론입니다. 성인 메탈교정은 효과적이며, 최근에는 소형 브라켓으로 불편감도 많이 줄었습니다.' },
    ],
    doctor: '박현미 원장 (교정 전문의)',
  },
  {
    slug: 'implant-vs-denture',
    title: '임플란트 vs 틀니 | 어떤 게 좋을까? | 행복한예인치과',
    metaDesc: '임플란트와 틀니 장단점 비교. 65세 이상 보험 적용 정보. 비용, 기능, 편안함, 수명 솔직 비교. 행복한예인치과 02-756-2828',
    keywords: '임플란트 vs 틀니, 임플란트 틀니 비교, 임플란트 틀니 장단점, 틀니 임플란트 차이',
    optionA: {
      name: '임플란트',
      pros: ['자연치아와 유사한 저작력', '고정식 — 탈착 불필요', '10~20년 이상 장기 수명', '골 흡수 방지'],
      cons: ['수술 필요', '치유 기간 필요', '비용 높음 (65세 이상 일부 보험)', '전신 건강 상태 고려 필요'],
      bestFor: '골량 충분, 전신 건강 양호, 장기적 관점의 투자 원하는 분',
      link: '/treatments/implant',
    },
    optionB: {
      name: '틀니',
      pros: ['수술 없이 제작', '65세 이상 건강보험 적용', '비용 부담 적음', '전신 건강 상태 무관'],
      cons: ['저작력 자연치의 20~30%', '탈착 관리 필요', '이물감·불편감', '뼈 흡수 진행'],
      bestFor: '수술 부담, 전신 건강 문제, 예산 제한이 있는 분',
      link: '/cost/denture-cost',
    },
    heroTitle: '임플란트 vs 틀니<br>솔직한 비교',
    heroDesc: '65세 이상 보험 적용 정보 포함. 두 방법의 장단점을 투명하게 비교합니다.',
    verdict: '기능적으로는 임플란트가 우수하지만, 틀니도 잘 제작하면 충분히 만족스러운 결과를 얻을 수 있습니다. 65세 이상은 임플란트(2개)와 틀니 모두 건강보험이 적용되므로, 두 가지 옵션의 보험 혜택을 비교하여 최적의 선택을 안내합니다.',
    faq: [
      { q: '65세 이상인데 임플란트와 틀니 보험 중 뭐가 유리한가요?', a: '임플란트는 평생 2개까지, 틀니는 7년마다 보험 적용됩니다. 남은 치아 수, 골 상태, 생활 편의성 등을 고려하여 가장 유리한 조합을 안내합니다.' },
      { q: '임플란트 위에 틀니를 올리는 것도 가능한가요?', a: '네, 임플란트 오버덴쳐라는 방법이 있습니다. 2~4개의 임플란트로 틀니를 안정적으로 고정하여, 일반 틀니보다 훨씬 편안합니다.' },
      { q: '틀니에 적응하기 어려우면 임플란트로 바꿀 수 있나요?', a: '가능합니다. 골 상태가 허락하면 틀니에서 임플란트로 전환할 수 있습니다. 미리 CT 촬영으로 가능성을 확인해 드립니다.' },
    ],
    doctor: '한승대 대표원장 (통합치의학 전문의)',
  },
  {
    slug: 'zirconia-vs-pfm-vs-gold',
    title: '지르코니아 vs PFM vs 금 크라운 비교 | 행복한예인치과',
    metaDesc: '크라운 재질 비교: 지르코니아, PFM, 금. 강도, 심미성, 비용, 수명 차이. 치아 위치별 최적 추천. 행복한예인치과 02-756-2828',
    keywords: '지르코니아 vs PFM, 금 크라운 비교, 크라운 재질 비교, 지르코니아 크라운 장단점',
    optionA: {
      name: '지르코니아',
      pros: ['뛰어난 심미성 + 강도', '금속 알레르기 없음', '잇몸 변색 없음', '앞니·어금니 모두 적합'],
      cons: ['비용이 가장 높음', '맞은편 치아 마모 가능'],
      bestFor: '심미성과 강도 모두 원하는 분 (가장 인기)',
      link: '/cost/crown-cost',
    },
    optionB: {
      name: 'PFM / 금',
      pros: ['PFM: 합리적 비용 + 심미성', '금: 최고의 생체친화성 + 내구성', '금: 마모율이 자연치와 유사'],
      cons: ['PFM: 잇몸 변색 가능, 도자기 깨짐 위험', '금: 심미성 낮음 (금색)', '금: 금 시세에 따라 비용 변동'],
      bestFor: 'PFM: 비용 우선 / 금: 어금니 + 내구성 최우선',
      link: '/cost/crown-cost',
    },
    heroTitle: '크라운 재질 비교<br>나에게 맞는 건?',
    heroDesc: '지르코니아, PFM, 금. 세 가지 크라운 재질의 장단점을 솔직하게 비교합니다.',
    verdict: '최근에는 지르코니아가 가장 많이 선택됩니다. 강도와 심미성을 동시에 만족시키기 때문입니다. 다만 어금니에서 최고의 내구성을 원하면 금, 비용을 우선시하면 PFM도 좋은 선택입니다. 환자의 상태와 예산에 맞춰 솔직하게 추천합니다.',
    faq: [
      { q: '지르코니아 크라운이 가장 좋은 건가요?', a: '많은 경우 최적의 선택이지만, 절대적인 것은 아닙니다. 어금니 중 교합력이 매우 강한 곳은 금이 더 적합하고, 예산이 제한적이면 PFM도 충분합니다.' },
      { q: 'PFM 크라운의 잇몸 변색은 왜 생기나요?', a: 'PFM은 내부 금속이 잇몸 경계에 비쳐 회색빛을 나타낼 수 있습니다. 지르코니아는 금속이 없어 이 문제가 없습니다.' },
      { q: '크라운 교체는 언제 해야 하나요?', a: '크라운 자체는 10~15년 이상 사용 가능합니다. 잇몸 퇴축이나 크라운 변연 불량이 생기면 교체를 고려합니다. 정기 검진으로 상태를 모니터링합니다.' },
    ],
    doctor: '한승대 대표원장 (통합치의학 전문의)',
  },
  {
    slug: 'office-vs-home-whitening',
    title: '오피스 미백 vs 홈 미백 비교 | 행복한예인치과',
    metaDesc: '치과 전문 미백(오피스)과 자가 미백(홈 블리칭) 비교. 효과, 비용, 시간, 지속기간. 행복한예인치과 02-756-2828',
    keywords: '오피스 미백 홈 미백 비교, 치아미백 방법, 전문 미백 자가 미백 차이, 블리칭 비교',
    optionA: {
      name: '오피스 미백 (전문 미백)',
      pros: ['즉각적 효과 — 1~2회 시술로 밝아짐', '치과 전문가 시행 — 안전', '고농도 미백제 + LED 장비', '시린 증상 즉시 대응 가능'],
      cons: ['비용이 높음', '내원 필요', '일시적 시린 증상 가능'],
      bestFor: '빠른 효과를 원하는 분, 결혼·면접 등 이벤트 전',
      link: '/cost/whitening-cost',
    },
    optionB: {
      name: '홈 미백 (자가 미백)',
      pros: ['집에서 편하게 진행', '비용 합리적', '점진적이고 자연스러운 변화'],
      cons: ['효과까지 2~4주 소요', '환자 스스로 매일 착용 필요', '저농도 미백제 — 효과 제한적'],
      bestFor: '시간 여유가 있고, 점진적 변화를 원하는 분',
      link: '/cost/whitening-cost',
    },
    heroTitle: '오피스 미백 vs 홈 미백<br>어떤 게 효과적?',
    heroDesc: '전문 미백과 자가 미백의 장단점. 변색 정도에 맞는 최적 방법을 안내합니다.',
    verdict: '가장 효과적인 방법은 듀얼 미백(오피스 + 홈 병행)입니다. 치과에서 먼저 효과를 확인하고, 홈 미백으로 유지하면 장기적으로 최상의 결과를 얻을 수 있습니다. 스케일링만으로 밝아지는 경우도 있으므로, 먼저 진단 후 불필요한 미백은 권하지 않습니다.',
    faq: [
      { q: '듀얼 미백이 뭔가요?', a: '오피스 미백으로 기본 효과를 내고, 홈 미백으로 유지·강화하는 방법입니다. 단독보다 효과가 뛰어나고 오래 유지됩니다.' },
      { q: '미백 후 시린 증상은 얼마나 지속되나요?', a: '보통 24~48시간 이내 자연 완화됩니다. 시린 증상이 걱정되시면 미리 말씀해 주시면 민감성을 줄이는 전처리를 합니다.' },
    ],
    doctor: '한승대 대표원장',
  },
  {
    slug: 'immediate-vs-delayed-implant',
    title: '즉시 임플란트 vs 지연 임플란트 비교 | 행복한예인치과',
    metaDesc: '발치즉시 임플란트와 지연(기존) 임플란트 비교. 장단점, 적용 조건, 치료기간 차이. 행복한예인치과 80%+ 즉시식립. 02-756-2828',
    keywords: '즉시 임플란트 vs 지연, 발치즉시 임플란트 장단점, 즉시식립 기존 비교',
    optionA: {
      name: '발치즉시 임플란트',
      pros: ['발치+식립 한 번에 — 내원 횟수 최소', '치료 기간 대폭 단축', '잇몸·뼈 형태 유지에 유리', '심미적 결과 우수'],
      cons: ['골 상태가 좋아야 가능', '감염이 심하면 부적합', '고도의 기술력 필요'],
      bestFor: '시간이 소중한 직장인, 골 상태 양호한 분',
      link: '/treatments/implant',
    },
    optionB: {
      name: '지연(기존) 임플란트',
      pros: ['감염 부위 완전 치유 후 식립 — 안정적', '골이식 후 충분한 골 형성 기간', '대부분의 환자에게 적용 가능'],
      cons: ['발치 후 3~6개월 대기', '내원 횟수 많음', '뼈·잇몸 위축 가능'],
      bestFor: '감염이 심한 경우, 골량 부족으로 골이식 필요한 분',
      link: '/treatments/implant',
    },
    heroTitle: '즉시 vs 지연 임플란트<br>뭐가 다를까요?',
    heroDesc: '행복한예인치과 80% 이상 즉시식립. 두 방법의 차이와 적용 조건을 설명합니다.',
    verdict: '행복한예인치과에서는 80% 이상의 케이스에서 발치즉시 임플란트를 시행합니다. CT 정밀 진단으로 즉시식립 가능 여부를 정확히 판단하며, 감염이 심하거나 골량이 부족한 경우에는 안전하게 지연 식립을 진행합니다.',
    faq: [
      { q: '즉시 임플란트의 성공률은 어떤가요?', a: '적절한 케이스 선택과 숙련된 술자의 경우 95% 이상의 높은 성공률을 보입니다. 행복한예인치과에서는 CT 정밀 진단으로 적합한 경우에만 시행합니다.' },
      { q: '발치 후 바로 하면 감염 위험이 높지 않나요?', a: '감염이 심한 경우에는 즉시식립을 하지 않습니다. 경미한 감염은 철저한 소독과 항생제로 관리 가능하며, 이를 판단하는 것이 전문의의 역할입니다.' },
    ],
    doctor: '한승대 대표원장 (통합치의학 전문의, 치의학 박사)',
  },
  {
    slug: 'scaling-vs-deep-cleaning',
    title: '스케일링 vs 잇몸치료(SRP) 차이 | 행복한예인치과',
    metaDesc: '스케일링과 잇몸치료(SRP, 치주소파술) 차이점 비교. 보험 적용 여부, 치료 대상, 효과. 행복한예인치과 02-756-2828',
    keywords: '스케일링 잇몸치료 차이, SRP 스케일링 비교, 치주소파술, 잇몸치료 종류',
    optionA: {
      name: '스케일링',
      pros: ['건강보험 적용 (연 1회)', '시간 짧음 (30~40분)', '통증 거의 없음', '정기 예방 가능'],
      cons: ['잇몸 아래(치주낭) 치석 제거 어려움', '치주질환 치료 효과 제한적'],
      bestFor: '정기 예방, 잇몸 건강한 분, 연 1회 관리',
      link: '/cost/scaling-cost',
    },
    optionB: {
      name: '잇몸치료 (SRP/큐렛)',
      pros: ['잇몸 아래 깊은 치석까지 제거', '치주질환 치료 효과', '잇몸 염증 개선', '건강보험 적용'],
      cons: ['마취 필요 (잇몸 아래 시술)', '여러 회 나눠서 진행', '시술 후 일시적 시림'],
      bestFor: '잇몸 질환(치주염) 진단 받은 분',
      link: '/cost/scaling-cost',
    },
    heroTitle: '스케일링 vs 잇몸치료<br>무엇이 다를까요?',
    heroDesc: '같은 "치석 제거"지만 범위와 목적이 다릅니다. 차이를 정확히 알려드립니다.',
    verdict: '스케일링은 예방, 잇몸치료(SRP)는 치료입니다. 정기적인 스케일링으로 잇몸 질환을 예방하는 것이 최선이며, 이미 치주질환이 진행된 경우에는 SRP가 필요합니다. 두 가지 모두 건강보험이 적용됩니다.',
    faq: [
      { q: '잇몸에서 피가 나면 잇몸치료가 필요한가요?', a: '양치 시 출혈은 잇몸 염증의 초기 신호입니다. 스케일링으로 해결되는 경우도 많지만, 치주낭이 깊으면(4mm 이상) SRP가 필요합니다. 검진으로 정확히 판단합니다.' },
      { q: 'SRP도 보험이 되나요?', a: '네, 치주질환 진단 시 SRP(치주소파술)도 건강보험이 적용됩니다. 본인부담금은 부위별로 달라집니다.' },
    ],
    doctor: '한승대 대표원장 (통합치의학 전문의)',
  },
];

export function getAllComparisonSlugs(): string[] {
  return comparisons.map(p => p.slug);
}

export function comparisonIndexPage(): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "행복한예인치과 치료 비교 가이드",
    "description": "임플란트 vs 브릿지, 라미네이트 vs 레진 등 치과 치료 방법을 솔직하게 비교합니다.",
    "url": `${SITE_DOMAIN}/compare`,
    "isPartOf": { "@id": `${SITE_DOMAIN}/#website` },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": comparisons.length,
      "itemListElement": comparisons.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${SITE_DOMAIN}/compare/${p.slug}`,
        "name": p.title,
      }))
    }
  };

  return `${head({
    title: '치료 비교 가이드 | 임플란트vs브릿지, 라미네이트vs레진 | 행복한예인치과',
    description: '치과 치료 방법 비교 가이드. 임플란트 vs 브릿지, 라미네이트 vs 레진, 투명교정 vs 메탈교정 등. 전문의가 장단점을 솔직하게 비교합니다.',
    path: '/compare',
    keywords: '치과 치료 비교, 임플란트 브릿지 비교, 라미네이트 레진 비교, 투명교정 메탈교정 비교',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '치료 비교', url: '/compare' }],
    jsonLd: [jsonLd],
  })}
${nav()}
<section class="sub-hero">
  <div class="sub-hero-bg" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);"></div>
  <div class="sub-hero-breadcrumb"><a href="/">Home</a><span class="sep"><i class="fas fa-chevron-right"></i></span><span style="color:var(--gold)">치료 비교</span></div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">Treatment Comparison</div>
    <h1>치료 비교 가이드<br><em>솔직한</em> 장단점 비교</h1>
    <p style="color:var(--gray);margin-top:16px;font-size:0.9rem;font-family:var(--font-kr);line-height:1.8;">어떤 치료가 나에게 맞는지 고민되시나요?<br>전문의가 장단점을 투명하게 비교합니다.</p>
  </div>
</section>
<section class="page-section" style="padding:80px 24px;">
  <div class="page-inner" style="max-width:1100px;margin:0 auto;">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px;">
      ${comparisons.map(p => `
      <a href="/compare/${p.slug}" style="display:block;padding:32px;border-radius:16px;background:var(--dark-card);border:1px solid rgba(255,255,255,0.06);transition:all 0.3s;text-decoration:none;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
          <span style="padding:6px 12px;border-radius:8px;background:rgba(247,186,24,0.1);font-family:var(--font-kr);font-size:0.75rem;color:var(--gold);font-weight:600;">${p.optionA.name}</span>
          <span style="font-family:var(--font-display);font-size:0.7rem;color:var(--gray);">vs</span>
          <span style="padding:6px 12px;border-radius:8px;background:rgba(255,255,255,0.05);font-family:var(--font-kr);font-size:0.75rem;color:var(--gray-light);font-weight:600;">${p.optionB.name}</span>
        </div>
        <p style="font-family:var(--font-kr);font-size:0.82rem;color:var(--gray);line-height:1.7;margin-bottom:12px;">${p.heroDesc}</p>
        <span style="font-family:var(--font-kr);font-size:0.75rem;color:var(--gold);font-weight:600;">자세히 비교 →</span>
      </a>`).join('')}
    </div>
  </div>
</section>
${footer()}${scripts()}</body></html>`;
}

export function renderComparisonPage(slug: string): string | null {
  const page = comparisons.find(p => p.slug === slug);
  if (!page) return null;
  const today = new Date().toISOString().split('T')[0];

  const medicalPageJsonLd = {
    "@context": "https://schema.org", "@type": "MedicalWebPage",
    "name": page.title, "description": page.metaDesc,
    "url": `${SITE_DOMAIN}/compare/${page.slug}`,
    "datePublished": "2026-05-26", "dateModified": today, "inLanguage": "ko",
    "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
    "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".comp-hero-title", ".comp-verdict"] },
    "lastReviewed": today,
  };
  const faqJsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": page.faq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": SITE_DOMAIN },
      { "@type": "ListItem", "position": 2, "name": "치료 비교", "item": `${SITE_DOMAIN}/compare` },
      { "@type": "ListItem", "position": 3, "name": `${page.optionA.name} vs ${page.optionB.name}`, "item": `${SITE_DOMAIN}/compare/${page.slug}` },
    ]
  };

  return `${head({
    title: page.title, description: page.metaDesc, path: `/compare/${page.slug}`,
    keywords: page.keywords,
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '치료 비교', url: '/compare' }, { name: `${page.optionA.name} vs ${page.optionB.name}`, url: `/compare/${page.slug}` }],
    jsonLd: [medicalPageJsonLd, faqJsonLd, breadcrumbJsonLd],
  })}
${nav()}
<section class="sub-hero">
  <div class="sub-hero-bg" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);"></div>
  <div class="sub-hero-breadcrumb"><a href="/">Home</a><span class="sep"><i class="fas fa-chevron-right"></i></span><a href="/compare">치료 비교</a><span class="sep"><i class="fas fa-chevron-right"></i></span><span style="color:var(--gold)">${page.optionA.name} vs ${page.optionB.name}</span></div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">Treatment Comparison</div>
    <h1 class="comp-hero-title">${page.heroTitle}</h1>
    <p style="color:var(--gray);margin-top:16px;font-size:0.9rem;font-family:var(--font-kr);line-height:1.8;">${page.heroDesc}</p>
  </div>
</section>
<section class="page-section" style="padding:80px 24px;">
  <div class="page-inner" style="max-width:1000px;margin:0 auto;">
    <!-- 비교 테이블 -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:48px;">
      ${[page.optionA, page.optionB].map((opt, idx) => `
      <div style="padding:32px;border-radius:16px;background:var(--dark-card);border:1px solid ${idx === 0 ? 'rgba(247,186,24,0.2)' : 'rgba(255,255,255,0.06)'};">
        <h3 style="font-family:var(--font-kr);font-size:1.1rem;font-weight:800;color:${idx === 0 ? 'var(--gold)' : 'var(--white)'};margin-bottom:20px;text-align:center;">${opt.name}</h3>
        <div style="margin-bottom:20px;">
          <h4 style="font-family:var(--font-kr);font-size:0.8rem;color:#4CAF50;margin-bottom:8px;font-weight:600;">✅ 장점</h4>
          <ul style="list-style:none;padding:0;">${opt.pros.map(p => `<li style="font-family:var(--font-kr);font-size:0.82rem;color:var(--gray-light);line-height:1.8;padding-left:16px;position:relative;"><span style="position:absolute;left:0;color:#4CAF50;">+</span>${p}</li>`).join('')}</ul>
        </div>
        <div style="margin-bottom:20px;">
          <h4 style="font-family:var(--font-kr);font-size:0.8rem;color:#FF7043;margin-bottom:8px;font-weight:600;">⚠️ 단점</h4>
          <ul style="list-style:none;padding:0;">${opt.cons.map(c => `<li style="font-family:var(--font-kr);font-size:0.82rem;color:var(--gray);line-height:1.8;padding-left:16px;position:relative;"><span style="position:absolute;left:0;color:#FF7043;">-</span>${c}</li>`).join('')}</ul>
        </div>
        <div style="padding:12px 16px;border-radius:10px;background:rgba(255,255,255,0.03);">
          <p style="font-family:var(--font-kr);font-size:0.78rem;color:var(--gold);font-weight:600;">🎯 추천 대상</p>
          <p style="font-family:var(--font-kr);font-size:0.82rem;color:var(--gray-light);line-height:1.6;">${opt.bestFor}</p>
        </div>
      </div>`).join('')}
    </div>

    <!-- 전문의 의견 -->
    <div class="comp-verdict" style="padding:32px;border-radius:16px;background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.15);margin-bottom:48px;">
      <h2 style="font-family:var(--font-kr);font-size:1.1rem;font-weight:800;color:var(--gold);margin-bottom:8px;">🩺 전문의 소견</h2>
      <p style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gold);margin-bottom:12px;font-weight:500;">${page.doctor}</p>
      <p style="font-family:var(--font-kr);font-size:0.9rem;color:var(--gray-light);line-height:1.9;">${page.verdict}</p>
    </div>

    <!-- FAQ -->
    <h2 style="font-family:var(--font-kr);font-size:1.3rem;font-weight:800;color:var(--white);margin-bottom:24px;">❓ 자주 묻는 질문</h2>
    <div itemscope itemtype="https://schema.org/FAQPage" style="margin-bottom:48px;">
      ${page.faq.map(f => `
      <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="padding:20px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <h4 itemprop="name" style="font-family:var(--font-kr);font-size:0.95rem;font-weight:700;color:var(--white);margin-bottom:8px;">Q. ${f.q}</h4>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text" style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gray);line-height:1.8;">${f.a}</p></div>
      </div>`).join('')}
    </div>

    <!-- CTA -->
    <div style="text-align:center;padding:48px 32px;border-radius:16px;background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.15);">
      <h3 style="font-family:var(--font-kr);font-size:1.2rem;font-weight:800;color:var(--white);margin-bottom:12px;">어떤 치료가 맞는지 직접 상담 받으세요</h3>
      <p style="font-family:var(--font-kr);font-size:0.85rem;color:var(--gray);line-height:1.8;margin-bottom:24px;">CT 촬영 기반 정밀 진단 후, 환자 상태에 맞는 최적의 치료법을 안내합니다.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="tel:02-756-2828" style="padding:14px 28px;border-radius:50px;background:var(--gold);color:var(--black);font-weight:700;font-size:0.85rem;font-family:var(--font-kr);text-decoration:none;"><i class="fas fa-phone-alt"></i> 02-756-2828</a>
        <a href="https://naver.me/G0DXGZbi" target="_blank" style="padding:14px 28px;border-radius:50px;background:#03C75A;color:#fff;font-weight:700;font-size:0.85rem;font-family:var(--font-kr);text-decoration:none;"><i class="fas fa-calendar-check"></i> 네이버 예약</a>
      </div>
    </div>
  </div>
</section>
${footer()}${scripts()}</body></html>`;
}
