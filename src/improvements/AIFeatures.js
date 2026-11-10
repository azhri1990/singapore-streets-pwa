import * as THREE from 'three';
import { voiceSynth } from './VoiceSynthesizer.js';
import { SingaporeVoiceProfiles, getRandomVoiceProfile, getRandomPhrase, getGreeting } from './SingaporeVoices.js';
import { SingaporeAreas, SingaporeHawkerCentres, SingaporeRadioStations } from '../world/SingaporeLocations.js';
import { spatialAudio } from './SpatialAudio.js';
import { OmniroutePassthrough, getOmniroutePassthrough } from './OmniroutePassthrough.js';
import { BehaviorTrees } from './BehaviorTree.js';

/**
 * AI Features for Singapore Streets
 * Uses OmniRoute API for LLM-powered game features
 */

// The local OmniRoute server is optional. Configure a token at build time with
// VITE_OMNIROUTE_API_KEY rather than embedding credentials in the app bundle.
const OMNIROUTE_URL = import.meta.env.VITE_OMNIROUTE_URL || 'http://127.0.0.1:20128/v1';
const API_KEY = import.meta.env.VITE_OMNIROUTE_API_KEY || '';

// Singleton instance for the game
export const omniroute = getOmniroutePassthrough();

export class AIGameMaster {
    constructor(game) {
        this.game = game;
        this.conversationHistory = [];
        this.activeQuests = [];
        this.npcPersonalities = new Map();
    }

    // Generate dynamic missions using LLM
    async generateMission(context = {}) {
        const prompt = `Generate a Singapore-themed GTA-style mission.
Context: ${JSON.stringify(context)}
Location: Singapore (HDB estates, Marina Bay, Orchard, Chinatown, Little India)
Laws: Singapore law applies - left-hand driving, ERP gantries, strict penalties for drugs/vandalism, caning for certain offenses
Vehicle: ${context.vehicle || 'any'}
Time: ${context.time || 'day'}
Weather: ${context.weather || 'clear'}

Return JSON:
{
  "title": "Mission name",
  "description": "Brief description",
  "type": "delivery|race|chase|escort|pickup|investigation",
  "location": "Specific Singapore location",
  "reward": { "money": 500, "rep": 50 },
  "objectives": ["Objective 1", "Objective 2"],
  "difficulty": 1-5,
  "timeLimit": seconds or null
}`;

        try {
            const response = await this.callLLM(prompt, 'nvidia/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning');
            return JSON.parse(response);
        } catch (e) {
            return this.getFallbackMission(context);
        }
    }

    // Generate NPC dialogue
    async generateNPCDialogue(npcType, situation, playerContext = {}) {
        // Determine voice profile based on NPC type and context
        const allRaces = ['chinese_singaporean', 'malay_singaporean', 'indian_singaporean', 'eurasian_singaporean', 'filipino', 'indonesian', 'malaysian', 'bangladeshi', 'thai', 'myanmar'];
        
        const voiceProfiles = {
            'hawker': ['chinese_singaporean', 'malay_singaporean', 'indian_singaporean'],
            'taxi': ['chinese_singaporean', 'malay_singaporean', 'indian_singaporean'],
            'police': ['chinese_singaporean', 'malay_singaporean', 'indian_singaporean'],
            'student': allRaces,
            'office': allRaces,
            'elderly': allRaces,
            'construction': allRaces.filter(r => r !== 'eurasian_singaporean'),
            'cleaner': ['filipino', 'indonesian'],
            'delivery': allRaces,
            'tourist': allRaces
        };
        
        const profiles = voiceProfiles[npcType] || voiceProfiles.hawker;
        const voiceProfile = profiles[Math.floor(Math.random() * profiles.length)];
        
        const prompts = {
            'hawker': `You're a Singapore hawker uncle/auntie. Speak with Singlish. Situation: ${situation}. Keep it under 50 words.`,
            'taxi': `You're a Singapore taxi driver. Singlish. Situation: ${situation}. Under 50 words.`,
            'police': `You're Singapore Police. Professional but local. Situation: ${situation}. Under 50 words.`,
            'student': `You're a Singapore student. Casual Singlish. Situation: ${situation}. Under 50 words.`,
            'office': `You're a CBD office worker. Stressed Singlish. Situation: ${situation}. Under 50 words.`,
            'elderly': `You're a Singapore pioneer generation uncle/auntie. Warm Singlish. Situation: ${situation}. Under 50 words.`
        };

        const prompt = prompts[npcType] || prompts['hawker'];
        
        try {
            const response = await this.callLLM(prompt, 'nvidia/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning');
            const trimmed = response.trim();
            // Speak the dialogue with appropriate voice
            voiceSynth.speakSinglish(trimmed, voiceProfile);
            return trimmed;
        } catch (e) {
            const fallback = this.getFallbackDialogue(npcType);
            voiceSynth.speakSinglish(fallback, voiceProfile);
            return fallback;
        }
    }

    // AI Traffic Director - manages AI vehicle behavior
    async getTrafficDecision(vehicle, surroundings) {
        const prompt = `Singapore traffic AI decision.
Vehicle: ${vehicle.type} at ${vehicle.speed}km/h
Surroundings: ${JSON.stringify(surroundings)}
Road rules: Left-side driving, ERP zones, bus lanes, yellow box junctions
Output JSON: { "action": "accelerate|brake|turn_left|turn_right|change_lane|stop", "reason": "why" }`;

        try {
            const response = await this.callLLM(prompt, 'nvidia/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning');
            return JSON.parse(response);
        } catch (e) {
            return { action: 'continue', reason: 'fallback' };
        }
    }

    // Dynamic world events
    async generateWorldEvent(gameState) {
        const prompt = `Generate a dynamic Singapore open-world event.
Game state: ${JSON.stringify(gameState)}
Types: traffic_jam|rain_storm|police_raid|hawker_festival|erp_price_change|mrt_breakdown|celebrity_sighting|accident|road_work|flash_flood
Output JSON: { "type": "event_type", "location": "specific place", "description": "what happens", "duration": seconds, "effects": ["gameplay effects"] }`;

        try {
            const response = await this.callLLM(prompt, 'nvidia/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning');
            return JSON.parse(response);
        } catch (e) {
            return this.getFallbackEvent();
        }
    }

    // AI Radio DJ commentary
    async generateRadioCommentary(context) {
        const prompt = `You're a Singapore radio DJ (like 987FM, Class 95, or 988 NOW). 
Context: ${JSON.stringify(context)}
Give a 30-second commentary with authentic Singapore flavor. Mention: 
- Traffic conditions (PIE, CTE, ECP, ERP rates)
- Weather (tropical, rain, humidity)
- Local events (hawker festivals, MRT updates)
- Singapore life (HDB, food, shopping)
Use natural Singlish (lah, leh, lor, meh, sia). Reference real Singapore places.`;

        try {
            return await this.callLLM(prompt, 'nvidia/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning');
        } catch (e) {
            return "Good morning Singapore! Traffic heavy on PIE towards Tuas. ERP rates up at Orchard. Stay cool lah!";
        }
    }

    // Core LLM call
    async callLLM(prompt, model = 'nvidia/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning') {
        const payload = {
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 300
        };

        const result = await omniroute.call('/chat/completions', payload, {
            useCache: false,
            priority: 5
        });

        if (result.ok && result.data?.choices?.[0]?.message?.content) {
            return result.data.choices[0].message.content;
        }

        // Fallback to direct call if passthrough failed
        const directResponse = await fetch(`${OMNIROUTE_URL}/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}) },
            body: JSON.stringify(payload)
        });
        const data = await directResponse.json();
        return data.choices[0].message.content;
    }

    // Fallback methods (no API needed)
    getFallbackMission(context) {
        const missions = [
            {
                title: "Hawker Delivery Rush",
                description: "Deliver 10 packets of chicken rice before lunch crowd",
                type: "delivery",
                location: "Maxwell Food Centre",
                reward: { money: 300, rep: 30 },
                objectives: ["Pick up orders", "Deliver to offices", "Return for payment"],
                difficulty: 2,
                timeLimit: 300
            },
            {
                title: "ERP Gantry Race",
                description: "Race through ERP zones before rates change",
                type: "race",
                location: "Orchard Road ERP",
                reward: { money: 500, rep: 50 },
                objectives: ["Pass 5 gantries", "Beat 6PM rate hike", "Avoid TP"],
                difficulty: 3,
                timeLimit: 600
            },
            {
                title: "Taxi Uncle's Lost Tourist",
                description: "Help lost tourist find their hotel",
                type: "escort",
                location: "Changi Airport to Marina Bay",
                reward: { money: 400, rep: 40 },
                objectives: ["Pick up tourist", "Navigate to hotel", "Avoid traffic"],
                difficulty: 2,
                timeLimit: 900
            }
        ];
        return missions[Math.floor(Math.random() * missions.length)];
    }

    getFallbackDialogue(npcType) {
        const dialogues = {
            'hawker': ["Eh, want chicken rice or not? Queue long but worth wait!", "Boss, today special - chilli crab bee hoon!", "Young people nowadays, don't know good food lah."],
            'taxi': ["Where to go? Orchard? ERP expensive now leh.", "Eh, cannot stop here, TP will summon me.", "Cash or NETS? No GrabPay, machine broken."],
            'police': ["Sir, license and NRIC please. Routine check.", "This area ERP zone, you pay already?", "Drive safe lah, roads wet after rain."],
            'student': ["Cher, today got exam meh? So stressed.", "After school go Bugis eat KFC.", "Mum say must study but I want play game."],
            'office': ["Wah, this project deadline tomorrow, die liao.", "Lunch go where? Cai fan again?", "Boss ask OT again, my life not my own."],
            'elderly': ["Ah boy, eat already or not? Come, I cook for you.", "Last time Kampong Glam very different.", "Take care crossing road, cars very fast now."]
        };
        const list = dialogues[npcType] || dialogues.hawker;
        return list[Math.floor(Math.random() * list.length)];
    }

    getFallbackEvent() {
        const events = [
            { type: 'rain_storm', location: 'Marina Bay', description: 'Sudden tropical downpour! Roads slippery.', duration: 300, effects: ['reduced_grip', 'wipers_needed', 'traffic_slow'] },
            { type: 'traffic_jam', location: 'CTE towards city', description: 'Major jam on CTE, accident at Braddell.', duration: 600, effects: ['traffic_slow', 'alternate_route'] },
            { type: 'hawker_festival', location: 'Chinatown', description: 'Hawker festival! Food discounts everywhere.', duration: 1800, effects: ['pedestrian_increase', 'food_buff'] },
            { type: 'flash_flood', location: 'Orchard Road', description: 'Flash flood at Orchard! Basement carparks affected.', duration: 1200, effects: ['road_closed', 'traffic_divert'] }
        ];
        return events[Math.floor(Math.random() * events.length)];
    }
}

// AI Pedestrian Behavior
export class AIPedestrian {
    constructor() {
        this.personality = this.randomPersonality();
        this.schedule = this.generateSchedule();
    }

    randomPersonality() {
        const types = [
            { name: 'rusher', speed: 1.6, patience: 0.2, jaywalk: true },
            { name: 'elderly', speed: 0.8, patience: 0.9, jaywalk: false },
            { name: 'student', speed: 1.4, patience: 0.4, jaywalk: true },
            { name: 'office_worker', speed: 1.3, patience: 0.3, jaywalk: false },
            { name: 'tourist', speed: 1.0, patience: 0.7, jaywalk: false },
            { name: 'hawker', speed: 1.2, patience: 0.5, jaywalk: true }
        ];
        return types[Math.floor(Math.random() * types.length)];
    }

    generateSchedule() {
        const hour = new Date().getHours();
        if (hour < 7) return 'sleeping';
        if (hour < 9) return 'commuting_to_work';
        if (hour < 12) return 'working';
        if (hour < 14) return 'lunch_at_hawker';
        if (hour < 18) return 'working';
        if (hour < 20) return 'commuting_home';
        if (hour < 22) return 'dinner_social';
        return 'sleeping';
    }

    decideAction(surroundings) {
        // Simple rule-based AI with personality
        if (surroundings.vehicleNearby && this.personality.jaywalk) {
            return { action: 'cross_quickly', urgency: 0.8 };
        }
        if (surroundings.rainStarted) {
            return { action: 'seek_shelter', urgency: 0.9 };
        }
        if (surroundings.foodSmell && this.schedule.includes('lunch')) {
            return { action: 'go_to_hawker', urgency: 0.7 };
        }
        return { action: 'continue_walking', urgency: 0.3 };
    }
}

// AI Traffic System
export class AITrafficSystem {
    constructor() {
        this.vehicles = [];
        this.erpZones = [
            { name: 'Orchard', active: true, rate: 3.0 },
            { name: 'CBD', active: true, rate: 2.5 },
            { name: 'CTE', active: true, rate: 2.0 },
            { name: 'PIE', active: false, rate: 1.5 }
        ];
    }

    update(delta, gameState) {
        // Update ERP rates based on time
        this.updateERPRates();
        
        // Process each AI vehicle
        this.vehicles.forEach(vehicle => {
            this.updateVehicleAI(vehicle, delta, gameState);
        });
    }

    updateERPRates() {
        const hour = new Date().getHours();
        this.erpZones.forEach(zone => {
            // Peak hours: 7-9am, 5-8pm
            zone.active = (hour >= 7 && hour < 9) || (hour >= 17 && hour < 20);
            zone.rate = zone.active ? zone.rate * 1.5 : zone.rate;
        });
    }

    updateVehicleAI(vehicle, delta, gameState) {
        // Singapore driving behavior
        const behaviors = {
            'taxi': { aggressive: 0.7, laneChange: 0.8, speedLimit: 1.1 },
            'bus': { aggressive: 0.3, laneChange: 0.2, speedLimit: 0.9 },
            'police': { aggressive: 0.9, laneChange: 0.9, speedLimit: 1.3 },
            'private': { aggressive: 0.5, laneChange: 0.5, speedLimit: 1.0 },
            'grab': { aggressive: 0.6, laneChange: 0.7, speedLimit: 1.05 }
        };

        const behavior = behaviors[vehicle.type] || behaviors.private;
        
        // Apply behavior
        vehicle.targetSpeed = vehicle.maxSpeed * behavior.speedLimit;
        
        // ERP avoidance
        if (this.approachingERP(vehicle) && Math.random() < 0.3) {
            vehicle.changeLane('avoid_erp');
        }

        // Random lane changes
        if (Math.random() < 0.001 * behavior.laneChange) {
            vehicle.changeLane(Math.random() > 0.5 ? 'left' : 'right');
        }
    }

    approachingERP(vehicle) {
        return this.erpZones.some(zone => 
            zone.active && vehicle.distanceToZone(zone) < 500
        );
    }
}

// AI Mission Director - oversees game flow
export class AIMissionDirector {
    constructor(gameMaster) {
        this.gameMaster = gameMaster;
        this.activeMissions = [];
        this.completedMissions = [];
        this.difficulty = 1;
    }

    async checkAndGenerateMissions(player) {
        // Generate missions based on player state
        if (this.activeMissions.length < 3 && Math.random() < 0.01) {
            const mission = await this.gameMaster.generateMission({
                playerLevel: this.difficulty,
                location: player.currentArea,
                vehicle: player.currentVehicle?.type,
                time: new Date().getHours(),
                weather: player.currentWeather
            });
            this.activeMissions.push(mission);
            return mission;
        }
        return null;
    }

    completeMission(missionId) {
        const idx = this.activeMissions.findIndex(m => m.id === missionId);
        if (idx >= 0) {
            const mission = this.activeMissions.splice(idx, 1)[0];
            this.completedMissions.push(mission);
            this.difficulty = Math.min(5, this.difficulty + 0.1);
            return mission.reward;
        }
        return null;
    }

    getAvailableMissions() {
        return this.activeMissions;
    }
}

// Export singleton instances
export const aiGameMaster = new AIGameMaster(null);
export const aiTrafficSystem = new AITrafficSystem();
