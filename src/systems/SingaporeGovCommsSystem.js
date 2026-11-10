/**
 * Singapore Government Communications System
 * Manages walkie-talkie, radio dispatch, and government agency communications
 */

import { SPF_Divisions, SCDF_Divisions, GovAgencies, SingaporeWalkieTalkie, GovContacts } from './SingaporeGovComms.js';
import { SCDF_ResponseTimes, SPF_ResponseTimes, SCDF_Activation, SPF_Activation, TacticalFormations, TacticalScenarios, getResponseTime, getActivationProtocol, getTacticalFormation, getTacticalScenario } from './SingaporeResponseProtocols.js';

export class SingaporeGovCommsSystem {
    constructor(game) {
        this.game = game;
        this.walkieTalkie = new SingaporeWalkieTalkie();
        this.activeChannel = 'CH1';
        this.dispatchMessages = [];
        this.setupUI();
        this.startDispatchLoop();
    }
    
    setupUI() {
        // Walkie-talkie UI
        this.walkieUI = document.createElement('div');
        this.walkieUI.id = 'walkie-talkie-ui';
        this.walkieUI.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 20px;
            width: 350px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #00ff00;
            border-radius: 8px;
            padding: 12px;
            color: #00ff00;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
            display: none;
        `;
        document.body.appendChild(this.walkieUI);
        
        // Dispatch log
        this.dispatchLog = document.createElement('div');
        this.dispatchLog.id = 'dispatch-log';
        this.dispatchLog.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            width: 400px;
            max-height: 200px;
            overflow-y: auto;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff00;
            border-radius: 8px;
            padding: 8px;
            color: #00ff00;
            font-family: monospace;
            font-size: 10px;
            z-index: 999;
            display: none;
        `;
        document.body.appendChild(this.dispatchLog);
    }
    
    // Toggle walkie-talkie
    toggleWalkieTalkie() {
        this.walkieUI.style.display = this.walkieUI.style.display === 'none' ? 'block' : 'none';
        if (this.walkieUI.style.display === 'block') {
            this.updateWalkieUI();
        }
    }
    
    // Toggle dispatch log
    toggleDispatchLog() {
        this.dispatchLog.style.display = this.dispatchLog.style.display === 'none' ? 'block' : 'none';
    }
    
    toggleResponsePanel() {
        if (!this.responsePanel) {
            this.createResponsePanel();
        }
        this.responsePanel.style.display = this.responsePanel.style.display === 'none' ? 'block' : 'none';
    }
    
    createResponsePanel() {
        this.responsePanel = document.createElement('div');
        this.responsePanel.id = 'response-panel';
        this.responsePanel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            max-height: 600px;
            overflow-y: auto;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #00ff00;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            font-family: monospace;
            font-size: 11px;
            z-index: 10000;
        `;
        
        let html = '<h2 style="color: #00ff00; margin-bottom: 15px;">🚑 SINGAPORE RESPONSE PROTOCOLS</h2>';
        html += '<div style="margin-bottom: 10px; color: #ffff00;">Press P to close</div>';
        
        html += '<h3 style="color: #00ffff; margin: 10px 0 5px;">SCDF Response Times</h3>';
        html += '<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">';
        html += '<tr style="background: rgba(0,255,0,0.2);"><th style="padding: 4px; text-align: left;">Type</th><th style="padding: 4px;">Target</th><th style="padding: 4px;">Priority</th></tr>';
        const scdf = {
            'Fire Emergency': '8 min',
            'Medical Emergency': '8 min',
            'Rescue Operation': '12 min',
            'Hazmat Incident': '15 min',
            'False Alarm': '15 min'
        };
        for (const [type, time] of Object.entries(scdf)) {
            html += `<tr><td style="padding: 4px;">${type}</td><td style="padding: 4px; text-align: center;">${time}</td><td style="padding: 4px; text-align: center;">P1</td></tr>`;
        }
        html += '</table>';
        
        html += '<h3 style="color: #00ffff; margin: 10px 0 5px;">SPF Response Times</h3>';
        html += '<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">';
        html += '<tr style="background: rgba(0,255,0,0.2);"><th style="padding: 4px; text-align: left;">Type</th><th style="padding: 4px;">Target</th><th style="padding: 4px;">Priority</th></tr>';
        const spf = {
            'Emergency (999)': '15 min',
            'Urgent': '30 min',
            'Routine': '60 min',
            'Investigation': '120 min'
        };
        for (const [type, time] of Object.entries(spf)) {
            html += `<tr><td style="padding: 4px;">${type}</td><td style="padding: 4px; text-align: center;">${time}</td><td style="padding: 4px; text-align: center;">P1-P4</td></tr>`;
        }
        html += '</table>';
        
        html += '<h3 style="color: #00ffff; margin: 10px 0 5px;">Tactical Formations</h3>';
        html += '<div style="margin-bottom: 8px;">Police: Patrol, Chase, Roadblock, Perimeter, Entry</div>';
        html += '<div style="margin-bottom: 8px;">SCDF: Fire Attack, Rescue, Medical</div>';
        
        html += '<h3 style="color: #00ffff; margin: 10px 0 5px;">Activation Steps</h3>';
        html += '<div style="font-size: 10px; color: #888;">';
        html += '1. Receive call (5s) → 2. Verify (15-30s) → 3. Dispatch (20s) → 4. Deploy (60s) → 5. En route → 6. Arrive (target time) → 7. Begin operation';
        html += '</div>';
        
        this.responsePanel.innerHTML = html;
        document.body.appendChild(this.responsePanel);
    }
    
    updateWalkieUI() {
        this.walkieUI.innerHTML = `
            <div style="color: #00ff00; font-weight: bold; margin-bottom: 8px;">
                📻 WALKIE-TALKIE
            </div>
            <div style="margin-bottom: 8px;">
                Channel: <span style="color: #ffff00;">${this.activeChannel}</span>
                Call Sign: <span style="color: #ffff00;">${this.walkieTalkie.callSign}</span>
            </div>
            <div style="margin-bottom: 8px;">
                <button onclick="window.game.govComms.setChannel('CH1')" style="padding: 2px 8px; margin-right: 4px; background: #003300; color: #00ff00; border: 1px solid #00ff00; border-radius: 3px; cursor: pointer;">CH1</button>
                <button onclick="window.game.govComms.setChannel('CH2')" style="padding: 2px 8px; margin-right: 4px; background: #003300; color: #00ff00; border: 1px solid #00ff00; border-radius: 3px; cursor: pointer;">CH2</button>
                <button onclick="window.game.govComms.setChannel('CH3')" style="padding: 2px 8px; background: #003300; color: #00ff00; border: 1px solid #00ff00; border-radius: 3px; cursor: pointer;">CH3</button>
            </div>
            <div style="margin-bottom: 8px;">
                <button onclick="window.game.govComms.sendPoliceMessage('patrol')" style="padding: 4px 8px; margin-right: 4px; background: #000033; color: #00ffff; border: 1px solid #00ffff; border-radius: 3px; cursor: pointer;">Patrol</button>
                <button onclick="window.game.govComms.sendPoliceMessage('crime')" style="padding: 4px 8px; margin-right: 4px; background: #330000; color: #ff0000; border: 1px solid #ff0000; border-radius: 3px; cursor: pointer;">Crime</button>
                <button onclick="window.game.govComms.sendPoliceMessage('chase')" style="padding: 4px 8px; margin-right: 4px; background: #330000; color: #ff0000; border: 1px solid #ff0000; border-radius: 3px; cursor: pointer;">Chase</button>
                <button onclick="window.game.govComms.sendSCDFMessage('medical')" style="padding: 4px 8px; background: #330000; color: #ff8800; border: 1px solid #ff8800; border-radius: 3px; cursor: pointer;">Medical</button>
            </div>
            <div style="font-size: 10px; color: #888;">
                Press W to close | 999 Police | 995 Fire/Ambulance
            </div>
        `;
    }
    
    setChannel(channel) {
        this.activeChannel = channel;
        this.walkieTalkie.setChannel(channel);
        this.updateWalkieUI();
    }
    
    sendPoliceMessage(type, location = null) {
        const loc = location || this.getRandomLocation();
        const message = this.walkieTalkie.generatePoliceMessage(type, loc);
        this.addDispatchMessage('SPF', message);
        this.walkieTalkie.playMessage(message, 'spf');
    }
    
    sendSCDFMessage(type, location = null) {
        const loc = location || this.getRandomLocation();
        const message = this.walkieTalkie.generateSCDFMessage(type, loc);
        this.addDispatchMessage('SCDF', message);
        this.walkieTalkie.playMessage(message, 'scdf');
    }
    
    sendICAMessage(location = null) {
        const loc = location || 'Woodlands Checkpoint';
        const message = this.walkieTalkie.generateICAMessage(loc);
        this.addDispatchMessage('ICA', message);
        this.walkieTalkie.playMessage(message, 'ica');
    }
    
    addDispatchMessage(agency, message) {
        const timestamp = new Date().toLocaleTimeString();
        this.dispatchMessages.push({ agency, message, timestamp });
        
        // Keep last 50 messages
        if (this.dispatchMessages.length > 50) {
            this.dispatchMessages.shift();
        }
        
        this.updateDispatchLog();
    }
    
    updateDispatchLog() {
        let html = '<div style="color: #00ff00; font-weight: bold; margin-bottom: 4px;">DISPATCH LOG</div>';
        this.dispatchMessages.slice(-10).forEach(msg => {
            const color = msg.agency === 'SPF' ? '#00ffff' : msg.agency === 'SCDF' ? '#ff8800' : '#00ff00';
            html += `<div style="margin-bottom: 2px;"><span style="color: #888;">[${msg.timestamp}]</span> <span style="color: ${color};">${msg.agency}:</span> ${msg.message}</div>`;
        });
        this.dispatchLog.innerHTML = html;
    }
    
    getRandomLocation() {
        const locations = [
            'Marina Bay', 'Orchard Road', 'Chinatown', 'Little India',
            'Geylang', 'Toa Payoh', 'Jurong East', 'Tampines', 'Woodlands',
            'Bedok', 'Ang Mo Kio', 'Bishan', 'Clementi', 'Bukit Batok',
            'Yishun', 'Sembawang', 'Pasir Ris', 'Changi', 'Sentosa'
        ];
        return locations[Math.floor(Math.random() * locations.length)];
    }
    
    // Start dispatch loop (random messages)
    startDispatchLoop() {
        setInterval(() => {
            if (Math.random() < 0.3) {
                const types = ['patrol', 'traffic', 'crime'];
                const type = types[Math.floor(Math.random() * types.length)];
                this.sendPoliceMessage(type);
            }
            
            if (Math.random() < 0.1) {
                const types = ['medical', 'fire'];
                const type = types[Math.floor(Math.random() * types.length)];
                this.sendSCDFMessage(type);
            }
        }, 15000); // Every 15 seconds
    }
    
    update(delta) {
        // Update dispatch log if visible
        if (this.dispatchLog.style.display !== 'none') {
            this.updateDispatchLog();
        }
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.SingaporeGovCommsSystem = SingaporeGovCommsSystem;
}
