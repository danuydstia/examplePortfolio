'use client';
import { motion } from 'framer-motion';
import { Reveal, StaggerGroup, staggerItem } from '../components/ui';
import { socials } from '../data/data';

export default function Contact() {
  return (
    <div id="contact" className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#080810' }}>
      {/* Animated grid */}
      <motion.div
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        {/* Section heading (imported inline to avoid circular dep) */}
        <div className="text-center mb-14 md:mb-20">
          <Reveal>
            <span
              className="inline-block px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background: 'rgba(74,222,128,0.1)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)' }}
            >
              Get In Touch
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.9] mb-5 text-white">
              Let's Work<br/>Together
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-white/60">
              Have a project in mind or just want to chat? Feel free to reach out!
            </p>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Info cards */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-5">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" style={{ color: '#4ADE80' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                ),
                label: 'Email Me',
                sub: 'danu.ydstia@gmail.com',
                delay: 0,
              },
              {
                icon: (
                  <svg className="w-6 h-6" style={{ color: '#4ADE80' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                ),
                label: 'Location',
                sub: 'Indonesia',
                delay: 0.08,
              },
            ].map((card, i) => (
              <Reveal key={i} delay={card.delay} from="bottom">
                <motion.div
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(74,222,128,0.07)' }}
                  className="border rounded-2xl p-6 md:p-7 cursor-default transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,222,128,0.15)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(74,222,128,0.12)' }}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{card.label}</h3>
                  <p className="text-white/50 text-sm break-all">{card.sub}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Social links */}
          <Reveal delay={0.18}>
            <motion.div
              whileHover={{ borderColor: 'rgba(74,222,128,0.3)' }}
              className="rounded-2xl p-6 md:p-8 transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,222,128,0.15)' }}
            >
              <h3 className="text-lg font-bold text-white mb-6 text-center">Connect With Me</h3>
              <StaggerGroup className="flex justify-center gap-4 md:gap-5" staggerChildren={0.1}>
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    variants={staggerItem}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.22, y: -7, backgroundColor: '#4ADE80' }}
                    whileTap={{ scale: 0.88 }}
                    className="w-14 h-14 flex items-center justify-center rounded-xl transition-colors duration-200"
                    style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}
                  >
                    <svg className="w-7 h-7" style={{ fill: '#4ADE80' }} viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </motion.a>
                ))}
              </StaggerGroup>
            </motion.div>
          </Reveal>
        </div>

        {/* Footer */}
        <Reveal delay={0.28} className="text-center mt-14 pt-8" style={{ borderTop: '1px solid rgba(74,222,128,0.1)' }}>
          <p className="text-white/30 text-xs tracking-widest uppercase">© 2025 Danu · All rights reserved</p>
        </Reveal>
      </div>
    </div>
  );
}