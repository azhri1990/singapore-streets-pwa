/**
 * Singapore Services & Vehicles
 * Exact colors, patterns, logos as seen in Singapore
 */

// Singapore Taxi Companies
export const SingaporeTaxis = {
    'comfort': {
        name: 'Comfort Taxi',
        color: 0xFFFF00, // Yellow
        secondary: 0x000000, // Black
        pattern: 'yellow_body_black_roof',
        logo: 'comfort_delgro',
        roofLight: 0xFFFF00,
        taxiSign: 'TAXI',
        company: 'ComfortDelGro',
        founded: 2003,
        fleet: 10000,
        description: 'Singapore\'s largest taxi operator'
    },
    'citycab': {
        name: 'CityCab',
        color: 0xFFFF00,
        secondary: 0x000080, // Navy blue
        pattern: 'yellow_body_navy_roof',
        logo: 'citycab',
        roofLight: 0xFFFF00,
        taxiSign: 'TAXI',
        company: 'ComfortDelGro',
        founded: 1995,
        fleet: 3000,
        description: 'Premium taxi service'
    },
    'smrt': {
        name: 'SMRT Taxi',
        color: 0xFFFF00,
        secondary: 0xFF0000, // Red
        pattern: 'yellow_body_red_roof',
        logo: 'smrt',
        roofLight: 0xFFFF00,
        taxiSign: 'TAXI',
        company: 'SMRT Corporation',
        founded: 2003,
        fleet: 2500,
        description: 'SMRT taxi fleet'
    },
    'transcab': {
        name: 'TransCab',
        color: 0xFFFF00,
        secondary: 0x008000, // Green
        pattern: 'yellow_body_green_roof',
        logo: 'transcab',
        roofLight: 0xFFFF00,
        taxiSign: 'TAXI',
        company: 'TransCab Services',
        founded: 2004,
        fleet: 2000,
        description: 'Independent taxi operator'
    },
    'premier': {
        name: 'Premier Taxi',
        color: 0x000080, // Navy blue
        secondary: 0xFFFFFF,
        pattern: 'navy_body_white_roof',
        logo: 'premier',
        roofLight: 0xFFFF00,
        taxiSign: 'TAXI',
        company: 'Premier Taxis',
        founded: 2005,
        fleet: 1500,
        description: 'Premium taxi service'
    },
    'grab': {
        name: 'Grab Car',
        color: 0x00B14F, // Grab green
        secondary: 0xFFFFFF,
        pattern: 'green_body_white_roof',
        logo: 'grab',
        roofLight: null,
        taxiSign: null,
        company: 'Grab Holdings',
        founded: 2012,
        fleet: 50000,
        description: 'Ride-hailing service'
    },
    'gojek': {
        name: 'Gojek',
        color: 0x00AA13, // Gojek green
        secondary: 0xFFFFFF,
        pattern: 'green_body_white_roof',
        logo: 'gojek',
        roofLight: null,
        taxiSign: null,
        company: 'Gojek',
        founded: 2010,
        fleet: 20000,
        description: 'Ride-hailing service'
    }
};

// Singapore Bus Operators
export const SingaporeBuses = {
    'sbs_transit': {
        name: 'SBS Transit',
        color: 0xFF0000, // Red
        secondary: 0xFFFFFF,
        pattern: 'red_white',
        logo: 'sbs_transit',
        busStopColor: 0xFF0000,
        description: 'Singapore\'s largest bus operator'
    },
    'smrt_buses': {
        name: 'SMRT Buses',
        color: 0xFFD700, // Yellow/Gold
        secondary: 0x000080,
        pattern: 'yellow_navy',
        logo: 'smrt',
        busStopColor: 0xFFD700,
        description: 'SMRT bus services'
    },
    'tower_transit': {
        name: 'Tower Transit',
        color: 0x00BFFF, // Sky blue
        secondary: 0xFFFFFF,
        pattern: 'blue_white',
        logo: 'tower_transit',
        busStopColor: 0x00BFFF,
        description: 'Bus operator'
    },
    'go_ahead': {
        name: 'Go-Ahead Singapore',
        color: 0x008000, // Green
        secondary: 0xFFFFFF,
        pattern: 'green_white',
        logo: 'go_ahead',
        busStopColor: 0x008000,
        description: 'Bus operator'
    }
};

// Singapore Delivery Services
export const SingaporeDelivery = {
    'grabfood': {
        name: 'GrabFood',
        color: 0x00B14F, // Grab green
        secondary: 0xFFFFFF,
        logo: 'grabfood',
        bagColor: 0x00B14F,
        description: 'Food delivery by Grab'
    },
    'foodpanda': {
        name: 'Foodpanda',
        color: 0xFF2B85, // Pink
        secondary: 0xFFFFFF,
        logo: 'foodpanda',
        bagColor: 0xFF2B85,
        description: 'Food delivery by Foodpanda'
    },
    'deliveroo': {
        name: 'Deliveroo',
        color: 0x00CCBC, // Teal
        secondary: 0xFFFFFF,
        logo: 'deliveroo',
        bagColor: 0x00CCBC,
        description: 'Food delivery by Deliveroo'
    },
    'lalamove': {
        name: 'Lalamove',
        color: 0xFF6600, // Orange
        secondary: 0xFFFFFF,
        logo: 'lalamove',
        bagColor: 0xFF6600,
        description: 'On-demand delivery'
    },
    'ninjavan': {
        name: 'Ninja Van',
        color: 0xFF0000, // Red
        secondary: 0xFFFFFF,
        logo: 'ninjavan',
        bagColor: 0xFF0000,
        description: 'Parcel delivery'
    },
    'singpost': {
        name: 'SingPost',
        color: 0xFF0000, // Red
        secondary: 0xFFFFFF,
        logo: 'singpost',
        bagColor: 0xFF0000,
        description: 'Singapore Post'
    }
};

// Singapore MRT
export const SingaporeMRT = {
    'nsl': { name: 'North South Line', color: 0xFF0000, operator: 'SMRT' },
    'ewl': { name: 'East West Line', color: 0x00FF00, operator: 'SMRT' },
    'ccl': { name: 'Circle Line', color: 0xFF9900, operator: 'SMRT' },
    'nel': { name: 'North East Line', color: 0x800080, operator: 'SBS Transit' },
    'dtl': { name: 'Downtown Line', color: 0x0000FF, operator: 'SBS Transit' },
    'tel': { name: 'Thomson-East Coast Line', color: 0x8B4513, operator: 'SMRT' }
};

// Singapore LRT
export const SingaporeLRT = {
    'bplrt': { name: 'Bukit Panjang LRT', color: 0x8B4513, operator: 'SMRT' },
    'splrt': { name: 'Sengkang LRT', color: 0x008000, operator: 'SBS Transit' },
    'pglrt': { name: 'Punggol LRT', color: 0x008000, operator: 'SBS Transit' }
};

// Singapore Emergency Services
export const SingaporeEmergency = {
    'spf': { name: 'Singapore Police Force', color: 0x0000FF, logo: 'spf', vehicle: 'white_blue' },
    'scdf': { name: 'Singapore Civil Defence Force', color: 0xFF0000, logo: 'scdf', vehicle: 'red_white' },
    'ambulance': { name: 'Ambulance', color: 0xFFFFFF, logo: 'scdf', vehicle: 'white_red' },
    'traffic_police': { name: 'Traffic Police', color: 0xFFFFFF, logo: 'tp', vehicle: 'white' }
};

// Singapore Brands & Logos
export const SingaporeBrands = {
    'fairprice': { name: 'NTUC FairPrice', color: 0xFF0000, logo: 'fairprice', type: 'supermarket' },
    'cold_storage': { name: 'Cold Storage', color: 0x0000FF, logo: 'cold_storage', type: 'supermarket' },
    'giant': { name: 'Giant', color: 0xFF6600, logo: 'giant', type: 'supermarket' },
    'sheng_siong': { name: 'Sheng Siong', color: 0x008000, logo: 'sheng_siong', type: 'supermarket' },
    '7eleven': { name: '7-Eleven', color: 0xFF6600, logo: '7eleven', type: 'convenience' },
    'cheers': { name: 'Cheers', color: 0xFF0000, logo: 'cheers', type: 'convenience' },
    'starbucks': { name: 'Starbucks', color: 0x006241, logo: 'starbucks', type: 'cafe' },
    'mcdonalds': { name: 'McDonald\'s', color: 0xFFCC00, logo: 'mcdonalds', type: 'fast_food' },
    'kfc': { name: 'KFC', color: 0xFF0000, logo: 'kfc', type: 'fast_food' },
    'subway': { name: 'Subway', color: 0x008000, logo: 'subway', type: 'fast_food' },
    'singtel': { name: 'Singtel', color: 0xFF0000, logo: 'singtel', type: 'telecom' },
    'starhub': { name: 'StarHub', color: 0xFF6600, logo: 'starhub', type: 'telecom' },
    'm1': { name: 'M1', color: 0x0000FF, logo: 'm1', type: 'telecom' },
    'dbs': { name: 'DBS Bank', color: 0xFF0000, logo: 'dbs', type: 'bank' },
    'ocbc': { name: 'OCBC Bank', color: 0xFF0000, logo: 'ocbc', type: 'bank' },
    'uob': { name: 'UOB', color: 0x0000FF, logo: 'uob', type: 'bank' },
    'standard_chartered': { name: 'Standard Chartered', color: 0x008000, logo: 'sc', type: 'bank' },
    'hsbc': { name: 'HSBC', color: 0xFF0000, logo: 'hsbc', type: 'bank' }
};

// Singapore Road Signs
export const SingaporeRoadSigns = {
    'speed_limit': { shape: 'circle', color: 0xFF0000, text: '50', meaning: 'Speed limit 50 km/h' },
    'no_entry': { shape: 'circle', color: 0xFF0000, text: 'X', meaning: 'No entry' },
    'one_way': { shape: 'rectangle', color: 0x0000FF, text: '→', meaning: 'One way' },
    'stop': { shape: 'octagon', color: 0xFF0000, text: 'STOP', meaning: 'Stop' },
    'give_way': { shape: 'triangle', color: 0xFF0000, text: '', meaning: 'Give way' },
    'erp': { shape: 'rectangle', color: 0xFF8C00, text: 'ERP', meaning: 'Electronic Road Pricing' },
    'bus_lane': { shape: 'rectangle', color: 0xFF0000, text: 'BUS LANE', meaning: 'Bus lane hours' },
    'school_zone': { shape: 'pentagon', color: 0xFFFF00, text: 'SCHOOL', meaning: 'School zone' },
    'pedestrian_crossing': { shape: 'triangle', color: 0xFF0000, text: '', meaning: 'Pedestrian crossing' },
    'no_parking': { shape: 'circle', color: 0xFF0000, text: 'P', meaning: 'No parking' },
    'no_stopping': { shape: 'circle', color: 0xFF0000, text: 'S', meaning: 'No stopping' }
};

// Singapore Traffic Light System
export const SingaporeTrafficLights = {
    'standard': {
        red: 0xFF0000,
        amber: 0xFF8C00,
        green: 0x00FF00,
        cycle: { red: 30, amber: 3, green: 25 }
    },
    'pedestrian': {
        red: 0xFF0000,
        green: 0x00FF00,
        walk: 'Green man',
        dont_walk: 'Red man'
    },
    'bus_priority': {
        description: 'Bus priority signals',
        color: 0x0000FF
    }
};

export function getTaxiInfo(company) {
    return SingaporeTaxis[company] || null;
}

export function getBusInfo(operator) {
    return SingaporeBuses[operator] || null;
}

export function getDeliveryInfo(service) {
    return SingaporeDelivery[service] || null;
}

export function getBrandInfo(brand) {
    return SingaporeBrands[brand] || null;
}

export function getPetrolStationInfo(brand) {
    return SingaporePetrolStations[brand] || null;
}
