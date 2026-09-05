import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/utils/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-background-subtle border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="text-foreground font-display text-2xl font-extrabold tracking-tight">
            Flowint<span className="text-primary">.</span>
          </p>
          <p className="text-muted-foreground mt-2 text-sm">{siteConfig.tagline}</p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={siteConfig.phoneHref}
              className="text-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold"
            >
              <Phone className="size-4" aria-hidden />
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.emailHref}
              className="text-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold"
            >
              <Mail className="size-4" aria-hidden />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Explore
          </p>
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

      <div className="border-border border-t px-4 py-5 sm:px-8">
        <p className="text-muted-foreground text-xs">
          &copy; {year} {siteConfig.name}. Made for the businesses doing it the hard way.
        </p>
      </div>
    </footer>
  );
}
