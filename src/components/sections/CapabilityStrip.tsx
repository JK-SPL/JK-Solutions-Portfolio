import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CAPABILITIES, STACK_LAYERS } from "@/data/capabilities";
import { publishedProjects } from "@/data/projects";

/**
 * Capabilities, compacted.
 *
 * The old homepage carried a seven-paragraph manifesto plus a seven-principle
 * architecture diagram to explain what can be built. The same information is
 * here as six rows: a title, one line of plain description, the technology
 * labels, and a link to a real project that proves it. Six disciplines, one
 * scan, no wall of text — the full writing stays on /capabilities.
 */
export function CapabilityStrip() {
  return (
    <section aria-labelledby="capabilities" className="border-t border-line py-20 sm:py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">05 / CAPABILITIES</p>
            <h2 id="capabilities" className="display-2 mt-5 max-w-[18ch]">
              WHAT I ACTUALLY BUILD.
            </h2>
          </div>
          <Link
            href="/capabilities"
            data-lit
            className="group/link inline-flex items-center gap-2 pb-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper transition-colors hover:text-primary-glow"
          >
            All capabilities
            <span aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <ul className="mt-14 divide-y divide-line border-y border-line">
          {CAPABILITIES.map((capability, i) => {
            const proof = capability.proof
              .map((slug) => publishedProjects.find((p) => p.slug === slug))
              .filter((p): p is NonNullable<typeof p> => Boolean(p))
              .slice(0, 2);

            return (
              <Reveal
                as="li"
                key={capability.id}
                delay={i * 40}
                className="grid grid-cols-1 gap-x-10 gap-y-5 py-8 md:grid-cols-12"
              >
                <p className="font-mono text-[0.6875rem] tracking-label text-primary-glow md:col-span-1">
                  {capability.number}
                </p>

                <div className="md:col-span-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-paper sm:text-xl">
                    {capability.title}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-mute">
                    {capability.lead}
                  </p>
                </div>

                <ul className="flex flex-wrap content-start gap-1.5 md:col-span-4">
                  {capability.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="md:col-span-3">
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">
                    {proof.length ? "PROVEN IN" : "APPLIED IN"}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {proof.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/work/${p.slug}`}
                          data-lit
                          className="text-sm text-mute underline-offset-4 transition-colors hover:text-paper hover:underline"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * The stack, reduced to a data table. Six layers with their real items and
 * one line of reasoning each — the same content the old architecture diagram
 * carried, minus the boxes and arrows that explained nothing.
 */
export function StackStrip() {
  return (
    <section aria-labelledby="stack" className="border-t border-line bg-ink py-20 sm:py-24">
      <div className="shell">
        <p className="eyebrow">THE STACK</p>
        <h2 id="stack" className="display-3 mt-5 max-w-[24ch]">
          ONE ENGINEERING CORE. SIX LAYERS.
        </h2>

        <dl className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {STACK_LAYERS.map((layer, i) => (
            <Reveal
              as="div"
              key={layer.id}
              delay={(i % 3) * 60}
              className="bg-panel p-6 sm:p-7"
            >
              <dt className="font-mono text-[0.625rem] uppercase tracking-label text-primary-glow">
                {layer.label}
              </dt>
              <dd className="mt-4 flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </dd>
              <dd className="mt-4 text-sm leading-relaxed text-mute">{layer.detail}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
