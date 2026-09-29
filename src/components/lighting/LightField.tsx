/**
 * Premium lighting field + pointer interaction system.
 *
 * A single soft radial light that lags behind the pointer across a dark
 * surface. There is deliberately no cursor object: the native cursor stays
 * visible and fully usable, and nothing follows the pointer except light.
 *
 * The ambient light uses an indigo/blue cast — the site's primary
 * accent — with a barely-there neutral white at its core, so it reads as a
 * studio light on a dark surface rather than a glow.
 *
 * ARCHITECTURE — one listener, one loop, zero React renders:
 * - a single passive `pointermove` listener feeds a single rAF loop
 * - the loop interpolates and writes only `transform`, `opacity` and CSS
 *   custom properties, so the system is composited on the GPU and never forces
 *   layout or paint of page content
 * - React state is never touched while the pointer moves, so scrolling and
 *   typing are unaffected
 * - element rects are cached and only re-read when the hovered element
 *   changes or the page scrolls/resizes, so a pointermove never triggers a
 *   synchronous layout read
 * - `[data-lit]`, `[data-magnetic]`, `[data-lit-media]` and `[data-cursor-label]`
 *   are all handled here by delegation — no per-element listeners anywhere
 * - disabled entirely for coarse pointers and `prefers-reduced-motion`
 */
"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/motion";

/** Diameter of the light disc in px. Large and very soft by design. */
const FIELD_SIZE = 1100;
const HALF = FIELD_SIZE / 2;
/** Interpolation factor per frame — slow, cinematic settle. */
const FOLLOW = 0.075;
const FADE = 0.08;
/** Full strength while the pointer is in motion… */
const OPACITY_ACTIVE = 1;
/** …and almost invisible once it settles. */
const OPACITY_IDLE = 0.3;
const IDLE_MS = 450;

/** Magnetic attraction ceiling in px. Kept small so a CTA leans, never chases. */
const MAGNET_MAX = 5;
/** How eagerly a magnetic element converges on its target offset. */
const MAGNET_FOLLOW = 0.18;

/** Image parallax ceiling in px. Transform-only, so it cannot shift layout. */
const PARALLAX_MAX = 4;
const PARALLAX_FOLLOW = 0.12;

/** Contextual label geometry, offset from the pointer so it never covers it. */
const LABEL_OFFSET_X = 18;
const LABEL_OFFSET_Y = 14;

export function LightField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const field = fieldRef.current;
    const label = labelRef.current;
    if (!field) return;

    /* ——— pointer target ——— */
    const target = { x: -HALF, y: -HALF };
    const fieldPos = { x: -HALF, y: -HALF };
    let lastMove = 0;
    let raf = 0;

    /* ——— cached hovered elements + their rects ——— */
    let litEl: HTMLElement | null = null;
    let litRect: DOMRect | null = null;
    let magnetEl: HTMLElement | null = null;
    let magnetRect: DOMRect | null = null;
    let mediaEl: HTMLElement | null = null;
    let mediaRect: DOMRect | null = null;
    /** Set by scroll/resize so the next frame re-reads rects instead of
     *  trusting them. Only ever cleared inside the rAF loop, so a scroll
     *  invalidation can never be dropped by a pointer handler. */
    let rectsDirty = false;

    const invalidate = () => {
      rectsDirty = true;
    };

    /* ——— magnetic element offset (interpolated) ——— */
    const magnetTarget = { x: 0, y: 0 };
    const magnetPos = { x: 0, y: 0 };
    let magnetEngaged = false;

    /* ——— media parallax (interpolated) ——— */
    const parallaxTarget = { x: 0, y: 0 };
    const parallaxPos = { x: 0, y: 0 };
    let parallaxEngaged = false;

    /* ——— contextual label (interpolated opacity) ——— */
    const labelPos = { x: -200, y: -200 };
    let labelOpacity = 0;
    let labelText = "";

    const nearest = (e: PointerEvent, selector: string) =>
      e.target instanceof Element
        ? (e.target.closest(selector) as HTMLElement | null)
        : null;

    const paint = () => {
      /* A scroll or resize invalidates every cached rect — refresh them once
         before use rather than re-reading layout on the pointer event. */
      if (rectsDirty) {
        if (litEl) litRect = litEl.getBoundingClientRect();
        if (magnetEl) magnetRect = magnetEl.getBoundingClientRect();
        if (mediaEl) mediaRect = mediaEl.getBoundingClientRect();
        rectsDirty = false;
      }

      const now = performance.now();
      const idle = now - lastMove > IDLE_MS;

      /* ——— ambient light ——— */
      const opacityGoal = idle ? OPACITY_IDLE : OPACITY_ACTIVE;
      fieldPos.x += (target.x - fieldPos.x) * FOLLOW;
      fieldPos.y += (target.y - fieldPos.y) * FOLLOW;

      const opacity = Number(field.style.opacity);
      const nextOpacity = opacity + (opacityGoal - opacity) * FADE;

      field.style.transform = `translate3d(${(fieldPos.x - HALF).toFixed(2)}px, ${(fieldPos.y - HALF).toFixed(2)}px, 0)`;
      field.style.opacity = nextOpacity.toFixed(3);

      /* ——— magnetic attraction ——— */
      if (magnetEngaged && magnetEl) {
        magnetPos.x += (magnetTarget.x - magnetPos.x) * MAGNET_FOLLOW;
        magnetPos.y += (magnetTarget.y - magnetPos.y) * MAGNET_FOLLOW;
        magnetEl.style.transform = `translate3d(${magnetPos.x.toFixed(2)}px, ${magnetPos.y.toFixed(2)}px, 0)`;
      }

      /* ——— image parallax ——— */
      if (parallaxEngaged && mediaEl) {
        parallaxPos.x += (parallaxTarget.x - parallaxPos.x) * PARALLAX_FOLLOW;
        parallaxPos.y += (parallaxTarget.y - parallaxPos.y) * PARALLAX_FOLLOW;
        mediaEl.style.setProperty("--px", `${parallaxPos.x.toFixed(2)}px`);
        mediaEl.style.setProperty("--py", `${parallaxPos.y.toFixed(2)}px`);
      }

      /* ——— contextual label ——— */
      if (label) {
        const labelGoal = labelText && lastMove > 0 && !idle ? 1 : 0;
        if (labelText) {
          labelPos.x += (target.x + LABEL_OFFSET_X - labelPos.x) * 0.3;
          labelPos.y += (target.y + LABEL_OFFSET_Y - labelPos.y) * 0.3;
          label.style.transform = `translate3d(${labelPos.x.toFixed(1)}px, ${labelPos.y.toFixed(1)}px, 0)`;
        }
        const op = labelOpacity + (labelGoal - labelOpacity) * 0.2;
        labelOpacity = op < 0.004 ? 0 : op;
        label.style.opacity = labelOpacity.toFixed(3);
      }

      raf = requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      target.x = e.clientX;
      target.y = e.clientY;
      lastMove = performance.now();

      /* ——— [data-lit] local directional highlight ——— */
      const lit = nearest(e, "[data-lit]");
      if (lit !== litEl) {
        litEl = lit;
        litRect = lit ? lit.getBoundingClientRect() : null;
      }
      if (lit && litRect && litRect.width > 0 && litRect.height > 0) {
        lit.style.setProperty(
          "--lx",
          `${(((e.clientX - litRect.left) / litRect.width) * 100).toFixed(2)}%`
        );
        lit.style.setProperty(
          "--ly",
          `${(((e.clientY - litRect.top) / litRect.height) * 100).toFixed(2)}%`
        );
      }

      /* ——— [data-magnetic] opt-in CTA attraction ——— */
      const magnet = nearest(e, "[data-magnetic]");
      if (magnet !== magnetEl) {
        // release the previous element back to rest before engaging the next
        if (magnetEl) magnetEl.style.transform = "";
        magnetEl = magnet;
        magnetRect = magnet ? magnet.getBoundingClientRect() : null;
        magnetPos.x = 0;
        magnetPos.y = 0;
        magnetTarget.x = 0;
        magnetTarget.y = 0;
        magnetEngaged = Boolean(magnet);
      }
      if (magnet && magnetRect && magnetRect.width > 0 && magnetRect.height > 0) {
        const dx = e.clientX - (magnetRect.left + magnetRect.width / 2);
        const dy = e.clientY - (magnetRect.top + magnetRect.height / 2);
        magnetTarget.x = clamp(dx * 0.06, -MAGNET_MAX, MAGNET_MAX);
        magnetTarget.y = clamp(dy * 0.08, -MAGNET_MAX, MAGNET_MAX);
      }

      /* ——— [data-lit-media] image parallax ——— */
      const media = nearest(e, "[data-lit-media]");
      if (media !== mediaEl) {
        if (mediaEl) {
          mediaEl.style.setProperty("--px", "0px");
          mediaEl.style.setProperty("--py", "0px");
        }
        mediaEl = media;
        mediaRect = media ? media.getBoundingClientRect() : null;
        parallaxPos.x = 0;
        parallaxPos.y = 0;
        parallaxTarget.x = 0;
        parallaxTarget.y = 0;
        parallaxEngaged = Boolean(media);
      }
      if (media && mediaRect && mediaRect.width > 0 && mediaRect.height > 0) {
        parallaxTarget.x = clamp(
          ((e.clientX - (mediaRect.left + mediaRect.width / 2)) / mediaRect.width) * PARALLAX_MAX * 2,
          -PARALLAX_MAX,
          PARALLAX_MAX
        );
        parallaxTarget.y = clamp(
          ((e.clientY - (mediaRect.top + mediaRect.height / 2)) / mediaRect.height) * PARALLAX_MAX * 2,
          -PARALLAX_MAX,
          PARALLAX_MAX
        );
      }

      /* ——— [data-cursor-label] contextual text ——— */
      const labelled = nearest(e, "[data-cursor-label]");
      const text = labelled?.dataset.cursorLabel ?? "";
      if (text !== labelText) {
        labelText = text;
        if (label) label.textContent = text;
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      // leaving a magnetic element returns it to rest
      const to = e.relatedTarget;
      if (magnetEl && !(to instanceof Node && magnetEl.contains(to))) {
        magnetTarget.x = 0;
        magnetTarget.y = 0;
        magnetEngaged = false;
      }
      if (mediaEl && !(to instanceof Node && mediaEl.contains(to))) {
        parallaxTarget.x = 0;
        parallaxTarget.y = 0;
        parallaxEngaged = false;
      }
    };

    const onLeaveWindow = () => {
      lastMove = 0;
      if (magnetEl) magnetEl.style.transform = "";
      if (mediaEl) {
        mediaEl.style.setProperty("--px", "0px");
        mediaEl.style.setProperty("--py", "0px");
      }
      magnetEngaged = false;
      parallaxEngaged = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    raf = requestAnimationFrame(paint);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      document.removeEventListener("pointerleave", onLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={fieldRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-[1100px] w-[1100px]"
        style={{
          // start at the idle strength so the very first frame does not jump up
          // from a hard 0 to the idle value
          opacity: OPACITY_IDLE,
          contain: "strict",
          willChange: "transform, opacity",
          background:
            "radial-gradient(closest-side, rgba(233,238,250,0.055) 0%, rgba(150,163,214,0.024) 40%, rgba(120,135,200,0.008) 62%, transparent 76%)",
        }}
      />

      {/* Contextual label — small, decorative, and never a cursor replacement. */}
      <div
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[61] select-none font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-paper/70 opacity-0"
        style={{ transform: "translate3d(-200px, -200px, 0)", willChange: "transform, opacity" }}
      />
    </>
  );
}

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;
