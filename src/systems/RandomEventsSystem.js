/**
 * Random Events System
 * Contract kills, heists, burglaries, gang riots, and more
 * Based on player's life path and choices
 */

export class RandomEventsSystem {
    constructor(game) {
        this.game = game;
        this.activeEvents = [];
        this.eventCooldowns = {};
        this.setupUI();
        this.startEventLoop();
    }
    
    setupUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'random-events-ui';
        this.ui.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 450px;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #ff0000;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            display: none;
        `;
        document.body.appendChild(this.ui);
    }
    
    startEventLoop() {
        // Random events every 2-5 minutes
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.triggerRandomEvent();
            }
        }, 120000 + Math.random() * 180000);
    }
    
    triggerRandomEvent() {
        const lifePath = this.game.consequenceSystem?.lifePath || 'normal';
        const events = this.getAvailableEvents(lifePath);
        
        if (events.length === 0) return;
        
        const event = events[Math.floor(Math.random() * events.length)];
        this.showEvent(event);
    }
    
    getAvailableEvents(lifePath) {
        const baseEvents = [
            'phone_call', 'stranger_encounter', 'found_item', 'weather_event',
            'traffic_incident', 'hawker_festival', 'mrt_delay'
        ];
        
        const criminalEvents = [
            'contract_kill', 'heist_opportunity', 'burglary_target', 'gang_riot',
            'drug_deal', 'smuggling_job', 'protection_racket', 'extortion_opportunity'
        ];
        
        const richEvents = [
            'business_opportunity', 'investment_tip', 'property_deal', 'charity_event'
        ];
        
        const normalEvents = [
            'job_offer', 'friend_visit', 'family_event', 'lottery_win', 'accident_witness'
        ];
        
        let events = [...baseEvents];
        
        if (lifePath === 'criminal' || lifePath === 'wanted') {
            events = events.concat(criminalEvents);
        }
        if (lifePath === 'rich') {
            events = events.concat(richEvents);
        }
        if (lifePath === 'normal' || lifePath === 'hero') {
            events = events.concat(normalEvents);
        }
        
        return events;
    }
    
    showEvent(eventType) {
        const eventData = this.getEventData(eventType);
        if (!eventData) return;
        
        this.ui.style.display = 'block';
        this.ui.innerHTML = `
            <div style="color: #ff0000; font-weight: bold; margin-bottom: 15px; font-size: 16px;">
                ${eventData.icon} ${eventData.title}
            </div>
            <div style="margin-bottom: 15px; line-height: 1.6;">
                ${eventData.description}
            </div>
            <div style="margin-bottom: 15px; color: #ffff00;">
                ${eventData.details}
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${eventData.choices.map((choice, i) => `
                    <button onclick="window.game.randomEvents.handleChoice('${eventType}', ${i})" style="
                        padding: 8px 16px;
                        background: ${choice.color || '#333'};
                        color: #fff;
                        border: 1px solid ${choice.color || '#666'};
                        border-radius: 4px;
                        cursor: pointer;
                    ">${choice.label}</button>
                `).join('')}
            </div>
        `;
        
        this.activeEvents.push({ type: eventType, data: eventData, timestamp: Date.now() });
    }
    
    getEventData(eventType) {
        const events = {
            'phone_call': {
                icon: '📞',
                title: 'PHONE CALL',
                description: 'Your phone rings. An unknown number.',
                details: 'Do you answer?',
                choices: [
                    { label: 'Answer', color: '#00ff00' },
                    { label: 'Ignore', color: '#666' }
                ]
            },
            'contract_kill': {
                icon: '🎯',
                title: 'CONTRACT KILL',
                description: 'A mysterious caller offers you a contract. Target: A businessman in Marina Bay. Reward: $50,000.',
                details: 'The target is heavily guarded. You have 24 hours.',
                choices: [
                    { label: 'Accept', color: '#ff0000' },
                    { label: 'Decline', color: '#00ff00' },
                    { label: 'Report to Police', color: '#0000ff' }
                ]
            },
            'heist_opportunity': {
                icon: '🏦',
                title: 'HEIST OPPORTUNITY',
                description: 'A contact offers you a role in a bank heist. Target: DBS Bank, Raffles Place. Potential reward: $500,000.',
                details: 'You need a crew. Risk: High. Reward: Very High.',
                choices: [
                    { label: 'Join Heist', color: '#ff0000' },
                    { label: 'Decline', color: '#00ff00' },
                    { label: 'Tip Off Police', color: '#0000ff' }
                ]
            },
            'burglary_target': {
                icon: '🏠',
                title: 'BURGLARY TARGET',
                description: 'You spot an empty luxury condo in Orchard. No one home. Easy entry.',
                details: 'Potential loot: $10,000-50,000. Risk: Medium.',
                choices: [
                    { label: 'Break In', color: '#ff0000' },
                    { label: 'Walk Away', color: '#00ff00' }
                ]
            },
            'gang_riot': {
                icon: '⚔️',
                title: 'GANG RIOT',
                description: 'A gang war erupts in Geylang. Salakau vs Sakai. Streets are chaos.',
                details: 'You can join a side, help police, or stay away.',
                choices: [
                    { label: 'Join Salakau', color: '#ff0000' },
                    { label: 'Join Sakai', color: '#008000' },
                    { label: 'Help Police', color: '#0000ff' },
                    { label: 'Stay Away', color: '#666' }
                ]
            },
            'drug_deal': {
                icon: '💊',
                title: 'DRUG DEAL',
                description: 'A dealer offers you a job running drugs. $5,000 per delivery. Risk: Death penalty if caught.',
                details: 'Singapore has death penalty for drug trafficking.',
                choices: [
                    { label: 'Accept', color: '#ff0000' },
                    { label: 'Decline', color: '#00ff00' },
                    { label: 'Report to CNB', color: '#0000ff' }
                ]
            },
            'stranger_encounter': {
                icon: '👤',
                title: 'STRANGER ENCOUNTER',
                description: 'A stranger approaches you. They seem distressed.',
                details: 'They ask for help.',
                choices: [
                    { label: 'Help', color: '#00ff00' },
                    { label: 'Ignore', color: '#666' },
                    { label: 'Rob Them', color: '#ff0000' }
                ]
            },
            'found_item': {
                icon: '💰',
                title: 'FOUND ITEM',
                description: 'You found a wallet on the ground. It contains $500 and an ID.',
                details: 'What do you do?',
                choices: [
                    { label: 'Return to Owner', color: '#00ff00' },
                    { label: 'Keep Money', color: '#ff0000' },
                    { label: 'Report to Police', color: '#0000ff' }
                ]
            },
            'job_offer': {
                icon: '💼',
                title: 'JOB OFFER',
                description: 'A company offers you a job. Salary: $3,000/month. Stable employment.',
                details: 'Do you accept?',
                choices: [
                    { label: 'Accept', color: '#00ff00' },
                    { label: 'Decline', color: '#666' }
                ]
            },
            'business_opportunity': {
                icon: '📈',
                title: 'BUSINESS OPPORTUNITY',
                description: 'An investor offers to fund your business idea. Potential: High returns.',
                details: 'Investment required: $50,000.',
                choices: [
                    { label: 'Invest', color: '#00ff00' },
                    { label: 'Decline', color: '#666' }
                ]
            },
            'lottery_win': {
                icon: '🎰',
                title: 'LOTTERY WIN',
                description: 'You won $10,000 in TOTO! What do you do with it?',
                details: 'TOTO jackpot winner.',
                choices: [
                    { label: 'Save It', color: '#00ff00' },
                    { label: 'Spend It', color: '#ffff00' },
                    { label: 'Donate', color: '#0000ff' }
                ]
            },
            'accident_witness': {
                icon: '🚗',
                title: 'ACCIDENT WITNESS',
                description: 'You witnessed a traffic accident. The victim is injured.',
                details: 'Do you help or leave?',
                choices: [
                    { label: 'Help Victim', color: '#00ff00' },
                    { label: 'Call 995', color: '#0000ff' },
                    { label: 'Leave', color: '#666' }
                ]
            },
            'family_event': {
                icon: '👨‍👩‍👧',
                title: 'FAMILY EVENT',
                description: 'Your family needs help. Your mother is sick.',
                details: 'Hospital bills: $5,000.',
                choices: [
                    { label: 'Pay Bills', color: '#00ff00' },
                    { label: 'Ask for Help', color: '#ffff00' },
                    { label: 'Ignore', color: '#666' }
                ]
            },
            'friend_visit': {
                icon: '🤝',
                title: 'FRIEND VISIT',
                description: 'An old friend visits. They need a place to stay.',
                details: 'Do you help?',
                choices: [
                    { label: 'Let Them Stay', color: '#00ff00' },
                    { label: 'Decline', color: '#666' }
                ]
            }
        };
        
        return events[eventType] || null;
    }
    
    handleChoice(eventType, choiceIndex) {
        const event = this.activeEvents.find(e => e.type === eventType);
        if (!event) return;
        
        const choice = event.data.choices[choiceIndex];
        this.ui.style.display = 'none';
        
        // Record choice in consequence system
        if (this.game.consequenceSystem) {
            this.game.consequenceSystem.recordChoice({
                type: eventType,
                choice: choice.label,
                severity: this.getSeverity(eventType)
            }, { event: eventType });
        }
        
        // Apply consequences
        this.applyChoiceConsequences(eventType, choiceIndex);
        
        this.activeEvents = this.activeEvents.filter(e => e.type !== eventType);
    }
    
    getSeverity(eventType) {
        const severity = {
            'contract_kill': 5,
            'heist_opportunity': 4,
            'burglary_target': 3,
            'gang_riot': 3,
            'drug_deal': 4,
            'robbery': 3,
            'theft': 2
        };
        return severity[eventType] || 1;
    }
    
    applyChoiceConsequences(eventType, choiceIndex) {
        const player = this.game.player;
        if (!player) return;
        
        switch (eventType) {
            case 'contract_kill':
                if (choiceIndex === 0) { // Accept
                    player.money = (player.money || 0) + 50000;
                    if (this.game.wantedSystem) this.game.wantedSystem.commitCrime('murder', 5);
                } else if (choiceIndex === 2) { // Report
                    if (this.game.wantedSystem) this.game.wantedSystem.clearWanted();
                }
                break;
            case 'heist_opportunity':
                if (choiceIndex === 0) { // Join
                    player.money = (player.money || 0) + 500000;
                    if (this.game.wantedSystem) this.game.wantedSystem.commitCrime('robbery', 4);
                } else if (choiceIndex === 2) { // Tip off
                    if (this.game.wantedSystem) this.game.wantedSystem.clearWanted();
                }
                break;
            case 'burglary_target':
                if (choiceIndex === 0) { // Break in
                    player.money = (player.money || 0) + (10000 + Math.random() * 40000);
                    if (this.game.wantedSystem) this.game.wantedSystem.commitCrime('theft', 2);
                }
                break;
            case 'drug_deal':
                if (choiceIndex === 0) { // Accept
                    player.money = (player.money || 0) + 5000;
                    if (this.game.wantedSystem) this.game.wantedSystem.commitCrime('drug_trafficking', 5);
                } else if (choiceIndex === 2) { // Report
                    if (this.game.wantedSystem) this.game.wantedSystem.clearWanted();
                }
                break;
            case 'found_item':
                if (choiceIndex === 0) { // Return
                    if (this.game.consequenceSystem) {
                        this.game.consequenceSystem.recordChoice({ type: 'help_citizen' }, {});
                    }
                } else if (choiceIndex === 1) { // Keep
                    player.money = (player.money || 0) + 500;
                    if (this.game.consequenceSystem) {
                        this.game.consequenceSystem.recordChoice({ type: 'crime', severity: 1 }, {});
                    }
                }
                break;
            case 'lottery_win':
                if (choiceIndex === 0) { // Save
                    player.money = (player.money || 0) + 10000;
                } else if (choiceIndex === 1) { // Spend
                    player.money = (player.money || 0) + 5000;
                } else if (choiceIndex === 2) { // Donate
                    if (this.game.consequenceSystem) {
                        this.game.consequenceSystem.recordChoice({ type: 'help_citizen' }, {});
                    }
                }
                break;
            case 'family_event':
                if (choiceIndex === 0) { // Pay bills
                    player.money = (player.money || 0) - 5000;
                } else if (choiceIndex === 2) { // Ignore
                    if (this.game.consequenceSystem) {
                        this.game.consequenceSystem.recordChoice({ type: 'crime', severity: 1 }, {});
                    }
                }
                break;
        }
        
        if (this.game.showNotification) {
            this.game.showNotification('✅ CHOICE MADE', choice.label);
        }
    }
    
    update(delta) {
        // Update active events
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.RandomEventsSystem = RandomEventsSystem;
}
