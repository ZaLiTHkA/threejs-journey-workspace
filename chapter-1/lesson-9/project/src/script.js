import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { GUI } from 'lil-gui'

/**
 * Debug GUI
 */
const gui = new GUI({
  width: 400,
  title: 'Cube Debug Panel',
  // or call '.close()' on each folder after creation
  closeFolders: true,
})

// hide the debug panel by default, then toggle it with a keystroke
gui.hide()
window.addEventListener('keydown', e => {
  if (e.key === 'h') {
    gui.show(gui._hidden)
  }
})

const cubeValues = {
  color: '#552376',
  spin: () => {
    console.warn('not implemented yet..')
  },
  subdivisions: 2,
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  // passing in the color string using a variable reference allows the colour to be changed outside ThreeJS
  color: cubeValues.color,
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Object manipulation GUI controls
 */

const cubeTweaks = gui.addFolder('cube tweaks')
const cubeActions = gui.addFolder('cube actions')

// cube elevation - 'y' is a number internally, so this creates a numeric input field ('up' increments, 'down' decrements
// cubeTweaks.add(mesh.position, 'y')

// cube elevation - set a 'min', 'max' and 'step' to make this show a range slider
// cubeTweaks.add(mesh.position, 'y', -3, 3, 0.01)

// cube elevation - alternative API for range slider
cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')

// cube visibility - 'visible' property is a boolean internally, so this creates a checkbox
cubeTweaks.add(mesh, 'visible')

// cube material - use 'wireframe' style
cubeTweaks.add(material, 'wireframe')

// cube material - allowing colour change and logging the CSS-friendly HEX string on change
// cubeTweaks.addColor(material, 'color').onChange(value => {
//   console.log('material colour is changing:', value.getHexString())
// })

// cube material - change the colour variable that the ThreeJS material uses, then apply it to the material.
cubeTweaks.addColor(cubeValues, 'color').onChange(value => {
  console.log('material colour changing...')
}).onFinishChange(value => {
  console.log('material colour changed:', value)
  material.color.set(value)
})

// cube interaction - rotate the cube one full 360 on click
cubeValues.spin = () => {
  console.log('spinning cube...')
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 2,
  })
}
cubeActions.add(cubeValues, 'spin')

// cube geometry - adjust the cube segment counts
cubeTweaks.add(cubeValues, 'subdivisions', 1, 10, 1).onChange(value => {
  console.log('subdivisions changing...')
}).onFinishChange(value => {
  console.log('subdivisions changed:', value)

  // first remove the current geometry
  mesh.geometry.dispose()

  // then recalculate and assign the replacement geometry
  mesh.geometry = new THREE.BoxGeometry(1, 1, 1, value, value, value)
})

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
