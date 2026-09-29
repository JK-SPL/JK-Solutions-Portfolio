"use client";

import { useEffect, useState } from "react";

/** True when the user prefers reduced motion. SSR-safe (defaults false). */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True only on devices with a fine pointer (mouse / trackpad). */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}

/**
 * True when the viewport is in the desktop experience tier.
 *
 * Cinematic scroll work (camera moves, pinning, layered depth) runs only where
 * there is room and pointer affordance for it; tablet and mobile keep the
 * static composition. Callers should treat `false` as "render the simple
 * version", never as "hide the content".
 */
export function useDesktopViewport(minWidth = 1024) {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    setDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [minWidth]);

  return desktop;
}
