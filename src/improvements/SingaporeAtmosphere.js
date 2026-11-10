import * as THREE from 'three';

// Singapore-specific atmosphere and environmental effects
export class SingaporeAtmosphere {
    constructor(scene) {
        this.scene = scene;
        this.humidity = 0.85; // Singapore is humid
        this.temperature = 30; // Average 30°C
    }
    
    setupLighting() {
        // Tropical sun - harsh, bright
        const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x8B7355, 0.8);
        this.scene.add(hemiLight);
        
        // Sun with tropical intensity
        const dirLight = new THREE.DirectionalLight(0xFFF5E6, 1.3);
        dirLight.position.set(60, 100, 60);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 4096;
        dirLight.shadow.mapSize.height = 4096;
        dirLight.shadow.camera.left = -80;
        dirLight.shadow.camera.right = 80;
        dirLight.shadow.camera.top = 80;
        dirLight.shadow.camera.bottom = -80;
        this.scene.add(dirLight);
        
        // Ambient for humidity haze
        const ambient = new THREE.AmbientLight(0xE8F4F8, 0.4);
        this.scene.add(ambient);
    }
    
    createHumidityHaze() {
        // Fog for tropical humidity
        this.scene.fog = new THREE.FogExp2(0x87CEEB, 0.02);
    }
    
    createRainEffect(rainIntensity = 0.3) {
        // Singapore's frequent rain showers
        const rainCount = 1000;
        const rainGeo = new THREE.BufferGeometry();
        const rainPositions = new Float32Array(rainCount * 3);
        const rainSpeeds = new Float32Array(rainCount);
        
        for (let i = 0; i < rainCount; i++) {
            rainPositions[i * 3] = (Math.random() - 0.5) * 400;
            rainPositions[i * 3 + 1] = Math.random() * 100 + 50;
            rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 400;
            rainSpeeds[i] = 20 + Math.random() * 30;
        }
        
        rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
        rainGeo.setAttribute('speed', new THREE.BufferAttribute(rainSpeeds, 1));
        
        const rainMat = new THREE.PointsMaterial({
            color: 0x888888,
            size: 0.1,
            transparent: true,
            opacity: 0.6
        });
        
        const rain = new THREE.Points(rainGeo, rainMat);
        this.scene.add(rain);
        
        // Update loop
        return {
            update: (delta) => {
                const positions = rainGeo.attributes.position.array;
                for (let i = 0; i < rainCount; i++) {
                    positions[i * 3 + 1] -= rainSpeeds[i] * delta;
                    if (positions[i * 3 + 1] < 0) {
                        positions[i * 3 + 1] = Math.random() * 100 + 50;
                        positions[i * 3] = (Math.random() - 0.5) * 400;
                        positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
                    }
                }
                rainGeo.attributes.position.needsUpdate = true;
            }
        };
    }
    
    createGreenery() {
        // Singapore is the Garden City - lots of vegetation
        const treeMat = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.8, metalness: 0.0 });
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9, metalness: 0.0 });
        
        // Create more lush vegetation
        for (let i = 0; i < 300; i++) {
            const x = (Math.random() - 0.5) * 600;
            const z = (Math.random() - 0.5) * 600;
            if (Math.abs(x) < 40 && Math.abs(z) < 40) continue;
            
            // Tropical trees - taller
            const trunkGeo = new THREE.CylinderGeometry(0.25, 0.35, 5);
            const trunk = new THREE.Mesh(trunkGeo, trunkMat);
            trunk.castShadow = true;
            trunk.receiveShadow = true;
            trunk.position.set(x, 2.5, z);
            this.scene.add(trunk);
            
            const leavesGeo = new THREE.SphereGeometry(3, 8, 6);
            const leaves = new THREE.Mesh(leavesGeo, treeMat);
            leaves.castShadow = true;
            leaves.receiveShadow = true;
            leaves.position.set(x, 5, z);
            this.scene.add(leaves);
        }
    }
    
    createRoadMarkings() {
        // Singapore-style road markings
        const lineMat = new THREE.MeshStandardMaterial({ color: 0xFFFF00, roughness: 0.9, metalness: 0.0, emissive: 0xFFFF00, emissiveIntensity: 0.3 });
        const zebraMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.9, metalness: 0.0 });
        
        // Add more realistic road markings
        return {
            addZebraCrossing: (x, z, length = 15) => {
                for (let i = -length/2; i < length/2; i += 2.5) {
                    const rectGeo = new THREE.PlaneGeometry(2.5, 1);
                    const rect = new THREE.Mesh(rectGeo, zebraMat);
                    rect.rotation.x = -Math.PI/2;
                    rect.position.set(x + i, 0.016, z);
                    this.scene.add(rect);
                }
            }
        };
    }
}
