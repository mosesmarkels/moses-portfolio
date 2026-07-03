import { Canvas } from '@react-three/fiber';
import Starfield from './Starfield.jsx';
import Sun from './Sun.jsx';

// Generic cosmos shell: starfield, sun, lighting, fog/background. The
// caller supplies everything else as children — hotspot meshes plus
// whichever camera/overlay-writing "director" component fits that page's
// interaction (scroll flythrough, or a fixed reveal shot, etc).
export default function CosmosCanvas({ children }) {
  return (
    <Canvas
      gl={{ antialias: true }}
      dpr={[1, 2]}
      camera={{ fov: 58, near: 0.1, far: 400, position: [0, 0, 8] }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#070512']} />
      <fogExp2 attach="fog" args={['#070512', 0.012]} />
      <ambientLight intensity={0.55} />
      <directionalLight intensity={1.1} position={[6, 8, 10]} />

      <Starfield />
      <Sun />

      {children}
    </Canvas>
  );
}
