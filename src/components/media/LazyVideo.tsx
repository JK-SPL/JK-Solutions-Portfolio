"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Video that costs nothing until it is worth watching.
 *
 * The poster image is painted underneath by the parent (`next/image`), so a
 * visitor who never scrolls to this frame never downloads a single video byte:
 * `preload="none"` and `IntersectionObserver` mean the request only fires once
 * the frame is genuinely on screen. Autoplay is additionally limited to fine
 * pointers and is skipped entirely under `prefers-reduced-motion`, because a
 * self-looping video is exactly the kind of motion that setting exists for.
 *
 * The element crossfades in on `playing` rather than on mount, so the frame
 * never flashes an unpainted black rectangle over the poster.
 */
export function LazyVideo({
  src,
  alt,
  className,
  poster: _poster,
  onReady,
}: {
  src: string;
  /** Describes the footage. The video is decorative; the alt text carries the meaning. */
  alt: string;
  className?: string;
  poster?: string;
  onReady?: () => void;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // A reduced-motion visitor gets the still frame and nothing else.
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const canMatch =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: fine)").matches;

    if (!canMatch) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;
    void el.play().catch(() => {
      /* Autoplay refused (data saver, low power). The poster stays — correct fallback. */
    });
  }, [armed]);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={alt}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      onPlaying={() => {
        setPlaying(true);
        onReady?.();
      }}
      onError={() => {
        /* Broken or missing file must never leave a broken icon on the page. */
        setPlaying(false);
      }}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out",
        playing ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}
