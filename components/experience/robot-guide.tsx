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
 * "Flo" — a vibrant robot companion that follows the cursor with spring lag,
 * leaves a colourful trail, looks toward where you're heading, and shows
 * contextual guidance. Guidance comes from `data-guide` (on hover) and
 * `data-guide-section` (on scroll into view) attributes placed around the site.
 *
 * It is purely decorative: pointer-events are disabled so it never blocks
 * clicks, and it disables itself on touch devices and for reduced-motion users.
 */

const INTRO = "Hi, I'm Flo 🤖 — tap around, I'll point out the good stuff.";
const IDLE = 'Still here! Book a free demo and I’ll show you what we automate →';
const TRAIL = [
  { size: 10, color: 'var(--brand-cyan)', stiffness: 220, damping: 20 },
  { size: 8, color: 'var(--brand-violet)', stiffness: 170, damping: 22 },
  { size: 6, color: 'var(--brand-pink)', stiffness: 130, damping: 24 },
  { size: 4, color: 'var(--brand-amber)', stiffness: 100, damping: 26 },
];

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
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState(INTRO);
  const [showBubble, setShowBubble] = useState(true);
  const [waving, setWaving] = useState(true);

  // Raw cursor position and its spring-smoothed follower.
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const botX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.6 });
  const botY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.6 });

  // Pupils look toward the direction of travel (raw cursor vs. settled bot).
  const dx = useTransform([mouseX, botX], ([m, b]: number[]) =>
    Math.max(-2.5, Math.min(2.5, (m - b) * 0.12)),
  );
  const dy = useTransform([mouseY, botY], ([m, b]: number[]) =>
    Math.max(-2.5, Math.min(2.5, (m - b) * 0.12)),
  );

  const sectionMsg = useRef(INTRO);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    // Capability detection can only run after mount (matchMedia is client-only),
    // so enabling here is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setMessage(IDLE);
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

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    // Section-aware guidance.
    const sections = document.querySelectorAll<HTMLElement>('[data-guide-section]');
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const msg = visible?.target.getAttribute('data-guide-section');
        if (msg) {
          sectionMsg.current = msg;
          setMessage(msg);
          setShowBubble(true);
        }
      },
      { threshold: 0.5 },
    );
    sections.forEach((s) => io.observe(s));

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

  if (!enabled) return null;

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
          {/* Speech bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                key={message}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="glass text-foreground absolute bottom-[115%] left-1/2 w-[min(74vw,232px)] -translate-x-1/2 rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug font-medium shadow-glow"
              >
                {message}
                <span className="glass absolute -bottom-1 left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-[3px]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Robot */}
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
    <div className="relative size-14 drop-shadow-[0_8px_16px_rgba(109,77,255,0.35)]">
      {/* Glow halo */}
      <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,var(--brand-violet),transparent_70%)] opacity-40 blur-md" />

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
          className="absolute -right-1 top-7 text-sm"
          animate={{ rotate: [0, 18, -8, 18, 0] }}
          transition={{ duration: 1.1, repeat: 1 }}
        >
          👋
        </motion.span>
      )}
    </div>
  );
}

/** A single eye; cx/cy are in percent of the 56px robot box. */
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
      style={{ left: `${cx}%`, top: `${cy}%`, width: 9, height: 9, transform: 'translate(-50%,-50%)' }}
    >
      <motion.span
        className="block rounded-full"
        style={{ x: dx, y: dy, width: 4.5, height: 4.5, background: 'var(--brand-violet)' }}
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
