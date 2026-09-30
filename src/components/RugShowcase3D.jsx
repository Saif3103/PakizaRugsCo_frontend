import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Simple animated rug mesh
function RugMesh({ position, color, index, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  const { scale, posY } = useSpring({
    scale: hovered ? 1.06 : 1,
    posY: position[1] + (hovered ? 0.15 : 0),
    config: { mass: 1, tension: 180, friction: 22 },
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(t * 0.4 + index) * 0.04;
    meshRef.current.rotation.z = Math.cos(t * 0.3 + index) * 0.03;
    // Gentle float
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + index * 2) * 0.08 + (hovered ? 0.15 : 0);
  });

  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      scale={[scale, scale, scale]}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.6, 0.04, 2.4]} />
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        metalness={0.02}
        envMapIntensity={0.5}
      />
      {/* Fringe sides */}
      <mesh position={[0, 0, 1.3]}>
        <boxGeometry args={[1.6, 0.03, 0.15]} />
        <meshStandardMaterial color={color} roughness={1} />
      </mesh>
      <mesh position={[0, 0, -1.3]}>
        <boxGeometry args={[1.6, 0.03, 0.15]} />
        <meshStandardMaterial color={color} roughness={1} />
      </mesh>
      {/* Pattern overlay - just a slightly lighter strip */}
      <mesh position={[0, 0.026, 0]}>
        <boxGeometry args={[0.8, 0.002, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.7} transparent opacity={0.4} />
      </mesh>
    </animated.mesh>
  );
}

// Mouse tilt scene wrapper
function Scene({ onRug }) {
  const groupRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    const mx = (state.mouse.x * viewport.width) / 2;
    const my = (state.mouse.y * viewport.height) / 2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mx * 0.05,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -my * 0.04,
      0.06
    );
  });

  const rugs = [
    { pos: [-2.8, 0, 0], color: '#7B3F1A', label: 'Persian Heritage' },
    { pos: [0, 0.2, -0.5], color: '#4A2210', label: 'Moroccan Dream' },
    { pos: [2.8, -0.1, 0], color: '#5C2D0E', label: 'Tribal Kilim' },
  ];

  return (
    <group ref={groupRef}>
      {/* Ambient + directional lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 3]} intensity={1.4} castShadow color="#FAF5EC" />
      <directionalLight position={[-4, 3, -2]} intensity={0.4} color="#C4A882" />
      <pointLight position={[0, 5, 2]} intensity={0.6} color="#EDE0CC" />

      {rugs.map((r, i) => (
        <RugMesh
          key={r.label}
          position={r.pos}
          color={r.color}
          index={i}
          onClick={() => onRug(r.label)}
        />
      ))}

      {/* Ground shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function RugShowcase3D() {
  const [clicked, setClicked] = useState(null);

  const handleRug = (label) => {
    setClicked(label);
    setTimeout(() => setClicked(null), 2000);
  };

  return (
    <section id="rug-showcase-3d" className="showcase3d">
      {/* Header */}
      <div className="showcase3d__header">
        <span className="eyebrow eyebrow--gold">3D Collection Showcase</span>
        <h2 className="showcase3d__title">
          Feel the texture.<br /><em>Before you touch it.</em>
        </h2>
        <p className="showcase3d__sub">
          Move your mouse over the rugs. Click to explore the collection.
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="showcase3d__canvas-wrap">
        <Canvas
          camera={{ position: [0, 2.5, 7], fov: 50 }}
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <fog attach="fog" args={['#2A1206', 12, 22]} />
          <Scene onRug={handleRug} />
        </Canvas>

        {/* Click tooltip */}
        {clicked && (
          <div className="showcase3d__tooltip">
            <span>Exploring: {clicked}</span>
          </div>
        )}

        {/* Gradient overlays */}
        <div className="showcase3d__fade-left" />
        <div className="showcase3d__fade-right" />
      </div>

      {/* Labels */}
      <div className="showcase3d__labels">
        {['Persian Heritage', 'Moroccan Dream', 'Tribal Kilim'].map((name, i) => (
          <div key={name} className="showcase3d__label">
            <span className="showcase3d__label-num">0{i + 1}</span>
            <span className="showcase3d__label-name">{name}</span>
          </div>
        ))}
      </div>

      <div className="showcase3d__cta-wrap">
        <a href="#collections" className="btn btn--outline-white showcase3d__cta" id="showcase3d-view-btn">
          View Full Collection
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
