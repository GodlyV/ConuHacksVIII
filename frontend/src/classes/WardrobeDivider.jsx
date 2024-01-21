import * as THREE from 'three';

class WardrobeDivider extends THREE.Mesh {
    constructor() {
        // Define the size of the divider
        const width = 0.1;  // Divider thickness
        const height = 2.5; // Divider height
        const depth = 1;    // Divider depth
        const geometry = new THREE.BoxGeometry(width, height, depth);

        // Simple color material (adjust as needed)
        const material = new THREE.MeshStandardMaterial({ color: 0x778899 }); // Light Slate Gray

        super(geometry, material);

        // Set additional properties, if needed
        
        this.position.set(-1, -5, 0); // Positioning the divider base at y = 0
    }

    // You can add custom methods specific to the wardrobe divider if needed
}

export default WardrobeDivider;