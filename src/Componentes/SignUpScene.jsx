import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Single aurora ribbon line
function AuroraRibbon({ yOffset, color1, color2, speed, zPos }) {
  const ref = useRef();
  const count = 80;
  const basePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (i / (count - 1)) * 20 - 10;
      arr[i * 3 + 1] = yOffset;
      arr[i * 3 + 2] = zPos;
    }
    return arr;
  }, [yOffset, zPos]);

  const workArr = useRef(basePositions.slice());

  const col = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    for (let i = 0; i < count; i++) {
      const mix = c1.clone().lerp(c2, i / count);
      arr[i * 3] = mix.r;
      arr[i * 3 + 1] = mix.g;
      arr[i * 3 + 2] = mix.b;
    }
    return arr;
  }, [color1, color2]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1)) * 20 - 10;
      workArr.current[i * 3 + 1] =
        yOffset +
        Math.sin(x * 0.4 + t) * 0.8 +
        Math.sin(x * 0.2 - t * 0.7) * 0.5;
    }
    ref.current.geometry.attributes.position.array.set(workArr.current);
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[basePositions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[col, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.55} />
    </line>
  );
}

// Many ribbons stacked = aurora curtain
function AuroraCurtain() {
  const ribbons = [
    { y: 2.5, c1: '#00ff87', c2: '#60efff', spd: 0.28, z: -4.0 },
    { y: 2.0, c1: '#7c3aed', c2: '#00ff87', spd: 0.22, z: -3.8 },
    { y: 1.5, c1: '#60efff', c2: '#a855f7', spd: 0.35, z: -3.5 },
    { y: 1.0, c1: '#00ff87', c2: '#3b82f6', spd: 0.18, z: -3.2 },
    { y: 0.5, c1: '#f472b6', c2: '#60efff', spd: 0.3, z: -3.0 },
    { y: 0.0, c1: '#a855f7', c2: '#00ff87', spd: 0.25, z: -2.8 },
    { y: -0.5, c1: '#3b82f6', c2: '#f472b6', spd: 0.32, z: -2.5 },
    { y: -1.0, c1: '#00ff87', c2: '#7c3aed', spd: 0.2, z: -2.2 },
    { y: -1.5, c1: '#60efff', c2: '#f59e0b', spd: 0.27, z: -2.0 },
    { y: -2.0, c1: '#a855f7', c2: '#3b82f6', spd: 0.33, z: -1.8 },
    { y: -2.5, c1: '#f472b6', c2: '#00ff87', spd: 0.23, z: -1.5 },
    { y: -3.0, c1: '#60efff', c2: '#a855f7', spd: 0.38, z: -1.2 },
  ];
  return (
    <>
      {ribbons.map((r, i) => (
        <AuroraRibbon
          key={i}
          yOffset={r.y}
          color1={r.c1}
          color2={r.c2}
          speed={r.spd}
          zPos={r.z}
        />
      ))}
    </>
  );
}

// Constellation star dots + lines
function Constellation({ points, color }) {
  const groupRef = useRef();
  useFrame((state) => {
    groupRef.current.rotation.y =
      Math.sin(state.clock.getElapsedTime() * 0.08) * 0.15;
  });
  const linePos = useMemo(() => {
    const arr = [];
    for (let i = 0; i < points.length - 1; i++) {
      arr.push(...points[i], ...points[i + 1]);
    }
    return new Float32Array(arr);
  }, [points]);
  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 6, 6]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.28} />
      </lineSegments>
    </group>
  );
}

// Glowing floating book
function MagicBook({ position, color, speed, scale }) {
  const ref = useRef();
  const matRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.y = Math.sin(t * 0.45) * 0.55;
    ref.current.rotation.x = Math.cos(t * 0.3) * 0.1;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.35;
    matRef.current.emissiveIntensity = 0.5 + Math.sin(t * 1.2) * 0.3;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1.1, 1.5, 0.13]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.05, 0, 0.07]}>
        <boxGeometry args={[0.9, 1.38, 0.01]} />
        <meshStandardMaterial
          color="#f0fff4"
          roughness={0.9}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>
      {[-0.38, -0.18, 0.02, 0.22, 0.42].map((y, i) => (
        <mesh key={i} position={[0.05, y, 0.078]}>
          <boxGeometry args={[0.6, 0.016, 0.001]} />
          <meshBasicMaterial color="#b2f5ea" />
        </mesh>
      ))}
    </group>
  );
}

// Colourful magic dust particles
function MagicDust() {
  const ref = useRef();
  const count = 1800;
  const { pos, col } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00ff87'),
      new THREE.Color('#60efff'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#f472b6'),
      new THREE.Color('#f59e0b'),
    ];
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 14;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const cl = palette[Math.floor(Math.random() * palette.length)];
      c[i * 3] = cl.r;
      c[i * 3 + 1] = cl.g;
      c[i * 3 + 2] = cl.b;
    }
    return { pos: p, col: c };
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[col, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// Soft glowing core orb
function CoreOrb() {
  const ref = useRef();
  useFrame((state) => {
    const s = 1 + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08;
    ref.current.scale.set(s, s, s);
  });
  return (
    <group ref={ref} position={[0, 0, -5]}>
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#00ff87" transparent opacity={0.04} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#60efff" transparent opacity={0.05} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

export default function SignUpScene() {
  const c1pts = useMemo(
    () => [
      [-6, 3, -1],
      [-5, 1.5, -1],
      [-4, 2.5, -1],
      [-3, 1, -1],
      [-4.5, 0, -1],
    ],
    []
  );
  const c2pts = useMemo(
    () => [
      [5, 2, -1],
      [6, 0.5, -1],
      [4.5, -0.5, -1],
      [6, -1.5, -1],
      [5, -2.5, -1],
    ],
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 0.5, 9], fov: 58 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#020817']} />

      <ambientLight intensity={0.25} />
      <pointLight position={[0, 3, 3]} intensity={1.5} color="#00ff87" />
      <pointLight position={[-4, 0, 2]} intensity={1.0} color="#7c3aed" />
      <pointLight position={[4, -2, 2]} intensity={0.9} color="#60efff" />
      <pointLight position={[0, -3, 2]} intensity={0.6} color="#f472b6" />

      <CoreOrb />
      <AuroraCurtain />
      <Constellation points={c1pts} color="#60efff" />
      <Constellation points={c2pts} color="#a855f7" />
      <MagicDust />

      <MagicBook
        position={[-4, 1.8, 0.5]}
        color="#00ff87"
        speed={0.55}
        scale={0.8}
      />
      <MagicBook
        position={[4, -1.2, 0]}
        color="#60efff"
        speed={0.65}
        scale={0.75}
      />
      <MagicBook
        position={[-2, -2.5, 0.8]}
        color="#a855f7"
        speed={0.7}
        scale={0.65}
      />
      <MagicBook
        position={[2.5, 2.5, -0.5]}
        color="#f472b6"
        speed={0.5}
        scale={0.7}
      />
      <MagicBook
        position={[0, -3.5, 1.2]}
        color="#f59e0b"
        speed={0.8}
        scale={0.6}
      />
      <MagicBook
        position={[-3.5, -0.5, 1]}
        color="#3b82f6"
        speed={0.6}
        scale={0.7}
      />
    </Canvas>
  );
}
