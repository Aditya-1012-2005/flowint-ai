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
    <div className="border-border bg-card flex flex-col rounded-lg border p-6 shadow-sm">
      <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-lg">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="text-foreground mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{summary}</p>

      {showDetails && (
        <ul className="border-border mt-4 space-y-2 border-t pt-4">
          {details.map((detail) => (
            <li key={detail} className="text-muted-foreground flex gap-2 text-sm">
              <span aria-hidden className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
