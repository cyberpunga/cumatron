import React from "react"
import { Text } from "drei"
import { MeshPhongMaterial, DoubleSide } from "three"

import font from "orgdot-org-v01/Orgv01.woff"

export default props => {
  return (
    <Text
      material={
        new MeshPhongMaterial({
          side: DoubleSide,
          transparent: true,
          opacity: 0.54,
        })
      }
      position={[0, 2, -10]}
      rotation={[-0.54, 0, 0.1]}
      fontSize={2}
      font={font}
      {...props}
    >
      {props.children}
    </Text>
  )
}
