import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  FaShoppingCart,
  FaRegHeart,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import {
  MdAutoAwesome,
  MdLocalShipping,
  MdSupportAgent,
  MdVerified,
  MdCollectionsBookmark,
} from 'react-icons/md';

/* ── COLORS ──────────────────────────────────────────────── */
// Primary:    #6B2737  (Deep Burgundy)
// Secondary:  #C9A227  (Warm Gold)
// Background: #F8F5EF  (Warm Ivory)
// Card:       #FFFFFF
// Text:       #242424
// Muted:      #777777
// Border:     #E8E0D4

/* ── ANIMATED BOOK ───────────────────────────────────────── */
function AnimatedBook() {
  return (
    <div className="relative" style={{ perspective: '900px' }}>
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse,rgba(107,39,55,0.18) 0%,transparent 70%)',
        }}
      />
      <motion.div
        animate={{ rotateY: [-8, 8, -8], y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-52 h-72"
      >
        {/* Cover */}
        <div
          className="absolute inset-0 rounded-r-xl rounded-l-sm flex flex-col items-center justify-center overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(145deg,#6B2737,#3d151f)',
            backfaceVisibility: 'hidden',
            border: '1px solid rgba(201,162,39,0.3)',
          }}
        >
          <div
            className="absolute inset-3 rounded pointer-events-none"
            style={{ border: '1px solid rgba(201,162,39,0.2)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2.8 }}
            style={{ color: '#C9A227', marginBottom: 12 }}
          >
            <FaBookOpen size={44} />
          </motion.div>
          <p
            className="font-black text-sm tracking-wider"
            style={{ color: '#F8F5EF', fontFamily: 'Playfair Display, serif' }}
          >
            The Reading Room
          </p>
          <div className="flex gap-1 mt-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <FaStar key={i} size={9} style={{ color: '#C9A227' }} />
            ))}
          </div>
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 3 }}
            className="absolute inset-0 w-1/4 skew-x-12 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg,transparent,rgba(201,162,39,0.12),transparent)',
            }}
          />
        </div>
        {/* Spine */}
        <div
          className="absolute left-0 top-0 h-full rounded-l-sm"
          style={{
            width: 14,
            background: 'linear-gradient(to right,#1a060a,#6B2737)',
            transform: 'translateX(-14px) rotateY(90deg)',
            transformOrigin: 'right center',
          }}
        />
        {/* Pages */}
        <div
          className="absolute right-0 top-2 bottom-2"
          style={{
            width: 7,
            background:
              'repeating-linear-gradient(to bottom,#F8F5EF 0px,#E8E0D4 1px,#F8F5EF 2px)',
            borderRadius: '0 3px 3px 0',
            transform: 'translateX(7px)',
          }}
        />
      </motion.div>

      {/* Orbit rings */}
      {[180, 245, 310].map((size, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            repeat: Infinity,
            duration: 12 + i * 3,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: size,
            height: size,
            border: '1px dashed rgba(107,39,55,0.2)',
            borderRadius: '50%',
          }}
        >
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: '#C9A227',
              opacity: 0.6,
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

/* ── DATA ─────────────────────────────────────────────────── */
const benefits = [
  {
    icon: <MdCollectionsBookmark size={26} />,
    title: 'Wide Collection',
    desc: '10,000+ curated titles',
  },
  {
    icon: <MdVerified size={26} />,
    title: 'Carefully Selected',
    desc: 'Expert-reviewed books',
  },
  {
    icon: <MdLocalShipping size={26} />,
    title: 'Fast Delivery',
    desc: 'Ships within 24 hours',
  },
  {
    icon: <MdSupportAgent size={26} />,
    title: 'Reader Support',
    desc: 'Help whenever you need',
  },
];

const categories = [
  { name: 'Fiction & Literature', emoji: '📖', count: '2,400 books' },
  { name: 'Business & Finance', emoji: '💼', count: '980 books' },
  { name: 'Personal Development', emoji: '🌱', count: '1,200 books' },
  { name: 'Science & Technology', emoji: '🔬', count: '1,500 books' },
  { name: 'History & Biography', emoji: '🏛️', count: '760 books' },
  { name: "Children's Books", emoji: '🎨', count: '890 books' },
];

const bestsellers = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    rating: 4.8,
    reviews: 12400,
    price: '$14.99',
    original: '$18.99',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 4.9,
    reviews: 34200,
    price: '$13.99',
    original: null,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    rating: 4.7,
    reviews: 28900,
    price: '$15.99',
    original: '$19.99',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 4.6,
    reviews: 19800,
    price: '$11.99',
    original: null,
  },
];

const newArrivals = [
  { title: 'Project Hail Mary', author: 'Andy Weir', label: 'New' },
  { title: 'Fourth Wing', author: 'Rebecca Yarros', label: 'New' },
  { title: 'Hello Beautiful', author: 'Ann Napolitano', label: 'New' },
  { title: 'Happy Place', author: 'Emily Henry', label: 'New' },
];

const authors = [
  { name: 'Matt Haig', genre: 'Contemporary Fiction', initial: 'M' },
  { name: 'Brené Brown', genre: 'Self-Help & Research', initial: 'B' },
  { name: 'Colleen Hoover', genre: 'Romance & Drama', initial: 'C' },
  { name: 'James Clear', genre: 'Productivity & Habits', initial: 'J' },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Book Club Host',
    text: 'The Reading Room has transformed my reading life. Every recommendation feels personally curated just for me.',
    rating: 5,
  },
  {
    name: 'James Thornton',
    role: 'Literature Teacher',
    text: 'Outstanding selection and incredible service. My students love the curated reading lists.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Avid Reader',
    text: 'The personal shelf feature is beautifully designed. I track every book I have ever read here.',
    rating: 5,
  },
];

const whyUs = [
  {
    icon: <MdCollectionsBookmark size={22} />,
    title: 'Curated Selection',
    desc: 'Every title is hand-selected by our team of passionate readers and editors.',
  },
  {
    icon: <FaSearch size={20} />,
    title: 'Easy Book Discovery',
    desc: 'Find exactly what you want with our smart search and recommendation engine.',
  },
  {
    icon: <FaRegBookmark size={20} />,
    title: 'Smooth Experience',
    desc: 'From discovery to delivery, we have made every step effortless and enjoyable.',
  },
  {
    icon: <FaBookOpen size={20} />,
    title: 'Books for Every Stage',
    desc: 'Whether you are five or ninety-five, we have the perfect book waiting for you.',
  },
];

/* ── BOOK CARD ────────────────────────────────────────────── */
function BookCard({ book, i }) {
  const [wished, setWished] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all cursor-pointer"
      style={{ borderColor: '#E8E0D4' }}
    >
      {/* Cover placeholder */}
      <div
        className="h-52 flex items-center justify-center relative"
        style={{ background: 'linear-gradient(135deg,#6B273715,#C9A22715)' }}
      >
        <div
          className="w-20 h-28 rounded-md shadow-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(145deg,#6B2737,#3d151f)' }}
        >
          <FaBookOpen size={22} style={{ color: '#C9A227', opacity: 0.8 }} />
        </div>
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
          style={{
            background: wished ? '#6B2737' : 'rgba(255,255,255,0.9)',
            border: '1px solid #E8E0D4',
          }}
        >
          <FaHeart size={12} style={{ color: wished ? '#fff' : '#6B2737' }} />
        </button>
        {book.original && (
          <span
            className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full text-white"
            style={{ background: '#6B2737' }}
          >
            Sale
          </span>
        )}
      </div>
      <div className="p-4">
        <h3
          className="font-bold leading-snug text-sm line-clamp-2"
          style={{ color: '#242424', fontFamily: 'Playfair Display, serif' }}
        >
          {book.title}
        </h3>
        <p className="text-xs mt-1" style={{ color: '#777' }}>
          {book.author}
        </p>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, j) => (
              <FaStar
                key={j}
                size={10}
                style={{
                  color: j < Math.floor(book.rating) ? '#C9A227' : '#E8E0D4',
                }}
              />
            ))}
          </div>
          <span className="text-xs font-semibold" style={{ color: '#777' }}>
            ({(book.reviews / 1000).toFixed(1)}k)
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-black text-base" style={{ color: '#6B2737' }}>
            {book.price}
          </span>
          {book.original && (
            <span className="text-xs line-through" style={{ color: '#aaa' }}>
              {book.original}
            </span>
          )}
        </div>
        <button
          className="mt-3 w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          style={{ background: '#6B2737', color: '#F8F5EF' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#4d1c28')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#6B2737')}
        >
          <FaShoppingCart size={11} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

/* ── MAIN ─────────────────────────────────────────────────── */
const HOme = () => {
  const [email, setEmail] = useState('');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const sectionFade = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: '#F8F5EF',
        color: '#242424',
        fontFamily: 'Inter,sans-serif',
      }}
    >
      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ background: '#F8F5EF' }} />
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-40"
            style={{
              background: 'linear-gradient(135deg,#6B273708,#C9A22710)',
            }}
          />
          <div
            className="absolute -top-40 -right-40 rounded-full blur-3xl"
            style={{
              width: 600,
              height: 600,
              background: 'rgba(107,39,55,0.06)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 rounded-full blur-3xl"
            style={{
              width: 400,
              height: 400,
              background: 'rgba(201,162,39,0.06)',
            }}
          />
          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle,#6B2737 1px,transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-28 pb-16 grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-6 px-4 py-2 rounded-full"
              style={{
                color: '#6B2737',
                background: 'rgba(107,39,55,0.08)',
                border: '1px solid rgba(107,39,55,0.18)',
              }}
            >
              <HiSparkles size={12} style={{ color: '#C9A227' }} />
              Your Next Chapter Starts Here
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-6xl lg:text-7xl font-black leading-[1.04] mb-6"
              style={{ fontFamily: 'Playfair Display,serif', color: '#242424' }}
            >
              Discover Stories
              <br />
              <span style={{ color: '#6B2737' }}>That Stay</span>
              <br />
              With You.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: '#777' }}
            >
              Explore inspiring reads, timeless classics, and the latest
              bestsellers — all in one beautifully curated place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="flex gap-4 flex-wrap mb-10"
            >
              <Link
                to="/browsebookspage"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg"
                style={{
                  background: '#6B2737',
                  color: '#F8F5EF',
                  boxShadow: '0 8px 24px rgba(107,39,55,0.28)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#4d1c28')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = '#6B2737')
                }
              >
                <FaBookOpen size={14} /> Explore Books
              </Link>
              <Link
                to="/browsebookspage"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                style={{
                  border: '2px solid #6B2737',
                  color: '#6B2737',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#6B2737';
                  e.currentTarget.style.color = '#F8F5EF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6B2737';
                }}
              >
                Discover Bestsellers <FaArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex gap-6 flex-wrap"
            >
              {['10,000+ Books', 'Free Returns', 'Expert Curation'].map(
                (t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: '#777' }}
                  >
                    <FaCheckCircle size={13} style={{ color: '#C9A227' }} /> {t}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center relative"
          >
            <AnimatedBook />
            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute -left-8 top-6 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg"
              style={{ background: '#fff', border: '1px solid #E8E0D4' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(201,162,39,0.12)' }}
              >
                <FaStar size={16} style={{ color: '#C9A227' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: '#777' }}>
                  Top Rated
                </p>
                <p className="text-sm font-bold" style={{ color: '#242424' }}>
                  Atomic Habits
                </p>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
              className="absolute -right-6 bottom-10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg"
              style={{ background: '#fff', border: '1px solid #E8E0D4' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(107,39,55,0.1)' }}
              >
                <FaUsers size={15} style={{ color: '#6B2737' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: '#777' }}>
                  Reading Now
                </p>
                <p className="text-sm font-bold" style={{ color: '#242424' }}>
                  1,234 Readers
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-30"
        >
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: '#6B2737' }}
          >
            Scroll
          </span>
          <div
            className="w-px h-8"
            style={{
              background: 'linear-gradient(to bottom,#6B2737,transparent)',
            }}
          />
        </motion.div>
      </section>

      {/* ══ BENEFITS STRIP ═════════════════════════════════ */}
      <section
        className="py-10 border-y"
        style={{ borderColor: '#E8E0D4', background: '#fff' }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              {...sectionFade(i * 0.08)}
              className="flex items-center gap-4 group cursor-default"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                style={{
                  background: 'rgba(107,39,55,0.08)',
                  color: '#6B2737',
                  border: '1px solid rgba(107,39,55,0.14)',
                }}
              >
                {b.icon}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#242424' }}>
                  {b.title}
                </p>
                <p className="text-xs" style={{ color: '#777' }}>
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CATEGORIES ═════════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div {...sectionFade()} className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: '#C9A227' }}
          >
            Collections
          </p>
          <h2
            className="text-5xl font-black mb-3"
            style={{ fontFamily: 'Playfair Display,serif', color: '#242424' }}
          >
            Explore Our Book Collection
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: '#777' }}>
            Find your next favorite read by exploring our curated collections.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={i}
              {...sectionFade(i * 0.07)}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group flex flex-col items-center justify-center gap-3 py-8 px-4 rounded-2xl cursor-pointer transition-all border"
              style={{ background: '#fff', borderColor: '#E8E0D4' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6B2737';
                e.currentTarget.style.boxShadow =
                  '0 8px 24px rgba(107,39,55,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E0D4';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {c.emoji}
              </span>
              <p
                className="font-bold text-xs text-center"
                style={{ color: '#242424' }}
              >
                {c.name}
              </p>
              <p className="text-xs" style={{ color: '#777' }}>
                {c.count}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ BESTSELLERS ════════════════════════════════════ */}
      <section
        className="py-24 border-y"
        style={{ borderColor: '#E8E0D4', background: '#fff' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...sectionFade()}
            className="flex items-end justify-between mb-12 flex-wrap gap-4"
          >
            <div>
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                style={{ color: '#C9A227' }}
              >
                Most Loved
              </p>
              <h2
                className="text-5xl font-black"
                style={{
                  fontFamily: 'Playfair Display,serif',
                  color: '#242424',
                }}
              >
                Readers' Favorites
              </h2>
            </div>
            <Link
              to="/browsebookspage"
              className="flex items-center gap-2 text-sm font-semibold hover:underline cursor-pointer"
              style={{ color: '#6B2737' }}
            >
              View All Bestsellers <FaArrowRight size={12} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((book, i) => (
              <BookCard key={i} book={book} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEW ARRIVALS ═══════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          {...sectionFade()}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: '#C9A227' }}
            >
              Just In
            </p>
            <h2
              className="text-5xl font-black"
              style={{ fontFamily: 'Playfair Display,serif', color: '#242424' }}
            >
              Fresh Off the Bookshelf
            </h2>
          </div>
          <Link
            to="/browsebookspage"
            className="flex items-center gap-2 text-sm font-semibold hover:underline cursor-pointer"
            style={{ color: '#6B2737' }}
          >
            See All New Arrivals <FaArrowRight size={12} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {newArrivals.map((b, i) => (
            <motion.div
              key={i}
              {...sectionFade(i * 0.08)}
              whileHover={{ y: -5 }}
              className="group rounded-2xl overflow-hidden border cursor-pointer transition-all hover:shadow-lg"
              style={{ background: '#fff', borderColor: '#E8E0D4' }}
            >
              <div
                className="h-48 flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg,#6B273710,#C9A22710)',
                }}
              >
                <div
                  className="w-16 h-24 rounded-md shadow-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(145deg,#6B2737,#3d151f)',
                  }}
                >
                  <FaBookOpen
                    size={18}
                    style={{ color: '#C9A227', opacity: 0.8 }}
                  />
                </div>
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: '#C9A227' }}
                >
                  New
                </span>
              </div>
              <div className="p-4">
                <h3
                  className="font-bold text-sm leading-snug"
                  style={{
                    color: '#242424',
                    fontFamily: 'Playfair Display,serif',
                  }}
                >
                  {b.title}
                </h3>
                <p className="text-xs mt-1" style={{ color: '#777' }}>
                  {b.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ PROMO BANNER ═══════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: '#6B2737' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle,#C9A227 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          className="absolute -top-20 -right-20 rounded-full blur-3xl"
          style={{
            width: 400,
            height: 400,
            background: 'rgba(201,162,39,0.15)',
          }}
        />
        <motion.div
          {...sectionFade()}
          className="relative z-10 max-w-3xl mx-auto text-center px-6"
        >
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
            style={{ color: '#C9A227' }}
          >
            Special Collection
          </p>
          <h2
            className="text-5xl font-black mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display,serif', color: '#F8F5EF' }}
          >
            Make Room for Your Next Favorite Book.
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: 'rgba(248,245,239,0.7)' }}
          >
            Explore remarkable stories, discover new perspectives, and find
            books worth keeping.
          </p>
          <Link
            to="/browsebookspage"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer shadow-xl"
            style={{ background: '#C9A227', color: '#242424' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#b8911f')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#C9A227')}
          >
            Browse the Collection <FaArrowRight size={13} />
          </Link>
        </motion.div>
      </section>

      {/* ══ FEATURED AUTHORS ═══════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div {...sectionFade()} className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: '#C9A227' }}
          >
            Authors
          </p>
          <h2
            className="text-5xl font-black mb-3"
            style={{ fontFamily: 'Playfair Display,serif', color: '#242424' }}
          >
            Meet the Minds Behind the Pages
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {authors.map((a, i) => (
            <motion.div
              key={i}
              {...sectionFade(i * 0.1)}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border cursor-pointer transition-all"
              style={{ background: '#fff', borderColor: '#E8E0D4' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A227';
                e.currentTarget.style.boxShadow =
                  '0 8px 24px rgba(201,162,39,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E0D4';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center font-black text-2xl transition-all group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg,#6B2737,#C9A227)',
                  color: '#F8F5EF',
                  fontFamily: 'Playfair Display,serif',
                }}
              >
                {a.initial}
              </div>
              <p
                className="font-bold text-sm mb-1"
                style={{
                  color: '#242424',
                  fontFamily: 'Playfair Display,serif',
                }}
              >
                {a.name}
              </p>
              <p className="text-xs mb-3" style={{ color: '#777' }}>
                {a.genre}
              </p>
              <span
                className="text-xs font-semibold hover:underline cursor-pointer"
                style={{ color: '#6B2737' }}
              >
                Explore Books →
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ WHY US ═════════════════════════════════════════ */}
      <section
        className="py-24 border-y"
        style={{ borderColor: '#E8E0D4', background: '#fff' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...sectionFade()} className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: '#C9A227' }}
            >
              Why Choose Us
            </p>
            <h2
              className="text-5xl font-black"
              style={{ fontFamily: 'Playfair Display,serif', color: '#242424' }}
            >
              Why Readers Choose Us
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <motion.div
                key={i}
                {...sectionFade(i * 0.1)}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl border transition-all cursor-default"
                style={{ background: '#F8F5EF', borderColor: '#E8E0D4' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A227';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E8E0D4';
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{
                    background: 'rgba(107,39,55,0.08)',
                    color: '#6B2737',
                    border: '1px solid rgba(107,39,55,0.14)',
                  }}
                >
                  {w.icon}
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{
                    color: '#242424',
                    fontFamily: 'Playfair Display,serif',
                  }}
                >
                  {w.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#777' }}
                >
                  {w.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div {...sectionFade()} className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: '#C9A227' }}
          >
            Reviews
          </p>
          <h2
            className="text-5xl font-black"
            style={{ fontFamily: 'Playfair Display,serif', color: '#242424' }}
          >
            Words from Our Readers
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              {...sectionFade(i * 0.1)}
              whileHover={{ y: -5 }}
              className="p-7 rounded-2xl border transition-all cursor-default"
              style={{ background: '#fff', borderColor: '#E8E0D4' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A227';
                e.currentTarget.style.boxShadow =
                  '0 8px 24px rgba(201,162,39,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E0D4';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array(t.rating)
                  .fill(0)
                  .map((_, j) => (
                    <FaStar key={j} size={13} style={{ color: '#C9A227' }} />
                  ))}
              </div>
              <FaQuoteLeft
                size={20}
                style={{ color: 'rgba(107,39,55,0.2)', marginBottom: 12 }}
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
                    background: 'linear-gradient(135deg,#6B2737,#C9A227)',
                    color: '#F8F5EF',
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{
                      color: '#242424',
                      fontFamily: 'Playfair Display,serif',
                    }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: '#777' }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ NEWSLETTER ═════════════════════════════════════ */}
      <section
        className="py-24 border-y"
        style={{ borderColor: '#E8E0D4', background: '#F8F5EF' }}
      >
        <motion.div
          {...sectionFade()}
          className="max-w-xl mx-auto text-center px-6"
        >
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: '#C9A227' }}
          >
            Newsletter
          </p>
          <h2
            className="text-5xl font-black mb-4"
            style={{ fontFamily: 'Playfair Display,serif', color: '#242424' }}
          >
            A Little More Reading in Your Inbox.
          </h2>
          <p className="text-base mb-8" style={{ color: '#777' }}>
            Get updates on new arrivals, reading recommendations, and bookstore
            news.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 rounded-2xl text-sm outline-none transition-all"
              style={{
                background: '#fff',
                border: '1px solid #E8E0D4',
                color: '#242424',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#6B2737')}
              onBlur={(e) => (e.target.style.borderColor = '#E8E0D4')}
            />
            <button
              type="submit"
              className="px-7 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{ background: '#6B2737', color: '#F8F5EF' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#4d1c28')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = '#6B2737')
              }
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs mt-4" style={{ color: '#aaa' }}>
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════ */}
      <footer
        className="pt-16 pb-8"
        style={{ background: '#242424', color: '#F8F5EF' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b"
            style={{ borderColor: 'rgba(248,245,239,0.1)' }}
          >
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(201,162,39,0.15)',
                    border: '1px solid rgba(201,162,39,0.3)',
                  }}
                >
                  <FaBookOpen size={16} style={{ color: '#C9A227' }} />
                </div>
                <span
                  className="font-black text-lg"
                  style={{ fontFamily: 'Playfair Display,serif' }}
                >
                  The Reading Room
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: 'rgba(248,245,239,0.45)' }}
              >
                A carefully curated bookstore for readers who believe the right
                book can change everything.
              </p>
              <div className="flex gap-3">
                {[FaInstagram, FaTwitter, FaFacebook].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                    style={{
                      background: 'rgba(248,245,239,0.08)',
                      border: '1px solid rgba(248,245,239,0.12)',
                    }}
                  >
                    <Icon
                      size={14}
                      style={{ color: 'rgba(248,245,239,0.5)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Explore */}
            <div>
              <p
                className="font-bold text-sm mb-5 tracking-wide uppercase"
                style={{ color: '#C9A227' }}
              >
                Explore
              </p>
              {['All Books', 'Categories', 'Bestsellers', 'New Arrivals'].map(
                (l, i) => (
                  <p
                    key={i}
                    className="text-sm mb-3 cursor-pointer hover:text-white transition-colors"
                    style={{ color: 'rgba(248,245,239,0.45)' }}
                  >
                    {l}
                  </p>
                )
              )}
            </div>
            {/* Customer Service */}
            <div>
              <p
                className="font-bold text-sm mb-5 tracking-wide uppercase"
                style={{ color: '#C9A227' }}
              >
                Customer Service
              </p>
              {['Contact Us', 'FAQs', 'Shipping Info', 'Returns & Refunds'].map(
                (l, i) => (
                  <p
                    key={i}
                    className="text-sm mb-3 cursor-pointer hover:text-white transition-colors"
                    style={{ color: 'rgba(248,245,239,0.45)' }}
                  >
                    {l}
                  </p>
                )
              )}
            </div>
            {/* Policies */}
            <div>
              <p
                className="font-bold text-sm mb-5 tracking-wide uppercase"
                style={{ color: '#C9A227' }}
              >
                Policies
              </p>
              {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map(
                (l, i) => (
                  <p
                    key={i}
                    className="text-sm mb-3 cursor-pointer hover:text-white transition-colors"
                    style={{ color: 'rgba(248,245,239,0.45)' }}
                  >
                    {l}
                  </p>
                )
              )}
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'rgba(248,245,239,0.3)' }}>
              © 2025 The Reading Room. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: 'rgba(248,245,239,0.2)' }}>
              Built with ❤️ for readers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HOme;
