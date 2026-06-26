import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const SHAPES = [
  { geo: 'icosahedron', args: [1, 1],   pos: [-5,  2, -6],  speed: 0.003, rotAxis: [1, 1, 0] },
  { geo: 'octahedron',  args: [0.7],    pos: [ 4,  3, -5],  speed: 0.005, rotAxis: [0, 1, 1] },
  { geo: 'icosahedron', args: [0.5, 0], pos: [-2, -3, -4],  speed: 0.004, rotAxis: [1, 0, 1] },
  { geo: 'torus',       args: [0.8, 0.25, 8, 24], pos: [6, -2, -7], speed: 0.002, rotAxis: [1, 1, 0] },
  { geo: 'octahedron',  args: [1.1],    pos: [-7,  0, -8],  speed: 0.003, rotAxis: [0, 1, 0] },
  { geo: 'icosahedron', args: [0.6, 1], pos: [ 2, -1, -3],  speed: 0.006, rotAxis: [1, 1, 1] },
  { geo: 'torus',       args: [0.5, 0.18, 6, 18], pos: [-3, 4, -5], speed: 0.004, rotAxis: [1, 0, 0] },
  { geo: 'octahedron',  args: [0.4],    pos: [ 8,  1, -6],  speed: 0.007, rotAxis: [0, 1, 1] },
]

const COLORS = ['#c2e9fb', '#a1c4fd', '#ffecd2', '#fcb69f', '#ffffff']

function Shape({ geo, args, pos, speed, rotAxis }) {
  const mesh = useRef()
  const color = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], [])

  const geometry = useMemo(() => {
    if (geo === 'icosahedron') return new THREE.IcosahedronGeometry(...args)
    if (geo === 'octahedron')  return new THREE.OctahedronGeometry(...args)
    if (geo === 'torus')       return new THREE.TorusGeometry(...args)
  }, [geo, args])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime

    // Slow rotation
    mesh.current.rotation.x += speed * rotAxis[0]
    mesh.current.rotation.y += speed * rotAxis[1]
    mesh.current.rotation.z += speed * rotAxis[2]

    // Gentle float
    mesh.current.position.y = pos[1] + Math.sin(t * 0.4 + pos[0]) * 0.3

    // Mouse parallax
    const { mouse } = state
    mesh.current.position.x = pos[0] + mouse.x * 0.4
    mesh.current.position.z = pos[2] + mouse.y * 0.2
  })

  return (
    <mesh ref={mesh} position={pos} geometry={geometry}>
      <meshBasicMaterial color={color} wireframe opacity={0.18} transparent />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {SHAPES.map((s, i) => <Shape key={i} {...s} />)}
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene />
    </Canvas>
  )
}
