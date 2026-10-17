import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, TriangleAlert, Repeat2, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { SolutionCard } from '@/components/features/solution-card';
import { Eyebrow } from '@/components/layout/eyebrow';
import { solutions, howItWorks, industries, faqs } from '@/lib/utils/content';
import { jsonLd } from '@/lib/utils/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const problems = [
  {
    icon: TriangleAlert,
    title: 'Spreadsheets that break',
    description:
      'One wrong cell and the numbers stop adding up. Files get overwritten, and nobody is sure which version is right.',
  },
  {
    icon: Repeat2,
    title: 'The same manual work, again and again',
    description:
      'Copying figures from bills into Excel, every single day. It is slow, it is dull, and mistakes creep in.',
  },
  {
    icon: Clock,
    title: 'No time for the actual business',
    description:
      'Hours go into managing records instead of serving customers, buying smarter, or growing.',
  },
];

const marquee = [
  'stock counts that add up',
  'GST invoices out on time',
  'WhatsApp orders logged automatically',
  'no more midnight data entry',
  'one source of truth',
  'fewer costly mistakes',
  'your evenings back',
];

const receiptRows = [
  'Updated stock levels · 3 times',
  'Sent 12 GST invoices',
  'Logged 40 WhatsApp orders',
  'Flagged 2 pending payments',
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const ctaClass =
  'bg-cta text-cta-foreground hover:bg-cta-hover h-12 w-full rounded-full px-7 text-base font-semibold sm:w-auto';

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />

      {/* Hero */}
      <section>
        <Container className="py-12 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Eyebrow>AI automation for small &amp; local businesses</Eyebrow>
              <h1 className="text-foreground mt-6 text-4xl leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl sm:leading-[0.98]">
                Run your business on <span className="marker">autopilot</span>, not on Excel and
                memory.
              </h1>
              <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                Flowint AI brings simple, affordable AI automation to businesses still doing it all
                by hand. Inventory, GST billing, WhatsApp orders and data entry start taking care of
                themselves.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  render={<Link href="/contact" />}
                  nativeButton={false}
                  size="lg"
                  className={ctaClass}
                >
                  Book a free demo
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  render={<Link href="/solutions" />}
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="border-foreground/15 bg-card h-12 w-full rounded-full px-7 text-base font-semibold sm:w-auto"
                >
                  See what we automate
                </Button>
              </div>
              <p className="text-muted-foreground mt-5 text-sm">
                No card needed. No jargon. Just a real conversation.
              </p>
            </div>

            {/* Concrete "what Flowint handled" card, tilted like a sticky note */}
            <div className="px-1 sm:px-0 lg:pl-6">
              <div className="border-foreground bg-card shadow-pop rounded-3xl border-2 p-6 sm:rotate-2 sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                    This week, Flowint handled
                  </p>
                  <span className="bg-primary size-2.5 rounded-full" aria-hidden />
                </div>
                <ul className="mt-5 space-y-3">
                  {receiptRows.map((row) => (
                    <li key={row} className="text-foreground flex items-start gap-3 text-sm">
                      <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                        <Check className="size-3" />
                      </span>
                      <span className="font-medium">{row}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-border mt-5 flex items-center justify-between border-t pt-4">
                  <span className="text-muted-foreground text-xs">Your time back</span>
                  <span className="text-primary font-display text-lg font-extrabold">~9 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Marquee strip */}
      <section aria-hidden className="bg-foreground overflow-hidden py-4">
        <div className="animate-marquee flex w-max">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={i}
              className="text-background flex items-center gap-4 px-6 text-base font-semibold whitespace-nowrap sm:text-lg"
            >
              {item}
              <span className="text-cta">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* The problem */}
      <section>
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>The hard way</Eyebrow>
            <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Manual work costs your business more than you think
            </h2>
            <p className="text-muted-foreground mt-4">
              If any of this sounds familiar, you are exactly who we build for.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problems.map((problem) => (
              <div key={problem.title} className="border-border bg-card rounded-3xl border-2 p-7">
                <div className="bg-cta/10 text-cta flex size-12 items-center justify-center rounded-2xl">
                  <problem.icon className="size-6" aria-hidden />
                </div>
                <h3 className="text-foreground mt-5 text-lg font-bold">{problem.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Solutions preview */}
      <section className="bg-background-subtle border-border border-y">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>What we automate</Eyebrow>
            <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Business process automation for the work you do every day
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <SolutionCard key={solution.title} solution={solution} />
            ))}
          </div>
          <div className="mt-10">
            <Button
              render={<Link href="/solutions" />}
              nativeButton={false}
              variant="outline"
              className="border-foreground/15 bg-card rounded-full px-6 font-semibold"
            >
              Explore all automation solutions
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section>
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Who we work with</Eyebrow>
            <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Built for the businesses that keep India running
            </h2>
            <p className="text-muted-foreground mt-4">
              If your day runs on Excel, registers and WhatsApp, automation can win you back hours
              every week.
            </p>
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <li
                key={industry}
                className="border-border bg-card text-foreground rounded-full border-2 px-5 py-2.5 text-sm font-semibold"
              >
                {industry}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-background-subtle border-border border-y">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Simple to start. Nothing to relearn.
            </h2>
          </div>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {howItWorks.map((item) => (
              <li key={item.step}>
                <span className="font-display text-cta text-5xl font-extrabold sm:text-6xl">
                  {String(item.step).padStart(2, '0')}
                </span>
                <h3 className="text-foreground mt-3 text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section>
        <Container className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                Questions about AI automation, answered
              </h2>
            </div>
            <div className="divide-border border-border divide-y border-y">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="text-foreground flex cursor-pointer list-none items-start justify-between gap-4 text-base font-bold sm:text-lg [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <Plus
                      className="text-primary mt-1 size-5 shrink-0 transition-transform group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section>
        <Container className="pb-20 sm:pb-28">
          <div className="bg-primary relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-14 sm:py-20">
            <div className="max-w-xl">
              <h2 className="text-primary-foreground text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                Ready to automate the paperwork?
              </h2>
              <p className="text-primary-foreground/80 mt-4">
                Tell us a little about your business and we will show you exactly what AI
                automation can take off your plate, with a free, no-pressure demo.
              </p>
              <div className="mt-8">
                <Button
                  render={<Link href="/contact" />}
                  nativeButton={false}
                  size="lg"
                  className={ctaClass}
                >
                  Book your free demo
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
