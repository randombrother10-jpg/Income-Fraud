import NumberField from "./NumberField";
import { NUMERIC_FIELDS } from "../../config/formConfig";
import { serifFont } from "./styles";

// The "Numeric details" block: all number inputs.
export default function NumericSection({ form, errors, onChange }) {
  return (
    <section aria-labelledby="numeric-heading" className="mt-12">
      <h2 id="numeric-heading" className="text-2xl" style={serifFont}>
        Numeric details
      </h2>
      <div className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {NUMERIC_FIELDS.map((f) => (
          <NumberField
            key={f.name}
            field={f}
            value={form[f.name]}
            onChange={onChange}
            error={errors[f.name]}
          />
        ))}
      </div>
    </section>
  );
}
