/**
 * Consequence System
 * Every choice affects the game world and player's life
 */

export class ConsequenceSystem {
    constructor(game) {
        this.game = game;
        this.reputation = {
            police: 0,
            gangs: {},
            citizens: 50,
            government: 0,
            employers: 50
        };
        this.consequences = [];
        this.lifePath = 'normal';
        this.karma = 0;
        
        this.setupUI();
    }
    
    setupUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'consequence-ui';
        this.ui.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            width: 280px;
            background: rgba(0, 0, 0, 0.85);
            border: 1px solid #ff00ff;
            border-radius: 8px;
            padding: 12px;
            color: #fff;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
            display: none;
        `;
        document.body.appendChild(this.ui);
    }
    
    // Record a choice and its consequence
    recordChoice(choice, context) {
        const consequence = {
            id: Date.now().toString(),
            choice,
            context,
            timestamp: Date.now(),
            effects: this.calculateEffects(choice, context)
        };
        
        this.consequences.push(consequence);
        this.applyEffects(consequence.effects);
        
        // Show consequence notification
        if (this.game.showNotification) {
            this.game.showNotification('⚖️ CONSEQUENCE', this.getConsequenceDescription(consequence));
        }
        
        return consequence;
    }
    
    calculateEffects(choice, context) {
        const effects = {
            reputation: {},
            money: 0,
            wanted: 0,
            karma: 0,
            lifePath: null
        };
        
        // Determine effects based on choice
        switch (choice.type) {
            case 'crime':
                effects.reputation.police = -10;
                effects.reputation.citizens = -5;
                effects.wanted = choice.severity || 1;
                effects.karma = -10;
                break;
            case 'help_citizen':
                effects.reputation.citizens = +10;
                effects.reputation.police = +2;
                effects.karma = +10;
                break;
            case 'bribe':
                effects.reputation.police = -5;
                effects.money = -choice.amount;
                effects.karma = -5;
                break;
            case 'report_crime':
                effects.reputation.police = +10;
                effects.reputation.citizens = +5;
                effects.karma = +10;
                break;
            case 'join_gang':
                effects.reputation.gangs = { [choice.gang]: +50 };
                effects.reputation.police = -20;
                effects.karma = -20;
                break;
            case 'leave_gang':
                effects.reputation.gangs = { [choice.gang]: -50 };
                effects.reputation.police = +10;
                effects.karma = +10;
                break;
            case 'work_hard':
                effects.reputation.employers = +10;
                effects.money = choice.pay || 0;
                effects.karma = +5;
                break;
            case 'cheat':
                effects.reputation.employers = -20;
                effects.money = choice.gain || 0;
                effects.karma = -15;
                break;
        }
        
        return effects;
    }
    
    applyEffects(effects) {
        // Apply reputation changes
        if (effects.reputation) {
            for (const [key, value] of Object.entries(effects.reputation)) {
                if (key === 'gangs') {
                    for (const [gang, rep] of Object.entries(value)) {
                        this.reputation.gangs[gang] = (this.reputation.gangs[gang] || 0) + rep;
                    }
                } else {
                    this.reputation[key] = (this.reputation[key] || 0) + value;
                }
            }
        }
        
        // Apply money
        if (effects.money && this.game.player) {
            this.game.player.money = (this.game.player.money || 0) + effects.money;
        }
        
        // Apply wanted level
        if (effects.wanted && this.game.wantedSystem) {
            this.game.wantedSystem.commitCrime('general', effects.wanted);
        }
        
        // Apply karma
        this.karma += effects.karma || 0;
        
        // Check life path changes
        this.checkLifePath();
        
        this.updateUI();
    }
    
    checkLifePath() {
        const oldPath = this.lifePath;
        
        if (this.karma < -100) {
            this.lifePath = 'criminal';
        } else if (this.karma > 100) {
            this.lifePath = 'hero';
        } else if (this.reputation.police < -50) {
            this.lifePath = 'wanted';
        } else if (this.game.player?.money > 1000000) {
            this.lifePath = 'rich';
        } else if (this.game.player?.money < 0 && this.reputation.citizens < 20) {
            this.lifePath = 'homeless';
        } else {
            this.lifePath = 'normal';
        }
        
        if (oldPath !== this.lifePath) {
            if (this.game.showNotification) {
                this.game.showNotification('🔄 LIFE PATH', `You are now: ${this.lifePath.toUpperCase()}`);
            }
        }
    }
    
    getConsequenceDescription(consequence) {
        const effects = consequence.effects;
        let desc = '';
        
        if (effects.reputation) {
            for (const [key, value] of Object.entries(effects.reputation)) {
                if (value > 0) desc += `+${value} ${key} rep. `;
                if (value < 0) desc += `${value} ${key} rep. `;
            }
        }
        if (effects.money) {
            desc += effects.money > 0 ? `+$${effects.money}. ` : `-$${Math.abs(effects.money)}. `;
        }
        if (effects.karma) {
            desc += effects.karma > 0 ? `+${effects.karma} karma. ` : `${effects.karma} karma. `;
        }
        
        return desc || 'Choice recorded.';
    }
    
    getLifePathDescription() {
        const descriptions = {
            'normal': 'Living an ordinary life in Singapore',
            'criminal': 'A wanted criminal on the run',
            'hero': 'A respected citizen and hero',
            'wanted': 'On the police wanted list',
            'rich': 'One of Singapore\'s richest',
            'homeless': 'Living on the streets'
        };
        return descriptions[this.lifePath] || 'Unknown';
    }
    
    updateUI() {
        this.ui.innerHTML = `
            <div style="color: #ff00ff; font-weight: bold; margin-bottom: 8px;">
                ⚖️ CONSEQUENCES
            </div>
            <div style="margin-bottom: 4px;">
                <strong>Life Path:</strong> <span style="color: #ffff00;">${this.lifePath.toUpperCase()}</span>
            </div>
            <div style="margin-bottom: 4px;">
                <strong>Karma:</strong> <span style="color: ${this.karma >= 0 ? '#00ff00' : '#ff0000'};">${this.karma}</span>
            </div>
            <div style="margin-bottom: 8px;">
                <strong>Reputation:</strong>
            </div>
            <div style="font-size: 10px; margin-left: 10px;">
                Police: ${this.reputation.police}<br>
                Citizens: ${this.reputation.citizens}<br>
                Government: ${this.reputation.government}<br>
                Employers: ${this.reputation.employers}
            </div>
            <div style="margin-top: 8px; font-size: 10px; color: #888;">
                ${this.getLifePathDescription()}
            </div>
        `;
    }
    
    toggleUI() {
        this.ui.style.display = this.ui.style.display === 'none' ? 'block' : 'none';
        this.updateUI();
    }
    
    save() {
        return {
            reputation: this.reputation,
            karma: this.karma,
            lifePath: this.lifePath,
            consequences: this.consequences.slice(-50) // Keep last 50
        };
    }
    
    load(data) {
        if (data) {
            this.reputation = data.reputation || this.reputation;
            this.karma = data.karma || 0;
            this.lifePath = data.lifePath || 'normal';
            this.consequences = data.consequences || [];
        }
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.ConsequenceSystem = ConsequenceSystem;
}
