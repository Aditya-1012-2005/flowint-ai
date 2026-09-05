import type { Metadata } from 'next';
import { Mail, Phone, Clock } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ContactForm } from '@/components/features/contact-form';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'Tell Flowint AI about your business and book a free, no-pressure demo to see what we can automate for you.',
};

const points = [
  {
    icon: Clock,
    title: 'A free, no-pressure demo',
    description: "We'll look at your business and show you the quickest wins — no commitment.",
  },
  {
    icon: Mail,
    title: 'A real conversation',
    description: 'You talk to a person who wants to understand your work, not a sales script.',
  },
  {
    icon: Phone,
    title: 'We come to you',
    description: 'We start from your current process — Excel, registers, WhatsApp and all.',
  },
];

export default function ContactPage() {
  return (
    <section>
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              Book your free demo
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Fill in a few details and we&apos;ll get in touch to set up a time. Tell us
              what&apos;s slowing you down — we&apos;ll show you how it could run itself.
            </p>

            <ul className="mt-10 space-y-6">
              {points.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <point.icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <h2 className="text-foreground font-semibold">{point.title}</h2>
                    <p className="text-muted-foreground mt-1 text-sm">{point.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
