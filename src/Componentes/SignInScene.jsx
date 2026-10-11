import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Student from './StudentCharacter';

const mouse = { x: 0, y: 0 };

function MouseCamera() {
  const { camera } = useThree();
  const t = useRef({ x: 0, y: 0 });
  useFrame(() => {
    t.current.x += (mouse.x * 1.5 - t.current.x) * 0.04;
    t.current.y += (mouse.y * 0.8 - t.current.y) * 0.04;
    camera.position.x = t.current.x;
    camera.position.y = 1 + t.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── CORNER BOOKS ───────────────────────────────────────────
function CornerBook({ position, color, rotY, speed }) {
  const ref = useRef();
  const matRef = useRef();
  const [bx, by, bz] = position;
  useFrame((s) => {
    const t = s.clock.getElapsedTime() * speed;
    ref.current.position.y = by + Math.sin(t) * 0.25;
    ref.current.rotation.y = rotY + Math.sin(t * 0.5) * 0.25 + mouse.x * 0.12;
    matRef.current.emissiveIntensity = 0.3 + Math.sin(t * 1.4) * 0.2;
  });
  return (
    <group ref={ref} position={[bx, by, bz]}>
      <mesh>
        <boxGeometry args={[0.7, 1.0, 0.1]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0.02, 0, 0.055]}>
        <boxGeometry args={[0.58, 0.88, 0.005]} />
        <meshStandardMaterial
          color="#fefce8"
          roughness={0.9}
          emissive="#fff"
          emissiveIntensity={0.05}
        />
      </mesh>
      {[-0.25, -0.1, 0.05, 0.2, 0.33].map((y, i) => (
        <mesh key={i} position={[0.02, y, 0.058]}>
          <boxGeometry args={[0.38, 0.015, 0.001]} />
          <meshBasicMaterial color="#c0b090" />
        </mesh>
      ))}
    </group>
  );
}

// ── FLOATING PENCIL ─────────────────────────────────────────
function FloatPencil({ position, speed }) {
  const ref = useRef();
  const [bx, by, bz] = position;
  useFrame((s) => {
    const t = s.clock.getElapsedTime() * speed;
    ref.current.position.y = by + Math.sin(t * 0.7) * 0.3;
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.3;
    ref.current.rotation.x = Math.cos(t * 0.4) * 0.2;
  });
  return (
    <group ref={ref} position={[bx, by, bz]} rotation={[0, 0, Math.PI / 5]}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 1.1, 6]} />
        <meshStandardMaterial color="#f5c518" />
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <coneGeometry args={[0.05, 0.18, 6]} />
        <meshStandardMaterial color="#d4956a" />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 6]} />
        <meshStandardMaterial color="#e87070" />
      </mesh>
    </group>
  );
}

// ── STAR DUST ───────────────────────────────────────────────
function StarDust() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(2500 * 3);
    for (let i = 0; i < 2500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);
  useFrame((s) => {
    ref.current.rotation.y = s.clock.getElapsedTime() * 0.012 + mouse.x * 0.1;
    ref.current.rotation.x = mouse.y * 0.06;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color="#ffffff"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

// ── GALAXY ──────────────────────────────────────────────────
function Galaxy() {
  const ref = useRef();
  const { positions, colors } = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#f59e0b'),
      c2 = new THREE.Color('#7c3aed');
    for (let i = 0; i < count; i++) {
      const arm = i % 3,
        r = Math.random() * 8 + 0.5;
      const spin = r * 1.6,
        branch = (arm / 3) * Math.PI * 2;
      const sc = (Math.random() - 0.5) * 0.5 * (1 / r);
      pos[i * 3] = Math.cos(branch + spin) * r + sc;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 2] = Math.sin(branch + spin) * r + sc;
      const c = c1.clone().lerp(c2, r / 8);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);
  useFrame((s) => {
    ref.current.rotation.y = s.clock.getElapsedTime() * 0.05 + mouse.x * 0.1;
    ref.current.position.y = -6;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <MouseCamera />
      <color attach="background" args={['#03010f']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 4, 3]} intensity={2} color="#93c5fd" />{' '}
      {/* laptop glow */}
      <pointLight position={[-5, 3, 0]} intensity={0.8} color="#f59e0b" />
      <pointLight position={[5, 2, 0]} intensity={0.7} color="#7c3aed" />
      <pointLight position={[0, -2, 4]} intensity={0.5} color="#ffffff" />
      {/* ── Main character centered slightly below middle ── */}
      <Student position={[0, 0.2, 0]} />
      <Galaxy />
      <StarDust />
      {/* ── Books in corners / edges — NOT center ── */}
      <CornerBook
        position={[-5.5, 2.5, -1]}
        color="#ef4444"
        rotY={0.6}
        speed={0.55}
      />
      <CornerBook
        position={[5.2, 2.8, -1]}
        color="#3b82f6"
        rotY={-0.5}
        speed={0.65}
      />
      <CornerBook
        position={[-5.0, -2.8, -0.5]}
        color="#10b981"
        rotY={0.3}
        speed={0.7}
      />
      <CornerBook
        position={[5.0, -2.5, -0.5]}
        color="#a855f7"
        rotY={-0.4}
        speed={0.6}
      />
      <CornerBook
        position={[-2.5, 3.8, -1.5]}
        color="#f59e0b"
        rotY={0.2}
        speed={0.5}
      />
      <CornerBook
        position={[2.8, 3.5, -1.5]}
        color="#06b6d4"
        rotY={-0.3}
        speed={0.75}
      />
      {/* ── Pencils in corners ── */}
      <FloatPencil position={[-4.5, -1.5, 1]} speed={0.9} />
      <FloatPencil position={[4.8, 1.0, 0.5]} speed={0.8} />
      <FloatPencil position={[0, 4.2, -1]} speed={1.0} />
      <FloatPencil position={[-2.8, -3.5, 0]} speed={0.85} />
      <FloatPencil position={[3.5, -3.2, 0.5]} speed={0.95} />
    </>
  );
}

export default function SignInScene() {
  useEffect(() => {
    const h = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return (
    <Canvas
      camera={{ position: [0, 1, 9], fov: 55 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true }}
    >
      <SceneContent />
    </Canvas>
  );
}
