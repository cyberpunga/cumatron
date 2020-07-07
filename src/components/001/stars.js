import React from "react"
import { randomPosition } from "../../utils/random"

let stars = []

for (let i = 0; i < 800; i++) {
  stars.push(
    <mesh key={i} position={randomPosition(100, 300)}>
      <dodecahedronBufferGeometry attach="geometry" args={[0.5, 0]} />
      <meshBasicMaterial
        attach="material"
        color={Math.random() > 0.8 ? "hotpink" : "#ffffff"}
      />
    </mesh>
  )
}

const Stars = () => {
  return <group>{stars}</group>
}

export default Stars
