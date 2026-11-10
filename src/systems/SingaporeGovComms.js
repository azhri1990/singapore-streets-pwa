/**
 * Singapore Government Sectors, Divisions, Call Signs & Communications
 * Based on actual Singapore government structure and radio protocols
 */

// Singapore Police Force (SPF) Divisions
export const SPF_Divisions = {
    'central': {
        name: 'Central Police Division',
        code: 'A',
        headquarters: 'Cantonment Complex',
        areas: ['Marina Bay', 'Orchard', 'Raffles Place', 'Chinatown', 'Clarke Quay'],
        callSign: 'Alpha',
        channels: ['CH1', 'CH2', 'CH3'],
        vehicles: ['patrol_car', 'motorcycle', 'mpv'],
        color: 0x0000FF
    },
    'tanglin': {
        name: 'Tanglin Police Division',
        code: 'B',
        headquarters: 'Tanglin Police Division',
        areas: ['Orchard', 'Bukit Timah', 'Holland Village', 'Dempsey'],
        callSign: 'Bravo',
        channels: ['CH1', 'CH2'],
        vehicles: ['patrol_car', 'motorcycle'],
        color: 0x0000FF
    },
    'clementi': {
        name: 'Clementi Police Division',
        code: 'C',
        headquarters: 'Clementi Police Division',
        areas: ['Clementi', 'Jurong', 'West Coast', 'Bukit Batok'],
        callSign: 'Charlie',
        channels: ['CH1', 'CH2'],
        vehicles: ['patrol_car', 'motorcycle', 'mpv'],
        color: 0x0000FF
    },
    'jurong': {
        name: 'Jurong Police Division',
        code: 'D',
        headquarters: 'Jurong Police Division',
        areas: ['Jurong', 'Boon Lay', 'Tuas', 'Pioneer'],
        callSign: 'Delta',
        channels: ['CH1', 'CH2'],
        vehicles: ['patrol_car', 'motorcycle'],
        color: 0x0000FF
    },
    'ang_mo_kio': {
        name: 'Ang Mo Kio Police Division',
        code: 'E',
        headquarters: 'Ang Mo Kio Police Division',
        areas: ['Ang Mo Kio', 'Bishan', 'Yio Chu Kang', 'Serangoon'],
        callSign: 'Echo',
        channels: ['CH1', 'CH2'],
        vehicles: ['patrol_car', 'motorcycle', 'mpv'],
        color: 0x0000FF
    },
    'bedok': {
        name: 'Bedok Police Division',
        code: 'F',
        headquarters: 'Bedok Police Division',
        areas: ['Bedok', 'Tampines', 'Pasir Ris', 'Changi'],
        callSign: 'Foxtrot',
        channels: ['CH1', 'CH2'],
        vehicles: ['patrol_car', 'motorcycle'],
        color: 0x0000FF
    },
    'kampong_java': {
        name: 'Kampong Java Police Division',
        code: 'G',
        headquarters: 'Kampong Java Neighbourhood Police Centre',
        areas: ['Little India', 'Farrer Park', 'Serangoon', 'Balestier'],
        callSign: 'Golf',
        channels: ['CH1', 'CH2'],
        vehicles: ['patrol_car', 'motorcycle'],
        color: 0x0000FF
    },
    'toa_payoh': {
        name: 'Toa Payoh Police Division',
        code: 'H',
        headquarters: 'Toa Payoh Police Division',
        areas: ['Toa Payoh', 'Balestier', 'Novena', 'Thomson'],
        callSign: 'Hotel',
        channels: ['CH1', 'CH2'],
        vehicles: ['patrol_car', 'motorcycle'],
        color: 0x0000FF
    },
    'woodlands': {
        name: 'Woodlands Police Division',
        code: 'I',
        headquarters: 'Woodlands Police Division',
        areas: ['Woodlands', 'Sembawang', 'Yishun', 'Admiralty'],
        callSign: 'India',
        channels: ['CH1', 'CH2'],
        vehicles: ['patrol_car', 'motorcycle'],
        color: 0x0000FF
    },
    'marine_parade': {
        name: 'Marine Parade Police Division',
        code: 'J',
        headquarters: 'Marine Parade Neighbourhood Police Centre',
        areas: ['Marine Parade', 'East Coast', 'Katong', 'Joo Chiat'],
        callSign: 'Juliet',
        channels: ['CH1', 'CH2'],
        vehicles: ['patrol_car', 'motorcycle'],
        color: 0x0000FF
    }
};

// Traffic Police
export const TrafficPolice = {
    name: 'Traffic Police',
    code: 'TP',
    headquarters: 'Traffic Police Headquarters, 10 Ubi Ave 3',
    callSign: 'Traffic',
    divisions: ['Expressway', 'Urban', 'Accident Investigation'],
    vehicles: ['highway_patrol', 'speed_camera', 'motorcycle'],
    equipment: ['speed_camera', 'breathalyzer', 'radar_gun'],
    color: 0xFFFFFF
};

// Singapore Civil Defence Force (SCDF)
export const SCDF_Divisions = {
    '1st': {
        name: '1st SCDF Division',
        headquarters: 'Queensway Fire Station',
        areas: ['Central', 'Bukit Merah', 'Queenstown'],
        callSign: 'SCDF 1',
        vehicles: ['fire_engine', 'ambulance', 'rescue_vehicle'],
        color: 0xFF0000
    },
    '2nd': {
        name: '2nd SCDF Division',
        headquarters: 'Central Fire Station',
        areas: ['Marina Bay', 'Orchard', 'Raffles Place'],
        callSign: 'SCDF 2',
        vehicles: ['fire_engine', 'ambulance', 'rescue_vehicle'],
        color: 0xFF0000
    },
    '3rd': {
        name: '3rd SCDF Division',
        headquarters: 'Yishun Fire Station',
        areas: ['Yishun', 'Woodlands', 'Sembawang'],
        callSign: 'SCDF 3',
        vehicles: ['fire_engine', 'ambulance', 'rescue_vehicle'],
        color: 0xFF0000
    },
    '4th': {
        name: '4th SCDF Division',
        headquarters: 'Tampines Fire Station',
        areas: ['Tampines', 'Pasir Ris', 'Bedok'],
        callSign: 'SCDF 4',
        vehicles: ['fire_engine', 'ambulance', 'rescue_vehicle'],
        color: 0xFF0000
    },
    '5th': {
        name: '5th SCDF Division',
        headquarters: 'Tuas Fire Station',
        areas: ['Tuas', 'Jurong', 'Boon Lay'],
        callSign: 'SCDF 5',
        vehicles: ['fire_engine', 'ambulance', 'rescue_vehicle', 'hazmat'],
        color: 0xFF0000
    }
};

// Singapore Armed Forces (SAF)
export const SAF_Units = {
    'army': {
        name: 'Singapore Army',
        divisions: ['3rd Division', '6th Division', '9th Division', '25th Division'],
        callSign: 'Army',
        color: 0x4a5a36
    },
    'navy': {
        name: 'Republic of Singapore Navy',
        divisions: ['Fleet', 'Maritime Security'],
        callSign: 'Navy',
        color: 0x000080
    },
    'airforce': {
        name: 'Republic of Singapore Air Force',
        divisions: ['Fighter', 'Helicopter', 'Transport'],
        callSign: 'Airforce',
        color: 0x87CEEB
    }
};

// Other Government Agencies
export const GovAgencies = {
    'ica': {
        name: 'Immigration & Checkpoints Authority',
        code: 'ICA',
        description: 'Manages Singapore\'s borders and immigration',
        checkpoints: ['Woodlands', 'Tuas', 'Changi Airport', 'Marina Bay Cruise Centre'],
        color: 0x008000
    },
    'cnb': {
        name: 'Central Narcotics Bureau',
        code: 'CNB',
        description: 'Anti-drug enforcement',
        color: 0x8B0000
    },
    'cpib': {
        name: 'Corrupt Practices Investigation Bureau',
        code: 'CPIB',
        description: 'Anti-corruption',
        color: 0x1a1a1a
    },
    'lta': {
        name: 'Land Transport Authority',
        code: 'LTA',
        description: 'Transport infrastructure and regulation',
        color: 0xFF8C00
    },
    'nea': {
        name: 'National Environment Agency',
        code: 'NEA',
        description: 'Environment, public health, waste management',
        color: 0x008000
    },
    'hdb': {
        name: 'Housing & Development Board',
        code: 'HDB',
        description: 'Public housing',
        color: 0x4169E1
    },
    'moh': {
        name: 'Ministry of Health',
        code: 'MOH',
        description: 'Healthcare policy and regulation',
        color: 0xFF0000
    },
    'moe': {
        name: 'Ministry of Education',
        code: 'MOE',
        description: 'Education policy',
        color: 0x0000FF
    }
};

// Walkie-Talkie Communication Protocols
export const RadioProtocols = {
    // Standard phrases
    standard: {
        'roger': 'Message received and understood',
        'copy': 'Message received',
        'over': 'End of transmission, expecting reply',
        'out': 'End of transmission, no reply expected',
        'affirmative': 'Yes',
        'negative': 'No',
        'standby': 'Wait for further information',
        'wilco': 'Will comply',
        'mayday': 'Emergency distress call',
        'panpan': 'Urgent but not life-threatening',
        'securite': 'Safety message'
    },
    
    // Police 10-codes (Singapore)
    policeCodes: {
        '10-1': 'Receiving poorly',
        '10-2': 'Receiving well',
        '10-4': 'Acknowledged',
        '10-7': 'Out of service',
        '10-8': 'In service',
        '10-9': 'Repeat message',
        '10-10': 'Fight in progress',
        '10-15': 'Civil disturbance',
        '10-20': 'Location',
        '10-21': 'Call by phone',
        '10-22': 'Disregard last assignment',
        '10-23': 'Arrived at scene',
        '10-24': 'Assignment completed',
        '10-31': 'Crime in progress',
        '10-32': 'Man with gun',
        '10-33': 'Emergency traffic',
        '10-41': 'Beginning tour of duty',
        '10-42': 'Ending tour of duty',
        '10-50': 'Accident',
        '10-51': 'Wreck',
        '10-52': 'Ambulance needed',
        '10-53': 'Road blocked',
        '10-54': 'Livestock on road',
        '10-55': 'Intoxicated driver',
        '10-56': 'Intoxicated pedestrian',
        '10-57': 'Hit and run',
        '10-58': 'Direct traffic',
        '10-59': 'Convoy or escort',
        '10-60': 'Suspicious vehicle',
        '10-61': 'Miscellaneous public service',
        '10-62': 'Meet complainant',
        '10-63': 'Prepare to copy',
        '10-64': 'Found property',
        '10-65': 'Network message',
        '10-66': 'Suspicious person',
        '10-67': 'Person calling for help',
        '10-68': 'Telephone number',
        '10-69': 'Message received',
        '10-70': 'Fire alarm',
        '10-71': 'Advise nature of fire',
        '10-72': 'Report progress on fire',
        '10-73': 'Smoke report',
        '10-74': 'Negative',
        '10-75': 'In contact with',
        '10-76': 'En route',
        '10-77': 'ETA',
        '10-78': 'Need assistance',
        '10-79': 'Notify coroner',
        '10-80': 'Chase in progress',
        '10-81': 'Breathalyzer',
        '10-82': 'Reserve lodging',
        '10-83': 'Work school crossing',
        '10-84': 'If meeting ... advise ETA',
        '10-85': 'Delay due to',
        '10-86': 'Officer on duty',
        '10-87': 'Pick up',
        '10-88': 'Present phone number',
        '10-89': 'Bomb threat',
        '10-90': 'Bank alarm',
        '10-91': 'Pick up prisoner',
        '10-92': 'Improperly parked vehicle',
        '10-93': 'Blockade',
        '10-94': 'Drag racing',
        '10-95': 'Prisoner in custody',
        '10-96': 'Mental subject',
        '10-97': 'Check (test) signal',
        '10-98': 'Prison or jail break',
        '10-99': 'Wanted/stolen indicated'
    },
    
    // SCDF codes
    scdfCodes: {
        'Code 1': 'Fire emergency',
        'Code 2': 'Medical emergency',
        'Code 3': 'Rescue operation',
        'Code 4': 'Hazmat incident',
        'Code 5': 'False alarm',
        'Red 1': 'Fire in progress',
        'Red 2': 'Fire out, overhaul',
        'Blue 1': 'Medical emergency',
        'Blue 2': 'Patient transported',
        'Yellow 1': 'Rescue in progress',
        'Yellow 2': 'Rescue completed'
    }
};

// Walkie-talkie communication generator
export class SingaporeWalkieTalkie {
    constructor() {
        this.currentChannel = 'CH1';
        this.callSign = 'Alpha-1';
        this.volume = 0.8;
    }
    
    // Generate police radio message
    generatePoliceMessage(type, location, details = {}) {
        const messages = {
            'patrol': [
                `${this.callSign} to control, patrolling ${location}, all clear.`,
                `${this.callSign} to control, ${location} quiet, no activity.`,
                `${this.callSign} to control, traffic flowing smoothly at ${location}.`
            ],
            'crime': [
                `${this.callSign} to control, crime reported at ${location}. Responding.`,
                `${this.callSign} to control, suspicious activity at ${location}. Investigating.`,
                `${this.callSign} to control, assistance required at ${location}.`
            ],
            'chase': [
                `${this.callSign} to control, in pursuit of suspect vehicle at ${location}.`,
                `${this.callSign} to control, suspect heading towards ${location}. Requesting backup.`,
                `${this.callSign} to control, high speed chase on ${location}.`
            ],
            'arrest': [
                `${this.callSign} to control, suspect apprehended at ${location}.`,
                `${this.callSign} to control, arrest made at ${location}. Transporting to station.`,
                `${this.callSign} to control, one in custody at ${location}.`
            ],
            'traffic': [
                `${this.callSign} to control, traffic accident at ${location}. Requesting tow truck.`,
                `${this.callSign} to control, road obstruction at ${location}.`,
                `${this.callSign} to control, ERP gantry malfunction at ${location}.`
            ],
            'erp': [
                `${this.callSign} to control, ERP check at ${location}. Collecting tolls.`,
                `${this.callSign} to control, ERP system operational at ${location}.`
            ]
        };
        
        const msgList = messages[type] || messages.patrol;
        return msgList[Math.floor(Math.random() * msgList.length)];
    }
    
    // Generate SCDF radio message
    generateSCDFMessage(type, location, details = {}) {
        const messages = {
            'fire': [
                `SCDF ${this.callSign} to control, fire reported at ${location}. En route.`,
                `SCDF ${this.callSign} to control, structure fire at ${location}. Requesting additional units.`,
                `SCDF ${this.callSign} to control, fire under control at ${location}.`
            ],
            'medical': [
                `SCDF ${this.callSign} to control, medical emergency at ${location}. En route.`,
                `SCDF ${this.callSign} to control, patient transported to hospital from ${location}.`,
                `SCDF ${this.callSign} to control, medical assistance provided at ${location}.`
            ],
            'rescue': [
                `SCDF ${this.callSign} to control, rescue operation at ${location}.`,
                `SCDF ${this.callSign} to control, person rescued at ${location}.`,
                `SCDF ${this.callSign} to control, rescue completed at ${location}.`
            ],
            'hazmat': [
                `SCDF ${this.callSign} to control, hazmat incident at ${location}. Evacuating area.`,
                `SCDF ${this.callSign} to control, chemical spill at ${location}. Containing.`
            ]
        };
        
        const msgList = messages[type] || messages.medical;
        return msgList[Math.floor(Math.random() * msgList.length)];
    }
    
    // Generate ICA checkpoint message
    generateICAMessage(location, details = {}) {
        const messages = [
            `ICA ${this.callSign} to control, checkpoint at ${location}. All clear.`,
            `ICA ${this.callSign} to control, heavy traffic at ${location} checkpoint.`,
            `ICA ${this.callSign} to control, immigration check completed at ${location}.`,
            `ICA ${this.callSign} to control, suspicious vehicle at ${location}. Inspecting.`
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    // Play radio message (text-to-speech)
    playMessage(message, agency = 'spf') {
        if (window.voiceSynth) {
            const voiceProfiles = {
                'spf': 'chinese_singaporean',
                'scdf': 'malay_singaporean',
                'ica': 'indian_singaporean'
            };
            window.voiceSynth.speak(message, voiceProfiles[agency] || 'chinese_singaporean', { rate: 1.1, pitch: 0.9 });
        }
    }
    
    // Set channel
    setChannel(channel) {
        this.currentChannel = channel;
    }
    
    // Set call sign
    setCallSign(sign) {
        this.callSign = sign;
    }
}

// Government agency contacts
export const GovContacts = {
    'emergency': { number: '999', agency: 'Police', description: 'Police emergency' },
    'fire_ambulance': { number: '995', agency: 'SCDF', description: 'Fire and ambulance' },
    'police_hotline': { number: '1800-255-0000', agency: 'SPF', description: 'Police hotline' },
    'scdf_hotline': { number: '1800-286-5555', agency: 'SCDF', description: 'SCDF hotline' },
    'ica_hotline': { number: '6391-6100', agency: 'ICA', description: 'ICA hotline' },
    'cnb_hotline': { number: '1800-325-6666', agency: 'CNB', description: 'CNB hotline' },
    'cpib_hotline': { number: '1800-376-0000', agency: 'CPIB', description: 'CPIB hotline' },
    'lta_hotline': { number: '1800-2255-582', agency: 'LTA', description: 'LTA hotline' },
    'nea_hotline': { number: '1800-2255-632', agency: 'NEA', description: 'NEA hotline' }
};

// Singapore Police Force ranks
export const SPF_Ranks = {
    'pc': { name: 'Police Constable', abbr: 'PC', level: 1 },
    'lcp': { name: 'Lance Corporal', abbr: 'LCP', level: 2 },
    'cpl': { name: 'Corporal', abbr: 'CPL', level: 3 },
    'sgt': { name: 'Sergeant', abbr: 'SGT', level: 4 },
    'ssg': { name: 'Staff Sergeant', abbr: 'SSG', level: 5 },
    'insp': { name: 'Inspector', abbr: 'INSP', level: 6 },
    'asp': { name: 'Assistant Superintendent', abbr: 'ASP', level: 7 },
    'dsp': { name: 'Deputy Superintendent', abbr: 'DSP', level: 8 },
    'sp': { name: 'Superintendent', abbr: 'SP', level: 9 },
    'ssp': { name: 'Senior Superintendent', abbr: 'SSP', level: 10 },
    'ac': { name: 'Assistant Commissioner', abbr: 'AC', level: 11 },
    'dac': { name: 'Deputy Commissioner', abbr: 'DAC', level: 12 },
    'cp': { name: 'Commissioner of Police', abbr: 'CP', level: 13 }
};

// SCDF ranks
export const SCDF_Ranks = {
    'firefighter': { name: 'Firefighter', abbr: 'FF', level: 1 },
    'lff': { name: 'Lance Firefighter', abbr: 'LFF', level: 2 },
    'cff': { name: 'Corporal Firefighter', abbr: 'CFF', level: 3 },
    'sff': { name: 'Sergeant Firefighter', abbr: 'SFF', level: 4 },
    'ssff': { name: 'Staff Sergeant Firefighter', abbr: 'SSFF', level: 5 },
    'lta': { name: 'Lieutenant', abbr: 'LTA', level: 6 },
    'cpta': { name: 'Captain', abbr: 'CPTA', level: 7 },
    'maj': { name: 'Major', abbr: 'MAJ', level: 8 }
};

export function getDivisionInfo(divisionName) {
    return SPF_Divisions[divisionName] || SCDF_Divisions[divisionName] || null;
}

export function getGovAgencyInfo(agencyCode) {
    return GovAgencies[agencyCode.toLowerCase()] || null;
}

export function getRadioCode(code, type = 'police') {
    if (type === 'police') return RadioProtocols.policeCodes[code] || null;
    if (type === 'scdf') return RadioProtocols.scdfCodes[code] || null;
    return RadioProtocols.standard[code] || null;
}
