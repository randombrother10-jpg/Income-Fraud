import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { serifFont } from "./styles";

// Dark left panel: title + live totals.
// `total` and `ratio` are calculated in App.jsx and passed in.
export default function SummaryPanel({ total, ratio }) {
  const totalRef = useRef(null);
  const shown = useRef({ value: 0 }); // the number currently on screen

  // GSAP: animate the number from what's shown now to the new total.
  useEffect(() => {
    const el = totalRef.current;
    const format = (n) => Math.round(n).toLocaleString("en-IN");

    if (prefersReducedMotion()) {
      shown.current.value = total;
      el.textContent = format(total);
      return;
    }
    const tween = gsap.to(shown.current, {
      value: total,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => (el.textContent = format(shown.current.value)),
    });
    return () => tween.kill();
  }, [total]);

  return (
    <aside
      data-panel
      className="bg-[#101B2D] px-7 py-10 text-[#E9EDF1] lg:sticky lg:top-0 lg:h-screen lg:px-10 lg:py-14"
    >
      <h1 data-title className="text-[42px] leading-[1.05] tracking-tight lg:text-[52px]" style={{ ...serifFont, fontWeight: 500 }}>
        {["Insurance", "fraud", "detection"].map((word) => (
          <span key={word} className="block overflow-hidden">
            <span className="block">{word}</span>
          </span>
        ))}
      </h1>

      <p data-panel-copy className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-[#A9B6C6]">
        Enter the details from a submitted claim. The model checks whether the claim looks genuine or suspicious.
      </p>

      <dl data-panel-copy className="mt-10 space-y-6 border-t border-[#2B3B55] pt-8">
        <div>
          <dt className="text-sm text-[#A9B6C6]">Total amount claimed</dt>
          <dd className="mt-1 text-4xl" style={serifFont}>
            <span ref={totalRef}>0</span>
          </dd>
          <p className="mt-1 text-xs text-[#7D8DA3]">Injury + property + vehicle claim</p>
        </div>
        <div>
          <dt className="text-sm text-[#A9B6C6]">Claim compared to annual premium</dt>
          <dd className="mt-1 text-2xl" style={serifFont}>
            {ratio === null ? "–" : `${ratio.toFixed(1)}× the premium`}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
