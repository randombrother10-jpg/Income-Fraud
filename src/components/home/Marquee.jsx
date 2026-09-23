import { Fragment } from "react";

const ITEMS = [
  "Document Forgery Detection",
  "ML-Powered Verification",
  "Real-Time Analysis",
  "Insurance Fraud Prevention",
  "Tamper Detection",
  "Metadata Forensics",
];

export default function Marquee() {
  return (
    <div className="marquee-bar">
      <div className="marquee-inner">
        {/* list is repeated twice so the scrolling loop has no gap */}
        {[...ITEMS, ...ITEMS].map((text, i) => (
          <Fragment key={i}>
            <span>{text}</span>
            <span className="sep">◆</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
