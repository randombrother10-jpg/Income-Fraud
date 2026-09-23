import { useEffect, useRef } from "react";

// The moving particle network behind the hero (same drawing code as script.js).
export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const hc = canvasRef.current;
    const hctx = hc.getContext("2d");

    const resize = () => {
      hc.width = window.innerWidth;
      hc.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1.5 + Math.random() * 2,
      alpha: 0.2 + Math.random() * 0.5,
    }));

    let raf;
    const draw = () => {
      const W = hc.width, H = hc.height;
      hctx.clearRect(0, 0, W, H);

      const bg = hctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.3, H * 0.4, W * 0.8);
      bg.addColorStop(0, "rgba(0,50,100,0.5)");
      bg.addColorStop(0.5, "rgba(4,13,26,0.8)");
      bg.addColorStop(1, "rgba(4,13,26,1)");
      hctx.fillStyle = bg;
      hctx.fillRect(0, 0, W, H);

      nodes.forEach((n) => {
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

      nodes.forEach((n) => {
        hctx.beginPath();
        hctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        hctx.fillStyle = `rgba(0,212,255,${n.alpha})`;
        hctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef}></canvas>;
}
