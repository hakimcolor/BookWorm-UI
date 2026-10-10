import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shared mouse (normalised -1 to 1)
const mouse = { x: 0, y: 0 };

// Smooth camera follows mouse
function MouseCamera() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });
  useFrame(() => {
    target.current.x += (mouse.x * 2.0 - target.current.x) * 0.04;
    target.current.y += (mouse.y * 1.2 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = 1.5 + target.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// 6 000-particle spiral galaxy — tilts with mouse
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
    ref.current.rotation.y =
      state.clock.getElapsedTime() * 0.06 + mouse.x * 0.15;
    ref.current.rotation.x = mouse.y * 0.08;
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

// Glowing book — parallax drifts with mouse
function GlowBook({ position, color, scale, speed, parallax = 0.5 }) {
  const ref = useRef();
  const matRef = useRef();
  const baseX = position[0];
  const baseY = position[1];

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const tx = baseX + mouse.x * parallax;
    const ty = baseY + Math.sin(t * 0.6) * 0.3 - mouse.y * parallax * 0.5;
    ref.current.position.x += (tx - ref.current.position.x) * 0.04;
    ref.current.position.y += (ty - ref.current.position.y) * 0.04;
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    matRef.current.emissiveIntensity = 0.5 + Math.sin(t * 1.3) * 0.3;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1.1, 1.5, 0.14]} />
        <meshStandardMaterial
          ref={matRef}
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

// Nebula clouds — drift with mouse at different depths
function NebulaClouds() {
  const clouds = useMemo(
    () => [
      { pos: [-5, 2, -4], color: '#4f46e5', scale: 3.5, px: 0.3 },
      { pos: [5, -1, -5], color: '#7c3aed', scale: 4.0, px: 0.2 },
      { pos: [0, -3, -6], color: '#f59e0b', scale: 3.0, px: 0.15 },
      { pos: [-2, 4, -5], color: '#ec4899', scale: 2.5, px: 0.25 },
    ],
    []
  );

  return (
    <>
      {clouds.map((c, i) => (
        <NebulaCloud key={i} data={c} />
      ))}
    </>
  );
}

function NebulaCloud({ data }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.position.x +=
      (data.pos[0] + mouse.x * data.px - ref.current.position.x) * 0.03;
    ref.current.position.y +=
      (data.pos[1] - mouse.y * data.px * 0.6 - ref.current.position.y) * 0.03;
  });
  return (
    <mesh ref={ref} position={data.pos} scale={data.scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color={data.color}
        transparent
        opacity={0.06}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Cosmic portal — tilts toward mouse
function CosmicPortal() {
  const ref = useRef();
  const ringRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.15 + mouse.x * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.08 + mouse.y * 0.15;
    ringRef.current.rotation.z = t * 0.5;
  });
  return (
    <group ref={ref} position={[0, 0, -3]} scale={1.4}>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.06, 12, 80]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0.3, 0, 0]}>
        <torusGeometry args={[2.0, 0.04, 8, 60]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
      </mesh>
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

// Dust field — rotates with mouse influence
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
    ref.current.rotation.y =
      state.clock.getElapsedTime() * 0.01 + mouse.x * 0.12;
    ref.current.rotation.x =
      state.clock.getElapsedTime() * 0.005 + mouse.y * 0.07;
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

function SceneContent() {
  return (
    <>
      <MouseCamera />
      <color attach="background" args={['#03010f']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 2]} intensity={2} color="#f59e0b" />
      <pointLight position={[-4, 3, 1]} intensity={1} color="#7c3aed" />
      <pointLight position={[4, -2, 1]} intensity={0.8} color="#ec4899" />
      <Galaxy />
      <DustField />
      <NebulaClouds />
      <CosmicPortal />
      <GlowBook
        position={[-4, 1.5, 1]}
        color="#f59e0b"
        scale={0.75}
        speed={0.5}
        parallax={0.55}
      />
      <GlowBook
        position={[4, -1, 0.5]}
        color="#7c3aed"
        scale={0.8}
        speed={0.65}
        parallax={0.4}
      />
      <GlowBook
        position={[-2.5, -2.5, 0]}
        color="#ec4899"
        scale={0.6}
        speed={0.75}
        parallax={0.65}
      />
      <GlowBook
        position={[2.5, 2.5, -1]}
        color="#06b6d4"
        scale={0.65}
        speed={0.55}
        parallax={0.45}
      />
      <GlowBook
        position={[0.5, -3.5, 1]}
        color="#10b981"
        scale={0.55}
        speed={0.85}
        parallax={0.5}
      />
      {[0, 1.2, 2.5, 3.7, 4.9].map((d, i) => (
        <ShootingStar key={i} delay={d} />
      ))}
    </>
  );
}

export default function SignInScene() {
  useEffect(() => {
    const handleMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 1.5, 9], fov: 58 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true }}
    >
      <SceneContent />
    </Canvas>
  );
}
