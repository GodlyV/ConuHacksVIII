import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// helper XYZ coords
const coords = new THREE.AxesHelper(10);
scene.add(coords);

// get mouse location
const mouse_pos = new THREE.Vector2(); // mouse pos on screen
const intersection_point = new THREE.Vector3(); // get mouse point in plane
const plane_normal = new THREE.Vector3(); // get what plane normal is ( which direction are we resizing )

const plane = new THREE.Plane();
const raycaster = new THREE.Raycaster();

window.addEventListener('mousemove', function(e)  {
    mouse_pos.x = (e.clientX / window.innerWidth);
    mouse_pos.y = -(e.clientY / window.innerHeight);

    console.log(mouse_pos);
});

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

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
});
