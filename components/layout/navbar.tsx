'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/experience/magnetic';
import { siteConfig } from '@/lib/utils/site';
import { cn } from 'cn';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="border-border/60 bg-background/70 supports-backdrop-filter:bg-background/55 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="text-foreground font-display text-xl font-extrabold tracking-tight"
          onClick={() => setOpen(false)}
          aria-label="Flowint AI home"
        >
          Flowint<span className="text-gradient">.</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group/nav relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    'from-brand-violet to-brand-pink absolute inset-x-3.5 -bottom-0 h-0.5 origin-center rounded-full bg-gradient-to-r transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)]',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Magnetic>
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              data-guide="Need a demo? I'm one tap away up here. ⚡"
              className="bg-cta text-cta-foreground hover:bg-cta-hover shadow-glow rounded-full px-5 font-semibold"
            >
              Book a demo
            </Button>
          </Magnetic>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="text-foreground border-border inline-flex size-10 items-center justify-center rounded-full border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-border bg-background border-t px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-xl px-3 py-2.5 text-sm font-medium',
                    pathname === item.href
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            className="bg-cta text-cta-foreground hover:bg-cta-hover mt-3 w-full rounded-full font-semibold"
            onClick={() => setOpen(false)}
          >
            Book a demo
          </Button>
        </nav>
      )}
    </header>
  );
}
