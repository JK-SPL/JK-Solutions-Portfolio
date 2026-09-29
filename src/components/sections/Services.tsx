"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type CapabilityIcon = "layers" | "building" | "cloud" | "flow" | "spark" | "wrench";

interface Capability {
  n: string;
  title: string;
  desc: string;
  longDesc: string;
  icon: CapabilityIcon;
  tags: string[];
  examples: string[];
}

/** Stroke-based glyph set — one visual language across all six capabilities. */
const ICON_PATHS: Record<CapabilityIcon, string> = {
  layers: "M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5",
  building: "M4 21V5a1 1 0 011-1h8a1 1 0 011 1v16M14 9h5a1 1 0 011 1v11M2 21h20M7 8h2m-2 4h2m-2 4h2",
  cloud: "M7 18a4 4 0 01-.5-7.97A5.5 5.5 0 0117.3 8.6 4.5 4.5 0 0117 18H7z",
  flow: "M4 6h10m0 0l-3-3m3 3l-3 3M20 18H10m0 0l3-3m-3 3l3 3M12 12h4",
  spark: "M12 2v4m0 12v4M2 12h4m12 0h4M5.6 5.6l2.8 2.8m7.2 7.2l2.8 2.8m0-12.8l-2.8 2.8M8.4 15.6l-2.8 2.8",
  wrench: "M14.7 6.3a4 4 0 105.66 5.66L22 10.34 20.66 9l-1.5 1.5-2.12-2.12L18.54 7 17 5.34 14.7 6.3zM14.7 6.3L8 13l-3 4 4 3 6.7-6.7",
};

function CapabilityGlyph({ name }: { name: CapabilityIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7 flex-shrink-0 text-primary-glow"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const CAPABILITIES: Capability[] = [
  {
    n: "01",
    title: "DIGITAL EXPERIENCES",
    desc: "Cinematic websites and interfaces — editorial typography, engineered motion, real performance budgets.",
    longDesc: "Not marketing pages — digital products. Every pixel serves the user's task. Type scales fluidly. Motion respects prefers-reduced-motion. 3D/WebGL only where it adds value. Performance budgets enforced per route.",
    icon: "layers",
    tags: ["Next.js", "GSAP", "R3F", "Tailwind", "TypeScript"],
    examples: ["JK Solutions Portfolio", "Chhatrapati Online Service", "Lab experiments"],
  },
  {
    n: "02",
    title: "BUSINESS SYSTEMS",
    desc: "CRM, bookings, attendance, records — the unglamorous software a business actually runs on.",
    longDesc: "One tenant gets a public website, CRM, customer and booking management, announcements, employee records and attendance — all connected. Multi-tenant architecture means every business gets its own instance with shared core.",
    icon: "building",
    tags: ["Multi-tenant", "Prisma", "PostgreSQL", "RBAC", "Real-time"],
    examples: ["SevaDesk (platform)", "JK Attendance", "Chhatrapati tenant"],
  },
  {
    n: "03",
    title: "SAAS PRODUCTS",
    desc: "Multi-tenant platforms designed from day one for many businesses, not one deployment.",
    longDesc: "Shared infrastructure, isolated data, per-tenant customization. Feature flags, usage metering, billing-ready. Built on the same stack that runs the portfolio — dogfooded from day one.",
    icon: "cloud",
    tags: ["Architecture", "Feature flags", "Metering", "Isolation", "Vercel"],
    examples: ["SevaDesk", "JK Attendance", "Future products"],
  },
  {
    n: "04",
    title: "AUTOMATION",
    desc: "Manual office workflows replaced with reliable, observable systems — including Google Workspace stacks.",
    longDesc: "Sheets as database, Apps Script as backend, HTML Service as UI, Drive for files, Gmail for comms. Not spreadsheets — applications. Practical business software on infrastructure the org already owns.",
    icon: "flow",
    tags: ["Apps Script", "Google Sheets", "Drive", "Gmail", "Workflows"],
    examples: ["E-Parvana", "Sulabh Pranali", "Supply Licensing", "File Search"],
  },
  {
    n: "05",
    title: "AI",
    desc: "AI-assisted development and AI features inside products — directed by engineering judgement, not hype.",
    longDesc: "Prompt-to-architecture workflow. Structured briefs → data models → AI implementation → human review → test → deploy. AI features in products are bounded, observable, and fail gracefully. No black boxes.",
    icon: "spark",
    tags: ["Vibe coding", "Structured prompts", "Review gates", "Observability", "Fallbacks"],
    examples: ["This portfolio", "SevaDesk features", "Lab experiments"],
  },
  {
    n: "06",
    title: "INFRASTRUCTURE",
    desc: "A background in IT operations, networks and government systems — deployed to keep products running.",
    longDesc: "Edge functions, observability, migrations, rollback plans, feature flags, real-time logs. The stack is boring on purpose — so the product can be exceptional. Vercel primitives, not custom infra.",
    icon: "wrench",
    tags: ["Vercel Edge", "Prisma Migrate", "Sentry", "Logs", "Feature flags"],
    examples: ["All deployments", "Monitoring", "Incident response"],
  },
] as const;

export function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section aria-labelledby="services" className="shell py-24 sm:py-36">
      <Reveal>
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-glow" aria-hidden="true" />
          CAPABILITIES
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display-2 max-w-[24ch]">WHAT I CAN BUILD FOR YOU.</h2>
      </Reveal>
      <Reveal delay={160}>
        <p className="lead mt-6 max-w-[52ch]">
          Six disciplines. One engineering core. Every capability is a system I've shipped — not a service I sell.
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <article
              key={c.n}
              className={cn(
                "relative bg-void p-6 sm:p-8 transition-colors duration-300 overflow-hidden",
                expanded === c.n ? "bg-primary/5 border-l-2 border-primary-glow" : "hover:bg-panel"
              )}
            >
              {/* Number badge */}
              <p className="font-mono text-[0.625rem] tracking-label text-primary-glow mb-4">
                {c.n}
              </p>

              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">
                <CapabilityGlyph name={c.icon} />
                <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-paper flex-1 min-w-0">
                  {c.title}
                </h3>
              </div>

              {/* Short description */}
              <p className="text-sm sm:text-base leading-relaxed text-mute mb-4 line-clamp-3">
                {c.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label={`${c.title} technologies`}>
                {c.tags.map((tag) => (
                  <span key={tag} className="chip border-line text-mute hover:border-faint hover:text-paper transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expand trigger */}
              <button
                type="button"
                onClick={() => setExpanded(expanded === c.n ? null : c.n)}
                aria-expanded={expanded === c.n}
                className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint hover:text-primary-glow transition-colors"
              >
                {expanded === c.n ? "LESS" : "MORE"}
                <span className="transition-transform duration-300" style={{ transform: expanded === c.n ? "rotate(180deg)" : "rotate(0deg)" }}>
                  ▼
                </span>
              </button>

              {/* Expanded content */}
              {expanded === c.n && (
                <div className="mt-6 border-t border-line pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm leading-relaxed text-mute mb-4">{c.longDesc}</p>
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-label text-faint mb-2">SHIPPED EXAMPLES</p>
                    <ul className="space-y-1.5" role="list">
                      {c.examples.map((ex) => (
                        <li key={ex} className="flex items-center gap-2 text-sm text-mute">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-glow/60" aria-hidden="true" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal delay={320}>
        <div className="mt-20 flex items-center justify-center gap-6 border-t border-line pt-12">
          <Link
            href="/contact" data-lit
            className="border border-primary-glow/60 bg-primary/10 px-8 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-primary/25"
          >
            Start a Project ↗
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

