import { useEffect, useRef, useState } from "react";
import Reveal from "../common/Reveal";

const INFO = [
  ["📧", "enterprise@veridoc.ai"],
  ["📞", "+91 90089 20089"],
  ["🏢", "Mumbai | Bengaluru | Delhi"],
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Button turns green for 3 seconds after clicking (same as script.js).
  const handleClick = () => {
    setSent(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-left">
          <div className="section-tag">05 — Contact</div>
          <h2 className="section-title">Ready to Stop<br /><span>Fraud?</span></h2>
          <p className="section-sub">Talk to our team. We'll set up a custom verification pipeline for your organization within 48 hours.</p>
          <div className="contact-info">
            {INFO.map(([icon, text]) => (
              <Reveal key={text} className="ci-item"><span>{icon}</span> {text}</Reveal>
            ))}
          </div>
        </div>

        <div className="contact-right">
          <div className="contact-form">
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" placeholder="e.g. HDFC Life Insurance" />
            </div>
            <div className="form-group">
              <label>Business Email</label>
              <input type="email" placeholder="you@company.com" />
            </div>
            <div className="form-group">
              <label>Monthly Document Volume</label>
              <select>
                <option>Under 1,000 docs/month</option>
                <option>1,000 – 10,000 docs/month</option>
                <option>10,000 – 100,000 docs/month</option>
                <option>100,000+ docs/month</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us about your use case..."></textarea>
            </div>
            <button
              className="btn-primary large full-width"
              id="submit-btn"
              onClick={handleClick}
              style={sent ? { background: "#00ff88", color: "#040d1a" } : undefined}
            >
              {sent ? "✓ Request Sent! We'll contact you soon." : "Request a Demo →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
