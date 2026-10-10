import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// Spinning globe (world of knowledge)
function Globe({ position }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.35;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color="#0d9488"
          wireframe
          opacity={0.35}
          transparent
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshStandardMaterial color="#134e4a" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Latitude rings */}
      {[-0.5, 0, 0.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[Math.sqrt(1.1 * 1.1 - y * y), 0.015, 8, 48]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#2dd4bf"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Stack of books
function BookStack({ position }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.position.y =
      position[1] + Math.sin(state.clock.getElapsedTime() * 0.6) * 0.25;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.18;
  });
  const books = [
    { color: '#f97316', h: 0.14 },
    { color: '#3b82f6', h: 0.16 },
    { color: '#a855f7', h: 0.12 },
    { color: '#10b981', h: 0.15 },
    { color: '#ef4444', h: 0.13 },
  ];
  let yOff = 0;
  return (
    <group ref={ref} position={position}>
      {books.map((b, i) => {
        const y = yOff + b.h / 2;
        yOff += b.h;
        return (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[1.1, b.h, 0.8]} />
            <meshStandardMaterial color={b.color} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

// Floating DNA helix (science / learning)
function DNAHelix({ position }) {
  const ref = useRef();
  const count = 24;
  const sphereData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = (i / count) * Math.PI * 4;
      return {
        pos1: [Math.cos(t) * 0.5, (i / count) * 3 - 1.5, Math.sin(t) * 0.5],
        pos2: [
          Math.cos(t + Math.PI) * 0.5,
          (i / count) * 3 - 1.5,
          Math.sin(t + Math.PI) * 0.5,
        ],
      };
    });
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
  });

  return (
    <group ref={ref} position={position} scale={0.7}>
      {sphereData.map((d, i) => (
        <group key={i}>
          <mesh position={d.pos1}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color="#2dd4bf"
              emissive="#2dd4bf"
              emissiveIntensity={0.4}
            />
          </mesh>
          <mesh position={d.pos2}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color="#f0abfc"
              emissive="#f0abfc"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Floating open book
function OpenBook({ position, speed = 0.7, color = '#fbbf24' }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.6;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
  });
  return (
    <group ref={ref} position={position} scale={0.8}>
      <mesh position={[-0.52, 0, 0]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.95, 1.3, 0.04]} />
        <meshStandardMaterial color="#fffdf5" roughness={0.9} />
      </mesh>
      <mesh position={[0.52, 0, 0]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[0.95, 1.3, 0.04]} />
        <meshStandardMaterial color="#fffdf5" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[0.05, 1.3, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {[-0.35, -0.15, 0.05, 0.25, 0.45].map((y, i) => (
        <mesh key={i} position={[-0.52, y, 0.023]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.65, 0.022, 0.001]} />
          <meshStandardMaterial color="#aaa9a0" />
        </mesh>
      ))}
    </group>
  );
}

// Floating quill pen
function Quill({ position, speed = 0.9 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.25;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.28;
  });
  return (
    <group ref={ref} position={position} rotation={[0, 0, -0.5]} scale={0.8}>
      {/* Feather */}
      <mesh rotation={[0, 0, Math.PI / 10]}>
        <coneGeometry args={[0.18, 1.6, 6]} />
        <meshStandardMaterial
          color="#fef9c3"
          roughness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Nib */}
      <mesh position={[0, -0.85, 0]}>
        <coneGeometry args={[0.04, 0.25, 6]} />
        <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Floating star/sparkles
function Sparkles() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#2dd4bf"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Floating torus knot (abstract knowledge)
function KnotShape({ position }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.4;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.getElapsedTime() * 0.55) * 0.3;
  });
  return (
    <mesh ref={ref} position={position} scale={0.55}>
      <torusKnotGeometry args={[0.7, 0.22, 80, 12]} />
      <meshStandardMaterial
        color="#0d9488"
        metalness={0.3}
        roughness={0.4}
        emissive="#0d9488"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

export default function SignUpScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 8, 4]} intensity={1.1} />
      <pointLight position={[-5, 4, 3]} intensity={0.9} color="#2dd4bf" />
      <pointLight position={[5, -3, 2]} intensity={0.7} color="#a78bfa" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#fbbf24" />

      <Stars radius={70} depth={35} count={500} factor={3} fade speed={0.4} />
      <Sparkles />

      {/* Center globe */}
      <Float speed={1.0} floatIntensity={0.3}>
        <Globe position={[0, 0, -1]} />
      </Float>

      {/* Book stack left */}
      <BookStack position={[-3.5, -1, 0]} />

      {/* Book stack right */}
      <BookStack position={[3.5, 0.5, -0.5]} />

      {/* Open books */}
      <OpenBook position={[-2.5, 2, 0]} speed={0.8} color="#2dd4bf" />
      <OpenBook position={[2.8, -2, 0.5]} speed={0.65} color="#f97316" />

      {/* DNA helix */}
      <DNAHelix position={[4, 0, 0]} />

      {/* Quill pens */}
      <Quill position={[-4, 0.5, 1]} speed={0.85} />
      <Quill position={[1.5, 3, -0.5]} speed={1.1} />

      {/* Torus knot */}
      <KnotShape position={[-1.5, -2.8, 0]} />
    </Canvas>
  );
}
