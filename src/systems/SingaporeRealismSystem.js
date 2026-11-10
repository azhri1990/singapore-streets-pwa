import * as THREE from 'three';
/**
 * Singapore Realism System
 * Handles Singapore-specific realism: ERP, laws, HDB complaints, police response
 * Gang territories, hawker centers, MRT stations, gang wars
 */

export class SingaporeRealismSystem {
    constructor(game) {
        this.game = game;
        this.erpGantries = [];
        this.policeStations = [];
        this.hdbComplaints = [];
        this.offenses = [];
        this.policeResponseTime = 0;
        this.heatLevel = 0;
        this.maxHeat = 5;
        this.erpPrices = {
            'cbd': 3.5,
            'orchard': 2.0,
            'jurong': 1.5,
            'tampines': 1.0
        };
        
        // Singapore gang territories
        this.gangTerritories = [];
        this.hawkerCenters = [];
        this.mrtStations = [];
        
        // Initialize Singapore locations
        this.initSingaporeLocations();
    }
    
    initSingaporeLocations() {
        // Gang territories (based on real Singapore areas)
        const gangData = [
            { name: 'Geylang Lorongs', gang: 'Red Circle', center: new THREE.Vector3(150, 0, -50), radius: 40, color: 0xFF0000 },
            { name: 'Chinatown', gang: 'Dragon Brotherhood', center: new THREE.Vector3(-100, 0, 50), radius: 35, color: 0x00FF00 },
            { name: 'Little India', gang: 'Tiger Syndicate', center: new THREE.Vector3(-50, 0, 150), radius: 30, color: 0x0000FF },
            { name: 'Jurong East', gang: 'West Side Boys', center: new THREE.Vector3(-200, 0, -100), radius: 45, color: 0xFFFF00 },
            { name: 'Tampines', gang: 'East Side Crew', center: new THREE.Vector3(200, 0, 100), radius: 40, color: 0xFF00FF },
            { name: 'Woodlands', gang: 'North Side', center: new THREE.Vector3(0, 0, -200), radius: 50, color: 0x00FFFF }
        ];
        
        for (const data of gangData) {
            this.createGangTerritory(data);
        }
        
        // Hawker centers (real Singapore locations)
        const hawkerData = [
            { name: 'Maxwell Food Centre', position: new THREE.Vector3(0, 0, 50), stalls: 80 },
            { name: 'Lau Pa Sat', position: new THREE.Vector3(50, 0, 0), stalls: 50 },
            { name: 'Newton Food Centre', position: new THREE.Vector3(-50, 0, -50), stalls: 60 },
            { name: 'Old Airport Road', position: new THREE.Vector3(100, 0, 100), stalls: 70 },
            { name: 'Tiong Bahru Market', position: new THREE.Vector3(-100, 0, -100), stalls: 45 },
            { name: 'Geylang Serai Market', position: new THREE.Vector3(150, 0, -100), stalls: 55 }
        ];
        
        for (const data of hawkerData) {
            this.createHawkerCenter(data);
        }
        
        // MRT stations (real Singapore MRT)
        const mrtData = [
            { name: 'Raffles Place', line: 'NSL/EWL', position: new THREE.Vector3(0, 0, 0) },
            { name: 'Orchard', line: 'NSL', position: new THREE.Vector3(-50, 0, 50) },
            { name: 'Jurong East', line: 'NSL/EWL', position: new THREE.Vector3(-200, 0, -100) },
            { name: 'Tampines', line: 'EWL', position: new THREE.Vector3(200, 0, 100) },
            { name: 'Woodlands', line: 'NSL', position: new THREE.Vector3(0, 0, -200) },
            { name: 'Changi Airport', line: 'EWL', position: new THREE.Vector3(300, 0, 200) },
            { name: 'Marina Bay', line: 'NSL/CEL', position: new THREE.Vector3(0, 0, 100) },
            { name: 'Bugis', line: 'EWL/DTL', position: new THREE.Vector3(50, 0, 50) }
        ];
        
        for (const data of mrtData) {
            this.createMRTStation(data);
        }
    }
    
    // Create ERP gantry
    createERPGantry(position, zone) {
        zone = zone || 'cbd';
        const gantry = {
            position: position,
            zone: zone,
            price: this.erpPrices[zone] || 2.0,
            active: true,
            lastCharge: 0
        };
        
        const gantryGeo = new THREE.BoxGeometry(12, 6, 2);
        const gantryMat = new THREE.MeshStandardMaterial({ 
            color: 0x808080,
            roughness: 0.5,
            metalness: 0.3,
            envMapIntensity: 1.0
        });
        const mesh = new THREE.Mesh(gantryGeo, gantryMat);
        mesh.position.copy(position);
        mesh.position.y += 3;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        gantry.mesh = mesh;
        
        const signGeo = new THREE.PlaneGeometry(4, 2);
        const signMat = new THREE.MeshStandardMaterial({ 
            color: 0x00FF00,
            roughness: 0.9,
            metalness: 0.0,
            transparent: true,
            opacity: 0.8,
            envMapIntensity: 0.5
        });
        const sign = new THREE.Mesh(signGeo, signMat);
        sign.position.copy(position);
        sign.position.y += 5;
        sign.position.z += 2;
        this.game.scene.add(sign);
        
        this.erpGantries.push(gantry);
        return gantry;
    }

    // Check if player passes through ERP
    checkERP(position, vehicleType) {
        vehicleType = vehicleType || 'car';
        for (const gantry of this.erpGantries) {
            if (!gantry.active) continue;
            const dist = position.distanceTo(gantry.position);
            if (dist < 8) {
                const charge = gantry.price * (vehicleType === 'taxi' ? 1.5 : 1);
                this.chargeERP(charge, gantry.zone);
                gantry.lastCharge = Date.now();
                return charge;
            }
        }
        return 0;
    }

    chargeERP(amount, zone) {
        if (this.game.player) {
            this.game.player.money = (this.game.player.money || 0) - amount;
            this.game.showNotification('ERP Charged', '$' + amount.toFixed(2) + ' - ' + zone.toUpperCase() + ' Zone');
        }
    }

    // Singapore-specific offenses
    commitOffense(offenseType, position) {
        const offense = {
            type: offenseType,
            position: position.clone(),
            time: Date.now(),
            reported: false
        };
        
        const offenseData = {
            'littering': { fine: 1000, reportChance: 0.3, heat: 0 },
            'smoking-hdb': { fine: 1000, reportChance: 0.5, heat: 1 },
            'chewing-gum': { fine: 500, reportChance: 0.2, heat: 0 },
            'public-drinking': { fine: 1000, reportChance: 0.4, heat: 1 },
            'jaywalking': { fine: 50, reportChance: 0.1, heat: 0 },
            'assault': { fine: 5000, reportChance: 0.8, heat: 3 },
            'murder': { fine: 0, reportChance: 1.0, heat: 5 },
            'theft': { fine: 2000, reportChance: 0.6, heat: 2 },
            'vandalism': { fine: 1000, reportChance: 0.4, heat: 1 }
        };
        
        const data = offenseData[offenseType] || { fine: 500, reportChance: 0.5, heat: 1 };
        offense.fine = data.fine;
        offense.reportChance = data.reportChance;
        offense.heat = data.heat;
        
        this.offenses.push(offense);
        this.addHeat(offense.heat);
        
        if (Math.random() < offense.reportChance) {
            offense.reported = true;
            this.reportToPolice(offense);
        }
        
        if (offenseType === 'littering' || offenseType === 'smoking-hdb') {
            this.fileHDBComplaint(offense);
        }
        
        return offense;
    }

    addHeat(amount) {
        this.heatLevel = Math.min(this.maxHeat, this.heatLevel + amount);
        if (this.heatLevel >= this.maxHeat) {
            this.triggerPoliceResponse();
        }
    }

    reduceHeat(amount) {
        this.heatLevel = Math.max(0, this.heatLevel - amount);
    }

    reportToPolice(offense) {
        const responseTime = offense.heat >= 4 ? 3 : offense.heat >= 2 ? 5 : 10;
        this.policeResponseTime = responseTime * 60;
        
        this.game.showNotification('Police Alert', 'Reported: ' + offense.type.toUpperCase());
        
        if (this.game.aiTrafficSystem) {
            this.game.aiTrafficSystem.spawnPolice(offense.position);
        }
    }

    fileHDBComplaint(offense) {
        const complaint = {
            offense: offense,
            timestamp: Date.now(),
            resolved: false
        };
        this.hdbComplaints.push(complaint);
        
        this.game.showNotification('HDB Complaint', 'Management has been notified');
    }

    triggerPoliceResponse() {
        this.game.showNotification('WANTED', 'Police are responding!');
        
        if (this.game.aiTrafficSystem) {
            this.game.aiTrafficSystem.increasePolicePresence(3);
        }
    }

    enforceSingaporeLaws() {
        if (!this.game.player) return;
        
        const player = this.game.player;
        
        if (player.currentItem === 'beer' && this.isInHDBArea(player.position)) {
            this.commitOffense('public-drinking', player.position);
        }
        
        if (player.isSmoking && this.isInHDBArea(player.position)) {
            this.commitOffense('smoking-hdb', player.position);
        }
    }

    isInHDBArea(position) {
        const dist = Math.sqrt(position.x ** 2 + position.z ** 2);
        return dist < 100;
    }

    createGangTerritory(data) {
        const territory = {
            name: data.name,
            gang: data.gang,
            center: data.center,
            radius: data.radius,
            color: data.color,
            controlled: true,
            heat: 0
        };
        
        const markerGeo = new THREE.CircleGeometry(data.radius, 32);
        const markerMat = new THREE.MeshStandardMaterial({
            color: data.color,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide,
            roughness: 0.8,
            metalness: 0.1
        });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.copy(data.center);
        marker.position.y = 0.1;
        marker.rotation.x = -Math.PI / 2;
        this.game.scene.add(marker);
        territory.marker = marker;
        
        this.gangTerritories.push(territory);
        return territory;
    }

    createHawkerCenter(data) {
        const center = {
            name: data.name,
            position: data.position,
            stalls: data.stalls,
            active: true
        };
        
        const buildingGeo = new THREE.BoxGeometry(30, 6, 25);
        const buildingMat = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, 
            roughness: 0.9, 
            metalness: 0.0 
        });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.copy(data.position);
        building.position.y += 3;
        building.castShadow = true;
        building.receiveShadow = true;
        this.game.scene.add(building);
        center.building = building;
        
        this.hawkerCenters.push(center);
        return center;
    }

    createMRTStation(data) {
        const station = {
            name: data.name,
            line: data.line,
            position: data.position,
            active: true
        };
        
        const stationGeo = new THREE.BoxGeometry(20, 8, 15);
        const stationMat = new THREE.MeshStandardMaterial({ 
            color: 0x4682B4, 
            roughness: 0.7, 
            metalness: 0.2,
            envMapIntensity: 1.0
        });
        const building = new THREE.Mesh(stationGeo, stationMat);
        building.position.copy(data.position);
        building.position.y += 4;
        building.castShadow = true;
        building.receiveShadow = true;
        this.game.scene.add(building);
        station.building = building;
        
        const entranceGeo = new THREE.CylinderGeometry(2, 2, 1, 8);
        const entranceMat = new THREE.MeshStandardMaterial({ 
            color: 0x808080,
            roughness: 0.9,
            metalness: 0.1
        });
        const entrance = new THREE.Mesh(entranceGeo, entranceMat);
        entrance.position.copy(data.position);
        entrance.position.y += 0.5;
        entrance.castShadow = true;
        entrance.receiveShadow = true;
        this.game.scene.add(entrance);
        
        this.mrtStations.push(station);
        return station;
    }

    triggerHawkerFight(center, participants) {
        if (!center || !participants) return;
        
        const fight = {
            center: center,
            participants: participants,
            active: true,
            startTime: Date.now()
        };
        
        this.createHawkerChaos(center.position);
        this.commitOffense('assault', center.position);
        
        return fight;
    }

    createHawkerChaos(position) {
        for (let i = 0; i < 5; i++) {
            const tableGeo = new THREE.BoxGeometry(2, 0.1, 1.5);
            const tableMat = new THREE.MeshStandardMaterial({ 
                color: 0x8B4513, 
                roughness: 0.7,
                metalness: 0.0
            });
            const table = new THREE.Mesh(tableGeo, tableMat);
            table.position.copy(position);
            table.position.x += (Math.random() - 0.5) * 10;
            table.position.z += (Math.random() - 0.5) * 10;
            table.rotation.x = Math.random() * 0.5;
            table.rotation.z = Math.random() * 0.5;
            table.castShadow = true;
            table.receiveShadow = true;
            this.game.scene.add(table);
        }
        
        for (let i = 0; i < 30; i++) {
            const foodGeo = new THREE.SphereGeometry(0.05, 4, 4);
            const foodMat = new THREE.MeshStandardMaterial({ 
                color: Math.random() > 0.5 ? 0xFF6347 : 0xFFD700,
                roughness: 0.8,
                metalness: 0.0
            });
            const food = new THREE.Mesh(foodGeo, foodMat);
            food.position.copy(position);
            food.position.x += (Math.random() - 0.5) * 8;
            food.position.y += Math.random() * 2;
            food.position.z += (Math.random() - 0.5) * 8;
            this.game.scene.add(food);
        }
    }

    commitMRTCrime(station, crimeType) {
        if (!station) return;
        
        const crime = {
            station: station,
            type: crimeType,
            time: Date.now(),
            reported: false
        };
        
        const reportChance = 0.9;
        if (Math.random() < reportChance) {
            crime.reported = true;
            this.reportToPolice({ type: crimeType, position: station.position, heat: 3 });
        }
        
        if (crimeType === 'murder' || crimeType === 'assault') {
            this.triggerMRTLockdown(station);
        }
        
        return crime;
    }

    triggerMRTLockdown(station) {
        this.game.showNotification('MRT Alert', station.name + ' station locked down!');
        
        if (station.building) {
            station.building.material.color.setHex(0xFF0000);
        }
    }

    checkGangTerritory(position) {
        for (const territory of this.gangTerritories) {
            const dist = position.distanceTo(territory.center);
            if (dist < territory.radius) {
                return territory;
            }
        }
        return null;
    }

    triggerGangWar(territory1, territory2) {
        if (!territory1 || !territory2) return;
        
        const war = {
            territories: [territory1, territory2],
            active: true,
            startTime: Date.now()
        };
        
        this.createGangWarEffects(territory1.center, territory2.center);
        this.addHeat(5);
        
        return war;
    }

    createGangWarEffects(pos1, pos2) {
        const mid = pos1.clone().lerp(pos2, 0.5);
        for (let i = 0; i < 20; i++) {
            this.game.goreSystem.createBloodSplatter(
                mid,
                new THREE.Vector3(Math.random() - 0.5, 1, Math.random() - 0.5),
                0.5
            );
        }
    }

    update(delta) {
        if (this.policeResponseTime > 0) {
            this.policeResponseTime -= delta;
            if (this.policeResponseTime <= 0) {
                this.policeResponseTime = 0;
            }
        }
        
        if (this.heatLevel > 0) {
            this.reduceHeat(delta * 0.05);
        }
        
        this.enforceSingaporeLaws();
    }

    destroy() {
        this.erpGantries = [];
        this.policeStations = [];
        this.hdbComplaints = [];
        this.offenses = [];
        this.gangTerritories = [];
        this.hawkerCenters = [];
        this.mrtStations = [];
    }
}

if (typeof window !== 'undefined') {
    window.SingaporeRealismSystem = SingaporeRealismSystem;
}