import React from "react"
import { useLoader } from "react-three-fiber"
import { TextureLoader } from "three"

const Asteroid = props => {
  const [texture, texture2] = useLoader(TextureLoader, [
    "/asteroides4.png",
    "/asteroides2.png",
  ])
  return (
    <group {...props}>
      <sprite position={[0, 0, -800]} scale={[400, 300]}>
        <spriteMaterial attach="material" map={texture} rotation={Math.PI} />
      </sprite>
      <sprite position={[-100, 200, 800]} scale={[400, 400]}>
        <spriteMaterial attach="material" map={texture2} />
      </sprite>
    </group>
  )
}

export default Asteroid
