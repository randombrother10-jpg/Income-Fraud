import { useEffect, useRef, useState } from "react";

// Lines that get "typed" one by one. `white` = bright text (first + result lines).
const TERM_LINES = [
  { cls: "term-green",  label: "$",        text: " Initializing VeriDoc Engine v4.2..." },
  { cls: "term-blue",   label: "[INFO]",   text: " Loading fraud detection model..." },
  { cls: "term-blue",   label: "[INFO]",   text: " Document received: ITR_2024.pdf" },
  { cls: "term-yellow", label: "[SCAN]",   text: " Extracting document metadata..." },
  { cls: "term-yellow", label: "[SCAN]",   text: " Running ELA pixel forensics..." },
  { cls: "term-yellow", label: "[SCAN]",   text: " Checking font consistency..." },
  { cls: "term-blue",   label: "[API]",    text: " Cross-checking IT portal..." },
  { cls: "term-blue",   label: "[API]",    text: " Verifying PAN registration..." },
  { cls: "term-green",  label: "[RESULT]", text: " Fraud Risk Score: 4 / 100" },
  { cls: "term-green",  label: "[RESULT]", text: " Status: ✓ AUTHENTIC DOCUMENT" },
].map((l, i, arr) => ({ ...l, white: i >= arr.length - 2 }));

// What the terminal shows before the typing starts (same as your original HTML).
const START_LINES = [
  { cls: "term-green",  label: "$",        text: "Initializing VeriDoc Engine...", white: true },
  { cls: "term-blue",   label: "[INFO]",   text: "Loading ML model v4.2..." },
  { cls: "term-blue",   label: "[INFO]",   text: "Document received: ITR_2024.pdf" },
  { cls: "term-yellow", label: "[SCAN]",   text: "Extracting metadata..." },
  { cls: "term-yellow", label: "[SCAN]",   text: "Running pixel forensics..." },
  { cls: "term-blue",   label: "[API]",    text: "Cross-checking Income Tax portal..." },
  { cls: "term-green",  label: "[RESULT]", text: "Risk Score: 4/100", white: true },
  { cls: "term-green",  label: "[RESULT]", text: "Status: ✓ AUTHENTIC", white: true },
];

export default function Terminal() {
  const [lines, setLines] = useState(START_LINES);
  const rootRef = useRef(null);
  const bodyRef = useRef(null);

  // Start the typing animation when the terminal scrolls into view, then loop it.
  useEffect(() => {
    let running = false;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    const run = () => {
      if (running) return;
      running = true;
      setLines([]);
      TERM_LINES.forEach((line, i) => {
        later(() => {
          setLines((prev) => [...prev, line]);
          if (i === TERM_LINES.length - 1) {
            later(() => { running = false; }, 3000);
            later(run, 5000);
          }
        }, i * 600);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.3 }
    );
    observer.observe(rootRef.current);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  // Keep the newest line visible.
  useEffect(() => {
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  return (
    <div className="terminal" id="terminal" ref={rootRef}>
      <div className="term-header">
        <span className="term-dot red"></span>
        <span className="term-dot yellow"></span>
        <span className="term-dot green"></span>
        <span className="term-title">veridoc_engine.py</span>
      </div>
      <div className="term-body" id="term-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <p key={`${i}-${l.label}`}>
            <span className={l.cls}>{l.label}</span>{" "}
            <span className={l.white ? "term-white" : "term-dim"}>{l.text}</span>
          </p>
        ))}
        <p className="term-cursor">█</p>
      </div>
    </div>
  );
}
