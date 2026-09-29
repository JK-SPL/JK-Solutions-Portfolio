import Link from "next/link";
import { NAV_LINKS, SITE } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/social/SocialLinks";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="shell py-20 sm:py-28">
        <Reveal>
          <p className="display-1 max-w-[14ch]">
            LET&rsquo;S BUILD SOMETHING
            <br />
            <span className="text-mute">WORTH REMEMBERING.</span>
          </p>
        </Reveal>
        <Reveal delay={140}>
          <Link
            href="/contact"
            data-lit
            className="mt-12 inline-flex items-center gap-4 font-mono text-[0.75rem] uppercase tracking-label text-paper transition-colors hover:text-primary-glow"
          >
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-sm font-bold tracking-[0.08em] text-paper" aria-label="JK SOLUTIONS — home">
              JK&nbsp;SOLUTIONS
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-mute max-w-xs">
              AI-assisted product building, automation and immersive digital experiences — engineered for real life.
            </p>
            <SocialLinks variant="icon-row" className="mt-8" />
          </div>

          {/* Navigation columns */}
          <nav aria-label="Footer navigation" className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint mb-4">EXPLORE</h4>
                <ul className="space-y-3">
                  {NAV_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint mb-4">CAPABILITIES</h4>
                <ul className="space-y-3">
                  <li><Link href="/capabilities" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">Digital Experiences</Link></li>
                  <li><Link href="/capabilities" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">Business Systems</Link></li>
                  <li><Link href="/capabilities" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">SaaS Products</Link></li>
                  <li><Link href="/capabilities" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">Automation</Link></li>
                  <li><Link href="/capabilities" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">AI</Link></li>
                  <li><Link href="/capabilities" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">Infrastructure</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint mb-4">PRODUCTS</h4>
                <ul className="space-y-3">
                  <li><Link href="/products/sevadesk" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">SevaDesk</Link></li>
                  <li><Link href="/products/jk-attendance" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">JK Attendance</Link></li>
                  <li><Link href="/work/chhatrapati-online-service" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">Chhatrapati (Tenant)</Link></li>
                  <li><Link href="/lab" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">Lab Experiments</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint mb-4">CONNECT</h4>
                <ul className="space-y-3">
                  <li><Link href="/contact" className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-paper">Start a Project</Link></li>
                </ul>
                <SocialLinks variant="list" className="mt-3" />
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-16 border-t border-line pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
            © {new Date().getFullYear()} {SITE.name} — {SITE.tagline}
          </p>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-faint">
            Built with AI. Engineered for real life.
          </p>
        </div>
      </div>
    </footer>
  );
}