import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, TriangleAlert, Repeat2, Check, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { SolutionCard } from '@/components/features/solution-card';
import { Eyebrow } from '@/components/layout/eyebrow';
import { Reveal } from '@/components/experience/reveal';
import { Magnetic } from '@/components/experience/magnetic';
import { featuredSolutions, howItWorks, industries, faqs } from '@/lib/utils/content';
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
    tint: 'var(--brand-pink)',
  },
  {
    icon: Repeat2,
    title: 'The same manual work, again and again',
    description:
      'Copying figures from bills into Excel, every single day. It is slow, it is dull, and mistakes creep in.',
    tint: 'var(--brand-violet)',
  },
  {
    icon: Clock,
    title: 'No time for the actual business',
    description:
      'Hours go into managing records instead of serving customers, buying smarter, or growing.',
    tint: 'var(--brand-cyan)',
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
  'bg-cta text-cta-foreground hover:bg-cta-hover shadow-glow h-12 w-full rounded-full px-7 text-base font-semibold sm:w-auto';

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />

      {/* Hero */}
      <section data-guide-section="🏠 Home base — this is us: we put small businesses on autopilot instead of Excel.">
        <Container className="py-10 sm:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal stagger>
              <Eyebrow>AI automation for small &amp; local businesses</Eyebrow>
              <h1 className="text-foreground mt-6 text-4xl leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl sm:leading-[0.98]">
                Run your business on <span className="text-gradient">autopilot</span>, not on Excel
                and memory.
              </h1>
              <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                Flowint AI brings simple, affordable AI automation to businesses still doing it all
                by hand. Inventory, GST billing, WhatsApp orders and data entry start taking care of
                themselves.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnetic className="w-full sm:w-auto">
                  <Button
                    render={<Link href="/contact" />}
                    nativeButton={false}
                    size="lg"
                    data-guide="Click me to book a free demo — no card, no pressure! 🤖"
                    className={ctaClass}
                  >
                    Book a free demo
                    <ArrowRight className="size-4" />
                  </Button>
                </Magnetic>
                <Button
                  render={<Link href="/solutions" />}
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  data-guide="This opens the full menu of what we automate →"
                  className="border-foreground/15 bg-card/70 h-12 w-full rounded-full px-7 text-base font-semibold backdrop-blur hover:border-primary/40 sm:w-auto"
                >
                  See what we automate
                </Button>
              </div>
              <p className="text-muted-foreground mt-5 text-sm">
                No card needed. No jargon. Just a real conversation.
              </p>
            </Reveal>

            {/* Concrete "what Flowint handled" card, floating glass sticky-note */}
            <div className="px-1 sm:px-0 lg:pl-6">
              <div className="animate-float-slow glass shadow-glow rounded-3xl p-6 sm:rotate-2 sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase">
                    <Sparkles className="text-brand-violet size-3.5" aria-hidden />
                    This week, Flowint handled
                  </p>
                  <span className="bg-brand-lime size-2.5 rounded-full" aria-hidden />
                </div>
                <ul className="mt-5 space-y-3">
                  {receiptRows.map((row) => (
                    <li key={row} className="text-foreground flex items-start gap-3 text-sm">
                      <span className="from-brand-violet to-brand-pink mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white">
                        <Check className="size-3" />
                      </span>
                      <span className="font-medium">{row}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-border/60 mt-5 flex items-center justify-between border-t pt-4">
                  <span className="text-muted-foreground text-xs">Your time back</span>
                  <span className="text-gradient font-display text-lg font-extrabold">~9 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Marquee strip */}
      <section
        aria-hidden
        className="overflow-hidden border-y border-white/10 bg-foreground py-4"
      >
        <div className="animate-marquee flex w-max">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={i}
              className="text-background flex items-center gap-4 px-6 text-base font-semibold whitespace-nowrap sm:text-lg"
            >
              {item}
              <span className="text-brand-lime">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* The problem */}
      <section data-guide-section="😮‍💨 The Problem — the daily headaches I'm here to help you ditch.">

        <Container className="py-12 sm:py-16">
          <Reveal className="max-w-2xl">
            <Eyebrow>The hard way</Eyebrow>
            <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Manual work costs your business more than you think
            </h2>
            <p className="text-muted-foreground mt-4">
              If any of this sounds familiar, you are exactly who we build for.
            </p>
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="group bg-card/70 hover:border-primary/40 rounded-3xl border border-border/60 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
              >
                <div
                  className="flex size-12 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-105"
                  style={{ background: problem.tint }}
                >
                  <problem.icon className="size-6" aria-hidden />
                </div>
                <h3 className="text-foreground mt-5 text-lg font-bold">{problem.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Solutions preview */}
      <section
        data-guide-section="🛠️ What We Automate — hover any card and I'll spill the details."
        className="border-border/60 border-y bg-background-subtle/60"
      >
        <Container className="py-12 sm:py-16">
          <Reveal className="max-w-2xl">
            <Eyebrow>What we automate</Eyebrow>
            <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Business process automation for the work you do every day
            </h2>
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSolutions.map((solution) => (
              <SolutionCard key={solution.title} solution={solution} />
            ))}
          </Reveal>
          <div className="mt-10">
            <Button
              render={<Link href="/solutions" />}
              nativeButton={false}
              variant="outline"
              className="border-foreground/15 bg-card/70 rounded-full px-6 font-semibold backdrop-blur hover:border-primary/40"
            >
              Explore all automation solutions
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section data-guide-section="🏪 Who We Serve — find your trade in here?">

        <Container className="py-12 sm:py-16">
          <Reveal className="max-w-2xl">
            <Eyebrow>Who we work with</Eyebrow>
            <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Built for the businesses that keep India running
            </h2>
            <p className="text-muted-foreground mt-4">
              If your day runs on Excel, registers and WhatsApp, automation can win you back hours
              every week.
            </p>
          </Reveal>
          <Reveal stagger className="mt-10 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="chip-gradient bg-card/70 text-foreground rounded-full px-5 py-2.5 text-sm font-semibold backdrop-blur transition-transform hover:-translate-y-0.5"
              >
                {industry}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section
        data-guide-section="🚀 How It Works — three steps, zero homework. Promise."
        className="border-border/60 border-y bg-background-subtle/60"
      >
        <Container className="py-12 sm:py-16">
          <Reveal className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Simple to start. Nothing to relearn.
            </h2>
          </Reveal>
          <Reveal stagger as="ol" className="mt-12 grid gap-10 md:grid-cols-3">
            {howItWorks.map((item) => (
              <li key={item.step}>
                <span className="text-gradient font-display text-5xl font-extrabold sm:text-6xl">
                  {String(item.step).padStart(2, '0')}
                </span>
                <h3 className="text-foreground mt-3 text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section data-guide-section="❓ FAQ — tap a question, I've got the answer.">

        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-foreground mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                Questions about AI automation, answered
              </h2>
            </Reveal>
            <Reveal stagger className="divide-border/60 border-border/60 divide-y border-y">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="text-foreground flex cursor-pointer list-none items-start justify-between gap-4 text-base font-bold transition-colors hover:text-primary sm:text-lg [&::-webkit-details-marker]:hidden">
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
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section data-guide-section="🎯 Let's Go — book a free demo and we'll talk, no pressure.">

        <Container className="pb-16 sm:pb-20">
          <Reveal className="relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-14 sm:py-20">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  'linear-gradient(120deg, var(--brand-violet) 0%, var(--primary-hover) 40%, var(--brand-pink) 100%)',
              }}
            />
            <span
              aria-hidden
              className="animate-blob absolute -top-20 -right-10 -z-10 size-72 rounded-full bg-white/15 blur-3xl"
            />
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
                Ready to automate the paperwork?
              </h2>
              <p className="mt-4 text-white/85">
                Tell us a little about your business and we will show you exactly what AI automation
                can take off your plate, with a free, no-pressure demo.
              </p>
              <div className="mt-8">
                <Magnetic className="inline-block">
                  <Button
                    render={<Link href="/contact" />}
                    nativeButton={false}
                    size="lg"
                    data-guide="This is the one — your free demo starts here! 🎉"
                    className="h-12 w-full rounded-full bg-white px-7 text-base font-semibold text-primary shadow-glow hover:bg-white/90 sm:w-auto"
                  >
                    Book your free demo
                    <ArrowRight className="size-4" />
                  </Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
