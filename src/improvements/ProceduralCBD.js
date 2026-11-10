import * as THREE from 'three';

/**
 * Procedural CBD Skyscraper Generator
 * Based on jeromeetienne/threex.proceduralcity
 * Optimized for Singapore Marina Bay skyline
 */

export class ProceduralCBD {
    static createMarinaBaySkyline(position = new THREE.Vector3(0, 0, 0), count = 50) {
        const group = new THREE.Group();
        
        // Singapore CBD building colors - glass and steel
        const buildingColors = [
            0x1a2a3a, 0x2a3a4a, 0x3a4a5a, 0x4a5a6a,
            0x1e5a8a, 0x2e6a9a, 0x3e7aaa, 0x4e8aba,
            0x2c3e50, 0x34495e, 0x415a77
        ];
        
        for (let i = 0; i < count; i++) {
            // Random position in CBD area
            const x = (Math.random() - 0.5) * 300;
            const z = (Math.random() - 0.5) * 300;
            
            // Skyscraper proportions - Singapore style
            const width = 15 + Math.random() * 25;
            const depth = 15 + Math.random() * 25;
            const height = 80 + Math.random() * 200; // 80-280m skyscrapers
            
            // Create building
            const building = this.createSkyscraper(width, height, depth, buildingColors);
            building.position.set(x, height/2, z);
            group.add(building);
        }
        
        group.position.copy(position);
        return group;
    }
    
    static createSkyscraper(width, height, depth, colors) {
        const group = new THREE.Group();
        
        // Main tower
        const color = colors[Math.floor(Math.random() * colors.length)];
        const mainMat = new THREE.MeshStandardMaterial({ 
            color, 
            roughness: 0.7, 
            metalness: 0.1, 
            envMapIntensity: 1.0 
        });
        
        // Create building with setbacks (Singapore skyscrapers often have setbacks)
        const floors = Math.floor(height / 4);
        
        for (let floor = 0; floor < floors; floor++) {
            const floorHeight = 4;
            const floorY = floor * floorHeight + floorHeight/2;
            
            // Setback - buildings get smaller at higher floors
            const setback = floor / floors * 0.3;
            const currentWidth = width * (1 - setback);
            const currentDepth = depth * (1 - setback);
            
            const geo = new THREE.BoxGeometry(currentWidth, floorHeight, currentDepth);
            const mesh = new THREE.Mesh(geo, mainMat);
            mesh.position.y = floorY;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            group.add(mesh);
            
            // Windows
            if (floor > 0 && floor % 2 === 0) {
                this.addWindowsToFloor(group, currentWidth, currentDepth, floorY);
            }
        }
        
        // Rooftop
        const roofGeo = new THREE.BoxGeometry(width * 0.8, 2, depth * 0.8);
        const roofMat = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a1a, 
            roughness: 0.8, 
            metalness: 0.0 
        });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = height - 1;
        group.add(roof);
        
        return group;
    }
    
    static addWindowsToFloor(group, width, depth, y) {
        const windowMat = new THREE.MeshStandardMaterial({ 
            color: 0x87CEEB, 
            transparent: true, 
            opacity: 0.6,
            roughness: 0.3,
            metalness: 0.2,
            envMapIntensity: 1.5
        });
        
        const windowSize = 0.8;
        const spacing = 1.5;
        
        // Front facade
        const windowsPerRow = Math.floor(width / spacing);
        for (let i = 0; i < windowsPerRow; i++) {
            const x = (i - windowsPerRow/2) * spacing + spacing/2;
            const windowGeo = new THREE.PlaneGeometry(windowSize, windowSize);
            const windowMesh = new THREE.Mesh(windowGeo, windowMat);
            windowMesh.position.set(x, y, depth/2 + 0.01);
            windowMesh.rotation.y = -Math.PI/2;
            group.add(windowMesh);
        }
        
        // Side facade
        const windowsSide = Math.floor(depth / spacing);
        for (let i = 0; i < windowsSide; i++) {
            const z = (i - windowsSide/2) * spacing + spacing/2;
            const windowGeo = new THREE.PlaneGeometry(windowSize, windowSize);
            const windowMesh = new THREE.Mesh(windowGeo, windowMat);
            windowMesh.position.set(width/2 + 0.01, y, z);
            group.add(windowMesh);
        }
    }
    
    static createSupertrees(position = new THREE.Vector3(0, 0, 0)) {
        const group = new THREE.Group();
        
        // Gardens by the Bay Supertrees
        for (let i = 0; i < 10; i++) {
            const x = (i - 4.5) * 15;
            const supertree = this.createSupertree();
            supertree.position.set(x, 0, 0);
            group.add(supertree);
        }
        
        group.position.copy(position);
        return group;
    }
    
    static createSupertree() {
        const group = new THREE.Group();
        
        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(1.5, 2, 30);
        const trunkMat = new THREE.MeshStandardMaterial({ 
            color: 0x333333, 
            roughness: 0.6, 
            metalness: 0.1 
        });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 15;
        group.add(trunk);
        
        // Canopy - leaf-like structure
        const canopyGeo = new THREE.IcosahedronGeometry(12, 1);
        const canopyMat = new THREE.MeshStandardMaterial({ 
            color: 0x228B22, 
            roughness: 0.5, 
            metalness: 0.3 
        });
        const canopy = new THREE.Mesh(canopyGeo, canopyMat);
        canopy.position.y = 30;
        group.add(canopy);
        
        // LED lights
        for (let i = 0; i < 20; i++) {
            const lightGeo = new THREE.SphereGeometry(0.3);
            const lightMat = new THREE.MeshStandardMaterial({ 
                color: new THREE.Color().setHSL(Math.random(), 1, 0.6),
                emissive: new THREE.Color().setHSL(Math.random(), 0.8, 0.4),
                emissiveIntensity: 2.0,
                roughness: 0.5,
                metalness: 0.0
            });
            const light = new THREE.Mesh(lightGeo, lightMat);
            const angle = (i / 20) * Math.PI * 2;
            light.position.set(
                Math.cos(angle) * 10,
                25 + Math.random() * 5,
                Math.sin(angle) * 10
            );
            group.add(light);
        }
        
        return group;
    }
}
