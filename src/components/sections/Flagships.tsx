import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/**
 * SEVADESK — flagship product showcase. Conceptual module map, no fake UI.
 */
export function FlagshipSevaDesk() {
  const modules = [
    "BUSINESS WEBSITE",
    "CRM",
    "CUSTOMERS",
    "BOOKINGS",
    "ANNOUNCEMENTS",
    "EMPLOYEES",
    "ATTENDANCE",
    "COMMUNICATION",
    "TENANT SYSTEM",
  ];

  return (
    <div className="relative overflow-hidden border border-line bg-panel">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative grid grid-cols-1 gap-12 p-8 sm:p-14 lg:grid-cols-2 lg:p-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-glow" aria-hidden="true" />
              FLAGSHIP PRODUCT — 01
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="display-2">SEVADESK</h3>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 font-display text-xl text-mute sm:text-2xl">
              Business operations, connected.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="lead mt-6">
              A multi-tenant platform where one business gets its website, CRM, customers, bookings,
              announcements, employees and attendance — as one system, not five subscriptions.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/products/sevadesk">View product</ButtonLink>
              <ButtonLink href="/work/chhatrapati-online-service" variant="ghost">
                See a live tenant
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="self-center">
          <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3" aria-label="SevaDesk modules">
            {modules.map((m) => (
              <li
                key={m}
                className="group flex min-h-[5.5rem] items-center justify-center bg-void p-4 text-center transition-colors duration-300 hover:bg-primary/10"
              >
                <Link
                  href="/products/sevadesk"
                  className="font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.18em] text-mute transition-colors group-hover:text-paper"
                >
                  {m}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}

/**
 * JK ATTENDANCE — second flagship showcase.
 */
export function FlagshipAttendance() {
  const modules = ["GPS", "GEOFENCE", "SELFIE", "EMPLOYEE", "ADMIN", "REPORTS"];

  return (
    <div className="relative overflow-hidden border border-line bg-panel">
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-electric/15 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative grid grid-cols-1 gap-12 p-8 sm:p-14 lg:grid-cols-2 lg:p-20">
        <Reveal delay={200} className="order-2 self-center lg:order-1">
          <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3" aria-label="JK Attendance capabilities">
            {modules.map((m) => (
              <li
                key={m}
                className="group flex min-h-[5.5rem] items-center justify-center bg-void p-4 text-center transition-colors duration-300 hover:bg-electric/10"
              >
                <Link
                  href="/products/jk-attendance"
                  className="font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.18em] text-mute transition-colors group-hover:text-paper"
                >
                  {m}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-electric" aria-hidden="true" />
              FLAGSHIP PRODUCT — 02
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="display-2">JK ATTENDANCE</h3>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 font-display text-xl text-mute sm:text-2xl">Attendance, reimagined.</p>
          </Reveal>
          <Reveal delay={220}>
            <p className="lead mt-6">
              Location-aware check-ins, geofenced worksites and selfie verification — attendance
              engineered for real field conditions, not ideal ones.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10">
              <ButtonLink href="/products/jk-attendance">View product</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
