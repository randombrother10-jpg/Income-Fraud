import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import SummaryPanel from "../components/claim/SummaryPanel";
import IncidentSection from "../components/claim/IncidentSection";
import NumericSection from "../components/claim/NumericSection";
import SubmitBar from "../components/claim/SubmitBar";
import ResultCard from "../components/claim/ResultCard";

import { INITIAL_FORM, NUMERIC_FIELDS, API_URL } from "../config/formConfig";
import { predictFraud } from "../services/api";
import { prefersReducedMotion } from "../utils/motion";

// App = the "brain": holds all state, validates, calls the API.
// The components only display things and report changes back up.
export default function ClaimPage() {
  const [form, setForm] = useState(INITIAL_FORM); // every field's current value
  const [errors, setErrors] = useState({});       // { fieldName: "message" }
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);     // { fraud, probability } or null
  const [apiError, setApiError] = useState("");
  const rootRef = useRef(null);

  // Values for the left summary panel
  const total =
    (Number(form.injury_claim) || 0) +
    (Number(form.property_claim) || 0) +
    (Number(form.vehicle_claim) || 0);
  const premium = Number(form.policy_annual_premium) || 0;
  const ratio = premium > 0 ? total / premium : null;

  // GSAP page-load animation: panel wipes in -> title -> text -> fields.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-panel]", { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" })
        .from("[data-title] > span > span", { yPercent: 110, duration: 0.7, stagger: 0.08 }, "-=0.35")
        .from("[data-panel-copy]", { opacity: 0, duration: 0.5 }, "-=0.3")
        .from("[data-field]", { opacity: 0, y: 12, duration: 0.45, stagger: 0.03 }, "-=0.5");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Runs whenever any input/select changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Returns { fieldName: "message" } for every invalid number field.
  const validate = () => {
    const found = {};
    NUMERIC_FIELDS.forEach((f) => {
      const raw = form[f.name];
      if (raw === "") found[f.name] = "Required";
      else if (Number(raw) < f.min) found[f.name] = `Must be ${f.min} or more`;
    });
    return found;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setResult(null);

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Wait one frame so the red error state is rendered, then shake + focus.
      requestAnimationFrame(() => {
        const bad = rootRef.current.querySelectorAll('[data-invalid="true"]');
        if (!prefersReducedMotion()) {
          gsap.fromTo(bad, { x: -6 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        }
        bad[0]?.querySelector("input")?.focus();
      });
      return;
    }

    setLoading(true);
    try {
      setResult(await predictFraud(form));
    } catch (err) {
      setApiError(`Could not get a prediction. ${err.message}. Check that the backend is running at ${API_URL}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setResult(null);
    setApiError("");
  };

  return (
    <div
      ref={rootRef}
      className="cursor-auto min-h-screen bg-[#E9EDF1] text-[#101B2D] lg:grid lg:grid-cols-[minmax(320px,400px)_1fr]"
      style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
    >
      <SummaryPanel total={total} ratio={ratio} />

      <main className="px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
        <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-3xl">
          <IncidentSection form={form} onChange={handleChange} />
          <NumericSection form={form} errors={errors} onChange={handleChange} />
          <SubmitBar loading={loading} onReset={handleReset} />

          {apiError && (
            <p role="alert" className="mt-6 rounded-md border border-[#C2410C]/40 bg-[#FCEDE5] px-4 py-3 text-sm text-[#8A2F07]">
              {apiError}
            </p>
          )}
          {result && <ResultCard result={result} />}
        </form>
      </main>
    </div>
  );
}
