import * as THREE from 'three';

export class SingaporeDetails {
    constructor(scene) {
        this.scene = scene;
        this.createTrafficLights();
        this.createBusStops();
        this.createERPGantry();
        this.createHDBVoidDeck();
    }
    
    createTrafficLights() {
        const poleMat = new THREE.MeshStandardMaterial({ 
            color: 0x333333, 
            roughness: 0.8, 
            metalness: 0.2 
        });
        const redMat = new THREE.MeshStandardMaterial({
            color: 0xFF0000, 
            roughness: 0.5, 
            metalness: 0.0,
            emissive: 0xFF0000,
            emissiveIntensity: 0.5
        });
        const yellowMat = new THREE.MeshStandardMaterial({
            color: 0xFFA500, 
            roughness: 0.5, 
            metalness: 0.0,
            emissive: 0xFFA500,
            emissiveIntensity: 0.5
        });
        const greenMat = new THREE.MeshStandardMaterial({
            color: 0x00FF00, 
            roughness: 0.5, 
            metalness: 0.0,
            emissive: 0x00FF00,
            emissiveIntensity: 0.5
        });
        
        const intersections = [[0,0], [30,0], [-30,0], [0,30], [0,-30]];
        intersections.forEach(pos => {
            const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, 6);
            const pole = new THREE.Mesh(poleGeo, poleMat);
            pole.castShadow = true;
            pole.receiveShadow = true;
            pole.position.set(pos[0] + 8, 3, pos[1] + 8);
            this.scene.add(pole);
            
            const boxGeo = new THREE.BoxGeometry(0.4, 1.2, 0.3);
            const boxMat = new THREE.MeshStandardMaterial({ 
                color: 0x222222, 
                roughness: 0.7, 
                metalness: 0.1 
            });
            const box = new THREE.Mesh(boxGeo, boxMat);
            box.castShadow = true;
            box.receiveShadow = true;
            box.position.set(pos[0] + 8, 5.5, pos[1] + 8);
            this.scene.add(box);
            
            [redMat, yellowMat, greenMat].forEach((mat, i) => {
                const lightGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16);
                const light = new THREE.Mesh(lightGeo, mat);
                light.rotation.x = Math.PI / 2;
                light.position.set(pos[0] + 8, 5.8 - i * 0.3, pos[1] + 8.16);
                this.scene.add(light);
            });
        });
    }
    
    createBusStops() {
        const shelterMat = new THREE.MeshStandardMaterial({
            color: 0x4169E1, 
            roughness: 0.7, 
            metalness: 0.2 
        });
        const poleMat = new THREE.MeshStandardMaterial({
            color: 0x333333, 
            roughness: 0.8, 
            metalness: 0.2 
        });
        
        for (let x = -20; x <= 20; x += 40) {
            const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 3);
            const pole1 = new THREE.Mesh(poleGeo, poleMat);
            pole1.castShadow = true;
            pole1.receiveShadow = true;
            pole1.position.set(x + 7, 1.5, 18);
            this.scene.add(pole1);
            
            const pole2 = new THREE.Mesh(poleGeo, poleMat);
            pole2.castShadow = true;
            pole2.receiveShadow = true;
            pole2.position.set(x - 1, 1.5, 18);
            this.scene.add(pole2);
            
            const roofGeo = new THREE.BoxGeometry(9, 0.1, 2.5);
            const roof = new THREE.Mesh(roofGeo, shelterMat);
            roof.castShadow = true;
            roof.receiveShadow = true;
            roof.position.set(x + 3, 3, 18);
            this.scene.add(roof);
            
            // Bus stop sign
            const signGeo = new THREE.PlaneGeometry(2, 1);
            const signMat = new THREE.MeshStandardMaterial({
                color: 0xFF0000, 
                roughness: 0.9, 
                metalness: 0.0 
            });
            const sign = new THREE.Mesh(signGeo, signMat);
            sign.castShadow = true;
            sign.receiveShadow = true;
            sign.position.set(x + 3, 2, 18 - 1.26);
            this.scene.add(sign);
        }
    }
    
    createERPGantry() {
        // Electronic Road Pricing gantry - common in Singapore
        const frameMat = new THREE.MeshStandardMaterial({
            color: 0x666666, 
            roughness: 0.7, 
            metalness: 0.2 
        });
        const beamGeo = new THREE.BoxGeometry(16, 0.8, 0.3);
        const beam = new THREE.Mesh(beamGeo, frameMat);
        beam.castShadow = true;
        beam.receiveShadow = true;
        beam.position.set(0, 5, -15);
        this.scene.add(beam);
        
        const poleGeo = new THREE.CylinderGeometry(0.3, 0.3, 5);
        const pole1 = new THREE.Mesh(poleGeo, frameMat);
        pole1.castShadow = true;
        pole1.receiveShadow = true;
        pole1.position.set(-7, 2.5, -15);
        this.scene.add(pole1);
        
        const pole2 = new THREE.Mesh(poleGeo, frameMat);
        pole2.castShadow = true;
        pole2.receiveShadow = true;
        pole2.position.set(7, 2.5, -15);
        this.scene.add(pole2);
        
        // ERP unit
        const unitGeo = new THREE.BoxGeometry(2, 0.6, 0.4);
        const unitMat = new THREE.MeshStandardMaterial({
            color: 0xFFFF00, 
            roughness: 0.5, 
            metalness: 0.0,
            emissive: 0xFFFF00,
            emissiveIntensity: 0.5
        });
        const unit = new THREE.Mesh(unitGeo, unitMat);
        unit.castShadow = true;
        unit.receiveShadow = true;
        unit.position.set(0, 5, -15);
        this.scene.add(unit);
    }
    
    createHDBVoidDeck() {
        // Void deck area under HDB
        for (let x = -40; x <= 40; x += 40) {
            for (let z = -40; z <= 40; z += 40) {
                if (Math.abs(x) < 10 || Math.abs(z) < 10) continue;
                const voidGeo = new THREE.PlaneGeometry(14, 14);
                const voidMat = new THREE.MeshStandardMaterial({
                    color: 0xCCCCCC, 
                    roughness: 0.7, 
                    metalness: 0.1 
                });
                const voidDeck = new THREE.Mesh(voidGeo, voidMat);
                voidDeck.rotation.x = -Math.PI / 2;
                voidDeck.castShadow = true;
                voidDeck.receiveShadow = true;
                voidDeck.position.set(x + (Math.random()-0.5)*5, 0.012, z + (Math.random()-0.5)*5);
                this.scene.add(voidDeck);
                
                // Pillars
                const pillarGeo = new THREE.CylinderGeometry(0.3, 0.3, 3);
                const pillarMat = new THREE.MeshStandardMaterial({
                    color: 0xAAAAAA, 
                    roughness: 0.8, 
                    metalness: 0.0 
                });
                [[-5,-5],[5,-5],[-5,5],[5,5]].forEach(([px,pz]) => {
                    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
                    pillar.castShadow = true;
                    pillar.receiveShadow = true;
                    pillar.position.set(x + (Math.random()-0.5)*5 + px*0.5, 1.5, z + (Math.random()-0.5)*5 + pz*0.5);
                    this.scene.add(pillar);
                });
            }
        }
    }
}
