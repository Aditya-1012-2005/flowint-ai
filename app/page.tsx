import Link from 'next/link';
import { ArrowRight, Clock, TriangleAlert, Repeat2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { SolutionCard } from '@/components/features/solution-card';
import { solutions, howItWorks } from '@/lib/utils/content';

const problems = [
  {
    icon: TriangleAlert,
    title: 'Spreadsheets that break',
    description:
      "One wrong cell and the numbers stop adding up. Files get overwritten, and nobody's sure which version is right.",
  },
  {
    icon: Repeat2,
    title: 'The same work, again and again',
    description:
      "Copying figures from bills into Excel, every single day. It's slow, it's dull, and mistakes creep in.",
  },
  {
    icon: Clock,
    title: 'No time for the actual business',
    description:
      'Hours go into managing records instead of serving customers, buying smarter, or growing.',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-border border-b">
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-primary text-sm font-semibold">
              For small businesses & local vendors
            </p>
            <h1 className="text-foreground mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Run your business on automation, not on Excel and memory.
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
              Flowint AI brings simple, affordable automation to businesses still doing everything
              by hand — so stock, billing and records take care of themselves.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
                size="lg"
                className="bg-cta text-cta-foreground hover:bg-cta-hover w-full sm:w-auto"
              >
                Book a free demo
                <ArrowRight className="size-4" />
              </Button>
              <Button
                render={<Link href="/solutions" />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                See what we can automate
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* The problem */}
      <section className="bg-background-subtle">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight">
              The manual way is costing you more than you think
            </h2>
            <p className="text-muted-foreground mt-4">
              If any of this sounds familiar, you&apos;re exactly who we build for.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problems.map((problem) => (
              <div key={problem.title} className="border-border bg-card rounded-lg border p-6">
                <div className="bg-cta/10 text-cta flex size-11 items-center justify-center rounded-lg">
                  <problem.icon className="size-6" aria-hidden />
                </div>
                <h3 className="text-foreground mt-4 text-lg font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{problem.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Solutions preview */}
      <section>
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight">
              What Flowint AI can take off your plate
            </h2>
            <p className="text-muted-foreground mt-4">
              Practical automation for the everyday work that keeps a small business running.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {solutions.map((solution) => (
              <SolutionCard key={solution.title} solution={solution} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button render={<Link href="/solutions" />} nativeButton={false} variant="outline">
              Explore all solutions
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-background-subtle">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight">
              Simple to start. Nothing to relearn.
            </h2>
            <p className="text-muted-foreground mt-4">
              We build around how you already work — no jargon, no complicated software.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.step}>
                <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-foreground mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section>
        <Container className="py-16 sm:py-24">
          <div className="bg-primary rounded-2xl px-6 py-14 text-center sm:px-12">
            <h2 className="text-primary-foreground text-3xl font-bold tracking-tight">
              Ready to spend less time on paperwork?
            </h2>
            <p className="text-primary-foreground/80 mx-auto mt-4 max-w-xl">
              Tell us a little about your business and we&apos;ll show you exactly what we can
              automate — with a free, no-pressure demo.
            </p>
            <div className="mt-8">
              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
                size="lg"
                className="bg-cta text-cta-foreground hover:bg-cta-hover"
              >
                Book your free demo
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
