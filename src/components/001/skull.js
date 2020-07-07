import React, { useRef } from "react"
import { useLoader } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function Model() {
  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader, "/skull/skull.gltf")
  return (
    <group
      ref={group}
      scale={[0.3, 0.3, 0.3]}
      position={[-1, -0.8, 2]}
      rotation={[-0.35, -0.8, -0.6]}
      dispose={null}
    >
      <mesh
        castShadow
        material={materials.Material}
        geometry={nodes.Cube_Skul_0.geometry}
      />
    </group>
  )
}
