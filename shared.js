// ===== EXAMREADY SHARED DATA STORE =====
// All content is persisted in localStorage so admin changes appear site-wide

// ===== DEFAULTS =====
const DEFAULTS = {
  pdfs: {
    "9-math-pyq": [
      { id:"p1", name:"Class 9 Maths PYQ 2023", year:"2023", url:"#", size:"2.1 MB" },
      { id:"p2", name:"Class 9 Maths PYQ 2022", year:"2022", url:"#", size:"1.8 MB" },
    ],
    "9-math-qb": [
      { id:"p3", name:"Class 9 Maths Question Bank Ch 1-5", url:"#", size:"3.2 MB" },
    ],
    "9-math-sol": [
      { id:"ps1", name:"Class 9 Maths NCERT Solutions - All Chapters", url:"#", size:"4.5 MB" },
    ],
    "9-science-pyq": [
      { id:"p4", name:"Class 9 Science PYQ 2023", year:"2023", url:"#", size:"2.4 MB" },
    ],
    "9-science-qb": [
      { id:"p5", name:"Class 9 Science Question Bank", url:"#", size:"4.1 MB" },
    ],
    "9-science-sol": [
      { id:"ps2", name:"Class 9 Science NCERT Solutions - All Chapters", url:"#", size:"3.8 MB" },
    ],
    "9-english-sol": [], "9-sst-sol": [], "9-hindi-sol": [],
    "10-math-pyq": [
      { id:"p6", name:"Class 10 Maths PYQ 2023", year:"2023", url:"#", size:"2.3 MB" },
      { id:"p7", name:"Class 10 Maths PYQ 2022", year:"2022", url:"#", size:"2.0 MB" },
    ],
    "10-math-qb": [{ id:"p8", name:"Class 10 Maths Question Bank", url:"#", size:"3.8 MB" }],
    "10-math-sol": [{ id:"ps3", name:"Class 10 Maths NCERT Solutions - All Chapters", url:"#", size:"5.1 MB" }],
    "10-science-pyq": [{ id:"p9", name:"Class 10 Science PYQ 2023", year:"2023", url:"#", size:"2.7 MB" }],
    "10-science-qb": [], "10-science-sol": [{ id:"ps4", name:"Class 10 Science NCERT Solutions", url:"#", size:"4.2 MB" }],
    "10-english-sol": [], "10-sst-sol": [], "10-hindi-sol": [],
    "11-physics-pyq": [{ id:"p10", name:"Class 11 Physics PYQ 2023", year:"2023", url:"#", size:"3.1 MB" }],
    "11-physics-qb": [], "11-physics-sol": [],
    "11-chemistry-pyq": [], "11-chemistry-qb": [], "11-chemistry-sol": [],
    "11-math-pyq": [], "11-math-qb": [], "11-math-sol": [],
    "11-biology-sol": [], "11-cs-sol": [],
    "12-physics-pyq": [
      { id:"p11", name:"Class 12 Physics PYQ 2023", year:"2023", url:"#", size:"3.4 MB" },
      { id:"p12", name:"Class 12 Physics PYQ 2022", year:"2022", url:"#", size:"3.0 MB" },
    ],
    "12-physics-qb": [], "12-physics-sol": [],
    "12-chemistry-pyq": [], "12-chemistry-qb": [], "12-chemistry-sol": [],
    "12-math-pyq": [], "12-math-qb": [], "12-math-sol": [],
    "12-biology-sol": [], "12-cs-sol": [],
  },
  quizzes: {
    "9-math": [{
      id:"q1", title:"Class 9 Maths - Number Systems", subject:"Mathematics", class:"9",
      questions: [
        { q:"Which of the following is an irrational number?", opts:["sqrt(4)","sqrt(9)","sqrt(2)","sqrt(16)"], ans:2 },
        { q:"Every rational number is also a:", opts:["Natural number","Integer","Real number","Whole number"], ans:2 },
        { q:"The decimal expansion of a rational number is:", opts:["Always terminating","Always non-terminating","Terminating or repeating","None"], ans:2 },
      ]
    }],
    "9-science": [{
      id:"q2", title:"Class 9 Science - Matter", subject:"Science", class:"9",
      questions: [
        { q:"Which state of matter has definite shape and volume?", opts:["Gas","Liquid","Solid","Plasma"], ans:2 },
        { q:"Conversion of solid to gas directly is called:", opts:["Evaporation","Condensation","Sublimation","Fusion"], ans:2 },
      ]
    }],
    "10-math": [{
      id:"q3", title:"Class 10 Maths - Real Numbers", subject:"Mathematics", class:"10",
      questions: [
        { q:"HCF of 96 and 404 is:", opts:["4","8","12","16"], ans:0 },
        { q:"Every composite number as a product of primes follows:", opts:["Euclid's theorem","Fundamental theorem of arithmetic","Division algorithm","None"], ans:1 },
      ]
    }],
    "10-science": [], "11-physics": [], "11-chemistry": [], "11-math": [],
    "12-physics": [{
      id:"q4", title:"Class 12 Physics - Electrostatics", subject:"Physics", class:"12",
      questions: [
        { q:"The SI unit of electric charge is:", opts:["Ampere","Volt","Coulomb","Farad"], ans:2 },
        { q:"Electric field lines start from:", opts:["Negative charge","Positive charge","Both","Neither"], ans:1 },
      ]
    }],
    "12-chemistry": [], "12-math": [],
  }
};

// ===== CORE DATA API =====
function getData(key) {
  try {
    const raw = localStorage.getItem('examready_' + key);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return DEFAULTS[key] ? JSON.parse(JSON.stringify(DEFAULTS[key])) : null;
}

function setData(key, val) {
  localStorage.setItem('examready_' + key, JSON.stringify(val));
}

function genId() {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
}

// ===== SUBJECTS MAP =====
const DEFAULT_SUBJECTS_MAP = {
  "9": [
    { key:"english", label:"English", icon:"📖", stream:"Core Subjects" },
    { key:"hindi", label:"Hindi", icon:"🔤", stream:"Core Subjects" },
    { key:"math", label:"Mathematics", icon:"📐", stream:"Core Subjects" },
    { key:"science", label:"Science", icon:"🔬", stream:"Core Subjects" },
    { key:"sst", label:"Social Studies", icon:"🌍", stream:"Core Subjects" },
    { key:"sanskrit", label:"Sanskrit", icon:"🪔", stream:"Core Subjects" },
    { key:"cs", label:"Computer Science", icon:"💻", stream:"Skill Subjects" }
  ],
  "10": [
    { key:"english", label:"English", icon:"📖", stream:"Core Subjects" },
    { key:"hindi", label:"Hindi", icon:"🔤", stream:"Core Subjects" },
    { key:"math", label:"Mathematics", icon:"📐", stream:"Core Subjects" },
    { key:"science", label:"Science", icon:"🔬", stream:"Core Subjects" },
    { key:"sst", label:"Social Studies", icon:"🌍", stream:"Core Subjects" },
    { key:"sanskrit", label:"Sanskrit", icon:"🪔", stream:"Core Subjects" },
    { key:"cs", label:"Computer Science", icon:"💻", stream:"Skill Subjects" }
  ],
  "11": [
    { key:"english", label:"English", icon:"📖", stream:"Common Core" },
    { key:"physical-education", label:"Physical Education", icon:"🏃", stream:"General Electives" },
    { key:"physics", label:"Physics", icon:"⚡", stream:"Science" },
    { key:"chemistry", label:"Chemistry", icon:"🧪", stream:"Science" },
    { key:"math", label:"Mathematics", icon:"📐", stream:"Science" },
    { key:"biology", label:"Biology", icon:"🧬", stream:"Science" },
    { key:"cs", label:"Computer Science", icon:"💻", stream:"Science" },
    { key:"informatics-practices", label:"Informatics Practices", icon:"🖥️", stream:"Science" },
    { key:"accountancy", label:"Accountancy", icon:"📒", stream:"Commerce" },
    { key:"business-studies", label:"Business Studies", icon:"💼", stream:"Commerce" },
    { key:"economics", label:"Economics", icon:"📈", stream:"Commerce" },
    { key:"entrepreneurship", label:"Entrepreneurship", icon:"🚀", stream:"Commerce" },
    { key:"applied-math", label:"Applied Mathematics", icon:"📏", stream:"Commerce" },
    { key:"history", label:"History", icon:"🏛️", stream:"Humanities" },
    { key:"political-science", label:"Political Science", icon:"🏛", stream:"Humanities" },
    { key:"geography", label:"Geography", icon:"🗺️", stream:"Humanities" },
    { key:"sociology", label:"Sociology", icon:"👥", stream:"Humanities" },
    { key:"psychology", label:"Psychology", icon:"🧠", stream:"Humanities" },
    { key:"home-science", label:"Home Science", icon:"🏠", stream:"Humanities" }
  ],
  "12": [
    { key:"english", label:"English", icon:"📖", stream:"Common Core" },
    { key:"physical-education", label:"Physical Education", icon:"🏃", stream:"General Electives" },
    { key:"physics", label:"Physics", icon:"⚡", stream:"Science" },
    { key:"chemistry", label:"Chemistry", icon:"🧪", stream:"Science" },
    { key:"math", label:"Mathematics", icon:"📐", stream:"Science" },
    { key:"biology", label:"Biology", icon:"🧬", stream:"Science" },
    { key:"cs", label:"Computer Science", icon:"💻", stream:"Science" },
    { key:"informatics-practices", label:"Informatics Practices", icon:"🖥️", stream:"Science" },
    { key:"accountancy", label:"Accountancy", icon:"📒", stream:"Commerce" },
    { key:"business-studies", label:"Business Studies", icon:"💼", stream:"Commerce" },
    { key:"economics", label:"Economics", icon:"📈", stream:"Commerce" },
    { key:"entrepreneurship", label:"Entrepreneurship", icon:"🚀", stream:"Commerce" },
    { key:"applied-math", label:"Applied Mathematics", icon:"📏", stream:"Commerce" },
    { key:"history", label:"History", icon:"🏛️", stream:"Humanities" },
    { key:"political-science", label:"Political Science", icon:"🏛", stream:"Humanities" },
    { key:"geography", label:"Geography", icon:"🗺️", stream:"Humanities" },
    { key:"sociology", label:"Sociology", icon:"👥", stream:"Humanities" },
    { key:"psychology", label:"Psychology", icon:"🧠", stream:"Humanities" },
    { key:"home-science", label:"Home Science", icon:"🏠", stream:"Humanities" }
  ]
};

function getDefaultSubjectsMap() {
  return JSON.parse(JSON.stringify(DEFAULT_SUBJECTS_MAP));
}

function mergeSubjectsMap(customMap) {
  if (!customMap || typeof customMap !== 'object' || Array.isArray(customMap)) {
    return getDefaultSubjectsMap();
  }
  const defaults = getDefaultSubjectsMap();
  const merged = {};
  const allClasses = new Set([...Object.keys(defaults), ...Object.keys(customMap)]);
  allClasses.forEach(cls => {
    const defaultList = defaults[cls] || [];
    const customList = customMap[cls];
    if (Array.isArray(customList) && customList.length > 0) {
      const defaultByKey = new Map(defaultList.map(s => [s.key, s]));
      merged[cls] = customList.map(subject => ({
        ...(defaultByKey.get(subject.key) || {}),
        ...subject
      }));
    } else {
      merged[cls] = defaultList.slice();
    }
  });
  return merged;
}

function getSubjectsMap() {
  try {
    const raw = localStorage.getItem('er_subjects_map');
    if (!raw) return getDefaultSubjectsMap();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return getDefaultSubjectsMap();
    }
    const merged = mergeSubjectsMap(parsed);
    const defaults = getDefaultSubjectsMap();
    ['9', '10', '11', '12'].forEach(cls => {
      if (!Array.isArray(merged[cls]) || merged[cls].length === 0) {
        merged[cls] = defaults[cls] || [];
      }
    });
    return merged;
  } catch(e) {
    return getDefaultSubjectsMap();
  }
}

function getSubjectLabel(cls, key) {
  const map = getSubjectsMap();
  const subjects = map[cls] || [];
  const found = subjects.find(s => s.key === key);
  if (found) return found.label;
  return String(key || '').split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getClassMeta(cls) {
  const meta = {
    "9":  { label:"Class 9",  icon:"📗" },
    "10": { label:"Class 10", icon:"📘" },
    "11": { label:"Class 11", icon:"📙" },
    "12": { label:"Class 12", icon:"📕" }
  };
  return meta[cls] || { label:`Class ${cls}`, icon:"📚" };
}

function getSubjectMeta(cls, key) {
  const subjects = getSubjectsMap()[cls] || [];
  return subjects.find(s => s.key === key) || {
    key,
    label: getSubjectLabel(cls, key),
    icon: "📘",
    stream: "Subjects"
  };
}

function buildSubjectPageUrl(cls, subjectKey) {
  return `subject.html?class=${encodeURIComponent(cls)}&subject=${encodeURIComponent(subjectKey)}`;
}

function getResourceItems(cls, subjectKey, typeKey) {
  const allPdfs = getData('pdfs') || {};
  return allPdfs[`${cls}-${subjectKey}-${typeKey}`] || [];
}

function getClassCatalog() {
  return ["9","10","11","12"].map(cls => ({
    cls,
    label: getClassMeta(cls).label,
    icon:  getClassMeta(cls).icon,
    subjects: getSubjectsMap()[cls] || []
  }));
}

function getAllQuizEntries() {
  const quizzes = getData('quizzes') || {};
  const all = [];
  Object.entries(quizzes).forEach(([key, list]) => {
    const parts = key.split('-');
    const cls = parts[0];
    const subjectKey = parts.slice(1).join('-');
    (list || []).forEach(quiz => {
      all.push({ ...quiz, classNum: cls, subjectKey, subjectLabel: getSubjectLabel(cls, subjectKey) });
    });
  });
  return all;
}

function findQuizById(quizId) {
  if (!quizId) return null;
  return getAllQuizEntries().find(q => q.id === quizId) || null;
}

function getResolvedFileUrl(url) {
  if (!url) return '#';
  if (url.startsWith('local:')) {
    const fileName = url.slice(6);
    return localStorage.getItem('er_file_' + fileName) || '#';
  }
  return url;
}

function getPreviewEmbedUrl(url) {
  const resolved = getResolvedFileUrl(url);
  if (!resolved || resolved === '#') return '#';
  if (resolved.startsWith('data:')) return resolved;
  const driveFileMatch = resolved.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveFileMatch) return `https://drive.google.com/file/d/${driveFileMatch[1]}/preview`;
  const driveOpenMatch = resolved.match(/[?&]id=([^&]+)/);
  if (resolved.includes('drive.google.com') && driveOpenMatch) {
    return `https://drive.google.com/file/d/${driveOpenMatch[1]}/preview`;
  }
  return resolved;
}

function buildPdfPreviewUrl(itemOrUrl, title) {
  const rawUrl   = typeof itemOrUrl === 'string' ? itemOrUrl : (itemOrUrl?.url || '#');
  const rawTitle = title || itemOrUrl?.name || 'PDF Preview';
  return `pdf-viewer.html?title=${encodeURIComponent(rawTitle)}&url=${encodeURIComponent(rawUrl)}`;
}

function addFooterLegalLinks() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (['privacy.html', 'terms.html', 'disclaimer.html'].includes(currentPage)) return;

  const footerLinks = document.querySelector('.footer-links');
  if (!footerLinks) return;

  const allH4s = footerLinks.querySelectorAll('.footer-col h4');
  const hasLegal = Array.from(allH4s).some(h => /legal/i.test(h.textContent));
  if (!hasLegal) {
    const legalCol = document.createElement('div');
    legalCol.className = 'footer-col';
    legalCol.setAttribute('data-legal-links', 'true');
    legalCol.innerHTML = `
      <h4>Legal</h4>
      <a href="privacy.html">Privacy Policy</a>
      <a href="terms.html">Terms &amp; Conditions</a>
      <a href="disclaimer.html">Disclaimer</a>
    `;
    footerLinks.appendChild(legalCol);
  }

  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom && !footerBottom.querySelector('[data-social-icons="true"]')) {
    const socialDiv = document.createElement('div');
    socialDiv.setAttribute('data-social-icons', 'true');
    socialDiv.style.cssText = 'display:flex;align-items:center;gap:12px;';
    socialDiv.innerHTML = `
      <a href="https://www.instagram.com/examready.co/" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram"
        style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);color:#fff;text-decoration:none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
      <a href="https://www.youtube.com/@EXAMREADY_STUDY" target="_blank" rel="noopener noreferrer" title="Subscribe on YouTube"
        style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:10px;background:#ff0000;color:#fff;text-decoration:none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    `;
    footerBottom.appendChild(socialDiv);
  }
}

function applyFooterBranding() {
  const footerBrandLogo = localStorage.getItem('er_footer_brand_logo') || 'footer-brand-logo.png';
  document.querySelectorAll('.footer-brand').forEach(brand => {
    let brandMark = brand.querySelector('.footer-brand-mark');
    if (!brandMark) {
      const firstBlock = brand.firstElementChild;
      if (firstBlock && firstBlock.tagName !== 'P') firstBlock.remove();
      brandMark = document.createElement('div');
      brandMark.className = 'footer-brand-mark';
      brandMark.style.marginBottom = '14px';
      brand.insertBefore(brandMark, brand.firstChild);
    }
    brandMark.innerHTML = `<img src="${footerBrandLogo}" alt="ExamReady" style="display:block;width:min(100%, 260px);height:auto;object-fit:contain;">`;
  });
}

function initResponsiveNav() {
  const header = document.querySelector('header');
  const nav = document.getElementById('mainNav');
  const toggle = document.querySelector('.hamburger');
  if (!header || !nav || !toggle) return;

  if (!document.getElementById('sharedNavStyles')) {
    const style = document.createElement('style');
    style.id = 'sharedNavStyles';
    style.textContent = `
      header {
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1400;
      }
      @media (min-width: 769px) {
        #mainNav {
          display: flex !important;
          flex-wrap: nowrap;
          margin-left: auto;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        #mainNav::-webkit-scrollbar { display: none; }
      }
      @media (max-width: 768px) {
        header { overflow: visible !important; }
        #mainNav {
          display: none !important;
        }
        #mainNav.nav-open {
          display: flex !important;
          flex-direction: column;
          gap: 10px;
          position: absolute;
          top: calc(100% + 8px);
          left: 12px;
          right: 12px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(13, 13, 13, 0.98);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 20px 48px rgba(0,0,0,0.45);
          z-index: 999;
        }
        #mainNav.nav-open a {
          width: 100%;
          justify-content: flex-start;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const syncHeaderOffset = () => {
    document.body.style.paddingTop = `${header.offsetHeight}px`;
  };

  const closeNav = () => {
    nav.classList.remove('nav-open');
    nav.dataset.open = '0';
  };

  const openNav = () => {
    nav.classList.add('nav-open');
    nav.dataset.open = '1';
  };

  window.toggleMenu = function toggleMenuShared() {
    if (window.innerWidth > 768) return;
    if (nav.classList.contains('nav-open')) closeNav();
    else openNav();
  };

  toggle.removeAttribute('onclick');
  toggle.onclick = window.toggleMenu;

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', event => {
    if (window.innerWidth > 768) return;
    if (!nav.classList.contains('nav-open')) return;
    if (header.contains(event.target)) return;
    closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeNav();
    syncHeaderOffset();
  });

  window.addEventListener('load', syncHeaderOffset);
  syncHeaderOffset();
  closeNav();
}

// ===== SITE CONFIG =====
function getSiteConfig() {
  try { return JSON.parse(localStorage.getItem('er_site_config') || '{}'); } catch(e) { return {}; }
}

// ===== ANNOUNCEMENT =====
function getAnnouncement() {
  try { return JSON.parse(localStorage.getItem('er_announcement') || 'null'); } catch(e) { return null; }
}

// ===== FEATURES =====
function getFeatures() {
  try { return JSON.parse(localStorage.getItem('er_features') || '{}'); } catch(e) { return {}; }
}

function isFeatureEnabled(key) {
  return getFeatures()[key] !== false;
}

// ===== NAV =====
function getNavItems() {
  try {
    const raw = localStorage.getItem('er_nav');
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

// ===== APPLY SITE CONFIG TO PAGE =====
function applySiteConfig() {
  const config = getSiteConfig();

  if (config.colorAccent) document.documentElement.style.setProperty('--red', config.colorAccent);
  if (config.colorBg)    document.documentElement.style.setProperty('--black', config.colorBg);

  const logo = localStorage.getItem('er_logo');
  if (logo) {
    document.querySelectorAll('img[alt="ExamReady"], img.logo-img').forEach(img => { img.src = logo; });
  }

  const navItems = getNavItems();
  if (navItems && Array.isArray(navItems)) {
    const nav = document.getElementById('mainNav');
    if (nav) {
      const current = window.location.pathname.split('/').pop() || 'index.html';
      nav.innerHTML = navItems.map(item => {
        const isActive = item.url === current;
        return `<a href="${escapeHtml(item.url)}"${isActive ? ' class="active"' : ''}>${escapeHtml(item.label)}</a>`;
      }).join('');
    }
  }

  const ann = getAnnouncement();
  if (ann && ann.enabled && ann.text) {
    const bar = document.createElement('div');
    bar.id = 'siteAnnouncement';
    bar.style.cssText = `background:${escapeHtml(ann.color || '#e8211a')};color:#fff;padding:10px 20px;text-align:center;font-family:'Nunito',sans-serif;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;gap:12px;position:relative;z-index:999`;

    const textNode = document.createTextNode(ann.text);
    if (ann.link) {
      const a = document.createElement('a');
      a.href = ann.link;
      a.style.cssText = 'color:#fff;text-decoration:none;flex:1';
      a.appendChild(textNode);
      bar.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.style.flex = '1';
      span.appendChild(textNode);
      bar.appendChild(span);
    }
    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = 'background:none;border:none;color:#fff;font-size:18px;cursor:pointer;opacity:.8;flex-shrink:0';
    closeBtn.textContent = '×';
    closeBtn.onclick = () => bar.remove();
    bar.appendChild(closeBtn);

    const header = document.querySelector('header');
    if (header) header.insertAdjacentElement('afterend', bar);
    else document.body.insertBefore(bar, document.body.firstChild);
  }
}

// ===== SOLUTION POSTS =====
const DEFAULT_SOLUTION_POSTS = [
  {
    id: 'solpost_1',
    title: 'Class 9 Mathematics: Number Systems Solutions',
    classNum: '9', subjectKey: 'math',
    summary: 'Step-by-step worked answers for important Number Systems questions with easy exam-ready language.',
    content: `1. Rational numbers can be written in p/q form where q is not zero.

2. Irrational numbers cannot be expressed in simple p/q form. Examples include sqrt(2) and pi.

3. To compare irrational numbers in exams, first convert them into approximate decimal values and then arrange them carefully.

- Revise the definitions once.
- Write every step clearly.
- Avoid skipping simplification in board-style answers.`,
    author: 'ExamReady Team', updatedAt: '2026-04-03'
  },
  {
    id: 'solpost_2',
    title: 'Class 10 Science: Chemical Reactions and Equations Solutions',
    classNum: '10', subjectKey: 'science',
    summary: 'Balanced equations, explanation points, and answer-writing format for common textbook exercises.',
    content: `1. A chemical reaction is identified through change in color, temperature, state, or formation of a new substance.

2. While writing a balanced equation, make the number of atoms equal on both sides without changing the chemical formula.

3. For CBSE-style answers, mention the observation first and then write the balanced reaction.

- Use symbols only after naming the reactants.
- Underline key terms in long answers.
- Mention oxidation and reduction separately when asked.`,
    author: 'ExamReady Team', updatedAt: '2026-04-03'
  },
  {
    id: 'solpost_3',
    title: 'Class 11 History: Writing and City Life Solutions',
    classNum: '11', subjectKey: 'history',
    summary: 'Short and long answer support for Mesopotamian civilization topics under Humanities.',
    content: `1. Mesopotamian cities grew due to trade, irrigation, and organized administration.

2. Writing helped rulers and traders maintain accounts, records, and legal communication.

3. In descriptive answers, connect city growth with agriculture, surplus, and social organization for better marks.`,
    author: 'ExamReady Team', updatedAt: '2026-04-03'
  },
  {
    id: 'solpost_4',
    title: 'Class 12 Accountancy: Partnership Fundamentals Solutions',
    classNum: '12', subjectKey: 'accountancy',
    summary: 'Clean journal formats, adjustments, and explanation notes for partnership basics.',
    content: `1. A partnership firm is created through an agreement between two or more persons carrying on business together.

2. The partnership deed should clearly define profit-sharing ratio, salary, interest on capital, and drawings.

3. In numerical questions, write the format first and then pass journal entries in proper sequence.`,
    author: 'ExamReady Team', updatedAt: '2026-04-03'
  }
];

function getAllSolutionPosts() {
  const stored = getData('solution_posts');
  const posts = Array.isArray(stored) ? stored : DEFAULT_SOLUTION_POSTS;
  return JSON.parse(JSON.stringify(posts)).sort((a, b) =>
    new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
  );
}

function saveAllSolutionPosts(posts) {
  setData('solution_posts', Array.isArray(posts) ? posts : []);
}

function getSolutionPostsByClassAndSubject(cls, subjectKey) {
  return getAllSolutionPosts().filter(p => p.classNum === cls && p.subjectKey === subjectKey);
}

function findSolutionPostById(postId) {
  if (!postId) return null;
  return getAllSolutionPosts().find(p => p.id === postId) || null;
}

function getSolutionPostUrl(postOrId) {
  const id = typeof postOrId === 'string' ? postOrId : postOrId?.id;
  return `solution-post.html?id=${encodeURIComponent(id || '')}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSolutionExcerpt(post, maxLength = 160) {
  const raw = (post?.summary || post?.content || '').replace(/\s+/g, ' ').trim();
  if (!raw) return '';
  return raw.length > maxLength ? raw.slice(0, maxLength - 1) + '...' : raw;
}

function formatHumanDate(value) {
  if (!value) return 'Recently updated';
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Recently updated';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch(e) { return 'Recently updated'; }
}

function formatSolutionContent(content) {
  const normalized = String(content || '').replace(/\r\n/g, '\n').trim();
  if (!normalized) return '<p>Content will be added soon.</p>';
  return normalized.split(/\n\s*\n/).map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return '';
    if (lines.every(l => l.startsWith('- '))) {
      return `<ul>${lines.map(l => `<li>${escapeHtml(l.slice(2))}</li>`).join('')}</ul>`;
    }
    return `<p>${lines.map(l => escapeHtml(l)).join('<br>')}</p>`;
  }).join('');
}

// ===== AD SYSTEM =====
// ─────────────────────────────────────────────────────────────────────────────
// MASTER SLOT REGISTRY
// Single source of truth for ALL ad slots across shared.js AND ads.js.
// Admin writes to er_ad_slots; both systems read from the same storage.
// ─────────────────────────────────────────────────────────────────────────────
const AD_SLOT_REGISTRY = {
  // ── Global — All Pages ──
  top:              { label:'Top Banner (shared.js)',          enabled:true, adCode:'' },
  top_banner:       { label:'Top Banner (ads.js)',             enabled:true, adCode:'' },
  footer:           { label:'Pre-Footer Banner (shared.js)',   enabled:true, adCode:'' },
  pre_footer:       { label:'Pre-Footer Banner (ads.js)',      enabled:true, adCode:'' },

  // ── In-Content Breaks ──
  inline:           { label:'Inline Break (shared.js)',        enabled:true, adCode:'' },
  inline_1:         { label:'Inline Break 1 (ads.js)',         enabled:true, adCode:'' },
  inline_2:         { label:'Inline Break 2 (ads.js)',         enabled:true, adCode:'' },
  inline_3:         { label:'Inline Break 3 (ads.js)',         enabled:true, adCode:'' },
  between:          { label:'Between Sections (shared.js)',    enabled:true, adCode:'' },
  between_sections: { label:'Between Sections (ads.js)',       enabled:true, adCode:'' },

  // ── High-Intent Pages ──
  results:          { label:'Results / Post-Article (shared)', enabled:true, adCode:'' },
  results_banner:   { label:'Results Banner (ads.js)',         enabled:true, adCode:'' },
  solution_mid:     { label:'Mid-Article (ads.js)',            enabled:true, adCode:'' },
  quiz_sidebar:     { label:'Quiz Sidebar (ads.js)',           enabled:true, adCode:'' },

  // ── Sticky / Persistent ──
  sticky:           { label:'Sticky Sidebar (shared.js)',      enabled:true, adCode:'' },
  sidebar_sticky:   { label:'Sticky Sidebar (ads.js)',         enabled:true, adCode:'' },
  mobile_bottom:    { label:'Mobile Sticky Bottom Bar',        enabled:true, adCode:'' },
};

/**
 * getAdSlots() — returns ALL known slots merged with admin-saved values.
 * Any slot key saved by admin is included even if not in the registry.
 */
function getAdSlots() {
  try {
    const saved = JSON.parse(localStorage.getItem('er_ad_slots') || '{}');
    const merged = {};
    // Start with registry defaults
    Object.entries(AD_SLOT_REGISTRY).forEach(([k, defaults]) => {
      merged[k] = { ...defaults, ...(saved[k] || {}) };
    });
    // Also include any extra slots admin may have saved (future-proof)
    Object.entries(saved).forEach(([k, v]) => {
      if (!merged[k]) merged[k] = { enabled: true, adCode: '', label: k, ...v };
    });
    return merged;
  } catch(e) {
    return JSON.parse(JSON.stringify(AD_SLOT_REGISTRY));
  }
}

function saveAdSlots(slots) {
  localStorage.setItem('er_ad_slots', JSON.stringify(slots));
}

// ─── Slot helpers ───────────────────────────────────────────────────────────
function _slotEnabled(slots, key) {
  return slots[key]?.enabled !== false;
}

function _slotCode(slots, key) {
  return (slots[key]?.adCode || '').trim();
}

// ─── Inject real ad code (or nothing if no code) ────────────────────────────
function _buildAdElement(slots, key, wrapperClass) {
  if (!_slotEnabled(slots, key)) return null;
  const code = _slotCode(slots, key);
  if (!code) return null;         // No placeholder noise — only inject real ads

  const wrap = document.createElement('div');
  wrap.dataset.erAdSlot = key;
  wrap.className = wrapperClass || 'er-ad-shell';
  wrap.innerHTML = code;
  // Re-execute any scripts inside the ad code
  wrap.querySelectorAll('script').forEach(old => {
    const s = document.createElement('script');
    Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
    s.textContent = old.textContent;
    old.parentNode.replaceChild(s, old);
  });
  return wrap;
}

/** getManagedAdSlotHtml — inline HTML string for pages that use template literals */
function getManagedAdSlotHtml(key) {
  const slots = getAdSlots();
  if (!_slotEnabled(slots, key)) return '';
  const code = _slotCode(slots, key);
  if (!code) return '';
  return `<div data-er-ad-slot="${escapeHtml(key)}" class="er-ad-shell">${code}</div>`;
}

// ─── Sticky Sidebar (desktop ≥1280px) ───────────────────────────────────────
function _injectStickySidebar(slots) {
  // Use 'sticky' key (shared.js canonical); fall back to 'sidebar_sticky' (ads.js key)
  const key = _slotCode(slots, 'sticky') ? 'sticky' : 'sidebar_sticky';
  if (!_slotEnabled(slots, key)) return;
  const code = _slotCode(slots, key);
  if (!code) return;
  if (document.getElementById('er-sticky-sidebar')) return;
  if (sessionStorage.getItem('er_sticky_dismissed') === '1') return;
  if (window.innerWidth < 1280) return;

  const wrap = document.createElement('div');
  wrap.id = 'er-sticky-sidebar';
  wrap.dataset.erAdSlot = key;
  wrap.style.cssText = 'position:fixed;right:18px;top:50%;transform:translateY(-50%);width:160px;z-index:900;background:#fff;border:1px solid #e8e8ea;border-radius:18px;box-shadow:0 12px 40px rgba(0,0,0,0.12);overflow:hidden;opacity:0;pointer-events:none;transition:opacity .4s ease;';

  const closeBtn = document.createElement('button');
  closeBtn.style.cssText = 'position:absolute;top:6px;right:6px;width:20px;height:20px;background:rgba(0,0,0,0.07);border:none;border-radius:50%;cursor:pointer;font-size:10px;color:#888;display:flex;align-items:center;justify-content:center;z-index:2;';
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', 'Close ad');
  closeBtn.onclick = () => {
    wrap.style.opacity = '0';
    wrap.style.pointerEvents = 'none';
    sessionStorage.setItem('er_sticky_dismissed', '1');
    setTimeout(() => wrap.remove(), 420);
  };
  wrap.appendChild(closeBtn);

  const inner = document.createElement('div');
  inner.style.padding = '10px';
  inner.innerHTML = code;
  wrap.appendChild(inner);
  inner.querySelectorAll('script').forEach(old => {
    const s = document.createElement('script');
    Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
    s.textContent = old.textContent;
    old.parentNode.replaceChild(s, old);
  });

  document.body.appendChild(wrap);

  setTimeout(() => {
    wrap.style.opacity = '1';
    wrap.style.pointerEvents = 'auto';
  }, 2000);

  window.addEventListener('scroll', () => {
    if (sessionStorage.getItem('er_sticky_dismissed') === '1') return;
    if (window.scrollY > 300) {
      wrap.style.opacity = '1';
      wrap.style.pointerEvents = 'auto';
    }
  }, { passive: true });
}

// ─── Mobile Sticky Bottom Bar ────────────────────────────────────────────────
function _injectMobileBottom(slots) {
  const key = 'mobile_bottom';
  if (!_slotEnabled(slots, key)) return;
  const code = _slotCode(slots, key);
  if (!code) return;
  if (document.getElementById('er-mobile-bottom')) return;
  if (sessionStorage.getItem('er_mba_dismissed') === '1') return;
  if (window.innerWidth > 768) return;

  const bar = document.createElement('div');
  bar.id = 'er-mobile-bottom';
  bar.dataset.erAdSlot = key;
  bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:1300;background:#fff;border-top:1px solid #e8e8ea;box-shadow:0 -4px 24px rgba(0,0,0,0.12);transform:translateY(100%);transition:transform .4s cubic-bezier(.22,1,.36,1);pointer-events:none;';

  const inner = document.createElement('div');
  inner.style.cssText = 'display:flex;align-items:center;padding:8px 12px;gap:10px;min-height:56px;max-width:100%;overflow:hidden;';

  const contentWrap = document.createElement('div');
  contentWrap.style.flex = '1';
  const label = document.createElement('div');
  label.style.cssText = 'font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;color:#bbb;line-height:1;margin-bottom:2px;';
  label.textContent = 'Sponsored';
  contentWrap.appendChild(label);
  const adInner = document.createElement('div');
  adInner.innerHTML = code;
  contentWrap.appendChild(adInner);
  inner.appendChild(contentWrap);

  const closeBtn = document.createElement('button');
  closeBtn.style.cssText = 'flex-shrink:0;width:26px;height:26px;border-radius:50%;background:#f0f0f0;border:none;cursor:pointer;font-size:12px;color:#666;display:flex;align-items:center;justify-content:center;';
  closeBtn.textContent = '✕';
  closeBtn.onclick = () => {
    bar.style.transform = 'translateY(100%)';
    document.body.style.paddingBottom = '';
    sessionStorage.setItem('er_mba_dismissed', '1');
    setTimeout(() => bar.remove(), 420);
  };
  inner.appendChild(closeBtn);
  bar.appendChild(inner);
  document.body.appendChild(bar);

  adInner.querySelectorAll('script').forEach(old => {
    const s = document.createElement('script');
    Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
    s.textContent = old.textContent;
    old.parentNode.replaceChild(s, old);
  });

  setTimeout(() => {
    bar.style.transform = 'translateY(0)';
    bar.style.pointerEvents = 'auto';
    document.body.style.paddingBottom = '66px';
  }, 3000);
}

// ─── Between-Sections ad ─────────────────────────────────────────────────────
function _injectBetweenSections(slots) {
  const key = _slotCode(slots, 'between') ? 'between' : 'between_sections';
  if (!_slotEnabled(slots, key)) return;
  const code = _slotCode(slots, key);
  if (!code) return;
  if (document.querySelector('[data-er-ad-slot="between"],[data-er-ad-slot="between_sections"]')) return;

  const sections = document.querySelectorAll('.class-section, .stream-section, .subject-group');
  if (sections.length < 2) return;
  const target = sections[Math.min(1, sections.length - 1)];

  const wrap = document.createElement('div');
  wrap.dataset.erAdSlot = key;
  wrap.style.cssText = 'max-width:1200px;margin:0 auto 24px;padding:0 24px;';
  const lbl = document.createElement('div');
  lbl.style.cssText = 'font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#bbb;text-align:center;margin-bottom:6px;';
  lbl.textContent = 'Sponsored';
  wrap.appendChild(lbl);
  const inner = document.createElement('div');
  inner.innerHTML = code;
  wrap.appendChild(inner);
  inner.querySelectorAll('script').forEach(old => {
    const s = document.createElement('script');
    Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
    s.textContent = old.textContent;
    old.parentNode.replaceChild(s, old);
  });
  target.insertAdjacentElement('afterend', wrap);
}

// ─── Main insertSmartAds — called once on every public page ─────────────────
function insertSmartAds() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (['privacy.html','terms.html','disclaimer.html','admin.html'].includes(currentPage)) return;
  if (document.body?.dataset?.erSmartAds === '1') return;
  document.body.dataset.erSmartAds = '1';

  const slots = getAdSlots();
  const main   = document.querySelector('main');
  const footer = document.querySelector('footer');
  const hero   = document.querySelector('.page-hero, .hero');

  // 1. TOP BANNER — after hero, before content
  // Use 'top' key; ads.js handles 'top_banner' independently
  const topEl = _buildAdElement(slots, 'top', 'er-ad-shell er-ad-shell--top');
  if (topEl) {
    if (hero?.parentNode) hero.insertAdjacentElement('afterend', topEl);
    else if (main) main.insertAdjacentElement('afterbegin', topEl);
  }

  // 2. INLINE MID — between content sections (use 'inline' key; ads.js handles inline_1/2/3)
  const inlineEl = _buildAdElement(slots, 'inline', 'er-ad-shell er-ad-shell--inline');
  if (inlineEl && main) {
    const kids = Array.from(main.children).filter(el => !el.dataset.erAdSlot && !el.matches('script,style'));
    const anchor = kids[Math.min(1, kids.length - 1)];
    if (anchor) anchor.insertAdjacentElement('beforebegin', inlineEl);
  }

  // 3. BETWEEN SECTIONS — injected after a delay to allow dynamic content
  if (_slotEnabled(slots, 'between') || _slotEnabled(slots, 'between_sections')) {
    setTimeout(() => _injectBetweenSections(slots), 200);
  }

  // 4. PRE-FOOTER — above footer (use 'footer' key; ads.js handles 'pre_footer')
  const footerEl = _buildAdElement(slots, 'footer', 'er-ad-shell er-ad-shell--footer');
  if (footerEl && footer) footer.insertAdjacentElement('beforebegin', footerEl);

  // 5. STICKY SIDEBAR — desktop only (deferred so page layout is settled)
  setTimeout(() => _injectStickySidebar(slots), 500);

  // 6. MOBILE STICKY BOTTOM — mobile only
  _injectMobileBottom(slots);
}

// Auto-apply on DOMContentLoaded for all non-admin pages
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    if (!window.location.pathname.includes('admin')) {
      applySiteConfig();
      initResponsiveNav();
      applyFooterBranding();
      addFooterLegalLinks();
      insertSmartAds();
    }
  });
}

// ===== CHAPTERS =====
function getChapters(cls, subjectKey) {
  try {
    const all = JSON.parse(localStorage.getItem('er_chapters') || '{}');
    const list = all[`${cls}-${subjectKey}`] || [];
    return list.slice().sort((a, b) => (a.number || 0) - (b.number || 0));
  } catch(e) { return []; }
}

function saveChapters(cls, subjectKey, chapters) {
  try {
    const all = JSON.parse(localStorage.getItem('er_chapters') || '{}');
    all[`${cls}-${subjectKey}`] = chapters;
    localStorage.setItem('er_chapters', JSON.stringify(all));
  } catch(e) {}
}

function getAllChaptersData() {
  try { return JSON.parse(localStorage.getItem('er_chapters') || '{}'); }
  catch(e) { return {}; }
}

function getChapterLabel(cls, subjectKey, chapterId) {
  if (!chapterId) return 'Uncategorized';
  const ch = getChapters(cls, subjectKey).find(c => c.id === chapterId);
  return ch ? `Ch ${ch.number}: ${ch.name}` : 'Uncategorized';
}
