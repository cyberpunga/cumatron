import React, { Suspense, useState, useRef } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { OrbitControls, PerspectiveCamera, HTML } from "drei"
import { useQuery, gql } from "@apollo/client"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Cumi from "../components/cumi"
import Sky from "../components/sky"
import Text from "../components/text"
import Speak from "../components/speak"
import { int } from "../utils/random"

let asteroids = []

const Asteroid = props => {
  useFrame(({ clock: { elapsedTime } }) => {
    asteroid.current.rotation.y -= 0.01
    asteroid.current.position.x =
      50 * props.i * Math.cos(elapsedTime * 0.01 * props.i)
    asteroid.current.position.z =
      50 * props.i * Math.sin(elapsedTime * 0.01 * props.i)
  })
  const asteroid = useRef()
  return (
    <mesh ref={asteroid} {...props}>
      <dodecahedronBufferGeometry attach="geometry" args={[1, 0]} />
      <meshPhongMaterial attach="material" color="pink" />
    </mesh>
  )
}

for (let i = 0; i < 100; i++) {
  asteroids.push(
    <Asteroid
      key={i}
      i={i}
      position={[int(-300, 300), int(-100, 100), int(-300, 300)]}
      rotation={[int(-3, 3), int(-3, 3), int(-3, 3)]}
      scale={[int(2, 4) * i, int(2, 4) * i, int(2, 4) * i]}
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
  return (
    <Layout>
      <SEO title="hola :D" />
      <Canvas pixelRatio={window.devicePixelRatio}>
        <PerspectiveCamera makeDefault={true} position={[0, 0, 500]} />
        <pointLight />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={950}
          enableKeys={false}
          enablePan={false}
          minPolarAngle={1}
          maxPolarAngle={2}
        />
        <Sky />
        {asteroids}
        <Text position={[0, 0, 0]}>
          {ready ? data && data.sheetpoem : "hola\n:D\n\n\n\n\n"}
        </Text>
        <Suspense fallback={null}>
          <Cumi scale={[20, 20, 20]} />
        </Suspense>
        {ready && data && <Speak words={data.sheetpoem} />}
        {!ready && (
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
