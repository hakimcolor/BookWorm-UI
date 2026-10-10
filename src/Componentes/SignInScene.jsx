import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Giant galaxy spiral made of thousands of particles
function Galaxy() {
  const ref = useRef();
  const { positions, colors } = useMemo(() => {
    const count = 6000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const arms = 4;
    const colorInner = new THREE.Color('#f59e0b');
    const colorOuter = new THREE.Color('#7c3aed');

    for (let i = 0; i < count; i++) {
      const armIndex = i % arms;
      const radius = Math.random() * 7 + 0.3;
      const spinAngle = radius * 1.8;
      const branchAngle = (armIndex / arms) * Math.PI * 2;
      const scatter = (Math.random() - 0.5) * 0.6 * (1 / radius);

      pos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + scatter;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + scatter;

      const t = radius / 7;
      const c = colorInner.clone().lerp(colorOuter, t);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

// Shooting stars
function ShootingStar({ delay = 0 }) {
  const ref = useRef();
  const startPos = useMemo(
    () => [
      (Math.random() - 0.5) * 14,
      Math.random() * 6 - 2,
      (Math.random() - 0.5) * 6,
    ],
    []
  );
  const dir = useMemo(
    () => [-(Math.random() * 0.08 + 0.05), -(Math.random() * 0.02), 0],
    []
  );

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() + delay) % 5;
    ref.current.position.set(
      startPos[0] + dir[0] * t * 60,
      startPos[1] + dir[1] * t * 60,
      startPos[2]
    );
    ref.current.material.opacity =
      t < 0.5 ? t * 2 : Math.max(0, 1 - (t - 0.5) * 0.7);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.4, 0.02, 0.02]} />
      <meshBasicMaterial color="#fbbf24" transparent opacity={0.9} />
    </mesh>
  );
}

// Glowing floating book made from emissive planes
function GlowBook({ position, color = '#f59e0b', scale = 1, speed = 0.5 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1.1, 1.5, 0.14]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.06, 0, 0.075]}>
        <boxGeometry args={[0.88, 1.38, 0.01]} />
        <meshStandardMaterial
          color="#fffdf0"
          roughness={0.9}
          emissive="#fff8e0"
          emissiveIntensity={0.15}
        />
      </mesh>
      {[-0.35, -0.15, 0.05, 0.25, 0.45].map((y, i) => (
        <mesh key={i} position={[0.06, y, 0.082]}>
          <boxGeometry args={[0.55, 0.018, 0.001]} />
          <meshBasicMaterial color="#d4c5a0" />
        </mesh>
      ))}
    </group>
  );
}

// Nebula cloud — large soft glowing sphere
function NebulaClouds() {
  const clouds = useMemo(
    () => [
      { pos: [-5, 2, -4], color: '#4f46e5', scale: 3.5 },
      { pos: [5, -1, -5], color: '#7c3aed', scale: 4 },
      { pos: [0, -3, -6], color: '#f59e0b', scale: 3 },
      { pos: [-2, 4, -5], color: '#ec4899', scale: 2.5 },
    ],
    []
  );

  return (
    <>
      {clouds.map((c, i) => (
        <mesh key={i} position={c.pos} scale={c.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={c.color}
            transparent
            opacity={0.06}
            side={THREE.BackSide}
          />
        </mesh>
      ))}
    </>
  );
}

// Ring portal (wormhole/cosmic gateway)
function CosmicPortal() {
  const ref = useRef();
  const ringRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.08;
    ringRef.current.rotation.z = t * 0.5;
  });
  return (
    <group ref={ref} position={[0, 0, -3]} scale={1.4}>
      {/* Outer glowing ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.06, 12, 80]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.5} />
      </mesh>
      {/* Inner ring */}
      <mesh rotation={[0.3, 0, 0]}>
        <torusGeometry args={[2.0, 0.04, 8, 60]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
      </mesh>
      {/* Particle disc */}
      <PortalParticles />
    </group>
  );
}

function PortalParticles() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2.2 + (Math.random() - 0.5) * 1.2;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.sin(angle) * r;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    return arr;
  }, []);
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a78bfa"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// Dust / ambient star field close
function DustField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.005;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function SignInScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 9], fov: 58 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true }}
    >
      {/* Deep space background color */}
      <color attach="background" args={['#03010f']} />

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 2]} intensity={2} color="#f59e0b" />
      <pointLight position={[-4, 3, 1]} intensity={1} color="#7c3aed" />
      <pointLight position={[4, -2, 1]} intensity={0.8} color="#ec4899" />

      {/* Background galaxy spiral */}
      <Galaxy />

      {/* Ambient dust */}
      <DustField />

      {/* Nebula glow clouds */}
      <NebulaClouds />

      {/* Central portal */}
      <CosmicPortal />

      {/* Floating glowing books */}
      <GlowBook
        position={[-4, 1.5, 1]}
        color="#f59e0b"
        scale={0.75}
        speed={0.5}
      />
      <GlowBook
        position={[4, -1, 0.5]}
        color="#7c3aed"
        scale={0.8}
        speed={0.65}
      />
      <GlowBook
        position={[-2.5, -2.5, 0]}
        color="#ec4899"
        scale={0.6}
        speed={0.75}
      />
      <GlowBook
        position={[2.5, 2.5, -1]}
        color="#06b6d4"
        scale={0.65}
        speed={0.55}
      />
      <GlowBook
        position={[0.5, -3.5, 1]}
        color="#10b981"
        scale={0.55}
        speed={0.85}
      />

      {/* Shooting stars */}
      {[0, 1.2, 2.5, 3.7, 4.9].map((d, i) => (
        <ShootingStar key={i} delay={d} />
      ))}
    </Canvas>
  );
}
