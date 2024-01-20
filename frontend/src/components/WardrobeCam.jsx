    import * as THREE from 'three';
    import React, { useEffect, useRef, useState } from 'react';


    import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
    import WardrobeDivider from '../classes/WardrobeDivider.jsx';
    import Door from '../classes/Door.jsx';
    import Rod from '../classes/Rod.jsx';

    const WardrobeCam = () => {
        const refContainer = useRef(null);
        // Variables Width, Height, Depth
        const [width, setWidth] = useState(3);
        const [heigth, setHeigth] = useState(4);
        const [depth, setDepth] = useState(1);
        const [materialThickness, setMaterialThickness] = useState(0.25);
        
        const initScene = (refContainer) => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, refContainer.current.clientWidth / refContainer.current.clientHeight, 0.1, 1000);
            camera.position.z = 10;
        
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(refContainer.current.clientWidth, refContainer.current.clientHeight);
            refContainer.current.appendChild(renderer.domElement);
        
            return { scene, camera, renderer };
        };

        const createWardrobe = (scene) => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);

            const material_cube = new THREE.MeshBasicMaterial({ color: 0xEA9999 });
            const wardrobe_base = new THREE.Mesh(geometry, material_cube);
            wardrobe_base.scale.set(width, materialThickness, depth); // Adjust the scale of the cube
            wardrobe_base.position.set(0,0,0); // move the wardrobe so that the front of it is at z=0
            scene.add(wardrobe_base);

            const wardrobe_base_top = wardrobe_base.clone();
            wardrobe_base_top.position.set(0, heigth - materialThickness/2, 0);
            scene.add(wardrobe_base_top);

            const material_cube0 = new THREE.MeshBasicMaterial({ color: 0xF9CB9C });
            const wardrobe_back = new THREE.Mesh(geometry, material_cube0);
            wardrobe_back.scale.set(width, materialThickness, heigth); // Adjust the scale of the cube
            wardrobe_back.rotation.x = Math.PI / 2;
            wardrobe_back.position.set(0, heigth/2 -materialThickness/2, -depth/2 + materialThickness/2); // move the wardrobe so that the front of it is at z=0
            scene.add(wardrobe_back);


            const material_cube1 = new THREE.MeshBasicMaterial({ color: 0xFFE599 });
            const wardrobe_side = new THREE.Mesh(geometry, material_cube1);
            wardrobe_side.scale.set(heigth, materialThickness, depth); // Adjust the scale of the cube

            const wardrobe_side_r = wardrobe_side.clone();
            wardrobe_side_r.rotation.z = Math.PI / 2;
            wardrobe_side_r.position.set(width/2 - materialThickness/2, heigth/2 - materialThickness/2, 0); // move the wardrobe so that the front of it is at z=0
            scene.add(wardrobe_side_r);

            const wardrobe_side_l = wardrobe_side.clone();
            wardrobe_side_l.rotation.z = Math.PI / 2;
            wardrobe_side_l.position.set(-width/2 + materialThickness/2, heigth/2 - materialThickness/2, 0); // move the wardrobe so that the front of it is at z=0
            scene.add(wardrobe_side_l);

            return { wardrobe_base, wardrobe_base_top, wardrobe_back, wardrobe_side_r, wardrobe_side_l };
        };

        const createWardrobeDivider = (scene) => {
            const divider = new WardrobeDivider();
            divider.position.set(2, 0, 0); // Adjust position as needed
            scene.add(divider);
            return divider;
        };

        const createDoor = (scene) => {
            const door = new Door();
            door.position.set(2, 0, 0); // Adjust position as needed
            scene.add(door);
            return door;
        };

        const createRod = (scene) => {
            const rod = new Rod();
            rod.rotation.z = Math.PI / 2;
            rod.position.set(0, 3, 0); // Adjust position as needed
            scene.add(rod);
            return rod;
        };

        useEffect(() => {
            if (!refContainer.current) return;
        
            const { scene, camera, renderer } = initScene(refContainer);
        
            const coords = new THREE.AxesHelper(10);
            scene.add(coords);
            
            const wardrobe = createWardrobe(scene);
            const door = createDoor(scene);
            const divider = createWardrobeDivider(scene);
            const rod = createRod(scene);
        
            // Set up drag controls
            const dragControls = new DragControls([door,divider,rod], camera, renderer.domElement);
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
                scene.remove(door);
                door.geometry.dispose();
                door.material.dispose();

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
