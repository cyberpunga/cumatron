import * as THREE from "three"
import OrbitControlsDefault from "three-orbit-controls"
import { useEffect } from "react"
import { useThree } from "../ThreeJSManager/"

const OrbitControls = OrbitControlsDefault(THREE)

const CameraControls = () => {
  const setup = ({ camera, canvas }) => {
    const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true
    // controls.dampingFactor = 0.12
    // controls.rotateSpeed = 0.08
    // controls.autoRotate = true
    // controls.autoRotateSpeed = 0.08
    // controls.maxPolarAngle = Math.PI / 2
    controls.enableKeys = false
    // controls.update();

    controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.01 // friction
    controls.rotateSpeed = 0.01 // mouse sensitivity
    // controls.autoRotate = true
    controls.autoRotateSpeed = 0.02
    controls.enableZoom = true
    controls.screenSpacePanning = false
    controls.minDistance = 10
    controls.maxDistance = 480
    controls.maxPolarAngle = Math.PI
    return controls
  }

  const { getEntity } = useThree(setup)

  useEffect(() => {
    const controls = getEntity()
    controls.update() // required for damping effect
  })

  return null
}

export default CameraControls
