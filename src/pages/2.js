import React, { useMemo, Suspense } from "react"
import { Canvas } from "react-three-fiber"
import { PerspectiveCamera, MapControls, Sky } from "drei"
import { TextureLoader, LinearFilter, DoubleSide } from "three"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Cumi from "../components/cumi2"

const Grass = props => {
  const texture = useMemo(() => new TextureLoader().load("/grass.jpg"), [])
  texture.minFilter = LinearFilter
  return (
    <mesh receiveShadow {...props}>
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshPhongMaterial attach="material" map={texture} side={DoubleSide} />
    </mesh>
  )
}

export default function PageTwo() {
  return (
    <Layout>
      <SEO title="hola :D" />
      <Canvas style={{ position: "absolute", top: 0 }} shadowMap>
        <PerspectiveCamera position={[0, 10, 10]} />
        <MapControls />
        <ambientLight castShadow intensity={0.8} />
        <Sky sunPosition={[20, 20, -20]} />
        <pointLight castShadow position={[20, 20, -20]} />
        <Grass
          position={[0, -1.65, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[10, 10, 10]}
        />
        <Suspense fallback={null}>
          <Cumi />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
