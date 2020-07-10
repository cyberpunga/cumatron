import React, { useRef } from "react"
import { useFrame } from "react-three-fiber"

import { PlaneIcon } from "./icons"

let asteroids = []

for (let i = 0; i < 240; i++) {
  asteroids.push(
    <group key={i}>
      {Math.random() > 0.8 ? (
        <PlaneIcon //position={[2, 2, 0]}
          position={[
            (10 + Math.random() * 2) * Math.cos(i),
            Math.random() * 3,
            (10 + Math.random() * 2) * Math.sin(i),
          ]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        />
      ) : (
        <mesh
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
      )}
    </group>
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
