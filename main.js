/* ---------- Shared: background, header, footer ---------- */
const PAGES = [
  { href: 'index.html', bn: 'হোম', en: 'Home' },
  { href: 'about.html', bn: 'পরিচিতি', en: 'About' },
  { href: 'files.html', bn: 'ফাইলস', en: 'Files' }
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
      sems: ['1clxDnZUd9GbBfPZP3jZSWJQaexu-5Rdx', '1QkprhVaLt4VNDttvJyNKZJm9GUHy-yBb'] }
  ];
  const semBn = ['১ম সেমিস্টার', '২য় সেমিস্টার'];
  grid.innerHTML = levels.map(L => `
    <div>
      <div class="reveal flex items-center gap-4 mb-5">
        <span class="text-3xl">${L.icon}</span>
        <h3 class="display text-2xl md:text-3xl font-bold"><span class="lang-bn">${L.bn}</span><span class="lang-en">Level ${L.n}</span></h3>
        <span class="text-sm text-[color:var(--muted)]">${L.years}</span>
        <span class="lvl-line"></span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${L.sems.map((id, i) => `
        <div class="reveal card glass c-${L.theme} p-7 flex items-center justify-between gap-4" style="transition-delay:${i * .12}s">
          <div class="space-y-2">
            <span class="tag text-xs font-bold px-3 py-1 rounded-full">L${L.n}-S${i + 1}</span>
            <h4 class="display text-xl font-bold"><span class="lang-bn">${L.bn}, ${semBn[i]}</span><span class="lang-en">Level ${L.n}, Semester ${i + 1}</span></h4>
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
