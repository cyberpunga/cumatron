import React from "react"
import SceneManager from "../ThreeJSManager"
import CameraControls from "./CameraControls"
import Cumi from "./Cumi"
import Sky from "./Sky"
import Text from "./Text"
import { getCamera, getRenderer, getScene } from "./threeSetup"

const CumiExample = () => {
  return (
    <SceneManager
      getCamera={getCamera}
      getRenderer={getRenderer}
      getScene={getScene}
      canvasStyle={{
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <CameraControls />
      <Cumi />
      <Sky />
      <Text />
    </SceneManager>
  )
}

export default CumiExample
