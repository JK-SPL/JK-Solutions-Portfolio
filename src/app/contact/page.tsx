import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactBrief } from "@/components/sections/ContactBrief";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/social/SocialLinks";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me what you're building — an interactive project brief, not a contact form.",
};

const FLOW = ["VISITOR", "PROJECT ENQUIRY", "LEAD", "CRM", "FOLLOW-UP", "CLIENT", "PROJECT"];

export default function ContactPage() {
  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <SectionHeading
        eyebrow="CONTACT"
        title="What are you building?"
        supporting="This brief goes straight into the same pipeline I build for clients."
      />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <ContactBrief />
        </div>

        <Reveal delay={150}>
          {/* Brief flow visualization */}
          <div className="border border-line bg-panel p-7 mb-8">
            <p className="eyebrow mb-6">WHERE A BRIEF GOES</p>
            <ol className="space-y-3">
              {FLOW.map((f, i) => (
                <li key={f} className="flex items-center gap-4 group">
                  <span className="font-mono text-[0.625rem] text-faint group-hover:text-primary-glow transition-colors">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-mute group-hover:text-paper transition-colors">{f}</span>
                  {i < FLOW.length - 1 && <span className="text-faint group-hover:text-primary-glow transition-colors" aria-hidden="true">↓</span>}
                </li>
              ))}
            </ol>
          </div>

          {/* Alternative contact methods — rendered from the central profile config */}
          <div className="border border-line bg-panel p-7">
            <p className="eyebrow mb-6">OTHER WAYS TO REACH ME</p>
            <SocialLinks variant="cards" />
          </div>

          {/* Office hours / availability */}
          <div className="border border-line bg-panel p-7">
            <p className="eyebrow mb-4">AVAILABILITY</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between p-3 border border-line bg-void">
                <span className="font-mono text-[0.625rem] uppercase tracking-label text-faint">MON–FRI</span>
                <span className="text-sm text-paper">10:00 – 19:00 IST</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-line bg-void">
                <span className="font-mono text-[0.625rem] uppercase tracking-label text-faint">SAT</span>
                <span className="text-sm text-paper">10:00 – 14:00 IST</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-line bg-void">
                <span className="font-mono text-[0.625rem] uppercase tracking-label text-faint">SUN</span>
                <span className="text-sm text-paper">Closed</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-line bg-void">
                <span className="font-mono text-[0.625rem] uppercase tracking-label text-faint">RESPONSE TIME</span>
                <span className="text-sm text-primary-glow">Within 24 hours</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}