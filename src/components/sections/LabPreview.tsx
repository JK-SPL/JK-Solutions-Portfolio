import Link from "next/link";
import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { labProjects } from "@/data/projects";
import { heroImage } from "@/lib/showcase";

/**
 * Lab preview — deliberately quieter than the commercial work.
 *
 * Lab is where AI, vibe-coding, 3D and motion experiments live, and it should
 * not be mistaken for the product line. The status of each entry comes from the
 * project record (EXPERIMENT / PROTOTYPE / IN BUILD / CONCEPT), so an experiment
 * is never presented as a shipped product.
 */
export function LabPreview() {
  return (
    <section aria-labelledby="lab" className="border-t border-line py-20 sm:py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">08 / LAB</p>
            <h2 id="lab" className="display-2 mt-5 max-w-[20ch]">
              WHERE THE UNFINISHED WORK LIVES.
            </h2>
          </div>
          <Link
            href="/lab"
            data-lit
            className="group/link inline-flex items-center gap-2 pb-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper transition-colors hover:text-primary-glow"
          >
            Open the lab
            <span aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {labProjects.map((project, i) => {
            const lead = heroImage(project);

            return (
              <Reveal
                as="li"
                key={project.slug}
                delay={i * 70}
                className="group flex flex-col bg-panel transition-colors duration-[var(--dur)] hover:bg-void"
              >
                {lead ? (
                  <ProjectMediaFrame
                    media={lead}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    scrim={false}
                    data-lit-media
                  />
                ) : (
                  <div className="relative isolate flex h-40 items-end overflow-hidden bg-engineering p-5">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-[0.14]"
                      style={{
                        backgroundImage:
                          "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <span className="relative font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">
                      {project.status ?? "EXPERIMENT"}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-primary-glow">
                    {project.status ?? "EXPERIMENT"}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-paper">
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
                    View
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
