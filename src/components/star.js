import React from "react"

const Star = props => {
  return (
    <mesh {...props}>
      <dodecahedronBufferGeometry attach="geometry" args={[1, 0]} />
      <meshBasicMaterial attach="material" color={props.color || "white"} />
    </mesh>
  )
}

export default Star
