import React, { Suspense, useState } from "react"
import { Canvas } from "react-three-fiber"
import { OrbitControls, PerspectiveCamera, HTML } from "drei"
import { useQuery, gql } from "@apollo/client"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Cumi from "../components/cumi"
import Sky from "../components/sky"
import Text from "../components/text"
import Speak from "../components/speak"
import Asteroid from "../components/asteroid"
import Star from "../components/star"
import { randomInteger, randomPosition } from "../utils/random"

let asteroids = []
for (let i = 0; i < 50; i++) {
  asteroids.push(
    <Asteroid
      key={i}
      i={i}
      position-y={i * -8}
      rotation={[
        randomInteger(-3, 3),
        randomInteger(-3, 3),
        randomInteger(-3, 3),
      ]}
      scale={[
        randomInteger(2, 3) * i * Math.random(),
        randomInteger(2, 3) * i * Math.random(),
        randomInteger(2, 3) * i * Math.random(),
      ]}
    />
  )
}

let stars = []
for (let i = 0; i < 3000; i++) {
  stars.push(
    <Star
      key={i}
      position={randomPosition(1200, 1400)}
      scale={[2, 2, 2]}
      color="#eeeeee"
    />
  )
}

const SHEETPOEM_QUERY = gql`
  query {
    sheetpoem(
      spreadsheetId: "1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU"
      range: "A1:A1000"
      verses: 4
    )
  }
`

const IndexPage = () => {
  const { data } = useQuery(SHEETPOEM_QUERY, { pollInterval: 20 * 1000 })
  const [ready, setReady] = useState(false)
  const isSSR = typeof window === "undefined"
  return (
    <Layout>
      <SEO title="hola :D" />
      <Canvas
        style={{ position: "absolute", top: 0 }}
        pixelRatio={isSSR ? null : window.devicePixelRatio}
      >
        <PerspectiveCamera
          makeDefault={true}
          position={[0, 250, 500]}
          far={4000}
        />
        <pointLight />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={100}
          maxDistance={1200}
          enableKeys={false}
          enablePan={false}
          // minPolarAngle={1}
          maxPolarAngle={2}
          // minAzimuthAngle={-1}
          // maxAzimuthAngle={1}
        />
        <Sky />
        {asteroids}
        {stars}
        <Text>{ready ? data && data.sheetpoem : "hola\n:D\n\n\n\n\n"}</Text>
        <Suspense fallback={null}>
          <Cumi scale={[20, 20, 20]} position={[0, 50, 0]} />
        </Suspense>
        {ready && data && <Speak words={data.sheetpoem} />}
        {!ready && !isSSR && (
          <HTML
            center
            style={{
              width: 280,
              background: "black",
              color: "white",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <p>
              cumatron necesita tu autorización para hablar a través de tu
              navegador
            </p>
            <button
              style={{
                background: "black",
                borderColor: "white",
                color: "white",
                fontFamily: "org_v01",
              }}
              onPointerDown={() => {
                setReady(!ready)
              }}
            >
              OK!
            </button>
          </HTML>
        )}
      </Canvas>
    </Layout>
  )
}

export default IndexPage
