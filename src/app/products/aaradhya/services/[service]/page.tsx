import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTenant } from "@/data/tenants";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  const tenant = getTenant("aaradhya");
  return (tenant?.services ?? []).map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getTenant("aaradhya")?.services.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.title} — Aaradhya`,
    description: service.summary,
  };
}

export default async function AaradhyaServiceDetailPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const tenant = getTenant("aaradhya");
  const service = tenant?.services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <div className="shell pb-28 pt-36 sm:pt-44">
      <p className="eyebrow mb-6 text-primary-glow">
        <Link href="/products/aaradhya" className="underline-offset-4 hover:underline">
          AARADHYA
        </Link>{" "}
        /{" "}
        <Link href="/products/aaradhya/services" className="underline-offset-4 hover:underline">
          SERVICES
        </Link>
      </p>
      <h1 className="display-1">{service.title.toUpperCase()}</h1>
      <p className="lead mt-8 max-w-2xl">{service.summary}</p>
      <div className="mt-10 border border-line bg-panel p-8">
        <h2 className="font-display text-lg font-semibold text-paper">How it works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-mute">
          <li>Bring your existing documents to the Kendra for a pre-check.</li>
          <li>We fill the forms and file the application with you.</li>
          <li>We track the status and follow up until it is issued.</li>
        </ol>
      </div>
      <div className="mt-10">
        <ButtonLink href="/contact">Enquire about this service</ButtonLink>
      </div>
    </div>
  );
}
