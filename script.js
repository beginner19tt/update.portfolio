/* ============================================================
   script.js — Futuristic Student Portfolio
   ============================================================ */

// ---- Scroll Progress Bar ----
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  document.getElementById('pbar').style.transform = 'scaleX(' + pct + ')';
});

// ---- Scroll Fade-up ----
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// ---- Custom Cursor ----
const cursor = document.querySelector('.cursor');
const ring   = document.querySelector('.cursor-ring');

let cx = 0, cy = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  cx = e.clientX; cy = e.clientY;
  if (cursor) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; }
});

(function ringLoop() {
  rx += (cx - rx) * 0.12;
  ry += (cy - ry) * 0.12;
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(ringLoop);
})();

document.querySelectorAll('a, button, .card, .proj-card, .cert-card, .vision-card, .contact-card, .tag, .chip, .btn-primary, .btn-ghost').forEach(el => {
  el.addEventListener('mouseenter', () => ring && ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring && ring.classList.remove('hovering'));
});

// ---- Particle Canvas ----
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const PARTICLE_COUNT = 55;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:     Math.random() * window.innerWidth,
    y:     Math.random() * window.innerHeight,
    r:     Math.random() * 1.4 + 0.4,
    vx:    (Math.random() - 0.5) * 0.35,
    vy:    (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.45 + 0.1,
    color: Math.random() > 0.5 ? '0,229,255' : '180,0,255',
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.strokeStyle = 'rgba(' + p.color + ',' + ((1 - dist / 130) * 0.14) + ')';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ',' + p.alpha + ')';
      ctx.fill();
    }

    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ---- Typewriter Effect ----
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  const fullText = roleEl.dataset.text || roleEl.textContent.trim();
  roleEl.textContent = '';

  let ti = 0;
  function typeWriter() {
    roleEl.textContent = fullText.slice(0, ti);
    ti++;
    if (ti <= fullText.length) {
      setTimeout(typeWriter, 55);
    } else {
      roleEl.parentElement && roleEl.parentElement.classList.add('typewriter-done');
    }
  }
  setTimeout(typeWriter, 600);
}

// ---- Glitch Effect ----
const nameEl = document.querySelector('.hero-name');
if (nameEl) {
  nameEl.setAttribute('data-text', nameEl.textContent.trim());

  function triggerGlitch() {
    nameEl.classList.add('glitching');
    setTimeout(() => nameEl.classList.remove('glitching'), 280);
    setTimeout(triggerGlitch, 3500 + Math.random() * 4000);
  }
  setTimeout(triggerGlitch, 2500);
}
