import * as THREE from 'three';
/**
 * Singapore Rides System
 * Cable car, monorail, Singapore Flyer, etc.
 */

export class SingaporeRidesSystem {
    constructor(game) {
        this.game = game;
        this.rides = [];
    }

    initRides() {
        const rideData = [
            { name: 'Singapore Cable Car', type: 'cable-car', position: new THREE.Vector3(-200, 0, 300), height: 100, speed: 5 },
            { name: 'Singapore Flyer', type: 'ferris-wheel', position: new THREE.Vector3(80, 0, 150), height: 165, speed: 0.5 },
            { name: 'Sentosa Monorail', type: 'monorail', position: new THREE.Vector3(-200, 0, 320), height: 10, speed: 30 },
            { name: 'Luge', type: 'luge', position: new THREE.Vector3(-220, 0, 340), height: 50, speed: 40 },
            { name: 'Skyline Luge', type: 'luge', position: new THREE.Vector3(-230, 0, 350), height: 60, speed: 45 }
        ];

        for (const data of rideData) {
            this.createRide(data);
        }
    }

    createRide(data) {
        const ride = {
            name: data.name,
            type: data.type,
            position: data.position.clone(),
            height: data.height,
            speed: data.speed,
            active: true,
            riders: []
        };

        // Create ride structure
        const geo = new THREE.BoxGeometry(10, data.height, 10);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0xFF6347, 
            roughness: 0.5,
            metalness: 0.3,
            envMapIntensity: 1.0 
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(data.position);
        mesh.position.y += data.height / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        ride.mesh = mesh;

        this.rides.push(ride);
        return ride;
    }

    takeRide(ride) {
        if (!ride || !this.game.player) return false;

        // Move player to ride
        this.game.player.position.copy(ride.position);
        this.game.player.position.y += ride.height;

        this.game.showNotification('Ride', 'Taking ' + ride.name);

        // Charge fee
        const fee = ride.type === 'cable-car' ? 35 : ride.type === 'ferris-wheel' ? 35 : 20;
        this.game.player.money = (this.game.player.money || 0) - fee;

        return true;
    }

    createRidesUI() {
        const panel = document.createElement('div');
        panel.id = 'rides-panel';
        panel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;max-height:500px;overflow-y:auto;background:rgba(10,10,30,0.95);border:2px solid #FF6347;border-radius:8px;padding:15px;z-index:10000;color:#fff;';

        let html = '<h2 style="color:#FF6347;margin-bottom:15px;">🎢 SINGAPORE RIDES</h2>';
        html += '<div style="margin-bottom:10px;color:#aaa;">Select to ride</div>';

        for (const ride of this.rides) {
            html += '<button onclick="window.game.rides.takeRide(window.game.rides.rides.find(r=>r.name===\'' + ride.name + '\'))" style="display:block;width:100%;padding:8px;margin-bottom:5px;background:rgba(255,99,71,0.1);border:1px solid #FF6347;color:#FF6347;border-radius:4px;cursor:pointer;text-align:left;">';
            html += ride.name + ' (' + ride.type + ')';
            html += '</button>';
        }

        panel.innerHTML = html;
        document.body.appendChild(panel);
        return panel;
    }

    toggleUI() {
        if (!this.panel) {
            this.panel = this.createRidesUI();
        }
        this.panel.style.display = this.panel.style.display === 'none' ? 'block' : 'none';
    }

    update(delta) {}

    destroy() {
        for (const ride of this.rides) {
            if (ride.mesh) this.game.scene.remove(ride.mesh);
        }
        this.rides = [];
    }
}

if (typeof window !== 'undefined') {
    window.SingaporeRidesSystem = SingaporeRidesSystem;
}