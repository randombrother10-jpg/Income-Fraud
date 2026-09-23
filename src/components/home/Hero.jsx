import { Fragment } from "react";
import HeroCanvas from "./HeroCanvas";
import Reveal from "../common/Reveal";

const STATS = [
  ["99.7", "%", "Detection Accuracy"],
  ["2.4", "s", "Avg. Verification Time"],
  ["50", "M+", "Documents Verified"],
];

const DOC_CARDS = [
  { n: 1, icon: "📄", name: "ITR_2024.pdf", status: "authentic", text: "✓ Authentic" },
  { n: 2, icon: "🪪", name: "PAN_Card.jpg", status: "fraud", text: "⚠ Tampered" },
  { n: 3, icon: "🏦", name: "BankStmt_Q3.pdf", status: "authentic", text: "✓ Authentic" },
];

export default function Hero() {
  return (
    <section id="hero">
      <HeroCanvas />
      <div className="grid-overlay"></div>

      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          AI-Powered Document Intelligence
        </div>

        <h1 className="hero-title">
          DETECT.<br />
          <span className="outline-text">VERIFY.</span><br />
          <span className="accent-text">PROTECT.</span>
        </h1>

        <p className="hero-desc">
          Enterprise-grade fraud detection for insurance companies &amp; MNCs.<br />
          We authenticate documents in seconds — so you never pay a false claim again.
        </p>

        <div className="hero-btns">
          <a href="#how-it-works" className="btn-primary large">See How It Works</a>
          <a href="#video-section" className="btn-ghost large">Watch Demo ▶</a>
        </div>

        <div className="hero-stats">
          {STATS.map(([num, unit, label], i) => (
            <Fragment key={label}>
              {i > 0 && <div className="hstat-divider"></div>}
              <Reveal className="hstat">
                <span className="hstat-num">{num}<em>{unit}</em></span>
                <span className="hstat-label">{label}</span>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>

      {DOC_CARDS.map((c) => (
        <div key={c.n} className={`doc-card doc-card-${c.n}`}>
          <div className="doc-icon">{c.icon}</div>
          <div className="doc-info">
            <span className="doc-name">{c.name}</span>
            <span className={`doc-status ${c.status}`}>{c.text}</span>
          </div>
        </div>
      ))}

      <div className="scroll-indicator">
        <div className="scroll-wheel"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
