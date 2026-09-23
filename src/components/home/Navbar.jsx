import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LINKS = [
  ["hero", "Home"],
  ["how-it-works", "How It Works"],
  ["video-section", "Demo"],
  ["trust-section", "Trust"],
  ["contact", "Contact"],
  ["about", "About"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero"); // which section link is highlighted
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = "";
      document.querySelectorAll("section[id]").forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">
          <span className="logo-icon">⬡</span>
          <span>Veri<strong>Doc</strong></span>
        </div>

        <ul className="nav-links">
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={`nav-link${active === id ? " active" : ""}`}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="#" className="btn-ghost">Log In</a>
          {/* GET STARTED -> opens the fraud detection form page */}
          <Link to="/check-claim" className="btn-primary">Get Started</Link>
        </div>

        <button className="hamburger" id="hamburger" onClick={() => setMenuOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobile-menu">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="#" className="mob-login" onClick={() => setMenuOpen(false)}>Log In</a>
        {/* Your original mobile menu has no "Get Started". To add it, uncomment:
        <Link to="/check-claim" onClick={() => setMenuOpen(false)}>Get Started</Link> */}
      </div>
    </>
  );
}
