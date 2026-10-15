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
  FaFire,
  FaGlobe,
  FaAward,
  FaMagic,
  FaRocket,
  FaGem,
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import {
  MdLocalShipping,
  MdSupportAgent,
  MdVerified,
  MdCollectionsBookmark,
  MdAutoAwesome,
} from 'react-icons/md';
import BookImg from '../../assets/book-image.png';
import LogoImg from '../../assets/Logo.png';

/* ─── PALETTE ────────────────────────────────────────────── */
const C = {
  primary: '#6B2737',
  secondary: '#1A1A2E',
  accent1: '#E94560',
  accent2: '#0F3460',
  gold: '#C9A227',
  teal: '#16C79A',
  purple: '#7B2FBE',
  orange: '#FF6B35',
  bg: '#F8F5EF',
  card: '#FFFFFF',
  text: '#242424',
  muted: '#777777',
  border: '#E8E0D4',
};

/* ─── UNSPLASH BOOK IMAGES ───────────────────────────────── */
const IMGS = {
  hero1:
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
  hero2:
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80',
  hero3:
    'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&q=80',
  shelf:
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
  reading:
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
  cozy: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
  stack:
    'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=600&q=80',
  open: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
  vintage:
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80',
  coffee:
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
  library:
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
  author:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  author2:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  author3:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  bookCover1:
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&q=80',
  bookCover2:
    'https://images.unsplash.com/photo-1531072901881-d644216d4bf9?w=300&q=80',
  bookCover3:
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&q=80',
  bookCover4:
    'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&q=80',
  bookCover5:
    'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&q=80',
  bookCover6:
    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&q=80',
  bookCover7:
    'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=300&q=80',
  bookCover8:
    'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=300&q=80',
};

/* ─── MOCK BOOKS DATA ─────────────────────────────────────── */
const MOCK_BOOKS = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    rating: 4.8,
    reviewCount: 12400,
    price: '$14.99',
    originalPrice: '$22.00',
    cover: IMGS.bookCover1,
    genre: 'Fiction',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 4.9,
    reviewCount: 45200,
    price: '$16.99',
    cover: IMGS.bookCover2,
    genre: 'Self-Help',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 4.7,
    reviewCount: 89300,
    price: '$12.99',
    originalPrice: '$18.00',
    cover: IMGS.bookCover3,
    genre: 'Classic',
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    rating: 4.9,
    reviewCount: 67800,
    price: '$18.99',
    cover: IMGS.bookCover4,
    genre: 'Sci-Fi',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    rating: 4.6,
    reviewCount: 34100,
    price: '$15.99',
    cover: IMGS.bookCover5,
    genre: 'History',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    rating: 4.5,
    reviewCount: 28900,
    price: '$9.99',
    originalPrice: '$14.00',
    cover: IMGS.bookCover6,
    genre: 'Classic',
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    rating: 4.7,
    reviewCount: 52000,
    price: '$13.99',
    cover: IMGS.bookCover7,
    genre: 'Finance',
  },
  {
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    rating: 4.6,
    reviewCount: 41000,
    price: '$11.99',
    cover: IMGS.bookCover8,
    genre: 'Business',
  },
];

const MOCK_TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Book Club Founder',
    rating: 5,
    text: 'BookWorm completely transformed my reading life. The curation is spot on and delivery is always fast. Highly recommend!',
  },
  {
    name: 'Marcus Chen',
    role: 'Literature Professor',
    rating: 5,
    text: "I've tried many book platforms, but none come close to BookWorm's collection and the way they present their genres.",
  },
  {
    name: 'Amira Khalil',
    role: 'Avid Reader',
    rating: 5,
    text: "Found books here I couldn't find anywhere else. Their recommendations are eerily accurate — I love every single pick!",
  },
];

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
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 3 }}
            className="absolute inset-0 w-1/4 skew-x-12 pointer-events-none"
            style={{
              background: `linear-gradient(90deg,transparent,${C.gold}18,transparent)`,
            }}
          />
        </div>
        <div
          className="absolute left-0 top-0 h-full rounded-l-sm"
          style={{
            width: 14,
            background: `linear-gradient(to right,#1a060a,${C.primary})`,
            transform: 'translateX(-14px) rotateY(90deg)',
            transformOrigin: 'right center',
          }}
        />
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

/* ─── BOOK CARD ──────────────────────────────────────────── */
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
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group rounded-2xl border overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
      style={{ background: C.card, borderColor: C.border }}
    >
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
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
            background: wished ? C.accent1 : 'rgba(255,255,255,0.92)',
            border: `1px solid ${C.border}`,
          }}
        >
          <FaHeart size={12} style={{ color: wished ? '#fff' : C.primary }} />
        </button>
        {originalPrice && (
          <span
            className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: C.accent1 }}
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
          onMouseEnter={(e) => (e.currentTarget.style.background = C.accent1)}
          onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
        >
          <FaShoppingCart size={11} /> Add to Shelf
        </button>
      </div>
    </motion.div>
  );
}

const sF = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

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
      {/* ══ HERO ════════════════════════════════════════════ */}
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
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{
                  background: C.primary,
                  color: C.bg,
                  boxShadow: `0 8px 24px ${C.primary}30`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = C.accent1)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = C.primary)
                }
              >
                <FaBookOpen size={14} /> Explore Books
              </Link>
              <Link
                to="/browsebookspage"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
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

          {/* Right — image gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center relative gap-6"
          >
            <div className="flex flex-col gap-4">
              <motion.img
                src={IMGS.hero1}
                alt="Books"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
                className="w-40 h-52 object-cover rounded-2xl shadow-xl"
                style={{ border: `3px solid ${C.gold}44` }}
              />
              <motion.img
                src={IMGS.hero3}
                alt="Reading"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="w-40 h-40 object-cover rounded-2xl shadow-lg"
                style={{ border: `3px solid ${C.primary}33` }}
              />
            </div>
            <div className="flex flex-col gap-4 mt-10">
              <AnimatedBook />
              <motion.img
                src={IMGS.coffee}
                alt="Cozy reading"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="w-44 h-32 object-cover rounded-2xl shadow-lg"
                style={{ border: `3px solid ${C.teal}44` }}
              />
            </div>

            {/* Floating cards */}
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

      {/* ══ STATS BANNER ════════════════════════════════════ */}
      <section
        className="py-14 border-y"
        style={{
          background: `linear-gradient(135deg,${C.secondary} 0%,${C.accent2} 50%,${C.purple} 100%)`,
          borderColor: 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              icon: <FaBookOpen size={28} />,
              value: '10,000+',
              label: 'Books Available',
              color: C.gold,
            },
            {
              icon: <FaUsers size={28} />,
              value: '50,000+',
              label: 'Happy Readers',
              color: C.teal,
            },
            {
              icon: <FaAward size={28} />,
              value: '500+',
              label: 'Award Winners',
              color: C.orange,
            },
            {
              icon: <FaGlobe size={28} />,
              value: '80+',
              label: 'Countries Shipped',
              color: '#a78bfa',
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              {...sF(i * 0.1)}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                {s.icon}
              </div>
              <p className="text-3xl font-black" style={{ color: '#fff' }}>
                {s.value}
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ IMAGE SHOWCASE ══════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div {...sF()} className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: C.gold }}
          >
            Our World
          </p>
          <h2
            className="text-5xl font-black mb-3"
            style={{ fontFamily: 'Playfair Display,serif', color: C.text }}
          >
            A World Built for
            <span style={{ color: C.primary }}> Book Lovers</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-12 gap-4">
          <motion.div
            {...sF(0)}
            className="col-span-12 md:col-span-7 relative group overflow-hidden rounded-3xl cursor-pointer"
            style={{ height: 380 }}
          >
            <img
              src={IMGS.library}
              alt="Library"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `linear-gradient(to top,${C.secondary}cc,transparent 60%)`,
              }}
            />
            <div className="absolute bottom-6 left-6">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block"
                style={{ background: C.gold, color: C.text }}
              >
                Featured
              </span>
              <h3
                className="text-2xl font-black text-white"
                style={{ fontFamily: 'Playfair Display,serif' }}
              >
                Explore Our Vast Library
              </h3>
              <p className="text-sm text-white/70 mt-1">
                Over 10,000 titles across every genre
              </p>
            </div>
          </motion.div>
          <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4">
            <motion.div
              {...sF(0.1)}
              className="relative group overflow-hidden rounded-3xl cursor-pointer"
            >
              <img
                src={IMGS.reading}
                alt="Reading"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ height: 182 }}
              />
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(to top,${C.primary}bb,transparent 60%)`,
                }}
              />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-black text-white">
                  Find Your Flow
                </h3>
                <p className="text-xs text-white/70">Curated reading lists</p>
              </div>
            </motion.div>
            <motion.div
              {...sF(0.2)}
              className="relative group overflow-hidden rounded-3xl cursor-pointer"
            >
              <img
                src={IMGS.cozy}
                alt="Cozy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ height: 182 }}
              />
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(to top,${C.accent2}bb,transparent 60%)`,
                }}
              />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-black text-white">
                  Cozy Up and Read
                </h3>
                <p className="text-xs text-white/70">
                  Your perfect reading corner
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-12 gap-4 mt-4">
          {[
            {
              img: IMGS.stack,
              title: 'New Arrivals',
              sub: 'Fresh titles every week',
              color: C.purple,
            },
            {
              img: IMGS.open,
              title: 'Open a New World',
              sub: 'Begin your journey today',
              color: C.teal,
            },
            {
              img: IMGS.vintage,
              title: 'Timeless Classics',
              sub: 'Stories that never fade',
              color: C.orange,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...sF(i * 0.1)}
              className="col-span-12 sm:col-span-4 relative group overflow-hidden rounded-3xl cursor-pointer"
              style={{ height: 240 }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(to top,${item.color}dd,transparent 60%)`,
                }}
              />
              <div className="absolute bottom-5 left-5">
                <h3
                  className="text-xl font-black text-white"
                  style={{ fontFamily: 'Playfair Display,serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-white/80">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CATEGORIES ══════════════════════════════════════ */}
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
              Collections
            </p>
            <h2
              className="text-5xl font-black mb-3"
              style={{ fontFamily: 'Playfair Display,serif', color: C.text }}
            >
              Explore Our Book Collection
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                name: 'Fiction & Literature',
                emoji: '📖',
                count: '2,400+',
                color: `${C.primary}12`,
              },
              {
                name: 'Business & Finance',
                emoji: '💼',
                count: '980+',
                color: `${C.accent2}12`,
              },
              {
                name: 'Personal Development',
                emoji: '🌱',
                count: '1,200+',
                color: `${C.teal}18`,
              },
              {
                name: 'Science & Tech',
                emoji: '🔬',
                count: '1,500+',
                color: `${C.purple}12`,
              },
              {
                name: 'History & Biography',
                emoji: '🏛️',
                count: '760+',
                color: `${C.orange}14`,
              },
              {
                name: "Children's Books",
                emoji: '🎨',
                count: '890+',
                color: `${C.gold}15`,
              },
            ].map((c, i) => (
              <motion.div
                key={i}
                {...sF(i * 0.06)}
                whileHover={{ y: -5, scale: 1.03 }}
                className="flex flex-col items-center justify-center gap-3 py-8 px-4 rounded-2xl cursor-pointer transition-all border"
                style={{ background: c.color, borderColor: C.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${C.primary}14`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span className="text-3xl hover:scale-110 transition-transform">
                  {c.emoji}
                </span>
                <p
                  className="font-bold text-xs text-center"
                  style={{ color: C.text }}
                >
                  {c.name}
                </p>
                <p className="text-xs" style={{ color: C.muted }}>
                  {c.count} books
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BESTSELLERS ════════════════════════════════════ */}
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
            View All <FaArrowRight size={12} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_BOOKS.slice(0, 4).map((book, i) => (
            <BookCard key={i} book={book} i={i} />
          ))}
        </div>
      </section>

      {/* ══ PROMO BANNER ════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: C.primary, minHeight: 380 }}
      >
        <div className="absolute inset-0">
          <img
            src={IMGS.shelf}
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right,${C.primary} 40%,${C.primary}aa)`,
            }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-5"
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

      {/* ══ NEW ARRIVALS ════════════════════════════════════ */}
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
                style={{ color: C.teal }}
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
            {MOCK_BOOKS.slice(4).map((book, i) => (
              <BookCard key={i} book={{ ...book, genre: 'New' }} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED READ ════════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          {...sF()}
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: `linear-gradient(135deg,${C.accent2} 0%,${C.purple} 100%)`,
            minHeight: 320,
          }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
            <img
              src={IMGS.hero2}
              alt="Featured"
              className="w-full h-full object-cover opacity-40"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right,${C.accent2},transparent)`,
              }}
            />
          </div>
          <div className="relative z-10 p-12 max-w-lg">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{
                background: `${C.gold}22`,
                color: C.gold,
                border: `1px solid ${C.gold}44`,
              }}
            >
              <FaFire size={10} /> Book of the Month
            </span>
            <h2
              className="text-4xl font-black text-white mb-3"
              style={{ fontFamily: 'Playfair Display,serif' }}
            >
              The Midnight Library
            </h2>
            <p className="text-white/70 mb-2">by Matt Haig</p>
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => (
                <FaStar key={j} size={13} style={{ color: C.gold }} />
              ))}
              <span className="text-xs text-white/60 ml-2">
                4.8 (12.4k reviews)
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Between life and death there is a library. Its shelves go on
              forever. Every book provides a chance to try another life you
              could have lived...
            </p>
            <Link
              to="/browsebookspage"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm cursor-pointer"
              style={{ background: C.gold, color: C.text }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#b8911f')
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = C.gold)}
            >
              Read More <FaArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ══ WHY US ══════════════════════════════════════════ */}
      <section
        className="py-24 border-y"
        style={{ borderColor: C.border, background: C.bg }}
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
            {[
              {
                icon: <MdCollectionsBookmark size={22} />,
                title: 'Curated Selection',
                desc: 'Every title is hand-selected by our team of passionate readers.',
                color: C.primary,
              },
              {
                icon: <FaSearch size={18} />,
                title: 'Easy Discovery',
                desc: 'Find exactly what you want with smart search and recommendations.',
                color: C.accent2,
              },
              {
                icon: <FaMagic size={18} />,
                title: 'Smooth Experience',
                desc: 'From discovery to delivery, every step is effortless.',
                color: C.purple,
              },
              {
                icon: <FaGem size={18} />,
                title: 'Books for Every Stage',
                desc: 'Whether you are five or ninety-five, we have the perfect book.',
                color: C.orange,
              },
            ].map((w, i) => (
              <motion.div
                key={i}
                {...sF(i * 0.1)}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl border transition-all cursor-default"
                style={{ background: C.card, borderColor: C.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = w.color;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${w.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{
                    background: `${w.color}12`,
                    color: w.color,
                    border: `1px solid ${w.color}22`,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              {...sF(i * 0.1)}
              whileHover={{ y: -5 }}
              className="p-7 rounded-2xl border transition-all cursor-default relative overflow-hidden"
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
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl opacity-5"
                style={{ background: C.gold }}
              />
              <div className="flex gap-0.5 mb-4">
                {Array(t.rating)
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
                <img
                  src={
                    i === 0
                      ? IMGS.author2
                      : i === 1
                        ? IMGS.author
                        : IMGS.author3
                  }
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: `2px solid ${C.gold}44` }}
                />
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
      </section>

      {/* ══ FEATURES STRIP ══════════════════════════════════ */}
      <section
        className="py-10 border-y"
        style={{ borderColor: C.border, background: C.card }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <MdCollectionsBookmark size={24} />,
              title: 'Wide Collection',
              desc: 'Thousands of curated titles',
              color: C.primary,
            },
            {
              icon: <MdVerified size={24} />,
              title: 'Expert Curation',
              desc: 'Hand-picked by readers',
              color: C.teal,
            },
            {
              icon: <MdLocalShipping size={24} />,
              title: 'Fast Delivery',
              desc: 'Ships within 24 hours',
              color: C.orange,
            },
            {
              icon: <MdSupportAgent size={24} />,
              title: 'Reader Support',
              desc: 'Help whenever you need',
              color: C.purple,
            },
          ].map((b, i) => (
            <motion.div
              key={i}
              {...sF(i * 0.08)}
              className="flex items-center gap-4 group cursor-default"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                style={{
                  background: `${b.color}12`,
                  color: b.color,
                  border: `1px solid ${b.color}22`,
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

      {/* ══ NEWSLETTER ══════════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg,${C.secondary} 0%,${C.accent2} 60%,${C.purple} 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle,${C.gold} 1px,transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        <motion.div
          {...sF()}
          className="max-w-xl mx-auto text-center px-6 relative z-10"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: `${C.gold}22`,
              border: `1px solid ${C.gold}44`,
            }}
          >
            <MdAutoAwesome size={28} style={{ color: C.gold }} />
          </div>
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: C.gold }}
          >
            Newsletter
          </p>
          <h2
            className="text-5xl font-black mb-4 text-white"
            style={{ fontFamily: 'Playfair Display,serif' }}
          >
            A Little More Reading in Your Inbox.
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Get updates on new arrivals, reading recommendations, and bookstore
            news.
          </p>
          {subscribed ? (
            <div
              className="py-6 rounded-2xl flex flex-col items-center gap-3"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <FaCheckCircle size={28} style={{ color: C.gold }} />
              <p className="font-bold text-white">
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
                  className="flex-1 px-5 py-4 rounded-2xl text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = C.gold)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = 'rgba(255,255,255,0.25)')
                  }
                />
                <button
                  type="submit"
                  className="px-7 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: C.gold, color: C.text }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#b8911f')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = C.gold)
                  }
                >
                  Subscribe
                </button>
              </form>
              <p
                className="text-xs mt-4"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
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
