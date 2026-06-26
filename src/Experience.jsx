import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Stars } from '@react-three/drei'
import { shared } from './state'

const RING_Z      = [-12, -23, -35, -47, -59, -71, -83]
const RING_COLORS = ['#a1c4fd','#c2e9fb','#ffecd2','#fcb69f','#c2e9fb','#a1c4fd','#ffecd2']

const LIGHTS = [
  { pos: [-5, 1, -18], color: '#a1c4fd' },
  { pos: [ 5,-1, -28], color: '#ffecd2' },
  { pos: [-5, 1, -40], color: '#c2e9fb' },
  { pos: [ 5,-1, -52], color: '#fcb69f' },
  { pos: [-5, 0, -64], color: '#ffecd2' },
  { pos: [ 5, 1, -76], color: '#a1c4fd' },
]

const SHAPES = [
  { pos: [-9, 3,-10], rot:[.003,.005,.002], color:'#a1c4fd', geo:'ico' },
  { pos: [10,-2,-15], rot:[.002,.003,.004], color:'#fcb69f', geo:'oct' },
  { pos: [-10,-3,-24],rot:[.004,.002,.003], color:'#c2e9fb', geo:'tor' },
  { pos: [ 9, 3,-33], rot:[.003,.004,.002], color:'#ffecd2', geo:'ico' },
  { pos: [-9, 2,-44], rot:[.005,.002,.003], color:'#a1c4fd', geo:'oct' },
  { pos: [10,-3,-56], rot:[.002,.005,.004], color:'#fcb69f', geo:'tor' },
  { pos: [-9, 1,-66], rot:[.004,.003,.002], color:'#c2e9fb', geo:'ico' },
  { pos: [ 8,-2,-76], rot:[.003,.004,.003], color:'#ffecd2', geo:'oct' },
]

function Shape({ pos, rot, color, geo }) {
  const ref = useRef()
  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.x += rot[0]
    ref.current.rotation.y += rot[1]
    ref.current.rotation.z += rot[2]
  })
  return (
    <mesh ref={ref} position={pos}>
      {geo === 'ico' && <icosahedronGeometry args={[0.65, 1]} />}
      {geo === 'oct' && <octahedronGeometry args={[0.55]} />}
      {geo === 'tor' && <torusGeometry args={[0.5, 0.18, 8, 24]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.22} />
    </mesh>
  )
}

export default function Experience() {
  const scroll = useScroll()

  useFrame((state) => {
    const t = scroll.offset
    shared.scroll = t

    state.camera.position.z = -t * 90
    state.camera.position.x = Math.sin(t * Math.PI * 2.5) * 1.0
    state.camera.position.y = Math.cos(t * Math.PI * 1.5) * 0.5
    state.camera.lookAt(
      state.camera.position.x * 0.15,
      state.camera.position.y * 0.15,
      state.camera.position.z - 8
    )

    // Update scroll progress bar
    const fill = document.getElementById('scrollFill')
    if (fill) fill.style.height = (t * 100) + '%'
  })

  return (
    <>
      <fog attach="fog" args={['#050510', 35, 100]} />
      <ambientLight intensity={0.15} />

      <Stars radius={130} depth={90} count={7000} factor={4.5} saturation={0.15} fade speed={0.4} />

      {LIGHTS.map((l, i) => (
        <pointLight key={i} position={l.pos} color={l.color} intensity={5} distance={20} decay={2} />
      ))}

      {RING_Z.map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[0, 0, i * 0.45]}>
          <torusGeometry args={[8, 0.012, 3, 80]} />
          <meshBasicMaterial color={RING_COLORS[i]} transparent opacity={0.1} />
        </mesh>
      ))}

      {SHAPES.map((s, i) => <Shape key={i} {...s} />)}
    </>
  )
}
