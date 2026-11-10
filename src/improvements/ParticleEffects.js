/**
 * Particle Effects System for Singapore Streets
 * Advanced particle generation for atmosphere, weather, and gameplay effects
 * Based on: three-gpu-particles / smoke sim patterns, realistic exhaust, rain
 * Includes: Rain particles, smoke particles, fire particles, explosion particles,
 *       exhaust fumes, dust, ambient sparks, performance adaptive pools
 */
import * as THREE from 'three';

export class ParticleEffectsSystem {
    constructor(scene) {
        this.scene = scene;
        this.particlePool = new Map();
        this.activeParticles = new Set();
        this.maxParticles = 500;
        this.currentCount = 0;
        this.rainSystem = null;
        this.exhaustSystem = null;
        this.smokeSystem = null;
        this.fireSystem = null;
        this.explosionSystem = null;
        this.dustSystem = null;
        this.sparksSystem = null;
        this.initSystems();
        this.initRainPool();
        this.initSmokePool();
        this.initFirePool();
        this.initExplosionPool();
        this.initExhaustPool();
        this.initDustPool();
        this.initSparksPool();
    }
    
    initSystems() {
        // Performance tracking
        this.fps = 60;
        this.lastFPSUpdate = performance.now();
        this.fpsCount = 0;
        this.fpsAccum = 0;
        this.lastFrameTime = performance.now();
        
        // Adaptive particle budget based on performance
        this.particleBudget = 300;
    }
    
    initRainPool() {
        this.rainSystem = new THREE.Points(this.createRainGeometry(), {
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        this.scene.add(this.rainSystem);
        this.rainSystem.visible = false;
        this.activeParticles.add('rain');
        this.rainMesh = this.rainSystem;
    }
    
    initSmokePool() {
        this.smokeSystem = new THREE.Points(this.createSmokeGeometry(), {
            size: 0.1,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        this.scene.add(this.smokeSystem);
        this.smokeSystem.visible = false;
        this.smokeMesh = this.smokeSystem;
    }
    
    initFirePool() {
        this.fireSystem = new THREE.Points(this.createFireGeometry(), {
            size: 0.08,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        this.scene.add(this.fireSystem);
        this.fireSystem.visible = false;
        this.fireMesh = this.fireSystem;
    }
    
    initExplosionPool() {
        this.explosionSystem = new THREE.Points(this.createExplosionGeometry(), {
            size: 0.2,
            transparent: true,
            opacity: 0.7,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        this.scene.add(this.explosionSystem);
        this.explosionSystem.visible = false;
        this.explosionMesh = this.explosionSystem;
    }
    
    initExhaustPool() {
        this.exhaustSystem = new THREE.Points(this.createExhaustGeometry(), {
            size: 0.05,
            transparent: true,
            opacity: 0.3,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        this.scene.add(this.exhaustSystem);
        this.exhaustSystem.visible = false;
        this.exhaustMesh = this.exhaustSystem;
    }
    
    initDustPool() {
        this.dustSystem = new THREE.Points(this.createDustGeometry(), {
            size: 0.05,
            transparent: true,
            opacity: 0.4,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        this.scene.add(this.dustSystem);
        this.dustSystem.visible = false;
        this.dustMesh = this.dustSystem;
    }
    
    initSparksPool() {
        this.sparksSystem = new THREE.Points(this.createSparksGeometry(), {
            size: 0.04,
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        this.scene.add(this.sparksSystem);
        this.sparksSystem.visible = false;
        this.sparksMesh = this.sparksSystem;
    }
    
    createRainGeometry() {
        // Rain: thousands of small thin lines/points falling fast
        const positions = new Float32Array(100000 * 3);
        for (let i = 0; i < 100000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }
    
    createSmokeGeometry() {
        const positions = new Float32Array(20000 * 3);
        for (let i = 0; i < 20000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() * 2);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }
    
    createFireGeometry() {
        const positions = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 1] = (Math.random() * 2);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }
    
    createExplosionGeometry() {
        const positions = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 1] = (Math.random() * 1);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }
    
    createExhaustGeometry() {
        const positions = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 0.1;
            positions[i * 3 + 1] = (Math.random() * 0.2);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }
    
    createDustGeometry() {
        const positions = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 1] = (Math.random() * 0.1);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }
    
    createSparksGeometry() {
        const positions = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 0.05;
            positions[i * 3 + 1] = (Math.random() * 0.05);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }
    
    // Trigger effects
    triggerRain(intensity = 1.0, duration = 5) {
        this.rainSystem.visible = true;
        this.updateRainPositions(intensity, duration);
        return this.rainSystem;
    }
    
    triggerSmoke(position = new THREE.Vector3(), count = 20) {
        this.smokeSystem.visible = true;
        this.smokeSystem.position.copy(position);
        this.updateSmokeParticles(position, count);
        return this.smokeSystem;
    }
    
    triggerFire(position = new THREE.Vector3(), count = 10) {
        this.fireSystem.visible = true;
        this.fireSystem.position.copy(position);
        this.updateFireParticles(position, count);
        return this.fireSystem;
    }
    
    triggerExplosion(position = new THREE.Vector3(), count = 30, radius = 3) {
        this.explosionSystem.visible = true;
        this.explosionSystem.position.copy(position);
        this.updateExplosionParticles(position, count, radius);
        return this.explosionSystem;
    }
    
    triggerExhaust(position = new THREE.Vector3(), count = 5) {
        this.exhaustSystem.visible = true;
        this.exhaustSystem.position.copy(position);
        this.updateExhaustParticles(position, count);
        return this.exhaustSystem;
    }
    
    triggerDust(position = new THREE.Vector3(), count = 5) {
        this.dustSystem.visible = true;
        this.dustSystem.position.copy(position);
        this.updateDustParticles(position, count);
        return this.dustSystem;
    }
    
    triggerSparks(position = new THREE.Vector3(), count = 5) {
        this.sparksSystem.visible = true;
        this.sparksSystem.position.copy(position);
        this.updateSparksParticles(position, count);
        return this.sparksSystem;
    }
    
    updateRainPositions(intensity = 1.0, duration = 5) {
        // Rain: fast falling particles
        const positions = this.rainSystem.geometry.attributes.position;
        const velocity = new THREE.Vector3(0, -20, 0);
        for (let i = 0; i < positions.count; i++) {
            const pos = positions.getX(i);
            const posY = positions.getY(i);
            const posZ = positions.getZ(i);
            positions.setXYZ(i, pos, posY - velocity.y * 0.016, posZ);
        }
        positions.needsUpdate = true;
        this.rainSystem.material.opacity = 0.6 * intensity;
    }
    
    updateSmokeParticles(position, count) {
        const particles = this.smokeSystem.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            particles.setXYZ(
                i,
                position.x + (Math.random() - 0.5) * 1,
                position.y + Math.random() * 2,
                position.z + (Math.random() - 0.5) * 1
            );
        }
        particles.needsUpdate = true;
    }
    
    updateFireParticles(position, count) {
        const particles = this.fireSystem.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            particles.setXYZ(
                i,
                position.x + (Math.random() - 0.5) * 2,
                position.y + Math.random() * 3,
                position.z + (Math.random() - 0.5) * 2
            );
        }
        particles.needsUpdate = true;
    }
    
    updateExplosionParticles(position, count, radius) {
        const particles = this.explosionSystem.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const height = Math.random() * radius;
            particles.setXYZ(
                i,
                position.x + Math.cos(angle) * radius * Math.random(),
                position.y + height,
                position.z + Math.sin(angle) * radius * Math.random()
            );
        }
        particles.needsUpdate = true;
    }
    
    updateExhaustParticles(position, count) {
        const particles = this.exhaustSystem.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            particles.setXYZ(
                i,
                position.x + (Math.random() - 0.5) * 0.05,
                position.y + Math.random() * 0.2,
                position.z + (Math.random() - 0.5) * 0.05
            );
        }
        particles.needsUpdate = true;
    }
    
    updateDustParticles(position, count) {
        const particles = this.dustSystem.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            particles.setXYZ(
                i,
                position.x + (Math.random() - 0.5) * 0.5,
                position.y + Math.random() * 0.1,
                position.z + (Math.random() - 0.5) * 0.5
            );
        }
        particles.needsUpdate = true;
    }
    
    updateSparksParticles(position, count) {
        const particles = this.sparksSystem.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            particles.setXYZ(
                i,
                position.x + (Math.random() - 0.5) * 0.05,
                position.y + Math.random() * 0.05,
                position.z + (Math.random() - 0.5) * 0.05
            );
        }
        particles.needsUpdate = true;
    }
    
    // Performance-based adaptive particles
    updateFPS(currentFps) {
        this.fps = currentFps;
        const targetFps = this.gameQuality?.fps || 60;
        const efficiency = targetFps / Math.max(this.fps, 10);
        // Reduce budget if needed
        this.particleBudget = Math.max(100, Math.min(400, Math.floor(300 * efficiency)));
    }
    
    setGameQuality(quality) {
        this.gameQuality = quality;
        this.updateFPS(quality.fps || 60);
    }
    
    dispose() {
        // Cleanup all systems
        for (const [key, sys] of Object.entries({
            rain: this.rainSystem,
            smoke: this.smokeSystem,
            fire: this.fireSystem,
            explosion: this.explosionSystem,
            exhaust: this.exhaustSystem,
            dust: this.dustSystem,
            sparks: this.sparksSystem
        })) {
            if (sys && sys.geometry) sys.geometry.dispose();
        }
    }
}

export default ParticleEffectsSystem;
