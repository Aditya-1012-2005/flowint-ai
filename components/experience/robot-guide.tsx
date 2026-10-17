'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from 'motion/react';

/**
 * "Flo" — a vibrant robot tour guide.
 *
 * - Desktop (fine pointer): follows the cursor with spring lag, leaves a
 *   colourful trail, and its eyes track where you're heading.
 * - Mobile / touch: sits as a floating mascot in the corner; tap it to
 *   toggle its speech bubble.
 *
 * In every mode it narrates the page: the bubble names the current section
 * (from `data-guide-section`) as you scroll, shows hover hints (`data-guide`)
 * on desktop, and rotates friendly nudges when you go quiet. It never blocks
 * clicks and disables itself for reduced-motion users.
 */

const INTRO = "Heyy, it's me Flo 🤖 — your personal tour guide for this site. Follow me!";

const IDLES = [
  'Psst — still here if you need a hand. 👋',
  'Fun fact: most shops we help save ~9 hours a week. 🤯',
  'Lost? Book a free demo and we’ll map it out together. 🗺️',
  'Scroll on — I’ll tell you what each part does. 👇',
];

const TRAIL = [
  { size: 12, color: 'var(--brand-cyan)', stiffness: 220, damping: 20 },
  { size: 9, color: 'var(--brand-violet)', stiffness: 170, damping: 22 },
  { size: 7, color: 'var(--brand-pink)', stiffness: 130, damping: 24 },
  { size: 5, color: 'var(--brand-amber)', stiffness: 100, damping: 26 },
];

type Mode = 'off' | 'cursor' | 'fixed';

function TrailDot({
  x,
  y,
  size,
  color,
  stiffness,
  damping,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  size: number;
  color: string;
  stiffness: number;
  damping: number;
}) {
  const tx = useSpring(x, { stiffness, damping, mass: 0.5 });
  const ty = useSpring(y, { stiffness, damping, mass: 0.5 });
  return (
    <motion.span
      aria-hidden
      className="fixed top-0 left-0 z-[60] rounded-full"
      style={{
        x: tx,
        y: ty,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: color,
        filter: 'blur(0.5px)',
      }}
    />
  );
}

export function RobotGuide() {
  const [mode, setMode] = useState<Mode>('off');
  const [message, setMessage] = useState(INTRO);
  const [showBubble, setShowBubble] = useState(true);
  const [waving, setWaving] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const botX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.6 });
  const botY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.6 });

  const dx = useTransform([mouseX, botX], ([m, b]: number[]) =>
    Math.max(-3.5, Math.min(3.5, (m - b) * 0.14)),
  );
  const dy = useTransform([mouseY, botY], ([m, b]: number[]) =>
    Math.max(-3.5, Math.min(3.5, (m - b) * 0.14)),
  );
  const still = useMotionValue(0);

  const sectionMsg = useRef(INTRO);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleIndex = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const resolved: Mode = fine ? 'cursor' : 'fixed';
    // Capability detection can only run after mount (matchMedia is client-only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(resolved);

    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setMessage(IDLES[idleIndex.current % IDLES.length]);
        idleIndex.current += 1;
        setShowBubble(true);
      }, 9000);
    };

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      resetIdle();
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('[data-guide]') as HTMLElement | null;
      if (el?.dataset.guide) {
        setMessage(el.dataset.guide);
        setShowBubble(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('[data-guide]');
      if (el) setMessage(sectionMsg.current);
    };

    if (resolved === 'cursor') {
      window.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);
    }

    // Scrollspy: a section is "active" while it crosses the vertical centre
    // of the viewport, regardless of how tall it is.
    const io = new IntersectionObserver(
      (entries) => {
        const active = entries.find((en) => en.isIntersecting);
        const msg = active?.target.getAttribute('data-guide-section');
        if (msg && msg !== sectionMsg.current) {
          sectionMsg.current = msg;
          setMessage(msg);
          setShowBubble(true);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    document.querySelectorAll('[data-guide-section]').forEach((s) => io.observe(s));

    const introTimer = setTimeout(() => setWaving(false), 2600);
    resetIdle();

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      io.disconnect();
      if (idleTimer.current) clearTimeout(idleTimer.current);
      clearTimeout(introTimer);
    };
  }, [mouseX, mouseY]);

  if (mode === 'off') return null;

  const bubble = (align: 'center' | 'right') => (
    <AnimatePresence>
      {showBubble && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className={
            'glass text-foreground shadow-glow absolute bottom-[118%] w-[min(72vw,258px)] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug font-medium ' +
            (align === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-0')
          }
        >
          {message}
          <span
            className={
              'glass absolute -bottom-1 size-3 rotate-45 rounded-[3px] ' +
              (align === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-6')
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  // --- Mobile / touch: fixed floating mascot ---
  if (mode === 'fixed') {
    return (
      <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[61]">
        <div className="relative">
          {bubble('right')}
          <button
            type="button"
            aria-label={showBubble ? 'Hide Flo the guide' : 'Ask Flo the guide'}
            onClick={() => setShowBubble((v) => !v)}
            className="block"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Robot dx={still} dy={still} waving={waving} />
            </motion.div>
          </button>
        </div>
      </div>
    );
  }

  // --- Desktop: cursor-following guide with trail ---
  return (
    <div aria-hidden className="pointer-events-none">
      {TRAIL.map((t, i) => (
        <TrailDot key={i} x={mouseX} y={mouseY} {...t} />
      ))}

      <motion.div
        className="fixed top-0 left-0 z-[61]"
        style={{ x: botX, y: botY }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {bubble('center')}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Robot dx={dx} dy={dy} waving={waving} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function Robot({
  dx,
  dy,
  waving,
}: {
  dx: MotionValue<number>;
  dy: MotionValue<number>;
  waving: boolean;
}) {
  return (
    <div className="relative size-20 drop-shadow-[0_10px_20px_rgba(109,77,255,0.4)]">
      {/* Glow halo */}
      <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,var(--brand-violet),transparent_70%)] opacity-45 blur-lg" />

      <svg viewBox="0 0 64 64" className="size-full">
        <defs>
          <linearGradient id="flo-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--brand-violet)" />
            <stop offset="1" stopColor="var(--brand-pink)" />
          </linearGradient>
        </defs>
        {/* Antenna */}
        <line x1="32" y1="8" x2="32" y2="16" stroke="var(--brand-cyan)" strokeWidth="2.5" />
        <circle cx="32" cy="7" r="3.5" fill="var(--brand-amber)">
          <animate attributeName="r" values="3.5;4.4;3.5" dur="1.4s" repeatCount="indefinite" />
        </circle>
        {/* Head */}
        <rect x="14" y="16" width="36" height="30" rx="12" fill="url(#flo-body)" />
        <rect x="14" y="16" width="36" height="30" rx="12" fill="#fff" opacity="0.08" />
        {/* Screen face */}
        <rect x="19" y="22" width="26" height="17" rx="8" fill="#140e2e" />
        {/* Side ears */}
        <rect x="10" y="26" width="4" height="10" rx="2" fill="var(--brand-cyan)" />
        <rect x="50" y="26" width="4" height="10" rx="2" fill="var(--brand-cyan)" />
      </svg>

      {/* Eyes (overlaid so pupils can track) */}
      <div className="absolute inset-0">
        <Eye cx={40} cy={47.5} dx={dx} dy={dy} />
        <Eye cx={59} cy={47.5} dx={dx} dy={dy} />
      </div>

      {/* Waving hand on intro */}
      {waving && (
        <motion.span
          className="absolute top-10 -right-1.5 text-lg"
          animate={{ rotate: [0, 18, -8, 18, 0] }}
          transition={{ duration: 1.1, repeat: 1 }}
        >
          👋
        </motion.span>
      )}
    </div>
  );
}

/** A single eye; cx/cy are in percent of the robot box. */
function Eye({
  cx,
  cy,
  dx,
  dy,
}: {
  cx: number;
  cy: number;
  dx: MotionValue<number>;
  dy: MotionValue<number>;
}) {
  return (
    <span
      className="absolute flex items-center justify-center rounded-full bg-white"
      style={{
        left: `${cx}%`,
        top: `${cy}%`,
        width: 13,
        height: 13,
        transform: 'translate(-50%,-50%)',
      }}
    >
      <motion.span
        className="block rounded-full"
        style={{ x: dx, y: dy, width: 6.5, height: 6.5, background: 'var(--brand-violet)' }}
      >
        <motion.span
          className="block size-full rounded-full"
          animate={{ scaleY: [1, 1, 0.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
          style={{ background: 'var(--brand-violet)' }}
        />
      </motion.span>
    </span>
  );
}
