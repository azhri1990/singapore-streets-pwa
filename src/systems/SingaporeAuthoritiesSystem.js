import * as THREE from 'three';
/**
 * Singapore Authorities System
 * Real Singapore law enforcement, procedures, protocols, policies
 */

export class SingaporeAuthoritiesSystem {
    constructor(game) {
        this.game = game;
        this.authorities = {
            spf: { name: 'Singapore Police Force', responseTime: 5, jurisdiction: 'crime' },
            cnb: { name: 'Central Narcotics Bureau', responseTime: 3, jurisdiction: 'drugs' },
            ica: { name: 'Immigration & Checkpoints Authority', responseTime: 2, jurisdiction: 'border' },
            scdf: { name: 'Singapore Civil Defence Force', responseTime: 8, jurisdiction: 'fire/medical' },
            lta: { name: 'Land Transport Authority', responseTime: 10, jurisdiction: 'traffic' },
            nea: { name: 'National Environment Agency', responseTime: 15, jurisdiction: 'environment' },
            hdb: { name: 'Housing & Development Board', responseTime: 30, jurisdiction: 'housing' },
            cpib: { name: 'Corrupt Practices Investigation Bureau', responseTime: 60, jurisdiction: 'corruption' },
            isd: { name: 'Internal Security Department', responseTime: 1, jurisdiction: 'security' }
        };
        this.activeResponses = [];
        this.cctvCameras = [];
        this.investigations = [];
        this.courtCases = [];
    }

    // SPF Response Procedures
    spfResponse(crimeType, position, severity) {
        const procedure = {
            'theft': { officers: 2, vehicles: 1, helicopter: false, urgency: 'medium' },
            'assault': { officers: 4, vehicles: 2, helicopter: false, urgency: 'high' },
            'murder': { officers: 8, vehicles: 4, helicopter: true, urgency: 'critical' },
            'drug-dealing': { officers: 6, vehicles: 3, helicopter: false, urgency: 'high', special: 'cnb' },
            'armed-robbery': { officers: 10, vehicles: 5, helicopter: true, urgency: 'critical' },
            'terrorism': { officers: 20, vehicles: 10, helicopter: true, urgency: 'critical', special: 'isd' }
        };

        const proc = procedure[crimeType] || { officers: 2, vehicles: 1, helicopter: false, urgency: 'low' };

        const response = {
            authority: 'spf',
            crimeType: crimeType,
            position: position.clone(),
            severity: severity || 'medium',
            officers: proc.officers,
            vehicles: proc.vehicles,
            helicopter: proc.helicopter,
            urgency: proc.urgency,
            special: proc.special,
            startTime: Date.now(),
            status: 'responding'
        };

        this.activeResponses.push(response);

        // Spawn officers
        if (this.game.aiTrafficSystem) {
            for (let i = 0; i < proc.vehicles; i++) {
                this.game.aiTrafficSystem.spawnPolice(position);
            }
        }

        // Helicopter for critical
        if (proc.helicopter) {
            this.spawnHelicopter(position);
        }

        // Special units
        if (proc.special === 'cnb') {
            this.cnbResponse(position, crimeType);
        }
        if (proc.special === 'isd') {
            this.isdResponse(position, crimeType);
        }

        this.game.showNotification('SPF Response', proc.officers + ' officers, ' + proc.vehicles + ' vehicles responding');

        return response;
    }

    // CNB Response (Drugs)
    cnbResponse(position, crimeType) {
        const response = {
            authority: 'cnb',
            crimeType: crimeType,
            position: position.clone(),
            officers: 4,
            special: 'drug-raid',
            startTime: Date.now(),
            status: 'responding'
        };

        this.activeResponses.push(response);
        this.game.showNotification('CNB', 'Central Narcotics Bureau responding');

        // Death penalty warning for trafficking
        if (crimeType === 'drug-dealing') {
            this.game.showNotification('Warning', 'Drug trafficking carries death penalty in Singapore');
        }

        return response;
    }

    // SCDF Response (Fire/Medical)
    scdfResponse(position, type) {
        const response = {
            authority: 'scdf',
            type: type, // 'fire', 'medical', 'rescue'
            position: position.clone(),
            startTime: Date.now(),
            status: 'responding'
        };

        this.activeResponses.push(response);
        this.game.showNotification('SCDF', 'Singapore Civil Defence Force responding');

        return response;
    }

    // ICA Response (Border)
    icaResponse(position) {
        const response = {
            authority: 'ica',
            type: 'border-check',
            position: position.clone(),
            startTime: Date.now(),
            status: 'responding'
        };

        this.activeResponses.push(response);
        this.game.showNotification('ICA', 'Immigration checkpoint activated');

        return response;
    }

    // LTA Response (Traffic)
    ltaResponse(position, violation) {
        const response = {
            authority: 'lta',
            type: 'traffic',
            violation: violation,
            position: position.clone(),
            fine: this.getTrafficFine(violation),
            startTime: Date.now(),
            status: 'responding'
        };

        this.activeResponses.push(response);
        this.game.showNotification('LTA', 'Traffic violation: ' + violation);

        return response;
    }

    getTrafficFine(violation) {
        const fines = {
            'speeding': 200,
            'red-light': 400,
            'illegal-parking': 100,
            'erp-evasion': 500,
            'seatbelt': 120,
            'phone-driving': 1000
        };
        return fines[violation] || 200;
    }

    // NEA Response (Environment)
    neaResponse(position, violation) {
        const response = {
            authority: 'nea',
            type: 'environment',
            violation: violation,
            position: position.clone(),
            fine: this.getEnvironmentFine(violation),
            startTime: Date.now(),
            status: 'responding'
        };

        this.activeResponses.push(response);
        this.game.showNotification('NEA', 'Environmental violation: ' + violation);

        return response;
    }

    getEnvironmentFine(violation) {
        const fines = {
            'littering': 1000,
            'smoking': 1000,
            'spitting': 1000,
            'graffiti': 2000,
            'illegal-dumping': 5000
        };
        return fines[violation] || 500;
    }

    // CCTV Surveillance System
    createCCTV(position, coverage) {
        const camera = {
            position: position.clone(),
            coverage: coverage || 50,
            active: true,
            lastDetection: null
        };

        // Create visual
        const camGeo = new THREE.BoxGeometry(0.5, 0.3, 0.3);
        const camMat = new THREE.MeshStandardMaterial({ 
            color: 0x333333, 
            roughness: 0.8, 
            metalness: 0.2 
        });
        const mesh = new THREE.Mesh(camGeo, camMat);
        mesh.position.copy(position);
        mesh.position.y += 3;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.game.scene.add(mesh);
        camera.mesh = mesh;

        this.cctvCameras.push(camera);
        return camera;
    }

    // Check if position is under CCTV
    isUnderCCTV(position) {
        for (const cam of this.cctvCameras) {
            if (!cam.active) continue;
            const dist = position.distanceTo(cam.position);
            if (dist < cam.coverage) {
                return cam;
            }
        }
        return null;
    }

    // CCTV detection
    checkCCTVDetection(position, criminal) {
        const cam = this.isUnderCCTV(position);
        if (cam) {
            cam.lastDetection = Date.now();
            this.reportToAuthorities(criminal, 'cctv-detection', position);
            return true;
        }
        return false;
    }

    // Report to authorities
    reportToAuthorities(criminal, reportType, position) {
        const report = {
            criminal: criminal,
            type: reportType,
            position: position.clone(),
            time: Date.now(),
            reported: true
        };

        // Determine which authority
        let authority = 'spf';
        if (reportType === 'drug-dealing') authority = 'cnb';
        else if (reportType === 'traffic') authority = 'lta';
        else if (reportType === 'environment') authority = 'nea';

        this.game.showNotification('Reported', reportType.replace('-', ' ').toUpperCase());

        // Trigger response
        if (authority === 'spf') {
            this.spfResponse(reportType, position, 'high');
        }
    }

    // Investigation system
    startInvestigation(crime, suspect) {
        const investigation = {
            crime: crime,
            suspect: suspect,
            startTime: Date.now(),
            evidence: [],
            status: 'active',
            witnesses: []
        };

        this.investigations.push(investigation);
        return investigation;
    }

    // Court system
    fileCharges(suspect, charges) {
        const courtCase = {
            suspect: suspect,
            charges: charges,
            filingDate: Date.now(),
            status: 'pending',
            verdict: null,
            sentence: null
        };

        this.courtCases.push(courtCase);
        this.game.showNotification('Court', 'Charges filed against ' + suspect.name);

        return courtCase;
    }

    // Sentencing
    sentence(suspect, charges) {
        const sentences = {
            'theft': { fine: 2000, jail: 6, caning: 0 },
            'assault': { fine: 5000, jail: 12, caning: 3 },
            'murder': { fine: 0, jail: 0, caning: 0, death: true },
            'drug-trafficking': { fine: 0, jail: 0, caning: 0, death: true },
            'vandalism': { fine: 2000, jail: 0, caning: 3 },
            'robbery': { fine: 0, jail: 24, caning: 6 }
        };

        const sentence = sentences[charges[0]] || { fine: 1000, jail: 3, caning: 0 };

        if (sentence.death) {
            this.game.showNotification('Court', 'Death sentence imposed');
        } else if (sentence.caning > 0) {
            this.game.showNotification('Court', sentence.jail + ' months jail + ' + sentence.caning + ' strokes caning + $' + sentence.fine);
        } else {
            this.game.showNotification('Court', sentence.jail + ' months jail + $' + sentence.fine);
        }

        return sentence;
    }

    // Singapore attitudes and behaviors
    getSingaporeAttitude(situation) {
        const attitudes = {
            'kiasu': 'Afraid to lose - will queue, rush, compete',
            'kiasi': 'Afraid to die - cautious, law-abiding',
            'kiasu-taxi': 'Aggressive driving, rushing for fares',
            'queueing': 'Orderly, patient, disciplined',
            'choping': 'Reserving seats with tissue paper',
            'clean': 'No littering, strict NEA enforcement',
            'efficient': 'Fast government, minimal red tape',
            'multiracial': 'Harmonious, respectful of all races/religions'
        };
        return attitudes[situation] || 'Unknown';
    }

    // Spawn helicopter
    spawnHelicopter(position) {
        const heliGeo = new THREE.BoxGeometry(8, 3, 12);
        const heliMat = new THREE.MeshStandardMaterial({ 
            color: 0x333333, 
            roughness: 0.7, 
            metalness: 0.3 
        });
        const heli = new THREE.Mesh(heliGeo, heliMat);
        heli.position.copy(position);
        heli.position.y += 30;
        heli.castShadow = true;
        heli.receiveShadow = true;
        this.game.scene.add(heli);

        // Searchlight
        const light = new THREE.SpotLight(0xFFFFFF, 2, 100, Math.PI / 6);
        light.position.copy(heli.position);
        light.target.position.copy(position);
        this.game.scene.add(light);

        return heli;
    }

    update(delta) {
        // Update active responses
        for (let i = this.activeResponses.length - 1; i >= 0; i--) {
            const response = this.activeResponses[i];
            const elapsed = (Date.now() - response.startTime) / 1000;
            
            // Response complete after 5 minutes
            if (elapsed > 300) {
                response.status = 'completed';
                this.activeResponses.splice(i, 1);
            }
        }

        // Update investigations
        for (const inv of this.investigations) {
            if (inv.status === 'active') {
                // Collect evidence over time
                if (Math.random() < 0.01) {
                    inv.evidence.push('evidence_' + Date.now());
                }
            }
        }
    }

    destroy() {
        this.activeResponses = [];
        this.cctvCameras = [];
        this.investigations = [];
        this.courtCases = [];
    }
}

if (typeof window !== 'undefined') {
    window.SingaporeAuthoritiesSystem = SingaporeAuthoritiesSystem;
}