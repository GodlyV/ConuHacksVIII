import * as THREE from 'three';

class Door extends THREE.Mesh {
    constructor(width, height, depth) {
        // Use the provided dimensions or default values if none are provided
        width = width || 2;   // Default width to 2 if not provided
        height = height || 4; // Default height to 4 if not provided
        depth = depth || 0.1; // Default depth to 0.1 if not provided

        const geometry = new THREE.BoxGeometry(width, height, depth);
        const textureLoader = new THREE.TextureLoader();
        
        // Assuming the texture is in the 'public/assets' directory
        // const texture = textureLoader.load('assets/door.png');
        const material = new THREE.MeshBasicMaterial({ color: 0x778899 }); // Light Slate Gray

        super(geometry, material);
        this.position.set(0, height / 2, 0);
    }
}

export default Door;
