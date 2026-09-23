import { controlClass } from "./styles";

// One labelled number input with an error message underneath.
// data-invalid lets App.jsx find bad fields to shake with GSAP.
export default function NumberField({ field, value, onChange, error }) {
  return (
    <label className="block" data-field data-invalid={error ? "true" : "false"}>
      <span className="mb-1.5 block text-sm font-medium text-[#33445C]">{field.label}</span>
      <input
        type="number"
        inputMode="decimal"
        name={field.name}
        min={field.min}
        step={field.step ?? "any"}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`${controlClass} ${error ? "border-[#C2410C] focus:border-[#C2410C] focus:ring-[#C2410C]/25" : ""}`}
      />
      <span className="mt-1 block min-h-[18px] text-xs text-[#C2410C]">{error}</span>
    </label>
  );
}
