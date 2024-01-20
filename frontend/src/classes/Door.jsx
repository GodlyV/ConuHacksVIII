import * as THREE from 'three';


class Door extends THREE.Mesh {
    constructor() {
        // Define the size of the door
        const width = 2;
        const height = 4;
        const depth = 0.1;
        const geometry = new THREE.BoxGeometry(width, height, depth);

        // Load a texture for the door (e.g., wood texture)
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('path_to_texture.jpg'); // Replace with path to your texture
        const material = new THREE.MeshBasicMaterial({ map: texture });

        super(geometry, material);

        // Set additional properties, if needed
        this.position.set(0, height / 2, 0); // Positioning the door base at y = 0
    }

    // You can add custom methods if needed
}

export default Door;