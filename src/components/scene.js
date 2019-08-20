import React from "react"
import * as THREE from "three"
import TextTexture from "three.texttexture"

import cumi from "./model.json"

const Scene = props => {
  const { useRef, useEffect, useState } = React
  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)

  useEffect(() => {
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    let frameId

    // scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    // cube
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
    })
    const cube = new THREE.Mesh(geometry, material)

    // model
    const model = new THREE.ObjectLoader().parse(cumi)
    model.scale.set(0.2, 0.2, 0.2)
    scene.add(model)

    // texts
    let t3xtTexture = new TextTexture({
      fontFamily: "Org_v01",
      fontSize: 90,
      strokeStyle: "rgba(255,255,255,0)",
      fillStyle: "rgba(100,100,100,0.5)",
      strokeWidth: 1 / 100,
      text:
        "Me siento un millonario\nAunque sea una gotita...\njamás serán vencidas\nun soldado sin segundo",
    })
    let t3xtMaterial = new THREE.MeshBasicMaterial({
      map: t3xtTexture,
      transparent: true,
      side: THREE.DoubleSide,
    })
    let t3xtGeometry = new THREE.PlaneGeometry(8, 4, 0)
    let t3xt = new THREE.Mesh(t3xtGeometry, t3xtMaterial)
    t3xt.position.z = 3
    scene.add(t3xt)

    // lineT3xt
    let lineT3xtTexture = new TextTexture({
      fontFamily: "Org_v01",
      fontSize: 90,
      strokeStyle: "rgba(100,100,100,1)",
      fillStyle: "rgba(255,255,255,0)",
      strokeWidth: 1 / 100,
      text:
        "Me siento un millonario\nAunque sea una gotita...\njamás serán vencidas\nun soldado sin segundo",
    })
    let lineT3xtMaterial = new THREE.MeshBasicMaterial({
      map: lineT3xtTexture,
      transparent: true,
      side: THREE.DoubleSide,
    })
    let lineT3xtGeometry = new THREE.PlaneGeometry(8, 4, 0)
    let lineT3xt = new THREE.Mesh(lineT3xtGeometry, lineT3xtMaterial)
    scene.add(lineT3xt)

    // lights
    const lights = [
      new THREE.PointLight(0xffffff, 1, 0),
      new THREE.PointLight(0xffffff, 1, 0),
      new THREE.PointLight(0xffffff, 1, 0),
    ]
    lights[0].position.set(0, 200, 0)
    lights[1].position.set(100, 200, 100)
    lights[2].position.set(-100, -200, -100)
    scene.add(lights[0])
    scene.add(lights[1])
    scene.add(lights[2])

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor("#eeeeee")
    renderer.setSize(width, height)

    THREE.DefaultLoadingManager.onLoad = function() {
      console.log("Loading Complete!")
    }

    const renderScene = () => {
      renderer.render(scene, camera)
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
      // rotate cube
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

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
      t3xt.material.map.text = props.words
      lineT3xt.material.map.text = props.words

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

      scene.remove(cube)
      geometry.dispose()
      material.dispose()
    }
  }, [])

  useEffect(() => {
    if (isAnimating) {
      controls.current.start()
    } else {
      controls.current.stop()
    }
  }, [isAnimating])

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
      onClick={() => setAnimating(!isAnimating)}
    />
  )
}

export default Scene
