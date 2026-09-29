"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DUR, EASE } from "@/lib/motion-language";
import { gsap, useGsapScope } from "./scope";

/**
 * Open a window onto the content: the frame is cut open with a clip-path while
 * the media inside settles from a slightly tight crop.
 *
 * Used where an image or panel should feel *revealed* rather than faded in.
 * Reversible — scrolling back closes the window again.
 *
 * Reduced motion skips the setup entirely, leaving the content unclipped.
 */
export function MaskReveal({
  children,
  className,
  style,
  from = "inset(14% 6% 14% 6%)",
  to = "inset(0% 0% 0% 0%)",
  scaleFrom = 1.08,
  start = "top 85%",
  scrub = false,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  from?: string;
  to?: string;
  scaleFrom?: number;
  start?: string;
  /** Scrub the reveal with scroll instead of playing it on entry. */
  scrub?: boolean | number;
}) {
  const [ref] = useGsapScope<HTMLDivElement>((el) => {
    const media = el.querySelector<HTMLElement>("[data-mask-media]");

    gsap.fromTo(
      el,
      { clipPath: from, webkitClipPath: from },
      {
        clipPath: to,
        webkitClipPath: to,
        ease: scrub ? "none" : EASE.out,
        duration: scrub ? undefined : DUR.slow,
        scrollTrigger: scrub
          ? { trigger: el, start, end: "bottom top", scrub }
          : {
              trigger: el,
              start,
              toggleActions: "play none none reverse",
            },
      }
    );

    if (media) {
      gsap.fromTo(
        media,
        { scale: scaleFrom },
        {
          scale: 1,
          ease: scrub ? "none" : EASE.out,
          duration: scrub ? undefined : DUR.slow,
          scrollTrigger: scrub
            ? { trigger: el, start, end: "bottom top", scrub }
            : {
                trigger: el,
                start,
                toggleActions: "play none none reverse",
              },
        }
      );
    }
  });

  return (
    <div
      ref={ref}
      className={cn("will-change-[clip-path]", className)}
      style={style}
    >
      <div data-mask-media className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
