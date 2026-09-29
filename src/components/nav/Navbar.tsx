"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

/** Distance from the viewport top that reveals the bar while it is hidden. */
const EDGE_REVEAL_PX = 88;
/** Never hide until the user has genuinely committed to the page. */
const HIDE_AFTER_PX = 140;
/** Ignore sub-pixel scroll jitter when deciding direction. */
const DIRECTION_DELTA = 3;
/** A single-frame jump larger than this is restoration, not a gesture. */
const JUMP_PX = 400;
/** Below this width the auto-hide behaviour is disabled entirely. */
const DESKTOP_MQ = "(min-width: 768px)";

/**
 * Auto-hiding primary navigation.
 *
 * - hidden while scrolling down, revealed while scrolling up
 * - revealed by entering the top `EDGE_REVEAL_PX` band of the viewport
 * - pinned open at the absolute top of the document
 * - revealed on focus so keyboard users can always reach it
 * - disabled below `DESKTOP_MQ`; mobile keeps a static compact bar
 *
 * All listeners are passive and the scroll work is rAF-throttled. State only
 * changes when the boolean actually flips, so React bails out of re-renders
 * during continuous scrolling.
 */
export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  const lastY = useRef(0);
  const pointerInEdge = useRef(false);
  const pointerOnNav = useRef(false);
  const frame = useRef(0);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_MQ);

    const resolve = () => {
      frame.current = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      const shouldBeSolid = y > 8;
      setSolid((prev) => (prev === shouldBeSolid ? prev : shouldBeSolid));

      if (!desktop.matches) {
        setHidden(false);
        return;
      }
      if (y <= 8) {
        // absolute page top — always visible
        setHidden(false);
      } else if (Math.abs(delta) > JUMP_PX) {
        // scroll restoration, an anchor jump or a programmatic scroll: not a
        // gesture, so resync without changing the reveal state
      } else if (pointerInEdge.current || pointerOnNav.current) {
        setHidden(false);
      } else if (delta > DIRECTION_DELTA && y > HIDE_AFTER_PX) {
        setHidden(true);
      } else if (delta < -DIRECTION_DELTA) {
        setHidden(false);
      }
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(resolve);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!desktop.matches || e.pointerType === "touch") return;

      if (e.clientY <= EDGE_REVEAL_PX) {
        pointerInEdge.current = true;
        setHidden(false);
        return;
      }

      pointerInEdge.current = false;
      // pointer has left the reveal band and the page is scrolled — re-hide
      if (e.clientY > 220 && !pointerOnNav.current && window.scrollY > HIDE_AFTER_PX) {
        setHidden(true);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    desktop.addEventListener("change", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      desktop.removeEventListener("change", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, []);

  // Route change: close the mobile menu and make sure the bar is reachable.
  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
    lastY.current = 0;
  }, [pathname]);

  // The full-screen menu sits above the bar; never leave it slid away.
  useEffect(() => {
    if (menuOpen) setHidden(false);
  }, [menuOpen]);

  if (pathname.startsWith("/command")) return null;

  const reveal = () => {
    pointerOnNav.current = true;
    setHidden(false);
  };
  const surrender = () => {
    pointerOnNav.current = false;
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
        <nav
          aria-label="Primary"
          // while slid away the bar must not be a focus target, or keyboard
          // users can tab into links that are rendered off-screen
          inert={hidden}
          onMouseEnter={reveal}
          onMouseLeave={surrender}
          onFocus={reveal}
          onBlur={surrender}
          className={cn(
            "pointer-events-auto border-b transition-[transform,opacity,background-color,border-color,box-shadow,backdrop-filter]",
            "duration-[var(--dur)] ease-[var(--ease-out)]",
            hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
            solid
              ? "border-line bg-void/70 shadow-[0_10px_40px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <div className="shell flex h-16 items-center justify-between sm:h-[4.5rem]">
            <Link
              href="/"
              data-lit
              className="font-display text-sm font-bold tracking-[0.08em] text-paper"
              aria-label="JK SOLUTIONS — home"
            >
              JK&nbsp;SOLUTIONS
            </Link>

            <div className="hidden items-center gap-9 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-lit
                  className={cn(
                    "font-mono text-[0.6875rem] uppercase tracking-label transition-colors duration-[var(--dur)]",
                    pathname.startsWith(link.href) ? "text-paper" : "text-mute hover:text-paper"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                data-lit
                data-magnetic
                className="border border-line px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-label text-paper transition-colors duration-[var(--dur)] hover:border-primary-glow hover:bg-primary/10"
              >
                Start a project
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              data-lit
              className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-label text-paper md:hidden"
            >
              Menu
              <span aria-hidden="true" className="flex flex-col gap-1">
                <span className="h-px w-6 bg-paper" />
                <span className="h-px w-6 bg-paper" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export { SITE };
