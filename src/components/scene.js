import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Loader, Stars, useTexture, useGLTF, Plane, Text as TextImpl } from "@react-three/drei";
import { useLazyQuery, gql } from "@apollo/client";
import { DoubleSide, MeshPhongMaterial } from "three";
import { navigate } from "gatsby";
import { useSpring, a } from "@react-spring/three";

import font from "orgdot-org-v01/Orgv01.woff";

const SHEETPOEM_QUERY = gql`
  query {
    sheetpoem(spreadsheetId: "1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU", range: "A1:A1000", verses: 4)
  }
`;

function Text({ children, ...props }) {
  return (
    <TextImpl
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
      {children}
    </TextImpl>
  );
}

function Sky(props) {
  const texture = useTexture("/gcenter360_sm.jpg");
  return (
    <mesh {...props}>
      <sphereBufferGeometry attach="geometry" args={[-500, 8, 8]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}

function Planet(props) {
  const texture = useTexture("/ceres.jpg");
  return (
    <mesh {...props}>
      <sphereBufferGeometry attach="geometry" args={[5, 8, 8]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
}

function Skull(props) {
  const { nodes, materials } = useGLTF("/skull/skull.gltf");
  return <mesh {...props} castShadow receiveShadow material={materials.Material} geometry={nodes.Cube_Skul_0.geometry} />;
}

function PlaneIcon(props) {
  const texture = useTexture("/pdf-icon.png");
  const handleClick = (e) => {
    e.stopPropagation();
    navigate("/book");
  };
  return (
    <Plane {...props} args={[1, 0.9566666666666667]} onClick={handleClick}>
      <meshLambertMaterial attach="material" map={texture} transparent={true} side={DoubleSide} alphaTest={0.5} />
    </Plane>
  );
}

function Cumi(props) {
  const { nodes, materials } = useGLTF("/cumi/cumi.gltf");

  const animateProps = useSpring({
    door1: props.open ? [0, 1.6 + Math.random(), 0] : [0, 0, 0],
    door2: props.open ? [0, 1.6 + Math.random(), 0] : [0, 0, 0],
  });

  return (
    <group {...props} dispose={null} onPointerDown={props.onPointerDown}>
      <mesh castShadow receiveShadow material={materials.Material} geometry={nodes.Cube.geometry} />
      <a.mesh
        castShadow
        receiveShadow
        material={materials.Material}
        geometry={nodes.Cube001.geometry}
        position={[0.9, 0.8, 0.96]}
        rotation={animateProps.door1}
      />
      <a.mesh
        castShadow
        receiveShadow
        material={materials.Material}
        geometry={nodes.Cube002.geometry}
        position={[0.9, -0.6, 0.95]}
        rotation={animateProps.door2}
      />
    </group>
  );
}
// function SpriteIcon(props) {
//   const texture = useTexture("/pdf-icon.png");
//   return (
//     <sprite {...props}>
//       <spriteMaterial attach="material" map={texture} rotation={0.3} />
//     </sprite>
//   );
// }

function Asteroids(props) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y -= 0.002;
  });
  return (
    <group ref={ref} {...props}>
      {Array.from({ length: 240 }, (_, i) => {
        if (i % 8 === 0)
          return (
            <PlaneIcon
              key={i}
              castShadow
              position={[(10 + Math.random() * 2) * Math.cos(i), Math.random() * 3, (10 + Math.random() * 2) * Math.sin(i)]}
              rotation={[Math.random(), Math.random(), Math.random()]}
            />
          );
        return (
          <mesh
            key={i}
            castShadow
            position={[(10 + Math.random() * 2) * Math.cos(i), Math.random() * 2, (10 + Math.random() * 2) * Math.sin(i)]}
            rotation={[Math.random(), Math.random(), Math.random()]}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <icosahedronBufferGeometry attach="geometry" args={[0.3 * Math.random(), 0]} />
            <meshLambertMaterial attach="material" color={Math.random() > 0.5 ? "#777777" : "#bbbbbb"} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Scene() {
  const [ready, setReady] = useState(false);
  const [loadWords, { data, loading, stopPolling }] = useLazyQuery(SHEETPOEM_QUERY, {
    pollInterval: 20 * 1000,
  });
  useEffect(() => {
    if (data && ready) {
      const msg = new SpeechSynthesisUtterance(data.sheetpoem);
      msg.rate = 0.8;
      window.speechSynthesis.speak(msg);
    }
  });
  return (
    <React.Fragment>
      <Canvas shadowMap camera={{ near: 1, position: [2, 1.6, 8] }}>
        <ambientLight intensity={0.1} color="#881111" />
        <pointLight shadow-bias={-0.001} position={[8, 0, 24]} intensity={0.8} color="red" />
        <pointLight shadow-bias={-0.001} position={[16, 6.2, 24]} color="yellow" castShadow />
        <OrbitControls
          enableDamping
          maxZoom={4}
          minDistance={8}
          maxDistance={80}
          autoRotate={true}
          autoRotateSpeed={0.4}
          enablePan={false}
          enableKeys={false}
          maxPolarAngle={2}
        />
        <Stars />
        <Suspense fallback={null}>
          <Sky />
          <Asteroids rotation={[-0.4, 0, -0.2]} position={[1, -5.4, -1]} />
          <Skull scale={[0.3, 0.3, 0.3]} position={[-1, -0.8, 2]} rotation={[-0.35, -0.8, -0.6]} onPointerDown={(e) => e.stopPropagation()} />
          <Planet position={[0, -5.3, 0]} rotation={[0, 0, 1]} receiveShadow onPointerDown={(e) => e.stopPropagation()} />
          <Cumi
            scale={[0.6, 0.6, 0.6]}
            position={[0, 0.1, -1]}
            rotation={[-0.5, 1, 0]}
            open={ready}
            onPointerDown={(e) => {
              e.stopPropagation();
              setReady(!ready);
              if (!ready) {
                loadWords();
              } else {
                stopPolling();
              }
            }}
          />
        </Suspense>
        <Text>{ready ? (data ? data.sheetpoem : loading && "cargando...") : "..."}</Text>
      </Canvas>
      <Loader />
    </React.Fragment>
  );
}
