/**
 * Canonical public URL, used for metadataBase, sitemap, robots and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production; Vercel's production URL is the fallback.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const siteConfig = {
  name: 'Flowint AI',
  url: siteUrl,
  tagline: 'Automation for the small businesses that run on Excel, registers, and instinct.',
  description:
    'Flowint AI builds affordable AI automation for small businesses in India: automated inventory, GST invoicing, WhatsApp order capture, AI data entry and live business reports, set up around the way you already work.',
  keywords: [
    'AI automation for small business',
    'business process automation',
    'AI automation agency India',
    'workflow automation',
    'small business automation software',
    'WhatsApp order automation',
    'GST invoice automation',
    'inventory management automation',
    'AI data entry automation',
    'Excel automation',
    'AI document processing',
    'automated business reports',
    'no-code automation for SMEs',
    'AI agents for business',
  ],
  locale: 'en_IN',
  phone: '+91 85913 89642',
  phoneHref: 'tel:+918591389642',
  email: 'iyeradi112@gmail.com',
  emailHref: 'mailto:iyeradi112@gmail.com',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;

/** Serialise JSON-LD safely for a <script> tag (escapes `<` to block HTML injection). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
