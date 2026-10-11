import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const mouse = { x: 0, y: 0 };

function MouseCamera() {
  const { camera } = useThree();
  const t = useRef({ x: 0, y: 0 });
  useFrame(() => {
    t.current.x += (mouse.x * 1.6 - t.current.x) * 0.04;
    t.current.y += (mouse.y * 0.9 - t.current.y) * 0.04;
    camera.position.x = t.current.x;
    camera.position.y = 1 + t.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── PEN (animated writing) ──────────────────────────────────
function WritingPen() {
  const ref = useRef();
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    ref.current.position.x = 0.5 + Math.sin(t * 1.6) * 0.07;
    ref.current.position.z = 0.2 + Math.cos(t * 1.1) * 0.03;
    ref.current.rotation.z = -0.45 + Math.sin(t * 1.6) * 0.06;
  });
  return (
    <group ref={ref} position={[0.5, -0.7, 0.2]} rotation={[0.3, 0, -0.45]}>
      <mesh>
        <cylinderGeometry args={[0.014, 0.011, 0.38, 8]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.21, 0]}>
        <coneGeometry args={[0.011, 0.055, 8]} />
        <meshStandardMaterial color="#aaa" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.014, 0.014, 0.08, 8]} />
        <meshStandardMaterial color="#f08080" />
      </mesh>
    </group>
  );
}

// ── STUDENT ─────────────────────────────────────────────────
function Student({ position }) {
  const ref = useRef();
  useFrame((s) => {
    ref.current.position.y =
      position[1] + Math.sin(s.clock.getElapsedTime() * 0.9) * 0.04;
  });
  return (
    <group ref={ref} position={position}>
      {/* Table */}
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[3.2, 0.1, 1.6]} />
        <meshStandardMaterial color="#6b4226" roughness={0.7} />
      </mesh>
      {[
        [-1.4, -1.35, -0.6],
        [1.4, -1.35, -0.6],
        [-1.4, -1.35, 0.6],
        [1.4, -1.35, 0.6],
      ].map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.1, 0.9, 0.1]} />
          <meshStandardMaterial color="#4a2e10" />
        </mesh>
      ))}

      {/* Laptop */}
      <group position={[-0.65, -0.82, 0.08]}>
        <mesh>
          <boxGeometry args={[0.9, 0.05, 0.65]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.3, -0.27]} rotation={[-0.52, 0, 0]}>
          <boxGeometry args={[0.9, 0.62, 0.03]} />
          <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.3, -0.256]} rotation={[-0.52, 0, 0]}>
          <boxGeometry args={[0.82, 0.54, 0.001]} />
          <meshStandardMaterial
            color="#c7d2fe"
            emissive="#818cf8"
            emissiveIntensity={1.0}
          />
        </mesh>
      </group>

      {/* Open notebook */}
      <group position={[0.58, -0.83, 0.05]}>
        <mesh position={[-0.27, 0, 0]} rotation={[0, 0.07, 0]}>
          <boxGeometry args={[0.5, 0.03, 0.62]} />
          <meshStandardMaterial color="#fef9c3" roughness={0.9} />
        </mesh>
        <mesh position={[0.27, 0, 0]} rotation={[0, -0.07, 0]}>
          <boxGeometry args={[0.5, 0.03, 0.62]} />
          <meshStandardMaterial color="#fef9c3" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.05, 0.04, 0.62]} />
          <meshStandardMaterial color="#c084fc" roughness={0.5} />
        </mesh>
        {[-0.2, -0.08, 0.04, 0.16, 0.28].map((z, i) => (
          <mesh key={i} position={[-0.27, 0.02, z]} rotation={[0, 0.07, 0]}>
            <boxGeometry args={[0.36, 0.003, 0.014]} />
            <meshBasicMaterial color="#a0916a" />
          </mesh>
        ))}
      </group>

      {/* Writing pen */}
      <WritingPen />

      {/* Chair */}
      <mesh position={[0, -1.56, 0.82]}>
        <boxGeometry args={[1.0, 0.08, 0.9]} />
        <meshStandardMaterial color="#2c1f0e" />
      </mesh>
      <mesh position={[0, -1.1, 1.24]}>
        <boxGeometry args={[1.0, 0.85, 0.08]} />
        <meshStandardMaterial color="#2c1f0e" />
      </mesh>

      {/* Body */}
      <mesh position={[0, -0.1, 0.46]}>
        <boxGeometry args={[0.55, 0.72, 0.3]} />
        <meshStandardMaterial color="#312e81" roughness={0.7} />{' '}
        {/* indigo shirt */}
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.6, 0.36]}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial color="#f5c99a" roughness={0.6} />
      </mesh>
      {/* hair */}
      <mesh position={[0, 0.76, 0.3]}>
        <sphereGeometry
          args={[0.23, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]}
        />
        <meshStandardMaterial color="#1a0a00" roughness={0.9} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.3, -0.38, 0.46]} rotation={[0.7, 0.1, -0.2]}>
        <capsuleGeometry args={[0.07, 0.42, 6, 8]} />
        <meshStandardMaterial color="#f5c99a" roughness={0.6} />
      </mesh>
      <mesh position={[0.34, -0.4, 0.43]} rotation={[0.85, -0.15, 0.22]}>
        <capsuleGeometry args={[0.07, 0.4, 6, 8]} />
        <meshStandardMaterial color="#f5c99a" roughness={0.6} />
      </mesh>
    </group>
  );
}

// ── AURORA RIBBON ───────────────────────────────────────────
function AuroraRibbon({ yOffset, color1, color2, speed, zPos }) {
  const ref = useRef();
  const count = 80;
  const base = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (i / (count - 1)) * 22 - 11;
      arr[i * 3 + 1] = yOffset;
      arr[i * 3 + 2] = zPos;
    }
    return arr;
  }, [yOffset, zPos]);
  const work = useRef(base.slice());
  const col = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const c1 = new THREE.Color(color1),
      c2 = new THREE.Color(color2);
    for (let i = 0; i < count; i++) {
      const m = c1.clone().lerp(c2, i / count);
      arr[i * 3] = m.r;
      arr[i * 3 + 1] = m.g;
      arr[i * 3 + 2] = m.b;
    }
    return arr;
  }, [color1, color2]);
  useFrame((s) => {
    const t = s.clock.getElapsedTime() * speed;
    const mx = mouse.x * 0.5;
    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1)) * 22 - 11;
      work.current[i * 3 + 1] =
        yOffset +
        Math.sin(x * 0.4 + t + mx) * 0.85 +
        Math.sin(x * 0.2 - t * 0.7) * 0.5;
    }
    ref.current.geometry.attributes.position.array.set(work.current);
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[base, 3]} />
        <bufferAttribute attach="attributes-color" args={[col, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.55} />
    </line>
  );
}

function AuroraCurtain() {
  const cfg = [
    { y: 3.5, c1: '#00ff87', c2: '#60efff', s: 0.28, z: -5 },
    { y: 2.9, c1: '#7c3aed', c2: '#00ff87', s: 0.22, z: -4.7 },
    { y: 2.3, c1: '#60efff', c2: '#a855f7', s: 0.35, z: -4.4 },
    { y: 1.7, c1: '#00ff87', c2: '#3b82f6', s: 0.18, z: -4.1 },
    { y: 1.1, c1: '#f472b6', c2: '#60efff', s: 0.3, z: -3.8 },
    { y: 0.5, c1: '#a855f7', c2: '#00ff87', s: 0.25, z: -3.5 },
    { y: -0.1, c1: '#3b82f6', c2: '#f472b6', s: 0.32, z: -3.2 },
    { y: -0.7, c1: '#00ff87', c2: '#7c3aed', s: 0.2, z: -2.9 },
    { y: -1.3, c1: '#60efff', c2: '#f59e0b', s: 0.27, z: -2.6 },
    { y: -1.9, c1: '#a855f7', c2: '#3b82f6', s: 0.33, z: -2.3 },
    { y: -2.5, c1: '#f472b6', c2: '#00ff87', s: 0.23, z: -2.0 },
    { y: -3.1, c1: '#60efff', c2: '#a855f7', s: 0.38, z: -1.7 },
  ];
  return (
    <>
      {cfg.map((r, i) => (
        <AuroraRibbon
          key={i}
          yOffset={r.y}
          color1={r.c1}
          color2={r.c2}
          speed={r.s}
          zPos={r.z}
        />
      ))}
    </>
  );
}

// ── CORNER BOOK ─────────────────────────────────────────────
function CornerBook({ position, color, rotY, speed }) {
  const ref = useRef();
  const matRef = useRef();
  const [bx, by, bz] = position;
  useFrame((s) => {
    const t = s.clock.getElapsedTime() * speed;
    ref.current.position.y = by + Math.sin(t) * 0.22;
    ref.current.rotation.y = rotY + Math.sin(t * 0.5) * 0.2 + mouse.x * 0.1;
    matRef.current.emissiveIntensity = 0.3 + Math.sin(t * 1.3) * 0.2;
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
      <mesh position={[0.01, 0, 0.056]}>
        <boxGeometry args={[0.58, 0.88, 0.005]} />
        <meshStandardMaterial color="#fefce8" roughness={0.9} />
      </mesh>
      {[-0.25, -0.1, 0.05, 0.2, 0.33].map((y, i) => (
        <mesh key={i} position={[0.01, y, 0.059]}>
          <boxGeometry args={[0.38, 0.014, 0.001]} />
          <meshBasicMaterial color="#c0b080" />
        </mesh>
      ))}
    </group>
  );
}

// ── MAGIC DUST ──────────────────────────────────────────────
function MagicDust() {
  const ref = useRef();
  const count = 1600;
  const { pos, col } = useMemo(() => {
    const p = new Float32Array(count * 3),
      c = new Float32Array(count * 3);
    const palette = ['#00ff87', '#60efff', '#a855f7', '#f472b6', '#f59e0b'].map(
      (x) => new THREE.Color(x)
    );
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 13;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const cl = palette[Math.floor(Math.random() * palette.length)];
      c[i * 3] = cl.r;
      c[i * 3 + 1] = cl.g;
      c[i * 3 + 2] = cl.b;
    }
    return { pos: p, col: c };
  }, []);
  useFrame((s) => {
    ref.current.rotation.y = s.clock.getElapsedTime() * 0.015 + mouse.x * 0.12;
    ref.current.rotation.x = mouse.y * 0.06;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[col, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.048}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <MouseCamera />
      <color attach="background" args={['#020817']} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 4, 3]} intensity={1.8} color="#c7d2fe" />
      <pointLight position={[-5, 2, 1]} intensity={0.9} color="#00ff87" />
      <pointLight position={[5, -1, 1]} intensity={0.7} color="#a855f7" />
      <pointLight position={[0, -2, 4]} intensity={0.5} color="#ffffff" />

      {/* Student center */}
      <Student position={[0, 0.2, 0]} />

      <AuroraCurtain />
      <MagicDust />

      {/* Books pushed to corners/edges */}
      <CornerBook
        position={[-5.5, 2.8, -1]}
        color="#00ff87"
        rotY={0.5}
        speed={0.55}
      />
      <CornerBook
        position={[5.3, 2.5, -1]}
        color="#60efff"
        rotY={-0.4}
        speed={0.65}
      />
      <CornerBook
        position={[-5.0, -2.5, -0.5]}
        color="#a855f7"
        rotY={0.3}
        speed={0.7}
      />
      <CornerBook
        position={[5.0, -2.8, -0.5]}
        color="#f472b6"
        rotY={-0.5}
        speed={0.6}
      />
      <CornerBook
        position={[-2.2, 4.0, -1.5]}
        color="#f59e0b"
        rotY={0.2}
        speed={0.5}
      />
      <CornerBook
        position={[2.5, 3.8, -1.5]}
        color="#3b82f6"
        rotY={-0.3}
        speed={0.75}
      />
      <CornerBook
        position={[-5.5, -0.3, -0.8]}
        color="#f59e0b"
        rotY={0.4}
        speed={0.62}
      />
      <CornerBook
        position={[5.5, 0.5, -0.8]}
        color="#ec4899"
        rotY={-0.35}
        speed={0.58}
      />
    </>
  );
}

export default function SignUpScene() {
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
