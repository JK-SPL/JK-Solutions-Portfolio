/**
 * Shared motion language — one set of eases and a consistent duration scale
 * so every animation in the site feels like it was choreographed together.
 * (Source insight: award-winning GSAP sites keep a single motion vocabulary.)
 */
export const EASE = {
  /** throw-into-place overshoot — for kinetic type */
  overshoot: "back.out(1.4)",
  /** luxurious settle — wipes, page transitions */
  luxOut: "cubic-bezier(0.76, 0, 0.24, 1)",
  /** default confident ease-out */
  out: "power3.out",
  /** soft cinematic fade */
  soft: "power2.out",
  /** scroll scrubs stay linear */
  none: "none",
} as const;

export const DUR = {
  snap: 0.5,
  base: 0.8,
  slow: 1.2,
  lux: 1.6,
} as const;

export const STAGGER = {
  words: 0.06,
  lines: 0.14,
  items: 0.08,
} as const;
