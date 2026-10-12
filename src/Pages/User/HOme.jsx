import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaBook,
  FaStar,
  FaHeart,
  FaUsers,
  FaQuoteLeft,
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaSearch,
  FaRegBookmark,
  FaBell,
} from 'react-icons/fa';

/* ─── ANIMATED 3-D BOOK ────────────────────────────────── */
function AnimatedBook() {
  return (
    <motion.div
      animate={{ y: [0, -16, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      className="relative w-44 h-60 cursor-pointer"
      style={{ perspective: '700px' }}
    >
      <motion.div
        animate={{ rotateY: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {/* Glow */}
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 rounded-xl blur-3xl bg-violet-500/30 -z-10"
        />
        {/* Front cover */}
        <div
          className="absolute inset-0 rounded-r-lg rounded-l-sm flex flex-col items-center justify-center overflow-hidden shadow-2xl border border-violet-500/30"
          style={{
            background: 'linear-gradient(160deg,#3b0764,#1e1b4b)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="absolute inset-2 border border-violet-400/20 rounded pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-violet-300 mb-3"
          >
            <FaBookOpen size={38} />
          </motion.div>
          <p className="text-white/90 text-sm font-bold text-center px-4">
            BookWorm
          </p>
          <p className="text-violet-400/70 text-xs mt-1 tracking-widest uppercase">
            Library
          </p>
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 3, repeatDelay: 2.5 }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
          />
        </div>
        {/* Spine */}
        <div
          className="absolute left-0 top-0 h-full rounded-l-sm"
          style={{
            width: '12px',
            background: 'linear-gradient(to right,#1e1b4b,#3b0764)',
            transform: 'translateX(-12px) rotateY(90deg)',
            transformOrigin: 'right center',
          }}
        />
        {/* Pages */}
        <div
          className="absolute right-0 top-1 bottom-1"
          style={{
            width: '5px',
            background:
              'repeating-linear-gradient(to bottom,#e2e8f0 0px,#94a3b8 1px,#e2e8f0 2px)',
            borderRadius: '0 2px 2px 0',
            transform: 'translateX(5px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── MINI BOOK ─────────────────────────────────────────── */
function MiniBook({ x, y, delay, color = '#7c3aed' }) {
  return (
    <motion.div
      animate={{ y: [y, y - 18, y], rotate: [0, 7, 0] }}
      transition={{
        repeat: Infinity,
        duration: 4 + delay,
        delay,
        ease: 'easeInOut',
      }}
      className="absolute opacity-20 pointer-events-none"
      style={{ left: x, top: y }}
    >
      <div
        style={{
          width: 28,
          height: 38,
          background: color,
          borderRadius: 3,
          boxShadow: `0 4px 12px ${color}55`,
        }}
      />
    </motion.div>
  );
}

/* ─── DATA ──────────────────────────────────────────────── */
const stats = [
  {
    icon: <FaBook />,
    value: '10,000+',
    label: 'Books',
    color: 'text-violet-400',
  },
  {
    icon: <FaUsers />,
    value: '5,000+',
    label: 'Readers',
    color: 'text-amber-400',
  },
  {
    icon: <FaStar />,
    value: '50,000+',
    label: 'Reviews',
    color: 'text-emerald-400',
  },
  {
    icon: <FaHeart />,
    value: '25,000+',
    label: 'Saved',
    color: 'text-rose-400',
  },
];

const genres = [
  {
    name: 'Fiction',
    emoji: '📖',
    count: '2,400',
    accent: 'hover:border-violet-500/60 hover:bg-violet-500/10',
  },
  {
    name: 'Science',
    emoji: '🔬',
    count: '1,200',
    accent: 'hover:border-blue-500/60 hover:bg-blue-500/10',
  },
  {
    name: 'History',
    emoji: '🏛️',
    count: '980',
    accent: 'hover:border-amber-500/60 hover:bg-amber-500/10',
  },
  {
    name: 'Fantasy',
    emoji: '🧙',
    count: '1,800',
    accent: 'hover:border-purple-500/60 hover:bg-purple-500/10',
  },
  {
    name: 'Romance',
    emoji: '💕',
    count: '2,100',
    accent: 'hover:border-rose-500/60 hover:bg-rose-500/10',
  },
  {
    name: 'Mystery',
    emoji: '🔍',
    count: '1,500',
    accent: 'hover:border-cyan-500/60 hover:bg-cyan-500/10',
  },
  {
    name: 'Thriller',
    emoji: '😱',
    count: '1,300',
    accent: 'hover:border-orange-500/60 hover:bg-orange-500/10',
  },
  {
    name: 'Biography',
    emoji: '👤',
    count: '760',
    accent: 'hover:border-emerald-500/60 hover:bg-emerald-500/10',
  },
];

const featured = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    rating: 4.8,
    genre: 'Fiction',
    color: '#7c3aed',
    glow: 'shadow-violet-500/20',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 4.9,
    genre: 'Self-Help',
    color: '#f59e0b',
    glow: 'shadow-amber-500/20',
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    rating: 4.7,
    genre: 'Sci-Fi',
    color: '#0ea5e9',
    glow: 'shadow-sky-500/20',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 4.6,
    genre: 'Fiction',
    color: '#10b981',
    glow: 'shadow-emerald-500/20',
  },
];

const steps = [
  {
    icon: <FaSearch size={22} />,
    title: 'Discover Books',
    desc: 'Search thousands of titles across every genre.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-500/20',
  },
  {
    icon: <FaRegBookmark size={22} />,
    title: 'Build Your Shelf',
    desc: 'Save books and organize your personal library.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/20',
  },
  {
    icon: <FaStar size={22} />,
    title: 'Rate & Review',
    desc: 'Share thoughts and help the community.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20',
  },
  {
    icon: <FaBell size={22} />,
    title: 'Get Picks',
    desc: 'Smart recommendations tailored for your taste.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20 group-hover:bg-rose-500/20',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'BookWorm completely changed how I discover books. The recommendations are spot on!',
    rating: 5,
    color: 'border-violet-500/25 hover:border-violet-500/50',
  },
  {
    name: 'James K.',
    text: 'I love the community here. Finding fellow readers who share my taste is incredible.',
    rating: 5,
    color: 'border-amber-500/25 hover:border-amber-500/50',
  },
  {
    name: 'Priya S.',
    text: 'The personal library feature is beautifully designed. I use it every single day.',
    rating: 5,
    color: 'border-emerald-500/25 hover:border-emerald-500/50',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── MAIN ──────────────────────────────────────────────── */
const HOme = () => {
  const [email, setEmail] = useState('');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <div className="min-h-screen bg-[#07050f] text-white overflow-x-hidden">
      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#07050f]" />
          {/* Colour glow orbs */}
          <div className="absolute top-1/4 right-1/4 w-[520px] h-[520px] rounded-full bg-violet-600/15 blur-[130px]" />
          <div className="absolute bottom-1/4 left-1/5 w-[400px] h-[400px] rounded-full bg-indigo-600/12 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-amber-500/8 blur-[100px]" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle,#a78bfa 1px,transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </motion.div>

        {/* Floating mini books */}
        {[
          { x: '5%', y: 140, delay: 0, color: '#7c3aed' },
          { x: '80%', y: 100, delay: 0.5, color: '#f59e0b' },
          { x: '88%', y: 280, delay: 0.9, color: '#0ea5e9' },
          { x: '3%', y: 340, delay: 0.2, color: '#10b981' },
        ].map((b, i) => (
          <MiniBook key={i} {...b} />
        ))}

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20 flex items-center justify-between gap-12"
        >
          {/* Left text */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs text-violet-300/80 font-semibold tracking-widest uppercase mb-5 border border-violet-500/30 px-4 py-1.5 rounded-full bg-violet-500/10"
            >
              ✦ Welcome to BookWorm
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-6xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight"
            >
              Your World of
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Stories
              </span>{' '}
              Awaits
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-white/45 mb-10 leading-relaxed max-w-lg"
            >
              Discover, collect, and share the books that move you. Build your
              personal library and connect with thousands of fellow readers
              worldwide.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex gap-4 flex-wrap"
            >
              <Link
                to="/browsebookspage"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl hover:from-violet-500 hover:to-indigo-500 active:scale-[0.97] transition-all shadow-lg shadow-violet-500/30 cursor-pointer text-sm"
              >
                Browse Books <FaArrowRight size={13} />
              </Link>
              <Link
                to="/mylibrary"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-violet-500/30 text-violet-300 font-semibold rounded-xl hover:bg-violet-500/15 hover:border-violet-400/50 hover:text-white active:scale-[0.97] transition-all cursor-pointer text-sm"
              >
                My Library
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex gap-6 mt-10 flex-wrap"
            >
              {['Free to join', 'No credit card', '10k+ books'].map((t, i) => (
                <span
                  key={i}
                  className="text-sm text-white/35 flex items-center gap-1.5"
                >
                  <FaCheckCircle className="text-violet-400/60" size={12} /> {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: book */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hidden md:flex flex-col items-center gap-8 relative shrink-0"
          >
            <AnimatedBook />
            {/* Orbiting rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 9 + i * 2,
                  ease: 'linear',
                }}
                className="absolute"
                style={{
                  width: `${190 + i * 55}px`,
                  height: `${190 + i * 55}px`,
                  border: '1px dashed rgba(139,92,246,0.18)',
                  borderRadius: '50%',
                }}
              >
                <div
                  className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/50"
                  style={{
                    top: '-3px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
              </motion.div>
            ))}
            {/* Pills */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: 0.5 }}
              className="absolute -left-28 top-4 bg-violet-500/10 border border-violet-500/25 backdrop-blur-md rounded-xl px-4 py-2.5 flex items-center gap-2"
            >
              <FaStar className="text-amber-400" size={13} />
              <span className="text-sm font-semibold text-white/80">
                50k+ Reviews
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, delay: 1 }}
              className="absolute -right-24 bottom-8 bg-indigo-500/10 border border-indigo-500/25 backdrop-blur-md rounded-xl px-4 py-2.5 flex items-center gap-2"
            >
              <FaUsers className="text-emerald-400" size={13} />
              <span className="text-sm font-semibold text-white/80">
                5k+ Readers
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-xs text-violet-300/70 tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-violet-400/60 to-transparent" />
        </motion.div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════ */}
      <section className="py-16 border-y border-violet-500/10 bg-gradient-to-r from-violet-950/30 via-indigo-950/20 to-violet-950/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group cursor-default"
            >
              <div
                className={`text-2xl flex justify-center mb-3 ${s.color} transition-transform group-hover:scale-110`}
              >
                {s.icon}
              </div>
              <p className="text-4xl font-black text-white">{s.value}</p>
              <p className="text-white/30 text-xs mt-1 tracking-widest uppercase">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED BOOKS ═════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs text-violet-400/70 tracking-widest uppercase font-semibold">
            Handpicked
          </span>
          <h2 className="text-5xl font-bold text-white mt-2">Featured Books</h2>
          <p className="text-white/35 mt-3 max-w-md mx-auto text-sm">
            Our community's most loved reads this month
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((book, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.22 } }}
              className={`group bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-xl ${book.glow} transition-all cursor-pointer`}
            >
              <div
                className="h-48 flex items-center justify-center border-b border-white/6 relative"
                style={{
                  background: `linear-gradient(135deg,${book.color}18,${book.color}35)`,
                }}
              >
                <motion.div
                  animate={{ rotateY: [-5, 5, -5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    delay: i * 0.3,
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-14 h-20 rounded-sm flex items-center justify-center shadow-xl border border-white/15"
                >
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{ background: book.color, opacity: 0.85 }}
                  />
                  <FaBookOpen
                    className="text-white/70 relative z-10"
                    size={18}
                  />
                </motion.div>
                <span
                  className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border text-white/70"
                  style={{
                    background: `${book.color}20`,
                    borderColor: `${book.color}40`,
                  }}
                >
                  {book.genre}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white leading-snug">
                  {book.title}
                </h3>
                <p className="text-sm text-white/40 mt-1">{book.author}</p>
                <div className="flex items-center gap-1 mt-3">
                  <FaStar className="text-amber-400" size={12} />
                  <span className="text-sm font-semibold text-white/70">
                    {book.rating}
                  </span>
                </div>
                <button
                  className="mt-4 w-full text-sm font-semibold py-2 rounded-lg border transition-all duration-200 cursor-pointer"
                  style={{ borderColor: `${book.color}50`, color: book.color }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = book.color;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = book.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = book.color;
                    e.currentTarget.style.borderColor = `${book.color}50`;
                  }}
                >
                  Add to Shelf
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/browsebookspage"
            className="inline-flex items-center gap-2 text-sm text-violet-400/70 hover:text-violet-300 transition-colors cursor-pointer"
          >
            View all books <FaArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═══════════════════════════════════ */}
      <section className="py-24 border-y border-white/6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs text-amber-400/70 tracking-widest uppercase font-semibold">
              Simple Steps
            </span>
            <h2 className="text-5xl font-bold text-white mt-2">How It Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-5 transition-all ${step.bg} ${step.color}`}
                >
                  {step.icon}
                </div>
                <span className="text-xs text-white/25 font-bold tracking-widest uppercase mb-1">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GENRES ═════════════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs text-emerald-400/70 tracking-widest uppercase font-semibold">
            Explore
          </span>
          <h2 className="text-5xl font-bold text-white mt-2">
            Browse by Genre
          </h2>
          <p className="text-white/35 mt-3 text-sm">
            Find your perfect read from our curated collections
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {genres.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.04 }}
              className={`flex flex-col items-center justify-center gap-2 py-6 px-3 rounded-2xl border border-white/8 bg-white/3 cursor-pointer transition-all group ${g.accent}`}
            >
              <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                {g.emoji}
              </span>
              <p className="font-semibold text-white/60 text-xs group-hover:text-white transition-colors">
                {g.name}
              </p>
              <p className="text-white/20 text-xs">{g.count}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════════ */}
      <section className="py-24 border-y border-white/6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs text-rose-400/70 tracking-widest uppercase font-semibold">
              Community
            </span>
            <h2 className="text-5xl font-bold text-white mt-2">
              What Readers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`bg-white/3 border rounded-2xl p-7 hover:bg-white/5 transition-all cursor-default ${t.color}`}
              >
                <FaQuoteLeft className="text-violet-400/30 mb-4" size={22} />
                <p className="text-white/55 leading-relaxed mb-6 text-sm">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/30 border border-violet-500/20 flex items-center justify-center font-bold text-violet-300 text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white/80 text-sm">{t.name}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array(t.rating)
                        .fill(0)
                        .map((_, j) => (
                          <FaStar
                            key={j}
                            className="text-amber-400/70"
                            size={10}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ═════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-indigo-900/15 to-[#07050f]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-violet-600/12 blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-xl mx-auto text-center px-6"
        >
          <span className="text-xs text-violet-400/70 tracking-widest uppercase font-semibold">
            Stay in the loop
          </span>
          <h2 className="text-5xl font-bold text-white mt-3 mb-4">
            Never Miss a Good Book
          </h2>
          <p className="text-white/40 mb-8 leading-relaxed text-sm">
            Get weekly recommendations, new arrivals, and reading inspiration
            straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-xl bg-violet-500/8 border border-violet-500/20 text-white placeholder-white/25 focus:outline-none focus:border-violet-400/50 focus:bg-violet-500/12 transition-all text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:from-violet-500 hover:to-indigo-500 active:scale-[0.97] transition-all shadow-lg shadow-violet-500/25 cursor-pointer text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════ */}
      <footer className="border-t border-white/6 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaBookOpen className="text-violet-400/60" size={16} />
            <span className="text-white/40 text-sm font-bold">BookWorm</span>
          </div>
          <p className="text-white/20 text-xs text-center">
            © 2025 BookWorm. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Contact'].map((l, i) => (
              <span
                key={i}
                className="text-xs text-white/20 hover:text-violet-400/70 transition-colors cursor-pointer"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HOme;
