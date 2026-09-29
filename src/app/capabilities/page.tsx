import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Services } from "@/components/sections/Services";

const TITLE = "Capabilities";
const DESCRIPTION =
  "Six capability areas: digital experiences, business systems, SaaS products, automation, AI and infrastructure — with the real projects that prove each one.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} — JK SOLUTIONS`,
    description: DESCRIPTION,
  },
  alternates: { canonical: "/capabilities" },
};

/**
 * `/capabilities` is the canonical route for this page. It was previously
 * served at `/services`, which now redirects here, so the old URL and every
 * link already pointing at it keep working. The content component is unchanged.
 */
export default function CapabilitiesPage() {
  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <SectionHeading eyebrow="CAPABILITIES" title="What I can build for you." />
      <Services />
    </div>
  );
}
