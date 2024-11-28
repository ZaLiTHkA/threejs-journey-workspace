import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Axes helper
// NOTE: the [r,g,b] colours in the helper axes match verbatim to the [x,y,z] scene axes.
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0.7, -0.6, 1);
mesh.scale.set(2, 0.5, 0.5);
scene.add(mesh);

// NOTE: using "rotation" happens around the object axes, applied in the order XYZ.
//  "quaternion" is another option for controlling rotation, but this course hasn't got that far yet...
//  for FPS game-like "head rotation" mechanics, we must change this to apply the Y-axis rotation first.
mesh.rotation.reorder('YXZ');
mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(1, 1, 5);
camera.lookAt(mesh.position);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// some random debugging output
console.log("cube distance from center:", mesh.position.length());
console.log("camera distance from cube:", camera.position.distanceTo(mesh.position));
