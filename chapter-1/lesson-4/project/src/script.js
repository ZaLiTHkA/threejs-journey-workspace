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
const group = new THREE.Group();
group.position.set(0.7, -0.6, 1);
// NOTE: "rotation" happens around the object axes, applied in the order XYZ.
group.rotation.set(0, Math.PI * 0.25, 0);
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0x00ff00})
);
cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: 0x0000ff})
);
cube3.position.x = 2;
group.add(cube3);

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
camera.lookAt(group.position);
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
console.log("group distance from center:", group.position.length());
console.log("camera distance from group:", camera.position.distanceTo(group.position));
