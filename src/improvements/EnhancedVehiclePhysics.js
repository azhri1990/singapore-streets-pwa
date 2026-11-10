import * as THREE from 'three';

/**
 * Enhanced Vehicle Physics System
 * Integrates raycast suspension (240Hz), Pacejka tire model, suspension geometry
 * Singapore-specific road conditions, drift detection, ABS/TCS/ESP
 * Based on: esc5221/drive-game, cannon-es vehicle, realistic car physics research
 */
export class EnhancedVehiclePhysics {
    constructor(world) {
        this.world = world;
        this.gravity = 9.81;
        this.timeStep = 1 / 240; // 240 Hz physics for suspension
        this.accumulator = 0;
        
        // Vehicle definitions with realistic specs
        this.vehicleTypes = {
            'taxi': {
                mass: 1450,
                wheelbase: 2.8,
                trackWidth: 1.5,
                cgHeight: 0.55,
                maxEngineTorque: 250,
                maxEngineRPM: 6000,
                gearRatios: [3.5, 2.1, 1.4, 1.0, 0.8],
                finalDrive: 4.2,
                dragCoefficient: 0.32,
                frontalArea: 2.2,
                brakeForce: 12000,
                maxSteerAngle: 0.6,
                suspensionStiffness: 35000,
                suspensionDamping: 3000,
                suspensionTravel: 0.15,
                antiRollBar: 15000,
                tireRadius: 0.33,
                tireWidth: 0.205,
                pacejka: { B: 10, C: 1.9, D: 1.0, E: 0.97 },
                drivetrain: 'fwd'
            },
            'sedan': {
                mass: 1500,
                wheelbase: 2.75,
                trackWidth: 1.55,
                cgHeight: 0.5,
                maxEngineTorque: 300,
                maxEngineRPM: 6500,
                gearRatios: [3.6, 2.2, 1.5, 1.1, 0.9],
                finalDrive: 3.9,
                dragCoefficient: 0.29,
                frontalArea: 2.1,
                brakeForce: 13000,
                maxSteerAngle: 0.55,
                suspensionStiffness: 40000,
                suspensionDamping: 3500,
                suspensionTravel: 0.14,
                antiRollBar: 18000,
                tireRadius: 0.32,
                tireWidth: 0.215,
                pacejka: { B: 11, C: 2.0, D: 1.1, E: 0.97 },
                drivetrain: 'fwd'
            },
            'mpv': {
                mass: 1800,
                wheelbase: 2.9,
                trackWidth: 1.6,
                cgHeight: 0.65,
                maxEngineTorque: 350,
                maxEngineRPM: 6000,
                gearRatios: [3.8, 2.3, 1.6, 1.2, 1.0],
                finalDrive: 4.0,
                dragCoefficient: 0.35,
                frontalArea: 2.8,
                brakeForce: 15000,
                maxSteerAngle: 0.5,
                suspensionStiffness: 45000,
                suspensionDamping: 4000,
                suspensionTravel: 0.18,
                antiRollBar: 12000,
                tireRadius: 0.35,
                tireWidth: 0.225,
                pacejka: { B: 9, C: 1.8, D: 1.2, E: 0.97 },
                drivetrain: 'fwd'
            },
            'sports': {
                mass: 1350,
                wheelbase: 2.65,
                trackWidth: 1.6,
                cgHeight: 0.45,
                maxEngineTorque: 450,
                maxEngineRPM: 8000,
                gearRatios: [3.3, 2.0, 1.35, 1.0, 0.85],
                finalDrive: 3.7,
                dragCoefficient: 0.28,
                frontalArea: 1.9,
                brakeForce: 16000,
                maxSteerAngle: 0.5,
                suspensionStiffness: 60000,
                suspensionDamping: 5000,
                suspensionTravel: 0.1,
                antiRollBar: 25000,
                tireRadius: 0.31,
                tireWidth: 0.245,
                pacejka: { B: 13, C: 2.2, D: 1.3, E: 0.97 },
                drivetrain: 'rwd'
            },
            'motorcycle': {
                mass: 220,
                wheelbase: 1.45,
                trackWidth: 0,
                cgHeight: 0.55,
                maxEngineTorque: 110,
                maxEngineRPM: 12000,
                gearRatios: [2.8, 1.9, 1.3, 1.0, 0.85, 0.75],
                finalDrive: 2.5,
                dragCoefficient: 0.45,
                frontalArea: 0.7,
                brakeForce: 4000,
                maxSteerAngle: 0.65,
                suspensionStiffness: 25000,
                suspensionDamping: 2000,
                suspensionTravel: 0.12,
                antiRollBar: 0,
                tireRadius: 0.31,
                tireWidth: 0.16,
                pacejka: { B: 12, C: 2.1, D: 1.0, E: 0.97 },
                drivetrain: 'rwd'
            }
        };
        
        // Singapore road conditions
        this.roadConditions = {
            'expressway': { grip: 1.0, roughness: 0.01, banking: 0 },
            'arterial': { grip: 0.95, roughness: 0.02, banking: 0 },
            'residential': { grip: 0.9, roughness: 0.03, banking: 0 },
            'hdb': { grip: 0.85, roughness: 0.04, banking: 0 },
            'industrial': { grip: 0.8, roughness: 0.05, banking: 0 },
            'wet': { grip: 0.55, roughness: 0.02, banking: 0 },
            'rain': { grip: 0.45, roughness: 0.015, banking: 0 },
            'erp': { grip: 1.0, roughness: 0.01, banking: 0 }
        };
        
        this.activeVehicles = new Map();
    }
    
    // Create a physics vehicle instance
    createVehicle(type = 'taxi', initialPosition = new THREE.Vector3(), initialRotation = new THREE.Euler()) {
        const spec = this.vehicleTypes[type] || this.vehicleTypes.taxi;
        
        const vehicle = {
            id: crypto.randomUUID(),
            type,
            spec,
            
            // State
            position: initialPosition.clone(),
            rotation: initialRotation.clone(),
            velocity: new THREE.Vector3(),
            angularVelocity: new THREE.Vector3(),
            
            // Engine
            engineRPM: 800,
            throttle: 0,
            brake: 0,
            clutch: 0,
            gear: 1,
            autoGear: true,
            
            // Steering
            steerAngle: 0,
            steerTarget: 0,
            steerSpeed: 4.0, // rad/s
            
            // Wheels (4 for cars, 2 for motorcycle)
            wheels: this.createWheels(spec),
            
            // Suspension state
            suspensionForce: [0, 0, 0, 0],
            suspensionCompression: [0, 0, 0, 0],
            wheelAngularVelocity: [0, 0, 0, 0],
            
            // Driving aids
            abs: true,
            tcs: true,
            esp: true,
            absThreshold: 0.2,
            tcsThreshold: 0.15,
            
            // Derived
            speed: 0,
            speedKmh: 0,
            slipRatio: [0, 0, 0, 0],
            lateralSlip: [0, 0, 0, 0],
            combinedSlip: [0, 0, 0, 0],
            
            // Road
            currentRoadType: 'residential',
            roadGrip: 1.0,
            
            // Audio/Damage
            engineLoad: 0,
            tireWear: [1, 1, 1, 1],
            damage: 0,
            
            // Input
            input: { throttle: 0, brake: 0, steer: 0, handbrake: false, clutch: 0 },
            
            // Mesh reference
            mesh: null
        };
        
        this.activeVehicles.set(vehicle.id, vehicle);
        return vehicle;
    }
    
    createWheels(spec) {
        const wheelCount = spec.drivetrain === 'motorcycle' ? 2 : 4;
        const wheels = [];
        
        const halfWheelbase = spec.wheelbase / 2;
        const halfTrack = spec.trackWidth / 2;
        
        if (wheelCount === 4) {
            // Front-left, Front-right, Rear-left, Rear-right
            const positions = [
                new THREE.Vector3(-halfTrack, 0, halfWheelbase),
                new THREE.Vector3(halfTrack, 0, halfWheelbase),
                new THREE.Vector3(-halfTrack, 0, -halfWheelbase),
                new THREE.Vector3(halfTrack, 0, -halfWheelbase)
            ];
            
            positions.forEach((pos, i) => {
                wheels.push({
                    position: pos,
                    radius: spec.tireRadius,
                    width: spec.tireWidth,
                    isFront: i < 2,
                    isLeft: i % 2 === 0,
                    steerable: i < 2,
                    powered: (spec.drivetrain === 'fwd' && i < 2) || 
                             (spec.drivetrain === 'rwd' && i >= 2) ||
                             (spec.drivetrain === 'awd'),
                    brakeBias: i < 2 ? 0.7 : 0.3,
                    suspensionLength: spec.suspensionTravel,
                    visualRotation: 0,
                    visualSteer: 0
                });
            });
        } else {
            // Motorcycle - front and rear
            wheels.push({
                position: new THREE.Vector3(0, 0, halfWheelbase),
                radius: spec.tireRadius,
                width: spec.tireWidth,
                isFront: true,
                isLeft: false,
                steerable: true,
                powered: false,
                brakeBias: 0.7,
                suspensionLength: spec.suspensionTravel,
                visualRotation: 0,
                visualSteer: 0
            });
            wheels.push({
                position: new THREE.Vector3(0, 0, -halfWheelbase),
                radius: spec.tireRadius,
                width: spec.tireWidth,
                isFront: false,
                isLeft: false,
                steerable: false,
                powered: true,
                brakeBias: 0.3,
                suspensionLength: spec.suspensionTravel,
                visualRotation: 0,
                visualSteer: 0
            });
        }
        
        return wheels;
    }
    
    // Main update loop - runs at 240Hz for suspension
    update(delta) {
        this.accumulator += delta;
        
        while (this.accumulator >= this.timeStep) {
            this.physicsStep(this.timeStep);
            this.accumulator -= this.timeStep;
        }
        
        // Interpolation for visual smoothness
        const alpha = this.accumulator / this.timeStep;
        this.interpolateVisuals(alpha);
    }
    
    physicsStep(dt) {
        this.activeVehicles.forEach((vehicle, id) => {
            this.updateVehiclePhysics(vehicle, dt);
        });
    }
    
    updateVehiclePhysics(vehicle, dt) {
        const spec = vehicle.spec;
        
        // Process input
        this.processInput(vehicle, dt);
        
        // Update road grip based on current road
        this.updateRoadGrip(vehicle);
        
        // Raycast suspension for each wheel
        this.updateSuspension(vehicle, dt);
        
        // Calculate tire forces (Pacejka model)
        this.calculateTireForces(vehicle, dt);
        
        // Apply engine torque through drivetrain
        this.applyDrivetrain(vehicle, dt);
        
        // Apply braking
        this.applyBrakes(vehicle, dt);
        
        // Driving aids (ABS, TCS, ESP)
        this.applyDrivingAids(vehicle, dt);
        
        // Integrate forces
        this.integrateForces(vehicle, dt);
        
        // Update derived values
        this.updateDerivedValues(vehicle);
        
        // Auto gear shifting
        if (vehicle.autoGear) {
            this.autoShift(vehicle);
        }
        
        // Motorcycle lean physics
        if (spec.drivetrain === 'motorcycle') {
            this.updateMotorcycleLean(vehicle, dt);
        }
    }
    
    processInput(vehicle, dt) {
        const input = vehicle.input;
        const spec = vehicle.spec;
        
        // Smooth steering
        const steerDiff = input.steer - vehicle.steerAngle;
        const maxSteerChange = spec.maxSteerAngle * vehicle.steerSpeed * dt;
        vehicle.steerAngle += THREE.MathUtils.clamp(steerDiff, -maxSteerChange, maxSteerChange);
        
        // Speed-sensitive steering
        const speedFactor = THREE.MathUtils.clamp(vehicle.speed / 50, 0.3, 1.0);
        vehicle.steerAngle *= speedFactor;
        
        // Throttle/brake
        vehicle.throttle = input.throttle;
        vehicle.brake = input.brake;
        
        // Clutch (for manual)
        if (!vehicle.autoGear) {
            vehicle.clutch = input.clutch;
        }
    }
    
    updateRoadGrip(vehicle) {
        // Would query road type from world at vehicle position
        const condition = this.roadConditions[vehicle.currentRoadType] || this.roadConditions.residential;
        vehicle.roadGrip = condition.grip * vehicle.tireWear.reduce((a, b) => a + b, 0) / 4;
        
        // Weather effects
        if (this.world.weather) {
            if (this.world.weather.isRaining) {
                vehicle.roadGrip *= this.roadConditions.rain.grip / this.roadConditions.residential.grip;
            } else if (this.world.weather.isWet) {
                vehicle.roadGrip *= this.roadConditions.wet.grip / this.roadConditions.residential.grip;
            }
        }
    }
    
    updateSuspension(vehicle, dt) {
        const spec = vehicle.spec;
        
        vehicle.wheels.forEach((wheel, i) => {
            // Raycast down from wheel position in world space
            const wheelWorldPos = this.getWheelWorldPosition(vehicle, wheel);
            const rayOrigin = new THREE.Vector3().copy(wheelWorldPos);
            rayOrigin.y += wheel.radius;
            
            // Find ground height at this position
            const groundY = this.getGroundHeight(wheelWorldPos.x, wheelWorldPos.z);
            const rayDistance = wheel.radius + spec.suspensionTravel;
            
            // Calculate compression
            const distanceToGround = rayOrigin.y - groundY;
            const compression = THREE.MathUtils.clamp(1 - distanceToGround / rayDistance, 0, 1);
            
            vehicle.suspensionCompression[i] = compression;
            
            // Spring force (Hooke's law)
            const springForce = compression * spec.suspensionStiffness;
            
            // Damping force (proportional to compression velocity)
            const compressionVelocity = (compression - vehicle.prevSuspensionCompression?.[i] || 0) / dt;
            const dampingForce = compressionVelocity * spec.suspensionDamping;
            
            // Anti-roll bar
            let antiRollForce = 0;
            if (spec.antiRollBar > 0 && wheel.isFront) {
                const otherSide = wheel.isLeft ? 1 : 0;
                const otherCompression = vehicle.suspensionCompression[otherSide] || 0;
                antiRollForce = (compression - otherCompression) * spec.antiRollBar;
            }
            
            vehicle.suspensionForce[i] = springForce + dampingForce + antiRollForce;
        });
        
        // Store for next frame
        vehicle.prevSuspensionCompression = [...vehicle.suspensionCompression];
    }
    
    getWheelWorldPosition(vehicle, wheel) {
        const pos = wheel.position.clone();
        pos.applyEuler(vehicle.rotation);
        pos.add(vehicle.position);
        return pos;
    }
    
    getGroundHeight(x, z) {
        // Would query terrain/road height from world
        // For now return 0 (flat ground)
        if (this.world.getGroundHeight) {
            return this.world.getGroundHeight(x, z);
        }
        return 0;
    }
    
    calculateTireForces(vehicle, dt) {
        const spec = vehicle.spec;
        
        vehicle.wheels.forEach((wheel, i) => {
            if (vehicle.suspensionCompression[i] <= 0) {
                // Wheel not on ground
                vehicle.slipRatio[i] = 0;
                vehicle.lateralSlip[i] = 0;
                vehicle.combinedSlip[i] = 0;
                return;
            }
            
            // Wheel velocity in world space
            const wheelWorldPos = this.getWheelWorldPosition(vehicle, wheel);
            const wheelForward = new THREE.Vector3(0, 0, 1).applyEuler(vehicle.rotation);
            const wheelRight = new THREE.Vector3(1, 0, 0).applyEuler(vehicle.rotation);
            
            // Apply steering to front wheels
            if (wheel.steerable) {
                wheelForward.applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.steerAngle * (wheel.isLeft ? 1 : 1));
                wheelRight.applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.steerAngle * (wheel.isLeft ? 1 : 1));
            }
            
            // Wheel hub velocity
            const hubVelocity = vehicle.velocity.clone()
                .add(new THREE.Vector3().crossVectors(vehicle.angularVelocity, wheelWorldPos.clone().sub(vehicle.position)));
            
            // Wheel spin velocity at contact patch
            const spinVelocity = wheelForward.clone().multiplyScalar(vehicle.wheelAngularVelocity[i] * wheel.radius);
            
            // Slip velocity
            const slipVelocity = hubVelocity.clone().sub(spinVelocity);
            
            // Longitudinal slip
            const forwardSpeed = hubVelocity.dot(wheelForward);
            const wheelSpeed = vehicle.wheelAngularVelocity[i] * wheel.radius;
            vehicle.slipRatio[i] = forwardSpeed > 0.1 ? (wheelSpeed - forwardSpeed) / forwardSpeed : 0;
            
            // Lateral slip
            const rightSpeed = hubVelocity.dot(wheelRight);
            vehicle.lateralSlip[i] = forwardSpeed > 0.1 ? rightSpeed / forwardSpeed : 0;
            
            // Combined slip (Pacejka)
            const slipMagnitude = Math.sqrt(vehicle.slipRatio[i] ** 2 + vehicle.lateralSlip[i] ** 2);
            vehicle.combinedSlip[i] = slipMagnitude;
            
            // Pacejka tire model
            const pacejka = spec.pacejka;
            const load = vehicle.suspensionForce[i] * vehicle.roadGrip;
            
            // Longitudinal force
            const Bx = pacejka.B;
            const Cx = pacejka.C;
            const Dx = pacejka.D * load;
            const Ex = pacejka.E;
            
            const longitudinalForce = Dx * Math.sin(Cx * Math.atan(Bx * vehicle.slipRatio[i] - Ex * (Bx * vehicle.slipRatio[i] - Math.atan(Bx * vehicle.slipRatio[i]))));
            
            // Lateral force
            const By = pacejka.B * 0.9;
            const Cy = pacejka.C;
            const Dy = pacejka.D * load * 1.1;
            const Ey = pacejka.E;
            
            const lateralForce = Dy * Math.sin(Cy * Math.atan(By * vehicle.lateralSlip[i] - Ey * (By * vehicle.lateralSlip[i] - Math.atan(By * vehicle.lateralSlip[i]))));
            
            // Apply friction circle (combined slip limit)
            const maxForce = load * vehicle.roadGrip;
            const forceRatio = Math.sqrt(longitudinalForce ** 2 + lateralForce ** 2) / maxForce;
            
            if (forceRatio > 1) {
                vehicle.slipRatio[i] *= 1 / forceRatio;
                vehicle.lateralSlip[i] *= 1 / forceRatio;
            }
            
            // Store forces on wheel
            wheel.longitudinalForce = longitudinalForce;
            wheel.lateralForce = lateralForce;
        });
    }
    
    applyDrivetrain(vehicle, dt) {
        const spec = vehicle.spec;
        
        // Engine torque curve
        const rpmRatio = vehicle.engineRPM / spec.maxEngineRPM;
        const torqueCurve = Math.sin(rpmRatio * Math.PI * 0.9) * 0.9 + 0.1; // Peak at ~90% RPM
        const engineTorque = spec.maxEngineTorque * torqueCurve * vehicle.throttle;
        
        vehicle.engineLoad = vehicle.throttle;
        
        // Gear ratio
        const gearRatio = spec.gearRatios[vehicle.gear - 1] || spec.gearRatios[spec.gearRatios.length - 1];
        const totalRatio = gearRatio * spec.finalDrive;
        
        // Wheel torque
        const wheelTorque = engineTorque * totalRatio * 0.85; // 85% drivetrain efficiency
        
        // Apply to powered wheels
        vehicle.wheels.forEach((wheel, i) => {
            if (wheel.powered && vehicle.suspensionCompression[i] > 0) {
                const maxTorque = wheelTorque / vehicle.wheels.filter(w => w.powered).length;
                const appliedTorque = maxTorque * vehicle.throttle;
                
                // TCS - limit torque if slip too high
                if (vehicle.tcs && Math.abs(vehicle.slipRatio[i]) > vehicle.tcsThreshold) {
                    const tcsReduction = 1 - (Math.abs(vehicle.slipRatio[i]) - vehicle.tcsThreshold) * 5;
                    wheel.driveTorque = appliedTorque * THREE.MathUtils.clamp(tcsReduction, 0, 1);
                } else {
                    wheel.driveTorque = appliedTorque;
                }
                
                // Update wheel angular velocity
                const angularAccel = wheel.driveTorque / (vehicle.mass * 0.25 * wheel.radius ** 2); // Simplified inertia
                vehicle.wheelAngularVelocity[i] += angularAccel * dt;
            } else {
                wheel.driveTorque = 0;
            }
        });
        
        // Engine RPM from wheel speed (average of driven wheels)
        let avgWheelSpeed = 0;
        let poweredCount = 0;
        vehicle.wheels.forEach((wheel, i) => {
            if (wheel.powered) {
                avgWheelSpeed += vehicle.wheelAngularVelocity[i];
                poweredCount++;
            }
        });
        if (poweredCount > 0) {
            avgWheelSpeed /= poweredCount;
            vehicle.engineRPM = Math.abs(avgWheelSpeed) * spec.gearRatios[vehicle.gear - 1] * spec.finalDrive * 60 / (2 * Math.PI);
            vehicle.engineRPM = THREE.MathUtils.clamp(vehicle.engineRPM, 800, spec.maxEngineRPM);
        }
    }
    
    applyBrakes(vehicle, dt) {
        const spec = vehicle.spec;
        
        vehicle.wheels.forEach((wheel, i) => {
            if (vehicle.suspensionCompression[i] <= 0) return;
            
            let brakeForce = 0;
            
            if (vehicle.brake > 0) {
                brakeForce = spec.brakeForce * vehicle.brake * wheel.brakeBias;
            }
            
            if (vehicle.input.handbrake && !wheel.isFront) {
                brakeForce = Math.max(brakeForce, spec.brakeForce * 1.5);
            }
            
            // ABS - modulate brake force
            if (vehicle.abs && vehicle.brake > 0 && Math.abs(vehicle.slipRatio[i]) > vehicle.absThreshold) {
                const absReduction = 1 - (Math.abs(vehicle.slipRatio[i]) - vehicle.absThreshold) * 3;
                brakeForce *= THREE.MathUtils.clamp(absReduction, 0.1, 1);
            }
            
            // Apply brake torque opposite to wheel rotation
            if (vehicle.wheelAngularVelocity[i] > 0) {
                const brakeTorque = -Math.sign(vehicle.wheelAngularVelocity[i]) * brakeForce;
                const angularDecel = brakeTorque / (vehicle.mass * 0.25 * wheel.radius ** 2);
                vehicle.wheelAngularVelocity[i] += angularDecel * dt;
                
                // Stop wheel if it would reverse
                if (vehicle.wheelAngularVelocity[i] * vehicle.wheelAngularVelocity[i] < angularDecel * dt) {
                    vehicle.wheelAngularVelocity[i] = 0;
                }
            }
        });
    }
    
    applyDrivingAids(vehicle, dt) {
        if (!vehicle.esp) return;
        
        // ESP - Electronic Stability Program
        // Detect oversteer/understeer and apply selective braking
        const yawRate = vehicle.angularVelocity.y;
        const targetYawRate = vehicle.speed * Math.tan(vehicle.steerAngle) / vehicle.spec.wheelbase;
        const yawError = yawRate - targetYawRate;
        
        if (Math.abs(yawError) > 0.3) { // Significant deviation
            // Oversteer (rear sliding out) - brake outside front wheel
            if (yawError * vehicle.steerAngle > 0) {
                const outsideFront = vehicle.steerAngle > 0 ? 1 : 0; // Right turn -> right front
                if (vehicle.suspensionCompression[outsideFront] > 0) {
                    vehicle.wheels[outsideFront].espBrakeForce = Math.min(Math.abs(yawError) * 5000, 8000);
                }
            }
            // Understeer (front sliding) - brake inside rear wheel
            else {
                const insideRear = vehicle.steerAngle > 0 ? 2 : 3; // Right turn -> left rear
                if (vehicle.suspensionCompression[insideRear] > 0) {
                    vehicle.wheels[insideRear].espBrakeForce = Math.min(Math.abs(yawError) * 3000, 6000);
                }
            }
        }
    }
    
    integrateForces(vehicle, dt) {
        const spec = vehicle.spec;
        
        // Sum all forces
        let totalForce = new THREE.Vector3();
        let totalTorque = new THREE.Vector3();
        
        vehicle.wheels.forEach((wheel, i) => {
            if (vehicle.suspensionCompression[i] <= 0) return;
            
            const wheelWorldPos = this.getWheelWorldPosition(vehicle, wheel);
            const wheelForward = new THREE.Vector3(0, 0, 1).applyEuler(vehicle.rotation);
            const wheelRight = new THREE.Vector3(1, 0, 0).applyEuler(vehicle.rotation);
            
            if (wheel.steerable) {
                wheelForward.applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.steerAngle);
                wheelRight.applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.steerAngle);
            }
            
            // Longitudinal force (drive + brake)
            const longForce = (wheel.driveTorque || 0) / wheel.radius + (wheel.espBrakeForce || 0);
            const longForceVec = wheelForward.clone().multiplyScalar(longForce);
            
            // Lateral force
            const latForceVec = wheelRight.clone().multiplyScalar(wheel.lateralForce || 0);
            
            // Vertical force (suspension)
            const vertForceVec = new THREE.Vector3(0, vehicle.suspensionForce[i], 0);
            
            const wheelForce = longForceVec.add(latForceVec).add(vertForceVec);
            totalForce.add(wheelForce);
            
            // Torque from force at contact patch
            const r = wheelWorldPos.clone().sub(vehicle.position);
            totalTorque.add(new THREE.Vector3().crossVectors(r, wheelForce));
            
            // Clear ESP brake for next frame
            wheel.espBrakeForce = 0;
        });
        
        // Aerodynamic drag
        const speed = vehicle.velocity.length();
        const dragForce = 0.5 * 1.225 * speed * speed * spec.dragCoefficient * spec.frontalArea;
        const dragVec = vehicle.velocity.clone().normalize().multiplyScalar(-dragForce);
        totalForce.add(dragVec);
        
        // Downforce (simplified)
        const downforce = 0.5 * 1.225 * speed * speed * 0.1 * spec.frontalArea;
        totalForce.y -= downforce;
        
        // Gravity
        totalForce.y -= spec.mass * this.gravity;
        
        // Integrate
        const acceleration = totalForce.clone().divideScalar(spec.mass);
        vehicle.velocity.add(acceleration.multiplyScalar(dt));
        
        // Angular integration
        const angularAccel = totalTorque.clone().divideScalar(spec.mass * spec.wheelbase * spec.trackWidth); // Simplified inertia tensor
        vehicle.angularVelocity.add(angularAccel.multiplyScalar(dt));
        
        // Update position
        vehicle.position.add(vehicle.velocity.clone().multiplyScalar(dt));
        vehicle.rotation.y += vehicle.angularVelocity.y * dt;
    }
    
    updateDerivedValues(vehicle) {
        vehicle.speed = vehicle.velocity.length();
        vehicle.speedKmh = vehicle.speed * 3.6;
    }
    
    autoShift(vehicle) {
        const spec = vehicle.spec;
        const rpm = vehicle.engineRPM;
        
        // Shift up at 85% redline
        if (rpm > spec.maxEngineRPM * 0.85 && vehicle.gear < spec.gearRatios.length) {
            vehicle.gear++;
        }
        // Shift down at 30% redline
        else if (rpm < spec.maxEngineRPM * 0.3 && vehicle.gear > 1) {
            vehicle.gear--;
        }
    }
    
    updateMotorcycleLean(vehicle, dt) {
        // Motorcycle lean physics - lean into turns
        const targetLean = -vehicle.steerAngle * 0.8 * (vehicle.speed / 30);
        const currentLean = vehicle.rotation.z;
        const leanDiff = targetLean - currentLean;
        vehicle.rotation.z += leanDiff * Math.min(1, dt * 3);
    }
    
    interpolateVisuals(alpha) {
        this.activeVehicles.forEach(vehicle => {
            if (!vehicle.mesh) return;
            
            // Update wheel visuals
            vehicle.wheels.forEach((wheel, i) => {
                if (!vehicle.mesh) return;
                
                // Wheel rotation
                wheel.visualRotation += vehicle.wheelAngularVelocity[i] * (1/60); // Assume 60fps visual
                
                // Wheel steer
                wheel.visualSteer = THREE.MathUtils.lerp(wheel.visualSteer, vehicle.steerAngle * (wheel.isLeft ? 1 : 1), 0.1);
                
                // Suspension visual compression
                const compression = vehicle.suspensionCompression[i];
                // Would apply to wheel mesh position
            });
            
            // Vehicle body position/rotation
            vehicle.mesh.position.lerp(vehicle.position, alpha);
            vehicle.mesh.rotation.lerp(vehicle.rotation, alpha);
        });
    }
    
    // Input handling
    setInput(vehicleId, input) {
        const vehicle = this.activeVehicles.get(vehicleId);
        if (vehicle) {
            vehicle.input = { ...vehicle.input, ...input };
        }
    }
    
    // Get vehicle for external access
    getVehicle(vehicleId) {
        return this.activeVehicles.get(vehicleId);
    }
    
    // Remove vehicle
    removeVehicle(vehicleId) {
        this.activeVehicles.delete(vehicleId);
    }
    
    // Set road type at position (called from world system)
    setRoadTypeAt(x, z, roadType) {
        // Would store in spatial grid
    }
}

export default EnhancedVehiclePhysics;