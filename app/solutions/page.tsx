import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { SolutionCard } from '@/components/features/solution-card';
import { Eyebrow } from '@/components/layout/eyebrow';
import { solutions } from '@/lib/utils/content';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'The everyday business work Flowint AI can automate: inventory, billing, data entry and reporting, for small vendors and local businesses.',
};

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-background-subtle border-border border-b">
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <Eyebrow>Solutions</Eyebrow>
            <h1 className="text-foreground mt-5 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Automation for the work that keeps you busy
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              You do not need to change how your business works. We add simple automation around
              your existing process, starting with whatever is slowing you down most.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-24">
          <div className="grid gap-6 sm:grid-cols-2">
            {solutions.map((solution) => (
              <SolutionCard key={solution.title} solution={solution} showDetails />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background-subtle border-border border-t">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              Not sure where to start?
            </h2>
            <p className="text-muted-foreground mt-4">
              That is normal. Book a free demo and we will look at your business together and point
              out the quickest wins.
            </p>
            <div className="mt-8">
              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
                size="lg"
                className="bg-cta text-cta-foreground hover:bg-cta-hover h-12 rounded-full px-7 text-base font-semibold"
              >
                Book a free demo
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
