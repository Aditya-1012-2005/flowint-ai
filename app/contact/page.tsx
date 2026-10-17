import type { Metadata } from 'next';
import { Clock, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ContactForm } from '@/components/features/contact-form';
import { Reveal } from '@/components/experience/reveal';
import { siteConfig } from '@/lib/utils/site';

export const metadata: Metadata = {
  title: 'Book a Free AI Automation Demo',
  description:
    'Book a free, no-pressure demo with Flowint AI. Tell us about your business and see how AI automation can handle your inventory, invoicing, WhatsApp orders and data entry.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact' },
};

const points = [
  {
    icon: Clock,
    title: 'A free, no-pressure demo',
    description: 'We look at your business and show you the quickest wins, with no commitment.',
  },
  {
    icon: MessageCircle,
    title: 'A real conversation',
    description: 'You talk to a person who wants to understand your work, not a sales script.',
  },
  {
    icon: MapPin,
    title: 'We come to you',
    description: 'We start from your current process, Excel and registers and WhatsApp included.',
  },
];

export default function ContactPage() {
  return (
    <section data-guide-section="📬 Book a Demo — fill this in and we'll be in touch. I'll wait right here!">

      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h1 className="text-foreground text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Book your free <span className="text-gradient">automation demo</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              Fill in a few details and we will get in touch to set up a time. Tell us what is
              slowing you down and we will show you how it could run itself.
            </p>

            <ul className="mt-10 space-y-6">
              {points.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-2xl">
                    <point.icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <h2 className="text-foreground font-bold">{point.title}</h2>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-border mt-10 border-t pt-6">
              <p className="text-muted-foreground text-sm">Prefer to talk? Reach us directly.</p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={siteConfig.phoneHref}
                  className="text-foreground hover:text-primary inline-flex items-center gap-2 text-lg font-bold"
                >
                  <Phone className="text-primary size-5" aria-hidden />
                  {siteConfig.phone}
                </a>
                <a
                  href={siteConfig.emailHref}
                  className="text-foreground hover:text-primary inline-flex items-center gap-2 text-lg font-bold"
                >
                  <Mail className="text-primary size-5" aria-hidden />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </Reveal>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
