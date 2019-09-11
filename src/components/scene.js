import React, { useRef, useEffect } from "react"
import {
  DefaultLoadingManager,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  ObjectLoader,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  WebGLRenderer,
  SphereBufferGeometry,
  TextureLoader,
  LinearFilter,
} from "three"

import TextTexture from "three.texttexture"
import { useApolloClient } from "@apollo/react-hooks"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import cumi from "./model.json"
// import sky from "./TychoSkymapII.t5_04096x02048.jpg"

const WORDS = gql`
  query Words {
    words @client
  }
`

export default () => {
  const client = useApolloClient()
  const {
    data: { words },
  } = useQuery(WORDS)

  const mount = useRef(null)

  useEffect(() => {
    const mounted = mount.current
    let width = mounted.clientWidth
    let height = mounted.clientHeight
    let frameId
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, width / height, 0.1, 2000)
    const renderer = new WebGLRenderer({ antialias: true })
    // const geometry = new BoxGeometry(1, 1, 1)
    // const material = new MeshBasicMaterial({ color: 0xff00ff })
    // const cube = new Mesh(geometry, material)
    // scene.add(cube)

    // model
    const model = new ObjectLoader().parse(cumi)
    model.scale.set(0.2, 0.2, 0.2)
    scene.add(model)

    // sky
    const skyGeometry = new SphereBufferGeometry(1800, 32, 32)
    skyGeometry.scale(-1, 1, 1) // invert the geometry on the x-axis so that all of the faces point inward

    const skyTexture = new TextureLoader().load(
      "lala.png"
      // "TychoSkymapII.t5_04096x02048.jpg"
    )
    skyTexture.minFilter = LinearFilter

    const skyMaterial = new MeshBasicMaterial({
      map: skyTexture,
      side: DoubleSide,
    })
    const sphere = new Mesh(skyGeometry, skyMaterial)
    console.log(sphere)
    scene.add(sphere)

    // texts
    let t3xtTexture = new TextTexture({
      fontFamily: "Org_v01",
      fontSize: 90,
      strokeStyle: "rgba(255,255,255,0)",
      fillStyle: "#eeeeee",
      strokeWidth: 1 / 100,
      text: words,
    })
    let t3xtMaterial = new MeshBasicMaterial({
      map: t3xtTexture,
      transparent: true,
      side: DoubleSide,
    })
    let t3xtGeometry = new PlaneGeometry(6, 6, 6)
    let t3xt = new Mesh(t3xtGeometry, t3xtMaterial)
    scene.add(t3xt)

    // lin3
    let lin3Texture = new TextTexture({
      fontFamily: "Org_v01",
      fontSize: 90,
      strokeStyle: "#eeeeee",
      fillStyle: "rgba(255,255,255,0)",
      strokeWidth: 1 / 100,
      text: words,
    })
    let lin3Material = new MeshBasicMaterial({
      map: lin3Texture,
      transparent: true,
      side: DoubleSide,
    })
    let lin3Geometry = new PlaneGeometry(6, 6, 6)
    let lin3 = new Mesh(lin3Geometry, lin3Material)
    lin3.position.z = 3
    scene.add(lin3)

    const updateMeshScale = () => {
      const lala1 = t3xtMaterial.map.image.height / t3xtMaterial.map.image.width
      const lala2 = lin3Material.map.image.height / lin3Material.map.image.width
      t3xt.scale.set(1, lala1, 1)
      lin3.scale.set(1, lala2, 1)
    }

    // lights
    const lights = [
      new PointLight(0xffffff, 1, 0),
      new PointLight(0xffffff, 1, 0),
      new PointLight(0xffffff, 1, 0),
    ]
    lights[0].position.set(0, 200, 0)
    lights[1].position.set(100, 200, 100)
    lights[2].position.set(-100, -200, -100)
    scene.add(lights[0])
    scene.add(lights[1])
    scene.add(lights[2])

    camera.position.z = 4
    renderer.setClearColor("#eeeeee")
    renderer.setSize(width, height)

    DefaultLoadingManager.onLoad = () => {
      console.log("Loading complete!")
      client.writeData({ data: { isLoaded: true } })
    }

    const renderScene = () => {
      renderer.render(scene, camera)
      updateMeshScale()
    }

    const handleResize = () => {
      width = mounted.clientWidth
      height = mounted.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderScene()
    }

    const animate = () => {
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01
      sphere.rotation.y += 0.001
      sphere.rotation.x = (Math.sin(frameId * 0.00032) * Math.PI) / 2 - 50

      // model rotation
      model.rotation.y += 0.08
      model.rotation.x += 0.04
      // model translation
      model.position.x = 3 * Math.cos(frameId * 0.008)
      model.position.z = 3 * Math.sin(frameId * 0.008)
      // model doors
      const doorA = model.children[1]
      const doorB = model.children[3]
      doorA.rotation.y = (Math.sin(frameId * 0.032) * Math.PI) / 2 - 5
      doorB.rotation.y = (Math.sin(frameId * 0.024) * Math.PI) / 2 - 5

      renderScene()
      frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    mounted.appendChild(renderer.domElement)
    window.addEventListener("resize", handleResize)
    start()

    return () => {
      stop()
      window.removeEventListener("resize", handleResize)
      mounted.removeChild(renderer.domElement)

      scene.remove(model)
      // scene.remove(cube)
      // geometry.dispose()
      // material.dispose()
    }
  })

  return (
    <div
      style={{
        position: `fixed`,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        // opacity: 0,
      }}
      ref={mount}
      // onClick={() => setAnimating(!isAnimating)}
    />
  )
}
