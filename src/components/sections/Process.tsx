"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STAGES as STEPS } from "@/data/process";

export function Process() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <Reveal>
        <p className="eyebrow">06 / PROCESS</p>
        <ol className="flex flex-col gap-px border border-line bg-line sm:flex-row" role="list" aria-label="Build process steps">
          {STEPS.map((s, i) => (
            <li key={s.id} className="flex-1 min-w-0">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "flex w-full items-center gap-3 p-5 text-left transition-colors duration-300 sm:min-h-[8rem] sm:flex-col sm:items-start sm:justify-between",
                  active === i ? "bg-primary/10 border-l-2 border-primary-glow" : "bg-void hover:bg-panel"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl" aria-hidden="true">{s.icon}</span>
                  <div>
                    <span className="font-mono text-[0.625rem] text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={cn(
                        "block font-mono text-[0.6875rem] uppercase tracking-[0.2em] transition-colors mt-1",
                        active === i ? "text-paper" : "text-mute"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-8 max-w-[56ch] border-l-2 border-primary pl-6 text-sm leading-relaxed text-mute sm:text-base" aria-live="polite">
          {STEPS[active].detail}
        </p>
      </Reveal>
    </div>
  );
}
