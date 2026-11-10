import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { PlayerModel } from './PlayerModel.js';

export class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.moveSpeed = 10;
        this.jumpHeight = 15;
        this.canJump = false;
        this.gravity = 30;
        
        this.controls = new PointerLockControls(camera, document.body);
        
        document.addEventListener('click', () => {
            this.controls.lock();
        });
        
        this.controls.addEventListener('lock', () => {
            document.getElementById('crosshair').style.display = 'block';
        });
        
        this.controls.addEventListener('unlock', () => {
            document.getElementById('crosshair').style.display = 'none';
        });
        
        this.keys = {};
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space' && this.canJump) {
                this.velocity.y = this.jumpHeight;
                this.canJump = false;
            }
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        this.camera.position.y = 2;
        
        this.playerModel = new PlayerModel(scene);
        this.playerModel.group.visible = false;
    }
    
    update(delta) {
        if (this.controls.isLocked) {
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;
            this.velocity.y -= this.gravity * delta;
            
            this.direction.z = Number(this.keys['KeyW']) - Number(this.keys['KeyS']);
            this.direction.x = Number(this.keys['KeyA']) - Number(this.keys['KeyD']);
            this.direction.normalize();
            
            if (this.keys['KeyW'] || this.keys['KeyS']) this.velocity.z -= this.direction.z * this.moveSpeed * delta * 100;
            if (this.keys['KeyA'] || this.keys['KeyD']) this.velocity.x -= this.direction.x * this.moveSpeed * delta * 100;
            
            this.controls.moveRight(-this.velocity.x * delta);
            this.controls.moveForward(-this.velocity.z * delta);
            
            this.camera.position.y += (this.velocity.y * delta);
            
            if (this.camera.position.y < 2) {
                this.velocity.y = 0;
                this.camera.position.y = 2;
        
        this.playerModel = new PlayerModel(scene);
        this.playerModel.group.visible = false;
                this.canJump = true;
            }
        }
    }
}
