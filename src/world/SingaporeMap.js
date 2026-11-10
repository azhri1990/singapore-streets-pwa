import * as THREE from 'three';
/**
 * Complete Singapore Map System
 * All roads, areas, landmarks, and navigation
 */

export const SingaporeMapData = {
    // Map dimensions (scaled for game)
    mapSize: { width: 1000, height: 1000 },
    scale: 10, // 1 game unit = 10 meters
    
    // Major Expressways
    expressways: [
        { name: 'PIE', fullName: 'Pan Island Expressway', color: 0xFF8C00, lanes: 4, speed: 90, path: [[-400, 0], [400, 0]] },
        { name: 'ECP', fullName: 'East Coast Parkway', color: 0xFF8C00, lanes: 4, speed: 90, path: [[-400, 200], [400, 200]] },
        { name: 'CTE', fullName: 'Central Expressway', color: 0xFF8C00, lanes: 3, speed: 90, path: [[0, -400], [0, 400]] },
        { name: 'AYE', fullName: 'Ayer Rajah Expressway', color: 0xFF8C00, lanes: 4, speed: 90, path: [[-400, -100], [400, -100]] },
        { name: 'BKE', fullName: 'Bukit Timah Expressway', color: 0xFF8C00, lanes: 3, speed: 90, path: [[-200, -300], [200, -300]] },
        { name: 'SLE', fullName: 'Seletar Expressway', color: 0xFF8C00, lanes: 3, speed: 90, path: [[-100, -200], [100, -200]] },
        { name: 'TPE', fullName: 'Tampines Expressway', color: 0xFF8C00, lanes: 3, speed: 90, path: [[200, -200], [200, 200]] },
        { name: 'KJE', fullName: 'Kranji Expressway', color: 0xFF8C00, lanes: 2, speed: 90, path: [[-300, -200], [-300, 200]] }
    ],
    
    // Major Roads
    majorRoads: [
        { name: 'Orchard Road', color: 0x808080, lanes: 4, speed: 50, erp: true, path: [[-100, -50], [100, -50]] },
        { name: 'Bras Basah Road', color: 0x808080, lanes: 3, speed: 50, erp: false, path: [[-50, -30], [50, -30]] },
        { name: 'Victoria Street', color: 0x808080, lanes: 3, speed: 50, erp: false, path: [[-50, -20], [50, -20]] },
        { name: 'North Bridge Road', color: 0x808080, lanes: 3, speed: 50, erp: false, path: [[-50, 0], [50, 0]] },
        { name: 'South Bridge Road', color: 0x808080, lanes: 3, speed: 50, erp: false, path: [[-50, 10], [50, 10]] },
        { name: 'Eu Tong Sen Street', color: 0x808080, lanes: 3, speed: 50, erp: false, path: [[-50, 20], [50, 20]] },
        { name: 'New Bridge Road', color: 0x808080, lanes: 3, speed: 50, erp: false, path: [[-50, 30], [50, 30]] },
        { name: 'Upper Cross Street', color: 0x808080, lanes: 2, speed: 50, erp: false, path: [[-50, 40], [50, 40]] }
    ],
    
    // Areas/Districts
    districts: [
        { name: 'Marina Bay', x: 0, z: 50, radius: 100, type: 'cbd', color: 0x1a1a2e },
        { name: 'Orchard', x: -50, z: -50, radius: 80, type: 'shopping', color: 0x2a2a3e },
        { name: 'Chinatown', x: -30, z: 20, radius: 60, type: 'cultural', color: 0x3a2a2e },
        { name: 'Little India', x: -20, z: 0, radius: 50, type: 'cultural', color: 0x2a3a2e },
        { name: 'Kampong Glam', x: -10, z: 10, radius: 40, type: 'cultural', color: 0x3a3a2e },
        { name: 'Raffles Place', x: 0, z: 30, radius: 50, type: 'cbd', color: 0x1a1a2e },
        { name: 'Clarke Quay', x: -20, z: 30, radius: 40, type: 'nightlife', color: 0x2a1a3e },
        { name: 'Boat Quay', x: -10, z: 40, radius: 30, type: 'nightlife', color: 0x2a1a3e },
        { name: 'Sentosa', x: 0, z: 150, radius: 80, type: 'resort', color: 0x2e4a2e },
        { name: 'Changi', x: 200, z: 0, radius: 100, type: 'airport', color: 0x3a3a3a },
        { name: 'Jurong', x: -200, z: -100, radius: 100, type: 'industrial', color: 0x3a3a2a },
        { name: 'Woodlands', x: -100, z: -200, radius: 80, type: 'residential', color: 0x2a3a2a },
        { name: 'Tampines', x: 150, z: -50, radius: 80, type: 'residential', color: 0x2a3a2a },
        { name: 'Bedok', x: 150, z: 0, radius: 80, type: 'residential', color: 0x2a3a2a },
        { name: 'Toa Payoh', x: -50, z: -100, radius: 70, type: 'residential', color: 0x2a3a2a },
        { name: 'Ang Mo Kio', x: -80, z: -120, radius: 70, type: 'residential', color: 0x2a3a2a },
        { name: 'Bishan', x: -60, z: -80, radius: 50, type: 'residential', color: 0x2a3a2a },
        { name: 'Clementi', x: -150, z: -50, radius: 60, type: 'residential', color: 0x2a3a2a },
        { name: 'Bukit Batok', x: -180, z: -80, radius: 50, type: 'residential', color: 0x2a3a2a },
        { name: 'Yishun', x: -80, z: -180, radius: 70, type: 'residential', color: 0x2a3a2a },
        { name: 'Sembawang', x: -100, z: -220, radius: 50, type: 'residential', color: 0x2a3a2a },
        { name: 'Punggol', x: 120, z: -150, radius: 70, type: 'residential', color: 0x2a3a2a },
        { name: 'Sengkang', x: 100, z: -120, radius: 60, type: 'residential', color: 0x2a3a2a },
        { name: 'Hougang', x: 80, z: -80, radius: 60, type: 'residential', color: 0x2a3a2a },
        { name: 'Serangoon', x: 60, z: -60, radius: 50, type: 'residential', color: 0x2a3a2a },
        { name: 'Kallang', x: 30, z: -20, radius: 50, type: 'residential', color: 0x2a3a2a },
        { name: 'Geylang', x: 40, z: -10, radius: 50, type: 'red_light', color: 0x3a2a2a },
        { name: 'Katong', x: 100, z: 20, radius: 50, type: 'cultural', color: 0x3a3a2a },
        { name: 'East Coast', x: 120, z: 40, radius: 80, type: 'park', color: 0x2e4a2e },
        { name: 'West Coast', x: -180, z: 0, radius: 60, type: 'park', color: 0x2e4a2e },
        { name: 'Botanic Gardens', x: -70, z: -40, radius: 40, type: 'park', color: 0x2e4a2e },
        { name: 'MacRitchie', x: -60, z: -60, radius: 50, type: 'park', color: 0x2e4a2e }
    ],
    
    // ERP Gantries
    erpGantries: [
        { name: 'Orchard', x: -50, z: -50, rate: 3.0, peak: true },
        { name: 'CBD', x: 0, z: 30, rate: 2.5, peak: true },
        { name: 'CTE', x: 0, z: 0, rate: 2.0, peak: true },
        { name: 'AYE', x: -100, z: -100, rate: 1.5, peak: false },
        { name: 'PIE', x: 200, z: 0, rate: 1.0, peak: false }
    ],
    
    // MRT Stations
    mrtStations: [
        { name: 'Marina Bay', line: 'NSL', x: 0, z: 50 },
        { name: 'Raffles Place', line: 'NSL/EWL', x: 0, z: 30 },
        { name: 'City Hall', line: 'NSL/EWL', x: -10, z: 25 },
        { name: 'Orchard', line: 'NSL', x: -50, z: -50 },
        { name: 'Somerset', line: 'NSL', x: -45, z: -45 },
        { name: 'Dhoby Ghaut', line: 'NSL/CCL/NEL', x: -30, z: -20 },
        { name: 'Little India', line: 'NEL/DTL', x: -20, z: 0 },
        { name: 'Farrer Park', line: 'NEL', x: -15, z: 5 },
        { name: 'Chinatown', line: 'NEL/DTL', x: -30, z: 20 },
        { name: 'Outram Park', line: 'EWL/NEL', x: -25, z: 25 },
        { name: 'Tiong Bahru', line: 'EWL', x: -40, z: 30 },
        { name: 'Redhill', line: 'EWL', x: -50, z: 35 },
        { name: 'Queenstown', line: 'EWL', x: -60, z: 35 },
        { name: 'Commonwealth', line: 'EWL', x: -70, z: 35 },
        { name: 'Buona Vista', line: 'EWL/CCL', x: -80, z: 30 },
        { name: 'Clementi', line: 'EWL', x: -150, z: -50 },
        { name: 'Jurong East', line: 'EWL/NSL', x: -200, z: -100 },
        { name: 'Woodlands', line: 'NSL', x: -100, z: -200 },
        { name: 'Yishun', line: 'NSL', x: -80, z: -180 },
        { name: 'Sembawang', line: 'NSL', x: -100, z: -220 },
        { name: 'Admiralty', line: 'NSL', x: -95, z: -210 },
        { name: 'Tampines', line: 'EWL/DTL', x: 150, z: -50 },
        { name: 'Pasir Ris', line: 'EWL', x: 180, z: -40 },
        { name: 'Bedok', line: 'EWL', x: 150, z: 0 },
        { name: 'Kembangan', line: 'EWL', x: 140, z: 5 },
        { name: 'Eunos', line: 'EWL', x: 120, z: 10 },
        { name: 'Paya Lebar', line: 'EWL/CCL', x: 100, z: 15 },
        { name: 'Aljunied', line: 'EWL', x: 90, z: 18 },
        { name: 'Kallang', line: 'EWL', x: 70, z: 20 },
        { name: 'Lavender', line: 'EWL', x: 60, z: 22 },
        { name: 'Bugis', line: 'EWL/DTL', x: 50, z: 25 },
        { name: 'Promenade', line: 'CCL/DTL', x: 10, z: 40 },
        { name: 'Bayfront', line: 'CCL/DTL', x: 5, z: 50 },
        { name: 'Marina South Pier', line: 'NSL', x: 0, z: 60 }
    ],
    
    // Bus Interchanges
    busInterchanges: [
        { name: 'Ang Mo Kio', x: -80, z: -120 },
        { name: 'Bedok', x: 150, z: 0 },
        { name: 'Boon Lay', x: -200, z: -80 },
        { name: 'Clementi', x: -150, z: -50 },
        { name: 'Hougang', x: 80, z: -80 },
        { name: 'Jurong East', x: -200, z: -100 },
        { name: 'Pasir Ris', x: 180, z: -40 },
        { name: 'Sengkang', x: 100, z: -120 },
        { name: 'Serangoon', x: 60, z: -60 },
        { name: 'Tampines', x: 150, z: -50 },
        { name: 'Toa Payoh', x: -50, z: -100 },
        { name: 'Woodlands', x: -100, z: -200 },
        { name: 'Yishun', x: -80, z: -180 }
    ],
    
    // Hawker Centres
    hawkerCentres: [
        { name: 'Maxwell Food Centre', x: -30, z: 20 },
        { name: 'Lau Pa Sat', x: 0, z: 30 },
        { name: 'Newton Food Centre', x: -45, z: -45 },
        { name: 'Old Airport Road', x: 80, z: -20 },
        { name: 'Tekka Centre', x: -20, z: 0 },
        { name: 'Chinatown Complex', x: -30, z: 20 },
        { name: 'Tiong Bahru Market', x: -40, z: 30 },
        { name: 'Zion Riverside', x: -20, z: 35 },
        { name: 'East Coast Lagoon', x: 120, z: 40 },
        { name: 'Chomp Chomp', x: 80, z: -60 },
        { name: 'Bedok 85', x: 150, z: 0 },
        { name: 'Tampines Round Market', x: 150, z: -50 }
    ],
    
    // Shopping Malls
    shoppingMalls: [
        { name: 'ION Orchard', x: -50, z: -50 },
        { name: 'Ngee Ann City', x: -48, z: -48 },
        { name: 'Paragon', x: -52, z: -52 },
        { name: 'Takashimaya', x: -46, z: -46 },
        { name: 'VivoCity', x: -5, z: 55 },
        { name: 'Marina Bay Sands', x: 0, z: 50 },
        { name: 'Mustafa Centre', x: -20, z: 0 },
        { name: 'Jurong Point', x: -200, z: -100 },
        { name: 'Causeway Point', x: -100, z: -200 },
        { name: 'Tampines Mall', x: 150, z: -50 },
        { name: 'Bedok Mall', x: 150, z: 0 },
        { name: 'AMK Hub', x: -80, z: -120 },
        { name: 'Junction 8', x: -60, z: -80 },
        { name: 'Nex', x: 60, z: -60 }
    ],
    
    // Parks
    parks: [
        { name: 'Gardens by the Bay', x: 0, z: 60 },
        { name: 'East Coast Park', x: 120, z: 40 },
        { name: 'Botanic Gardens', x: -70, z: -40 },
        { name: 'MacRitchie Reservoir', x: -60, z: -60 },
        { name: 'Bishan-Ang Mo Kio Park', x: -70, z: -100 },
        { name: 'Jurong Lake Gardens', x: -200, z: -90 },
        { name: 'West Coast Park', x: -180, z: 0 },
        { name: 'Pasir Ris Park', x: 180, z: -30 },
        { name: 'Sentosa', x: 0, z: 150 }
    ],
    
    // Schools (famous ones)
    schools: [
        { name: 'Raffles Institution', x: -60, z: -80 },
        { name: 'Hwa Chong Institution', x: -70, z: -90 },
        { name: 'Nanyang Girls High', x: -75, z: -85 },
        { name: 'Victoria School', x: 100, z: 10 },
        { name: 'Anglo-Chinese School', x: -50, z: -40 }
    ],
    
    // Hospitals
    hospitals: [
        { name: 'Singapore General Hospital', x: -20, z: 25 },
        { name: 'Tan Tock Seng Hospital', x: -30, z: -20 },
        { name: 'National University Hospital', x: -80, z: 30 },
        { name: 'Changi General Hospital', x: 150, z: 0 },
        { name: 'Khoo Teck Puat Hospital', x: -80, z: -180 },
        { name: 'Ng Teng Fong General Hospital', x: -200, z: -100 }
    ]
};

// 3rd Person Camera System
export class ThirdPersonCamera {
    constructor(camera, target) {
        this.camera = camera;
        this.target = target;
        this.distance = 8;
        this.height = 3;
        this.angle = 0;
        this.pitch = 0.3;
        this.smoothing = 0.1;
        this.minDistance = 3;
        this.maxDistance = 20;
    }
    
    update(delta) {
        if (!this.target) return;
        
        // Calculate camera position behind target
        const targetPos = this.target.position.clone();
        targetPos.y += this.height;
        
        const offset = new THREE.Vector3(
            Math.sin(this.angle) * this.distance,
            this.height + Math.sin(this.pitch) * this.distance,
            Math.cos(this.angle) * this.distance
        );
        
        const desiredPos = targetPos.clone().add(offset);
        
        // Smooth camera movement
        this.camera.position.lerp(desiredPos, this.smoothing);
        this.camera.lookAt(targetPos);
    }
    
    rotate(deltaX, deltaY) {
        this.angle -= deltaX * 0.005;
        this.pitch = Math.max(-0.5, Math.min(0.8, this.pitch + deltaY * 0.005));
    }
    
    zoom(delta) {
        this.distance = Math.max(this.minDistance, Math.min(this.maxDistance, this.distance + delta));
    }
}

// Map navigation
export function findNearestLocation(x, z) {
    let nearest = null;
    let minDist = Infinity;
    
    for (const district of SingaporeMapData.districts) {
        const dist = Math.sqrt((district.x - x) ** 2 + (district.z - z) ** 2);
        if (dist < minDist) {
            minDist = dist;
            nearest = district;
        }
    }
    
    return nearest;
}

export function getRoadAt(x, z) {
    for (const road of [...SingaporeMapData.expressways, ...SingaporeMapData.majorRoads]) {
        // Check if point is near road
        for (let i = 0; i < road.path.length - 1; i++) {
            const [x1, z1] = road.path[i];
            const [x2, z2] = road.path[i + 1];
            const dist = pointToLineDistance(x, z, x1, z1, x2, z2);
            if (dist < 5) {
                return road;
            }
        }
    }
    return null;
}

function pointToLineDistance(px, pz, x1, z1, x2, z2) {
    const A = px - x1;
    const B = pz - z1;
    const C = x2 - x1;
    const D = z2 - z1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;
    
    let xx, zz;
    
    if (param < 0) {
        xx = x1;
        zz = z1;
    } else if (param > 1) {
        xx = x2;
        zz = z2;
    } else {
        xx = x1 + param * C;
        zz = z1 + param * D;
    }
    
    const dx = px - xx;
    const dz = pz - zz;
    return Math.sqrt(dx * dx + dz * dz);
}

export function getERPAt(x, z) {
    for (const erp of SingaporeMapData.erpGantries) {
        const dist = Math.sqrt((erp.x - x) ** 2 + (erp.z - z) ** 2);
        if (dist < 10) {
            return erp;
        }
    }
    return null;
}

export function getNearestMRT(x, z) {
    let nearest = null;
    let minDist = Infinity;
    
    for (const station of SingaporeMapData.mrtStations) {
        const dist = Math.sqrt((station.x - x) ** 2 + (station.z - z) ** 2);
        if (dist < minDist) {
            minDist = dist;
            nearest = station;
        }
    }
    
    return nearest;
}
