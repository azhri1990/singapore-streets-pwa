/**
 * Singapore Jobs System
 * Real Singapore jobs, industries, and activities
 */

export const SingaporeJobs = {
    // Hawker & Food
    'hawker_assistant': {
        name: 'Hawker Assistant',
        location: 'hawker_centre',
        pay: { min: 8, max: 12, unit: 'per_hour', currency: 'SGD' },
        requirements: ['No experience needed', 'Must be able to handle heat'],
        description: 'Help at hawker stall - take orders, serve food, clean',
        shifts: ['morning', 'afternoon', 'evening'],
        uniforms: ['apron', 'cap'],
        tasks: ['take_orders', 'serve_food', 'clean_tables', 'wash_dishes'],
        tips: true
    },
    'food_delivery': {
        name: 'Food Delivery Rider',
        location: 'island_wide',
        pay: { min: 5, max: 8, unit: 'per_delivery', currency: 'SGD' },
        requirements: ['Motorcycle license', 'Smartphone'],
        description: 'Deliver food via GrabFood/Foodpanda/Deliveroo',
        shifts: ['flexible'],
        vehicle: 'motorcycle',
        tasks: ['pickup_food', 'deliver_to_customer', 'collect_payment'],
        tips: true
    },
    
    // Transport
    'taxi_driver': {
        name: 'Taxi Driver',
        location: 'island_wide',
        pay: { min: 15, max: 25, unit: 'per_hour', currency: 'SGD' },
        requirements: ['Taxi license', 'Clean driving record'],
        description: 'Drive taxi - pick up passengers, navigate to destinations',
        shifts: ['morning', 'afternoon', 'night'],
        vehicle: 'taxi',
        tasks: ['pickup_passenger', 'navigate', 'collect_fare', 'refuel'],
        tips: true
    },
    'bus_driver': {
        name: 'SBS Transit Bus Driver',
        location: 'fixed_route',
        pay: { min: 12, max: 18, unit: 'per_hour', currency: 'SGD' },
        requirements: ['Bus license', 'Clean record'],
        description: 'Drive public bus on fixed route',
        shifts: ['morning', 'afternoon', 'evening'],
        vehicle: 'bus',
        tasks: ['follow_route', 'stop_at_stops', 'collect_fares', 'announce_stops'],
        tips: false
    },
    'grab_driver': {
        name: 'Grab Driver',
        location: 'island_wide',
        pay: { min: 10, max: 20, unit: 'per_trip', currency: 'SGD' },
        requirements: ['Private hire car license', 'Smartphone'],
        description: 'Private hire driver via Grab/Gojek',
        shifts: ['flexible'],
        vehicle: 'private_car',
        tasks: ['accept_booking', 'pickup_passenger', 'navigate', 'rate_passenger'],
        tips: true
    },
    
    // Retail & Service
    'retail_assistant': {
        name: 'Retail Assistant',
        location: 'shopping_mall',
        pay: { min: 8, max: 12, unit: 'per_hour', currency: 'SGD' },
        requirements: ['No experience needed'],
        description: 'Work at retail store - sales, stocking, customer service',
        shifts: ['morning', 'afternoon', 'evening'],
        tasks: ['assist_customers', 'stock_shelves', 'operate_cashier', 'clean_store'],
        tips: false
    },
    'convenience_store': {
        name: 'Convenience Store Staff',
        location: 'hdb_estate',
        pay: { min: 7, max: 10, unit: 'per_hour', currency: 'SGD' },
        requirements: ['No experience needed'],
        description: 'Work at 7-Eleven/Cheers - cashier, stocking',
        shifts: ['morning', 'afternoon', 'night'],
        tasks: ['operate_cashier', 'stock_shelves', 'clean_store', 'handle_deliveries'],
        tips: false
    },
    
    // Office & Professional
    'office_admin': {
        name: 'Office Administrator',
        location: 'cbd',
        pay: { min: 12, max: 18, unit: 'per_hour', currency: 'SGD' },
        requirements: ['Diploma/Degree', 'Computer skills'],
        description: 'Office work - data entry, filing, correspondence',
        shifts: ['morning', 'afternoon'],
        tasks: ['data_entry', 'filing', 'email', 'phone_calls'],
        tips: false
    },
    'it_support': {
        name: 'IT Support',
        location: 'cbd',
        pay: { min: 15, max: 25, unit: 'per_hour', currency: 'SGD' },
        requirements: ['IT diploma/degree', 'Technical skills'],
        description: 'IT helpdesk - troubleshoot, repair, install',
        shifts: ['morning', 'afternoon', 'night'],
        tasks: ['troubleshoot', 'repair', 'install_software', 'user_support'],
        tips: false
    },
    
    // Construction & Manual
    'construction_worker': {
        name: 'Construction Worker',
        location: 'construction_site',
        pay: { min: 10, max: 15, unit: 'per_hour', currency: 'SGD' },
        requirements: ['Work permit (foreign) or Singaporean'],
        description: 'Construction work - building, lifting, site work',
        shifts: ['morning', 'afternoon'],
        tasks: ['carry_materials', 'assist_tradesmen', 'site_cleanup', 'safety_checks'],
        tips: false
    },
    'cleaner': {
        name: 'Cleaner',
        location: 'hdb_estate',
        pay: { min: 7, max: 10, unit: 'per_hour', currency: 'SGD' },
        requirements: ['No experience needed'],
        description: 'Cleaning - HDB common areas, offices, malls',
        shifts: ['morning', 'afternoon', 'night'],
        tasks: ['sweep', 'mop', 'trash_collection', 'toilet_cleaning'],
        tips: false
    },
    
    // Healthcare
    'nurse': {
        name: 'Nurse',
        location: 'hospital',
        pay: { min: 15, max: 25, unit: 'per_hour', currency: 'SGD' },
        requirements: ['Nursing diploma/degree', 'Registration'],
        description: 'Nursing - patient care, medication, monitoring',
        shifts: ['morning', 'afternoon', 'night'],
        tasks: ['patient_care', 'medication', 'vital_signs', 'documentation'],
        tips: false
    },
    
    // Education
    'tuition_teacher': {
        name: 'Tuition Teacher',
        location: 'tuition_centre',
        pay: { min: 20, max: 40, unit: 'per_hour', currency: 'SGD' },
        requirements: ['Degree', 'Teaching experience'],
        description: 'Teach tuition - primary, secondary, JC students',
        shifts: ['afternoon', 'evening'],
        tasks: ['teach', 'mark_papers', 'prepare_lessons', 'parent_communication'],
        tips: false
    },
    
    // Entertainment
    'dj': {
        name: 'Club DJ',
        location: 'club',
        pay: { min: 50, max: 200, unit: 'per_night', currency: 'SGD' },
        requirements: ['DJ skills', 'Music knowledge'],
        description: 'Play music at clubs - Clarke Quay, Zouk, etc.',
        shifts: ['night'],
        tasks: ['mix_music', 'read_crowd', 'take_requests', 'promote_events'],
        tips: true
    },
    
    // Government
    'postman': {
        name: 'Postman',
        location: 'hdb_estate',
        pay: { min: 10, max: 14, unit: 'per_hour', currency: 'SGD' },
        requirements: ['No experience needed', 'Bicycle license'],
        description: 'Deliver mail - HDB blocks, offices',
        shifts: ['morning', 'afternoon'],
        vehicle: 'bicycle',
        tasks: ['sort_mail', 'deliver_letters', 'collect_parcels', 'update_records'],
        tips: false
    }
};

export const SingaporeActivities = {
    // Leisure
    'hawker_eating': {
        name: 'Eat at Hawker Centre',
        location: 'hawker_centre',
        cost: { min: 3, max: 8, currency: 'SGD' },
        description: 'Eat chicken rice, laksa, char kway teow, etc.',
        effects: ['+health', '+happiness', '+energy'],
        duration: 30
    },
    'shopping': {
        name: 'Shopping',
        location: 'shopping_mall',
        cost: { min: 20, max: 500, currency: 'SGD' },
        description: 'Shop at Orchard Road, VivoCity, ION',
        effects: ['+happiness', '-money'],
        duration: 60
    },
    'gym': {
        name: 'Gym Session',
        location: 'gym',
        cost: { min: 5, max: 15, currency: 'SGD' },
        description: 'Workout at ActiveSG gym',
        effects: ['+health', '+stamina', '+strength'],
        duration: 60
    },
    'park_visit': {
        name: 'Visit Park',
        location: 'park',
        cost: { min: 0, max: 0, currency: 'SGD' },
        description: 'Visit Gardens by the Bay, Botanic Gardens, East Coast Park',
        effects: ['+happiness', '+health'],
        duration: 45
    },
    'movie': {
        name: 'Watch Movie',
        location: 'cinema',
        cost: { min: 10, max: 15, currency: 'SGD' },
        description: 'Watch movie at GV, Cathay, Shaw',
        effects: ['+happiness', '-money', '+relaxation'],
        duration: 120
    },
    'karaoke': {
        name: 'Karaoke',
        location: 'ktv',
        cost: { min: 20, max: 50, currency: 'SGD' },
        description: 'Sing at KTV - Party World, Teo Heng',
        effects: ['+happiness', '+social', '-money'],
        duration: 120
    },
    'bubble_tea': {
        name: 'Bubble Tea',
        location: 'hawker_centre',
        cost: { min: 3, max: 6, currency: 'SGD' },
        description: 'Drink bubble tea - Koi, Gong Cha, LiHo',
        effects: ['+energy', '+happiness'],
        duration: 15
    },
    'beer': {
        name: 'Drink Beer',
        location: 'hawker_centre',
        cost: { min: 5, max: 8, currency: 'SGD' },
        description: 'Drink Tiger Beer at hawker centre',
        effects: ['+happiness', '-money', '+relaxation'],
        duration: 30
    },
    
    // Transport
    'mrt_ride': {
        name: 'Take MRT',
        location: 'mrt_station',
        cost: { min: 1, max: 3, currency: 'SGD' },
        description: 'Ride MRT - NSL, EWL, CCL, NEL, DTL',
        effects: ['-money', '+transport'],
        duration: 20
    },
    'bus_ride': {
        name: 'Take Bus',
        location: 'bus_stop',
        cost: { min: 1, max: 2, currency: 'SGD' },
        description: 'Ride SBS/SMRT bus',
        effects: ['-money', '+transport'],
        duration: 30
    },
    'taxi_ride': {
        name: 'Take Taxi',
        location: 'anywhere',
        cost: { min: 5, max: 30, currency: 'SGD' },
        description: 'Take Comfort/DelGro taxi',
        effects: ['-money', '+transport', '+comfort'],
        duration: 20
    },
    
    // Government
    'pay_erp': {
        name: 'Pay ERP',
        location: 'erp_gantry',
        cost: { min: 0.5, max: 5, currency: 'SGD' },
        description: 'Pay Electronic Road Pricing',
        effects: ['-money'],
        duration: 1
    },
    'pay_fine': {
        name: 'Pay Fine',
        location: 'police_station',
        cost: { min: 50, max: 2000, currency: 'SGD' },
        description: 'Pay traffic fine at police station',
        effects: ['-money', '-wanted'],
        duration: 15
    },
    'renew_license': {
        name: 'Renew Driving License',
        location: 'tp_headquarters',
        cost: { min: 50, max: 50, currency: 'SGD' },
        description: 'Renew driving license at TP',
        effects: ['-money', '+license'],
        duration: 30
    }
};

export const SingaporeEvents = {
    'national_day': {
        name: 'National Day',
        date: 'August 9',
        description: 'Singapore National Day Parade at Marina Bay',
        effects: ['fireworks', 'parade', 'increased_traffic', 'road_closures'],
        duration: 1440 // 24 hours
    },
    'chinese_new_year': {
        name: 'Chinese New Year',
        date: 'January/February',
        description: 'CNY celebrations in Chinatown',
        effects: ['chinatown_decorations', 'increased_traffic', 'hawker_specials'],
        duration: 2880 // 2 days
    },
    'hari_raya': {
        name: 'Hari Raya Puasa',
        date: 'Variable',
        description: 'Malay celebrations in Geylang',
        effects: ['geylang_decorations', 'food_stalls', 'increased_traffic'],
        duration: 1440
    },
    'deepavali': {
        name: 'Deepavali',
        date: 'October/November',
        description: 'Indian festival of lights in Little India',
        effects: ['little_india_decorations', 'lights', 'increased_traffic'],
        duration: 1440
    },
    'f1_grand_prix': {
        name: 'Singapore F1 Grand Prix',
        date: 'September',
        description: 'Formula 1 night race at Marina Bay',
        effects: ['road_closures', 'increased_traffic', 'noise', 'tourists'],
        duration: 4320 // 3 days
    },
    'great_singapore_sale': {
        name: 'Great Singapore Sale',
        date: 'June-August',
        description: 'Island-wide shopping sale',
        effects: ['shopping_discounts', 'increased_traffic', 'crowds'],
        duration: 86400 // 60 days
    },
    'hungry_ghost': {
        name: 'Hungry Ghost Festival',
        date: 'August/September',
        description: 'Chinese seventh month - getai, offerings',
        effects: ['getai_performances', 'roadside_offerings', 'increased_traffic'],
        duration: 4320 // 3 days
    }
};

export function getJobInfo(jobName) {
    return SingaporeJobs[jobName] || null;
}

export function getActivityInfo(activityName) {
    return SingaporeActivities[activityName] || null;
}

export function getEventInfo(eventName) {
    return SingaporeEvents[eventName] || null;
}

export function getJobsByLocation(location) {
    return Object.entries(SingaporeJobs)
        .filter(([_, job]) => job.location === location)
        .map(([name, job]) => ({ name, ...job }));
}

export function getActivitiesByLocation(location) {
    return Object.entries(SingaporeActivities)
        .filter(([_, activity]) => activity.location === location)
        .map(([name, activity]) => ({ name, ...activity }));
}
