import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaStar,
  FaHeart,
  FaUsers,
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaSearch,
  FaShoppingCart,
  FaQuoteLeft,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import {
  MdLocalShipping,
  MdSupportAgent,
  MdVerified,
  MdCollectionsBookmark,
} from 'react-icons/md';
import BookImg from '../../assets/book-image.png';
import LogoImg from '../../assets/Logo.png';

/* ─── PALETTE ────────────────────────────────────────────── */
const C = {
  primary: '#6B2737',
  gold: '#C9A227',
  bg: '#F8F5EF',
  card: '#FFFFFF',
  text: '#242424',
  muted: '#777777',
  border: '#E8E0D4',
};

/* ─── ANIMATED 3D BOOK ───────────────────────────────────── */
function AnimatedBook() {
  return (
    <div className="relative" style={{ perspective: 900 }}>
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 3.5 }}
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse,${C.primary}18 0%,transparent 70%)`,
        }}
      />
      <motion.div
        animate={{ rotateY: [-8, 8, -8], y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-52 h-72"
      >
        {/* Cover — uses book-image.png */}
        <div
          className="absolute inset-0 rounded-r-xl rounded-l-sm overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            border: `1px solid ${C.gold}44`,
          }}
        >
          <img
            src={BookImg}
            alt="Featured Book"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top,rgba(107,39,55,0.7) 0%,transparent 60%)',
            }}
          />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p
              className="text-xs font-black tracking-wider"
              style={{ color: C.bg, fontFamily: 'Playfair Display,serif' }}
            >
              BookWorm
            </p>
          </div>
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 3 }}
            className="absolute inset-0 w-1/4 skew-x-12 pointer-events-none"
            style={{
              background: `linear-gradient(90deg,transparent,${C.gold}18,transparent)`,
            }}
          />
        </div>
        {/* Spine */}
        <div
          className="absolute left-0 top-0 h-full rounded-l-sm"
          style={{
            width: 14,
            background: `linear-gradient(to right,#1a060a,${C.primary})`,
            transform: 'translateX(-14px) rotateY(90deg)',
            transformOrigin: 'right center',
          }}
        />
        {/* Pages edge */}
        <div
          className="absolute right-0 top-2 bottom-2"
          style={{
            width: 7,
            background: `repeating-linear-gradient(to bottom,${C.bg} 0px,${C.border} 1px,${C.bg} 2px)`,
            borderRadius: '0 3px 3px 0',
            transform: 'translateX(7px)',
          }}
        />
      </motion.div>

      {/* Orbit rings */}
      {[185, 250, 315].map((size, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            repeat: Infinity,
            duration: 12 + i * 3,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size,
            height: size,
            border: `1px dashed ${C.primary}25`,
          }}
        >
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: C.gold,
              opacity: 0.5,
              top: -4,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── BENEFIT ITEM ───────────────────────────────────────── */
const benefits = [
  {
    icon: <MdCollectionsBookmark size={24} />,
    title: 'Wide Collection',
    desc: 'Thousands of curated titles',
  },
  {
    icon: <MdVerified size={24} />,
    title: 'Expert Curation',
    desc: 'Hand-picked by readers',
  },
  {
    icon: <MdLocalShipping size={24} />,
    title: 'Fast Delivery',
    desc: 'Ships within 24 hours',
  },
  {
    icon: <MdSupportAgent size={24} />,
    title: 'Reader Support',
    desc: 'Help whenever you need',
  },
];

const categories = [
  { name: 'Fiction & Literature', emoji: '📖', count: '2,400+ books' },
  { name: 'Business & Finance', emoji: '💼', count: '980+ books' },
  { name: 'Personal Development', emoji: '🌱', count: '1,200+ books' },
  { name: 'Science & Technology', emoji: '🔬', count: '1,500+ books' },
  { name: 'History & Biography', emoji: '🏛️', count: '760+ books' },
  { name: "Children's Books", emoji: '🎨', count: '890+ books' },
];

const whyUs = [
  {
    icon: <MdCollectionsBookmark size={20} />,
    title: 'Curated Selection',
    desc: 'Every title is hand-selected by our team of passionate readers.',
  },
  {
    icon: <FaSearch size={18} />,
    title: 'Easy Discovery',
    desc: 'Find exactly what you want with smart search and recommendations.',
  },
  {
    icon: <FaBookOpen size={18} />,
    title: 'Smooth Experience',
    desc: 'From discovery to delivery, every step is effortless.',
  },
  {
    icon: <FaStar size={18} />,
    title: 'Books for Every Stage',
    desc: 'Whether you are five or ninety-five, we have the perfect book.',
  },
];

/* ─── BOOK CARD (API-ready — receives real book object) ──── */
function BookCard({ book = {}, i = 0 }) {
  const [wished, setWished] = useState(false);
  const {
    title = 'Untitled',
    author = 'Unknown',
    rating = 0,
    reviewCount = 0,
    price = '—',
    originalPrice,
    cover,
    genre = '',
  } = book;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group rounded-2xl border overflow-hidden hover:shadow-xl transition-all cursor-pointer"
      style={{ background: C.card, borderColor: C.border }}
    >
      {/* Cover */}
      <div
        className="h-52 relative overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg,${C.primary}12,${C.gold}12)`,
        }}
      >
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-20 h-28 rounded-md shadow-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(145deg,${C.primary},#3d151f)`,
            }}
          >
            <FaBookOpen size={22} style={{ color: C.gold, opacity: 0.8 }} />
          </div>
        )}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm"
          style={{
            background: wished ? C.primary : 'rgba(255,255,255,0.92)',
            border: `1px solid ${C.border}`,
          }}
        >
          <FaHeart size={12} style={{ color: wished ? '#fff' : C.primary }} />
        </button>
        {originalPrice && (
          <span
            className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: C.primary }}
          >
            Sale
          </span>
        )}
        {genre && (
          <span
            className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: `${C.gold}22`,
              color: C.primary,
              border: `1px solid ${C.gold}44`,
            }}
          >
            {genre}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3
          className="font-bold text-sm leading-snug line-clamp-2 mb-1"
          style={{ color: C.text, fontFamily: 'Playfair Display,serif' }}
        >
          {title}
        </h3>
        <p className="text-xs" style={{ color: C.muted }}>
          {author}
        </p>

        {rating > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <FaStar
                  key={j}
                  size={10}
                  style={{ color: j < Math.floor(rating) ? C.gold : C.border }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: C.muted }}>
              {rating} {reviewCount > 0 && `(${reviewCount.toLocaleString()})`}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className="font-black text-base" style={{ color: C.primary }}>
            {price}
          </span>
          {originalPrice && (
            <span className="text-xs line-through" style={{ color: '#aaa' }}>
              {originalPrice}
            </span>
          )}
        </div>

        <button
          className="mt-3 w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          style={{ background: C.primary, color: C.bg }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#4d1c28')}
          onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
        >
          <FaShoppingCart size={11} /> Add to Shelf
        </button>
      </div>
    </motion.div>
  );
}

/* ─── EMPTY STATE ────────────────────────────────────────── */
function EmptyBooks({ label = 'Books' }) {
  return (
    <div
      className="col-span-full py-16 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed"
      style={{ borderColor: C.border }}
    >
      <FaBookOpen size={36} style={{ color: C.border }} />
      <p className="text-sm font-semibold" style={{ color: C.muted }}>
        No {label} yet
      </p>
      <Link
        to="/browsebookspage"
        className="px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer"
        style={{ background: C.primary, color: C.bg }}
      >
        Browse All Books
      </Link>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
const HOme = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // These would come from your API/context in production
  const bestsellers = []; // e.g. useFetch('/api/books?sort=rating')
  const newArrivals = []; // e.g. useFetch('/api/books?sort=new')
  const testimonials = []; // e.g. useFetch('/api/reviews?featured=true')

  const sF = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: 'Inter,sans-serif',
      }}
    >
      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden"
      >
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: C.bg }} />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle,${C.primary} 1px,transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />
          <div
            className="absolute -top-32 -right-32 rounded-full blur-3xl"
            style={{ width: 560, height: 560, background: `${C.primary}07` }}
          />
          <div
            className="absolute bottom-0 -left-16 rounded-full blur-3xl"
            style={{ width: 360, height: 360, background: `${C.gold}07` }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase mb-6 px-4 py-2 rounded-full"
              style={{
                color: C.primary,
                background: `${C.primary}09`,
                border: `1px solid ${C.primary}20`,
              }}
            >
              <HiSparkles size={11} style={{ color: C.gold }} />
              Your Next Chapter Starts Here
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-6xl lg:text-7xl font-black leading-[1.04] mb-6"
              style={{ fontFamily: 'Playfair Display,serif', color: C.text }}
            >
              Discover Stories
              <br />
              <span
                style={{
                  color: C.primary,
                  textDecorationLine: 'underline',
                  textDecorationColor: C.gold,
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '6px',
                }}
              >
                That Stay
              </span>
              <br />
              With You.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: C.muted }}
            >
              Explore inspiring reads, timeless classics, and the latest
              bestsellers — all in one beautifully curated place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="flex gap-4 flex-wrap mb-10"
            >
              <Link
                to="/browsebookspage"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                style={{
                  background: C.primary,
                  color: C.bg,
                  boxShadow: `0 8px 24px ${C.primary}30`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#4d1c28')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = C.primary)
                }
              >
                <FaBookOpen size={14} /> Explore Books
              </Link>
              <Link
                to="/browsebookspage"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                style={{
                  border: `2px solid ${C.primary}`,
                  color: C.primary,
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.primary;
                  e.currentTarget.style.color = C.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = C.primary;
                }}
              >
                Discover Bestsellers <FaArrowRight size={12} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex gap-6 flex-wrap"
            >
              {['10,000+ Books', 'Expert Curation', 'Free Returns'].map(
                (t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: C.muted }}
                  >
                    <FaCheckCircle size={12} style={{ color: C.gold }} /> {t}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right — real asset image + 3D book */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center relative gap-8"
          >
            {/* Logo + book stack image */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={LogoImg}
                alt="BookWorm Logo"
                className="w-20 h-20 object-contain opacity-90"
              />
              <img
                src={BookImg}
                alt="Books"
                className="w-48 rounded-2xl object-cover shadow-2xl"
                style={{ border: `1px solid ${C.border}` }}
              />
            </div>

            <AnimatedBook />

            {/* Floating info cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute -left-4 top-6 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${C.gold}18` }}
              >
                <FaStar size={15} style={{ color: C.gold }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: C.muted }}>
                  Top Rated
                </p>
                <p className="text-sm font-bold" style={{ color: C.text }}>
                  Best Picks
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
              className="absolute -right-4 bottom-10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${C.primary}12` }}
              >
                <FaUsers size={14} style={{ color: C.primary }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: C.muted }}>
                  Community
                </p>
                <p className="text-sm font-bold" style={{ color: C.text }}>
                  5K+ Readers
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-25"
        >
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: C.primary }}
          >
            Scroll
          </span>
          <div
            className="w-px h-8"
            style={{
              background: `linear-gradient(to bottom,${C.primary},transparent)`,
            }}
          />
        </motion.div>
      </section>

      {/* ══ BENEFITS ═════════════════════════════════════════ */}
      <section
        className="py-10 border-y"
        style={{ borderColor: C.border, background: C.card }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              {...sF(i * 0.08)}
              className="flex items-center gap-4 group cursor-default"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                style={{
                  background: `${C.primary}09`,
                  color: C.primary,
                  border: `1px solid ${C.primary}18`,
                }}
              >
                {b.icon}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: C.text }}>
                  {b.title}
                </p>
                <p className="text-xs" style={{ color: C.muted }}>
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CATEGORIES ═══════════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div {...sF()} className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: C.gold }}
          >
            Collections
          </p>
          <h2
            className="text-5xl font-black mb-3"
            style={{ fontFamily: 'Playfair Display,serif', color: C.text }}
          >
            Explore Our Book Collection
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: C.muted }}>
            Find your next favorite read by exploring our curated collections.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={i}
              {...sF(i * 0.06)}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group flex flex-col items-center justify-center gap-3 py-8 px-4 rounded-2xl cursor-pointer transition-all border"
              style={{ background: C.card, borderColor: C.border }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.primary;
                e.currentTarget.style.boxShadow = `0 8px 24px ${C.primary}14`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {c.emoji}
              </span>
              <p
                className="font-bold text-xs text-center"
                style={{ color: C.text }}
              >
                {c.name}
              </p>
              <p className="text-xs" style={{ color: C.muted }}>
                {c.count}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ BESTSELLERS ══════════════════════════════════════ */}
      <section
        className="py-24 border-y"
        style={{ borderColor: C.border, background: C.card }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...sF()}
            className="flex items-end justify-between mb-12 flex-wrap gap-4"
          >
            <div>
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                style={{ color: C.gold }}
              >
                Most Loved
              </p>
              <h2
                className="text-5xl font-black"
                style={{ fontFamily: 'Playfair Display,serif', color: C.text }}
              >
                Readers' Favorites
              </h2>
            </div>
            <Link
              to="/browsebookspage"
              className="flex items-center gap-2 text-sm font-semibold hover:underline cursor-pointer"
              style={{ color: C.primary }}
            >
              View All Bestsellers <FaArrowRight size={12} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.length > 0 ? (
              bestsellers.map((book, i) => (
                <BookCard key={i} book={book} i={i} />
              ))
            ) : (
              <EmptyBooks label="Bestsellers" />
            )}
          </div>
        </div>
      </section>

      {/* ══ NEW ARRIVALS ════════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          {...sF()}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: C.gold }}
            >
              Just In
            </p>
            <h2
              className="text-5xl font-black"
              style={{ fontFamily: 'Playfair Display,serif', color: C.text }}
            >
              Fresh Off the Bookshelf
            </h2>
          </div>
          <Link
            to="/browsebookspage"
            className="flex items-center gap-2 text-sm font-semibold hover:underline cursor-pointer"
            style={{ color: C.primary }}
          >
            See All New Arrivals <FaArrowRight size={12} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.length > 0 ? (
            newArrivals.map((book, i) => (
              <BookCard key={i} book={{ ...book, genre: 'New' }} i={i} />
            ))
          ) : (
            <EmptyBooks label="New Arrivals" />
          )}
        </div>
      </section>

      {/* ══ PROMO BANNER ════════════════════════════════════ */}
      <section
        className="py-0 relative overflow-hidden"
        style={{ background: C.primary, minHeight: 360 }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={BookImg}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right,${C.primary} 40%,${C.primary}aa)`,
            }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `radial-gradient(circle,${C.gold} 1px,transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-24">
          <motion.div {...sF()}>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: C.gold }}
            >
              Special Collection
            </p>
            <h2
              className="text-5xl font-black mb-4 leading-tight"
              style={{ fontFamily: 'Playfair Display,serif', color: C.bg }}
            >
              Make Room for Your Next Favorite Book.
            </h2>
            <p className="text-lg mb-8" style={{ color: `${C.bg}bb` }}>
              Explore remarkable stories, discover new perspectives, and find
              books worth keeping.
            </p>
            <Link
              to="/browsebookspage"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer shadow-xl"
              style={{ background: C.gold, color: C.text }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#b8911f')
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = C.gold)}
            >
              Browse the Collection <FaArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ WHY US ══════════════════════════════════════════ */}
      <section
        className="py-24 border-y"
        style={{ borderColor: C.border, background: C.card }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...sF()} className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: C.gold }}
            >
              Why Choose Us
            </p>
            <h2
              className="text-5xl font-black"
              style={{ fontFamily: 'Playfair Display,serif', color: C.text }}
            >
              Why Readers Choose Us
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <motion.div
                key={i}
                {...sF(i * 0.1)}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl border transition-all cursor-default"
                style={{ background: C.bg, borderColor: C.border }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = C.gold)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = C.border)
                }
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{
                    background: `${C.primary}09`,
                    color: C.primary,
                    border: `1px solid ${C.primary}18`,
                  }}
                >
                  {w.icon}
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{
                    color: C.text,
                    fontFamily: 'Playfair Display,serif',
                  }}
                >
                  {w.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: C.muted }}
                >
                  {w.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div {...sF()} className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: C.gold }}
          >
            Reviews
          </p>
          <h2
            className="text-5xl font-black"
            style={{ fontFamily: 'Playfair Display,serif', color: C.text }}
          >
            Words from Our Readers
          </h2>
        </motion.div>
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                {...sF(i * 0.1)}
                whileHover={{ y: -5 }}
                className="p-7 rounded-2xl border transition-all cursor-default"
                style={{ background: C.card, borderColor: C.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.gold;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${C.gold}14`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array(t.rating || 5)
                    .fill(0)
                    .map((_, j) => (
                      <FaStar key={j} size={13} style={{ color: C.gold }} />
                    ))}
                </div>
                <FaQuoteLeft
                  size={20}
                  style={{ color: `${C.primary}30`, marginBottom: 10 }}
                />
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#555' }}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                    style={{
                      background: `linear-gradient(135deg,${C.primary},${C.gold})`,
                      color: C.bg,
                    }}
                  >
                    {(t.name || '?')[0]}
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{
                        color: C.text,
                        fontFamily: 'Playfair Display,serif',
                      }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: C.muted }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            className="py-16 flex flex-col items-center gap-3 rounded-2xl border border-dashed text-center"
            style={{ borderColor: C.border }}
          >
            <FaQuoteLeft size={32} style={{ color: C.border }} />
            <p className="text-sm" style={{ color: C.muted }}>
              No reviews yet — be the first to share your thoughts!
            </p>
          </div>
        )}
      </section>

      {/* ══ NEWSLETTER ══════════════════════════════════════ */}
      <section
        className="py-24 border-y"
        style={{ borderColor: C.border, background: C.bg }}
      >
        <motion.div {...sF()} className="max-w-xl mx-auto text-center px-6">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: C.gold }}
          >
            Newsletter
          </p>
          <h2
            className="text-5xl font-black mb-4"
            style={{ fontFamily: 'Playfair Display,serif', color: C.text }}
          >
            A Little More Reading in Your Inbox.
          </h2>
          <p className="text-base mb-8" style={{ color: C.muted }}>
            Get updates on new arrivals, reading recommendations, and bookstore
            news.
          </p>
          {subscribed ? (
            <div
              className="py-6 rounded-2xl flex flex-col items-center gap-3"
              style={{
                background: `${C.primary}09`,
                border: `1px solid ${C.primary}20`,
              }}
            >
              <FaCheckCircle size={28} style={{ color: C.gold }} />
              <p className="font-bold" style={{ color: C.primary }}>
                You're subscribed! Welcome aboard.
              </p>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-4 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    color: C.text,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = C.primary)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
                <button
                  type="submit"
                  className="px-7 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: C.primary, color: C.bg }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#4d1c28')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = C.primary)
                  }
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs mt-4" style={{ color: '#aaa' }}>
                No spam, ever. Unsubscribe at any time.
              </p>
            </>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default HOme;
