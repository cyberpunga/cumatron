import * as THREE from "three"
import { useEffect } from "react"
import { useThree } from "../ThreeJSManager/"
import cumi from "./model.json"
import { useApolloClient } from "@apollo/react-hooks"

const Cumi = () => {
  const client = useApolloClient()

  THREE.DefaultLoadingManager.onLoad = () => {
    console.log("Loading complete!")
    client.writeData({ data: { isLoaded: true } })
  }

  const setup = context => {
    const { scene } = context
    const model = new THREE.ObjectLoader().parse(cumi)
    model.scale.set(2, 2, 2)
    // model.position.y = 50
    scene.add(model)

    return model
  }

  const { getEntity, timer } = useThree(setup)

  useEffect(() => {
    const model = getEntity()
    // model rotation
    model.rotation.y += 0.08
    model.rotation.x += 0.04
    // model translation
    model.position.x = 56 * Math.cos(timer * 0.0008)
    model.position.z = 56 * Math.sin(timer * 0.0008)
    // model doors
    const doorA = model.children[1]
    const doorB = model.children[3]
    doorA.rotation.y = (Math.sin(timer * 0.0032) * Math.PI) / 2 - 5
    doorB.rotation.y = (Math.sin(timer * 0.0024) * Math.PI) / 2 - 5
  }, [timer])

  return null
}

export default Cumi
