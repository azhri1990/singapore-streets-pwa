/**
 * Singapore Locations, Landmarks, and Areas
 * All based on real Singapore geography
 */

export const SingaporeAreas = {
    // Central
    'marina-bay': {
        name: 'Marina Bay',
        type: 'cbd',
        landmarks: ['Marina Bay Sands', 'Gardens by the Bay', 'ArtScience Museum', 'Merlion'],
        traffic: 'heavy',
        erp: true,
        description: 'Singapore\'s iconic waterfront CBD'
    },
    'orchard': {
        name: 'Orchard Road',
        type: 'shopping',
        landmarks: ['ION Orchard', 'Ngee Ann City', 'Paragon', 'Takashimaya'],
        traffic: 'very_heavy',
        erp: true,
        description: 'Singapore\'s premier shopping belt'
    },
    'raffles-place': {
        name: 'Raffles Place',
        type: 'cbd',
        landmarks: ['Raffles Place MRT', 'UOB Plaza', 'OCBC Centre'],
        traffic: 'heavy',
        erp: true,
        description: 'Financial district'
    },
    
    // Residential
    'toa-payoh': {
        name: 'Toa Payoh',
        type: 'hdb_estate',
        landmarks: ['Toa Payoh MRT', 'HDB Hub', 'Toa Payoh Stadium'],
        traffic: 'moderate',
        erp: false,
        description: 'First HDB new town'
    },
    'ang-mo-kio': {
        name: 'Ang Mo Kio',
        type: 'hdb_estate',
        landmarks: ['AMK Hub', 'Bishan-Ang Mo Kio Park'],
        traffic: 'moderate',
        erp: false,
        description: 'Large HDB estate'
    },
    'jurong': {
        name: 'Jurong',
        type: 'industrial',
        landmarks: ['Jurong Bird Park', 'Science Centre', 'Jurong Lake Gardens'],
        traffic: 'moderate',
        erp: false,
        description: 'Industrial and residential area'
    },
    'tampines': {
        name: 'Tampines',
        type: 'hdb_estate',
        landmarks: ['Tampines Mall', 'Our Tampines Hub'],
        traffic: 'moderate',
        erp: false,
        description: 'Eastern HDB town'
    },
    'woodlands': {
        name: 'Woodlands',
        type: 'hdb_estate',
        landmarks: ['Woodlands Checkpoint', 'Causeway Point'],
        traffic: 'heavy',
        erp: false,
        description: 'Northern town near Malaysia'
    },
    
    // Cultural
    'chinatown': {
        name: 'Chinatown',
        type: 'cultural',
        landmarks: ['Buddha Tooth Relic Temple', 'Chinatown Complex', 'Maxwell Food Centre'],
        traffic: 'heavy',
        erp: false,
        description: 'Chinese heritage district'
    },
    'little-india': {
        name: 'Little India',
        type: 'cultural',
        landmarks: ['Mustafa Centre', 'Tekka Centre', 'Sri Veeramakaliamman Temple'],
        traffic: 'heavy',
        erp: false,
        description: 'Indian heritage district'
    },
    'kampong-glam': {
        name: 'Kampong Glam',
        type: 'cultural',
        landmarks: ['Sultan Mosque', 'Haji Lane', 'Arab Street'],
        traffic: 'moderate',
        erp: false,
        description: 'Malay/Arab heritage district'
    },
    
    // Other
    'sentosa': {
        name: 'Sentosa',
        type: 'resort',
        landmarks: ['Universal Studios', 'S.E.A. Aquarium', 'Siloso Beach'],
        traffic: 'moderate',
        erp: false,
        description: 'Resort island'
    },
    'changi': {
        name: 'Changi',
        type: 'airport',
        landmarks: ['Changi Airport', 'Jewel Changi'],
        traffic: 'heavy',
        erp: false,
        description: 'International airport'
    },
    'punggol': {
        name: 'Punggol',
        type: 'hdb_estate',
        landmarks: ['Punggol Waterway Park', 'Coney Island'],
        traffic: 'light',
        erp: false,
        description: 'Newest HDB town'
    }
};

export const SingaporeLandmarks = [
    { name: 'Merlion', location: 'marina-bay', type: 'statue', description: 'Singapore icon' },
    { name: 'Marina Bay Sands', location: 'marina-bay', type: 'hotel', description: 'Iconic hotel with sky park' },
    { name: 'Gardens by the Bay', location: 'marina-bay', type: 'park', description: 'Supertrees and domes' },
    { name: 'Esplanade', location: 'marina-bay', type: 'theatre', description: 'Durian-shaped theatre' },
    { name: 'Singapore Flyer', location: 'marina-bay', type: 'observation', description: 'Giant observation wheel' },
    { name: 'Buddha Tooth Relic Temple', location: 'chinatown', type: 'temple', description: 'Buddhist temple' },
    { name: 'Sultan Mosque', location: 'kampong-glam', type: 'mosque', description: 'Historic mosque' },
    { name: 'Mustafa Centre', location: 'little-india', type: 'shopping', description: '24-hour shopping' },
    { name: 'Changi Airport', location: 'changi', type: 'airport', description: 'World\'s best airport' },
    { name: 'Universal Studios', location: 'sentosa', type: 'theme_park', description: 'Theme park' }
];

export const SingaporeRoads = {
    'expressways': [
        { name: 'PIE', fullName: 'Pan Island Expressway', lanes: 4, erp: false },
        { name: 'ECP', fullName: 'East Coast Parkway', lanes: 4, erp: false },
        { name: 'CTE', fullName: 'Central Expressway', lanes: 3, erp: true },
        { name: 'AYE', fullName: 'Ayer Rajah Expressway', lanes: 4, erp: false },
        { name: 'BKE', fullName: 'Bukit Timah Expressway', lanes: 3, erp: false },
        { name: 'SLE', fullName: 'Seletar Expressway', lanes: 3, erp: false },
        { name: 'TPE', fullName: 'Tampines Expressway', lanes: 3, erp: false },
        { name: 'KJE', fullName: 'Kranji Expressway', lanes: 2, erp: false }
    ],
    'arterial': [
        { name: 'Orchard Road', lanes: 4, erp: true },
        { name: 'Bras Basah Road', lanes: 3, erp: false },
        { name: 'Victoria Street', lanes: 3, erp: false },
        { name: 'North Bridge Road', lanes: 3, erp: false },
        { name: 'South Bridge Road', lanes: 3, erp: false }
    ]
};

export const SingaporeHawkerCentres = [
    { name: 'Maxwell Food Centre', location: 'chinatown', famous: 'Chicken Rice' },
    { name: 'Lau Pa Sat', location: 'cbd', famous: 'Satay' },
    { name: 'Newton Food Centre', location: 'orchard', famous: 'Seafood' },
    { name: 'Old Airport Road', location: 'kallang', famous: 'Char Kway Teow' },
    { name: 'Tekka Centre', location: 'little-india', famous: 'Indian food' },
    { name: 'Chinatown Complex', location: 'chinatown', famous: 'Various' },
    { name: 'Tiong Bahru Market', location: 'tiong-bahru', famous: 'Chwee Kueh' },
    { name: 'Zion Riverside', location: 'river-valley', famous: 'Char Kway Teow' }
];

export const SingaporeRadioStations = {
    '988': { name: '988 NOW', frequency: '988 FM', genre: 'English Hits', dj: 'The Morning Show' },
    '875': { name: 'FM87', frequency: '87.5 FM', genre: 'Mandarin Hits', dj: '早安你好' },
    '913': { name: 'One FM 91.3', frequency: '91.3 FM', genre: 'Malay Hits', dj: 'Pagi Di Radio' },
    '950': { name: 'Class 95', frequency: '95.0 FM', genre: 'Gold Classics', dj: 'Class 95 Morning' },
    '938': { name: '938 NOW', frequency: '93.8 FM', genre: 'News/Talk', dj: 'Current Affairs' },
    '987': { name: '987FM', frequency: '98.7 FM', genre: 'Pop Hits', dj: '987 Breakfast' },
    '1035': { name: 'Channel U', frequency: '103.5 FM', genre: 'Mandarin Pop', dj: 'U FM' },
    '1003': { name: '100.3 FM', frequency: '100.3 FM', genre: 'Tamil Hits', dj: 'Vanakkam' }
};

export const SingaporeMRTLines = {
    'NSL': { name: 'North South Line', color: 0xFF0000, stations: ['Jurong East', 'Bukit Batok', 'Clementi', 'Dover', 'Buona Vista', 'Commonwealth', 'Queenstown', 'Redhill', 'Tiong Bahru', 'Outram Park', 'Chinatown', 'City Hall', 'Raffles Place', 'Marina Bay', 'Marina South Pier'] },
    'EWL': { name: 'East West Line', color: 0x00FF00, stations: ['Pasir Ris', 'Tampines', 'Simei', 'Tanah Merah', 'Bedok', 'Kembangan', 'Eunos', 'Paya Lebar', 'Aljunied', 'Kallang', 'Lavender', 'Bugis', 'City Hall', 'Raffles Place', 'Tanjong Pagar', 'Outram Park', 'Tiong Bahru', 'Redhill', 'Queenstown', 'Commonwealth', 'Buona Vista', 'Dover', 'Clementi', 'Jurong East', 'Chinese Garden', 'Lakeside', 'Boon Lay', 'Pioneer', 'Joo Koon', 'Gul Circle', 'Tuas Crescent', 'Tuas West Road', 'Tuas Link'] },
    'CCL': { name: 'Circle Line', color: 0xFF9900, stations: ['Dhoby Ghaut', 'Bras Basah', 'Esplanade', 'Promenade', 'Nicoll Highway', 'Stadium', 'Mountbatten', 'Dakota', 'Paya Lebar', 'MacPherson', 'Tai Seng', 'Bartley', 'Serangoon', 'Lorong Chuan', 'Bishan', 'Marymount', 'Caldecott', 'Botanic Gardens', 'Farrer Road', 'Holland Village', 'Buona Vista', 'one-north', 'Kent Ridge', 'Haw Par Villa', 'Pasir Panjang', 'Labrador Park', 'Telok Blangah', 'HarbourFront'] },
    'NEL': { name: 'North East Line', color: 0x800080, stations: ['HarbourFront', 'Outram Park', 'Chinatown', 'Clarke Quay', 'Dhoby Ghaut', 'Little India', 'Farrer Park', 'Boon Keng', 'Potong Pasir', 'Woodleigh', 'Serangoon', 'Kovan', 'Hougang', 'Buangkok', 'Sengkang', 'Punggol'] },
    'DTL': { name: 'Downtown Line', color: 0x0000FF, stations: ['Bukit Panjang', 'Cashew', 'Hillview', 'Beauty World', 'King Albert Park', 'Sixth Avenue', 'Tan Kah Kee', 'Botanic Gardens', 'Stevens', 'Newton', 'Little India', 'Rochor', 'Bugis', 'Promenade', 'Bayfront', 'Downtown', 'Telok Ayer', 'Chinatown', 'Fort Canning', 'Bencoolen', 'Jalan Besar', 'Bendemeer', 'Geylang Bahru', 'Mattar', 'MacPherson', 'Ubi', 'Kaki Bukit', 'Bedok North', 'Bedok Reservoir', 'Tampines West', 'Tampines', 'Tampines East', 'Upper Changi', 'Expo'] }
};

export function getAreaInfo(areaName) {
    return SingaporeAreas[areaName] || null;
}

export function getLandmarkInfo(landmarkName) {
    return SingaporeLandmarks.find(l => l.name === landmarkName) || null;
}

export function getHawkerCentre(location) {
    return SingaporeHawkerCentres.find(h => h.location === location) || null;
}

export function getRadioStation(freq) {
    return SingaporeRadioStations[freq] || null;
}

export function getMRTLine(lineCode) {
    return SingaporeMRTLines[lineCode] || null;
}
