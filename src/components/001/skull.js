import React from "react"
import { useLoader } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function Skull(props) {
  const { nodes, materials } = useLoader(GLTFLoader, "/skull/skull.gltf")
  return (
    <mesh
      {...props}
      castShadow
      material={materials.Material}
      geometry={nodes.Cube_Skul_0.geometry}
    />
  )
}
