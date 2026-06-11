// ===== 통합 사이트 검색 (/search) =====
// SearchAction(Sitelinks Searchbox) 스키마의 실제 타겟.
// 정적 콘텐츠(증상/비용/비교/백과사전/진료/지역) + D1 블로그 포스트 통합 검색.

import { head, nav, footer, scripts } from './layout'
import { symptoms } from './symptom-seo'
import { costPages } from './cost-seo'
import { comparisons } from './comparison-seo'
import { terms as encyclopediaTerms } from './encyclopedia'
import { PAGES as foreignPages } from './foreign-emergency-seo'

interface SearchItem {
  url: string;
  title: string;
  desc: string;
  category: string;
  categoryIcon: string;
  keywords: string; // 검색 매칭용 (소문자)
}

// 정적 검색 인덱스 (모듈 로드 시 1회 생성 — Workers 캐시 활용)
let STATIC_INDEX: SearchItem[] | null = null;

function buildStaticIndex(): SearchItem[] {
  if (STATIC_INDEX) return STATIC_INDEX;
  const items: SearchItem[] = [];

  // 진료과목 (고정 5개)
  const treatmentDefs = [
    { slug: 'implant', name: '발치즉시 임플란트', desc: '발치와 동시에 임플란트를 식립하여 치료 기간을 대폭 단축. 80% 이상 즉시식립 시행.', kw: '임플란트 식립 인공치아 틀니 브릿지 빠진 이' },
    { slug: 'preservation', name: '치아보존치료·신경치료', desc: '보존과 전문의의 미세현미경 활용 정밀 신경치료. 자연치아를 최대한 보존.', kw: '신경치료 보존 충치 시린이 치통 미세현미경 재신경치료' },
    { slug: 'aesthetic', name: '앞니 심미치료', desc: '최소삭제 원칙의 라미네이트, 즉일 완성 가능한 레진 심미보철.', kw: '라미네이트 레진 앞니 심미 변색 벌어진 깨진' },
    { slug: 'orthodontics', name: '치아교정·투명교정', desc: '교정과 전문의 직접 시행. 인비절라인·설측교정.', kw: '교정 투명교정 인비절라인 설측 돌출입 덧니 부정교합' },
    { slug: 'general', name: '일반·예방진료', desc: '스케일링, 충치치료, 정기검진. 직장인 수요일 야간진료.', kw: '스케일링 충치 검진 예방 잇몸 치석' },
  ];
  for (const t of treatmentDefs) {
    items.push({ url: `/treatments/${t.slug}`, title: t.name, desc: t.desc, category: '진료과목', categoryIcon: 'fa-tooth', keywords: `${t.name} ${t.kw}`.toLowerCase() });
  }

  // 증상 가이드
  for (const s of symptoms) {
    items.push({
      url: `/symptoms/${s.slug}`, title: s.symptom, desc: s.heroDesc.substring(0, 120),
      category: '증상 가이드', categoryIcon: 'fa-stethoscope',
      keywords: `${s.symptom} ${s.keywords} ${s.causes.map(cz => cz.title).join(' ')}`.toLowerCase()
    });
  }

  // 비용 안내
  for (const p of costPages) {
    items.push({
      url: `/cost/${p.slug}`, title: `${p.treatment} 비용 안내`, desc: `${p.priceRange} — ${p.insuranceNote.substring(0, 80)}`,
      category: '치료비용', categoryIcon: 'fa-won-sign',
      keywords: `${p.treatment} 비용 가격 얼마 ${p.keywords}`.toLowerCase()
    });
  }

  // 비교 가이드
  for (const p of comparisons) {
    items.push({
      url: `/compare/${p.slug}`, title: `${p.optionA.name} vs ${p.optionB.name}`, desc: p.heroDesc.substring(0, 120),
      category: '치료 비교', categoryIcon: 'fa-balance-scale',
      keywords: `${p.optionA.name} ${p.optionB.name} 비교 차이 ${p.keywords}`.toLowerCase()
    });
  }

  // 백과사전
  for (const t of encyclopediaTerms) {
    items.push({
      url: `/encyclopedia/${t.id}`, title: t.term + (t.termEn ? ` (${t.termEn})` : ''), desc: t.short,
      category: '치과백과', categoryIcon: 'fa-book-medical',
      keywords: `${t.term} ${t.termEn || ''} ${t.short}`.toLowerCase()
    });
  }

  // 외국인 페이지 (영어 검색 대응)
  for (const p of foreignPages.filter(fp => fp.lang === 'en')) {
    items.push({
      url: `/en/${p.slug}`, title: p.h1, desc: p.metaDesc.substring(0, 120),
      category: 'English', categoryIcon: 'fa-globe',
      keywords: `${p.h1} ${p.keywords}`.toLowerCase()
    });
  }

  // 주요 정적 페이지
  items.push(
    { url: '/doctors', title: '의료진 소개', desc: '통합치의학과·보존과·교정과 전문의 3인 약력', category: '병원 안내', categoryIcon: 'fa-user-md', keywords: '의료진 원장 전문의 한승대 신정희 박현미 경력 약력'.toLowerCase() },
    { url: '/location', title: '오시는 길·예약', desc: '시청역 도보 5분, 명동·을지로·회현 인근. 02-756-2828', category: '병원 안내', categoryIcon: 'fa-map-marker-alt', keywords: '오시는길 위치 주소 예약 전화 지도 주차 시청역 명동'.toLowerCase() },
    { url: '/philosophy', title: '진료 철학', desc: '과잉진료 없는 정직한 진료 원칙', category: '병원 안내', categoryIcon: 'fa-heart', keywords: '철학 원칙 과잉진료 정직'.toLowerCase() },
    { url: '/local', title: '지역별 진료 안내', desc: '시청·명동·을지로·광화문·종로·서울역 지역별 안내', category: '병원 안내', categoryIcon: 'fa-map', keywords: '지역 시청 명동 을지로 광화문 종로 서울역 근처 가까운'.toLowerCase() },
  );

  STATIC_INDEX = items;
  return items;
}

// 검색 실행: 단순 토큰 매칭 + 가중치 (제목 > 키워드)
function searchStatic(query: string, limit = 30): SearchItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(t => t.length >= 1);
  const index = buildStaticIndex();

  const scored = index.map(item => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    for (const tk of tokens) {
      if (titleLower.includes(tk)) score += 10;
      if (item.keywords.includes(tk)) score += 3;
    }
    // 전체 질의가 제목에 그대로 포함되면 보너스
    if (titleLower.includes(q)) score += 15;
    return { item, score };
  }).filter(r => r.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(r => r.item);
}

const escHtml = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ===== 검색 페이지 렌더링 =====
export async function renderSearchPage(query: string, db: D1Database): Promise<string> {
  const q = (query || '').trim().substring(0, 100);
  const hasQuery = q.length > 0;

  // 정적 콘텐츠 검색
  const staticResults = hasQuery ? searchStatic(q) : [];

  // 블로그 검색 (D1 LIKE)
  let blogResults: { url: string; title: string; desc: string }[] = [];
  if (hasQuery) {
    try {
      const like = `%${q.replace(/[%_]/g, '')}%`;
      const rows = await db.prepare(
        `SELECT id, title, content FROM posts
         WHERE is_published = 1 AND board = 'blog' AND (title LIKE ? OR content LIKE ?)
         ORDER BY created_at DESC LIMIT 10`
      ).bind(like, like).all();
      blogResults = ((rows.results || []) as any[]).map(p => ({
        url: `/blog/${p.id}`,
        title: p.title,
        desc: (p.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 140)
      }));
    } catch {}
  }

  const total = staticResults.length + blogResults.length;

  const resultCard = (url: string, title: string, desc: string, cat: string, icon: string) => `
    <a href="${url}" class="search-result-card block p-5 rounded-2xl border border-gray-700/60 hover:border-yellow-400/60 transition mb-3 bg-gray-900/40">
      <div class="flex items-center gap-2 mb-1.5">
        <span class="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 font-semibold"><i class="fas ${icon} mr-1"></i>${cat}</span>
      </div>
      <h3 class="font-bold text-white text-base mb-1">${escHtml(title)}</h3>
      <p class="text-gray-400 text-sm leading-relaxed">${escHtml(desc)}</p>
    </a>`;

  const popularSearches = ['임플란트 비용', '신경치료', '투명교정', '라미네이트', '스케일링', '사랑니', '치통', '잇몸 출혈'];

  const body = `
<main id="search-page" class="max-w-3xl mx-auto px-5 pt-32 pb-20 min-h-screen">
  <h1 class="text-2xl md:text-3xl font-black text-white mb-2">통합 검색</h1>
  <p class="text-gray-400 text-sm mb-8">증상·비용·치료법·치과 용어를 한 번에 검색하세요.</p>

  <form id="search-form" action="/search" method="get" role="search" class="mb-8">
    <div class="flex gap-2">
      <input type="search" name="q" id="search-input" value="${escHtml(q)}" placeholder="예: 임플란트 비용, 이가 시려요, 사랑니"
        class="flex-1 px-5 py-3.5 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
        autocomplete="off" ${hasQuery ? '' : 'autofocus'}>
      <button type="submit" class="px-6 py-3.5 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition">
        <i class="fas fa-search"></i><span class="hidden md:inline ml-2">검색</span>
      </button>
    </div>
  </form>

  ${hasQuery ? `
  <section id="search-results" aria-label="검색 결과">
    <p class="text-gray-400 text-sm mb-6">"<strong class="text-yellow-400">${escHtml(q)}</strong>" 검색 결과 <strong class="text-white">${total}건</strong></p>
    ${total === 0 ? `
    <div class="text-center py-16">
      <p class="text-5xl mb-4">🔍</p>
      <p class="text-white font-bold mb-2">검색 결과가 없습니다</p>
      <p class="text-gray-400 text-sm mb-6">다른 검색어로 시도하시거나, 전화로 직접 문의해 주세요.</p>
      <a href="tel:02-756-2828" class="inline-block px-6 py-3 rounded-xl bg-yellow-400 text-black font-bold">📞 02-756-2828</a>
    </div>` : `
    ${blogResults.map(r => resultCard(r.url, r.title, r.desc, '블로그', 'fa-pen')).join('')}
    ${staticResults.map(r => resultCard(r.url, r.title, r.desc, r.category, r.categoryIcon)).join('')}
    `}
  </section>` : `
  <section id="popular-searches" aria-label="인기 검색어">
    <h2 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">인기 검색어</h2>
    <div class="flex flex-wrap gap-2">
      ${popularSearches.map(s => `<a href="/search?q=${encodeURIComponent(s)}" class="px-4 py-2 rounded-full border border-gray-700 text-gray-300 text-sm hover:border-yellow-400 hover:text-yellow-400 transition">${s}</a>`).join('')}
    </div>
    <h2 class="text-sm font-bold text-gray-400 uppercase tracking-wider mt-10 mb-4">바로가기</h2>
    <div class="grid grid-cols-2 gap-3 text-sm">
      <a href="/symptoms" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition text-gray-200">🩺 증상별 가이드</a>
      <a href="/cost" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition text-gray-200">💰 치료비용 안내</a>
      <a href="/compare" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition text-gray-200">⚖️ 치료 비교</a>
      <a href="/encyclopedia" class="block p-4 rounded-xl border border-gray-700 hover:border-yellow-400 transition text-gray-200">📖 치과백과사전</a>
    </div>
  </section>`}
</main>`;

  // 검색 결과 페이지는 noindex (thin content 방지), 검색 홈은 index
  return `${head({
    title: hasQuery ? `"${q}" 검색 결과` : '통합 검색 — 증상·비용·치료법 한번에 찾기',
    description: hasQuery ? `행복한예인치과에서 "${q}" 검색 결과 ${total}건` : '행복한예인치과 통합 검색. 증상별 가이드, 치료비용, 치료 비교, 치과 용어 백과사전을 한 번에 검색하세요.',
    path: hasQuery ? `/search` : '/search',
    noindex: hasQuery,
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '검색', url: '/search' }]
  })}
${nav()}
<script src="https://cdn.tailwindcss.com"></script>
${body}
${footer()}
${scripts()}
</body></html>`;
}
