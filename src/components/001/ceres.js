import React from "react"
import { useLoader } from "react-three-fiber"
import { TextureLoader } from "three"

const Ceres = props => {
  const texture = useLoader(TextureLoader, "/ceres.jpg")
  return (
    <mesh {...props}>
      <sphereBufferGeometry attach="geometry" args={[5, 8, 8]} />
      <meshLambertMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default Ceres
