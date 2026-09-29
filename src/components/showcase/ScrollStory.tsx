"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { usePrefersReducedMotion } from "@/lib/motion";
import { DUR, EASE } from "@/lib/motion-language";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { storyFrames } from "@/lib/showcase";

/**
 * One project, told as a held image that changes as you scroll.
 *
 * The media column sticks while the copy beside it scrolls, and each frame
 * crossfades as its matching beat enters view — so the viewer watches a single
 * system change state rather than scrolling past three unrelated pictures.
 *
 * Mobile gets a plain vertical stack of the same frames. Sticky pinning and
 * scrubbed crossfades on a small screen fight the viewport, buy nothing, and
 * are a common source of horizontal overflow, so the effect is desktop-only.
 *
 * Under `prefers-reduced-motion` the frames are shown in sequence with no
 * pinning, scrubbing, or opacity animation at all.
 */
export function ScrollStory({ project }: { project: Project }) {
  const frames = storyFrames(project);
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const beatsRef = useRef<(HTMLLIElement | null)[]>([]);

  const beats = [
    { label: "The problem", text: project.problem ?? project.summary },
    { label: "The approach", text: project.solution ?? project.summary },
    {
      label: "What shipped",
      text:
        project.architecture?.[0] ??
        project.customerExperience?.[0] ??
        project.summary,
    },
  ].slice(0, Math.max(2, frames.length));

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media) return;

    const layers = layersRef.current.filter(Boolean) as HTMLDivElement[];
    if (layers.length < 2) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Only the first layer is visible up front; the rest wait for their beat.
        gsap.set(layers.slice(1), { autoAlpha: 0, scale: 1.06 });
        gsap.set(layers[0], { autoAlpha: 1, scale: 1 });

        // A slow, continuous push on the visible layer sells the "held frame".
        gsap.to(layers[0], {
          scale: 1.08,
          ease: EASE.none,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        beatsRef.current.forEach((beat, i) => {
          if (!beat || i === 0) return;
          gsap.set(beat, { opacity: 0.28 });

          gsap.to(layers[i], {
            autoAlpha: 1,
            scale: 1,
            duration: DUR.base,
            ease: EASE.out,
            scrollTrigger: {
              trigger: beat,
              start: "top 62%",
              end: "top 42%",
              scrub: 0.6,
            },
          });

          gsap.to(beatsRef.current[i - 1]!, {
            opacity: 0.28,
            duration: DUR.snap,
            ease: EASE.soft,
            overwrite: "auto",
            scrollTrigger: {
              trigger: beat,
              start: "top 58%",
              end: "top 44%",
              scrub: 0.5,
            },
          });

          gsap.to(beat, {
            opacity: 1,
            duration: DUR.snap,
            ease: EASE.soft,
            overwrite: "auto",
            scrollTrigger: {
              trigger: beat,
              start: "top 58%",
              end: "top 44%",
              scrub: 0.5,
            },
          });
        });
      }, section);
    })();

    return () => {
      ctx?.revert();
    };
  }, [frames.length, reduced]);

  if (frames.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`story-${project.slug}`}
      className="border-t border-line py-20 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-primary-glow">STORY</span>
          <span aria-hidden="true" className="h-px w-8 bg-line" />
          {project.title}
        </p>
        <h2 id={`story-${project.slug}`} className="sr-only">
          {project.title} — project story
        </h2>

        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-10",
            reduced ? "lg:grid-cols-1" : "lg:grid-cols-12"
          )}
        >
          {/* ——— BEATS ——— */}
          <ol
            className={cn(
              "flex flex-col gap-10 lg:col-span-5 lg:gap-[38vh] lg:pr-6",
              reduced && "gap-8"
            )}
          >
            {beats.map((beat, i) => (
              <li
                key={beat.label}
                ref={(el) => {
                  beatsRef.current[i] = el;
                }}
                className="max-w-[42ch]"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-label text-primary-glow">
                  {String(i + 1).padStart(2, "0")} / {beat.label}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute">
                  {beat.text}
                </p>
              </li>
            ))}

            <li className="max-w-[42ch]">
              <Link
                href={`/work/${project.slug}`}
                data-lit
                className="group/link inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper transition-colors hover:text-primary-glow"
              >
                Read the full case study
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          </ol>

          {/* ——— STICKY MEDIA ——— */}
          <div
            ref={mediaRef}
            className={cn(
              "relative",
              !reduced &&
                "lg:col-span-7 lg:sticky lg:top-[12vh] lg:h-[76vh] self-start"
            )}
          >
            <div className="relative h-full w-full">
              {frames.map((frame, i) => (
                <div
                  key={frame.src}
                  ref={(el) => {
                    layersRef.current[i] = el;
                  }}
                  className={cn(
                    "absolute inset-0",
                    !reduced && i > 0 && "opacity-0"
                  )}
                >
                  <ProjectMediaFrame
                    media={frame}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
