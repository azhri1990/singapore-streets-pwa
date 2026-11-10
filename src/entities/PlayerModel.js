import * as THREE from 'three';

export class PlayerModel {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.createModel();
    }
    
    createModel() {
        // Based on reference - casual Singaporean youth style
        const skinMat = new THREE.MeshStandardMaterial({ color: 0xD2691E, roughness: 0.9, metalness: 0.0 });
        const shirtMat = new THREE.MeshStandardMaterial({ color: 0x4169E1, roughness: 0.7, metalness: 0.1 });
        const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8, metalness: 0.1 });
        const hairMat = new THREE.MeshStandardMaterial({ color: 0x2F1B14, roughness: 0.8, metalness: 0.0 });
        const shoeMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.9, metalness: 0.2 });
        
        // Head
        const headGeo = new THREE.SphereGeometry(0.15, 16, 16);
        const head = new THREE.Mesh(headGeo, skinMat);
        head.position.y = 1.7;
        head.castShadow = true;
        this.group.add(head);
        
        // Hair
        const hairGeo = new THREE.SphereGeometry(0.16, 16, 8, 0, Math.PI * 2, 0, Math.PI/2);
        const hair = new THREE.Mesh(hairGeo, hairMat);
        hair.position.y = 1.75;
        hair.rotation.x = -Math.PI/6;
        this.group.add(hair);
        
        // Body
        const bodyGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.5, 12);
        const body = new THREE.Mesh(bodyGeo, shirtMat);
        body.position.y = 1.4;
        body.castShadow = true;
        this.group.add(body);
        
        // Arms
        const armGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
        const leftArm = new THREE.Mesh(armGeo, skinMat);
        leftArm.position.set(-0.18, 1.4, 0);
        leftArm.rotation.z = 0.2;
        this.group.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeo, skinMat);
        rightArm.position.set(0.18, 1.4, 0);
        rightArm.rotation.z = -0.2;
        this.group.add(rightArm);
        
        // Legs
        const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8);
        const leftLeg = new THREE.Mesh(legGeo, pantsMat);
        leftLeg.position.set(-0.08, 1.0, 0);
        this.group.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeo, pantsMat);
        rightLeg.position.set(0.08, 1.0, 0);
        this.group.add(rightLeg);
        
        // Shoes
        const shoeGeo = new THREE.BoxGeometry(0.12, 0.08, 0.15);
        const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
        leftShoe.position.set(-0.08, 0.75, 0.03);
        this.group.add(leftShoe);
        
        const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
        rightShoe.position.set(0.08, 0.75, 0.03);
        this.group.add(rightShoe);
        
        this.group.position.y = 0;
        this.scene.add(this.group);
    }
}
