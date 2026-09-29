import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { publishedProjects } from "@/data/projects";
import { hasRealMedia } from "@/lib/showcase";

/**
 * The project universe, as a numbered index.
 *
 * This is the answer to "what is all of this?" in one screen, and it doubles
 * as the entry point to every case study. It is deliberately a list rather than
 * a card grid: a list of names reads instantly, while a grid of twelve
 * identical thumbnails hides the work instead of showing it.
 *
 * Projects without captured media are marked as such instead of being given a
 * placeholder image, so an honest gap is visible rather than disguised.
 */
export function WorkIndex() {
  return (
    <section aria-labelledby="selected-work" className="shell pt-24 sm:pt-28">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <p className="eyebrow">03 / SELECTED WORK</p>
          <h2 id="selected-work" className="display-2 mt-5 max-w-[18ch]">
            THINGS I HAVE BUILT.
          </h2>
        </div>
        <p className="max-w-[34ch] text-sm leading-relaxed text-mute">
          Real systems, real experiments, real problems solved. Every entry
          opens a case study.
        </p>
      </div>

      <ol className="mt-2">
        {publishedProjects.map((project, i) => {
          const visual = hasRealMedia(project);

          return (
            <Reveal
              as="li"
              key={project.slug}
              delay={Math.min(i, 8) * 30}
              className="border-b border-line"
            >
              <Link
                href={`/work/${project.slug}`}
                data-lit
                className="group/row grid grid-cols-[3ch_1fr_auto] items-baseline gap-4 py-5 transition-colors duration-[var(--dur)] hover:bg-void sm:grid-cols-[4ch_1fr_auto] sm:gap-6 sm:px-2"
              >
                <span className="font-mono text-[0.625rem] tracking-label text-faint transition-colors group-hover/row:text-primary-glow">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold tracking-tight text-paper sm:text-lg">
                    {project.title}
                  </span>
                  <span className="mt-1.5 block max-w-[62ch] text-sm leading-relaxed text-mute">
                    {project.shortDescription ?? project.summary}
                  </span>
                </span>

                <span className="flex items-center gap-3 sm:gap-5">
                  {!visual ? (
                    <span className="hidden font-mono text-[0.5rem] uppercase tracking-[0.18em] text-faint sm:inline">
                      No media
                    </span>
                  ) : null}
                  <span className="hidden font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint sm:inline">
                    {project.status ?? "DOCUMENTED"}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-mute transition-transform duration-300 group-hover/row:translate-x-1 group-hover/row:text-paper"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
