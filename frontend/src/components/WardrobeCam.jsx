import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WardrobeCam = () => {
    const refContainer = useRef(null);

    useEffect(() => {
        // Check if the refContainer is available
        if (!refContainer.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, refContainer.current.clientWidth / refContainer.current.clientHeight, 0.1, 1000);
        camera.position.z = 10;
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(refContainer.current.clientWidth, refContainer.current.clientHeight);
        refContainer.current.appendChild(renderer.domElement);

        // Axes Helper
        const coords = new THREE.AxesHelper(10);
        scene.add(coords);

        // Mouse position
        const mouse_pos = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        // Box Geometry
        const geometry = new THREE.BoxGeometry();
        const material_cube = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const cube = new THREE.Mesh(geometry, material_cube);
        scene.add(cube);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            // You might want to uncomment these for rotation
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            cube.scale.set(5, 5, 5); // Adjust the scale of the cube
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = refContainer.current.clientWidth / refContainer.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(refContainer.current.clientWidth, refContainer.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Clean up on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            refContainer.current.removeChild(renderer.domElement);
            // Additional clean up like disposing geometries, materials, etc.
            geometry.dispose();
            material_cube.dispose();
        };
    }, []);

    return <div ref={refContainer} style={{ width: '100vw', height: '100vh' }} />;
};

export default WardrobeCam;
