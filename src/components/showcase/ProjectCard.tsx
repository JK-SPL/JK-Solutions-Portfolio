"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { cn } from "@/lib/utils";
import { showcaseFrames } from "@/lib/showcase";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "default" | "featured" | "compact";
}

export function ProjectCard({ project, index, variant = "default" }: ProjectCardProps) {
  const frames = showcaseFrames(project, 2);
  const lead = frames[0];

  if (variant === "compact") {
    return (
      <Link
        href={`/work/${project.slug}`}
        data-lit
        data-lit-media
        className="group flex items-center gap-4 rounded border border-line bg-panel p-4 transition-colors duration-300 hover:border-primary-glow/40 hover:bg-void"
      >
        <div className="shrink-0 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-primary-glow">
          {project.categories[0]}
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold tracking-tight text-paper group-hover:text-primary-glow transition-colors">
            {project.title}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-mute line-clamp-1">
            {project.shortDescription ?? project.summary}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Reveal as="li" delay={Math.min(index * 60, 240)}>
      <Link
        href={`/work/${project.slug}`}
        data-lit
        data-lit-media
        className={cn(
          "group block overflow-hidden border border-line bg-panel transition-all duration-[var(--dur)] hover:border-primary-glow/40 hover:bg-void",
          variant === "featured" ? "lg:col-span-6" : "lg:col-span-4"
        )}
      >
        {/* Media */}
        <div className="relative overflow-hidden">
          {lead ? (
            <ProjectMediaFrame
              media={lead}
              priority={false}
              sizes={variant === "featured" ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              scrim={true}
            />
          ) : (
            <div className="aspect-[16/10] bg-engineering flex items-center justify-center">
              <span className="font-mono text-[0.625rem] uppercase tracking-label text-faint">
                {project.projectType ?? project.categories.join(" / ")}
              </span>
            </div>
          )}
          {/* Status badge */}
          {project.status && (
            <span className="absolute left-3 top-3 chip border-primary-glow/40 bg-primary/15 text-paper text-[0.5rem]">
              {project.status}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6">
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
          <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-paper group-hover:text-primary-glow shadow-subtle transition-colors duration-300 sm:text-xl">
            {project.title}
          </h3>
          {project.year ? (
            <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">{project.year}</p>
          ) : null}
          <p className="mt-2 text-sm leading-relaxed text-mute shadow-subtle line-clamp-2">
            {project.shortDescription ?? project.summary}
          </p>

          {/* Technologies */}
          {project.technologies?.length ? (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((t) => (
                <li key={t} className="chip text-[0.5625rem]">{t}</li>
              ))}
            </ul>
          ) : null}

          {/* CTA arrow */}
          <div className="mt-5 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors group-hover:text-paper">
            View case study
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
