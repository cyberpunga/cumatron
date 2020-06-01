import React, { useRef, useMemo } from "react"
import { useFrame } from "react-three-fiber"
import { TextureLoader } from "three"

const Asteroid = props => {
  const ref = useRef()
  const material = useRef()
  const texture = useMemo(() => new TextureLoader().load("/asteroides.png"), [])
  const texture2 = useMemo(
    () => new TextureLoader().load("/asteroides2.png"),
    []
  )
  const texture3 = useMemo(
    () => new TextureLoader().load("/asteroides3.png"),
    []
  )
  const texture4 = useMemo(
    () => new TextureLoader().load("/asteroides4.png"),
    []
  )
  // texture.minFilter = LinearFilter
  const textures = [texture, texture2, texture3, texture4]

  useFrame(({ clock: { elapsedTime } }) => {
    // ref.current.position.x = 50 * props.i * Math.cos(elapsedTime * 0.001 * props.i)
    // ref.current.position.z = 50 * props.i * Math.sin(elapsedTime * 0.001 * props.i)
    material.current.rotation += 0.001 * props.i
  })
  return (
    <sprite ref={ref} {...props}>
      <spriteMaterial
        ref={material}
        attach="material"
        map={textures[Math.floor(Math.random() * textures.length)]}
      />
    </sprite>
  )
}

export default Asteroid
