import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments in AI, interfaces, motion and digital systems.",
};

const EXPERIMENTS = [
  { id: "3D-MOTION", title: "3D Motion", desc: "WebGL scenes, scroll choreography, camera work in the browser.", tags: ["WEBGL", "R3F", "SHADERS"] },
  { id: "AI-INTERFACES", title: "AI Interfaces", desc: "Conversational and generative UI that stays under human control.", tags: ["AI", "GENERATIVE UI"] },
  { id: "VIBE-CODING", title: "Vibe Coding", desc: "Structured AI-assisted builds — prompt to architecture to production.", tags: ["AI / VIBE CODING"] },
  { id: "GENERATIVE-UI", title: "Generative UI", desc: "Interfaces assembled by systems, bounded by design tokens.", tags: ["EXPERIMENTAL UX"] },
  { id: "AUTOMATION", title: "Automation", desc: "Small machines that remove repetitive work from real offices.", tags: ["WORKFLOWS"] },
  { id: "SHADERS", title: "Shaders", desc: "Light, noise and motion at the pixel level.", tags: ["GLSL", "WEBGL"] },
];

export default function LabPage() {
  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <SectionHeading
        eyebrow="JK LAB"
        title="Experiments in AI, interfaces, motion and digital systems."
        supporting="Not client work — the bench where new techniques are proven before they ship in products."
      />
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {EXPERIMENTS.map((e, i) => (
          <Reveal key={e.id} delay={(i % 3) * 80} className="group bg-void p-8 transition-colors duration-300 hover:bg-panel sm:p-10">
            <p className="font-mono text-[0.625rem] tracking-label text-primary-glow">{e.id}</p>
            <h2 className="mt-4 font-display text-lg font-semibold tracking-tight text-paper">{e.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-mute">{e.desc}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {e.tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
