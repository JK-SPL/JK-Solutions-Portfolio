"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/motion";
import { EASE } from "@/lib/motion-language";
import { gsap } from "./scope";

/**
 * The button leans toward the cursor while the pointer is over it, then
 * springs back.
 *
 * Gated to fine pointers and full motion, so touch devices never get a
 * half-following control and reduced-motion users get the plain button. The
 * wrapper is a plain span: focus, activation and screen-reader semantics stay
 * with the real link or button inside.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.34,
  pull = 0.22,
}: {
  children: ReactNode;
  className?: string;
  /** How far the control travels toward the cursor, as a share of its size. */
  strength?: number;
  /** Extra movement of the inner content — a small lag that reads as inertia. */
  pull?: number;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = fine && !reduced;

  const settle = () => {
    const el = wrap.current;
    if (!el) return;
    const back = { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.55)", overwrite: "auto" as const };
    gsap.to(el, back);
    const inner = el.querySelector<HTMLElement>("[data-magnet-inner]");
    if (inner) gsap.to(inner, back);
  };

  const onPointerMove = active
    ? (e: React.PointerEvent<HTMLSpanElement>) => {
        const el = wrap.current;
        if (!el) return;
        const box = el.getBoundingClientRect();
        const dx = e.clientX - (box.left + box.width / 2);
        const dy = e.clientY - (box.top + box.height / 2);

        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.5,
          ease: EASE.out,
          overwrite: "auto",
        });

        const inner = el.querySelector<HTMLElement>("[data-magnet-inner]");
        if (inner) {
          gsap.to(inner, {
            x: dx * pull,
            y: dy * pull,
            duration: 0.6,
            ease: EASE.out,
            overwrite: "auto",
          });
        }
      }
    : undefined;

  return (
    <span
      ref={wrap}
      className={cn("inline-block will-change-transform", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={active ? settle : undefined}
      onPointerCancel={active ? settle : undefined}
    >
      <span data-magnet-inner className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}
