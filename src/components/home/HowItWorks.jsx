import Reveal from "../common/Reveal";

const STEPS = [
  { num: "01", icon: "📤", title: "Document Submission", tag: "Encrypted Upload",
    text: "Client securely uploads documents via our encrypted portal. Supports PDF, JPG, PNG — ITR forms, PAN cards, bank statements, insurance papers." },
  { num: "02", icon: "🔍", title: "Metadata Extraction", tag: "Forensic Scan",
    text: "Our system reads hidden metadata — creation timestamps, software signatures, edit history, and pixel-level data to detect any modifications." },
  { num: "03", icon: "🤖", title: "ML Model Analysis", tag: "AI Processing",
    text: "Our trained model cross-references 200+ fraud patterns, font inconsistencies, seal authenticity, and layout anomalies against real document databases." },
  { num: "04", icon: "🧾", title: "Cross Verification", tag: "API Cross-Check",
    text: "Document data is validated against government APIs — Income Tax portal, UIDAI, and banking networks to confirm identity and financial claims." },
  { num: "05", icon: "📊", title: "Risk Scoring", tag: "Scoring Engine",
    text: "Each document receives a fraud risk score from 0–100. Documents above threshold are flagged and routed for manual human review instantly." },
  { num: "06", icon: "✅", title: "Final Report", tag: "Verified Report",
    text: "A detailed verification report is delivered to your dashboard — authentic, tampered, or suspicious — with full evidence trail for legal compliance." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="section-tag">03 — Process</div>
      <h2 className="section-title">How We <span>Verify</span><br />Your Documents</h2>
      <p className="section-sub">A rigorous multi-layer ML pipeline that leaves no room for fraud.</p>

      <div className="steps-grid">
        {STEPS.map((s, i) => (
          <Reveal key={s.num} className="step-card" data-step={s.num} delay={i * 0.08}>
            <div className="step-icon-wrap"><div className="step-icon">{s.icon}</div></div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="step-tag">{s.tag}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
