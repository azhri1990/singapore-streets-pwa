import * as THREE from 'three';

export class World {
    constructor(scene) {
        this.scene = scene;
        this.createGround();
        this.createRoads();
        this.createBuildings();
        this.createLandmarks();
        this.createVegetation();
    }
    
    createGround() {
        const groundGeo = new THREE.PlaneGeometry(500, 500);
        const groundMat = new THREE.MeshStandardMaterial({ 
            color: 0x3a5f0b, 
            roughness: 0.9, 
            metalness: 0.0 
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }
    
    createRoads() {
        // Main roads - Singapore style grid with wider roads
        const roadMat = new THREE.MeshStandardMaterial({ 
            color: 0x2a2a2a, 
            roughness: 0.95, 
            metalness: 0.0 
        });
        const lineMat = new THREE.MeshStandardMaterial({ 
            color: 0xFFFF00, 
            roughness: 0.9, 
            metalness: 0.0,
            emissive: 0xFFFF00,
            emissiveIntensity: 0.3
        });
        const whiteLineMat = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF, 
            roughness: 0.9, 
            metalness: 0.0 
        });
        
        // Create road network
        const roads = [
            { pos: [0, 0.01, 0], rot: 0, w: 12, h: 500 },
            { pos: [30, 0.01, 0], rot: 0, w: 12, h: 500 },
            { pos: [-30, 0.01, 0], rot: 0, w: 12, h: 500 },
            { pos: [0, 0.01, 30], rot: Math.PI/2, w: 12, h: 500 },
            { pos: [0, 0.01, -30], rot: Math.PI/2, w: 12, h: 500 },
            { pos: [15, 0.01, 15], rot: 0, w: 10, h: 200 },
            { pos: [-15, 0.01, 15], rot: Math.PI/2, w: 10, h: 200 },
        ];
        
        roads.forEach(r => {
            const geo = new THREE.PlaneGeometry(r.w, r.h);
            const mesh = new THREE.Mesh(geo, roadMat);
            mesh.rotation.x = -Math.PI / 2;
            mesh.rotation.z = r.rot;
            mesh.position.set(r.pos[0], r.pos[1], r.pos[2]);
            mesh.receiveShadow = true;
            this.scene.add(mesh);
            
            // Center line
            const lineGeo = new THREE.PlaneGeometry(0.3, r.h);
            const line = new THREE.Mesh(lineGeo, lineMat);
            line.rotation.x = -Math.PI / 2;
            line.rotation.z = r.rot;
            line.position.set(r.pos[0], 0.015, r.pos[2]);
            this.scene.add(line);
        });
        
        // Pedestrian crossings
        for (let i = -90; i <= 90; i += 30) {
            for (let j = -2; j <= 2; j++) {
                if (j % 2 === 0) {
                    const crossGeo = new THREE.PlaneGeometry(3, 1);
                    const cross = new THREE.Mesh(crossGeo, whiteLineMat);
                    cross.rotation.x = -Math.PI / 2;
                    cross.position.set(i, 0.016, j * 6);
                    this.scene.add(cross);
                }
            }
        }
    }
    
    createBuildings() {
        // Singapore style HDB blocks, shophouses, condos
        const buildingMaterials = [
            new THREE.MeshStandardMaterial({ color: 0xD2691E, roughness: 0.7, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ color: 0xCD853F, roughness: 0.7, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.7, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ color: 0xA0522D, roughness: 0.7, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ color: 0xBC8F8F, roughness: 0.7, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ color: 0xDEB887, roughness: 0.7, metalness: 0.1 }),
        ];
        
        const windowMat = new THREE.MeshStandardMaterial({ 
            color: 0x87CEEB, 
            roughness: 0.2, 
            metalness: 0.0,
            transparent: true,
            opacity: 0.7 
         });
        
        // HDB blocks
        for (let x = -80; x <= 80; x += 40) {
            for (let z = -80; z <= 80; z += 40) {
                if (Math.abs(x) < 10 || Math.abs(z) < 10) continue;
                if ((Math.abs(x + 15) < 5 && Math.abs(z) < 5) || (Math.abs(z + 15) < 5 && Math.abs(x) < 5)) continue;
                
                const height = 15 + Math.random() * 25;
                const width = 12 + Math.random() * 6;
                const depth = 12 + Math.random() * 6;
                
                const geo = new THREE.BoxGeometry(width, height, depth);
                const mat = buildingMaterials[Math.floor(Math.random() * buildingMaterials.length)];
                const building = new THREE.Mesh(geo, mat);
                building.position.set(x + (Math.random()-0.5)*10, height/2, z + (Math.random()-0.5)*10);
                building.castShadow = true;
                building.receiveShadow = true;
                this.scene.add(building);
                
                // Add windows
                for (let i = -width/3; i <= width/3; i += width/4) {
                    for (let j = 2; j < height-2; j += 3) {
                        const winGeo = new THREE.PlaneGeometry(1.5, 2);
                        const win = new THREE.Mesh(winGeo, windowMat);
                        win.position.set(building.position.x + i, j, building.position.z + depth/2 + 0.01);
                        this.scene.add(win);
                    }
                }
                
                // Laundry poles on HDB
                if (height > 20) {
                    for (let i = 0; i < 2; i++) {
                        const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 2);
                        const poleMat = new THREE.MeshStandardMaterial({
                            color: 0x666666,
                            roughness: 0.8,
                            metalness: 0.1
                        });
                        const pole = new THREE.Mesh(poleGeo, poleMat);
                        pole.castShadow = true;
                        pole.receiveShadow = true;
                        pole.position.set(building.position.x + (i-0.5)*width, height + 1, building.position.z + depth/2);
                        this.scene.add(pole);
                    }
                }
            }
        }
        
        // Shophouses along main roads
        for (let x = -25; x <= 25; x += 8) {
            if (Math.abs(x) < 3) continue;
            const height = 8;
            const geo = new THREE.BoxGeometry(6, height, 4);
            const mat = new THREE.MeshStandardMaterial({ 
                color: 0xF5DEB3, 
                roughness: 0.7, 
                metalness: 0.0 
            });
            const shop = new THREE.Mesh(geo, mat);
            shop.position.set(x, height/2, 18);
            shop.castShadow = true;
            shop.receiveShadow = true;
            this.scene.add(shop);
            
            // Shop sign
            const signGeo = new THREE.PlaneGeometry(5, 1);
            const signMat = new THREE.MeshStandardMaterial({ 
                color: 0xFF0000, 
                roughness: 0.9, 
                metalness: 0.0 
            });
            const sign = new THREE.Mesh(signGeo, signMat);
            sign.castShadow = true;
            sign.receiveShadow = true;
            sign.position.set(x, height - 1, 18 + 2.01);
            this.scene.add(sign);
        }
    }
    
    createLandmarks() {
        // HDB void deck pillars style
        // Marina Bay style skyscraper
        const mbsGeo = new THREE.CylinderGeometry(3, 4, 40, 8);
        const mbsMat = new THREE.MeshStandardMaterial({ 
            color: 0xB0C4DE, 
            roughness: 0.7, 
            metalness: 0.1 
        });
        const mbs = new THREE.Mesh(mbsGeo, mbsMat);
        mbs.castShadow = true;
        mbs.receiveShadow = true;
        mbs.position.set(60, 20, -60);
        this.scene.add(mbs);
        
        // SkyPark
        const parkGeo = new THREE.BoxGeometry(20, 2, 8);
        const parkMat = new THREE.MeshStandardMaterial({ 
            color: 0xD3D3D3, 
            roughness: 0.8, 
            metalness: 0.0 
        });
        const park = new THREE.Mesh(parkGeo, parkMat);
        park.castShadow = true;
        park.receiveShadow = true;
        park.position.set(60, 35, -60);
        this.scene.add(park);
        
        // Supertree Grove style
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const treeGeo = new THREE.CylinderGeometry(0.3, 1.5, 12, 6);
            const treeMat = new THREE.MeshStandardMaterial({ 
                color: 0x654321, 
                roughness: 0.8, 
                metalness: 0.0 
            });
            const tree = new THREE.Mesh(treeGeo, treeMat);
            tree.castShadow = true;
            tree.receiveShadow = true;
            tree.position.set(60 + Math.cos(angle)*15, 6, -60 + Math.sin(angle)*15);
            this.scene.add(tree);
            
            const crownGeo = new THREE.SphereGeometry(4, 8, 6);
            const crownMat = new THREE.MeshStandardMaterial({ 
                color: 0x228B22, 
                roughness: 0.7, 
                metalness: 0.0 
            });
            const crown = new THREE.Mesh(crownGeo, crownMat);
            crown.castShadow = true;
            crown.receiveShadow = true;
            crown.position.set(tree.position.x, tree.position.y + 6, tree.position.z);
            this.scene.add(crown);
        }
    }
    
    createVegetation() {
        const treeMat = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, 
            roughness: 0.9, 
            metalness: 0.0 
        });
        const leafMat = new THREE.MeshStandardMaterial({ 
            color: 0x228B22, 
            roughness: 0.8, 
            metalness: 0.0 
        });
        
        for (let i = 0; i < 200; i++) {
            const x = (Math.random() - 0.5) * 400;
            const z = (Math.random() - 0.5) * 400;
            if (Math.abs(x) < 40 && Math.abs(z) < 40) continue;
            if (Math.sqrt(x*x + z*z) < 20) continue;
            
            const trunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 3);
            const trunk = new THREE.Mesh(trunkGeo, treeMat);
            trunk.castShadow = true;
            trunk.receiveShadow = true;
            trunk.position.set(x, 1.5, z);
            this.scene.add(trunk);
            
            const leavesGeo = new THREE.SphereGeometry(2, 6, 4);
            const leaves = new THREE.Mesh(leavesGeo, leafMat);
            leaves.castShadow = true;
            leaves.receiveShadow = true;
            leaves.position.set(x, 4, z);
            this.scene.add(leaves);
        }
        
        // Palm trees near roads
        for (let i = 0; i < 30; i++) {
            const x = (Math.random() - 0.5) * 150;
            const z = (Math.random() - 0.5) * 150;
            if (Math.abs(x % 30) < 5 && Math.abs(z % 30) < 5) continue;
            
            const trunkGeo = new THREE.CylinderGeometry(0.15, 0.2, 5);
            const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.9, metalness: 0.0 });
            const trunk = new THREE.Mesh(trunkGeo, trunkMat);
            trunk.castShadow = true;
            trunk.receiveShadow = true;
            trunk.position.set(x, 2.5, z);
            trunk.rotation.x = (Math.random() - 0.5) * 0.1;
            trunk.rotation.z = (Math.random() - 0.5) * 0.1;
            this.scene.add(trunk);
            
            const frondGeo = new THREE.ConeGeometry(1.5, 3, 6);
            const frondMat = new THREE.MeshStandardMaterial({ color: 0x32CD32, roughness: 0.8, metalness: 0.0 });
            const frond = new THREE.Mesh(frondGeo, frondMat);
            frond.castShadow = true;
            frond.receiveShadow = true;
            frond.position.set(x, 5, z);
            frond.rotation.x = Math.PI;
            this.scene.add(frond);
        }
    }
}
