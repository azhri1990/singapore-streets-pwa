import * as THREE from 'three';
/**
 * Changi Airport System
 * Singapore Changi Airport - terminals, flights, shopping
 */

export class ChangiAirportSystem {
    constructor(game) {
        this.game = game;
        this.terminals = [];
        this.flights = [];
        this.shops = [];
        this.position = new THREE.Vector3(300, 0, 200);
    }

    initAirport() {
        // Create terminals
        const terminalData = [
            { name: 'Terminal 1', position: new THREE.Vector3(300, 0, 200), size: { w: 80, h: 15, d: 60 } },
            { name: 'Terminal 2', position: new THREE.Vector3(350, 0, 200), size: { w: 90, h: 15, d: 70 } },
            { name: 'Terminal 3', position: new THREE.Vector3(400, 0, 200), size: { w: 100, h: 18, d: 80 } },
            { name: 'Terminal 4', position: new THREE.Vector3(450, 0, 200), size: { w: 70, h: 12, d: 50 } },
            { name: 'Jewel', position: new THREE.Vector3(375, 0, 150), size: { w: 60, h: 40, d: 60 } }
        ];

        for (const data of terminalData) {
            this.createTerminal(data);
        }

        // Create runways
        this.createRunway(new THREE.Vector3(250, 0, 100), 200);
        this.createRunway(new THREE.Vector3(250, 0, 300), 200);

        // Create shops
        this.createShops();

        // Generate flights
        this.generateFlights();
    }

    createTerminal(data) {
        const terminal = {
            name: data.name,
            position: data.position.clone(),
            size: data.size,
            gates: [],
            active: true
        };

        const geo = new THREE.BoxGeometry(data.size.w, data.size.h, data.size.d);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0x87CEEB,
            roughness: 0.7,
            metalness: 0.2,
            envMapIntensity: 0.8
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(data.position);
        mesh.position.y += data.size.h / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        terminal.mesh = mesh;

        this.terminals.push(terminal);
        return terminal;
    }

    createRunway(position, length) {
        const runwayGeo = new THREE.BoxGeometry(length, 0.5, 40);
        const runwayMat = new THREE.MeshStandardMaterial({ 
            color: 0x333333, 
            roughness: 0.95, 
            metalness: 0.0 
        });
        const runway = new THREE.Mesh(runwayGeo, runwayMat);
        runway.position.copy(position);
        runway.position.y += 0.25;
        runway.castShadow = true;
        runway.receiveShadow = true;
        this.game.scene.add(runway);
        return runway;
    }

    createShops() {
        const shopData = [
            { name: 'Duty Free', type: 'shopping', position: new THREE.Vector3(375, 0, 180) },
            { name: 'Food Court', type: 'food', position: new THREE.Vector3(375, 0, 220) },
            { name: 'Jewel Rain Vortex', type: 'attraction', position: new THREE.Vector3(375, 0, 150) },
            { name: 'Butterfly Garden', type: 'attraction', position: new THREE.Vector3(320, 0, 180) },
            { name: 'Sunflower Garden', type: 'attraction', position: new THREE.Vector3(420, 0, 180) }
        ];

        for (const data of shopData) {
            this.createShop(data);
        }
    }

    createShop(data) {
        const shop = {
            name: data.name,
            type: data.type,
            position: data.position.clone()
        };

        const geo = new THREE.BoxGeometry(15, 5, 15);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0xFFD700, 
            roughness: 0.8, 
            metalness: 0.2,
            envMapIntensity: 1.0 
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(data.position);
        mesh.position.y += 2.5;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        shop.mesh = mesh;

        this.shops.push(shop);
        return shop;
    }

    generateFlights() {
        const destinations = ['Tokyo', 'London', 'Sydney', 'New York', 'Dubai', 'Hong Kong', 'Bangkok', 'Jakarta'];
        const airlines = ['Singapore Airlines', 'Scoot', 'Jetstar', 'AirAsia', 'Emirates', 'Cathay Pacific'];

        for (let i = 0; i < 20; i++) {
            const flight = {
                number: 'SQ' + (100 + i),
                destination: destinations[Math.floor(Math.random() * destinations.length)],
                airline: airlines[Math.floor(Math.random() * airlines.length)],
                terminal: 'Terminal ' + (1 + Math.floor(Math.random() * 4)),
                gate: 'A' + (1 + Math.floor(Math.random() * 20)),
                departure: new Date(Date.now() + Math.random() * 3600000),
                status: Math.random() > 0.8 ? 'delayed' : 'on-time'
            };
            this.flights.push(flight);
        }
    }

    getFlightList() {
        return this.flights.map(f => ({
            number: f.number,
            destination: f.destination,
            airline: f.airline,
            terminal: f.terminal,
            gate: f.gate,
            departure: f.departure.toLocaleTimeString(),
            status: f.status
        }));
    }

    createAirportUI() {
        const panel = document.createElement('div');
        panel.id = 'airport-panel';
        panel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;max-height:600px;overflow-y:auto;background:rgba(10,10,30,0.95);border:2px solid #87CEEB;border-radius:8px;padding:15px;z-index:10000;color:#fff;';

        let html = '<h2 style="color:#87CEEB;margin-bottom:15px;">✈️ CHANGI AIRPORT</h2>';
        html += '<div style="margin-bottom:10px;color:#aaa;">Flight Information</div>';

        for (const flight of this.flights.slice(0, 10)) {
            const statusColor = flight.status === 'delayed' ? '#FF0000' : '#00FF00';
            html += '<div style="padding:8px;margin-bottom:5px;background:rgba(135,206,235,0.1);border:1px solid #87CEEB;border-radius:4px;">';
            html += '<strong>' + flight.number + '</strong> - ' + flight.destination + '<br>';
            html += flight.airline + ' | ' + flight.terminal + ' Gate ' + flight.gate + '<br>';
            html += 'Departure: ' + flight.departure.toLocaleTimeString() + ' | <span style="color:' + statusColor + '">' + flight.status + '</span>';
            html += '</div>';
        }

        panel.innerHTML = html;
        document.body.appendChild(panel);
        return panel;
    }

    toggleUI() {
        if (!this.panel) {
            this.panel = this.createAirportUI();
        }
        this.panel.style.display = this.panel.style.display === 'none' ? 'block' : 'none';
    }

    update(delta) {}

    destroy() {
        for (const t of this.terminals) {
            if (t.mesh) this.game.scene.remove(t.mesh);
        }
        for (const s of this.shops) {
            if (s.mesh) this.game.scene.remove(s.mesh);
        }
        this.terminals = [];
        this.shops = [];
        this.flights = [];
    }
}

if (typeof window !== 'undefined') {
    window.ChangiAirportSystem = ChangiAirportSystem;
}