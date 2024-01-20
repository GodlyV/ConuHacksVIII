import * as THREE from 'three';


class Rod extends THREE.Mesh {
    constructor() {
        // Define the properties of the rod
        const top_radius = 0.1;
        const botton_radius = 0.1;
        const height = 3;
        const radial_segments = 20;

        // Rod Shape
        const cylinderGeometry = new THREE.CylinderGeometry(top_radius, botton_radius, height, radial_segments);

        // Metal Material
        // const cylinderMaterial = new THREE.MeshNormalMaterial({});
        const cylinderMaterial = new THREE.MeshStandardMaterial({color: '0x808080', roughness: 0.2, metalness: 0.8})
        // const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

        super(cylinderGeometry, cylinderMaterial);

        // Set additional properties, if needed
}
// Functions ?
}

export default Rod;
