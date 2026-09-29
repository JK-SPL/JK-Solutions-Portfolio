import { SOCIAL_PROFILES, type SocialProfile } from "@/data/social";
import { cn } from "@/lib/utils";
import { SocialIcon } from "./SocialIcon";

type Variant = "icon-row" | "list" | "cards";

interface SocialLinksProps {
  /** `icon-row` compact glyphs, `list` editorial mono column, `cards` labelled tiles. */
  variant?: Variant;
  /** Restrict to a subset, e.g. only the public profiles (excludes email). */
  profiles?: readonly SocialProfile[];
  className?: string;
  /** Accessible name for the rendered group. */
  label?: string;
}

/**
 * Renders the configured social profiles. Every social surface in the app goes
 * through this component, so `src/data/social.ts` is the only place a profile
 * URL is ever written down.
 */
export function SocialLinks({
  variant = "icon-row",
  profiles = SOCIAL_PROFILES,
  className,
  label = "Social links",
}: SocialLinksProps) {
  if (profiles.length === 0) return null;

  const linkProps = (p: SocialProfile) =>
    p.external
      ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
      : ({} as const);

  if (variant === "list") {
    return (
      <ul className={cn("space-y-3", className)}>
        {profiles.map((p) => (
          <li key={p.id}>
            <a
              href={p.href}
              {...linkProps(p)}
              data-lit
              className="inline-block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors duration-[var(--dur)] hover:text-paper"
            >
              {p.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "cards") {
    return (
      <ul className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
        {profiles.map((p) => (
          <li key={p.id}>
            <a
              href={p.href}
              {...linkProps(p)}
              data-lit
              className="group flex items-center gap-4 border border-line bg-void p-4 transition-colors duration-[var(--dur)] hover:border-faint hover:bg-panel"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center text-mute transition-colors duration-[var(--dur)] group-hover:text-paper"
                aria-hidden="true"
              >
                <SocialIcon id={p.id} className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-paper">
                  {p.label}
                </span>
                <span className="mt-0.5 block truncate text-sm text-mute">{p.handle}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("flex flex-wrap gap-3", className)} aria-label={label} role="list">
      {profiles.map((p) => (
        <li key={p.id}>
          <a
            href={p.href}
            {...linkProps(p)}
            data-lit
            aria-label={p.id === "x" ? "X / Twitter" : p.label.charAt(0) + p.label.slice(1).toLowerCase()}
            className="flex h-10 w-10 items-center justify-center border border-line text-faint transition-colors duration-[var(--dur)] hover:border-primary-glow hover:bg-primary/10 hover:text-primary-glow"
          >
            <SocialIcon id={p.id} className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
