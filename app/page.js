'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  useInView, AnimatePresence, useMotionValue,
  useAnimationFrame
} from 'framer-motion';

const spring = { type: 'spring', stiffness: 260, damping: 28 };
const easeOut = [0.16, 1, 0.3, 1];


function Ticker({ text, speed = 5, dir = 1 }) {
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
          <span key={i} className="text-5xl md:text-7xl font-black tracking-tighter text-black/50 uppercase">{t}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Scroll reveal wrapper ────────────────────────────────── */
function Reveal({ children, className = '', delay = 0, from = 'bottom', once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });
  const dirs = {
    bottom: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    left:   { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right:  { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
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

function StaggerGroup({ children, className = '', staggerChildren = 0.1 }) {
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
const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } }
};

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left', background: '#4ADE80' }}
      className="fixed top-0 left-0 right-0 h-0.5 z-50"
    />
  );
}

function SectionHeading({ badge, title, subtitle, light = false }) {
  return (
    <div className="text-center mb-14 md:mb-20">
      <Reveal>
        <span
          className="inline-block px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
          style={light
            ? { background: 'rgba(74,222,128,0.1)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)' }
            : { background: 'rgba(34,197,94,0.12)', color: '#15803d', border: '1px solid rgba(34,197,94,0.3)' }
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
          <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${light ? 'text-white/60' : 'text-black/50'}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [skillsIndex, setSkillsIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [gap, setGap] = useState(20);

  /* ── NAVBAR ADAPTIVE: deteksi apakah nav berada di atas section terang */
  const [navOnLight, setNavOnLight] = useState(false);

  useEffect(() => {
    const checkNavBg = () => {
      // section yang punya background terang/putih
      const lightSectionIds = ['experience'];
      let isLight = false;
      for (const id of lightSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // navbar floating di ~y=48px dari atas viewport
          if (rect.top <= 64 && rect.bottom >= 64) {
            isLight = true;
            break;
          }
        }
      }
      setNavOnLight(isLight);
    };
    window.addEventListener('scroll', checkNavBg, { passive: true });
    checkNavBg();
    return () => window.removeEventListener('scroll', checkNavBg);
  }, []);

  useEffect(() => {
    const update = () => setGap(window.innerWidth < 768 ? 16 : 20);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollY, scrollYProgress } = useScroll();
  const heroY       = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scrollHint  = useTransform(scrollY, [0, 250], [1, 0]);
  const tickerX     = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const skillCards = [
    { name: 'HTML5', color: '#E34F26', svg: <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 452 520"><path d="M41 460L0 0h451l-41 460-185 52" fill="#E34F26"/><path d="M226 472l149-41 35-394H226" fill="#EF652A"/><path d="M226 208h-75l-5-58h80V94H70l15 171h141zm0 147l-64-17-4-45h-56l7 89 117 32z" fill="#EBEBEB"/><path d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z" fill="#FFF"/></svg> },
    { name: 'CSS3', color: '#264DE4', svg: <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 452 520"><path d="M41 460L0 0h451l-41 460-185 52" fill="#264DE4"/><path d="M226 472l149-41 35-394H226" fill="#2965F1"/><path d="M226 208H94l5 57h127zm0 147l-64-17-4-45h-56l7 89 117 32z" fill="#EBEBEB"/><path d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z" fill="#FFF"/></svg> },
    { name: 'React', color: '#61DAFB', svg: <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 256 228"><path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345.522 2.107.986 4.173 1.386 6.193zM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94zM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18zM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11 20.722zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3zM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86-22.86-10.235-22.86-22.86 10.235-22.86 22.86-22.86z" fill="#00D8FF"/></svg> },
    { name: 'Tailwind', color: '#06B6D4', svg: <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 256 154"><path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="#06B6D4"/></svg> },
    { name: 'Flutter', color: '#02569B', svg: <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 128 128"><path d="M64 0L0 64L28 92L64 56L100 92L128 64L64 0Z" fill="#02569B"/><path d="M28 92L0 64L28 92L64 128L28 92Z" fill="#13B9FD"/><path d="M100 92L64 128L100 92L128 64L100 92Z" fill="#02569B"/></svg> },
    { name: 'Python', color: '#336699', svg: <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 256 255"><path d="M126.916 0c-64.416 0-60.896 28.25-60.896 28.25l.72 46.426h61.408V85.75H41.584s-42.722 3.275-42.722 63.331c0 59.469 24.088 60.519 24.088 60.519h21.686v-29.19s-1.418-24.088 23.964-24.088h65.383s23.313 1.347 23.313-22.957V63.332s3.819-63.332-59.48-63.332zM85.75 37.75c7.668 0 13.875-6.207 13.875-13.875s-6.207-13.875-13.875-13.875c-7.668 0-13.875 6.207-13.875 13.875s6.207 13.875 13.875 13.875z" fill="#336699"/><path d="M128.789 255c64.416 0 60.896-28.25 60.896-28.25l-.72-46.426h-61.408v-11.176h85.636s42.722-3.275 42.722-63.331c0-59.469-24.088-60.519-24.088-60.519h-21.686v29.19s1.418 24.088-23.964 24.088H52.929s-23.313-1.347-23.313 22.957v50.406s-3.819 63.332 59.48 63.332zm42.959-37.75c-7.668 0-13.875 6.207-13.875 13.875s6.207 13.875 13.875 13.875c7.668 0 13.875-6.207 13.875-13.875s-6.207-13.875-13.875-13.875z" fill="#FFD43B"/></svg> },
  ];

  const projects = [
    { title: 'Aplikasi Lowongan Kerja', type: 'Mobile Application', year: '2025', description: 'Platform lowongan kerja yang memudahkan perusahaan memposting pekerjaan dan pencari kerja melamar posisi. Fitur meliputi filter pencarian, aplikasi online, dan dashboard manajemen untuk HR.', tags: ['Flutter', 'Dart', 'Firebase', 'ASP.NET'], accent: '#4ADE80' },
    { title: 'Web Aplikasi HR Management', type: 'Company Project', year: '2025', description: 'Sistem manajemen HR komprehensif untuk mengelola karyawan, absensi, cuti, dan penggajian. Membantu perusahaan mengotomatisasi proses HR dan meningkatkan efisiensi operasional.', tags: ['React', 'TypeScript', 'RESTful API', 'Dashboard'], accent: '#22C55E' },
    { title: 'Web Pengajuan Izin', type: 'School Project', year: '2024', description: 'Sistem pengajuan izin digital untuk institusi pendidikan. Memungkinkan siswa mengajukan izin secara online, guru menyetujui/menolak, dan orang tua menerima notifikasi real-time.', tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP'], accent: '#16A34A' },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skill', label: 'Skill' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const socials = [
    { href: 'https://github.com/danuydstia', label: 'GitHub', path: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z' },
    { href: 'https://instagram.com/danuydstia', label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { href: 'https://www.linkedin.com/in/danu-yudistia-3a93352a9/', label: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  ];

  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  const VISIBLE = isMobile ? 3 : 5;
  const cardWidth = carouselWidth > 0
    ? (carouselWidth - gap * (VISIBLE - 1)) / VISIBLE
    : 0;
  const step = cardWidth + gap;
  const maxIndex = Math.max(0, skillCards.length - VISIBLE);

  useEffect(() => {
    setSkillsIndex(p => Math.min(p, maxIndex));
  }, [maxIndex]);

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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  /* ── Navbar style berdasarkan section di bawahnya ─────────── */
  const navBg = navOnLight
    ? 'rgba(10,10,10,0.88)'
    : 'rgba(255,255,255,0.06)';
  const navBorder = navOnLight
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(255,255,255,0.1)';

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">

      <ScrollProgress />

      {/* ═══ FIXED DESKTOP NAV ═══════════════════════════════ */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
        className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div
          className="rounded-full px-8 py-3 flex items-center gap-8"
          style={{
            background: navBg,
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: `1px solid ${navBorder}`,
            transition: 'background 0.4s ease, border-color 0.4s ease',
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
                className="relative text-sm font-medium transition-colors duration-300 font-dm"
                style={{ color: activeSection === item.id ? '#4ADE80' : 'rgba(255,255,255,0.7)' }}
              >
                {item.label}
                <AnimatePresence>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#4ADE80' }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </nav>
          <motion.button
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-2 px-4 py-1.5 text-xs font-bold rounded-full font-syne tracking-wide"
            style={{ background: '#4ADE80', color: '#052e16' }}
          >
            Hire Me
          </motion.button>
        </div>
      </motion.header>

      {/* ═══ HERO ════════════════════════════════════════════ */}
      <div id="home" className="relative min-h-screen overflow-hidden" style={{ background: '#060608' }}>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
          .font-syne { font-family: 'Syne', sans-serif; }
          .font-dm { font-family: 'DM Sans', sans-serif; }
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

        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="grain absolute inset-0 pointer-events-none z-[2]" />

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
              animate={isMenuOpen ? (i === 1 ? { opacity: 0, width: 0 } : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 8 : -8 }) : { rotate: 0, y: 0, opacity: 1, width: 22 }}
              className="block h-0.5 w-[22px] bg-white rounded-full origin-center"
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.button>

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
                  onClick={() => scrollTo(item.id)}
                  className="font-syne text-5xl font-black text-white py-3 tracking-tight"
                  whileHover={{ x: 12, color: '#4ADE80', transition: { type: 'spring', stiffness: 400 } }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex items-center min-h-screen px-6 sm:px-10 md:px-16 lg:px-24 pt-24 md:pt-0 will-change-transform"
        >
          <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-0 items-center">
            <div className="font-dm">
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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: easeOut }}
                className="text-base md:text-lg text-white/40 leading-relaxed mb-10 max-w-md"
              >
                Passionate about building scalable applications and exploring cutting-edge technologies.
              </motion.p>

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
              <div className="absolute w-40 h-40 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)' }} />
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.9, ease: easeOut }}
                style={{ animation: 'float-slow 6s ease-in-out infinite', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(74,222,128,0.12)' }}
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
                { label: '10+ Projects', delay: 1.1, x: 130, y: -110 },
                { label: '2+ Yrs Exp', delay: 1.3, x: -140, y: -80 },
                { label: '6 Tech Stack', delay: 1.5, x: 140, y: 100 },
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

      {/* ═══ TICKER STRIP ════════════════════════════════════ */}
      <div
        className="overflow-hidden py-3 shadow-sm border-y border-black/5"
        style={{ backgroundColor: '#4ADE80' }}
        aria-hidden="true"
      >
        <Ticker text="Software Engineer · React · Flutter · Python · " speed={1} />
      </div>

      {/* ═══ SKILLS ══════════════════════════════════════════ */}
      <div id="skill" className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#0D0D12' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(74,222,128,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <SectionHeading
            badge="Technical Arsenal"
            title={<>Background Skill &<br/>Accomplishment</>}
            subtitle="Continuously learning and improving in front-end development. HTML5, CSS3, React.js, Tailwind CSS, Flutter, and Python."
            light
          />

          <div className="relative flex items-center gap-3 md:gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.88 }}
              onClick={() => setSkillsIndex(p => (p > 0 ? p - 1 : maxIndex))}
              className="w-9 h-9 md:w-11 md:h-11 shrink-0 flex items-center justify-center rounded-full border z-10 transition-colors"
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
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase">{skill.name}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.88 }}
              onClick={() => setSkillsIndex(p => (p < maxIndex ? p + 1 : 0))}
              className="w-9 h-9 md:w-11 md:h-11 shrink-0 flex items-center justify-center rounded-full border z-10 transition-colors"
              style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setSkillsIndex(i)}
                animate={{
                  width: skillsIndex === i ? 24 : 8,
                  backgroundColor: skillsIndex === i ? '#4ADE80' : 'rgba(74,222,128,0.25)'
                }}
                transition={{ duration: 0.3 }}
                className="h-2 rounded-full"
              />
            ))}
          </div>

          <StaggerGroup className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto" staggerChildren={0.08}>
            {[
              { number: '6+', label: 'Technologies' },
              { number: '10+', label: 'Projects' },
              { number: '2+', label: 'Years Learning' },
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

      {/* ═══ EXPERIENCE ═══════════════════════════════════════ */}
      <div id="experience" className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#F5FAF0' }}>
        <motion.div style={{ x: tickerX }} className="absolute inset-0 flex items-center opacity-[0.04] pointer-events-none will-change-transform">
          <span className="text-[200px] font-black tracking-tighter whitespace-nowrap text-black uppercase">Projects · Experience · Work ·&nbsp;</span>
        </motion.div>

        <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <SectionHeading
            badge="My Journey"
            title={<>Experience &<br/>Projects</>}
            subtitle="Building real-world applications and continuously expanding my skillset through hands-on projects."
          />

          <div className="max-w-4xl mx-auto space-y-0">
            {projects.map((project, index) => {
              const cardRef = useRef(null);
              const cardInView = useInView(cardRef, { once: true, margin: '-80px' });
              const { scrollYProgress: cardProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
              const cardY = useTransform(cardProgress, [0, 1], [40, -40]);

              return (
                <div key={index} className="relative pl-8 md:pl-12 pb-12 md:pb-16">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
                    style={{ originY: 0, background: 'rgba(74,222,128,0.35)' }}
                    className="absolute left-3 top-6 bottom-0 w-0.5"
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, ...spring }}
                    className="absolute left-0.5 md:left-1 top-5 w-5 h-5 rounded-full border-4 shadow-lg"
                    style={{ backgroundColor: project.accent, borderColor: '#F5FAF0' }}
                  />
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
            })}
          </div>
        </div>
      </div>

      {/* ═══ CONTACT ══════════════════════════════════════════ */}
      <div id="contact" className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#080810' }}>
        <motion.div
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(74,222,128,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.15) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <SectionHeading
            badge="Get In Touch"
            title={<>Let's Work<br/>Together</>}
            subtitle="Have a project in mind or just want to chat? Feel free to reach out!"
            light
          />

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-5">
              {[
                {
                  href: 'mailto:danu.ydstia@gmail.com',
                  icon: <svg className="w-6 h-6" style={{ color: '#4ADE80' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
                  iconBg: 'rgba(74,222,128,0.12)',
                  label: 'Email Me', sub: 'danu.ydstia@gmail.com', delay: 0
                },
                {
                  icon: <svg className="w-6 h-6" style={{ color: '#4ADE80' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
                  iconBg: 'rgba(74,222,128,0.12)',
                  label: 'Location', sub: 'Indonesia', delay: 0.08
                }
              ].map((card, i) => (
                <Reveal key={i} delay={card.delay} from="bottom">
                  <motion.div
                    whileHover={{ scale: 1.03, backgroundColor: 'rgba(74,222,128,0.07)' }}
                    className="border rounded-2xl p-6 md:p-7 cursor-default transition-colors"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,222,128,0.15)' }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: card.iconBg }}>
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{card.label}</h3>
                    <p className="text-white/50 text-sm break-all">{card.sub}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>

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
                      className="w-14 h-14 flex items-center justify-center rounded-xl group transition-colors duration-200"
                      style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}
                    >
                      <svg className="w-7 h-7 transition-colors" style={{ fill: '#4ADE80' }} viewBox="0 0 24 24">
                        <path d={s.path} />
                      </svg>
                    </motion.a>
                  ))}
                </StaggerGroup>
              </motion.div>
            </Reveal>
          </div>

          <Reveal delay={0.28} className="text-center mt-14 pt-8" style={{ borderTop: '1px solid rgba(74,222,128,0.1)' }}>
            <p className="text-white/30 text-xs tracking-widest uppercase">© 2025 Danu · All rights reserved</p>
          </Reveal>
        </div>
      </div>

    </div>
  );
}