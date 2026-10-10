import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating 3D Book
function Book({ position, rotation, color, speed = 1, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * 0.3;
    groupRef.current.rotation.x = rotation[0] + Math.cos(t * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Book cover */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 1.6, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Book spine */}
      <mesh position={[-0.6, 0, 0]}>
        <boxGeometry args={[0.05, 1.6, 0.15]} />
        <meshStandardMaterial
          color={new THREE.Color(color).offsetHSL(0, 0, -0.15)}
        />
      </mesh>
      {/* Pages */}
      <mesh position={[0.05, 0, 0]}>
        <boxGeometry args={[1.05, 1.5, 0.12]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.9} />
      </mesh>
      {/* Page lines */}
      {[-0.3, -0.1, 0.1, 0.3].map((y, i) => (
        <mesh key={i} position={[0.1, y, 0.075]}>
          <boxGeometry args={[0.7, 0.02, 0.002]} />
          <meshStandardMaterial color="#c8b89a" />
        </mesh>
      ))}
    </group>
  );
}

// Floating graduation cap
function GraduationCap({ position, speed = 0.8 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.y = t * 0.4;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3;
  });
  return (
    <group ref={ref} position={position}>
      {/* Board */}
      <mesh>
        <boxGeometry args={[1.2, 0.08, 1.2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Tassel base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Tassel string */}
      <mesh position={[0.4, -0.2, 0.4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>
    </group>
  );
}

// Floating pencil
function Pencil({ position, speed = 1.2 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.4;
    ref.current.rotation.x = Math.cos(t * 0.3) * 0.2;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.25;
  });
  return (
    <group ref={ref} position={position} rotation={[0, 0, Math.PI / 6]}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.07, 0.07, 1.4, 6]} />
        <meshStandardMaterial color="#f5c518" />
      </mesh>
      {/* Tip */}
      <mesh position={[0, -0.8, 0]}>
        <coneGeometry args={[0.07, 0.25, 6]} />
        <meshStandardMaterial color="#d4956a" />
      </mesh>
      {/* Eraser */}
      <mesh position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.15, 6]} />
        <meshStandardMaterial color="#ff9999" />
      </mesh>
      {/* Eraser band */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.06, 6]} />
        <meshStandardMaterial color="#aaa" metalness={0.6} />
      </mesh>
    </group>
  );
}

// Floating light bulb (ideas / learning)
function LightBulb({ position, speed = 0.85 }) {
  const ref = useRef();
  const glowRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3;
    ref.current.rotation.y = t * 0.25;
    // pulse glow
    const s = 1 + Math.sin(t * 2) * 0.15;
    glowRef.current.scale.set(s, s, s);
  });
  return (
    <group ref={ref} position={position} scale={0.55}>
      {/* Bulb glass */}
      <mesh>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshStandardMaterial
          color="#fef9c3"
          transparent
          opacity={0.75}
          emissive="#fef08a"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Glow core */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Neck */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.3, 12]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.4} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[0.2, 0.18, 0.15, 12]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.5} />
      </mesh>
    </group>
  );
}

// Floating diploma / scroll
function Scroll({ position, speed = 0.9 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.y = t * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * 0.55) * 0.3;
  });
  return (
    <group ref={ref} position={position} scale={0.65}>
      {/* Scroll body */}
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 1.2, 24]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.8} />
      </mesh>
      {/* Top roll */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.15, 24]} />
        <meshStandardMaterial color="#d97706" />
      </mesh>
      {/* Bottom roll */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.15, 24]} />
        <meshStandardMaterial color="#d97706" />
      </mesh>
      {/* Ribbon */}
      <mesh position={[0, 0, 0.56]}>
        <boxGeometry args={[0.12, 1.2, 0.02]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
    </group>
  );
}

// Particle trail following a curved path (reading light beam)
function LightBeam() {
  const ref = useRef();
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      arr[i * 3] = Math.cos(t) * 5;
      arr[i * 3 + 1] = Math.sin(t * 2) * 2.5;
      arr[i * 3 + 2] = Math.sin(t) * 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.4;
    ref.current.rotation.y = t * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#fbbf24"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Floating magnifying glass (research/study symbol)
function MagnifyingGlass({ position, speed = 0.75 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.25;
  });
  return (
    <group ref={ref} position={position} scale={0.7}>
      {/* Glass ring */}
      <mesh>
        <torusGeometry args={[0.4, 0.07, 12, 48]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Lens */}
      <mesh>
        <circleGeometry args={[0.38, 32]} />
        <meshStandardMaterial color="#bfdbfe" transparent opacity={0.35} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.45, -0.45, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.5} />
      </mesh>
    </group>
  );
}

// Floating bookmark
function Bookmark({ position, color = '#ef4444', speed = 1.0 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.z = Math.sin(t * 0.6) * 0.15;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.2;
  });
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.2, 0.7);
    s.lineTo(0.2, 0.7);
    s.lineTo(0.2, -0.5);
    s.lineTo(0, -0.3);
    s.lineTo(-0.2, -0.5);
    s.closePath();
    return s;
  }, []);
  return (
    <mesh ref={ref} position={position}>
      <extrudeGeometry args={[shape, { depth: 0.04, bevelEnabled: false }]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

// Floating atom / knowledge symbol
function KnowledgeAtom({ position, speed = 0.7 }) {
  const ref = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
    ring1.current.rotation.y = t * 0.8;
    ring2.current.rotation.x = t * 0.6;
    ring3.current.rotation.z = t * 0.9;
  });
  return (
    <group ref={ref} position={position} scale={0.6}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Orbit rings */}
      <mesh ref={ring1}>
        <torusGeometry args={[0.6, 0.03, 8, 48]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.6, 0.03, 8, 48]} />
        <meshStandardMaterial color="#34d399" />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 1.5, 0, 0]}>
        <torusGeometry args={[0.6, 0.03, 8, 48]} />
        <meshStandardMaterial color="#f472b6" />
      </mesh>
    </group>
  );
}

// Floating open book (reading animation)
function OpenBook({ position, speed = 0.8 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.5;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.35;
  });
  return (
    <group ref={ref} position={position}>
      {/* Left page */}
      <mesh position={[-0.55, 0, 0]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[1.0, 1.4, 0.04]} />
        <meshStandardMaterial color="#fffdf5" roughness={0.9} />
      </mesh>
      {/* Right page */}
      <mesh position={[0.55, 0, 0]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[1.0, 1.4, 0.04]} />
        <meshStandardMaterial color="#fffdf5" roughness={0.9} />
      </mesh>
      {/* Spine crease */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.06, 1.4, 0.06]} />
        <meshStandardMaterial color="#c8b89a" />
      </mesh>
      {/* Text lines on pages */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((y, i) => (
        <mesh key={i} position={[-0.55, y, 0.022]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.7, 0.025, 0.001]} />
          <meshStandardMaterial color="#aaa9a0" />
        </mesh>
      ))}
    </group>
  );
}

// Floating star/sparkle for magical effect
function Sparkles() {
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      );
    }
    return new Float32Array(arr);
  }, []);

  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#f5c518"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function BookScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      style={{ background: 'transparent' }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-4, 4, 3]} intensity={0.8} color="#f59e0b" />
      <pointLight position={[4, -3, 2]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, 0, 4]} intensity={0.4} color="#a78bfa" />

      <Stars radius={60} depth={30} count={400} factor={3} fade speed={0.5} />
      <Sparkles />
      <LightBeam />

      {/* Books scattered around */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Book
          position={[-3.5, 1.5, 0]}
          rotation={[0.2, 0.5, 0.1]}
          color="#e07b39"
          scale={0.85}
          speed={0.9}
        />
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
        <Book
          position={[3.2, 1.8, -1]}
          rotation={[-0.1, -0.4, 0.05]}
          color="#3b82f6"
          scale={0.75}
          speed={1.1}
        />
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <Book
          position={[-2.8, -1.8, 0.5]}
          rotation={[0.3, 0.8, -0.1]}
          color="#10b981"
          scale={0.9}
          speed={0.7}
        />
      </Float>
      <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.7}>
        <Book
          position={[3.5, -1.2, -0.5]}
          rotation={[-0.2, -0.6, 0.15]}
          color="#8b5cf6"
          scale={0.8}
          speed={1.3}
        />
      </Float>
      <Float speed={2.0} rotationIntensity={0.5} floatIntensity={0.3}>
        <Book
          position={[0.5, 3.0, -1.5]}
          rotation={[0.1, 1.0, 0.2]}
          color="#ef4444"
          scale={0.65}
          speed={0.85}
        />
      </Float>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.5}>
        <Book
          position={[-0.8, -3.0, -1]}
          rotation={[0.15, 0.3, -0.1]}
          color="#f59e0b"
          scale={0.7}
          speed={1.05}
        />
      </Float>

      {/* Graduation cap */}
      <GraduationCap position={[1.5, 0.5, 1]} speed={0.6} />

      {/* Open book center */}
      <OpenBook position={[0, 0, 1.5]} speed={0.7} />

      {/* Knowledge atom */}
      <KnowledgeAtom position={[-3, 0, 0]} speed={0.8} />

      {/* Bookmarks */}
      <Bookmark position={[1.5, -3, 0.5]} color="#ef4444" speed={1.1} />
      <Bookmark position={[-1.8, 2.5, -0.5]} color="#d4af37" speed={0.85} />

      {/* Magnifying glass */}
      <MagnifyingGlass position={[3, 0.5, 0.5]} speed={0.9} />

      {/* Diploma scroll */}
      <Scroll position={[-1, -2.5, 1]} speed={0.75} />

      {/* Light bulb */}
      <LightBulb position={[2.5, 2.8, 0]} speed={0.8} />

      {/* Pencils */}
      <Pencil position={[-1.5, 0.8, 1.5]} speed={1.1} />
      <Pencil position={[2.8, -2.5, 0]} speed={0.9} />
    </Canvas>
  );
}
