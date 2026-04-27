'use client';
import { useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

import { ScrollProgress, Ticker } from './components/ui';
import Navbar                     from './components/Navbar';
import Hero                       from './sections/Hero';
import Skills                     from './sections/Skills';
import Experience                 from './sections/Experience';
import Contact                    from './sections/Contact';

export default function Portfolio() {
  const [isMenuOpen,     setIsMenuOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState('home');
  const [navOnLight,     setNavOnLight]     = useState(false);

  /* ── Detect navbar over light section ─────────────────── */
  useEffect(() => {
    const checkNavBg = () => {
      const el   = document.getElementById('experience');
      const rect = el?.getBoundingClientRect();
      setNavOnLight(!!rect && rect.top <= 64 && rect.bottom >= 64);
    };
    window.addEventListener('scroll', checkNavBg, { passive: true });
    checkNavBg();
    return () => window.removeEventListener('scroll', checkNavBg);
  }, []);

  /* ── Active section tracker ────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const sections = ['home', 'skill', 'experience', 'contact'];
      const cur = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 120 && r.bottom >= 120;
      });
      if (cur) setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Scroll-driven motion values ───────────────────────── */
  const { scrollY, scrollYProgress } = useScroll();
  const heroY       = useTransform(scrollY,         [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY,         [0, 500], [1, 0]);
  const scrollHint  = useTransform(scrollY,         [0, 250], [1, 0]);
  const tickerX     = useTransform(scrollYProgress, [0, 1],   ['0%', '-30%']);

  /* ── Smooth scroll helper ──────────────────────────────── */
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <ScrollProgress />

      <Navbar
        activeSection={activeSection}
        navOnLight={navOnLight}
        scrollTo={scrollTo}
      />

      <Hero
        heroY={heroY}
        heroOpacity={heroOpacity}
        scrollHint={scrollHint}
        scrollTo={scrollTo}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Ticker strip */}
      <div
        className="overflow-hidden py-3 shadow-sm border-y border-black/5"
        style={{ backgroundColor: '#4ADE80' }}
        aria-hidden="true"
      >
        <Ticker text="Software Engineer · React · Flutter · Python · " speed={1} />
      </div>

      <Skills />

      <Experience tickerX={tickerX} />

      <Contact />
    </div>
  );
}