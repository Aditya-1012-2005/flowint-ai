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
    <div className="border-border bg-card hover:border-foreground hover:shadow-pop flex flex-col rounded-3xl border-2 p-7 transition-all duration-200 hover:-translate-y-1">
      <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-2xl">
        <Icon className="size-7" aria-hidden />
      </div>
      <h3 className="text-foreground mt-5 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-[0.95rem] leading-relaxed">{summary}</p>

      {showDetails && (
        <ul className="border-border mt-5 space-y-3 border-t pt-5">
          {details.map((detail) => (
            <li key={detail} className="text-foreground/80 flex gap-2.5 text-sm">
              <span
                aria-hidden
                className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
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
