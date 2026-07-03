import { useMemo } from 'react';

function useFieldGeometry(count, spread, colored) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = colored ? new Float32Array(count * 3) : null;
    const tints = [
      [0.55, 0.6, 1],
      [1, 0.6, 0.85],
      [0.7, 1, 0.5],
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
      positions[i * 3 + 2] = -Math.random() * spread.z + (spread.zOffset || 0);
      if (colors) {
        const t = tints[i % 3];
        colors[i * 3] = t[0];
        colors[i * 3 + 1] = t[1];
        colors[i * 3 + 2] = t[2];
      }
    }
    return { positions, colors };
  }, [count, spread, colored]);
}

export default function Starfield() {
  const white = useFieldGeometry(1400, { x: 180, y: 120, z: 180, zOffset: 10 }, false);
  const tinted = useFieldGeometry(400, { x: 180, y: 120, z: 180, zOffset: 0 }, true);

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[white.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.32} sizeAttenuation transparent opacity={0.9} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[tinted.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[tinted.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.5} vertexColors transparent opacity={0.8} />
      </points>
    </>
  );
}
