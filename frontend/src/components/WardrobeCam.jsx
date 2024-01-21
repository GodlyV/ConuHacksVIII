    import * as THREE from 'three';
    import React, { useEffect, useRef, useState } from 'react';
    import { Raycaster } from 'three';

    // DELETE LATER

    import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
    import WardrobeDivider from '../classes/WardrobeDivider.jsx';
    import Door from '../classes/Door.jsx';
    import Rod from '../classes/Rod.jsx';
    import LabeledDoor from '../classes/LabeledDoor.jsx';
    import Drawer from '../classes/Drawer.jsx';

    const WardrobeCam = () => {
        const refContainer = useRef(null);
        // Variables Width, Height, Depth
        const [width, setWidth] = useState(3);
        const [heigth, setHeigth] = useState(4);
        const [depth, setDepth] = useState(1);
        const [materialThickness, setMaterialThickness] = useState(0.25);
        const [doors,setDoors] = useState([])
        const draggableDoors = useRef([])
        const [dividers, setDividers] = useState([]); // Array to store divider clones
        const draggableDividers = useRef([]); // Ref to store draggable objects
        const draggableRods = useRef([])
        const initialDividerRef = useRef(null); // Ref to store the initial divider
        const [rods,setRods] = useState([])
        const initialRodRef = useRef(null)
        
        const initScene = (refContainer) => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, refContainer.current.clientWidth / refContainer.current.clientHeight, 0.1, 1000);
            camera.position.z = 10;
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(refContainer.current.clientWidth, refContainer.current.clientHeight);
            renderer.setClearColor(0xFFFFFF);
            refContainer.current.appendChild(renderer.domElement);

            // const controls = new MapControls(camera, renderer.domElement); // DELETE
        
            return { scene, camera, renderer };
        };

        const createWardrobe = (scene) => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);

            const material_cube = new THREE.MeshStandardMaterial({ color: 0xEA9999 });
            const wardrobe_base = new THREE.Mesh(geometry, material_cube);
            wardrobe_base.scale.set(width, materialThickness, depth); // Adjust the scale of the cube
            wardrobe_base.position.set(0,0,0); // move the wardrobe so that the front of it is at z=0
            scene.add(wardrobe_base);

            const wardrobe_base_top = wardrobe_base.clone();
            wardrobe_base_top.position.set(0, heigth - materialThickness/2, 0);
            scene.add(wardrobe_base_top);

            const material_cube0 = new THREE.MeshStandardMaterial({ color: 0xF9CB9C });
            const wardrobe_back = new THREE.Mesh(geometry, material_cube0);
            wardrobe_back.scale.set(width, materialThickness, heigth); // Adjust the scale of the cube
            wardrobe_back.rotation.x = Math.PI / 2;
            wardrobe_back.position.set(0, heigth/2 -materialThickness/2, -depth/2 + materialThickness/2); // move the wardrobe so that the front of it is at z=0
            scene.add(wardrobe_back);


            const material_cube1 = new THREE.MeshStandardMaterial({ color: 0xFFE599 });
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

            return [ wardrobe_base, wardrobe_base_top, wardrobe_back, wardrobe_side_r, wardrobe_side_l ];
        };

        const createDivider = (scene) => {
            const divider = new WardrobeDivider();
            divider.position.set(1, -4, 0); // Adjust position as needed
            scene.add(divider);
            return divider;
        };
 
        const createDoor = (scene) => {
            const door = new Door();
            door.position.set(2, 0, width/2 + 0.05); // Adjust position as needed
             // Adjust position as needed
            scene.add(door);
            return door;
        };

        const createRod = (scene) => {
            const rod = new Rod();
            rod.rotation.z = Math.PI / 2;
            rod.position.set(5, -5, 0); // Adjust position as needed
            scene.add(rod);
            return rod;
        };

        const createDrawer = (scene) => {
            const drawer = new Drawer();
            drawer.position.set(0, 1, 0); // Adjust position as needed
            scene.add(drawer);
            return drawer;
        };

        useEffect(() => {
            if (!refContainer.current) return;
        
            const { scene, camera, renderer } = initScene(refContainer);
        
            const coords = new THREE.AxesHelper(10);
            scene.add(coords);

            const raycaster = new Raycaster();
            const mouse = new THREE.Vector2();
            
            const wardrobe = createWardrobe(scene);
            // const door = createDoor(scene);
            // const divider = createWardrobeDivider(scene);
            // const rod = createRod(scene);
            // const drawer = createDrawer(scene);

            const light = new THREE.PointLight( 0xffffff, 100, 100 );
            light.position.set( 5, 5, 5);
            scene.add( light );
                    
            // Set up drag controls
            const dragControls = new DragControls([], camera, renderer.domElement);
            // ... drag controls event listeners ...
            // const wardrobe = createWardrobe(scene);

            const myLabeledDoor = new LabeledDoor(2, 4, 0.1, 'My Door');
            myLabeledDoor.position.set(-10, -4, 0);
            scene.add(myLabeledDoor);

            
            const initialRod = createRod(scene);
            initialRod.visible = true; // The initial rod is always visible
            
            // Create a clone of the initial rod but make it invisible and not draggable initially
            const templateRod = createDraggableRod(scene);
            templateRod.visible = false;
            
            // draggableRods only contains the initial rod initially
            draggableRods.current = [initialRod];
            const rodDragControls = new DragControls(draggableRods.current, camera, renderer.domElement);
            
            rodDragControls.addEventListener('dragstart', event => {
                // Clone the initial divider and make it the target of the drag
                const rodClone = templateRod.clone();
                rodClone.visible = true;
                scene.add(rodClone);
                setDividers(prevClone => [...prevClone, rodClone]);

                // Replace the target of the drag to the clone
                event.object = rodClone;
                draggableDividers.current.push(rodClone);
                
            });
            const initialDivider = createDivider(scene);
            initialDivider.visible = true; // Make sure the initial divider is visible
    
            const templateDivider = createDraggableDivider(scene);
            templateDivider.visible = false;
            
            draggableDividers.current = [initialDivider];
            const dividerDragControls = new DragControls(draggableDividers.current, camera, renderer.domElement);

        
            dividerDragControls.addEventListener('dragstart', event => {
                // Clone the initial divider and make it the target of the drag
                const dividerClone = templateDivider.clone();
                dividerClone.visible = true;
                scene.add(dividerClone);
                setDividers(prevDividers => [...prevDividers, dividerClone]);
    
                // Replace the target of the drag to the clone
                event.object = dividerClone;
                draggableDividers.current.push(dividerClone);

            });
                
            dividerDragControls.addEventListener('dragend', event => {
                // You can add any additional logic needed when drag ends
            });
        
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

            const handleMouseDown = (event) => {
                // Calculate mouse coordinates
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                // Set up the raycaster
                raycaster.setFromCamera(mouse, camera);

                // Check for intersections
                const intersects = raycaster.intersectObjects(scene.children, true);
                for (const intersect of intersects) {
                    if (wardrobe.includes(intersect.object)) {
                        console.log('Selected the wardrobe!');
                        const selectedMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
                        const originalMaterial = intersect.object.material;
                        intersect.object.material = selectedMaterial;

                        const handleMouseUp = () => {
                            console.log('Mouse up - Reverting to original material');
                            intersect.object.material = originalMaterial;

                             window.removeEventListener('mouseup', handleMouseUp);
                        };
                        window.addEventListener('mouseup', handleMouseUp);
                        break;
                    }
                }
            };
            window.addEventListener('mousedown', handleMouseDown);
        
            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousedown', handleMouseDown);
                dragControls.dispose();
                dividerDragControls.dispose();
                renderer.dispose();

                // wardrobe.dispose();

                // Dispose of the draggable mesh
                scene.remove(myLabeledDoor);

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

        return (
            <div ref={refContainer} style={{ width: '75vw', height: '75vh' }}>
                <button onClick={sendDividersData}>Save</button>
            </div>
        );
    };

    const sendDividersData = () => {
        const dividerDataArray = Array.from(dividers).map(divider => {
            // Create a simple object with relevant data
            return {
                position: divider.position.toArray(),
                dimensions: [divider.geometry.parameters.width, divider.geometry.parameters.height, divider.geometry.parameters.depth],
                // Include other properties you need, like material properties
            };
        });

        // Here you would send this data to a server or another component
        console.log(dividerDataArray); // For demonstration
    };


    function createDraggableDivider(scene) {
        const width = 0.1;  // Divider thickness
        const height = 2.5; // Divider height
        const depth = 1;    // Divider depth
        const geometry = new THREE.BoxGeometry(width, height, depth);

        // Simple color material (adjust as needed)
        const material = new THREE.MeshBasicMaterial({ color: 0x778899 }); // Light Slate Gray

        const divider = new THREE.Mesh(geometry, material);
        divider.position.set(1, -4, 0); // Set at the bottom of the scene
        scene.add(divider);
        return divider;
    }
    
    function createDraggableDoor(scene) {
        const width = 2;   // Default width to 2 if not provided
        const height = 4; // Default height to 4 if not provided
        const depth = 0.1; // Default depth to 0.1 if not provided

        const geometry = new THREE.BoxGeometry(width, height, depth);
        const textureLoader = new THREE.TextureLoader();
        
        // Assuming the texture is in the 'public/assets' directory
        // const texture = textureLoader.load('assets/door.png');
        const material = new THREE.MeshBasicMaterial({ color: 0x778899 }); // Light Slate Gray
        const door = new THREE.Mesh(geometry,material)
        door.position.set(1, -4, 0); // Set at the bottom of the scene
        scene.add(door);
        return door;
    }
    function createDraggableRod(scene) {
        const top_radius = 0.1;
        const botton_radius = 0.1;
        const height = 3;
        const radial_segments = 20;
        const cylinderGeometry = new THREE.CylinderGeometry(top_radius, botton_radius, height, radial_segments);

        // Metal Material
        // const cylinderMaterial = new THREE.MeshNormalMaterial({});
        const cylinderMaterial = new THREE.MeshStandardMaterial({color: '0x808080', roughness: 0.2, metalness: 0.8})
        const rod = new THREE.Mesh(cylinderGeometry,cylinderMaterial)
        rod.rotation.z = Math.PI / 2;
        rod.position.set(5, -5, 0);
        return rod;
    }
    export default WardrobeCam;
