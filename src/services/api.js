import { API_URL, NUMERIC_FIELDS } from "../config/formConfig";

// Sends the form to the backend and returns { fraud: boolean, probability?: number }.
export async function predictFraud(form) {
  // Numbers are stored as strings in the inputs, so convert them here.
  const payload = { ...form };
  NUMERIC_FIELDS.forEach((f) => (payload[f.name] = Number(form[f.name])));

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Server responded with ${res.status}`);

  const data = await res.json();

  // Backend can reply {prediction: 1 | 0 | "Y" | "N"} and optionally {probability: 0-1}.
  // If your response looks different, change only these lines.
  const p = data.prediction ?? data.fraud_reported ?? data.is_fraud ?? data.result;
  const fraud = p === 1 || p === true || ["Y", "YES", "FRAUD", "1"].includes(String(p).toUpperCase());
  const probability = data.probability ?? data.fraud_probability;

  return { fraud, probability: typeof probability === "number" ? probability : undefined };
}
