import { useEffect, useRef } from "react";

const SYMBOLS = ["$", "€", "£", "¥", "₹", "₩", "₿", "¢", "₦", "₴"];
const COLORS = ["#f5a623", "#00d4ff", "#00ff88", "#ffffff"];
const COUNT = 150;

// Points that form the ₹ shape (unchanged from script.js)
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

// Floating currency symbols that form a ₹ when you hover the section.
export default function CurrencySection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cc = canvasRef.current;
    const cctx = cc.getContext("2d");
    let hover = false;
    let particles = [];
    let raf;

    const initParticles = () => {
      const W = cc.width, H = cc.height;
      particles = Array.from({ length: COUNT }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H,
        homeX: Math.random() * W, homeY: Math.random() * H,
        vx: 0, vy: 0,
        symbol: SYMBOLS[i % SYMBOLS.length],
        size: 14 + Math.random() * 16,
        alpha: 0.15 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * 4)],
      }));
    };

    const resize = () => {
      cc.width = section.offsetWidth;
      cc.height = section.offsetHeight;
      initParticles();
    };

    const draw = () => {
      const W = cc.width, H = cc.height;
      cctx.clearRect(0, 0, W, H);
      const rupPts = getRupeePoints(W / 2, H / 2 - 20, COUNT);

      particles.forEach((p, i) => {
        p.phase += 0.018;
        const tx = hover ? rupPts[i].x : p.homeX + Math.sin(p.phase + i * 0.3) * 25;
        const ty = hover ? rupPts[i].y : p.homeY + Math.cos(p.phase * 0.8 + i * 0.2) * 25;

        p.vx = p.vx * 0.82 + (tx - p.x) * 0.09;
        p.vy = p.vy * 0.82 + (ty - p.y) * 0.09;
        p.x += p.vx; p.y += p.vy;

        cctx.save();
        cctx.globalAlpha = hover ? 0.92 : p.alpha;
        cctx.font = `bold ${p.size}px 'Syne', sans-serif`;
        cctx.fillStyle = hover ? (p.symbol === "₹" ? "#f5a623" : p.color) : p.color;
        if (hover && p.symbol === "₹") { cctx.shadowColor = "#f5a623"; cctx.shadowBlur = 12; }
        cctx.fillText(p.symbol, p.x - p.size * 0.3, p.y + p.size * 0.4);
        cctx.restore();
      });

      if (hover) {
        const cx = W / 2, cy = H / 2 - 20;
        const g = cctx.createRadialGradient(cx, cy, 20, cx, cy, 180);
        g.addColorStop(0, "rgba(245,166,35,0.12)");
        g.addColorStop(1, "rgba(245,166,35,0)");
        cctx.fillStyle = g;
        cctx.beginPath(); cctx.arc(cx, cy, 180, 0, Math.PI * 2); cctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onEnter = () => (hover = true);
    const onLeave = () => (hover = false);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="currency-section" ref={sectionRef}>
      <canvas id="currency-canvas" ref={canvasRef}></canvas>
      <div className="currency-text">
        <h2>EVERY RUPEE<br /><span>ACCOUNTED FOR.</span></h2>
        <p>Hover to reveal what we protect</p>
      </div>
    </section>
  );
}
