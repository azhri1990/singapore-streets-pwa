/**
 * Singapore Crime, Incidents, Behavior & Attitude System
 * Based on actual Singapore crime statistics and social behaviors
 */

// Singapore Crime Types (based on actual Singapore Penal Code)
export const SingaporeCrimes = {
    // Property Crimes
    'theft': {
        name: 'Theft',
        section: 'Penal Code 379',
        penalty: 'imprisonment up to 3 years, or fine, or both',
        description: 'Stealing property',
        locations: ['shopping_malls', 'hdb_common', 'public_transport'],
        frequency: 'common',
        wantedLevel: 1
    },
    'robbery': {
        name: 'Robbery',
        section: 'Penal Code 392',
        penalty: 'imprisonment 2-10 years, caning',
        description: 'Theft with force or threat',
        locations: ['atm', 'late_night', 'isolated_areas'],
        frequency: 'uncommon',
        wantedLevel: 3
    },
    'housebreaking': {
        name: 'Housebreaking',
        section: 'Penal Code 448-451',
        penalty: 'imprisonment up to 14 years',
        description: 'Breaking into HDB, condo, or house',
        locations: ['hdb_estate', 'condo', 'landed_property'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    'motor_vehicle_theft': {
        name: 'Motor Vehicle Theft',
        section: 'Penal Code 379A',
        penalty: 'imprisonment up to 7 years',
        description: 'Stealing cars, motorcycles, bicycles',
        locations: ['carparks', 'roadside', 'hdb_carpark'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    
    // Violent Crimes
    'assault': {
        name: 'Assault',
        section: 'Penal Code 323',
        penalty: 'imprisonment up to 2 years, or fine up to $5000, or both',
        description: 'Causing hurt',
        locations: ['bars', 'clubs', 'public_places'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    'grievous_hurt': {
        name: 'Grievous Hurt',
        section: 'Penal Code 325',
        penalty: 'imprisonment up to 10 years, caning',
        description: 'Causing serious injury',
        locations: ['fights', 'gang_conflicts'],
        frequency: 'rare',
        wantedLevel: 3
    },
    'murder': {
        name: 'Murder',
        section: 'Penal Code 300',
        penalty: 'Death penalty (mandatory)',
        description: 'Intentional killing',
        locations: ['anywhere'],
        frequency: 'very_rare',
        wantedLevel: 5
    },
    'culpable_homicide': {
        name: 'Culpable Homicide',
        section: 'Penal Code 299',
        penalty: 'Imprisonment for life, or up to 20 years, caning',
        description: 'Causing death without intent',
        locations: ['traffic_accidents', 'fights'],
        frequency: 'rare',
        wantedLevel: 4
    },
    
    // Sexual Crimes
    'outrage_of_modesty': {
        name: 'Outrage of Modesty',
        section: 'Penal Code 354',
        penalty: 'imprisonment up to 2 years, or fine, or caning, or both',
        description: 'Molestation, inappropriate touching',
        locations: ['public_transport', 'shopping_malls', 'nightclubs'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    'rape': {
        name: 'Rape',
        section: 'Penal Code 375',
        penalty: 'imprisonment up to 20 years, caning',
        description: 'Sexual assault',
        locations: ['anywhere'],
        frequency: 'rare',
        wantedLevel: 4
    },
    'voyeurism': {
        name: 'Voyeurism',
        section: 'Penal Code 377BB',
        penalty: 'imprisonment up to 2 years',
        description: 'Taking photos/videos of private acts',
        locations: ['toilets', 'changing_rooms', 'private_spaces'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    
    // Drug Crimes
    'drug_possession': {
        name: 'Drug Possession',
        section: 'Misuse of Drugs Act',
        penalty: 'imprisonment up to 10 years, caning, fine',
        description: 'Possession of controlled drugs',
        locations: ['anywhere'],
        frequency: 'uncommon',
        wantedLevel: 3
    },
    'drug_trafficking': {
        name: 'Drug Trafficking',
        section: 'Misuse of Drugs Act',
        penalty: 'Death penalty (mandatory for certain quantities)',
        description: 'Trafficking controlled drugs',
        locations: ['anywhere'],
        frequency: 'rare',
        wantedLevel: 5
    },
    'drug_consumption': {
        name: 'Drug Consumption',
        section: 'Misuse of Drugs Act',
        penalty: 'imprisonment up to 10 years, fine up to $20000',
        description: 'Consuming controlled drugs',
        locations: ['anywhere'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    
    // Public Order Crimes
    'vandalism': {
        name: 'Vandalism',
        section: 'Vandalism Act',
        penalty: 'imprisonment up to 3 years, or fine up to $2000, caning',
        description: 'Damaging property, graffiti',
        locations: ['public_places', 'hdb_common', 'mrt_stations'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    'rioting': {
        name: 'Rioting',
        section: 'Penal Code 147',
        penalty: 'imprisonment up to 7 years, caning',
        description: 'Unlawful assembly with violence',
        locations: ['public_places', 'nightlife_areas'],
        frequency: 'rare',
        wantedLevel: 4
    },
    'unlawful_assembly': {
        name: 'Unlawful Assembly',
        section: 'Penal Code 141',
        penalty: 'imprisonment up to 2 years, or fine, or both',
        description: 'Assembly of 5+ persons with common unlawful purpose',
        locations: ['public_places'],
        frequency: 'rare',
        wantedLevel: 2
    },
    
    // Traffic Crimes
    'drunk_driving': {
        name: 'Drunk Driving',
        section: 'Road Traffic Act',
        penalty: 'Fine up to $5000, imprisonment up to 6 months, license suspension',
        description: 'Driving under influence of alcohol',
        locations: ['roads', 'expressways'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    'dangerous_driving': {
        name: 'Dangerous Driving',
        section: 'Road Traffic Act',
        penalty: 'Fine up to $5000, imprisonment up to 12 months',
        description: 'Reckless or dangerous driving',
        locations: ['roads', 'expressways'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    'hit_and_run': {
        name: 'Hit and Run',
        section: 'Road Traffic Act',
        penalty: 'Fine up to $3000, imprisonment up to 12 months',
        description: 'Leaving accident scene',
        locations: ['roads'],
        frequency: 'uncommon',
        wantedLevel: 3
    },
    
    // Other Crimes
    'cheating': {
        name: 'Cheating',
        section: 'Penal Code 420',
        penalty: 'imprisonment up to 10 years, fine',
        description: 'Fraud, scams, deception',
        locations: ['online', 'phone', 'public_places'],
        frequency: 'common',
        wantedLevel: 1
    },
    'criminal_breach_of_trust': {
        name: 'Criminal Breach of Trust',
        section: 'Penal Code 409',
        penalty: 'imprisonment up to 20 years, fine',
        description: 'Misappropriation of property',
        locations: ['workplace', 'business'],
        frequency: 'uncommon',
        wantedLevel: 2
    },
    'money_laundering': {
        name: 'Money Laundering',
        section: 'Corruption, Drug Trafficking and Other Serious Crimes Act',
        penalty: 'imprisonment up to 10 years, fine up to $500000',
        description: 'Laundering proceeds of crime',
        locations: ['financial_institutions', 'businesses'],
        frequency: 'rare',
        wantedLevel: 3
    }
};

// Singapore Accidents
export const SingaporeAccidents = {
    'traffic_accident_minor': {
        name: 'Minor Traffic Accident',
        description: 'Fender bender, no injuries',
        locations: ['roads', 'carparks'],
        frequency: 'common',
        response: 'police_report',
        fine: 0
    },
    'traffic_accident_major': {
        name: 'Major Traffic Accident',
        description: 'Serious collision with injuries',
        locations: ['expressways', 'junctions'],
        frequency: 'uncommon',
        response: 'police_ambulance',
        fine: 0
    },
    'workplace_accident': {
        name: 'Workplace Accident',
        description: 'Construction or factory accident',
        locations: ['construction_site', 'factory'],
        frequency: 'uncommon',
        response: 'scdf_ambulance',
        fine: 0
    },
    'slip_and_fall': {
        name: 'Slip and Fall',
        description: 'Slipping in public area',
        locations: ['shopping_malls', 'hdb_common', 'wet_floors'],
        frequency: 'common',
        response: 'first_aid',
        fine: 0
    },
    'drowning': {
        name: 'Drowning',
        description: 'Drowning at beach or pool',
        locations: ['beaches', 'swimming_pools', 'reservoirs'],
        frequency: 'rare',
        response: 'scdf_rescue',
        fine: 0
    },
    'fire': {
        name: 'Fire',
        description: 'Building or vehicle fire',
        locations: ['hdb', 'commercial', 'industrial'],
        frequency: 'uncommon',
        response: 'scdf_fire',
        fine: 0
    },
    'flash_flood': {
        name: 'Flash Flood',
        description: 'Sudden flooding during heavy rain',
        locations: ['orchard', 'bukit_timah', 'low_lying_areas'],
        frequency: 'seasonal',
        response: 'scdf_rescue',
        fine: 0
    }
};

// Singapore Social Behaviors & Attitudes
export const SingaporeBehaviors = {
    'kiasu': {
        name: 'Kiasu',
        description: 'Afraid to lose - queuing early, grabbing freebies, competitive',
        manifestations: [
            'Queuing 2 hours for free samples',
            'Rushing for MRT seats',
            'Grabbing all free tissue packets',
            'Booking multiple hawker tables',
            'Choping (reserving) seats with tissue packets'
        ],
        frequency: 'very_common'
    },
    'kiasi': {
        name: 'Kiasi',
        description: 'Afraid to die - overly cautious, safety-conscious',
        manifestations: [
            'Wearing mask in crowded places',
            'Avoiding certain foods',
            'Over-sanitizing',
            'Avoiding risky activities',
            'Checking food expiry dates obsessively'
        ],
        frequency: 'common'
    },
    'chope': {
        name: 'Chope',
        description: 'Reserving seats with personal items',
        manifestations: [
            'Tissue packet on table',
            'Umbrella on chair',
            'Bag on seat',
            'Newspaper on table'
        ],
        frequency: 'very_common'
    },
    'queueing': {
        name: 'Queueing Culture',
        description: 'Singaporeans love to queue',
        manifestations: [
            'Queuing for food (30+ min)',
            'Queuing for new iPhone',
            'Queuing for freebies',
            'Queuing for MRT',
            'Queueing culture at hawker centres'
        ],
        frequency: 'very_common'
    },
    'complaining': {
        name: 'Complaining',
        description: 'Singaporeans love to complain',
        manifestations: [
            'Complaining about weather',
            'Complaining about MRT delays',
            'Complaining about prices',
            'Complaining about queues',
            'Complaining about foreigners'
        ],
        frequency: 'very_common'
    },
    'food_obsession': {
        name: 'Food Obsession',
        description: 'Singaporeans are obsessed with food',
        manifestations: [
            'Discussing where to eat',
            'Queueing for famous food',
            'Rating hawker stalls',
            'Food Instagram posts',
            'Debating best chicken rice'
        ],
        frequency: 'very_common'
    },
    'saving_money': {
        name: 'Saving Money',
        description: 'Frugal habits',
        manifestations: [
            'Using CDC vouchers',
            'Comparing prices',
            'Buying in bulk',
            'Using public transport',
            'Eating at hawker centres'
        ],
        frequency: 'common'
    },
    'punctuality': {
        name: 'Punctuality',
        description: 'Being on time is important',
        manifestations: [
            'Arriving early for appointments',
            'MRT punctuality expectations',
            'Work start time strictness',
            'School punctuality'
        ],
        frequency: 'common'
    }
};

// Singapore Social Incidents
export const SingaporeIncidents = {
    'public_disturbance': {
        name: 'Public Disturbance',
        description: 'Loud argument or fight in public',
        locations: ['hawker_centres', 'shopping_malls', 'mrt_stations'],
        frequency: 'common',
        response: 'police'
    },
    'mrt_delay': {
        name: 'MRT Delay',
        description: 'Train service disruption',
        locations: ['mrt_stations'],
        frequency: 'uncommon',
        response: 'lta_smrt',
        effects: ['increased_traffic', 'crowded_buses']
    },
    'flash_flood': {
        name: 'Flash Flood',
        description: 'Sudden flooding during heavy rain',
        locations: ['orchard', 'bukit_timah', 'low_lying'],
        frequency: 'seasonal',
        response: 'scdf_p PUB',
        effects: ['road_closures', 'traffic_diversion']
    },
    ' haze': {
        name: 'Haze',
        description: 'Transboundary haze from Indonesia',
        locations: ['island_wide'],
        frequency: 'seasonal',
        response: 'nea_advisory',
        effects: ['health_advisory', 'school_closures', 'outdoor_restrictions']
    },
    'power_outage': {
        name: 'Power Outage',
        description: 'Electricity disruption',
        locations: ['hdb_estate', 'commercial'],
        frequency: 'rare',
        response: 'sp_power',
        effects: ['traffic_lights_down', 'business_disruption']
    },
    'water_disruption': {
        name: 'Water Disruption',
        description: 'Water supply interruption',
        locations: ['hdb_estate'],
        frequency: 'rare',
        response: 'pub',
        effects: ['water_tankers', 'boil_water_advisory']
    }
};

// Singapore X-Rated/Adult Content (Legal but regulated)
export const SingaporeAdultContent = {
    'geylang_red_light': {
        name: 'Geylang Red Light District',
        location: 'geylang',
        description: 'Legal prostitution in designated area',
        laws: 'Prostitution is legal but soliciting is illegal',
        age_restriction: '18+',
        operating_hours: 'Evening to late night',
        restrictions: ['No soliciting', 'No minors', 'Health checks required', 'Designated areas only']
    },
    'nightlife': {
        name: 'Nightlife Entertainment',
        location: 'clarke_quay, orchard, marina_bay',
        description: 'Clubs, bars, KTVs',
        laws: 'Licensed entertainment venues',
        age_restriction: '18+',
        operating_hours: 'Evening to 3am',
        restrictions: ['ID check', 'No drugs', 'No fighting', 'Licensed venues only']
    },
    'adult_entertainment': {
        name: 'Adult Entertainment',
        location: 'geylang, orchard',
        description: 'KTVs, massage parlors (licensed)',
        laws: 'Strictly regulated, licensed only',
        age_restriction: '18+ (21+ for some)',
        operating_hours: 'Varies',
        restrictions: ['Licensed only', 'No unlicensed massage', 'Health regulations']
    }
};

// Singapore Social Issues
export const SingaporeSocialIssues = {
    'foreign_workers': {
        name: 'Foreign Worker Issues',
        description: 'Issues related to foreign workers in Singapore',
        topics: [
            'Work permit conditions',
            'Dormitory living conditions',
            'Remittance to home countries',
            'Language barriers',
            'Cultural integration',
            'Salary disputes',
            'Working hours'
        ],
        locations: ['construction_sites', 'dormitories', 'industrial_areas'],
        frequency: 'common'
    },
    'housing': {
        name: 'Housing Issues',
        description: 'HDB-related social issues',
        topics: [
            'HDB resale prices',
            'BTO waiting times',
            'Elderly housing',
            'Foreigner housing restrictions',
            'Renovation disputes',
            'Neighbour disputes'
        ],
        locations: ['hdb_estates'],
        frequency: 'common'
    },
    'transport': {
        name: 'Transport Issues',
        description: 'Public transport and traffic issues',
        topics: [
            'MRT breakdowns',
            'Bus delays',
            'ERP rates',
            'COE prices',
            'Traffic congestion',
            'Parking issues'
        ],
        locations: ['mrt_stations', 'bus_stops', 'roads'],
        frequency: 'common'
    },
    'cost_of_living': {
        name: 'Cost of Living',
        description: 'Rising costs in Singapore',
        topics: [
            'Housing costs',
            'Food prices',
            'Transport costs',
            'Healthcare costs',
            'Education costs',
            'Utility bills'
        ],
        frequency: 'very_common'
    }
};

export function getCrimeInfo(crimeType) {
    return SingaporeCrimes[crimeType] || null;
}

export function getAccidentInfo(accidentType) {
    return SingaporeAccidents[accidentType] || null;
}

export function getBehaviorInfo(behaviorType) {
    return SingaporeBehaviors[behaviorType] || null;
}

export function getIncidentInfo(incidentType) {
    return SingaporeIncidents[incidentType] || null;
}

export function getAdultContentInfo(contentType) {
    return SingaporeAdultContent[contentType] || null;
}

export function getSocialIssueInfo(issueType) {
    return SingaporeSocialIssues[issueType] || null;
}
