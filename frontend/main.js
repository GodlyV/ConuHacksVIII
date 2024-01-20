import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// helper XYZ coords
const coords = new THREE.AxesHelper(10);
scene.add(coords);

const geometry = new THREE.BoxGeometry();
const material_cube = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material_cube);
scene.add(cube);

camera.position.z = 10;

function animate() {
    /*
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    */
    cube.scale.set(5,5,5); // adjust the scale of the cube
    renderer.render(scene, camera);
}

animate();
