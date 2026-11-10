import * as THREE from 'three';
/**
 * Singapore Traffic System
 * Realistic Singapore traffic: ERP, traffic lights, lane discipline, COE
 */

export class SingaporeTrafficSystem {
    constructor(game) {
        this.game = game;
        this.trafficLights = [];
        this.vehicles = [];
        this.erpGantries = [];
        this.trafficDensity = 1.0;
        this.timeOfDay = 12;
    }

    // Traffic light states
    createTrafficLight(position) {
        const light = {
            position: position.clone(),
            state: 'green', // green, yellow, red
            timer: 0,
            greenDuration: 30,
            yellowDuration: 3,
            redDuration: 25
        };

        // Create visual
        const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);
        const poleMat = new THREE.MeshStandardMaterial({ 
            color: 0x333333, 
            roughness: 0.8, 
            metalness: 0.2 
        });
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.copy(position);
        pole.position.y += 2;
        pole.castShadow = true;
        pole.receiveShadow = true;
        this.game.scene.add(pole);

        const lightGeo = new THREE.SphereGeometry(0.3, 8, 8);
        const lightMat = new THREE.MeshStandardMaterial({ 
            color: 0x00FF00, 
            roughness: 0.5, 
            metalness: 0.0,
            emissive: 0x00FF00,
            emissiveIntensity: 0.5
        });
        const mesh = new THREE.Mesh(lightGeo, lightMat);
        mesh.position.copy(position);
        mesh.position.y += 4;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        light.mesh = mesh;

        this.trafficLights.push(light);
        return light;
    }

    updateTrafficLight(light, delta) {
        light.timer += delta;

        const duration = light.state === 'green' ? light.greenDuration :
                        light.state === 'yellow' ? light.yellowDuration :
                        light.redDuration;

        if (light.timer >= duration) {
            light.timer = 0;
            if (light.state === 'green') light.state = 'yellow';
            else if (light.state === 'yellow') light.state = 'red';
            else light.state = 'green';

            // Update visual
            const colors = { green: 0x00FF00, yellow: 0xFFFF00, red: 0xFF0000 };
            light.mesh.material.color.setHex(colors[light.state]);
        }
    }

    // COE (Certificate of Entitlement) system
    calculateCOE(vehicleType) {
        const coePrices = {
            'car': 80000,
            'motorcycle': 10000,
            'commercial': 60000
        };
        return coePrices[vehicleType] || 50000;
    }

    // Traffic density by time of day
    updateTrafficDensity() {
        const hour = new Date().getHours();
        if (hour >= 7 && hour <= 9) this.trafficDensity = 1.5; // Morning rush
        else if (hour >= 17 && hour <= 19) this.trafficDensity = 1.5; // Evening rush
        else if (hour >= 22 || hour <= 5) this.trafficDensity = 0.3; // Night
        else this.trafficDensity = 1.0;
    }

    // Lane discipline
    enforceLaneDiscipline(vehicle) {
        // Singapore: keep left, no undertaking
        if (vehicle.lane === 'right' && vehicle.speed > 60) {
            // Flash warning
            this.game.showNotification('Traffic', 'Keep left unless overtaking');
        }
    }

    update(delta) {
        for (const light of this.trafficLights) {
            this.updateTrafficLight(light, delta);
        }
        this.updateTrafficDensity();
    }

    destroy() {
        this.trafficLights = [];
        this.vehicles = [];
    }
}

if (typeof window !== 'undefined') {
    window.SingaporeTrafficSystem = SingaporeTrafficSystem;
}