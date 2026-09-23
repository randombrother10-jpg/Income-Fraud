import { useEffect, useRef, useState } from "react";

// Wrap any element with <Reveal> to make it fade/slide in when scrolled into view.
// Uses your existing .reveal / .visible CSS, so the animation looks identical.
//   as    -> which tag to render ("div" by default, or "li", ...)
//   delay -> stagger delay in seconds (like the old transitionDelay code)
export default function Reveal({ as: Tag = "div", className = "", delay, style, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setVisible(true), 80);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${className} reveal${visible ? " visible" : ""}`}
      style={delay !== undefined ? { transitionDelay: `${delay}s`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
