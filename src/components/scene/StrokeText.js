import * as THREE from "three"
import TextTexture from "three.texttexture"
import { useEffect } from "react"
import { useThree } from "../ThreeJSManager/"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const StrokeText = () => {
  const WORDS = gql`
    query Words {
      words @client
    }
  `
  const {
    data: { words },
  } = useQuery(WORDS)
  const setup = context => {
    const { scene } = context

    let texture = new TextTexture({
      fontFamily: "Org_v01",
      fontSize: 160,
      strokeStyle: "#eeeeee",
      fillStyle: "rgba(255,255,255,0)",
      strokeWidth: 1 / 100,
      text: words,
    })

    let material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })

    let geometry = new THREE.PlaneGeometry(480, 480, 480)

    let text = new THREE.Mesh(geometry, material)
    text.position.z = -10
    scene.add(text)

    return text
  }

  const { getEntity, timer } = useThree(setup)

  useEffect(() => {
    const text = getEntity()
    text.material.map.text = words
  }, [words])

  useEffect(() => {
    const text = getEntity()
    const {
      material: {
        map: { image },
      },
    } = text
    text.scale.set(1, image.height / image.width, 1)
    text.position.z = Math.sin(timer * 0.00032) * Math.PI
    const lala = Math.random() * 200
    text.material.map._strokeStyle = `rgba(${lala},0,${lala},${lala})`
  })

  return null
}

export default StrokeText
