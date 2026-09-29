import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { getProject, publishedProjects } from "@/data/projects";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { ProjectCard } from "@/components/showcase/ProjectCard";
import {
  heroImage,
  heroVideo,
  galleryImages,
  creatives,
  storyFrames,
  hasRealMedia,
} from "@/lib/showcase";
import { cn } from "@/lib/utils";
import { SITE } from "@/data/site";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const lead = heroImage(project) ?? heroVideo(project);
  const ogImage = lead?.src ?? "/images/jk-portrait.jpg";

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    alternates: {
      canonical: `${SITE.url}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary,
      url: `${SITE.url}/work/${project.slug}`,
      type: "article",
      images: [{ url: `${SITE.url}${ogImage}`, width: lead?.width ?? 1200, height: lead?.height ?? 630 }],
      publishedTime: project.year ? `${project.year}-01-01` : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
    other: {
      "article:tag": project.categories.join(", "),
    },
  };
}

function ArrowList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-mute">
          <span className="text-primary-glow" aria-hidden="true">
            →
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ChipGrid({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Editorial case-study hero: identity, status, stack, and a lead visual. */
function CaseHero({ project }: { project: NonNullable<ReturnType<typeof getProject>> }) {
  const lead = heroImage(project) ?? heroVideo(project);

  return (
    <header className="border-b border-line pt-32 sm:pt-40">
      <div className="shell pb-16 sm:pb-24">
        <Reveal>
          <p className="eyebrow mb-8 flex flex-wrap items-center gap-3">
            <Link href="/work" className="text-faint transition-colors hover:text-paper">
              WORK
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-primary-glow">{project.categories[0]}</span>
            {project.status ? (
              <span className="chip border-primary-glow/40 bg-primary/10 text-paper">
                {project.status}
              </span>
            ) : null}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <h1 className="display-1 max-w-[16ch]">{project.title}</h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="lead mt-8">{project.summary}</p>
            </Reveal>
            {project.clientName ? (
              <Reveal delay={200}>
                <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
                  {project.clientName}
                  {project.projectType ? ` — ${project.projectType}` : ""}
                </p>
              </Reveal>
            ) : null}
            {project.technologies?.length ? (
              <Reveal delay={260}>
                <div className="mt-8">
                  <ChipGrid items={project.technologies} />
                </div>
              </Reveal>
            ) : null}
          </div>

          {lead ? (
            <Reveal delay={200} className="lg:col-span-5">
              <ProjectMediaFrame
                media={lead}
                sizes="(max-width: 1024px) 100vw, 42vw"
                showCaption
              />
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/**
 * Sticky visual + scrolling narrative for media-rich case studies.
 *
 * The media column stays pinned while the copy beside it scrolls through the
 * problem, approach and outcome — the same treatment the homepage ScrollStory
 * uses, but scoped to a single case study's own real captures.
 */
function CaseNarrative({ project }: { project: NonNullable<ReturnType<typeof getProject>> }) {
  const frames = storyFrames(project);
  if (frames.length < 2) return null;

  const beats = [
    { label: "The problem", text: project.problem },
    { label: "The approach", text: project.solution },
    {
      label: "What shipped",
      text:
        project.architecture?.[0] ??
        project.customerExperience?.[0] ??
        project.summary,
    },
  ].filter((b) => b.text);

  if (beats.length < 2) return null;

  return (
    <section className="border-b border-line py-20 sm:py-28">
      <div className="shell">
        <SectionHeading index="01" eyebrow="CASE STUDY" title="From problem to product" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <ol className="flex flex-col gap-12 lg:gap-[30vh] lg:pr-6">
              {beats.map((beat, i) => (
                <li key={beat.label}>
                  <Reveal>
                    <p className="font-mono text-[0.625rem] uppercase tracking-label text-primary-glow">
                      {String(i + 1).padStart(2, "0")} / {beat.label}
                    </p>
                    <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-mute">
                      {beat.text}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="lg:sticky lg:top-28">
              <div className="relative">
                {frames.map((frame, i) => (
                  <div
                    key={frame.src}
                    className={cn(i > 0 && "mt-5")}
                  >
                    <ProjectMediaFrame
                      media={frame}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      showCaption
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A labelled content section that only renders when real data exists. */
function CaseSection({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line py-16 sm:py-20">
      <div className="shell">
        <SectionHeading index={index} eyebrow={eyebrow} title={title} />
        {children}
      </div>
    </section>
  );
}

function MediaGallery({ project }: { project: NonNullable<ReturnType<typeof getProject>> }) {
  const images = galleryImages(project).filter((m) => m.kind === "image");
  const lead = heroImage(project);
  const rest = images.filter((m) => m.src !== lead?.src).slice(0, 6);
  if (rest.length === 0) return null;

  return (
    <CaseSection index="06" eyebrow="GALLERY" title="Captured from the running system">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((m) => (
          <Reveal key={m.src}>
            <ProjectMediaFrame media={m} scrim={false} />
          </Reveal>
        ))}
      </div>
    </CaseSection>
  );
}

function CreativeGallery({
  project,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
}) {
  const ads = creatives(project);
  if (ads.length === 0) return null;

  return (
    <CaseSection index="07" eyebrow="CREATIVE" title="Advertisement and promotional work">
      <p className="lead mb-8 max-w-[56ch]">
        Software is only half the story. These are the advertisements and
        promotional creatives produced to present and communicate the product.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ads.map((ad) => (
          <Reveal key={ad.src}>
            <ProjectMediaFrame media={ad} showCaption />
          </Reveal>
        ))}
      </div>
    </CaseSection>
  );
}

function ProjectLinks({
  project,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
}) {
  if (!project.liveUrl && !project.githubUrl && !project.liveNote) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="shell">
        <div className="flex flex-wrap items-center gap-5 border-t border-line pt-12">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-lit
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-primary-glow"
            >
              View live project ↗
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-lit
              className="inline-flex items-center gap-2 rounded-md border border-line bg-panel px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-mute transition-colors duration-300 hover:border-primary-glow/40 hover:text-paper"
            >
              Source ↗
            </a>
          ) : null}
          {project.liveNote ? (
            <p className="max-w-[42ch] font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
              {project.liveNote}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Honest status for projects whose case study is still being documented. */
function PendingState({
  project,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
}) {
  if (!project.pendingContent) return null;

  return (
    <section className="border-b border-line py-16 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="max-w-[56ch] border border-line bg-panel p-8 sm:p-12">
            <p className="eyebrow mb-4 text-primary-glow">STATUS</p>
            <h2 className="display-3">In preparation</h2>
            <p className="mt-5 leading-relaxed text-mute">
              {project.pendingNote ??
                "Full case study in preparation — documented from the real system, not written from imagination."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Previous/next project navigation. */
function ProjectNav({ current }: { current: NonNullable<ReturnType<typeof getProject>> }) {
  const idx = publishedProjects.findIndex((p) => p.slug === current.slug);
  const prev = idx > 0 ? publishedProjects[idx - 1] : null;
  const next = idx < publishedProjects.length - 1 ? publishedProjects[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <section className="border-t border-line py-16 sm:py-20">
      <div className="shell">
        <SectionHeading index="NAV" eyebrow="PROJECT NAVIGATION" title="Nearby work" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              data-lit
              className="group flex flex-col gap-2 rounded border border-line bg-panel p-5 transition-colors duration-300 hover:border-primary-glow/40 hover:bg-void"
            >
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-primary-glow transition-colors">
                ← Previous: {prev.title}
              </span>
              <span className="text-sm text-mute group-hover:text-paper transition-colors">
                {prev.shortDescription ?? prev.summary}
              </span>
            </Link>
          ) : null}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              data-lit
              className="group flex flex-col gap-2 rounded border border-line bg-panel p-5 transition-colors duration-300 hover:border-primary-glow/40 hover:bg-void sm:text-right"
            >
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-primary-glow transition-colors">
                Next: {next.title} →
              </span>
              <span className="text-sm text-mute group-hover:text-paper transition-colors">
                {next.shortDescription ?? next.summary}
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Related projects sharing at least one category with the current project. */
function RelatedProjects({ current }: { current: NonNullable<ReturnType<typeof getProject>> }) {
  const related = publishedProjects
    .filter((p) => p.slug !== current.slug && !p.pendingContent && p.categories.some((c) => current.categories.includes(c)))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-line py-16 sm:py-20">
      <div className="shell">
        <SectionHeading index="REL" eyebrow="RELATED" title="More in this area" />
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((project) => (
            <ProjectCard key={project.slug} project={project} index={0} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const mediaRich = hasRealMedia(p);

  return (
    <article>
      <CaseHero project={p} />

      {mediaRich ? <CaseNarrative project={p} /> : null}

      {p.problem ? (
        <CaseSection index="02" eyebrow="PROBLEM" title="The challenge">
          <p className="max-w-[68ch] leading-relaxed text-mute">{p.problem}</p>
        </CaseSection>
      ) : null}

      {p.solution ? (
        <CaseSection index="03" eyebrow="SOLUTION" title="The approach">
          <p className="max-w-[68ch] leading-relaxed text-mute">{p.solution}</p>
        </CaseSection>
      ) : null}

      {p.description.length > 0 ? (
        <CaseSection index="04" eyebrow="OVERVIEW" title="About this build">
          <div className="max-w-[68ch] space-y-5">
            {p.description.map((para, i) => (
              <p key={i} className="leading-relaxed text-mute">
                {para}
              </p>
            ))}
          </div>
        </CaseSection>
      ) : null}

      {p.buildProcess?.length ? (
        <CaseSection index="05" eyebrow="BUILD PROCESS" title="How it was built">
          <ol className="flex flex-col gap-4">
            {p.buildProcess.map((step, i) => (
              <li key={i} className="flex gap-4 text-mute">
                <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-primary-glow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </CaseSection>
      ) : null}

      {p.architecture?.length ? (
        <CaseSection index="06" eyebrow="ARCHITECTURE" title="How it is structured">
          <ArrowList items={p.architecture} />
        </CaseSection>
      ) : null}

      {p.features?.length ? (
        <CaseSection index="07" eyebrow="FEATURES" title="What it does">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {p.features.map((f) => (
              <li
                key={f}
                className="border border-line bg-panel px-4 py-3 text-sm text-mute"
              >
                {f}
              </li>
            ))}
          </ul>
        </CaseSection>
      ) : null}

      {p.capabilities?.length ? (
        <CaseSection index="08" eyebrow="CAPABILITIES" title="Platform capabilities">
          <ArrowList items={p.capabilities} />
        </CaseSection>
      ) : null}

      {p.customerExperience?.length ? (
        <CaseSection index="09" eyebrow="CITIZEN EXPERIENCE" title="What the public sees">
          <ArrowList items={p.customerExperience} />
        </CaseSection>
      ) : null}

      {p.adminExperience?.length ? (
        <CaseSection index="10" eyebrow="OPERATIONS" title="What the team uses">
          <ArrowList items={p.adminExperience} />
        </CaseSection>
      ) : null}

      {p.integrations?.length ? (
        <CaseSection index="11" eyebrow="INTEGRATIONS" title="Connected systems">
          <ArrowList items={p.integrations} />
        </CaseSection>
      ) : null}

      {p.metrics?.length ? (
        <CaseSection index="12" eyebrow="BY THE NUMBERS" title="Structural facts">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {p.metrics.map((m) => (
              <div key={m.label} className="border border-line bg-panel p-5">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
                  {m.label}
                </dt>
                <dd className="mt-2 font-display text-xl font-semibold tracking-tightest text-paper">
                  {m.value}
                </dd>
                {m.note ? (
                  <dd className="mt-1 text-xs leading-relaxed text-mute">{m.note}</dd>
                ) : null}
              </div>
            ))}
          </dl>
        </CaseSection>
      ) : null}

      <MediaGallery project={p} />
      <CreativeGallery project={p} />
      <PendingState project={p} />
      <ProjectLinks project={p} />
      <ProjectNav current={p} />
      <RelatedProjects current={p} />

      <div className="shell pb-24 pt-8">
        <Reveal>
          <div className="flex flex-wrap gap-5">
            <ButtonLink href="/work" variant="ghost">
              ← All work
            </ButtonLink>
            <ButtonLink href="/contact" variant="primary">
              Start a project
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
