/**
 * Canonical build workflow — the single source of truth.
 *
 * Ten stages, in order:
 *   01 IDEA → 02 PROMPT → 03 ARCHITECT → 04 DESIGN → 05 VIBE CODE
 *   → 06 ITERATE → 07 DEBUG → 08 TEST → 09 DEPLOY → 10 REAL PRODUCT
 *
 * The sequence used to be duplicated across `Process`, `VibeCoding` and the
 * homepage CTA, and the copies drifted. Every consumer now derives from
 * `PROCESS_STAGES` below, so the labels can never disagree again.
 */

export interface ProcessStage {
  /** Stable id, also used as the DOM id for deep links. */
  id: string;
  /** Zero-padded display number, e.g. "01". */
  number: string;
  /** Uppercase display label. */
  label: string;
  /**
   * Single decorative glyph shown alongside the label in the process strip.
   * Additive only — kept here so the component never hardcodes a parallel
   * stage list. Geometric/typographic symbols only, no emoji presentation.
   */
  icon: string;
  /** One line — what this stage is for. */
  headline: string;
  /** Editorial detail shown when the stage is active. */
  detail: string;
  /** Short imperative shown on the scrollytelling rail. */
  cue: string;
}

export const PROCESS_STAGES: readonly ProcessStage[] = [
  {
    id: "idea",
    number: "01",
    label: "IDEA",
    icon: "◆",
    headline: "The real problem, not the imagined one.",
    detail:
      "Before anything is designed, the actual workflow is understood. Who uses it, what breaks today, what constraint is non-negotiable, and what a good outcome actually looks like. Most failed builds are solved here, before any code exists.",
    cue: "Find the real problem",
  },
  {
    id: "prompt",
    number: "02",
    label: "PROMPT",
    icon: "◇",
    headline: "The brief is the architecture.",
    detail:
      "Discovery becomes a structured brief: context, constraints, acceptance criteria, and what is explicitly out of scope. A precise brief is the highest-leverage artifact in the whole build — it is what the rest of the workflow is generated from.",
    cue: "Write the brief",
  },
  {
    id: "architect",
    number: "03",
    label: "ARCHITECT",
    icon: "▤",
    headline: "Decide the shape before drawing screens.",
    detail:
      "Data model, roles, system boundaries, tenancy, authorisation matrix, failure modes, migration strategy. Deciding these on paper is cheaper than discovering them in production, and it is what keeps an AI-assisted build coherent across dozens of files.",
    cue: "Model the system",
  },
  {
    id: "design",
    number: "04",
    label: "DESIGN",
    icon: "◧",
    headline: "Editorial, not decorative.",
    detail:
      "Type, grid, colour, motion vocabulary and interaction rules. Design is a system of decisions, not a set of preferences: every surface answers to the same tokens, so the product reads as one product rather than a pile of screens.",
    cue: "Set the system",
  },
  {
    id: "vibe-code",
    number: "05",
    label: "VIBE CODE",
    icon: "▣",
    headline: "AI navigates. The engineer decides.",
    detail:
      "Implementation runs AI-assisted with human review at every meaningful step. Velocity comes from not re-deriving known patterns; correctness comes from the engineer owning architecture, review and the final call.",
    cue: "Build it",
  },
  {
    id: "iterate",
    number: "06",
    label: "ITERATE",
    icon: "↻",
    headline: "Real feedback, not imagined feedback.",
    detail:
      "The build meets real usage. Assumptions get replaced with observed behaviour, and the system bends toward the actual workflow rather than the workflow being bent toward the system. This is where scope is honestly cut.",
    cue: "Use it, then fix it",
  },
  {
    id: "debug",
    number: "07",
    label: "DEBUG",
    icon: "◈",
    headline: "Bugs are found here, not in production.",
    detail:
      "Logs, traces, error boundaries, and reproduction cases. A bug is only fixed once there is a failing reproduction and a regression test — everything else is a guess that will return.",
    cue: "Reproduce, then fix",
  },
  {
    id: "test",
    number: "08",
    label: "TEST",
    icon: "✓",
    headline: "Gates that actually gate.",
    detail:
      "Type-checks, unit and integration coverage, end-to-end paths, and real-device QA at real breakpoints. A green check that cannot fail the build is decoration, so CI is wired to block rather than to inform.",
    cue: "Prove it holds",
  },
  {
    id: "deploy",
    number: "09",
    label: "DEPLOY",
    icon: "▲",
    headline: "Ship with a way back.",
    detail:
      "Migrations planned, rollout reversible, feature flags on day one, rollback rehearsed rather than hoped for. Deployment is a designed step with a recovery path, not a button pressed at the end of a sprint.",
    cue: "Ship it safely",
  },
  {
    id: "real-product",
    number: "10",
    label: "REAL PRODUCT",
    icon: "●",
    headline: "Finished means it survives contact with life.",
    detail:
      "Real users, real data, real consequences — including the ones nobody planned for. A product is not done when it launches; it is done when it holds up under the people and the mess it was built for. Then: monitor, learn, repeat.",
    cue: "Survive real life",
  },
] as const;

/** Flat label list, e.g. for the compact terminal rail. */
export const PROCESS_LABELS: readonly string[] = PROCESS_STAGES.map((s) => s.label);

/** Arrow-joined workflow, e.g. "IDEA → PROMPT → ARCHITECT → …". */
export const PROCESS_ARROW = PROCESS_LABELS.join(" → ");

/** The stage that hands off to a real shipped project. */
export const FINAL_STAGE = PROCESS_STAGES[PROCESS_STAGES.length - 1];
