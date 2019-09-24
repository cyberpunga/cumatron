import * as THREE from "three"

export const getCamera = ({ offsetWidth, offsetHeight }) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    offsetWidth / offsetHeight,
    0.1,
    1000
  )
  camera.position.set(50, 0, 0)

  return camera
}

export const getRenderer = canvas => {
  const context = canvas.getContext("webgl")
  const renderer = new THREE.WebGLRenderer({
    canvas,
    context,
  })

  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  return renderer
}

export const getScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xcccccc)
  // scene.fog = new THREE.FogExp2(0xcccccc, 0.002)

  const light = new THREE.SpotLight(0xffffff, 1, 750, 1)
  light.position.set(50, 200, 0)
  light.rotation.z = (90 * Math.PI) / 180
  scene.add(light)

  return scene
}
