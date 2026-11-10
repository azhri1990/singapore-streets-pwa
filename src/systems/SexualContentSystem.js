import * as THREE from 'three';
/**
 * Sexual Content System
 * Handles adult content, NSFW toggle, explicit scenes
 * Singapore Streets - Adult-only mode
 */

export class SexualContentSystem {
    constructor(game) {
        this.game = game;
        this.nsfwEnabled = true;
        this.contentLevel = 'explicit'; // 'none', 'mild', 'explicit', 'extreme'
        this.adultVenues = [];
        this.explicitScenes = [];
    }

    setContentLevel(level) {
        this.contentLevel = level;
    }

    toggleNsfw(enabled) {
        this.nsfwEnabled = enabled;
        if (!enabled) {
            this.hideAllExplicitContent();
        }
    }

    // Create adult venue (Geylang entertainment district)
    createAdultVenue(position, type = 'club') {
        if (!this.nsfwEnabled) return null;
        
        const venue = {
            type,
            position,
            performers: [],
            patrons: [],
            active: true
        };
        
        // Create venue mesh
        const venueGeo = new THREE.BoxGeometry(15, 8, 20);
        const venueMat = new THREE.MeshStandardMaterial({ 
            color: type === 'club' ? 0x8B008B : 0x4B0082,
            transparent: true,
            opacity: 0.8,
            roughness: 0.8,
            metalness: 0.0
        });
        const venueMesh = new THREE.Mesh(venueGeo, venueMat);
        venueMesh.position.copy(position);
        venueMesh.castShadow = true;
        venueMesh.receiveShadow = true;
        this.game.scene.add(venueMesh);
        venue.mesh = venueMesh;
        
        // Add neon signs
        this.createNeonSign(venueMesh, type);
        
        // Add performers
        this.spawnPerformers(venue);
        
        this.adultVenues.push(venue);
        return venue;
    }

    createNeonSign(mesh, type) {
        const signGeo = new THREE.PlaneGeometry(8, 2);
        const signMat = new THREE.MeshStandardMaterial({ 
            color: 0xFF00FF,
            emissive: 0xFF00FF,
            emissiveIntensity: 1,
            roughness: 0.1,
            metalness: 0.0
        });
        const sign = new THREE.Mesh(signGeo, signMat);
        sign.position.copy(mesh.position);
        sign.position.y += 4;
        sign.position.z += 11;
        this.game.scene.add(sign);
    }

    spawnPerformers(venue) {
        if (!this.nsfwEnabled) return;
        
        const count = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
            const performer = {
                position: venue.position.clone(),
                position: venue.position.clone().add(new THREE.Vector3(
                    (Math.random() - 0.5) * 10,
                    0,
                    (Math.random() - 0.5) * 10
                )),
                type: Math.random() > 0.5 ? 'dancer' : 'hostess',
                active: true
            };
            venue.performers.push(performer);
        }
    }

    // Create explicit scene between characters
    createExplicitScene(char1, char2, intensity = 'explicit') {
        if (!this.nsfwEnabled) return null;
        if (this.contentLevel === 'none') return null;
        
        const scene = {
            participants: [char1, char2],
            intensity,
            active: true,
            position: char1.position.clone()
        };
        
        // Trigger animations
        this.triggerExplicitAnimations(char1, char2, intensity);
        
        // Add environmental effects
        this.addAmbientEffects(scene.position);
        
        this.explicitScenes.push(scene);
        return scene;
    }

    triggerExplicitAnimations(char1, char2, intensity) {
        if (!char1 || !char2) return;
        
        // Move characters close together
        const midpoint = char1.position.clone().lerp(char2.position, 0.5);
        char1.position.lerp(midpoint, 0.5);
        char2.position.lerp(midpoint, 0.5);
        
        // Face each other
        const dir = char2.position.clone().sub(char1.position).normalize();
        char1.rotation.y = Math.atan2(dir.x, dir.z);
        char2.rotation.y = Math.atan2(-dir.x, -dir.z);
        
        // Trigger animation based on intensity
        if (intensity === 'explicit' || intensity === 'extreme') {
            // Use existing animation system
            if (char1.play) char1.play('dance');
            if (char2.play) char2.play('dance');
        }
    }

    addAmbientEffects(position) {
        // Add mood lighting
        const light = new THREE.PointLight(0xFF1493, 2, 10);
        light.position.copy(position);
        light.position.y += 3;
        this.game.scene.add(light);
        
        // Add particle effects
        this.createHeartParticles(position);
    }

    createHeartParticles(position) {
        const count = 20;
        for (let i = 0; i < count; i++) {
            const size = 0.1 + Math.random() * 0.2;
            const geometry = new THREE.SphereGeometry(size, 8, 8);
            const material = new THREE.MeshStandardMaterial({
                color: 0xFF69B4,
                transparent: true,
                opacity: 0.6,
                roughness: 0.3,
                metalness: 0.0
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(position);
            mesh.position.x += (Math.random() - 0.5) * 3;
            mesh.position.y += Math.random() * 2;
            mesh.position.z += (Math.random() - 0.5) * 3;
            this.game.scene.add(mesh);
            
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                Math.random() * 3,
                (Math.random() - 0.5) * 2
            );
            
            // Auto-remove after 3 seconds
            setTimeout(() => {
                this.game.scene.remove(mesh);
            }, 3000);
        }
    }

    // Create red light district (Geylang)
    createRedLightDistrict(center, size = 100) {
        if (!this.nsfwEnabled) return;
        
        const district = {
            center,
            size,
            venues: [],
            active: true
        };
        
        // Create multiple venues
        const venueCount = 8 + Math.floor(Math.random() * 5);
        for (let i = 0; i < venueCount; i++) {
            const angle = (i / venueCount) * Math.PI * 2;
            const dist = 20 + Math.random() * 30;
            const pos = center.clone().add(new THREE.Vector3(
                Math.cos(angle) * dist,
                0,
                Math.sin(angle) * dist
            ));
            
            const types = ['club', 'brothel', 'massage', 'bar'];
            const type = types[Math.floor(Math.random() * types.length)];
            const venue = this.createAdultVenue(pos, type);
            if (venue) district.venues.push(venue);
        }
        
        return district;
    }

    hideAllExplicitContent() {
        for (const venue of this.adultVenues) {
            if (venue.mesh) venue.mesh.visible = false;
            for (const p of venue.performers) {
                p.active = false;
            }
        }
        for (const scene of this.explicitScenes) {
            scene.active = false;
        }
    }

    showAllExplicitContent() {
        for (const venue of this.adultVenues) {
            if (venue.mesh) venue.mesh.visible = true;
            for (const p of venue.performers) {
                p.active = true;
            }
        }
        for (const scene of this.explicitScenes) {
            scene.active = true;
        }
    }

    update(delta) {
        if (!this.nsfwEnabled) return;
        
        // Update explicit scenes
        for (let i = this.explicitScenes.length - 1; i >= 0; i--) {
            const scene = this.explicitScenes[i];
            if (!scene.active) {
                this.explicitScenes.splice(i, 1);
            }
        }
    }

    destroy() {
        this.hideAllExplicitContent();
        this.adultVenues = [];
        this.explicitScenes = [];
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.SexualContentSystem = SexualContentSystem;
}