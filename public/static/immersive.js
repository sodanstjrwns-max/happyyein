/* 행복한예인치과 메인 스크롤 몰입 연출 (GSAP ScrollTrigger + Lenis) — 다크·골드 에디토리얼 결
   - 글자는 모두 HTML 에 그대로 두고 움직임만 더한다(크롤러·AEO 영향 없음, JS 꺼져도 전부 보임)
   - 동작 줄이기 사용자는 아무것도 하지 않는다
   - 기존 연출(프리로더 카운터·히어로 사진 시차·티커·사진 마퀴·숫자 카운트·커서)은 그대로 두고,
     단순 .rv 페이드만 쓰던 블록을 넘겨받아 '빠르고 또렷한' 키네틱 장면으로 바꾼다
   - 리듬: 짧고 단호하게(expo/power4.out, 0.8~1.1초), 가로 와이프·패널 회전·큰 숫자 슬라이드 */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  function start() {
  var root = document.documentElement;
  root.classList.add('mx');
  var mobile = matchMedia('(max-width: 767px)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  var SNAP = 'expo.out', PUNCH = 'power4.out';

  // 1) 관성 스크롤 — 마우스·트랙패드만, 이 사이트는 조금 경쾌하게 (터치는 기본 스크롤)
  if (fine && window.Lenis) {
    var lenis = new Lenis({ duration: 1, smoothWheel: true, wheelMultiplier: 1.05 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    // 기존 앵커 스무스 스크롤(scrollIntoView)보다 먼저 받아 Lenis 로 이동
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault(); e.stopImmediatePropagation();
      lenis.scrollTo(target, { offset: -80 });
    }, true);
  }

  // 화면에 들어오면 한 번 재생 — 빠르게 지나쳐도 onEnter 가 불려 끝까지 재생, 탭이 숨어도 타임아웃으로 끝 상태 보장
  var TIMING = ['duration', 'ease', 'stagger', 'delay'];
  var claimed = [];
  function claim(list) { gsap.utils.toArray(list).forEach(function (el) { claimed.push(el); }); }
  function takeover(el) { if (el) el.classList.remove('rv', 'rv-scale', 'rv-d1', 'rv-d2', 'rv-d3', 'rv-d4'); return el; }
  function enter(targets, vars, trigger, start) {
    targets = gsap.utils.toArray(targets);
    if (!targets.length) return null;
    claim(targets);
    var from = {}, to = { opacity: 1, x: 0, y: 0, xPercent: 0, yPercent: 0, rotate: 0, rotateX: 0, rotateY: 0, skewX: 0, scale: 1, paused: true,
      onComplete: function () { gsap.set(targets, { clearProps: 'opacity,transform,transition,clipPath,translate' }); } };
    if ('clipPath' in vars) to.clipPath = vars.clipEnd || 'inset(0% 0% 0% 0%)';
    if ('translate' in vars) to.translate = '0px 0px';
    Object.keys(vars).forEach(function (k) { if (k !== 'clipEnd') (TIMING.indexOf(k) > -1 ? to : from)[k] = vars[k]; });
    gsap.set(targets, { transition: 'none' });
    var tw = gsap.fromTo(targets, from, to);
    ScrollTrigger.create({ trigger: trigger || targets[0], start: start || 'top 86%', once: true, onEnter: function () {
      tw.play();
      setTimeout(function () { if (tw.progress() < 1) tw.progress(1); }, (tw.totalDuration() + 0.6) * 1000);
    } });
    return tw;
  }
  function scrub(target, from, to, st) {
    claim(target);
    return gsap.fromTo(target, from, Object.assign({ ease: 'none', scrollTrigger: Object.assign({ scrub: true }, st) }, to));
  }
  // 그라데이션 글씨(background-clip:text) 안을 낱말로 쪼개면 낱말 레이어(inline-block·will-change)가 투명해진다(대구 2026-11-01)
  // → 그 요소 자체를 낱말 하나처럼 통째로 감싸 움직인다(요소 자신의 clip:text 는 transform 이 있어도 정상).
  function clipTextHost(node) {
    for (var e = node.parentElement; e; e = e.parentElement) {
      var cs = getComputedStyle(e);
      if (cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text') return e;
    }
    return null;
  }
  function splitWords(el, cls) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var hosts = [];
    while (walker.nextNode()) {
      var host = clipTextHost(walker.currentNode);
      if (host) { if (hosts.indexOf(host) < 0) hosts.push(host); continue; }
      nodes.push(walker.currentNode);
    }
    hosts.forEach(function (h) {
      if (h === el || h.contains(el)) return; // 제목 전체가 그라데이션(또는 그 안)이면 쪼개지 않음
      h.classList.add(cls);
      if (cls === 'mx-up') { var m = document.createElement('span'); m.className = 'mx-m'; h.parentNode.insertBefore(m, h); m.appendChild(h); }
    });
    nodes.forEach(function (node) {
      var parts = node.textContent.split(/(\s+)/);
      if (parts.join('').trim() === '') return;
      var frag = document.createDocumentFragment();
      parts.forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
        var i = document.createElement('span'); i.className = cls; i.textContent = p;
        if (cls === 'mx-up') { var m = document.createElement('span'); m.className = 'mx-m'; m.appendChild(i); frag.appendChild(m); }
        else frag.appendChild(i);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return el.querySelectorAll('.' + cls);
  }
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return gsap.utils.toArray((ctx || document).querySelectorAll(sel)); };

  // 섹션 제목: 금색 라벨 선이 먼저 그어지고, 제목은 왼쪽에서 오른쪽으로 닦아내듯(와이프)
  function titleWipe(h, trigger) {
    takeover(h);
    enter(h, { clipPath: 'inset(-10% 100% -10% 0%)', clipEnd: 'inset(-10% 0% -10% 0%)', x: -30, duration: 1.1, ease: SNAP }, trigger || h, 'top 88%');
  }
  $$('main .sec-label').forEach(function (l) {
    enter(l, { x: -24, opacity: 0, duration: 0.8, ease: PUNCH }, l, 'top 90%');
  });

  // ── 큰 숫자 띠(13yr · 3 specialists): 숫자가 바깥에서 밀고 들어오고, 뒤 그림자 숫자는 반대로 흐름
  $$('.key-nums .key-num').forEach(function (k, i) {
    takeover(k);
    var dir = i ? 1 : -1;
    var big = $('.big', k), ghost = $('.big-ghost', k);
    if (big) enter(big, { x: dir * (mobile ? 60 : 160), opacity: 0, duration: 1.2, ease: SNAP }, k, 'top 82%');
    var rest = $$('.sep-dot, .label, .desc, .sub-stats', k);
    enter(rest, { y: 24, opacity: 0, duration: 0.9, ease: PUNCH, stagger: 0.08, delay: 0.25 }, k, 'top 82%');
    if (ghost) scrub(ghost, { translate: (dir * -12) + '% 0px' }, { translate: (dir * 12) + '% 0px' }, { trigger: k, start: 'top bottom', end: 'bottom top' });
  });

  // ── 철학 문장: 스크롤에 맞춰 낱말이 한 장씩 앞으로 넘어오며 세워짐(3D 플립)
  var phil = $('#philosophy .philosophy-text');
  if (phil) {
    takeover(phil);
    claim(phil);
    phil.classList.add('mx-flipwrap');
    var words = splitWords(phil, 'mx-flip');
    gsap.fromTo(words, { rotateX: -88, opacity: 0.08, transformOrigin: '50% 100%' }, { rotateX: 0, opacity: 1, ease: 'none', stagger: 0.12,
      scrollTrigger: { trigger: phil, start: 'top 85%', end: 'center 55%', scrub: true } });
    var credit = $('#philosophy .philosophy-credit');
    if (credit) { takeover(credit); enter(credit, { x: 40, opacity: 0, duration: 1, ease: PUNCH }, credit, 'top 92%'); }
  }

  // ── 가치 4가지: 패널이 왼쪽 축을 기준으로 차례로 돌아 펼쳐짐(도미노)
  var values = $('.values');
  if (values) {
    var vt = $('.sec-title', values); if (vt) titleWipe(vt);
    var cards = $$('.v-card', values);
    cards.forEach(takeover);
    var vg = $('.values-grid', values);
    if (mobile) enter(cards, { y: 40, opacity: 0, duration: 0.9, ease: PUNCH, stagger: 0.08 }, vg, 'top 86%');
    else {
      gsap.set(vg, { perspective: 1400 });
      enter(cards, { rotateY: 80, opacity: 0, transformOrigin: '0% 50%', duration: 1.1, ease: PUNCH, stagger: 0.1 }, vg, 'top 84%');
    }
    enter($$('.v-card-num', values), { yPercent: 60, opacity: 0, duration: 1.2, ease: SNAP, stagger: 0.1, delay: 0.3 }, vg, 'top 84%');
  }

  // ── 진료: 대표 카드 사진은 오른쪽에서 닦여 나오고, 나머지 카드는 아래에서 막이 걷히듯
  var tr = $('#treatments');
  if (tr) {
    var tt = $('.sec-title', tr); if (tt) titleWipe(tt);
    var feat = $('.treat-featured', tr);
    if (feat) {
      takeover(feat);
      enter(feat, { y: 50, opacity: 0, duration: 1, ease: PUNCH }, feat, 'top 86%');
      var fimg = $('.treat-featured-img', feat);
      if (fimg) {
        enter(fimg, { clipPath: 'inset(0% 0% 0% 100%)', duration: 1.3, ease: 'power4.inOut', delay: 0.15 }, feat, 'top 86%');
        var fi = $('img', fimg);
        if (fi) { fimg.classList.add('mx-par'); gsap.fromTo(fi, { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: feat, start: 'top bottom', end: 'bottom top', scrub: true } }); }
      }
    }
    var tcs = $$('.treat-card:not(.treat-featured)', tr);
    tcs.forEach(takeover);
    enter(tcs, { clipPath: 'inset(100% 0% 0% 0%)', y: 40, duration: 1.1, ease: SNAP, stagger: 0.09 }, tcs[0], 'top 88%');
  }

  // ── 명동 진료 안내 카드: 오른쪽에서 비스듬히 미끄러져 들어와 바로 섬
  var md = $('#myeongdong-guide');
  if (md) {
    var mt = $('.sec-title', md); if (mt) titleWipe(mt);
    var mp = $('.sec-inner > p', md); if (mp) enter(mp, { y: 16, opacity: 0, duration: 0.9, ease: PUNCH, delay: 0.1 }, mp, 'top 90%');
    var lis = $$('.md-cards > li', md);
    enter(lis, { x: mobile ? 30 : 80, skewX: mobile ? 0 : -6, opacity: 0, duration: 1, ease: SNAP, stagger: 0.07 }, lis[0], 'top 88%');
  }

  // ── 의료진: 사진이 가운데에서 셔터처럼 열리고, 약력은 한 줄씩
  var team = $('#team');
  if (team) {
    var tmt = $('.sec-title', team); if (tmt) titleWipe(tmt);
    $$('.team-card', team).forEach(function (c, i) {
      takeover(c);
      var ph = $('.team-photo', c), info = $('.team-info', c);
      var d = (mobile ? 0 : i * 0.12);
      if (ph) enter(ph, { clipPath: 'inset(0% 50% 0% 50%)', duration: 1.1, ease: 'power4.inOut', delay: d }, c, 'top 86%');
      if (info) {
        enter($$('h3, .role', info), { x: -20, opacity: 0, duration: 0.8, ease: PUNCH, stagger: 0.06, delay: d + 0.35 }, c, 'top 86%');
        enter($$('.team-creds li', info), { x: -14, opacity: 0, duration: 0.6, ease: PUNCH, stagger: 0.05, delay: d + 0.5 }, c, 'top 86%');
      }
    });
  }

  // ── 진료 경험: 사진 콜라주가 세 방향에서 닦여 들어오고, 경험 항목은 오른쪽에서 차례로·아이콘은 한 바퀴
  var exp = $('#experience');
  if (exp) {
    var imgs = $$('.exp-images-grid img', exp);
    var clips = ['inset(0% 100% 0% 0%)', 'inset(100% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'];
    imgs.forEach(function (im, i) { enter(im, { clipPath: clips[i % 3], duration: 1.2, ease: 'power4.inOut', delay: i * 0.12 }, $('.exp-images-grid', exp), 'top 80%'); });
    var eh = $('.exp-text h2', exp); if (eh) titleWipe(eh);
    var ep = $('.exp-text > p', exp); if (ep) { takeover(ep); enter(ep, { y: 18, opacity: 0, duration: 0.9, ease: PUNCH, delay: 0.15 }, ep, 'top 90%'); }
    var items = $$('.exp-item', exp);
    items.forEach(takeover);
    enter(items, { x: mobile ? 0 : 60, y: mobile ? 24 : 0, opacity: 0, duration: 0.9, ease: SNAP, stagger: 0.1 }, items[0], 'top 88%');
    enter($$('.exp-item-icon', exp), { rotate: -180, scale: 0.4, opacity: 0, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.1, delay: 0.15 }, items[0], 'top 88%');
  }

  // ── 오시는 길: 지도가 가운데에서 동그랗게 퍼지고(신호처럼), 주소·연락처·진료시간은 차례로
  var loc = $('#location');
  if (loc) {
    var lt = $('.sec-title', loc); if (lt) titleWipe(lt);
    var map = $('.location-map', loc);
    if (map) { takeover(map); enter(map, { clipPath: 'circle(0% at 50% 50%)', clipEnd: 'circle(75% at 50% 50%)', duration: 1.4, ease: 'power3.inOut' }, map, 'top 84%'); }
    var blocks = $$('.loc-block', loc);
    blocks.forEach(takeover);
    enter(blocks, { x: mobile ? 0 : 50, y: mobile ? 24 : 0, opacity: 0, duration: 0.9, ease: SNAP, stagger: 0.1, delay: 0.2 }, blocks[0], 'top 88%');
  }

  // ── 가까운 역 카드: 분(MIN) 숫자가 위에서 떨어져 꽂힘
  var near = $$('main section').filter(function (s) { var h = $('h2', s); return h && /가까운/.test(h.textContent); })[0];
  if (near) {
    var nt = $('.sec-title', near); if (nt) titleWipe(nt);
    var grid = $$('.sec-inner > div', near).filter(function (d) { return d.children.length >= 4 && /grid/.test(d.getAttribute('style') || ''); })[0];
    if (grid) {
      var cs = Array.prototype.slice.call(grid.children);
      cs.forEach(takeover);
      enter(cs, { y: 40, scale: 0.94, opacity: 0, duration: 0.9, ease: PUNCH, stagger: { each: 0.06, grid: 'auto', from: 'start' } }, grid, 'top 88%');
      enter(cs.map(function (c) { return c.firstElementChild; }), { y: -36, opacity: 0, duration: 0.8, ease: 'bounce.out', stagger: 0.06, delay: 0.25 }, grid, 'top 88%');
    }
  }

  // ── 상담 예약: 제목 낱말이 기울어진 채 아래에서 솟아오르고, 버튼은 튕기듯
  var cta = $('.cta .cta-inner');
  if (cta) {
    var ch = $('h2', cta);
    if (ch) { takeover(ch); ch.classList.add('mx-kin'); enter(splitWords(ch, 'mx-up'), { yPercent: 110, rotate: 6, duration: 1, ease: SNAP, stagger: 0.05 }, cta, 'top 82%'); }
    var cp = $('p', cta); if (cp) { takeover(cp); enter(cp, { y: 20, opacity: 0, duration: 0.9, ease: PUNCH, delay: 0.3 }, cta, 'top 82%'); }
    var cb = $('.cta-btns', cta);
    if (cb) { takeover(cb); enter(cb.children, { y: 30, scale: 0.85, opacity: 0, duration: 0.8, ease: 'back.out(2)', stagger: 0.08, delay: 0.45 }, cta, 'top 82%'); }
  }

  // ── 나머지 .rv / .rv-scale(FAQ·증상·비용 등)은 모양 그대로 두고 신호만 넘겨받는다:
  //    IO 는 빠르게 건너뛴 구간을 놓치지만 ScrollTrigger 는 지나친 구간에도 onEnter 를 불러 반드시 끝 상태가 된다
  $$('main .rv, main .rv-scale').forEach(function (el) {
    if (el.classList.contains('vis')) return;
    ScrollTrigger.create({ trigger: el, start: 'top 94%', once: true, onEnter: function () { el.classList.add('vis'); } });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
