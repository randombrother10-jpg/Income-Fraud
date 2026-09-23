import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { serifFont } from "./styles";

// Shows the prediction. `result` = { fraud: boolean, probability?: number }
export default function ResultCard({ result }) {
  const cardRef = useRef(null);
  const barRef = useRef(null);
  const percent = result.probability !== undefined ? Math.round(result.probability * 100) : null;

  // GSAP: card slides in, then the probability bar fills up.
  useEffect(() => {
    const reduce = prefersReducedMotion();
    cardRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    if (reduce) return;

    gsap.fromTo(cardRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    if (barRef.current) {
      gsap.fromTo(barRef.current, { width: "0%" }, { width: `${percent}%`, duration: 1, delay: 0.25, ease: "power2.out" });
    }
  }, [result, percent]);

  const color = result.fraud ? "#C2410C" : "#15803D"; // orange = suspicious, green = genuine

  return (
    <div
      ref={cardRef}
      role="status"
      className="mt-8 rounded-lg border-l-8 bg-white p-6 shadow-sm"
      style={{ borderColor: color }}
    >
      <p className="text-3xl" style={serifFont}>
        {result.fraud ? "This claim looks suspicious" : "This claim looks genuine"}
      </p>
      <p className="mt-2 text-[15px] text-[#33445C]">
        {result.fraud
          ? "Send this claim for manual investigation before any payout."
          : "The model found no strong signs of fraud. Process the claim as usual."}
      </p>

      {percent !== null && (
        <div className="mt-5">
          <div className="flex justify-between text-sm text-[#33445C]">
            <span>Fraud probability</span>
            <span className="font-semibold">{percent}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#DDE3EA]">
            <div ref={barRef} className="h-full rounded-full" style={{ background: color }} />
          </div>
        </div>
      )}
    </div>
  );
}
