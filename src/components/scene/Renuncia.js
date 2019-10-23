import * as THREE from "three"
import TextTexture from "three.texttexture"
import { useEffect } from "react"
import { useThree } from "../ThreeJSManager/"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const Text = () => {
  const setup = context => {
    const { scene } = context

    let texture = new TextTexture({
      fontFamily: "Org_v01",
      fontSize: 160,
      strokeStyle: "rgba(255,255,255,0)",
      fillStyle: "#eeeeee",
      strokeWidth: 1 / 100,
      text: "#renunciapiñera",
    })

    let material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })

    let geometry = new THREE.PlaneGeometry(60, 60, 60)

    let text = new THREE.Mesh(geometry, material)
    text.position.y = 10

    scene.add(text)

    return text
  }

  const { getEntity, timer } = useThree(setup)

  // useEffect(() => {
  //   const text = getEntity()
  //   text.material.map.text = words
  // }, [words])

  useEffect(() => {
    const text = getEntity()
    const {
      material: {
        map: { image },
      },
    } = text
    text.scale.set(1, image.height / image.width, 1)
    text.position.x = 56 * Math.cos(timer * 0.0008)
    text.position.z = 56 * Math.sin(timer * 0.0008)
    text.rotation.y += 0.001
  }, [timer])

  return null
}

export default Text
