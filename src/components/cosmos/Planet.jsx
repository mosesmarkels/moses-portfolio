import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';

const BIG_SCALE = 0.13;
const BASE_EMISSIVE = 0.14;

export default function Planet({ index, project, anchor, bellsRef, hoverIndexRef }) {
  const navigate = useNavigate();
  const groupRef = useRef(null);
  const meshRef = useRef(null);
  const moonRef = useRef(null);
  const glow = useRef(0);

  const { radius, ring, moon } = project.planet;

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    // continuous self-rotation
    mesh.rotation.x += 0.0015 * (delta * 60);
    mesh.rotation.y += (0.004 + index * 0.0006) * (delta * 60);

    // moon orbit
    if (moon && moonRef.current) {
      const t = performance.now() * 0.001;
      const o = { r: radius * 1.9, sp: 0.6 + index * 0.1, ph: index };
      moonRef.current.position.set(
        Math.cos(t * o.sp + o.ph) * o.r,
        Math.sin(t * o.sp + o.ph) * 0.6,
        Math.sin(t * o.sp + o.ph) * o.r
      );
    }

    // hover / framed glow (native pointer picking replaces the manual
    // screen-space circle hit-testing from the original design reference)
    const isHovered = hoverIndexRef.current === index;
    const isFramed = bellsRef.current[index] > 0.4;
    const want = isHovered ? 1 : isFramed ? 0.5 : 0;
    glow.current += (want - glow.current) * 0.12;
    mesh.material.emissiveIntensity = BASE_EMISSIVE + glow.current * 0.7;
    group.scale.setScalar(1 + glow.current * BIG_SCALE);
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
    navigate(`/project/${project.slug}`);
  };

  return (
    <group ref={groupRef} position={[anchor.x, anchor.y, anchor.z]}>
      <mesh
        ref={meshRef}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      >
        <icosahedronGeometry args={[radius, 4]} />
        <meshStandardMaterial
          color={project.accent}
          emissive={project.accent}
          emissiveIntensity={BASE_EMISSIVE}
          flatShading
          roughness={0.65}
          metalness={0.1}
        />
      </mesh>

      <mesh scale={1.25}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial color={project.accent} transparent opacity={0.1} depthWrite={false} />
      </mesh>

      {ring && (
        <mesh rotation={[Math.PI * 0.42, 0.3, 0]}>
          <torusGeometry args={[radius * 1.7, 0.16, 10, 48]} />
          <meshStandardMaterial color="#ffffff" emissive={project.accent} emissiveIntensity={0.4} roughness={0.4} flatShading />
        </mesh>
      )}

      {moon && (
        <mesh ref={moonRef}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="#dfe6ff" flatShading roughness={0.8} />
        </mesh>
      )}
    </group>
  );
}
