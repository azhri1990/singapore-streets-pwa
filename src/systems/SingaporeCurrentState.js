/**
 * Current State of Singapore (2026)
 * Government, developments, social issues, and current affairs
 */

export const SingaporeCurrentState = {
    government: {
        president: 'Tharman Shanmugaratnam',
        prime_minister: 'Lawrence Wong',
        deputy_pm: 'Gan Kim Yong',
        ruling_party: 'PAP (People\'s Action Party)',
        parliament_seats: 93,
        last_election: 2025,
        next_election: 2030
    },
    
    demographics: {
        population: 6000000,
        citizens: 3500000,
        permanent_residents: 500000,
        foreign_workers: 1500000,
        foreign_talent: 500000,
        median_age: 43,
        life_expectancy: 84,
        birth_rate: 0.97,
        ethnic_composition: {
            chinese: 0.74,
            malay: 0.135,
            indian: 0.09,
            others: 0.035
        }
    },
    
    economy: {
        gdp: 500000000000, // SGD
        gdp_growth: 2.5,
        unemployment: 2.0,
        inflation: 2.5,
        median_income: 5000, // SGD/month
        min_wage: null, // No minimum wage (progressive wage model)
        currency: 'SGD',
        exchange_rate_usd: 1.35
    },
    
    housing: {
        hdb_flats: 1100000,
        hdb_resale_median: 550000,
        bto_waiting_time: 3.5, // years
        home_ownership: 0.89,
        new_towns: ['Tengah', 'Punggol', 'Sengkang'],
        upgrading_programme: 'HIP (Home Improvement Programme)'
    },
    
    transport: {
        mrt_lines: 6,
        mrt_stations: 140,
        bus_services: 350,
        taxi_fleet: 12000,
        private_hire: 70000,
        coe_category_a: 90000,
        coe_category_b: 110000,
        erp_gantries: 90,
        autonomous_vehicles: 'trial_phase'
    },
    
    current_developments: {
        'tengah': {
            name: 'Tengah New Town',
            type: 'hdb_new_town',
            status: 'under_construction',
            description: 'Singapore\'s 24th HDB town, first car-free town centre',
            completion: 2027
        },
        'jurong_lake_district': {
            name: 'Jurong Lake District',
            type: 'cbd',
            status: 'under_development',
            description: 'Singapore\'s 2nd CBD',
            completion: 2030
        },
        'greater_southern_waterfront': {
            name: 'Greater Southern Waterfront',
            type: 'redevelopment',
            status: 'planning',
            description: 'Redevelopment of Tanjong Pagar port area',
            completion: 2040
        },
        'changi_terminal_5': {
            name: 'Changi Airport Terminal 5',
            type: 'airport',
            status: 'under_construction',
            description: 'New terminal to handle 50 million passengers',
            completion: 2030
        },
        'cross_island_line': {
            name: 'Cross Island Line',
            type: 'mrt',
            status: 'under_construction',
            description: 'New MRT line across the island',
            completion: 2030
        },
        'jurong_region_line': {
            name: 'Jurong Region Line',
            type: 'mrt',
            status: 'under_construction',
            description: 'New MRT line in western Singapore',
            completion: 2029
        }
    },
    
    current_issues: {
        'cost_of_living': {
            name: 'Cost of Living',
            severity: 'high',
            description: 'Rising housing, food, and transport costs',
            government_response: 'CDC vouchers, GST vouchers, housing grants'
        },
        'aging_population': {
            name: 'Aging Population',
            severity: 'high',
            description: 'Rising median age, declining birth rate',
            government_response: 'Baby bonuses, childcare subsidies, silver housing'
        },
        'foreign_workers': {
            name: 'Foreign Worker Management',
            severity: 'medium',
            description: 'Balancing foreign worker needs with local employment',
            government_response: 'Work permit regulations, fair consideration framework'
        },
        'climate_change': {
            name: 'Climate Change',
            severity: 'high',
            description: 'Rising sea levels, extreme weather',
            government_response: 'Coastal protection, green plan 2030'
        },
        'digital_transformation': {
            name: 'Digital Transformation',
            severity: 'medium',
            description: 'AI, automation, digital economy',
            government_response: 'Smart Nation initiative, SkillsFuture'
        }
    },
    
    current_events_2026: [
        'National Day Parade 2026 at Marina Bay',
        'Singapore F1 Grand Prix 2026',
        'Great Singapore Sale 2026',
        'Singapore Airshow 2026',
        'World Cities Summit 2026',
        'Singapore International Festival of Arts 2026',
        'Chingay Parade 2026',
        'Thaipusam 2026',
        'Hari Raya Puasa 2026',
        'Deepavali 2026',
        'Christmas in the Tropics 2026'
    ],
    
    current_prices_2026: {
        'chicken_rice': 4.50,
        'kopi': 1.50,
        'mrt_trip': 1.50,
        'taxi_flagdown': 4.10,
        'petrol_95': 2.85,
        'hdb_4room_resale': 550000,
        'condo_median': 1800000,
        'electricity_kwh': 0.28,
        'mobile_plan': 30,
        'netflix': 15,
        'spotify': 10
    },
    
    current_news_2026: [
        'Singapore GDP grows 2.5% in Q1 2026',
        'New MRT stations open on TEL',
        'HDB launches 15,000 BTO flats',
        'Singapore hosts World Cities Summit',
        'ERP 2.0 rollout begins',
        'Changi Airport Terminal 5 construction on track',
        'Singapore ranks #1 in global competitiveness',
        'New hawker centres open in Tengah',
        'Foreign worker dormitory standards upgraded',
        'Singapore Green Plan 2030 on track'
    ]
};

export function getCurrentState() {
    return SingaporeCurrentState;
}

export function getCurrentNews() {
    return SingaporeCurrentState.current_news_2026;
}

export function getCurrentEvents() {
    return SingaporeCurrentState.current_events_2026;
}

export function getCurrentPrice(item) {
    return SingaporeCurrentState.current_prices_2026[item] || null;
}

export function getGovernmentInfo() {
    return SingaporeCurrentState.government;
}

export function getDemographics() {
    return SingaporeCurrentState.demographics;
}

export function getEconomyInfo() {
    return SingaporeCurrentState.economy;
}

export function getHousingInfo() {
    return SingaporeCurrentState.housing;
}

export function getTransportInfo() {
    return SingaporeCurrentState.transport;
}

export function getCurrentDevelopments() {
    return SingaporeCurrentState.current_developments;
}

export function getCurrentIssues() {
    return SingaporeCurrentState.current_issues;
}
