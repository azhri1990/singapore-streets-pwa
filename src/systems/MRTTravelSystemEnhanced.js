/**
 * MRT Travel System Enhanced
 * Singapore MRT travel, fares, stations
 */

export class MRTTravelSystemEnhanced {
    constructor(game) {
        this.game = game;
        this.stations = [
            { name: 'Jurong East', code: 'JE', line: 'NSL/EWL', x: -200, z: -100 },
            { name: 'Bukit Batok', code: 'BB', line: 'NSL', x: -150, z: -80 },
            { name: 'Clementi', code: 'CL', line: 'EWL', x: -120, z: -60 },
            { name: 'Dover', code: 'DV', line: 'EWL', x: -100, z: -40 },
            { name: 'Buona Vista', code: 'BV', line: 'EWL/CC', x: -80, z: -20 },
            { name: 'Commonwealth', code: 'CW', line: 'EWL', x: -60, z: 0 },
            { name: 'Queenstown', code: 'QT', line: 'EWL', x: -40, z: 20 },
            { name: 'Redhill', code: 'RD', line: 'EWL', x: -20, z: 40 },
            { name: 'Tiong Bahru', code: 'TB', line: 'EWL', x: 0, z: 60 },
            { name: 'Outram Park', code: 'OP', line: 'EWL/NE', x: 20, z: 80 },
            { name: 'Tanjong Pagar', code: 'TP', line: 'EWL', x: 40, z: 100 },
            { name: 'Raffles Place', code: 'RP', line: 'NSL/EWL', x: 60, z: 0 },
            { name: 'City Hall', code: 'CH', line: 'NSL/EWL', x: 80, z: 0 },
            { name: 'Bugis', code: 'BG', line: 'EWL/DTL', x: 100, z: 20 },
            { name: 'Lavender', code: 'LV', line: 'EWL', x: 120, z: 40 },
            { name: 'Kallang', code: 'KG', line: 'EWL', x: 140, z: 60 },
            { name: 'Aljunied', code: 'AL', line: 'EWL', x: 160, z: 80 },
            { name: 'Payar Lebar', code: 'PL', line: 'EWL/CC', x: 180, z: 100 },
            { name: 'Eunos', code: 'EU', line: 'EWL', x: 200, z: 120 },
            { name: 'Kembangan', code: 'KB', line: 'EWL', x: 220, z: 140 },
            { name: 'Bedok', code: 'BD', line: 'EWL', x: 240, z: 160 },
            { name: 'Tanah Merah', code: 'TM', line: 'EWL', x: 260, z: 180 },
            { name: 'Simei', code: 'SM', line: 'EWL', x: 280, z: 200 },
            { name: 'Tampines', code: 'TP', line: 'EWL', x: 300, z: 220 },
            { name: 'Pasir Ris', code: 'PR', line: 'EWL', x: 320, z: 240 },
            { name: 'Changi Airport', code: 'CG', line: 'EWL', x: 340, z: 260 },
            { name: 'Woodlands', code: 'WD', line: 'NSL', x: 0, z: -200 },
            { name: 'Marsiling', code: 'MS', line: 'NSL', x: 0, z: -180 },
            { name: 'Kranji', code: 'KJ', line: 'NSL', x: 0, z: -160 },
            { name: 'Yew Tee', code: 'YT', line: 'NSL', x: 0, z: -140 },
            { name: 'Choa Chu Kang', code: 'CCK', line: 'NSL', x: 0, z: -120 },
            { name: 'Bukit Panjang', code: 'BP', line: 'DTL', x: -20, z: -100 },
            { name: 'Cashew', code: 'CS', line: 'DTL', x: -40, z: -80 },
            { name: 'Hillview', code: 'HV', line: 'DTL', x: -60, z: -60 },
            { name: 'Beauty World', code: 'BW', line: 'DTL', x: -80, z: -40 },
            { name: 'King Albert Park', code: 'KAP', line: 'DTL', x: -100, z: -20 },
            { name: 'Sixth Avenue', code: 'SA', line: 'DTL', x: -120, z: 0 },
            { name: 'Tan Kah Kee', code: 'TKK', line: 'DTL', x: -140, z: 20 },
            { name: 'Botanic Gardens', code: 'BT', line: 'DTL/CC', x: -160, z: 40 },
            { name: 'Stevens', code: 'SV', line: 'DTL', x: -180, z: 60 },
            { name: 'Newton', code: 'NT', line: 'DTL/NSL', x: -200, z: 80 },
            { name: 'Little India', code: 'LI', line: 'DTL/NE', x: -220, z: 100 },
            { name: 'Rochor', code: 'RC', line: 'DTL', x: -240, z: 120 },
            { name: 'Bugis', code: 'BG', line: 'DTL/EWL', x: -260, z: 140 },
            { name: 'Promenade', code: 'PM', line: 'DTL/CC', x: -280, z: 160 },
            { name: 'Bayfront', code: 'BF', line: 'DTL/CE', x: -300, z: 180 },
            { name: 'Downtown', code: 'DT', line: 'DTL', x: -320, z: 200 },
            { name: 'Telok Ayer', code: 'TA', line: 'DTL', x: -340, z: 220 },
            { name: 'Chinatown', code: 'CT', line: 'DTL/NE', x: -360, z: 240 },
            { name: 'Fort Canning', code: 'FC', line: 'DTL', x: -380, z: 260 },
            { name: 'Bencoolen', code: 'BC', line: 'DTL', x: -400, z: 280 },
            { name: 'Jalan Besar', code: 'JB', line: 'DTL', x: -420, z: 300 },
            { name: 'Bendemeer', code: 'BM', line: 'DTL', x: -440, z: 320 },
            { name: 'Geylang Bahru', code: 'GB', line: 'DTL', x: -460, z: 340 },
            { name: 'Mattar', code: 'MT', line: 'DTL', x: -480, z: 360 },
            { name: 'MacPherson', code: 'MP', line: 'DTL/CC', x: -500, z: 380 },
            { name: 'Ubi', code: 'UB', line: 'DTL', x: -520, z: 400 },
            { name: 'Kaki Bukit', code: 'KB', line: 'DTL', x: -540, z: 420 },
            { name: 'Bedok North', code: 'BN', line: 'DTL', x: -560, z: 440 },
            { name: 'Bedok Reservoir', code: 'BR', line: 'DTL', x: -580, z: 460 },
            { name: 'Tampines West', code: 'TW', line: 'DTL', x: -600, z: 480 },
            { name: 'Tampines', code: 'TP', line: 'DTL', x: -620, z: 500 },
            { name: 'Tampines East', code: 'TE', line: 'DTL', x: -640, z: 520 },
            { name: 'Upper Changi', code: 'UC', line: 'DTL', x: -660, z: 540 },
            { name: 'Expo', code: 'EX', line: 'DTL', x: -680, z: 560 },
            { name: 'Marina Bay', code: 'MB', line: 'CE', x: 0, z: 100 }
        ];
        this.currentStation = null;
        this.travelHistory = [];
    }

    getStation(name) {
        return this.stations.find(s => s.name === name);
    }

    getNearestStation(position) {
        let nearest = null;
        let minDist = Infinity;
        for (const station of this.stations) {
            const dist = Math.sqrt((position.x - station.x) ** 2 + (position.z - station.z) ** 2);
            if (dist < minDist) {
                minDist = dist;
                nearest = station;
            }
        }
        return nearest;
    }

    travelTo(stationName) {
        const station = this.getStation(stationName);
        if (!station) {
            this.game.showNotification('MRT', 'Station not found');
            return false;
        }

        if (this.game.player) {
            this.game.player.position.set(station.x, 1, station.z);
            this.currentStation = station;
            this.travelHistory.push({ station: station.name, time: Date.now() });
            
            this.game.showNotification('MRT Travel', 'Arrived at ' + station.name + ' (' + station.line + ')');
            
            // Charge fare
            const fare = this.calculateFare(stationName);
            this.game.player.money = (this.game.player.money || 0) - fare;
            this.game.showNotification('Fare', '$' + fare.toFixed(2) + ' deducted');
        }

        return true;
    }

    calculateFare(destination) {
        // Simplified fare calculation
        const baseFare = 1.0;
        const distance = Math.random() * 5; // Simplified
        return baseFare + distance * 0.5;
    }

    getRoute(from, to) {
        const fromStation = this.getStation(from);
        const toStation = this.getStation(to);
        if (!fromStation || !toStation) return null;

        // Simplified: direct route
        return {
            from: fromStation.name,
            to: toStation.name,
            stations: [fromStation.name, toStation.name],
            fare: this.calculateFare(to),
            duration: 15 // minutes
        };
    }

    createMRTUI() {
        const panel = document.createElement('div');
        panel.id = 'mrt-panel';
        panel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;max-height:500px;overflow-y:auto;background:rgba(10,10,30,0.95);border:2px solid #4682B4;border-radius:8px;padding:15px;z-index:10000;color:#fff;';

        let html = '<h2 style="color:#4682B4;margin-bottom:15px;">🚇 MRT SYSTEM</h2>';
        html += '<div style="margin-bottom:10px;color:#aaa;">Select destination</div>';

        for (const station of this.stations) {
            html += '<button onclick="window.game.mrtSystem.travelTo(\'' + station.name + '\')" style="display:block;width:100%;padding:8px;margin-bottom:5px;background:rgba(70,130,180,0.1);border:1px solid #4682B4;color:#4682B4;border-radius:4px;cursor:pointer;text-align:left;">';
            html += station.name + ' (' + station.line + ')';
            html += '</button>';
        }

        panel.innerHTML = html;
        document.body.appendChild(panel);
        return panel;
    }

    toggleUI() {
        if (!this.panel) {
            this.panel = this.createMRTUI();
        }
        this.panel.style.display = this.panel.style.display === 'none' ? 'block' : 'none';
    }

    update(delta) {}

    destroy() {
        if (this.panel) {
            this.panel.remove();
        }
        this.travelHistory = [];
    }
}

if (typeof window !== 'undefined') {
    window.MRTTravelSystemEnhanced = MRTTravelSystemEnhanced;
}