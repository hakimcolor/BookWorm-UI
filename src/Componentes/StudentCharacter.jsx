import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Student({ position = [0, 0, 0] }) {
  const headRef = useRef();
  const torsoRef = useRef();
  const rightUpperArmRef = useRef();
  const rightLowerArmRef = useRef();
  const rightHandRef = useRef();
  const leftUpperArmRef = useRef();
  const eyeLRef = useRef();
  const eyeRRef = useRef();
  const lastBlink = useRef(0);
  const blinking = useRef(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // HEAD: reading motion — slow side to side + slight down tilt
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.4) * 0.14;
      headRef.current.rotation.x = -0.18 + Math.sin(t * 0.3) * 0.06; // looking slightly down
      headRef.current.rotation.z = Math.sin(t * 0.25) * 0.04;
    }

    // TORSO: breathing
    if (torsoRef.current) {
      torsoRef.current.scale.y = 1 + Math.sin(t * 0.9) * 0.018;
    }

    // RIGHT ARM: writing motion
    if (rightUpperArmRef.current) {
      rightUpperArmRef.current.rotation.x = 0.6 + Math.sin(t * 1.5) * 0.08;
      rightUpperArmRef.current.rotation.z = -0.3;
    }
    if (rightLowerArmRef.current) {
      rightLowerArmRef.current.rotation.x = 0.5 + Math.sin(t * 1.5) * 0.05;
    }
    if (rightHandRef.current) {
      rightHandRef.current.position.x = 0.38 + Math.sin(t * 2.0) * 0.04;
      rightHandRef.current.position.z = Math.cos(t * 1.4) * 0.02;
    }

    // LEFT ARM: resting, slight shift
    if (leftUpperArmRef.current) {
      leftUpperArmRef.current.rotation.x = 0.55 + Math.sin(t * 0.4) * 0.03;
    }

    // BLINKING every ~4s
    if (t - lastBlink.current > 3.8 + Math.random() * 1.2) {
      lastBlink.current = t;
      blinking.current = true;
    }
    if (blinking.current) {
      const blink = Math.max(0, 1 - (t - lastBlink.current) * 20);
      if (eyeLRef.current) eyeLRef.current.scale.y = blink < 0.1 ? 0.05 : 1;
      if (eyeRRef.current) eyeRRef.current.scale.y = blink < 0.1 ? 0.05 : 1;
      if (t - lastBlink.current > 0.15) blinking.current = false;
    }
  });

  return (
    <group position={position}>
      {/* ===== DESK ===== */}
      {/* Table top */}
      <mesh position={[0, 0, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.1, 1.8]} />
        <meshStandardMaterial
          color="#7c4f2a"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>
      {/* Table top edge trim */}
      <mesh position={[0, 0.06, 0.3]}>
        <boxGeometry args={[3.42, 0.04, 1.82]} />
        <meshStandardMaterial color="#5c3310" roughness={0.7} />
      </mesh>
      {/* Legs */}
      {[
        [-1.55, -0.52, -0.55],
        [1.55, -0.52, -0.55],
        [-1.55, -0.52, 1.15],
        [1.55, -0.52, 1.15],
      ].map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.06, 0.06, 0.95, 8]} />
          <meshStandardMaterial color="#5c3310" roughness={0.7} />
        </mesh>
      ))}

      {/* ===== CHAIR ===== */}
      <mesh position={[0, -0.62, 1.6]}>
        <boxGeometry args={[1.1, 0.08, 1.0]} />
        <meshStandardMaterial color="#2a1f1a" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.1, 2.05]}>
        <boxGeometry args={[1.1, 1.0, 0.08]} />
        <meshStandardMaterial color="#2a1f1a" roughness={0.8} />
      </mesh>

      {/* ===== LAPTOP ===== */}
      <group position={[-0.8, 0.1, 0.0]}>
        <mesh>
          <boxGeometry args={[0.95, 0.04, 0.7]} />
          <meshStandardMaterial
            color="#1c1c1e"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.35, -0.31]} rotation={[-0.52, 0, 0]}>
          <boxGeometry args={[0.95, 0.65, 0.025]} />
          <meshStandardMaterial
            color="#1c1c1e"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {/* Screen content glow */}
        <mesh position={[0, 0.35, -0.297]} rotation={[-0.52, 0, 0]}>
          <boxGeometry args={[0.87, 0.57, 0.001]} />
          <meshStandardMaterial
            color="#bfdbfe"
            emissive="#60a5fa"
            emissiveIntensity={1.2}
          />
        </mesh>
        {/* Keyboard */}
        <mesh position={[0, 0.025, 0.08]}>
          <boxGeometry args={[0.87, 0.005, 0.5]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
        </mesh>
      </group>

      {/* ===== NOTEBOOK ===== */}
      <group position={[0.65, 0.09, 0.1]} rotation={[0, -0.05, 0]}>
        {/* Left page */}
        <mesh position={[-0.3, 0, 0]} rotation={[0, 0.06, 0]}>
          <boxGeometry args={[0.56, 0.025, 0.68]} />
          <meshStandardMaterial color="#fffef0" roughness={0.95} />
        </mesh>
        {/* Right page */}
        <mesh position={[0.3, 0, 0]} rotation={[0, -0.06, 0]}>
          <boxGeometry args={[0.56, 0.025, 0.68]} />
          <meshStandardMaterial color="#fffef0" roughness={0.95} />
        </mesh>
        {/* Spine */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.68]} />
          <meshStandardMaterial color="#e07b39" roughness={0.5} />
        </mesh>
        {/* Lines on left page */}
        {[-0.24, -0.1, 0.04, 0.18, 0.3].map((z, i) => (
          <mesh key={i} position={[-0.3, 0.015, z]} rotation={[0, 0.06, 0]}>
            <boxGeometry args={[0.42, 0.003, 0.012]} />
            <meshBasicMaterial color="#c8c0a0" />
          </mesh>
        ))}
        {/* Writing marks on right page */}
        {[-0.2, -0.05, 0.1].map((z, i) => (
          <mesh key={i} position={[0.3, 0.015, z]} rotation={[0, -0.06, 0]}>
            <boxGeometry args={[0.3, 0.003, 0.01]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
        ))}
      </group>

      {/* ===== PEN/PENCIL on desk ===== */}
      <mesh position={[1.2, 0.1, 0.3]} rotation={[0, 0.3, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.016, 0.7, 8]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.3} />
      </mesh>
      <mesh position={[1.38, 0.1, 0.3]} rotation={[0, 0.3, Math.PI / 2]}>
        <coneGeometry args={[0.016, 0.09, 8]} />
        <meshStandardMaterial color="#d4956a" />
      </mesh>

      {/* ===== LEGS (sitting) ===== */}
      {/* Left thigh */}
      <mesh position={[-0.22, -0.32, 1.12]} rotation={[1.5, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.48, 8, 12]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.7} />
      </mesh>
      {/* Right thigh */}
      <mesh position={[0.22, -0.32, 1.12]} rotation={[1.5, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.48, 8, 12]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.7} />
      </mesh>
      {/* Left lower leg */}
      <mesh position={[-0.22, -1.0, 1.55]} rotation={[-0.1, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 8, 12]} />
        <meshStandardMaterial color="#374151" roughness={0.7} />
      </mesh>
      {/* Right lower leg */}
      <mesh position={[0.22, -1.0, 1.55]} rotation={[-0.1, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 8, 12]} />
        <meshStandardMaterial color="#374151" roughness={0.7} />
      </mesh>
      {/* Shoes */}
      <mesh position={[-0.22, -1.42, 1.78]}>
        <boxGeometry args={[0.22, 0.12, 0.38]} />
        <meshStandardMaterial color="#111" roughness={0.6} />
      </mesh>
      <mesh position={[0.22, -1.42, 1.78]}>
        <boxGeometry args={[0.22, 0.12, 0.38]} />
        <meshStandardMaterial color="#111" roughness={0.6} />
      </mesh>

      {/* ===== TORSO ===== */}
      <mesh ref={torsoRef} position={[0, 0.72, 1.05]}>
        <boxGeometry args={[0.62, 0.78, 0.35]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.6} />
      </mesh>
      {/* Shirt collar */}
      <mesh position={[0, 1.14, 1.02]}>
        <boxGeometry args={[0.28, 0.12, 0.28]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>

      {/* ===== NECK ===== */}
      <mesh position={[0, 1.26, 1.0]}>
        <cylinderGeometry args={[0.1, 0.11, 0.22, 12]} />
        <meshStandardMaterial color="#f0c090" roughness={0.6} />
      </mesh>

      {/* ===== HEAD ===== */}
      <group ref={headRef} position={[0, 1.65, 0.98]}>
        {/* Head shape */}
        <mesh>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial color="#f0c090" roughness={0.55} />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.1, -0.04]} scale={[1.02, 0.7, 1.0]}>
          <sphereGeometry
            args={[0.27, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.6]}
          />
          <meshStandardMaterial color="#1a0a04" roughness={0.9} />
        </mesh>
        {/* Side hair */}
        <mesh position={[-0.24, -0.02, 0]} scale={[0.4, 0.6, 0.8]}>
          <sphereGeometry args={[0.27, 12, 12]} />
          <meshStandardMaterial color="#1a0a04" roughness={0.9} />
        </mesh>
        <mesh position={[0.24, -0.02, 0]} scale={[0.4, 0.6, 0.8]}>
          <sphereGeometry args={[0.27, 12, 12]} />
          <meshStandardMaterial color="#1a0a04" roughness={0.9} />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.26, -0.02, 0]} scale={[0.35, 0.5, 0.4]}>
          <sphereGeometry args={[0.13, 10, 10]} />
          <meshStandardMaterial color="#e8b080" roughness={0.6} />
        </mesh>
        <mesh position={[0.26, -0.02, 0]} scale={[0.35, 0.5, 0.4]}>
          <sphereGeometry args={[0.13, 10, 10]} />
          <meshStandardMaterial color="#e8b080" roughness={0.6} />
        </mesh>
        {/* Eyes */}
        <mesh ref={eyeRRef} position={[-0.1, 0.04, 0.24]}>
          <sphereGeometry args={[0.038, 10, 10]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.1, 0.04, 0.265]}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshBasicMaterial color="#2c1810" />
        </mesh>
        <mesh ref={eyeLRef} position={[0.1, 0.04, 0.24]}>
          <sphereGeometry args={[0.038, 10, 10]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.1, 0.04, 0.265]}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshBasicMaterial color="#2c1810" />
        </mesh>
        {/* Eyebrows */}
        <mesh position={[-0.1, 0.1, 0.25]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <meshBasicMaterial color="#1a0a04" />
        </mesh>
        <mesh position={[0.1, 0.1, 0.25]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <meshBasicMaterial color="#1a0a04" />
        </mesh>
        {/* Nose */}
        <mesh position={[0, -0.04, 0.26]} scale={[0.5, 0.6, 0.5]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#e8a878" roughness={0.7} />
        </mesh>
        {/* Mouth */}
        <mesh position={[0, -0.1, 0.252]}>
          <boxGeometry args={[0.07, 0.012, 0.01]} />
          <meshBasicMaterial color="#c07858" />
        </mesh>
      </group>

      {/* ===== LEFT UPPER ARM ===== */}
      <group
        ref={leftUpperArmRef}
        position={[-0.42, 1.02, 1.08]}
        rotation={[0.55, 0, 0.18]}
      >
        <mesh>
          <capsuleGeometry args={[0.085, 0.36, 8, 10]} />
          <meshStandardMaterial color="#f0c090" roughness={0.6} />
        </mesh>
        {/* Left lower arm */}
        <mesh position={[0, -0.32, 0.14]} rotation={[0.5, 0, 0]}>
          <capsuleGeometry args={[0.075, 0.34, 8, 10]} />
          <meshStandardMaterial color="#f0c090" roughness={0.6} />
        </mesh>
        {/* Left hand on desk */}
        <mesh position={[0, -0.56, 0.44]}>
          <sphereGeometry args={[0.085, 10, 10]} />
          <meshStandardMaterial color="#f0c090" roughness={0.6} />
        </mesh>
      </group>

      {/* ===== RIGHT UPPER ARM ===== */}
      <group
        ref={rightUpperArmRef}
        position={[0.42, 1.02, 1.08]}
        rotation={[0.6, 0, -0.3]}
      >
        <mesh>
          <capsuleGeometry args={[0.085, 0.36, 8, 10]} />
          <meshStandardMaterial color="#f0c090" roughness={0.6} />
        </mesh>
        {/* Right lower arm */}
        <group
          ref={rightLowerArmRef}
          position={[0, -0.32, 0.14]}
          rotation={[0.5, 0, 0]}
        >
          <mesh>
            <capsuleGeometry args={[0.075, 0.34, 8, 10]} />
            <meshStandardMaterial color="#f0c090" roughness={0.6} />
          </mesh>
          {/* Right hand — writing */}
          <group ref={rightHandRef} position={[0.38, -0.48, 0.62]}>
            <mesh>
              <sphereGeometry args={[0.082, 10, 10]} />
              <meshStandardMaterial color="#f0c090" roughness={0.6} />
            </mesh>
            {/* Pen in hand */}
            <mesh position={[0, -0.06, 0.14]} rotation={[0.4, 0, -0.3]}>
              <cylinderGeometry args={[0.012, 0.009, 0.32, 8]} />
              <meshStandardMaterial
                color="#1d4ed8"
                roughness={0.3}
                metalness={0.2}
              />
            </mesh>
            <mesh position={[0.025, -0.21, 0.26]} rotation={[0.4, 0, -0.3]}>
              <coneGeometry args={[0.009, 0.05, 8]} />
              <meshStandardMaterial color="#9ca3af" metalness={0.8} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
