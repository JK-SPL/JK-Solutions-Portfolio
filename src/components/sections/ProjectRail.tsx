import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { railProjects } from "@/data/showcase";

/**
 * Everything that is real work but is not a flagship.
 *
 * The verified government workflow systems, the automation systems, and the
 * AI / 3D research all get a row here rather than a large showcase, so the
 * portfolio covers the full breadth of the work without every project claiming
 * the same visual weight. Titles, statuses and technologies come from
 * `data/projects.ts`.
 */
export function ProjectRail() {
  if (railProjects.length === 0) return null;

  return (
    <section aria-labelledby="systems" className="border-t border-line py-20 sm:py-24">
      <div className="shell">
        <p className="eyebrow">VERIFIED SYSTEMS &amp; RESEARCH</p>
        <h2 id="systems" className="display-3 mt-5 max-w-[26ch]">
          THE REST OF THE WORK, IN ONE PLACE.
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {railProjects.map((project, i) => (
            <Reveal
              as="li"
              key={project.slug}
              delay={(i % 2) * 60}
              className="group flex flex-col bg-panel p-6 transition-colors duration-[var(--dur)] hover:bg-void sm:p-7"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-primary-glow">
                  {project.categories[0]}
                </span>
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-faint">
                  {project.status ?? "DOCUMENTED"}
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-paper">
                {project.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
                {project.shortDescription ?? project.summary}
              </p>

              {project.technologies?.length ? (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}

              <Link
                href={`/work/${project.slug}`}
                data-lit
                className="mt-6 inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mute transition-colors hover:text-paper"
              >
                View case study
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
