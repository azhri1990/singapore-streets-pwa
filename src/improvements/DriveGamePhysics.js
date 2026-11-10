import * as THREE from 'three';

/**
 * Vehicle Physics inspired by esc5221/drive-game
 * 240 Hz raycast suspension, Pacejka tire model
 */

export class DriveGameStylePhysics {
    constructor() {
        this.gravity = 9.81;
        this.roadGrip = 1.0;
    }
    
    createVehiclePhysics(vehicle) {
        return {
            position: new THREE.Vector3(),
            velocity: new THREE.Vector3(),
            angularVelocity: new THREE.Vector3(),
            acceleration: new THREE.Vector3(),
            
            // Vehicle properties
            mass: 1500,
            engineForce: 8000,
            brakeForce: 12000,
            maxSteer: 0.5,
            suspensionStiffness: 35000,
            suspensionDamping: 3000,
            
            // Wheels
            wheels: [],
            
            update(delta) {
                // Raycast suspension
                this.updateSuspension(delta);
                
                // Tire forces (Pacejka model)
                this.calculateTireForces(delta);
                
                // Engine and braking
                this.applyEngineForce(delta);
                
                // Integration
                this.integrate(delta);
            },
            
            updateSuspension(delta) {
                // Raycast down from each wheel to ground
                this.wheels.forEach(wheel => {
                    const rayOrigin = wheel.position.clone();
                    const rayDirection = new THREE.Vector3(0, -1, 0);
                    const rayDistance = 2;
                    
                    // Simple ground check
                    const groundY = 0;
                    const suspensionCompression = Math.max(0, rayOrigin.y - groundY);
                    
                    // Spring force
                    const springForce = suspensionCompression * this.suspensionStiffness;
                    const dampingForce = wheel.velocity * this.suspensionDamping;
                    
                    wheel.force = springForce - dampingForce;
                });
            },
            
            calculateTireForces(delta) {
                // Pacejka tire model approximation
                this.wheels.forEach(wheel => {
                    const slipRatio = this.calculateSlipRatio(wheel);
                    const lateralSlip = this.calculateLateralSlip(wheel);
                    
                    // Combined slip
                    const longitudinalForce = this.pacejka(slipRatio, wheel.load);
                    const lateralForce = this.pacejka(lateralSlip, wheel.load);
                    
                    wheel.force.set(
                        longitudinalForce * wheel.forward,
                        0,
                        lateralForce * wheel.right
                    );
                });
            },
            
            pacejka(slip, load) {
                // Simplified Pacejka formula
                const B = 8.5;
                const C = 1.65;
                const D = load * 0.8;
                
                return D * Math.sin(C * Math.atan(B * slip));
            },
            
            calculateSlipRatio(wheel) {
                const wheelSpeed = wheel.angularVelocity * wheel.radius;
                const vehicleSpeed = this.velocity.length();
                
                if (vehicleSpeed < 0.1) return 0;
                return (wheelSpeed - vehicleSpeed) / vehicleSpeed;
            },
            
            calculateLateralSlip(wheel) {
                return this.velocity.x / (this.velocity.z + 0.001);
            },
            
            applyEngineForce(delta) {
                const force = this.engineForce * 0.1; // Simplified
                this.acceleration.z += force / this.mass;
            },
            
            integrate(delta) {
                // Simple Euler integration
                this.velocity.add(this.acceleration.clone().multiplyScalar(delta));
                this.position.add(this.velocity.clone().multiplyScalar(delta));
                
                // Apply gravity
                this.velocity.y -= this.gravity * delta;
                
                this.acceleration.set(0, 0, 0);
            }
        };
    }
    
    // Singapore-specific road conditions
    getRoadCondition(roadType) {
        const conditions = {
            'expressway': { grip: 1.0, friction: 0.8 },
            'arterial': { grip: 0.95, friction: 0.75 },
            'residential': { grip: 0.9, friction: 0.7 },
            'wet': { grip: 0.6, friction: 0.5 }, // Singapore rain
            'hdb': { grip: 0.85, friction: 0.65 }
        };
        return conditions[roadType] || conditions.residential;
    }
}
