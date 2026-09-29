import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  supporting,
  className,
  id,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  supporting?: string;
  className?: string;
  /** Applied to the `<h2>` so a wrapping `<section aria-labelledby>` resolves. */
  id?: string;
}) {
  return (
    <div className={cn("mb-14 sm:mb-20", className)}>
      <Reveal>
        <div className="mb-6 flex items-center gap-4">
          {index && <span className="font-mono text-[0.6875rem] tracking-label text-primary-glow">{index}</span>}
          <span className="eyebrow">{eyebrow}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2 id={id} className="display-2 max-w-[16ch] text-balance">{title}</h2>
      </Reveal>
      {supporting && (
        <Reveal delay={180}>
          <p className="lead mt-6">{supporting}</p>
        </Reveal>
      )}
    </div>
  );
}
