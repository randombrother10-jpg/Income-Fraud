import Reveal from "../common/Reveal";

const STATS = [
  ["₹ 2.4B+", "Fraud Prevented"],
  ["340+", "Enterprise Clients"],
  ["12", "Countries Active"],
  ["2019", "Founded"],
];

export default function About() {
  return (
    <section id="about">
      <div className="about-inner">
        <div className="section-tag">06 — About</div>
        <h2 className="section-title">Built By <span>Engineers</span><br />Who Hate Fraud.</h2>
        <p className="section-sub">VeriDoc was founded by a team of ML researchers, forensic auditors, and fintech veterans who watched insurance companies lose billions to document fraud — and decided to fix it.</p>
        <div className="about-grid">
          {STATS.map(([num, label]) => (
            <Reveal key={label} className="about-stat">
              <span className="as-num">{num}</span>
              <span className="as-label">{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
