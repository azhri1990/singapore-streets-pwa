import * as THREE from 'three';
/**
 * GTA-Style Combat System
 * Punching, shooting, weapons
 */

export class CombatSystem {
    constructor(game) {
        this.game = game;
        this.currentWeapon = 'fists';
        this.weapons = {
            'fists': { damage: 10, range: 1.5, cooldown: 500, ammo: Infinity },
            'bat': { damage: 25, range: 2, cooldown: 800, ammo: Infinity },
            'pistol': { damage: 35, range: 50, cooldown: 300, ammo: 50 },
            'shotgun': { damage: 60, range: 20, cooldown: 1200, ammo: 20 },
            'rifle': { damage: 45, range: 100, cooldown: 150, ammo: 120 },
            'sniper': { damage: 100, range: 200, cooldown: 2000, ammo: 10 }
        };
        
        this.lastAttackTime = 0;
        this.isAiming = false;
        this.crosshair = null;
        
        this.setupControls();
        this.createCrosshair();
    }
    
    setupControls() {
        window.addEventListener('mousedown', (e) => {
            if (e.button === 0) this.attack();
            if (e.button === 2) this.toggleAim();
        });
        
        window.addEventListener('contextmenu', (e) => e.preventDefault());
        
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyQ') this.cycleWeapon(-1);
            if (e.code === 'KeyE') this.cycleWeapon(1);
            if (e.code === 'KeyR') this.reload();
        });
    }
    
    createCrosshair() {
        this.crosshair = document.createElement('div');
        this.crosshair.id = 'crosshair';
        this.crosshair.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            pointer-events: none;
            z-index: 1000;
            display: none;
        `;
        this.crosshair.innerHTML = `
            <div style="position: absolute; top: 50%; left: 0; width: 100%; height: 2px; background: #ff0000; transform: translateY(-50%);"></div>
            <div style="position: absolute; left: 50%; top: 0; width: 2px; height: 100%; background: #ff0000; transform: translateX(-50%);"></div>
        `;
        document.body.appendChild(this.crosshair);
    }
    
    toggleAim() {
        this.isAiming = !this.isAiming;
        this.crosshair.style.display = this.isAiming ? 'block' : 'none';
    }
    
    cycleWeapon(direction) {
        const weaponNames = Object.keys(this.weapons);
        const currentIndex = weaponNames.indexOf(this.currentWeapon);
        const newIndex = (currentIndex + direction + weaponNames.length) % weaponNames.length;
        this.currentWeapon = weaponNames[newIndex];
        
        if (this.game.showNotification) {
            this.game.showNotification('🔫 WEAPON', this.currentWeapon.toUpperCase());
        }
    }
    
    reload() {
        const weapon = this.weapons[this.currentWeapon];
        if (weapon.ammo !== Infinity) {
            weapon.ammo = this.getMaxAmmo(this.currentWeapon);
            if (this.game.showNotification) {
                this.game.showNotification('🔄 RELOAD', `${this.currentWeapon}: ${weapon.ammo}`);
            }
        }
    }
    
    getMaxAmmo(weaponName) {
        const maxAmmo = { 'pistol': 50, 'shotgun': 20, 'rifle': 120, 'sniper': 10 };
        return maxAmmo[weaponName] || 0;
    }
    
    attack() {
        const now = Date.now();
        const weapon = this.weapons[this.currentWeapon];
        
        if (now - this.lastAttackTime < weapon.cooldown) return;
        if (weapon.ammo <= 0 && weapon.ammo !== Infinity) {
            if (this.game.showNotification) {
                this.game.showNotification('⚠️ EMPTY', 'Out of ammo! Press R to reload');
            }
            return;
        }
        
        this.lastAttackTime = now;
        
        if (weapon.ammo !== Infinity) {
            weapon.ammo--;
        }
        
        // DualSense haptic feedback on attack
        if (this.game.controllerSupport?.isDualSense) {
            if (this.currentWeapon === 'fists' || this.currentWeapon === 'bat') {
                this.game.controllerSupport.triggerCrashHaptic(0.4);
            } else if (this.currentWeapon === 'shotgun') {
                this.game.controllerSupport.triggerExplosionHaptic(0.6);
            } else if (this.currentWeapon === 'sniper') {
                this.game.controllerSupport.triggerExplosionHaptic(0.8);
            } else {
                this.game.controllerSupport.triggerGunshotHaptic(0.5);
            }
        }
        
        // Melee attack
        if (this.currentWeapon === 'fists' || this.currentWeapon === 'bat') {
            this.meleeAttack(weapon);
        } else {
            this.rangedAttack(weapon);
        }
    }
    
    meleeAttack(weapon) {
        // Check for nearby targets
        const playerPos = this.game.player.position;
        const range = weapon.range;
        
        this.game.scene.traverse((obj) => {
            if (obj.userData && obj.userData.health && obj !== this.game.player.mesh) {
                const dist = playerPos.distanceTo(obj.position);
                if (dist < range) {
                    this.damageTarget(obj, weapon.damage);
                }
            }
        });
    }
    
    rangedAttack(weapon) {
        // Raycast from camera
        const raycaster = new THREE.Raycaster();
        const direction = new THREE.Vector3();
        this.game.camera.getWorldDirection(direction);
        raycaster.set(this.game.camera.position, direction);
        
        const intersects = raycaster.intersectObjects(this.game.scene.children, true);
        
        for (const hit of intersects) {
            if (hit.distance > weapon.range) break;
            
            // Check if hit a target
            let target = hit.object;
            while (target && !target.userData.health) {
                target = target.parent;
            }
            
            if (target && target.userData.health) {
                this.damageTarget(target, weapon.damage);
                break;
            }
        }
    }
    
    damageTarget(target, damage) {
        target.userData.health -= damage;
        
        // Create gore effect
        if (this.game.goreSystem) {
            const isGun = this.currentWeapon !== 'fists' && this.currentWeapon !== 'bat';
            if (isGun) {
                const dir = new THREE.Vector3();
                this.game.camera.getWorldDirection(dir);
                this.game.goreSystem.createGunshotWound(target.position, dir);
            } else {
                this.game.goreSystem.createMeleeGore(target.position, this.currentWeapon);
            }
        }
        
        // Visual feedback
        if (target.material) {
            const originalColor = target.material.color.clone();
            target.material.color.set(0xff0000);
            setTimeout(() => {
                if (target.material) target.material.color.copy(originalColor);
            }, 100);
        }
        
        if (target.userData.health <= 0) {
            this.killTarget(target);
        }
        
        // Commit crime if hitting police or pedestrian
        if (target.userData.type === 'police' || target.userData.type === 'pedestrian') {
            if (this.game.wantedSystem) {
                this.game.wantedSystem.commitCrime('shooting', 2);
            }
        }
    }
    
    killTarget(target) {
        if (target.userData.type === 'pedestrian') {
            // Remove pedestrian
            this.game.scene.remove(target);
        }
    }
    
    update(delta) {
        // Update weapon cooldowns, etc.
    }
}
