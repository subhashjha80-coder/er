/**
 * native-ads.js — ExamReady Always-Visible Ad Placeholders
 * ===========================================================
 * Injects polished native ad cards on every public page.
 * When real AdSense code is saved in Admin → Ad Manager, that
 * code takes over automatically.  When no code is saved, these
 * styled internal promotion cards fill the slots so the site
 * always looks finished and monetised.
 *
 * Include on every public page AFTER shared.js and animations.js:
 *   <script src="native-ads.js"></script>
 *
 * Works alongside ads.js — no conflicts.
 */

(function () {
  'use strict';

  const PAGE = window.location.pathname.split('/').pop() || 'index.html';
  if (PAGE.includes('admin')) return;
  if (document.body.dataset.nativeAdsReady === '1') return;
  document.body.dataset.nativeAdsReady = '1';

  /* ── Read saved ad slot config ── */
  function getSlotCode(key) {
    try {
      const slots = JSON.parse(localStorage.getItem('er_ad_slots') || '{}');
      const slot  = slots[key] || {};
      if (slot.enabled === false) return null;          // disabled
      if ((slot.adCode || '').trim()) return slot.adCode; // real code
      return '';                                          // show native
    } catch (e) { return ''; }
  }

  /* ── Native ad variants ── */
  const VARIANTS = [
    { icon: '📄', tag: 'Free PDFs', title: 'PYQ Papers for Every Subject',      desc: 'Previous year question papers with solutions — free PDF access, no sign-up needed.',       cta: 'Download Free',   href: 'pyq.html',          color: '#fff0f0', accent: '#e8211a' },
    { icon: '🎯', tag: 'Practice',  title: 'Chapter-wise MCQ Quiz Practice',    desc: 'Instant results, zero login. Pick any subject and sharpen your board exam skills today.', cta: 'Start a Quiz',    href: 'quizzes.html',      color: '#f0fff8', accent: '#2f9e44' },
    { icon: '📚', tag: 'Questions', title: 'Curated Question Banks',            desc: 'Chapter-wise question sets covering every important topic for CBSE board exams.',          cta: 'Browse Banks',    href: 'questionbank.html', color: '#f0f4ff', accent: '#3b5bdb' },
    { icon: '📖', tag: 'Solutions', title: 'CBSE Text Solution Articles',       desc: 'Readable board-style solutions for every subject — faster and cleaner than PDFs.',        cta: 'Read Solutions',  href: 'solutions.html',    color: '#fffbf0', accent: '#c97a00' },
    { icon: '🔬', tag: 'Science',   title: 'Class 10 Science Resources',        desc: 'PYQs, question banks, and step-by-step solutions for Science — all in one place.',       cta: 'Study Science',   href: 'class10.html',      color: '#f3f0ff', accent: '#6741d9' },
    { icon: '📐', tag: 'Maths',     title: 'Class 12 Maths Exam Prep',          desc: 'Solved PYQs, chapter-wise practice questions, and solutions for Class 12 Maths.',        cta: 'Study Maths',     href: 'class12.html',      color: '#fff5f0', accent: '#e67700' },
  ];

  let _idx = 0;
  function next() { return VARIANTS[_idx++ % VARIANTS.length]; }

  /* ── Build elements ── */
  function makeTopStrip() {
    const items = VARIANTS.slice(0, 3);
    const el = document.createElement('div');
    el.dataset.nativeSlot = 'top';
    el.style.cssText = 'max-width:1200px;margin:0 auto;padding:0 24px 20px;box-sizing:border-box;';
    el.innerHTML = `
      <div style="background:linear-gradient(140deg,#fffcfc,#fff5f3);border:1px solid #ededef;border-radius:20px;padding:16px 20px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#e8211a,#ff7a50,#ffb347)"></div>
        <div style="position:absolute;top:9px;right:13px;font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;color:rgba(232,33,26,0.4)">Sponsored</div>
        <div style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:rgba(232,33,26,0.6);margin-bottom:12px">Recommended Study Tools</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
          ${items.map(v => `
            <a href="${v.href}" style="background:#fff;border:1px solid #eeeeef;border-radius:14px;padding:14px 12px;text-align:center;text-decoration:none;color:inherit;display:flex;flex-direction:column;align-items:center;gap:6px;transition:border-color .2s,box-shadow .2s,transform .2s;" onmouseover="this.style.transform='translateY(-2px)';this.style.borderColor='rgba(232,33,26,.3)'" onmouseout="this.style.transform='';this.style.borderColor='#eeeeef'">
              <span style="font-size:26px">${v.icon}</span>
              <span style="font-size:11.5px;font-weight:900;color:#1a1a1a;line-height:1.35;font-family:'Nunito',sans-serif">${v.title.split(' ').slice(0,4).join(' ')}</span>
              <span style="font-size:10px;font-weight:700;color:#888;font-family:'Nunito',sans-serif">${v.tag}</span>
            </a>`).join('')}
        </div>
      </div>`;
    return el;
  }

  function makeInlineCard(compact) {
    const v = next();
    const el = document.createElement('div');
    el.dataset.nativeSlot = 'inline';
    el.style.cssText = 'max-width:1200px;margin:0 auto;padding:0 24px ' + (compact ? '16px' : '20px') + ';box-sizing:border-box;';
    el.innerHTML = `
      <div style="background:linear-gradient(140deg,#fafafa,#f4f4f6);border:1.5px solid #e8e8ea;border-radius:18px;padding:${compact ? '13px 18px' : '18px 22px'};display:flex;align-items:center;gap:16px;position:relative;overflow:hidden;transition:border-color .2s,box-shadow .2s;" onmouseover="this.style.borderColor='rgba(232,33,26,.3)';this.style.boxShadow='0 7px 26px rgba(232,33,26,.08)'" onmouseout="this.style.borderColor='#e8e8ea';this.style.boxShadow=''">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${v.accent},#ff8d66)"></div>
        <div style="position:absolute;top:8px;right:12px;font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;color:#bbb">Sponsored</div>
        <div style="width:${compact ? '42px' : '54px'};height:${compact ? '42px' : '54px'};border-radius:15px;flex-shrink:0;background:${v.color};display:flex;align-items:center;justify-content:center;font-size:${compact ? '20px' : '26px'};">${v.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:9.5px;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;color:${v.accent};margin-bottom:4px;font-family:'Nunito',sans-serif">${v.tag}</div>
          <div style="font-size:${compact ? '13px' : '15px'};font-weight:900;color:#1a1a1a;line-height:1.35;margin-bottom:${compact ? '0' : '4px'};font-family:'Nunito',sans-serif">${v.title}</div>
          ${compact ? '' : `<div style="font-size:12.5px;color:#777;font-weight:700;line-height:1.55;font-family:'Nunito',sans-serif">${v.desc}</div>`}
        </div>
        <a href="${v.href}" style="flex-shrink:0;background:${v.accent};color:#fff;padding:${compact ? '8px 14px' : '10px 18px'};border-radius:11px;font-size:12.5px;font-weight:900;text-decoration:none;white-space:nowrap;font-family:'Nunito',sans-serif;transition:background .2s,transform .2s;" onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform=''">${v.cta} →</a>
      </div>`;
    return el;
  }

  function makeBanner() {
    const v = next();
    const el = document.createElement('div');
    el.dataset.nativeSlot = 'banner';
    el.style.cssText = 'max-width:1200px;margin:0 auto;padding:0 24px 20px;box-sizing:border-box;';
    el.innerHTML = `
      <div style="background:linear-gradient(135deg,#0d0d0d 0%,#1a0505 55%,#2a0a0a 100%);border-radius:22px;padding:28px 34px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;position:relative;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.14);">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#e8211a,#ff8d66,#ffb347)"></div>
        <div style="position:absolute;top:9px;right:13px;font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.25)">Sponsored</div>
        <div style="min-width:0">
          <div style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:rgba(232,33,26,.55);margin-bottom:8px;font-family:'Nunito',sans-serif">${v.tag}</div>
          <div style="font-size:clamp(17px,3vw,22px);font-weight:900;color:#fff;margin-bottom:8px;line-height:1.2;font-family:'Nunito',sans-serif">${v.title}</div>
          <div style="font-size:13px;color:rgba(255,255,255,.5);font-weight:600;line-height:1.7;max-width:560px;font-family:'Nunito',sans-serif">${v.desc}</div>
        </div>
        <a href="${v.href}" style="flex-shrink:0;background:#e8211a;color:#fff;padding:14px 26px;border-radius:12px;font-size:13.5px;font-weight:900;text-decoration:none;white-space:nowrap;box-shadow:0 6px 22px rgba(232,33,26,.38);font-family:'Nunito',sans-serif;transition:background .2s,transform .2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">${v.cta} →</a>
      </div>`;
    return el;
  }

  function makeMiniBreak() {
    const v = next();
    const el = document.createElement('div');
    el.dataset.nativeSlot = 'mini';
    el.style.cssText = 'max-width:1200px;margin:0 auto 20px;padding:0 24px;box-sizing:border-box;';
    el.innerHTML = `
      <div style="background:#fff;border:1px solid #e8e8ea;border-radius:14px;padding:13px 18px;display:flex;align-items:center;gap:12px;position:relative;overflow:hidden;">
        <div style="position:absolute;left:0;top:0;bottom:0;width:3px;background:${v.accent}"></div>
        <span style="font-size:22px;flex-shrink:0">${v.icon}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:900;color:#1a1a1a;font-family:'Nunito',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${v.title}</div>
          <div style="font-size:11px;color:#888;font-weight:700;font-family:'Nunito',sans-serif">${v.tag}</div>
        </div>
        <a href="${v.href}" style="flex-shrink:0;background:${v.color};color:${v.accent};padding:7px 14px;border-radius:8px;font-size:11.5px;font-weight:900;text-decoration:none;white-space:nowrap;font-family:'Nunito',sans-serif;border:1px solid ${v.accent}22">${v.cta}</a>
        <span style="position:absolute;top:5px;right:8px;font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:#bbb">Spon.</span>
      </div>`;
    return el;
  }

  /* ── Inject helper — respects real ad code ── */
  function inject(key, buildFn, anchorFn) {
    const code = getSlotCode(key);
    if (code === null) return; // disabled
    if (document.querySelector('[data-native-slot],[data-ad-slot="' + key + '"]')) return;

    let el;
    if (code) {
      // Real ad code exists — inject it
      el = document.createElement('div');
      el.dataset.adSlot = key;
      el.innerHTML = code;
      el.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
        s.textContent = old.textContent;
        old.replaceWith(s);
      });
    } else {
      el = buildFn();
    }
    anchorFn(el);
  }

  /* ── Run injections ── */
  function run() {
    const hero   = document.querySelector('.page-hero, .hero, section.hero');
    const main   = document.querySelector('main');
    const footer = document.querySelector('footer');

    // 1. Top strip — after hero
    inject('top', makeTopStrip, function (el) {
      if (hero) hero.insertAdjacentElement('afterend', el);
      else if (main) main.insertAdjacentElement('afterbegin', el);
    });

    // 2. Inline break — inside main, after 2nd child
    if (main) {
      const kids = Array.from(main.children).filter(c => !c.dataset.nativeSlot && !c.dataset.adSlot && !c.matches('script,style'));
      const anchor = kids[Math.min(1, kids.length - 1)];
      if (anchor) {
        inject('inline', function () { return makeInlineCard(false); }, function (el) {
          anchor.insertAdjacentElement('beforebegin', el);
        });
      }
    }

    // 3. Between sections — after 2nd class-section block
    const sections = document.querySelectorAll('.class-section, .stream-section, .subject-group');
    if (sections.length >= 2) {
      inject('between', makeMiniBreak, function (el) {
        sections[Math.min(1, sections.length - 1)].insertAdjacentElement('afterend', el);
      });
    }

    // 4. Pre-footer banner
    inject('footer', makeBanner, function (el) {
      if (footer) footer.insertAdjacentElement('beforebegin', el);
    });

    // 5. Results / post-quiz banner
    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
      inject('results', makeBanner, function (el) {
        resultCard.insertAdjacentElement('afterend', el);
      });
    }
  }

  /* ── Mobile sticky bottom bar ── */
  function runMobileBottom() {
    if (window.innerWidth > 768) return;
    if (document.getElementById('native-mba')) return;
    if (sessionStorage.getItem('native_mba_off') === '1') return;

    const code = getSlotCode('mobile_bottom');
    if (code === null) return;

    const v = next();
    const bar = document.createElement('div');
    bar.id = 'native-mba';
    bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:1300;background:#fff;border-top:1px solid #e8e8ea;box-shadow:0 -5px 28px rgba(0,0,0,.11);transform:translateY(100%);transition:transform .4s cubic-bezier(.22,1,.36,1);pointer-events:none;';

    if (code) {
      bar.innerHTML = `<div style="padding:8px 14px">${code}</div>`;
    } else {
      bar.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;padding:9px 14px;min-height:56px;max-width:100%;overflow:hidden">
          <div style="width:40px;height:40px;border-radius:12px;flex-shrink:0;background:${v.color};display:flex;align-items:center;justify-content:center;font-size:20px">${v.icon}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;color:${v.accent};line-height:1;font-family:'Nunito',sans-serif">Sponsored</div>
            <div style="font-size:12.5px;font-weight:900;color:#1a1a1a;font-family:'Nunito',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${v.title}</div>
          </div>
          <a href="${v.href}" style="flex-shrink:0;background:${v.accent};color:#fff;padding:9px 14px;border-radius:10px;font-size:11.5px;font-weight:900;text-decoration:none;white-space:nowrap;font-family:'Nunito',sans-serif">${v.cta}</a>
          <button id="native-mba-close" style="flex-shrink:0;width:26px;height:26px;border-radius:50%;background:#f0f0f0;border:none;cursor:pointer;font-size:12px;color:#666;display:flex;align-items:center;justify-content:center">✕</button>
        </div>`;
    }

    document.body.appendChild(bar);

    if (!code) {
      bar.querySelector('#native-mba-close').onclick = function () {
        bar.style.transform = 'translateY(100%)';
        document.body.style.paddingBottom = '';
        sessionStorage.setItem('native_mba_off', '1');
        setTimeout(function () { bar.remove(); }, 420);
      };
    }

    setTimeout(function () {
      bar.style.transform = 'translateY(0)';
      bar.style.pointerEvents = 'auto';
      document.body.style.paddingBottom = '66px';
    }, 3500);
  }

  /* ── Watch for dynamically rendered result cards (quiz page) ── */
  function watchForResults() {
    const mount = document.getElementById('quizMount');
    if (!mount) return;
    const obs = new MutationObserver(function () { run(); });
    obs.observe(mount, { childList: true, subtree: false });
  }

  /* ── Boot ── */
  function boot() {
    run();
    setTimeout(run, 800);  // retry for dynamically loaded content
    runMobileBottom();
    watchForResults();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
