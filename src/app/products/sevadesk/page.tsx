import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "SevaDesk",
  description: "Flagship multi-tenant business operating platform — website, CRM, customers, bookings, employees and attendance, connected.",
};

const PILLARS = [
  { title: "BUSINESS WEBSITE", desc: "Every tenant gets a public website — services, announcements and bookings included." },
  { title: "CRM & CUSTOMERS", desc: "Leads become customers; conversations and history stay attached to them." },
  { title: "BOOKINGS", desc: "Customers book services online; the business sees its day in one place." },
  { title: "EMPLOYEES & ATTENDANCE", desc: "Staff records and attendance live next to the operation they support." },
  { title: "COMMUNICATION", desc: "Announcements and updates reach customers from the same system that runs the business." },
  { title: "TENANT SYSTEM", desc: "Each business is isolated — its data, its branding, its people. One platform, many businesses." },
];

export default function SevaDeskPage() {
  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <p className="eyebrow mb-6 text-primary-glow">FLAGSHIP PRODUCT — 01</p>
      <h1 className="display-1">SEVADESK</h1>
      <p className="mt-6 font-display text-2xl text-mute sm:text-3xl">Business operations, connected.</p>
      <p className="lead mt-8">
        A small business shouldn&rsquo;t need five disconnected subscriptions to run its day.
        SevaDesk runs the public website and the back office as one system — per tenant, isolated and branded.
      </p>

      <div className="mt-20">
        <SectionHeading eyebrow="SYSTEM" title="One platform. Every operation." />
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80} className="bg-void p-8">
              <h2 className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-paper">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mute">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20 border border-line bg-panel p-8 sm:p-12">
        <SectionHeading eyebrow="PROOF" title="Running on a real business." className="mb-8" />
        <p className="lead">
          Chhatrapati Online Service operates as a tenant on SevaDesk — website, services, bookings and back office, live.
        </p>
        <div className="mt-8">
          <ButtonLink href="/work/chhatrapati-online-service" variant="ghost">
            View the demo tenant
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
