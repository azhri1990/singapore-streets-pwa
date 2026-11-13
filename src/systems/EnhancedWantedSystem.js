import * as THREE from 'three';
/**
 * Enhanced Wanted System - Based on neon-mayhem
 * Heat-based with witnessing, escalation, cooling
 */

export class EnhancedWantedSystem {
    constructor(game) {
        this.game = game;
        this.heat = 0;
        this.maxHeat = 2900;
        this.lastCrime = -99;
        this.lastSeen = 0;
        this.peak = 0;
        
        // Thresholds for star levels
        this.thresholds = [0, 138, 366, 698, 1148, 1730, 2450];
        this.maxStars = 6;
        
        // Heat values for crimes
        this.crimeHeat = {
            hit_ped: 20,
            kill_ped: 70,
            jack: 58,
            shoot_car: 18,
            hit_car: 5,
            kill_cop: 170,
            steal_police: 75,
            hit_cop_car: 26,
            speeding: 10,
            running_red: 30,
            shooting: 50,
            robbery: 80
        };
        
        // Crimes that always draw heat even unwitnessed
        this.alwaysHeat = { kill_cop: 1, steal_police: 1 };
        
        // Per-victim crimes
        this.perVictim = { kill_ped: 1, kill_cop: 1 };
        
        this.crimeCooldown = {};
        this.roadblocks = [];
        this.spikes = [];
        this.helicopter = null;
        this.announcedArmy = false;
        
        this.setupUI();
    }
    
    setupUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'wanted-ui-enhanced';
        this.ui.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 4px;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(this.ui);
        this.updateUI();
    }
    
    updateUI() {
        this.ui.innerHTML = '';
        const stars = this.getStars();
        for (let i = 0; i < this.maxStars; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                width: 28px;
                height: 28px;
                font-size: 22px;
                color: ${i < stars ? '#ff0000' : '#444'};
                text-shadow: 0 0 8px ${i < stars ? '#ff0000' : 'transparent'};
                transition: all 0.3s;
            `;
            star.textContent = '★';
            this.ui.appendChild(star);
        }
    }
    
    getStars() {
        let s = 0;
        for (let i = this.maxStars; i >= 1; i--) {
            if (this.heat >= this.thresholds[i]) { s = i; break; }
        }
        return s;
    }
    
    // Check if crime is witnessed
    isWitnessed(pos) {
        const peds = this.game.world?.peds || [];
        const vis = 1.0; // weather visibility
        for (let i = 0; i < peds.length; i++) {
            const p = peds[i];
            if (p.dead) continue;
            const range = (p.isCop ? 95 : 32) * vis;
            const dist = Math.sqrt((p.pos.x - pos.x) ** 2 + (p.pos.z - pos.z) ** 2);
            if (dist < range) {
                // Check line of sight (simplified)
                return true;
            }
        }
        return false;
    }
    
    // Report a crime
    reportCrime(type, pos) {
        if (!this.game.player || this.game.player.state !== 'alive') return;
        
        const now = Date.now();
        if (!this.perVictim[type] && this.crimeCooldown[type] && now - this.crimeCooldown[type] < 1200) return;
        if (!this.alwaysHeat[type] && !this.isWitnessed(pos)) return;
        
        this.crimeCooldown[type] = now;
        this.lastCrime = now;
        
        const before = this.getStars();
        
        // Escalation: offending while wanted increases heat more
        const gain = (this.crimeHeat[type] || 20) * (1 + before * 0.10);
        
        this.heat = Math.min(this.maxHeat, this.heat + gain);
        
        // Cop kill floor
        if (type === 'kill_cop') {
            this.heat = Math.max(this.heat, this.thresholds[2] + 10);
        }
        if (type === 'steal_police') {
            this.heat = Math.max(this.heat, this.thresholds[1] + 5);
        }
        
        // No single offence moves more than one star
        const capStar = Math.max(type === 'kill_cop' ? 2 : 0, Math.min(5, before + 1));
        if (capStar < 5) {
            this.heat = Math.min(this.heat, this.thresholds[capStar + 1] - 8);
        }
        
        this.lastSeen = 0;
        
        const after = this.getStars();
        if (after > before) {
            if (this.game.showNotification) {
                this.game.showNotification('🚨 WANTED', `Wanted level: ${after} stars`);
            }
            if (after >= 3) {
                this.spawnHelicopter();
            }
            if (after >= 4) {
                this.setupRoadblocks();
            }
            if (after >= 5) {
                this.spawnArmy();
            }
        }
        
        this.updateUI();
        this.spawnPoliceResponse();
    }
    
    // Note gunfire
    noteGunfire(pos) {
        if (!this.game.player || this.game.player.state !== 'alive') return;
        
        const now = Date.now();
        if (this.crimeCooldown.gunfire && now - this.crimeCooldown.gunfire < 2500) return;
        
        // Check if anyone nearby heard it
        const peds = this.game.world?.peds || [];
        let heard = false;
        for (let i = 0; i < peds.length; i++) {
            if (!peds[i].dead) {
                const dist = Math.sqrt((peds[i].pos.x - pos.x) ** 2 + (peds[i].pos.z - pos.z) ** 2);
                if (dist < 40) { heard = true; break; }
            }
        }
        if (!heard) return;
        
        this.crimeCooldown.gunfire = now;
        this.lastCrime = now;
        
        const before = this.getStars();
        this.heat = Math.max(this.heat + 55 * (1 + before * 0.10), this.thresholds[1] + 5);
        this.heat = Math.min(this.maxHeat, this.heat);
        this.lastSeen = 0;
        
        if (this.getStars() > before) {
            if (this.game.showNotification) {
                this.game.showNotification('🚨 WANTED', `Wanted level: ${this.getStars()} stars`);
            }
        }
        
        this.updateUI();
    }
    
    // Set wanted level manually
    setWanted(n) {
        n = Math.max(0, Math.min(this.maxStars, Math.floor(n)));
        if (n === 0) this.peak = 0;
        this.heat = n === 0 ? 0 : this.thresholds[n] + 25;
        if (n > 0) {
            this.lastCrime = Date.now();
            this.lastSeen = 0;
        }
        if (this.game.showNotification) {
            this.game.showNotification('🚨 WANTED', `Wanted level: ${n} stars`);
        }
        // DualSense haptic feedback on wanted level
        if (this.game.controllerSupport?.isDualSense && n > 0) {
            this.game.controllerSupport.triggerWantedLevelHaptic(n);
        }
        this.updateUI();
        if (n === 0) this.clearCops();
    }
    
    clearWanted() {
        this.setWanted(0);
    }
    
    clearCops() {
        // Remove police units
        if (this.policeUnits) {
            this.policeUnits.forEach(unit => {
                if (unit.mesh) this.game.scene.remove(unit.mesh);
            });
        }
        this.policeUnits = [];
        this.helicopter = null;
        this.roadblocks = [];
        this.spikes = [];
    }
    
    spawnPoliceResponse() {
        const stars = this.getStars();
        const unitsToSpawn = [0, 1, 2, 3, 4, 6, 6][stars] || 0;
        
        for (let i = 0; i < unitsToSpawn; i++) {
            if (!this.policeUnits) this.policeUnits = [];
            if (this.policeUnits.length < 20) {
                this.spawnPoliceUnit();
            }
        }
    }
    
    spawnPoliceUnit() {
        // Create police vehicle (simplified)
        const policeCar = this.game.createVehicle ? this.game.createVehicle('singaporePolice') : null;
        if (policeCar) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 50 + Math.random() * 100;
            policeCar.position.set(
                this.game.player.position.x + Math.cos(angle) * dist,
                0.5,
                this.game.player.position.z + Math.sin(angle) * dist
            );
            if (!this.policeUnits) this.policeUnits = [];
            this.policeUnits.push({
                mesh: policeCar,
                target: this.game.player,
                speed: 25 + Math.random() * 10
            });
            this.game.scene.add(policeCar);
        }
    }
    
    spawnHelicopter() {
        if (!this.helicopter) {
            console.log('Police helicopter deployed!');
            this.helicopter = { active: true };
        }
    }
    
    setupRoadblocks() {
        console.log('Roadblocks set up!');
    }
    
    spawnArmy() {
        if (!this.announcedArmy) {
            this.announcedArmy = true;
            if (this.game.showNotification) {
                this.game.showNotification('🪖 ARMY DEPLOYED', 'Singapore Armed Forces deployed!');
            }
        }
    }
    
    update(delta) {
        if (this.heat <= 0) return;
        
        // Update police units (chase player)
        if (this.policeUnits) {
            this.policeUnits.forEach(unit => {
                if (!unit.mesh || !unit.target) return;
                
                const dir = new THREE.Vector3()
                    .subVectors(unit.target.position, unit.mesh.position)
                    .normalize();
                
                unit.mesh.position.addScaledVector(dir, unit.speed * delta);
                unit.mesh.lookAt(unit.target.position);
            });
        }
        
        // Cooling system
        const now = Date.now();
        const timeSinceCrime = (now - this.lastCrime) / 1000;
        
        if (timeSinceCrime > 20) { // ONE_STAR_HOLD
            // Check if seen by police
            const seenRecently = (now - this.lastSeen) / 1000 < 2;
            
            if (seenRecently) {
                // Chase cooling - slower
                this.heat = Math.max(0, this.heat - 0.5 * delta);
            } else {
                // Normal cooling
                this.heat = Math.max(0, this.heat - 2 * delta);
            }
            
            this.updateUI();
            
            if (this.heat <= 0) {
                this.clearWanted();
            }
        }
    }
    
    getStars() {
        return this.getStars();
    }
    
    isWanted() {
        return this.heat > 0;
    }
}
