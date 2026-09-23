import { controlClass } from "./styles";

// One labelled dropdown.
export default function SelectField({ label, name, value, onChange, options }) {
  return (
    <label className="block" data-field>
      <span className="mb-1.5 block text-sm font-medium text-[#33445C]">{label}</span>
      <select name={name} value={value} onChange={onChange} className={controlClass}>
        {options.map((option) => {
          const [val, text] = Array.isArray(option) ? option : [option, option];
          return (
            <option key={val} value={val}>
              {text}
            </option>
          );
        })}
      </select>
    </label>
  );
}
