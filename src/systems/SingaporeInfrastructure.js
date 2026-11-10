/**
 * Singapore Infrastructure, Economy & Services
 * Based on actual Singapore prices, regulations, and facilities
 */

// Singapore Prices (in SGD)
export const SingaporePrices = {
    // Food & Dining
    'chicken_rice': { min: 3.50, max: 6.00, unit: 'plate', location: 'hawker' },
    'char_kway_teow': { min: 4.00, max: 6.50, unit: 'plate', location: 'hawker' },
    'laksa': { min: 4.00, max: 7.00, unit: 'bowl', location: 'hawker' },
    'roti_prata': { min: 1.20, max: 3.00, unit: 'piece', location: 'hawker' },
    'satay': { min: 0.70, max: 1.00, unit: 'stick', location: 'hawker' },
    'kopi': { min: 1.20, max: 2.00, unit: 'cup', location: 'kopitiam' },
    'teh': { min: 1.20, max: 2.00, unit: 'cup', location: 'kopitiam' },
    'milo': { min: 1.50, max: 2.50, unit: 'cup', location: 'kopitiam' },
    'bubble_tea': { min: 3.50, max: 6.50, unit: 'cup', location: 'mall' },
    'mcdonalds_meal': { min: 8.00, max: 12.00, unit: 'meal', location: 'fast_food' },
    'starbucks_coffee': { min: 6.00, max: 9.00, unit: 'cup', location: 'cafe' },
    
    // Transport
    'mrt_single': { min: 0.99, max: 2.50, unit: 'trip', location: 'mrt' },
    'bus_single': { min: 0.99, max: 2.30, unit: 'trip', location: 'bus' },
    'taxi_flagdown': { min: 3.90, max: 4.10, unit: 'flagdown', location: 'taxi' },
    'taxi_per_km': { min: 0.22, max: 0.25, unit: 'km', location: 'taxi' },
    'grab_ride': { min: 8.00, max: 30.00, unit: 'trip', location: 'grab' },
    'erp_peak': { min: 0.50, max: 6.00, unit: 'gantry', location: 'erp' },
    'parking_hdb': { min: 0.60, max: 1.20, unit: 'hour', location: 'hdb_carpark' },
    'parking_mall': { min: 1.00, max: 3.00, unit: 'hour', location: 'mall_carpark' },
    'petrol_95': { min: 2.80, max: 3.20, unit: 'litre', location: 'petrol_station' },
    'petrol_98': { min: 3.00, max: 3.50, unit: 'litre', location: 'petrol_station' },
    'diesel': { min: 2.50, max: 2.90, unit: 'litre', location: 'petrol_station' },
    
    // Housing
    'hdb_3room': { min: 300000, max: 450000, unit: 'unit', location: 'hdb' },
    'hdb_4room': { min: 400000, max: 600000, unit: 'unit', location: 'hdb' },
    'hdb_5room': { min: 500000, max: 750000, unit: 'unit', location: 'hdb' },
    'condo_studio': { min: 800000, max: 1200000, unit: 'unit', location: 'condo' },
    'condo_2br': { min: 1200000, max: 2000000, unit: 'unit', location: 'condo' },
    'landed': { min: 3000000, max: 10000000, unit: 'unit', location: 'landed' },
    'hdb_rental': { min: 1500, max: 3000, unit: 'month', location: 'hdb' },
    'condo_rental': { min: 2500, max: 6000, unit: 'month', location: 'condo' },
    
    // Utilities
    'electricity': { min: 0.25, max: 0.35, unit: 'kwh', location: 'home' },
    'water': { min: 2.00, max: 3.00, unit: 'cubic_meter', location: 'home' },
    'gas': { min: 20.00, max: 30.00, unit: 'month', location: 'home' },
    'internet': { min: 30.00, max: 60.00, unit: 'month', location: 'home' },
    'mobile_plan': { min: 20.00, max: 50.00, unit: 'month', location: 'mobile' },
    
    // Healthcare
    'gp_visit': { min: 20.00, max: 50.00, unit: 'visit', location: 'clinic' },
    'specialist': { min: 80.00, max: 200.00, unit: 'visit', location: 'hospital' },
    'dental': { min: 50.00, max: 150.00, unit: 'visit', location: 'dental' },
    'medication': { min: 5.00, max: 50.00, unit: 'prescription', location: 'pharmacy' },
    
    // Education
    'tuition_primary': { min: 20.00, max: 40.00, unit: 'hour', location: 'tuition' },
    'tuition_secondary': { min: 30.00, max: 60.00, unit: 'hour', location: 'tuition' },
    'tuition_jc': { min: 40.00, max: 80.00, unit: 'hour', location: 'tuition' },
    'university': { min: 8000, max: 12000, unit: 'year', location: 'university' },
    
    // Entertainment
    'movie_ticket': { min: 10.00, max: 15.00, unit: 'ticket', location: 'cinema' },
    'theme_park': { min: 60.00, max: 80.00, unit: 'ticket', location: 'sentosa' },
    'zoo': { min: 30.00, max: 40.00, unit: 'ticket', location: 'zoo' },
    'nightclub_entry': { min: 20.00, max: 40.00, unit: 'entry', location: 'club' },
    'karaoke_room': { min: 20.00, max: 50.00, unit: 'hour', location: 'ktv' },
    
    // Shopping
    'groceries_weekly': { min: 80.00, max: 150.00, unit: 'week', location: 'supermarket' },
    'clothing': { min: 20.00, max: 200.00, unit: 'item', location: 'mall' },
    'electronics': { min: 200.00, max: 2000.00, unit: 'item', location: 'mall' }
};

// Singapore Legalization Status
export const SingaporeLegalization = {
    'alcohol': {
        name: 'Alcohol',
        status: 'legal',
        restrictions: ['Age 18+', 'No drinking in public 10:30pm-7am', 'Licensed premises only'],
        locations: ['bars', 'restaurants', 'supermarkets', 'hawker_centres'],
        notes: 'Public drinking ban after 10:30pm in public places'
    },
    'tobacco': {
        name: 'Tobacco',
        status: 'legal',
        restrictions: ['Age 21+', 'No smoking in public places', 'Plain packaging'],
        locations: ['designated_smoking_areas'],
        notes: 'Smoking banned in most public places, fine up to $1000'
    },
    'chewing_gum': {
        name: 'Chewing Gum',
        status: 'banned',
        restrictions: ['Import and sale banned since 1992'],
        exceptions: ['Therapeutic gum with prescription'],
        notes: 'Michael Fay case led to ban'
    },
    'gambling': {
        name: 'Gambling',
        status: 'regulated',
        restrictions: ['Casinos (Marina Bay Sands, RWS) legal', 'Sports betting via Singapore Pools', 'TOTO, 4D legal'],
        locations: ['casinos', 'betting_outlets'],
        notes: 'Strictly regulated, only licensed operators'
    },
    'prostitution': {
        name: 'Prostitution',
        status: 'legal_in_designated_areas',
        restrictions: ['Legal in Geylang (designated blocks)', 'Soliciting illegal', 'Under 18 illegal', 'Health checks required'],
        locations: ['geylang'],
        notes: 'Legal but strictly regulated'
    },
    'drugs': {
        name: 'Drugs',
        status: 'illegal',
        restrictions: ['Zero tolerance', 'Death penalty for trafficking', 'Caning for possession'],
        locations: ['none'],
        notes: 'Misuse of Drugs Act - very strict'
    },
    'firearms': {
        name: 'Firearms',
        status: 'illegal',
        restrictions: ['No civilian ownership', 'Death penalty for trafficking', 'Armed forces/police only'],
        locations: ['none'],
        notes: 'Arms Offences Act - death penalty'
    },
    'vaping': {
        name: 'Vaping/E-cigarettes',
        status: 'banned',
        restrictions: ['Import, sale, possession banned'],
        locations: ['none'],
        notes: 'Banned since 2018'
    },
    'cannabis': {
        name: 'Cannabis',
        status: 'illegal',
        restrictions: ['Class A drug', 'Death penalty for trafficking'],
        locations: ['none'],
        notes: 'Misuse of Drugs Act'
    }
};

// Singapore Marriage
export const SingaporeMarriage = {
    'requirements': {
        'age': { min: 21, note: '18-20 requires parental consent' },
        'citizenship': 'At least one party must be Singaporean or PR',
        'documents': ['NRIC', 'Birth certificate', 'Divorce certificate (if applicable)', 'Death certificate (if widowed)'],
        'notice_period': '21 days (Notice of Marriage)',
        'solemnization': 'Must be performed by licensed solemnizer',
        'venues': ['ROM (Registry of Marriages)', 'Licensed venues', 'Religious venues']
    },
    'types': {
        'civil': { name: 'Civil Marriage', venue: 'ROM', cost: 42 },
        'religious': { name: 'Religious Marriage', venue: 'Temple/Church/Mosque', cost: 'varies' },
        'custom': { name: 'Custom Solemnization', venue: 'Any licensed venue', cost: 'varies' }
    },
    'restrictions': {
        'same_sex': 'Not legally recognized',
        'polygamy': 'Not allowed (except Muslims under Syariah)',
        'minimum_age': 18,
        'consanguinity': 'Prohibited within certain degrees'
    },
    'costs': {
        'rom_filing': 42,
        'solemnizer': '50-200',
        'venue': '200-5000',
        'catering': '20-80 per pax',
        'photography': '500-3000',
        'decoration': '500-5000'
    }
};

// Singapore Hostels & Accommodation
export const SingaporeAccommodation = {
    'hostels': {
        'backpacker': {
            name: 'Backpacker Hostel',
            location: ['little_india', 'chinatown', 'bugis'],
            price: { min: 20, max: 40, unit: 'night' },
            amenities: ['shared_dorm', 'wifi', 'lockers', 'common_area'],
            description: 'Budget accommodation for backpackers'
        },
        'capsule': {
            name: 'Capsule Hotel',
            location: ['chinatown', 'bugis', 'orchard'],
            price: { min: 30, max: 60, unit: 'night' },
            amenities: ['capsule_bed', 'wifi', 'lockers', 'shower'],
            description: 'Japanese-style capsule beds'
        },
        'boutique': {
            name: 'Boutique Hostel',
            location: ['tiong_bahru', 'kampong_glam'],
            price: { min: 40, max: 80, unit: 'night' },
            amenities: ['private_room', 'wifi', 'breakfast', 'lounge'],
            description: 'Stylish boutique accommodation'
        }
    },
    'hotels': {
        'budget': {
            name: 'Budget Hotel',
            location: ['ggeylang', 'little_india', 'bugis'],
            price: { min: 60, max: 120, unit: 'night' },
            amenities: ['private_room', 'wifi', 'ac', 'tv'],
            description: 'Basic hotel rooms'
        },
        'mid_range': {
            name: 'Mid-Range Hotel',
            location: ['orchard', 'marina_bay', 'clarke_quay'],
            price: { min: 150, max: 300, unit: 'night' },
            amenities: ['private_room', 'wifi', 'ac', 'tv', 'pool', 'gym'],
            description: 'Comfortable hotel with amenities'
        },
        'luxury': {
            name: 'Luxury Hotel',
            location: ['marina_bay', 'orchard', 'sentosa'],
            price: { min: 400, max: 2000, unit: 'night' },
            amenities: ['suite', 'wifi', 'ac', 'tv', 'pool', 'gym', 'spa', 'butler'],
            description: '5-star luxury accommodation'
        },
        'iconic': {
            name: 'Iconic Hotel',
            examples: ['Marina Bay Sands', 'Raffles Hotel', 'Fullerton Hotel'],
            price: { min: 500, max: 5000, unit: 'night' },
            amenities: ['all_luxury', 'iconic_view', 'world_class'],
            description: 'World-famous Singapore hotels'
        }
    },
    'worker_dormitories': {
        name: 'Worker Dormitory',
        location: ['tuas', 'jurong', 'woodlands', 'changi'],
        price: { min: 200, max: 400, unit: 'month' },
        amenities: ['shared_room', 'wifi', 'canteen', 'recreation'],
        description: 'Foreign worker housing',
        restrictions: ['Work permit holders only', 'Registered employers']
    }
};

// Singapore Toilets
export const SingaporeToilets = {
    'public_toilet': {
        name: 'Public Toilet',
        locations: ['hdb_estate', 'shopping_mall', 'park', 'mrt_station', 'hawker_centre'],
        cost: 0,
        cleanliness: 'high',
        features: ['flush', 'toilet_paper', 'hand_dryer', 'mirror'],
        rating: 'Generally very clean',
        notes: 'Singapore public toilets are known for cleanliness'
    },
    'hdb_toilet': {
        name: 'HDB Toilet',
        locations: ['hdb_flat'],
        cost: 0,
        features: ['flush', 'shower', 'water_heater'],
        type: 'wet_toilet',
        notes: 'Singapore HDB toilets typically have shower and toilet combined'
    },
    'mall_toilet': {
        name: 'Shopping Mall Toilet',
        locations: ['shopping_mall'],
        cost: 0,
        features: ['flush', 'toilet_paper', 'hand_dryer', 'mirror', 'baby_changing'],
        cleanliness: 'very_high',
        notes: 'Premium mall toilets with attendants'
    },
    'hawker_toilet': {
        name: 'Hawker Centre Toilet',
        locations: ['hawker_centre'],
        cost: 0,
        features: ['flush', 'basic'],
        cleanliness: 'moderate',
        notes: 'Basic but functional'
    }
};

// Singapore Petrol Stations
export const SingaporePetrolStations = {
    'shell': {
        name: 'Shell',
        locations: ['island_wide'],
        fuels: ['95', '98', 'V-Power', 'Diesel'],
        services: ['convenience_store', 'car_wash', 'air_pump'],
        price_95: 2.85,
        price_98: 3.15,
        price_diesel: 2.55
    },
    'esso': {
        name: 'Esso',
        locations: ['island_wide'],
        fuels: ['92', '95', '98', 'Diesel'],
        services: ['convenience_store', 'car_wash'],
        price_95: 2.80,
        price_98: 3.10,
        price_diesel: 2.50
    },
    'caltex': {
        name: 'Caltex',
        locations: ['island_wide'],
        fuels: ['92', '95', '98', 'Diesel'],
        services: ['convenience_store', 'car_wash'],
        price_95: 2.82,
        price_98: 3.12,
        price_diesel: 2.52
    },
    'spc': {
        name: 'SPC',
        locations: ['island_wide'],
        fuels: ['92', '95', '98', 'Diesel'],
        services: ['convenience_store'],
        price_95: 2.75,
        price_98: 3.05,
        price_diesel: 2.45,
        note: 'Singapore Petroleum Company - cheapest'
    }
};

// Singapore Power Stations
export const SingaporePowerStations = {
    'tuas_power': {
        name: 'Tuas Power Station',
        location: 'tuas',
        type: 'combined_cycle',
        capacity: '2670 MW',
        fuel: 'natural_gas',
        operator: 'Tuas Power'
    },
    'senoko_power': {
        name: 'Senoko Power Station',
        location: 'woodlands',
        type: 'combined_cycle',
        capacity: '2640 MW',
        fuel: 'natural_gas',
        operator: 'Senoko Energy'
    },
    'keppel_merlimau': {
        name: 'Keppel Merlimau Cogen',
        location: 'jurong',
        type: 'cogeneration',
        capacity: '1300 MW',
        fuel: 'natural_gas',
        operator: 'Keppel Infrastructure'
    },
    'seraya_power': {
        name: 'Seraya Power Station',
        location: 'jurong',
        type: 'combined_cycle',
        capacity: '800 MW',
        fuel: 'natural_gas',
        operator: 'YTL PowerSeraya'
    }
};

// Singapore Water (PUB)
export const SingaporeWater = {
    'reservoirs': [
        { name: 'MacRitchie Reservoir', location: 'central', type: 'freshwater' },
        { name: 'Seletar Reservoir', location: 'north', type: 'freshwater' },
        { name: 'Bedok Reservoir', location: 'east', type: 'freshwater' },
        { name: 'Lower Seletar Reservoir', location: 'north', type: 'freshwater' },
        { name: 'Kranji Reservoir', location: 'north', type: 'freshwater' },
        { name: 'Pandan Reservoir', location: 'west', type: 'freshwater' },
        { name: 'Tengeh Reservoir', location: 'west', type: 'freshwater' },
        { name: 'Poyan Reservoir', location: 'west', type: 'freshwater' },
        { name: 'Murai Reservoir', location: 'west', type: 'freshwater' },
        { name: 'Sarimbun Reservoir', location: 'west', type: 'freshwater' },
        { name: 'Kranji Reservoir', location: 'north', type: 'freshwater' },
        { name: 'Upper Seletar Reservoir', location: 'north', type: 'freshwater' },
        { name: 'Marina Reservoir', location: 'central', type: 'urban' },
        { name: 'Punggol Reservoir', location: 'northeast', type: 'urban' },
        { name: 'Serangoon Reservoir', location: 'northeast', type: 'urban' }
    ],
    'newater': {
        name: 'NEWater',
        description: 'Recycled water - high-grade reclaimed water',
        usage: 'Industrial and non-potable',
        plants: ['Bedok', 'Kranji', 'Seletar', 'Changi', 'Ulu Pandan']
    },
    'desalination': {
        name: 'Desalination',
        plants: ['SingSpring', 'Tuaspring', 'Jurong Island', 'Keppel Marina East'],
        capacity: '180 million gallons per day'
    }
};

export function getPrice(item) {
    const price = SingaporePrices[item];
    if (!price) return null;
    return price.min + Math.random() * (price.max - price.min);
}

export function getLegalizationInfo(substance) {
    return SingaporeLegalization[substance] || null;
}

export function getMarriageInfo() {
    return SingaporeMarriage;
}

export function getAccommodationInfo(type, tier) {
    if (type === 'hostel') return SingaporeAccommodation.hostels[tier] || null;
    if (type === 'hotel') return SingaporeAccommodation.hotels[tier] || null;
    return SingaporeAccommodation.worker_dormitories;
}

export function getToiletInfo(type) {
    return SingaporeToilets[type] || null;
}

export function getPetrolStationInfo(brand) {
    return SingaporePetrolStations[brand] || null;
}

export function getPowerStationInfo(name) {
    return SingaporePowerStations[name] || null;
}
