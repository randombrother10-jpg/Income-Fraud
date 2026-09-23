const COLUMNS = [
  ["Product", ["Features", "Pricing", "API Docs", "Changelog"]],
  ["Company", ["About", "Careers", "Blog", "Press"]],
  ["Legal", ["Privacy Policy", "Terms of Service", "GDPR", "Security"]],
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo"><span className="logo-icon">⬡</span> Veri<strong>Doc</strong></div>
          <p>AI-powered document fraud detection for enterprises, MNCs, and insurance companies.</p>
        </div>
        <div className="footer-links">
          {COLUMNS.map(([title, links]) => (
            <div className="fl-col" key={title}>
              <h4>{title}</h4>
              {links.map((l) => (
                <a href="#" key={l}>{l}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 VeriDoc Technologies Pvt. Ltd. All rights reserved.</span>
        <span>Made with 🔍 for a fraud-free India</span>
      </div>
    </footer>
  );
}
