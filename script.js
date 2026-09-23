// ═══════════════════════════════════════════════
//  CUSTOM CURSOR
// ═══════════════════════════════════════════════
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, input, select, textarea, .step-card, .trust-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1.8)';
    ring.style.borderColor = 'rgba(0,212,255,0.8)';
    dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.borderColor = 'rgba(0,212,255,0.6)';
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ═══════════════════════════════════════════════
//  NAVBAR SCROLL + ACTIVE LINKS
// ═══════════════════════════════════════════════
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// ═══════════════════════════════════════════════
//  HAMBURGER MENU
// ═══════════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ═══════════════════════════════════════════════
//  HERO CANVAS — Particle Network
// ═══════════════════════════════════════════════
const hc = document.getElementById('hero-canvas');
const hctx = hc.getContext('2d');

function resizeHero() {
  hc.width = window.innerWidth;
  hc.height = window.innerHeight;
}
resizeHero();
window.addEventListener('resize', resizeHero);

const nodes = [];
const NODE_COUNT = 60;

for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: 1.5 + Math.random() * 2,
    alpha: 0.2 + Math.random() * 0.5,
  });
}

function drawHeroCanvas() {
  const W = hc.width, H = hc.height;
  hctx.clearRect(0, 0, W, H);

  const bg = hctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.3, H * 0.4, W * 0.8);
  bg.addColorStop(0, 'rgba(0,50,100,0.5)');
  bg.addColorStop(0.5, 'rgba(4,13,26,0.8)');
  bg.addColorStop(1, 'rgba(4,13,26,1)');
  hctx.fillStyle = bg;
  hctx.fillRect(0, 0, W, H);

  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  });

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        hctx.beginPath();
        hctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 160)})`;
        hctx.lineWidth = 1;
        hctx.moveTo(nodes[i].x, nodes[i].y);
        hctx.lineTo(nodes[j].x, nodes[j].y);
        hctx.stroke();
      }
    }
  }

  nodes.forEach(n => {
    hctx.beginPath();
    hctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    hctx.fillStyle = `rgba(0,212,255,${n.alpha})`;
    hctx.fill();
  });

  requestAnimationFrame(drawHeroCanvas);
}
drawHeroCanvas();

// ═══════════════════════════════════════════════
//  VIDEO
// ═══════════════════════════════════════════════
const demoVideo = document.getElementById('demo-video');
const vidOverlay = document.getElementById('vid-overlay');
const scanLine = document.getElementById('scan-line');

vidOverlay.addEventListener('click', () => {
  demoVideo.play();
  vidOverlay.classList.add('hidden');
  scanLine.classList.add('active');
  setTimeout(() => scanLine.classList.remove('active'), 2100);
});
demoVideo.addEventListener('ended', () => {
  vidOverlay.classList.remove('hidden');
});

// ═══════════════════════════════════════════════
//  TERMINAL TYPEWRITER
// ═══════════════════════════════════════════════
const termLines = [
  { cls: 'term-green',  label: '$',        text: ' Initializing VeriDoc Engine v4.2...' },
  { cls: 'term-blue',   label: '[INFO]',   text: ' Loading fraud detection model...' },
  { cls: 'term-blue',   label: '[INFO]',   text: ' Document received: ITR_2024.pdf' },
  { cls: 'term-yellow', label: '[SCAN]',   text: ' Extracting document metadata...' },
  { cls: 'term-yellow', label: '[SCAN]',   text: ' Running ELA pixel forensics...' },
  { cls: 'term-yellow', label: '[SCAN]',   text: ' Checking font consistency...' },
  { cls: 'term-blue',   label: '[API]',    text: ' Cross-checking IT portal...' },
  { cls: 'term-blue',   label: '[API]',    text: ' Verifying PAN registration...' },
  { cls: 'term-green',  label: '[RESULT]', text: ' Fraud Risk Score: 4 / 100' },
  { cls: 'term-green',  label: '[RESULT]', text: ' Status: ✓ AUTHENTIC DOCUMENT' },
];

const termBody = document.getElementById('term-body');
let termRunning = false;

function runTerminal() {
  if (termRunning) return;
  termRunning = true;
  termBody.innerHTML = '';
  const cursor = document.createElement('p');
  cursor.className = 'term-cursor';
  cursor.textContent = '█';
  termBody.appendChild(cursor);

  termLines.forEach((line, i) => {
    setTimeout(() => {
      const p = document.createElement('p');
      const isResult = i >= termLines.length - 2;
      p.innerHTML = `<span class="${line.cls}">${line.label}</span> <span class="${isResult ? 'term-white' : 'term-dim'}">${line.text}</span>`;
      termBody.insertBefore(p, cursor);
      termBody.scrollTop = termBody.scrollHeight;
      if (i === termLines.length - 1) {
        setTimeout(() => { termRunning = false; }, 3000);
        setTimeout(() => runTerminal(), 5000);
      }
    }, i * 600);
  });
}

const terminalObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) runTerminal(); });
}, { threshold: 0.3 });

const terminalEl = document.querySelector('.terminal');
if (terminalEl) terminalObserver.observe(terminalEl);

// ═══════════════════════════════════════════════
//  CURRENCY PARTICLE CANVAS
// ═══════════════════════════════════════════════
const cc = document.getElementById('currency-canvas');
const cctx = cc.getContext('2d');
const currencySection = document.getElementById('currency-section');
let currencyHover = false;

function resizeCurrency() {
  cc.width = currencySection.offsetWidth;
  cc.height = currencySection.offsetHeight;
  initCurrencyParticles();
}

const currencySymbols = ['$', '€', '£', '¥', '₹', '₩', '₿', '¢', '₦', '₴'];

function getRupeePoints(cx, cy, count) {
  const pts = [];
  const mainCount = Math.floor(count * 0.55);

  for (let i = 0; i < mainCount; i++) {
    const t = i / mainCount;
    let px, py;
    if (t < 0.12) {
      px = cx - 60 + t * (120 / 0.12); py = cy - 80;
    } else if (t < 0.24) {
      const a = ((t - 0.12) / 0.12) * Math.PI;
      px = cx + Math.cos(a) * 55; py = cy - 50 + Math.sin(a) * 30;
    } else if (t < 0.36) {
      px = cx - 60 + ((t - 0.24) / 0.12) * 120; py = cy - 20;
    } else if (t < 0.48) {
      const a = ((t - 0.36) / 0.12) * Math.PI;
      px = cx + Math.cos(a) * 55; py = cy + 10 + Math.sin(a) * 30;
    } else if (t < 0.75) {
      const dt = (t - 0.48) / 0.27;
      px = cx + 40 - dt * 100; py = cy - 10 + dt * 120;
    } else {
      const dt = (t - 0.75) / 0.25;
      px = cx - 20; py = cy - 80 + dt * 180;
    }
    pts.push({ x: px, y: py });
  }

  const lhCount = Math.floor(count * 0.2);
  for (let i = 0; i < lhCount; i++) {
    const a = Math.PI + (i / lhCount) * Math.PI * 0.7;
    const r = 30 + Math.random() * 15;
    pts.push({ x: cx - 90 + Math.cos(a) * r, y: cy + 110 + Math.sin(a) * r });
  }

  const rhCount = count - mainCount - lhCount;
  for (let i = 0; i < rhCount; i++) {
    const a = (i / rhCount) * Math.PI * 0.7 - 0.3;
    const r = 30 + Math.random() * 15;
    pts.push({ x: cx + 80 + Math.cos(a) * r, y: cy + 110 + Math.sin(a) * r });
  }
  return pts;
}

let currencyParticles = [];
const C_COUNT = 150;

function initCurrencyParticles() {
  const W = cc.width, H = cc.height;
  currencyParticles = [];
  for (let i = 0; i < C_COUNT; i++) {
    currencyParticles.push({
      x: Math.random() * W, y: Math.random() * H,
      homeX: Math.random() * W, homeY: Math.random() * H,
      vx: 0, vy: 0,
      symbol: currencySymbols[i % currencySymbols.length],
      size: 14 + Math.random() * 16,
      alpha: 0.15 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      color: ['#f5a623', '#00d4ff', '#00ff88', '#ffffff'][Math.floor(Math.random() * 4)],
    });
  }
}

function drawCurrencyParticles() {
  const W = cc.width, H = cc.height;
  cctx.clearRect(0, 0, W, H);

  const rupPts = getRupeePoints(W / 2, H / 2 - 20, C_COUNT);

  currencyParticles.forEach((p, i) => {
    p.phase += 0.018;
    const tx = currencyHover ? rupPts[i].x : p.homeX + Math.sin(p.phase + i * 0.3) * 25;
    const ty = currencyHover ? rupPts[i].y : p.homeY + Math.cos(p.phase * 0.8 + i * 0.2) * 25;

    p.vx = p.vx * 0.82 + (tx - p.x) * 0.09;
    p.vy = p.vy * 0.82 + (ty - p.y) * 0.09;
    p.x += p.vx; p.y += p.vy;

    cctx.save();
    cctx.globalAlpha = currencyHover ? 0.92 : p.alpha;
    cctx.font = `bold ${p.size}px 'Syne', sans-serif`;
    cctx.fillStyle = currencyHover ? (p.symbol === '₹' ? '#f5a623' : p.color) : p.color;
    if (currencyHover && p.symbol === '₹') { cctx.shadowColor = '#f5a623'; cctx.shadowBlur = 12; }
    cctx.fillText(p.symbol, p.x - p.size * 0.3, p.y + p.size * 0.4);
    cctx.restore();
  });

  if (currencyHover) {
    const cx = W / 2, cy = H / 2 - 20;
    const g = cctx.createRadialGradient(cx, cy, 20, cx, cy, 180);
    g.addColorStop(0, 'rgba(245,166,35,0.12)');
    g.addColorStop(1, 'rgba(245,166,35,0)');
    cctx.fillStyle = g;
    cctx.beginPath(); cctx.arc(cx, cy, 180, 0, Math.PI * 2); cctx.fill();
  }

  requestAnimationFrame(drawCurrencyParticles);
}

currencySection.addEventListener('mouseenter', () => currencyHover = true);
currencySection.addEventListener('mouseleave', () => currencyHover = false);
resizeCurrency();
drawCurrencyParticles();
window.addEventListener('resize', resizeCurrency);

// ═══════════════════════════════════════════════
//  SCROLL REVEAL
// ═══════════════════════════════════════════════
const revealEls = document.querySelectorAll(
  '.step-card, .trust-card, .hstat, .about-stat, .tbadge, .vid-features li, .ci-item'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), 80);
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ═══════════════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════════════
const submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const orig = submitBtn.textContent;
    submitBtn.textContent = "✓ Request Sent! We'll contact you soon.";
    submitBtn.style.background = '#00ff88';
    submitBtn.style.color = '#040d1a';
    setTimeout(() => {
      submitBtn.textContent = orig;
      submitBtn.style.background = '';
      submitBtn.style.color = '';
    }, 3000);
  });
}

// ═══════════════════════════════════════════════
//  STAGGER DELAYS
// ═══════════════════════════════════════════════
document.querySelectorAll('.step-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.08) + 's';
});
document.querySelectorAll('.trust-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.07) + 's';
});