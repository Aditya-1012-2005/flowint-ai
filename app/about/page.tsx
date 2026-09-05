import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/layout/eyebrow';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Flowint AI helps small vendors and local businesses adopt affordable automation, replacing manual, Excel-based work with tools that fit how they already operate.',
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
      <section className="bg-background-subtle border-border border-b">
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <Eyebrow>About us</Eyebrow>
            <h1 className="text-foreground mt-5 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Technology for businesses it usually skips
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              Flowint AI exists to put real automation within reach of small and local businesses,
              not just the ones with an IT department.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-24">
          <div className="text-foreground/80 mx-auto max-w-3xl space-y-6 text-lg leading-relaxed">
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
          </div>
        </Container>
      </section>

      <section className="bg-background-subtle border-border border-t">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              What we believe
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="border-border bg-card rounded-3xl border p-7">
                <h3 className="text-foreground text-lg font-bold">{value.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              Let us see what we can do for your business
            </h2>
            <div className="mt-8">
              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
                size="lg"
                className="bg-cta text-cta-foreground hover:bg-cta-hover h-12 rounded-full px-7 text-base font-semibold"
              >
                Get in touch
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
