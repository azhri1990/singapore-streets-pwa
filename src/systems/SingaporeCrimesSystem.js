import * as THREE from 'three';
/**
 * Singapore Crimes System
 * Singapore-specific crimes and illegal activities
 */

export class SingaporeCrimesSystem {
    constructor(game) {
        this.game = game;
        this.activeCrimes = [];
        this.crimeTypes = {
            'illegal-gambling': { fine: 5000, heat: 2, reportChance: 0.6 },
            'loan-sharking': { fine: 10000, heat: 3, reportChance: 0.4 },
            'drug-dealing': { fine: 20000, heat: 4, reportChance: 0.7 },
            'prostitution': { fine: 3000, heat: 1, reportChance: 0.5 },
            'illegal-racing': { fine: 5000, heat: 3, reportChance: 0.8 },
            'vandalism-hdb': { fine: 2000, heat: 1, reportChance: 0.6 },
            'theft-bicycle': { fine: 1000, heat: 1, reportChance: 0.5 },
            'scam-call': { fine: 15000, heat: 2, reportChance: 0.3 },
            'money-laundering': { fine: 50000, heat: 5, reportChance: 0.2 },
            'smuggling': { fine: 30000, heat: 4, reportChance: 0.5 }
        };
    }

    commitCrime(crimeType, position, perpetrator) {
        const data = this.crimeTypes[crimeType];
        if (!data) return null;

        const crime = {
            type: crimeType,
            position: position.clone(),
            perpetrator: perpetrator,
            time: Date.now(),
            reported: false,
            heat: data.heat
        };

        // Add heat
        if (this.game.singaporeRealism) {
            this.game.singaporeRealism.addHeat(data.heat);
        }

        // Report chance
        if (Math.random() < data.reportChance) {
            crime.reported = true;
            this.reportCrime(crime);
        }

        this.activeCrimes.push(crime);
        return crime;
    }

    reportCrime(crime) {
        const data = this.crimeTypes[crime.type];
        this.game.showNotification('Crime Reported', crime.type.replace('-', ' ').toUpperCase());

        // Spawn police
        if (this.game.aiTrafficSystem) {
            this.game.aiTrafficSystem.spawnPolice(crime.position);
        }
    }

    // Illegal gambling den
    createGamblingDen(position) {
        const den = {
            position: position.clone(),
            type: 'gambling',
            active: true,
            patrons: []
        };

        // Create visual
        const denGeo = new THREE.BoxGeometry(10, 4, 12);
        const denMat = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, 
            roughness: 0.8, 
            metalness: 0.2,
            envMapIntensity: 1.0 
        });
        const mesh = new THREE.Mesh(denGeo, denMat);
        mesh.position.copy(position);
        mesh.position.y += 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        den.mesh = mesh;

        return den;
    }

    // Loan shark harassment
    harassVictim(victim, amount) {
        const harassment = {
            victim: victim,
            amount: amount,
            active: true,
            time: Date.now()
        };

        // Show warning
        this.game.showNotification('Loan Shark', 'Pay up or else...');

        // Add heat
        if (this.game.singaporeRealism) {
            this.game.singaporeRealism.addHeat(1);
        }

        return harassment;
    }

    // Drug dealing
    dealDrugs(position, buyer) {
        const deal = {
            position: position.clone(),
            buyer: buyer,
            time: Date.now(),
            reported: false
        };

        // Report chance
        if (Math.random() < 0.7) {
            deal.reported = true;
            this.reportCrime({ type: 'drug-dealing', position: position, heat: 4 });
        }

        return deal;
    }

    // Illegal racing
    startIllegalRace(startPos, endPos, participants) {
        const race = {
            start: startPos.clone(),
            end: endPos.clone(),
            participants: participants || [],
            active: true,
            startTime: Date.now()
        };

        this.game.showNotification('Illegal Race', 'Race started!');

        // High report chance
        if (Math.random() < 0.8) {
            this.reportCrime({ type: 'illegal-racing', position: startPos, heat: 3 });
        }

        return race;
    }

    // Scam call center
    createScamCenter(position) {
        const center = {
            position: position.clone(),
            type: 'scam',
            active: true,
            callers: []
        };

        // Create visual
        const centerGeo = new THREE.BoxGeometry(15, 5, 20);
        const centerMat = new THREE.MeshStandardMaterial({ 
            color: 0x4169E1, 
            roughness: 0.7, 
            metalness: 0.3,
            envMapIntensity: 1.5 
        });
        const mesh = new THREE.Mesh(centerGeo, centerMat);
        mesh.position.copy(position);
        mesh.position.y += 2.5;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        center.mesh = mesh;

        return center;
    }

    update(delta) {
        // Update active crimes
        for (let i = this.activeCrimes.length - 1; i >= 0; i--) {
            const crime = this.activeCrimes[i];
            // Crimes expire after 5 minutes
            if (Date.now() - crime.time > 300000) {
                this.activeCrimes.splice(i, 1);
            }
        }
    }

    destroy() {
        this.activeCrimes = [];
    }
}

if (typeof window !== 'undefined') {
    window.SingaporeCrimesSystem = SingaporeCrimesSystem;
}