import Link from "next/link";
import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { capturedUiImage } from "@/lib/showcase";
import { productProjects } from "@/data/projects";

/**
 * Products, shown as products.
 *
 * A product is not a case study: it is something that exists, has a status,
 * and can be entered. So each row leads with its real UI at a large size, names
 * the product, states its status in the site's own vocabulary, and links out to
 * the case study for the reasoning. SevaDesk and JK Attendance have no captured
 * media, so they render an honest typographic panel of their documented
 * capabilities rather than a placeholder screenshot.
 */
export function ProductShowcase() {
  return (
    <section aria-labelledby="products" className="border-t border-line bg-ink py-20 sm:py-24">
      <div className="shell">
        <p className="eyebrow">04 / PRODUCTS</p>
        <h2 id="products" className="display-2 mt-5 max-w-[16ch]">
          PRODUCTS, NOT PROJECTS.
        </h2>
        <p className="lead mt-6">
          Two things that exist as running software, not as case studies.
        </p>

        <div className="mt-14 space-y-16 sm:space-y-20">
          {productProjects.map((project, i) => {
            const lead = capturedUiImage(project);
            const capabilities = (project.capabilities ?? project.features ?? []).slice(0, 4);

            return (
              <article key={project.slug} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <Reveal>
                    {lead ? (
                      <ProjectMediaFrame
                        media={lead}
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        showCaption
                        data-lit-media
                      />
                    ) : (
                      <ProductPanel project={project} index={i} />
                    )}
                  </Reveal>
                </div>

                <div className="flex flex-col justify-center lg:col-span-5 lg:pl-6">
                  <Reveal delay={80}>
                    <p className="flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.18em]">
                      <span className="text-primary-glow">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" className="h-px w-6 bg-line" />
                      <span className="text-faint">{project.status ?? "BUILT"}</span>
                    </p>
                    <h3 className="mt-5 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tightest text-paper">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-mute">
                      {project.shortDescription ?? project.summary}
                    </p>
                  </Reveal>

                  {capabilities.length ? (
                    <Reveal delay={140}>
                      <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                        {capabilities.map((c) => (
                          <li
                            key={c}
                            className="flex gap-3 text-[0.8125rem] leading-relaxed text-mute"
                          >
                            <span aria-hidden="true" className="shrink-0 text-faint">
                              —
                            </span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  ) : null}

                  <Reveal delay={200} className="mt-8 flex flex-wrap items-center gap-5">
                    <Link
                      href={`/work/${project.slug}`}
                      data-lit
                      className="group/link inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper transition-colors hover:text-primary-glow"
                    >
                      View case study
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-faint transition-colors hover:text-paper"
                      >
                        Live ↗
                      </a>
                    ) : null}
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Honest artwork for a product with no captured UI. */
function ProductPanel({
  project,
  index,
}: {
  project: (typeof productProjects)[number];
  index: number;
}) {
  const capabilities = (project.capabilities ?? project.features ?? []).slice(0, 6);

  return (
    <div className="relative isolate overflow-hidden bg-engineering p-8 sm:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-label text-faint">
          {project.projectType ?? "PLATFORM"}
        </p>
        <p className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none tracking-tightest text-paper/90">
          {String(index + 1).padStart(2, "0")}
        </p>
        {capabilities.length ? (
          <ul className="mt-7 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {capabilities.map((c) => (
              <li
                key={c}
                className="bg-void/70 px-4 py-3 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.16em] text-mute"
              >
                {c}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
