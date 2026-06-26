import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Experience from './Experience'
import Overlay from './Overlay'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050510' }}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 70, near: 0.1, far: 250 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#050510']} />
        <ScrollControls pages={10} damping={0.25}>
          <Experience />
        </ScrollControls>
      </Canvas>

      {/* HTML overlay — lives outside the canvas, no Three.js dependency */}
      <Overlay />

      {/* Fixed UI chrome */}
      <div className="site-logo">Moses Markels</div>
      <div className="scroll-progress">
        <div className="label">Scroll</div>
        <div className="track">
          <div className="fill" id="scrollFill" style={{ height: '0%' }} />
        </div>
      </div>
    </div>
  )
}
