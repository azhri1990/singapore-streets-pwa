/**
 * GTA-Style Vehicle Theft System
 * Enter and steal any vehicle
 */

export class VehicleTheft {
    constructor(game) {
        this.game = game;
        this.isStealing = false;
        this.stealProgress = 0;
        this.stealTime = 3000; // 3 seconds to steal
        
        this.setupControls();
    }
    
    setupControls() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyE') {
                if (!this.game.player.isInVehicle) {
                    this.tryStealVehicle();
                }
            }
            if (e.code === 'KeyF') {
                this.game.player.exitVehicle();
            }
        });
    }
    
    tryStealVehicle() {
        const player = this.game.player;
        let nearest = null;
        let minDist = 4;
        
        this.game.scene.traverse((obj) => {
            if (obj.userData && obj.userData.type && 
                (obj.userData.type.includes('Vehicle') || obj.userData.type.includes('car'))) {
                const dist = player.position.distanceTo(obj.position);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = obj;
                }
            }
        });
        
        if (nearest) {
            this.startSteal(nearest);
        }
    }
    
    startSteal(vehicle) {
        this.isStealing = true;
        this.stealProgress = 0;
        this.targetVehicle = vehicle;
        
        // Show progress bar
        this.showStealProgress();
        
        // Commit crime
        if (this.game.wantedSystem) {
            this.game.wantedSystem.commitCrime('theft', 1);
        }
    }
    
    showStealProgress() {
        if (!this.progressBar) {
            this.progressBar = document.createElement('div');
            this.progressBar.id = 'steal-progress';
            this.progressBar.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                width: 300px;
                height: 20px;
                background: rgba(0, 0, 0, 0.8);
                border: 2px solid #ff00ff;
                border-radius: 10px;
                overflow: hidden;
                z-index: 1000;
                display: none;
            `;
            this.progressBar.innerHTML = '<div id="steal-fill" style="height: 100%; background: linear-gradient(90deg, #ff00ff, #00ffff); width: 0%; transition: width 0.1s;"></div>';
            document.body.appendChild(this.progressBar);
        }
        this.progressBar.style.display = 'block';
    }
    
    update(delta) {
        if (!this.isStealing) return;
        
        this.stealProgress += delta * 1000;
        const fill = document.getElementById('steal-fill');
        if (fill) {
            fill.style.width = `${(this.stealProgress / this.stealTime) * 100}%`;
        }
        
        if (this.stealProgress >= this.stealTime) {
            this.completeSteal();
        }
    }
    
    completeSteal() {
        this.isStealing = false;
        this.stealProgress = 0;
        
        if (this.progressBar) {
            this.progressBar.style.display = 'none';
        }
        
        // Enter vehicle
        if (this.targetVehicle) {
            this.game.player.enterVehicle(this.targetVehicle);
            
            if (this.game.showNotification) {
                this.game.showNotification('🚗 STOLEN', `You stole a ${this.targetVehicle.userData.type || 'vehicle'}!`);
            }
        }
    }
    
    cancelSteal() {
        this.isStealing = false;
        this.stealProgress = 0;
        if (this.progressBar) {
            this.progressBar.style.display = 'none';
        }
    }
}
