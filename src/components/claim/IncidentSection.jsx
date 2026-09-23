import SelectField from "./SelectField";
import { SELECT_FIELDS } from "../../config/formConfig";
import { serifFont } from "./styles";

// The "Incident details" block: all dropdowns.
export default function IncidentSection({ form, onChange }) {
  return (
    <section aria-labelledby="incident-heading">
      <h2 id="incident-heading" className="text-2xl" style={serifFont}>
        Incident details
      </h2>
      <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {SELECT_FIELDS.map((f) => (
          <SelectField
            key={f.name}
            label={f.label}
            name={f.name}
            value={form[f.name]}
            onChange={onChange}
            options={f.options}
          />
        ))}
      </div>
    </section>
  );
}
