import * as THREE from 'three';

class LabeledDoor extends THREE.Group {
    constructor(width = 2, height = 4, depth = 0.1, name = 'Door') {
        super();

        // Create the main door mesh
        const doorGeometry = new THREE.BoxGeometry(width, height, depth);
        //const doorTexture = new THREE.TextureLoader().load('assets/door.png');
        const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x778899 });
        const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);

        const borderWidth = width + 1; // 0.1 units larger for the border
        const borderHeight = height + 1;
        const borderDepth = depth; // Same depth for simplicity
        const borderGeometry = new THREE.BoxGeometry(borderWidth, borderHeight, borderDepth);
        
        // Adjust the color here for a shade of gray
        const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, transparent: true, opacity: 0.5 });
        
        const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
        borderMesh.position.z = -depth * 0.1; // Position border behind the door

        // Create a canvas for the name label
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '50px Arial';
        context.fillStyle = 'white';
        context.fillText(name, 0, 24);

        // Use the canvas as a texture
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const labelSprite = new THREE.Sprite(spriteMaterial);
        labelSprite.position.set(0, height * 0.5 + 0.1, depth); // Position above the door
        labelSprite.scale.set(2, 0.5, 1); // Scale the sprite as needed

        // Add door and border to the group
        this.add(borderMesh);
        this.add(doorMesh);
        this.add(labelSprite);
    }
}

export default LabeledDoor;
