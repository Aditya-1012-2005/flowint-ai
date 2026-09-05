import Link from 'next/link';
import { siteConfig } from '@/lib/utils/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-background-subtle border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-foreground text-lg font-bold">{siteConfig.name}</p>
          <p className="text-muted-foreground mt-1 max-w-sm text-sm">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-border border-t px-4 py-4 sm:px-8">
        <p className="text-muted-foreground text-xs">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
