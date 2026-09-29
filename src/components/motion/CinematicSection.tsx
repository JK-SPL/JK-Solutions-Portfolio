"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DUR, EASE, STAGGER } from "@/lib/motion-language";
import { gsap, useGsapScope } from "./scope";

/**
 * A section that belongs to the cinematic system: consistent shell, rhythm and
 * header treatment, plus one entrance choreography for anything inside it
 * marked `data-cine`.
 *
 * The entrance is progressive — server-rendered content is visible, the script
 * lifts it, and scrolling back drops it again. Unmarked children are left
 * alone, so a section can adopt the shell without inheriting motion it does
 * not want.
 *
 * Header props are optional: pass them for a new section, omit them when the
 * page already writes its own heading markup.
 */
export function CinematicSection({
  children,
  id,
  eyebrow,
  title,
  lead,
  className,
  shell = true,
  divider = true,
  spacing = "py-20 sm:py-28 lg:py-32",
  start = "top 80%",
}: {
  children?: ReactNode;
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  className?: string;
  shell?: boolean;
  divider?: boolean;
  spacing?: string;
  start?: string;
}) {
  const [ref] = useGsapScope<HTMLElement>((el) => {
    const items = el.querySelectorAll<HTMLElement>("[data-cine]");
    if (!items.length) return;

    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 36 },
      {
        autoAlpha: 1,
        y: 0,
        duration: DUR.slow,
        ease: EASE.out,
        stagger: STAGGER.items,
        clearProps: "opacity,visibility,transform",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={title && id ? id : undefined}
      className={cn(
        "relative",
        divider && "border-t border-line",
        spacing,
        className
      )}
    >
      <div className={shell ? "shell" : undefined}>
        {(eyebrow || title || lead) && (
          <header className="max-w-3xl">
            {eyebrow && (
              <p data-cine className="eyebrow mb-6 flex items-center gap-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 data-cine className="display-3 text-balance">
                {title}
              </h2>
            )}
            {lead && (
              <p data-cine className="lead mt-6">
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
