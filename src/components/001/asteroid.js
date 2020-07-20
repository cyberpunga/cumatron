import React, { useRef } from "react"
import { navigate } from "gatsby"
import { useFrame } from "react-three-fiber"

import { PlaneIcon } from "./icons"

let asteroids = []

for (let i = 0; i < 240; i++) {
  asteroids.push(
    i % 8 === 0 ? (
      <PlaneIcon
        key={i}
        castShadow
        position={[
          (10 + Math.random() * 2) * Math.cos(i),
          Math.random() * 3,
          (10 + Math.random() * 2) * Math.sin(i),
        ]}
        rotation={[Math.random(), Math.random(), Math.random()]}
        onPointerDown={e => e.stopPropagation() && navigate("/book")}
      />
    ) : (
      <mesh
        key={i}
        castShadow
        position={[
          (10 + Math.random() * 2) * Math.cos(i),
          Math.random() * 2,
          (10 + Math.random() * 2) * Math.sin(i),
        ]}
        rotation={[Math.random(), Math.random(), Math.random()]}
        onPointerDown={e => e.stopPropagation()}
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
  )
}

const Asteroids = props => {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.y -= 0.002
  })
  return (
    <group ref={ref} {...props}>
      {asteroids}
    </group>
  )
}

export default Asteroids
