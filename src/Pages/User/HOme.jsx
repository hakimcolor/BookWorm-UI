import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

/* ─────────────────── CSS 3D BOOK ─────────────────── */

function AnimatedBook({ scrollY }) {
  // scroll-driven transforms
  const scale = useTransform(scrollY, [0, 400], [1, 0.35]);
  const x = useTransform(scrollY, [0, 400], [0, 320]);
  const y = useTransform(scrollY, [0, 400], [0, 160]);
  const rotateY = useTransform(scrollY, [0, 400], ['-20deg', '30deg']);
  const opacity = useTransform(scrollY, [300, 420], [1, 0]);

  const springScale = useSpring(scale, { stiffness: 80, damping: 20 });
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      style={{
        scale: springScale,
        x: springX,
        y: springY,
        opacity,
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
      className="relative w-48 h-64 cursor-pointer"
    >
      {/* Floating glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-xl blur-2xl bg-primary/30 -z-10"
      />

      {/* Book wrapper — rotates on hover + floats */}
      <motion.div
        animate={{ rotateY: [-8, 8, -8], y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', rotateY }}
        className="w-full h-full relative"
        whileHover={{ rotateY: 15 }}
      >
        {/* Front cover */}
        <div
          className="absolute inset-0 rounded-r-lg rounded-l-sm flex flex-col items-center justify-center overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(160deg, #8B4513 0%, #2C1810 100%)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Gold border decoration */}
          <div className="absolute inset-2 border border-[#D4AF37]/40 rounded pointer-events-none" />
          <div className="absolute inset-4 border border-[#D4AF37]/20 rounded pointer-events-none" />

          {/* Embossed icon */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-[#D4AF37]/80 mb-3"
          >
            <FaBookOpen size={40} />
          </motion.div>
          <p
            className="font-heading text-[#FDF6EC]/90 text-base font-bold text-center px-4 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            BookWorm
          </p>
          <p className="text-[#D4AF37]/70 text-xs mt-1 tracking-widest uppercase">
            Library
          </p>

          {/* Shine sweep */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
          />
        </div>

        {/* Spine */}
        <div
          className="absolute left-0 top-0 h-full rounded-l-sm shadow-inner"
          style={{
            width: '14px',
            background: 'linear-gradient(to right, #1a0a05, #3d1a0a)',
            transform: 'translateX(-14px) rotateY(90deg)',
            transformOrigin: 'right center',
          }}
        />

        {/* Pages edge */}
        <div
          className="absolute right-0 top-1 bottom-1"
          style={{
            width: '6px',
            background:
              'repeating-linear-gradient(to bottom, #FDF6EC 0px, #e8ddd0 1px, #FDF6EC 2px)',
            borderRadius: '0 2px 2px 0',
            transform: 'translateX(6px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── FLOATING MINI BOOKS ─────────────────── */

function FloatingMiniBook({ color, delay, x, y, rotate }) {
  return (
    <motion.div
      animate={{ y: [y, y - 18, y], rotate: [rotate, rotate + 6, rotate] }}
      transition={{
        repeat: Infinity,
        duration: 3.5 + delay,
        delay,
        ease: 'easeInOut',
      }}
      className="absolute opacity-30"
      style={{ left: x, top: y }}
    >
      <div
        className="w-8 h-11 rounded-sm shadow-md"
        style={{ background: color }}
      />
    </motion.div>
  );
}

/* ─────────────────── DATA ─────────────────── */

const stats = [
  { icon: <FaBook />, value: '10,000+', label: 'Books' },
  { icon: <FaUsers />, value: '5,000+', label: 'Readers' },
  { icon: <FaStar />, value: '50,000+', label: 'Reviews' },
  { icon: <FaHeart />, value: '25,000+', label: 'Saved' },
];

const genres = [
  { name: 'Fiction', emoji: '📖', count: '2,400 books' },
  { name: 'Science', emoji: '🔬', count: '1,200 books' },
  { name: 'History', emoji: '🏛️', count: '980 books' },
  { name: 'Fantasy', emoji: '🧙', count: '1,800 books' },
  { name: 'Romance', emoji: '💕', count: '2,100 books' },
  { name: 'Mystery', emoji: '🔍', count: '1,500 books' },
  { name: 'Thriller', emoji: '😱', count: '1,300 books' },
  { name: 'Biography', emoji: '👤', count: '760 books' },
];

const featured = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    rating: 4.8,
    genre: 'Fiction',
    color: '#8B4513',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 4.9,
    genre: 'Self-Help',
    color: '#D2691E',
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    rating: 4.7,
    genre: 'Sci-Fi',
    color: '#2C1810',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 4.6,
    genre: 'Fiction',
    color: '#8B4513',
  },
];

const steps = [
  {
    icon: <FaSearch size={28} />,
    title: 'Discover Books',
    desc: 'Search and explore thousands of titles across every genre imaginable.',
  },
  {
    icon: <FaRegBookmark size={28} />,
    title: 'Build Your Shelf',
    desc: 'Save books to your personal library and organize them your way.',
  },
  {
    icon: <FaStar size={28} />,
    title: 'Rate & Review',
    desc: 'Share your thoughts and help the community find their next great read.',
  },
  {
    icon: <FaBell size={28} />,
    title: 'Get Recommendations',
    desc: 'Our smart engine suggests books tailored just for your taste.',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'BookWorm completely changed how I discover books. The recommendations are spot on!',
    rating: 5,
  },
  {
    name: 'James K.',
    text: 'I love the community here. Finding fellow readers who share my taste is incredible.',
    rating: 5,
  },
  {
    name: 'Priya S.',
    text: 'The personal library feature is beautifully designed. I use it every single day.',
    rating: 5,
  },
];

/* ─────────────────── COMPONENT ─────────────────── */

const HOme = () => {
  const [email, setEmail] = useState('');
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollY } = useScroll();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const miniBooks = [
    { color: '#D2691E', delay: 0, x: '8%', y: 120, rotate: -12 },
    { color: '#8B4513', delay: 0.4, x: '78%', y: 80, rotate: 8 },
    { color: '#F4A460', delay: 0.8, x: '88%', y: 260, rotate: -5 },
    { color: '#2C1810', delay: 0.2, x: '5%', y: 320, rotate: 15 },
    { color: '#D4AF37', delay: 1.1, x: '72%', y: 380, rotate: -18 },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FDF6EC] text-neutral overflow-x-hidden"
    >
      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center overflow-hidden"
      >
        {/* Warm parchment bg with subtle texture pattern */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#FDF6EC]" />
          {/* Radial warm glow */}
          <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[80px]" />
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle, #2C1810 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </motion.div>

        {/* Floating mini books decoration */}
        {miniBooks.map((b, i) => (
          <FloatingMiniBook key={i} {...b} />
        ))}

        {/* Text content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-16 flex items-center justify-between"
        >
          {/* Left: text */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-xl"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block font-body text-secondary font-semibold tracking-widest uppercase mb-4 text-xs border border-secondary/40 px-4 py-1.5 rounded-full bg-secondary/10"
            >
              ✦ Welcome to BookWorm
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-6xl md:text-7xl font-black text-neutral leading-[1.05] mb-6"
            >
              Your World of
              <br />
              <span className="text-primary">Stories</span> Awaits
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-lg text-neutral/65 mb-10 leading-relaxed max-w-lg"
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
                className="font-body font-semibold px-8 py-3.5 bg-primary text-[#FDF6EC] rounded-xl hover:bg-neutral transition-all shadow-lg shadow-primary/30 flex items-center gap-2"
              >
                Browse Books <FaArrowRight size={14} />
              </Link>
              <Link
                to="/mylibrary"
                className="font-body font-semibold px-8 py-3.5 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-[#FDF6EC] transition-all"
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
                  className="font-body text-sm text-neutral/60 flex items-center gap-1.5"
                >
                  <FaCheckCircle className="text-secondary" size={13} /> {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: animated book */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex flex-col items-center gap-8 relative"
          >
            <AnimatedBook scrollY={scrollY} />

            {/* Orbiting particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 8 + i * 2,
                  ease: 'linear',
                }}
                className="absolute"
                style={{
                  width: `${200 + i * 60}px`,
                  height: `${200 + i * 60}px`,
                  border: '1px dashed rgba(139,69,19,0.12)',
                  borderRadius: '50%',
                }}
              >
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-primary/40"
                  style={{ top: '-4px', left: '50%', translateX: '-50%' }}
                />
              </motion.div>
            ))}

            {/* Stats pills floating around */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: 0.5 }}
              className="absolute -left-24 top-4 bg-white rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-accent/20"
            >
              <FaStar className="text-secondary" size={14} />
              <span className="font-body text-sm font-semibold text-neutral">
                50k+ Reviews
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, delay: 1 }}
              className="absolute -right-20 bottom-8 bg-white rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-accent/20"
            >
              <FaUsers className="text-primary" size={14} />
              <span className="font-body text-sm font-semibold text-neutral">
                5k+ Readers
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="font-body text-xs text-neutral tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-neutral/40" />
        </motion.div>
      </section>

      {/* ══════════ SCROLL TRANSITION — book lands here ══════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative overflow-hidden"
      >
        {/* Morphing wave divider */}
        <div className="relative h-24 bg-[#FDF6EC] -mb-1">
          <svg
            viewBox="0 0 1440 96"
            className="absolute bottom-0 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64 C360,96 1080,0 1440,64 L1440,96 L0,96 Z"
              fill="#2C1810"
            />
          </svg>
        </div>

        {/* ══════════ STATS BAR ══════════ */}
        <section className="py-14 bg-neutral">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-accent text-3xl flex justify-center mb-3 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <p className="font-heading text-4xl font-black text-[#FDF6EC]">
                  {s.value}
                </p>
                <p className="font-body text-accent/70 text-sm mt-1 tracking-wide uppercase">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Wave bottom */}
        <div className="relative h-16 bg-neutral -mt-1">
          <svg
            viewBox="0 0 1440 64"
            className="absolute bottom-0 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,32 C480,64 960,0 1440,32 L1440,64 L0,64 Z"
              fill="#FDF6EC"
            />
          </svg>
        </div>
      </motion.div>

      {/* ══════════ FEATURED BOOKS ══════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs text-secondary tracking-widest uppercase font-semibold">
            Handpicked
          </span>
          <h2 className="font-heading text-5xl font-bold text-neutral mt-2">
            Featured Books
          </h2>
          <p className="font-body text-neutral/60 mt-3 max-w-md mx-auto">
            Our community's most loved reads this month
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((book, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-accent/20 cursor-pointer"
            >
              <div
                className="h-52 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${book.color}22, ${book.color}55)`,
                }}
              >
                {/* Mini CSS book in card */}
                <div
                  className="relative w-16 h-24"
                  style={{ perspective: '400px' }}
                >
                  <motion.div
                    animate={{ rotateY: [-5, 5, -5] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: i * 0.3,
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="w-full h-full"
                  >
                    <div
                      className="absolute inset-0 rounded-r-md flex items-center justify-center shadow-xl"
                      style={{ background: book.color }}
                    >
                      <FaBookOpen className="text-[#FDF6EC]/80" size={20} />
                    </div>
                    <div
                      className="absolute left-0 top-0 h-full"
                      style={{
                        width: '8px',
                        background: 'rgba(0,0,0,0.4)',
                        transform: 'translateX(-8px) rotateY(90deg)',
                        transformOrigin: 'right center',
                      }}
                    />
                  </motion.div>
                </div>
                <span className="absolute top-3 right-3 font-body text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FDF6EC]/90 text-neutral">
                  {book.genre}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-neutral leading-snug">
                  {book.title}
                </h3>
                <p className="font-body text-sm text-neutral/60 mt-1">
                  {book.author}
                </p>
                <div className="flex items-center gap-1 mt-3">
                  <FaStar className="text-secondary" size={13} />
                  <span className="font-body text-sm font-semibold text-neutral">
                    {book.rating}
                  </span>
                </div>
                <button className="mt-4 w-full font-body text-sm font-semibold py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-[#FDF6EC] transition-all">
                  Add to Shelf
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/browsebookspage"
            className="font-body font-semibold inline-flex items-center gap-2 text-primary hover:text-neutral transition-colors"
          >
            View all books <FaArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="py-24 bg-neutral/5 border-y border-accent/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="font-body text-xs text-secondary tracking-widest uppercase font-semibold">
              Simple steps
            </span>
            <h2 className="font-heading text-5xl font-bold text-neutral mt-2">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-px border-t-2 border-dashed border-accent/40 z-0" />
                )}
                <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 relative z-10">
                  {step.icon}
                </div>
                <span className="font-body text-xs text-secondary font-bold tracking-widest uppercase mb-1">
                  Step {i + 1}
                </span>
                <h3 className="font-heading text-xl font-bold text-neutral mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-neutral/60 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ GENRES ══════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs text-secondary tracking-widest uppercase font-semibold">
            Explore
          </span>
          <h2 className="font-heading text-5xl font-bold text-neutral mt-2">
            Browse by Genre
          </h2>
          <p className="font-body text-neutral/60 mt-3">
            Find your perfect read from our curated collections
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {genres.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.04 }}
              className="flex flex-col items-center justify-center gap-2 py-6 px-3 rounded-2xl border border-accent/30 bg-white hover:border-primary hover:shadow-lg cursor-pointer transition-all group"
            >
              <span className="text-3xl">{g.emoji}</span>
              <p className="font-body font-semibold text-neutral text-sm">
                {g.name}
              </p>
              <p className="font-body text-neutral/40 text-xs">{g.count}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-body text-xs text-accent tracking-widest uppercase font-semibold">
              Community
            </span>
            <h2 className="font-heading text-5xl font-bold text-[#FDF6EC] mt-2">
              What Readers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-accent/20 rounded-2xl p-7 hover:bg-white/10 transition-all"
              >
                <FaQuoteLeft className="text-accent/40 mb-4" size={24} />
                <p className="font-body text-[#FDF6EC]/80 leading-relaxed mb-6 text-sm">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center font-heading font-bold text-accent">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[#FDF6EC] text-sm">
                      {t.name}
                    </p>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array(t.rating)
                        .fill(0)
                        .map((_, j) => (
                          <FaStar key={j} className="text-accent" size={11} />
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-xl mx-auto text-center px-6"
        >
          <span className="font-body text-xs text-accent tracking-widest uppercase font-semibold">
            Stay in the loop
          </span>
          <h2 className="font-heading text-5xl font-bold text-[#FDF6EC] mt-3 mb-4">
            Never Miss a Good Book
          </h2>
          <p className="font-body text-[#FDF6EC]/70 mb-8 leading-relaxed">
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
              className="font-body flex-1 px-5 py-3.5 rounded-xl bg-[#FDF6EC]/15 border border-[#FDF6EC]/30 text-[#FDF6EC] placeholder-[#FDF6EC]/50 focus:outline-none focus:border-accent focus:bg-[#FDF6EC]/20 transition-all"
            />
            <button
              type="submit"
              className="font-body font-semibold px-7 py-3.5 bg-[#FDF6EC] text-primary rounded-xl hover:bg-accent transition-all whitespace-nowrap shadow-lg"
            >
              Subscribe
            </button>
          </form>
          <p className="font-body text-xs text-[#FDF6EC]/40 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl md:text-6xl font-black text-neutral mb-6 leading-tight">
            Ready to Start
            <br />
            <span className="text-primary">Reading?</span>
          </h2>
          <p className="font-body text-neutral/60 text-lg mb-10 max-w-md mx-auto">
            Join over 5,000 readers already building their dream library on
            BookWorm.
          </p>
          <Link
            to="/browsebookspage"
            className="font-body font-semibold inline-flex items-center gap-2 px-10 py-4 bg-primary text-[#FDF6EC] rounded-xl hover:bg-neutral transition-all shadow-xl shadow-primary/25 text-lg"
          >
            Get Started Free <FaArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HOme;
