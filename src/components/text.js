import React from "react"
import { useThree } from "react-three-fiber"
import { Text } from "drei"
import font from "orgdot-org-v01/Orgv01.woff"

export default props => {
  const { viewport } = useThree()
  return (
    <Text
      minWidth={300}
      maxWidth={(viewport.width / 100) * 90}
      fontSize={24}
      color={0xffffff}
      font={font}
      anchorX="center"
      anchorY="middle"
      {...props}
    >
      {props.children}
    </Text>
  )
}
