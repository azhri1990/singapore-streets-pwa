import * as THREE from 'three';
/**
 * Gore System
 * Realistic gore effects for murder, weapon fire, dismemberment, etc.
 * Enhanced for Singapore Streets - includes blood types, gore levels, NSFW toggle
 */

export class GoreSystem {
    constructor(game) {
        this.game = game;
        this.bloodParticles = [];
        this.bloodDecals = [];
        this.goreLevel = 'full'; // 'none', 'low', 'medium', 'full', 'extreme'
        this.nsfwMode = true; // Singapore Streets is adult-only
        this.bloodColor = 0x8B0000;
        this.fleshColor = 0xCD5C5C;
        this.boneColor = 0xF5F5DC;
        this.maxParticles = 500;
        this.maxDecals = 100;
    }

    setGoreLevel(level) {
        this.goreLevel = level;
    }

    setNsfwMode(enabled) {
        this.nsfwMode = enabled;
    }

    // Create blood splatter effect
    createBloodSplatter(position, direction, intensity = 1, weaponType = 'generic') {
        if (this.goreLevel === 'none') return;
        
        const intensityMultiplier = this.getGoreIntensity();
        const count = Math.floor(20 * intensity * intensityMultiplier);
        
        for (let i = 0; i < count; i++) {
            if (this.bloodParticles.length >= this.maxParticles) break;
            const particle = this.createBloodParticle(position, direction, weaponType);
            this.bloodParticles.push(particle);
            this.game.scene.add(particle.mesh);
        }
        
        // Create blood decal on ground
        this.createBloodDecal(position, intensity * intensityMultiplier);
        
        // Create blood mist for intense hits
        if (intensity > 1.5) {
            this.createBloodMist(position, direction, intensity);
        }
    }

    createBloodParticle(position, direction, weaponType) {
        const size = (0.02 + Math.random() * 0.08) * this.getGoreSizeMultiplier();
        const geometry = new THREE.SphereGeometry(size, 4, 4);
        const material = new THREE.MeshStandardMaterial({ 
            color: this.bloodColor, 
            roughness: 0.3, 
            metalness: 0.1,
            transparent: true, 
            opacity: 0.9,
            emissive: this.bloodColor,
            emissiveIntensity: 0.2
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        
        const velocity = direction.clone().normalize();
        velocity.x += (Math.random() - 0.5) * 3;
        velocity.y += 1 + Math.random() * 4;
        velocity.z += (Math.random() - 0.5) * 3;
        velocity.multiplyScalar(2 + Math.random() * 5);
        
        return {
            mesh,
            velocity,
            life: 1.0,
            gravity: -12,
            drag: 0.98,
            splatterType: weaponType
        };
    }

    createBloodMist(position, direction, intensity) {
        const count = Math.floor(10 * intensity);
        for (let i = 0; i < count; i++) {
            const size = 0.1 + Math.random() * 0.3;
            const geometry = new THREE.SphereGeometry(size, 8, 8);
            const material = new THREE.MeshStandardMaterial({
                color: 0x8B0000,
                transparent: true,
                opacity: 0.4,
                roughness: 0.5,
                metalness: 0.0,
                emissive: 0x8B0000,
                emissiveIntensity: 0.15
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(position);
            mesh.position.x += (Math.random() - 0.5) * 2;
            mesh.position.y += Math.random() * 2;
            mesh.position.z += (Math.random() - 0.5) * 2;
            this.game.scene.add(mesh);
            
            const velocity = direction.clone().normalize();
            velocity.x += (Math.random() - 0.5) * 2;
            velocity.y += Math.random() * 2;
            velocity.z += (Math.random() - 0.5) * 2;
            velocity.multiplyScalar(1 + Math.random() * 2);
            
            this.bloodParticles.push({
                mesh,
                velocity,
                life: 0.5,
                gravity: -2,
                drag: 0.95,
                isMist: true
            });
        }
    }

    createBloodDecal(position, intensity) {
        if (this.bloodDecals.length >= this.maxDecals) {
            const old = this.bloodDecals.shift();
            this.game.scene.remove(old);
        }
        
        const size = 0.5 + intensity * 0.8;
        const geometry = new THREE.CircleGeometry(size, 24);
        const material = new THREE.MeshStandardMaterial({
            color: this.bloodColor,
            transparent: true,
            opacity: 0.7,
            roughness: 0.3,
            metalness: 0.1,
            emissive: this.bloodColor,
            emissiveIntensity: 0.15
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, 0.01, position.z);
        mesh.rotation.x = -Math.PI / 2;
        mesh.rotation.z = Math.random() * Math.PI * 2;
        this.game.scene.add(mesh);
        this.bloodDecals.push(mesh);
    }

    // Create gunshot wound effect
    createGunshotWound(position, direction, weaponType = 'pistol') {
        if (this.goreLevel === 'none') return;
        
        const intensity = weaponType === 'shotgun' ? 3 : weaponType === 'rifle' ? 2 : 1;
        
        // Entry wound
        const entryGeo = new THREE.SphereGeometry(0.04, 8, 8);
        const entryMat = new THREE.MeshStandardMaterial({ 
            color: this.bloodColor, 
            roughness: 0.2, 
            metalness: 0.0,
            transparent: true,
            opacity: 0.8,
            emissive: this.bloodColor,
            emissiveIntensity: 0.3 
        });
        const entry = new THREE.Mesh(entryGeo, entryMat);
        entry.position.copy(position);
        this.game.scene.add(entry);
        
        // Blood splatter
        this.createBloodSplatter(position, direction, 1.5 * intensity, 'gunshot');
        
        // Exit wound (if applicable)
        if (Math.random() > (weaponType === 'shotgun' ? 0.1 : 0.5)) {
            const exitPos = position.clone().add(direction.clone().multiplyScalar(0.5 + Math.random() * 0.5));
            const exitGeo = new THREE.SphereGeometry(0.08 * intensity, 8, 8);
            const exitMat = new THREE.MeshStandardMaterial({ 
                color: this.bloodColor, 
                roughness: 0.2, 
                metalness: 0.0,
                transparent: true,
                opacity: 0.8,
                emissive: this.bloodColor,
                emissiveIntensity: 0.3 
            });
            const exit = new THREE.Mesh(exitGeo, exitMat);
            exit.position.copy(exitPos);
            this.game.scene.add(exit);
            
            this.createBloodSplatter(exitPos, direction, 2 * intensity, 'gunshot');
        }
        
        // Blood spray from exit wound
        if (weaponType === 'shotgun' || weaponType === 'rifle') {
            this.createBloodSpray(position, direction, 3);
        }
    }

    createBloodSpray(position, direction, intensity) {
        const count = Math.floor(15 * intensity);
        for (let i = 0; i < count; i++) {
            const size = 0.03 + Math.random() * 0.05;
            const geometry = new THREE.ConeGeometry(size, size * 3, 4);
            const material = new THREE.MeshStandardMaterial({
                color: 0x8B0000,
                transparent: true,
                opacity: 0.8,
                roughness: 0.2,
                metalness: 0.0,
                emissive: 0x8B0000,
                emissiveIntensity: 0.2
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(position);
            
            const velocity = direction.clone().normalize();
            velocity.x += (Math.random() - 0.5) * 4;
            velocity.y += Math.random() * 2;
            velocity.z += (Math.random() - 0.5) * 4;
            velocity.multiplyScalar(3 + Math.random() * 4);
            
            mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), velocity.clone().normalize());
            this.game.scene.add(mesh);
            
            this.bloodParticles.push({
                mesh,
                velocity,
                life: 0.8,
                gravity: -8,
                drag: 0.97,
                isSpray: true
            });
        }
    }

    // Create melee attack gore
    createMeleeGore(position, weapon = 'fists', attacker, victim) {
        if (this.goreLevel === 'none') return;
        
        const goreIntensity = this.getGoreIntensity();
        let intensity = 0.5;
        let woundCount = 1;
        
        switch(weapon) {
            case 'bat':
                intensity = 2;
                woundCount = 2;
                break;
            case 'parang': // Singapore-specific
                intensity = 3;
                woundCount = 3;
                this.createDismemberment(position, 'arm');
                break;
            case 'knife':
                intensity = 1.5;
                woundCount = 2;
                this.createStabWound(position, weapon);
                break;
            case 'fists':
                intensity = 0.3;
                woundCount = 1;
                break;
            case 'machete':
                intensity = 2.5;
                woundCount = 3;
                this.createDismemberment(position, 'leg');
                break;
        }
        
        intensity *= goreIntensity;
        
        for (let i = 0; i < woundCount; i++) {
            this.createBloodSplatter(position, new THREE.Vector3(0, 1, 0), intensity, 'melee');
        }
        
        // Create wound
        for (let i = 0; i < woundCount; i++) {
            const woundGeo = new THREE.SphereGeometry(0.08 + Math.random() * 0.05, 8, 8);
            const woundMat = new THREE.MeshStandardMaterial({ 
                color: this.bloodColor, 
                roughness: 0.2, 
                metalness: 0.0,
                transparent: true, 
                opacity: 0.8,
                emissive: this.bloodColor,
                emissiveIntensity: 0.3
            });
            const wound = new THREE.Mesh(woundGeo, woundMat);
            wound.position.copy(position);
            wound.position.x += (Math.random() - 0.5) * 0.2;
            wound.position.y += (Math.random() - 0.5) * 0.2;
            wound.position.z += (Math.random() - 0.5) * 0.2;
            this.game.scene.add(wound);
        }
    }

    createStabWound(position, weapon) {
        const woundGeo = new THREE.CylinderGeometry(0.02, 0.05, 0.15, 8);
        const woundMat = new THREE.MeshStandardMaterial({ 
    color: 0x8B0000, 
    roughness: 0.2, 
    metalness: 0.0,
    transparent: true,
    opacity: 0.8,
    emissive: 0x8B0000,
    emissiveIntensity: 0.3
});
        const wound = new THREE.Mesh(woundGeo, woundMat);
        wound.position.copy(position);
        wound.rotation.z = Math.random() * Math.PI * 2;
        this.game.scene.add(wound);
        
        // Blood trickle
        this.createBloodTrickle(position);
    }

    createDismemberment(position, bodyPart) {
        // Create detached limb
        const limbGeo = new THREE.CapsuleGeometry(0.05, 0.2, 4, 8);
        const limbMat = new THREE.MeshStandardMaterial({ 
    color: this.fleshColor, 
    roughness: 0.5, 
    metalness: 0.0,
    transparent: true,
    opacity: 0.8,
    emissive: this.fleshColor,
    emissiveIntensity: 0.2
});
        const limb = new THREE.Mesh(limbGeo, limbMat);
        limb.position.copy(position);
        this.game.scene.add(limb);
        
        // Blood from severed end
        const bloodEndGeo = new THREE.CircleGeometry(0.08, 16);
        const bloodEndMat = new THREE.MeshStandardMaterial({ 
    color: this.bloodColor, 
    roughness: 0.3, 
    metalness: 0.0,
    transparent: true,
    opacity: 0.7,
    emissive: this.bloodColor,
    emissiveIntensity: 0.2
});
        const bloodEnd = new THREE.Mesh(bloodEndGeo, bloodEndMat);
        bloodEnd.position.copy(position);
        bloodEnd.rotation.x = -Math.PI / 2;
        this.game.scene.add(bloodEnd);
        
        // Heavy blood splatter
        this.createBloodSplatter(position, new THREE.Vector3(0, 1, 0), 4, 'dismemberment');
        
        // Add bone if visible
        if (this.goreLevel === 'extreme') {
            const boneGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8);
            const boneMat = new THREE.MeshStandardMaterial({ 
    color: this.boneColor, 
    roughness: 0.6, 
    metalness: 0.1,
    emissive: this.boneColor,
    emissiveIntensity: 0.15
});
            const bone = new THREE.Mesh(boneGeo, boneMat);
            bone.position.copy(position);
            this.game.scene.add(bone);
        }
    }

    createBloodTrickle(position) {
        const trickleGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 4);
        const trickleMat = new THREE.MeshStandardMaterial({ 
    color: this.bloodColor, 
    roughness: 0.2, 
    metalness: 0.0,
    transparent: true, 
    opacity: 0.6,
    emissive: this.bloodColor,
    emissiveIntensity: 0.1
});
        const trickle = new THREE.Mesh(trickleGeo, trickleMat);
        trickle.position.copy(position);
        trickle.position.y += 0.25;
        this.game.scene.add(trickle);
    }

    // Create explosion gore
    createExplosionGore(position, radius) {
        if (this.goreLevel === 'none') return;
        
        const goreIntensity = this.getGoreIntensity();
        
        // Multiple blood splatters in all directions
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const dir = new THREE.Vector3(Math.cos(angle), 0.5, Math.sin(angle));
            this.createBloodSplatter(position, dir, 2 * goreIntensity, 'explosion');
        }
        
        // Large blood decal
        this.createBloodDecal(position, 3 * goreIntensity);
        
        // Body parts scattered
        if (this.goreLevel === 'extreme') {
            for (let i = 0; i < 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * radius;
                const partPos = position.clone();
                partPos.x += Math.cos(angle) * dist;
                partPos.z += Math.sin(angle) * dist;
                this.createDismemberment(partPos, 'torso');
            }
        }
    }

    // Create Singapore-specific gore - parang attack
    createParangGore(position, direction) {
        this.createMeleeGore(position, 'parang', null, null);
        
        // Parang-specific: long slash wounds
        const slashGeo = new THREE.PlaneGeometry(0.5, 0.1);
        const slashMat = new THREE.MeshStandardMaterial({ 
    color: this.bloodColor, 
    roughness: 0.9, 
    metalness: 0.0,
    side: THREE.DoubleSide,
    transparent: true, 
    opacity: 0.8,
    emissive: this.bloodColor,
    emissiveIntensity: 0.4
});
        const slash = new THREE.Mesh(slashGeo, slashMat);
        slash.position.copy(position);
        slash.lookAt(position.clone().add(direction));
        this.game.scene.add(slash);
    }

    // Create gunshot with Singapore context
    createSingaporeGunshot(position, direction, weaponType = 'pistol') {
        this.createGunshotWound(position, direction, weaponType);
        
        // Add shell casing
        const casingGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.05, 8);
        const casingMat = new THREE.MeshStandardMaterial({ 
    color: 0x8B8B83, 
    roughness: 0.3, 
    metalness: 0.7,
    emissive: 0x8B8B83,
    emissiveIntensity: 0.1
});
        const casing = new THREE.Mesh(casingGeo, casingMat);
        casing.position.copy(position);
        casing.position.y += 0.1;
        casing.rotation.x = Math.PI / 2;
        this.game.scene.add(casing);
    }

    getGoreIntensity() {
        switch(this.goreLevel) {
            case 'none': return 0;
            case 'low': return 0.3;
            case 'medium': return 0.6;
            case 'full': return 1.0;
            case 'extreme': return 1.5;
            default: return 1.0;
        }
    }

    getGoreSizeMultiplier() {
        switch(this.goreLevel) {
            case 'none': return 0;
            case 'low': return 0.5;
            case 'medium': return 0.75;
            case 'full': return 1.0;
            case 'extreme': return 1.5;
            default: return 1.0;
        }
    }

    update(delta) {
        // Update blood particles
        for (let i = this.bloodParticles.length - 1; i >= 0; i--) {
            const p = this.bloodParticles[i];
            p.life -= delta * (p.isMist ? 1.0 : 0.5);
            p.velocity.y += p.gravity * delta;
            p.velocity.multiplyScalar(p.drag);
            p.mesh.position.addScaledVector(p.velocity, delta);
            
            if (p.mesh.material) {
                p.mesh.material.opacity = Math.max(0, p.life);
            }
            
            if (p.life <= 0) {
                this.game.scene.remove(p.mesh);
                this.bloodParticles.splice(i, 1);
            }
        }
        
        // Fade decals over time
        for (let i = this.bloodDecals.length - 1; i >= 0; i--) {
            const decal = this.bloodDecals[i];
            if (decal.material) {
                decal.material.opacity -= delta * 0.02;
                if (decal.material.opacity <= 0) {
                    this.game.scene.remove(decal);
                    this.bloodDecals.splice(i, 1);
                }
            }
        }
    }

    destroy() {
        // Clean up all gore
        for (const p of this.bloodParticles) {
            this.game.scene.remove(p.mesh);
        }
        for (const d of this.bloodDecals) {
            this.game.scene.remove(d);
        }
        this.bloodParticles = [];
        this.bloodDecals = [];
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.GoreSystem = GoreSystem;
}