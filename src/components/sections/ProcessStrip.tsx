import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STAGES } from "@/data/process";

/**
 * The ten-step build process, compacted into a two-row rail.
 *
 * Each stage previously occupied a full-height section, so scrolling the
 * homepage meant scrolling past ten essays to reach the work. Here the same
 * canonical ten stages read as a single diagram — two rows of five on desktop,
 * one column on mobile — with the detail text available on /process. The
 * labels and order come straight from `data/process.ts` and are not rewritten.
 */
export function ProcessStrip() {
  return (
    <section aria-labelledby="process" className="border-t border-line py-20 sm:py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">06 / PROCESS</p>
            <h2 id="process" className="display-2 mt-5 max-w-[20ch]">
              HOW A BUILD ACTUALLY RUNS.
            </h2>
          </div>
          <p className="max-w-[30ch] text-sm leading-relaxed text-mute">
            Ten steps, in order, every time. The last one is a real product
            running for real users.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {PROCESS_STAGES.map((stage, i) => (
            <Reveal
              as="li"
              key={stage.id}
              delay={(i % 5) * 40}
              className="group relative bg-panel p-5 transition-colors duration-[var(--dur)] hover:bg-void sm:p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[0.6875rem] tracking-label text-primary-glow">
                  {stage.number}
                </span>
                {/* Final stage is the only one that is a shipped product. */}
                {stage.id === "real-product" ? (
                  <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-faint">
                    shipped
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.16em] text-paper">
                {stage.label}
              </h3>

              <p className="mt-3 hidden text-[0.8125rem] leading-relaxed text-mute sm:block">
                {stage.headline}
              </p>

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary-glow/50 transition-transform duration-[var(--dur)] group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
