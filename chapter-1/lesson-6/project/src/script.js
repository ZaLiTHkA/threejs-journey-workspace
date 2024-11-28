import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Cursor tracking
 */
const cursor = {
  x: 0,
  y: 0
};
window.addEventListener('mousemove', event => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
  // console.log(cursor);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
  width: 800,
  height: 600
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const renderCutoff = {
  near: 0.1,
  far: 100
};
const aspect = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspect, renderCutoff.near, renderCutoff.far);
// const camera = new THREE.OrthographicCamera(-1 * aspect, aspect, 1, -1, renderCutoff.near, renderCutoff.far);

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// configure orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime();

  // // Update objects
  // mesh.rotation.y = elapsedTime;

  // // rotate camera around cube based on mouse position, turning to face it on each frame
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * Math.PI;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * Math.PI;
  // camera.position.y = cursor.y * -5;
  // camera.lookAt(mesh.position);

  // update orbit control here, so the animation eases out after releasing the mouse button
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
