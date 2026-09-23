// True if the user has "reduce motion" turned on in their OS.
// Every GSAP animation checks this and skips itself if true.
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
