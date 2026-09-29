"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Ambient technical particle field. Canvas-based, DPR-aware, paused when
 * offscreen / tab hidden / reduced motion. Pure decoration — aria-hidden.
 */
export function Particles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface P {
      x: number; y: number; r: number; vx: number; vy: number; o: number; hue: "violet" | "cyan" | "white";
    }
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((width * height) / 26000), 70);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.1 - 0.03,
        o: Math.random() * 0.5 + 0.15,
        hue: Math.random() > 0.82 ? "cyan" : Math.random() > 0.6 ? "violet" : "white",
      }));
    };

    const colors = {
      violet: "141, 108, 249",
      cyan: "127, 214, 232",
      white: "216, 220, 229",
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[p.hue]}, ${p.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden;
      if (running) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    });
    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    io.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
