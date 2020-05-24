import React, { useMemo, useRef } from "react"
import { TextureLoader, LinearFilter, DoubleSide } from "three"
import { useFrame } from "react-three-fiber"

const Sky = () => {
  const texture = useMemo(() => new TextureLoader().load("/space.jpg"), [])
  texture.minFilter = LinearFilter

  useFrame(() => {
    sky.current.rotation.y += 0.0001
  })

  const sky = useRef()
  return (
    <mesh ref={sky}>
      <sphereBufferGeometry attach="geometry" args={[1000, 32, 32]} />
      <meshBasicMaterial
        attach="material"
        color="hotpink"
        map={texture}
        side={DoubleSide}
      />
    </mesh>
  )
}

export default Sky
