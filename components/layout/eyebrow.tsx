export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="chip-gradient text-foreground/80 bg-card/60 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase backdrop-blur">
      <span className="relative flex size-2">
        <span className="bg-brand-pink absolute inline-flex size-full animate-ping rounded-full opacity-75" />
        <span className="bg-brand-violet relative inline-flex size-2 rounded-full" />
      </span>
      {children}
    </span>
  );
}
