export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-muted-foreground flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
      <span className="bg-cta inline-block h-3 w-3 rounded-[3px]" aria-hidden />
      {children}
    </span>
  );
}
