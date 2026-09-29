"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { PROJECT_CATEGORIES, publishedProjects, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/motion";

/**
 * THINGS I'VE BUILT — editorial project index with category filter.
 * The active category is synced to the URL query string so filtered
 * views are shareable and back-button-safe. Desktop: a cursor-following
 * preview card swaps in as you hover each row (one active at a time).
 */
export function ProjectsIndex({ showFilter = true }: { showFilter?: boolean }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cat = (searchParams.get("category") as ProjectCategory | "ALL") ?? "ALL";
  const [active, setActive] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const follow = useRef({ x: 0, y: 0, init: false });
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const showPreview = fine && !reduced;

  const setCategory = useCallback(
    (next: ProjectCategory | "ALL") => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === "ALL") {
        params.delete("category");
      } else {
        params.set("category", next);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      // Scroll to top after filter change
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [searchParams, router, pathname]
  );

  const list = useMemo(
    () => (cat === "ALL" ? publishedProjects : publishedProjects.filter((p) => p.categories.includes(cat))),
    [cat]
  );

  const movePreview = (e: React.PointerEvent) => {
    if (!showPreview || !previewRef.current) return;
    const x = Math.min(e.clientX + 28, window.innerWidth - 340);
    const y = Math.min(Math.max(e.clientY - 80, 16), window.innerHeight - 240);
    if (!follow.current.init) {
      follow.current = { x, y, init: true };
    } else {
      follow.current.x += (x - follow.current.x) * 0.18;
      follow.current.y += (y - follow.current.y) * 0.18;
    }
    previewRef.current.style.transform = `translate3d(${follow.current.x}px, ${follow.current.y}px, 0)`;
  };

  return (
    <div>
      {showFilter && (
        <Reveal className="mb-12">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {PROJECT_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "border px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-colors duration-300",
                  cat === c
                    ? "border-primary-glow bg-primary/15 text-paper"
                    : "border-line text-mute hover:border-faint hover:text-paper"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
      )}

      <p className="mb-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
        {list.length} project{list.length !== 1 ? "s" : ""}{cat !== "ALL" ? ` in ${cat}` : ""}
      </p>

      <ol className="divide-y divide-line border-y border-line">
        {list.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={Math.min(i * 40, 200)}>
            <Link
              href={`/work/${p.slug}`} data-lit data-lit-media
              onPointerEnter={() => showPreview && setActive(p)}
              onPointerLeave={() => showPreview && setActive(null)}
              onPointerMove={movePreview}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-7 transition-colors sm:grid-cols-[3rem_1.35fr_1fr_auto] sm:gap-8 sm:py-9"
            >
              <span className="font-mono text-[0.6875rem] text-faint transition-colors group-hover:text-primary-glow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="display-3 block transition-colors duration-300 group-hover:text-primary-glow">
                  {p.title}
                </span>
                <span className="mt-2 block max-w-[52ch] text-sm leading-relaxed text-mute sm:hidden lg:block">
                  {p.summary}
                </span>
              </span>
              <span className="hidden flex-wrap gap-1.5 sm:flex">
                {p.categories.slice(0, 2).map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
                {p.pendingContent && (
                  <span className="chip border-dashed text-faint">CONTENT PENDING</span>
                )}
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-lg text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-glow"
              >
                ↗
              </span>
            </Link>
          </Reveal>
        ))}
      </ol>

      {list.length === 0 ? (
        <Reveal>
          <div className="py-16 text-center">
            <p className="font-display text-xl text-mute">No projects found in this category.</p>
            <Link href="/work" className="mt-4 inline-block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-primary-glow transition-colors hover:text-paper">
              View all projects →
            </Link>
          </div>
        </Reveal>
      ) : null}

      {/* cursor-following preview — one active at a time */}
      {showPreview && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed left-0 top-0 z-[150] w-[300px] border border-line bg-void/92 p-5 shadow-[0_16px_64px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center justify-between font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">
            <span>Case file</span>
            <span className="text-primary-glow">Open ↗</span>
          </div>
          <p className="display-3 mt-3 !text-[1.1rem]">{active?.title}</p>
          <p className="mt-2 line-clamp-3 text-[0.8125rem] leading-relaxed text-mute">{active?.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {active?.categories.slice(0, 3).map((c) => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
