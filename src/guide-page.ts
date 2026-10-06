// 원장님용 홈페이지 포스팅 설명서 — /admin/guide
// 실제 관리자 화면(admin-pages.ts·board-pages.ts)과 자동 처리(column-seo.ts) 기준으로 작성.
// 관리자 화면과 같은 색(#0A0A0A·#F7BA18)과 글꼴을 쓴다.

export function postingGuidePage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>포스팅 설명서 | Admin | 행복한예인치과</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/png" href="/static/img/logo.png">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Noto+Sans+KR:wght@400;500;700;900&display=swap');
:root{--bg:#0A0A0A;--card:rgba(255,255,255,0.03);--line:rgba(255,255,255,0.08);--text:#F5F2ED;--muted:#9a968f;--gold:#F7BA18;--gold-soft:rgba(247,186,24,0.08);}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:'Noto Sans KR',sans-serif;line-height:1.75;-webkit-font-smoothing:antialiased}
a{color:var(--gold)}
.wrap{max-width:860px;margin:0 auto;padding:40px 16px 80px}
.top{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:36px}
.brand{font-family:'Syne',sans-serif;font-weight:800;letter-spacing:4px;text-transform:uppercase;font-size:0.9rem}
.brand em{color:var(--gold);font-style:normal}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:12px;border:1px solid var(--line);color:var(--text);text-decoration:none;font-size:0.88rem;background:var(--card)}
.btn-gold{background:var(--gold);color:#0A0A0A;border-color:var(--gold);font-weight:700}
h1{font-size:clamp(1.6rem,4vw,2.2rem);font-weight:900;margin:0 0 8px;line-height:1.3}
.lead{color:var(--muted);margin:0 0 32px}
.toc{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-bottom:48px}
.toc a{display:block;padding:14px 16px;border:1px solid var(--line);border-radius:14px;background:var(--card);text-decoration:none;color:var(--text);font-size:0.92rem}
.toc a b{display:block;color:var(--gold);font-family:'Syne',sans-serif;font-size:0.72rem;letter-spacing:2px}
section{margin:0 0 56px;scroll-margin-top:24px}
h2{font-size:1.35rem;margin:0 0 16px;display:flex;align-items:center;gap:10px}
h2 .num{font-family:'Syne',sans-serif;color:#0A0A0A;background:var(--gold);border-radius:8px;padding:2px 9px;font-size:0.85rem}
h3{font-size:1.05rem;margin:28px 0 10px;color:var(--gold)}
ol.steps{counter-reset:s;list-style:none;padding:0;margin:0}
ol.steps>li{counter-increment:s;position:relative;padding:14px 16px 14px 56px;border:1px solid var(--line);border-radius:14px;background:var(--card);margin-bottom:10px}
ol.steps>li::before{content:counter(s);position:absolute;left:16px;top:14px;width:26px;height:26px;border-radius:50%;background:var(--gold-soft);border:1px solid var(--gold);color:var(--gold);font-weight:700;font-size:0.82rem;display:flex;align-items:center;justify-content:center}
.ui{display:inline-block;padding:1px 8px;border-radius:6px;border:1px solid rgba(247,186,24,0.4);background:var(--gold-soft);color:var(--gold);font-size:0.85em;white-space:nowrap}
.tip,.warn{padding:16px 18px;border-radius:14px;margin:16px 0;font-size:0.94rem}
.tip{background:var(--gold-soft);border-left:4px solid var(--gold)}
.warn{background:rgba(255,90,90,0.07);border-left:4px solid #ff6b6b}
.tip b,.warn b{display:block;margin-bottom:4px}
table{width:100%;border-collapse:collapse;font-size:0.92rem;margin:12px 0}
th,td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--muted);font-weight:500}
.tbl{overflow-x:auto}
pre{background:#111;border:1px solid var(--line);border-radius:14px;padding:16px;overflow-x:auto;font-size:0.86rem;line-height:1.7;white-space:pre-wrap;word-break:break-all;margin:12px 0}
code{font-family:ui-monospace,Menlo,monospace;color:#ffd666}
.check li{margin-bottom:6px}
.foot{color:var(--muted);font-size:0.85rem;border-top:1px solid var(--line);padding-top:20px}
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <div class="brand">Happy <em>Yein</em> · Guide</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <a class="btn" href="/admin"><i class="fas fa-th-large"></i> 관리자 대시보드</a>
      <a class="btn btn-gold" href="/blog/write"><i class="fas fa-pen-nib"></i> 바로 글쓰기</a>
    </div>
  </div>

  <h1>홈페이지 포스팅 설명서</h1>
  <p class="lead">블로그(칼럼)·비포&amp;애프터·공지사항을 올리는 방법입니다. 순서대로 따라 하시면 됩니다.</p>

  <nav class="toc" aria-label="목차">
    <a href="#login"><b>01</b>관리자 로그인</a>
    <a href="#blog"><b>02</b>블로그 글쓰기</a>
    <a href="#editor"><b>03</b>본문 꾸미기 (H2·H3·사진)</a>
    <a href="#seo"><b>04</b>검색에 잘 나오게 쓰는 법</a>
    <a href="#ba"><b>05</b>비포&amp;애프터 올리기</a>
    <a href="#notice"><b>06</b>공지사항</a>
    <a href="#edit"><b>07</b>수정·삭제</a>
    <a href="#check"><b>08</b>올리기 전 체크리스트</a>
  </nav>

  <section id="login">
    <h2><span class="num">01</span>관리자 로그인</h2>
    <ol class="steps">
      <li>주소창에 <code>happyyein.kr/admin/login</code> 을 입력합니다.</li>
      <li>관리자 비밀번호를 입력하고 로그인합니다.</li>
      <li>대시보드가 열리면 성공입니다. 왼쪽 메뉴에 <span class="ui">비포 &amp; 애프터</span> <span class="ui">블로그</span> <span class="ui">공지사항</span>이 있습니다.</li>
    </ol>
    <div class="tip"><b>로그인이 풀렸다면</b>글쓰기 화면에서 "관리자 로그인이 필요합니다" 창이 뜨면 다시 로그인하시면 됩니다. 쓰던 글은 사라질 수 있으니 긴 글은 메모장에 먼저 써 두시는 걸 권합니다.</div>
  </section>

  <section id="blog">
    <h2><span class="num">02</span>블로그(칼럼) 글쓰기</h2>
    <ol class="steps">
      <li>대시보드 <span class="ui">Quick Actions</span>에서 <span class="ui">블로그 작성</span>을 누릅니다. (또는 왼쪽 <span class="ui">블로그</span> → <span class="ui">+ 새 글 작성</span>)</li>
      <li><b>제목</b>을 입력합니다. 환자분이 검색할 문장 그대로 쓰는 게 가장 좋습니다.<br>예) <i>임플란트 후 붓기, 며칠이면 빠질까요?</i></li>
      <li><b>썸네일 이미지</b> 칸을 눌러 대표 사진 1장을 올립니다. 블로그 목록과 카톡·SNS 공유 미리보기에 나옵니다.</li>
      <li><b>본문</b>을 씁니다. 아래 <a href="#editor">03</a>을 참고해 소제목과 사진을 넣어 주세요. 아래쪽 <span class="ui">미리보기</span>에 실제 모양이 바로 보입니다.</li>
      <li>맨 아래 <span class="ui">등록하기</span> 버튼을 누르면 바로 게시되고, 올린 글 화면으로 이동합니다.</li>
    </ol>
    <h3>진료 분류는 제목으로 자동 지정됩니다</h3>
    <p>따로 고르는 칸은 없고, 제목에 들어간 단어로 진료가 정해집니다. 그래서 블로그 목록의 진료별 필터와 해당 진료 페이지의 "관련 칼럼"에 자동으로 걸립니다.</p>
    <div class="tbl"><table>
      <tr><th>제목에 이런 단어가 있으면</th><th>분류</th></tr>
      <tr><td>임플란트, 뼈이식, 상악동, 틀니, 올온포</td><td>임플란트</td></tr>
      <tr><td>교정, 인비절라인, 브라켓, 유지장치, 덧니</td><td>치아교정</td></tr>
      <tr><td>라미네이트, 미백, 심미, 앞니 레진, 잇몸 성형</td><td>심미치료</td></tr>
      <tr><td>신경치료, 충치, 크라운, 인레이, 레진, 시린 이, 균열</td><td>보존치료</td></tr>
      <tr><td>스케일링, 잇몸, 사랑니, 검진, 예방, 치주, 구취</td><td>일반진료</td></tr>
    </table></div>
    <div class="tip"><b>팁</b>제목에 진료 이름이 하나는 꼭 들어가게 써 주세요. 하나도 없으면 진료 페이지와 연결되지 않습니다.</div>
  </section>

  <section id="editor">
    <h2><span class="num">03</span>본문 꾸미기 — 버튼 사용법</h2>
    <p>본문 칸 위의 버튼을 누르면 표시가 자동으로 들어갑니다. 글자를 먼저 드래그로 고른 뒤 버튼을 누르면 그 글자에 적용됩니다.</p>
    <div class="tbl"><table>
      <tr><th>버튼</th><th>쓰임</th></tr>
      <tr><td><span class="ui">H2</span></td><td>큰 주제(장 제목). 글 하나에 3~6개 정도</td></tr>
      <tr><td><span class="ui">H3</span></td><td>작은 소제목. <b>질문으로 쓰면 구글 FAQ로 자동 등록</b>됩니다(아래 04 참고)</td></tr>
      <tr><td><span class="ui">P</span></td><td>일반 문단</td></tr>
      <tr><td><span class="ui"><i class="fas fa-bold"></i></span> <span class="ui"><i class="fas fa-italic"></i></span></td><td>굵게 · 기울임</td></tr>
      <tr><td><span class="ui"><i class="fas fa-list-ul"></i></span></td><td>점 목록</td></tr>
      <tr><td><span class="ui"><i class="fas fa-quote-left"></i></span></td><td>인용 박스</td></tr>
      <tr><td><span class="ui"><i class="fas fa-image"></i> 사진 삽입</span></td><td>커서 위치에 사진을 넣습니다. 사진은 문단 사이사이에 넣는 게 좋습니다</td></tr>
    </table></div>
    <h3>그대로 따라 쓰면 되는 기본 틀</h3>
<pre><code>&lt;p&gt;임플란트 후 붓기는 보통 2~3일째 가장 심하고, 1주일 안에 대부분 가라앉습니다.&lt;/p&gt;

&lt;h2&gt;붓기가 생기는 이유&lt;/h2&gt;
&lt;p&gt;잇몸을 열고 뼈에 식립하는 과정에서 ...&lt;/p&gt;

&lt;h2&gt;붓기를 빨리 빼는 방법&lt;/h2&gt;
&lt;p&gt;수술 당일에는 냉찜질을 ...&lt;/p&gt;

&lt;h2&gt;자주 묻는 질문&lt;/h2&gt;
&lt;h3&gt;붓기가 1주일 넘게 가면 어떻게 하나요?&lt;/h3&gt;
&lt;p&gt;열감이나 고름이 함께 있다면 바로 내원해 주세요. ...&lt;/p&gt;

&lt;h3&gt;냉찜질은 언제까지 하나요?&lt;/h3&gt;
&lt;p&gt;수술 후 48시간까지는 냉찜질, 그 이후에는 ...&lt;/p&gt;</code></pre>
    <p style="color:var(--muted);font-size:0.9rem">표시(&lt;h2&gt; 등)는 직접 칠 필요 없이 버튼으로 넣으시면 됩니다. 위 예시는 완성된 모양을 보여 드리는 것입니다.</p>
  </section>

  <section id="seo">
    <h2><span class="num">04</span>검색·AI 답변에 잘 나오게 쓰는 법</h2>
    <p>아래 세 가지만 지키시면 홈페이지가 알아서 구글·네이버·AI용 정보를 만들어 붙입니다.</p>
    <h3>① 첫 문단 = 질문에 대한 결론 한두 문장</h3>
    <p>본문 <b>맨 처음 문단</b>은 화면에서 <span class="ui">핵심 답변</span> 박스로 강조되고, 검색 결과 설명과 AI 답변에 그대로 쓰입니다. 인사말 대신 결론부터 써 주세요.</p>
    <div class="tip"><b>좋은 예</b>"임플란트 후 붓기는 보통 2~3일째 가장 심하고 1주일 안에 대부분 가라앉습니다."<br><b style="display:inline">아쉬운 예</b> "안녕하세요, 행복한예인치과입니다. 오늘은 ~에 대해 알아보겠습니다."</div>
    <h3>② 질문형 H3 + 바로 아래 답변 문단</h3>
    <p><span class="ui">H3</span> 소제목을 <b>물음표(?)로 끝나는 질문</b>으로 쓰고, 바로 다음 줄에 답변 문단을 쓰면 구글 "자주 묻는 질문(FAQ)"으로 자동 등록됩니다. 글 하나에 2~5개면 충분합니다.</p>
    <h3>③ 제목에 진료 이름 + 환자가 검색하는 표현</h3>
    <p>예) <i>사랑니 발치 후 술은 언제부터 마셔도 되나요?</i> — 진료 이름(사랑니)이 들어가 자동 분류되고, 실제 검색 문장과 같아 노출에 유리합니다.</p>
    <div class="warn"><b>의료광고 주의</b>"최고", "100% 성공", "통증 전혀 없음", 다른 병원과 비교, 환자 후기·체험담 인용은 의료법 위반 소지가 있어 쓰지 않습니다. "개인에 따라 결과가 다를 수 있습니다"를 넣어 주시면 안전합니다.</div>
    <p style="color:var(--muted);font-size:0.9rem">참고: 홈페이지에는 매일 자동으로 발행되는 건강 정보 칼럼이 별도로 있습니다. 원장님이 직접 쓰시는 글은 실제 진료 경험이 담겨 있어 검색 신뢰도에 특히 도움이 됩니다.</p>
  </section>

  <section id="ba">
    <h2><span class="num">05</span>비포 &amp; 애프터 올리기</h2>
    <ol class="steps">
      <li>대시보드 <span class="ui">비포&amp;애프터 작성</span>을 누릅니다.</li>
      <li><b>제목</b>: <i>진료명 + 부위/증상 + 기간</i> 형식을 권합니다. 예) <i>상악 어금니 임플란트 — 발치 후 4개월</i>. 환자 이름·나이 등 알아볼 수 있는 정보는 넣지 않습니다.</li>
      <li><b>구내 사진</b> Before / After 칸을 각각 눌러 올립니다.</li>
      <li><b>파노라마(X-ray)</b> Before / After가 있으면 같이 올립니다. (없으면 비워 두셔도 됩니다)</li>
      <li><b>본문</b>에 진단 내용 · 치료 계획 · 치료 기간과 내원 횟수 · 주의사항을 적고 <span class="ui">등록하기</span>를 누릅니다.</li>
    </ol>
    <div class="tip"><b>설명을 꼭 써 주세요</b>검색엔진은 사진을 읽지 못하고 글만 읽습니다. 치료 과정 설명이 충분할수록(300자 이상 권장) 검색에 잘 잡힙니다.</div>
    <div class="warn"><b>의료법</b>치료 전후 사진은 같은 조건(각도·조명)으로 촬영한 사진을 쓰고, 본문에 "촬영 조건 동일, 개인에 따라 결과가 다를 수 있습니다"를 넣어 주세요.</div>
  </section>

  <section id="notice">
    <h2><span class="num">06</span>공지사항</h2>
    <p>휴진·진료시간 변경·이벤트 안내 등은 <span class="ui">공지사항 작성</span>에서 블로그와 같은 방법으로 올립니다. 진료 분류나 FAQ 처리는 하지 않으니 짧게 쓰셔도 됩니다.</p>
  </section>

  <section id="edit">
    <h2><span class="num">07</span>수정 · 삭제</h2>
    <ol class="steps">
      <li>관리자 왼쪽 메뉴에서 <span class="ui">블로그</span>(또는 비포&amp;애프터·공지사항)를 누릅니다.</li>
      <li>글 목록 오른쪽 <span class="ui"><i class="fas fa-pen"></i></span> 연필 아이콘 = 수정, <span class="ui"><i class="fas fa-trash"></i></span> 휴지통 = 삭제입니다.</li>
      <li>수정 화면은 글쓰기 화면과 같습니다. 고친 뒤 <span class="ui">수정하기</span>를 누르면 바로 반영되고, 검색엔진에도 자동으로 다시 알립니다.</li>
    </ol>
    <div class="warn"><b>삭제는 되돌릴 수 없습니다</b>잠깐 내리고 싶은 글은 삭제 대신 저희에게 말씀해 주세요.</div>
  </section>

  <section id="check">
    <h2><span class="num">08</span>올리기 전 체크리스트</h2>
    <ul class="check">
      <li>제목에 진료 이름이 들어갔나요?</li>
      <li>첫 문단이 결론 한두 문장인가요?</li>
      <li>H2로 큰 주제를 나눴나요? 질문형 H3 + 답변이 2개 이상 있나요?</li>
      <li>썸네일 1장, 본문 사진 1~3장을 넣었나요?</li>
      <li>과장 표현·후기 인용 없이 "개인차" 문구를 넣었나요?</li>
      <li>미리보기에서 줄바꿈·사진 위치가 괜찮은가요?</li>
    </ul>
  </section>

  <p class="foot">막히는 부분은 카톡으로 화면 캡처와 함께 보내 주세요. 바로 확인해 드립니다. · PF Web Engine</p>
</div>
</body>
</html>`
}
