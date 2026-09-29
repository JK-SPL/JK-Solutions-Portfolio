import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "JK Attendance",
  description: "Workforce attendance platform — GPS, geofence and selfie verification for real field conditions.",
};

const PILLARS = [
  { title: "GPS", desc: "Every check-in carries a real location — not a promise." },
  { title: "GEOFENCE", desc: "Worksites are defined geographically; attendance outside the fence doesn't count." },
  { title: "SELFIE", desc: "Identity verified at the moment of check-in." },
  { title: "EMPLOYEE", desc: "A simple flow for the person in the field — open, verify, done." },
  { title: "ADMIN", desc: "The office sees who is where, when — without phone calls." },
  { title: "REPORTS", desc: "Attendance becomes data: exports, summaries, accountability." },
];

export default function JKAttendancePage() {
  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <p className="eyebrow mb-6 text-electric">FLAGSHIP PRODUCT — 02</p>
      <h1 className="display-1">JK ATTENDANCE</h1>
      <p className="mt-6 font-display text-2xl text-mute sm:text-3xl">Attendance, reimagined.</p>
      <p className="lead mt-8">
        Registers and trust-based reporting break the moment a team leaves one office.
        JK Attendance is engineered for teams that work in the field.
      </p>

      <div className="mt-20">
        <SectionHeading eyebrow="SYSTEM" title="Built for field conditions." />
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80} className="bg-void p-8">
              <h2 className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-paper">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mute">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
