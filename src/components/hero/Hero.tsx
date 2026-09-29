"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { LazyVideo } from "@/components/media/LazyVideo";
import { Particles } from "./Particles";
import { usePrefersReducedMotion } from "@/lib/motion";
import { EASE, STAGGER } from "@/lib/motion-language";

gsap.registerPlugin(ScrollTrigger);

const TITLE_LINES: string[][] = [
  ["I", "BUILD", "WITH", "AI."],
  ["I", "ENGINEER"],
  ["FOR", "REAL", "LIFE."],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const reel = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const rootEl = root.current;
    if (!rootEl) return;

    let detachMove: (() => void) | null = null;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(rootEl, { opacity: 0 }, { opacity: 1, duration: 1.4, ease: "power2.inOut" })
        // the reel panel opens from a crop band (not a plain fade-in),
        // the footage settles from a tight crop — "revealed, not just bigger"
        .fromTo(
          reel.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: EASE.soft },
          "-=1.0"
        )
        .fromTo(
          reveal.current,
          { clipPath: "inset(34% 5% 34% 5%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power4.inOut" },
          "-=0.95"
        )
        .fromTo(
          "[data-hero='reel-img']",
          { scale: 1.16, transformOrigin: "50% 32%" },
          { scale: 1, duration: 1.7, ease: "power4.inOut" },
          "<"
        )
        .fromTo(
          "[data-hero='eyebrow']",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=1.0"
        )
        .fromTo(
          "[data-hero='title-word']",
          { opacity: 0, y: 72, rotate: 4 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.1,
            ease: EASE.overshoot,
            stagger: STAGGER.words,
          },
          "-=0.55"
        )
        .fromTo(
          "[data-hero='support']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero='caps']",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          "[data-hero='cta']",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.45"
        )
        .fromTo(
          "[data-hero='frag']",
          { opacity: 0 },
          { opacity: 1, duration: 1.2, stagger: 0.08 },
          "-=0.6"
        );

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (finePointer && !reduceMotion && bg.current && reel.current) {
        const bgX = gsap.quickTo(bg.current, "x", { duration: 1.4, ease: "power3.out" });
        const bgY = gsap.quickTo(bg.current, "y", { duration: 1.4, ease: "power3.out" });
        const rX = gsap.quickTo(reel.current, "x", { duration: 1.6, ease: "power3.out" });
        const rY = gsap.quickTo(reel.current, "y", { duration: 1.6, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          // Restrained depth: the backdrop shifts a few pixels, the reel a
          // few more. The headline is never moved — typography must stay
          // rock-steady while imagery carries the depth.
          bgX(nx * -3);
          bgY(ny * -2.5);
          rX(nx * 6);
          rY(ny * 5);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        detachMove = () => window.removeEventListener("pointermove", onMove);
      }

      if (reel.current) {
        gsap.to(reel.current, {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
      if (bg.current) {
        gsap.to(bg.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: rootEl, start: "top top", end: "bottom top", scrub: 1.6 },
        });
      }
      if (text.current) {
        gsap.to(text.current, {
          yPercent: -18,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: rootEl, start: "top top", end: "70% top", scrub: 1 },
        });
      }
    }, rootEl);

    return () => {
      detachMove?.();
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* cinematic background stack */}
      <div ref={bg} className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-void" />
        <div className="bg-engineering absolute inset-0 opacity-70" />
        <div className="absolute -right-[15%] top-[-20%] h-[80vh] w-[60vw] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-30%] left-[-10%] h-[60vh] w-[45vw] rounded-full bg-electric/12 blur-[160px]" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-line to-transparent" />
      </div>

      <Particles className="absolute inset-0 h-full w-full" />

      <div className="shell relative z-10 grid flex-1 grid-cols-1 items-center gap-10 pb-24 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:pb-16 lg:pt-20">
        {/* copy */}
        <div ref={text} className="relative max-w-3xl">
          <p data-hero="eyebrow" className="eyebrow mb-8 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary-glow" aria-hidden="true" />
            {SITE.name} — DIGITAL PRODUCT STUDIO
          </p>

          <h1 className="display-1 hero-title" aria-label="I build with AI. I engineer for real life.">
            {TITLE_LINES.map((words, li) => (
              <span key={li} className={li === 1 ? "block text-mute" : "block"} aria-hidden="true">
                {words.map((w, wi) => (
                  <Fragment key={`${li}-${wi}`}>
                    {wi > 0 ? " " : ""}
                    <span data-hero="title-word" className="inline-block will-change-transform">
                      {w}
                    </span>
                  </Fragment>
                ))}
              </span>
            ))}
          </h1>

          <p data-hero="support" className="lead mt-8">
            {SITE.supporting}
          </p>

          <p
            data-hero="caps"
            className="mt-8 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-label text-faint"
          >
            {SITE.capabilities.map((c, i) => (
              <span key={c}>
                <span className={i === 0 ? "text-primary-glow" : undefined}>{c}</span>
                {i < SITE.capabilities.length - 1 && <span className="mx-2 text-faint">·</span>}
              </span>
            ))}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <span data-hero="cta">
              <ButtonLink href="/work">
                VIEW SELECTED WORK
              </ButtonLink>
            </span>
            <span data-hero="cta">
              <ButtonLink href="/contact" variant="ghost">
                START A PROJECT
              </ButtonLink>
            </span>
          </div>
        </div>

        {/* identity reel — the Stage 4.2 cinematic loop */}
        <div
          ref={reel}
          data-lit
          data-cursor-label="REEL"
          className="relative hidden self-stretch overflow-hidden border border-line bg-void lg:block"
        >
          <div ref={reveal} className="absolute inset-0 overflow-hidden">
            <div data-hero="reel-img" className="absolute inset-0">
              {/* Honest still frame: visible before the reel plays, and the only
                  frame a reduced-motion or touch visitor ever sees. */}
              <div className="absolute inset-0 bg-void" />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                  backgroundSize: "72px 72px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-mono text-[0.625rem] uppercase tracking-label text-faint">
                  JK — IDENTITY REEL
                </p>
              </div>

              <LazyVideo
                src="/jk-identity-reel.webm"
                alt="JK SOLUTIONS identity reel"
              />

              {/* contrast scrim for the caption over unpredictable footage */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent"
              />
            </div>
          </div>

          <p
            data-hero="frag"
            className="pointer-events-none absolute bottom-4 left-4 z-10 font-mono text-[0.5625rem] uppercase tracking-label text-paper/70"
          >
            Identity reel — loop
          </p>
        </div>
      </div>

      {/* scroll hint */}
      <div
        data-hero="frag"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.5625rem] uppercase tracking-label text-faint">Scroll</span>
        <span className="block h-8 w-px overflow-hidden bg-line">
          <span className="block h-3 w-px animate-[scrollhint_1.8s_ease-in-out_infinite] bg-primary-glow" />
        </span>
      </div>
      <style jsx>{`
        @keyframes scrollhint {
          0% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(32px);
          }
        }
      `}</style>
    </section>
  );
}
