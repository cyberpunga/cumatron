import React, { useRef } from "react"
import { useFrame } from "react-three-fiber"

let asteroids = []

for (let i = 0; i < 240; i++) {
  asteroids.push(
    <mesh
      key={i}
      castShadow
      position={[
        (10 + Math.random() * 2) * Math.cos(i),
        Math.random() * 2,
        (10 + Math.random() * 2) * Math.sin(i),
      ]}
      rotation={[Math.random(), Math.random(), Math.random()]}
    >
      <icosahedronBufferGeometry
        attach="geometry"
        args={[0.3 * Math.random(), 0]}
      />
      <meshLambertMaterial
        attach="material"
        color={Math.random() > 0.5 ? "#777777" : "#bbbbbb"}
      />
    </mesh>
  )
}

const Asteroids = () => {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.y -= 0.002
  })
  return (
    <group ref={ref} rotation={[-0.4, 0, -0.2]} position={[1, -5, -1]}>
      {asteroids}
    </group>
  )
}

export default Asteroids
