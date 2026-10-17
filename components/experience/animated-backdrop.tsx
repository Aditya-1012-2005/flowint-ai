/**
 * Full-viewport vibrant backdrop: drifting gradient blobs plus a faint grid.
 * Pure CSS animation, fixed behind all content, no JS, respects reduced motion
 * (the blobs stop drifting via the global media query in globals.css).
 */
export function AnimatedBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklab, var(--foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 5%, transparent) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
      {/* Drifting colour blobs */}
      <div
        className="animate-blob absolute -top-32 -left-24 size-[32rem] rounded-full opacity-45 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--brand-violet), transparent 70%)' }}
      />
      <div
        className="animate-blob absolute -top-10 right-[-6rem] size-[26rem] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--brand-cyan), transparent 70%)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="animate-blob absolute top-[48%] left-[-4rem] size-[24rem] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--brand-pink), transparent 70%)',
          animationDelay: '-13s',
        }}
      />
    </div>
  );
}
