/**
 * Canonical capability + stack content.
 *
 * These two lists were previously inlined in `Services` and `TechStack`. They
 * are extracted here so the homepage, the `/capabilities` page and any future
 * CMS all read from one place.
 *
 * CONTENT RULE: examples must be projects that actually exist in
 * `data/projects.ts`. No aspirational services, no capabilities claimed but
 * never exercised.
 */

export interface Capability {
  id: string;
  number: string;
  title: string;
  /** One line — the plain description. */
  lead: string;
  /** The longer editorial paragraph. */
  body: string;
  /** Concrete deliverables, phrased as things actually produced. */
  delivers: string[];
  /** Slugs of real projects that demonstrate this capability. */
  proof: string[];
  tags: string[];
}

export const CAPABILITIES: readonly Capability[] = [
  {
    id: "digital-experiences",
    number: "01",
    title: "DIGITAL EXPERIENCES",
    lead: "Websites and interfaces built to a performance budget, not to a mood board.",
    body: "Not marketing pages — digital products. Type scales fluidly, motion respects prefers-reduced-motion, and 3D is used only where it earns its weight. Every route ships with a real loading and interaction budget rather than an assumption.",
    delivers: [
      "Multi-page and long-form editorial sites",
      "Responsive layout down to real small phones",
      "Scroll-led motion with reduced-motion fallbacks",
      "Image and video pipelines with posters and lazy loading",
    ],
    proof: ["aaradhya-online-seva-kendra", "chhatrapati-online-service"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "ScrollTrigger"],
  },
  {
    id: "business-systems",
    number: "02",
    title: "BUSINESS SYSTEMS",
    lead: "The unglamorous software a business actually runs its day on.",
    body: "CRM, bookings, customers, documents, employees, shifts and attendance — connected rather than siloed. One tenant gets a public website and a back office that share the same data, so an enquiry on the site is the same record the staff work from.",
    delivers: [
      "CRM — leads, customers, enquiries, follow-ups",
      "Booking and appointment management",
      "Document tracking and status transitions",
      "Employee records, shifts, leave and attendance",
    ],
    proof: ["sevadesk", "jk-attendance", "chhatrapati-online-service"],
    tags: ["PostgreSQL", "Prisma", "Role-based access", "Multi-tenant", "Reporting"],
  },
  {
    id: "saas-products",
    number: "03",
    title: "SAAS PRODUCTS",
    lead: "Multi-tenant platforms designed for many businesses from the first migration.",
    body: "Shared infrastructure, isolated data, per-tenant configuration. Tenancy is a data-layer decision made before features, not an afterthought bolted on later. The same platform code dogfoods itself — it runs the studio's own operational surface.",
    delivers: [
      "Multi-tenant isolation enforced per request",
      "Owner-authored CMS with a tolerant read path",
      "Per-tenant theming and configuration",
      "Billing- and metering-ready data model",
    ],
    proof: ["sevadesk", "jk-attendance"],
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tenancy isolation", "Edge deployment"],
  },
  {
    id: "automation",
    number: "04",
    title: "AUTOMATION",
    lead: "Manual office workflows replaced with systems people can actually audit.",
    body: "Google Workspace stacks where Sheets is the database, Apps Script is the backend, the HTML service is the interface, Drive is storage and Gmail is the channel — plus full-stack equivalents for teams that outgrew that. Not spreadsheets: applications.",
    delivers: [
      "Google Sheets + Apps Script business applications",
      "Search and retrieval across record collections",
      "Permit, licensing and approval workflows",
      "Notification and escalation automation",
    ],
    proof: [
      "google-workspace-systems",
      "e-parvana",
      "e-file-finder",
      "supply-licensing",
      "sulabh-pranali",
    ],
    tags: ["Google Apps Script", "Google Sheets", "Drive", "Gmail", "Workflow automation"],
  },
  {
    id: "ai",
    number: "05",
    title: "AI",
    lead: "AI inside the build method, and inside products only where it stays observable.",
    body: "The ten-stage workflow in `data/process.ts` is an AI-assisted method with human review gates. In products, AI features are bounded, observable and fail gracefully — there is no step in this portfolio that depends on an opaque model call succeeding.",
    delivers: [
      "Prompt-to-architecture development workflow",
      "AI-assisted implementation with review gates",
      "Bounded AI features with fallbacks",
      "Structured briefs with acceptance criteria",
    ],
    proof: ["vibe-coding-experiments", "sevadesk"],
    tags: ["Structured prompting", "Review gates", "Observability", "Graceful fallback"],
  },
  {
    id: "infrastructure",
    number: "06",
    title: "INFRASTRUCTURE",
    lead: "The background that keeps products running when everything else is interesting.",
    body: "IT operations, networks and government systems are where 'it has to work' is learned — real users, real data, real consequences. That background is why deployment, migrations, observability and rollback are designed here rather than improvised.",
    delivers: [
      "Deployment, migration and rollback planning",
      "Environment and configuration management",
      "Uptime, logging and incident response",
      "Network and systems administration",
    ],
    proof: ["google-workspace-systems", "supply-licensing", "e-parvana"],
    tags: ["Vercel Edge", "Prisma Migrate", "Observability", "Networks", "Incident response"],
  },
] as const;

export interface StackLayer {
  id: string;
  label: string;
  items: string[];
  detail: string;
}

export const STACK_LAYERS: readonly StackLayer[] = [
  {
    id: "runtime",
    label: "RUNTIME",
    items: ["Next.js 15", "React 19", "TypeScript 5.7"],
    detail:
      "App Router, Server Components and streaming, with types carried end to end from the data layer into the view — so content changes are compile errors rather than runtime surprises.",
  },
  {
    id: "styling",
    label: "STYLING",
    items: ["Tailwind CSS 3.4", "CSS Variables", "Design Tokens"],
    detail:
      "Zero-runtime styling over a token-first CSS variable layer. Colour, spacing, radius, duration and easing are defined once, so theme, density and motion are controlled from a single place.",
  },
  {
    id: "motion",
    label: "MOTION",
    items: ["GSAP 3.13", "ScrollTrigger", "Reduced-motion gates"],
    detail:
      "One motion vocabulary shared across the site: three durations, one easing pair, scroll-led where it carries narrative. Every timeline is gated behind prefers-reduced-motion, so motion is enhancement rather than a requirement.",
  },
  {
    id: "data",
    label: "DATA",
    items: ["Prisma ORM", "PostgreSQL", "Typed content layer"],
    detail:
      "Schema-first and typed end to end. Project, capability and navigation content are structured data mapping 1:1 onto a future CMS, which is why no component hardcodes portfolio copy.",
  },
  {
    id: "3d",
    label: "3D / WEBGL",
    items: ["React Three Fiber", "Drei", "GLSL shaders"],
    detail:
      "Declarative canvas where it genuinely adds value, always inside a performance budget with a static fallback first. Used to carry an idea, never as decoration on top of a page that already works.",
  },
  {
    id: "infrastructure",
    label: "INFRASTRUCTURE",
    items: ["Vercel Edge", "Prisma Migrate", "Observability"],
    detail:
      "Global edge deployment with planned migrations, feature flags and real logs. Boring infrastructure on purpose — it is what lets the product be the interesting part.",
  },
] as const;

export interface StackPrinciple {
  id: string;
  title: string;
  detail: string;
}

export const STACK_PRINCIPLES: readonly StackPrinciple[] = [
  {
    id: "token-first",
    title: "TOKEN-FIRST ARCHITECTURE",
    detail:
      "Every colour, space, radius, duration and easing lives in CSS variables. No magic values in components, so a visual change is a token change rather than a search across the codebase.",
  },
  {
    id: "typed-content",
    title: "TYPED CONTENT LAYER",
    detail:
      "Projects, capabilities and navigation are typed data structures shaped like a future CMS. Adding a project means adding one entry, not building a new portfolio surface.",
  },
  {
    id: "motion-language",
    title: "SINGLE MOTION VOCABULARY",
    detail:
      "One set of easings, durations and staggers across the whole site. Choreography, not decoration — motion exists to explain a change of state or carry a narrative.",
  },
  {
    id: "reduced-motion",
    title: "PREFERS-REDUCED-MOTION NATIVE",
    detail:
      "Every scroll trigger and CSS animation respects the media query from the first commit, not as a later patch. The content is complete and readable with motion switched off.",
  },
  {
    id: "performance-budget",
    title: "PERFORMANCE BUDGET ENFORCED",
    detail:
      "Media is transcoded and postered, video preloads nothing, canvas lazy-loads, and images are sized per breakpoint. The budget is the reason the pages feel calm on a mid-range phone.",
  },
  {
    id: "honest-content",
    title: "HONEST CONTENT, ALWAYS",
    detail:
      "Status is labelled truthfully — prototype, demo tenant, experiment, concept. A project without verified media renders an honest empty state instead of a stock screenshot, because a portfolio that lies about its own work is not a portfolio.",
  },
] as const;
