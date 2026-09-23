import Reveal from "../common/Reveal";

const CARDS = [
  { icon: "🔐", title: "AES-256 Encryption",
    text: "All documents encrypted in transit and at rest with military-grade AES-256 encryption. Zero plaintext exposure at any point." },
  { icon: "🚫", title: "Zero Data Retention", featured: true,
    text: "Documents are permanently deleted after verification. We do not store, sell, or share your client's personal financial data. Ever." },
  { icon: "🛡️", title: "ISO 27001 Certified",
    text: "Our entire infrastructure is ISO 27001 certified. Audited annually by independent third-party security firms." },
  { icon: "⚖️", title: "Legal Compliance",
    text: "Fully compliant with IT Act 2000, GDPR, and IRDAI guidelines. Every verification generates a court-admissible evidence trail." },
  { icon: "👁️", title: "Full Audit Trail",
    text: "Every action logged with timestamps, IP addresses, and user IDs. Complete chain of custody for every document processed." },
  { icon: "🌐", title: "Private Cloud",
    text: "Dedicated private cloud infrastructure per enterprise client. Your data never shares resources with other organizations." },
];

const BADGES = ["🏛️ RBI Compliant", "🔒 SOC 2 Type II", "📋 IRDAI Approved", "🌐 ISO 27001", "⚖️ IT Act 2000"];

export default function TrustSection() {
  return (
    <section id="trust-section">
      <div className="section-tag">04 — Security</div>
      <h2 className="section-title">Your Documents.<br /><span>Fort Knox</span> Level Security.</h2>
      <p className="section-sub">We don't just verify — we protect. Every document handled under military-grade protocols.</p>

      <div className="trust-grid">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} className={`trust-card${c.featured ? " featured" : ""}`} delay={i * 0.07}>
            {c.featured && <div className="trust-badge">Most Important</div>}
            <div className="trust-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </Reveal>
        ))}
      </div>

      <div className="trust-badges">
        {BADGES.map((b) => (
          <Reveal key={b} className="tbadge">{b}</Reveal>
        ))}
      </div>
    </section>
  );
}
