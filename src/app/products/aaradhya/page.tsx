import type { Metadata } from "next";
import Link from "next/link";
import { getTenant } from "@/data/tenants";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Aaradhya Online Seva Kendra",
  description: "Digital citizen assistance centre — Aadhaar, PAN, passport and certificate services, run on the SevaDesk platform.",
};

export default function AaradhyaPage() {
  const tenant = getTenant("aaradhya");
  if (!tenant) return null;

  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <p className="eyebrow mb-6 text-primary-glow">SEVADESK TENANT</p>
      <h1 className="display-1">AARADHYA</h1>
      <p className="mt-6 font-display text-2xl text-mute sm:text-3xl">Online Seva Kendra</p>
      <p className="lead mt-8">{tenant.tagline}</p>
      <p className="mt-6 max-w-2xl text-mute">
        A private digital citizen assistance centre in Pimprala, Jalgaon. The public
        site, service bookings, document tracking and the back office run as one
        system on the SevaDesk platform — so an enquiry on the site is the same
        record the staff work from.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="/products/aaradhya/services">Browse services</ButtonLink>
        <ButtonLink href="/work/aaradhya-online-seva-kendra" variant="ghost">
          Read the case study
        </ButtonLink>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {tenant.services.map((service) => (
          <Link
            key={service.slug}
            href={`/products/aaradhya/services/${service.slug}`}
            className="border border-line bg-panel p-8 transition-colors hover:border-primary-glow"
          >
            <h2 className="font-display text-xl font-semibold text-paper">{service.title}</h2>
            <p className="mt-3 text-sm text-mute">{service.summary}</p>
          </Link>
        ))}
      </div>
      <p className="mt-12 text-xs text-faint">
        <Link href="/products/aaradhya/services" className="underline underline-offset-4">
          View all services
        </Link>
      </p>
    </div>
  );
}
