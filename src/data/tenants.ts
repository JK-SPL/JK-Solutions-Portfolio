/**
 * TNT_REGISTRY — tenant registry for the SevaDesk multi-tenant platform.
 *
 * Each tenant maps to public product routes served by this site. The sitemap
 * derives tenant URLs from this registry — tenant base + services index +
 * each service detail route.
 *
 * RULE: only advertise routes that actually exist as pages. A tenant whose
 * product pages are not built yet (live: false) contributes zero sitemap
 * entries — its case study may still live under /work, but no product URLs
 * are emitted for it.
 */

export interface TenantService {
  slug: string;
  title: string;
  summary: string;
}

export interface TenantEntry {
  id: string;
  name: string;
  tagline: string;
  /** Public base path for the tenant's product pages. */
  base: string;
  /** Service detail pages under `${base}/services/[slug]`. */
  services: TenantService[];
  /** false → tenant contributes no sitemap URLs (pages not built yet). */
  live: boolean;
}

export const TNT_REGISTRY: TenantEntry[] = [
  {
    id: "aaradhya",
    name: "Aaradhya Online Seva Kendra",
    tagline: "Digital citizen assistance — applications, certificates and corrections, done right.",
    base: "/products/aaradhya",
    services: [
      {
        slug: "aadhaar-services",
        title: "Aadhaar Services",
        summary: "New enrolment, mobile-number update, address correction and biometric updates — with document check before you visit.",
      },
      {
        slug: "pan-card",
        title: "PAN Card Services",
        summary: "New PAN applications, reprint and correction requests with form-filling assistance and status tracking.",
      },
      {
        slug: "passport-assistance",
        title: "Passport Assistance",
        summary: "Application filing, appointment scheduling and document verification support for fresh and reissue cases.",
      },
      {
        slug: "income-certificate",
        title: "Income & Domicile Certificates",
        summary: "Income, domicile, caste-validity and non-creamy-layer certificate applications with follow-up until issued.",
      },
    ],
    live: true,
  },
  {
    id: "chhatrapati",
    name: "Chhatrapati Online Service",
    tagline: "SevaDesk tenant — website, services, bookings and back office, live.",
    base: "/products/chhatrapati",
    // No product pages built yet — case study only (see /work/chhatrapati-online-service).
    services: [],
    live: false,
  },
];

/**
 * Public product paths derived from the registry. Only includes routes for
 * live tenants, so every returned path corresponds to a real page.
 */
export function tenantSitemapPaths(): string[] {
  const paths: string[] = [];
  for (const tenant of TNT_REGISTRY) {
    if (!tenant.live) continue;
    paths.push(tenant.base);
    paths.push(`${tenant.base}/services`);
    for (const service of tenant.services) {
      paths.push(`${tenant.base}/services/${service.slug}`);
    }
  }
  return paths;
}

export function getTenant(id: string): TenantEntry | undefined {
  return TNT_REGISTRY.find((t) => t.id === id && t.live);
}
