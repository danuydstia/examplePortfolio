'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { easeOut, spring } from '../components/animations';
import { SectionHeading } from '../components/ui';
import { projects } from '../data/data';

function ProjectCard({ project, index, tickerX }) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-80px' });
  const { scrollYProgress: cardProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const cardY = useTransform(cardProgress, [0, 1], [40, -40]);

  return (
    <div className="relative pl-8 md:pl-12 pb-12 md:pb-16">
      {/* Timeline line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
        style={{ originY: 0, background: 'rgba(74,222,128,0.35)' }}
        className="absolute left-3 top-6 bottom-0 w-0.5"
      />

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12, ...spring }}
        className="absolute left-0.5 md:left-1 top-5 w-5 h-5 rounded-full border-4 shadow-lg"
        style={{ backgroundColor: project.accent, borderColor: '#F5FAF0' }}
      />

      {/* Card */}
      <motion.div
        ref={cardRef}
        style={{ y: cardY, border: '1px solid rgba(34,197,94,0.15)' }}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={cardInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: easeOut, delay: index * 0.1 }}
        whileHover={{ scale: 1.015, boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)' }}
        className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border will-change-transform"
      >
        <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-black mb-1 tracking-tight">{project.title}</h3>
            <p className="text-sm font-semibold" style={{ color: project.accent }}>{project.type}</p>
          </div>
          <motion.span
            whileHover={{ scale: 1.08 }}
            className="px-4 py-1.5 rounded-full text-sm font-bold"
            style={{ background: 'rgba(34,197,94,0.12)', color: '#15803d' }}
          >
            {project.year}
          </motion.span>
        </div>

        <p className="text-black/55 mb-5 leading-relaxed text-sm md:text-base">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, ti) => (
            <motion.span
              key={ti}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide"
              style={{ background: 'rgba(74,222,128,0.1)', color: '#15803d', border: '1px solid rgba(74,222,128,0.2)' }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience({ tickerX }) {
  return (
    <div id="experience" className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#F5FAF0' }}>
      {/* Parallax watermark text */}
      <motion.div
        style={{ x: tickerX }}
        className="absolute inset-0 flex items-center opacity-[0.04] pointer-events-none will-change-transform"
      >
        <span className="text-[200px] font-black tracking-tighter whitespace-nowrap text-black uppercase">
          Projects · Experience · Work ·&nbsp;
        </span>
      </motion.div>

      <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        <SectionHeading
          badge="My Journey"
          title={<>Experience &<br/>Projects</>}
          subtitle="Building real-world applications and continuously expanding my skillset through hands-on projects."
        />

        <div className="max-w-4xl mx-auto space-y-0">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}