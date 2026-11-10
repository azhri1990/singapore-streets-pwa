/**
 * Singapore Emergency Response Protocols
 * Based on actual SCDF and SPF response procedures
 */

// SCDF Response Times (based on actual Singapore standards)
export const SCDF_ResponseTimes = {
    'fire': {
        name: 'Fire Emergency',
        targetResponse: 8, // minutes
        priority: 'P1',
        description: 'Fire engine response within 8 minutes',
        activation: 'Immediate dispatch on call',
        units: ['fire_engine', 'ambulance', 'rescue_vehicle'],
        personnel: 8
    },
    'medical': {
        name: 'Medical Emergency',
        targetResponse: 8, // minutes (ambulance)
        priority: 'P1',
        description: 'Ambulance response within 8 minutes',
        activation: 'Immediate dispatch on call',
        units: ['ambulance'],
        personnel: 3
    },
    'rescue': {
        name: 'Rescue Operation',
        targetResponse: 12, // minutes
        priority: 'P1',
        description: 'Rescue vehicle response within 12 minutes',
        activation: 'Dispatch on verification',
        units: ['rescue_vehicle', 'fire_engine'],
        personnel: 6
    },
    'hazmat': {
        name: 'Hazmat Incident',
        targetResponse: 15, // minutes
        priority: 'P1',
        description: 'Hazmat team response within 15 minutes',
        activation: 'Dispatch on verification',
        units: ['hazmat_vehicle', 'fire_engine', 'ambulance'],
        personnel: 10
    },
    'false_alarm': {
        name: 'False Alarm',
        targetResponse: 15, // minutes
        priority: 'P3',
        description: 'Response within 15 minutes',
        activation: 'Dispatch after verification',
        units: ['fire_engine'],
        personnel: 4
    }
};

// SPF Response Times
export const SPF_ResponseTimes = {
    'emergency': {
        name: 'Emergency (999)',
        targetResponse: 15, // minutes for patrol car
        priority: 'P1',
        description: 'Patrol car response within 15 minutes',
        activation: 'Immediate dispatch',
        units: ['patrol_car', 'motorcycle'],
        personnel: 2
    },
    'urgent': {
        name: 'Urgent',
        targetResponse: 30, // minutes
        priority: 'P2',
        description: 'Response within 30 minutes',
        activation: 'Dispatch after triage',
        units: ['patrol_car'],
        personnel: 2
    },
    'routine': {
        name: 'Routine',
        targetResponse: 60, // minutes
        priority: 'P3',
        description: 'Response within 60 minutes',
        activation: 'Dispatch when available',
        units: ['patrol_car'],
        personnel: 2
    },
    'investigation': {
        name: 'Investigation',
        targetResponse: 120, // minutes
        priority: 'P4',
        description: 'Investigation within 2 hours',
        activation: 'Scheduled',
        units: ['investigation_team'],
        personnel: 3
    }
};

// SCDF Activation Protocols
export const SCDF_Activation = {
    'fire_alarm': {
        steps: [
            '1. Receive call via 995',
            '2. Verify location and nature',
            '3. Dispatch nearest fire station',
            '4. Send alert to station',
            '5. Fire engine deploys within 1 minute',
            '6. En route to scene',
            '7. Arrive within 8 minutes'
        ],
        timeToDispatch: 30, // seconds
        timeToDeploy: 60 // seconds
    },
    'medical': {
        steps: [
            '1. Receive call via 995',
            '2. Triage by medical dispatcher',
            '3. Dispatch nearest ambulance',
            '4. Ambulance deploys within 1 minute',
            '5. En route to scene',
            '6. Arrive within 8 minutes',
            '7. Paramedic assessment on scene'
        ],
        timeToDispatch: 30,
        timeToDeploy: 60
    },
    'rescue': {
        steps: [
            '1. Receive call via 995',
            '2. Verify rescue type',
            '3. Dispatch rescue vehicle + fire engine',
            '4. Deploy within 2 minutes',
            '5. En route to scene',
            '6. Arrive within 12 minutes',
            '7. Begin rescue operation'
        ],
        timeToDispatch: 45,
        timeToDeploy: 120
    }
};

// SPF Activation Protocols
export const SPF_Activation = {
    'emergency_999': {
        steps: [
            '1. Receive call via 999',
            '2. Verify incident details',
            '3. Dispatch nearest patrol car',
            '4. Send alert to division',
            '5. Patrol car deploys within 2 minutes',
            '6. En route to scene',
            '7. Arrive within 15 minutes'
        ],
        timeToDispatch: 30,
        timeToDeploy: 120
    },
    'crime_in_progress': {
        steps: [
            '1. Receive report',
            '2. Verify crime type',
            '3. Dispatch multiple units',
            '4. Set up perimeter',
            '5. Arrive within 10 minutes',
            '6. Secure scene',
            '7. Investigate'
        ],
        timeToDispatch: 20,
        timeToDeploy: 60
    },
    'traffic_accident': {
        steps: [
            '1. Receive report',
            '2. Dispatch Traffic Police',
            '3. Dispatch ambulance if needed',
            '4. Arrive within 15 minutes',
            '5. Secure scene',
            '6. Investigate and clear'
        ],
        timeToDispatch: 30,
        timeToDeploy: 90
    }
};

// Singapore Tactical Formations
export const TacticalFormations = {
    'police': {
        'patrol': {
            name: 'Patrol Formation',
            description: 'Standard two-officer patrol',
            positions: ['lead', 'cover'],
            spacing: 3, // meters
            roles: ['driver', 'passenger']
        },
        'chase': {
            name: 'Pursuit Formation',
            description: 'Multiple units in pursuit',
            positions: ['lead', 'support1', 'support2'],
            spacing: 10,
            roles: ['primary', 'backup', 'backup']
        },
        'roadblock': {
            name: 'Roadblock Formation',
            description: 'Barrier across road',
            positions: ['left', 'center', 'right'],
            spacing: 5,
            roles: ['barrier', 'officer', 'officer']
        },
        'perimeter': {
            name: 'Perimeter Formation',
            description: 'Secure area perimeter',
            positions: ['north', 'south', 'east', 'west'],
            spacing: 20,
            roles: ['officer', 'officer', 'officer', 'officer']
        },
        'entry': {
            name: 'Entry Formation',
            description: 'Building entry',
            positions: ['point', 'cover', 'rear'],
            spacing: 2,
            roles: ['entry', 'cover', 'backup']
        }
    },
    'scdf': {
        'fire_attack': {
            name: 'Fire Attack Formation',
            description: 'Firefighting team formation',
            positions: ['nozzle', 'backup', 'safety'],
            spacing: 5,
            roles: ['nozzleman', 'backup', 'safety_officer']
        },
        'rescue': {
            name: 'Rescue Formation',
            description: 'Search and rescue formation',
            positions: ['lead', 'search1', 'search2'],
            spacing: 3,
            roles: ['team_leader', 'searcher', 'searcher']
        },
        'medical': {
            name: 'Medical Response Formation',
            description: 'Medical team formation',
            positions: ['paramedic', 'emt'],
            spacing: 2,
            roles: ['paramedic', 'emt']
        }
    }
};

// Singapore Response Activation Procedures
export const ActivationProcedures = {
    'spf': {
        'emergency_call': {
            name: '999 Emergency Call',
            steps: [
                { step: 1, action: 'Receive call', time: 5, description: 'Operator answers within 5 seconds' },
                { step: 2, action: 'Verify details', time: 30, description: 'Confirm location, nature, caller info' },
                { step: 3, action: 'Classify priority', time: 10, description: 'P1/P2/P3/P4 classification' },
                { step: 4, action: 'Dispatch unit', time: 20, description: 'Nearest patrol car dispatched' },
                { step: 5, action: 'Unit acknowledges', time: 10, description: 'Unit confirms receipt' },
                { step: 6, action: 'En route', time: 0, description: 'Unit proceeds to scene' },
                { step: 7, action: 'Arrive on scene', time: 900, description: 'Target: within 15 minutes' }
            ],
            totalTime: 975 // seconds (16.25 min max)
        },
        'crime_in_progress': {
            name: 'Crime In Progress',
            steps: [
                { step: 1, action: 'Receive report', time: 5, description: 'Operator receives call' },
                { step: 2, action: 'Verify threat', time: 15, description: 'Assess threat level' },
                { step: 3, action: 'Dispatch multiple units', time: 20, description: '2-3 patrol cars + motorcycle' },
                { step: 4, action: 'Set up perimeter', time: 30, description: 'Cordon off area' },
                { step: 5, action: 'Arrive on scene', time: 600, description: 'Target: within 10 minutes' },
                { step: 6, action: 'Secure scene', time: 0, description: 'Apprehend suspects' }
            ],
            totalTime: 670
        }
    },
    'scdf': {
        'fire_emergency': {
            name: 'Fire Emergency',
            steps: [
                { step: 1, action: 'Receive call', time: 5, description: 'Operator answers 995' },
                { step: 2, action: 'Verify location', time: 15, description: 'Confirm address and fire type' },
                { step: 3, action: 'Dispatch station', time: 20, description: 'Nearest fire station alerted' },
                { step: 4, action: 'Fire engine deploys', time: 60, description: 'Engine leaves station' },
                { step: 5, action: 'En route', time: 0, description: 'Proceeding to scene' },
                { step: 6, action: 'Arrive on scene', time: 480, description: 'Target: within 8 minutes' },
                { step: 7, action: 'Begin firefighting', time: 0, description: 'Attack fire' }
            ],
            totalTime: 580
        },
        'medical_emergency': {
            name: 'Medical Emergency',
            steps: [
                { step: 1, action: 'Receive call', time: 5, description: 'Operator answers 995' },
                { step: 2, action: 'Medical triage', time: 30, description: 'Dispatcher assesses priority' },
                { step: 3, action: 'Dispatch ambulance', time: 20, description: 'Nearest ambulance alerted' },
                { step: 4, action: 'Ambulance deploys', time: 60, description: 'Ambulance leaves station' },
                { step: 5, action: 'En route', time: 0, description: 'Proceeding to scene' },
                { step: 6, action: 'Arrive on scene', time: 480, description: 'Target: within 8 minutes' },
                { step: 7, action: 'Paramedic assessment', time: 0, description: 'Begin patient care' }
            ],
            totalTime: 605
        }
    }
};

// Singapore Tactical Communication Protocols
export const TacticalComms = {
    // Standard police radio phrases
    police: {
        'code_0': 'Officer needs help',
        'code_1': 'Signal weak',
        'code_2': 'Signal good',
        'code_3': 'Emergency traffic',
        'code_4': 'No further assistance needed',
        'code_5': 'Relay message',
        'code_6': 'Change to channel',
        'code_7': 'Out of service',
        'code_8': 'In service',
        'code_9': 'Repeat',
        'code_10': 'Fight in progress',
        'code_11': 'Dog case',
        'code_12': 'Alarm sounding',
        'code_13': 'Weather/road report',
        'code_14': 'Suspicious person',
        'code_15': 'Civil disturbance',
        'code_16': 'Domestic problem',
        'code_17': 'Meet complainant',
        'code_18': 'Urgent',
        'code_19': 'Return to station',
        'code_20': 'Location',
        'code_21': 'Call by telephone',
        'code_22': 'Disregard',
        'code_23': 'Arrived at scene',
        'code_24': 'Assignment completed',
        'code_25': 'Report in person',
        'code_26': 'Detaining subject',
        'code_27': 'Driver\'s license check',
        'code_28': 'Vehicle registration check',
        'code_29': 'Check for warrants',
        'code_30': 'Unnecessary use of radio',
        'code_31': 'Crime in progress',
        'code_32': 'Man with gun',
        'code_33': 'Emergency',
        'code_34': 'Riot',
        'code_35': 'Major crime alert',
        'code_36': 'Correct time',
        'code_37': 'Suspicious vehicle',
        'code_38': 'Stopping suspicious vehicle',
        'code_39': 'Urgent - use lights/siren',
        'code_40': 'Silent run - no lights/siren',
        'code_41': 'Beginning tour of duty',
        'code_42': 'Ending tour of duty',
        'code_43': 'Information',
        'code_44': 'Permission to leave',
        'code_45': 'Animal case',
        'code_46': 'Assist motorist',
        'code_47': 'Emergency road repairs',
        'code_48': 'Traffic signal not working',
        'code_49': 'Traffic light out',
        'code_50': 'Accident',
        'code_51': 'Wreck',
        'code_52': 'Ambulance needed',
        'code_53': 'Road blocked',
        'code_54': 'Livestock on road',
        'code_55': 'Intoxicated driver',
        'code_56': 'Intoxicated pedestrian',
        'code_57': 'Hit and run',
        'code_58': 'Direct traffic',
        'code_59': 'Convoy/escort',
        'code_60': 'Suspicious vehicle',
        'code_61': 'Miscellaneous public service',
        'code_62': 'Meet complainant',
        'code_63': 'Prepare to copy',
        'code_64': 'Found property',
        'code_65': 'Network message',
        'code_66': 'Suspicious person',
        'code_67': 'Person calling for help',
        'code_68': 'Telephone number',
        'code_69': 'Message received',
        'code_70': 'Fire alarm',
        'code_71': 'Advise nature of fire',
        'code_72': 'Report progress on fire',
        'code_73': 'Smoke report',
        'code_74': 'Negative',
        'code_75': 'In contact with',
        'code_76': 'En route',
        'code_77': 'ETA',
        'code_78': 'Need assistance',
        'code_79': 'Notify coroner',
        'code_80': 'Chase in progress',
        'code_81': 'Breathalyzer',
        'code_82': 'Reserve lodging',
        'code_83': 'Work school crossing',
        'code_84': 'If meeting advise ETA',
        'code_85': 'Delay due to',
        'code_86': 'Officer on duty',
        'code_87': 'Pick up',
        'code_88': 'Present phone number',
        'code_89': 'Bomb threat',
        'code_90': 'Bank alarm',
        'code_91': 'Pick up prisoner',
        'code_92': 'Improperly parked vehicle',
        'code_93': 'Blockade',
        'code_94': 'Drag racing',
        'code_95': 'Prisoner in custody',
        'code_96': 'Mental subject',
        'code_97': 'Check signal',
        'code_98': 'Prison/jail break',
        'code_99': 'Wanted/stolen'
    }
};

// Singapore tactical response scenarios
export const TacticalScenarios = {
    'armed_robbery': {
        name: 'Armed Robbery',
        priority: 'P1',
        responseTime: 10,
        units: ['patrol_car', 'patrol_car', 'motorcycle'],
        formation: 'perimeter',
        protocol: [
            '1. Establish perimeter around location',
            '2. Deploy units at strategic positions',
            '3. Negotiate if possible',
            '4. Entry team prepares',
            '5. Apprehend suspects',
            '6. Secure scene',
            '7. Investigate'
        ]
    },
    'hostage': {
        name: 'Hostage Situation',
        priority: 'P1',
        responseTime: 15,
        units: ['patrol_car', 'special_operations', 'negotiator'],
        formation: 'perimeter',
        protocol: [
            '1. Establish perimeter',
            '2. Deploy negotiator',
            '3. Evacuate civilians',
            '4. Special operations on standby',
            '5. Negotiate release',
            '6. Tactical entry if needed'
        ]
    },
    'active_shooter': {
        name: 'Active Shooter',
        priority: 'P1',
        responseTime: 8,
        units: ['patrol_car', 'patrol_car', 'patrol_car', 'special_operations'],
        formation: 'entry',
        protocol: [
            '1. Immediate response - first unit engages',
            '2. Additional units arrive',
            '3. Form entry team',
            '4. Neutralize threat',
            '5. Clear building',
            '6. Medical response',
            '7. Investigate'
        ]
    },
    'traffic_accident_major': {
        name: 'Major Traffic Accident',
        priority: 'P1',
        responseTime: 15,
        units: ['patrol_car', 'traffic_police', 'ambulance', 'fire_engine'],
        formation: 'perimeter',
        protocol: [
            '1. Secure scene',
            '2. Traffic control',
            '3. Medical assistance',
            '4. Fire safety',
            '5. Investigation',
            '6. Clear road'
        ]
    },
    'fire_major': {
        name: 'Major Fire',
        priority: 'P1',
        responseTime: 8,
        units: ['fire_engine', 'fire_engine', 'ambulance', 'rescue_vehicle'],
        formation: 'fire_attack',
        protocol: [
            '1. Arrive and assess',
            '2. Establish water supply',
            '3. Begin firefighting',
            '4. Search and rescue',
            '5. Medical triage',
            '6. Overhaul and investigation'
        ]
    }
};

export function getResponseTime(emergencyType, agency) {
    if (agency === 'scdf') {
        return SCDF_ResponseTimes[emergencyType] || SCDF_ResponseTimes.medical;
    }
    return SPF_ResponseTimes[emergencyType] || SPF_ResponseTimes.emergency;
}

export function getActivationProtocol(agency, type) {
    if (agency === 'scdf') {
        return SCDF_Activation[type] || SCDF_Activation.medical;
    }
    return SPF_Activation[type] || SPF_Activation.emergency_999;
}

export function getTacticalFormation(agency, formation) {
    if (agency === 'scdf') {
        return TacticalFormations.scdf[formation] || TacticalFormations.scdf.medical;
    }
    return TacticalFormations.police[formation] || TacticalFormations.police.patrol;
}

export function getTacticalScenario(scenario) {
    return TacticalScenarios[scenario] || null;
}
