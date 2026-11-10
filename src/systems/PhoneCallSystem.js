/**
 * Phone Call Mission System
 * NPCs call player with job offers, like GTA
 */

export class PhoneCallSystem {
    constructor(game) {
        this.game = game;
        this.phone = {
            number: '+65 9123 4567',
            contacts: [],
            callHistory: [],
            isRinging: false,
            currentCall: null
        };
        this.setupUI();
        this.startCallLoop();
    }
    
    setupUI() {
        // Phone UI
        this.phoneUI = document.createElement('div');
        this.phoneUI.id = 'phone-ui';
        this.phoneUI.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #00ff00;
            border-radius: 12px;
            padding: 15px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            display: none;
        `;
        document.body.appendChild(this.phoneUI);
        
        // Ringing indicator
        this.ringIndicator = document.createElement('div');
        this.ringIndicator.id = 'ring-indicator';
        this.ringIndicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #00ff00;
            border-radius: 12px;
            padding: 20px;
            color: #00ff00;
            font-family: monospace;
            font-size: 16px;
            z-index: 10001;
            display: none;
            text-align: center;
        `;
        document.body.appendChild(this.ringIndicator);
    }
    
    startCallLoop() {
        // Random calls every 2-5 minutes
        setInterval(() => {
            if (Math.random() < 0.4 && !this.phone.isRinging) {
                this.receiveCall();
            }
        }, 120000 + Math.random() * 180000);
    }
    
    receiveCall() {
        const callers = this.getCallers();
        if (callers.length === 0) return;
        
        const caller = callers[Math.floor(Math.random() * callers.length)];
        this.phone.isRinging = true;
        this.phone.currentCall = caller;
        
        // Show ringing
        this.ringIndicator.style.display = 'block';
        this.ringIndicator.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 10px;">📞</div>
            <div style="font-weight: bold; margin-bottom: 5px;">${caller.name}</div>
            <div style="font-size: 12px; color: #888; margin-bottom: 15px;">${caller.number}</div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="window.game.phoneSystem.answerCall()" style="padding: 8px 20px; background: #00ff00; color: #000; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Answer</button>
                <button onclick="window.game.phoneSystem.declineCall()" style="padding: 8px 20px; background: #ff0000; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Decline</button>
            </div>
        `;
        
        // Ring tone (using Web Audio)
        this.playRingtone();
        
        // Auto-decline after 30 seconds
        setTimeout(() => {
            if (this.phone.isRinging) {
                this.declineCall();
            }
        }, 30000);
    }
    
    playRingtone() {
        if (!window.AudioContext) return;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 440;
        osc.type = 'sine';
        gain.gain.value = 0.3;
        osc.start();
        setTimeout(() => osc.stop(), 2000);
    }
    
    answerCall() {
        this.phone.isRinging = false;
        this.ringIndicator.style.display = 'none';
        
        const caller = this.phone.currentCall;
        this.phoneUI.style.display = 'block';
        
        this.phoneUI.innerHTML = `
            <div style="color: #00ff00; font-weight: bold; margin-bottom: 10px;">
                📞 ${caller.name}
            </div>
            <div style="margin-bottom: 15px; line-height: 1.6;">
                ${caller.dialogue}
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${caller.choices.map((choice, i) => `
                    <button onclick="window.game.phoneSystem.handleChoice(${i})" style="
                        padding: 6px 12px;
                        background: ${choice.color || '#333'};
                        color: #fff;
                        border: 1px solid ${choice.color || '#666'};
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 11px;
                    ">${choice.label}</button>
                `).join('')}
            </div>
        `;
        
        // Voice
        if (window.voiceSynth) {
            window.voiceSynth.speak(caller.dialogue, caller.voiceProfile || 'chinese_singaporean');
        }
    }
    
    declineCall() {
        this.phone.isRinging = false;
        this.ringIndicator.style.display = 'none';
        this.phone.currentCall = null;
    }
    
    handleChoice(choiceIndex) {
        const caller = this.phone.currentCall;
        const choice = caller.choices[choiceIndex];
        
        this.phoneUI.style.display = 'none';
        this.phone.callHistory.push({
            caller: caller.name,
            choice: choice.label,
            timestamp: Date.now()
        });
        
        // Apply consequence
        if (choice.action) {
            choice.action(this.game);
        }
        
        if (this.game.showNotification) {
            this.game.showNotification('📞 CALL ENDED', choice.label);
        }
        
        this.phone.currentCall = null;
    }
    
    getCallers() {
        const lifePath = this.game.consequenceSystem?.lifePath || 'normal';
        
        const callers = [
            {
                name: 'Unknown Number',
                number: '+65 9XXX XXXX',
                dialogue: 'Eh, you free or not? Got job for you. Meet at Geylang tonight. $5,000. Interested?',
                voiceProfile: 'chinese_singaporean',
                choices: [
                    { label: 'Accept', color: '#ff0000', action: (g) => { g.player.money += 5000; if (g.wantedSystem) g.wantedSystem.commitCrime('theft', 2); } },
                    { label: 'Decline', color: '#00ff00', action: () => {} },
                    { label: 'Report', color: '#0000ff', action: (g) => { if (g.wantedSystem) g.wantedSystem.clearWanted(); } }
                ]
            },
            {
                name: 'Auntie Lily',
                number: '+65 9123 4567',
                dialogue: 'Ah boy, you eat already or not? Come to my house for dinner. I cook chicken rice.',
                voiceProfile: 'chinese_singaporean',
                choices: [
                    { label: 'Come Over', color: '#00ff00', action: (g) => { if (g.player) g.player.health = Math.min(100, g.player.health + 20); } },
                    { label: 'Busy', color: '#666', action: () => {} }
                ]
            },
            {
                name: 'Boss Tan',
                number: '+65 9876 5432',
                dialogue: 'Eh, you want OT or not? Got project deadline. Pay extra $200.',
                voiceProfile: 'chinese_singaporean',
                choices: [
                    { label: 'Accept OT', color: '#00ff00', action: (g) => { g.player.money += 200; } },
                    { label: 'Decline', color: '#666', action: () => {} }
                ]
            },
            {
                name: 'Makcik Fatimah',
                number: '+65 9234 5678',
                dialogue: 'Assalamualaikum, you come to my house for Hari Raya. I cook rendang.',
                voiceProfile: 'malay_singaporean',
                choices: [
                    { label: 'Come', color: '#00ff00', action: (g) => { if (g.player) g.player.health = Math.min(100, g.player.health + 15); } },
                    { label: 'Busy', color: '#666', action: () => {} }
                ]
            },
            {
                name: 'Uncle Raj',
                number: '+65 9345 6789',
                dialogue: 'Vanakkam! You want to come to temple? Special prayer today.',
                voiceProfile: 'indian_singaporean',
                choices: [
                    { label: 'Come', color: '#00ff00', action: (g) => { if (g.player) g.player.happiness = (g.player.happiness || 50) + 10; } },
                    { label: 'Busy', color: '#666', action: () => {} }
                ]
            }
        ];
        
        // Add criminal callers if life path allows
        if (lifePath === 'criminal' || lifePath === 'wanted') {
            callers.push({
                name: 'Unknown',
                number: 'Private Number',
                dialogue: 'Got a job for you. Target in Marina Bay. $50,000. Interested?',
                voiceProfile: 'chinese_singaporean',
                choices: [
                    { label: 'Accept', color: '#ff0000', action: (g) => { g.player.money += 50000; if (g.wantedSystem) g.wantedSystem.commitCrime('murder', 5); } },
                    { label: 'Decline', color: '#00ff00', action: () => {} },
                    { label: 'Report', color: '#0000ff', action: (g) => { if (g.wantedSystem) g.wantedSystem.clearWanted(); } }
                ]
            });
        }
        
        return callers;
    }
    
    togglePhone() {
        this.phoneUI.style.display = this.phoneUI.style.display === 'none' ? 'block' : 'none';
    }
    
    update(delta) {
        // Update phone state
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.PhoneCallSystem = PhoneCallSystem;
}
