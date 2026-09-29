"use client";

import { createElement, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { DUR, EASE, STAGGER } from "@/lib/motion-language";
import { gsap, useGsapScope } from "./scope";

type Tag = "span" | "p" | "h1" | "h2" | "h3" | "div";

const MASK: CSSProperties = {
  paddingBottom: "0.16em",
  marginBottom: "-0.16em",
};

/**
 * Words rise out of their own line mask instead of fading in.
 *
 * The masked markup is what the server renders, so the text is present, laid
 * out and readable before any script runs; the script only adds the travel.
 * Under reduced motion the setup never runs and the words simply sit still —
 * no hidden content, no layout difference.
 *
 * Word-level only. Line splitting needs measurement after font load, which
 * buys very little here and risks a visible re-flow.
 */
export function TextReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  start = "top 88%",
  stagger = STAGGER.words,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  start?: string;
  stagger?: number;
}) {
  const words = text.split(" ");

  const [ref] = useGsapScope<HTMLElement>((el) => {
    const targets = el.querySelectorAll<HTMLElement>("[data-tr-word]");
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: DUR.slow,
        delay,
        ease: EASE.out,
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return createElement(
    Tag,
    { ref, className: cn("inline", className) },
    words.map((word, i) => (
      <span key={`${i}-${word}`}>
        <span
          className="inline-block overflow-hidden align-bottom will-change-transform"
          style={MASK}
        >
          <span data-tr-word className="inline-block">
            {word}
          </span>
        </span>
        {i < words.length - 1 ? " " : null}
      </span>
    ))
  );
}
