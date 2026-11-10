/**
 * Singapore Gangs System
 * Based on actual Singapore secret societies and street gangs
 */

export const SingaporeGangs = {
    // Chinese Secret Societies
    'salakau': {
        name: 'Salakau (369)',
        fullName: 'Salakau Secret Society',
        tag: '369',
        tagColor: 0xFF0000,
        sign: '3 fingers up, 6 fingers, 9 fingers (hand signs)',
        color: 0xFF0000,
        territory: ['geylang', 'bugis', 'lavender'],
        hangout: 'Geylang Lorong',
        personality: {
            aggressive: 0.9,
            loyal: 0.95,
            territorial: 0.9,
            organized: 0.8,
            violent: 0.85
        },
        attitude: 'aggressive and territorial',
        behavior: 'Controls Geylang area, involved in illegal gambling, extortion, and drug trafficking. Known for violence and intimidation.',
        members: 200,
        founded: 1950,
        ethnicity: 'Chinese',
        language: 'Hokkien, Mandarin, Singlish',
        description: 'One of Singapore\'s most notorious secret societies. Known for the "369" tag and violent turf wars.',
        rivals: ['sio_kun_tong', 'ang_soon_tong'],
        allies: ['gang_24'],
        crimes: ['extortion', 'illegal_gambling', 'drug_trafficking', 'violence'],
        hangoutSpots: ['Geylang Lorong 1-40', 'Bugis Street', 'Lavender Street'],
        graffiti: ['369', 'Salakau', 'SK'],
        clothing: { primary: 0xFF0000, secondary: 0x000000, accessory: 'red_bandana' }
    },
    
    'sio_kun_tong': {
        name: 'Sio Kun Tong (SKT)',
        fullName: 'Sio Kun Tong Secret Society',
        tag: 'SKT',
        tagColor: 0x00FF00,
        sign: 'S hand sign, K hand sign, T hand sign',
        color: 0x00FF00,
        territory: ['toa_payoh', 'bishan', 'ang_mo_kio'],
        hangout: 'Toa Payoh Central',
        personality: {
            aggressive: 0.7,
            loyal: 0.9,
            territorial: 0.8,
            organized: 0.85,
            violent: 0.6
        },
        attitude: 'organized and business-minded',
        behavior: 'Controls northern HDB estates. Involved in illegal gambling, protection rackets, and unlicensed moneylending.',
        members: 150,
        founded: 1960,
        ethnicity: 'Chinese',
        language: 'Hokkien, Mandarin, Singlish',
        description: 'One of the oldest secret societies in Singapore. Known for organized crime and business operations.',
        rivals: ['salakau', 'ang_soon_tong'],
        allies: ['sio_lian_tong'],
        crimes: ['illegal_gambling', 'unlicensed_moneylending', 'extortion', 'protection_racket'],
        hangoutSpots: ['Toa Payoh Central', 'Bishan Junction 8', 'Ang Mo Kio Hub'],
        graffiti: ['SKT', 'Sio Kun Tong', 'Kun'],
        clothing: { primary: 0x00FF00, secondary: 0x000000, accessory: 'green_bandana' }
    },
    
    'sio_lian_tong': {
        name: 'Sio Lian Tong (SLT)',
        fullName: 'Sio Lian Tong Secret Society',
        tag: 'SLT',
        tagColor: 0x0000FF,
        sign: 'S hand sign, L hand sign, T hand sign',
        color: 0x0000FF,
        territory: ['jurong', 'clementi', 'bukit_batok'],
        hangout: 'Jurong East',
        personality: {
            aggressive: 0.65,
            loyal: 0.85,
            territorial: 0.75,
            organized: 0.8,
            violent: 0.55
        },
        attitude: 'business-oriented and territorial',
        behavior: 'Controls western HDB estates. Involved in illegal gambling and unlicensed moneylending.',
        members: 120,
        founded: 1965,
        ethnicity: 'Chinese',
        language: 'Hokkien, Mandarin, Singlish',
        description: 'Western Singapore secret society. Known for gambling dens and moneylending operations.',
        rivals: ['salakau'],
        allies: ['sio_kun_tong'],
        crimes: ['illegal_gambling', 'unlicensed_moneylending', 'extortion'],
        hangoutSpots: ['Jurong East Mall', 'Clementi Mall', 'Bukit Batok Central'],
        graffiti: ['SLT', 'Sio Lian Tong', 'Lian'],
        clothing: { primary: 0x0000FF, secondary: 0x000000, accessory: 'blue_bandana' }
    },
    
    'ang_soon_tong': {
        name: 'Ang Soon Tong (AST)',
        fullName: 'Ang Soon Tong Secret Society',
        tag: 'AST',
        tagColor: 0xFFFF00,
        sign: 'A hand sign, S hand sign, T hand sign',
        color: 0xFFFF00,
        territory: ['chinatown', 'outram', 'tiong_bahru'],
        hangout: 'Chinatown',
        personality: {
            aggressive: 0.75,
            loyal: 0.8,
            territorial: 0.85,
            organized: 0.7,
            violent: 0.7
        },
        attitude: 'traditional and territorial',
        behavior: 'Controls Chinatown area. Involved in traditional secret society activities and modern crimes.',
        members: 100,
        founded: 1955,
        ethnicity: 'Chinese',
        language: 'Cantonese, Mandarin, Singlish',
        description: 'Chinatown-based secret society. Known for traditional rituals and modern criminal activities.',
        rivals: ['salakau', 'sio_kun_tong'],
        allies: [],
        crimes: ['extortion', 'illegal_gambling', 'drug_trafficking', 'violence'],
        hangoutSpots: ['Chinatown Complex', 'Temple Street', 'Smith Street'],
        graffiti: ['AST', 'Ang Soon Tong', 'Soon'],
        clothing: { primary: 0xFFFF00, secondary: 0x000000, accessory: 'yellow_bandana' }
    },
    
    // Street Gangs
    'gang_36': {
        name: 'Gang 36',
        fullName: 'Gang 36 Street Gang',
        tag: '36',
        tagColor: 0xFF6600,
        sign: '3 fingers, 6 fingers',
        color: 0xFF6600,
        territory: ['woodlands', 'sembawang', 'yishun'],
        hangout: 'Woodlands',
        personality: {
            aggressive: 0.85,
            loyal: 0.75,
            territorial: 0.9,
            organized: 0.5,
            violent: 0.8
        },
        attitude: 'aggressive and youthful',
        behavior: 'Northern Singapore street gang. Involved in fights, extortion, and drug peddling.',
        members: 80,
        founded: 1990,
        ethnicity: 'Chinese',
        language: 'Mandarin, Singlish, Hokkien',
        description: 'Northern Singapore street gang. Known for the "36" tag and violent clashes.',
        rivals: ['gang_24', 'salakau'],
        allies: ['salakau'],
        crimes: ['fighting', 'extortion', 'drug_peddling', 'vandalism'],
        hangoutSpots: ['Woodlands Checkpoint', 'Causeway Point', 'Woodlands MRT'],
        graffiti: ['36', 'Gang 36', '3-6'],
        clothing: { primary: 0xFF6600, secondary: 0x000000, accessory: 'orange_bandana' }
    },
    
    'gang_24': {
        name: 'Gang 24',
        fullName: 'Gang 24 Street Gang',
        tag: '24',
        tagColor: 0x800080,
        sign: '2 fingers, 4 fingers',
        color: 0x800080,
        territory: ['tampines', 'pasir_ris', 'bedok'],
        hangout: 'Tampines',
        personality: {
            aggressive: 0.8,
            loyal: 0.7,
            territorial: 0.85,
            organized: 0.55,
            violent: 0.75
        },
        attitude: 'territorial and aggressive',
        behavior: 'Eastern Singapore street gang. Involved in fights, drug peddling, and extortion.',
        members: 70,
        founded: 1992,
        ethnicity: 'Chinese',
        language: 'Mandarin, Singlish, Hokkien',
        description: 'Eastern Singapore street gang. Known for the "24" tag and territorial disputes.',
        rivals: ['gang_36', 'salakau'],
        allies: ['salakau'],
        crimes: ['fighting', 'drug_peddling', 'extortion', 'vandalism'],
        hangoutSpots: ['Tampines Mall', 'Bedok Mall', 'Pasir Ris Mall'],
        graffiti: ['24', 'Gang 24', '2-4'],
        clothing: { primary: 0x800080, secondary: 0x000000, accessory: 'purple_bandana' }
    },
    
    'omega': {
        name: 'Omega',
        fullName: 'Omega Gang',
        tag: 'Ω',
        tagColor: 0x00FFFF,
        sign: 'Omega symbol hand sign',
        color: 0x00FFFF,
        territory: ['orchard', 'somerset', 'dhoby_ghaut'],
        hangout: 'Orchard Road',
        personality: {
            aggressive: 0.7,
            loyal: 0.65,
            territorial: 0.6,
            organized: 0.7,
            violent: 0.6
        },
        attitude: 'flashy and materialistic',
        behavior: 'Orchard Road gang. Involved in shoplifting, extortion of street vendors, and drug peddling.',
        members: 60,
        founded: 2000,
        ethnicity: 'Mixed',
        language: 'Singlish, English',
        description: 'Orchard Road street gang. Known for flashy lifestyle and shoplifting.',
        rivals: ['salakau', 'gang_36'],
        allies: [],
        crimes: ['shoplifting', 'extortion', 'drug_peddling', 'vandalism'],
        hangoutSpots: ['Orchard Road', 'Somerset 313', 'ION Orchard'],
        graffiti: ['Ω', 'Omega', 'Ωmega'],
        clothing: { primary: 0x00FFFF, secondary: 0x000000, accessory: 'cyan_bandana' }
    },
    
    // Malay Gangs
    'sakai': {
        name: 'Sakai',
        fullName: 'Sakai Gang',
        tag: 'Sakai',
        tagColor: 0x008000,
        sign: 'S hand sign',
        color: 0x008000,
        territory: ['geylang', 'kallang', 'macpherson'],
        hangout: 'Geylang',
        personality: {
            aggressive: 0.8,
            loyal: 0.85,
            territorial: 0.8,
            organized: 0.6,
            violent: 0.75
        },
        attitude: 'aggressive and territorial',
        behavior: 'Malay street gang. Involved in fights, drug peddling, and extortion in Geylang area.',
        members: 50,
        founded: 1985,
        ethnicity: 'Malay',
        language: 'Malay, Singlish',
        description: 'Malay street gang. Known for controlling parts of Geylang.',
        rivals: ['salakau', 'gang_36'],
        allies: [],
        crimes: ['fighting', 'drug_peddling', 'extortion', 'vandalism'],
        hangoutSpots: ['Geylang Serai', 'Kallang MRT', 'MacPherson Road'],
        graffiti: ['Sakai', 'S', 'Sakai 99'],
        clothing: { primary: 0x008000, secondary: 0x000000, accessory: 'green_bandana' }
    },
    
    // Indian Gangs
    'indian_gang': {
        name: 'Indian Gang',
        fullName: 'Indian Street Gang',
        tag: 'IG',
        tagColor: 0xFF8C00,
        sign: 'I hand sign, G hand sign',
        color: 0xFF8C00,
        territory: ['little_india', 'farrer_park', 'serangoon'],
        hangout: 'Little India',
        personality: {
            aggressive: 0.75,
            loyal: 0.8,
            territorial: 0.7,
            organized: 0.65,
            violent: 0.7
        },
        attitude: 'territorial and aggressive',
        behavior: 'Indian street gang. Involved in fights, extortion, and drug peddling in Little India area.',
        members: 40,
        founded: 1990,
        ethnicity: 'Indian',
        language: 'Tamil, Hindi, Singlish',
        description: 'Indian street gang. Controls parts of Little India.',
        rivals: ['salakau', 'sakai'],
        allies: [],
        crimes: ['fighting', 'extortion', 'drug_peddling', 'vandalism'],
        hangoutSpots: ['Mustafa Centre', 'Tekka Centre', 'Serangoon Road'],
        graffiti: ['IG', 'Indian Gang', 'IG 99'],
        clothing: { primary: 0xFF8C00, secondary: 0x000000, accessory: 'orange_bandana' }
    }
};

// Gang territories (HDB estates and areas)
export const GangTerritories = {
    'geylang': ['salakau', 'sakai'],
    'toa_payoh': ['sio_kun_tong'],
    'jurong': ['sio_lian_tong'],
    'chinatown': ['ang_soon_tong'],
    'woodlands': ['gang_36'],
    'tampines': ['gang_24'],
    'orchard': ['omega'],
    'little_india': ['indian_gang'],
    'bugis': ['salakau'],
    'kallang': ['sakai'],
    'ang_mo_kio': ['sio_kun_tong'],
    'clementi': ['sio_lian_tong'],
    'bishan': ['sio_kun_tong'],
    'bedok': ['gang_24'],
    'pasir_ris': ['gang_24'],
    'sembawang': ['gang_36'],
    'yishun': ['gang_36'],
    'outram': ['ang_soon_tong'],
    'tiong_bahru': ['ang_soon_tong'],
    'somerset': ['omega'],
    'dhoby_ghaut': ['omega'],
    'farrer_park': ['indian_gang'],
    'serangoon': ['indian_gang'],
    'macpherson': ['sakai'],
    'lavender': ['salakau']
};

// Gang behaviors and attitudes
export const GangBehaviors = {
    salakau: {
        greeting: 'Eh, you from where? This is Salakau territory!',
        threat: 'You want problem ah? Salakau don\'t play play!',
        recruitment: 'Want join 369? We protect our own.',
        drug_deal: 'Got stuff, want or not?',
        extortion: 'Pay protection money or else.',
        fight: 'Salakau! 369! Attack!',
        retreat: 'Run, police coming!',
        victory: 'Salakau forever! 369!'
    },
    sio_kun_tong: {
        greeting: 'Eh, you know SKT or not?',
        threat: 'Don\'t mess with Sio Kun Tong.',
        recruitment: 'Join SKT, we take care of you.',
        gambling: 'Want to play? Got mahjong, got cards.',
        moneylending: 'Need money? We can help, but must pay back.',
        fight: 'SKT! Attack!',
        retreat: 'Scatter, police!',
        victory: 'SKT wins!'
    },
    gang_36: {
        greeting: 'Eh, 36! You know us?',
        threat: '36 don\'t like strangers.',
        recruitment: 'Want join 36? We strong.',
        drug_deal: 'Got pills, want or not?',
        fight: '36! Attack!',
        retreat: 'Run!',
        victory: '36 forever!'
    },
    gang_24: {
        greeting: 'Eh, 24! You from east side?',
        threat: '24 don\'t play play!',
        recruitment: 'Join 24, we control the east.',
        drug_deal: 'Got stuff, cheap price.',
        fight: '24! Attack!',
        retreat: 'Scatter!',
        victory: '24 wins!'
    },
    sakai: {
        greeting: 'Eh, you Malay or not?',
        threat: 'Sakai don\'t like outsiders.',
        recruitment: 'Join Sakai, we strong.',
        fight: 'Sakai! Attack!',
        retreat: 'Lari!',
        victory: 'Sakai menang!'
    },
    indian_gang: {
        greeting: 'Eh, you Indian or not?',
        threat: 'Don\'t mess with us!',
        recruitment: 'Join us, we take care.',
        fight: 'Attack!',
        retreat: 'Run!',
        victory: 'We win!'
    }
};

// Gang tags/graffiti
export const GangGraffiti = {
    salakau: ['369', 'Salakau', 'SK', '3-6-9', 'Salakau 369'],
    sio_kun_tong: ['SKT', 'Sio Kun Tong', 'Kun', 'SKT 99'],
    sio_lian_tong: ['SLT', 'Sio Lian Tong', 'Lian', 'SLT 88'],
    ang_soon_tong: ['AST', 'Ang Soon Tong', 'Soon', 'AST 77'],
    gang_36: ['36', 'Gang 36', '3-6', '36 99'],
    gang_24: ['24', 'Gang 24', '2-4', '24 88'],
    omega: ['Ω', 'Omega', 'Ωmega', 'Ω 66'],
    sakai: ['Sakai', 'S', 'Sakai 99', 'Sakai 88'],
    indian_gang: ['IG', 'Indian Gang', 'IG 99']
};

// Gang hangout spots (real Singapore locations)
export const GangHangouts = {
    salakau: [
        { name: 'Geylang Lorong 1-40', type: 'street', description: 'Notorious red-light district' },
        { name: 'Bugis Street', type: 'street', description: 'Shopping and nightlife area' },
        { name: 'Lavender Food Square', type: 'hawker', description: 'Hawker centre hangout' }
    ],
    sio_kun_tong: [
        { name: 'Toa Payoh Central', type: 'hdb_estate', description: 'HDB town centre' },
        { name: 'Bishan Junction 8', type: 'mall', description: 'Shopping mall' },
        { name: 'Ang Mo Kio Hub', type: 'mall', description: 'Shopping mall' }
    ],
    sio_lian_tong: [
        { name: 'Jurong East Mall', type: 'mall', description: 'Shopping mall' },
        { name: 'Clementi Mall', type: 'mall', description: 'Shopping mall' },
        { name: 'Bukit Batok Central', type: 'hdb_estate', description: 'HDB town centre' }
    ],
    ang_soon_tong: [
        { name: 'Chinatown Complex', type: 'hawker', description: 'Hawker centre' },
        { name: 'Temple Street', type: 'street', description: 'Chinatown street' },
        { name: 'Smith Street', type: 'street', description: 'Food street' }
    ],
    gang_36: [
        { name: 'Woodlands Checkpoint', type: 'checkpoint', description: 'Malaysia border' },
        { name: 'Causeway Point', type: 'mall', description: 'Shopping mall' },
        { name: 'Woodlands MRT', type: 'mrt', description: 'MRT station' }
    ],
    gang_24: [
        { name: 'Tampines Mall', type: 'mall', description: 'Shopping mall' },
        { name: 'Bedok Mall', type: 'mall', description: 'Shopping mall' },
        { name: 'Pasir Ris Mall', type: 'mall', description: 'Shopping mall' }
    ],
    omega: [
        { name: 'Orchard Road', type: 'shopping', description: 'Shopping belt' },
        { name: 'Somerset 313', type: 'mall', description: 'Shopping mall' },
        { name: 'ION Orchard', type: 'mall', description: 'Luxury mall' }
    ],
    sakai: [
        { name: 'Geylang Serai', type: 'market', description: 'Malay market' },
        { name: 'Kallang MRT', type: 'mrt', description: 'MRT station' },
        { name: 'MacPherson Road', type: 'street', description: 'Street' }
    ],
    indian_gang: [
        { name: 'Mustafa Centre', type: 'shopping', description: '24-hour shopping' },
        { name: 'Tekka Centre', type: 'hawker', description: 'Hawker centre' },
        { name: 'Serangoon Road', type: 'street', description: 'Little India main road' }
    ]
};

export function getGangInfo(gangName) {
    return SingaporeGangs[gangName] || null;
}

export function getGangByTerritory(territory) {
    return GangTerritories[territory] || [];
}

export function getGangBehavior(gangName) {
    return GangBehaviors[gangName] || null;
}

export function getGangGraffiti(gangName) {
    return GangGraffiti[gangName] || [];
}

export function getGangHangouts(gangName) {
    return GangHangouts[gangName] || [];
}

export function getAllGangs() {
    return Object.keys(SingaporeGangs);
}

export function getGangsByEthnicity(ethnicity) {
    return Object.entries(SingaporeGangs)
        .filter(([_, gang]) => gang.ethnicity === ethnicity)
        .map(([name, gang]) => ({ name, ...gang }));
}
