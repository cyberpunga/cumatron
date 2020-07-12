import React from "react"
import { navigate } from "gatsby"
import { Plane } from "drei"
import { useLoader } from "react-three-fiber"
import { TextureLoader, DoubleSide } from "three"

function PlaneIcon(props) {
  const texture = useLoader(TextureLoader, "/pdf-icon.png")
  return (
    <Plane
      {...props}
      args={[1, 0.9566666666666667]}
      onPointerDown={e => e.stopPropagation() && navigate("/book")}
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

export { PlaneIcon, SpriteIcon }
