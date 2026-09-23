import { useEffect, useRef } from "react";
import gsap from "gsap";

// Elements that make the cursor ring grow when hovered.
const HOVER_SELECTOR = "a, button, input, select, textarea, .step-card, .trust-card";

// Replaces the cursor code from script.js. GSAP's ticker moves the ring smoothly behind the dot.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let hovering = false;

    const setHover = (on) => {
      hovering = on;
      ring.style.transform = `translate(-50%, -50%) scale(${on ? 1.8 : 1})`;
      ring.style.borderColor = on ? "rgba(0,212,255,0.8)" : "rgba(0,212,255,0.6)";
      dot.style.transform = `translate(-50%, -50%) scale(${on ? 0.5 : 1})`;
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.left = mouse.x + "px";
      dot.style.top = mouse.y + "px";
      const over = !!e.target.closest?.(HOVER_SELECTOR);
      if (over !== hovering) setHover(over);
    };

    // Runs every frame: ring follows the mouse with 15% "lag"
    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;
      ring.style.left = ringPos.x + "px";
      ring.style.top = ringPos.y + "px";
    };

    document.addEventListener("mousemove", onMove);
    gsap.ticker.add(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div id="cursor">
      <div id="cursor-dot" ref={dotRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </div>
  );
}
