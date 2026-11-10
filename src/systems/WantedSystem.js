import * as THREE from 'three';
/**
 * GTA-Style Wanted System
 * Police chase with 1-5 star wanted levels
 */

export class WantedSystem {
    constructor(game) {
        this.game = game;
        this.wantedLevel = 0;
        this.maxWantedLevel = 5;
        this.lastCrimeTime = 0;
        this.crimeCooldown = 5000;
        
        this.policeUnits = [];
        this.helicopter = null;
        this.roadblocks = [];
        
        this.decayRate = 0.1;
        this.decayDelay = 10000;
        
        this.setupUI();
    }
    
    setupUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'wanted-ui';
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
        for (let i = 0; i < this.maxWantedLevel; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                width: 28px;
                height: 28px;
                font-size: 22px;
                color: ${i < Math.ceil(this.wantedLevel) ? '#ff0000' : '#444'};
                text-shadow: 0 0 8px ${i < Math.ceil(this.wantedLevel) ? '#ff0000' : 'transparent'};
                transition: all 0.3s;
            `;
            star.textContent = '★';
            this.ui.appendChild(star);
        }
    }
    
    commitCrime(crimeType, severity = 1) {
        const now = Date.now();
        if (now - this.lastCrimeTime < this.crimeCooldown) return;
        
        this.lastCrimeTime = now;
        
        const crimeSeverity = {
            'speeding': 0.5,
            'hit_pedestrian': 1,
            'hit_police': 2,
            'shooting': 2,
            'murder': 3,
            'robbery': 2.5,
            'evading': 1.5,
            'theft': 1
        };
        
        const amount = crimeSeverity[crimeType] || severity;
        this.wantedLevel = Math.min(this.maxWantedLevel, this.wantedLevel + amount);
        
        this.updateUI();
        this.spawnPoliceResponse();
        
        if (this.game.showNotification) {
            this.game.showNotification('🚨 WANTED', `Wanted level: ${Math.ceil(this.wantedLevel)} stars`);
        }
    }
    
    spawnPoliceResponse() {
        const level = Math.ceil(this.wantedLevel);
        const unitsToSpawn = level * 2;
        
        for (let i = 0; i < unitsToSpawn; i++) {
            if (this.policeUnits.length < 20) {
                this.spawnPoliceUnit();
            }
        }
        
        if (level >= 3 && !this.helicopter) {
            this.spawnHelicopter();
        }
        
        if (level >= 4) {
            this.setupRoadblocks();
        }
    }
    
    spawnPoliceUnit() {
        const policeCar = this.game.createVehicle ? this.game.createVehicle('singaporePolice') : null;
        if (policeCar) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 50 + Math.random() * 100;
            policeCar.position.set(
                this.game.player.position.x + Math.cos(angle) * dist,
                0.5,
                this.game.player.position.z + Math.sin(angle) * dist
            );
            this.policeUnits.push({
                mesh: policeCar,
                target: this.game.player,
                speed: 25 + Math.random() * 10
            });
            this.game.scene.add(policeCar);
        }
    }
    
    spawnHelicopter() {
        console.log('Police helicopter deployed!');
        this.helicopter = { active: true };
    }
    
    setupRoadblocks() {
        console.log('Roadblocks set up!');
    }
    
    update(delta) {
        if (this.wantedLevel <= 0) return;
        
        this.policeUnits.forEach(unit => {
            if (!unit.mesh || !unit.target) return;
            
            const dir = new THREE.Vector3()
                .subVectors(unit.target.position, unit.mesh.position)
                .normalize();
            
            unit.mesh.position.addScaledVector(dir, unit.speed * delta);
            unit.mesh.lookAt(unit.target.position);
        });
        
        const now = Date.now();
        if (now - this.lastCrimeTime > this.decayDelay) {
            this.wantedLevel = Math.max(0, this.wantedLevel - this.decayRate * delta);
            this.updateUI();
            
            if (this.wantedLevel <= 0) {
                this.clearWanted();
            }
        }
    }
    
    clearWanted() {
        this.wantedLevel = 0;
        this.updateUI();
        
        this.policeUnits.forEach(unit => {
            if (unit.mesh) this.game.scene.remove(unit.mesh);
        });
        this.policeUnits = [];
        this.helicopter = null;
        this.roadblocks = [];
        
        if (this.game.showNotification) {
            this.game.showNotification('✅ CLEARED', 'Wanted level cleared');
        }
    }
    
    getWantedLevel() {
        return Math.ceil(this.wantedLevel);
    }
    
    isWanted() {
        return this.wantedLevel > 0;
    }
}
