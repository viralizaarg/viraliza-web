// Nav scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), {passive:true});

// Hamburger
const hbg = document.querySelector('.hamburger');
const nl  = document.querySelector('.nav-links');
hbg?.addEventListener('click', () => { hbg.classList.toggle('open'); nl.classList.toggle('open'); });
nl?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { hbg?.classList.remove('open'); nl.classList.remove('open'); }));

// Active nav
const cur = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === cur || (cur===''&&a.getAttribute('href')==='index.html')) a.classList.add('active');
});

// Fade-in observer
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, {threshold:.12});
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// Counter animation
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, t = +el.dataset.target, dur = 1800, s = performance.now();
    const tick = now => {
      const p = Math.min((now-s)/dur,1), val = Math.floor((1-Math.pow(1-p,3))*t);
      el.textContent = val; if(p<1) requestAnimationFrame(tick); else el.textContent = t;
    };
    requestAnimationFrame(tick); cntObs.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('[data-target]').forEach(el => cntObs.observe(el));

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ─── VIRUS CURSOR ───
(function() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  // SVG del virus inline
  const virusSVG = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- cuerpo central -->
    <circle cx="16" cy="16" r="7" fill="#ff8b00" opacity=".95"/>
    <!-- núcleo interior -->
    <circle cx="16" cy="16" r="3.5" fill="#fff" opacity=".25"/>
    <!-- ojos -->
    <circle cx="14" cy="14.5" r="1.3" fill="#fff"/>
    <circle cx="18" cy="14.5" r="1.3" fill="#fff"/>
    <circle cx="14.5" cy="14.5" r=".55" fill="#0086ff"/>
    <circle cx="18.5" cy="14.5" r=".55" fill="#0086ff"/>
    <!-- sonrisa -->
    <path d="M13.5 17.5 Q16 20 18.5 17.5" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <!-- puas spike N -->
    <line x1="16" y1="9" x2="16" y2="5.5" stroke="#ff8b00" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="16" cy="5" r="1.3" fill="#0086ff"/>
    <!-- puas spike S -->
    <line x1="16" y1="23" x2="16" y2="26.5" stroke="#ff8b00" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="16" cy="27" r="1.3" fill="#0086ff"/>
    <!-- puas spike E -->
    <line x1="23" y1="16" x2="26.5" y2="16" stroke="#ff8b00" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="27" cy="16" r="1.3" fill="#0086ff"/>
    <!-- puas spike W -->
    <line x1="9" y1="16" x2="5.5" y2="16" stroke="#ff8b00" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="5" cy="16" r="1.3" fill="#0086ff"/>
    <!-- puas spike NE -->
    <line x1="21" y1="11" x2="23.8" y2="8.2" stroke="#ff8b00" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="24.4" cy="7.6" r="1.2" fill="#0086ff"/>
    <!-- puas spike NW -->
    <line x1="11" y1="11" x2="8.2" y2="8.2" stroke="#ff8b00" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="7.6" cy="7.6" r="1.2" fill="#0086ff"/>
    <!-- puas spike SE -->
    <line x1="21" y1="21" x2="23.8" y2="23.8" stroke="#ff8b00" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="24.4" cy="24.4" r="1.2" fill="#0086ff"/>
    <!-- puas spike SW -->
    <line x1="11" y1="21" x2="8.2" y2="23.8" stroke="#ff8b00" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="7.6" cy="24.4" r="1.2" fill="#0086ff"/>
  </svg>`;

  const cursor = document.createElement('div');
  cursor.className = 'cursor-virus';
  cursor.innerHTML = virusSVG;
  document.body.appendChild(cursor);

  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.appendChild(trail);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let angle = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    trail.style.left  = mx + 'px';
    trail.style.top   = my + 'px';
  }, { passive: true });

  // Rotación continua del virus
  function rotateCursor() {
    angle = (angle + 1.2) % 360;
    cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    requestAnimationFrame(rotateCursor);
  }
  rotateCursor();

  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));
})();
