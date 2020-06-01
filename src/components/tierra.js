import React, { useRef, useMemo } from "react"
import { useFrame } from "react-three-fiber"
import { TextureLoader } from "three"

const Tierra = props => {
  const ref = useRef()
  const texture = useMemo(
    () => new TextureLoader().load("/earth_texture.jpg"),
    []
  )
  useFrame(() => {
    ref.current.rotation.y += 0.001
  })
  return (
    <mesh ref={ref} {...props} receiveShadow>
      <sphereBufferGeometry attach="geometry" args={[100, 32, 32]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default Tierra

// import React, { useMemo } from "react"
// import { TextureLoader } from "three"

// const Tierra = props => {
//   const texture = useMemo(() => new TextureLoader().load("/tierra.png"), [])
//   return (
//     <sprite {...props}>
//       <spriteMaterial attach="material" map={texture} />
//     </sprite>
//   )
// }

// export default Tierra
