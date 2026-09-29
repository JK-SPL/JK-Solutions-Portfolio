import Link from "next/link";
import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { showcaseFrames } from "@/lib/showcase";
import type { Project } from "@/data/projects";

/**
 * One project, told at the size it deserves: a large real frame, a second
 * frame offset against it, and only the facts needed to orient a viewer.
 *
 * The text column is deliberately short. On desktop it sticks while the media
 * passes, so the project stays named while you look at it. Media takes 8 of 12
 * columns — 67% of the viewport — which is the ratio the layout brief asks for.
 *
 * When a project has no real media, `TypographicPanel` stands in. It renders
 * that project's own verified data as the artwork instead of a stock image.
 */
export function ProjectShowcase({
  project,
  index,
  reverse = false,
}: {
  project: Project;
  index: number;
  /** Puts the media on the left on desktop. */
  reverse?: boolean;
}) {
  const frames = showcaseFrames(project, 2);
  const [lead, second] = frames;
  const live = project.liveUrl;

  return (
    <section
      aria-labelledby={`showcase-${project.slug}`}
      className="border-t border-line py-20 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ——— TEXT ——— */}
          <div
            className={cn(
              "flex flex-col lg:sticky lg:top-28 lg:col-span-4 lg:pr-6",
              reverse ? "lg:order-1" : "lg:order-2"
            )}
          >
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-primary-glow">
                  {String(index).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px w-8 bg-line" />
                {project.categories[0]}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id={`showcase-${project.slug}`}
                className="display-3 mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)]"
              >
                {project.title}
              </h2>
            </Reveal>

            {project.clientName ? (
              <Reveal delay={120}>
                <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
                  {project.clientName}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={160}>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-mute">
                {project.shortDescription ?? project.summary}
              </p>
            </Reveal>

            {/* Verified project facts — never a business outcome. */}
            {project.metrics?.length ? (
              <Reveal delay={200}>
                <dl className="mt-8 divide-y divide-line border-y border-line">
                  {project.metrics.slice(0, 4).map((m) => (
                    <div
                      key={m.label}
                      className="flex items-baseline justify-between gap-6 py-3"
                    >
                      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
                        {m.label}
                      </dt>
                      <dd className="font-mono text-[0.8125rem] text-paper">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}

            {project.technologies?.length ? (
              <Reveal delay={240}>
                <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {project.technologies.slice(0, 7).map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal delay={280} className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href={`/work/${project.slug}`}
                data-lit
                data-cursor-label="VIEW"
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

              {live ? (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-faint transition-colors hover:text-paper"
                >
                  Live site ↗
                </a>
              ) : project.liveNote ? (
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
                  {project.status ?? "DOCUMENTED"}
                </span>
              ) : null}
            </Reveal>
          </div>

          {/* ——— MEDIA ——— */}
          <div
            className={cn(
              "lg:col-span-8",
              reverse ? "lg:order-2" : "lg:order-1"
            )}
          >
            {lead ? (
              <Reveal delay={60}>
                <ProjectMediaFrame
                  media={lead}
                  priority={index === 1}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  showCaption
                />
              </Reveal>
            ) : (
              <Reveal delay={60}>
                <TypographicPanel project={project} />
              </Reveal>
            )}

            {second ? (
              <Reveal delay={140}>
                <ProjectMediaFrame
                  media={second}
                  className="mt-5 w-[62%] max-sm:w-full sm:mt-[-14%] sm:ml-[12%]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 62vw, 40vw"
                  scrim={false}
                />
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Artwork for a project that genuinely has no captured media.
 *
 * Rather than filling the space with a stock image or a fabricated UI mock, the
 * panel is composed from the project's own verified data: its stack, its
 * documented modules, its status. It reads as deliberate design, and every
 * word on it is traceable to `data/projects.ts`.
 */
function TypographicPanel({ project }: { project: Project }) {
  const modules =
    project.capabilities?.slice(0, 6) ??
    project.features?.slice(0, 6) ??
    project.technologies?.slice(0, 6) ??
    [];

  return (
    <div className="relative isolate overflow-hidden bg-engineering p-8 sm:p-12 lg:p-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="relative">
        <p className="font-mono text-[0.625rem] uppercase tracking-label text-faint">
          {project.projectType ?? project.categories.join(" / ")}
        </p>
        <p className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-tightest text-paper/90">
          {project.status ?? "BUILT"}
        </p>
        <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-mute">
          {project.summary}
        </p>

        {modules.length ? (
          <ul className="mt-9 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {modules.map((m) => (
              <li
                key={m}
                className="bg-void/70 px-4 py-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mute"
              >
                {m}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
