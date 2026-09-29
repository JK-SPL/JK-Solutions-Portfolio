import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "From infrastructure to digital products — the road to JK SOLUTIONS.",
};

const TIMELINE = [
  "IT OPERATIONS",
  "NETWORK & SYSTEMS",
  "GOVERNMENT IT",
  "E-GOVERNANCE",
  "AUTOMATION",
  "VIBE CODING",
  "AI-ASSISTED DEVELOPMENT",
  "SAAS",
  "3D / MOTION",
];

export default function AboutPage() {
  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <SectionHeading eyebrow="ABOUT" title={
        <>
          FROM INFRASTRUCTURE
          <br />
          <span className="text-mute">TO DIGITAL PRODUCTS.</span>
        </>
      } />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* second portrait — same cinematic treatment rules */}
        <Reveal className="relative">
          <div className="relative aspect-[3/4] max-w-md">
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_40%_20%,rgba(103,59,247,0.22),transparent_60%)]" aria-hidden="true" />
            <div className="mask-fade-radial relative h-full w-full">
              <Image
                src="/images/jk-about.jpg"
                alt="JK — the person behind JK SOLUTIONS"
                fill
                sizes="(max-width: 1024px) 90vw, 34vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,7,0.85),transparent_40%)]" aria-hidden="true" />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_60%,rgba(103,59,247,0.18))] mix-blend-screen" aria-hidden="true" />
            </div>
            <span className="absolute bottom-4 left-0 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-faint">
              SYS.JK / 02 — FOUNDER
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="lead">
              I started where software meets physical reality — infrastructure, networks and systems
              that people depend on. Government IT and e-governance taught me what &ldquo;it has to work&rdquo;
              actually means: real users, real data, real consequences.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead mt-6">
              Automation came next — replacing manual office workflows with systems. Then AI-assisted
              development turned that experience into velocity: the discipline of infrastructure
              engineering, applied at the speed of vibe coding.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="lead mt-6">
              JK SOLUTIONS is where that road leads — a digital product studio building SaaS,
              automation and immersive experiences that survive contact with real life.
            </p>
          </Reveal>

          <Reveal delay={280} className="mt-14">
            <h2 className="eyebrow mb-8">THE ROAD</h2>
            <ol className="flex flex-wrap items-center gap-y-3" aria-label="Career timeline">
              {TIMELINE.map((t, i) => (
                <li key={t} className="flex items-center">
                  <span
                    className={
                      i >= TIMELINE.length - 3
                        ? "chip border-primary-glow/60 bg-primary/10 text-paper"
                        : "chip"
                    }
                  >
                    {t}
                  </span>
                  {i < TIMELINE.length - 1 && (
                    <span className="mx-2 font-mono text-xs text-faint" aria-hidden="true">→</span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
