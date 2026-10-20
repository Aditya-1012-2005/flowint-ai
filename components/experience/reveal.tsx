'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  y?: number;
  delay?: number;
};

/**
 * Scroll-triggered entrance animation (GSAP + ScrollTrigger).
 * Fades and lifts the element — or its children, with `stagger` — into view.
 * Reduced-motion users get the content immediately with no animation.
 */
export function Reveal({
  children,
  as,
  className,
  stagger = false,
  y = 28,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? 'div') as ElementType;

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const el = ref.current;
      if (!el) return;

      const targets = stagger ? Array.from(el.children) : (el as Element);
      const reveal = () =>
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'expo.out',
          stagger: stagger ? 0.08 : 0,
          overwrite: 'auto',
        });

      // Hide first, then decide how to reveal. Using an explicit set + `to`
      // (instead of `from`) so content can never get stuck invisible.
      gsap.set(targets, { opacity: 0, y });

      // Already in or above the viewport on mount — a deep link, a refresh
      // mid-page, or a restored scroll position. Reveal immediately so a
      // section is never left blank waiting for a scroll that already happened.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
        reveal();
        return;
      }

      ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: reveal });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
