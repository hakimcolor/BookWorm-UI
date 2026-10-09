import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBook, FaStar, FaHeart, FaUsers } from 'react-icons/fa';
import * as THREE from 'three';

// 3D Floating Book mesh
function FloatingBook({ position, color, rotation }) {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.y = state.clock.elapsedTime * 0.4 + rotation;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={mesh} position={position} castShadow>
        {/* Book body */}
        <boxGeometry args={[0.7, 1, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
    </Float>
  );
}

// 3D Scene
function Scene() {
  const books = [
    { position: [-3, 0.5, -1], color: '#8B4513', rotation: 0 },
    { position: [-1.5, -0.5, -2], color: '#D2691E', rotation: 1 },
    { position: [0.5, 1, -3], color: '#F4A460', rotation: 2 },
    { position: [2, -0.3, -1.5], color: '#2C1810', rotation: 0.5 },
    { position: [3.5, 0.8, -2], color: '#8B4513', rotation: 1.5 },
    { position: [-2.5, -1, -3], color: '#D2691E', rotation: 0.8 },
  ];

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-5, 3, 2]} intensity={0.8} color="#F4A460" />
      <Stars radius={80} depth={50} count={3000} factor={4} fade speed={1} />
      {books.map((book, i) => (
        <FloatingBook key={i} {...book} />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

// Stats card
const stats = [
  { icon: <FaBook />, value: '10,000+', label: 'Books' },
  { icon: <FaUsers />, value: '5,000+', label: 'Readers' },
  { icon: <FaStar />, value: '50,000+', label: 'Reviews' },
  { icon: <FaHeart />, value: '25,000+', label: 'Saved' },
];

// Genre cards
const genres = [
  { name: 'Fiction', emoji: '📖' },
  { name: 'Science', emoji: '🔬' },
  { name: 'History', emoji: '🏛️' },
  { name: 'Fantasy', emoji: '🧙' },
  { name: 'Romance', emoji: '💕' },
  { name: 'Mystery', emoji: '🔍' },
];

const HOme = () => {
  return (
    <div className="min-h-screen bg-[#FDF6EC] text-neutral pt-16">
      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Three.js Canvas background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-linear-to-r from-[#FDF6EC]/95 via-[#FDF6EC]/70 to-transparent" />

        {/* Hero text */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="font-body text-secondary font-semibold tracking-widest uppercase mb-3 text-sm">
              Welcome to BookWorm
            </p>
            <h1 className="font-heading text-6xl font-black text-neutral leading-tight mb-6">
              Your World of <span className="text-primary">Stories</span> Awaits
            </h1>
            <p className="font-body text-lg text-neutral/70 mb-8 leading-relaxed">
              Discover, collect, and share the books that move you. Build your
              personal library and connect with fellow readers.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/browsebookspage"
                className="font-body font-semibold px-8 py-3 bg-primary text-[#FDF6EC] rounded-lg hover:bg-neutral transition-colors"
              >
                Browse Books
              </Link>
              <Link
                to="/mylibrary"
                className="font-body font-semibold px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-[#FDF6EC] transition-colors"
              >
                My Library
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-neutral">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-accent text-3xl flex justify-center mb-2">
                {s.icon}
              </div>
              <p className="font-heading text-3xl font-bold text-[#FDF6EC]">
                {s.value}
              </p>
              <p className="font-body text-accent/80 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── GENRES ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-heading text-4xl font-bold text-neutral text-center mb-12"
        >
          Browse by Genre
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {genres.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border border-accent/30 bg-white hover:border-primary hover:shadow-md cursor-pointer transition-all"
            >
              <span className="text-4xl">{g.emoji}</span>
              <p className="font-body font-semibold text-neutral text-sm">
                {g.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center px-6"
        >
          <h2 className="font-heading text-4xl font-bold text-[#FDF6EC] mb-4">
            Start Your Reading Journey
          </h2>
          <p className="font-body text-accent mb-8 leading-relaxed">
            Join thousands of readers discovering their next favorite book every
            day.
          </p>
          <Link
            to="/browsebookspage"
            className="font-body font-semibold px-10 py-3 bg-[#FDF6EC] text-primary rounded-lg hover:bg-accent transition-colors"
          >
            Explore Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HOme;
