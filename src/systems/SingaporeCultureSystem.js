import * as THREE from 'three';
/**
 * Singapore Culture System
 * Singapore-specific cultural details: void decks, Singlish, HDB life
 */

export class SingaporeCultureSystem {
    constructor(game) {
        this.game = game;
        this.voidDecks = [];
        this.singlishPhrases = {
            greetings: ['Hello lah', 'How are you', 'Eh bro', 'Wah lau', 'Siao ah'],
            insults: ['Stupid', 'Idiot', 'Siao', 'Crazy', 'Mad'],
            reactions: ['Wah', 'Alamak', 'Aiyoh', 'Shiok', 'Jialat'],
            food: ['Makan', 'Eat already', 'Hungry', 'Shiok food'],
            money: ['Money no enough', 'Rich', 'Poor', 'Broke'],
            police: ['Police coming', 'Run', 'Hide', 'Cheat', 'Kena'],
            weather: ['Hot', 'Rain', 'Haze', 'Thunder']
        };
        this.hdbBlocks = [];
        this.voidDeckEvents = [];
    }

    // Create void deck (HDB ground floor)
    createVoidDeck(position, blockId) {
        const voidDeck = {
            blockId: blockId,
            position: position.clone(),
            events: [],
            residents: [],
            active: true
        };

        // Create void deck mesh
        const voidGeo = new THREE.BoxGeometry(15, 3, 20);
        const voidMat = new THREE.MeshStandardMaterial({ 
            color: 0x808080, 
            roughness: 0.8, 
            metalness: 0.0, 
            envMapIntensity: 0.8 
        });
        const mesh = new THREE.Mesh(voidGeo, voidMat);
        mesh.position.copy(position);
        mesh.position.y += 1.5;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        voidDeck.mesh = mesh;

        // Add void deck pillars
        for (let i = 0; i < 4; i++) {
            const pillarGeo = new THREE.CylinderGeometry(0.3, 0.3, 3, 8);
            const pillarMat = new THREE.MeshStandardMaterial({ 
                color: 0x606060, 
                roughness: 0.8, 
                metalness: 0.1 
            });
            const pillar = new THREE.Mesh(pillarGeo, pillarMat);
            pillar.position.copy(position);
            pillar.position.x += (i % 2 === 0 ? -5 : 5);
            pillar.position.z += (i < 2 ? -8 : 8);
            pillar.position.y += 1.5;
            pillar.castShadow = true;
            pillar.receiveShadow = true;
            this.game.scene.add(pillar);
        }

        this.voidDecks.push(voidDeck);
        return voidDeck;
    }

    // Void deck events
    triggerVoidDeckEvent(voidDeck, eventType) {
        const events = {
            'wedding': { duration: 3600, participants: 50, noise: 80 },
            'funeral': { duration: 7200, participants: 30, noise: 40 },
            'community': { duration: 1800, participants: 20, noise: 60 },
            'mahjong': { duration: 14400, participants: 4, noise: 70 }
        };

        const event = events[eventType];
        if (!event) return null;

        const voidEvent = {
            type: eventType,
            voidDeck: voidDeck,
            startTime: Date.now(),
            duration: event.duration,
            participants: event.participants,
            noise: event.noise
        };

        voidDeck.events.push(voidEvent);
        this.voidDeckEvents.push(voidEvent);

        this.game.showNotification('Void Deck Event', eventType.toUpperCase() + ' at Block ' + voidDeck.blockId);

        return voidEvent;
    }

    // Singlish voice lines
    getSinglishPhrase(category) {
        const phrases = this.singlishPhrases[category];
        if (!phrases) return '';
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

    // O$P$ loan shark graffiti
    createOSPGraffiti(position) {
        const graffitiGeo = new THREE.PlaneGeometry(2, 1);
        const graffitiMat = new THREE.MeshStandardMaterial({ 
            color: 0xFF0000,
            roughness: 0.9,
            metalness: 0.0,
            transparent: true,
            opacity: 0.9
        });
        const graffiti = new THREE.Mesh(graffitiGeo, graffitiMat);
        graffiti.position.copy(position);
        graffiti.position.y += 1;
        graffiti.rotation.y = Math.random() * Math.PI * 2;
        graffiti.castShadow = true;
        graffiti.receiveShadow = true;
        this.game.scene.add(graffiti);

        // Add "O$P$" text (simplified as red plane)
        return graffiti;
    }

    // Singapore weather
    createWeatherSystem() {
        const weather = {
            type: 'clear',
            intensity: 0,
            temperature: 32,
            humidity: 80
        };

        // Random weather changes
        setInterval(() => {
            const types = ['clear', 'rain', 'thunderstorm', 'haze'];
            weather.type = types[Math.floor(Math.random() * types.length)];
            weather.intensity = Math.random();
            
            if (weather.type === 'haze') {
                weather.temperature = 34;
                this.game.showNotification('Weather', 'Haze warning issued');
            } else if (weather.type === 'thunderstorm') {
                weather.temperature = 28;
                this.game.showNotification('Weather', 'Thunderstorm alert');
            }
        }, 300000); // Every 5 minutes

        return weather;
    }

    // HDB block creation
    createHDBBlock(position, blockId) {
        const block = {
            id: blockId,
            position: position.clone(),
            floors: 10 + Math.floor(Math.random() * 20),
            units: 0,
            residents: []
        };

        // Create HDB building
        const height = block.floors * 3;
        const buildingGeo = new THREE.BoxGeometry(15, height, 20);
        const buildingMat = new THREE.MeshStandardMaterial({ 
            color: 0x808080, 
            roughness: 0.9, 
            metalness: 0.0 
        });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.copy(position);
        building.position.y += height / 2;
        building.castShadow = true;
        building.receiveShadow = true;
        this.game.scene.add(building);
        block.building = building;

        // Create void deck
        this.createVoidDeck(position, blockId);

        this.hdbBlocks.push(block);
        return block;
    }

    // Police procedures (SPF)
    createPoliceProcedure(offenseType) {
        const procedures = {
            'littering': { response: 'warning', fine: 1000, caning: false },
            'smoking-hdb': { response: 'fine', fine: 1000, caning: false },
            'vandalism': { response: 'arrest', fine: 2000, caning: true },
            'theft': { response: 'arrest', fine: 0, caning: false },
            'assault': { response: 'arrest', fine: 0, caning: false },
            'murder': { response: 'arrest', fine: 0, caning: false },
            'drug-dealing': { response: 'arrest', fine: 0, caning: false },
            'illegal-gambling': { response: 'raid', fine: 5000, caning: false }
        };

        return procedures[offenseType] || { response: 'warning', fine: 500, caning: false };
    }

    // Singapore-specific: Caning punishment
    applyCaning(target, strokes) {
        if (!target) return;

        this.game.showNotification('Punishment', target.name + ' sentenced to ' + strokes + ' strokes of caning');

        // Apply damage
        if (target.health) {
            target.health = Math.max(0, target.health - strokes * 10);
        }

        // Gore effect
        if (this.game.goreSystem) {
            for (let i = 0; i < strokes; i++) {
                this.game.goreSystem.createMeleeGore(target.position, 'bat');
            }
        }
    }

    update(delta) {
        // Update void deck events
        for (let i = this.voidDeckEvents.length - 1; i >= 0; i--) {
            const event = this.voidDeckEvents[i];
            if (Date.now() - event.startTime > event.duration * 1000) {
                this.voidDeckEvents.splice(i, 1);
            }
        }
    }

    destroy() {
        this.voidDecks = [];
        this.hdbBlocks = [];
        this.voidDeckEvents = [];
    }
}

if (typeof window !== 'undefined') {
    window.SingaporeCultureSystem = SingaporeCultureSystem;
}