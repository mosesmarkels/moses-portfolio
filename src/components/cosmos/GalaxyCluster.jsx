import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, AdditiveBlending } from 'three';

const RADIUS = 4.6;
const DEPTH_RATIO = 0.32; // compress the camera-facing axis so no point gets close enough to blow up in size
const POINT_COUNT = 700;
const BIG_SCALE = 0.1;

function useDiskGeometry(accent) {
  return useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const base = new Color(accent);
    const white = new Color('#ffffff');
    for (let i = 0; i < POINT_COUNT; i++) {
      const r = Math.pow(Math.random(), 0.5) * RADIUS;
      const spiral = r * 0.6;
      const angle = Math.random() * Math.PI * 2 + spiral;
      const height = (Math.random() - 0.5) * (1.2 - r / RADIUS) * 1.4;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * r * DEPTH_RATIO;
      const t = 1 - r / RADIUS; // brighter near the core
      const c = base.clone().lerp(white, t * 0.8);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [accent]);
}

// A clickable galaxy: a spiral particle disk + soft core glow. Uses the same
// native-pointer-event pattern as Planet.jsx (onPointerOver/Out/Click on a
// dedicated hit-target sized to the whole visual cluster, not just the core,
// so clicks stay accurate across the entire spiral).
export default function GalaxyCluster({ index, galaxy, anchor, bellsRef, hoverIndexRef, onSelect, baseScale = 1 }) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const glow = useRef(0);
  const { positions, colors } = useDiskGeometry(galaxy.accent);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += 0.0012 * (delta * 60);

    const isHovered = hoverIndexRef.current === index;
    const isFramed = bellsRef.current[index] > 0.4;
    const want = isHovered ? 1 : isFramed ? 0.5 : 0;
    glow.current += (want - glow.current) * 0.1;
    group.scale.setScalar(baseScale * (1 + glow.current * BIG_SCALE));
    if (coreRef.current) coreRef.current.material.opacity = 0.22 + glow.current * 0.35;
  });

  const onPointerOver = (e) => {
    e.stopPropagation();
    hoverIndexRef.current = index;
    document.body.style.cursor = 'pointer';
  };
  const onPointerOut = (e) => {
    e.stopPropagation();
    if (hoverIndexRef.current === index) hoverIndexRef.current = -1;
    document.body.style.cursor = '';
  };
  const onClick = (e) => {
    e.stopPropagation();
    onSelect(galaxy.key, index);
  };

  return (
    <group ref={groupRef} position={[anchor.x, anchor.y, anchor.z]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          sizeAttenuation
          blending={AdditiveBlending}
        />
      </points>

      <mesh ref={coreRef}>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshBasicMaterial color={galaxy.accent} transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} depthWrite={false} />
      </mesh>

      {/* invisible hit-target sized to the whole cluster, for reliable clicks */}
      <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick}>
        <sphereGeometry args={[RADIUS * 0.75, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  );
}
