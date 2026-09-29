"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { NAV_LINKS } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/motion";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (open) {
      document.body.style.overflow = "hidden";
      overlay.style.visibility = "visible";
      if (reduced) {
        overlay.style.opacity = "1";
      } else {
        gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.fromTo(
          itemsRef.current?.children ?? [],
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, delay: 0.1, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "";
      if (reduced) {
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
      } else {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            overlay.style.visibility = "hidden";
          },
        });
      }
    }
  }, [open, reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      id="mobile-menu"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="invisible fixed inset-0 z-[110] bg-void opacity-0"
      style={{ visibility: "hidden" }}
    >
      <div className="bg-engineering absolute inset-0" aria-hidden="true" />
      <div className="shell relative flex h-full flex-col">
        <div className="flex h-16 items-center justify-between">
          <span className="font-display text-sm font-bold tracking-[0.08em]">JK&nbsp;SOLUTIONS</span>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[0.6875rem] uppercase tracking-label text-mute hover:text-paper"
          >
            Close
          </button>
        </div>

        <div ref={itemsRef} className="flex flex-1 flex-col justify-center gap-2">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="group flex items-baseline gap-4 py-3"
            >
              <span className="font-mono text-[0.6875rem] text-primary-glow">0{i + 1}</span>
              <span className="font-display text-4xl font-semibold tracking-tightest text-paper transition-colors group-hover:text-primary-glow">
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/contact" onClick={onClose} className="group flex items-baseline gap-4 py-3">
            <span className="font-mono text-[0.6875rem] text-primary-glow">
              {String(NAV_LINKS.length + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-4xl font-semibold tracking-tightest text-paper transition-colors group-hover:text-primary-glow">
              START A PROJECT
            </span>
          </Link>
        </div>

        <p className="pb-8 font-mono text-[0.625rem] uppercase tracking-label text-faint">
          I build with AI. I engineer for real life.
        </p>
      </div>
    </div>
  );
}
