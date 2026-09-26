/* ---------- Shared: background, header, footer ---------- */
const PAGES = [
  { href: 'index.html', bn: 'হোম', en: 'Home' },
  { href: 'about.html', bn: 'পরিচিতি', en: 'About' },
  { href: 'files.html', bn: 'ফাইলস', en: 'Files' },
  { href: 'memory.html', bn: 'মেমোরি', en: 'Memory' }
];
const here = location.pathname.split('/').pop() || 'index.html';
const link = p => `<a href="${p.href}" class="nav-link text-sm font-medium ${p.href === here ? 'active' : 'text-[color:var(--muted)] hover:text-white'}"><span class="lang-bn">${p.bn}</span><span class="lang-en">${p.en}</span></a>`;

document.body.insertAdjacentHTML('afterbegin', `
  <div class="aurora"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i><i class="blob b4"></i></div>
  <div class="grid-overlay"></div>
  <div id="symbols" aria-hidden="true"></div>
  <header class="sticky top-3 z-50 px-4">
    <div class="glass max-w-6xl mx-auto px-5 h-14 rounded-2xl flex items-center justify-between shadow-lg shadow-black/20">
      <a href="index.html" class="display font-bold text-lg tracking-tight">A. M. Saikat Reza</a>
      <div class="flex items-center gap-4 sm:gap-6">
        <nav class="flex items-center gap-4 sm:gap-6">${PAGES.map(link).join('')}</nav>
        <button onclick="toggleLanguage()" class="btn-ghost flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-xs font-semibold">
          <span>🌐</span><span id="btnLangText">English</span>
        </button>
      </div>
    </div>
  </header>`);
document.body.insertAdjacentHTML('beforeend', `
  <footer class="py-8 text-[color:var(--muted)] text-sm text-center border-t border-white/10">
    <p class="lang-bn">© 2026 A. M. Saikat Reza · গণিত বিভাগ, হাবিপ্রবি</p>
    <p class="lang-en">© 2026 A. M. Saikat Reza · Department of Mathematics, HSTU</p>
  </footer>`);

/* ---------- Language toggle (remembered across pages) ---------- */
function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.getElementById('btnLangText').textContent = lang === 'bn' ? 'English' : 'বাংলা';
  try { localStorage.setItem('preferredLang', lang); } catch (e) {}
}
function toggleLanguage() {
  setLanguage((document.documentElement.getAttribute('lang') || 'bn') === 'bn' ? 'en' : 'bn');
}
try { const s = localStorage.getItem('preferredLang'); if (s) setLanguage(s); } catch (e) {}

/* ---------- Floating math symbols ---------- */
const chars = ['∑','∫','π','∞','√','Δ','∂','θ','λ','≈','∇','x²','e','φ'];
const box = document.getElementById('symbols');
chars.forEach((c, i) => {
  const s = document.createElement('span');
  s.className = 'sym';
  s.textContent = c;
  s.style.left = (4 + (i * 97) % 92) + '%';
  s.style.fontSize = (22 + (i * 13) % 34) + 'px';
  s.style.animationDuration = (22 + (i * 7) % 20) + 's';
  s.style.animationDelay = '-' + ((i * 5) % 30) + 's';
  box.appendChild(s);
});

/* ---------- Animated Math Symbols + Math Facts ---------- */

const mathFacts = [
  {
    symbol: "π",
    facts: [
      "π is an irrational number, so its decimal expansion never ends or repeats.",
      "The first digits of π are 3.1415926535…",
      "π represents the ratio of a circle's circumference to its diameter.",
      "The Greek letter π was popularized for this mathematical constant by Euler."
    ]
  },
  {
    symbol: "∑",
    facts: [
      "The symbol ∑ is called Sigma and is used to represent summation.",
      "Σ notation lets us write many additions in a compact mathematical form.",
      "The sum 1 + 2 + ... + n equals n(n+1)/2.",
      "Summation notation is widely used in calculus, statistics and discrete mathematics."
    ]
  },
  {
    symbol: "∫",
    facts: [
      "The symbol ∫ represents integration.",
      "A definite integral can represent the area under a curve.",
      "Integration is closely connected to differentiation through the Fundamental Theorem of Calculus.",
      "The elongated ∫ symbol originated from an old form of the letter S for 'sum'."
    ]
  },
  {
    symbol: "∞",
    facts: [
      "∞ represents infinity, an idea of something without bound.",
      "Infinity is not an ordinary real number.",
      "There are different sizes of infinity in set theory.",
      "The symbol ∞ was introduced by John Wallis in the 17th century."
    ]
  },
  {
    symbol: "√",
    facts: [
      "The symbol √ is called the radical sign.",
      "√x represents the principal square root of x when x is nonnegative.",
      "The square root of 2 is irrational.",
      "The square root operation reverses squaring for nonnegative numbers."
    ]
  },
  {
    symbol: "Δ",
    facts: [
      "Δ is often used to represent a change or difference.",
      "In geometry, Δ is commonly associated with triangles.",
      "In numerical methods, Δx can represent a small change in x.",
      "The Greek letter Delta is the fourth letter of the Greek alphabet."
    ]
  },
  {
    symbol: "∂",
    facts: [
      "∂ is used for partial derivatives.",
      "A partial derivative measures how a function changes with respect to one variable while others are held fixed.",
      "Partial derivatives are fundamental in multivariable calculus.",
      "They are widely used in physics, economics and mathematical modeling."
    ]
  },
  {
    symbol: "∇",
    facts: [
      "∇ is called nabla or del.",
      "The gradient of a scalar field points in the direction of greatest increase.",
      "∇ can also be used to define divergence and curl.",
      "The gradient operator is central to vector calculus."
    ]
  },
  {
    symbol: "λ",
    facts: [
      "λ is commonly used for eigenvalues in linear algebra.",
      "If Av = λv, then λ is an eigenvalue corresponding to eigenvector v.",
      "Eigenvalues are important in differential equations and dynamical systems.",
      "λ is also frequently used as a parameter in mathematical models."
    ]
  },
  {
    symbol: "φ",
    facts: [
      "φ is often used to represent the golden ratio.",
      "The golden ratio is approximately 1.618.",
      "The golden ratio satisfies φ² = φ + 1.",
      "φ appears in several mathematical patterns involving Fibonacci numbers."
    ]
  },
  {
    symbol: "θ",
    facts: [
      "θ is commonly used to represent an angle.",
      "Trigonometric functions such as sin(θ), cos(θ) and tan(θ) depend on an angle.",
      "Angles can be measured in degrees or radians.",
      "In mathematics and physics, θ is frequently used as a variable parameter."
    ]
  },
  {
    symbol: "≈",
    facts: [
      "The symbol ≈ means approximately equal to.",
      "Approximation is useful when an exact value is difficult or unnecessary to calculate.",
      "π ≈ 3.14159 is a common mathematical approximation.",
      "Numerical methods often produce approximate solutions."
    ]
  },
  {
    symbol: "x²",
    facts: [
      "x² means x multiplied by itself.",
      "The graph of y = x² is called a parabola.",
      "For every real x, x² is nonnegative.",
      "Quadratic equations are closely connected to expressions involving x²."
    ]
  },
  {
    symbol: "e",
    facts: [
      "The mathematical constant e is approximately 2.71828.",
      "e is the base of the natural logarithm.",
      "The function eˣ has the special property that its derivative is itself.",
      "The number e appears naturally in growth, decay and differential equations."
    ]
  }
];

const symbolsBox = document.getElementById("symbols");

if (symbolsBox) {
  // Allow the symbols to interact with the mouse.
  symbolsBox.removeAttribute("aria-hidden");

  // Create one animated symbol.
  function createMathSymbol(index) {
    const data = mathFacts[index % mathFacts.length];

    const symbol = document.createElement("div");
    symbol.className = "sym";

    symbol.innerHTML = `
      <span class="math-symbol" tabindex="0" role="button"
            aria-label="Mathematics symbol ${data.symbol}">
        ${data.symbol}
        <span class="math-fact" role="tooltip"></span>
      </span>
    `;

    const symbolElement = symbol.querySelector(".math-symbol");
    const factElement = symbol.querySelector(".math-fact");

    // Random position and animation settings.
    const top = 8 + Math.random() * 78;
    const duration = 16 + Math.random() * 18;
    const delay = Math.random() * 15;
    const size = 1.3 + Math.random() * 1.5;

    symbol.style.setProperty("--top", `${top}vh`);
    symbol.style.setProperty("--duration", `${duration}s`);
    symbol.style.setProperty("--delay", `${delay}s`);
    symbol.style.setProperty("--size", `${size}rem`);

    // Random direction.
    if (Math.random() > 0.5) {
      symbol.classList.add("reverse");
    }

    let currentFact = Math.floor(Math.random() * data.facts.length);

    function updateFact() {
      factElement.textContent = data.facts[currentFact];

      currentFact = (currentFact + 1) % data.facts.length;
    }

    updateFact();

    // Change fact automatically every 7–13 seconds.
    const factInterval = 7000 + Math.random() * 6000;

    setInterval(() => {
      updateFact();

      // If currently visible, gently refresh the tooltip.
      if (symbolElement.matches(":hover") ||
          document.activeElement === symbolElement) {
        factElement.classList.add("fact-refresh");

        setTimeout(() => {
          factElement.classList.remove("fact-refresh");
        }, 350);
      }
    }, factInterval);

    // Mouse hover.
    symbolElement.addEventListener("mouseenter", () => {
      symbolElement.classList.add("show-fact");
    });

    symbolElement.addEventListener("mouseleave", () => {
      symbolElement.classList.remove("show-fact");
    });

    // Keyboard accessibility.
    symbolElement.addEventListener("focus", () => {
      symbolElement.classList.add("show-fact");
    });

    symbolElement.addEventListener("blur", () => {
      symbolElement.classList.remove("show-fact");
    });

    // Mobile/touch support.
    symbolElement.addEventListener("click", () => {
      symbolElement.classList.toggle("show-fact");
    });

    symbolsBox.appendChild(symbol);
  }

  // Create 12 animated symbols.
  for (let i = 0; i < 12; i++) {
    createMathSymbol(i);
  }
}

/* ---------- Drive folders (files.html) — link বদলাতে শুধু এই list edit করো ---------- */
const grid = document.getElementById('folderGrid');
if (grid) {
  const DRIVE = 'https://drive.google.com/drive/folders/';
  const levels = [
    { n: 1, bn: '১ম বর্ষ', icon: '🌱', theme: 'violet', years: '2015–2020',
      sems: ['19vcsRfRf-7MD87UN-2aCPbfdmV_j1h0r', '13d7dGK748nowscmfP0_9MVEvMnpBGY_r'] },
    { n: 2, bn: '২য় বর্ষ', icon: '📐', theme: 'mint', years: '2016–2021',
      sems: ['193IK8vyxNbE4SCL4Wl0sNehjXYReJnMf', '1ibjF1_T5Kmx0D-6gp-8CFjylMWJHrd_A'] },
    { n: 3, bn: '৩য় বর্ষ', icon: '🔬', theme: 'amber', years: '2017–2022',
      sems: ['1EGmIT-sQOsOXAW_A5zTrLjtBhf0rTll4', '1TX03aUcHEBwsNUdXIbyuzxZDpW4foz9d'] },
    { n: 4, bn: '৪র্থ বর্ষ', icon: '🎓', theme: 'pink', years: '2018–2023',
      sems: ['1clxDnZUd9GbBfPZP3jZSWJQaexu-5Rdx', '1QkprhVaLt4VNDttvJyNKZJm9GUHy-yBb'] },
    { n: 5, bn: 'মাস্টার্স', en: 'Masters', icon: '🏛️', theme: 'cyan', years: 'MS',
      sems: ['1Z1Ixn13sBdDiInxK638DD5Xte7tsIhah', '1O0lxWP9lsmIIGiDeiR_jw7oa5Xjt903l'] }
  ];
  const semBn = ['১ম সেমিস্টার', '২য় সেমিস্টার'];
  grid.innerHTML = levels.map(L => `
    <div>
      <div class="reveal flex items-center gap-4 mb-5">
        <span class="text-3xl">${L.icon}</span>
        <h3 class="display text-2xl md:text-3xl font-bold"><span class="lang-bn">${L.bn}</span><span class="lang-en">${L.en || 'Level ' + L.n}</span></h3>
        <span class="text-sm text-[color:var(--muted)]">${L.years}</span>
        <span class="lvl-line"></span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${L.sems.map((id, i) => `
        <div class="reveal card glass c-${L.theme} p-7 flex items-center justify-between gap-4" style="transition-delay:${i * .12}s">
          <div class="space-y-2">
            <span class="tag text-xs font-bold px-3 py-1 rounded-full">L${L.n}-S${i + 1}</span>
            <h4 class="display text-xl font-bold"><span class="lang-bn">${L.bn}, ${semBn[i]}</span><span class="lang-en">${L.en || 'Level ' + L.n}, Semester ${i + 1}</span></h4>
            <a href="${DRIVE}${id}" target="_blank" rel="noopener" class="inline-flex items-center text-sm font-semibold text-white/90 hover:text-white gap-1 pt-1">
              <span class="lang-bn">গুগল ড্রাইভে ফাইল দেখুন &rarr;</span><span class="lang-en">View Drive Files &rarr;</span>
            </a>
          </div>
          <span class="icon shrink-0">${L.icon}</span>
        </div>`).join('')}
      </div>
    </div>`).join('');
}

/* ---------- Scroll reveal + card glow ---------- */
const io = new IntersectionObserver(en => en.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
document.querySelectorAll('.card').forEach(c => c.addEventListener('pointermove', e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  c.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));

/* ---------- Memory gallery (memory.html) ----------
   নতুন ছবি/ভিডিও যোগ করতে শুধু নিচের MEMORIES list-এ একটা লাইন বাড়াও:
   - ছবি:  { type: 'photo', src: 'memory/filename.jpg', caption: 'যা খুশি লিখতে পারো' }
     (photo file গুলো repo-তে একটা "memory" ফোল্ডার বানিয়ে তার ভেতরে রাখো)
   - YouTube ভিডিও: { type: 'youtube', id: 'YOUTUBE_VIDEO_ID', caption: '...' }
     (id হলো লিংকের watch?v= এর পরের অংশটুকু)
   - নিজের mp4 ভিডিও: { type: 'video', src: 'memory/filename.mp4', caption: '...' }
------------------------------------------------------------------ */
const memoryGrid = document.getElementById('memoryGrid');
if (memoryGrid) {
  const MEMORIES = [
    { type: 'photo', src: 'memory/Last_Class_2026-08-31_at_23.21.24.jpeg', caption: 'Campus, 2025' },  // { type: 'photo', src: 'memory/example1.jpg', caption: 'Campus, 2026' },
    // { type: 'youtube', id: 'dQw4w9WgXcQ', caption: 'Department program' },
    { type: 'video', src: 'memory/TOM_ai.mp4', caption: 'My TOM' }// { type: 'video', src: 'memory/clip1.mp4', caption: 'Farewell' },
  ];

  const emptyMsg = document.getElementById('memoryEmpty');
  const thumb = m => {
    if (m.type === 'photo') return `<img src="${m.src}" alt="${m.caption || ''}" loading="lazy" class="w-full h-full object-cover">`;
    if (m.type === 'youtube') return `<img src="https://img.youtube.com/vi/${m.id}/hqdefault.jpg" alt="${m.caption || ''}" loading="lazy" class="w-full h-full object-cover"><span class="play-badge">▶</span>`;
    if (m.type === 'video') return `<video src="${m.src}" muted class="w-full h-full object-cover"></video><span class="play-badge">▶</span>`;
    return '';
  };

  function render(filter) {
    const items = MEMORIES.filter(m => filter === 'all' || m.type === filter || (filter === 'video' && m.type === 'youtube'));
    memoryGrid.innerHTML = items.map((m, i) => `
      <button class="mem-item reveal" data-i="${i}" data-filter="${m.type === 'youtube' ? 'video' : m.type}" style="transition-delay:${(i % 8) * .05}s">
        ${thumb(m)}
      </button>`).join('');
    emptyMsg.classList.toggle('hidden', items.length > 0);
    memoryGrid.querySelectorAll('.mem-item').forEach(btn => {
      btn.addEventListener('click', () => openLightbox(items[+btn.dataset.i]));
      io.observe(btn);
    });
  }
  render('all');

  document.querySelectorAll('.mem-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.mem-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    render(tab.dataset.filter);
  }));

  const lb = document.getElementById('lightbox');
  const lbContent = document.getElementById('lbContent');
  function openLightbox(m) {
    if (m.type === 'photo') lbContent.innerHTML = `<img src="${m.src}" alt="${m.caption || ''}" class="max-w-full max-h-[85vh] rounded-xl">`;
    else if (m.type === 'youtube') lbContent.innerHTML = `<iframe class="w-full aspect-video rounded-xl" style="min-width:min(90vw,800px)" src="https://www.youtube.com/embed/${m.id}?autoplay=1" title="${m.caption || ''}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    else if (m.type === 'video') lbContent.innerHTML = `<video src="${m.src}" controls autoplay class="max-w-full max-h-[85vh] rounded-xl"></video>`;
    lb.classList.remove('hidden');
    lb.classList.add('flex');
  }
  function closeLightbox() {
    lb.classList.add('hidden');
    lb.classList.remove('flex');
    lbContent.innerHTML = '';
  }
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}
