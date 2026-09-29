"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion-language";
import { gsap, useGsapScope } from "./scope";

/**
 * Scrub a single transform from `from` to `to` across a scroll range.
 *
 * The generic escape hatch of the motion system: anything that is "one element
 * moves while you scroll" starts here, and only becomes a dedicated primitive
 * once the choreography stops being one element.
 *
 * Reversible by nature — ScrollTrigger scrubs both directions.
 */
export function ScrollScrub({
  children,
  className,
  style,
  from,
  to,
  start = "top bottom",
  end = "bottom top",
  scrub = 1,
  ease = EASE.none,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  ease?: string;
}) {
  const [ref] = useGsapScope<HTMLDivElement>((el) => {
    gsap.fromTo(el, from, {
      ...to,
      ease,
      scrollTrigger: { trigger: el, start, end, scrub },
    });
  });

  return (
    <div ref={ref} className={cn("will-change-transform", className)} style={style}>
      {children}
    </div>
  );
}
