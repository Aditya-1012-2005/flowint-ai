import { Check } from 'lucide-react';
import type { Solution } from '@/lib/utils/content';

export function SolutionCard({
  solution,
  showDetails = false,
}: {
  solution: Solution;
  showDetails?: boolean;
}) {
  const { icon: Icon, title, summary, details } = solution;

  return (
    <div className="group bg-card/70 relative flex flex-col overflow-hidden rounded-3xl border border-border/60 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow">
      {/* Gradient wash that fades in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
        style={{ background: 'radial-gradient(circle, var(--brand-violet), transparent 70%)' }}
      />
      <div className="from-brand-violet to-brand-pink flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
        <Icon className="size-7" aria-hidden />
      </div>
      <h3 className="text-foreground mt-5 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-[0.95rem] leading-relaxed">{summary}</p>

      {showDetails && (
        <ul className="border-border/60 mt-5 space-y-3 border-t pt-5">
          {details.map((detail) => (
            <li key={detail} className="text-foreground/80 flex gap-2.5 text-sm">
              <span
                aria-hidden
                className="from-brand-violet to-brand-pink mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white"
              >
                <Check className="size-3" />
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
