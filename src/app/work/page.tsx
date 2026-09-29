import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsIndex } from "@/components/sections/ProjectsIndex";
import { ProjectCard } from "@/components/showcase/ProjectCard";
import { publishedProjects } from "@/data/projects";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

function WorkIndexFallback() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded bg-line" />
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Work",
  description: "Real systems. Real experiments. Real problems solved. — Portfolio of digital products, engineering, and creative work by JK SOLUTIONS.",
};

export default function WorkPage() {
  const flagships = publishedProjects.filter((p) => p.flagship);
  const featuredNonFlagship = publishedProjects.filter((p) => p.featured && !p.flagship);

  return (
    <div>
      {/* ——— CINEMATIC HERO ——— */}
      <section className="relative overflow-hidden border-b border-line bg-void">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-[60rem] w-[60rem] rounded-full bg-primary/8 blur-[160px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full bg-electric/6 blur-[120px]"
        />
        <div className="shell pt-24 sm:pt-32 pb-16 sm:pb-24">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-glow" aria-hidden="true" />
              PORTFOLIO — 01
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-1 max-w-[24ch] text-balance">THINGS I'VE BUILT.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead mt-8 max-w-[48ch]">
              Real systems. Real experiments. Real problems solved. Every
              entry opens a case study — from flagship products to verified
              engineering work.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-5">
              <ButtonLink href="/work">View all work</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">Start a project</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-6 border-t border-line pt-8">
              <div>
                <span className="font-mono text-2xl font-semibold tracking-tightest text-paper">
                  {publishedProjects.length}
                </span>
                <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">Projects</p>
              </div>
              <div>
                <span className="font-mono text-2xl font-semibold tracking-tightest text-paper">
                  {publishedProjects.filter((p) => p.liveUrl).length}
                </span>
                <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">Live Systems</p>
              </div>
              <div>
                <span className="font-mono text-2xl font-semibold tracking-tightest text-paper">
                  {flagships.length}
                </span>
                <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">Flagships</p>
              </div>
              <div>
                <span className="font-mono text-2xl font-semibold tracking-tightest text-paper">
                  {publishedProjects.filter((p) => p.media && p.media.length > 0).length}
                </span>
                <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">With Media</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— FLAGSHIP PROJECTS ——— */}
      {flagships.length > 0 && (
        <section aria-labelledby="flagships" className="border-b border-line">
          <div className="shell pt-24 sm:pt-28 pb-12 sm:pb-16">
            <Reveal>
              <div className="mb-14 flex items-center gap-4">
                <span className="font-mono text-[0.6875rem] tracking-label text-primary-glow">02</span>
                <span className="eyebrow">FLAGSHIP</span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
              {flagships.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ——— FEATURED (non-flagship) ——— */}
      {featuredNonFlagship.length > 0 && (
        <section aria-labelledby="featured" className="border-b border-line">
          <div className="shell pt-24 sm:pt-28 pb-12 sm:pb-16">
            <Reveal>
              <div className="mb-14 flex items-center gap-4">
                <span className="font-mono text-[0.6875rem] tracking-label text-electric">03</span>
                <span className="eyebrow">FEATURED</span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredNonFlagship.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ——— ALL PROJECTS ——— */}
      <section aria-labelledby="selected-work" className="shell pt-24 sm:pt-28 pb-28">
        <Suspense fallback={<WorkIndexFallback />}>
          <ProjectsIndex />
        </Suspense>
      </section>
    </div>
  );
}
