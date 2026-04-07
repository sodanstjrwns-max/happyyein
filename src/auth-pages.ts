// 회원가입 / 로그인 페이지
import { head, nav, footer, scripts } from './layout'

// ==========================================
// 공통 AUTH CSS
// ==========================================
const authCSS = `
/* AUTH FORM */
.auth-wrap{max-width:520px;margin:0 auto;}
.auth-form{background:var(--dark-card);border:1px solid rgba(255,255,255,0.06);border-radius:24px;padding:clamp(32px,5vw,48px);}
.auth-form h2{font-family:var(--font-kr);font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:900;letter-spacing:-1px;margin-bottom:8px;text-align:center;}
.auth-form h2 em{font-style:normal;color:var(--gold);}
.auth-subtitle{font-family:var(--font-kr);font-size:0.88rem;color:var(--gray);font-weight:300;text-align:center;margin-bottom:40px;line-height:1.8;}

/* FORM FIELDS */
.auth-field{margin-bottom:20px;position:relative;}
.auth-label{display:block;font-family:var(--font-kr);font-size:0.78rem;font-weight:500;color:var(--gray-light);margin-bottom:8px;}
.auth-label .required{color:#FF6B6B;margin-left:2px;}
.auth-input{width:100%;padding:14px 16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:var(--white);font-family:var(--font-kr);font-size:0.92rem;transition:all 0.3s;outline:none;}
.auth-input:focus{border-color:var(--gold);background:rgba(247,186,24,0.03);}
.auth-input::placeholder{color:var(--gray);font-weight:300;}
.auth-input.error{border-color:#FF6B6B;}
.auth-input-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.auth-error{font-family:var(--font-kr);font-size:0.72rem;color:#FF6B6B;margin-top:6px;display:none;}
.auth-error.show{display:block;}
.email-check{position:absolute;right:14px;top:38px;font-size:0.85rem;display:none;}
.email-check.ok{display:block;color:#03C75A;}
.email-check.no{display:block;color:#FF6B6B;}

/* PASSWORD STRENGTH */
.pw-strength{display:flex;gap:4px;margin-top:8px;}
.pw-bar{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,0.08);transition:background 0.3s;}
.pw-bar.weak{background:#FF6B6B;}
.pw-bar.medium{background:#F7BA18;}
.pw-bar.strong{background:#03C75A;}
.pw-text{font-family:var(--font-kr);font-size:0.68rem;color:var(--gray);margin-top:4px;}

/* DIVIDER */
.auth-divider{display:flex;align-items:center;gap:16px;margin:32px 0;}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.06);}
.auth-divider span{font-family:var(--font-kr);font-size:0.75rem;color:var(--gray);font-weight:300;}

/* CONSENT SECTION */
.consent-section{margin-top:32px;padding-top:28px;border-top:1px solid rgba(255,255,255,0.06);}
.consent-title{font-family:var(--font-kr);font-size:0.88rem;font-weight:600;color:var(--white);margin-bottom:4px;}
.consent-desc{font-family:var(--font-kr);font-size:0.72rem;color:var(--gray);margin-bottom:16px;font-weight:300;}

/* ALL AGREE */
.consent-all{display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.15);border-radius:14px;margin-bottom:16px;cursor:pointer;transition:all 0.3s;}
.consent-all:hover{border-color:rgba(247,186,24,0.3);background:rgba(247,186,24,0.06);}
.consent-all input[type=checkbox]{display:none;}
.consent-all .cbox{width:22px;height:22px;border-radius:6px;border:2px solid rgba(247,186,24,0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;color:transparent;font-size:0.7rem;}
.consent-all input:checked+.cbox{background:var(--gold);border-color:var(--gold);color:var(--black);}
.consent-all .cbox-label{font-family:var(--font-kr);font-size:0.92rem;font-weight:600;color:var(--white);}

/* INDIVIDUAL CONSENT */
.consent-item{display:flex;align-items:flex-start;gap:12px;padding:12px 16px;border-radius:12px;cursor:pointer;transition:background 0.2s;margin-bottom:4px;}
.consent-item:hover{background:rgba(255,255,255,0.02);}
.consent-item input[type=checkbox]{display:none;}
.consent-item .cbox{width:20px;height:20px;border-radius:5px;border:1.5px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;color:transparent;font-size:0.65rem;margin-top:1px;}
.consent-item input:checked+.cbox{background:var(--gold);border-color:var(--gold);color:var(--black);}
.consent-item .ci-text{flex:1;}
.consent-item .ci-label{font-family:var(--font-kr);font-size:0.85rem;font-weight:400;color:var(--gray-light);display:flex;align-items:center;gap:8px;}
.consent-item .ci-label .badge{font-size:0.6rem;padding:2px 8px;border-radius:20px;font-weight:600;font-family:var(--font-display);text-transform:uppercase;letter-spacing:1px;}
.badge-required{background:rgba(255,107,107,0.15);color:#FF6B6B;}
.badge-optional{background:rgba(255,255,255,0.06);color:var(--gray);}
.consent-item .ci-view{font-family:var(--font-kr);font-size:0.7rem;color:var(--gold);cursor:pointer;text-decoration:underline;text-decoration-color:rgba(247,186,24,0.3);transition:all 0.2s;margin-top:4px;display:inline-block;}
.consent-item .ci-view:hover{text-decoration-color:var(--gold);}

/* CONSENT DETAIL MODAL */
.consent-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:10001;display:none;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);}
.consent-modal-overlay.show{display:flex;}
.consent-modal{background:var(--dark-card);border:1px solid rgba(255,255,255,0.1);border-radius:20px;max-width:640px;width:100%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;}
.consent-modal-header{display:flex;justify-content:space-between;align-items:center;padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);}
.consent-modal-header h3{font-family:var(--font-kr);font-size:1.1rem;font-weight:700;}
.consent-modal-close{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.06);border:none;color:var(--gray-light);cursor:pointer;font-size:0.9rem;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
.consent-modal-close:hover{background:rgba(255,255,255,0.1);color:var(--white);}
.consent-modal-body{padding:28px;overflow-y:auto;font-family:var(--font-kr);font-size:0.82rem;line-height:2;color:var(--gray-light);font-weight:300;}
.consent-modal-body h4{font-size:0.92rem;font-weight:600;color:var(--white);margin:20px 0 8px;}
.consent-modal-body h4:first-child{margin-top:0;}
.consent-modal-body table{width:100%;border-collapse:collapse;margin:12px 0;}
.consent-modal-body th,.consent-modal-body td{padding:10px 12px;border:1px solid rgba(255,255,255,0.06);font-size:0.78rem;text-align:left;}
.consent-modal-body th{background:rgba(247,186,24,0.04);color:var(--gold);font-weight:600;}

/* SUBMIT BTN */
.auth-submit{width:100%;padding:18px;border:none;border-radius:14px;background:var(--gold);color:var(--black);font-family:var(--font-kr);font-size:1rem;font-weight:700;cursor:pointer;transition:all 0.3s;margin-top:32px;}
.auth-submit:hover{background:var(--gold-deep);transform:translateY(-2px);box-shadow:0 12px 40px rgba(247,186,24,0.3);}
.auth-submit:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none;}

/* AUTH LINK */
.auth-link{text-align:center;margin-top:24px;font-family:var(--font-kr);font-size:0.82rem;color:var(--gray);font-weight:300;}
.auth-link a{color:var(--gold);font-weight:500;transition:opacity 0.2s;}
.auth-link a:hover{opacity:0.8;}

/* GLOBAL ERROR */
.auth-global-error{padding:14px 16px;background:rgba(255,107,107,0.08);border:1px solid rgba(255,107,107,0.2);border-radius:12px;font-family:var(--font-kr);font-size:0.82rem;color:#FF6B6B;margin-bottom:20px;display:none;align-items:center;gap:10px;}
.auth-global-error.show{display:flex;}

/* RESPONSIVE */
@media(max-width:768px){
  .auth-form{padding:28px 20px;border-radius:20px;}
  .auth-form h2{font-size:clamp(1.3rem,4vw,1.6rem);}
  .auth-input-row{grid-template-columns:1fr;}
  .consent-modal{max-height:85vh;border-radius:16px;}
  .consent-modal-header{padding:20px 22px;}
  .consent-modal-body{padding:22px;}
}
`;

// ==========================================
// 개인정보 수집·이용 동의서 본문
// ==========================================
const PRIVACY_COLLECTION_TEXT = `
<h4>제1조 (개인정보의 수집 항목)</h4>
<p>행복한예인치과의원(이하 "병원")은 회원가입 및 서비스 제공을 위해 다음의 개인정보를 수집합니다.</p>
<table>
  <tr><th>구분</th><th>수집 항목</th><th>수집 방법</th></tr>
  <tr><td>필수</td><td>이메일, 비밀번호, 이름</td><td>회원가입 시 직접 입력</td></tr>
  <tr><td>선택</td><td>전화번호, 생년월일, 성별</td><td>회원가입 시 직접 입력</td></tr>
  <tr><td>자동 수집</td><td>IP 주소, 브라우저 정보, 접속 일시</td><td>서비스 이용 시 자동 생성</td></tr>
</table>

<h4>제2조 (수집·이용 목적)</h4>
<p>수집된 개인정보는 다음의 목적으로 이용됩니다.</p>
<p>① 회원 식별 및 본인 확인<br>
② 진료 예약 및 상담 서비스 제공<br>
③ 서비스 이용 관련 공지사항 전달<br>
④ 서비스 개선 및 통계 분석 (비식별 처리 후)</p>

<h4>제3조 (보유 및 이용 기간)</h4>
<p>회원 탈퇴 시 즉시 파기합니다. 단, 관계 법령에 의해 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.</p>
<table>
  <tr><th>보관 항목</th><th>근거 법령</th><th>보관 기간</th></tr>
  <tr><td>계약 또는 청약철회 기록</td><td>전자상거래법</td><td>5년</td></tr>
  <tr><td>소비자 불만 또는 분쟁처리 기록</td><td>전자상거래법</td><td>3년</td></tr>
  <tr><td>진료 기록</td><td>의료법</td><td>10년</td></tr>
</table>

<h4>제4조 (동의 거부권 및 불이익)</h4>
<p>귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 다만, 필수 항목에 대한 동의를 거부할 경우 회원가입 및 서비스 이용이 제한됩니다.</p>
`;

const PRIVACY_PROVISION_TEXT = `
<h4>제1조 (제공 대상)</h4>
<p>행복한예인치과의원은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우에 한하여 제공할 수 있습니다.</p>

<h4>제2조 (제공 항목 및 목적)</h4>
<table>
  <tr><th>제공받는 자</th><th>제공 항목</th><th>제공 목적</th><th>보유 기간</th></tr>
  <tr><td>건강보험심사평가원</td><td>진료 관련 정보</td><td>보험 청구</td><td>법정 보존 기간</td></tr>
  <tr><td>국세청</td><td>진료비 정보</td><td>의료비 소득공제</td><td>5년</td></tr>
</table>
<p>상기 외 법령에 의하거나 수사기관의 적법한 요청이 있는 경우에 한하여 제공됩니다.</p>

<h4>제3조 (동의 거부권 및 불이익)</h4>
<p>귀하는 개인정보 제3자 제공에 대한 동의를 거부할 권리가 있습니다. 다만, 필수 동의를 거부할 경우 회원가입이 제한됩니다.</p>
`;

const MARKETING_TEXT = `
<h4>마케팅 정보 수신 동의 안내</h4>
<p>행복한예인치과의원은 다음의 목적으로 마케팅 정보를 발송합니다.</p>

<table>
  <tr><th>수신 채널</th><th>발송 내용</th><th>발송 빈도</th></tr>
  <tr><td>SMS/문자</td><td>진료 안내, 이벤트, 건강 정보</td><td>월 1~2회 이내</td></tr>
  <tr><td>이메일</td><td>뉴스레터, 건강 칼럼, 이벤트 안내</td><td>월 2회 이내</td></tr>
  <tr><td>앱 푸시</td><td>예약 알림, 이벤트 알림</td><td>수시</td></tr>
</table>

<h4>수신 동의 변경</h4>
<p>마케팅 정보 수신에 동의하신 후에도 언제든지 수신 거부 또는 동의 철회를 하실 수 있습니다. 수신 거부는 마이페이지 또는 수신된 메시지 내 링크를 통해 가능합니다.</p>

<p><strong>※ 마케팅 정보 수신 동의는 선택 사항이며, 동의하지 않으셔도 회원가입 및 서비스 이용에 제한이 없습니다.</strong></p>
`;

// ==========================================
// 회원가입 페이지
// ==========================================
export function registerPage(): string {
  return `${head({ title: '회원가입', description: '행복한예인치과 회원가입 - 진료 예약과 건강 정보를 받아보세요.', path: '/register', noindex: true })}
${nav()}

<style>${authCSS}</style>

<section class="page-section bg-black" style="padding-top:140px;padding-bottom:80px;">
  <div class="page-inner">
    <div class="auth-wrap">
      <div class="auth-form">
        <h2><em>회원</em>가입</h2>
        <p class="auth-subtitle">행복한예인치과의 소식과 건강 정보를 받아보세요.</p>

        <div class="auth-global-error" id="globalError">
          <i class="fas fa-exclamation-circle"></i>
          <span id="globalErrorText"></span>
        </div>

        <!-- 기본 정보 -->
        <div class="auth-field">
          <label class="auth-label">이메일 <span class="required">*</span></label>
          <input type="email" id="regEmail" class="auth-input" placeholder="example@email.com" autocomplete="email">
          <span class="email-check" id="emailCheck"></span>
          <div class="auth-error" id="emailError"></div>
        </div>

        <div class="auth-field">
          <label class="auth-label">비밀번호 <span class="required">*</span></label>
          <input type="password" id="regPassword" class="auth-input" placeholder="영문 + 숫자 포함 8자 이상" autocomplete="new-password">
          <div class="pw-strength" id="pwStrength" style="display:none;">
            <div class="pw-bar" id="pwBar1"></div>
            <div class="pw-bar" id="pwBar2"></div>
            <div class="pw-bar" id="pwBar3"></div>
          </div>
          <div class="pw-text" id="pwText"></div>
          <div class="auth-error" id="pwError"></div>
        </div>

        <div class="auth-field">
          <label class="auth-label">비밀번호 확인 <span class="required">*</span></label>
          <input type="password" id="regPasswordConfirm" class="auth-input" placeholder="비밀번호를 다시 입력하세요" autocomplete="new-password">
          <div class="auth-error" id="pwConfirmError"></div>
        </div>

        <div class="auth-field">
          <label class="auth-label">이름 <span class="required">*</span></label>
          <input type="text" id="regName" class="auth-input" placeholder="실명을 입력하세요" autocomplete="name">
        </div>

        <div class="auth-field">
          <label class="auth-label">전화번호 <span style="font-size:0.68rem;color:var(--gray);font-weight:300;">(선택)</span></label>
          <input type="tel" id="regPhone" class="auth-input" placeholder="010-0000-0000" autocomplete="tel">
        </div>

        <div class="auth-input-row">
          <div class="auth-field">
            <label class="auth-label">생년월일 <span style="font-size:0.68rem;color:var(--gray);font-weight:300;">(선택)</span></label>
            <input type="date" id="regBirth" class="auth-input">
          </div>
          <div class="auth-field">
            <label class="auth-label">성별 <span style="font-size:0.68rem;color:var(--gray);font-weight:300;">(선택)</span></label>
            <select id="regGender" class="auth-input">
              <option value="">선택 안 함</option>
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
          </div>
        </div>

        <!-- 약관 동의 -->
        <div class="consent-section">
          <div class="consent-title">약관 동의</div>
          <div class="consent-desc">서비스 이용을 위해 아래 약관에 동의해주세요.</div>

          <label class="consent-all" id="consentAll">
            <input type="checkbox" id="checkAll">
            <span class="cbox"><i class="fas fa-check"></i></span>
            <span class="cbox-label">전체 동의합니다</span>
          </label>

          <label class="consent-item">
            <input type="checkbox" id="checkPrivacy" class="consent-check required-consent">
            <span class="cbox"><i class="fas fa-check"></i></span>
            <div class="ci-text">
              <div class="ci-label">개인정보 수집·이용 동의 <span class="badge badge-required">필수</span></div>
              <span class="ci-view" onclick="event.preventDefault();showConsent('privacy_collection')">전문 보기</span>
            </div>
          </label>

          <label class="consent-item">
            <input type="checkbox" id="checkProvision" class="consent-check required-consent">
            <span class="cbox"><i class="fas fa-check"></i></span>
            <div class="ci-text">
              <div class="ci-label">개인정보 제3자 제공 동의 <span class="badge badge-required">필수</span></div>
              <span class="ci-view" onclick="event.preventDefault();showConsent('privacy_provision')">전문 보기</span>
            </div>
          </label>

          <label class="consent-item">
            <input type="checkbox" id="checkMarketingSms" class="consent-check marketing-consent">
            <span class="cbox"><i class="fas fa-check"></i></span>
            <div class="ci-text">
              <div class="ci-label">SMS/문자 수신 동의 <span class="badge badge-optional">선택</span></div>
            </div>
          </label>

          <label class="consent-item">
            <input type="checkbox" id="checkMarketingEmail" class="consent-check marketing-consent">
            <span class="cbox"><i class="fas fa-check"></i></span>
            <div class="ci-text">
              <div class="ci-label">이메일 수신 동의 <span class="badge badge-optional">선택</span></div>
            </div>
          </label>

          <label class="consent-item">
            <input type="checkbox" id="checkMarketingPush" class="consent-check marketing-consent">
            <span class="cbox"><i class="fas fa-check"></i></span>
            <div class="ci-text">
              <div class="ci-label">앱 푸시 알림 수신 동의 <span class="badge badge-optional">선택</span></div>
              <span class="ci-view" onclick="event.preventDefault();showConsent('marketing')">마케팅 수신 동의 전문 보기</span>
            </div>
          </label>
        </div>

        <button class="auth-submit" id="submitBtn" onclick="doRegister()">
          <i class="fas fa-user-plus"></i> 가입하기
        </button>

        <div class="auth-link">
          이미 회원이신가요? <a href="/login">로그인</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 동의서 모달 -->
<div class="consent-modal-overlay" id="consentModal">
  <div class="consent-modal">
    <div class="consent-modal-header">
      <h3 id="consentModalTitle">동의서</h3>
      <button class="consent-modal-close" onclick="closeConsent()"><i class="fas fa-times"></i></button>
    </div>
    <div class="consent-modal-body" id="consentModalBody"></div>
  </div>
</div>

${footer()}

<script>
// ===== 동의서 모달 =====
const CONSENT_TEXTS = {
  privacy_collection: { title: '개인정보 수집·이용 동의서', body: \`${PRIVACY_COLLECTION_TEXT.replace(/`/g, '\\`')}\` },
  privacy_provision: { title: '개인정보 제3자 제공 동의서', body: \`${PRIVACY_PROVISION_TEXT.replace(/`/g, '\\`')}\` },
  marketing: { title: '마케팅 정보 수신 동의', body: \`${MARKETING_TEXT.replace(/`/g, '\\`')}\` },
};

function showConsent(type) {
  const c = CONSENT_TEXTS[type];
  if (!c) return;
  document.getElementById('consentModalTitle').textContent = c.title;
  document.getElementById('consentModalBody').innerHTML = c.body;
  document.getElementById('consentModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeConsent() {
  document.getElementById('consentModal').classList.remove('show');
  document.body.style.overflow = '';
}
document.getElementById('consentModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeConsent();
});

// ===== 전체 동의 =====
document.getElementById('checkAll').addEventListener('change', function() {
  document.querySelectorAll('.consent-check').forEach(cb => cb.checked = this.checked);
});
document.querySelectorAll('.consent-check').forEach(cb => {
  cb.addEventListener('change', () => {
    const all = document.querySelectorAll('.consent-check');
    document.getElementById('checkAll').checked = [...all].every(c => c.checked);
  });
});

// ===== 이메일 중복 확인 =====
let emailTimer;
document.getElementById('regEmail').addEventListener('input', function() {
  clearTimeout(emailTimer);
  const el = document.getElementById('emailCheck');
  el.className = 'email-check';
  el.style.display = 'none';
  if (!this.value || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(this.value)) return;
  emailTimer = setTimeout(async () => {
    try {
      const res = await fetch('/api/user/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.value })
      });
      const data = await res.json();
      el.style.display = 'block';
      if (data.available) {
        el.className = 'email-check ok';
        el.innerHTML = '<i class="fas fa-check-circle"></i>';
      } else {
        el.className = 'email-check no';
        el.innerHTML = '<i class="fas fa-times-circle"></i>';
      }
    } catch {}
  }, 500);
});

// ===== 비밀번호 강도 =====
document.getElementById('regPassword').addEventListener('input', function() {
  const pw = this.value;
  const bars = [document.getElementById('pwBar1'), document.getElementById('pwBar2'), document.getElementById('pwBar3')];
  const strengthEl = document.getElementById('pwStrength');
  const textEl = document.getElementById('pwText');
  
  if (!pw) { strengthEl.style.display = 'none'; textEl.textContent = ''; return; }
  strengthEl.style.display = 'flex';

  let score = 0;
  if (pw.length >= 8) score++;
  if (/(?=.*[a-zA-Z])(?=.*\\d)/.test(pw)) score++;
  if (/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(pw) && pw.length >= 10) score++;

  bars.forEach((b, i) => {
    b.className = 'pw-bar';
    if (i < score) b.classList.add(score === 1 ? 'weak' : score === 2 ? 'medium' : 'strong');
  });
  textEl.textContent = score === 0 ? '매우 약함' : score === 1 ? '약함' : score === 2 ? '보통' : '강함';
});

// ===== 회원가입 =====
async function doRegister() {
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const passwordConfirm = document.getElementById('regPasswordConfirm').value;
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const birthDate = document.getElementById('regBirth').value;
  const gender = document.getElementById('regGender').value;
  const errEl = document.getElementById('globalError');
  const errText = document.getElementById('globalErrorText');

  // 유효성 검사
  errEl.classList.remove('show');
  if (!email || !password || !name) {
    errText.textContent = '이메일, 비밀번호, 이름은 필수입니다.'; errEl.classList.add('show'); return;
  }
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    errText.textContent = '올바른 이메일 형식이 아닙니다.'; errEl.classList.add('show'); return;
  }
  if (password.length < 8) {
    errText.textContent = '비밀번호는 8자 이상이어야 합니다.'; errEl.classList.add('show'); return;
  }
  if (!/(?=.*[a-zA-Z])(?=.*\\d)/.test(password)) {
    errText.textContent = '비밀번호는 영문과 숫자를 포함해야 합니다.'; errEl.classList.add('show'); return;
  }
  if (password !== passwordConfirm) {
    errText.textContent = '비밀번호가 일치하지 않습니다.'; errEl.classList.add('show'); return;
  }
  if (!document.getElementById('checkPrivacy').checked) {
    errText.textContent = '개인정보 수집·이용 동의는 필수입니다.'; errEl.classList.add('show'); return;
  }
  if (!document.getElementById('checkProvision').checked) {
    errText.textContent = '개인정보 제3자 제공 동의는 필수입니다.'; errEl.classList.add('show'); return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 가입 중...';

  try {
    const res = await fetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, password, name, phone: phone || undefined,
        birth_date: birthDate || undefined,
        gender: gender || undefined,
        consents: {
          privacy_collection: document.getElementById('checkPrivacy').checked,
          privacy_provision: document.getElementById('checkProvision').checked,
          marketing_sms: document.getElementById('checkMarketingSms').checked,
          marketing_email: document.getElementById('checkMarketingEmail').checked,
          marketing_push: document.getElementById('checkMarketingPush').checked,
        }
      })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('user_token', data.token);
      localStorage.setItem('user_name', data.user.name);
      localStorage.setItem('user_email', data.user.email);
      alert('회원가입이 완료되었습니다!');
      location.href = '/';
    } else {
      errText.textContent = data.error || '회원가입에 실패했습니다.';
      errEl.classList.add('show');
    }
  } catch (err) {
    errText.textContent = '서버 오류가 발생했습니다.';
    errEl.classList.add('show');
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-user-plus"></i> 가입하기';
}
</script>
${scripts()}`;
}


// ==========================================
// 로그인 페이지
// ==========================================
export function loginPage(): string {
  return `${head({ title: '로그인', description: '행복한예인치과 로그인', path: '/login', noindex: true })}
${nav()}

<style>${authCSS}</style>

<section class="page-section bg-black" style="padding-top:140px;padding-bottom:80px;">
  <div class="page-inner">
    <div class="auth-wrap">
      <div class="auth-form">
        <h2><em>로그</em>인</h2>
        <p class="auth-subtitle">행복한예인치과에 오신 것을 환영합니다.</p>

        <div class="auth-global-error" id="globalError">
          <i class="fas fa-exclamation-circle"></i>
          <span id="globalErrorText"></span>
        </div>

        <div class="auth-field">
          <label class="auth-label">이메일</label>
          <input type="email" id="loginEmail" class="auth-input" placeholder="example@email.com" autocomplete="email">
        </div>

        <div class="auth-field">
          <label class="auth-label">비밀번호</label>
          <input type="password" id="loginPassword" class="auth-input" placeholder="비밀번호를 입력하세요" autocomplete="current-password">
        </div>

        <button class="auth-submit" id="submitBtn" onclick="doLogin()">
          <i class="fas fa-sign-in-alt"></i> 로그인
        </button>

        <div class="auth-link">
          아직 회원이 아니신가요? <a href="/register">회원가입</a>
        </div>
      </div>
    </div>
  </div>
</section>

${footer()}

<script>
// 이미 로그인 되어 있으면 리다이렉트
if (localStorage.getItem('user_token')) {
  // 토큰 유효성 확인
  fetch('/api/user/verify', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
  }).then(r => r.json()).then(d => {
    if (d.valid) location.href = '/';
  });
}

// Enter 키 로그인
document.getElementById('loginPassword').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doLogin();
});
document.getElementById('loginEmail').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('loginPassword').focus();
});

async function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('globalError');
  const errText = document.getElementById('globalErrorText');
  errEl.classList.remove('show');

  if (!email || !password) {
    errText.textContent = '이메일과 비밀번호를 입력하세요.';
    errEl.classList.add('show');
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 로그인 중...';

  try {
    const res = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('user_token', data.token);
      localStorage.setItem('user_name', data.user.name);
      localStorage.setItem('user_email', data.user.email);
      location.href = '/';
    } else {
      errText.textContent = data.error || '로그인에 실패했습니다.';
      errEl.classList.add('show');
    }
  } catch (err) {
    errText.textContent = '서버 오류가 발생했습니다.';
    errEl.classList.add('show');
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> 로그인';
}
</script>
${scripts()}`;
}
