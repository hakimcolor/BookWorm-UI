import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, OrbitControls, Text3D, Center } from '@react-three/drei';
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

/* ─────────────────── 3D COMPONENTS ─────────────────── */

function Book3D({ position, color, rotation, scale = 1 }) {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.35 + rotation;
    group.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.7 + rotation) * 0.15;
  });
  return (
    <group ref={group} position={position} scale={scale}>
      {/* Cover */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.75, 1.1, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Spine */}
      <mesh position={[-0.375, 0, 0]}>
        <boxGeometry args={[0.05, 1.1, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.2} />
      </mesh>
      {/* Pages */}
      <mesh position={[0.04, 0, 0]}>
        <boxGeometry args={[0.67, 1.05, 0.1]} />
        <meshStandardMaterial color="#FDF6EC" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Scene() {
  const books = [
    { position: [-3.5, 0.5, -1], color: '#8B4513', rotation: 0, scale: 1 },
    { position: [-1.8, -0.6, -2], color: '#D2691E', rotation: 1.2, scale: 0.9 },
    { position: [0.3, 1.1, -3], color: '#F4A460', rotation: 2.1, scale: 1.1 },
    {
      position: [2.2, -0.2, -1.5],
      color: '#2C1810',
      rotation: 0.5,
      scale: 0.95,
    },
    { position: [3.8, 0.9, -2.5], color: '#8B4513', rotation: 1.7, scale: 1 },
    {
      position: [-2.8, -1.1, -3.5],
      color: '#D2691E',
      rotation: 0.9,
      scale: 0.85,
    },
    { position: [1.0, 1.5, -4], color: '#F4A460', rotation: 3.0, scale: 0.8 },
    {
      position: [-0.5, -1.3, -2.5],
      color: '#2C1810',
      rotation: 1.5,
      scale: 1.05,
    },
  ];
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
      <pointLight position={[-4, 3, 2]} intensity={1} color="#F4A460" />
      <pointLight position={[4, -2, 3]} intensity={0.6} color="#D2691E" />
      <Stars radius={90} depth={60} count={4000} factor={4} fade speed={0.8} />
      {books.map((b, i) => (
        <Book3D key={i} {...b} />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
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
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-neutral overflow-x-hidden">
      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </motion.div>

        <div className="absolute inset-0 z-10 bg-linear-to-r from-[#FDF6EC]/97 via-[#FDF6EC]/75 to-[#FDF6EC]/10" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-16"
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-2xl"
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

            {/* Trust badges */}
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
              {/* Book cover placeholder */}
              <div
                className="h-52 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${book.color}22, ${book.color}55)`,
                }}
              >
                <div
                  className="w-24 h-36 rounded shadow-2xl flex items-center justify-center"
                  style={{ background: book.color }}
                >
                  <FaBookOpen className="text-[#FDF6EC]/80" size={32} />
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
                {/* Connector line */}
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
        {/* bg decoration */}
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
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/browsebookspage"
              className="font-body font-semibold px-10 py-4 bg-primary text-[#FDF6EC] rounded-xl hover:bg-neutral transition-all shadow-xl shadow-primary/25 flex items-center gap-2 text-lg"
            >
              Get Started Free <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HOme;
