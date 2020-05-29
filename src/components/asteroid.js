import React, { useRef } from "react"
import { useFrame } from "react-three-fiber"

const Asteroid = props => {
  const ref = useRef()
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
      <meshPhongMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

export default Asteroid
