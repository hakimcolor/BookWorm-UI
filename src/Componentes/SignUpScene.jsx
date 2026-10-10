import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Rippling concentric rings (water surface)
function WaterRings() {
  const rings = useMemo(() => Array.from({ length: 8 }, (_, i) => i), []);
  return (
    <group rotation={[Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
      {rings.map((i) => (
        <RingWave key={i} index={i} />
      ))}
    </group>
  );
}

function RingWave({ index }) {
  const ref = useRef();
  const baseRadius = index * 1.2 + 0.5;
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const phase = (t * 0.6 + index * 0.4) % 1;
    const r = baseRadius + phase * 0.8;
    const opacity = 0.5 - phase * 0.45;
    ref.current.scale.set(r / baseRadius, r / baseRadius, 1);
    ref.current.material.opacity = Math.max(0, opacity);
  });
  return (
    <mesh ref={ref}>
      <ringGeometry args={[baseRadius - 0.03, baseRadius + 0.03, 64]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Bioluminescent particle swarm (jellyfish-like)
function BioParticles() {
  const ref = useRef();
  const count = 1200;
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      spd[i] = Math.random() * 0.5 + 0.2;
    }
    return { positions: pos, speeds: spd };
  }, []);

  const posRef = useRef(positions.slice());

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      posRef.current[i * 3 + 1] += speeds[i] * 0.003;
      if (posRef.current[i * 3 + 1] > 6) posRef.current[i * 3 + 1] = -6;
    }
    ref.current.geometry.attributes.position.array.set(posRef.current);
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#22d3ee"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

// Floating glowing book with colour pulse
function OceanBook({ position, color, speed = 0.6, scale = 1 }) {
  const ref = useRef();
  const matRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.y = t * 0.35;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.1;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.35;
    matRef.current.emissiveIntensity = 0.4 + Math.sin(t * 1.5) * 0.25;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1.0, 1.4, 0.13]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0.05, 0, 0.07]}>
        <boxGeometry args={[0.82, 1.28, 0.01]} />
        <meshStandardMaterial
          color="#f0fdfa"
          roughness={0.9}
          emissive="#e0faf5"
          emissiveIntensity={0.1}
        />
      </mesh>
      {[-0.3, -0.1, 0.1, 0.3].map((y, i) => (
        <mesh key={i} position={[0.05, y, 0.077]}>
          <boxGeometry args={[0.5, 0.018, 0.001]} />
          <meshBasicMaterial color="#a5f3fc" />
        </mesh>
      ))}
    </group>
  );
}

// Glowing jellyfish bell
function Jellyfish({ position, speed = 0.5 }) {
  const bodyRef = useRef();
  const matRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const pulse = 1 + Math.sin(t * 2) * 0.08;
    bodyRef.current.scale.set(pulse, 1, pulse);
    bodyRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.5;
    matRef.current.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.2;
  });
  return (
    <group position={position}>
      <mesh ref={bodyRef}>
        <sphereGeometry args={[0.5, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          ref={matRef}
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Tentacles */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.25, -0.3, Math.sin(angle) * 0.25]}
          >
            <cylinderGeometry args={[0.015, 0.005, 0.8, 4]} />
            <meshBasicMaterial color="#c4b5fd" transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

// Light column rising from below
function LightColumn({ position, color }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.material.opacity =
      0.07 + Math.sin(state.clock.getElapsedTime() * 0.8 + position[0]) * 0.04;
  });
  return (
    <mesh ref={ref} position={position} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.15, 0.6, 10, 12, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.09}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Deep glow orbs
function GlowOrb({ position, color, size = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    const s =
      size *
      (1 + Math.sin(state.clock.getElapsedTime() * 0.8 + position[0]) * 0.15);
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.7, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  );
}

export default function SignUpScene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 9], fov: 58 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true }}
    >
      {/* Deep ocean background */}
      <color attach="background" args={['#010f1a']} />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 4, 2]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-4, -2, 2]} intensity={1.0} color="#7c3aed" />
      <pointLight position={[4, 2, 1]} intensity={0.8} color="#10b981" />
      <pointLight position={[0, -4, 3]} intensity={0.6} color="#22d3ee" />

      {/* Rising bioluminescent particles */}
      <BioParticles />

      {/* Water surface rings */}
      <WaterRings />

      {/* Glowing light columns from below */}
      <LightColumn position={[-3, -2, -1]} color="#06b6d4" />
      <LightColumn position={[3, -2, -1]} color="#7c3aed" />
      <LightColumn position={[0, -2, -2]} color="#10b981" />

      {/* Glow orbs */}
      <GlowOrb position={[-4, 2, -2]} color="#06b6d4" size={1.2} />
      <GlowOrb position={[4, -1, -2]} color="#7c3aed" size={1.4} />
      <GlowOrb position={[0, 3, -3]} color="#10b981" size={1.0} />
      <GlowOrb position={[-2, -2, -1]} color="#f59e0b" size={0.9} />

      {/* Floating ocean books */}
      <OceanBook
        position={[-3.8, 1.2, 0.5]}
        color="#06b6d4"
        speed={0.55}
        scale={0.8}
      />
      <OceanBook
        position={[3.5, -1.5, 0]}
        color="#10b981"
        speed={0.65}
        scale={0.75}
      />
      <OceanBook
        position={[-1.5, -2.8, 1]}
        color="#a78bfa"
        speed={0.8}
        scale={0.65}
      />
      <OceanBook
        position={[1.8, 2.8, -0.5]}
        color="#f59e0b"
        speed={0.5}
        scale={0.7}
      />
      <OceanBook
        position={[0, 0.5, 2]}
        color="#34d399"
        speed={0.7}
        scale={0.9}
      />

      {/* Jellyfish */}
      <Jellyfish position={[-2.5, 0.5, 1.5]} speed={0.55} />
      <Jellyfish position={[2.8, 1.5, 0.5]} speed={0.45} />
      <Jellyfish position={[0, -1.5, 2]} speed={0.7} />
    </Canvas>
  );
}
