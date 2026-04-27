'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { spring } from '../components/animations';
import { SectionHeading, StaggerGroup, staggerItem } from '../components/ui';
import { skillCards } from '../data/data';

export default function Skills() {
  const [skillsIndex, setSkillsIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [gap, setGap] = useState(20);
  const carouselRef = useRef(null);

  useEffect(() => {
    const update = () => setGap(window.innerWidth < 768 ? 16 : 20);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const measure = () => {
      setCarouselWidth(el.offsetWidth);
      setIsMobile(window.innerWidth < 768);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const VISIBLE   = isMobile ? 2 : 5;
  const cardWidth = carouselWidth > 0 ? (carouselWidth - gap * (VISIBLE - 1)) / VISIBLE : 0;
  const step      = cardWidth + gap;
  const maxIndex  = Math.max(0, skillCards.length - VISIBLE);

  useEffect(() => {
    setSkillsIndex(p => Math.min(p, maxIndex));
  }, [maxIndex]);

  return (
    <div id="skill" className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#0D0D12' }}>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(74,222,128,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        <SectionHeading
          badge="Technical Arsenal"
          title={<>Background Skill &<br/>Accomplishment</>}
          subtitle="Continuously learning and improving in front-end development. HTML5, CSS3, React.js, Tailwind CSS, Flutter, and Python."
          light
        />

        {/* Carousel */}
        <div className="relative flex items-center gap-3 md:gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => setSkillsIndex(p => (p > 0 ? p - 1 : maxIndex))}
            className="w-9 h-9 md:w-11 md:h-11 shrink-0 flex items-center justify-center rounded-full z-10"
            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <div
            ref={carouselRef}
            className="flex-1 overflow-hidden"
            style={{ paddingBlock: 24, marginBlock: -24 }}
          >
            <motion.div
              animate={{ x: -(skillsIndex * step) }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="flex"
              style={{ gap }}
            >
              {skillCards.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.8 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                  className="shrink-0 flex items-center justify-center"
                  style={{ width: cardWidth }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="w-full aspect-square bg-white rounded-2xl md:rounded-3xl flex flex-col items-center justify-center shadow-xl cursor-pointer gap-2"
                  >
                    {skill.svg}
                    <span className="text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase">
                      {skill.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => setSkillsIndex(p => (p < maxIndex ? p + 1 : 0))}
            className="w-9 h-9 md:w-11 md:h-11 shrink-0 flex items-center justify-center rounded-full z-10"
            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setSkillsIndex(i)}
              animate={{
                width:           skillsIndex === i ? 24 : 8,
                backgroundColor: skillsIndex === i ? '#4ADE80' : 'rgba(74,222,128,0.25)',
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        {/* Stats */}
        <StaggerGroup
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto"
          staggerChildren={0.08}
        >
          {[
            { number: '6+',   label: 'Technologies' },
            { number: '5',  label: 'Projects' },
            { number: '2+',   label: 'Years Learning' },
            { number: '100%', label: 'Passion' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              whileHover={{ scale: 1.06, y: -4 }}
              className="rounded-2xl p-5 md:p-6 text-center backdrop-blur-sm"
              style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.15)' }}
            >
              <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: '#4ADE80' }}>{stat.number}</div>
              <div className="text-xs md:text-sm tracking-wide text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}