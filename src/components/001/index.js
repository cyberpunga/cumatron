import React, { useState, useEffect, Suspense } from "react"
import { Canvas } from "react-three-fiber"
import { OrbitControls, PerspectiveCamera } from "drei"
import { useLazyQuery, gql } from "@apollo/client"

import Cumi from "./cumi"
import Skull from "./skull"
import Sky from "./sky"
import Text from "./text"
import Asteroids from "./asteroid"
import Stars from "./stars"
import Ceres from "./ceres"

const SHEETPOEM_QUERY = gql`
  query {
    sheetpoem(
      spreadsheetId: "1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU"
      range: "A1:A1000"
      verses: 4
    )
  }
`

export default function Scene() {
  const [ready, setReady] = useState(false)
  const [loadWords, { data, loading, stopPolling }] = useLazyQuery(
    SHEETPOEM_QUERY,
    {
      pollInterval: 20 * 1000,
    }
  )
  useEffect(() => {
    if (data && ready) {
      const msg = new SpeechSynthesisUtterance(data.sheetpoem)
      msg.rate = 0.8
      window.speechSynthesis.speak(msg)
    }
  })
  return (
    <Canvas shadowMap style={{ position: "absolute", top: 0 }}>
      <PerspectiveCamera makeDefault near={1} />
      <pointLight castShadow position={[-10, 32, 32]} color="yellow" />
      <pointLight castShadow position={[10, -32, 0]} color="violet" />
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={8}
        maxDistance={80}
        enableKeys={false}
        enablePan={false}
        minPolarAngle={1}
        maxPolarAngle={2}
      />
      <Stars />
      <Suspense fallback={null}>
        <Sky />
        <Skull
          scale={[0.3, 0.3, 0.3]}
          position={[-1, -0.8, 2]}
          rotation={[-0.35, -0.8, -0.6]}
          onPointerDown={e => e.stopPropagation()}
        />
        <Ceres
          position={[0, -5.3, 0]}
          rotation={[0, 0, 1]}
          receiveShadow
          onPointerDown={e => e.stopPropagation()}
        />
        <Cumi
          scale={[0.6, 0.6, 0.6]}
          position={[0, 0.1, -1]}
          rotation={[-0.5, 1, 0]}
          open={ready}
          onPointerDown={e => {
            e.stopPropagation()
            setReady(!ready)
            if (!ready) {
              loadWords()
            } else {
              stopPolling()
            }
          }}
        />
        <Asteroids />
      </Suspense>
      <Text>
        {ready ? (data ? data.sheetpoem : loading && "loading...") : ""}
      </Text>
    </Canvas>
  )
}
