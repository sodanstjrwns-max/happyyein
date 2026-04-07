// Treatment detail page data & renderer
import { head, nav, footer, scripts } from './layout'

interface TreatmentPage {
  slug: string;
  tag: string;
  title: string;
  titleHtml: string;
  desc: string;
  heroImg: string;
  metaDesc: string;
  introTitle: string;
  introText: string[];
  introImg: string;
  highlights: { icon: string; title: string; desc: string }[];
  process: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
}

const treatments: TreatmentPage[] = [
  {
    slug: 'implant',
    tag: 'Core Treatment',
    title: '발치즉시 임플란트',
    titleHtml: '발치즉시<br><em>임플란트</em>',
    desc: '발치와 동시에 임플란트를 식립하여 치료 기간을 획기적으로 단축합니다. 80% 이상의 케이스에서 즉시식립을 시행합니다.',
    heroImg: '/static/img/treat-1.jpg',
    metaDesc: '행복한예인치과 발치즉시 임플란트 - 80% 이상 즉시식립, 치료 기간 단축, 고난이도 케이스 대응',
    introTitle: '왜 <em>발치즉시</em> 임플란트인가',
    introText: [
      '기존 임플란트는 발치 후 3~6개월의 치유 기간을 기다린 뒤 식립하는 것이 일반적이었습니다. 발치즉시 임플란트는 이 대기 기간을 없애, 발치와 동시에 임플란트를 심는 방식입니다.',
      '한승대 원장은 수천 건 이상의 임플란트 시술 경험을 바탕으로, 80% 이상의 케이스에서 즉시식립을 시행하고 있습니다. 바쁜 직장인 분들의 시간을 아끼면서도 안전하고 정확한 시술을 지향합니다.',
      '고난이도 케이스(상악동 거상술, 뼈이식 동반 등)도 충분한 경험과 장비를 갖추고 대응하고 있으니, 걱정하지 마시고 상담해 주세요.'
    ],
    introImg: '/static/img/xray-1.jpg',
    highlights: [
      { icon: 'fas fa-bolt', title: 'Time Saving', desc: '발치 + 임플란트를 한 번에. 내원 횟수와 치료 기간을 획기적으로 줄입니다.' },
      { icon: 'fas fa-chart-line', title: '80%+ Success', desc: '전체 임플란트 케이스 중 80% 이상을 즉시식립으로 진행. 높은 성공률을 유지합니다.' },
      { icon: 'fas fa-user-md', title: 'Expert Care', desc: '통합치의학과 전문의 + NYU Implant Course 수료. 고난이도 케이스까지 안전하게 대응.' },
    ],
    process: [
      { title: 'Consultation', desc: 'CT 촬영 및 정밀 진단. 잔존 골량, 감염 여부, 인접 치아 상태를 종합 평가합니다.' },
      { title: 'Extraction', desc: '최소 침습 발치로 주변 골조직 손상을 최소화합니다.' },
      { title: 'Implant Placement', desc: '발치 즉시 임플란트 픽스처를 식립합니다. 필요 시 골이식을 동시 진행합니다.' },
      { title: 'Healing', desc: '임플란트와 뼈가 결합되는 기간(2~4개월). 임시 보철물로 심미성을 유지합니다.' },
      { title: 'Final Crown', desc: '맞춤 보철물(크라운)을 제작·장착하여 치료를 완료합니다.' },
    ],
    faq: [
      { q: '발치즉시 임플란트는 누구나 가능한가요?', a: '대부분의 경우 가능하지만, 심한 감염이 있거나 잔존 골량이 극히 부족한 경우에는 발치 후 일정 기간 치유를 거친 뒤 식립하는 것이 안전할 수 있습니다. CT 촬영을 통한 정밀 진단 후 최적의 방법을 안내해 드립니다.' },
      { q: '통증이 심하지는 않나요?', a: '충분한 마취 하에 진행되므로 시술 중 통증은 거의 없습니다. 시술 후에도 처방된 진통제로 충분히 관리 가능한 수준이며, 대부분의 환자분들이 "생각보다 안 아팠다"고 말씀해 주십니다.' },
      { q: '치료 기간은 얼마나 걸리나요?', a: '발치즉시 임플란트의 경우, 일반 임플란트 대비 2~4개월 정도 기간이 단축됩니다. 골 상태에 따라 전체 치료 기간은 3~6개월 정도 소요됩니다.' },
      { q: '비용은 어떻게 되나요?', a: '임플란트 비용은 식립 위치, 골이식 필요 여부, 보철물 종류에 따라 달라집니다. 정확한 비용은 상담 시 CT 촬영 후 안내해 드립니다.' },
    ],
  },
  {
    slug: 'preservation',
    tag: 'Preservation',
    title: '치아 보존 치료',
    titleHtml: '치아 <em>보존</em> 치료',
    desc: '보존과 전문의가 직접 치료합니다. 최대한 자연 치아를 살리는 방향의 신경치료 및 보존 수복.',
    heroImg: '/static/img/treat-2.jpg',
    metaDesc: '행복한예인치과 치아보존치료 - 보존과 전문의 직접 시술, 자연치아 보존, 정밀 신경치료',
    introTitle: '<em>자연 치아</em>를 지키는 것이 최선입니다',
    introText: [
      '어떤 임플란트나 보철물도 자연 치아를 대체할 수 없습니다. 행복한예인치과에서는 보존과 전문의 신정희 원장이 직접 신경치료와 보존 수복을 시행합니다.',
      '미세현미경을 활용한 정밀 신경치료로 치아 내부의 감염된 조직을 철저히 제거하고, 재치료율을 최소화합니다. "뽑아야 한다"는 진단을 받으셨더라도 한 번 더 가능성을 확인해 보시기 바랍니다.',
      '깊은 충치, 치아 파절, 과거 신경치료 재치료 등 다양한 케이스에서 자연 치아를 살릴 수 있는 방법을 찾아드립니다.'
    ],
    introImg: '/static/img/treat-3.jpg',
    highlights: [
      { icon: 'fas fa-microscope', title: 'Precision', desc: '미세현미경 활용 정밀 신경치료. 육안으로 보이지 않는 미세관까지 확인합니다.' },
      { icon: 'fas fa-award', title: 'Specialist', desc: '보존과 전문의 + 박사학위 보유. 학술적 근거에 기반한 치료를 시행합니다.' },
      { icon: 'fas fa-tooth', title: 'Natural First', desc: '자연 치아 보존을 최우선으로. 발치는 정말 다른 방법이 없을 때의 마지막 선택입니다.' },
    ],
    process: [
      { title: 'Diagnosis', desc: '정밀 검사와 방사선 촬영으로 치아 상태를 정확하게 파악합니다.' },
      { title: 'Treatment Plan', desc: '보존 가능성을 평가하고, 최적의 치료 계획을 수립합니다.' },
      { title: 'Root Canal', desc: '감염된 신경 조직을 미세현미경 하에서 정밀하게 제거합니다.' },
      { title: 'Restoration', desc: '치아 구조를 강화하는 코어를 넣고, 맞춤 크라운으로 수복합니다.' },
      { title: 'Follow-up', desc: '정기적인 방사선 촬영으로 치료 부위의 경과를 확인합니다.' },
    ],
    faq: [
      { q: '신경치료를 하면 치아가 약해지나요?', a: '신경치료 후 치아 자체는 수분 공급이 줄어 다소 약해질 수 있지만, 크라운으로 보호하면 오래 사용 가능합니다. 신경치료하지 않고 방치하면 발치로 이어질 수 있으므로, 적절한 시기에 치료를 받으시는 것이 중요합니다.' },
      { q: '신경치료는 몇 번 방문해야 하나요?', a: '보통 2~3회 방문으로 완료됩니다. 감염 정도에 따라 추가 방문이 필요할 수 있으며, 매 방문 시 상태를 설명해 드립니다.' },
      { q: '다른 치과에서 발치를 권유받았는데, 살릴 수 있나요?', a: '모든 경우에 가능한 것은 아니지만, 보존과 전문의의 정밀 진단을 통해 보존 가능성을 다시 평가해 드립니다. 편하게 내원해 주세요.' },
    ],
  },
  {
    slug: 'aesthetic',
    tag: 'Aesthetic',
    title: '앞니 심미 치료',
    titleHtml: '앞니 <em>심미</em> 치료',
    desc: '치아 삭제량을 최소화하는 전치부 레진 및 라미네이트 치료. 자연스러운 미소를 설계합니다.',
    heroImg: '/static/img/treat-5.jpg',
    metaDesc: '행복한예인치과 앞니 심미치료 - 최소 삭제 라미네이트, 다이렉트 레진, 자연스러운 미소 설계',
    introTitle: '<em>자연스러운</em> 미소를 설계합니다',
    introText: [
      '앞니는 미소를 결정짓는 가장 중요한 요소입니다. 행복한예인치과에서는 치아 삭제를 최소화하면서도 자연스러운 형태와 색상을 구현하는 심미 치료를 시행합니다.',
      '다이렉트 레진 본딩은 치아 표면에 직접 레진을 쌓아올려 형태를 수정하는 방법으로, 삭제량이 거의 없어 보존적이면서도 즉각적인 결과를 얻을 수 있습니다.',
      '라미네이트는 치아 표면을 얇게 다듬고 세라믹 쉘을 접착하는 방식입니다. 현재 최신 트렌드의 미니멀 프렙 라미네이트를 연구·적용 중이며, 최소 삭제로 아름다운 결과를 추구합니다.'
    ],
    introImg: '/static/img/treat-6.jpg',
    highlights: [
      { icon: 'fas fa-cut', title: 'Minimal Prep', desc: '치아 삭제를 최소화합니다. 건강한 치질을 최대한 보존하는 것이 원칙입니다.' },
      { icon: 'fas fa-palette', title: 'Natural Color', desc: '주변 치아와 완벽하게 조화되는 자연스러운 색상. 인공적으로 보이지 않는 결과를 목표로 합니다.' },
      { icon: 'fas fa-smile-beam', title: 'Smile Design', desc: '얼굴형, 입술 라인, 치아 비율을 종합적으로 고려한 맞춤 미소 설계.' },
    ],
    process: [
      { title: 'Smile Analysis', desc: '얼굴형, 입술 라인, 기존 치아 상태를 종합 분석합니다.' },
      { title: 'Design', desc: '디지털 시뮬레이션으로 예상 결과를 미리 확인합니다.' },
      { title: 'Preparation', desc: '최소한의 치아 삭제 또는 무삭제로 표면을 준비합니다.' },
      { title: 'Bonding', desc: '레진 또는 라미네이트 쉘을 정밀하게 접착합니다.' },
      { title: 'Polishing', desc: '미세 조정과 연마로 자연스러운 광택과 형태를 완성합니다.' },
    ],
    faq: [
      { q: '라미네이트와 레진의 차이점은 무엇인가요?', a: '레진은 치아에 직접 재료를 쌓아올려 형태를 만드는 방식이고, 라미네이트는 기공소에서 제작한 세라믹 쉘을 접착하는 방식입니다. 레진은 즉일 완성이 가능하고 비용이 낮지만, 라미네이트는 내구성과 심미성이 더 뛰어납니다.' },
      { q: '라미네이트 수명은 얼마나 되나요?', a: '관리 상태에 따라 10~15년 이상 유지됩니다. 정기적인 검진과 올바른 구강 관리가 중요합니다.' },
      { q: '치아를 많이 갈아야 하나요?', a: '행복한예인치과에서는 최소 삭제를 원칙으로 합니다. 케이스에 따라 무삭제 또는 0.3~0.5mm 정도의 미세 삭제만으로 진행합니다.' },
    ],
  },
  {
    slug: 'orthodontics',
    tag: 'Orthodontics',
    title: '치아 교정',
    titleHtml: '치아 <em>교정</em>',
    desc: '교정과 전문의의 체계적인 교정. 투명교정부터 설측교정까지 라이프스타일에 맞는 솔루션.',
    heroImg: '/static/img/treat-4.jpg',
    metaDesc: '행복한예인치과 치아교정 - 교정과 전문의, 인비절라인 투명교정, 설측교정, 라이프스타일 맞춤',
    introTitle: '교정과 전문의의 <em>체계적인</em> 교정',
    introText: [
      '교정 치료는 단순히 치아를 가지런히 배열하는 것을 넘어, 교합(물리는 방식)과 안면 조화까지 고려해야 합니다. 행복한예인치과의 박현미 원장은 연세대 교정과 석사 + Columbia University CE를 수료한 교정 전문의입니다.',
      '직장인, 학생 등 각 라이프스타일에 맞는 교정 방식을 제안합니다. 티가 나지 않는 투명교정(인비절라인), 안 보이는 설측교정(인코그니토) 등 다양한 옵션을 갖추고 있습니다.',
      '교정 전 정밀 분석을 통해 치료 기간과 결과를 예측하고, 매 방문마다 진행 상황을 투명하게 공유합니다.'
    ],
    introImg: '/static/img/treat-7.jpg',
    highlights: [
      { icon: 'fas fa-user-graduate', title: 'Specialist', desc: '교정과 전문의 직접 진료. 연세대 석사 + Columbia Univ. CE 수료의 전문성.' },
      { icon: 'fas fa-eye-slash', title: 'Invisible', desc: '인비절라인, 설측교정 등 외부에서 보이지 않는 교정 옵션 제공.' },
      { icon: 'fas fa-calendar-check', title: 'Predictable', desc: '디지털 분석 기반 예측 가능한 치료 기간과 결과. 치료 전 시뮬레이션 제공.' },
    ],
    process: [
      { title: 'Analysis', desc: 'X-ray, 구강 스캔, 사진 분석으로 정밀 교정 진단을 시행합니다.' },
      { title: 'Planning', desc: '디지털 시뮬레이션으로 치료 계획을 수립하고 예상 결과를 공유합니다.' },
      { title: 'Appliance', desc: '선택한 교정 장치(투명교정, 설측, 세라믹 브라켓 등)를 장착합니다.' },
      { title: 'Adjustment', desc: '정기적인 내원으로 교정력을 조절하고 진행 상황을 관리합니다.' },
      { title: 'Retention', desc: '교정 완료 후 유지장치를 장착하여 결과를 안정적으로 유지합니다.' },
    ],
    faq: [
      { q: '교정 기간은 얼마나 걸리나요?', a: '케이스에 따라 다르지만, 일반적으로 12~24개월 정도 소요됩니다. 부분 교정의 경우 6~12개월로 단축될 수 있습니다.' },
      { q: '성인도 교정이 가능한가요?', a: '물론입니다. 성인 교정은 매우 흔하며, 치조골 상태만 건강하다면 나이에 관계없이 가능합니다. 오히려 성인은 협조도가 높아 좋은 결과를 얻는 경우가 많습니다.' },
      { q: '투명교정(인비절라인)으로 모든 경우를 치료할 수 있나요?', a: '경미한~중등도의 부정교합에는 매우 효과적입니다. 복잡한 케이스의 경우 전문의가 최적의 장치를 추천해 드립니다.' },
      { q: '교정 중 통증이 있나요?', a: '장치 장착 초기와 조절 후 2~3일간 약간의 불편감이 있을 수 있지만, 대부분 일상생활에 지장이 없는 수준입니다.' },
    ],
  },
  {
    slug: 'general',
    tag: 'General Care',
    title: '일반 / 예방 치료',
    titleHtml: '일반 / <em>예방</em> 치료',
    desc: '정기검진, 스케일링, 충치치료. 기본에 충실하되 편안함을 더한 진료를 제공합니다.',
    heroImg: '/static/img/consult-1.jpg',
    metaDesc: '행복한예인치과 일반진료 - 정기검진, 스케일링, 충치치료, 잇몸치료, 편안한 예방 치과',
    introTitle: '<em>기본</em>에 충실한 편안한 진료',
    introText: [
      '좋은 치과 치료의 시작은 정기적인 검진과 예방입니다. 행복한예인치과에서는 6개월마다 정기검진을 권장하며, 문제를 조기에 발견하여 간단한 치료로 해결할 수 있도록 합니다.',
      '충치 치료부터 스케일링, 잇몸 치료까지 일반 진료 전 과정에서 "아프지 않은 치료"를 지향합니다. 충분한 마취, 부드러운 시술 테크닉, 그리고 치료 중 지속적인 소통을 통해 환자분들의 불안감을 줄입니다.',
      '특히 치과 공포증이 있으신 분, 오랜만에 치과에 오시는 분들도 편안하게 진료받으실 수 있도록 세심하게 배려합니다.'
    ],
    introImg: '/static/img/consult-3.jpg',
    highlights: [
      { icon: 'fas fa-heartbeat', title: 'Prevention', desc: '정기검진 + 맞춤 관리로 큰 치료를 예방합니다. 조기 발견이 최선의 치료입니다.' },
      { icon: 'fas fa-hand-holding-medical', title: 'Painless', desc: '충분한 마취와 부드러운 시술 테크닉. "생각보다 안 아팠다"는 후기가 가장 많습니다.' },
      { icon: 'fas fa-users', title: 'Family Care', desc: '아이부터 어르신까지 온 가족이 함께 다닐 수 있는 편안한 치과.' },
    ],
    process: [
      { title: 'Check-up', desc: '구강 전체 검진과 필요 시 X-ray 촬영으로 현재 상태를 파악합니다.' },
      { title: 'Consultation', desc: '검진 결과를 바탕으로 치료 필요 부위와 우선순위를 설명합니다.' },
      { title: 'Treatment', desc: '충치 치료, 스케일링, 잇몸 치료 등 필요한 치료를 진행합니다.' },
      { title: 'Home Care', desc: '가정에서의 관리 방법과 올바른 칫솔질 방법을 안내합니다.' },
      { title: 'Follow-up', desc: '정기적인 재검진 일정을 잡고, 지속적으로 구강 건강을 관리합니다.' },
    ],
    faq: [
      { q: '스케일링은 얼마나 자주 받아야 하나요?', a: '건강보험 기준 연 1회 보험 적용 스케일링이 가능합니다. 잇몸 상태에 따라 6개월~1년 간격을 권장합니다.' },
      { q: '충치가 아프지 않은데도 치료해야 하나요?', a: '충치 초기에는 통증이 없습니다. 통증이 생겼을 때는 이미 진행된 상태인 경우가 많아, 조기 치료가 비용과 시간 모두 절약됩니다.' },
      { q: '치과 공포증이 있는데 괜찮을까요?', a: '많은 환자분들이 같은 걱정을 하고 오십니다. 충분한 마취, 치료 전 설명, 시술 중 소통을 통해 최대한 편안하게 진료받으실 수 있도록 배려합니다.' },
    ],
  },
];

const allTreatmentLinks = treatments.map(t => ({ slug: t.slug, title: t.title, tag: t.tag }));

export function renderTreatmentPage(slug: string): string | null {
  const t = treatments.find(x => x.slug === slug);
  if (!t) return null;

  const otherTreats = allTreatmentLinks.map(link =>
    `<a href="/treatments/${link.slug}" class="other-treat-link ${link.slug === slug ? 'current' : ''}">
      <span>${link.tag}</span>
      <h4>${link.title}</h4>
    </a>`
  ).join('');

  return `${head({ title: t.title, description: t.metaDesc, path: `/treatments/${t.slug}`, ogImage: t.heroImg, ogType: 'article' })}
${nav('treatments')}

<!-- HERO -->
<section class="sub-hero">
  <div class="sub-hero-bg">
    <img src="${t.heroImg}" alt="${t.title}">
    <div class="sub-hero-overlay"></div>
  </div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <a href="/#treatments">Treatments</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">${t.title}</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">${t.tag}</div>
    <h1>${t.titleHtml}</h1>
    <p class="sub-hero-desc">${t.desc}</p>
  </div>
</section>

<!-- INTRO -->
<section class="treat-intro sec-pad">
  <div class="treat-intro-grid">
    <div class="treat-intro-text">
      <div class="sec-label" style="color:var(--gold-deep)">${t.tag}</div>
      <h2 class="rv">${t.introTitle}</h2>
      ${t.introText.map(p => `<p class="rv rv-d1">${p}</p>`).join('')}
      <div style="margin-top:32px;" class="rv rv-d2">
        <a href="tel:02-756-2828" class="btn btn-outline"><i class="fas fa-phone-alt"></i> 상담 예약</a>
      </div>
    </div>
    <div class="treat-intro-img rv-scale">
      <img src="${t.introImg}" alt="${t.title}">
    </div>
  </div>
</section>

<!-- HIGHLIGHTS -->
<section class="highlights sec-pad">
  <div class="sec-inner">
    <div class="sec-label">Why Us</div>
    <h2 class="sec-title rv">행복한예인치과의 <em>차별점</em></h2>
    <div class="highlights-grid">
      ${t.highlights.map((h, i) => `
      <div class="hl-card rv ${i > 0 ? 'rv-d' + i : ''}">
        <div class="hl-card-icon"><i class="${h.icon}"></i></div>
        <h3>${h.title}</h3>
        <p>${h.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- PROCESS -->
<section class="process sec-pad">
  <div class="sec-inner">
    <div class="sec-label" style="color:var(--gold-deep)">Process</div>
    <h2 class="sec-title rv" style="color:var(--black)">치료 <em>과정</em></h2>
    <div class="process-steps">
      ${t.process.map((p, i) => `
      <div class="process-card rv ${i > 0 ? 'rv-d' + Math.min(i, 4) : ''}">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq sec-pad">
  <div class="sec-inner">
    <div class="sec-label">FAQ</div>
    <h2 class="sec-title rv">자주 묻는 <em>질문</em></h2>
    <div class="faq-list">
      ${t.faq.map(f => `
      <div class="faq-item rv">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4>${f.q}</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a">
          <p>${f.a}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- OTHER TREATMENTS -->
<div class="other-treats">
  <div class="other-treats-inner">
    <div class="other-treats-label">Other Treatments</div>
    <div class="other-treats-grid">${otherTreats}</div>
  </div>
</div>

${footer()}
${scripts()}`;
}
