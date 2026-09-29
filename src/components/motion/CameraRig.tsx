"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion-language";
import { gsap, useGsapScope } from "./scope";

/**
 * Move the *scene*, not an object: the wrapped composition is pushed, pulled
 * and tilted across a scroll range as if a camera were doing it.
 *
 * Perspective is baked into the transform (`transformPerspective`) rather than
 * set on a parent, so the rig is a single element and can carry its own layout
 * classes — no wrapper fighting the grid it sits in.
 *
 * Defaults are deliberately small: a camera move you read as depth, not as a
 * wobble. Meant for full-viewport stages (hero, case study, process), where a
 * tilt belongs to the viewpoint; on a small card it just looks broken.
 */
export function CameraRig({
  children,
  className,
  style,
  from,
  to,
  start = "top top",
  end = "bottom top",
  scrub = 1.2,
  perspective = 1600,
  origin = "50% 50%",
  enabled = true,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Camera state at the start of the range. */
  from?: gsap.TweenVars;
  /** Camera state at the end of the range. */
  to?: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  perspective?: number;
  origin?: string;
  /** Set false to keep the stage static (tablet/mobile tiers). */
  enabled?: boolean;
}) {
  const [ref] = useGsapScope<HTMLDivElement>(
    (el) => {
      if (!enabled) return;
      gsap.fromTo(
        el,
        { scale: 1, yPercent: 0, rotateX: 0, transformOrigin: origin, ...from },
        {
          transformPerspective: perspective,
          ease: EASE.none,
          ...to,
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
