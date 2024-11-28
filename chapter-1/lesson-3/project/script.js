import * as THREE from "three";

console.log("start first three.js project");
// console.debug(THREE);

// Define Canvas
const canvas = document.querySelector("canvas.render-frame");
console.log(canvas);

// Define Scene
const scene = new THREE.Scene();

// Define Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Define Constants
const renderSize = {
  width: 800, // window.innerWidth,
  height: 600, // window.innerHeight,
};

// Define Camera
const camFov = 75;
const camAspect = renderSize.width / renderSize.height;
const camera = new THREE.PerspectiveCamera(camFov, camAspect);
camera.position.z = 3;
scene.add(camera);

// Define Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(renderSize.width, renderSize.height);

// Render the scene
renderer.render(scene, camera);
