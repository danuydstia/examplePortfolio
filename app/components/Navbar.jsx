'use client';
import { motion } from 'framer-motion';
import { easeOut } from './animations';
import { navItems } from '../data/data';

export default function Navbar({ activeSection, navOnLight, scrollTo }) {
  const navBg     = navOnLight ? 'rgba(10,10,10,0.88)'    : 'rgba(255,255,255,0.06)';
  const navBorder = navOnLight ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.1)';

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
      className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div
        className="rounded-full px-8 py-3 flex items-center gap-8"
        style={{
          background:     navBg,
          backdropFilter: 'blur(20px)',
          boxShadow:      '0 8px 32px rgba(0,0,0,0.3)',
          border:         `1px solid ${navBorder}`,
          transition:     'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <span className="font-syne text-white font-black text-sm tracking-wider mr-2">DN.</span>

        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative text-sm font-medium transition-colors duration-300 font-dm pb-2"
              style={{ color: activeSection === item.id ? '#4ADE80' : 'rgba(255,255,255,0.7)' }}
            >
              {item.label}

              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: '#4ADE80' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        <motion.button
          onClick={() => scrollTo('contact')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="ml-2 px-4 py-1.5 text-xs font-bold rounded-full font-syne tracking-wide"
          style={{ background: '#4ADE80', color: '#052e16' }}
        >
          Hire Me
        </motion.button>
      </div>
    </motion.header>
  );
}