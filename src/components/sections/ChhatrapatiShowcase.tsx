"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * What a SevaDesk tenant actually receives. The module list is derived from the
 * documented architecture in `data/projects.ts` — every label here traces back
 * to a real module, and nothing is presented as a measured outcome.
 */
const TENANT_MODULES = [
  { id: "website", label: "PUBLIC WEBSITE", description: "Business website with services, booking and announcements, authored per tenant.", category: "Front" },
  { id: "catalog", label: "SERVICE CATALOG", description: "Searchable service directory with categories, documents, fees and booking links.", category: "Front" },
  { id: "booking", label: "CUSTOMER BOOKING", description: "Availability, confirmations, reminders and WhatsApp notification on every booking.", category: "Front" },
  { id: "announcements", label: "ANNOUNCEMENTS", description: "Published notices with categories, expiry and audience targeting.", category: "Front" },
  { id: "crm", label: "CRM", description: "Leads, customers, communication log, tags, notes and follow-ups in one record.", category: "Back" },
  { id: "customers", label: "CUSTOMERS", description: "Unified customer profiles with history, documents, preferences and communication timeline.", category: "Back" },
  { id: "employees", label: "EMPLOYEES", description: "Staff records, roles, shifts, documents, leave and attendance in one place.", category: "Back" },
  { id: "attendance", label: "ATTENDANCE", description: "GPS check-in, geofenced worksites, selfie verification and reports.", category: "Back" },
  { id: "communication", label: "COMMUNICATION", description: "WhatsApp, email and SMS with templates and broadcast, every message auditable.", category: "Back" },
] as const;

const ARCHITECTURE = [
  "One Next.js deployment serves many tenants",
  "Tenant data isolated by tenancy checks on every request",
  "Per-tenant branding, content, modules and domain resolved from configuration",
  "Feature flags control module availability per tenant",
  "Shared design system and component layer across every tenant",
] as const;

export function ChhatrapatiShowcase() {
  const [activeTab, setActiveTab] = useState<"front" | "back" | "architecture">("front");

  const frontModules = TENANT_MODULES.filter((m) => m.category === "Front");
  const backModules = TENANT_MODULES.filter((m) => m.category === "Back");

  return (
    <section aria-labelledby="chhatrapati" className="border-y border-line bg-ink">
      <div className="shell py-24 sm:py-36">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="chip border-primary-glow/60 bg-primary/10 text-paper">DEMO TENANT</span>
            <span className="chip border-electric/60 bg-electric/10 text-electric">POWERED BY SEVADESK</span>
            <span className="chip border-cyan-soft/60 bg-cyan-soft/10 text-cyan-soft">LIVE AT ESCRM.IN</span>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="display-2 max-w-[24ch]">CHHATRAPATI ONLINE SERVICE</h2>
        </Reveal>
        <Reveal delay={170}>
          <p className="lead mt-5 max-w-[56ch]">
            A real service business running on SevaDesk — proof of what a tenant gets:
            a public presence on the front, a connected operations system behind it.
          </p>
        </Reveal>

        {/* Module tabs */}
        <Reveal delay={240}>
          <div className="mt-12" role="tablist" aria-label="Tenant module views">
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: "front", label: "CITIZEN-FACING", count: frontModules.length },
                { id: "back", label: "BACK-OFFICE", count: backModules.length },
                { id: "architecture", label: "ARCHITECTURE", count: ARCHITECTURE.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id as "front" | "back" | "architecture")}
                  className={cn(
                    "border px-4 py-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-all duration-300 flex items-center gap-2",
                    activeTab === tab.id
                      ? "border-primary-glow bg-primary/10 text-paper"
                      : "border-line text-mute hover:border-faint hover:text-paper"
                  )}
                >
                  {tab.label}
                  <span className="text-[0.625rem] text-faint">({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Front modules */}
            {activeTab === "front" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" role="tabpanel" aria-label="Citizen-facing modules">
                {frontModules.map((m, i) => (
                  <article
                    key={m.id}
                    className={cn(
                      "border border-line bg-void p-6 transition-all duration-300",
                      "hover:border-faint hover:bg-panel"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[0.6875rem] leading-none text-primary-glow" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[0.625rem] uppercase tracking-label text-primary-glow mb-1">
                          {m.category}
                        </p>
                        <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper mb-1">
                          {m.label}
                        </h3>
                        <p className="text-sm text-mute line-clamp-2">{m.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Back modules */}
            {activeTab === "back" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" role="tabpanel" aria-label="Back-office modules">
                {backModules.map((m, i) => (
                  <article
                    key={m.id}
                    className={cn(
                      "border border-line bg-void p-6 transition-all duration-300",
                      "hover:border-faint hover:bg-panel"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[0.6875rem] leading-none text-electric" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[0.625rem] uppercase tracking-label text-electric mb-1">
                          {m.category}
                        </p>
                        <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper mb-1">
                          {m.label}
                        </h3>
                        <p className="text-sm text-mute line-clamp-2">{m.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Architecture */}
            {activeTab === "architecture" && (
              <div className="space-y-3" role="tabpanel" aria-label="Architecture details">
                {ARCHITECTURE.map((a, i) => (
                  <article key={i} className="group flex items-center gap-4 p-4 border border-line bg-void transition-colors hover:bg-panel">
                    <span className="font-mono text-[0.625rem] text-faint shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-relaxed text-mute group-hover:text-paper transition-colors">{a}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={400}>
          <div className="mt-16 flex items-center justify-center gap-6 border-t border-line pt-12">
            <Link
              href="https://escrm.in"
              target="_blank"
              rel="noopener noreferrer" data-lit
              className="flex-shrink-0 border border-line px-8 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper transition-colors hover:border-faint hover:bg-panel"
            >
              View Live Tenant ↗
            </Link>
            <Link
              href="/work/chhatrapati-online-service" data-lit
              className="flex-shrink-0 border border-primary-glow/60 bg-primary/10 px-8 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-primary/25"
            >
              Read Case Study ↗
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}