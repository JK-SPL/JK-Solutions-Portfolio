import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Process } from "@/components/sections/Process";

export const metadata: Metadata = {
  title: "Process",
  description: "Discover → Architect → Design → Build → Test → Deploy → Monitor.",
};

export default function ProcessPage() {
  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <SectionHeading
        eyebrow="PROCESS"
        title="How a build actually runs."
        supporting="Seven steps. No theatre — each one exists because skipping it has cost something before."
      />
      <Process />
    </div>
  );
}
