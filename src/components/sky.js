import React, { useMemo } from "react"
import { TextureLoader, LinearFilter } from "three"

const Sky = () => {
  const texture = useMemo(() => new TextureLoader().load("/tycho8z.jpg"), [])
  texture.minFilter = LinearFilter

  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[-2000, 32, 32]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default Sky
