import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { PROFILE } from "@/data/resume";
import { SITE } from "@/data/site";

/**
 * Professional profile, in four lines.
 *
 * The brief rules out a large autobiographical About section on the homepage —
 * the detailed history belongs on /resume. So this answers exactly four
 * questions: who, what, background, current focus — and links out to the
 * resume and the work.
 *
 * The portrait is the real `public/images/jk-portrait.jpg` (941x1672). It is
 * lazy-loaded and marked decorative-plus-labelled, because the name beside it
 * already carries the identity and the image adds no information a screen
 * reader user needs.
 */
export function ProfileSection() {
  return (
    <section aria-labelledby="profile" className="border-t border-line py-20 sm:py-24">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden bg-void">
                <Image
                  src="/images/jk-portrait.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 90vw, 30vw"
                  quality={80}
                  className="object-cover grayscale transition-[filter] duration-[var(--dur-slow)] hover:grayscale-0"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <p className="eyebrow">09 / PROFILE</p>
            <h2 id="profile" className="display-2 mt-5 max-w-[20ch]">
              WHO IS BUILDING THIS.
            </h2>

            <Reveal delay={80}>
              <dl className="mt-12 divide-y divide-line border-y border-line">
                {[
                  { term: "WHO", detail: `${PROFILE.name} — ${PROFILE.role}` },
                  { term: "WHAT", detail: SITE.tagline + " — " + SITE.statement },
                  {
                    term: "BACKGROUND",
                    detail:
                      "Infrastructure, networks and government IT — the part of software where it genuinely has to work.",
                  },
                  {
                    term: "NOW",
                    detail:
                      "Running JK SOLUTIONS: SaaS, business systems and automation, built with AI-assisted development.",
                  },
                ].map((row) => (
                  <div
                    key={row.term}
                    className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[10ch_1fr] sm:gap-8"
                  >
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-primary-glow">
                      {row.term}
                    </dt>
                    <dd className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-mute">
                      {row.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={160} className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/resume"
                data-lit
                className="group/link inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper transition-colors hover:text-primary-glow"
              >
                Read the resume
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/work"
                data-lit
                className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-faint transition-colors hover:text-paper"
              >
                See the work
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Final call to action. The last thing on the page is the ask, and it is a
 * single sentence with one primary action and one fallback.
 */
export function ClosingCTA() {
  return (
    <section aria-labelledby="closing" className="border-t border-line bg-ink py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">10 / START A PROJECT</p>
          <h2 id="closing" className="display-1 mt-6 max-w-[16ch]">
            LET&apos;S BUILD SOMETHING WORTH REMEMBERING.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="lead mt-8 max-w-[46ch]">
            Send a brief. You get a plan, a scope and a timeline back — not a
            sales sequence.
          </p>
        </Reveal>

        <Reveal delay={180} className="mt-12 flex flex-wrap items-center gap-5">
          <Link
            href="/contact"
            data-lit
            data-magnetic
            className="btn-primary"
          >
            START A PROJECT <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/work" data-lit className="btn-ghost">
            SEE THE WORK <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
