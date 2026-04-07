// 관리자 페이지 — 로그인, 대시보드, 게시판 관리
// 프리미엄 블랙&골드 어드민 디자인 v2 — 통계 차트, 애니메이션, 검색/필터, 썸네일 프리뷰

const adminCSS = `
/* ===== ADMIN GLOBAL ===== */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
.admin-body{min-height:100vh;background:#0A0A0A;color:#F5F2ED;font-family:'Noto Sans KR','DM Sans',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
*{margin:0;padding:0;box-sizing:border-box;}
a{text-decoration:none;color:inherit;}

/* ===== LOGIN PAGE ===== */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.login-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 20%,rgba(247,186,24,0.06),transparent 50%),radial-gradient(ellipse at 70% 80%,rgba(247,186,24,0.04),transparent 50%);pointer-events:none;}
.login-bg::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F7BA18' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
.login-particles{position:absolute;inset:0;overflow:hidden;pointer-events:none;}
.login-particle{position:absolute;width:2px;height:2px;background:#F7BA18;border-radius:50%;opacity:0;animation:particleFloat 6s infinite;}
@keyframes particleFloat{0%{opacity:0;transform:translateY(100vh)}50%{opacity:0.6}100%{opacity:0;transform:translateY(-100px)}}
.login-card{position:relative;width:100%;max-width:440px;padding:56px 48px;background:rgba(22,22,22,0.9);backdrop-filter:blur(40px);border:1px solid rgba(247,186,24,0.1);border-radius:28px;box-shadow:0 40px 100px rgba(0,0,0,0.4);animation:cardEnter 0.8s cubic-bezier(0.16,1,0.3,1);}
@keyframes cardEnter{from{opacity:0;transform:translateY(40px) scale(0.96)}to{opacity:1;transform:none}}
.login-logo{text-align:center;margin-bottom:40px;}
.login-logo h1{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;text-transform:uppercase;letter-spacing:5px;color:#F5F2ED;}
.login-logo h1 em{color:#F7BA18;font-style:normal;}
.login-logo p{font-family:'Syne',sans-serif;font-size:0.6rem;text-transform:uppercase;letter-spacing:6px;color:#888;margin-top:8px;font-weight:600;}
.login-divider{width:40px;height:1px;background:#F7BA18;margin:0 auto 40px;}
.login-field{margin-bottom:24px;position:relative;}
.login-field label{display:block;font-family:'Syne',sans-serif;font-size:0.6rem;text-transform:uppercase;letter-spacing:4px;color:#F7BA18;font-weight:600;margin-bottom:10px;}
.login-field input{width:100%;padding:16px 20px 16px 48px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;color:#F5F2ED;font-size:1rem;font-family:'Space Grotesk',monospace;letter-spacing:4px;transition:all 0.3s;outline:none;}
.login-field input:focus{border-color:#F7BA18;background:rgba(247,186,24,0.04);box-shadow:0 0 0 3px rgba(247,186,24,0.08);}
.login-field input::placeholder{color:#555;letter-spacing:2px;font-size:0.88rem;}
.login-field .field-icon{position:absolute;left:18px;bottom:17px;color:#888;font-size:0.95rem;transition:color 0.3s;}
.login-field input:focus ~ .field-icon{color:#F7BA18;}
.login-btn{width:100%;padding:18px;background:#F7BA18;color:#0A0A0A;border:none;border-radius:14px;font-family:'Syne',sans-serif;font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:4px;cursor:pointer;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);margin-top:8px;position:relative;overflow:hidden;}
.login-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%);transition:transform 0.6s;}
.login-btn:hover::before{transform:translateX(100%);}
.login-btn:hover{background:#D4A010;transform:translateY(-2px);box-shadow:0 20px 50px rgba(247,186,24,0.3);}
.login-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none;}
.login-error{background:rgba(255,50,50,0.08);border:1px solid rgba(255,50,50,0.2);border-radius:12px;padding:14px 20px;margin-bottom:20px;font-size:0.85rem;color:rgba(255,120,120,0.9);display:none;align-items:center;gap:10px;animation:shake 0.4s ease;}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.login-error i{font-size:0.9rem;}
.login-footer{text-align:center;margin-top:32px;font-size:0.72rem;color:#555;font-family:'Space Grotesk',monospace;letter-spacing:1px;}

/* ===== ADMIN LAYOUT ===== */
.admin-sidebar{position:fixed;left:0;top:0;bottom:0;width:270px;background:rgba(16,16,16,0.98);border-right:1px solid rgba(247,186,24,0.06);padding:32px 0;display:flex;flex-direction:column;z-index:100;transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);}
.admin-sidebar-brand{padding:0 28px;margin-bottom:40px;}
.admin-sidebar-brand h2{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:4px;color:#F5F2ED;}
.admin-sidebar-brand h2 em{color:#F7BA18;font-style:normal;}
.admin-sidebar-brand span{display:block;font-family:'Syne',sans-serif;font-size:0.5rem;text-transform:uppercase;letter-spacing:5px;color:#555;margin-top:6px;font-weight:600;}
.admin-nav{flex:1;display:flex;flex-direction:column;gap:2px;padding:0 12px;overflow-y:auto;}
.admin-nav-item{display:flex;align-items:center;gap:14px;padding:13px 20px;border-radius:12px;font-family:'Noto Sans KR',sans-serif;font-size:0.86rem;font-weight:400;color:#888;transition:all 0.3s;cursor:pointer;text-decoration:none;position:relative;}
.admin-nav-item:hover{color:#F5F2ED;background:rgba(247,186,24,0.04);}
.admin-nav-item.active{color:#F7BA18;background:rgba(247,186,24,0.08);font-weight:500;}
.admin-nav-item.active::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:24px;background:#F7BA18;border-radius:0 3px 3px 0;}
.admin-nav-item i{width:20px;text-align:center;font-size:0.88rem;}
.admin-nav-badge{margin-left:auto;background:#F7BA18;color:#0A0A0A;font-size:0.62rem;font-weight:700;padding:2px 8px;border-radius:6px;font-family:'Space Grotesk',monospace;min-width:24px;text-align:center;}
.admin-nav-divider{height:1px;background:rgba(255,255,255,0.04);margin:8px 20px;}
.admin-nav-section{font-family:'Syne',sans-serif;font-size:0.55rem;text-transform:uppercase;letter-spacing:4px;color:#555;padding:16px 20px 8px;font-weight:600;}
.admin-sidebar-footer{padding:16px 28px;border-top:1px solid rgba(255,255,255,0.04);}
.admin-user-info{display:flex;align-items:center;gap:12px;margin-bottom:12px;padding:8px 0;}
.admin-user-avatar{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#F7BA18,#D4A010);display:flex;align-items:center;justify-content:center;color:#0A0A0A;font-family:'Syne',sans-serif;font-weight:800;font-size:0.8rem;}
.admin-user-name{font-family:'Noto Sans KR',sans-serif;font-size:0.82rem;font-weight:500;color:#F5F2ED;}
.admin-user-role{font-family:'Space Grotesk',monospace;font-size:0.62rem;color:#888;letter-spacing:1px;}
.admin-logout-btn{display:flex;align-items:center;gap:10px;padding:10px 20px;border-radius:12px;background:rgba(255,50,50,0.06);border:1px solid rgba(255,50,50,0.1);color:rgba(255,120,120,0.8);font-size:0.78rem;font-weight:500;cursor:pointer;transition:all 0.3s;width:100%;font-family:'Noto Sans KR',sans-serif;}
.admin-logout-btn:hover{background:rgba(255,50,50,0.12);border-color:rgba(255,50,50,0.2);color:rgba(255,120,120,1);}

.admin-main{margin-left:270px;min-height:100vh;padding:32px 40px;}
.admin-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:36px;}
.admin-header h1{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;}
.admin-header h1 em{color:#F7BA18;font-style:normal;}
.admin-header-actions{display:flex;gap:12px;align-items:center;}
.admin-header-time{font-family:'Space Grotesk',monospace;font-size:0.75rem;color:#888;letter-spacing:1px;background:rgba(255,255,255,0.03);padding:8px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);}
.admin-site-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;background:rgba(247,186,24,0.08);border:1px solid rgba(247,186,24,0.15);color:#F7BA18;font-family:'Syne',sans-serif;font-size:0.65rem;text-transform:uppercase;letter-spacing:2px;font-weight:600;transition:all 0.3s;text-decoration:none;cursor:pointer;}
.admin-site-btn:hover{background:rgba(247,186,24,0.15);border-color:#F7BA18;transform:translateY(-1px);}

/* ===== STAT CARDS ===== */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:32px;}
.stat-card{background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:24px;position:relative;overflow:hidden;transition:all 0.5s;cursor:default;}
.stat-card:hover{border-color:rgba(247,186,24,0.15);transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,0.2);}
.stat-card::before{content:'';position:absolute;top:-30px;right:-30px;width:100px;height:100px;border-radius:50%;transition:all 0.5s;}
.stat-card:nth-child(1)::before{background:radial-gradient(circle,rgba(247,186,24,0.08),transparent 70%);}
.stat-card:nth-child(2)::before{background:radial-gradient(circle,rgba(56,189,248,0.08),transparent 70%);}
.stat-card:nth-child(3)::before{background:radial-gradient(circle,rgba(74,222,128,0.08),transparent 70%);}
.stat-card:nth-child(4)::before{background:radial-gradient(circle,rgba(251,191,36,0.08),transparent 70%);}
.stat-card:hover::before{transform:scale(1.5);}
.stat-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
.stat-card-icon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:0.95rem;}
.stat-card:nth-child(1) .stat-card-icon{background:rgba(247,186,24,0.12);color:#F7BA18;}
.stat-card:nth-child(2) .stat-card-icon{background:rgba(56,189,248,0.12);color:#38BDF8;}
.stat-card:nth-child(3) .stat-card-icon{background:rgba(74,222,128,0.12);color:#4ADE80;}
.stat-card:nth-child(4) .stat-card-icon{background:rgba(251,191,36,0.12);color:#FBBF24;}
.stat-trend{font-family:'Space Grotesk',monospace;font-size:0.68rem;padding:3px 8px;border-radius:6px;font-weight:600;}
.stat-trend.up{background:rgba(74,222,128,0.1);color:#4ADE80;}
.stat-trend.neutral{background:rgba(255,255,255,0.05);color:#888;}
.stat-card-num{font-family:'Bebas Neue',sans-serif;font-size:2.4rem;color:#F5F2ED;line-height:1;letter-spacing:2px;}
.stat-card-label{font-family:'Syne',sans-serif;font-size:0.58rem;text-transform:uppercase;letter-spacing:3px;color:#888;margin-top:6px;font-weight:500;}
.stat-card-bar{margin-top:12px;height:3px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;}
.stat-card-bar-fill{height:100%;border-radius:3px;transition:width 1.5s cubic-bezier(0.16,1,0.3,1);}
.stat-card:nth-child(1) .stat-card-bar-fill{background:linear-gradient(90deg,#F7BA18,#D4A010);}
.stat-card:nth-child(2) .stat-card-bar-fill{background:linear-gradient(90deg,#38BDF8,#0284C7);}
.stat-card:nth-child(3) .stat-card-bar-fill{background:linear-gradient(90deg,#4ADE80,#16A34A);}
.stat-card:nth-child(4) .stat-card-bar-fill{background:linear-gradient(90deg,#FBBF24,#D97706);}

/* ===== MINI CHART ===== */
.chart-row{display:grid;grid-template-columns:1.4fr 1fr;gap:20px;margin-bottom:24px;}
.mini-chart-card{background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:24px;transition:border-color 0.3s;}
.mini-chart-card:hover{border-color:rgba(247,186,24,0.1);}
.mini-chart-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.mini-chart-title{font-family:'Syne',sans-serif;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;display:flex;align-items:center;gap:10px;}
.mini-chart-title i{color:#F7BA18;font-size:0.8rem;}
.mini-chart-body{position:relative;}
.donut-chart{width:160px;height:160px;margin:0 auto;position:relative;}
.donut-chart svg{transform:rotate(-90deg);}
.donut-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;}
.donut-center .num{font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#F5F2ED;line-height:1;}
.donut-center .lbl{font-family:'Syne',sans-serif;font-size:0.5rem;text-transform:uppercase;letter-spacing:2px;color:#888;font-weight:600;}
.donut-legend{display:flex;justify-content:center;gap:24px;margin-top:20px;}
.donut-legend-item{display:flex;align-items:center;gap:8px;font-family:'Noto Sans KR',sans-serif;font-size:0.78rem;color:#B5B0A8;}
.donut-legend-dot{width:8px;height:8px;border-radius:50%;}

/* TOP POSTS */
.top-posts-list{display:flex;flex-direction:column;gap:8px;}
.top-post-item{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:12px;background:rgba(255,255,255,0.02);transition:all 0.3s;cursor:pointer;text-decoration:none;color:inherit;}
.top-post-item:hover{background:rgba(247,186,24,0.05);}
.top-post-rank{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;color:rgba(247,186,24,0.3);width:28px;text-align:center;}
.top-post-item:nth-child(1) .top-post-rank{color:#F7BA18;}
.top-post-item:nth-child(2) .top-post-rank{color:rgba(247,186,24,0.6);}
.top-post-info{flex:1;min-width:0;}
.top-post-title{font-family:'Noto Sans KR',sans-serif;font-size:0.85rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#F5F2ED;}
.top-post-meta{font-family:'Space Grotesk',monospace;font-size:0.65rem;color:#888;margin-top:2px;letter-spacing:1px;}
.top-post-views{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:#F7BA18;letter-spacing:1px;}

/* ===== SECTION PANELS ===== */
.admin-panel{background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:28px;margin-bottom:24px;transition:border-color 0.3s;}
.admin-panel:hover{border-color:rgba(247,186,24,0.1);}
.admin-panel-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;}
.admin-panel-title{font-family:'Syne',sans-serif;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;display:flex;align-items:center;gap:10px;}
.admin-panel-title i{color:#F7BA18;font-size:0.8rem;}
.admin-panel-subtitle{font-family:'Space Grotesk',monospace;font-size:0.68rem;color:#888;letter-spacing:1px;}

/* ===== QUICK ACTIONS ===== */
.quick-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.quick-action-btn{display:flex;align-items:center;gap:12px;padding:16px 20px;border-radius:14px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);cursor:pointer;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);text-decoration:none;color:#F5F2ED;}
.quick-action-btn:hover{border-color:rgba(247,186,24,0.3);background:rgba(247,186,24,0.06);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.15);}
.quick-action-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0;}
.quick-action-btn:nth-child(1) .quick-action-icon{background:rgba(56,189,248,0.12);color:#38BDF8;}
.quick-action-btn:nth-child(2) .quick-action-icon{background:rgba(74,222,128,0.12);color:#4ADE80;}
.quick-action-btn:nth-child(3) .quick-action-icon{background:rgba(251,191,36,0.12);color:#FBBF24;}
.quick-action-text{font-family:'Noto Sans KR',sans-serif;font-size:0.85rem;font-weight:500;}
.quick-action-sub{font-family:'Space Grotesk',monospace;font-size:0.62rem;color:#888;margin-top:2px;letter-spacing:1px;}

/* ===== RECENT POSTS TABLE ===== */
.admin-table{width:100%;border-collapse:collapse;}
.admin-table th{font-family:'Syne',sans-serif;font-size:0.58rem;text-transform:uppercase;letter-spacing:3px;color:#F7BA18;padding:12px 14px;border-bottom:1px solid rgba(247,186,24,0.15);text-align:left;font-weight:600;}
.admin-table td{padding:14px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.85rem;color:#B5B0A8;vertical-align:middle;}
.admin-table tbody tr{transition:all 0.2s;}
.admin-table tbody tr:hover{background:rgba(247,186,24,0.03);}
.admin-table .td-title-wrap{display:flex;align-items:center;gap:12px;}
.admin-table .td-thumb{width:44px;height:44px;border-radius:10px;overflow:hidden;background:rgba(255,255,255,0.04);flex-shrink:0;}
.admin-table .td-thumb img{width:100%;height:100%;object-fit:cover;}
.admin-table .td-thumb-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#555;font-size:0.7rem;}
.admin-table .td-title{color:#F5F2ED;font-weight:500;max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:'Noto Sans KR',sans-serif;}
.admin-table .td-badge{display:inline-block;padding:4px 10px;border-radius:6px;font-family:'Syne',sans-serif;font-size:0.58rem;text-transform:uppercase;letter-spacing:2px;font-weight:600;}
.admin-table .badge-ba{background:rgba(56,189,248,0.1);color:#38BDF8;border:1px solid rgba(56,189,248,0.2);}
.admin-table .badge-blog{background:rgba(74,222,128,0.1);color:#4ADE80;border:1px solid rgba(74,222,128,0.2);}
.admin-table .badge-notice{background:rgba(251,191,36,0.1);color:#FBBF24;border:1px solid rgba(251,191,36,0.2);}
.admin-table .td-date{font-family:'Space Grotesk',monospace;font-size:0.75rem;color:#888;letter-spacing:1px;white-space:nowrap;}
.admin-table .td-views{font-family:'Space Grotesk',monospace;font-size:0.78rem;text-align:center;}
.admin-table .td-views-wrap{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:8px;background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.1);}
.admin-table .td-views-wrap i{font-size:0.6rem;color:#F7BA18;opacity:0.7;}
.admin-table .td-views-wrap .views-num{font-family:'Space Grotesk',monospace;font-size:0.82rem;font-weight:600;color:#F7BA18;letter-spacing:0.5px;}
.admin-table .td-views-wrap.views-hot{background:rgba(255,100,60,0.08);border-color:rgba(255,100,60,0.15);}
.admin-table .td-views-wrap.views-hot i{color:#FF6B3D;}
.admin-table .td-views-wrap.views-hot .views-num{color:#FF6B3D;}
.admin-table .td-views-wrap.views-zero{background:rgba(255,255,255,0.02);border-color:rgba(255,255,255,0.06);}
.admin-table .td-views-wrap.views-zero i{color:#555;}
.admin-table .td-views-wrap.views-zero .views-num{color:#666;font-weight:400;}
.admin-table .td-actions{display:flex;gap:6px;}
.admin-table .td-actions button,.admin-table .td-actions a{width:30px;height:30px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#888;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s;font-size:0.72rem;text-decoration:none;}
.admin-table .td-actions .btn-edit:hover{border-color:#F7BA18;color:#F7BA18;background:rgba(247,186,24,0.08);}
.admin-table .td-actions .btn-del:hover{border-color:rgba(255,80,80,0.5);color:rgba(255,80,80,0.8);background:rgba(255,80,80,0.08);}
.admin-table .td-actions .btn-view:hover{border-color:rgba(56,189,248,0.5);color:#38BDF8;background:rgba(56,189,248,0.08);}

/* ACTION BUTTONS */
.admin-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:10px;font-family:'Syne',sans-serif;font-size:0.68rem;text-transform:uppercase;letter-spacing:2px;font-weight:700;cursor:pointer;border:none;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);text-decoration:none;}
.admin-btn-gold{background:#F7BA18;color:#0A0A0A;}
.admin-btn-gold:hover{background:#D4A010;transform:translateY(-2px);box-shadow:0 12px 32px rgba(247,186,24,0.25);}
.admin-btn-ghost{background:transparent;color:#888;border:1px solid rgba(255,255,255,0.1);}
.admin-btn-ghost:hover{border-color:#F7BA18;color:#F7BA18;}
.admin-btn-danger{background:transparent;color:rgba(255,100,100,0.7);border:1px solid rgba(255,50,50,0.15);}
.admin-btn-danger:hover{background:rgba(255,50,50,0.08);border-color:rgba(255,50,50,0.3);color:rgba(255,100,100,1);}

/* ===== BOARD MANAGEMENT ===== */
.board-mgmt-toolbar{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px;flex-wrap:wrap;}
.board-search{position:relative;flex:1;max-width:360px;}
.board-search input{width:100%;padding:10px 16px 10px 40px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:#F5F2ED;font-family:'Noto Sans KR',sans-serif;font-size:0.85rem;outline:none;transition:all 0.3s;}
.board-search input:focus{border-color:rgba(247,186,24,0.4);background:rgba(247,186,24,0.04);}
.board-search input::placeholder{color:#555;}
.board-search i{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#888;font-size:0.8rem;}
.board-mgmt-actions{display:flex;gap:8px;align-items:center;}
.board-filter-btn{padding:8px 16px;border-radius:8px;font-family:'Syne',sans-serif;font-size:0.62rem;text-transform:uppercase;letter-spacing:2px;font-weight:600;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#888;cursor:pointer;transition:all 0.3s;}
.board-filter-btn:hover,.board-filter-btn.active{border-color:rgba(247,186,24,0.3);color:#F7BA18;background:rgba(247,186,24,0.06);}

/* EMPTY STATE */
.admin-empty{text-align:center;padding:60px 24px;}
.admin-empty i{font-size:2.5rem;color:rgba(247,186,24,0.15);margin-bottom:16px;display:block;}
.admin-empty p{color:#555;font-size:0.88rem;font-weight:300;}

/* PAGINATION */
.admin-pagination{display:flex;justify-content:center;gap:4px;margin-top:20px;}
.admin-pagination button{width:34px;height:34px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#888;font-family:'Space Grotesk',monospace;font-size:0.78rem;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;justify-content:center;}
.admin-pagination button:hover{border-color:#F7BA18;color:#F7BA18;}
.admin-pagination button.active{background:#F7BA18;color:#0A0A0A;border-color:#F7BA18;font-weight:700;}

/* CONFIRM MODAL */
.admin-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:1000;display:none;align-items:center;justify-content:center;}
.admin-modal-overlay.show{display:flex;}
.admin-modal{background:rgba(22,22,22,0.98);border:1px solid rgba(247,186,24,0.1);border-radius:24px;padding:40px;max-width:420px;width:90%;text-align:center;animation:modalIn 0.3s ease;}
@keyframes modalIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:none}}
.admin-modal h3{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;}
.admin-modal p{font-size:0.85rem;color:#888;font-weight:300;line-height:1.8;margin-bottom:28px;}
.admin-modal-btns{display:flex;gap:12px;justify-content:center;}

/* MOBILE TOGGLE */
.admin-mobile-toggle{display:none;position:fixed;top:16px;left:16px;z-index:200;width:44px;height:44px;border-radius:12px;background:rgba(22,22,22,0.95);border:1px solid rgba(247,186,24,0.15);color:#F7BA18;font-size:1rem;cursor:pointer;align-items:center;justify-content:center;}

/* TOAST */
.admin-toast{position:fixed;top:24px;right:24px;z-index:2000;padding:14px 22px;border-radius:14px;font-size:0.85rem;font-weight:500;display:none;align-items:center;gap:10px;animation:toastIn 0.4s ease;font-family:'Noto Sans KR',sans-serif;}
.admin-toast.success{background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.2);color:#4ADE80;display:flex;}
.admin-toast.error{background:rgba(255,50,50,0.12);border:1px solid rgba(255,50,50,0.2);color:rgba(255,120,120,0.9);display:flex;}
@keyframes toastIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}

/* SKELETON LOADING */
.skeleton{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:8px;}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
.skeleton-row{display:flex;gap:14px;align-items:center;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.03);}
.skeleton-circle{width:44px;height:44px;border-radius:10px;flex-shrink:0;}
.skeleton-line{height:12px;border-radius:6px;flex:1;}
.skeleton-line-short{width:60px;height:12px;border-radius:6px;}

/* ANIMATION ENTRY */
.anim-enter{opacity:0;transform:translateY(20px);animation:animEnter 0.6s forwards;}
@keyframes animEnter{to{opacity:1;transform:none}}
.anim-enter:nth-child(1){animation-delay:0.05s;}
.anim-enter:nth-child(2){animation-delay:0.1s;}
.anim-enter:nth-child(3){animation-delay:0.15s;}
.anim-enter:nth-child(4){animation-delay:0.2s;}

/* ===== RESPONSIVE ===== */
@media(max-width:1200px){.stat-grid{grid-template-columns:repeat(2,1fr);}.chart-row{grid-template-columns:1fr;}.quick-actions{grid-template-columns:1fr;}}
@media(max-width:768px){
  .admin-sidebar{transform:translateX(-100%);}
  .admin-sidebar.open{transform:translateX(0);}
  .admin-main{margin-left:0;padding:16px 12px;padding-top:68px;}
  .admin-mobile-toggle{display:flex;}
  .stat-grid{grid-template-columns:1fr 1fr;}
  .stat-card{padding:20px 16px;}
  .stat-card-num{font-size:1.8rem;}
  .stat-card-label{font-size:0.55rem;letter-spacing:2px;}
  .login-card{margin:16px;padding:36px 24px;border-radius:20px;}
  .login-title{font-size:1.6rem;}
  .login-subtitle{font-size:0.65rem;}
  .login-input{padding:14px 16px;font-size:0.92rem;}
  .login-btn{padding:14px;font-size:0.72rem;}
  .admin-table{font-size:0.75rem;}
  .admin-table th{font-size:0.5rem;padding:10px 8px;letter-spacing:2px;}
  .admin-table td{padding:10px 8px;}
  .admin-table th:nth-child(4),.admin-table td:nth-child(4){display:none;}
  .admin-table .td-thumb{width:36px;height:36px;border-radius:8px;}
  .admin-table .td-title{max-width:140px;font-size:0.78rem;}
  .admin-table .td-title-wrap{gap:8px;}
  .admin-table .td-date{font-size:0.65rem;}
  .admin-table .td-actions button,.admin-table .td-actions a{width:28px;height:28px;font-size:0.65rem;}
  .admin-table .td-views-wrap{padding:3px 8px;}
  .admin-table .td-views-wrap .views-num{font-size:0.72rem;}
  .board-mgmt-toolbar{flex-direction:column;align-items:stretch;gap:10px;}
  .board-search{max-width:100%;}
  .board-search input{font-size:0.85rem;}
  .admin-header h1{font-size:1.1rem;}
  .admin-header h1 em{font-size:1.1rem;}
  .admin-header-actions .admin-btn{padding:10px 16px;font-size:0.6rem;}
  .admin-panel{padding:16px 12px;border-radius:14px;}
  .admin-panel-header{flex-direction:column;gap:8px;align-items:flex-start;}
  .admin-pagination{gap:4px;}
  .admin-pagination button{width:32px;height:32px;font-size:0.72rem;border-radius:8px;}
  .quick-actions{grid-template-columns:1fr;}
  .quick-action-btn{padding:14px 16px;}
  .quick-action-text{font-size:0.8rem;}
  .quick-action-sub{font-size:0.58rem;}
  .top-post-item{padding:10px 12px;gap:10px;}
  .top-post-title{font-size:0.78rem;}
  .top-post-views{font-size:0.95rem;}
  .top-post-rank{font-size:1.2rem;width:22px;}
  .chart-row{grid-template-columns:1fr;}
  .admin-nav a{padding:14px 16px;font-size:0.72rem;letter-spacing:1px;}
  .admin-nav a i{font-size:0.85rem;width:24px;}
}
@media(max-width:480px){
  .stat-grid{grid-template-columns:1fr;}
  .stat-card{padding:18px 14px;}
  .admin-main{padding:12px 10px;padding-top:64px;}
  .admin-table .td-title{max-width:110px;font-size:0.72rem;}
  .admin-table .td-actions{gap:4px;}
  .admin-header{flex-direction:column;gap:10px;align-items:flex-start;}
  .admin-header h1{font-size:1rem;}
  .admin-panel{padding:14px 10px;}
  .login-card{margin:12px;padding:28px 20px;}
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
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>${adminCSS}</style>
</head>
<body class="admin-body">

<div class="login-wrap">
  <div class="login-bg"></div>
  <div class="login-particles" id="particles"></div>
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
// 파티클 이펙트
(function(){
  const c=document.getElementById('particles');
  for(let i=0;i<20;i++){
    const p=document.createElement('div');
    p.className='login-particle';
    p.style.left=Math.random()*100+'%';
    p.style.animationDelay=Math.random()*6+'s';
    p.style.animationDuration=(4+Math.random()*4)+'s';
    c.appendChild(p);
  }
})();

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
      btn.innerHTML = '<i class="fas fa-check"></i> Welcome!';
      btn.style.background = '#4ADE80';
      setTimeout(() => { location.href = '/admin'; }, 500);
    } else {
      errEl.style.display = 'flex';
      errText.textContent = data.error || '로그인 실패';
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
      document.getElementById('password').focus();
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
    <div class="admin-nav-section">Overview</div>
    <a href="#" class="admin-nav-item active" data-section="dashboard" onclick="showSection('dashboard');return false;">
      <i class="fas fa-th-large"></i> 대시보드
    </a>
    <div class="admin-nav-divider"></div>
    <div class="admin-nav-section">Contents</div>
    <a href="#" class="admin-nav-item" data-section="before-after" onclick="showSection('before-after');return false;">
      <i class="fas fa-images"></i> 비포 & 애프터
      <span class="admin-nav-badge" id="badge-ba">-</span>
    </a>
    <a href="#" class="admin-nav-item" data-section="blog" onclick="showSection('blog');return false;">
      <i class="fas fa-pen-nib"></i> 블로그
      <span class="admin-nav-badge" id="badge-blog">-</span>
    </a>
    <a href="#" class="admin-nav-item" data-section="notice" onclick="showSection('notice');return false;">
      <i class="fas fa-bullhorn"></i> 공지사항
      <span class="admin-nav-badge" id="badge-notice">-</span>
    </a>
    <div class="admin-nav-divider"></div>
    <div class="admin-nav-section">Links</div>
    <a href="/" class="admin-nav-item" target="_blank">
      <i class="fas fa-globe"></i> 사이트 보기
    </a>
    <a href="https://blog.naver.com/yein2828" class="admin-nav-item" target="_blank">
      <i class="fab fa-blogger-b"></i> 네이버 블로그
    </a>
  </nav>
  <div class="admin-sidebar-footer">
    <div class="admin-user-info">
      <div class="admin-user-avatar">Y</div>
      <div>
        <div class="admin-user-name">관리자</div>
        <div class="admin-user-role">Administrator</div>
      </div>
    </div>
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
        <a href="/" target="_blank" class="admin-site-btn"><i class="fas fa-external-link-alt"></i> Site</a>
      </div>
    </div>

    <!-- STATS -->
    <div class="stat-grid" id="statGrid">
      <div class="stat-card anim-enter">
        <div class="stat-card-top">
          <div class="stat-card-icon"><i class="fas fa-file-alt"></i></div>
          <span class="stat-trend neutral" id="trend-total"><i class="fas fa-minus"></i> -</span>
        </div>
        <div class="stat-card-num" id="stat-total">-</div>
        <div class="stat-card-label">Total Posts</div>
        <div class="stat-card-bar"><div class="stat-card-bar-fill" id="bar-total" style="width:0%"></div></div>
      </div>
      <div class="stat-card anim-enter">
        <div class="stat-card-top">
          <div class="stat-card-icon"><i class="fas fa-eye"></i></div>
          <span class="stat-trend neutral" id="trend-views"><i class="fas fa-minus"></i> -</span>
        </div>
        <div class="stat-card-num" id="stat-views">-</div>
        <div class="stat-card-label">Total Views</div>
        <div class="stat-card-bar"><div class="stat-card-bar-fill" id="bar-views" style="width:0%"></div></div>
      </div>
      <div class="stat-card anim-enter">
        <div class="stat-card-top">
          <div class="stat-card-icon"><i class="fas fa-image"></i></div>
          <span class="stat-trend neutral"><i class="fas fa-camera"></i> media</span>
        </div>
        <div class="stat-card-num" id="stat-images">-</div>
        <div class="stat-card-label">Total Images</div>
        <div class="stat-card-bar"><div class="stat-card-bar-fill" id="bar-images" style="width:0%"></div></div>
      </div>
      <div class="stat-card anim-enter">
        <div class="stat-card-top">
          <div class="stat-card-icon"><i class="fas fa-bolt"></i></div>
          <span class="stat-trend up" id="trend-recent"><i class="fas fa-arrow-up"></i> this week</span>
        </div>
        <div class="stat-card-num" id="stat-recent">-</div>
        <div class="stat-card-label">This Week Posts</div>
        <div class="stat-card-bar"><div class="stat-card-bar-fill" id="bar-recent" style="width:0%"></div></div>
      </div>
    </div>

    <!-- CHART ROW -->
    <div class="chart-row">
      <!-- DONUT CHART -->
      <div class="mini-chart-card anim-enter">
        <div class="mini-chart-header">
          <div class="mini-chart-title"><i class="fas fa-chart-pie"></i> 게시판 분포</div>
        </div>
        <div style="display:flex;align-items:center;gap:32px;justify-content:center;flex-wrap:wrap;">
          <div class="donut-chart" id="donutChart">
            <svg viewBox="0 0 160 160" width="160" height="160">
              <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="20"/>
              <circle id="donut-ba" cx="80" cy="80" r="60" fill="none" stroke="#38BDF8" stroke-width="20" stroke-dasharray="0 377" stroke-dashoffset="0" style="transition:stroke-dasharray 1.5s cubic-bezier(0.16,1,0.3,1);"/>
              <circle id="donut-blog" cx="80" cy="80" r="60" fill="none" stroke="#4ADE80" stroke-width="20" stroke-dasharray="0 377" stroke-dashoffset="0" style="transition:stroke-dasharray 1.5s cubic-bezier(0.16,1,0.3,1);"/>
              <circle id="donut-notice" cx="80" cy="80" r="60" fill="none" stroke="#FBBF24" stroke-width="20" stroke-dasharray="0 377" stroke-dashoffset="0" style="transition:stroke-dasharray 1.5s cubic-bezier(0.16,1,0.3,1);"/>
            </svg>
            <div class="donut-center">
              <div class="num" id="donut-total">0</div>
              <div class="lbl">Posts</div>
            </div>
          </div>
          <div>
            <div class="donut-legend" style="flex-direction:column;gap:14px;">
              <div class="donut-legend-item">
                <span class="donut-legend-dot" style="background:#38BDF8;"></span>
                비포&애프터 <strong id="legend-ba" style="margin-left:auto;font-family:'Space Grotesk',monospace;color:#38BDF8;">0</strong>
              </div>
              <div class="donut-legend-item">
                <span class="donut-legend-dot" style="background:#4ADE80;"></span>
                블로그 <strong id="legend-blog" style="margin-left:auto;font-family:'Space Grotesk',monospace;color:#4ADE80;">0</strong>
              </div>
              <div class="donut-legend-item">
                <span class="donut-legend-dot" style="background:#FBBF24;"></span>
                공지사항 <strong id="legend-notice" style="margin-left:auto;font-family:'Space Grotesk',monospace;color:#FBBF24;">0</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TOP POSTS -->
      <div class="mini-chart-card anim-enter">
        <div class="mini-chart-header">
          <div class="mini-chart-title"><i class="fas fa-trophy"></i> 인기 게시글 Top 5</div>
        </div>
        <div class="top-posts-list" id="topPostsList">
          <div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>
          <div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>
          <div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>
        </div>
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div class="admin-panel anim-enter">
      <div class="admin-panel-header">
        <div class="admin-panel-title"><i class="fas fa-bolt"></i> Quick Actions</div>
      </div>
      <div class="quick-actions">
        <a href="/before-after/write" class="quick-action-btn">
          <div class="quick-action-icon"><i class="fas fa-images"></i></div>
          <div>
            <div class="quick-action-text">비포&애프터 작성</div>
            <div class="quick-action-sub">Before & After</div>
          </div>
        </a>
        <a href="/blog/write" class="quick-action-btn">
          <div class="quick-action-icon"><i class="fas fa-pen-nib"></i></div>
          <div>
            <div class="quick-action-text">블로그 작성</div>
            <div class="quick-action-sub">Blog Post</div>
          </div>
        </a>
        <a href="/notice/write" class="quick-action-btn">
          <div class="quick-action-icon"><i class="fas fa-bullhorn"></i></div>
          <div>
            <div class="quick-action-text">공지사항 작성</div>
            <div class="quick-action-sub">Notice</div>
          </div>
        </a>
      </div>
    </div>

    <!-- RECENT POSTS -->
    <div class="admin-panel anim-enter">
      <div class="admin-panel-header">
        <div class="admin-panel-title"><i class="fas fa-clock"></i> Recent Posts</div>
        <span class="admin-panel-subtitle">최근 10개</span>
      </div>
      <div id="recentPosts">
        <div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>
        <div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>
        <div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>
        <div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>
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
function formatNum(n) { return n >= 1000 ? (n/1000).toFixed(1)+'k' : String(n); }

function getBoardBadge(board) {
  const m = { 'before-after': ['B&A', 'badge-ba'], 'blog': ['Blog', 'badge-blog'], 'notice': ['Notice', 'badge-notice'] };
  const [label, cls] = m[board] || ['', ''];
  return '<span class="td-badge ' + cls + '">' + label + '</span>';
}

function getBoardSlug(board) {
  return board;
}

function showToast(msg, type) {
  const t = document.getElementById('adminToast');
  const txt = document.getElementById('toastText');
  txt.textContent = msg;
  t.className = 'admin-toast ' + type;
  setTimeout(() => { t.className = 'admin-toast'; }, 3000);
}

// ===== COUNTER ANIMATION =====
function animateNum(el, target) {
  const start = 0;
  const duration = 1200;
  const startTime = Date.now();
  function tick() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = formatNum(current);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = formatNum(target);
  }
  tick();
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
  document.querySelectorAll('.admin-nav-item[data-section]').forEach(el => el.classList.remove('active'));
  const target = document.querySelector('.admin-nav-item[data-section="'+section+'"]');
  if (target) target.classList.add('active');

  document.querySelectorAll('[id^="section-"]').forEach(el => el.style.display = 'none');
  document.getElementById('section-' + section).style.display = 'block';
  currentSection = section;

  if (section !== 'dashboard') loadBoardManagement(section);
  document.getElementById('sidebar').classList.remove('open');
}

// ===== TIME =====
function updateTime() {
  const now = new Date();
  const str = now.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' +
    now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const el = document.getElementById('currentTime');
  if (el) el.textContent = str;
}
updateTime();
setInterval(updateTime, 60000);

// ===== DONUT CHART =====
function updateDonutChart(ba, blog, notice) {
  const total = ba + blog + notice;
  if (total === 0) return;
  const circumference = 2 * Math.PI * 60; // ~377
  const baLen = (ba / total) * circumference;
  const blogLen = (blog / total) * circumference;
  const noticeLen = (notice / total) * circumference;

  const baEl = document.getElementById('donut-ba');
  const blogEl = document.getElementById('donut-blog');
  const noticeEl = document.getElementById('donut-notice');

  baEl.setAttribute('stroke-dasharray', baLen + ' ' + (circumference - baLen));
  baEl.setAttribute('stroke-dashoffset', '0');

  blogEl.setAttribute('stroke-dasharray', blogLen + ' ' + (circumference - blogLen));
  blogEl.setAttribute('stroke-dashoffset', '-' + baLen);

  noticeEl.setAttribute('stroke-dasharray', noticeLen + ' ' + (circumference - noticeLen));
  noticeEl.setAttribute('stroke-dashoffset', '-' + (baLen + blogLen));

  document.getElementById('donut-total').textContent = total;
  document.getElementById('legend-ba').textContent = ba;
  document.getElementById('legend-blog').textContent = blog;
  document.getElementById('legend-notice').textContent = notice;
}

// ===== LOAD DASHBOARD DATA =====
async function loadDashboard() {
  try {
    const res = await fetch('/api/boards/stats/overview');
    const data = await res.json();

    if (!data.success) throw new Error('API error');

    // Animate stat numbers
    animateNum(document.getElementById('stat-total'), data.totalPosts);
    animateNum(document.getElementById('stat-views'), data.totalViews);
    animateNum(document.getElementById('stat-images'), data.totalImages);
    animateNum(document.getElementById('stat-recent'), data.recentWeekPosts);

    // Stat bars
    const maxPosts = Math.max(data.totalPosts, 1);
    document.getElementById('bar-total').style.width = '100%';
    document.getElementById('bar-views').style.width = Math.min(data.totalViews / Math.max(data.totalViews, 1) * 100, 100) + '%';
    document.getElementById('bar-images').style.width = Math.min(data.totalImages / Math.max(data.totalImages, 1) * 100, 100) + '%';
    document.getElementById('bar-recent').style.width = Math.min(data.recentWeekPosts / maxPosts * 100, 100) + '%';

    // Trend badges
    if (data.recentWeekPosts > 0) {
      document.getElementById('trend-recent').innerHTML = '<i class="fas fa-arrow-up"></i> +' + data.recentWeekPosts + ' this week';
      document.getElementById('trend-recent').className = 'stat-trend up';
    }

    // Sidebar badges
    const ba = data.boards['before-after']?.total || 0;
    const blog = data.boards['blog']?.total || 0;
    const notice = data.boards['notice']?.total || 0;
    document.getElementById('badge-ba').textContent = ba;
    document.getElementById('badge-blog').textContent = blog;
    document.getElementById('badge-notice').textContent = notice;

    // Donut chart
    updateDonutChart(ba, blog, notice);

    // Top posts
    renderTopPosts(data.topPosts || []);

    // Recent posts
    renderRecentPosts(data.recentPosts || []);

  } catch (err) {
    console.error('Dashboard load error:', err);
    // Fallback: load individually
    loadStatsFallback();
  }
}

async function loadStatsFallback() {
  const boards = ['before-after', 'blog', 'notice'];
  let total = 0;
  for (const board of boards) {
    try {
      const res = await fetch('/api/boards/' + board + '?limit=1');
      const data = await res.json();
      const count = data.pagination?.total || 0;
      total += count;
      if (board === 'before-after') document.getElementById('badge-ba').textContent = count;
      else if (board === 'blog') document.getElementById('badge-blog').textContent = count;
      else document.getElementById('badge-notice').textContent = count;
    } catch {}
  }
  document.getElementById('stat-total').textContent = total;
}

// ===== RENDER TOP POSTS =====
function renderTopPosts(posts) {
  const container = document.getElementById('topPostsList');
  if (!posts || posts.length === 0) {
    container.innerHTML = '<div class="admin-empty" style="padding:24px;"><i class="fas fa-trophy" style="font-size:1.5rem;"></i><p>아직 게시글이 없습니다.</p></div>';
    return;
  }
  container.innerHTML = posts.map((p, i) => {
    const slug = getBoardSlug(p.board);
    return '<a href="/' + slug + '/' + p.id + '" target="_blank" class="top-post-item">' +
      '<div class="top-post-rank">' + (i + 1) + '</div>' +
      '<div class="top-post-info"><div class="top-post-title">' + escHtml(p.title) + '</div>' +
      '<div class="top-post-meta">' + getBoardBadge(p.board) + ' &middot; ' + formatDate(p.created_at) + '</div></div>' +
      '<div class="top-post-views">' + formatNum(p.view_count || 0) + '</div></a>';
  }).join('');
}

// ===== RENDER RECENT POSTS =====
function renderRecentPosts(posts) {
  const container = document.getElementById('recentPosts');
  if (!posts || posts.length === 0) {
    container.innerHTML = '<div class="admin-empty"><i class="fas fa-inbox"></i><p>등록된 게시글이 없습니다.</p></div>';
    return;
  }

  let html = '<table class="admin-table"><thead><tr><th>게시판</th><th>제목</th><th>조회</th><th>날짜</th><th style="width:100px;">관리</th></tr></thead><tbody>';
  posts.forEach(p => {
    const slug = getBoardSlug(p.board);
    const thumb = p.thumbnail_url
      ? '<div class="td-thumb"><img src="' + p.thumbnail_url + '" alt=""></div>'
      : '<div class="td-thumb"><div class="td-thumb-placeholder"><i class="fas fa-image"></i></div></div>';
    html += '<tr>';
    html += '<td>' + getBoardBadge(p.board) + '</td>';
    html += '<td><div class="td-title-wrap">' + thumb + '<span class="td-title">' + escHtml(p.title) + '</span></div></td>';
    const rvCls = (p.view_count||0) >= 5 ? 'views-hot' : (p.view_count||0) === 0 ? 'views-zero' : '';
    html += '<td class="td-views"><div class="td-views-wrap ' + rvCls + '"><i class="fas fa-eye"></i><span class="views-num">' + formatNum(p.view_count || 0) + '</span></div></td>';
    html += '<td class="td-date">' + formatDate(p.created_at) + '</td>';
    html += '<td><div class="td-actions">';
    html += '<a href="/' + slug + '/' + p.id + '" target="_blank" class="btn-view" title="보기"><i class="fas fa-eye"></i></a>';
    html += '<a href="/' + slug + '/' + p.id + '/edit" class="btn-edit" title="수정"><i class="fas fa-pen"></i></a>';
    html += '<button class="btn-del" title="삭제" onclick="deletePost(\\''+p.board+'\\',' + p.id + ',\\''+escHtml(p.title).replace(/'/g,"\\\\'")+'\\')" ><i class="fas fa-trash"></i></button>';
    html += '</div></td>';
    html += '</tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

// ===== BOARD MANAGEMENT =====
const boardPages = { 'before-after': 1, 'blog': 1, 'notice': 1 };
const boardSearchTerms = { 'before-after': '', 'blog': '', 'notice': '' };
const BOARD_NAMES = { 'before-after': '비포 & 애프터', 'blog': '블로그', 'notice': '공지사항' };
const BOARD_ICONS = { 'before-after': 'fas fa-images', 'blog': 'fas fa-pen-nib', 'notice': 'fas fa-bullhorn' };

async function loadBoardManagement(board, page) {
  page = page || boardPages[board] || 1;
  boardPages[board] = page;

  const container = document.getElementById('section-' + board);
  const name = BOARD_NAMES[board];
  const icon = BOARD_ICONS[board];
  const slug = board;
  const searchTerm = boardSearchTerms[board] || '';

  let html = '<div class="admin-header"><h1><i class="' + icon + '" style="color:#F7BA18;margin-right:12px;font-size:1.2rem;"></i><em>' + name + '</em></h1>';
  html += '<div class="admin-header-actions"><a href="/' + slug + '/write" class="admin-btn admin-btn-gold"><i class="fas fa-plus"></i> 새 글 작성</a></div></div>';

  // Toolbar with search
  html += '<div class="board-mgmt-toolbar">';
  html += '<div class="board-search"><i class="fas fa-search"></i><input type="text" placeholder="게시글 검색..." value="' + escHtml(searchTerm) + '" onkeyup="handleBoardSearch(event, \\'' + board + '\\')" id="search-' + board + '"></div>';
  html += '<div class="board-mgmt-actions">';
  html += '<a href="/' + slug + '" target="_blank" class="board-filter-btn"><i class="fas fa-eye"></i> 공개 페이지</a>';
  html += '</div></div>';

  html += '<div class="admin-panel"><div id="board-table-' + board + '">';
  // Skeleton loading
  html += '<div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>';
  html += '<div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>';
  html += '<div class="skeleton-row"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-short"></div></div>';
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

    // Filter by search term (client-side for simplicity)
    let posts = data.posts;
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      posts = posts.filter(p => (p.title || '').toLowerCase().includes(lower));
    }

    if (posts.length === 0) {
      tableEl.innerHTML = '<div class="admin-empty"><i class="fas fa-search"></i><p>"' + escHtml(searchTerm) + '" 에 대한 결과가 없습니다.</p></div>';
      return;
    }

    let thtml = '<table class="admin-table"><thead><tr><th style="width:50px;text-align:center;">No.</th><th>제목</th><th style="width:70px;text-align:center;">이미지</th><th style="width:70px;text-align:center;">조회</th><th style="width:100px;">날짜</th><th style="width:100px;">관리</th></tr></thead><tbody>';
    posts.forEach((p, i) => {
      const num = data.pagination.total - ((data.pagination.page - 1) * data.pagination.limit) - i;
      const thumb = p.thumbnail_url
        ? '<div class="td-thumb"><img src="' + p.thumbnail_url + '" alt="" loading="lazy"></div>'
        : '<div class="td-thumb"><div class="td-thumb-placeholder"><i class="fas fa-image"></i></div></div>';
      thtml += '<tr>';
      thtml += '<td style="text-align:center;font-family:\\'Space Grotesk\\',monospace;font-size:0.78rem;color:#888;">' + num + '</td>';
      thtml += '<td><div class="td-title-wrap">' + thumb + '<span class="td-title">' + escHtml(p.title) + '</span></div></td>';
      thtml += '<td style="text-align:center;font-family:\\'Space Grotesk\\',monospace;font-size:0.78rem;color:#888;">' + (p.image_count || 0) + '</td>';
      const bvCls = (p.view_count||0) >= 5 ? 'views-hot' : (p.view_count||0) === 0 ? 'views-zero' : '';
      thtml += '<td class="td-views"><div class="td-views-wrap ' + bvCls + '"><i class="fas fa-eye"></i><span class="views-num">' + formatNum(p.view_count || 0) + '</span></div></td>';
      thtml += '<td class="td-date">' + formatDate(p.created_at) + '</td>';
      thtml += '<td><div class="td-actions">';
      thtml += '<a href="/' + slug + '/' + p.id + '" target="_blank" class="btn-view" title="보기"><i class="fas fa-eye"></i></a>';
      thtml += '<a href="/' + slug + '/' + p.id + '/edit" class="btn-edit" title="수정"><i class="fas fa-pen"></i></a>';
      thtml += '<button class="btn-del" title="삭제" onclick="deletePost(\\''+board+'\\',' + p.id + ',\\''+escHtml(p.title).replace(/'/g,"\\\\'")+'\\')" ><i class="fas fa-trash"></i></button>';
      thtml += '</div></td>';
      thtml += '</tr>';
    });
    thtml += '</tbody></table>';

    // Pagination
    const { page: cp, totalPages: tp } = data.pagination;
    if (tp > 1) {
      thtml += '<div class="admin-pagination">';
      if (cp > 1) thtml += '<button onclick="loadBoardManagement(\\''+board+'\\',' + (cp-1) + ')"><i class="fas fa-chevron-left"></i></button>';
      const start = Math.max(1, cp - 3);
      const end = Math.min(tp, cp + 3);
      if (start > 1) { thtml += '<button onclick="loadBoardManagement(\\''+board+'\\',1)">1</button>'; if(start>2) thtml += '<button disabled style="opacity:0.3;">...</button>'; }
      for (let i = start; i <= end; i++) {
        thtml += '<button class="' + (i === cp ? 'active' : '') + '" onclick="loadBoardManagement(\\''+board+'\\',' + i + ')">' + i + '</button>';
      }
      if (end < tp) { if(end<tp-1) thtml += '<button disabled style="opacity:0.3;">...</button>'; thtml += '<button onclick="loadBoardManagement(\\''+board+'\\',' + tp + ')">' + tp + '</button>'; }
      if (cp < tp) thtml += '<button onclick="loadBoardManagement(\\''+board+'\\',' + (cp+1) + ')"><i class="fas fa-chevron-right"></i></button>';
      thtml += '</div>';
    }

    tableEl.innerHTML = thtml;
  } catch (err) {
    document.getElementById('board-table-' + board).innerHTML = '<div class="admin-empty"><i class="fas fa-exclamation-triangle"></i><p>데이터를 불러올 수 없습니다.</p></div>';
  }
}

// ===== BOARD SEARCH =====
let searchTimeout;
function handleBoardSearch(e, board) {
  clearTimeout(searchTimeout);
  boardSearchTerms[board] = e.target.value;
  searchTimeout = setTimeout(() => {
    boardPages[board] = 1;
    loadBoardManagement(board, 1);
  }, 300);
}

// ===== DELETE POST =====
function deletePost(board, id, title) {
  openModal(
    '게시글 삭제',
    '"<strong>' + title + '</strong>"<br><br>이 게시글을 삭제하시겠습니까?<br><span style="color:rgba(255,100,100,0.6);font-size:0.78rem;">삭제 후 복구할 수 없습니다.</span>',
    async () => {
      try {
        const res = await fetch('/api/boards/' + board + '/' + id, {
          method: 'DELETE',
          headers: authHeaders()
        });
        const data = await res.json();
        if (data.success) {
          showToast('게시글이 삭제되었습니다.', 'success');
          loadDashboard();
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
loadDashboard();
</script>
</body>
</html>`;
}
