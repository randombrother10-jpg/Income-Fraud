import { useRef, useState } from "react";
import Reveal from "../common/Reveal";
import Terminal from "./Terminal";

const FEATURES = [
  ["⚡", "Real-time processing"],
  ["🔒", "End-to-end encryption"],
  ["🧠", "200+ fraud pattern recognition"],
  ["📋", "Full audit trail generated"],
];

export default function VideoSection() {
  const videoRef = useRef(null);
  const [overlayHidden, setOverlayHidden] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setOverlayHidden(true);
    setScanning(true);
    setTimeout(() => setScanning(false), 2100); // scan line plays once
  };

  return (
    <section id="video-section">
      <div className="vid-left">
        <div className="section-tag">02 — Demo</div>
        <h2 className="section-title">Watch Our<br /><span>System</span> In Action</h2>
        <p className="section-sub">See how our ML pipeline processes a document from upload to verdict — in under 3 seconds.</p>
        <ul className="vid-features">
          {FEATURES.map(([icon, text]) => (
            <Reveal as="li" key={text}>
              <span className="vf-icon">{icon}</span> {text}
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="vid-right">
        <div className="video-frame" id="video-wrap">
          <video
            id="demo-video"
            ref={videoRef}
            preload="metadata"
            loop
            poster="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
            onEnded={() => setOverlayHidden(false)}
          >
            <source src="https://www.pexels.com/download/video/7821855/" type="video/mp4" />
          </video>
          <div className={`vid-overlay${overlayHidden ? " hidden" : ""}`} id="vid-overlay" onClick={handlePlay}>
            <div className="play-ring">
              <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
            <span className="vid-label">Play Demo</span>
          </div>
          <div className={`scan-line${scanning ? " active" : ""}`} id="scan-line"></div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
