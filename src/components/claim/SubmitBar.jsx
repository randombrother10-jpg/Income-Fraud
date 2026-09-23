import gsap from "gsap";
import { prefersReducedMotion } from "../../utils/motion";

// "Check claim" and "Clear form" buttons.
export default function SubmitBar({ loading, onReset }) {
  // Small GSAP "press" effect on the main button.
  const press = (e, scale, ease = "power2.out") =>
    !prefersReducedMotion() && gsap.to(e.currentTarget, { scale, duration: 0.2, ease });

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <button
        type="submit"
        disabled={loading}
        onMouseDown={(e) => press(e, 0.97)}
        onMouseUp={(e) => press(e, 1, "back.out(3)")}
        onMouseLeave={(e) => press(e, 1)}
        className="rounded-md bg-[#0B5C5A] px-7 py-3 text-[15px] font-semibold text-white outline-none transition-colors hover:bg-[#094948] focus-visible:ring-2 focus-visible:ring-[#0B5C5A] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? "Checking claim…" : "Check claim"}
      </button>

      <button
        type="button"
        onClick={onReset}
        className="rounded-md px-4 py-3 text-[15px] font-medium text-[#33445C] outline-none hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-[#0B5C5A]"
      >
        Clear form
      </button>
    </div>
  );
}
