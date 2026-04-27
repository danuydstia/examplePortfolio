'use client';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { easeOut, spring } from '../components/animations';
import { navItems, socials } from '../data/data';

export default function Hero({ heroY, heroOpacity, scrollHint, scrollTo, isMenuOpen, setIsMenuOpen }) {
  return (
    <div id="home" className="relative min-h-screen overflow-hidden" style={{ background: '#060608' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
        @keyframes float-slow { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-18px)} }
        @keyframes grain {
          0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
          20%{transform:translate(3%,2%)} 30%{transform:translate(-1%,4%)}
          40%{transform:translate(4%,-1%)} 50%{transform:translate(-3%,3%)}
          60%{transform:translate(2%,-4%)} 70%{transform:translate(-4%,1%)}
          80%{transform:translate(3%,3%)} 90%{transform:translate(-2%,-2%)}
        }
        .grain::after {
          content:''; position:absolute; inset:-50%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.04; animation:grain 3s steps(1) infinite; pointer-events:none; z-index:1;
        }
      `}</style>

      {/* ── Ambient blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-60 -right-40 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="grain absolute inset-0 pointer-events-none z-[2]" />

      {/* ── Mobile hamburger ── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, ...spring }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-5 right-5 z-50 w-12 h-12 rounded-full flex flex-col items-center justify-center gap-1.5 shadow-xl border border-white/20"
        style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
        whileTap={{ scale: 0.88 }}
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            animate={
              isMenuOpen
                ? i === 1
                  ? { opacity: 0, width: 0 }
                  : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 8 : -8 }
                : { rotate: 0, y: 0, opacity: 1, width: 22 }
            }
            className="block h-0.5 w-[22px] bg-white rounded-full origin-center"
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.button>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mob-nav"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(6,6,8,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ delay: i * 0.07 + 0.15, duration: 0.4, ease: easeOut }}
                onClick={() => { scrollTo(item.id); setIsMenuOpen(false); }}
                className="font-syne text-5xl font-black text-white py-3 tracking-tight"
                whileHover={{ x: 12, color: '#4ADE80', transition: { type: 'spring', stiffness: 400 } }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero content ── */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 flex items-center min-h-screen px-6 sm:px-10 md:px-16 lg:px-24 pt-24 md:pt-0 will-change-transform"
      >
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-0 items-center">

          {/* Left column */}
          <div className="font-dm">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
              className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}
            >
              <span className="relative flex h-2 w-2">
                <motion.span
                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: '#4ADE80' }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22C55E' }} />
              </span>
              <span className="text-xs font-medium text-white/60 tracking-widest uppercase">Available for work</span>
            </motion.div>

            {/* Name */}
            <div className="font-syne overflow-hidden mb-3">
              <div className="overflow-hidden">
                {'Danu'.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 140 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: easeOut, delay: 0.4 + i * 0.06 }}
                    className="inline-block text-[clamp(72px,12vw,140px)] font-black leading-none tracking-tight text-white"
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden -mt-2">
                {'Yudistia'.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 140 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: easeOut, delay: 0.55 + i * 0.05 }}
                    className="inline-block text-[clamp(72px,12vw,140px)] font-black leading-none tracking-tight"
                    style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)', color: 'transparent' }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: easeOut }}
              className="flex flex-wrap gap-2 mb-7"
            >
              {['Frontend Dev', 'Flutter', 'React.js', 'Python'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + i * 0.08, ...spring }}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(74,222,128,0.5)' }}
                  className="px-3 py-1 text-xs font-medium text-white/50 border border-white/10 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: easeOut }}
              className="text-base md:text-lg text-white/40 leading-relaxed mb-10 max-w-md"
            >
              Passionate about building scalable applications and exploring cutting-edge technologies.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15, ease: easeOut }}
              className="flex items-center gap-4 flex-wrap"
            >
              <motion.button
                onClick={() => scrollTo('contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="font-syne px-7 py-3.5 text-sm font-bold rounded-full tracking-wide"
                style={{ background: '#4ADE80', color: '#052e16', boxShadow: '0 0 24px rgba(74,222,128,0.25)' }}
              >
                Get in Touch ↗
              </motion.button>
              <motion.button
                onClick={() => scrollTo('experience')}
                whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.96 }}
                className="font-syne px-7 py-3.5 border border-white/10 text-white text-sm font-bold rounded-full tracking-wide"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                View Projects
              </motion.button>

              <div className="flex items-center gap-2 ml-1">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, borderColor: 'rgba(74,222,128,0.4)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <svg className="w-4 h-4 fill-white/50" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column – decorative code card */}
          <div className="hidden md:flex items-center justify-center relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[380px] h-[380px] rounded-full border border-dashed"
              style={{ borderColor: 'rgba(74,222,128,0.12)' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[280px] h-[280px] rounded-full border"
              style={{ borderColor: 'rgba(74,222,128,0.07)' }}
            />
            <div
              className="absolute w-40 h-40 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.9, ease: easeOut }}
              style={{
                animation: 'float-slow 6s ease-in-out infinite',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(74,222,128,0.12)',
              }}
              className="relative z-10 rounded-2xl p-5 w-64 shadow-2xl font-mono text-xs"
            >
              <div className="flex gap-1.5 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full" style={{ background: '#4ADE80', opacity: 0.8 }} />
              </div>
              <div className="space-y-1 leading-relaxed">
                <p><span className="text-purple-400">const</span> <span className="text-sky-300">danu</span> <span className="text-white/40">=</span> {'{'}</p>
                <p className="pl-4"><span style={{ color: '#4ADE80' }}>role</span><span className="text-white/40">:</span> <span className="text-green-300">'Engineer'</span><span className="text-white/40">,</span></p>
                <p className="pl-4"><span style={{ color: '#4ADE80' }}>stack</span><span className="text-white/40">:</span> <span className="text-green-300">'React'</span><span className="text-white/40">,</span></p>
                <p className="pl-4"><span style={{ color: '#4ADE80' }}>open</span><span className="text-white/40">:</span> <span className="text-sky-300">true</span></p>
                <p>{'}'}</p>
              </div>
            </motion.div>

            {[
              { label: '5+ Projects', delay: 1.1, x: 130, y: -110 },
              { label: '2+ Yrs Exp',   delay: 1.3, x: -140, y: -80 },
              { label: '6 Tech Stack', delay: 1.5, x: 140,  y: 100 },
            ].map((pill) => (
              <motion.div
                key={pill.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: pill.delay, ...spring }}
                style={{
                  position: 'absolute',
                  x: pill.x,
                  y: pill.y,
                  background: 'rgba(74,222,128,0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(74,222,128,0.2)',
                  color: '#4ADE80',
                  zIndex: pill.label === '2+ Yrs Exp' ? 20 : 10
                }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap font-dm"
              >
                {pill.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        style={{ opacity: scrollHint }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-white/20 tracking-[0.25em] uppercase font-dm">Scroll</span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(74,222,128,0.3), transparent)' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}