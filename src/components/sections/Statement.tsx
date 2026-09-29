import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/data/site";

/**
 * The positioning statement — deliberately short.
 *
 * This replaces a full-screen manifesto that repeated the same philosophy four
 * times across the old page. Three lines and one paragraph: what the work is,
 * then why it is built that way. Nothing here is new copy written to fill
 * space; the supporting sentence is the site's own existing statement.
 */
export function Statement() {
  return (
    <section aria-labelledby="statement" className="shell py-16 sm:py-20">
      <Reveal>
        <p className="eyebrow">03 / STATEMENT</p>
      </Reveal>
      <Reveal delay={60}>
        <h2
          id="statement"
          className="display-2 mt-6 max-w-[26ch] text-[clamp(1.9rem,4.4vw,3.75rem)]"
        >
          REAL PROBLEMS.
          <br />
          <span className="text-mute">REAL SYSTEMS.</span>
          <br />
          REAL PRODUCTS.
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-8 max-w-[58ch] text-[0.9375rem] leading-relaxed text-mute">
          {SITE.statement} Government IT taught me what &ldquo;it has to
          work&rdquo; means in practice, so every build here is engineered for
          real users, real data and real consequences — not for a demo reel.
        </p>
      </Reveal>
    </section>
  );
}
