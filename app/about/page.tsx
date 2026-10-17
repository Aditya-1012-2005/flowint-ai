import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/layout/eyebrow';
import { Reveal } from '@/components/experience/reveal';
import { Magnetic } from '@/components/experience/magnetic';

export const metadata: Metadata = {
  title: 'About Us: Affordable Business Automation',
  description:
    'Flowint AI is an AI automation company helping small vendors and local businesses in India replace manual, Excel-based work with affordable automation that fits how they already operate.',
  alternates: { canonical: '/about' },
  openGraph: { url: '/about' },
};

const values = [
  {
    title: 'Built for the people Excel forgot',
    description:
      'Most software is made for big companies with big budgets. We build for the shop, the vendor, the family business, the ones still doing it all by hand.',
  },
  {
    title: 'Simple beats clever',
    description:
      'If it needs a manual, we have not done our job. Our tools fit into your day without asking you to learn something complicated.',
  },
  {
    title: 'We meet you where you are',
    description:
      'Excel, registers, WhatsApp orders. We start with your real process and automate around it, at a pace that suits you.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section
        data-guide-section="👋 About Us — who we are and why we only build for small businesses."
        className="border-border/60 border-b bg-background-subtle/60"
      >
        <Container className="py-12 sm:py-16">
          <Reveal stagger className="max-w-2xl">
            <Eyebrow>About us</Eyebrow>
            <h1 className="text-foreground mt-5 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Technology for the businesses it{' '}
              <span className="text-gradient">usually skips</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              Flowint AI exists to put real AI and workflow automation within reach of small and
              local businesses, not just the ones with an IT department.
            </p>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-16">
          <Reveal className="text-foreground/80 mx-auto max-w-3xl space-y-6 text-lg leading-relaxed">
            <p>
              Across markets and neighbourhoods, countless businesses still run on spreadsheets,
              paper registers, and the owner&apos;s memory. It works, until it does not. A stock
              count goes wrong, an invoice is missed, a whole evening disappears into data entry.
            </p>
            <p>
              We started Flowint AI because that gap felt unfair. The tools that could save these
              businesses hours every week already exist. They are just built and priced for someone
              else. Our job is to bring that same automation down to earth: affordable, simple, and
              shaped around how small businesses actually work.
            </p>
            <p>
              We are a small team that would rather sit with a shop owner and understand their day
              than sell them software they do not need. We start small, prove the value, and grow
              from there.
            </p>
          </Reveal>
        </Container>
      </section>

      <section
        data-guide-section="💡 What We Believe — the principles behind every build."
        className="border-border/60 border-t bg-background-subtle/60"
      >
        <Container className="py-12 sm:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              What we believe
            </h2>
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card/70 rounded-3xl border border-border/60 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow"
              >
                <h3 className="text-foreground text-lg font-bold">{value.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section data-guide-section="🤝 Let's Talk — see what we can do for your business.">

        <Container className="py-12 sm:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              Let us see what we can do for your business
            </h2>
            <div className="mt-8 flex justify-center">
              <Magnetic className="inline-block">
                <Button
                  render={<Link href="/contact" />}
                  nativeButton={false}
                  size="lg"
                  className="bg-cta text-cta-foreground hover:bg-cta-hover shadow-glow h-12 rounded-full px-7 text-base font-semibold"
                >
                  Get in touch
                  <ArrowRight className="size-4" />
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
