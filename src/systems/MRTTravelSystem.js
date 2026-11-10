/**
 * MRT Travel System
 * Fast travel via Singapore MRT
 */

export const MRTLines = {
    'NSL': { name: 'North South Line', color: 0xFF0000, operator: 'SMRT' },
    'EWL': { name: 'East West Line', color: 0x00FF00, operator: 'SMRT' },
    'CCL': { name: 'Circle Line', color: 0xFF9900, operator: 'SMRT' },
    'NEL': { name: 'North East Line', color: 0x800080, operator: 'SBS Transit' },
    'DTL': { name: 'Downtown Line', color: 0x0000FF, operator: 'SBS Transit' },
    'TEL': { name: 'Thomson-East Coast Line', color: 0x8B4513, operator: 'SMRT' }
};

export const MRTStations = [
    { name: 'Marina Bay', lines: ['NSL', 'CCL', 'TEL'], x: 0, z: 50 },
    { name: 'Raffles Place', lines: ['NSL', 'EWL'], x: 0, z: 30 },
    { name: 'City Hall', lines: ['NSL', 'EWL'], x: -10, z: 25 },
    { name: 'Orchard', lines: ['NSL', 'TEL'], x: -50, z: -50 },
    { name: 'Somerset', lines: ['NSL'], x: -45, z: -45 },
    { name: 'Dhoby Ghaut', lines: ['NSL', 'CCL', 'NEL'], x: -30, z: -20 },
    { name: 'Little India', lines: ['NEL', 'DTL'], x: -20, z: 0 },
    { name: 'Farrer Park', lines: ['NEL'], x: -15, z: 5 },
    { name: 'Chinatown', lines: ['NEL', 'DTL'], x: -30, z: 20 },
    { name: 'Outram Park', lines: ['EWL', 'NEL', 'TEL'], x: -25, z: 25 },
    { name: 'Tiong Bahru', lines: ['EWL'], x: -40, z: 30 },
    { name: 'Redhill', lines: ['EWL'], x: -50, z: 35 },
    { name: 'Queenstown', lines: ['EWL'], x: -60, z: 35 },
    { name: 'Commonwealth', lines: ['EWL'], x: -70, z: 35 },
    { name: 'Buona Vista', lines: ['EWL', 'CCL'], x: -80, z: 30 },
    { name: 'Clementi', lines: ['EWL'], x: -150, z: -50 },
    { name: 'Jurong East', lines: ['EWL', 'NSL'], x: -200, z: -100 },
    { name: 'Woodlands', lines: ['NSL', 'TEL'], x: -100, z: -200 },
    { name: 'Yishun', lines: ['NSL'], x: -80, z: -180 },
    { name: 'Sembawang', lines: ['NSL'], x: -100, z: -220 },
    { name: 'Admiralty', lines: ['NSL'], x: -95, z: -210 },
    { name: 'Tampines', lines: ['EWL', 'DTL'], x: 150, z: -50 },
    { name: 'Pasir Ris', lines: ['EWL'], x: 180, z: -40 },
    { name: 'Bedok', lines: ['EWL'], x: 150, z: 0 },
    { name: 'Kembangan', lines: ['EWL'], x: 140, z: 5 },
    { name: 'Eunos', lines: ['EWL'], x: 120, z: 10 },
    { name: 'Paya Lebar', lines: ['EWL', 'CCL'], x: 100, z: 15 },
    { name: 'Aljunied', lines: ['EWL'], x: 90, z: 18 },
    { name: 'Kallang', lines: ['EWL'], x: 70, z: 20 },
    { name: 'Lavender', lines: ['EWL'], x: 60, z: 22 },
    { name: 'Bugis', lines: ['EWL', 'DTL'], x: 50, z: 25 },
    { name: 'Promenade', lines: ['CCL', 'DTL'], x: 10, z: 40 },
    { name: 'Bayfront', lines: ['CCL', 'DTL'], x: 5, z: 50 },
    { name: 'Marina South Pier', lines: ['NSL'], x: 0, z: 60 }
];

export class MRTTravelSystem {
    constructor(game) {
        this.game = game;
        this.ezLinkBalance = 50.00;
        this.currentStation = null;
        this.isTraveling = false;
        this.setupUI();
    }
    
    setupUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'mrt-ui';
        this.ui.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            max-height: 500px;
            overflow-y: auto;
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
    
    openMRT() {
        this.ui.style.display = 'block';
        this.renderUI();
    }
    
    closeMRT() {
        this.ui.style.display = 'none';
    }
    
    renderUI() {
        let html = '<h2 style="color: #ff0000; margin-bottom: 15px;">🚇 MRT TRAVEL</h2>';
        html += `<div style="margin-bottom: 10px; color: #ffff00;">EZ-Link Balance: $${this.ezLinkBalance.toFixed(2)}</div>`;
        html += '<div style="margin-bottom: 10px; color: #888;">Select destination station:</div>';
        
        // Group by line
        const lines = {};
        for (const station of MRTStations) {
            for (const line of station.lines) {
                if (!lines[line]) lines[line] = [];
                lines[line].push(station);
            }
        }
        
        for (const [lineCode, stations] of Object.entries(lines)) {
            const line = MRTLines[lineCode];
            html += `<div style="color: #${line.color.toString(16).padStart(6, '0')}; font-weight: bold; margin: 10px 0 5px;">${line.name}</div>`;
            for (const station of stations) {
                const fare = this.calculateFare(station);
                html += `<button onclick="window.game.mrtSystem.travelTo('${station.name}')" style="
                    display: block; width: 100%; padding: 6px; margin-bottom: 3px;
                    background: rgba(255, 0, 0, 0.1); border: 1px solid #ff0000;
                    color: #ff0000; border-radius: 4px; cursor: pointer; text-align: left; font-size: 11px;
                ">${station.name} - $${fare.toFixed(2)}</button>`;
            }
        }
        
        html += '<div style="margin-top: 10px; color: #888; font-size: 10px;">Press T to close</div>';
        this.ui.innerHTML = html;
    }
    
    calculateFare(destination) {
        const station = MRTStations.find(s => s.name === destination);
        if (!station || !this.game.player) return 1.50;
        
        const dist = Math.sqrt(
            (station.x - this.game.player.position.x) ** 2 +
            (station.z - this.game.player.position.z) ** 2
        );
        
        // Fare based on distance
        if (dist < 5) return 0.99;
        if (dist < 15) return 1.20;
        if (dist < 30) return 1.50;
        if (dist < 50) return 1.80;
        return 2.20;
    }
    
    travelTo(stationName) {
        const station = MRTStations.find(s => s.name === stationName);
        if (!station) return false;
        
        const fare = this.calculateFare(stationName);
        if (this.ezLinkBalance < fare) {
            if (this.game.showNotification) {
                this.game.showNotification('❌ INSUFFICIENT BALANCE', `Need $${fare.toFixed(2)} on EZ-Link`);
            }
            return false;
        }
        
        this.ezLinkBalance -= fare;
        this.isTraveling = true;
        
        // Simulate travel time
        if (this.game.showNotification) {
            this.game.showNotification('🚇 TRAVELING', `MRT to ${stationName} - $${fare.toFixed(2)}`);
        }
        
        setTimeout(() => {
            if (this.game.player) {
                this.game.player.position.set(station.x, 1, station.z);
            }
            this.isTraveling = false;
            if (this.game.showNotification) {
                this.game.showNotification('🚇 ARRIVED', `Welcome to ${stationName} MRT`);
            }
        }, 3000 + Math.random() * 2000);
        
        this.closeMRT();
        return true;
    }
    
    topUpEZLink(amount) {
        this.ezLinkBalance += amount;
        if (this.game.player) {
            this.game.player.money = (this.game.player.money || 0) - amount;
        }
        if (this.game.showNotification) {
            this.game.showNotification('💳 TOP UP', `EZ-Link topped up by $${amount}`);
        }
    }
    
    toggleUI() {
        this.ui.style.display = this.ui.style.display === 'none' ? 'block' : 'none';
        if (this.ui.style.display === 'block') {
            this.renderUI();
        }
    }
    
    update(delta) {
        // Update MRT state
    }
}

export function getMRTStation(name) {
    return MRTStations.find(s => s.name === name) || null;
}

export function getMRTLine(code) {
    return MRTLines[code] || null;
}
