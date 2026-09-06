// 비급여 진료비(수가) — 공개 페이지 + 관리자 편집 페이지
import { head, nav, footer, scripts } from './layout'
import type { FeeItem } from './api-fees'

const SITE_DOMAIN = 'https://happyyein.kr'

function esc(s: string): string {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// ============================================================
// 공개 페이지 — 공개 항목만, 빈 그룹 자동 숨김
// ============================================================
export function feesPublicPage(items: FeeItem[]): string {
  // 카테고리별 그룹화(등장 순서 유지) — 공개 항목만 이미 필터링되어 넘어옴
  const groups: { category: string; rows: FeeItem[] }[] = []
  for (const it of items) {
    if (!it || it.is_published !== 1) continue
    let g = groups.find(x => x.category === it.category)
    if (!g) { g = { category: it.category, rows: [] }; groups.push(g) }
    g.rows.push(it)
  }
  const visibleGroups = groups.filter(g => g.rows.length > 0) // 빈 그룹 숨김

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "행복한예인치과 진료비 안내",
    "description": "행복한예인치과 비급여 진료비를 투명하게 안내합니다.",
    "url": `${SITE_DOMAIN}/fees`,
    "isPartOf": { "@id": `${SITE_DOMAIN}/#website` },
  }

  const tables = visibleGroups.map(g => `
    <div style="margin-bottom:40px;">
      <h2 style="font-family:var(--font-kr);font-size:1.05rem;font-weight:700;color:var(--gold);margin-bottom:16px;display:flex;align-items:center;gap:10px;">
        <i class="fas fa-tooth" style="font-size:0.9rem;"></i> ${esc(g.category)}
      </h2>
      <div style="overflow-x:auto;border-radius:14px;border:1px solid rgba(255,255,255,0.06);">
        <table style="width:100%;border-collapse:collapse;background:var(--dark-card);font-family:var(--font-kr);">
          <thead>
            <tr style="background:rgba(247,186,24,0.06);">
              <th style="text-align:left;padding:14px 18px;font-size:0.78rem;color:var(--gold);font-weight:700;white-space:nowrap;">항목</th>
              <th style="text-align:left;padding:14px 18px;font-size:0.78rem;color:var(--gold);font-weight:700;">금액</th>
              <th style="text-align:left;padding:14px 18px;font-size:0.78rem;color:var(--gold);font-weight:700;white-space:nowrap;">비고</th>
            </tr>
          </thead>
          <tbody>
            ${g.rows.map(r => `
            <tr style="border-top:1px solid rgba(255,255,255,0.05);">
              <td style="padding:14px 18px;font-size:0.86rem;color:var(--white);font-weight:600;white-space:nowrap;">${esc(r.name)}</td>
              <td style="padding:14px 18px;font-size:0.84rem;color:var(--gray);line-height:1.6;">${esc(r.price) || '<span style="color:#777;">상담 후 안내</span>'}</td>
              <td style="padding:14px 18px;font-size:0.8rem;color:var(--gray);">${esc(r.note) || '-'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`).join('')

  return `${head({
    title: '비급여 진료비 안내 | 행복한예인치과 시청역·명동',
    description: '시청역·명동·을지로 행복한예인치과 비급여 진료비를 투명하게 안내합니다. 임플란트·교정·심미·보철 등 항목별 비용 안내. 상담 문의 02-756-2828',
    path: '/fees',
    keywords: '치과 비급여 수가, 치과 진료비, 비급여 진료비, 임플란트 비용, 교정 비용, 시청역 치과 진료비',
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '비급여 진료비 안내', url: '/fees' },
    ],
    jsonLd: [jsonLd],
  })}
${nav()}
<section class="sub-hero">
  <div class="sub-hero-bg" style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);"></div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">비급여 진료비 안내</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">Fee Schedule</div>
    <h1>비급여 진료비,<br><em>투명하게</em> 안내합니다</h1>
    <p style="color:var(--gray);margin-top:16px;font-size:0.9rem;font-family:var(--font-kr);line-height:1.8;">
      행복한예인치과는 불필요한 추가 비용 없이,<br>환자 상태에 맞는 정확한 비용을 안내합니다.
    </p>
  </div>
</section>

<section class="page-section" style="padding:80px 24px;">
  <div class="page-inner" style="max-width:1000px;margin:0 auto;">
    ${tables || '<p style="text-align:center;color:var(--gray);font-family:var(--font-kr);">진료비 정보를 준비 중입니다.</p>'}

    <p style="font-family:var(--font-kr);font-size:0.78rem;color:#888;line-height:1.8;margin-top:24px;">
      ※ 상기 금액은 안내용이며, 환자 상태·재질·난이도에 따라 달라질 수 있습니다. 정확한 비용은 진단 후 안내해 드립니다.
    </p>

    <div style="margin-top:48px;padding:40px;border-radius:16px;background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.15);text-align:center;">
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
</body></html>`
}

// ============================================================
// 관리자 편집 페이지 — 클라이언트측 JWT 인증(admin_token), 항목별 공개/비공개 토글
// ============================================================
export function feesAdminPage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>비급여 진료비 관리 — 행복한예인치과 Admin</title>
<link rel="icon" type="image/png" href="/static/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{min-height:100vh;background:#0A0A0A;color:#F5F2ED;font-family:'Noto Sans KR','DM Sans',sans-serif;-webkit-font-smoothing:antialiased;}
a{text-decoration:none;color:inherit;}
.hd{padding:20px 32px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(247,186,24,0.08);background:rgba(16,16,16,0.95);position:sticky;top:0;z-index:50;}
.hd h1{font-family:'Syne',sans-serif;font-size:0.95rem;font-weight:800;text-transform:uppercase;letter-spacing:3px;}
.hd h1 em{color:#F7BA18;font-style:normal;}
.hd .nav{display:flex;gap:8px;}
.hd .nav a{padding:8px 16px;border-radius:10px;font-size:0.8rem;font-weight:500;color:#888;transition:all 0.3s;}
.hd .nav a:hover{color:#F5F2ED;background:rgba(255,255,255,0.04);}
.main{max-width:1100px;margin:0 auto;padding:32px;}
.toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap;}
.toolbar .title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;letter-spacing:1px;}
.toolbar .title em{color:#F7BA18;font-style:normal;}
.btn{padding:11px 20px;border-radius:11px;border:1px solid rgba(247,186,24,0.15);background:rgba(247,186,24,0.06);color:#F7BA18;font-family:'Syne',sans-serif;font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:2px;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;}
.btn:hover{background:rgba(247,186,24,0.12);border-color:#F7BA18;transform:translateY(-1px);}
.btn.gold{background:#F7BA18;color:#0A0A0A;border-color:#F7BA18;}
.btn.gold:hover{background:#D4A010;}
.btn.sec{background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.1);color:#B5B0A8;}
.btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
.status{padding:12px 18px;border-radius:11px;margin-bottom:18px;font-size:0.82rem;display:none;align-items:center;gap:10px;}
.status.info{display:flex;background:rgba(56,189,248,0.06);border:1px solid rgba(56,189,248,0.15);color:#38BDF8;}
.status.success{display:flex;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15);color:#4ADE80;}
.status.error{display:flex;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);color:#EF4444;}
table.grid{width:100%;border-collapse:collapse;background:rgba(22,22,22,0.8);border:1px solid rgba(255,255,255,0.06);border-radius:14px;overflow:hidden;}
table.grid th{font-family:'Syne',sans-serif;font-size:0.58rem;text-transform:uppercase;letter-spacing:2px;color:#888;font-weight:600;padding:12px 10px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.06);}
table.grid td{padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.03);vertical-align:middle;}
table.grid input[type=text]{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;color:#F5F2ED;font-size:0.82rem;padding:9px 11px;font-family:'Noto Sans KR',sans-serif;outline:none;transition:border-color 0.2s;}
table.grid input[type=text]:focus{border-color:#F7BA18;}
.pub-toggle{display:inline-flex;align-items:center;gap:8px;cursor:pointer;user-select:none;}
.pub-toggle .sw{width:44px;height:24px;border-radius:14px;background:rgba(255,255,255,0.1);position:relative;transition:background 0.25s;flex-shrink:0;}
.pub-toggle .sw::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#888;transition:all 0.25s;}
.pub-toggle.on .sw{background:rgba(74,222,128,0.3);}
.pub-toggle.on .sw::after{left:23px;background:#4ADE80;}
.pub-toggle .lbl{font-size:0.72rem;font-weight:600;color:#888;white-space:nowrap;}
.pub-toggle.on .lbl{color:#4ADE80;}
.row-del{background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15);color:#EF4444;width:32px;height:32px;border-radius:8px;cursor:pointer;transition:all 0.2s;}
.row-del:hover{background:rgba(239,68,68,0.18);}
.hint{font-size:0.76rem;color:#888;line-height:1.7;margin:14px 0 0;}
.loading{text-align:center;padding:60px;color:#888;font-size:0.9rem;}
@media(max-width:820px){.main{padding:16px;} table.grid{display:block;overflow-x:auto;white-space:nowrap;}}
</style>
</head>
<body>
<header class="hd">
  <h1>YEIN<em>DENTAL</em> · 비급여 진료비</h1>
  <div class="nav">
    <a href="/admin"><i class="fas fa-arrow-left"></i> 대시보드</a>
    <a href="/fees" target="_blank"><i class="fas fa-external-link-alt"></i> 공개 페이지</a>
  </div>
</header>
<div class="main">
  <div class="toolbar">
    <div class="title">비급여 <em>진료비</em> 관리</div>
    <div style="display:flex;gap:10px;">
      <button class="btn sec" onclick="addRow()"><i class="fas fa-plus"></i> 항목 추가</button>
      <button class="btn gold" id="saveBtn" onclick="save()"><i class="fas fa-save"></i> 저장</button>
    </div>
  </div>
  <div class="status" id="status"></div>
  <div id="tableWrap"><div class="loading"><i class="fas fa-spinner fa-spin"></i> 불러오는 중...</div></div>
  <p class="hint">
    · <b>공개</b> 토글을 끄면 해당 항목은 공개 페이지(/fees)에 표시되지 않습니다. (데이터는 보존됩니다)<br>
    · 그룹(카테고리)에 공개 항목이 하나도 없으면 공개 페이지에서 그룹 전체가 자동으로 숨겨집니다.<br>
    · 순서는 위에서부터 표시되며, 저장 시 현재 순서대로 반영됩니다.
  </p>
</div>
<script>
const TOKEN = localStorage.getItem('admin_token');
if (!TOKEN) location.href = '/admin/login';
function authHeaders(){ return { 'Authorization':'Bearer '+TOKEN, 'Content-Type':'application/json' }; }
function esc(s){ const d=document.createElement('div'); d.textContent=s==null?'':String(s); return d.innerHTML; }
function showStatus(msg,type){ const el=document.getElementById('status'); el.className='status '+type; el.innerHTML=msg; }

let rows = [];

async function load(){
  try{
    const res = await fetch('/api/fees/admin', { headers: authHeaders() });
    if(res.status===401){ localStorage.removeItem('admin_token'); location.href='/admin/login'; return; }
    const data = await res.json();
    rows = (data.items||[]).map(it=>({
      category: it.category||'', name: it.name||'', price: it.price||'', note: it.note||'',
      is_published: it.is_published?1:0
    }));
    if(rows.length===0) addRow(true);
    render();
  }catch(e){ showStatus('<i class="fas fa-exclamation-triangle"></i> 불러오기 실패: '+esc(e.message), 'error'); }
}

function render(){
  let html = '<table class="grid"><thead><tr>'+
    '<th style="width:36px;">#</th>'+
    '<th style="width:20%;">그룹(카테고리)</th>'+
    '<th style="width:20%;">항목명</th>'+
    '<th>금액</th>'+
    '<th style="width:16%;">비고</th>'+
    '<th style="width:110px;">공개</th>'+
    '<th style="width:44px;"></th>'+
    '</tr></thead><tbody>';
  rows.forEach((r,i)=>{
    html += '<tr>'+
      '<td style="color:#888;font-family:monospace;font-size:0.75rem;">'+(i+1)+'</td>'+
      '<td><input type="text" value="'+esc(r.category)+'" oninput="upd('+i+',\\'category\\',this.value)" placeholder="예: 임플란트 · 보철"></td>'+
      '<td><input type="text" value="'+esc(r.name)+'" oninput="upd('+i+',\\'name\\',this.value)" placeholder="항목명"></td>'+
      '<td><input type="text" value="'+esc(r.price)+'" oninput="upd('+i+',\\'price\\',this.value)" placeholder="금액 / 범위 / 상담 후 안내"></td>'+
      '<td><input type="text" value="'+esc(r.note)+'" oninput="upd('+i+',\\'note\\',this.value)" placeholder="비고"></td>'+
      '<td><span class="pub-toggle '+(r.is_published?'on':'')+'" onclick="togglePub('+i+')"><span class="sw"></span><span class="lbl">'+(r.is_published?'공개':'비공개')+'</span></span></td>'+
      '<td><button class="row-del" onclick="delRow('+i+')" title="삭제"><i class="fas fa-trash"></i></button></td>'+
    '</tr>';
  });
  html += '</tbody></table>';
  document.getElementById('tableWrap').innerHTML = html;
}

function upd(i,field,val){ rows[i][field]=val; }
function togglePub(i){ rows[i].is_published = rows[i].is_published?0:1; render(); }
function delRow(i){ rows.splice(i,1); if(rows.length===0) addRow(true); render(); }
function addRow(silent){ rows.push({category:'',name:'',price:'',note:'',is_published:1}); if(!silent) render(); }

async function save(){
  const btn=document.getElementById('saveBtn');
  btn.disabled=true; btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> 저장 중';
  const items = rows
    .filter(r=>(r.name||'').trim().length>0)
    .map((r,i)=>({ category:(r.category||'기타').trim()||'기타', name:r.name.trim(), price:(r.price||'').trim(), note:(r.note||'').trim(), is_published:r.is_published?1:0, sort_order:(i+1)*10 }));
  try{
    const res = await fetch('/api/fees/save', { method:'POST', headers:authHeaders(), body:JSON.stringify({items}) });
    if(res.status===401){ localStorage.removeItem('admin_token'); location.href='/admin/login'; return; }
    const data = await res.json();
    if(data.success){ showStatus('<i class="fas fa-check-circle"></i> 저장되었습니다. ('+data.count+'개 항목)', 'success'); }
    else{ showStatus('<i class="fas fa-exclamation-triangle"></i> 저장 실패: '+esc(data.error||''), 'error'); }
  }catch(e){ showStatus('<i class="fas fa-exclamation-triangle"></i> 저장 실패: '+esc(e.message), 'error'); }
  btn.disabled=false; btn.innerHTML='<i class="fas fa-save"></i> 저장';
}

load();
</script>
</body>
</html>`
}
