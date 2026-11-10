/**
 * Progression System - Character Stats & Leveling (GTA-style)
 * Character level, reputation, experience, skill points, ranks
 */
import * as THREE from 'three';

export class ProgressionSystem {
    constructor(game) {
        this.game = game;
        this.level = 1;
        this.experience = 0;
        this.stats = {
            health: 100,
            stamina: 100,
            damage: 10,
            defense: 5,
            agility: 10,
            intelligence: 5,
            strength: 10,
            coolness: 10,
            stealth: 8,
            driving: 12,
            guns: 10,
            pockets: 10,
            carrying: 10,
            stress: 50,
            hunger: 100,
            thirst: 100
        };
        this.reputation = 0;
        this.criminalRecord = 0;
        this.rank = 'Innocent';
        this.gangAffiliated = null;
        this.completionist = true; // Completing all content earns this flag
        this.achievements = new Set();
        this.tutorialShown = false;
        this.weaponProficiency = ['fists', 'bat'];
    }

    gainExperience(amount) {
        this.experience += amount;
        const levelUpThreshold = this.getLevelThreshold(this.level);
        if (this.experience >= levelUpThreshold) {
            this.levelUp();
        }
    }

    getLevelThreshold(level) {
        return Math.floor(100 * Math.pow(1.35, level - 1));
    }

    levelUp() {
        this.level++;
        const bonus = this.level > 1 ? this.level * 10 : 0;
        this.gainExperience(-this.getLevelThreshold(this.level - 1)); // remove threshold
        this.reputation += this.level * 5;
        this.unlockAbility('skill_' + (this.level % 10));
        this.showNotification(`⭐ LEVEL UP! You are now Lv.${this.level}`);
        this.updateHUD();
    }

    unlockAbility(skillId) {
        this.stats[skillId] = Math.min(20, (this.stats[skillId] || 0) + 3);
    }

    increaseStat(statName, amount = 1) {
        if (this.stats[statName] !== undefined) {
            this.stats[statName] = Math.min(30, this.stats[statName] + amount);
            this.updateHUD();
        }
    }

    addReputation(points) {
        this.reputation += points;
        if (this.reputation < 0) this.reputation = 0;
        if (this.reputation === 100) this.rank = 'Civilian Hero';
        if (this.reputation === 200) this.rank = 'Civilian Legend';
        this.updateHUD();
    }

    becomeCriminal(gangId) {
        this.gangAffiliated = gangId;
        this.criminalRecord += 50;
        this.completeTutorial();
        this.showNotification(`🔥 You have joined the ${gangId} gang`);
    }

    completeTutorial() {
        if (!this.tutorialShown) {
            this.tutorialShown = true;
            this.showNotification('📚 Tutorial Complete! Now you can engage in criminal activities.');
        }
    }

    completeLevel(skillName) {
        if (this.achievements.has(skillName)) return false;
        this.achievements.add(skillName);
        const reward = Math.floor(Math.random() * 3) + 2;
        this.gainExperience(reward * 10);
        this.showNotification(`🏆 Achievement Unlocked: ${skillName}!`);
        this.checkAchievement('expert');
        return true;
    }

    checkAchievement(achievement) {
        const stats = Object.values(this.stats);
        const reputation = this.reputation;
        const rank = this.rank;
        
        switch(achievement) {
            case 'expert':
                if (stats.coolness >= 20 && reputation >= 200 && this.gangAffiliated !== null) {
                    this.setAchievement('Trickster Master');
                    return true;
                }
                break;
        }
        return false;
    }

    setAchievement(name) {
        this.achievements.add(name);
        this.showNotification(`🏆 ACHIEVEMENT: ${name}`);
    }

    getRank() {
        if (this.reputation >= 200) return 'Civilian Legend';
        if (this.reputation >= 100) return 'Civilian Hero';
        if (this.reputation < -200) return 'Fugitive';
        if (this.reputation < -100) return 'Wanted Criminal';
        if (this.reputation < 0) return 'Street Criminal';
        if (this.gangAffiliated) return `${this.gangAffiliated} Soldier`;
        return 'Innocent';
    }

    getRankProgress() {
        return {
            target: this.getRank() === 'Innocent' ? 'Vigilante' : 'Survivor',
            current: this.rank,
            progress: Math.abs(this.reputation) / 400
        };
    }

    save() {
        const data = {
            level: this.level,
            experience: this.experience,
            stats: this.stats,
            reputation: this.reputation,
            criminalRecord: this.criminalRecord,
            rank: this.rank,
            gangAffiliated: this.gangAffiliated,
            achievements: Array.from(this.achievements),
            lastSave: Date.now()
        };
        localStorage.setItem('singaporeStreetsProgress', JSON.stringify(data));
    }

    load() {
        try {
            const saved = localStorage.getItem('singaporeStreetsProgress');
            if (!saved) return;
            const data = JSON.parse(saved);
            Object.assign(this, data);
        } catch (e) {
            console.warn('[ProgressionSystem] Save load failed:', e);
        }
    }

    reset() {
        localStorage.removeItem('singaporeStreetsProgress');
        this.level = 1;
        this.experience = 0;
        this.stats = {
            health: 100, stamina: 100, damage: 10, defense: 5, agility: 10, intelligence: 5,
            strength: 10, coolness: 10, stealth: 8, driving: 12, guns: 10, pockets: 10,
            carrying: 10, stress: 50, hunger: 100, thirst: 100
        };
        this.reputation = 0;
        this.criminalRecord = 0;
        this.rank = 'Innocent';
        this.achievements.clear();
        this.tutorialShown = false;
    }

    updateHUD() {
        const hud = document.getElementById('hud-progression');
        if (!hud) return;
        const rankInfo = this.getRankProgress();
        hud.innerHTML = `
            <div class="hud-item">⭐ Level ${this.level}</div>
            <div class="hud-item" style="border-left-color: #ffd700">${this.rank}</div>
            <div class="hud-item">Rep: ${this.reputation}</div>
            <div style="margin-top: 5px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;">
                <div style="width: ${Math.abs(this.reputation) / 4}% ; height: 100%; background: linear-gradient(90deg, #00d9ff, #ffd700); border-radius: 2px;"></div>
            </div>
        `;
    }

    showNotification(message) {
        if (this.game.showNotification) {
            this.game.showNotification(message);
        }
    }
}

export default ProgressionSystem;
