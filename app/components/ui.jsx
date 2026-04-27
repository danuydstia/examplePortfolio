'use client';
import { useRef } from 'react';
import {
  motion, useScroll, useSpring,
  useInView, AnimatePresence,
  useMotionValue, useAnimationFrame, useTransform,
} from 'framer-motion';
import { easeOut } from './animations';

export function Ticker({ text, speed = 5, dir = 1 }) {
  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    let next = x.get() - (delta / 1000) * speed * dir;
    if (next <= -50) next = 0;
    if (dir < 0 && next >= 0) next = -50;
    x.set(next);
  });

  const xPercent = useTransform(x, v => `${v}%`);
  const items = Array(16).fill(text);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x: xPercent }} className="inline-flex gap-12 select-none">
        {items.map((t, i) => (
          <span key={i} className="text-5xl md:text-7xl font-black tracking-tighter text-black/50 uppercase">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Reveal ─────────────────────────────────────────────────── */
export function Reveal({ children, className = '', delay = 0, from = 'bottom', once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });
  const dirs = {
    bottom: { hidden: { opacity: 0, y: 60 },      visible: { opacity: 1, y: 0 } },
    left:   { hidden: { opacity: 0, x: -60 },     visible: { opacity: 1, x: 0 } },
    right:  { hidden: { opacity: 0, x: 60 },      visible: { opacity: 1, x: 0 } },
    scale:  { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={dirs[from]}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── StaggerGroup ───────────────────────────────────────────── */
export function StaggerGroup({ children, className = '', staggerChildren = 0.1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ hidden: {}, visible: { transition: { staggerChildren } } }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

/* ── ScrollProgress ─────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left', background: '#4ADE80' }}
      className="fixed top-0 left-0 right-0 h-0.5 z-50"
    />
  );
}

/* ── SectionHeading ─────────────────────────────────────────── */
export function SectionHeading({ badge, title, subtitle, light = false }) {
  return (
    <div className="text-center mb-14 md:mb-20">
      <Reveal>
        <span
          className="inline-block px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
          style={
            light
              ? { background: 'rgba(74,222,128,0.1)',    color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)' }
              : { background: 'rgba(34,197,94,0.12)',    color: '#15803d', border: '1px solid rgba(34,197,94,0.3)' }
          }
        >
          {badge}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className={`text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.9] mb-5 ${light ? 'text-white' : 'text-black'}`}>
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={0.16}>
          <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${light ? 'text-white/60' : 'text-black/50'}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}