import * as THREE from 'three';

// Singapore-specific vehicle configurations
export const SingaporeVehicleTypes = {
    // Yellow Taxis - iconic Singapore cabs
    singaporeTaxi: {
        maxSpeed: 28,
        accel: 10.5,
        grip: 5.2,
        turn: 2.2,
        hp: 245,
        length: 4.5,
        width: 1.9,
        colors: [0xFFFF00, 0xFFD700, 0xFFED00],
        cab: true,
        isTaxi: true
    },
    
    // MPV / Family vehicles
    mpv: {
        maxSpeed: 26,
        accel: 9.5,
        grip: 5.8,
        turn: 1.9,
        hp: 320,
        length: 4.8,
        width: 1.95,
        colors: [0xFFFFFF, 0xC0C0C0, 0x000080, 0x008000],
        isMPV: true
    },
    
    // Compact cars
    compact: {
        maxSpeed: 32,
        accel: 12,
        grip: 4.8,
        turn: 2.3,
        hp: 220,
        length: 4.2,
        width: 1.8,
        colors: [0xFFFFFF, 0xFF0000, 0x0000FF, 0x808080, 0x000000]
    },
    
    // Police car - Singapore Police Force
    singaporePolice: {
        maxSpeed: 35,
        accel: 13.5,
        grip: 5.0,
        turn: 2.4,
        hp: 280,
        length: 4.6,
        width: 1.95,
        colors: [0xFFFFFF],
        isPolice: true,
        police: true
    },
    
    // Ambulance
    singaporeAmbulance: {
        maxSpeed: 27,
        accel: 8.5,
        grip: 5.6,
        turn: 1.8,
        hp: 335,
        length: 5.3,
        width: 2.15,
        colors: [0xFFFFFF],
        isAmbulance: true
    },
    
    // Bus (SBS Transit style)
    cityBus: {
        maxSpeed: 22,
        accel: 6.5,
        grip: 6.5,
        turn: 1.4,
        hp: 600,
        length: 12.0,
        width: 2.5,
        colors: [0xFFFFFF, 0xFF0000, 0x000080],
        isBus: true
    },
    
    // Motorcycle (common)
    singaporeMotorcycle: {
        maxSpeed: 48,
        accel: 22,
        grip: 2.9,
        turn: 3.2,
        hp: 180,
        length: 2.1,
        width: 0.7,
        colors: [0x000000, 0xFF0000, 0xFFFFFF, 0x000080],
        bike: true
    }
};

export class SingaporeVehicleFactory {
    static createVehicle(type, position, rotation) {
        const spec = SingaporeVehicleTypes[type];
        if (!spec) throw new Error(`Unknown vehicle type: ${type}`);
        
        const group = new THREE.Group();
        
        // Car body based on vehicle type
        const bodyGeo = new THREE.BoxGeometry(spec.length, 1.4, spec.width);
        const color = spec.colors[Math.floor(Math.random() * spec.colors.length)];
        const bodyMat = new THREE.MeshStandardMaterial({ 
            color, 
            roughness: 0.7, 
            metalness: 0.1 
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 0.7;
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);
        
        // Windows
        const windowMat = new THREE.MeshStandardMaterial({ 
            color: 0x87CEEB, 
            roughness: 0.2, 
            metalness: 0.0,
            transparent: true,
            opacity: 0.6 
        });
        const windshieldGeo = new THREE.PlaneGeometry(spec.length * 0.8, 0.8);
        const windshield = new THREE.Mesh(windshieldGeo, windowMat);
        windshield.position.set(0, 1.0, spec.width/2 + 0.01);
        group.add(windshield);
        
        // Wheels
        const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16);
        const wheelMat = new THREE.MeshStandardMaterial({ 
            color: 0x111111, 
            roughness: 0.8, 
            metalness: 0.5 
        });
        const wheelPositions = [
            [-spec.length/2 + 0.5, 0.35, spec.width/2 + 0.05],
            [spec.length/2 - 0.5, 0.35, spec.width/2 + 0.05],
            [-spec.length/2 + 0.5, 0.35, -spec.width/2 - 0.05],
            [spec.length/2 - 0.5, 0.35, -spec.width/2 - 0.05]
        ];
        
        wheelPositions.forEach(wp => {
            const wheel = new THREE.Mesh(wheelGeo, wheelMat);
            wheel.rotation.x = Math.PI / 2;
            wheel.position.set(wp[0], wp[1], wp[2]);
            group.add(wheel);
        });
        
        // Singapore-specific features
        if (type === 'singaporeTaxi') {
            // Taxi sign on top
            const signGeo = new THREE.BoxGeometry(1.2, 0.2, 0.1);
            const signMat = new THREE.MeshStandardMaterial({ 
                color: 0x000000, 
                roughness: 0.9, 
                metalness: 0.0 
            });
            const sign = new THREE.Mesh(signGeo, signMat);
            sign.position.set(0, 1.6, 0);
            sign.castShadow = true;
            sign.receiveShadow = true;
            group.add(sign);
            
            // Roof light
            const lightGeo = new THREE.BoxGeometry(1.0, 0.15, 1.0);
            const lightMat = new THREE.MeshStandardMaterial({ 
                color: 0xFFFF00, 
                roughness: 0.5, 
                metalness: 0.0,
                emissive: 0xFFFF00,
                emissiveIntensity: 0.5
            });
            const light = new THREE.Mesh(lightGeo, lightMat);
            light.position.set(0, 1.7, 0);
            light.castShadow = true;
            light.receiveShadow = true;
            group.add(light);
        }
        
        if (type === 'singaporePolice') {
            // Police lights
            const lightGeo = new THREE.BoxGeometry(0.5, 0.1, 0.3);
            const redLight = new THREE.Mesh(lightGeo, new THREE.MeshStandardMaterial({
                color: 0xFF0000, 
                roughness: 0.5, 
                metalness: 0.0,
                emissive: 0xFF0000,
                emissiveIntensity: 0.5
            }));
            redLight.position.set(0.3, 1.2, spec.width/2 + 0.05);
            redLight.castShadow = true;
            redLight.receiveShadow = true;
            group.add(redLight);
            
            const blueLight = new THREE.Mesh(lightGeo, new THREE.MeshStandardMaterial({
                color: 0x0000FF, 
                roughness: 0.5, 
                metalness: 0.0,
                emissive: 0x0000FF,
                emissiveIntensity: 0.5
            }));
            blueLight.position.set(-0.3, 1.2, spec.width/2 + 0.05);
            blueLight.castShadow = true;
            blueLight.receiveShadow = true;
            group.add(blueLight);
        }
        
        if (type === 'cityBus') {
            // Bus windows
            for (let i = -4; i <= 4; i++) {
                if (i === 0) continue;
                const windowGeo = new THREE.PlaneGeometry(1.8, 1.2);
                const windowMesh = new THREE.Mesh(windowGeo, windowMat);
                windowMesh.position.set(i * 1.2, 0.8, spec.width/2 + 0.01);
                group.add(windowMesh);
            }
            
            // Bus destination display
            const displayGeo = new THREE.BoxGeometry(1.5, 0.3, 0.1);
            const displayMat = new THREE.MeshStandardMaterial({
                color: 0xFF0000, 
                roughness: 0.9, 
                metalness: 0.0
            });
            const display = new THREE.Mesh(displayGeo, displayMat);
            display.position.set(0, 2.0, spec.width/2 + 0.05);
            display.castShadow = true;
            display.receiveShadow = true;
            group.add(display);
        }
        
        // Store vehicle data
        group.userData = {
            type,
            spec,
            speed: 0,
            maxSpeed: spec.maxSpeed,
            acceleration: spec.accel,
            grip: spec.grip
        };
        
        if (position) group.position.copy(position);
        if (rotation) group.rotation.y = rotation;
        
        return group;
    }
}
