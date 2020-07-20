import React from "react"
import { useLoader } from "react-three-fiber"
import { TextureLoader } from "three"

const Sky = props => {
  const texture = useLoader(TextureLoader, "/gcenter360_sm.jpg")
  return (
    <mesh {...props}>
      <sphereBufferGeometry attach="geometry" args={[-500, 8, 8]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default Sky
