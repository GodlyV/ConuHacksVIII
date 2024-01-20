    import React, { useEffect, useRef } from 'react';
    import * as THREE from 'three';
    import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
    import Door from '../classes/Door.jsx';

    const WardrobeCam = () => {
        const refContainer = useRef(null);
        const initScene = (refContainer) => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, refContainer.current.clientWidth / refContainer.current.clientHeight, 0.1, 1000);
            camera.position.z = 10;
        
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(refContainer.current.clientWidth, refContainer.current.clientHeight);
            refContainer.current.appendChild(renderer.domElement);
        
            return { scene, camera, renderer };
        };

        const createDraggableMesh = (scene) => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            return mesh;
        };
        
        const createDoor = (scene) => {
            const door = new Door();
            door.position.set(10, 10, 10);
            scene.add(door);
            return door;
        };
        useEffect(() => {
            if (!refContainer.current) return;
        
            const { scene, camera, renderer } = initScene(refContainer);
        
            const coords = new THREE.AxesHelper(10);
            scene.add(coords);
        
            const draggableMesh = createDraggableMesh(scene);
            createDoor(scene);
        
            // Set up drag controls
            const dragControls = new DragControls([draggableMesh], camera, renderer.domElement);
            // ... drag controls event listeners ...
        
            const animate = () => {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };
            animate();
        
            const handleResize = () => {
                camera.aspect = refContainer.current.clientWidth / refContainer.current.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(refContainer.current.clientWidth, refContainer.current.clientHeight);
            };
            window.addEventListener('resize', handleResize);
        
            return () => {
                window.removeEventListener('resize', handleResize);
                dragControls.dispose();
                renderer.dispose();


                // Dispose of the draggable mesh
                scene.remove(draggableMesh);
                draggableMesh.geometry.dispose();
                draggableMesh.material.dispose();

                        // Remove other objects from the scene and dispose of their resources
                // Example for a generic object added to the scene
                scene.children.forEach(child => {
                    scene.remove(child);
                    if (child.geometry) {
                        child.geometry.dispose();
                    }
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(material => material.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                });
                // Dispose of the renderer and remove it from the DOM
                renderer.dispose();
                if (refContainer.current) {
                    refContainer.current.removeChild(renderer.domElement);
                }
            };
        }, []);

        return <div ref={refContainer} style={{ width: '100vw', height: '100vh' }} />;
    };

    export default WardrobeCam;
