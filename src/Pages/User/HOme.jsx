import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaBook,
  FaStar,
  FaHeart,
  FaUsers,
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaSearch,
  FaRegBookmark,
  FaBell,
  FaQuoteLeft,
  FaFire,
  FaGlobeAmericas,
  FaMagic,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { MdAutoAwesome } from 'react-icons/md';

/* ══════════════════════════════════════════════════════════
   FLOATING PARTICLE FIELD
══════════════════════════════════════════════════════════ */
function ParticleField() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    color: [
      'bg-violet-400',
      'bg-indigo-400',
      'bg-purple-400',
      'bg-fuchsia-400',
    ][i % 4],
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full opacity-0 ${p.color}`}
          style={{ left: p.x, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -60, -120] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   3D BOOK HERO
══════════════════════════════════════════════════════════ */
function HeroBook() {
  return (
    <div className="relative" style={{ perspective: '900px' }}>
      {/* Outer glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="absolute -inset-8 rounded-3xl bg-violet-500/20 blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ rotateY: [-12, 12, -12], y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-48 h-64"
      >
        {/* Cover */}
        <div
          className="absolute inset-0 rounded-r-xl rounded-l-md flex flex-col items-center justify-center shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg,#4c1d95,#1e1b4b,#312e81)',
            backfaceVisibility: 'hidden',
            border: '1px solid rgba(167,139,250,0.25)',
          }}
        >
          <div className="absolute inset-3 border border-violet-400/15 rounded pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.12, 1], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-violet-300 mb-3"
          >
            <FaBookOpen size={44} />
          </motion.div>
          <p className="text-white font-black text-sm tracking-wide">
            BookWorm
          </p>
          <div className="flex gap-1 mt-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <FaStar key={i} size={8} className="text-amber-400" />
            ))}
          </div>
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 2.5 }}
            className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-12 pointer-events-none"
          />
        </div>
        {/* Spine */}
        <div
          className="absolute left-0 top-0 h-full rounded-l-md"
          style={{
            width: 14,
            background: 'linear-gradient(to right,#0f0b1f,#4c1d95)',
            transform: 'translateX(-14px) rotateY(90deg)',
            transformOrigin: 'right center',
          }}
        />
        {/* Pages */}
        <div
          className="absolute right-0 top-2 bottom-2"
          style={{
            width: 6,
            background:
              'repeating-linear-gradient(to bottom,#f1f5f9 0px,#cbd5e1 1px,#f1f5f9 2px)',
            borderRadius: '0 3px 3px 0',
            transform: 'translateX(6px)',
          }}
        />
      </motion.div>

      {/* Orbit rings */}
      {[170, 230, 290].map((size, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            repeat: Infinity,
            duration: 10 + i * 3,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: size,
            height: size,
            border: '1px dashed rgba(139,92,246,0.2)',
            borderRadius: '50%',
          }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-violet-400/60"
            style={{ top: -4, left: '50%', transform: 'translateX(-50%)' }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const stats = [
  {
    icon: <FaBook />,
    value: '10K+',
    label: 'Books',
    color: '#7c3aed',
    bg: 'from-violet-500/15',
  },
  {
    icon: <FaUsers />,
    value: '5K+',
    label: 'Readers',
    color: '#f59e0b',
    bg: 'from-amber-500/15',
  },
  {
    icon: <FaStar />,
    value: '50K+',
    label: 'Reviews',
    color: '#10b981',
    bg: 'from-emerald-500/15',
  },
  {
    icon: <FaHeart />,
    value: '25K+',
    label: 'Saved',
    color: '#f43f5e',
    bg: 'from-rose-500/15',
  },
];

const featured = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    rating: 4.8,
    genre: 'Fiction',
    c: '#7c3aed',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 4.9,
    genre: 'Self-Help',
    c: '#f59e0b',
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    rating: 4.7,
    genre: 'Sci-Fi',
    c: '#0ea5e9',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 4.6,
    genre: 'Fiction',
    c: '#10b981',
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    rating: 4.8,
    genre: 'Sci-Fi',
    c: '#f43f5e',
  },
  {
    title: '1984',
    author: 'George Orwell',
    rating: 4.7,
    genre: 'Dystopia',
    c: '#6366f1',
  },
];

const genres = [
  { name: 'Fiction', emoji: '📖', color: '#7c3aed' },
  { name: 'Science', emoji: '🔬', color: '#0ea5e9' },
  { name: 'History', emoji: '🏛️', color: '#f59e0b' },
  { name: 'Fantasy', emoji: '🧙', color: '#a855f7' },
  { name: 'Romance', emoji: '💕', color: '#f43f5e' },
  { name: 'Mystery', emoji: '🔍', color: '#06b6d4' },
  { name: 'Thriller', emoji: '😱', color: '#f97316' },
  { name: 'Biography', emoji: '👤', color: '#10b981' },
];

const features = [
  {
    icon: <FaSearch size={20} />,
    title: 'Smart Search',
    desc: 'Find any book instantly with our intelligent search engine.',
    color: '#7c3aed',
  },
  {
    icon: <FaRegBookmark size={20} />,
    title: 'Personal Shelf',
    desc: 'Organize your reading life with a beautiful personal library.',
    color: '#f59e0b',
  },
  {
    icon: <FaStar size={20} />,
    title: 'Community Reviews',
    desc: 'Read and write honest reviews from real book lovers.',
    color: '#10b981',
  },
  {
    icon: <FaBell size={20} />,
    title: 'Smart Picks',
    desc: 'AI-powered recommendations based on what you love.',
    color: '#f43f5e',
  },
  {
    icon: <FaFire size={20} />,
    title: 'Trending Now',
    desc: 'Discover what the reading community is obsessing over.',
    color: '#f97316',
  },
  {
    icon: <FaGlobeAmericas size={20} />,
    title: 'Global Community',
    desc: 'Connect with readers from over 50 countries worldwide.',
    color: '#0ea5e9',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Book Club Host',
    text: 'BookWorm changed how I discover books. The recommendations are always spot on!',
    rating: 5,
    avatar: 'S',
  },
  {
    name: 'James K.',
    role: 'Literature Teacher',
    text: 'My students love using BookWorm. Finding books that match their level has never been easier.',
    rating: 5,
    avatar: 'J',
  },
  {
    name: 'Priya S.',
    role: 'Avid Reader',
    text: "The personal library feature is gorgeous. I track every book I've ever read here.",
    rating: 5,
    avatar: 'P',
  },
];

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
const HOme = () => {
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div className="min-h-screen bg-[#070512] text-white overflow-x-hidden font-sans">
      {/* ══ HERO ════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#070512]" />
          {/* Big glow blobs */}
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-violet-600/15 blur-[160px]" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-indigo-600/12 blur-[130px]" />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-fuchsia-500/8 blur-[100px]" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(167,139,250,1) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,1) 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>

        <ParticleField />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs text-violet-300/80 font-semibold tracking-widest uppercase mb-6 border border-violet-500/30 px-4 py-2 rounded-full bg-violet-500/8"
            >
              <HiSparkles size={12} className="text-violet-400" />
              Welcome to BookWorm
              <HiSparkles size={12} className="text-violet-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-6xl lg:text-7xl font-black leading-[1.03] mb-6 tracking-tight"
            >
              Read More.
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                  Know More.
                </span>
                <motion.div
                  animate={{ scaleX: [0, 1] }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 origin-left"
                />
              </span>
              <br />
              Be More.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-white/45 text-lg leading-relaxed mb-10 max-w-lg"
            >
              Your personal reading universe. Discover 10,000+ books, build your
              dream library, and join a community of passionate readers from
              around the world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex gap-4 flex-wrap mb-10"
            >
              <Link
                to="/browsebookspage"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-violet-500 hover:to-indigo-500 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xl shadow-violet-500/30 cursor-pointer text-sm"
              >
                <FaBookOpen size={15} /> Start Reading Free
              </Link>
              <Link
                to="/browsebookspage"
                className="inline-flex items-center gap-2 px-8 py-4 border border-violet-500/30 text-violet-300 font-semibold rounded-2xl hover:bg-violet-500/12 hover:border-violet-400/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm"
              >
                Browse Books <FaArrowRight size={12} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 flex-wrap"
            >
              {[
                ['10K+', 'Books'],
                ['5K+', 'Readers'],
                ['50K+', 'Reviews'],
              ].map(([v, l], i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-black text-white">{v}</span>
                  <span className="text-xs text-white/30 uppercase tracking-widest">
                    {l}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center relative"
          >
            <HeroBook />
            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute -left-4 top-8 bg-violet-900/60 border border-violet-500/30 backdrop-blur-xl rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <FaStar className="text-amber-400" size={16} />
              </div>
              <div>
                <p className="text-xs text-white/50">Daily Pick</p>
                <p className="text-sm font-bold text-white">Atomic Habits</p>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
              className="absolute -right-4 bottom-12 bg-indigo-900/60 border border-indigo-500/30 backdrop-blur-xl rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <FaUsers className="text-emerald-400" size={16} />
              </div>
              <div>
                <p className="text-xs text-white/50">Online Now</p>
                <p className="text-sm font-bold text-white">1,234 Readers</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-30"
        >
          <span className="text-xs text-violet-300/60 tracking-[0.25em] uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-violet-400/60 to-transparent" />
        </motion.div>
      </section>

      {/* ══ STATS STRIP ═════════════════════════════════════ */}
      <section className="py-14 relative border-y border-violet-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-violet-950/40" />
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              {...fade(i * 0.1)}
              whileHover={{ scale: 1.04, y: -4 }}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/6 bg-white/3 hover:bg-white/6 hover:border-white/12 transition-all cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                style={{
                  background: `${s.color}22`,
                  color: s.color,
                  border: `1px solid ${s.color}33`,
                }}
              >
                {s.icon}
              </div>
              <div>
                <p className="text-3xl font-black text-white leading-none">
                  {s.value}
                </p>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-0.5">
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED BOOKS ══════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          {...fade()}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs text-violet-400/80 font-semibold tracking-widest uppercase mb-3 bg-violet-500/10 border border-violet-500/20 px-4 py-1.5 rounded-full">
              <MdAutoAwesome size={12} /> Handpicked
            </span>
            <h2 className="text-5xl font-black text-white">
              Featured{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Books
              </span>
            </h2>
          </div>
          <Link
            to="/browsebookspage"
            className="inline-flex items-center gap-2 text-sm text-violet-400/70 hover:text-violet-300 transition-colors cursor-pointer"
          >
            See all <FaArrowRight size={11} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((book, i) => (
            <motion.div
              key={i}
              {...fade(i * 0.08)}
              whileHover={{ y: -8, transition: { duration: 0.22 } }}
              className="group relative bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-white/18 transition-all cursor-pointer"
              style={{ boxShadow: `0 0 0 0 ${book.c}00` }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = `0 8px 40px -8px ${book.c}40`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 0 0 transparent')
              }
            >
              {/* Color bar top */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg,${book.c},${book.c}88)`,
                }}
              />
              <div className="p-6 flex gap-5 items-start">
                {/* Mini book */}
                <div
                  className="shrink-0 w-16 h-22 rounded-lg flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(145deg,${book.c},${book.c}88)`,
                    minHeight: 88,
                  }}
                >
                  <FaBookOpen className="text-white/70" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full mb-2 inline-block"
                    style={{
                      background: `${book.c}20`,
                      color: book.c,
                      border: `1px solid ${book.c}35`,
                    }}
                  >
                    {book.genre}
                  </span>
                  <h3 className="font-bold text-white text-base leading-snug truncate">
                    {book.title}
                  </h3>
                  <p className="text-sm text-white/40 mt-1">{book.author}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <FaStar
                          key={j}
                          size={10}
                          className={
                            j < Math.floor(book.rating)
                              ? 'text-amber-400'
                              : 'text-white/15'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white/60">
                      {book.rating}
                    </span>
                  </div>
                  <button
                    className="mt-3 w-full py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
                    style={{
                      background: `${book.c}18`,
                      color: book.c,
                      border: `1px solid ${book.c}35`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = book.c;
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${book.c}18`;
                      e.currentTarget.style.color = book.c;
                    }}
                  >
                    + Add to Shelf
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ GENRE EXPLORER ══════════════════════════════════ */}
      <section className="py-24 border-y border-violet-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/25 via-[#070512] to-indigo-950/20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div {...fade()} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs text-emerald-400/80 font-semibold tracking-widest uppercase mb-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
              <FaGlobeAmericas size={11} /> Explore
            </span>
            <h2 className="text-5xl font-black text-white mt-2">
              Browse by{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Genre
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {genres.map((g, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.05)}
                whileHover={{ y: -6, scale: 1.05 }}
                className="group flex flex-col items-center justify-center gap-2.5 py-7 px-3 rounded-2xl border border-white/8 bg-white/3 cursor-pointer transition-all"
                style={{}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${g.color}50`;
                  e.currentTarget.style.background = `${g.color}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {g.emoji}
                </span>
                <p className="font-semibold text-white/55 text-xs group-hover:text-white transition-colors">
                  {g.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES GRID ═══════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div {...fade()} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs text-amber-400/80 font-semibold tracking-widest uppercase mb-3 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full">
            <FaMagic size={11} /> Everything You Need
          </span>
          <h2 className="text-5xl font-black text-white mt-2">
            Why{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              BookWorm
            </span>
            ?
          </h2>
          <p className="text-white/35 mt-3 text-sm max-w-md mx-auto">
            Built for readers who take their reading seriously
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              {...fade(i * 0.08)}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-all cursor-default"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${f.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                style={{
                  background: `${f.color}18`,
                  color: f.color,
                  border: `1px solid ${f.color}30`,
                }}
              >
                {f.icon}
              </div>
              <h3 className="font-bold text-white text-base mb-2">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════ */}
      <section className="py-24 border-y border-violet-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-[#070512] to-violet-950/25" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div {...fade()} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs text-rose-400/80 font-semibold tracking-widest uppercase mb-3 bg-rose-500/10 border border-rose-500/20 px-4 py-1.5 rounded-full">
              ❤️ Community
            </span>
            <h2 className="text-5xl font-black text-white mt-2">
              Loved by{' '}
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                Readers
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.12)}
                whileHover={{ y: -6 }}
                className="group p-7 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-violet-500/25 transition-all cursor-default"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array(t.rating)
                    .fill(0)
                    .map((_, j) => (
                      <FaStar key={j} className="text-amber-400" size={12} />
                    ))}
                </div>
                <FaQuoteLeft className="text-violet-400/25 mb-3" size={20} />
                <p className="text-white/55 leading-relaxed text-sm mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/40 to-indigo-500/40 border border-violet-500/25 flex items-center justify-center font-black text-violet-300">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-white/85 text-sm">{t.name}</p>
                    <p className="text-xs text-white/30">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA / NEWSLETTER ════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-[#070512] to-indigo-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-violet-600/10 blur-[120px] pointer-events-none" />

        <motion.div
          {...fade()}
          className="relative z-10 max-w-2xl mx-auto text-center px-6"
        >
          <div className="inline-flex items-center gap-2 text-xs text-violet-300/70 font-semibold tracking-widest uppercase mb-6 border border-violet-500/25 px-4 py-2 rounded-full bg-violet-500/8">
            <HiSparkles size={12} /> Join 5,000+ Readers
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Start Your Reading
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              {' '}
              Adventure
            </span>
          </h2>
          <p className="text-white/40 mb-10 leading-relaxed">
            Get weekly picks, new arrivals, and personalised recommendations.
            Completely free, no spam ever.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 rounded-2xl bg-violet-500/8 border border-violet-500/20 text-white placeholder-white/25 focus:outline-none focus:border-violet-400/50 focus:bg-violet-500/12 transition-all text-sm"
            />
            <button
              type="submit"
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:from-violet-500 hover:to-indigo-500 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xl shadow-violet-500/25 cursor-pointer text-sm whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
          <div className="flex items-center justify-center gap-5 mt-6 flex-wrap">
            {['No spam', 'Unsubscribe anytime', 'Free forever'].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 text-xs text-white/30"
              >
                <FaCheckCircle className="text-emerald-400/60" size={11} /> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer className="border-t border-violet-500/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                <FaBookOpen className="text-violet-400" size={14} />
              </div>
              <span className="text-white font-black text-lg">
                Book<span className="text-violet-400">Worm</span>
              </span>
            </div>
            <p className="text-white/20 text-xs">
              © 2025 BookWorm. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Home', 'Browse', 'Library', 'Privacy'].map((l, i) => (
                <span
                  key={i}
                  className="text-xs text-white/25 hover:text-violet-400/70 transition-colors cursor-pointer"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HOme;
