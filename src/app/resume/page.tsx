import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ResumeDownload } from "@/components/resume/ResumeDownload";
import {
  PROFILE,
  EXPERIENCE,
  CAPABILITY_TAGS,
  SKILL_GROUPS,
  RESUME_PROJECTS,
} from "@/data/resume";
import { getProject, type Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Professional profile of JK — founder of JK SOLUTIONS. Infrastructure and government IT background, automation systems and AI-assisted product building.",
  openGraph: {
    title: "Resume — JK SOLUTIONS",
    description:
      "Founder of JK SOLUTIONS. Infrastructure, government IT, automation and AI-assisted product building.",
  },
};

/** First real image attached to a project, if any — never a stand-in. */
function projectVisual(p: Project) {
  const media = [...(p.media ?? []), ...(p.creatives ?? [])];
  return (
    media.find((m) => m.kind === "image" && m.slot === "hero") ??
    media.find((m) => m.kind === "image" && m.slot === "brand") ??
    media.find((m) => m.kind === "image")
  );
}

export default function ResumePage() {
  const projects = RESUME_PROJECTS.map((entry) => ({
    entry,
    project: getProject(entry.slug),
  })).filter((x) => x.project !== undefined);

  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      {/* ——— HEADER ——— */}
      <header>
        <Reveal>
          <p className="eyebrow mb-6">RESUME / PROFESSIONAL PROFILE</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display-1 max-w-[12ch]">{PROFILE.name}</h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-label text-primary-glow">
            {PROFILE.role}
            <span className="mx-3 text-faint" aria-hidden="true">/</span>
            {PROFILE.positioning}
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p className="lead mt-8">{PROFILE.statement}</p>
        </Reveal>
        <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-4">
          <ResumeDownload />
          <ButtonLink href="/work" variant="ghost">
            VIEW WORK <span aria-hidden="true">→</span>
          </ButtonLink>
          <ButtonLink href="/contact" variant="primary">
            START A PROJECT <span aria-hidden="true">↗</span>
          </ButtonLink>
        </Reveal>
      </header>

      {/* ——— EXECUTIVE SUMMARY / EXPERIENCE (editorial grid) ——— */}
      <div className="mt-28 grid grid-cols-1 gap-16 lg:mt-36 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <aside>
          <SectionHeading eyebrow="PROFILE" title="WHO I AM, PROFESSIONALLY." />
          <Reveal delay={120}>
            <p className="lead">{PROFILE.summary}</p>
          </Reveal>
          <Reveal delay={200} className="mt-10 border-t border-line pt-8">
            <p className="eyebrow mb-5">CORE CAPABILITIES</p>
            <ul className="flex flex-wrap gap-2" aria-label="Core capabilities">
              {CAPABILITY_TAGS.map((c) => (
                <li key={c}>
                  <span className="chip">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>

        {/* EXPERIENCE — vertical timeline */}
        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="sr-only">
            Experience
          </h2>
          <ol className="relative space-y-14 border-l border-line pl-8 sm:pl-10">
            {EXPERIENCE.map((exp, i) => (
              <Reveal as="li" key={exp.designation} delay={i * 90} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.28rem] top-2 h-2.5 w-2.5 border border-primary-glow bg-void sm:-left-[2.78rem]"
                />
                <p className="font-mono text-[0.625rem] uppercase tracking-label text-primary-glow">
                  {exp.phase}
                </p>
                <h3 className="display-3 mt-3 text-[clamp(1.25rem,2.2vw,1.75rem)]">
                  {exp.designation}
                </h3>
                <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
                  {exp.context}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-mute">
                      <span aria-hidden="true" className="mt-px shrink-0 text-faint">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </section>
      </div>

      {/* ——— SELECTED PROJECT EXPERIENCE ——— */}
      <section aria-labelledby="project-experience-heading" className="mt-28 lg:mt-36">
        <SectionHeading
          index="02"
          eyebrow="PROJECT EXPERIENCE"
          title="PROOF, NOT CLAIMS."
          supporting="Every engagement below is documented in the portfolio — the case studies show how the work was done."
          id="project-experience-heading"
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {projects.map(({ entry, project }, i) => {
            const p = project as Project;
            const visual = projectVisual(p);
            return (
              <Reveal key={p.slug} delay={(i % 2) * 90}>
                <article className="group flex h-full flex-col bg-panel">
                  <div className="relative aspect-[16/7] overflow-hidden border-b border-line">
                    {visual ? (
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover opacity-90 grayscale transition-all duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.018] group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="bg-engineering flex h-full items-end p-4">
                        <span className="font-mono text-[0.625rem] uppercase tracking-label text-faint">
                          {p.status ?? "DOCUMENTED WORK"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="font-mono text-[0.625rem] uppercase tracking-label text-primary-glow">
                      {entry.role}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-tightest text-paper">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
                      {p.shortDescription ?? p.summary}
                    </p>
                    <Link
                      href={`/work/${p.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-label text-paper transition-colors hover:text-primary-glow"
                    >
                      VIEW CASE STUDY <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ——— TECHNICAL SKILLS ——— */}
      <section aria-labelledby="skills-heading" className="mt-28 lg:mt-36">
        <SectionHeading
          index="03"
          eyebrow="TECHNICAL SKILLS"
          title="THE TOOLKIT."
          id="skills-heading"
        />
        <dl className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal as="div" key={group.label} delay={(i % 3) * 70} className="bg-panel p-7">
              <dt className="eyebrow">{group.label}</dt>
              <dd className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ——— CLOSING ——— */}
      <Reveal className="mt-28 border-t border-line pt-14 lg:mt-36">
        <p className="display-3 max-w-[20ch]">
          THE FULL STORY IS IN
          <br />
          <span className="text-mute">THE WORK ITSELF.</span>
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ResumeDownload />
          <ButtonLink href="/work" variant="ghost">
            VIEW WORK <span aria-hidden="true">→</span>
          </ButtonLink>
          <ButtonLink href="/contact" variant="primary">
            START A PROJECT <span aria-hidden="true">↗</span>
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
