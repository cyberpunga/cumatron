import React, { useRef /* useState */ } from "react"
import { useLoader, useFrame } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { draco } from "drei"
// import { useSpring, a } from "react-spring/three"

export default function Model(props) {
  const group = useRef()
  const door1 = useRef()
  const door2 = useRef()
  const { nodes, materials } = useLoader(
    GLTFLoader,
    "/cumi6.gltf",
    draco("/draco-gltf/")
  )

  // const [door1, setDoor1] = useState(false)
  // const [door2, setDoor2] = useState(false)
  // const animateProps = useSpring({
  //   door1: door1 ? [0, 2.4, 0] : [0, 0, 0],
  //   door2: door2 ? [0, 2, 0] : [0, 0, 0],
  // })

  useFrame(({ clock: { elapsedTime } }) => {
    group.current.rotation.y -= 0.01
    group.current.rotation.x -= 0.01
    group.current.position.x = 200 * Math.cos(elapsedTime * 0.1)
    group.current.position.z = 200 * Math.sin(elapsedTime * 0.1)
    door1.current.rotation.y = (Math.sin(elapsedTime * 0.2) * Math.PI) / 2 - 4.7
    door2.current.rotation.y = (Math.sin(elapsedTime * 0.3) * Math.PI) / 2 - 4.7
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={materials.Material}
        geometry={nodes.Cube.geometry}
        onPointerDown={e => e.stopPropagation()}
      />
      <mesh
        ref={door1}
        material={materials.Material}
        geometry={nodes.Cube001.geometry}
        position={[0.9, 0.8, 0.96]}
        // onPointerDown={e => e.stopPropagation() && setDoor1(!door1)}
        // rotation={animateProps.door1}
      />
      <mesh
        ref={door2}
        material={materials.Material}
        geometry={nodes.Cube002.geometry}
        position={[0.9, -0.6, 0.95]}
        // onPointerDown={e => e.stopPropagation() && setDoor2(!door2)}
        // rotation={animateProps.door2}
      />
    </group>
  )
}
