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

      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.7,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
