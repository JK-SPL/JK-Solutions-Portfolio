"use client";

import Image from "next/image";
import { LazyVideo } from "@/components/media/LazyVideo";
import { cn } from "@/lib/utils";
import type { ProjectMedia } from "@/data/projects";

/**
 * One frame of real project media, rendered inside its declared aspect bucket.
 *
 * The container's height comes from the media's own `aspect` via CSS, and the
 * image is passed to `next/image` with the asset's true pixel size, so the box
 * is fully reserved before anything loads. `focal` exists because several of
 * the best captures here are full-page screenshots: cropping a 1425x6770 page
 * capture to a landscape frame has to be pinned to the top to show the hero
 * rather than the middle of a footer.
 *
 * Stage 4.2.6 interaction (all gated and disabled under reduced motion):
 * - `.frame-light` — local light focus at the pointer position; LightField
 *   writes `--lx`/`--ly` percentages on this frame as the pointer moves.
 * - `.frame-zoom` — subtle hover/focus zoom (1.04), eased, suppressed on touch.
 * - `.js-parallax` — depth shift; LightField writes `--px`/`--py` on the
 *   frame and the custom properties inherit down to the media itself.
 * - `.frame-scrim` + `.frame-scrim-lift` — adaptive contrast: a static base
 *   scrim plus a hover/focus lift that keeps overlaid text legible.
 * - Keyboard parity: `:focus-within` mirrors every hover treatment.
 * The visibility/opacity rules live in globals.css so they can be gated by
 * `(hover: hover)` and `prefers-reduced-motion` media queries.
 */

export function ProjectMediaFrame({
  media,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw",
  scrim = true,
  className,
  imgClassName,
  showCaption = false,
}: {
  media: ProjectMedia;
  /** Only for a frame that is guaranteed to be in the first viewport. */
  priority?: boolean;
  sizes?: string;
  /** Bottom gradient — keeps overlaid text legible over unpredictable media. */
  scrim?: boolean;
  className?: string;
  imgClassName?: string;
  showCaption?: boolean;
}) {
  const isVideo = media.kind === "video";
  const posterSrc = isVideo ? media.poster : media.src;

  return (
    <figure
      className={cn(
        "group/frame media-frame relative isolate overflow-hidden bg-void",
        className
      )}
      data-lit-media
      // LightField sets --lx/--ly as % points within this element on pointer
      // move; the light layer below reads them through inheritance.
      data-lit
      style={{ aspectRatio: media.aspect.replace("/", " / ") }}
    >
      {/* --- MEDIA (painted first — everything else layers above it) --- */}
      <div className="frame-zoom absolute inset-0">
        {posterSrc ? (
          <Image
            src={posterSrc}
            alt={media.alt}
            fill
            priority={priority}
            sizes={sizes}
            quality={82}
            className={cn("js-parallax object-cover", imgClassName)}
            style={{ objectPosition: media.focal ?? "center" }}
          />
        ) : null}

        {isVideo ? (
          <div className="js-parallax absolute inset-0">
            <LazyVideo src={media.src} alt={media.alt} poster={media.poster} />
          </div>
        ) : null}
      </div>

      {/* --- LOCAL LIGHT FOCUS ---
      LightField writes --lx/--ly as percentages (e.g. "45.00% 30.00%").
      A radial gradient centred on those points follows the pointer, clipped
      to the frame. Opacity is gated by .frame-light rules in globals.css, so
      the light never lingers after the pointer leaves, never appears on touch,
      and falls back to a centred glow when the vars are unset (reduced motion
      or no pointer yet). */}
      <div
        aria-hidden="true"
        className="frame-light pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at var(--lx, 50%) var(--ly, 50%), rgba(255,255,255,0.14) 0%, transparent 50%)",
        }}
      />

      {/* --- ADAPTIVE TEXT CONTRAST ---
      Static base scrim always on; a second layer lifts on hover/focus to keep
      overlaid captions readable over unpredictable footage. Opacity-gated, so
      the fade is a real transition (gradients themselves are not animatable). */}
      {scrim ? (
        <>
          <div
            aria-hidden="true"
            className="frame-scrim pointer-events-none absolute inset-0"
          />
          <div
            aria-hidden="true"
            className="frame-scrim-lift pointer-events-none absolute inset-0"
          />
        </>
      ) : null}

      {showCaption && media.caption ? (
        <figcaption
          className="pointer-events-none absolute inset-x-0 bottom-0 p-5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-paper/80"
        >
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
