import type { Project, ProjectMedia } from "@/data/projects";

/**
 * Media selection for the homepage showcase.
 *
 * Everything here is derived from `data/projects.ts` — no asset path, caption
 * or alt text is written by the homepage. If a project has no real media, the
 * helpers return nothing and the caller renders an honest typographic panel
 * built from that project's real data instead of inventing a stand-in visual.
 */

/** True when an image may lead or sit inside a showcase frame.
 *
 * Two slots are disqualified on purpose:
 * - `brand` — a ~5:1 logo. Forced into a 21:9 frame with `object-fit: cover`
 *   it crops to a few giant characters and reads as a broken overlay.
 * - `reference` — design-reference art (unlabelled chart components). It is
 *   honest inside a captioned case-study gallery, but it is not a capture of
 *   the running system and must never present itself as project evidence on
 *   the homepage.
 */
function isFrameEligible(m: ProjectMedia): boolean {
  return m.kind === "image" && m.slot !== "brand" && m.slot !== "reference";
}

/** First real *image* attached to a project. Video is handled separately.
 *
 * Priority: explicit hero slot → gallery → dashboard → produced ad → first
 * frame-eligible image. A brand mark is never returned: it is a wide logo
 * (often ~5:1) that reads terribly cropped across a large showcase frame,
 * whereas a dashboard or gallery capture is composed to fill one.
 */
export function heroImage(project: Project): ProjectMedia | undefined {
  const images = (project.media ?? []).filter((m) => m.kind === "image");
  return (
    images.find((m) => m.slot === "hero") ??
    images.find((m) => m.slot === "gallery") ??
    images.find((m) => m.slot === "dashboard") ??
    images.find((m) => m.slot === "ad") ??
    images.find(isFrameEligible)
  );
}

/**
 * A project's *captured product UI* — the running interface itself.
 *
 * Produced advertising, brand marks and design-reference art are deliberately
 * excluded: a product row promises the software, not the campaign made for it.
 * Returns undefined when a product has no capture yet, so the caller renders
 * its honest typographic panel instead of a stand-in screenshot.
 */
export function capturedUiImage(project: Project): ProjectMedia | undefined {
  const images = (project.media ?? []).filter((m) => m.kind === "image");
  return (
    images.find((m) => m.slot === "hero") ??
    images.find((m) => m.slot === "gallery") ??
    images.find((m) => m.slot === "dashboard")
  );
}

/** A project's lead video, if one was genuinely produced for it. */
export function heroVideo(project: Project): ProjectMedia | undefined {
  return (project.media ?? []).find((m) => m.kind === "video");
}

/** Every real image on a project, in declared order. */
export function galleryImages(project: Project): ProjectMedia[] {
  return (project.media ?? []).filter((m) => m.kind === "image");
}

/** Produced advertisement / promotional creative, if any. */
export function creatives(project: Project): ProjectMedia[] {
  return project.creatives ?? [];
}

/** True when the project has at least one real frame to show. */
export function hasRealMedia(project: Project): boolean {
  return (project.media ?? []).length > 0 || (project.creatives ?? []).length > 0;
}

/**
 * The frames used for a project's big showcase block: a lead image plus a
 * secondary, de-duplicated by source. Returns fewer than two entries when the
 * project genuinely has fewer — callers must handle that rather than padding.
 */
export function showcaseFrames(project: Project, max = 2): ProjectMedia[] {
  const lead = heroImage(project);
  const pool = galleryImages(project).filter(
    (m) => m.src !== lead?.src && isFrameEligible(m)
  );

  if (!lead) return pool.slice(0, max);

  const secondary =
    pool.find((m) => m.slot === "gallery" || m.slot === "hero") ?? pool[0];

  return secondary && max > 1 ? [lead, secondary] : [lead];
}

/**
 * The three-frame scroll story. Prefers the project's own video, then distinct
 * real captures of the same product at different crops so the crossfade reads
 * as one system rather than three unrelated pictures.
 */
export function storyFrames(project: Project): ProjectMedia[] {
  const frames: ProjectMedia[] = [];

  const video = heroVideo(project);
  if (video) frames.push(video);

  const images = galleryImages(project);
  for (const image of images) {
    if (frames.length >= 3) break;
    if (frames.some((f) => f.src === image.src)) continue;
    frames.push(image);
  }

  return frames;
}
