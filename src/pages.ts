// Individual pages for top menu items
import { head, nav, footer, scripts } from './layout'

// ===========================
// PHILOSOPHY PAGE
// ===========================
export function philosophyPage(): string {
  const philoFaq = [
    { q: '행복한예인치과의 진료 철학은 무엇인가요?', a: '"내 가족에게 권할 수 없는 치료는 시작도 하지 않습니다"가 행복한예인치과의 핵심 철학입니다. 불필요한 치료를 권하지 않고, X-ray 앞에서 투명하게 설명하며, 환자의 시간과 선택을 존중합니다.' },
    { q: '왜 13년간 같은 자리에서 진료하시나요?', a: '병원이 이전하면 환자와의 관계가 끊기기 쉽습니다. 13년간 시청역·명동·을지로 같은 자리에서 진료를 이어온 것은, 장기적인 신뢰 관계를 가장 중요하게 생각하기 때문입니다. 변하지 않는 곳에서 변함없는 원칙으로 진료합니다.' },
    { q: '과잉 진료를 하지 않는다는 것은 어떤 의미인가요?', a: '안 해도 되는 치료는 "안 해도 됩니다"라고 솔직하게 말씀드립니다. CT와 X-ray를 함께 보면서 현재 상태를 투명하게 설명하고, 정말 필요한 치료만 제안합니다. "여기서는 안 해도 되는 건 안 해도 된다고 말해줘서 좋다"는 후기가 이를 증명합니다.' },
    { q: '환자의 시간을 존중한다는 것은 구체적으로 어떤 것인가요?', a: '예약 시간을 철저히 지키고 대기 시간을 최소화합니다. 발치즉시 임플란트로 내원 횟수를 줄이고, 수요일 야간진료(20시까지)로 퇴근 후에도 치료가 가능합니다. 시청역·명동·을지로 직장인 밀집 지역에 위치하여 이동 시간도 최소화합니다.' },
    { q: '행복한예인치과는 어떻게 신뢰를 쌓아왔나요?', a: '13년간 같은 자리에서 과장 없는 진료, 458건 이상의 환자 리뷰(평균 4.9점), 보건복지부 인증 전문의 3명의 직접 진료. 이 세 가지가 행복한예인치과가 쌓아온 신뢰의 기반입니다.' },
    { q: '한승대 대표원장의 진료 스타일은 어떤가요?', a: '한승대 원장은 "환자분의 상황과 선택을 존중합니다. 과장하지 않고, 숨김없이 설명하겠습니다"를 신조로 진료합니다. 통합치의학과 전문의·치의학 박사로서 학술적 근거에 기반한 진료를 시행하며, 고난이도 임플란트도 직접 시술합니다.' },
  ];
  const philoFaqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": philoFaq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };
  return `${head({ title: '진료 철학', description: '시청역·명동·을지로에서 13년, 행복한예인치과의 진료 철학. 내 가족에게 권할 수 없는 치료는 시작도 하지 않습니다. 과장 없는 진료, 환자 존중, 장기적 관계. 서울 중구 남대문로 02-756-2828', path: '/philosophy', ogImage: '/static/img/dr-han-logo.jpg', keywords: '치과 진료 철학, 행복한예인치과 철학, 한승대 원장, 시청역 치과 철학, 명동 치과, 을지로 치과, 광화문 치과, 서울 중구 치과, 신뢰할 수 있는 치과, 직장인 치과', breadcrumbs: [{ name: '홈', url: '/' }, { name: '진료 철학', url: '/philosophy' }], jsonLd: [philoFaqJsonLd] })}
${nav('philosophy')}

<!-- HERO -->
<section class="sub-hero sub-hero-tall">
  <div class="sub-hero-bg">
    <img src="/static/img/dr-han-logo.jpg" alt="행복한예인치과 진료 철학">
    <div class="sub-hero-overlay"></div>
  </div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">Philosophy</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">Our Philosophy</div>
    <h1>내 가족에게<br><em>권할 수 없는</em> 치료는<br>시작도 하지 않습니다.</h1>
  </div>
</section>

<!-- PHILOSOPHY MAIN -->
<section class="page-section bg-white" style="color:var(--black);">
  <div class="page-inner">
    <div class="philo-quote-block rv">
      <div class="philo-quote-mark">&ldquo;</div>
      <p class="philo-quote-text">
        환자분들이 "원장님은 믿거든요"라고 말씀해주실 때,<br>
        13년간 한자리에서 진료해 온 보람을 느낍니다.
      </p>
      <div class="philo-quote-credit">&mdash; 한승대 대표원장, 통합치의학과 전문의, 치의학 박사</div>
    </div>
  </div>
</section>

<!-- VALUES DETAIL -->
<section class="page-section bg-black">
  <div class="page-inner">
    <div class="sec-label">Core Values</div>
    <h2 class="sec-title rv">우리가 <em>지키는</em> 원칙</h2>

    <div class="philo-values-list">
      <div class="philo-value-item rv">
        <div class="philo-value-num">01</div>
        <div class="philo-value-content">
          <h3><i class="fas fa-handshake"></i> 과장 없는 진료</h3>
          <p>불필요한 치료를 권하지 않습니다. 환자의 상태를 X-ray 앞에서 그대로 보여드리고, 정말 필요한 치료만 제안합니다. "여기서는 안 해도 되는 건 안 해도 된다고 말해줘서 좋다"는 후기를 가장 값지게 생각합니다.</p>
        </div>
      </div>
      <div class="philo-value-item rv rv-d1">
        <div class="philo-value-num">02</div>
        <div class="philo-value-content">
          <h3><i class="fas fa-hand-holding-heart"></i> 환자의 시간을 존중</h3>
          <p>시청역·명동·을지로·광화문 직장인분들이 많이 찾는 행복한예인치과. 예약 시간을 철저히 지키고, 대기 시간을 최소화합니다. 발치즉시 임플란트로 내원 횟수를 줄이고, 수요일 야간진료(20시까지)로 퇴근 후에도 진료가 가능합니다.</p>
        </div>
      </div>
      <div class="philo-value-item rv rv-d2">
        <div class="philo-value-num">03</div>
        <div class="philo-value-content">
          <h3><i class="fas fa-infinity"></i> 장기적 관계 우선</h3>
          <p>단기 매출보다 장기적인 관계를 우선합니다. 환자, 직원, 병원 모두 오래 갈 수 있는 방향을 모색합니다. 13년간 같은 자리에서 진료를 이어올 수 있었던 이유입니다.</p>
        </div>
      </div>
      <div class="philo-value-item rv rv-d3">
        <div class="philo-value-num">04</div>
        <div class="philo-value-content">
          <h3><i class="fas fa-feather-alt"></i> 편안한 경험</h3>
          <p>치료 결과만큼 과정에서의 경험도 중요합니다. 충분한 마취, 부드러운 테크닉, 치료 중 지속적인 소통. 치과를 다녀간 뒤 안도감을 느끼실 수 있도록 최선을 다합니다.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- STORY SECTION -->
<section class="page-section bg-dark">
  <div class="page-inner">
    <div class="sec-label">Our Story</div>
    <h2 class="sec-title rv">13년, <em>한자리</em>의 이야기</h2>
    
    <div class="story-timeline">
      <div class="story-item rv">
        <div class="story-year">2013</div>
        <div class="story-text">
          <h4>행복한예인치과 개원</h4>
          <p>서울 중구 남대문로, 시청역·명동·을지로 직장인 밀집 지역에 문을 열었습니다. "내 가족에게 권할 수 있는 치료"라는 원칙으로 시작했습니다.</p>
        </div>
      </div>
      <div class="story-item rv rv-d1">
        <div class="story-year">2016</div>
        <div class="story-text">
          <h4>전문의 협진 시스템 구축</h4>
          <p>보존과 전문의, 교정 전문의를 영입하여 분야별 전문의 협진 체계를 갖추었습니다.</p>
        </div>
      </div>
      <div class="story-item rv rv-d2">
        <div class="story-year">2019</div>
        <div class="story-text">
          <h4>발치즉시 임플란트 80%+ 달성</h4>
          <p>수천 건의 임플란트 경험을 바탕으로, 전체 케이스 중 80% 이상 즉시식립 시행.</p>
        </div>
      </div>
      <div class="story-item rv rv-d3">
        <div class="story-year">2026</div>
        <div class="story-text">
          <h4>13년차, 같은 자리에서</h4>
          <p>458건 이상의 환자 리뷰, 변함없는 자리에서 계속되는 신뢰. 앞으로도 같은 원칙으로 진료합니다.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- NUMBERS -->
<section class="page-section bg-black">
  <div class="page-inner">
    <div class="philo-numbers">
      <div class="philo-num-item rv">
        <div class="philo-num-big">13</div>
        <div class="philo-num-unit">Years</div>
        <div class="philo-num-desc">한자리에서의 신뢰</div>
      </div>
      <div class="philo-num-item rv rv-d1">
        <div class="philo-num-big">458</div>
        <div class="philo-num-unit">Reviews</div>
        <div class="philo-num-desc">환자 리뷰</div>
      </div>
      <div class="philo-num-item rv rv-d2">
        <div class="philo-num-big">80</div>
        <div class="philo-num-unit">%+</div>
        <div class="philo-num-desc">즉시 임플란트</div>
      </div>
      <div class="philo-num-item rv rv-d3">
        <div class="philo-num-big">3</div>
        <div class="philo-num-unit">Specialists</div>
        <div class="philo-num-desc">분야별 전문의</div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq sec-pad">
  <div class="sec-inner">
    <div class="sec-label">FAQ</div>
    <h2 class="sec-title rv">진료 철학에 관한 <em>질문</em></h2>
    <div class="faq-list">
      ${philoFaq.map(f => `
      <div class="faq-item rv">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4>${f.q}</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('')}
    </div>
  </div>
</section>

${footer()}
${scripts()}`;
}


// ===========================
// DOCTORS PAGE
// ===========================
export function doctorsPage(): string {
  const docFaq = [
    { q: '한승대 대표원장의 전문 분야는 무엇인가요?', a: '한승대 대표원장은 보건복지부 인증 통합치의학과 전문의이자 치의학 박사입니다. 발치즉시 임플란트, 고난이도 임플란트(상악동 거상술, 골이식), 전악 임플란트 재건, 앞니 심미 치료(레진, 라미네이트)를 전문으로 합니다. 경희대 치의학전문대학원 졸업, NYU Implant Institute Course 수료의 경력을 보유하고 있습니다.' },
    { q: '신정희 원장의 전문 분야는 무엇인가요?', a: '신정희 원장은 보건복지부 인증 치과보존과 전문의이자 치의학 박사입니다. 미세현미경을 활용한 정밀 신경치료, 보존 수복, 충치 치료를 전문으로 합니다. 경희대 치과대학 졸업, 경희대 치과보존과 레지던트 수료, 경희대 치과보존과 외래강사를 역임했습니다.' },
    { q: '박현미 원장의 전문 분야는 무엇인가요?', a: '박현미 원장은 교정과 전문의로, 인비절라인 투명교정, 설측교정, 세라믹 교정, 성인 교정을 전문으로 합니다. 연세대 졸업, 연세대 치의학대학원 교정과 석사, 에이플러스치과병원 교정과 전임의, Columbia University CE 수료의 경력을 보유합니다.' },
    { q: '전문의 협진의 장점은 무엇인가요?', a: '한 환자에게 임플란트, 보존치료, 교정이 동시에 필요할 수 있습니다. 전문의 협진 시스템에서는 각 분야 전문의가 함께 논의하여 최적의 치료 방향을 결정합니다. 다른 병원을 전전하지 않아도 되므로 환자의 시간과 비용을 절약합니다.' },
    { q: '전문의와 일반 치과의사의 차이는 무엇인가요?', a: '전문의는 치과의사 면허 취득 후 해당 분야에서 추가로 3~4년간의 수련(레지던트 과정)을 이수하고, 보건복지부 인증 시험에 합격한 의사입니다. 해당 분야에 대한 깊은 전문 지식과 수술 경험을 갖추고 있어 더 정확하고 안전한 치료가 가능합니다.' },
    { q: '시청역·명동 근처에서 전문의가 직접 진료하는 치과가 있나요?', a: '행복한예인치과는 시청역 도보 5분, 명동역 8분 거리에 위치하며, 3명의 보건복지부 인증 전문의(통합치의학, 보존과, 교정과)가 직접 진료합니다. 을지로입구역 7분, 광화문·종로·회현·충무로에서도 10분 이내입니다.' },
  ];
  const docFaqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": docFaq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };
  return `${head({ title: '의료진 소개', description: '시청역·명동·을지로 전문의 협진 치과 | 행복한예인치과 의료진. 한승대 대표원장(통합치의학 전문의, 치의학 박사), 신정희 원장(보존과 전문의), 박현미 원장(교정 전문의). 시청역 5분, 명동역 8분. 02-756-2828', path: '/doctors', ogImage: '/static/img/dr-han-profile.jpg', keywords: '행복한예인치과 의료진, 한승대 원장, 시청역 치과 전문의, 명동 치과 전문의, 을지로 치과, 광화문 치과, 보존과 전문의, 교정과 전문의, 서울 중구 치과, 직장인 치과', breadcrumbs: [{ name: '홈', url: '/' }, { name: '의료진 소개', url: '/doctors' }], jsonLd: [docFaqJsonLd] })}
${nav('doctors')}

<!-- HERO -->
<section class="sub-hero sub-hero-tall">
  <div class="sub-hero-bg">
    <img src="/static/img/dr-han-front.jpg" alt="행복한예인치과 의료진">
    <div class="sub-hero-overlay"></div>
  </div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">Doctors</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">Our Doctors</div>
    <h1>각 분야<br><em>전문의</em> 협진</h1>
    <p class="sub-hero-desc">시청역·명동·을지로에서 도보 5~8분.<br>통합치의학, 보존과, 교정과 전문의 3인이 한 곳에서 협진합니다.</p>
  </div>
</section>

<!-- LEAD DOCTOR -->
<section class="page-section bg-white" style="color:var(--black);">
  <div class="page-inner">
    <div class="sec-label" style="color:var(--gold-deep);">Lead Doctor</div>
    <div class="doc-lead-grid rv">
      <div class="doc-lead-photo">
        <img src="/static/img/dr-han-profile.jpg" alt="한승대 대표원장">
        <div class="doc-lead-badge">Lead Doctor</div>
      </div>
      <div class="doc-lead-info">
        <h2>한승대 <span class="doc-name-en">Han Seungdae</span></h2>
        <div class="doc-role">대표원장 &middot; 통합치의학과 전문의 &middot; 치의학 박사</div>
        <div class="doc-quote rv rv-d1">
          &ldquo;환자분의 상황과 선택을 존중합니다.<br>과장하지 않고, 숨김없이 설명하겠습니다.&rdquo;
        </div>
        <div class="doc-creds-grid rv rv-d2">
          <div class="doc-cred-section">
            <h4>학력</h4>
            <ul>
              <li>고려대학교 졸업</li>
              <li>경희대학교 치의학전문대학원 졸업</li>
              <li>경희대학교 대학원 치의학 박사</li>
            </ul>
          </div>
          <div class="doc-cred-section">
            <h4>경력 / 자격</h4>
            <ul>
              <li>보건복지부 인증 통합치의학과 전문의</li>
              <li>NYU Implant Institute Course 수료</li>
              <li>대한악안면임플란트학회 정회원</li>
              <li>서울특별시 치과의사회 회원</li>
            </ul>
          </div>
          <div class="doc-cred-section">
            <h4>전문 분야</h4>
            <ul>
              <li>발치즉시 임플란트</li>
              <li>고난이도 임플란트 (상악동 거상술, 골이식)</li>
              <li>전악 임플란트 재건</li>
              <li>앞니 심미 치료 (레진, 라미네이트)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- DOCTOR 2: 신정희 -->
<section class="page-section bg-dark">
  <div class="page-inner">
    <div class="sec-label">Specialist</div>
    <div class="doc-card-horizontal rv">
      <div class="doc-h-icon">
        <i class="fas fa-microscope"></i>
      </div>
      <div class="doc-h-info">
        <h2>신정희 <span class="doc-name-en">Shin Jeonghee</span></h2>
        <div class="doc-role">치과보존과 전문의 &middot; 치의학 박사</div>
        <p class="doc-h-desc">자연 치아를 살리는 것이 최선입니다. 미세현미경을 활용한 정밀 신경치료와 보존 수복으로, "뽑아야 한다"는 진단을 받으셨더라도 한 번 더 가능성을 확인해 드립니다.</p>
        <div class="doc-creds-simple rv rv-d1">
          <span><i class="fas fa-graduation-cap"></i> 경희대학교 치과대학 졸업</span>
          <span><i class="fas fa-graduation-cap"></i> 경희대 대학원 치의학 박사</span>
          <span><i class="fas fa-award"></i> 보건복지부 인증 치과보존과 전문의</span>
          <span><i class="fas fa-hospital"></i> 경희대 치과보존과 레지던트 수료</span>
          <span><i class="fas fa-chalkboard-teacher"></i> 경희대 치과보존과 외래강사 역임</span>
        </div>
        <div class="doc-specialty-tags rv rv-d2">
          <span>신경치료</span>
          <span>보존 수복</span>
          <span>미세현미경</span>
          <span>충치 치료</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- DOCTOR 3: 박현미 -->
<section class="page-section bg-black">
  <div class="page-inner">
    <div class="sec-label">Specialist</div>
    <div class="doc-card-horizontal rv">
      <div class="doc-h-icon">
        <i class="fas fa-teeth"></i>
      </div>
      <div class="doc-h-info">
        <h2>박현미 <span class="doc-name-en">Park Hyunmi</span></h2>
        <div class="doc-role">교정 전문의</div>
        <p class="doc-h-desc">라이프스타일에 맞는 교정을 제안합니다. 티 안 나는 투명교정부터 설측교정까지, 직장인과 학생 모두에게 적합한 솔루션을 찾아드립니다.</p>
        <div class="doc-creds-simple rv rv-d1">
          <span><i class="fas fa-graduation-cap"></i> 연세대학교 졸업</span>
          <span><i class="fas fa-graduation-cap"></i> 연세대 치의학대학원 교정과 석사</span>
          <span><i class="fas fa-hospital"></i> 에이플러스치과병원 교정과 전임의</span>
          <span><i class="fas fa-certificate"></i> 인비절라인 투명교정 수료</span>
          <span><i class="fas fa-globe-americas"></i> Columbia University CE 수료</span>
        </div>
        <div class="doc-specialty-tags rv rv-d2">
          <span>인비절라인</span>
          <span>설측교정</span>
          <span>세라믹 교정</span>
          <span>성인 교정</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TEAM APPROACH -->
<section class="page-section bg-white" style="color:var(--black);">
  <div class="page-inner">
    <div class="sec-label" style="color:var(--gold-deep);">Team Approach</div>
    <h2 class="sec-title rv" style="margin-bottom:60px;">전문의 <em>협진</em>의 장점</h2>
    <div class="team-approach-grid">
      <div class="team-approach-card rv">
        <div class="team-approach-icon"><i class="fas fa-users-medical"></i></div>
        <h4>분야별 최적의 판단</h4>
        <p>한 환자에게 임플란트가 필요할 수도, 보존치료가 가능할 수도, 교정이 선행되어야 할 수도 있습니다. 각 분야 전문의가 함께 논의하여 최적의 치료 방향을 결정합니다.</p>
      </div>
      <div class="team-approach-card rv rv-d1">
        <div class="team-approach-icon"><i class="fas fa-sync-alt"></i></div>
        <h4>원스톱 치료</h4>
        <p>다른 병원을 전전하지 않아도 됩니다. 임플란트, 보존, 교정 모두 한 곳에서 해결. 환자의 시간과 비용을 절약합니다.</p>
      </div>
      <div class="team-approach-card rv rv-d2">
        <div class="team-approach-icon"><i class="fas fa-comments"></i></div>
        <h4>통합적 시각</h4>
        <p>부분만 보는 것이 아니라, 구강 전체를 통합적으로 바라봅니다. 현재 문제 해결과 미래 예방까지 고려한 치료 설계.</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq sec-pad">
  <div class="sec-inner">
    <div class="sec-label">FAQ</div>
    <h2 class="sec-title rv">의료진에 관한 <em>질문</em></h2>
    <div class="faq-list">
      ${docFaq.map(f => `
      <div class="faq-item rv">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4>${f.q}</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('')}
    </div>
  </div>
</section>

${footer()}
${scripts()}`;
}


// ===========================
// EXPERIENCE PAGE
// ===========================
export function experiencePage(): string {
  const expFaq = [
    { q: '정말 아프지 않나요?', a: '표면 마취제를 먼저 도포하고, 충분한 마취 후 치료합니다. 대부분의 환자분들이 "생각보다 안 아팠다"고 말씀하시며, 이것이 가장 많은 후기입니다. 시술 중 불편하시면 언제든 손을 들어 알려주세요.' },
    { q: '치과가 무서운데 어떻게 하면 좋을까요?', a: '많은 분들이 같은 걱정을 하고 오십니다. 행복한예인치과에서는 치료 전 충분한 설명, 단계별 안내, 시술 중 지속적인 소통으로 불안감을 최소화합니다. 오랜만에 치과에 오시는 분들도 편안하게 진료받으실 수 있도록 세심하게 배려합니다.' },
    { q: '대기 시간이 긴가요?', a: '행복한예인치과는 예약제로 운영되며, 예약 시간을 철저히 지킵니다. 대부분 5분 이내에 진료가 시작됩니다. 시청역·명동·을지로 직장인분들의 소중한 시간을 아끼기 위해 효율적인 예약 시스템을 운영합니다.' },
    { q: '치료 후 문제가 생기면 어떻게 하나요?', a: '치료 후 궁금한 점이나 불편한 증상이 있으면 전화(02-756-2828)로 바로 상담 가능합니다. 필요한 경우 우선적으로 내원 예약을 잡아드립니다. 13년간 같은 자리에서 진료하며 사후 관리에도 책임을 다합니다.' },
    { q: '직장인인데 진료 시간에 맞추기 어려워요.', a: '시청역 도보 5분, 명동역 8분, 을지로입구역 7분 거리에 위치하여 점심시간에 방문 가능합니다. 수요일은 야간진료(20시까지)로 퇴근 후에도 치료받으실 수 있습니다. 광화문·종로·회현·충무로·서울역에서도 10분 이내입니다.' },
    { q: '치료 비용이 투명한가요?', a: '행복한예인치과에서는 치료 전 비용을 투명하게 안내합니다. 숨겨진 추가 비용 없이, 상담 시 안내받은 금액 그대로 진행됩니다. 불필요한 치료를 권하지 않아 과잉 비용이 발생하지 않습니다.' },
  ];
  const expFaqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": expFaq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };
  return `${head({ title: '환자 경험', description: '시청역·명동·을지로 직장인이 믿고 찾는 행복한예인치과. 치과를 다녀간 뒤 안도감을 느끼셨으면. 부드러운 마취, X-ray 앞 투명한 설명, 수요일 야간진료. 시청역 5분·명동역 8분. 02-756-2828', path: '/experience', ogImage: '/static/img/consult-2.jpg', keywords: '치과 환자 경험, 시청역 치과 후기, 명동 치과 후기, 을지로 치과, 광화문 치과, 통증 없는 치과, 편안한 치과, 직장인 치과, 야간진료 치과, 서울 중구 치과', breadcrumbs: [{ name: '홈', url: '/' }, { name: '환자 경험', url: '/experience' }], jsonLd: [expFaqJsonLd] })}
${nav('experience')}

<!-- HERO -->
<section class="sub-hero sub-hero-tall">
  <div class="sub-hero-bg">
    <img src="/static/img/consult-2.jpg" alt="행복한예인치과 환자 경험">
    <div class="sub-hero-overlay"></div>
  </div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">Experience</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">Patient Experience</div>
    <h1>치과를 다녀간 뒤<br><em>안도감</em>을 느끼셨으면.</h1>
    <p class="sub-hero-desc">긴장하고 오셨다가 생각보다 아프지 않아서 놀라셨다는 말씀.<br>그 한마디가 저희에게 가장 큰 보람입니다.</p>
  </div>
</section>

<!-- EXPERIENCE PILLARS -->
<section class="page-section bg-white" style="color:var(--black);">
  <div class="page-inner">
    <div class="sec-label" style="color:var(--gold-deep);">What We Care About</div>
    <h2 class="sec-title rv" style="margin-bottom:80px;">환자 경험의 <em>4가지</em> 핵심</h2>

    <div class="exp-pillar rv">
      <div class="exp-pillar-img">
        <img src="/static/img/consult-1.jpg" alt="부드러운 진료">
      </div>
      <div class="exp-pillar-text">
        <div class="exp-pillar-num">01</div>
        <h3>Gentle Touch</h3>
        <h4>마취부터 치료까지, 부드럽고 편안한 진료</h4>
        <p>표면 마취제를 먼저 도포하여 주사 통증을 최소화합니다. 시술 중에도 환자의 반응을 살피며 충분한 마취를 유지합니다. "생각보다 안 아팠다"는 후기가 가장 많은 이유입니다.</p>
        <p>특히 치과 공포증이 있으신 분들을 위해 치료 전 충분한 설명과 단계별 안내를 제공합니다. 치료 중 불편하시면 언제든 손을 들어 알려주세요.</p>
      </div>
    </div>

    <div class="exp-pillar exp-pillar-reverse rv">
      <div class="exp-pillar-img">
        <img src="/static/img/xray-2.jpg" alt="명확한 소통">
      </div>
      <div class="exp-pillar-text">
        <div class="exp-pillar-num">02</div>
        <h3>Clear Communication</h3>
        <h4>X-ray 앞에서 이해가 될 때까지 설명합니다</h4>
        <p>전문 용어 대신 쉬운 말로, X-ray와 사진을 함께 보면서 현재 상태를 설명합니다. 치료 옵션과 각각의 장단점, 비용까지 투명하게 안내합니다.</p>
        <p>불필요한 치료를 권하지 않습니다. "여기서는 안 해도 되는 건 안 해도 된다고 말해줘서 좋다"는 후기를 가장 값지게 생각합니다.</p>
      </div>
    </div>

    <div class="exp-pillar rv">
      <div class="exp-pillar-img">
        <img src="/static/img/consult-3.jpg" alt="효율적 시간">
      </div>
      <div class="exp-pillar-text">
        <div class="exp-pillar-num">03</div>
        <h3>Time-Efficient</h3>
        <h4>바쁜 직장인을 기준으로 설계된 진료 프로세스</h4>
        <p>시청역·명동·을지로·광화문 직장인 밀집 지역에 위치. 시청역 도보 5분, 명동역 8분, 을지로입구역 7분 거리입니다. 예약 시간을 지키고, 대기 시간을 최소화합니다. 발치즉시 임플란트로 내원 횟수 자체를 줄입니다.</p>
        <p>수요일 야간진료(20시까지)로 퇴근 후에도 치료받으실 수 있습니다. 광화문·종로·회현·충무로·서울역에서도 대중교통 10분 이내. 효율적인 예약 시스템으로 시간을 아껴드립니다.</p>
      </div>
    </div>

    <div class="exp-pillar exp-pillar-reverse rv">
      <div class="exp-pillar-img">
        <img src="/static/img/treat-3.jpg" alt="사후 케어">
      </div>
      <div class="exp-pillar-text">
        <div class="exp-pillar-num">04</div>
        <h3>Aftercare</h3>
        <h4>치료 후에도 꾸준한 관리와 사후 케어</h4>
        <p>치료는 시술이 끝나는 순간이 아니라, 완전히 회복될 때까지입니다. 시술 후 주의사항을 상세히 안내하고, 회복 과정에서의 궁금증에 성실히 답변합니다.</p>
        <p>정기검진 리마인드를 통해 지속적으로 구강 건강을 관리합니다. 13년간 한자리에서 진료해온 만큼, 오래도록 함께합니다.</p>
      </div>
    </div>
  </div>
</section>

<!-- GALLERY -->
<section class="page-section bg-dark">
  <div class="page-inner">
    <div class="sec-label">Gallery</div>
    <h2 class="sec-title rv" style="margin-bottom:60px;"><em>진료</em> 환경</h2>
    <div class="exp-gallery-grid">
      <div class="exp-gallery-item rv"><img src="/static/img/consult-1.jpg" alt="상담실"><span>상담실</span></div>
      <div class="exp-gallery-item rv rv-d1"><img src="/static/img/xray-1.jpg" alt="X-ray 촬영"><span>X-ray 촬영</span></div>
      <div class="exp-gallery-item rv rv-d2"><img src="/static/img/treat-2.jpg" alt="진료실"><span>진료실</span></div>
      <div class="exp-gallery-item rv rv-d1"><img src="/static/img/xray-3.jpg" alt="정밀 진단"><span>정밀 진단</span></div>
      <div class="exp-gallery-item rv rv-d2"><img src="/static/img/treat-6.jpg" alt="시술"><span>시술</span></div>
      <div class="exp-gallery-item rv rv-d3"><img src="/static/img/consult-3.jpg" alt="사후 상담"><span>사후 상담</span></div>
    </div>
  </div>
</section>

<!-- REVIEWS HIGHLIGHT -->
<section class="page-section bg-black">
  <div class="page-inner" style="text-align:center;">
    <div class="sec-label" style="justify-content:center;">Patient Voice</div>
    <h2 class="sec-title rv" style="margin-bottom:60px;">환자분들의 <em>한마디</em></h2>
    <div class="review-cards">
      <div class="review-card rv">
        <div class="review-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p>"생각보다 안 아팠어요. 설명도 자세히 해주시고, 치료 안 해도 되는 건 솔직히 말씀해주셔서 신뢰가 갑니다."</p>
        <span class="review-author">&mdash; 30대 직장인</span>
      </div>
      <div class="review-card rv rv-d1">
        <div class="review-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p>"다른 치과에서 발치하라고 했는데, 여기서 신경치료로 살렸어요. 보존과 전문의가 직접 해주시니 믿음이 갑니다."</p>
        <span class="review-author">&mdash; 40대 주부</span>
      </div>
      <div class="review-card rv rv-d2">
        <div class="review-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p>"시청역·명동 근처라 점심시간에 다닐 수 있어서 좋고, 예약 시간 잘 지켜주셔서 대기가 거의 없어요. 을지로 사무실에서도 가까워요."</p>
        <span class="review-author">&mdash; 20대 회사원</span>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq sec-pad">
  <div class="sec-inner">
    <div class="sec-label">FAQ</div>
    <h2 class="sec-title rv">환자 경험에 관한 <em>질문</em></h2>
    <div class="faq-list">
      ${expFaq.map(f => `
      <div class="faq-item rv">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4>${f.q}</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('')}
    </div>
  </div>
</section>

${footer()}
${scripts()}`;
}


// ===========================
// LOCATION PAGE
// ===========================
export function locationPage(): string {
  const locFaq = [
    { q: '시청역에서 행복한예인치과까지 걸어서 얼마나 걸리나요?', a: '1·2호선 시청역 4번 또는 5번 출구에서 도보 약 5분 거리입니다. 출구에서 남대문 방향으로 직진하시면 남대문로9길 51 효덕빌딩 3층에 위치합니다.' },
    { q: '명동역에서 어떻게 찾아가나요?', a: '4호선 명동역 3번 출구에서 서울시청 방향으로 도보 약 8분입니다. 명동 거리를 지나 남대문시장 방향으로 오시면 쉽게 찾으실 수 있습니다.' },
    { q: '을지로입구역에서 어떻게 가나요?', a: '2호선 을지로입구역 1번 출구에서 시청 방향으로 도보 약 7분입니다. 남대문로를 따라 남쪽으로 내려오시면 됩니다.' },
    { q: '광화문역·종로에서 얼마나 걸리나요?', a: '5호선 광화문역 6번 출구에서 도보 약 10분, 세종대로를 따라 남쪽으로 내려오시면 됩니다. 1호선 종로3가역에서도 대중교통으로 10분 이내에 도착 가능합니다.' },
    { q: '서울역에서 가깝나요?', a: '1호선 서울역에서 시청역 방향으로 한 정거장이며, 도보로는 약 12분 거리입니다. 대중교통 이용 시 5분 이내에 도착 가능합니다.' },
    { q: '회현역·남대문시장에서 어떻게 찾아가나요?', a: '4호선 회현역에서 도보 약 6분, 남대문시장에서 도보 약 3분 거리입니다. 남대문시장 근처에서 가장 가까운 전문의 협진 치과입니다.' },
    { q: '충무로역에서 갈 수 있나요?', a: '3·4호선 충무로역에서 명동·남대문 방향으로 도보 약 10분 거리입니다. 명동역 경유로도 오실 수 있습니다.' },
    { q: '주차는 가능한가요?', a: '효덕빌딩 주변 유료 주차장을 이용하실 수 있습니다. 다만 도심 특성상 주차 공간이 제한적이므로 대중교통 이용을 권장드립니다. 시청역·명동역·을지로입구역·회현역 모두 도보 5~8분 거리입니다.' },
    { q: '북창동·다동·무교동에서 가까운가요?', a: '네, 행복한예인치과는 북창동에서 도보 3~5분, 다동·무교동에서 도보 5~7분 거리입니다. 서울시청·덕수궁 바로 남쪽에 위치하여 도심 생활권에서 도보 이동이 가능합니다.' },
  ];
  const locFaqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": locFaq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };
  return `${head({ title: '오시는 길', description: '행복한예인치과 오시는 길 - 시청역 5분·명동역 8분·을지로입구역 7분·회현역 6분·광화문역 10분·서울역 12분. 서울 중구 남대문로9길 51 효덕빌딩 3층. 수요일 야간진료. 02-756-2828', path: '/location', keywords: '행복한예인치과 위치, 시청역 치과, 명동 치과, 을지로 치과, 광화문 치과, 종로 치과, 회현역 치과, 충무로 치과, 서울역 치과, 남대문 치과, 서울 중구 치과, 시청역 도보 5분, 명동역 도보 8분, 야간진료 치과, 직장인 치과, 북창동 치과, 다동 치과, 무교동 치과', breadcrumbs: [{ name: '홈', url: '/' }, { name: '오시는 길', url: '/location' }], jsonLd: [locFaqJsonLd] })}
${nav('location')}

<!-- HERO -->
<section class="sub-hero">
  <div class="sub-hero-bg">
    <img src="/static/img/dr-han-logo.jpg" alt="행복한예인치과 위치">
    <div class="sub-hero-overlay"></div>
  </div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">Location</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">Location & Contact</div>
    <h1>시청역·명동·을지로에서<br><em>도보 5~8분</em></h1>
    <p class="sub-hero-desc">서울 중구 남대문로9길 51 효덕빌딩 3층 301호<br>광화문·종로·회현·충무로·서울역에서도 10분 이내</p>
  </div>
</section>

<!-- MAP + INFO -->
<section class="page-section bg-white" style="color:var(--black);">
  <div class="page-inner">
    <div class="loc-full-grid">
      <div class="loc-full-map rv-scale">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d790.6!2d126.978!3d37.566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb1a2f4b7d%3A0x!2z7ISc7Jq4IOykkSDrgqjrjIDrrLjroZw56ri4IDUx!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr" allowfullscreen="" loading="lazy"></iframe>
      </div>
      <div class="loc-full-info">
        <div class="loc-info-card rv">
          <div class="loc-info-icon"><i class="fas fa-map-marker-alt"></i></div>
          <div>
            <h4>Address</h4>
            <p>서울 중구 남대문로9길 51<br>효덕빌딩 3층 301호</p>
            <span class="loc-detail">시청역 5분 · 명동역 8분 · 을지로입구역 7분 · 회현역 6분</span>
          </div>
        </div>
        <div class="loc-info-card rv rv-d1">
          <div class="loc-info-icon"><i class="fas fa-phone-alt"></i></div>
          <div>
            <h4>Phone</h4>
            <p><a href="tel:02-756-2828" style="color:var(--gold-deep);font-weight:700;font-size:1.3rem;font-family:var(--font-mono);letter-spacing:2px;">02.756.2828</a></p>
            <span class="loc-detail">FAX 02-754-8188</span>
          </div>
        </div>
        <div class="loc-info-card rv rv-d2">
          <div class="loc-info-icon"><i class="fas fa-clock"></i></div>
          <div>
            <h4>Hours</h4>
            <div class="loc-hours-grid">
              <span class="loc-day">Mon</span><span class="loc-time">09:30 - 18:30</span>
              <span class="loc-day">Tue</span><span class="loc-time">09:30 - 18:30</span>
              <span class="loc-day">Wed</span><span class="loc-time">09:30 - 20:00 <span class="loc-night">Night</span></span>
              <span class="loc-day">Thu</span><span class="loc-time">09:30 - 18:30</span>
              <span class="loc-day">Fri</span><span class="loc-time">09:30 - 18:30</span>
              <span class="loc-day loc-off">Sat</span><span class="loc-time loc-off">Closed</span>
              <span class="loc-day loc-off">Sun</span><span class="loc-time loc-off">Closed</span>
            </div>
            <span class="loc-detail" style="margin-top:12px;display:block;">점심시간 13:00-14:00 / 마감 1시간 전 접수 마감</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- DIRECTIONS -->
<section class="page-section bg-dark">
  <div class="page-inner">
    <div class="sec-label">Directions</div>
    <h2 class="sec-title rv" style="margin-bottom:60px;">교통편 <em>안내</em></h2>
    <div class="dir-grid">
      <div class="dir-card rv">
        <div class="dir-icon"><i class="fas fa-subway"></i></div>
        <h4>지하철</h4>
        <p><strong>1·2호선 시청역</strong> 4·5번 출구 도보 5분</p>
        <p><strong>4호선 명동역</strong> 3번 출구 도보 8분</p>
        <p><strong>2호선 을지로입구역</strong> 1번 출구 도보 7분</p>
        <p><strong>4호선 회현역</strong> 남대문시장 방향 도보 6분</p>
        <p><strong>5호선 광화문역</strong> 6번 출구 도보 10분</p>
        <p><strong>3·4호선 충무로역</strong> 도보 10분</p>
        <p><strong>1호선 서울역</strong> 도보 12분 (1정거장)</p>
      </div>
      <div class="dir-card rv rv-d1">
        <div class="dir-icon"><i class="fas fa-bus"></i></div>
        <h4>버스</h4>
        <p><strong>남대문시장 정류장</strong> 하차<br>간선: 402, 405, 501, 507<br>지선: 7017, 7021</p>
      </div>
      <div class="dir-card rv rv-d2">
        <div class="dir-icon"><i class="fas fa-car"></i></div>
        <h4>자가용</h4>
        <p><strong>효덕빌딩 주변 유료 주차장</strong> 이용<br>주차 공간이 제한적이오니<br>대중교통 이용을 권장합니다.</p>
      </div>
    </div>
  </div>
</section>

<!-- CLINIC INFO -->
<section class="page-section bg-black">
  <div class="page-inner" style="text-align:center;">
    <div class="sec-label" style="justify-content:center;">Clinic Info</div>
    <h2 class="sec-title rv" style="margin-bottom:40px;">병원 <em>정보</em></h2>
    <div class="clinic-info-row rv rv-d1">
      <div class="clinic-info-item">
        <span class="clinic-info-label">병원명</span>
        <span class="clinic-info-value">행복한예인치과의원</span>
      </div>
      <div class="clinic-info-item">
        <span class="clinic-info-label">대표자</span>
        <span class="clinic-info-value">한승대</span>
      </div>
      <div class="clinic-info-item">
        <span class="clinic-info-label">사업자등록번호</span>
        <span class="clinic-info-value">104-91-44744</span>
      </div>
      <div class="clinic-info-item">
        <span class="clinic-info-label">전화</span>
        <span class="clinic-info-value"><a href="tel:02-756-2828" style="color:var(--gold);">02-756-2828</a></span>
      </div>
      <div class="clinic-info-item">
        <span class="clinic-info-label">팩스</span>
        <span class="clinic-info-value">02-754-8188</span>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq sec-pad">
  <div class="sec-inner">
    <div class="sec-label">FAQ</div>
    <h2 class="sec-title rv">찾아오시는 길 <em>질문</em></h2>
    <div class="faq-list">
      ${locFaq.map(f => `
      <div class="faq-item rv">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');">
          <h4>${f.q}</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join('')}
    </div>
  </div>
</section>

${footer()}
${scripts()}`;
}
