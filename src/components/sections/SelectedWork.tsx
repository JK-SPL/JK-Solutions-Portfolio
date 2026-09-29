import Link from "next/link";
import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { showcaseProjects } from "@/data/showcase";
import { ButtonLink } from "@/components/ui/Button";
import { showcaseFrames } from "@/lib/showcase";
import type { Project } from "@/data/projects";

/**
 * SELECTED WORK — editorial project preview.
 *
 * The homepage shows a curated handful of the strongest published
 * projects. The full discovery system lives on `/work`.
 *
 * Every slug resolves against `publishedProjects`, so a slug that
 * stops being published is dropped rather than rendered as a broken link.
 */
function ProjectHero({ project, index }: { project: Project; index: number }) {
  const frames = showcaseFrames(project, 2);
  const [lead, second] = frames;
  const hasMedia = Boolean(lead || second);

  return (
    <Reveal delay={index * 80}>
      <Link
        href={`/work/${project.slug}`}
        data-lit
        className="group block overflow-hidden border border-line bg-panel transition-all duration-[var(--dur)] hover:border-primary-glow/40 hover:bg-void"
      >
        {/* Media — omitted entirely when the project has no eligible frame, so
            the status chip never floats over an empty wrapper. */}
        {hasMedia ? (
          <div className="relative overflow-hidden">
            {lead ? (
              <ProjectMediaFrame
                media={lead}
                priority={false}
                sizes="(max-width: 1440px) 100vw, 1440px"
                scrim={true}
                data-lit-media
              />
            ) : null}
            {second ? (
              <ProjectMediaFrame
                media={second}
                className="mt-5 w-[62%] max-sm:w-full sm:mt-[-14%] sm:ml-[12%]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 62vw, 40vw"
                scrim={false}
              />
            ) : null}
            {project.status ? (
              <span className="absolute left-3 top-3 chip border-primary-glow/40 bg-primary/15 text-paper text-[0.5rem]">
                {project.status}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Info */}
        <div className="p-5 sm:p-6">
          {!hasMedia && project.status ? (
            <span className="chip mb-3 inline-block border-primary-glow/40 bg-primary/15 text-paper text-[0.5rem]">
              {project.status}
            </span>
          ) : null}
          <div className="flex items-center gap-2">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-primary-glow">
              {project.categories[0]}
            </p>
            {project.flagship ? (
              <span className="chip border-primary-glow/40 bg-primary/15 text-paper text-[0.5rem]">FLAGSHIP</span>
            ) : null}
            {project.featured && !project.flagship ? (
              <span className="chip border-electric/40 bg-electric/15 text-paper text-[0.5rem]">FEATURED</span>
            ) : null}
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-paper group-hover:text-primary-glow transition-colors duration-300 sm:text-2xl">
            {project.title}
          </h3>
          {project.year ? (
            <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">{project.year}</p>
          ) : null}
          <p className="mt-2 text-sm leading-relaxed text-mute line-clamp-2">
            {project.shortDescription ?? project.summary}
          </p>

          {project.technologies?.length ? (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((t) => (
                <li key={t} className="chip text-[0.5625rem]">{t}</li>
              ))}
            </ul>
          ) : null}

          <div className="mt-5 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors group-hover:text-paper">
            View case study
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/** Compact project row for smaller projects. */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal as="li" delay={index * 60}>
      <Link
        href={`/work/${project.slug}`}
        data-lit
        className="group flex flex-col overflow-hidden border border-line bg-panel transition-all duration-[var(--dur)] hover:border-primary-glow/40 hover:bg-void"
      >
        {project.media && project.media.length > 0 ? (
          <div className="relative overflow-hidden">
            <ProjectMediaFrame
              media={project.media[0]}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              scrim={true}
              data-lit-media
            />
          </div>
        ) : null}
        <div className="p-5">
          <div className="flex items-center gap-2">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-primary-glow">
              {project.categories[0]}
            </p>
            {project.flagship ? (
              <span className="chip border-primary-glow/40 bg-primary/15 text-paper text-[0.5rem]">FLAGSHIP</span>
            ) : null}
          </div>
          <h3 className="mt-2 font-display text-base font-semibold tracking-tight text-paper group-hover:text-primary-glow transition-colors">
            {project.title}
          </h3>
          {project.year ? (
            <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">{project.year}</p>
          ) : null}
          <p className="mt-1 text-sm leading-relaxed text-mute line-clamp-1">
            {project.shortDescription ?? project.summary}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export function SelectedWork() {
  if (showcaseProjects.length === 0) return null;

  return (
    <section aria-labelledby="selected-work" className="border-t border-line">
      <div className="shell pt-24 sm:pt-28 pb-16 sm:pb-20">
        <Reveal>
          <div className="mb-14 flex items-center gap-4">
            <p className="eyebrow">02 / SELECTED WORK</p>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        {/* Hero project — larger treatment */}
        <div className="mb-8">
          <ProjectHero project={showcaseProjects[0]} index={0} />
        </div>

        {/* Remaining showcase projects — 2-column grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {showcaseProjects.slice(1).map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
            <p className="max-w-[40ch] text-sm leading-relaxed text-mute">
              The strongest published work, featured editorially. Every
              project opens a full case study on the work page.
            </p>
            <Link
              href="/work"
              data-lit
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-primary-glow transition-colors hover:text-paper"
            >
              View all work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
