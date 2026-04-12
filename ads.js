/* ================================================================
   EXAMREADY — AD ENGINE v3  |  ads.js
   Drop this AFTER shared.js and animations.js on every public page.
   Admin controls all slots via Admin → Ad Manager.

   Slots available (admin can enable/disable + paste real ad code):
   ─ top_banner        After hero, before main content
   ─ inline_1          First in-content break
   ─ inline_2          Second in-content break
   ─ inline_3          Third in-content break (long pages)
   ─ between_sections  Between class/chapter blocks
   ─ pre_footer        Just above footer
   ─ results_banner    After quiz result / end of article
   ─ sidebar_sticky    Desktop sticky right sidebar (≥1280px)
   ─ mobile_bottom     Mobile sticky bottom bar (≤768px)
   ─ quiz_sidebar      Inside quiz page side panel
   ─ solution_mid      Mid-article on solution-post pages
   ================================================================ */

(function () {
  'use strict';

  const PAGE = window.location.pathname.split('/').pop() || 'index.html';
  if (['admin.html'].includes(PAGE)) return;
  if (document.body.dataset.erAdsV3 === '1') return;
  document.body.dataset.erAdsV3 = '1';

  /* ── Slot config from admin ── */
  function getSlot(key) {
    try {
      const slots = JSON.parse(localStorage.getItem('er_ad_slots') || '{}');
      return slots[key] || {};
    } catch (e) { return {}; }
  }

  function isEnabled(key) {
    const s = getSlot(key);
    return s.enabled !== false;
  }

  function getCode(key) {
    return (getSlot(key).adCode || '').trim();
  }

  /* ── Activate scripts injected via innerHTML ── */
  function activateScripts(el) {
    el.querySelectorAll('script').forEach(old => {
      const s = document.createElement('script');
      Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
      s.textContent = old.textContent;
      old.replaceWith(s);
    });
  }

  /* ── Ensure stylesheet is loaded ── */
  function ensureCSS() {
    if (!document.getElementById('er-ads-css-v3')) {
      const l = document.createElement('link');
      l.id = 'er-ads-css-v3'; l.rel = 'stylesheet'; l.href = 'ads.css';
      document.head.appendChild(l);
    }
  }

  /* ================================================================
     NATIVE AD BUILDERS — shown when no real ad code is pasted.
     Replace by pasting AdSense / any network code in Admin → Ad Manager.
     ================================================================ */

  const NATIVE_VARIANTS = [
    { icon: '📄', tag: 'Past Papers', title: 'PYQ Papers — Free PDF Download', desc: 'Solved previous year papers for every subject, Class 9–12.', cta: 'Download Free', href: 'pyq.html' },
    { icon: '🎯', tag: 'Practice', title: 'Chapter-wise MCQ Quizzes', desc: 'Instant results, zero login. Pick any subject and start now.', cta: 'Open Quiz', href: 'quizzes.html' },
    { icon: '📚', tag: 'Question Banks', title: 'Chapter-wise Question Banks', desc: 'Curated question sets covering all important topics for boards.', cta: 'Browse Banks', href: 'questionbank.html' },
    { icon: '📖', tag: 'Solutions', title: 'CBSE Solution Articles', desc: 'Readable text solutions for every subject — faster than PDFs.', cta: 'Read Solutions', href: 'solutions.html' },
    { icon: '📐', tag: 'Maths', title: 'Class 10 Maths Resources', desc: 'PYQs, question banks, and step-by-step solutions in one place.', cta: 'Study Maths', href: 'class10.html' },
    { icon: '🔬', tag: 'Science', title: 'Class 9 Science PYQ Papers', desc: 'Free PDF question papers from past board exams with solutions.', cta: 'Get Papers', href: 'class9.html' },
  ];

  let _variantIdx = 0;
  function nextVariant() { return NATIVE_VARIANTS[_variantIdx++ % NATIVE_VARIANTS.length]; }

  /* ── Build wrapper element containing real code or native fallback ── */
  function buildSlot(key, opts = {}) {
    if (!isEnabled(key)) return null;
    const code = getCode(key);
    const wrap = document.createElement('div');
    wrap.dataset.adSlot = key;
    wrap.className = opts.wrapClass || 'er-ad-wrap';

    if (code) {
      wrap.innerHTML = code;
      activateScripts(wrap);
      return wrap;
    }

    /* native fallback */
    const v = opts.variant || nextVariant();
    const compact = opts.compact;

    if (opts.type === 'strip') {
      wrap.innerHTML = buildNativeStrip();
    } else if (opts.type === 'banner') {
      wrap.innerHTML = buildNativeBanner(v);
    } else if (opts.type === 'mini') {
      wrap.innerHTML = buildNativeMini(v);
    } else {
      wrap.innerHTML = buildNativeInline(v, compact);
    }
    return wrap;
  }

  function buildNativeStrip() {
    const items = NATIVE_VARIANTS.slice(0, 3);
    return `<div class="er-ad-strip">
      <span class="er-ad-strip-label">Recommended</span>
      <div class="er-ad-strip-grid">
        ${items.map(v => `<a class="er-ad-strip-card" href="${v.href}">
          <span class="er-ad-strip-icon">${v.icon}</span>
          <span class="er-ad-strip-title">${v.title}</span>
          <span class="er-ad-strip-sub">${v.tag}</span>
        </a>`).join('')}
      </div>
    </div>`;
  }

  function buildNativeInline(v, compact) {
    return `<div class="er-ad-inline${compact ? ' er-ad-inline--compact' : ''}">
      <span class="er-ad-spon">Sponsored</span>
      <div class="er-ad-inline-icon">${v.icon}</div>
      <div class="er-ad-inline-body">
        <div class="er-ad-inline-tag">${v.tag}</div>
        <div class="er-ad-inline-title">${v.title}</div>
        <div class="er-ad-inline-desc">${v.desc}</div>
      </div>
      <a class="er-ad-inline-cta" href="${v.href}">${v.cta} →</a>
    </div>`;
  }

  function buildNativeBanner(v) {
    return `<div class="er-ad-banner">
      <div class="er-ad-banner-spon">Sponsored</div>
      <div class="er-ad-banner-body">
        <div class="er-ad-banner-title">${v.title}</div>
        <div class="er-ad-banner-desc">${v.desc}</div>
      </div>
      <a class="er-ad-banner-cta" href="${v.href}">${v.cta} →</a>
    </div>`;
  }

  function buildNativeMini(v) {
    return `<div class="er-ad-mini">
      <span class="er-ad-mini-icon">${v.icon}</span>
      <div class="er-ad-mini-body">
        <div class="er-ad-mini-title">${v.title}</div>
        <div class="er-ad-mini-sub">${v.tag}</div>
      </div>
      <a class="er-ad-mini-cta" href="${v.href}">View →</a>
      <span class="er-ad-spon">Spon.</span>
    </div>`;
  }

  /* ================================================================
     INJECTION HELPERS
     ================================================================ */

  function insertAfter(ref, el) {
    if (ref && ref.parentNode && el) ref.insertAdjacentElement('afterend', el);
  }

  function insertBefore(ref, el) {
    if (ref && ref.parentNode && el) ref.insertAdjacentElement('beforebegin', el);
  }

  function appendTo(parent, el) {
    if (parent && el) parent.appendChild(el);
  }

  /* ── Avoid double-injecting a slot ── */
  function alreadyInjected(key) {
    return !!document.querySelector(`[data-ad-slot="${key}"]`);
  }

  /* ================================================================
     PAGE-SPECIFIC INJECTION
     ================================================================ */

  /* ── 1. TOP BANNER — all pages, after hero ── */
  function injectTopBanner() {
    if (alreadyInjected('top_banner')) return;
    const hero = document.querySelector('.page-hero, .hero, section.hero');
    const main = document.querySelector('main');
    const el = buildSlot('top_banner', { type: 'strip', wrapClass: 'er-ad-wrap er-ad-wrap--top' });
    if (hero) insertAfter(hero, el);
    else if (main) main.insertAdjacentElement('afterbegin', el);
  }

  /* ── 2. INLINE breaks — inside <main> between content children ── */
  function injectInlineBreaks() {
    const main = document.querySelector('main');
    if (!main) return;
    const kids = Array.from(main.children).filter(
      el => !el.dataset.adSlot && !el.matches('script, style')
    );

    const positions = [
      { key: 'inline_1', idx: 1, compact: false },
      { key: 'inline_2', idx: 3, compact: true  },
      { key: 'inline_3', idx: 5, compact: true  },
    ];

    positions.forEach(({ key, idx, compact }) => {
      if (alreadyInjected(key)) return;
      const anchor = kids[Math.min(idx, kids.length - 1)];
      if (!anchor) return;
      const el = buildSlot(key, { type: 'inline', compact, wrapClass: 'er-ad-wrap er-ad-wrap--inline' });
      if (el) insertBefore(anchor, el);
    });
  }

  /* ── 3. BETWEEN SECTIONS — class/chapter listing pages ── */
  function injectBetweenSections() {
    if (alreadyInjected('between_sections')) return;
    const sections = document.querySelectorAll('.class-section, .stream-section, .subject-group');
    if (sections.length < 2) return;
    const target = sections[Math.min(1, sections.length - 1)];
    const el = buildSlot('between_sections', { type: 'mini', wrapClass: 'er-ad-wrap er-ad-wrap--between' });
    if (el) insertAfter(target, el);

    /* second break on very long pages */
    if (sections.length >= 4 && !alreadyInjected('between_sections_2')) {
      const target2 = sections[Math.min(3, sections.length - 1)];
      const el2 = buildSlot('between_sections', { type: 'mini', wrapClass: 'er-ad-wrap er-ad-wrap--between' });
      if (el2) { el2.dataset.adSlot = 'between_sections_2'; insertAfter(target2, el2); }
    }
  }

  /* ── 4. PRE-FOOTER — just before footer on every page ── */
  function injectPreFooter() {
    if (alreadyInjected('pre_footer')) return;
    const footer = document.querySelector('footer');
    if (!footer) return;
    const el = buildSlot('pre_footer', { type: 'banner', wrapClass: 'er-ad-wrap er-ad-wrap--pre-footer' });
    if (el) insertBefore(footer, el);
  }

  /* ── 5. RESULTS BANNER — quiz result card & solution post ── */
  function injectResultsBanner() {
    if (alreadyInjected('results_banner')) return;
    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
      const el = buildSlot('results_banner', { type: 'banner', wrapClass: 'er-ad-wrap er-ad-wrap--results' });
      if (el) insertAfter(resultCard, el);
      return;
    }
    const articleFoot = document.querySelector('.article-foot');
    if (articleFoot) {
      const el = buildSlot('results_banner', { type: 'banner', wrapClass: 'er-ad-wrap er-ad-wrap--results' });
      const parent = articleFoot.closest('.article-card');
      if (parent && el) insertAfter(parent, el);
    }
  }

  /* ── 6. SOLUTION MID — halfway through article body ── */
  function injectSolutionMid() {
    if (PAGE !== 'solution-post.html') return;
    if (alreadyInjected('solution_mid')) return;
    const body = document.querySelector('.article-body');
    if (!body) return;
    const paras = body.querySelectorAll('p');
    const midIdx = Math.floor(paras.length / 2);
    const midPara = paras[midIdx];
    if (midPara) {
      const el = buildSlot('solution_mid', { type: 'mini', wrapClass: 'er-ad-wrap er-ad-wrap--solution-mid' });
      if (el) insertBefore(midPara, el);
    }
  }

  /* ── 7. QUIZ SIDEBAR AD — inside quiz side panel ── */
  function injectQuizSidebar() {
    if (PAGE !== 'quiz.html') return;
    if (alreadyInjected('quiz_sidebar')) return;
    const observer = new MutationObserver(() => {
      const sideStack = document.querySelector('.side-stack');
      if (!sideStack || alreadyInjected('quiz_sidebar')) return;
      const el = buildSlot('quiz_sidebar', { type: 'inline', compact: true, wrapClass: 'er-ad-wrap er-ad-wrap--quiz-side' });
      if (el) appendTo(sideStack, el);
    });
    observer.observe(document.getElementById('quizMount') || document.body, { childList: true, subtree: true });
  }

  /* ── 8. STICKY DESKTOP SIDEBAR ── */
  function injectStickyDesktop() {
    if (window.innerWidth < 1280) return;
    if (document.getElementById('er-sticky-sidebar-v3')) return;
    if (sessionStorage.getItem('er_sticky_v3_dismissed') === '1') return;
    if (!isEnabled('sidebar_sticky')) return;
    const code = getCode('sidebar_sticky');

    const el = document.createElement('div');
    el.id = 'er-sticky-sidebar-v3';
    el.setAttribute('aria-label', 'Sponsored');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'er-sticky-close';
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Close ad');
    closeBtn.onclick = () => {
      el.classList.remove('er-sticky-visible');
      sessionStorage.setItem('er_sticky_v3_dismissed', '1');
      setTimeout(() => el.remove(), 420);
    };
    el.appendChild(closeBtn);

    if (code) {
      const inner = document.createElement('div');
      inner.style.padding = '10px';
      inner.innerHTML = code;
      el.appendChild(inner);
      activateScripts(inner);
    } else {
      const v = nextVariant();
      el.innerHTML += `
        <div class="er-sticky-cover">${v.icon}</div>
        <div class="er-sticky-body">
          <div class="er-sticky-tag">${v.tag}</div>
          <div class="er-sticky-title">${v.title}</div>
          <div class="er-sticky-desc">${v.desc}</div>
          <a class="er-sticky-cta" href="${v.href}">${v.cta} →</a>
        </div>`;
    }

    document.body.appendChild(el);
    setTimeout(() => {
      if (window.scrollY > 150) el.classList.add('er-sticky-visible');
    }, 2500);
    window.addEventListener('scroll', () => {
      if (sessionStorage.getItem('er_sticky_v3_dismissed') === '1') return;
      if (window.scrollY > 300) el.classList.add('er-sticky-visible');
      else el.classList.remove('er-sticky-visible');
    }, { passive: true });
  }

  /* ── 9. MOBILE STICKY BOTTOM BAR ── */
  function injectMobileBottom() {
    if (window.innerWidth > 768) return;
    if (document.getElementById('er-mobile-bottom-v3')) return;
    if (sessionStorage.getItem('er_mba_v3_dismissed') === '1') return;
    if (!isEnabled('mobile_bottom')) return;
    const code = getCode('mobile_bottom');

    const bar = document.createElement('div');
    bar.id = 'er-mobile-bottom-v3';
    bar.setAttribute('aria-label', 'Sponsored');

    if (code) {
      bar.innerHTML = `<div style="padding:8px 14px">${code}</div>`;
      activateScripts(bar);
    } else {
      const v = nextVariant();
      bar.innerHTML = `
        <div class="er-mba-inner">
          <div class="er-mba-icon">${v.icon}</div>
          <div class="er-mba-body">
            <div class="er-mba-spon">Sponsored</div>
            <div class="er-mba-title">${v.title}</div>
          </div>
          <a class="er-mba-cta" href="${v.href}">${v.cta}</a>
          <button class="er-mba-close" aria-label="Close">✕</button>
        </div>`;
      bar.querySelector('.er-mba-close').onclick = () => {
        bar.classList.remove('er-mba-visible');
        document.body.classList.remove('er-has-mba');
        sessionStorage.setItem('er_mba_v3_dismissed', '1');
        setTimeout(() => bar.remove(), 420);
      };
    }
    document.body.appendChild(bar);
    setTimeout(() => { bar.classList.add('er-mba-visible'); document.body.classList.add('er-has-mba'); }, 3500);
  }

  /* ================================================================
     MAIN INJECTION ORCHESTRATOR
     ================================================================ */
  function run() {
    ensureCSS();
    injectTopBanner();
    injectPreFooter();
    injectResultsBanner();
    injectSolutionMid();
    injectQuizSidebar();
    injectStickyDesktop();
    injectMobileBottom();

    /* Inline + between need dynamic content to exist — retry */
    const tryDynamic = () => {
      injectInlineBreaks();
      injectBetweenSections();
    };
    tryDynamic();
    setTimeout(tryDynamic, 800);
    setTimeout(tryDynamic, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  /* ── Re-run on quiz result render (MutationObserver) ── */
  const quizMount = document.getElementById('quizMount');
  if (quizMount) {
    const obs = new MutationObserver(() => injectResultsBanner());
    obs.observe(quizMount, { childList: true, subtree: false });
  }

})();
