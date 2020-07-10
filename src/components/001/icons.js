import React, { useRef } from "react"
import { Plane } from "drei"
import { useLoader, useFrame } from "react-three-fiber"
import { TextureLoader, DoubleSide } from "three"

function PlaneIcon(props) {
  const texture = useLoader(TextureLoader, "/pdf-icon.png")
  return (
    <Plane
      {...props}
      args={[1, 0.9566666666666667]}
      onPointerDown={e =>
        e.stopPropagation() &&
        window &&
        window.open("https://cumatron.win/book")
      }
    >
      <meshLambertMaterial
        attach="material"
        map={texture}
        transparent={true}
        side={DoubleSide}
      />
    </Plane>
  )
}

function SpriteIcon(props) {
  const texture = useLoader(TextureLoader, "/pdf-icon.png")
  return (
    <sprite {...props}>
      <spriteMaterial attach="material" map={texture} rotation={0.3} />
    </sprite>
  )
}

const Icons = props => {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.y -= 0.008
  })
  return (
    <group ref={ref} {...props}>
      {
        // <SpriteIcon position={[2, 2, -2]} />
        // <SpriteIcon position={[-2, 2, -2]} />
        // <SpriteIcon position={[2, 2, 2]} />
      }
      <PlaneIcon position={[2, 2, 0]} rotation={[0, 0, 0.3]} />
      <SpriteIcon position={[-2, 2, 2]} />}
    </group>
  )
}

export default Icons
export { PlaneIcon, SpriteIcon }
