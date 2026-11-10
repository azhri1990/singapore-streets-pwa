import * as THREE from 'three';

export class RoadSigns {
    constructor(scene) {
        this.scene = scene;
        this.createSigns();
    }
    
    createSigns() {
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8, metalness: 0.2 });
        const signMat = new THREE.MeshStandardMaterial({ color: 0x0000FF, roughness: 0.7, metalness: 0.0 });
        const warningMat = new THREE.MeshStandardMaterial({ color: 0xFFA500, roughness: 0.7, metalness: 0.0 });
        
        // Speed limit signs
        for (let i = 0; i < 10; i++) {
            const x = (i - 5) * 40;
            const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 4);
            const pole = new THREE.Mesh(poleGeo, poleMat);
            pole.castShadow = true;
            pole.receiveShadow = true;
            pole.position.set(x + 6, 2, -6);
            this.scene.add(pole);
            
            const signGeo = new THREE.CircleGeometry(0.4, 32);
            const sign = new THREE.Mesh(signGeo, signMat);
            sign.castShadow = true;
            sign.receiveShadow = true;
            sign.position.set(x + 6, 3.5, -5.95);
            this.scene.add(sign);
            
            const textGeo = new THREE.PlaneGeometry(0.6, 0.6);
            const textMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.9, metalness: 0.0 });
            const text = new THREE.Mesh(textGeo, textMat);
            text.position.set(x + 6, 3.5, -5.94);
            this.scene.add(text);
        }
        
        // Direction signs
        const dirGeo = new THREE.PlaneGeometry(2, 0.8);
        const dirMat = new THREE.MeshStandardMaterial({ color: 0x006400, roughness: 0.7, metalness: 0.0 });
        for (let i = 0; i < 5; i++) {
            const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 5);
            const pole = new THREE.Mesh(poleGeo, poleMat);
            pole.castShadow = true;
            pole.receiveShadow = true;
            pole.position.set(-6, 2.5, i * 30 - 60);
            this.scene.add(pole);
            
            const sign = new THREE.Mesh(dirGeo, dirMat);
            sign.castShadow = true;
            sign.receiveShadow = true;
            sign.position.set(-6, 4.5, i * 30 - 60 + 0.01);
            this.scene.add(sign);
        }
    }
}
