import React from "react"
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

  const animateProps = useSpring({
    door1: props.open ? [0, 1.6 + Math.random(), 0] : [0, 0, 0],
    door2: props.open ? [0, 1.6 + Math.random(), 0] : [0, 0, 0],
  })

  return (
    <group {...props} dispose={null} onPointerDown={props.onPointerDown}>
      <mesh
        castShadow
        material={materials.Material}
        geometry={nodes.Cube.geometry}
      />
      <a.mesh
        castShadow
        material={materials.Material}
        geometry={nodes.Cube001.geometry}
        position={[0.9, 0.8, 0.96]}
        rotation={animateProps.door1}
      />
      <a.mesh
        castShadow
        material={materials.Material}
        geometry={nodes.Cube002.geometry}
        position={[0.9, -0.6, 0.95]}
        rotation={animateProps.door2}
      />
    </group>
  )
}
