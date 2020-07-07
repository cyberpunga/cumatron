import React, { useState, Suspense } from "react"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "drei"
import { useQuery, gql } from "@apollo/client"

import Cumi from "./cumi"
import Skull from "./skull"
import Sky from "./sky"
import Text from "./text"
import Asteroids from "./asteroid"
import Stars from "./stars"
import Ceres from "./ceres"
import Confirmation from "./confirmation"
import Speak from "../speak"

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
  const { data, loading, error } = useQuery(SHEETPOEM_QUERY, {
    pollInterval: 20 * 1000,
  })
  const [ready, setReady] = useState(false)

  return (
    <Canvas shadowMap style={{ position: "absolute", top: 0 }}>
      {<pointLight castShadow position={[-10, 32, 32]} color="yellow" />}
      <pointLight castShadow position={[10, -32, 0]} color="violet" />
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={8}
        maxDistance={80}
        enableKeys={false}
        enablePan={false}
        minPolarAngle={1}
        maxPolarAngle={1.6}
      />
      <Stars />
      <Suspense fallback={null}>
        <Sky />
        <Skull />
        <Ceres />
        <Cumi
          scale={[0.6, 0.6, 0.6]}
          position={[0, 0.1, -1]}
          rotation={[-0.5, 1, 0]}
        />
        <Asteroids />
      </Suspense>
      {ready ? (
        <Text>
          {data ? data.sheetpoem : loading ? "loading..." : error.message}
        </Text>
      ) : (
        <Confirmation onPointerDown={() => setReady(!ready)} />
      )}
      <Speak words={data && data.sheetpoem} />
    </Canvas>
  )
}
