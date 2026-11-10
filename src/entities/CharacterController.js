import * as THREE from 'three';
import { ThirdPersonCamera } from '../world/SingaporeMap.js';

/**
 * GTA-Style Character Controller
 * On-foot movement, running, jumping, swimming
 */

export class CharacterController {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        
        // Character state
        this.position = new THREE.Vector3(0, 1, 0);
        this.velocity = new THREE.Vector3();
        this.rotation = new THREE.Euler(0, 0, 0, 'YXZ');
        this.onGround = false;
        this.isRunning = false;
        this.isSwimming = false;
        this.isInVehicle = false;
        this.currentVehicle = null;
        
        // Stats
        this.health = 100;
        this.armor = 0;
        this.maxHealth = 100;
        this.maxArmor = 100;
        
        // Movement params
        this.walkSpeed = 5;
        this.runSpeed = 9;
        this.swimSpeed = 3;
        this.jumpForce = 6;
        this.gravity = -15;
        this.friction = 0.85;
        
        // Camera
        this.cameraDistance = 5;
        this.cameraHeight = 2;
        this.mouseSensitivity = 0.002;
        
        // Input state
        this.keys = {};
        this.mouse = { x: 0, y: 0 };
        this.isPointerLocked = false;
        
        // External input for desktop controls
        this.externalMoveInput = new THREE.Vector3();
        this.externalRunning = false;
        this.boundResize = null;
        
        this.setupControls();
        this.createMesh();
    }
    
    createMesh() {
        // Simple character mesh (GTA-style)
        const group = new THREE.Group();
        
        // Body
        const bodyGeo = new THREE.CapsuleGeometry(0.3, 1.2, 8, 16);
        const bodyMat = new THREE.MeshStandardMaterial({ 
            color: 0x2a4a8a, 
            roughness: 0.7, 
            metalness: 0.0 
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 0.9;
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);
        
        // Head
        const headGeo = new THREE.SphereGeometry(0.25, 16, 12);
        const headMat = new THREE.MeshStandardMaterial({ 
            color: 0xeac8a8, 
            roughness: 0.9, 
            metalness: 0.0 
        });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 1.7;
        head.castShadow = true;
        head.receiveShadow = true;
        group.add(head);
        
        // Arms
        const armGeo = new THREE.CapsuleGeometry(0.1, 0.6, 4, 8);
        const armMat = new THREE.MeshStandardMaterial({ 
            color: 0x2a4a8a, 
            roughness: 0.7, 
            metalness: 0.0 
        });
        const leftArm = new THREE.Mesh(armGeo, armMat);
        leftArm.position.set(-0.45, 1.1, 0);
        leftArm.rotation.z = 0.3;
        leftArm.castShadow = true;
        leftArm.receiveShadow = true;
        group.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeo, armMat);
        rightArm.position.set(0.45, 1.1, 0);
        rightArm.rotation.z = -0.3;
        rightArm.castShadow = true;
        rightArm.receiveShadow = true;
        group.add(rightArm);
        
        // Legs
        const legGeo = new THREE.CapsuleGeometry(0.12, 0.7, 4, 8);
        const legMat = new THREE.MeshStandardMaterial({ 
            color: 0x1a2a4a, 
            roughness: 0.7, 
            metalness: 0.0 
        });
        const leftLeg = new THREE.Mesh(legGeo, legMat);
        leftLeg.position.set(-0.15, 0.35, 0);
        leftLeg.castShadow = true;
        leftLeg.receiveShadow = true;
        group.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeo, legMat);
        rightLeg.position.set(0.15, 0.35, 0);
        rightLeg.castShadow = true;
        rightLeg.receiveShadow = true;
        group.add(rightLeg);
        
        this.mesh = group;
        this.mesh.position.copy(this.position);
        this.scene.add(this.mesh);
    }
    
    setupControls() {
        // Keyboard
        this.boundKeyDown = (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space' && this.onGround && !this.isSwimming) {
                this.jump();
            }
            if (e.code === 'ShiftLeft') this.isRunning = true;
        };
        
        this.boundKeyUp = (e) => {
            this.keys[e.code] = false;
            if (e.code === 'ShiftLeft') this.isRunning = false;
        };
        
        this.boundMouseMove = (e) => {
            if (!this.isPointerLocked) return;
            this.rotation.y -= e.movementX * this.mouseSensitivity;
            this.rotation.x -= e.movementY * this.mouseSensitivity;
            this.rotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, this.rotation.x));
        };
        
        this.boundClick = () => {
            if (!this.isPointerLocked && !this.isInVehicle) {
                document.body.requestPointerLock();
            }
        };
        
        this.boundPointerLockChange = () => {
            this.isPointerLocked = document.pointerLockElement === document.body;
        };
        
        window.addEventListener('keydown', this.boundKeyDown);
        window.addEventListener('keyup', this.boundKeyUp);
        document.addEventListener('mousemove', this.boundMouseMove);
        document.addEventListener('click', this.boundClick);
        document.addEventListener('pointerlockchange', this.boundPointerLockChange);
    }
    
    tryEnterVehicle() {
        // Find nearest vehicle
        if (this.isInVehicle) return;
        
        let nearest = null;
        let minDist = 3;
        
        this.scene.traverse((obj) => {
            if (obj.userData && obj.userData.type && obj.userData.type.includes('Vehicle')) {
                const dist = this.position.distanceTo(obj.position);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = obj;
                }
            }
        });
        
        if (nearest) {
            this.enterVehicle(nearest);
        }
    }
    
    enterVehicle(vehicle) {
        this.isInVehicle = true;
        this.currentVehicle = vehicle;
        this.mesh.visible = false;
        // Reset the arcade drivetrain for a predictable start.
        vehicle.userData.drive = vehicle.userData.drive || { speed: 0, steering: 0, condition: 100, distance: 0 };
    }
    
    exitVehicle() {
        if (!this.isInVehicle || !this.currentVehicle) return;
        
        this.isInVehicle = false;
        const exitOffset = new THREE.Vector3(1.8, 1, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.currentVehicle.rotation.y);
        this.position.copy(this.currentVehicle.position).add(exitOffset);
        this.mesh.visible = true;
        this.currentVehicle = null;
    }
    
    tryExitVehicle() {
        this.exitVehicle();
    }
    
    jump() {
        if (this.onGround) {
            this.velocity.y = this.jumpForce;
            this.onGround = false;
        }
    }
    
    setMoveInput(x, z, running = false) {
        this.externalMoveInput.set(x, 0, z);
        this.externalRunning = running;
    }

    clearExternalInput() {
        this.externalMoveInput.set(0,0,0);
        this.externalRunning = false;
    }

    update(delta) {
        if (!this.mesh || !this.scene) return;
        
        if (this.isInVehicle) {
            this.updateInVehicle(delta);
            return;
        }
        
        // Movement input
        const input = new THREE.Vector3();
        if (this.externalMoveInput.lengthSq() > 0) {
            input.copy(this.externalMoveInput);
        } else {
            if (this.keys['KeyW'] || this.keys['ArrowUp']) input.z -= 1;
            if (this.keys['KeyS'] || this.keys['ArrowDown']) input.z += 1;
            if (this.keys['KeyA'] || this.keys['ArrowLeft']) input.x -= 1;
            if (this.keys['KeyD'] || this.keys['ArrowRight']) input.x += 1;
        }
        
        const isRunning = this.externalMoveInput.lengthSq() > 0 ? this.externalRunning : this.isRunning;
        
        // Normalize input
        if (input.length() > 0) {
            input.normalize();
        }
        
        // Apply rotation to input
        const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, this.rotation.y, 0));
        const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, this.rotation.y, 0));
        
        const moveDir = new THREE.Vector3();
        moveDir.addScaledVector(forward, -input.z);
        moveDir.addScaledVector(right, input.x);
        
        // Speed
        const speed = isRunning ? this.runSpeed : this.walkSpeed;
        const targetVel = moveDir.multiplyScalar(speed);
        
        // Apply movement
        this.velocity.x = THREE.MathUtils.lerp(this.velocity.x, targetVel.x, 0.2);
        this.velocity.z = THREE.MathUtils.lerp(this.velocity.z, targetVel.z, 0.2);
        
        // Gravity
        this.velocity.y += this.gravity * delta;
        
        // Update position
        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;
        this.position.z += this.velocity.z * delta;
        
        // Ground collision
        if (this.position.y <= 1) {
            this.position.y = 1;
            this.velocity.y = 0;
            this.onGround = true;
        } else {
            this.onGround = false;
        }
        
        // Swimming check
        if (this.position.y < 0.5) {
            this.isSwimming = true;
            this.velocity.y = Math.max(this.velocity.y, -this.swimSpeed);
        } else {
            this.isSwimming = false;
        }
        
        // Friction
        this.velocity.x *= this.friction;
        this.velocity.z *= this.friction;
        
        // Update mesh
        this.mesh.position.copy(this.position);
        this.mesh.rotation.y = this.rotation.y;
        
        // Update camera
        this.updateCamera();
    }
    
    updateInVehicle(delta) {
        // Camera follows vehicle; users may choose a closer driving view.
        if (this.currentVehicle) {
            const vehiclePos = this.currentVehicle.position;
            const close = this.drivingSettings?.camera === 'close';
            const targetPos = vehiclePos.clone();
            const followOffset = new THREE.Vector3(0, close ? 4.5 : 8, close ? 7 : 12).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.currentVehicle.rotation.y);
            targetPos.add(followOffset);
            this.camera.position.lerp(targetPos, 0.1);
            this.camera.lookAt(vehiclePos);
        }
    }
    
    updateCamera() {
        if (this.isInVehicle) return;
        
        if (!this.thirdPersonCamera) {
            this.thirdPersonCamera = new ThirdPersonCamera(this.camera, this.mesh);
        }
        
        // Update camera angle from mouse rotation
        this.thirdPersonCamera.angle = this.rotation.y;
        this.thirdPersonCamera.pitch = this.rotation.x;
        
        this.thirdPersonCamera.update(1/60);
    }
    
    takeDamage(amount) {
        if (this.armor > 0) {
            const armorDamage = Math.min(this.armor, amount);
            this.armor -= armorDamage;
            amount -= armorDamage;
        }
        this.health = Math.max(0, this.health - amount);
        
        if (this.health <= 0) {
            this.die();
        }
    }
    
    die() {
        // Death animation / respawn
        console.log('Character died');
        this.health = this.maxHealth;
        this.armor = 0;
        this.position.set(0, 1, 0);
        this.velocity.set(0, 0, 0);
    }
    
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
    
    addArmor(amount) {
        this.armor = Math.min(this.maxArmor, this.armor + amount);
    }

    destroy() {
        // Remove event listeners
        window.removeEventListener('keydown', this.boundKeyDown);
        window.removeEventListener('keyup', this.boundKeyUp);
        document.removeEventListener('mousemove', this.boundMouseMove);
        document.removeEventListener('click', this.boundClick);
        document.removeEventListener('pointerlockchange', this.boundPointerLockChange);
        
        // Remove mesh from scene
        if (this.mesh && this.scene) {
            this.scene.remove(this.mesh);
            this.mesh.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) obj.material.dispose();
            });
        }
    }
}
