// 관리자 페이지 — 로그인, 대시보드, 게시판 관리
// 프리미엄 블랙&골드 어드민 디자인

const adminCSS = `
/* ===== ADMIN GLOBAL ===== */
.admin-body{min-height:100vh;background:#0A0A0A;color:#F5F2ED;font-family:'Noto Sans KR','DM Sans',sans-serif;overflow-x:hidden;}

/* ===== LOGIN PAGE ===== */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.login-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 20%,rgba(247,186,24,0.06),transparent 50%),radial-gradient(ellipse at 70% 80%,rgba(247,186,24,0.04),transparent 50%);pointer-events:none;}
.login-card{position:relative;width:100%;max-width:440px;padding:56px 48px;background:rgba(22,22,22,0.9);backdrop-filter:blur(40px);border:1px solid rgba(247,186,24,0.1);border-radius:28px;box-shadow:0 40px 100px rgba(0,0,0,0.4);}
.login-logo{text-align:center;margin-bottom:40px;}
.login-logo h1{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;text-transform:uppercase;letter-spacing:5px;color:#F5F2ED;}
.login-logo h1 em{color:#F7BA18;font-style:normal;}
.login-logo p{font-family:'Syne',sans-serif;font-size:0.6rem;text-transform:uppercase;letter-spacing:6px;color:#888;margin-top:8px;font-weight:600;}
.login-divider{width:40px;height:1px;background:#F7BA18;margin:0 auto 40px;}
.login-field{margin-bottom:24px;position:relative;}
.login-field label{display:block;font-family:'Syne',sans-serif;font-size:0.6rem;text-transform:uppercase;letter-spacing:4px;color:#F7BA18;font-weight:600;margin-bottom:10px;}
.login-field input{width:100%;padding:16px 20px 16px 48px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;color:#F5F2ED;font-size:1rem;font-family:'Space Grotesk',monospace;letter-spacing:4px;transition:all 0.3s;outline:none;}
.login-field input:focus{border-color:#F7BA18;background:rgba(247,186,24,0.04);}
.login-field input::placeholder{color:#555;letter-spacing:2px;font-size:0.88rem;}
.login-field .field-icon{position:absolute;left:18px;bottom:17px;color:#888;font-size:0.95rem;transition:color 0.3s;}
.login-field input:focus ~ .field-icon{color:#F7BA18;}
.login-btn{width:100%;padding:18px;background:#F7BA18;color:#0A0A0A;border:none;border-radius:14px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:4px;cursor:pointer;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);margin-top:8px;}
.login-btn:hover{background:#D4A010;transform:translateY(-2px);box-shadow:0 20px 50px rgba(247,186,24,0.3);}
.login-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none;}
.login-error{background:rgba(255,50,50,0.08);border:1px solid rgba(255,50,50,0.2);border-radius:12px;padding:14px 20px;margin-bottom:20px;font-size:0.85rem;color:rgba(255,120,120,0.9);display:none;align-items:center;gap:10px;}
.login-error i{font-size:0.9rem;}
.login-footer{text-align:center;margin-top:32px;font-size:0.72rem;color:#555;font-family:'Space Grotesk',monospace;letter-spacing:1px;}

/* ===== ADMIN LAYOUT ===== */
.admin-sidebar{position:fixed;left:0;top:0;bottom:0;width:260px;background:rgba(16,16,16,0.98);border-right:1px solid rgba(247,186,24,0.06);padding:32px 0;display:flex;flex-direction:column;z-index:100;transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);}
.admin-sidebar-brand{padding:0 28px;margin-bottom:40px;}
.admin-sidebar-brand h2{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:4px;color:#F5F2ED;}
.admin-sidebar-brand h2 em{color:#F7BA18;font-style:normal;}
.admin-sidebar-brand span{display:block;font-family:'Syne',sans-serif;font-size:0.5rem;text-transform:uppercase;letter-spacing:5px;color:#555;margin-top:6px;font-weight:600;}
.admin-nav{flex:1;display:flex;flex-direction:column;gap:4px;padding:0 12px;}
.admin-nav-item{display:flex;align-items:center;gap:14px;padding:14px 20px;border-radius:12px;font-family:'Noto Sans KR',sans-serif;font-size:0.88rem;font-weight:400;color:#888;transition:all 0.3s;cursor:pointer;text-decoration:none;position:relative;}
.admin-nav-item:hover{color:#F5F2ED;background:rgba(247,186,24,0.04);}
.admin-nav-item.active{color:#F7BA18;background:rgba(247,186,24,0.08);font-weight:500;}
.admin-nav-item.active::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:24px;background:#F7BA18;border-radius:0 3px 3px 0;}
.admin-nav-item i{width:20px;text-align:center;font-size:0.9rem;}
.admin-nav-badge{margin-left:auto;background:#F7BA18;color:#0A0A0A;font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:6px;font-family:'Space Grotesk',monospace;}
.admin-nav-divider{height:1px;background:rgba(255,255,255,0.04);margin:12px 20px;}
.admin-sidebar-footer{padding:20px 28px;border-top:1px solid rgba(255,255,255,0.04);}
.admin-logout-btn{display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:12px;background:rgba(255,50,50,0.06);border:1px solid rgba(255,50,50,0.1);color:rgba(255,120,120,0.8);font-size:0.82rem;font-weight:500;cursor:pointer;transition:all 0.3s;width:100%;font-family:'Noto Sans KR',sans-serif;}
.admin-logout-btn:hover{background:rgba(255,50,50,0.12);border-color:rgba(255,50,50,0.2);color:rgba(255,120,120,1);}

.admin-main{margin-left:260px;min-height:100vh;padding:40px;}
.admin-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:40px;}
.admin-header h1{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;}
.admin-header h1 em{color:#F7BA18;font-style:normal;}
.admin-header-actions{display:flex;gap:12px;align-items:center;}
.admin-header-time{font-family:'Space Grotesk',monospace;font-size:0.78rem;color:#888;letter-spacing:1px;}
.admin-site-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:#F7BA18;font-family:'Syne',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;font-weight:600;transition:all 0.3s;text-decoration:none;cursor:pointer;}
.admin-site-btn:hover{background:rgba(247,186,24,0.15);border-color:#F7BA18;}

/* ===== STAT CARDS ===== */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:40px;}
.stat-card{background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:28px;position:relative;overflow:hidden;transition:all 0.5s;}
.stat-card:hover{border-color:rgba(247,186,24,0.15);transform:translateY(-2px);}
.stat-card::before{content:'';position:absolute;top:0;right:0;width:80px;height:80px;background:radial-gradient(circle,rgba(247,186,24,0.06),transparent 70%);border-radius:50%;transform:translate(20px,-20px);}
.stat-card-icon{width:44px;height:44px;border-radius:12px;background:rgba(247,186,24,0.1);display:flex;align-items:center;justify-content:center;color:#F7BA18;font-size:1rem;margin-bottom:16px;}
.stat-card-num{font-family:'Bebas Neue',sans-serif;font-size:2.4rem;color:#F5F2ED;line-height:1;letter-spacing:2px;}
.stat-card-label{font-family:'Syne',sans-serif;font-size:0.6rem;text-transform:uppercase;letter-spacing:3px;color:#888;margin-top:8px;font-weight:500;}

/* ===== SECTION PANELS ===== */
.admin-panel{background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:32px;margin-bottom:28px;}
.admin-panel-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;}
.admin-panel-title{font-family:'Syne',sans-serif;font-size:0.9rem;font-weight:700;text-transform:uppercase;letter-spacing:3px;display:flex;align-items:center;gap:12px;}
.admin-panel-title i{color:#F7BA18;font-size:0.85rem;}

/* ===== RECENT POSTS TABLE ===== */
.admin-table{width:100%;border-collapse:collapse;}
.admin-table th{font-family:'Syne',sans-serif;font-size:0.6rem;text-transform:uppercase;letter-spacing:3px;color:#F7BA18;padding:12px 16px;border-bottom:1px solid rgba(247,186,24,0.15);text-align:left;font-weight:600;}
.admin-table td{padding:16px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.88rem;color:#B5B0A8;vertical-align:middle;}
.admin-table tbody tr{transition:all 0.2s;}
.admin-table tbody tr:hover{background:rgba(247,186,24,0.03);}
.admin-table .td-title{color:#F5F2ED;font-weight:500;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.admin-table .td-badge{display:inline-block;padding:4px 12px;border-radius:6px;font-family:'Syne',sans-serif;font-size:0.6rem;text-transform:uppercase;letter-spacing:2px;font-weight:600;}
.admin-table .badge-ba{background:rgba(56,189,248,0.1);color:#38BDF8;border:1px solid rgba(56,189,248,0.2);}
.admin-table .badge-blog{background:rgba(74,222,128,0.1);color:#4ADE80;border:1px solid rgba(74,222,128,0.2);}
.admin-table .badge-notice{background:rgba(251,191,36,0.1);color:#FBBF24;border:1px solid rgba(251,191,36,0.2);}
.admin-table .td-date{font-family:'Space Grotesk',monospace;font-size:0.78rem;color:#888;letter-spacing:1px;white-space:nowrap;}
.admin-table .td-views{font-family:'Space Grotesk',monospace;font-size:0.82rem;text-align:center;}
.admin-table .td-actions{display:flex;gap:8px;}
.admin-table .td-actions button,.admin-table .td-actions a{width:32px;height:32px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#888;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s;font-size:0.75rem;text-decoration:none;}
.admin-table .td-actions .btn-edit:hover{border-color:#F7BA18;color:#F7BA18;background:rgba(247,186,24,0.08);}
.admin-table .td-actions .btn-del:hover{border-color:rgba(255,80,80,0.5);color:rgba(255,80,80,0.8);background:rgba(255,80,80,0.08);}
.admin-table .td-actions .btn-view:hover{border-color:rgba(56,189,248,0.5);color:#38BDF8;background:rgba(56,189,248,0.08);}

/* ACTION BUTTONS */
.admin-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:10px;font-family:'Syne',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;font-weight:700;cursor:pointer;border:none;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);text-decoration:none;}
.admin-btn-gold{background:#F7BA18;color:#0A0A0A;}
.admin-btn-gold:hover{background:#D4A010;transform:translateY(-2px);box-shadow:0 12px 32px rgba(247,186,24,0.25);}
.admin-btn-ghost{background:transparent;color:#888;border:1px solid rgba(255,255,255,0.1);}
.admin-btn-ghost:hover{border-color:#F7BA18;color:#F7BA18;}
.admin-btn-danger{background:transparent;color:rgba(255,100,100,0.7);border:1px solid rgba(255,50,50,0.15);}
.admin-btn-danger:hover{background:rgba(255,50,50,0.08);border-color:rgba(255,50,50,0.3);color:rgba(255,100,100,1);}

/* ===== BOARD MANAGEMENT TAB ===== */
.board-tabs{display:flex;gap:4px;margin-bottom:28px;background:rgba(255,255,255,0.03);border-radius:14px;padding:4px;}
.board-tab{flex:1;padding:12px 20px;border-radius:10px;font-family:'Syne',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;font-weight:600;color:#888;text-align:center;cursor:pointer;transition:all 0.3s;}
.board-tab:hover{color:#F5F2ED;}
.board-tab.active{background:#F7BA18;color:#0A0A0A;}

/* EMPTY STATE */
.admin-empty{text-align:center;padding:80px 24px;}
.admin-empty i{font-size:3rem;color:rgba(247,186,24,0.15);margin-bottom:20px;display:block;}
.admin-empty p{color:#555;font-size:0.92rem;font-weight:300;}

/* PAGINATION */
.admin-pagination{display:flex;justify-content:center;gap:6px;margin-top:24px;}
.admin-pagination button{width:36px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#888;font-family:'Space Grotesk',monospace;font-size:0.82rem;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;justify-content:center;}
.admin-pagination button:hover{border-color:#F7BA18;color:#F7BA18;}
.admin-pagination button.active{background:#F7BA18;color:#0A0A0A;border-color:#F7BA18;font-weight:700;}

/* CONFIRM MODAL */
.admin-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:1000;display:none;align-items:center;justify-content:center;}
.admin-modal-overlay.show{display:flex;}
.admin-modal{background:rgba(22,22,22,0.98);border:1px solid rgba(247,186,24,0.1);border-radius:24px;padding:40px;max-width:420px;width:90%;text-align:center;}
.admin-modal h3{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;}
.admin-modal p{font-size:0.88rem;color:#888;font-weight:300;line-height:1.8;margin-bottom:28px;}
.admin-modal-btns{display:flex;gap:12px;justify-content:center;}

/* MOBILE TOGGLE */
.admin-mobile-toggle{display:none;position:fixed;top:16px;left:16px;z-index:200;width:44px;height:44px;border-radius:12px;background:rgba(22,22,22,0.95);border:1px solid rgba(247,186,24,0.15);color:#F7BA18;font-size:1rem;cursor:pointer;align-items:center;justify-content:center;}

/* TOAST */
.admin-toast{position:fixed;top:24px;right:24px;z-index:2000;padding:16px 24px;border-radius:14px;font-size:0.88rem;font-weight:500;display:none;align-items:center;gap:10px;animation:toastIn 0.4s ease;}
.admin-toast.success{background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.2);color:#4ADE80;display:flex;}
.admin-toast.error{background:rgba(255,50,50,0.12);border:1px solid rgba(255,50,50,0.2);color:rgba(255,120,120,0.9);display:flex;}
@keyframes toastIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}

/* ===== RESPONSIVE ===== */
@media(max-width:1200px){.stat-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:768px){
  .admin-sidebar{transform:translateX(-100%);}
  .admin-sidebar.open{transform:translateX(0);}
  .admin-main{margin-left:0;padding:24px 16px;padding-top:72px;}
  .admin-mobile-toggle{display:flex;}
  .stat-grid{grid-template-columns:1fr;}
  .login-card{margin:16px;padding:40px 28px;}
  .admin-table{font-size:0.82rem;}
  .admin-table th:nth-child(4),.admin-table td:nth-child(4){display:none;}
  .board-tabs{flex-wrap:wrap;}
}
`;

// ==========================================
// 관리자 로그인 페이지
// ==========================================
export function adminLoginPage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin | 행복한예인치과</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/png" href="/static/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>${adminCSS}</style>
</head>
<body class="admin-body">

<div class="login-wrap">
  <div class="login-bg"></div>
  <div class="login-card">
    <div class="login-logo">
      <h1><em>Yein</em> Dental</h1>
      <p>Admin Console</p>
    </div>
    <div class="login-divider"></div>

    <div class="login-error" id="loginError">
      <i class="fas fa-exclamation-circle"></i>
      <span id="loginErrorText"></span>
    </div>

    <form id="loginForm" onsubmit="return handleLogin(event)">
      <div class="login-field">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Enter admin password" autocomplete="current-password" autofocus>
        <i class="fas fa-lock field-icon"></i>
      </div>
      <button type="submit" class="login-btn" id="loginBtn">
        <i class="fas fa-sign-in-alt"></i> Sign In
      </button>
    </form>

    <div class="login-footer">
      <a href="/" style="color:#888;text-decoration:none;transition:color 0.3s;" onmouseover="this.style.color='#F7BA18'" onmouseout="this.style.color='#888'">
        <i class="fas fa-arrow-left"></i> Back to Site
      </a>
    </div>
  </div>
</div>

<script>
// 이미 로그인된 경우 대시보드로 리디렉트
(function() {
  const token = localStorage.getItem('admin_token');
  if (token) {
    fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => r.json()).then(d => {
      if (d.valid) location.href = '/admin';
    }).catch(() => {});
  }
})();

async function handleLogin(e) {
  e.preventDefault();
  const pw = document.getElementById('password').value;
  const btn = document.getElementById('loginBtn');
  const errEl = document.getElementById('loginError');
  const errText = document.getElementById('loginErrorText');

  if (!pw) {
    errEl.style.display = 'flex';
    errText.textContent = '비밀번호를 입력하세요.';
    return false;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  errEl.style.display = 'none';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    const data = await res.json();
    if (data.success && data.token) {
      localStorage.setItem('admin_token', data.token);
      location.href = '/admin';
    } else {
      errEl.style.display = 'flex';
      errText.textContent = data.error || '로그인 실패';
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
    }
  } catch {
    errEl.style.display = 'flex';
    errText.textContent = '서버 연결 오류';
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
  }
  return false;
}
</script>
</body>
</html>`;
}


// ==========================================
// 관리자 대시보드 (대시보드 + 게시판 관리 통합)
// ==========================================
export function adminDashboardPage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard | Admin | 행복한예인치과</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/png" href="/static/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>${adminCSS}</style>
</head>
<body class="admin-body">

<!-- TOAST -->
<div class="admin-toast" id="adminToast"><i class="fas fa-check-circle"></i> <span id="toastText"></span></div>

<!-- CONFIRM MODAL -->
<div class="admin-modal-overlay" id="confirmModal">
  <div class="admin-modal">
    <h3 id="modalTitle">삭제 확인</h3>
    <p id="modalText">이 게시글을 삭제하시겠습니까?<br>삭제된 글은 복구할 수 없습니다.</p>
    <div class="admin-modal-btns">
      <button class="admin-btn admin-btn-ghost" onclick="closeModal()">취소</button>
      <button class="admin-btn admin-btn-danger" id="modalConfirmBtn" onclick="confirmAction()"><i class="fas fa-trash"></i> 삭제</button>
    </div>
  </div>
</div>

<!-- MOBILE TOGGLE -->
<button class="admin-mobile-toggle" id="mobileToggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>

<!-- SIDEBAR -->
<aside class="admin-sidebar" id="sidebar">
  <div class="admin-sidebar-brand">
    <h2><em>Yein</em> Dental</h2>
    <span>Admin Console</span>
  </div>
  <nav class="admin-nav">
    <a href="#" class="admin-nav-item active" onclick="showSection('dashboard');return false;">
      <i class="fas fa-chart-pie"></i> 대시보드
    </a>
    <div class="admin-nav-divider"></div>
    <a href="#" class="admin-nav-item" onclick="showSection('before-after');return false;">
      <i class="fas fa-images"></i> 비포 & 애프터
      <span class="admin-nav-badge" id="badge-ba">0</span>
    </a>
    <a href="#" class="admin-nav-item" onclick="showSection('blog');return false;">
      <i class="fas fa-pen-nib"></i> 블로그
      <span class="admin-nav-badge" id="badge-blog">0</span>
    </a>
    <a href="#" class="admin-nav-item" onclick="showSection('notice');return false;">
      <i class="fas fa-bullhorn"></i> 공지사항
      <span class="admin-nav-badge" id="badge-notice">0</span>
    </a>
    <div class="admin-nav-divider"></div>
    <a href="/" class="admin-nav-item" target="_blank">
      <i class="fas fa-external-link-alt"></i> 사이트 보기
    </a>
  </nav>
  <div class="admin-sidebar-footer">
    <button class="admin-logout-btn" onclick="doLogout()">
      <i class="fas fa-sign-out-alt"></i> 로그아웃
    </button>
  </div>
</aside>

<!-- MAIN CONTENT -->
<main class="admin-main">

  <!-- ===== DASHBOARD SECTION ===== -->
  <div id="section-dashboard">
    <div class="admin-header">
      <h1><em>Dashboard</em></h1>
      <div class="admin-header-actions">
        <span class="admin-header-time" id="currentTime"></span>
      </div>
    </div>

    <!-- STATS -->
    <div class="stat-grid" id="statGrid">
      <div class="stat-card">
        <div class="stat-card-icon"><i class="fas fa-file-alt"></i></div>
        <div class="stat-card-num" id="stat-total">0</div>
        <div class="stat-card-label">Total Posts</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon"><i class="fas fa-images"></i></div>
        <div class="stat-card-num" id="stat-ba">0</div>
        <div class="stat-card-label">Before & After</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon"><i class="fas fa-pen-nib"></i></div>
        <div class="stat-card-num" id="stat-blog">0</div>
        <div class="stat-card-label">Blog Posts</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon"><i class="fas fa-bullhorn"></i></div>
        <div class="stat-card-num" id="stat-notice">0</div>
        <div class="stat-card-label">Notices</div>
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div class="admin-panel">
      <div class="admin-panel-header">
        <div class="admin-panel-title"><i class="fas fa-bolt"></i> Quick Actions</div>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/before-after/write" class="admin-btn admin-btn-gold"><i class="fas fa-plus"></i> 비포&애프터 작성</a>
        <a href="/blog/write" class="admin-btn admin-btn-gold"><i class="fas fa-plus"></i> 블로그 작성</a>
        <a href="/notice/write" class="admin-btn admin-btn-gold"><i class="fas fa-plus"></i> 공지사항 작성</a>
      </div>
    </div>

    <!-- RECENT POSTS -->
    <div class="admin-panel">
      <div class="admin-panel-header">
        <div class="admin-panel-title"><i class="fas fa-clock"></i> Recent Posts</div>
        <span style="font-family:'Space Grotesk',monospace;font-size:0.72rem;color:#888;">최근 10개</span>
      </div>
      <div id="recentPosts">
        <div style="text-align:center;padding:40px;"><i class="fas fa-spinner fa-spin" style="font-size:1.5rem;color:rgba(247,186,24,0.3);"></i></div>
      </div>
    </div>
  </div>

  <!-- ===== BOARD MANAGEMENT SECTIONS ===== -->
  <div id="section-before-after" style="display:none;"></div>
  <div id="section-blog" style="display:none;"></div>
  <div id="section-notice" style="display:none;"></div>

</main>

<script>
// ===== AUTH CHECK =====
const TOKEN = localStorage.getItem('admin_token');
if (!TOKEN) location.href = '/admin/login';

async function checkAuth() {
  try {
    const res = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + TOKEN }
    });
    const data = await res.json();
    if (!data.valid) throw new Error('invalid');
  } catch {
    localStorage.removeItem('admin_token');
    location.href = '/admin/login';
  }
}
checkAuth();

// ===== HELPERS =====
function authHeaders() {
  return { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' };
}

function escHtml(s) { if (!s) return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function formatDate(d) { if (!d) return '-'; return d.substring(0, 10); }

function getBoardBadge(board) {
  const m = { 'before-after': ['B&A', 'badge-ba'], 'blog': ['Blog', 'badge-blog'], 'notice': ['Notice', 'badge-notice'] };
  const [label, cls] = m[board] || ['', ''];
  return '<span class="td-badge ' + cls + '">' + label + '</span>';
}

function showToast(msg, type) {
  const t = document.getElementById('adminToast');
  const txt = document.getElementById('toastText');
  txt.textContent = msg;
  t.className = 'admin-toast ' + type;
  setTimeout(() => { t.className = 'admin-toast'; }, 3000);
}

// ===== MODAL =====
let pendingAction = null;
function openModal(title, text, action) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').innerHTML = text;
  pendingAction = action;
  document.getElementById('confirmModal').classList.add('show');
}
function closeModal() { document.getElementById('confirmModal').classList.remove('show'); pendingAction = null; }
function confirmAction() { if (pendingAction) pendingAction(); closeModal(); }

// ===== SIDEBAR =====
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }

let currentSection = 'dashboard';
function showSection(section) {
  document.querySelectorAll('.admin-nav-item').forEach((el, i) => el.classList.remove('active'));
  const sectionMap = { 'dashboard': 0, 'before-after': 2, 'blog': 3, 'notice': 4 };
  const idx = sectionMap[section];
  if (idx !== undefined) document.querySelectorAll('.admin-nav-item')[idx].classList.add('active');

  document.querySelectorAll('[id^="section-"]').forEach(el => el.style.display = 'none');
  document.getElementById('section-' + section).style.display = 'block';
  currentSection = section;

  if (section !== 'dashboard') loadBoardManagement(section);
  document.getElementById('sidebar').classList.remove('open');
}

// ===== TIME =====
function updateTime() {
  const now = new Date();
  const str = now.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' +
    now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const el = document.getElementById('currentTime');
  if (el) el.textContent = str;
}
updateTime();
setInterval(updateTime, 60000);

// ===== LOAD STATS =====
async function loadStats() {
  const boards = ['before-after', 'blog', 'notice'];
  let total = 0;
  for (const board of boards) {
    try {
      const res = await fetch('/api/boards/' + board + '?limit=1');
      const data = await res.json();
      const count = data.pagination?.total || 0;
      total += count;
      if (board === 'before-after') {
        document.getElementById('stat-ba').textContent = count;
        document.getElementById('badge-ba').textContent = count;
      } else if (board === 'blog') {
        document.getElementById('stat-blog').textContent = count;
        document.getElementById('badge-blog').textContent = count;
      } else {
        document.getElementById('stat-notice').textContent = count;
        document.getElementById('badge-notice').textContent = count;
      }
    } catch {}
  }
  document.getElementById('stat-total').textContent = total;
}

// ===== LOAD RECENT POSTS =====
async function loadRecentPosts() {
  const container = document.getElementById('recentPosts');
  let allPosts = [];

  const boards = ['before-after', 'blog', 'notice'];
  for (const board of boards) {
    try {
      const res = await fetch('/api/boards/' + board + '?limit=10');
      const data = await res.json();
      if (data.posts) {
        data.posts.forEach(p => { p._board = board; });
        allPosts = allPosts.concat(data.posts);
      }
    } catch {}
  }

  // 최신순 정렬 & 10개
  allPosts.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  allPosts = allPosts.slice(0, 10);

  if (allPosts.length === 0) {
    container.innerHTML = '<div class="admin-empty"><i class="fas fa-inbox"></i><p>등록된 게시글이 없습니다.</p></div>';
    return;
  }

  let html = '<table class="admin-table"><thead><tr><th>게시판</th><th>제목</th><th>조회</th><th>날짜</th><th style="width:120px;">관리</th></tr></thead><tbody>';
  allPosts.forEach(p => {
    const slug = p._board === 'before-after' ? 'before-after' : p._board;
    html += '<tr>';
    html += '<td>' + getBoardBadge(p._board) + '</td>';
    html += '<td class="td-title">' + escHtml(p.title) + '</td>';
    html += '<td class="td-views">' + (p.view_count || 0) + '</td>';
    html += '<td class="td-date">' + formatDate(p.created_at) + '</td>';
    html += '<td><div class="td-actions">';
    html += '<a href="/' + slug + '/' + p.id + '" target="_blank" class="btn-view" title="보기"><i class="fas fa-eye"></i></a>';
    html += '<a href="/' + slug + '/' + p.id + '/edit" class="btn-edit" title="수정"><i class="fas fa-pen"></i></a>';
    html += '<button class="btn-del" title="삭제" onclick="deletePost(\\'' + p._board + '\\',' + p.id + ',\\'' + escHtml(p.title).replace(/'/g, "\\\\'") + '\\')"><i class="fas fa-trash"></i></button>';
    html += '</div></td>';
    html += '</tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

// ===== BOARD MANAGEMENT =====
const boardPages = { 'before-after': 1, 'blog': 1, 'notice': 1 };
const BOARD_NAMES = { 'before-after': '비포 & 애프터', 'blog': '블로그', 'notice': '공지사항' };

async function loadBoardManagement(board, page) {
  page = page || boardPages[board] || 1;
  boardPages[board] = page;

  const container = document.getElementById('section-' + board);
  const name = BOARD_NAMES[board];
  const slug = board;

  let html = '<div class="admin-header"><h1><em>' + name + '</em> 관리</h1>';
  html += '<div class="admin-header-actions"><a href="/' + slug + '/write" class="admin-btn admin-btn-gold"><i class="fas fa-plus"></i> 새 글 작성</a></div></div>';

  html += '<div class="admin-panel"><div id="board-table-' + board + '">';
  html += '<div style="text-align:center;padding:40px;"><i class="fas fa-spinner fa-spin" style="font-size:1.5rem;color:rgba(247,186,24,0.3);"></i></div>';
  html += '</div></div>';

  container.innerHTML = html;

  // Fetch data
  try {
    const res = await fetch('/api/boards/' + board + '?page=' + page + '&limit=15');
    const data = await res.json();
    const tableEl = document.getElementById('board-table-' + board);

    if (!data.posts || data.posts.length === 0) {
      tableEl.innerHTML = '<div class="admin-empty"><i class="fas fa-inbox"></i><p>등록된 글이 없습니다.</p></div>';
      return;
    }

    let thtml = '<table class="admin-table"><thead><tr><th style="width:60px;text-align:center;">No.</th><th>제목</th><th style="width:80px;text-align:center;">이미지</th><th style="width:80px;text-align:center;">조회</th><th style="width:110px;">날짜</th><th style="width:120px;">관리</th></tr></thead><tbody>';
    data.posts.forEach((p, i) => {
      const num = data.pagination.total - ((data.pagination.page - 1) * data.pagination.limit) - i;
      thtml += '<tr>';
      thtml += '<td style="text-align:center;font-family:\\'Space Grotesk\\',monospace;font-size:0.82rem;color:#888;">' + num + '</td>';
      thtml += '<td class="td-title">' + escHtml(p.title) + '</td>';
      thtml += '<td style="text-align:center;font-family:\\'Space Grotesk\\',monospace;font-size:0.82rem;color:#888;">' + (p.image_count || 0) + '</td>';
      thtml += '<td class="td-views">' + (p.view_count || 0) + '</td>';
      thtml += '<td class="td-date">' + formatDate(p.created_at) + '</td>';
      thtml += '<td><div class="td-actions">';
      thtml += '<a href="/' + slug + '/' + p.id + '" target="_blank" class="btn-view" title="보기"><i class="fas fa-eye"></i></a>';
      thtml += '<a href="/' + slug + '/' + p.id + '/edit" class="btn-edit" title="수정"><i class="fas fa-pen"></i></a>';
      thtml += '<button class="btn-del" title="삭제" onclick="deletePost(\\'' + board + '\\',' + p.id + ',\\'' + escHtml(p.title).replace(/'/g, "\\\\'") + '\\')"><i class="fas fa-trash"></i></button>';
      thtml += '</div></td>';
      thtml += '</tr>';
    });
    thtml += '</tbody></table>';

    // Pagination
    const { page: cp, totalPages: tp } = data.pagination;
    if (tp > 1) {
      thtml += '<div class="admin-pagination">';
      if (cp > 1) thtml += '<button onclick="loadBoardManagement(\\'' + board + '\\',' + (cp-1) + ')"><i class="fas fa-chevron-left"></i></button>';
      for (let i = 1; i <= tp; i++) {
        thtml += '<button class="' + (i === cp ? 'active' : '') + '" onclick="loadBoardManagement(\\'' + board + '\\',' + i + ')">' + i + '</button>';
      }
      if (cp < tp) thtml += '<button onclick="loadBoardManagement(\\'' + board + '\\',' + (cp+1) + ')"><i class="fas fa-chevron-right"></i></button>';
      thtml += '</div>';
    }

    tableEl.innerHTML = thtml;
  } catch (err) {
    document.getElementById('board-table-' + board).innerHTML = '<div class="admin-empty"><i class="fas fa-exclamation-triangle"></i><p>데이터를 불러올 수 없습니다.</p></div>';
  }
}

// ===== DELETE POST =====
function deletePost(board, id, title) {
  openModal(
    '게시글 삭제',
    '"<strong>' + title + '</strong>"<br>이 게시글을 삭제하시겠습니까?<br><span style="color:rgba(255,100,100,0.6);font-size:0.8rem;">삭제 후 복구할 수 없습니다.</span>',
    async () => {
      try {
        const res = await fetch('/api/boards/' + board + '/' + id, {
          method: 'DELETE',
          headers: authHeaders()
        });
        const data = await res.json();
        if (data.success) {
          showToast('게시글이 삭제되었습니다.', 'success');
          loadStats();
          loadRecentPosts();
          if (currentSection === board) loadBoardManagement(board);
        } else {
          showToast(data.error || '삭제 실패', 'error');
        }
      } catch {
        showToast('삭제 중 오류 발생', 'error');
      }
    }
  );
}

// ===== LOGOUT =====
function doLogout() {
  localStorage.removeItem('admin_token');
  location.href = '/admin/login';
}

// ===== INIT =====
loadStats();
loadRecentPosts();
</script>
</body>
</html>`;
}
