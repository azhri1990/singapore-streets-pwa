/**
 * Drug Effects System
 * Realistic drug effects, addiction, withdrawal
 */

export class DrugEffectsSystem {
    constructor(game) {
        this.game = game;
        this.activeEffects = [];
        this.addictionLevels = {};
        this.drugs = {
            'marijuana': { name: 'Marijuana', duration: 300, visual: 'blur', addiction: 0.1 },
            'cocaine': { name: 'Cocaine', duration: 120, visual: 'sharp', addiction: 0.3 },
            'heroin': { name: 'Heroin', duration: 600, visual: 'dreamy', addiction: 0.8 },
            'meth': { name: 'Methamphetamine', duration: 240, visual: 'intense', addiction: 0.6 },
            'ecstasy': { name: 'Ecstasy', duration: 180, visual: 'colorful', addiction: 0.2 },
            'lsd': { name: 'LSD', duration: 480, visual: 'psychedelic', addiction: 0.1 }
        };
    }

    consumeDrug(drugId) {
        const drug = this.drugs[drugId];
        if (!drug) return false;

        const effect = {
            drug: drugId,
            name: drug.name,
            startTime: Date.now(),
            duration: drug.duration * 1000,
            visual: drug.visual,
            active: true
        };

        this.activeEffects.push(effect);

        // Increase addiction
        this.addictionLevels[drugId] = (this.addictionLevels[drugId] || 0) + drug.addiction;

        // Apply immediate effects
        this.applyDrugEffect(drug);

        this.game.showNotification('Drug Consumed', drug.name);

        return true;
    }

    applyDrugEffect(drug) {
        if (!this.game.player) return;

        switch(drug.visual) {
            case 'blur':
                // Slight blur effect
                break;
            case 'sharp':
                // Enhanced focus
                this.game.player.walkSpeed *= 1.2;
                this.game.player.runSpeed *= 1.2;
                break;
            case 'dreamy':
                // Slowed movement
                this.game.player.walkSpeed *= 0.7;
                this.game.player.runSpeed *= 0.7;
                break;
            case 'intense':
                // Aggression boost
                this.game.player.damageMultiplier = 1.5;
                break;
            case 'colorful':
                // Visual distortion
                break;
            case 'psychedelic':
                // Heavy visual effects
                break;
        }
    }

    update(delta) {
        for (let i = this.activeEffects.length - 1; i >= 0; i--) {
            const effect = this.activeEffects[i];
            if (Date.now() - effect.startTime > effect.duration) {
                this.removeEffect(effect);
                this.activeEffects.splice(i, 1);
            }
        }

        // Withdrawal effects
        this.checkWithdrawal();
    }

    removeEffect(effect) {
        const drug = this.drugs[effect.drug];
        if (!drug) return;

        // Reverse effects
        if (this.game.player) {
            switch(drug.visual) {
                case 'sharp':
                    this.game.player.walkSpeed /= 1.2;
                    this.game.player.runSpeed /= 1.2;
                    break;
                case 'dreamy':
                    this.game.player.walkSpeed /= 0.7;
                    this.game.player.runSpeed /= 0.7;
                    break;
                case 'intense':
                    this.game.player.damageMultiplier = 1.0;
                    break;
            }
        }
    }

    checkWithdrawal() {
        for (const [drugId, level] of Object.entries(this.addictionLevels)) {
            if (level > 0.5 && this.activeEffects.filter(e => e.drug === drugId).length === 0) {
                // Withdrawal
                if (this.game.player) {
                    this.game.player.health -= 0.1;
                    this.game.showNotification('Withdrawal', this.drugs[drugId].name + ' withdrawal');
                }
            }
        }
    }

    getActiveEffects() {
        return this.activeEffects;
    }

    destroy() {
        this.activeEffects = [];
        this.addictionLevels = {};
    }
}

if (typeof window !== 'undefined') {
    window.DrugEffectsSystem = DrugEffectsSystem;
}