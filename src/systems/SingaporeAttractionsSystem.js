import * as THREE from 'three';
/**
 * Singapore Attractions System
 * Real Singapore attractions: MBS, Gardens by the Bay, Sentosa, etc.
 */

export class SingaporeAttractionsSystem {
    constructor(game) {
        this.game = game;
        this.attractions = [];
        this.touristSpots = [];
    }

    initAttractions() {
        const attractionData = [
            { name: 'Marina Bay Sands', type: 'hotel', position: new THREE.Vector3(0, 0, 200), entry: 20, height: 55 },
            { name: 'Gardens by the Bay', type: 'park', position: new THREE.Vector3(50, 0, 250), entry: 0, height: 20 },
            { name: 'Sentosa', type: 'island', position: new THREE.Vector3(-200, 0, 300), entry: 0, height: 5 },
            { name: 'Universal Studios', type: 'theme-park', position: new THREE.Vector3(-250, 0, 350), entry: 80, height: 30 },
            { name: 'Merlion Park', type: 'landmark', position: new THREE.Vector3(20, 0, 180), entry: 0, height: 8 },
            { name: 'Singapore Flyer', type: 'observation', position: new THREE.Vector3(80, 0, 150), entry: 35, height: 165 },
            { name: 'ArtScience Museum', type: 'museum', position: new THREE.Vector3(-30, 0, 220), entry: 20, height: 20 },
            { name: 'Clarke Quay', type: 'nightlife', position: new THREE.Vector3(100, 0, 50), entry: 0, height: 10 },
            { name: 'Orchard Road', type: 'shopping', position: new THREE.Vector3(-50, 0, 50), entry: 0, height: 15 },
            { name: 'Chinatown', type: 'heritage', position: new THREE.Vector3(-100, 0, 50), entry: 0, height: 10 },
            { name: 'Little India', type: 'heritage', position: new THREE.Vector3(-50, 0, 150), entry: 0, height: 10 },
            { name: 'Kampong Glam', type: 'heritage', position: new THREE.Vector3(50, 0, 100), entry: 0, height: 10 }
        ];

        for (const data of attractionData) {
            this.createAttraction(data);
        }
    }

    createAttraction(data) {
        const attraction = {
            name: data.name,
            type: data.type,
            position: data.position.clone(),
            entry: data.entry,
            height: data.height,
            visited: false
        };

        // Create building/structure
        const geo = new THREE.BoxGeometry(20, data.height, 25);
        const mat = new THREE.MeshStandardMaterial({ 
            color: this.getAttractionColor(data.type),
            roughness: 0.8,
            metalness: 0.2,
            envMapIntensity: 0.8
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(data.position);
        mesh.position.y += data.height / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        attraction.mesh = mesh;

        this.attractions.push(attraction);
        return attraction;
    }

    getAttractionColor(type) {
        const colors = {
            'hotel': 0x4169E1,
            'park': 0x228B22,
            'island': 0x00CED1,
            'theme-park': 0xFF6347,
            'landmark': 0xFFD700,
            'observation': 0x87CEEB,
            'museum': 0x9932CC,
            'nightlife': 0xFF1493,
            'shopping': 0xFF69B4,
            'heritage': 0xCD853F
        };
        return colors[type] || 0x808080;
    }

    visitAttraction(attraction) {
        if (!attraction) return false;

        if (this.game.player) {
            this.game.player.money = (this.game.player.money || 0) - attraction.entry;
            attraction.visited = true;
            this.game.showNotification('Attraction', 'Visited ' + attraction.name + ' - $' + attraction.entry);
        }

        return true;
    }

    getAttractionList() {
        return this.attractions.map(a => ({
            name: a.name,
            type: a.type,
            entry: a.entry,
            visited: a.visited
        }));
    }

    createAttractionUI() {
        const panel = document.createElement('div');
        panel.id = 'attraction-panel';
        panel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;max-height:500px;overflow-y:auto;background:rgba(10,10,30,0.95);border:2px solid #FFD700;border-radius:8px;padding:15px;z-index:10000;color:#fff;';

        let html = '<h2 style="color:#FFD700;margin-bottom:15px;"> tourist ATTRACTIONS</h2>';
        html += '<div style="margin-bottom:10px;color:#aaa;">Select to visit</div>';

        for (const attr of this.attractions) {
            html += '<button onclick="window.game.attractions.visitAttraction(window.game.attractions.attractions.find(a=>a.name===\'' + attr.name + '\'))" style="display:block;width:100%;padding:8px;margin-bottom:5px;background:rgba(255,215,0,0.1);border:1px solid #FFD700;color:#FFD700;border-radius:4px;cursor:pointer;text-align:left;">';
            html += attr.name + ' (' + attr.type + ') - $' + attr.entry;
            html += '</button>';
        }

        panel.innerHTML = html;
        document.body.appendChild(panel);
        return panel;
    }

    toggleUI() {
        if (!this.panel) {
            this.panel = this.createAttractionUI();
        }
        this.panel.style.display = this.panel.style.display === 'none' ? 'block' : 'none';
    }

    update(delta) {}

    destroy() {
        for (const attr of this.attractions) {
            if (attr.mesh) this.game.scene.remove(attr.mesh);
        }
        this.attractions = [];
    }
}

if (typeof window !== 'undefined') {
    window.SingaporeAttractionsSystem = SingaporeAttractionsSystem;
}