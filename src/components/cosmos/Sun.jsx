const SUN_POSITION = [-10, 6, -82];

export default function Sun() {
  return (
    <group position={SUN_POSITION}>
      <pointLight color="#ffe6b0" intensity={2.2} distance={0} decay={1.6} />
      <mesh>
        <icosahedronGeometry args={[7, 2]} />
        <meshBasicMaterial color="#ffd27a" />
      </mesh>
      <mesh>
        <sphereGeometry args={[11, 24, 24]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}
