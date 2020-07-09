import React, { useState } from "react"
import { useLoader } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { draco } from "drei"
import { useSpring, a } from "react-spring/three"

export default function Model(props) {
  const { nodes, materials } = useLoader(
    GLTFLoader,
    "/cumi/cumi.gltf",
    draco("/draco-gltf/")
  )

  const [door1, setDoor1] = useState(false)
  const [door2, setDoor2] = useState(false)
  const animateProps = useSpring({
    door1: door1 ? [0, 2.4, 0] : [0, 0, 0],
    door2: door2 ? [0, 2, 0] : [0, 0, 0],
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        material={materials.Material}
        geometry={nodes.Cube.geometry}
        onPointerDown={e => e.stopPropagation()}
        onPointerUp={e => e.stopPropagation()}
      />
      <a.mesh
        castShadow
        material={materials.Material}
        geometry={nodes.Cube001.geometry}
        position={[0.9, 0.8, 0.96]}
        onPointerDown={e => e.stopPropagation() && setDoor1(!door1)}
        onPointerUp={e => e.stopPropagation()}
        rotation={animateProps.door1}
      />
      <a.mesh
        castShadow
        material={materials.Material}
        geometry={nodes.Cube002.geometry}
        position={[0.9, -0.6, 0.95]}
        onPointerDown={e => e.stopPropagation() && setDoor2(!door2)}
        onPointerUp={e => e.stopPropagation()}
        rotation={animateProps.door2}
      />
    </group>
  )
}
