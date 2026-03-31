/* ============================================================
   PORTFOLIO — ENTREPRENEUR DIGITAL
   script.js
   ============================================================ */

// ─── PAGE LOAD FADE-IN ────────────────────────────────────────
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1)';
window.addEventListener('load', () => {
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

// ─── CURSEUR PERSONNALISÉ (LERP fluide) ───────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let cx = mx, cy = my, rx = mx, ry = my;

const LERP_C = 0.9;   // point central : très réactif
const LERP_R = 0.11;  // anneau : suit avec inertie

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function lerp(a, b, t) { return a + (b - a) * t; }

function animCursor() {
  cx = lerp(cx, mx, LERP_C);
  cy = lerp(cy, my, LERP_C);
  rx = lerp(rx, mx, LERP_R);
  ry = lerp(ry, my, LERP_R);
  cursor.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
  ring.style.transform   = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
  requestAnimationFrame(animCursor);
}
animCursor();

// Agrandir curseur au survol des éléments interactifs
document.querySelectorAll('a, button, .project-card, .contact-item, .skill-tag, .showreel-play').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
});

// ─── NAVBAR — BORDURE AU SCROLL ───────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── PARTICULES FLOTTANTES ────────────────────────────────────
const pContainer = document.getElementById('particles');
for (let i = 0; i < 20; i++) {
  const p    = document.createElement('div');
  const size = Math.random() * 3 + 1.5;
  p.className = 'particle';
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    bottom: -10%;
    animation-duration: ${12 + Math.random() * 22}s;
    animation-delay: ${Math.random() * 18}s;
  `;
  pContainer.appendChild(p);
}

// ─── REVEAL AU SCROLL ─────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── BARRES DE COMPÉTENCES ────────────────────────────────────
document.querySelectorAll('.skill-bar-fill').forEach(bar => {
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => { bar.style.width = bar.dataset.width; }, 200);
        barObs.unobserve(bar);
      }
    });
  }, { threshold: 0.6 });
  barObs.observe(bar);
});

// ─── SCROLL ANCRES FLUIDE ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});