import * as THREE from 'three';
/**
 * Singapore Nightlife System
 * Clubs, bars, drinking culture
 */

export class SingaporeNightlifeSystem {
    constructor(game) {
        this.game = game;
        this.venues = [];
        this.drinkingCulture = {
            'zouk': { name: 'Zouk', type: 'club', entry: 30, drinks: { beer: 15, cocktail: 20, bottle: 200 } },
            'clarke-quay': { name: 'Clarke Quay', type: 'bar', entry: 0, drinks: { beer: 12, cocktail: 18, bottle: 150 } },
            'marina-bay-sands': { name: 'Marina Bay Sands', type: 'rooftop', entry: 50, drinks: { beer: 25, cocktail: 35, bottle: 500 } },
            'orchard-towers': { name: 'Orchard Towers', type: 'nightclub', entry: 20, drinks: { beer: 10, cocktail: 15, bottle: 100 } },
            'geylang': { name: 'Geylang', type: 'red-light', entry: 0, drinks: { beer: 8, cocktail: 12, bottle: 80 } }
        };
    }

    createVenue(type, position) {
        const venueData = this.drinkingCulture[type];
        if (!venueData) return null;

        const venue = {
            type: type,
            name: venueData.name,
            venueType: venueData.type,
            position: position.clone(),
            entry: venueData.entry,
            drinks: venueData.drinks,
            patrons: [],
            active: true
        };

        // Create visual
        const venueGeo = new THREE.BoxGeometry(20, 8, 25);
        const venueMat = new THREE.MeshStandardMaterial({ 
            color: 0x4B0082,
            roughness: 0.5,
            metalness: 0.3,
            envMapIntensity: 1.5
        });
        const mesh = new THREE.Mesh(venueGeo, venueMat);
        mesh.position.copy(position);
        mesh.position.y += 4;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        venue.mesh = mesh;

        // Add neon sign
        const signGeo = new THREE.PlaneGeometry(10, 3);
        const signMat = new THREE.MeshStandardMaterial({ 
            color: 0xFF00FF,
            emissive: 0xFF00FF,
            roughness: 0.9,
            metalness: 0.0,
            transparent: true,
            opacity: 0.8,
            envMapIntensity: 1.0
        });
        const sign = new THREE.Mesh(signGeo, signMat);
        sign.position.copy(position);
        sign.position.y += 6;
        sign.position.z += 13;
        sign.castShadow = true;
        sign.receiveShadow = true;
        this.game.scene.add(sign);

        this.venues.push(venue);
        return venue;
    }

    enterVenue(venue) {
        if (!venue) return false;

        // Pay entry fee
        if (this.game.player) {
            this.game.player.money = (this.game.player.money || 0) - venue.entry;
            this.game.showNotification('Nightlife', 'Entered ' + venue.name + ' - $' + venue.entry);
        }

        return true;
    }

    buyDrink(venue, drinkType) {
        if (!venue || !venue.drinks[drinkType]) return false;

        const price = venue.drinks[drinkType];
        if (this.game.player) {
            this.game.player.money = (this.game.player.money || 0) - price;
            this.game.showNotification('Drink', drinkType + ' - $' + price);

            // Apply drink effects
            this.applyDrinkEffect(drinkType);
        }

        return true;
    }

    applyDrinkEffect(drinkType) {
        if (!this.game.player) return;

        const effects = {
            'beer': { stamina: 10, coordination: -0.1 },
            'cocktail': { stamina: 15, coordination: -0.2 },
            'bottle': { stamina: 5, coordination: -0.5 }
        };

        const effect = effects[drinkType];
        if (effect) {
            this.game.player.stamina = Math.min(100, (this.game.player.stamina || 0) + effect.stamina);
            this.game.player.coordination = (this.game.player.coordination || 1) + effect.coordination;
        }
    }

    // Drunk driving effects
    applyDrunkDriving() {
        if (!this.game.player) return;

        const coordination = this.game.player.coordination || 1;
        if (coordination < 0.8) {
            // Impaired driving
            this.game.showNotification('Warning', 'You are too drunk to drive!');
            return false;
        }
        return true;
    }

    update(delta) {}

    destroy() {
        this.venues = [];
    }
}

if (typeof window !== 'undefined') {
    window.SingaporeNightlifeSystem = SingaporeNightlifeSystem;
}