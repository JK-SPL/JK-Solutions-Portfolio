import type { Metadata } from "next";
import Link from "next/link";
import { getTenant } from "@/data/tenants";

export const metadata: Metadata = {
  title: "Aaradhya Services",
  description: "All citizen services offered at Aaradhya Online Seva Kendra — Aadhaar, PAN, passport, certificates.",
};

export default function AaradhyaServicesPage() {
  const tenant = getTenant("aaradhya");
  if (!tenant) return null;

  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <p className="eyebrow mb-6 text-primary-glow">
        <Link href="/products/aaradhya" className="underline-offset-4 hover:underline">
          AARADHYA
        </Link>{" "}
        / SERVICES
      </p>
      <h1 className="display-1">SERVICES</h1>
      <p className="lead mt-8 max-w-2xl">
        Every service includes document pre-check, form filling and status
        follow-up — you visit once, with the right paperwork.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {tenant.services.map((service) => (
          <Link
            key={service.slug}
            href={`/products/aaradhya/services/${service.slug}`}
            className="border border-line bg-panel p-8 transition-colors hover:border-primary-glow"
          >
            <h2 className="font-display text-xl font-semibold text-paper">{service.title}</h2>
            <p className="mt-3 text-sm text-mute">{service.summary}</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-primary-glow">
              Details →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
