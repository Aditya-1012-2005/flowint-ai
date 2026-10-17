import type { Metadata, Viewport } from 'next';
import { Inter, Bricolage_Grotesque } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';
import { siteConfig, jsonLd } from '@/lib/utils/site';
import { solutions } from '@/lib/utils/content';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const bricolage = Bricolage_Grotesque({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

const defaultTitle = `${siteConfig.name}: AI Automation for Small Businesses in India`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  category: 'technology',
  openGraph: {
    title: defaultTitle,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: true, email: true },
};

export const viewport: Viewport = {
  themeColor: '#fbf9f3',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: { '@type': 'Country', name: 'India' },
      knowsAbout: siteConfig.keywords,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Business automation services',
        itemListElement: solutions.map((solution) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: solution.title,
            description: solution.summary,
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: 'en-IN',
      publisher: { '@id': `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${bricolage.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationJsonLd)} />
        <a
          href="#main"
          className="bg-foreground text-background sr-only z-[60] rounded-full px-4 py-2 text-sm font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
