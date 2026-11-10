import * as THREE from 'three';

export class VehicleManager {
    constructor(scene) {
        this.scene = scene;
        this.vehicles = [];
        this.inVehicle = false;
        this.currentVehicle = null;
        this.createVehicles();
        this.setupEvents();
    }
    
    createVehicles() {
        // Singapore style cars - taxis, MPVs, sedans
        const carColors = [0xFFFF00, 0xFFFFFF, 0x000000, 0x0000FF, 0xFF0000, 0x808080, 0x008000];
        const positions = [
            [5, 0.5, 5], [-10, 0.5, -5], [15, 0.5, -15], [-25, 0.5, 10],
            [35, 0.5, 25], [-35, 0.5, -25]
        ];
        
        positions.forEach((pos, i) => {
            const group = new THREE.Group();
            
            // Car body
            const bodyGeo = new THREE.BoxGeometry(4, 1.2, 2);
            const bodyMat = new THREE.MeshStandardMaterial({ 
                color: i === 0 ? 0xFFFF00 : carColors[Math.floor(Math.random() * carColors.length)], 
                roughness: 0.7, 
                metalness: 0.1 
            });
            const body = new THREE.Mesh(bodyGeo, bodyMat);
            body.position.y = 0.8;
            body.castShadow = true;
            body.receiveShadow = true;
            group.add(body);
            
            // Taxi sign
            if (i === 0) {
                const signGeo = new THREE.BoxGeometry(1.5, 0.3, 0.1);
                const signMat = new THREE.MeshStandardMaterial({ 
                    color: 0x000000, 
                    roughness: 0.9, 
                    metalness: 0.0 
                });
                const sign = new THREE.Mesh(signGeo, signMat);
                sign.position.set(0, 1.5, 0);
                sign.castShadow = true;
                sign.receiveShadow = true;
                group.add(sign);
            }
            
            // Windows
            const windowMat = new THREE.MeshStandardMaterial({ 
                color: 0x87CEEB, 
                roughness: 0.2, 
                metalness: 0.0,
                transparent: true,
                opacity: 0.6
            });
            const windshieldGeo = new THREE.PlaneGeometry(3.5, 0.8);
            const windshield = new THREE.Mesh(windshieldGeo, windowMat);
            windshield.position.set(0, 1.0, 1.01);
            group.add(windshield);
            
            // Wheels
            const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
            const wheelMat = new THREE.MeshStandardMaterial({ 
                color: 0x111111, 
                roughness: 0.8, 
                metalness: 0.5 
            });
            const wheelPositions = [[-1.2, 0.4, 1.1], [1.2, 0.4, 1.1], [-1.2, 0.4, -1.1], [1.2, 0.4, -1.1]];
            
            wheelPositions.forEach(wp => {
                const wheel = new THREE.Mesh(wheelGeo, wheelMat);
                wheel.rotation.x = Math.PI / 2;
                wheel.position.set(wp[0], wp[1], wp[2]);
                group.add(wheel);
            });
            
            group.position.set(pos[0], pos[1], pos[2]);
            group.userData = { type: 'vehicle', speed: 0, maxSpeed: 30, acceleration: 20, brakes: 40 };
            this.scene.add(group);
            this.vehicles.push(group);
        });
    }
    
    setupEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'KeyE') {
                // Simple toggle - in a real game would check distance
                this.inVehicle = !this.inVehicle;
                const speedo = document.getElementById('speedometer');
                if (this.inVehicle) {
                    speedo.style.display = 'block';
                    speedo.textContent = '0 km/h';
                } else {
                    speedo.style.display = 'none';
                }
            }
        });
    }
    
    update(delta) {
        if (this.inVehicle && this.vehicles[0]) {
            const vehicle = this.vehicles[0];
            const keys = {};
            // We'd need to track keys - simplified
            if (vehicle.userData.speed < vehicle.userData.maxSpeed) {
                vehicle.userData.speed += vehicle.userData.acceleration * delta;
            }
            vehicle.translateZ(vehicle.userData.speed * delta);
            document.getElementById('speedometer').textContent = Math.round(vehicle.userData.speed * 3.6) + ' km/h';
        }
    }
}
