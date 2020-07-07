import React from "react"
// import { useThree } from "react-three-fiber"
import { Text } from "drei"

import font from "orgdot-org-v01/Orgv01.woff"

export default props => {
  // const { viewport } = useThree()
  return (
    <Text
      // maxWidth={(viewport.width / 100) * 90}
      position={[0, 2, -20]}
      rotation={[0.1, 0, 0.1]}
      fontSize={2}
      color={0xeeeeee}
      font={font}
      anchorX="center"
      anchorY="middle"
      {...props}
    >
      {props.children}
    </Text>
  )
}
