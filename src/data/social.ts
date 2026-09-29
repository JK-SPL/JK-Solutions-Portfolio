/**
 * SOCIAL — single source of truth for every official JK SOLUTIONS profile.
 *
 * Rules for this file (deliberately strict):
 * - A profile is listed ONLY when it is genuinely configured. No placeholder
 *   handles, no guessed slugs, no "probably correct" URLs.
 * - `href` is the canonical configured URL. It is never derived at runtime and
 *   never generated from `handle`.
 * - No follower counts, post counts, follower stats or engagement metrics are
 *   modelled anywhere in this file. There is no live social connector in this
 *   project, so nothing is ever presented as fetched data.
 * - Adding a profile here (or removing one) updates the footer, the contact
 *   page and any future social section automatically, because every consumer
 *   renders from `SOCIAL_PROFILES` rather than hardcoding its own copy.
 *
 * `instagram` and `youtube` are supported by the `SocialId` union so they can be
 * enabled later by adding an entry — they are intentionally absent from
 * `SOCIAL_PROFILES` because they are not currently configured.
 */

export type SocialId =
  | "github"
  | "linkedin"
  | "x"
  | "instagram"
  | "youtube"
  | "email";

export interface SocialProfile {
  /** Stable identifier — also selects the icon. */
  id: SocialId;
  /** Display label, already in the site's uppercase mono voice. */
  label: string;
  /** Human-readable handle or address, safe to render as-is. */
  handle: string;
  /** Canonical configured URL. */
  href: string;
  /** `true` opens in a new tab; `false` stays in place (mailto). */
  external: boolean;
}

const EMAIL_PROFILE: SocialProfile = {
  id: "email",
  label: "EMAIL",
  handle: "hello@jksolutions.in",
  href: "mailto:hello@jksolutions.in",
  external: false,
};

/** Every configured official profile, in display order. */
export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  {
    id: "x",
    label: "X / TWITTER",
    handle: "@jksolutions",
    href: "https://twitter.com/jksolutions",
    external: true,
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    handle: "JK Solutions",
    href: "https://linkedin.com/in/jksolutions",
    external: true,
  },
  {
    id: "github",
    label: "GITHUB",
    handle: "github.com/jksolutions",
    href: "https://github.com/jksolutions",
    external: true,
  },
  EMAIL_PROFILE,
] as const;

/** Public social profiles only (excludes the email entry). */
export const SOCIAL_LINKS: readonly SocialProfile[] = SOCIAL_PROFILES.filter(
  (p) => p.id !== "email"
);

/** Contact address, sourced from the profile above rather than retyped. */
export const CONTACT_EMAIL = EMAIL_PROFILE.handle;

/** Lookup helper for consumers that need one specific profile. */
export function getSocialProfile(id: SocialId): SocialProfile | undefined {
  return SOCIAL_PROFILES.find((p) => p.id === id);
}
