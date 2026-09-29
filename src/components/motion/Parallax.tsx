"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, useGsapScope } from "./scope";

/**
 * Move media *inside* its frame by a pixel distance while the page scrolls —
 * the image is taller than its window and travels through it.
 *
 * Distinct from `DepthLayer`: that separates planes of a composition, this one
 * travels a single asset through a masked frame. Put the `overflow-hidden` on
 * the parent you pass, not here, so framing stays a layout decision.
 */
export function Parallax({
  children,
  className,
  style,
  distance = 64,
  start = "top bottom",
  end = "bottom top",
  scrub = 1,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Pixel travel across the full range; positive moves down as you scroll. */
  distance?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
}) {
  const [ref] = useGsapScope<HTMLDivElement>((el) => {
    gsap.fromTo(
      el,
      { y: -Math.abs(distance) / 2 },
      {
        y: Math.abs(distance) / 2,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement ?? el, start, end, scrub },
      }
    );
  });

  return (
    <div ref={ref} className={cn("will-change-transform", className)} style={style}>
      {children}
    </div>
  );
}
