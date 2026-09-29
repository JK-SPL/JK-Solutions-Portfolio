import Link from "next/link";
import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { creativeProjects } from "@/data/showcase";

/**
 * Advertisements and promotional creative, shown at the size they were made at.
 *
 * These are real produced files — SevaDesk's campaign reels and Aaradhya's
 * promotional spots — and they were previously only reachable on a case study
 * page. They are here as a homepage section, not a separate page, because the
 * brief is explicit that no /ads route should exist.
 *
 * The strip scrolls horizontally on desktop and stacks on mobile. It is a
 * native horizontal scroll container, not a hijacked wheel handler: the
 * browser's own scrolling does the work, so trackpads, touch, and keyboards
 * all behave the way the platform intends.
 *
 * No campaign performance is stated anywhere here, because none is recorded.
 */
export function CreativeShowcase() {
  if (creativeProjects.length === 0) return null;

  return (
    <section aria-labelledby="creative" className="border-t border-line py-20 sm:py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">07 / CREATIVE</p>
            <h2 id="creative" className="display-2 mt-5 max-w-[22ch]">
              THE ADVERTISEMENTS TOO.
            </h2>
            <p className="lead mt-5 max-w-[52ch]">
              Every launch ships with the creative that sells it. These are the
              real files produced for the work above.
            </p>
          </div>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
            Scroll →
          </p>
        </div>

        {creativeProjects.map((project) => {
          const creatives = project.creatives ?? [];

          return (
            <div key={project.slug} className="mt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
                <h3 className="font-display text-lg font-semibold tracking-tight text-paper">
                  {project.title}
                </h3>
                <Link
                  href={`/work/${project.slug}`}
                  data-lit
                  className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper"
                >
                  Case study →
                </Link>
              </div>

              {/* Native horizontal scroll — no wheel hijack. The label is a
                  hint only; the list stays fully usable by keyboard, touch and
                  scrollbar without it. */}
              <ul
                className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] sm:gap-5"
                aria-label={`Advertisements produced for ${project.title}`}
                data-cursor-label="DRAG"
              >
                {creatives.map((creative, i) => (
                  <Reveal
                    as="li"
                    key={creative.src}
                    delay={i * 50}
                    className="w-[74vw] shrink-0 snap-start sm:w-[38vw] lg:w-[22vw]"
                  >
                    <ProjectMediaFrame
                      media={creative}
                      sizes="(max-width: 640px) 74vw, (max-width: 1024px) 38vw, 22vw"
                      showCaption
                    />
                  </Reveal>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
