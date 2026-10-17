import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { SolutionCard } from '@/components/features/solution-card';
import { Eyebrow } from '@/components/layout/eyebrow';
import { Reveal } from '@/components/experience/reveal';
import { Magnetic } from '@/components/experience/magnetic';
import { solutions } from '@/lib/utils/content';

export const metadata: Metadata = {
  title: 'AI Automation Solutions for Small Businesses',
  description:
    'Inventory management automation, GST invoice automation, WhatsApp order automation, AI data entry, workflow automation and automated reports, built for small and local businesses in India.',
  alternates: { canonical: '/solutions' },
  openGraph: { url: '/solutions' },
};

export default function SolutionsPage() {
  return (
    <>
      <section
        data-guide-section="🛠️ Solutions — everything we can automate, laid out for you."
        className="border-border/60 border-b bg-background-subtle/60"
      >
        <Container className="py-12 sm:py-16">
          <Reveal stagger className="max-w-2xl">
            <Eyebrow>Solutions</Eyebrow>
            <h1 className="text-foreground mt-5 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              AI automation for the <span className="text-gradient">work that keeps you busy</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              You do not need to change how your business works. We add simple, affordable
              automation around your existing process, starting with whatever is slowing you down
              most.
            </p>
          </Reveal>
        </Container>
      </section>

      <section data-guide-section="🔍 The Full Menu — hover any card to see exactly what it does.">
        <Container className="py-12 sm:py-16">
          <Reveal stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => (
              <SolutionCard key={solution.title} solution={solution} showDetails />
            ))}
          </Reveal>
        </Container>
      </section>

      <section
        data-guide-section="🤔 Not Sure Where to Start? Book a demo and we'll find your quickest win."
        className="border-border/60 border-t bg-background-subtle/60"
      >
        <Container className="py-12 sm:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              Not sure where to start?
            </h2>
            <p className="text-muted-foreground mt-4">
              That is normal. Book a free demo and we will look at your business together and point
              out the quickest wins.
            </p>
            <div className="mt-8 flex justify-center">
              <Magnetic className="inline-block">
                <Button
                  render={<Link href="/contact" />}
                  nativeButton={false}
                  size="lg"
                  className="bg-cta text-cta-foreground hover:bg-cta-hover shadow-glow h-12 rounded-full px-7 text-base font-semibold"
                >
                  Book a free demo
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
