import React, { useMemo, useRef } from "react"
import { useFrame } from "react-three-fiber"
import { TextureLoader, LinearFilter } from "three"

const Asteroid = props => {
  const ref = useRef()
  const texture = useMemo(() => new TextureLoader().load("/asteroid.jpg"), [])
  texture.minFilter = LinearFilter
  useFrame(({ clock: { elapsedTime } }) => {
    ref.current.rotation.y -= 0.01
    ref.current.position.x =
      20 * props.i * Math.cos(elapsedTime * 0.001 * props.i)
    ref.current.position.z =
      20 * props.i * Math.sin(elapsedTime * 0.001 * props.i)
  })
  return (
    <mesh ref={ref} {...props}>
      <dodecahedronBufferGeometry attach="geometry" args={[1, 0]} />
      <meshPhongMaterial
        attach="material"
        color="hotpink" // map={texture}
      />
    </mesh>
  )
}

export default Asteroid
