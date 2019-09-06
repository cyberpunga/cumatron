import React, { useRef, useEffect, useState } from "react"
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
} from "three"
import TextTexture from "three.texttexture"

import cumi from "./model.json"

export default props => {
  const mount = useRef(null)
  const [words, setWords] = useState(props.words)

  const controls = useRef(null)

  useEffect(() => {
    if (props.words !== words) {
      setWords(props.words)
    }
  }, [props.words])

  useEffect(() => {
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    let frameId

    // scene setup
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new WebGLRenderer({ antialias: true })

    // model
    const model = new ObjectLoader().parse(cumi)
    model.scale.set(0.2, 0.2, 0.2)
    scene.add(model)

    // texts
    let t3xtTexture = new TextTexture({
      fontFamily: "Org_v01",
      fontSize: 90,
      strokeStyle: "rgba(255,255,255,0)",
      fillStyle: "rgba(100,100,100,0.9)",
      strokeWidth: 1 / 100,
      text: "",
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
      strokeStyle: "rgba(100,100,100,1)",
      fillStyle: "rgba(255,255,255,0)",
      strokeWidth: 1 / 100,
      text: "",
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
    // scene.add(cube)
    renderer.setClearColor("#eeeeee")
    renderer.setSize(width, height)

    DefaultLoadingManager.onLoad = function() {
      console.log("Loading Complete!")
    }

    const renderScene = () => {
      renderer.render(scene, camera)
      updateMeshScale()
    }

    const handleResize = () => {
      width = mount.current.clientWidth
      height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderScene()
    }

    const animate = () => {
      // animate model
      model.rotation.y += 0.08
      model.rotation.x += 0.04
      model.position.x = 3 * Math.cos(frameId * 0.008)
      model.position.z = 3 * Math.sin(frameId * 0.008)
      model.children[1].rotation.y =
        (Math.sin(frameId * 0.032) * Math.PI) / 2 - 5
      model.children[3].rotation.y =
        (Math.sin(frameId * 0.024) * Math.PI) / 2 - 5

      // update text
      t3xt.material.map.text = words
      lin3.material.map.text = words

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

    mount.current.appendChild(renderer.domElement)
    window.addEventListener("resize", handleResize)
    start()

    controls.current = { start, stop }

    return () => {
      stop()
      window.removeEventListener("resize", handleResize)
      mount.current.removeChild(renderer.domElement)

      // scene.remove(cube)
      // geometry.dispose()
      // material.dispose()
    }
  }, [words])

  return (
    <div
      style={{
        position: `fixed`,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
      }}
      ref={mount}
    />
  )
}
