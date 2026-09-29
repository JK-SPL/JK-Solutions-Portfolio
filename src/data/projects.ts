/**
 * Typed content layer for the JK SOLUTIONS project universe.
 *
 * Shape maps 1:1 onto a future Prisma/CMS model — no UI component hardcodes
 * project content. Adding a future tenant means adding one entry here, not
 * building a new portfolio surface.
 *
 * CONTENT RULE: every string below must be traceable to the real system.
 * No invented metrics, outcomes, testimonials, awards or client counts.
 * Where a number is a structural fact (routes, models, seeded entries) it is
 * labelled as such; where a figure is not verified, the field is left unset
 * and the case-study page renders an honest "in preparation" state instead.
 *
 * ARRAY ORDER IS DISPLAY ORDER — `work` and the homepage selected-work list
 * both render `publishedProjects` in the sequence defined below.
 */

export type ProjectCategory =
  | "AI / VIBE CODING"
  | "SAAS"
  | "BUSINESS SYSTEMS"
  | "GOVERNMENT"
  | "AUTOMATION"
  | "GOOGLE APPS SCRIPT"
  | "WEB"
  | "3D / MOTION"
  | "LAB";

export const PROJECT_CATEGORIES: Array<"ALL" | ProjectCategory> = [
  "ALL",
  "AI / VIBE CODING",
  "SAAS",
  "BUSINESS SYSTEMS",
  "GOVERNMENT",
  "AUTOMATION",
  "GOOGLE APPS SCRIPT",
  "WEB",
  "3D / MOTION",
  "LAB",
];

/**
 * Honest lifecycle label. Internal/demo work is never dressed up as a
 * delivered client engagement.
 */
export type ProjectStatus = "LIVE" | "IN BUILD" | "PROTOTYPE" | "DEMO TENANT" | "CONCEPT";

/**
 * Which editorial module a visual belongs to.
 *
 * `brand` and `reference` are explicitly *not* showcase material: a brand mark
 * is a ~5:1 logo that reads as cropped giant text inside a 21:9 frame, and a
 * `reference` entry is design-reference art (unlabelled chart components) that
 * must never be presented as a capture of the running system. Both stay in the
 * case-study gallery; neither may lead a homepage showcase frame.
 */
export type MediaSlot =
  | "hero"
  | "gallery"
  | "mobile"
  | "dashboard"
  | "brand"
  | "ad"
  | "reference";

export type MediaAspect =
  | "21/9"
  | "5/1"
  | "16/9"
  | "3/2"
  | "4/3"
  | "1/1"
  | "4/5"
  | "3/4"
  | "2/3"
  | "9/16";

/**
 * Reusable media model so any future tenant can supply
 * hero / gallery / screenshots / videos without a new component.
 *
 * `width` / `height` are the real intrinsic pixel dimensions of the file. They
 * are declared rather than guessed so `next/image` can reserve layout space
 * before the asset loads — the single biggest cause of layout shift on a
 * media-heavy page. `aspect` is the CSS crop bucket the frame renders into,
 * which is deliberately not always the file's own ratio: a full-page capture
 * is a 1:4 asset shown in a 9:16 frame via `object-position: top`.
 */
export interface ProjectMedia {
  kind: "image" | "video";
  /** Path under /public. */
  src: string;
  /** Still frame for `kind: "video"`. */
  poster?: string;
  /** Intrinsic size of `src` (or of `poster` for a video), in pixels. */
  width: number;
  height: number;
  /** Meaningful alternative text — required, never empty. */
  alt: string;
  caption?: string;
  aspect: MediaAspect;
  /** CSS `object-position`, for art-directed crops. */
  focal?: string;
  slot?: MediaSlot;
}

/**
 * A metric is a verifiable project fact — a route count, a seeded entry
 * count, a model count. Never a business outcome.
 */
export interface ProjectMetric {
  label: string;
  value: string;
  note?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  categories: ProjectCategory[];

  /** For a tenant/client build, the business the system was built for. */
  clientName?: string;
  /** e.g. "Business Website + CRM + Bookings + Workforce". */
  projectType?: string;
  status?: ProjectStatus;
  year?: string;
  /**
   * Why there is no "Visit live project" link, when there isn't one.
   * Rendered verbatim so an honest gap is never mistaken for an omission.
   */
  liveNote?: string;

  /** One-line editorial summary — factual only. */
  summary: string;
  /** Slightly longer one-liner for dense card layouts. */
  shortDescription?: string;
  /** Extended description paragraphs. Empty until real content is supplied. */
  description: string[];
  problem?: string;
  solution?: string;
  architecture?: string[];
  features?: string[];
  technologies?: string[];
  buildProcess?: string[];

  /** Citizen/visitor-facing surface. */
  customerExperience?: string[];
  /** Staff/operator-facing surface. */
  adminExperience?: string[];
  capabilities?: string[];
  integrations?: string[];

  metrics?: ProjectMetric[];
  testimonial?: { quote: string; attribution: string };

  liveUrl?: string;
  githubUrl?: string;
  /** Media paths under /public — only real captured media. */
  gallery?: string[];
  media?: ProjectMedia[];
  /**
   * Advertisement and promotional creative produced for this project.
   * Rendered by `<AdGallery>`. Every entry is a real produced file —
   * nothing here is a stock visual or a stand-in.
   */
  creatives?: ProjectMedia[];

  /** One honest sentence about what is not yet documented. */
  pendingNote?: string;

  featured: boolean;
  flagship: boolean;
  /** True when exact implementation details are awaiting real content. */
  pendingContent: boolean;
  published: boolean;
}

/* ————————————————————————————————————————————————————————————
   01 — SevaDesk (the platform everything else runs on)
   ———————————————————————————————————————————————————————————— */

const SEVADESK: Project = {
  id: "sevadesk",
  title: "SevaDesk",
  slug: "sevadesk",
  categories: ["SAAS", "BUSINESS SYSTEMS", "WEB"],
  status: "LIVE",
  year: "2026",
  projectType: "Multi-tenant business operating platform",
  summary:
    "Flagship multi-tenant business operating platform — website, CRM, customers, bookings, employees and attendance connected in one system.",
  shortDescription:
    "The platform: a public site and a full back office sharing one data model.",
  description: [
    "SevaDesk is built around a single idea: a small business should not need five disconnected tools to run its day. One tenant gets a public website, a CRM, customer and booking management, announcements, employee records and attendance — all connected.",
    "Tenancy is enforced at the data layer and re-checked per request rather than trusted from the URL. The owner surface, the employee surface and the public tenant site are one application and one database, separated by authorisation checks instead of by deployment.",
    "The studio runs its own operational work on the platform, so the product is exercised by real usage rather than only demonstrated.",
  ],
  problem:
    "A service business ends up with a website that takes enquiries, a spreadsheet for customers, a diary for bookings, and a register for staff. None of them agree with each other, so every handover loses information and no one can answer \"what is actually outstanding?\".",
  solution:
    "One data model behind every surface. An enquiry raised on the public site is the same record the owner triages in the CRM; a booking is the same record the staff prepare for; attendance references the same employee record. Modules share tenancy and roles rather than being integrated later.",
  architecture: [
    "Public tenant site at /b/{slug}",
    "Tenant website, catalogue, booking and enquiry intake",
    "CRM — leads, customers, enquiries, follow-ups, tasks",
    "Bookings, documents, applications and escalations",
    "Workforce — employees, shifts, leave, holidays, attendance",
    "Owner surface at /owner/{slug}, employee surface alongside",
    "One Next.js app and one PostgreSQL database, separated by tenancy checks",
  ],
  customerExperience: [
    "Public business website and service catalogue",
    "Service search and booking requests",
    "Announcements and updates",
    "Application and document status by token",
  ],
  adminExperience: [
    "Owner dashboard",
    "CRM — leads, customers, enquiries, follow-ups, tasks",
    "Bookings and appointments",
    "Document review and status transitions",
    "Employee records, shifts, leave and attendance",
    "Transactions, reports and analytics",
    "Website block editor",
    "Team, notifications, settings",
  ],
  capabilities: [
    "Multi-tenant isolation re-checked per request",
    "Owner-authored CMS with a tolerant read path and a strict write path",
    "Per-tenant visual identity as a token object",
    "Server-resolved language so the first paint is already correct",
  ],
  integrations: [
    "WhatsApp outbound — booking notifications via an OpenWA instance",
    "WhatsApp inbound — gateway webhook, HMAC-SHA256 signed, timing-safe, fail-closed",
    "Transactional email via Resend",
  ],
  features: [
    "Multi-tenant architecture",
    "Business website per tenant",
    "CRM — leads, customers, communication",
    "Bookings and service management",
    "Announcements",
    "Employee records and attendance",
    "Owner dashboard per tenant",
  ],
  technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "GSAP"],
  media: [
    {
      kind: "image",
      src: "/work/sevadesk/ads/spot-desk-operator.jpg",
      width: 1280,
      height: 720,
      alt: "SevaDesk advertisement — an operator working at a computer",
      caption: "Horizontal campaign spot — poster frame.",
      aspect: "16/9",
      slot: "ad",
    },
    {
      kind: "image",
      src: "/brand/powered-by-sevadesk.png",
      width: 1000,
      height: 190,
      alt: "Powered by SevaDesk brand mark",
      aspect: "5/1",
      slot: "brand",
    },
    {
      kind: "image",
      src: "/work/sevadesk/charts/kpi-bar-chart.png",
      width: 1200,
      height: 620,
      alt: "SevaDesk key performance indicator bar chart asset",
      caption: "Reporting assets from the owner dashboard kit.",
      aspect: "21/9",
      slot: "reference",
    },
    {
      kind: "image",
      src: "/work/sevadesk/charts/kpi-trend-chart.png",
      width: 1200,
      height: 620,
      alt: "SevaDesk key performance indicator trend chart asset",
      aspect: "21/9",
      slot: "reference",
    },
    {
      kind: "image",
      src: "/work/sevadesk/charts/kpi-donut.png",
      width: 1200,
      height: 620,
      alt: "SevaDesk key performance indicator donut chart asset",
      aspect: "21/9",
      slot: "reference",
    },
    {
      kind: "image",
      src: "/work/sevadesk/charts/kpi-progress.png",
      width: 1200,
      height: 620,
      alt: "SevaDesk key performance indicator progress chart asset",
      aspect: "21/9",
      slot: "reference",
    },
  ],
  creatives: [
    {
      kind: "video",
      src: "/work/sevadesk/ads/reel-ad-man.mp4",
      poster: "/work/sevadesk/ads/reel-ad-man.jpg",
      width: 1280,
      height: 2276,
      alt: "SevaDesk vertical advertisement — a business owner represented through the platform",
      caption: "Vertical campaign reel.",
      aspect: "9/16",
      slot: "ad",
    },
    {
      kind: "video",
      src: "/work/sevadesk/ads/reel-ad-woman.mp4",
      poster: "/work/sevadesk/ads/reel-ad-woman.jpg",
      width: 1280,
      height: 2276,
      alt: "SevaDesk vertical advertisement — a business owner running operations on the platform",
      caption: "Vertical campaign reel.",
      aspect: "9/16",
      slot: "ad",
    },
    {
      kind: "video",
      src: "/work/sevadesk/ads/reel-business-os.mp4",
      poster: "/work/sevadesk/ads/reel-business-os.jpg",
      width: 1280,
      height: 2276,
      alt: "SevaDesk advertisement — an entrepreneur using the JK business operating system",
      caption: "Campaign reel.",
      aspect: "9/16",
      slot: "ad",
    },
    {
      kind: "video",
      src: "/work/sevadesk/ads/reel-feature-showcase.mp4",
      poster: "/work/sevadesk/ads/reel-feature-showcase.jpg",
      width: 1280,
      height: 2276,
      alt: "SevaDesk advertisement — product feature showcase",
      caption: "Feature showcase reel.",
      aspect: "9/16",
      slot: "ad",
    },
    {
      kind: "video",
      src: "/work/sevadesk/ads/reel-3d-dashboard.mp4",
      poster: "/work/sevadesk/ads/reel-3d-dashboard.jpg",
      width: 1280,
      height: 2276,
      alt: "SevaDesk advertisement — a person interacting with a three-dimensional dashboard",
      caption: "Campaign reel.",
      aspect: "9/16",
      slot: "ad",
    },
    {
      kind: "video",
      src: "/work/sevadesk/ads/reel-digital-interface.mp4",
      poster: "/work/sevadesk/ads/reel-digital-interface.jpg",
      width: 1280,
      height: 2276,
      alt: "SevaDesk advertisement — a person interacting with a digital interface",
      caption: "Campaign reel.",
      aspect: "9/16",
      slot: "ad",
    },
    {
      kind: "video",
      src: "/work/sevadesk/ads/reel-operating-business.mp4",
      poster: "/work/sevadesk/ads/reel-operating-business.jpg",
      width: 1280,
      height: 2276,
      alt: "SevaDesk advertisement — a person operating a digital business",
      caption: "Campaign reel.",
      aspect: "9/16",
      slot: "ad",
    },
    {
      kind: "video",
      src: "/work/sevadesk/ads/spot-desk-operator.mp4",
      poster: "/work/sevadesk/ads/spot-desk-operator.jpg",
      width: 1280,
      height: 720,
      alt: "SevaDesk horizontal advertisement — an operator working at a computer",
      caption: "Horizontal spot.",
      aspect: "16/9",
      slot: "ad",
    },
  ],
  liveNote:
    "There is no public self-service sign-up to link to yet — access is provisioned per tenant. A public product URL is added the moment self-service onboarding ships.",
  featured: true,
  flagship: true,
  pendingContent: false,
  published: true,
};

/* ————————————————————————————————————————————————————————————
   02 — JK Attendance
   ———————————————————————————————————————————————————————————— */

const JK_ATTENDANCE: Project = {
  id: "jk-attendance",
  title: "JK Attendance",
  slug: "jk-attendance",
  categories: ["SAAS", "BUSINESS SYSTEMS", "AUTOMATION"],
  status: "LIVE",
  year: "2026",
  projectType: "Workforce attendance platform",
  summary:
    "Workforce attendance platform built around GPS, geofence and selfie verification — for real field conditions, not ideal ones.",
  shortDescription: "Attendance that holds up when the team is not sitting in one office.",
  description: [
    "JK Attendance rethinks attendance for teams that are not sitting in one office. Location-aware check-in, geofenced worksites and selfie verification replace paper registers and trust-based reporting.",
    "It shares the SevaDesk workforce and tenancy core rather than re-implementing it — employees, shifts, leave and holidays are the same records, so attendance data joins the rest of the business picture instead of living in a separate tool.",
  ],
  problem:
    "A paper register can be filled in by someone who is not there. GPS-only check-in punishes staff who legitimately move between sites, and neither approach produces data a manager can actually use for payroll or disputes.",
  solution:
    "Combine three independent signals — geofenced location, selfie capture, and shift assignment — and treat a check-in as valid only when they agree. Managers get reports built from the same employee records the rest of the business uses.",
  features: [
    "GPS-based check-in",
    "Geofenced worksites",
    "Selfie verification",
    "Employee and admin roles",
    "Attendance reports",
  ],
  architecture: [
    "Shift and roster definitions per tenant",
    "Check-in attempt with geofence evaluation",
    "Selfie capture and review state",
    "Attendance ledger as the record managers report from",
    "Shared with the SevaDesk workforce module — one employee record",
  ],
  technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
  pendingNote:
    "Verified product captures for the attendance surface are still being selected from the running system. This page documents the architecture and the model rather than shipping unverified screenshots.",
  featured: true,
  flagship: true,
  pendingContent: true,
  published: true,
};

/* ————————————————————————————————————————————————————————————
   03 — Chhatrapati Online Service (real business on the platform)
   ———————————————————————————————————————————————————————————— */

const CHHATRAPATI: Project = {
  id: "chhatrapati-online-service",
  title: "Chhatrapati Online Service",
  slug: "chhatrapati-online-service",
  categories: ["BUSINESS SYSTEMS", "WEB", "SAAS"],
  status: "DEMO TENANT",
  year: "2026",
  clientName: "Chhatrapati Online Service",
  projectType: "Tenant running its public site and operations on SevaDesk",
  summary:
    "A service business running its website, service catalogue, bookings and operations as a tenant on SevaDesk.",
  shortDescription:
    "The clearest demonstration of what a SevaDesk tenant actually looks like when it is live.",
  description: [
    "Chhatrapati Online Service runs as a tenant on SevaDesk. The public site, the service catalogue, customer bookings, announcements and the back office are one deployment — which is the point: nothing about adding a second business is a new codebase.",
    "It is the reference tenant for the platform. The same tenant model, authorisation checks and CMS surface that power Aaradhya Online Seva Kendra are visible here without any of the prototype caveats.",
  ],
  problem:
    "The value of a multi-tenant platform is only real if a second tenant is genuinely cheap to stand up. Most platform claims turn out to describe one customer with extra configuration.",
  solution:
    "Provision a tenant: identity, catalogue, branding, roles and service list, all as data. Everything else — the site, the booking flow, the CRM, the owner dashboard — is already written and already tested by the first tenant.",
  features: [
    "Public business website",
    "Service catalogue with requirements",
    "Customer booking flow",
    "Announcements",
    "CRM and operations via SevaDesk",
  ],
  architecture: [
    "Tenant provisioning — identity, branding, catalogue, roles",
    "Public site rendered from tenant-owned content",
    "Bookings written to the tenant's own records",
    "Owner surface scoped by tenancy checks on every request",
  ],
  liveUrl: "https://escrm.in/login",
  media: [
    {
      kind: "image",
      src: "/work/chhatrapati/capture-desktop.webp",
      width: 1400,
      height: 2236,
      alt: "Chhatrapati Online Service tenant site at desktop width, captured from the running system",
      caption: "Live tenant — real capture at desktop width.",
      aspect: "3/4",
      focal: "top",
      slot: "hero",
    },
    {
      kind: "image",
      src: "/work/chhatrapati/capture-mobile.webp",
      width: 750,
      height: 1334,
      alt: "Chhatrapati Online Service tenant site at mobile width",
      caption: "The same tenant at mobile width.",
      aspect: "9/16",
      slot: "mobile",
    },
  ],
  featured: true,
  flagship: false,
  pendingContent: false,
  published: true,
};

/* ————————————————————————————————————————————————————————————
   04 — Aaradhya Online Seva Kendra (deepest verified case study)
   ———————————————————————————————————————————————————————————— */

const AARADHYA: Project = {
  id: "aaradhya-online-seva-kendra",
  title: "Aaradhya Online Seva Kendra",
  slug: "aaradhya-online-seva-kendra",
  categories: ["GOVERNMENT", "BUSINESS SYSTEMS", "WEB"],
  clientName: "Aaradhya Online Seva Kendra",
  projectType: "Business Website + Service Discovery + CRM + Bookings + Workforce",
  status: "PROTOTYPE",
  year: "2026",
  summary:
    "A service-first digital experience for a private citizen assistance centre — built as a tenant on the SevaDesk platform, with public service discovery connected to CRM, bookings, document tracking and workforce management.",
  shortDescription:
    "A private digital assistance centre, with a public service catalogue wired to real operations behind it.",
  description: [
    "Aaradhya Online Seva Kendra is a private digital citizen assistance centre in Pimprala, Jalgaon. It is a tenant on the SevaDesk platform: the public site, the CRM, bookings, document tracking and the workforce surface are one system rather than five separate tools.",
    "The centre assists citizens with a defined set of government services — Aadhaar, PAN, voter ID, income and caste certificates, domicile, land records, PM-Kisan, Ladki Bahin and the MahaDBT scholarship — and charges its own transparent assistance fee, always separate from any government fee.",
    "It is a private assistance business. It is not a government body and holds no government approval, certification or authorised-centre status; the platform it runs on makes no such claim either.",
  ],
  problem:
    "A walk-in assistance centre has to explain a large, confusing government-service catalogue to someone who arrived with a problem rather than a document list. The service list lives in people's heads and on government portals, enquiries arrive unstructured, and follow-up on a pending application has no system behind it.",
  solution:
    "The service catalogue was normalised once, platform-wide, and the tenant's own assisted services were layered on top of it with a per-service fee note and bookable flag. A citizen lands on a department → category → service path, reads requirements, books, then tracks. Everything a citizen does lands in the owner's CRM, and the owner's staff surface handles documents, applications and attendance.",
  customerExperience: [
    "Department and category browsing",
    "Service detail with requirements",
    "Service search",
    "Booking with per-service assistance fees",
    "Application tracking by token",
    "Document upload and status",
    "Announcements and updates",
    "Scheme and portal directories",
    "Guidance and contact",
    "Marathi / English, resolved server-side with no hydration flash",
  ],
  adminExperience: [
    "Owner dashboard",
    "CRM — leads, customers, enquiries, follow-ups, tasks",
    "Bookings and appointments",
    "Service catalogue with requirements",
    "Document review and status transitions",
    "Applications and escalations",
    "Announcements",
    "Workforce — employees, shifts, leave, holidays, locations, attendance, live view",
    "Transactions, reports and analytics",
    "Website block editor",
    "Team, notifications, settings",
  ],
  capabilities: [
    "Multi-tenant isolation re-checked per request",
    "Owner-authored CMS with a tolerant read path and a strict write path",
    "Per-category visual identity as a token object, so a new category needs no frontend code",
    "Server-resolved language so the first paint is already correct",
  ],
  integrations: [
    "WhatsApp outbound — booking notifications via an OpenWA instance",
    "WhatsApp inbound — gateway webhook, HMAC-SHA256 signed, timing-safe, fail-closed",
    "Transactional email via Resend",
    "Platform government-service catalogue shared across tenants",
  ],
  architecture: [
    "Citizen → public tenant site at /b/{slug}",
    "Tenant website, booking and enquiry",
    "CRM — leads, customers, enquiries, follow-ups",
    "Documents, applications and escalations",
    "Workforce and attendance",
    "Owner surface at /owner/{slug}, employee surface alongside",
    "All of it one Next.js app and one Postgres database, separated by tenancy checks rather than by deployment",
  ],
  technologies: [
    "Next.js 14",
    "React 18",
    "TypeScript",
    "Prisma 5",
    "PostgreSQL",
    "Zod",
    "Tailwind CSS",
    "GSAP",
    "Resend",
    "OpenWA",
    "Vercel",
  ],
  metrics: [
    { label: "Public pages", value: "19", note: "Route segments under the tenant site" },
    { label: "Owner modules", value: "16", note: "Sections of the owner surface" },
    { label: "Assisted services", value: "12", note: "Tenant service overlays seeded for this centre" },
    { label: "Catalogue", value: "27 / 41 / 71", note: "Departments / categories / services platform-wide" },
  ],
  media: [
    {
      kind: "video",
      src: "/work/aaradhya/video/aaradhya-hero.webm",
      poster: "/work/aaradhya/video-poster.jpg",
      width: 1376,
      height: 768,
      alt: "Aaradhya Online Seva Kendra public website, captured as motion",
      caption: "The public tenant site.",
      aspect: "16/9",
      slot: "hero",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/capture-desktop.webp",
      width: 1425,
      height: 6770,
      alt: "Full Aaradhya Online Seva Kendra homepage captured at desktop width",
      caption: "Homepage, full page — real capture.",
      aspect: "9/16",
      focal: "top",
      slot: "hero",
    },
    {
      kind: "image",
      src: "/work/aaradhya/ui/home.png",
      width: 1901,
      height: 6552,
      alt: "Aaradhya Online Seva Kendra homepage at full desktop width, full page",
      caption: "The built homepage, top to bottom.",
      aspect: "9/16",
      focal: "top",
      slot: "hero",
    },
    {
      kind: "image",
      src: "/work/aaradhya/ui/about.png",
      width: 1920,
      height: 799,
      alt: "Aaradhya Online Seva Kendra about section",
      aspect: "21/9",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/ui/service.png",
      width: 1920,
      height: 799,
      alt: "Aaradhya Online Seva Kendra service catalogue section",
      aspect: "21/9",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/capture-tablet.webp",
      width: 1200,
      height: 1828,
      alt: "Aaradhya Online Seva Kendra tenant site at tablet width",
      caption: "Tablet width.",
      aspect: "3/4",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/capture-mobile-hero.webp",
      width: 750,
      height: 1334,
      alt: "Aaradhya Online Seva Kendra tenant site hero at mobile width",
      caption: "Mobile hero.",
      aspect: "9/16",
      slot: "mobile",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/capture-mobile-mid.webp",
      width: 750,
      height: 1334,
      alt: "Aaradhya Online Seva Kendra tenant site services section at mobile width",
      caption: "Mobile, services section.",
      aspect: "9/16",
      slot: "mobile",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/hero-clean.webp",
      width: 1024,
      height: 576,
      alt: "Aaradhya Online Seva Kendra hero artwork",
      aspect: "16/9",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/cinematic-hero.webp",
      width: 1376,
      height: 768,
      alt: "Aaradhya Online Seva Kendra cinematic hero treatment",
      aspect: "16/9",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/seva-hero-3d.webp",
      width: 1024,
      height: 1024,
      alt: "Three-dimensional hero artwork for the Aaradhya tenant site",
      aspect: "1/1",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/seva-hero-light.webp",
      width: 1376,
      height: 768,
      alt: "Light-toned hero artwork for the Aaradhya tenant site",
      aspect: "16/9",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/premium-bg.webp",
      width: 1376,
      height: 768,
      alt: "Premium background artwork from the Aaradhya tenant site",
      aspect: "16/9",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/gov-building.webp",
      width: 1024,
      height: 1024,
      alt: "Government building artwork used across the Aaradhya service catalogue",
      aspect: "1/1",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/services-abstract.webp",
      width: 1376,
      height: 768,
      alt: "Abstract service catalogue artwork from the Aaradhya site",
      aspect: "16/9",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/audience-mahila.webp",
      width: 960,
      height: 644,
      alt: "Audience artwork representing women seeking assisted services",
      aspect: "3/2",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/audience-shetkari.webp",
      width: 960,
      height: 644,
      alt: "Audience artwork representing farmers seeking assisted services",
      aspect: "3/2",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/site/audience-vydharti.webp",
      width: 960,
      height: 644,
      alt: "Audience artwork representing citizens seeking assisted services",
      aspect: "3/2",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/counter.jpg",
      width: 1376,
      height: 768,
      alt: "An operator helping a customer at the service counter",
      caption: "Where the digital system meets the walk-in.",
      aspect: "16/9",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/centre.jpg",
      width: 1024,
      height: 1024,
      alt: "Service counter at a digital assistance centre",
      aspect: "1/1",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/services.jpg",
      width: 1376,
      height: 768,
      alt: "Service catalogue visualisation from the Aaradhya site",
      aspect: "16/9",
      slot: "gallery",
    },
    {
      kind: "image",
      src: "/work/aaradhya/discover.jpg",
      width: 1024,
      height: 576,
      alt: "Service discovery section of the Aaradhya tenant site",
      aspect: "16/9",
      slot: "gallery",
    },
  ],
  creatives: [
    {
      kind: "video",
      src: "/work/aaradhya/ads/spot-maha-e-seva-kendra.mp4",
      poster: "/work/aaradhya/ads/spot-maha-e-seva-kendra.jpg",
      width: 1280,
      height: 720,
      alt: "Aaradhya promotional spot — Maha e-Seva Kendra",
      caption: "Promotional spot for the centre.",
      aspect: "16/9",
      slot: "ad",
    },
    {
      kind: "video",
      src: "/work/aaradhya/ads/spot-phone-call.mp4",
      poster: "/work/aaradhya/ads/spot-phone-call.jpg",
      width: 1280,
      height: 720,
      alt: "Aaradhya promotional spot — a citizen making a phone call",
      caption: "Promotional spot.",
      aspect: "16/9",
      slot: "ad",
    },
    {
      kind: "video",
      src: "/work/aaradhya/ads/spot-smartphone.mp4",
      poster: "/work/aaradhya/ads/spot-smartphone.jpg",
      width: 1280,
      height: 720,
      alt: "Aaradhya promotional spot — a citizen using a smartphone",
      caption: "Promotional spot.",
      aspect: "16/9",
      slot: "ad",
    },
  ],
  liveNote:
    "No public tenant URL. This centre runs as a seeded tenant on a local database, and the platform's production deployment has no tenant created on it yet — so there is nothing to link to. A live link is added the moment a tenant is provisioned on production.",
  featured: true,
  flagship: true,
  pendingContent: false,
  published: true,
};

/* ————————————————————————————————————————————————————————————
   05–11 — remaining work, honest about what is documented
   ———————————————————————————————————————————————————————————— */

const E_PARVANA: Project = {
  id: "e-parvana",
  title: "E-Parvana / E-Purvatha Pranali",
  slug: "e-parvana",
  categories: ["GOVERNMENT", "AUTOMATION"],
  summary:
    "Digital permit and supply-chain authorisation workflow, built around the paperwork a supply chain actually produces.",
  shortDescription: "Permit paperwork turned into a tracked authorisation workflow.",
  description: [
    "E-Parvana / E-Purvatha Pranali digitises a government permit and supply-chain authorisation process. The value is in the state tracking: where an application is, who is holding it, and what it is waiting on.",
  ],
  pendingNote:
    "Verified captures and the full workflow walkthrough are still being selected from the running system. No screenshots are published here rather than approximate ones.",
  featured: false,
  flagship: false,
  pendingContent: true,
  published: true,
};

const SULABH: Project = {
  id: "sulabh-pranali",
  title: "Sulabh Pranali",
  slug: "sulabh-pranali",
  categories: ["GOVERNMENT", "BUSINESS SYSTEMS"],
  summary: "A process system designed to make a complex government workflow legible to the people inside it.",
  shortDescription: "A complex workflow, made navigable for the people who run it.",
  description: [
    "Sulabh Pranali reorganises a complicated administrative process so staff can see the current step, what is required next, and who owns it — instead of reconstructing state from memory.",
  ],
  pendingNote:
    "The case study is being written from the real system. Media and the step-by-step walkthrough are not yet selected.",
  featured: false,
  flagship: false,
  pendingContent: true,
  published: true,
};

const E_FILE_FINDER: Project = {
  id: "e-file-finder",
  title: "File Search / E-File Finder",
  slug: "e-file-finder",
  categories: ["GOVERNMENT", "AUTOMATION"],
  summary:
    "Search across a file collection to answer one question: where is this file right now?",
  shortDescription: "Answers \"where is this file right now?\" across a record collection.",
  description: [
    "E-File Finder exists because the expensive question in an office is not \"what does this say?\" but \"where is it?\" It indexes the collection and returns location and state rather than making someone open folders.",
  ],
  technologies: ["Google Apps Script", "Google Sheets", "Drive"],
  pendingNote:
    "Implementation detail and captures are still being documented from the deployed system.",
  featured: false,
  flagship: false,
  pendingContent: true,
  published: true,
};

const SUPPLY_LICENSING: Project = {
  id: "supply-licensing",
  title: "Supply Department Licensing System",
  slug: "supply-licensing",
  categories: ["GOVERNMENT", "BUSINESS SYSTEMS"],
  summary: "A licensing workflow for a government supply department — applications, checks, decisions and records.",
  shortDescription: "Applications, checks, decisions and records in one trackable workflow.",
  description: [
    "The licensing system carries an application from submission through verification to decision, and keeps the record afterwards. The point is an auditable trail rather than a faster form.",
  ],
  pendingNote:
    "Workflow walkthrough and captures are in preparation. Nothing is published here that has not been verified against the system.",
  featured: false,
  flagship: false,
  pendingContent: true,
  published: true,
};

const GOOGLE_WORKSPACE: Project = {
  id: "google-workspace-systems",
  title: "Google Workspace Application Systems",
  slug: "google-workspace-systems",
  categories: ["GOOGLE APPS SCRIPT", "AUTOMATION", "BUSINESS SYSTEMS"],
  summary:
    "A family of working business applications built on Google Sheets + Apps Script + HTML/CSS/JavaScript + Drive + Gmail.",
  shortDescription: "Real business software, delivered on infrastructure the organisation already owns.",
  description: [
    "Not spreadsheets — applications. Sheets as a database, Apps Script as the backend, the HTML service as the interface, Drive for files and Gmail for communication. Practical business software delivered on infrastructure the organisation already has, which is often the only stack that survives procurement.",
  ],
  technologies: ["Google Apps Script", "Google Sheets", "HTML", "CSS", "JavaScript", "Drive", "Gmail"],
  pendingNote:
    "Individual application walkthroughs are being documented. The pattern is described here; per-application captures follow once selected.",
  featured: false,
  flagship: false,
  pendingContent: true,
  published: true,
};

const VIBE_CODING: Project = {
  id: "vibe-coding-experiments",
  title: "AI / Vibe Coding Experiments",
  slug: "vibe-coding-experiments",
  categories: ["AI / VIBE CODING", "LAB"],
  status: "CONCEPT",
  summary:
    "Ongoing experiments in AI-assisted development — prompts to architecture to production systems.",
  shortDescription: "Where the ten-stage method gets tested before it ships in a product.",
  description: [
    "The workflow documented in `data/process.ts` is not theoretical: it is the loop these experiments run in. Each one tests a technique — structured prompting, review gates, AI-assisted implementation — and keeps the result only if it survives contact with a real build.",
  ],
  technologies: ["AI-assisted development", "Structured prompting", "Review gates"],
  pendingNote:
    "A live index of individual experiments is being curated. The method is documented; the individual write-ups are still being selected.",
  featured: false,
  flagship: false,
  pendingContent: true,
  published: true,
};

const MOTION_3D: Project = {
  id: "3d-motion-experiments",
  title: "3D / Motion Experiments",
  slug: "3d-motion-experiments",
  categories: ["3D / MOTION", "LAB"],
  status: "CONCEPT",
  summary: "Explorations in WebGL, shaders, scroll choreography and cinematic interfaces.",
  shortDescription: "Interface and motion studies, kept only where they earn their weight.",
  description: [
    "Scenes, shaders and scroll choreography explored to find what genuinely improves an interface — as opposed to what merely costs frames. This site keeps a deliberately small amount of it, and the rest stays on the bench.",
  ],
  technologies: ["WebGL", "React Three Fiber", "GLSL", "ScrollTrigger"],
  pendingNote:
    "A curated set of studies is being assembled. Until then nothing is shown rather than showing something unrepresentative.",
  featured: false,
  flagship: false,
  pendingContent: true,
  published: true,
};

/**
 * Display order for /work and the homepage selected-work list.
 * Ordered by how much verified substance sits behind each entry.
 */
export const PROJECTS: Project[] = [
  SEVADESK,
  JK_ATTENDANCE,
  CHHATRAPATI,
  AARADHYA,
  E_PARVANA,
  SULABH,
  E_FILE_FINDER,
  SUPPLY_LICENSING,
  GOOGLE_WORKSPACE,
  VIBE_CODING,
  MOTION_3D,
];

export const publishedProjects = PROJECTS.filter((p) => p.published);
export const featuredProjects = PROJECTS.filter((p) => p.published && p.featured);

/** The projects with the most verified media — drives the homepage lead. */
export const mediaRichProjects = publishedProjects.filter(
  (p) => (p.media?.length ?? 0) + (p.creatives?.length ?? 0) > 0
);

/** The first flagship client case study — drives the homepage lead. */
export const flagshipProject = publishedProjects.find((p) => p.slug === "aaradhya-online-seva-kendra");

/** The platform — the single project everything else is built on. */
export const platformProject = publishedProjects.find((p) => p.slug === "sevadesk");

/** Products are the projects a business can actually run on. */
export const productProjects = publishedProjects.filter(
  (p) => p.slug === "sevadesk" || p.slug === "jk-attendance"
);

/** Experiments and internal systems — everything that is not a product. */
export const labProjects = publishedProjects.filter(
  (p) => p.categories.includes("LAB") || p.slug === "google-workspace-systems"
);

/** The tenant relationship shown on the products page. */
export const tenantProjects = publishedProjects.filter(
  (p) => p.slug === "chhatrapati-online-service" || p.slug === "aaradhya-online-seva-kendra"
);

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}

/** Every category actually present in published content — drives /work filters. */
export const usedCategories = Array.from(
  new Set(publishedProjects.flatMap((p) => p.categories))
).sort() as ProjectCategory[];
