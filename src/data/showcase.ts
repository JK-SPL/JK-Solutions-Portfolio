import { publishedProjects } from "@/data/projects";

/**
 * Homepage showcase lineup.
 *
 * The order is editorial, not alphabetical, and it is declared here so the
 * homepage never invents its own ordering. Every slug resolves against
 * `publishedProjects`, so a slug that stops being published is dropped rather
 * than rendered as a broken link.
 *
 * The seven primary projects from the brief are grouped into two treatments:
 * four get large alternating showcases (they are the flagship work, and three
 * of the four have real media to fill a large frame), and the remainder get a
 * compact rail so the portfolio still covers government, automation, AI and
 * 3D work without every project becoming a card.
 */

/** Large alternating showcases, in the order they appear. */
export const SHOWCASE_SLUGS = [
  "sevadesk",
  "aaradhya-online-seva-kendra",
  "chhatrapati-online-service",
  "jk-attendance",
] as const;

/** The project that gets the sticky scroll-story treatment. */
export const SCROLL_STORY_SLUG = "aaradhya-online-seva-kendra";

/**
 * Compact rail: everything published that is not already a large showcase,
 * in the brief's order — verified government systems, automation systems,
 * then AI / vibe-coding and 3D / motion experiments.
 */
const RAIL_ORDER = [
  // Verified government / e-governance workflow systems
  "e-parvana",
  "sulabh-pranali",
  "e-file-finder",
  "supply-licensing",
  // Automation / business application systems
  "google-workspace-systems",
  // AI / method R&D
  "vibe-coding-experiments",
  // Motion R&D
  "3d-motion-experiments",
] as const;

function resolve(slugs: readonly string[]) {
  return slugs
    .map((slug) => publishedProjects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
}

export const showcaseProjects = resolve(SHOWCASE_SLUGS);
export const scrollStoryProject =
  publishedProjects.find((p) => p.slug === SCROLL_STORY_SLUG) ?? null;
export const railProjects = resolve(RAIL_ORDER);

/**
 * Every project that has real captured media — the source for the creative /
 * advertisement showcase. Grouped by project so each block can name the work
 * the creative was actually made for, rather than floating loose on the page.
 */
export const creativeProjects = publishedProjects.filter(
  (p) => (p.creatives ?? []).length > 0
);
