"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, useGsapScope } from "./scope";

/**
 * One plane of a stacked composition: rises, settles, and optionally breathes
 * in scale at a rate set by `depth` (0 = parked with the page, 1 = strongest
 * separation from the base plane).
 *
 * The point is separation, not decoration — a backdrop at `depth={0.3}` and a
 * foreground panel at `depth={1}` read as two things at different distances
 * instead of one flat poster.
 *
 * Depth motion is scroll-scrubbed, so it is fully reversible and never runs on
 * a timer.
 */
export function DepthLayer({
  children,
  className,
  style,
  depth = 0.6,
  scale = false,
  start = "top bottom",
  end = "bottom top",
  scrub = 1.2,
  enabled = true,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** 0 → no separation, 1 → strongest. Clamped so callers cannot overshoot. */
  depth?: number;
  scale?: boolean;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  /** Set false to keep the plane parked (mobile tier, reduced complexity). */
  enabled?: boolean;
}) {
  const d = Math.max(0, Math.min(1, depth));

  const [ref] = useGsapScope<HTMLDivElement>(
    (el) => {
      if (!enabled) return;
      gsap.fromTo(
        el,
        {
          yPercent: d * 7,
          ...(scale ? { scale: 1 + d * 0.05 } : null),
        },
        {
          yPercent: d * -7,
          ...(scale ? { scale: 1 - d * 0.02 } : null),
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start, end, scrub },
        }
      );
    },
    [enabled]
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)} style={style}>
      {children}
    </div>
  );
}
