"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** A scope tuple: the element to attach, and whether motion is reduced. */
export type Scope<T> = [RefObject<T | null>, boolean];

/**
 * Run a GSAP setup function scoped to the returned element.
 *
 * - `gsap.context()` owns every tween and ScrollTrigger created inside, and
 *   `ctx.revert()` restores inline styles and kills triggers on unmount, so
 *   no primitive has to hand-clean after itself.
 * - Under `prefers-reduced-motion` the setup never runs at all, which means
 *   callers do not need their own reduced-motion branch: the DOM stays exactly
 *   as server-rendered.
 * - Selector strings inside `setup` resolve within the scope element.
 *
 * `setup` may return a cleanup function for work GSAP does not own (pointer
 * listeners, timers); it runs before the context reverts.
 */
export function useGsapScope<T extends HTMLElement = HTMLDivElement>(
  setup: (el: T) => void | (() => void),
  deps: DependencyList = []
): Scope<T> {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    // The gate hook settles a tick after mount; read the media query directly
    // so a reduced-motion visitor never sees the first frame of a tween.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const result = setup(el);
      cleanup = typeof result === "function" ? result : undefined;
    }, el);

    return () => {
      cleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);

  return [ref, reduced];
}
