import React from "react"
import { useLoader } from "react-three-fiber"
import { TextureLoader, DoubleSide } from "three"

const Sky = props => {
  const texture = useLoader(TextureLoader, "/tycho8z.jpg")
  return (
    <mesh {...props}>
      <sphereBufferGeometry attach="geometry" args={[500, 8, 8]} />
      <meshBasicMaterial attach="material" map={texture} side={DoubleSide} />
    </mesh>
  )
}

export default Sky
