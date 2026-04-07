// 게시판 페이지 렌더러 — 비포애프터, 블로그, 공지사항
// 리스트 페이지, 상세 페이지, 관리자 작성/수정 페이지
import { head, nav, footer, scripts } from './layout'

// ==========================================
// 게시판별 설정
// ==========================================
const BOARD_CONFIG: Record<string, {
  name: string;
  nameEn: string;
  slug: string;
  metaDesc: string;
  heroImg: string;
  navKey: string;
}> = {
  'before-after': {
    name: '비포 & 애프터',
    nameEn: 'Before & After',
    slug: 'before-after',
    metaDesc: '행복한예인치과 비포 & 애프터 - 실제 치료 전후 사진으로 확인하는 치료 결과. 임플란트, 보존, 심미, 교정 치료 사례.',
    heroImg: '/static/img/treat-1.jpg',
    navKey: 'before-after',
  },
  'blog': {
    name: '블로그',
    nameEn: 'Blog',
    slug: 'blog',
    metaDesc: '행복한예인치과 블로그 - 치과 진료 정보, 구강 건강 팁, 치료 후기, 병원 소식을 전합니다.',
    heroImg: '/static/img/consult-2.jpg',
    navKey: 'blog',
  },
  'notice': {
    name: '공지사항',
    nameEn: 'Notice',
    slug: 'notice',
    metaDesc: '행복한예인치과 공지사항 - 진료 안내, 휴진 일정, 병원 소식을 안내합니다.',
    heroImg: '/static/img/dr-han-logo.jpg',
    navKey: 'notice',
  }
}

// ==========================================
// 공통 게시판 CSS
// ==========================================
const boardCSS = `
/* ===== BOARD LIST ===== */
.board-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:60px;}
.board-card{background:var(--dark-card);border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);transition:all 0.5s;cursor:pointer;text-decoration:none;color:inherit;display:block;}
.board-card:hover{border-color:rgba(247,186,24,0.2);transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,0.3);}
.board-card-img{aspect-ratio:16/10;overflow:hidden;position:relative;background:var(--dark);}
.board-card-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s;}
.board-card:hover .board-card-img img{transform:scale(1.06);}
.board-card-img .no-img{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--gray);font-size:2rem;}
.board-card-body{padding:24px;}
.board-card-body h3{font-family:var(--font-kr);font-size:1.05rem;font-weight:600;margin-bottom:10px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.board-card-meta{font-family:var(--font-mono);font-size:0.72rem;color:var(--gray);letter-spacing:1px;display:flex;gap:16px;align-items:center;}
.board-card-meta i{font-size:0.65rem;color:var(--gold);opacity:0.6;}
.board-card-author{display:flex;align-items:center;gap:12px;padding-top:14px;margin-top:14px;border-top:1px solid rgba(255,255,255,0.06);}
.board-card-author img{width:32px;height:32px;border-radius:50%;object-fit:cover;border:2px solid rgba(247,186,24,0.25);flex-shrink:0;}
.board-card-author .author-text{display:flex;flex-direction:column;gap:1px;}
.board-card-author .author-name{font-family:var(--font-kr);font-size:0.82rem;font-weight:600;color:var(--white);}
.board-card-author .author-role{font-family:var(--font-kr);font-size:0.65rem;color:var(--gold);font-weight:400;letter-spacing:0.5px;}

/* BEFORE-AFTER CARD */
.ba-card{background:var(--dark-card);border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);transition:all 0.5s;cursor:pointer;text-decoration:none;color:inherit;display:block;}
.ba-card:hover{border-color:rgba(247,186,24,0.2);transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,0.3);}
.ba-photos{display:grid;grid-template-columns:1fr 1fr;gap:2px;overflow:hidden;}
.ba-photos .ba-photo{aspect-ratio:4/3;overflow:hidden;position:relative;background:var(--dark);}
.ba-photos .ba-photo img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s;}
.ba-card:hover .ba-photo img{transform:scale(1.04);}
.ba-photo-label{position:absolute;bottom:8px;left:8px;font-family:var(--font-display);font-size:0.55rem;text-transform:uppercase;letter-spacing:2px;color:var(--white);background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);padding:4px 10px;border-radius:6px;font-weight:600;}
.ba-photo-label.after-label{background:rgba(247,186,24,0.8);color:var(--black);}
.ba-card-body{padding:20px 24px;}
.ba-card-body h3{font-family:var(--font-kr);font-size:1rem;font-weight:600;margin-bottom:8px;line-height:1.5;}
.ba-card-meta{font-family:var(--font-mono);font-size:0.72rem;color:var(--gray);letter-spacing:1px;}

/* NOTICE LIST (TABLE) */
.notice-table{width:100%;margin-top:60px;border-collapse:collapse;}
.notice-table th{font-family:var(--font-display);font-size:0.65rem;text-transform:uppercase;letter-spacing:3px;color:var(--gold);padding:16px 20px;border-bottom:2px solid rgba(247,186,24,0.2);text-align:left;font-weight:600;}
.notice-table td{font-family:var(--font-kr);font-size:0.92rem;padding:20px;border-bottom:1px solid rgba(255,255,255,0.06);color:var(--gray-light);font-weight:400;}
.notice-table tr{transition:all 0.3s;cursor:pointer;}
.notice-table tbody tr:hover{background:rgba(247,186,24,0.03);}
.notice-table .nt-title{color:var(--white);font-weight:500;max-width:500px;}
.notice-table .nt-title a{color:inherit;transition:color 0.3s;}
.notice-table .nt-title a:hover{color:var(--gold);}
.notice-table .nt-date{font-family:var(--font-mono);font-size:0.8rem;color:var(--gray);letter-spacing:1px;white-space:nowrap;}
.notice-table .nt-views{font-family:var(--font-mono);font-size:0.8rem;color:var(--gray);text-align:center;}
.notice-has-img{color:var(--gold);font-size:0.7rem;margin-left:6px;}

/* ===== BOARD DETAIL ===== */
.board-detail{max-width:900px;margin:0 auto;}
.board-detail-title{font-family:var(--font-kr);font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;letter-spacing:-1px;margin-bottom:16px;line-height:1.4;}
.board-detail-meta{font-family:var(--font-mono);font-size:0.75rem;color:var(--gray);letter-spacing:1px;margin-bottom:20px;display:flex;gap:20px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.06);}
/* AUTHOR CARD (DETAIL) */
.detail-author-card{display:flex;align-items:center;gap:20px;padding:24px 28px;background:linear-gradient(135deg,rgba(247,186,24,0.06),rgba(26,26,26,0.9));border:1px solid rgba(247,186,24,0.15);border-radius:20px;margin:24px 0 48px;transition:all 0.4s;position:relative;overflow:hidden;}
.detail-author-card::before{content:'';position:absolute;top:0;left:0;width:4px;height:100%;background:var(--gold);border-radius:4px 0 0 4px;}
.detail-author-card:hover{border-color:rgba(247,186,24,0.3);transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,0.3);}
.detail-author-card img{width:60px;height:60px;border-radius:50%;object-fit:cover;object-position:center top;border:2.5px solid rgba(247,186,24,0.4);flex-shrink:0;box-shadow:0 4px 20px rgba(247,186,24,0.15);}
.detail-author-info{display:flex;flex-direction:column;gap:4px;min-width:0;}
.detail-author-info .author-name{font-family:var(--font-kr);font-size:1.1rem;font-weight:800;color:var(--white);letter-spacing:-0.5px;line-height:1.3;}
.detail-author-info .author-role{font-family:var(--font-display);font-size:0.7rem;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:2px;}
.detail-author-info .author-desc{font-family:var(--font-kr);font-size:0.75rem;color:var(--gray-light);font-weight:300;margin-top:2px;line-height:1.6;}
@media(max-width:480px){
.detail-author-card{padding:20px 20px 20px 24px;gap:16px;}
.detail-author-card img{width:48px;height:48px;}
.detail-author-info .author-name{font-size:0.95rem;}
.detail-author-info .author-role{font-size:0.6rem;letter-spacing:1.5px;}
.detail-author-info .author-desc{font-size:0.7rem;}
}
.board-detail-content{font-family:var(--font-kr);font-size:1rem;line-height:2.2;color:var(--gray-light);font-weight:300;}
.board-detail-content h2{font-size:1.6rem;font-weight:900;color:var(--gold);margin:48px 0 20px;letter-spacing:-1px;border-bottom:2px solid rgba(247,186,24,0.15);padding-bottom:12px;line-height:1.4;}
.board-detail-content h3{font-size:1.2rem;font-weight:700;color:var(--white);margin:36px 0 16px;letter-spacing:-0.5px;line-height:1.4;}
.board-detail-content p{margin-bottom:20px;}
.board-detail-content img{width:100%;border-radius:16px;margin:28px 0;}
.board-detail-content strong{color:var(--white);font-weight:600;}
.board-detail-content em{color:var(--gold);}
.board-detail-content ul,.board-detail-content ol{margin:16px 0 24px 24px;font-size:0.95rem;line-height:2.2;}
.board-detail-content ul li{list-style:disc;margin-bottom:6px;}
.board-detail-content ol li{list-style:decimal;margin-bottom:6px;}
.board-detail-content blockquote{border-left:3px solid var(--gold);padding:16px 24px;margin:24px 0;background:rgba(247,186,24,0.04);border-radius:0 12px 12px 0;font-style:italic;}

/* BEFORE-AFTER DETAIL */
.ba-detail-grid{display:grid;gap:48px;margin-bottom:48px;}
.ba-detail-pair{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start;}
.ba-detail-pair-label{font-family:var(--font-display);font-size:0.7rem;text-transform:uppercase;letter-spacing:4px;color:var(--gold);font-weight:600;margin-bottom:16px;grid-column:span 2;}
.ba-detail-img{border-radius:16px;overflow:hidden;position:relative;}
.ba-detail-img img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;}
.ba-detail-img .ba-label{position:absolute;top:12px;left:12px;font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:2px;padding:6px 14px;border-radius:8px;font-weight:700;}
.ba-label-before{background:rgba(255,255,255,0.9);color:var(--black);}
.ba-label-after{background:var(--gold);color:var(--black);}

/* DETAIL IMAGES (blog/notice) */
.board-detail-images{margin:32px 0;display:flex;flex-direction:column;gap:20px;}
.board-detail-images img{width:100%;border-radius:16px;}

/* PAGINATION */
.board-pagination{display:flex;justify-content:center;gap:8px;margin-top:60px;}
.board-pagination a,.board-pagination span{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;font-family:var(--font-mono);font-size:0.85rem;transition:all 0.3s;border:1px solid rgba(255,255,255,0.06);}
.board-pagination a{color:var(--gray-light);cursor:pointer;}
.board-pagination a:hover{border-color:var(--gold);color:var(--gold);background:rgba(247,186,24,0.05);}
.board-pagination .active{background:var(--gold);color:var(--black);border-color:var(--gold);font-weight:700;}

/* BACK BUTTON */
.board-back{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display);font-size:0.7rem;text-transform:uppercase;letter-spacing:3px;color:var(--gray);transition:color 0.3s;margin-bottom:40px;font-weight:500;}
.board-back:hover{color:var(--gold);}
.board-back i{font-size:0.6rem;}

/* ADMIN BUTTON */
.admin-fab{position:fixed;bottom:32px;right:32px;z-index:9000;background:var(--gold);color:var(--black);width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;cursor:pointer;transition:all 0.3s;box-shadow:0 8px 32px rgba(247,186,24,0.4);border:none;}
.admin-fab:hover{transform:scale(1.1);box-shadow:0 12px 40px rgba(247,186,24,0.5);}

/* ===== ADMIN WRITE/EDIT FORM ===== */
.admin-form{max-width:900px;margin:0 auto;}
.form-group{margin-bottom:32px;}
.form-label{display:block;font-family:var(--font-display);font-size:0.7rem;text-transform:uppercase;letter-spacing:3px;color:var(--gold);font-weight:600;margin-bottom:12px;}
.form-input{width:100%;padding:16px 20px;background:var(--dark-card);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:var(--white);font-family:var(--font-kr);font-size:1rem;transition:border-color 0.3s;outline:none;}
.form-input:focus{border-color:var(--gold);}
.form-textarea{min-height:200px;resize:vertical;line-height:2;}
.form-hint{font-family:var(--font-kr);font-size:0.78rem;color:var(--gray);margin-top:8px;font-weight:300;}

/* IMAGE UPLOAD ZONE */
.upload-zone{border:2px dashed rgba(247,186,24,0.2);border-radius:16px;padding:40px;text-align:center;cursor:pointer;transition:all 0.3s;background:rgba(247,186,24,0.02);}
.upload-zone:hover,.upload-zone.dragover{border-color:var(--gold);background:rgba(247,186,24,0.06);}
.upload-zone i{font-size:2rem;color:var(--gold);margin-bottom:16px;display:block;}
.upload-zone p{font-family:var(--font-kr);font-size:0.88rem;color:var(--gray);font-weight:300;}
.upload-zone .upload-hint{font-size:0.75rem;margin-top:8px;}

/* IMAGE PREVIEW */
.upload-previews{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:16px;margin-top:20px;}
.upload-preview{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:1;background:var(--dark);}
.upload-preview img{width:100%;height:100%;object-fit:cover;}
.upload-preview-remove{position:absolute;top:6px;right:6px;width:28px;height:28px;border-radius:50%;background:rgba(255,0,0,0.8);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.75rem;transition:transform 0.2s;}
.upload-preview-remove:hover{transform:scale(1.15);}
.upload-preview-label{position:absolute;bottom:0;left:0;right:0;padding:4px 8px;background:rgba(0,0,0,0.7);font-family:var(--font-kr);font-size:0.7rem;color:var(--gray-light);text-align:center;}

/* BA 이미지 슬롯 */
.ba-upload-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:16px;}
.ba-upload-slot{border:2px dashed rgba(255,255,255,0.1);border-radius:16px;aspect-ratio:4/3;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;background:var(--dark);}
.ba-upload-slot:hover{border-color:var(--gold);background:rgba(247,186,24,0.03);}
.ba-upload-slot.has-image{border-style:solid;border-color:rgba(247,186,24,0.3);}
.ba-upload-slot.has-image img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
.ba-upload-slot .slot-label{font-family:var(--font-display);font-size:0.6rem;text-transform:uppercase;letter-spacing:3px;color:var(--gray);margin-bottom:8px;font-weight:600;z-index:1;}
.ba-upload-slot .slot-icon{font-size:1.5rem;color:var(--gold);opacity:0.4;z-index:1;}
.ba-upload-slot .slot-remove{position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;background:rgba(255,0,0,0.8);color:#fff;border:none;cursor:pointer;font-size:0.7rem;z-index:2;display:none;align-items:center;justify-content:center;}
.ba-upload-slot.has-image .slot-remove{display:flex;}
.ba-upload-slot.has-image .slot-label,.ba-upload-slot.has-image .slot-icon{display:none;}

/* SEO EDITOR TOOLBAR */
.seo-toolbar{display:flex;flex-wrap:wrap;gap:4px;padding:10px 12px;background:var(--dark-card);border:1px solid rgba(255,255,255,0.1);border-bottom:none;border-radius:12px 12px 0 0;}
.tb-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:var(--gray-light);padding:8px 14px;border-radius:8px;cursor:pointer;font-family:var(--font-display);font-size:0.72rem;font-weight:600;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;}
.tb-btn:hover{background:rgba(247,186,24,0.12);border-color:var(--gold);color:var(--gold);}
.tb-btn b{font-size:0.8rem;}
.tb-btn-img{background:rgba(3,199,90,0.08);border-color:rgba(3,199,90,0.2);color:#03C75A;}
.tb-btn-img:hover{background:rgba(3,199,90,0.18);border-color:#03C75A;}
.tb-sep{width:1px;height:28px;background:rgba(255,255,255,0.08);margin:0 6px;align-self:center;}
.seo-hint{padding:10px 14px;background:rgba(247,186,24,0.04);border-left:3px solid var(--gold);border-radius:0 0 0 0;font-family:var(--font-kr);font-size:0.75rem;color:var(--gray);font-weight:300;margin-bottom:8px;}
.seo-hint i{color:var(--gold);margin-right:6px;}
.seo-toolbar+.seo-hint+.form-input{border-radius:0 0 12px 12px;}

/* SEO PREVIEW */
.seo-preview{background:var(--dark-card);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:32px;min-height:120px;}
.seo-preview h2{font-family:var(--font-kr);font-size:1.6rem;font-weight:900;margin:32px 0 16px;letter-spacing:-1px;color:var(--gold);border-bottom:2px solid rgba(247,186,24,0.15);padding-bottom:12px;}
.seo-preview h3{font-family:var(--font-kr);font-size:1.2rem;font-weight:700;margin:24px 0 12px;color:var(--white);}
.seo-preview p{font-family:var(--font-kr);font-size:0.95rem;line-height:2;color:var(--gray-light);font-weight:300;margin-bottom:16px;}
.seo-preview strong{color:var(--white);font-weight:600;}
.seo-preview em{color:var(--gold);}
.seo-preview ul{margin:12px 0 20px 20px;font-family:var(--font-kr);font-size:0.92rem;line-height:2.2;color:var(--gray-light);}
.seo-preview ul li{margin-bottom:4px;list-style:disc;}
.seo-preview blockquote{border-left:3px solid var(--gold);padding:16px 20px;margin:16px 0;background:rgba(247,186,24,0.04);border-radius:0 12px 12px 0;font-style:italic;color:var(--gray-light);}
.seo-preview img{width:100%;max-width:100%;border-radius:16px;margin:24px 0;}

/* INLINE IMAGE INSERT INDICATOR */
.inline-img-inserting{opacity:0.5;pointer-events:none;}

/* FORM BUTTONS */
.form-actions{display:flex;gap:16px;margin-top:48px;justify-content:flex-end;}
.form-actions .btn{min-width:160px;}

/* EMPTY STATE */
.board-empty{text-align:center;padding:100px 24px;}
.board-empty i{font-size:3rem;color:var(--gold);opacity:0.2;margin-bottom:24px;}
.board-empty p{font-family:var(--font-kr);font-size:1rem;color:var(--gray);font-weight:300;}

/* RESPONSIVE */
@media(max-width:1024px){
  .board-grid{grid-template-columns:repeat(2,1fr);}
  .ba-detail-pair{grid-template-columns:1fr;}
  .ba-detail-pair-label{grid-column:span 1;}
}
@media(max-width:768px){
  .board-grid{grid-template-columns:1fr;max-width:500px;margin-left:auto;margin-right:auto;gap:20px;margin-top:40px;}
  .board-card-body{padding:20px;}
  .board-card-body h3{font-size:0.95rem;}
  .board-card-meta{font-size:0.68rem;gap:10px;}
  .board-card-img{aspect-ratio:16/9;}
  .ba-card-body{padding:16px 20px;}
  .ba-card-body h3{font-size:0.92rem;}
  .ba-card-meta{font-size:0.68rem;}
  .notice-table{margin-top:40px;}
  .notice-table th{font-size:0.55rem;padding:12px 10px;letter-spacing:2px;}
  .notice-table td{font-size:0.85rem;padding:14px 10px;}
  .notice-table .nt-title{max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .notice-table th:nth-child(1),.notice-table td:nth-child(1){display:none;}
  .board-detail-title{font-size:clamp(1.3rem,4vw,1.8rem);}
  .board-detail-meta{font-size:0.7rem;gap:14px;margin-bottom:32px;padding-bottom:20px;}
  .board-detail-content{font-size:0.92rem;line-height:2;}
  .ba-detail-pair{grid-template-columns:1fr;gap:12px;}
  .ba-detail-pair-label{grid-column:span 1;font-size:0.62rem;margin-bottom:12px;}
  .board-back{margin-bottom:24px;font-size:0.62rem;}
  .board-pagination{margin-top:40px;gap:6px;}
  .board-pagination a,.board-pagination span{width:36px;height:36px;font-size:0.78rem;}
  .ba-upload-grid{grid-template-columns:1fr;}
  .form-group{margin-bottom:24px;}
  .form-label{font-size:0.62rem;margin-bottom:10px;}
  .form-input{padding:14px 16px;font-size:0.92rem;}
  .form-textarea{min-height:160px;}
  .upload-zone{padding:28px 16px;}
  .upload-zone i{font-size:1.5rem;margin-bottom:12px;}
  .upload-zone p{font-size:0.82rem;}
  .upload-previews{grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px;}
  .form-actions{flex-direction:column;gap:12px;margin-top:32px;}
  .form-actions .btn{width:100%;}
  .board-empty{padding:60px 20px;}
  .board-empty i{font-size:2rem;margin-bottom:16px;}
  .board-empty p{font-size:0.88rem;}
}
@media(max-width:480px){
  .notice-table th:nth-child(3),.notice-table td:nth-child(3){display:none;}
  .notice-table td{font-size:0.8rem;padding:12px 8px;}
  .board-detail-title{font-size:clamp(1.1rem,4vw,1.5rem);}
  .board-card-body h3{font-size:0.88rem;}
}
`;

// ==========================================
// 블로그 작성자 설정 (카드 + 상세페이지)
// ==========================================
const BLOG_AUTHORS: Record<string, { name: string; role: string; img: string }> = {
  default: { name: '한승대 원장', role: '통합치의학과 전문의 · 대표원장', img: '/static/img/dr-han-logo.jpg' },
}

// ==========================================
// SEO 에디터 HTML (작성/수정 공통)
// ==========================================
function seoEditorHTML() {
  return `
      <div class="form-group">
        <label class="form-label">본문 <span style="font-size:0.7rem;color:var(--gray);font-weight:300;">(SEO 최적화 에디터)</span></label>
        <div class="seo-toolbar">
          <button type="button" class="tb-btn" onclick="insertTag('h2')" title="대제목 (H2)"><b>H2</b></button>
          <button type="button" class="tb-btn" onclick="insertTag('h3')" title="소제목 (H3)"><b>H3</b></button>
          <button type="button" class="tb-btn" onclick="insertTag('p')" title="본문 단락"><b>P</b></button>
          <span class="tb-sep"></span>
          <button type="button" class="tb-btn" onclick="insertTag('strong')" title="굵게"><i class="fas fa-bold"></i></button>
          <button type="button" class="tb-btn" onclick="insertTag('em')" title="기울임"><i class="fas fa-italic"></i></button>
          <span class="tb-sep"></span>
          <button type="button" class="tb-btn" onclick="insertTag('ul')" title="목록"><i class="fas fa-list-ul"></i></button>
          <button type="button" class="tb-btn" onclick="insertTag('blockquote')" title="인용"><i class="fas fa-quote-left"></i></button>
          <span class="tb-sep"></span>
          <button type="button" class="tb-btn tb-btn-img" onclick="triggerInlineImage()" title="본문 중간에 이미지 삽입">
            <i class="fas fa-image"></i> 사진 삽입
          </button>
          <input type="file" id="inlineImgInput" accept="image/*" style="display:none">
        </div>
        <div class="seo-hint">
          <i class="fas fa-lightbulb"></i> <b>SEO 팁:</b> H2로 큰 주제, H3로 세부 주제를 나누세요. 본문 사이사이에 이미지를 삽입하면 검색엔진·AI 노출에 유리합니다.
        </div>
        <textarea id="postContent" class="form-input form-textarea" placeholder="본문을 작성하세요.

H2, H3 버튼으로 제목 구조를 잡고,
사진 삽입 버튼으로 본문 사이에 이미지를 넣으세요.

예시:
<h2>발치즉시 임플란트란?</h2>
<p>발치즉시 임플란트는 치아를 발치하는 동시에 임플란트를 식립하는 술식입니다.</p>

<h3>치료 과정</h3>
<p>1단계: 정밀 진단 및 CT 촬영을 통해...</p>" rows="20"></textarea>
      </div>

      <!-- 본문 미리보기 -->
      <div class="form-group">
        <label class="form-label">미리보기 <span style="font-size:0.65rem;color:var(--gray);font-weight:300;">(실시간 반영)</span></label>
        <div class="seo-preview" id="seoPreview">
          <p style="color:var(--gray);font-size:0.85rem;">본문을 입력하면 여기에 미리보기가 표시됩니다.</p>
        </div>
      </div>`;
}

// SEO 에디터 JavaScript (작성/수정 공통)
function seoEditorJS() {
  return `
// ===== SEO EDITOR =====
const contentEl = document.getElementById('postContent');
const previewEl = document.getElementById('seoPreview');
const inlineInput = document.getElementById('inlineImgInput');

// 실시간 미리보기
contentEl.addEventListener('input', updatePreview);
function updatePreview() {
  const val = contentEl.value.trim();
  if (!val) {
    previewEl.innerHTML = '<p style="color:var(--gray);font-size:0.85rem;">본문을 입력하면 여기에 미리보기가 표시됩니다.</p>';
    return;
  }
  // 간단한 XSS 방지: script 태그 제거
  let safe = val.replace(/<script[^>]*>[\\\\s\\\\S]*?<\\\\/script>/gi, '');
  previewEl.innerHTML = safe;
}

// 태그 삽입
function insertTag(tag) {
  const start = contentEl.selectionStart;
  const end = contentEl.selectionEnd;
  const selected = contentEl.value.substring(start, end);
  const val = contentEl.value;
  let insert = '';

  if (tag === 'h2') {
    insert = selected ? '<h2>' + selected + '</h2>' : '<h2>제목을 입력하세요</h2>';
  } else if (tag === 'h3') {
    insert = selected ? '<h3>' + selected + '</h3>' : '<h3>소제목을 입력하세요</h3>';
  } else if (tag === 'p') {
    insert = selected ? '<p>' + selected + '</p>' : '<p>본문 내용을 입력하세요.</p>';
  } else if (tag === 'strong') {
    insert = selected ? '<strong>' + selected + '</strong>' : '<strong>굵은 텍스트</strong>';
  } else if (tag === 'em') {
    insert = selected ? '<em>' + selected + '</em>' : '<em>기울임 텍스트</em>';
  } else if (tag === 'ul') {
    insert = '<ul>\\n  <li>' + (selected || '항목 1') + '</li>\\n  <li>항목 2</li>\\n</ul>';
  } else if (tag === 'blockquote') {
    insert = '<blockquote>' + (selected || '인용 내용') + '</blockquote>';
  }

  // 앞뒤에 줄바꿈 추가 (블록 태그)
  const blockTags = ['h2','h3','p','ul','blockquote'];
  if (blockTags.includes(tag)) {
    const before = val.substring(0, start);
    const after = val.substring(end);
    const needNewlineBefore = before.length > 0 && !before.endsWith('\\n') && !before.endsWith('\\n\\n');
    const needNewlineAfter = after.length > 0 && !after.startsWith('\\n');
    insert = (needNewlineBefore ? '\\n\\n' : '') + insert + (needNewlineAfter ? '\\n\\n' : '');
  }

  contentEl.value = val.substring(0, start) + insert + val.substring(end);
  contentEl.focus();
  const newPos = start + insert.length;
  contentEl.setSelectionRange(newPos, newPos);
  updatePreview();
}

// 인라인 이미지 삽입
function triggerInlineImage() {
  inlineInput.click();
}

inlineInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = '';
  
  if (!file.type.startsWith('image/')) {
    alert('이미지 파일만 업로드 가능합니다.');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    alert('파일 크기는 10MB 이하만 가능합니다.');
    return;
  }

  // 커서 위치 저장
  const cursorPos = contentEl.selectionStart;
  
  // 업로드 중 표시
  const val = contentEl.value;
  const placeholder = '[이미지 업로드 중...]';
  contentEl.value = val.substring(0, cursorPos) + placeholder + val.substring(cursorPos);
  updatePreview();

  const url = await uploadFile(file);
  
  if (url) {
    // placeholder를 실제 img 태그로 교체
    const imgTag = '\\n<img src="' + url + '" alt="' + (file.name.replace(/\\\\.[^.]+$/, '').replace(/[<>"]/g, '')) + '">\\n';
    contentEl.value = contentEl.value.replace(placeholder, imgTag);
  } else {
    // 실패 시 placeholder 제거
    contentEl.value = contentEl.value.replace(placeholder, '');
  }
  updatePreview();
});
// 초기 미리보기
updatePreview();
`;
}

// ==========================================
// 리스트 페이지
// ==========================================
export function boardListPage(board: string): string {
  const cfg = BOARD_CONFIG[board]
  if (!cfg) return ''

  return `${head({ title: cfg.name, description: cfg.metaDesc, path: `/${cfg.slug}` })}
${nav(cfg.navKey)}

<!-- HERO -->
<section class="sub-hero">
  <div class="sub-hero-bg">
    <img src="${cfg.heroImg}" alt="${cfg.name}">
    <div class="sub-hero-overlay"></div>
  </div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">${cfg.nameEn}</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">${cfg.nameEn}</div>
    <h1><em>${cfg.name}</em></h1>
  </div>
</section>

<style>${boardCSS}</style>

<section class="page-section bg-black">
  <div class="page-inner">
    <div class="sec-label">${cfg.nameEn}</div>
    <h2 class="sec-title rv">${cfg.name === '비포 & 애프터' ? '실제 <em>치료 사례</em>' : cfg.name === '블로그' ? '치과 <em>이야기</em>' : '<em>병원</em> 소식'}</h2>

    <div id="boardList"></div>
    <div id="boardPagination"></div>

    <!-- EMPTY STATE (JS가 바꿔줌) -->
    <div id="boardEmpty" class="board-empty" style="display:none;">
      <i class="fas fa-folder-open"></i>
      <p>아직 등록된 ${cfg.name === '비포 & 애프터' ? '사례' : '글'}이 없습니다.</p>
    </div>
  </div>
</section>



${footer()}

<script>
const BOARD = '${board}';
const BOARD_SLUG = '${cfg.slug}';

async function loadPosts(page = 1) {
  try {
    const res = await fetch('/api/boards/' + BOARD + '?page=' + page + '&limit=12');
    const data = await res.json();
    
    const listEl = document.getElementById('boardList');
    const pagEl = document.getElementById('boardPagination');
    const emptyEl = document.getElementById('boardEmpty');

    if (!data.posts || data.posts.length === 0) {
      listEl.innerHTML = '';
      pagEl.innerHTML = '';
      emptyEl.style.display = 'block';
      return;
    }
    emptyEl.style.display = 'none';

    ${board === 'before-after' ? `
    // 비포애프터 카드
    listEl.innerHTML = '<div class="board-grid">' + data.posts.map(p => {
      const thumb = p.thumbnail_url ? '<img src="' + p.thumbnail_url + '" alt="">' : '<div class="no-img"><i class="fas fa-image"></i></div>';
      return '<a href="/' + BOARD_SLUG + '/' + p.id + '" class="ba-card rv">' +
        '<div class="ba-photos"><div class="ba-photo">' + thumb + '</div></div>' +
        '<div class="ba-card-body"><h3>' + escHtml(p.title) + '</h3>' +
        '<div class="ba-card-meta">' + formatDate(p.created_at) + ' &middot; <i class="fas fa-eye"></i> ' + p.view_count + '</div></div></a>';
    }).join('') + '</div>';
    ` : board === 'notice' ? `
    // 공지사항 테이블
    listEl.innerHTML = '<table class="notice-table"><thead><tr><th style="width:60px;text-align:center;">No.</th><th>제목</th><th style="width:100px;">조회</th><th style="width:120px;">날짜</th></tr></thead><tbody>' +
      data.posts.map((p, i) => {
        const num = data.pagination.total - ((data.pagination.page - 1) * data.pagination.limit) - i;
        return '<tr onclick="location.href=\\'/notice/' + p.id + '\\'">' +
          '<td style="text-align:center;font-family:var(--font-mono);font-size:0.8rem;color:var(--gray);">' + num + '</td>' +
          '<td class="nt-title"><a href="/notice/' + p.id + '">' + escHtml(p.title) + (p.image_count > 0 ? ' <i class="fas fa-image notice-has-img"></i>' : '') + '</a></td>' +
          '<td class="nt-views" style="text-align:center;">' + p.view_count + '</td>' +
          '<td class="nt-date">' + formatDate(p.created_at) + '</td></tr>';
      }).join('') + '</tbody></table>';
    ` : `
    // 블로그 카드
    listEl.innerHTML = '<div class="board-grid">' + data.posts.map(p => {
      const thumb = p.thumbnail_url ? '<img src="' + p.thumbnail_url + '" alt="">' : '<div class="no-img"><i class="fas fa-pen-nib"></i></div>';
      return '<a href="/' + BOARD_SLUG + '/' + p.id + '" class="board-card rv">' +
        '<div class="board-card-img">' + thumb + '</div>' +
        '<div class="board-card-body"><h3>' + escHtml(p.title) + '</h3>' +
        '<div class="board-card-meta"><span><i class="far fa-calendar-alt"></i> ' + formatDate(p.created_at) + '</span><span><i class="fas fa-eye"></i> ' + p.view_count + '</span></div>' +
        '<div class="board-card-author"><img src="/static/img/dr-han-profile.jpg" alt="한승대 대표원장"><div class="author-text"><span class="author-name">한승대 대표원장</span><span class="author-role">통합치의학과 전문의</span></div></div>' +
        '</div></a>';
    }).join('') + '</div>';
    `}

    // 페이지네이션
    const { page: cp, totalPages: tp } = data.pagination;
    if (tp > 1) {
      let html = '<div class="board-pagination">';
      if (cp > 1) html += '<a onclick="loadPosts(' + (cp - 1) + ')"><i class="fas fa-chevron-left"></i></a>';
      for (let i = 1; i <= tp; i++) {
        html += i === cp ? '<span class="active">' + i + '</span>' : '<a onclick="loadPosts(' + i + ')">' + i + '</a>';
      }
      if (cp < tp) html += '<a onclick="loadPosts(' + (cp + 1) + ')"><i class="fas fa-chevron-right"></i></a>';
      html += '</div>';
      pagEl.innerHTML = html;
    } else {
      pagEl.innerHTML = '';
    }

    // reveal 재초기화 (io는 layout scripts()에서 선언)
    if (typeof io !== 'undefined') {
      document.querySelectorAll('.rv:not(.vis)').forEach(el => io.observe(el));
    }
  } catch (err) {
    console.error('Failed to load posts:', err);
  }
}

function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function formatDate(d) { if (!d) return ''; return d.substring(0, 10); }

// init
loadPosts(1);
</script>
${scripts()}`
}


// ==========================================
// 상세 페이지
// ==========================================
export function boardDetailPage(board: string): string {
  const cfg = BOARD_CONFIG[board]
  if (!cfg) return ''

  return `${head({ title: cfg.name + ' 상세', description: cfg.metaDesc, path: `/${cfg.slug}`, noindex: true })}
${nav(cfg.navKey)}

<style>${boardCSS}</style>

<section class="page-section bg-black" style="padding-top:140px;">
  <div class="page-inner">
    <a href="/${cfg.slug}" class="board-back"><i class="fas fa-arrow-left"></i> ${cfg.nameEn} 목록으로</a>
    <div class="board-detail" id="detailWrap">
      <div style="text-align:center;padding:60px;"><i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--gold);opacity:0.3;"></i></div>
    </div>
  </div>
</section>

${footer()}

<script>
const BOARD = '${board}';
const BOARD_SLUG = '${cfg.slug}';
const postId = window.location.pathname.split('/').pop();

async function loadDetail() {
  try {
    const res = await fetch('/api/boards/' + BOARD + '/' + postId);
    const data = await res.json();
    if (!data.post) {
      document.getElementById('detailWrap').innerHTML = '<div class="board-empty"><i class="fas fa-exclamation-circle"></i><p>게시글을 찾을 수 없습니다.</p></div>';
      return;
    }

    const post = data.post;
    const images = data.images || [];
    let html = '';

    html += '<h1 class="board-detail-title">' + escHtml(post.title) + '</h1>';
    html += '<div class="board-detail-meta"><span><i class="far fa-calendar-alt"></i> ' + formatDate(post.created_at) + '</span><span><i class="fas fa-eye"></i> ' + post.view_count + '</span></div>';

    ${board === 'blog' ? `
    // 블로그 작성자 카드
    html += '<div class="detail-author-card"><img src="/static/img/dr-han-profile.jpg" alt="한승대 대표원장 프로필"><div class="detail-author-info"><span class="author-name">한승대 대표원장</span><span class="author-role">Integrative Dentistry Specialist</span><span class="author-desc">통합치의학과 전문의 · 치의학 박사 · 경희대 치의학전문대학원<br>13년간 한자리에서 쌓아온 신뢰의 치과</span></div></div>';
    ` : ''}

    ${board === 'before-after' ? `
    // 비포애프터: 구내사진, 파노라마 전후 이미지
    const beforeIntra = images.find(i => i.image_type === 'before_intra');
    const afterIntra = images.find(i => i.image_type === 'after_intra');
    const beforePano = images.find(i => i.image_type === 'before_pano');
    const afterPano = images.find(i => i.image_type === 'after_pano');

    html += '<div class="ba-detail-grid">';
    // 구내사진 쌍
    if (beforeIntra || afterIntra) {
      html += '<div>';
      html += '<div class="ba-detail-pair-label">구내 사진 (Intraoral)</div>';
      html += '<div class="ba-detail-pair">';
      if (beforeIntra) {
        html += '<div class="ba-detail-img"><img src="' + beforeIntra.image_url + '" alt="치료 전 구내사진"><div class="ba-label ba-label-before">Before</div></div>';
      }
      if (afterIntra) {
        html += '<div class="ba-detail-img"><img src="' + afterIntra.image_url + '" alt="치료 후 구내사진"><div class="ba-label ba-label-after">After</div></div>';
      }
      html += '</div></div>';
    }
    // 파노라마 쌍
    if (beforePano || afterPano) {
      html += '<div>';
      html += '<div class="ba-detail-pair-label">파노라마 (Panoramic X-ray)</div>';
      html += '<div class="ba-detail-pair">';
      if (beforePano) {
        html += '<div class="ba-detail-img"><img src="' + beforePano.image_url + '" alt="치료 전 파노라마"><div class="ba-label ba-label-before">Before</div></div>';
      }
      if (afterPano) {
        html += '<div class="ba-detail-img"><img src="' + afterPano.image_url + '" alt="치료 후 파노라마"><div class="ba-label ba-label-after">After</div></div>';
      }
      html += '</div></div>';
    }
    html += '</div>';
    ` : `
    // 블로그/공지: 본문 HTML이 이미지를 포함 (인라인)
    // 기존 이미지 갤러리 방식은 사용하지 않음
    `}

    // 본문 (공통) — 블로그/공지는 H태그+인라인 이미지가 포함된 HTML
    if (post.content) {
      html += '<article class="board-detail-content">' + post.content + '</article>';
    }

    // 관리 버튼 (로그인된 관리자만 표시)
    if (localStorage.getItem('admin_token')) {
      html += '<div style="margin-top:48px;display:flex;gap:12px;">';
      html += '<a href="/' + BOARD_SLUG + '/' + postId + '/edit" class="btn btn-outline" style="font-size:0.7rem;padding:12px 28px;"><i class="fas fa-edit"></i> 수정</a>';
      html += '<button onclick="deletePost()" class="btn btn-ghost" style="font-size:0.7rem;padding:12px 28px;border-color:rgba(255,0,0,0.3);color:rgba(255,100,100,0.8);"><i class="fas fa-trash"></i> 삭제</button>';
      html += '<a href="/admin" class="btn btn-ghost" style="font-size:0.7rem;padding:12px 28px;"><i class="fas fa-cog"></i> 관리자</a>';
      html += '</div>';
    }

    document.getElementById('detailWrap').innerHTML = html;
  } catch (err) {
    console.error(err);
    document.getElementById('detailWrap').innerHTML = '<div class="board-empty"><i class="fas fa-exclamation-circle"></i><p>로딩 실패</p></div>';
  }
}

async function deletePost() {
  if (!confirm('정말 삭제하시겠습니까?')) return;
  const token = localStorage.getItem('admin_token');
  const res = await fetch('/api/boards/' + BOARD + '/' + postId, {
    method: 'DELETE',
    headers: token ? { 'Authorization': 'Bearer ' + token } : {}
  });
  if (res.ok) { alert('삭제되었습니다.'); location.href = '/' + BOARD_SLUG; }
  else {
    const data = await res.json().catch(() => ({}));
    alert(data.error || '삭제 실패. 관리자 로그인이 필요합니다.');
  }
}

function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function formatDate(d) { if (!d) return ''; return d.substring(0, 10); }

loadDetail();
</script>
${scripts()}`
}


// ==========================================
// 관리자 작성 페이지
// ==========================================
export function boardWritePage(board: string): string {
  const cfg = BOARD_CONFIG[board]
  if (!cfg) return ''

  return `${head({ title: cfg.name + ' 작성', description: '관리자 글 작성', path: `/${cfg.slug}/write`, noindex: true })}
${nav(cfg.navKey)}

<style>${boardCSS}</style>

<section class="page-section bg-black" style="padding-top:140px;">
  <div class="page-inner">
    <a href="/${cfg.slug}" class="board-back"><i class="fas fa-arrow-left"></i> ${cfg.nameEn} 목록으로</a>
    <div class="admin-form">
      <h2 class="sec-title" style="margin-bottom:48px;"><em>${cfg.name}</em> 새 글 작성</h2>
      
      <div class="form-group">
        <label class="form-label">제목</label>
        <input type="text" id="postTitle" class="form-input" placeholder="제목을 입력하세요">
      </div>

      ${board === 'before-after' ? `
      <!-- BA 이미지 슬롯 -->
      <div class="form-group">
        <label class="form-label">구내 사진 (Intraoral)</label>
        <div class="form-hint">구내 전/후 사진을 업로드하세요. 업로드하지 않은 슬롯은 상세 페이지에서 숨겨집니다.</div>
        <div class="ba-upload-grid">
          <div class="ba-upload-slot" id="slot-before_intra" onclick="triggerSlotUpload('before_intra')">
            <span class="slot-label">Before</span>
            <i class="fas fa-camera slot-icon"></i>
            <button class="slot-remove" onclick="event.stopPropagation();removeSlot('before_intra')">&times;</button>
          </div>
          <div class="ba-upload-slot" id="slot-after_intra" onclick="triggerSlotUpload('after_intra')">
            <span class="slot-label">After</span>
            <i class="fas fa-camera slot-icon"></i>
            <button class="slot-remove" onclick="event.stopPropagation();removeSlot('after_intra')">&times;</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">파노라마 (Panoramic X-ray)</label>
        <div class="form-hint">파노라마 전/후 사진을 업로드하세요. (선택사항)</div>
        <div class="ba-upload-grid">
          <div class="ba-upload-slot" id="slot-before_pano" onclick="triggerSlotUpload('before_pano')">
            <span class="slot-label">Before</span>
            <i class="fas fa-x-ray slot-icon"></i>
            <button class="slot-remove" onclick="event.stopPropagation();removeSlot('before_pano')">&times;</button>
          </div>
          <div class="ba-upload-slot" id="slot-after_pano" onclick="triggerSlotUpload('after_pano')">
            <span class="slot-label">After</span>
            <i class="fas fa-x-ray slot-icon"></i>
            <button class="slot-remove" onclick="event.stopPropagation();removeSlot('after_pano')">&times;</button>
          </div>
        </div>
      </div>
      <input type="file" id="slotFileInput" accept="image/*" style="display:none">
      ` : `
      <!-- 블로그/공지 썸네일 -->
      <div class="form-group">
        <label class="form-label">썸네일 이미지 <span style="font-size:0.65rem;color:var(--gray);font-weight:300;">(목록에 표시됩니다)</span></label>
        <div class="upload-zone" id="thumbZone" style="padding:24px;">
          <i class="fas fa-image"></i>
          <p>클릭하여 썸네일 이미지를 업로드하세요</p>
        </div>
        <input type="file" id="thumbInput" accept="image/*" style="display:none">
        <div id="thumbPreview" class="upload-previews"></div>
      </div>
      `}

      ${seoEditorHTML()}

      <div class="form-actions">
        <a href="/${cfg.slug}" class="btn btn-ghost">취소</a>
        <button onclick="submitPost()" class="btn btn-gold" id="submitBtn">
          <i class="fas fa-check"></i> 등록하기
        </button>
      </div>
    </div>
  </div>
</section>

${footer()}

<script>
const BOARD = '${board}';
const BOARD_SLUG = '${cfg.slug}';

${board === 'before-after' ? `
// ===== BA 슬롯 업로드 =====
const baSlots = {};
let currentSlotType = '';

function triggerSlotUpload(type) {
  currentSlotType = type;
  document.getElementById('slotFileInput').click();
}

document.getElementById('slotFileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = '';

  const slotEl = document.getElementById('slot-' + currentSlotType);
  slotEl.innerHTML = '<div style="padding:20px;text-align:center;"><i class="fas fa-spinner fa-spin" style="color:var(--gold);"></i></div>';

  const url = await uploadFile(file);
  if (url) {
    baSlots[currentSlotType] = url;
    slotEl.className = 'ba-upload-slot has-image';
    slotEl.innerHTML = '<img src="' + url + '" alt=""><button class="slot-remove" onclick="event.stopPropagation();removeSlot(\\'' + currentSlotType + '\\')">&times;</button>';
    slotEl.onclick = () => triggerSlotUpload(currentSlotType);
  }
});

function removeSlot(type) {
  delete baSlots[type];
  const labels = { before_intra: 'Before', after_intra: 'After', before_pano: 'Before', after_pano: 'After' };
  const icons = { before_intra: 'fa-camera', after_intra: 'fa-camera', before_pano: 'fa-x-ray', after_pano: 'fa-x-ray' };
  const slotEl = document.getElementById('slot-' + type);
  slotEl.className = 'ba-upload-slot';
  slotEl.innerHTML = '<span class="slot-label">' + labels[type] + '</span><i class="fas ' + icons[type] + ' slot-icon"></i><button class="slot-remove" onclick="event.stopPropagation();removeSlot(\\'' + type + '\\')">&times;</button>';
  slotEl.onclick = () => triggerSlotUpload(type);
}
` : `
// ===== 썸네일 업로드 =====
let thumbnailUrl = null;

const thumbZone = document.getElementById('thumbZone');
const thumbInput = document.getElementById('thumbInput');
const thumbPreview = document.getElementById('thumbPreview');

thumbZone.addEventListener('click', () => thumbInput.click());
thumbInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = '';
  thumbZone.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:var(--gold);font-size:1.5rem;"></i>';
  const url = await uploadFile(file);
  if (url) {
    thumbnailUrl = url;
    thumbZone.style.display = 'none';
    thumbPreview.innerHTML = '<div class="upload-preview" style="width:200px;"><img src="' + url + '" alt="썸네일"><button class="upload-preview-remove" onclick="removeThumb()">&times;</button></div>';
  } else {
    thumbZone.innerHTML = '<i class="fas fa-image"></i><p>클릭하여 썸네일 이미지를 업로드하세요</p>';
  }
});

function removeThumb() {
  thumbnailUrl = null;
  thumbPreview.innerHTML = '';
  thumbZone.style.display = '';
  thumbZone.innerHTML = '<i class="fas fa-image"></i><p>클릭하여 썸네일 이미지를 업로드하세요</p>';
}
`}

// ===== 관리자 인증 체크 =====
const ADMIN_TOKEN = localStorage.getItem('admin_token');
if (!ADMIN_TOKEN) {
  alert('관리자 로그인이 필요합니다.');
  location.href = '/admin/login';
}

function authHeaders(extra) {
  const h = { 'Authorization': 'Bearer ' + ADMIN_TOKEN };
  if (extra) Object.assign(h, extra);
  return h;
}

// ===== 공통 업로드 함수 =====
async function uploadFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  try {
    const res = await fetch('/api/upload', { method: 'POST', body: fd, headers: { 'Authorization': 'Bearer ' + ADMIN_TOKEN } });
    const data = await res.json();
    if (data.url) return data.url;
    alert('업로드 실패: ' + (data.error || ''));
    return null;
  } catch (err) {
    alert('업로드 오류');
    return null;
  }
}

${seoEditorJS()}

// ===== 글 등록 =====
async function submitPost() {
  const title = document.getElementById('postTitle').value.trim();
  const content = document.getElementById('postContent').value.trim();

  if (!title) { alert('제목을 입력하세요.'); return; }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 등록 중...';

  ${board === 'before-after' ? `
  const images = Object.entries(baSlots).map(([type, url], i) => ({
    url, type, sort_order: i
  }));
  const thumbnail_url = baSlots.after_intra || baSlots.before_intra || baSlots.after_pano || baSlots.before_pano || null;
  ` : `
  const images = [];
  const thumbnail_url = thumbnailUrl || null;
  `}

  try {
    const res = await fetch('/api/boards/' + BOARD, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ title, content, thumbnail_url, images })
    });
    const data = await res.json();
    if (data.success) {
      location.href = '/' + BOARD_SLUG + '/' + data.id;
    } else {
      alert('등록 실패: ' + (data.error || ''));
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check"></i> 등록하기';
    }
  } catch (err) {
    alert('오류가 발생했습니다.');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-check"></i> 등록하기';
  }
}
</script>
${scripts()}`
}


// ==========================================
// 관리자 수정 페이지
// ==========================================
export function boardEditPage(board: string): string {
  const cfg = BOARD_CONFIG[board]
  if (!cfg) return ''

  return `${head({ title: cfg.name + ' 수정', description: '관리자 글 수정', path: `/${cfg.slug}`, noindex: true })}
${nav(cfg.navKey)}

<style>${boardCSS}</style>

<section class="page-section bg-black" style="padding-top:140px;">
  <div class="page-inner">
    <a href="/${cfg.slug}" class="board-back"><i class="fas fa-arrow-left"></i> ${cfg.nameEn} 목록으로</a>
    <div class="admin-form">
      <h2 class="sec-title" style="margin-bottom:48px;"><em>${cfg.name}</em> 수정</h2>
      
      <div class="form-group">
        <label class="form-label">제목</label>
        <input type="text" id="postTitle" class="form-input" placeholder="제목을 입력하세요">
      </div>

      ${board === 'before-after' ? `
      <div class="form-group">
        <label class="form-label">구내 사진 (Intraoral)</label>
        <div class="ba-upload-grid">
          <div class="ba-upload-slot" id="slot-before_intra" onclick="triggerSlotUpload('before_intra')">
            <span class="slot-label">Before</span>
            <i class="fas fa-camera slot-icon"></i>
            <button class="slot-remove" onclick="event.stopPropagation();removeSlot('before_intra')">&times;</button>
          </div>
          <div class="ba-upload-slot" id="slot-after_intra" onclick="triggerSlotUpload('after_intra')">
            <span class="slot-label">After</span>
            <i class="fas fa-camera slot-icon"></i>
            <button class="slot-remove" onclick="event.stopPropagation();removeSlot('after_intra')">&times;</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">파노라마 (Panoramic X-ray)</label>
        <div class="ba-upload-grid">
          <div class="ba-upload-slot" id="slot-before_pano" onclick="triggerSlotUpload('before_pano')">
            <span class="slot-label">Before</span>
            <i class="fas fa-x-ray slot-icon"></i>
            <button class="slot-remove" onclick="event.stopPropagation();removeSlot('before_pano')">&times;</button>
          </div>
          <div class="ba-upload-slot" id="slot-after_pano" onclick="triggerSlotUpload('after_pano')">
            <span class="slot-label">After</span>
            <i class="fas fa-x-ray slot-icon"></i>
            <button class="slot-remove" onclick="event.stopPropagation();removeSlot('after_pano')">&times;</button>
          </div>
        </div>
      </div>
      <input type="file" id="slotFileInput" accept="image/*" style="display:none">
      ` : `
      <!-- 썸네일 -->
      <div class="form-group">
        <label class="form-label">썸네일 이미지 <span style="font-size:0.65rem;color:var(--gray);font-weight:300;">(목록에 표시됩니다)</span></label>
        <div class="upload-zone" id="thumbZone" style="padding:24px;">
          <i class="fas fa-image"></i>
          <p>클릭하여 썸네일 이미지를 업로드하세요</p>
        </div>
        <input type="file" id="thumbInput" accept="image/*" style="display:none">
        <div id="thumbPreview" class="upload-previews"></div>
      </div>
      `}

      ${seoEditorHTML()}

      <div class="form-actions">
        <a href="/${cfg.slug}" class="btn btn-ghost">취소</a>
        <button onclick="updatePost()" class="btn btn-gold" id="submitBtn">
          <i class="fas fa-save"></i> 수정하기
        </button>
      </div>
    </div>
  </div>
</section>

${footer()}

<script>
const BOARD = '${board}';
const BOARD_SLUG = '${cfg.slug}';
const postId = window.location.pathname.split('/').filter(Boolean).slice(-2, -1)[0];

${board === 'before-after' ? `
const baSlots = {};
let currentSlotType = '';

function triggerSlotUpload(type) {
  currentSlotType = type;
  document.getElementById('slotFileInput').click();
}

document.getElementById('slotFileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = '';
  const slotEl = document.getElementById('slot-' + currentSlotType);
  slotEl.innerHTML = '<div style="padding:20px;text-align:center;"><i class="fas fa-spinner fa-spin" style="color:var(--gold);"></i></div>';
  const url = await uploadFile(file);
  if (url) {
    baSlots[currentSlotType] = url;
    slotEl.className = 'ba-upload-slot has-image';
    slotEl.innerHTML = '<img src="' + url + '" alt=""><button class="slot-remove" onclick="event.stopPropagation();removeSlot(\\'' + currentSlotType + '\\')">&times;</button>';
    slotEl.onclick = () => triggerSlotUpload(currentSlotType);
  }
});

function removeSlot(type) {
  delete baSlots[type];
  const labels = { before_intra: 'Before', after_intra: 'After', before_pano: 'Before', after_pano: 'After' };
  const icons = { before_intra: 'fa-camera', after_intra: 'fa-camera', before_pano: 'fa-x-ray', after_pano: 'fa-x-ray' };
  const slotEl = document.getElementById('slot-' + type);
  slotEl.className = 'ba-upload-slot';
  slotEl.innerHTML = '<span class="slot-label">' + labels[type] + '</span><i class="fas ' + icons[type] + ' slot-icon"></i><button class="slot-remove" onclick="event.stopPropagation();removeSlot(\\'' + type + '\\')">&times;</button>';
  slotEl.onclick = () => triggerSlotUpload(type);
}

function loadSlot(type, url) {
  if (!url) return;
  baSlots[type] = url;
  const slotEl = document.getElementById('slot-' + type);
  slotEl.className = 'ba-upload-slot has-image';
  slotEl.innerHTML = '<img src="' + url + '" alt=""><button class="slot-remove" onclick="event.stopPropagation();removeSlot(\\'' + type + '\\')">&times;</button>';
  slotEl.onclick = () => triggerSlotUpload(type);
}
` : `
// ===== 썸네일 업로드 =====
let thumbnailUrl = null;

const thumbZone = document.getElementById('thumbZone');
const thumbInput = document.getElementById('thumbInput');
const thumbPreview = document.getElementById('thumbPreview');

thumbZone.addEventListener('click', () => thumbInput.click());
thumbInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = '';
  thumbZone.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:var(--gold);font-size:1.5rem;"></i>';
  const url = await uploadFile(file);
  if (url) {
    thumbnailUrl = url;
    thumbZone.style.display = 'none';
    thumbPreview.innerHTML = '<div class="upload-preview" style="width:200px;"><img src="' + url + '" alt="썸네일"><button class="upload-preview-remove" onclick="removeThumb()">&times;</button></div>';
  } else {
    thumbZone.innerHTML = '<i class="fas fa-image"></i><p>클릭하여 썸네일 이미지를 업로드하세요</p>';
  }
});

function removeThumb() {
  thumbnailUrl = null;
  thumbPreview.innerHTML = '';
  thumbZone.style.display = '';
  thumbZone.innerHTML = '<i class="fas fa-image"></i><p>클릭하여 썸네일 이미지를 업로드하세요</p>';
}
`}

// ===== 관리자 인증 =====
const ADMIN_TOKEN = localStorage.getItem('admin_token');
if (!ADMIN_TOKEN) {
  alert('관리자 로그인이 필요합니다.');
  location.href = '/admin/login';
}
function authHeaders(extra) {
  const h = { 'Authorization': 'Bearer ' + ADMIN_TOKEN };
  if (extra) Object.assign(h, extra);
  return h;
}

async function uploadFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  try {
    const res = await fetch('/api/upload', { method: 'POST', body: fd, headers: { 'Authorization': 'Bearer ' + ADMIN_TOKEN } });
    const data = await res.json();
    if (data.url) return data.url;
    alert('업로드 실패: ' + (data.error || ''));
    return null;
  } catch { alert('업로드 오류'); return null; }
}

${seoEditorJS()}

// 기존 데이터 로드
async function loadExisting() {
  try {
    const res = await fetch('/api/boards/' + BOARD + '/' + postId);
    const data = await res.json();
    if (!data.post) return;

    document.getElementById('postTitle').value = data.post.title || '';
    document.getElementById('postContent').value = data.post.content || '';

    ${board === 'before-after' ? `
    const images = data.images || [];
    images.forEach(img => loadSlot(img.image_type, img.image_url));
    ` : `
    // 기존 썸네일 로드
    if (data.post.thumbnail_url) {
      thumbnailUrl = data.post.thumbnail_url;
      thumbZone.style.display = 'none';
      thumbPreview.innerHTML = '<div class="upload-preview" style="width:200px;"><img src="' + data.post.thumbnail_url + '" alt="썸네일"><button class="upload-preview-remove" onclick="removeThumb()">&times;</button></div>';
    }
    `}
    updatePreview();
  } catch (err) { console.error(err); }
}

async function updatePost() {
  const title = document.getElementById('postTitle').value.trim();
  const content = document.getElementById('postContent').value.trim();
  if (!title) { alert('제목을 입력하세요.'); return; }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 수정 중...';

  ${board === 'before-after' ? `
  const images = Object.entries(baSlots).map(([type, url], i) => ({ url, type, sort_order: i }));
  const thumbnail_url = baSlots.after_intra || baSlots.before_intra || baSlots.after_pano || baSlots.before_pano || null;
  ` : `
  const images = [];
  const thumbnail_url = thumbnailUrl || null;
  `}

  try {
    const res = await fetch('/api/boards/' + BOARD + '/' + postId, {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ title, content, thumbnail_url, images })
    });
    const data = await res.json();
    if (data.success) {
      location.href = '/' + BOARD_SLUG + '/' + postId;
    } else {
      alert('수정 실패: ' + (data.error || ''));
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> 수정하기';
    }
  } catch {
    alert('오류가 발생했습니다.');
    btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> 수정하기';
  }
}

loadExisting();
</script>
${scripts()}`
}
