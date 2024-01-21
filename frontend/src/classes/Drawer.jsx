import * as THREE from 'three';


class Drawer extends THREE.Mesh {
    constructor() {
        // Define the properties of the rod
        const width = 2.2;
        const height = 0.5;
        const depth = 3;

        // Rod Shape
        const drawerGeometry = new THREE.BoxGeometry(width, height, depth);

        // Metal Material
        // const cylinderMaterial = new THREE.MeshNormalMaterial({});
        const drawerMaterial = new THREE.MeshStandardMaterial({color: 0x665542})
        // const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

        super(drawerGeometry, drawerMaterial);

        // Create the handle geometry
        const handleRadius = 0.05;
        const handleHeight = 0.8;
        const handleGeometry = new THREE.CylinderGeometry(handleRadius, handleRadius, handleHeight, 16);
        
        // Handle material
        const handleMaterial = new THREE.MeshStandardMaterial({color: '#E1C16E', roughness: 0.2, metalness: 0.8})
        
        // Create the handle mesh
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        
        // Position the handle relative to the drawer
        handle.position.set(0,0,depth/2);
        handle.rotation.z = Math.PI / 2;
        // Add the handle to the drawer
        this.position.set(8, -5, 0); // Adjust position as needed

        this.add(handle);

}
// Functions ?
}

export default Drawer;
