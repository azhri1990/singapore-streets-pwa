/**
 * GTA-Style Save System
 * localStorage persistence
 */

export class SaveSystem {
    constructor(game) {
        this.game = game;
        this.saveKey = 'singapore-streets-save';
        this.autoSaveInterval = 60000; // 1 minute
        
        this.setupAutoSave();
    }
    
    setupAutoSave() {
        setInterval(() => {
            this.save();
        }, this.autoSaveInterval);
    }
    
    save() {
        const saveData = {
            timestamp: Date.now(),
            player: {
                position: this.game.player.position.toArray(),
                health: this.game.player.health,
                armor: this.game.player.armor,
                money: this.game.player.money || 0,
                wantedLevel: this.game.wantedSystem ? this.game.wantedSystem.wantedLevel : 0
            },
            vehicles: this.getVehicleStates(),
            missions: {
                active: this.game.aiMissionDirector ? this.game.aiMissionDirector.activeMissions : [],
                completed: this.game.aiMissionDirector ? this.game.aiMissionDirector.completedMissions : [],
                city: this.game.missionSystem ? this.game.missionSystem.serialize() : null
            },
            settings: {
                volume: this.game.audioManager ? 1 : 1,
                controls: 'default'
            }
        };
        
        try {
            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            console.log('Game saved');
        } catch (e) {
            console.error('Save failed:', e);
        }
    }
    
    load() {
        try {
            const data = localStorage.getItem(this.saveKey);
            if (!data) return false;
            
            const saveData = JSON.parse(data);
            
            // Restore player
            if (saveData.player) {
                this.game.player.position.fromArray(saveData.player.position);
                this.game.player.health = saveData.player.health;
                this.game.player.armor = saveData.player.armor;
                this.game.player.money = saveData.player.money;
                
                if (this.game.wantedSystem) {
                    this.game.wantedSystem.wantedLevel = saveData.player.wantedLevel;
                    this.game.wantedSystem.updateUI();
                }
            }
            
            // Restore missions
            if (saveData.missions && this.game.aiMissionDirector) {
                this.game.aiMissionDirector.activeMissions = saveData.missions.active || [];
                this.game.aiMissionDirector.completedMissions = saveData.missions.completed || [];
            }
            if (saveData.missions?.city && this.game.missionSystem) {
                this.game.missionSystem.restore(saveData.missions.city);
            }
            
            if (this.game.showNotification) {
                this.game.showNotification('💾 LOADED', 'Game loaded successfully');
            }
            
            return true;
        } catch (e) {
            console.error('Load failed:', e);
            return false;
        }
    }
    
    getVehicleStates() {
        const states = [];
        this.game.scene.traverse((obj) => {
            if (obj.userData && obj.userData.type && obj.userData.type.includes('Vehicle')) {
                states.push({
                    type: obj.userData.type,
                    position: obj.position.toArray(),
                    rotation: obj.rotation.y
                });
            }
        });
        return states;
    }
    
    hasSave() {
        return localStorage.getItem(this.saveKey) !== null;
    }
    
    deleteSave() {
        localStorage.removeItem(this.saveKey);
        if (this.game.showNotification) {
            this.game.showNotification('🗑️ DELETED', 'Save file deleted');
        }
    }
}
