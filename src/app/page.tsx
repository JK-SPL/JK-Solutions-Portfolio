import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Statement } from "@/components/sections/Statement";
import { CapabilityStrip } from "@/components/sections/CapabilityStrip";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Process } from "@/components/sections/Process";
import { LabPreview } from "@/components/sections/LabPreview";
import { ProfileSection, ClosingCTA } from "@/components/sections/ProfileSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Statement />
      <CapabilityStrip />
      <ProductShowcase />
      <Process />
      <LabPreview />
      <ProfileSection />
      <ClosingCTA />
    </>
  );
}
