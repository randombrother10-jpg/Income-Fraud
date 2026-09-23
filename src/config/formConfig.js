// ---------------------------------------------------------------
// All form settings live here. To add/rename a field or change an
// option, edit this file only - the components read from it.
// ---------------------------------------------------------------

// Backend URL. Override with VITE_API_URL in a .env file.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/predict";

// Dropdown fields. `name` is the key sent to your backend.
// An option is either "Text" or ["valueSentToBackend", "Text shown to user"].
export const SELECT_FIELDS = [
  {
    name: "incident_type",
    label: "Incident type",
    options: ["Multi-vehicle Collision", "Parked Car", "Single Vehicle Collision", "Vehicle Theft"],
  },
  {
    name: "collision_type",
    label: "Collision type",
    options: ["Front Collision", "Rear Collision", "Side Collision"],
  },
  {
    name: "incident_severity",
    label: "Incident severity",
    options: ["Major Damage", "Minor Damage", "Total Loss", "Trivial Damage"],
  },
  {
    name: "authorities_contacted",
    label: "Authorities contacted",
    options: [
      ["Ambulance", "Ambulance"],
      ["Fire", "Fire"],
      ["Other", "Other"],
      ["Police", "Police"],
      ["nan", "None recorded"], // sends "nan" exactly like your model expects
    ],
  },
  { name: "property_damage", label: "Property damage", options: ["NO", "YES"] },
  { name: "police_report_available", label: "Police report", options: ["NO", "YES"] },
  { name: "insured_sex", label: "Gender", options: ["FEMALE", "MALE"] },
];

// Number fields. `min` is used for validation.
export const NUMERIC_FIELDS = [
  { name: "policy_deductable", label: "Policy deductible", min: 0 },
  { name: "number_of_vehicles_involved", label: "Vehicles involved", min: 1, step: 1 },
  { name: "bodily_injuries", label: "Bodily injuries", min: 0, step: 1 },
  { name: "witnesses", label: "Witnesses", min: 0, step: 1 },
  { name: "injury_claim", label: "Injury claim", min: 0 },
  { name: "property_claim", label: "Property claim", min: 0 },
  { name: "vehicle_claim", label: "Vehicle claim", min: 0 },
  { name: "policy_annual_premium", label: "Annual premium", min: 0 },
];

// Starting values: first option for every dropdown, empty for numbers.
export const INITIAL_FORM = {
  ...Object.fromEntries(
    SELECT_FIELDS.map((f) => {
      const first = f.options[0];
      return [f.name, Array.isArray(first) ? first[0] : first];
    })
  ),
  ...Object.fromEntries(NUMERIC_FIELDS.map((f) => [f.name, ""])),
};
