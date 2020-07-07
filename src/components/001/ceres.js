import React from "react"
import { useLoader } from "react-three-fiber"
import { TextureLoader } from "three"

const Ceres = () => {
  const texture = useLoader(TextureLoader, "/ceres.jpg")
  return (
    <mesh position={[0, -5.3, 0]} rotation={[0, 0, 1]} receiveShadow>
      <sphereBufferGeometry attach="geometry" args={[5, 8, 8]} />
      <meshLambertMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default Ceres
