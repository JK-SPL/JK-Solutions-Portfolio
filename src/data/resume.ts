/**
 * Verified professional profile for /resume.
 *
 * CONTENT RULE (same as data/projects.ts): every string here must be
 * traceable to existing repository content. Sources are cited per entry.
 * There are NO verified employer names, employment periods, or education
 * records in this repository, so this file deliberately contains none —
 * the page renders honest phase labels instead of invented dates, and
 * renders no education section at all.
 *
 * A verified PDF resume does not exist yet either. The download UI is
 * driven by `resumePdf.ready`; when the real file is supplied at
 * `resumePdf.href` (under /public), flip the flag — no page changes needed.
 */

export const PROFILE = {
  name: "JK",
  // layout.tsx JSON-LD founder + about page "SYS.JK / 02 — FOUNDER"
  role: "FOUNDER — JK SOLUTIONS",
  positioning: "AI-ASSISTED PRODUCT BUILDER", // layout.tsx JSON-LD jobTitle
  statement: "I BUILD WITH AI. I ENGINEER FOR REAL LIFE.", // data/site.ts
  // Three sentences condensed verbatim in substance from about/page.tsx and site.ts.
  summary:
    "I started where software meets physical reality — infrastructure, networks and systems people depend on. Government IT and e-governance taught me what “it has to work” actually means, and automation turned that into systems that replace manual office workflows. Today I run JK SOLUTIONS — a digital product studio building SaaS, automation and immersive experiences with AI-assisted development, engineered for real life.",
} as const;

export interface ExperiencePhase {
  /** Honest lifecycle label — never an invented year range. */
  phase: string;
  designation: string;
  context: string;
  bullets: string[];
}

/**
 * The professional road documented on /about (TIMELINE + narrative),
 * grouped into the phases that actually have supporting text or projects.
 * Display order: chronological.
 */
export const EXPERIENCE: ExperiencePhase[] = [
  {
    phase: "FOUNDATION",
    designation: "IT OPERATIONS, NETWORKS & SYSTEMS",
    context: "Infrastructure background",
    bullets: [
      "Started where software meets physical reality — infrastructure, networks and systems people depend on.",
      "This is where deployment, migrations, observability and rollback are designed rather than improvised.",
    ],
  },
  {
    phase: "BACKGROUND",
    designation: "GOVERNMENT IT & E-GOVERNANCE",
    context: "Government workflow systems",
    bullets: [
      "Government IT and e-governance taught me what “it has to work” actually means: real users, real data, real consequences.",
      "Digital permit and authorisation workflows — E-Parvana / E-Purvatha Pranali, Supply Department licensing, Sulabh Pranali.",
      "Record retrieval systems — File Search / E-File Finder: answering “where is this file right now?”",
    ],
  },
  {
    phase: "BACKGROUND",
    designation: "AUTOMATION & BUSINESS SYSTEMS",
    context: "Google Workspace application systems",
    bullets: [
      "Replacing manual office workflows with systems people can actually audit.",
      "Business applications on Sheets + Apps Script + HTML + Drive + Gmail — not spreadsheets, applications.",
    ],
  },
  {
    phase: "PRESENT",
    designation: "FOUNDER — JK SOLUTIONS",
    context: "Digital Product Studio",
    bullets: [
      "Building SaaS, automation and immersive digital experiences — SevaDesk and JK Attendance are the flagship products.",
      "The studio runs its own operational work on the platform, so the product is exercised by real usage, not only demonstrated.",
      "AI-assisted development as a documented method: structured prompting, review gates, production discipline.",
    ],
  },
];

/** Capability strip — titles traceable to data/capabilities.ts + /about timeline. */
export const CAPABILITY_TAGS = [
  "DIGITAL EXPERIENCES",
  "BUSINESS SYSTEMS",
  "SAAS PRODUCTS",
  "AUTOMATION",
  "AI-ASSISTED DEVELOPMENT",
  "GOVERNMENT / EGOV SYSTEMS",
  "INFRASTRUCTURE / IT OPERATIONS",
] as const;

/**
 * Technical skill groups. Every item appears in data/capabilities.ts
 * (STACK_LAYERS / capability tags) or a project's `technologies` list.
 */
export const SKILL_GROUPS: Array<{ label: string; items: string[] }> = [
  {
    label: "FRONTEND",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "BACKEND / DATA",
    items: ["Prisma ORM", "PostgreSQL", "Zod"],
  },
  {
    label: "MOTION / CREATIVE",
    items: ["GSAP", "ScrollTrigger", "React Three Fiber", "GLSL / WebGL"],
  },
  {
    label: "AUTOMATION",
    items: ["Google Apps Script", "Google Sheets", "Drive", "Gmail"],
  },
  {
    label: "INFRASTRUCTURE",
    items: ["Vercel", "Prisma Migrate", "Networks", "IT Operations"],
  },
];

/**
 * Selected project experience — slugs resolve against publishedProjects in
 * data/projects.ts, so titles/summaries can never drift from the portfolio.
 */
export const RESUME_PROJECTS: Array<{ slug: string; role: string }> = [
  { slug: "sevadesk", role: "PLATFORM — DESIGN & BUILD" },
  { slug: "jk-attendance", role: "PRODUCT — DESIGN & BUILD" },
  { slug: "chhatrapati-online-service", role: "TENANT CASE — DESIGN & BUILD" },
  { slug: "aaradhya-online-seva-kendra", role: "CASE STUDY — DESIGN & BUILD" },
  { slug: "e-parvana", role: "GOVERNMENT WORKFLOW SYSTEM" },
  { slug: "google-workspace-systems", role: "BUSINESS APPLICATION SYSTEMS" },
  { slug: "vibe-coding-experiments", role: "AI / METHOD R&D" },
  { slug: "3d-motion-experiments", role: "MOTION R&D" },
];

/**
 * Download configuration. No verified PDF exists in the repository yet, so
 * `ready` is false: the UI renders the button, and on activation it shows an
 * honest "final verified PDF pending" notice instead of a 404. When the real
 * file is placed at public/files/jk-resume.pdf, set ready to true.
 */
export const RESUME_PDF = {
  href: "/files/jk-resume.pdf",
  ready: false,
} as const;
