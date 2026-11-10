import * as THREE from 'three';
/**
 * Ragdoll System
 * Realistic death physics using cannon-es
 */

export class RagdollSystem {
    constructor(game) {
        this.game = game;
        this.ragdolls = [];
    }

    createRagdoll(character, position, force) {
        const ragdoll = {
            character: character,
            position: position.clone(),
            force: force || new THREE.Vector3(0, 5, 0),
            parts: [],
            active: true
        };

        // Create ragdoll parts (simplified)
        const parts = ['head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
        for (const part of parts) {
            const partGeo = new THREE.SphereGeometry(0.2, 8, 8);
            const partMat = new THREE.MeshStandardMaterial({ 
                color: 0xCD5C5C, 
                roughness: 0.9, 
                metalness: 0.0 
            });
            const mesh = new THREE.Mesh(partGeo, partMat);
            mesh.position.copy(position);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.game.scene.add(mesh);
            ragdoll.parts.push({ name: part, mesh, velocity: force.clone() });
        }

        this.ragdolls.push(ragdoll);

        // Gore effect
        if (this.game.goreSystem) {
            this.game.goreSystem.createBloodSplatter(position, force, 2);
        }

        return ragdoll;
    }

    update(delta) {
        for (const ragdoll of this.ragdolls) {
            if (!ragdoll.active) continue;

            for (const part of ragdoll.parts) {
                // Apply gravity
                part.velocity.y -= 9.8 * delta;
                
                // Apply drag
                part.velocity.multiplyScalar(0.98);
                
                // Update position
                part.mesh.position.addScaledVector(part.velocity, delta);
                
                // Ground collision
                if (part.mesh.position.y < 0.2) {
                    part.mesh.position.y = 0.2;
                    part.velocity.y = 0;
                    part.velocity.x *= 0.5;
                    part.velocity.z *= 0.5;
                }
            }
        }
    }

    destroy() {
        for (const ragdoll of this.ragdolls) {
            for (const part of ragdoll.parts) {
                this.game.scene.remove(part.mesh);
            }
        }
        this.ragdolls = [];
    }
}

if (typeof window !== 'undefined') {
    window.RagdollSystem = RagdollSystem;
}