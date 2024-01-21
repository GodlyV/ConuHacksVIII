import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Raycaster, Vector2 } from 'three';

const WardrobeCam = () => {
    const refContainer = useRef(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // Set camera position
        camera.position.set(-3, 5, 10);
        camera.lookAt(0, 0, 0);

        const raycaster = new Raycaster();
        const mouse = new Vector2();
        
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xcfe2f3);
        document.body.appendChild(renderer.domElement);
        
        // helper XYZ coords
        const coords = new THREE.AxesHelper(10);
        coords.position.set(0, 0.05, 0);
        scene.add(coords);
        
        const geometry = new THREE.BoxGeometry();
        const material_cube = new THREE.MeshBasicMaterial({ color: 0xede2d0 });
        const cubeFloor = new THREE.Mesh(geometry, material_cube);
        scene.add(cubeFloor);

        const material_cube_wall = new THREE.MeshBasicMaterial({ color: 0xd5cbbb });
        const cubeWall1 = new THREE.Mesh(geometry, material_cube_wall);
        scene.add(cubeWall1);
        const cubeWall2 = new THREE.Mesh(geometry, material_cube_wall);
        scene.add(cubeWall2);

        //grid xz
        var gridXZ = new THREE.GridHelper(10, 10);
        gridXZ.position.set(0,0,0);
        scene.add(gridXZ);
        
        function animate() {
            cubeFloor.scale.set(10,0.25,10); // adjust the scale of the cube
            cubeFloor.position.set(0, -0.25, 0); // adjust the scale of the cube

            cubeWall1.scale.set(10,5,0.25); // adjust the scale of the cube
            cubeWall1.position.set(0, 2.5, -5.25); // adjust the scale of the cube

            cubeWall2.scale.set(0.25,5,10); // adjust the scale of the cube
            cubeWall2.position.set(5.25, 2.5, 0); // adjust the scale of the cube

            renderer.render(scene, camera);
        }
        
        renderer.setAnimationLoop(animate);
        
        window.addEventListener('resize', function() {
            camera.aspect = this.window.innerWidth / this.window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(this.window.innerWidth, this.window.innerHeight);
        });
      animate();
      
    }, []);
    return (
      <div ref={refContainer}></div>
  
    );
}
export default WardrobeCam;