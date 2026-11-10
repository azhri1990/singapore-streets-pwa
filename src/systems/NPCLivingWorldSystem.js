/**
 * NPC Schedules & Living World System
 * NPCs with daily routines, dynamic events, faction territory
 */

export const NPCTypes = {
  'elderly_void_deck': {
    name: 'Elderly Void Deck',
    schedule: {
      morning: { start: 6, end: 9, action: 'exercising', subAction: 'tai_chi' },
      afternoon: { start: 12, end: 15, action: 'chinese_chess', subAction: 'reading_newspaper' },
      evening: { start: 18, end: 22, action: 'card_games', subAction: 'chatting' }
    },
    behaviors: ['talk_about_weather', 'complain_about_youth', 'offer_wisdom'],
    singlish: 'Aiyah, now young people don\'t know respect!',
    spawnLocations: ['hdb_void_deck', 'park_bench', 'coffee_shop'],
    patrolRoute: false,
    interactive: true
  },

  'hawker_stall_owner': {
    name: 'Hawker Stall Owner',
    schedule: {
      prep: { start: 4, end: 6, action: 'preparing_food' },
      open: { start: 6, end: 22, action: 'serving_customers' },
      close: { start: 22, end: 23, action: 'cleaning_up' }
    },
    behaviors: ['shout_orders', 'complain_about_prices', 'give_extra_food'],
    singlish: 'Okay okay, sit down sit down! Wah, many people today!',
    spawnLocations: ['hawker_centre'],
    patrolRoute: false,
    interactive: true
  },

  'mrt_commuter': {
    name: 'MRT Commuter',
    schedule: {
      morning: { start: 6, end: 9, action: 'commuting_to_work', subAction: 'standing_crowded' },
      evening: { start: 17, end: 20, action: 'commuting_home', subAction: 'sleepy' },
      weekend: { start: 10, end: 18, action: 'sightseeing' }
    },
    behaviors: ['scroll_phone', 'sleep', 'listen_music', 'gossip'],
    singlish: 'MRT so crowded, no space to stand',
    spawnLocations: ['mrt_station', 'mrt_train', 'office_building'],
    patrolRoute: true,
    interactive: false
  },

  'ns_man': {
    name: 'NS Man (Reservist)',
    schedule: {
      camp: { start: 6, end: 18, action: 'training', subAction: 'paperwork' },
      leave: { start: 18, end: 22, action: 'shopping', subAction: 'hawker_centre' }
    },
    behaviors: ['complain_about_ns', 'talk_about_ippt', 'miss_family'],
    singlish: 'NSF life so sian, keep running!',
    spawnLocations: ['army_camp', 'hawker_centre', 'mrt_station'],
    patrolRoute: false,
    interactive: true
  },

  'delivery_rider': {
    name: 'Food Delivery Rider',
    schedule: {
      rush: { start: 11, end: 13, action: 'delivering_lunch' },
      lunch: { start: 13, end: 14, action: 'eating_own_food' },
      evening: { start: 18, end: 22, action: 'delivering_dinner' }
    },
    behaviors: ['check_app', 'rushing', 'sweating', 'helmet_on_head'],
    singlish: 'Eh, customer where? Cannot find!',
    spawnLocations: ['street', 'hawker_centre', 'condo'],
    patrolRoute: true,
    interactive: false
  },

  'triad_enforcer': {
    name: 'Triad Enforcer',
    schedule: {
      patrol: { start: 20, end: 2, action: 'patrolling_territory' },
      business: { start: 14, end: 18, action: 'collecting_protection' },
      rest: { start: 2, end: 20, action: 'sleeping' }
    },
    behaviors: ['intimidate', 'count_cash', 'talk_phone', 'eye_contact'],
    singlish: 'You know who you are talking to or not?',
    spawnLocations: ['geylang', 'chinatown', 'jurong', 'beach_road'],
    patrolRoute: true,
    interactive: true,
    hostile: true
  },

  'office_worker': {
    name: 'Office Worker',
    schedule: {
      work: { start: 8, end: 18, action: 'working', subAction: 'coffee_break' },
      commute: { start: 7, end: 9, action: 'commuting' },
      evening: { start: 19, end: 23, action: 'dinner', subAction: 'shopping' }
    },
    behaviors: ['scroll_phone', 'coffee_addict', 'stress_about_deadlines'],
    singlish: 'Work so stress, want to quit job!',
    spawnLocations: ['cbd_office', 'mrt_station', 'coffee_shop', 'hawker_centre'],
    patrolRoute: true,
    interactive: false
  },

  'tourist': {
    name: 'Tourist',
    schedule: {
      sightseeing: { start: 9, end: 18, action: 'taking_photos', subAction: 'getting_lost' },
      evening: { start: 19, end: 22, action: 'shopping', subAction: 'dinner' }
    },
    behaviors: ['take_photos', 'ask_directions', 'lost', 'happy'],
    singlish: 'Singapore so clean, very beautiful!',
    spawnLocations: ['marina_bay', 'orchard', 'chinatown', 'little_india'],
    patrolRoute: true,
    interactive: true
  },

  'hawker_customer': {
    name: 'Hawker Customer',
    schedule: {
      lunch: { start: 11, end: 14, action: 'eating_lunch' },
      dinner: { start: 18, end: 21, action: 'eating_dinner' }
    },
    behaviors: ['queue_properly', 'chope_seat', 'share_table'],
    singlish: 'The chicken rice very good, must come again!',
    spawnLocations: ['hawker_centre'],
    patrolRoute: false,
    interactive: false
  },

  'police_patrol': {
    name: 'Police Patrol',
    schedule: {
      day: { start: 8, end: 20, action: 'patrolling' },
      night: { start: 20, end: 8, action: 'patrolling' }
    },
    behaviors: ['patrol_car', 'check_license', 'stop_suspects'],
    singlish: 'Police check, show IC please',
    spawnLocations: ['street', 'hdb', 'mrt_station', 'police_station'],
    patrolRoute: true,
    interactive: true,
    hostile: false
  }
};

export const DynamicEvents = {
  'mrt_disruption': {
    name: 'MRT Disruption',
    trigger: 'random_or_hacked',
    duration: 1800000,
    effects: {
      delay: { trains: { delay: 5 } },
      crowding: { malls: { crowd: 2 } },
      alternative: { taxis: { demand: 3 } }
    },
    npcReactions: [
      'commuters_angry',
      'office_workers_stressed',
      'delivery_riders_busy'
    ],
    singlish: 'MRT got problem, all people stuck!'
  },

  'hawker_price_increase': {
    name: 'Hawker Price Increase',
    trigger: 'random',
    duration: 604800000,
    effects: {
      prices: { hawker: { multiplier: 1.1 } },
      complaints: { elders: { increased: true } }
    },
    npcReactions: [
      'elders_complain',
      'customers_angry',
      'hawker_defensive'
    ],
    singlish: 'Now everything increase price!'
  },

  'rain_storm': {
    name: 'Sudden Rain Storm',
    trigger: 'weather',
    duration: 300000,
    effects: {
      visibility: { reduced: true },
      traffic: { slow: true },
      mrt: { leakage: true }
    },
    npcReactions: [
      'people_run_for_cover',
      'umbrellas_everywhere',
      'traffic_jam'
    ],
    singlish: 'Sudden rain, no bring umbrella ah!'
  },

  'hawker_centre_closure': {
    name: 'Hawker Centre Closure',
    trigger: 'random_or_fire',
    duration: 86400000,
    effects: {
      food_options: { reduced: true },
      crowding: { nearby_hawkers: 2 }
    },
    npcReactions: [
      'customers_disappointed',
      'stall_owners_worried',
      'nearby_hawkers_busy'
    ],
    singlish: 'My favourite stall closed!'
  },

  'triad_territory_war': {
    name: 'Triad Territory War',
    trigger: 'faction_relationship',
    duration: 7200000,
    effects: {
      police_presence: { increased: true },
      business: { closed: true },
      street_fights: { frequent: true }
    },
    npcReactions: [
      'shoppers_leave',
      'business_owners_worried',
      'police_alert'
    ],
    singlish: 'Gangs fighting, very dangerous!'
  },

  'ns_march': {
    name: 'NS March',
    trigger: 'random',
    duration: 3600000,
    effects: {
      traffic: { blocked: true },
      mrt: { crowded: true }
    },
    npcReactions: [
      'civilians_move_out_way',
      'nsmen_march',
      'crowds_gather'
    ],
    singlish: 'NSF march, must clear the way!'
  },

  'tourist_bust': {
    name: 'Tourist Bust',
    trigger: 'random',
    duration: 3600000,
    effects: {
      police: { presence: 2 },
      tourist: { scared: true }
    },
    npcReactions: [
      'tourists_flee',
      'shops_closing',
      'police_chase'
    ],
    singlish: 'Police catch tourists!'
  },

  'flash_mob': {
    name: 'Flash Mob',
    trigger: 'random',
    duration: 600000,
    effects: {
      crowd: { increased: true },
      chaos: { mild: true }
    },
    npcReactions: [
      'people_gather',
      'phones_out',
      'dancing'
    ],
    singlish: 'Everyone dancing, very fun!'
  }
};

export class NPCLivingWorldSystem {
  constructor(game) {
    this.game = game;
    this.npcs = [];
    this.activeEvents = [];
    this.npcCount = 0;
    this.maxNPCs = 100;
    this.npcSpawning = true;
    this.lastSpawnCheck = 0;
    this.factionTerritories = new Map();
    this.npcMemory = new Map();
    
    this.setupTerritories();
    this.startEventLoop();
  }

  setupTerritories() {
    this.factionTerritories.set('18', {
      name: '18 Gang',
      territory: 'geylang',
      influence: 75,
      rivals: ['24', 'Salakau'],
      npcTypes: ['triad_enforcer', 'elderly_void_deck', 'hawker_customer'],
      policePresence: 0.3,
      businessActivity: 0.8
    });

    this.factionTerritories.set('24', {
      name: '24 Gang',
      territory: 'toa_payoh',
      influence: 70,
      rivals: ['18', 'Ang_Soon_Tong'],
      npcTypes: ['triad_enforcer', 'hdb_resident', 'hawker_customer'],
      policePresence: 0.4,
      businessActivity: 0.6
    });

    this.factionTerritories.set('police', {
      name: 'SPF',
      territory: 'citywide',
      influence: 90,
      npcTypes: ['police_patrol', 'mrt_police', 'traffic_police'],
      patrolRoutes: ['cbd', 'orchard', 'chinatown', 'little_india', 'geylang']
    });

    this.factionTerritories.set('hawker', {
      name: 'Hawker Community',
      territory: 'hawker_centres',
      influence: 80,
      npcTypes: ['hawker_stall_owner', 'hawker_customer', 'elderly_void_deck'],
      businessActivity: 1.0
    });
  }

  spawnNPC(npcType, location) {
    if (this.npcs.length >= this.maxNPCs) return null;

    const typeData = NPCTypes[npcType];
    if (!typeData) return null;

    const npc = {
      id: this.npcCount++,
      type: npcType,
      location,
      state: {
        currentAction: 'idle',
        currentSchedule: typeData.schedule.morning,
        suspicion: 0,
        health: 100,
        money: 0,
        reputation: 0,
        memory: []
      },
      ai: {
        pathfinding: 'A*',
        reactionTime: 500,
        decisionInterval: 5000
      },
      spawnedAt: Date.now(),
      lastUpdate: Date.now()
    };

    this.npcs.push(npc);
    return npc;
  }

  update(delta) {
    const now = Date.now();
    
    if (this.npcSpawning && now - this.lastSpawnCheck > 5000) {
      this.spawnNPCs();
      this.lastSpawnCheck = now;
    }

    for (let i = this.npcs.length - 1; i >= 0; i--) {
      const npc = this.npcs[i];
      
      if (now - npc.spawnedAt > 600000) {
        this.npcs.splice(i, 1);
        continue;
      }

      this.updateNPC(npc, delta);
      this.checkNPCInteractions(npc);
      this.updateFactionInfluence(npc);
    }

    this.updateEvents(delta);
  }

  updateNPC(npc, delta) {
    const typeData = NPCTypes[npc.type];
    if (!typeData) return;

    const now = Date.now();
    const hours = new Date(now).getHours();

    let currentPhase = null;
    for (const [phase, schedule] of Object.entries(typeData.schedule)) {
      if (hours >= schedule.start && hours < schedule.end) {
        currentPhase = phase;
        break;
      }
    }

    if (!currentPhase) currentPhase = 'idle';

    npc.state.currentAction = this.determineNPCAction(npc, typeData, currentPhase);

    if (typeData.patrolRoute) {
      this.moveNPCAlongRoute(npc, typeData, currentPhase);
    }

    if (typeData.interactive && Math.random() < 0.01) {
      this.performSocialInteraction(npc, typeData);
    }

    npc.lastUpdate = now;
  }

  determineNPCAction(npc, typeData, currentPhase) {
    const actions = typeData.schedule[currentPhase];
    if (!actions) return 'idle';

    if (this.game.player && this.isPlayerNearby(npc)) {
      if (npc.state.suspicion > 50) {
        return 'watching_player';
      }
      
      if (Math.random() < 0.3) {
        return 'interacting_with_player';
      }
    }

    return actions.action || 'idle';
  }

  moveNPCAlongRoute(npc, typeData, phase) {
    if (!typeData.patrolRoute) return;

    const waypoints = this.getWaypointsForLocation(npc.location);
    if (!waypoints || waypoints.length === 0) return;

    const currentWaypoint = waypoints[(npc.lastUpdate / 10000) % waypoints.length];
    npc.state.targetPosition = currentWaypoint;
  }

  isPlayerNearby(npc) {
    if (!this.game.player) return false;
    
    const distance = this.calculateDistance(
      npc.location,
      this.game.player.position
    );
    
    return distance < 20;
  }

  calculateDistance(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) +
      Math.pow(pos1.z - pos2.z, 2)
    );
  }

  performSocialInteraction(npc, typeData) {
    const behaviors = typeData.behaviors;
    const behavior = behaviors[Math.floor(Math.random() * behaviors.length)];

    const dialogue = this.generateNPCDialogue(npc.type, behavior);
    this.showDialogBubble(npc, dialogue);

    npc.state.memory.push({
      time: Date.now(),
      behavior,
      playerNearby: this.isPlayerNearby(npc)
    });

    if (npc.state.memory.length > 50) {
      npc.state.memory.shift();
    }
  }

  generateNPCDialogue(npcType, behavior) {
    const typeData = NPCTypes[npcType];
    
    const dialogues = {
      'talk_about_weather': [
        'Eh, today hot hor? Must drink ice kacang.',
        'Weather very humid, very sweaty one.',
        'The rain coming soon, must find shelter.'
      ],
      'complain_about_youth': [
        typeData.singlish,
        'Now young people don\'t know respect one.',
        'Back in my time, different one.'
      ],
      'complain_about_ns': [
        typeData.singlish,
        'NS life very hard, keep running.',
        'IPPT coming soon, must train hard.'
      ],
      'offer_wisdom': [
        'Life is like bubble tea, must drink slowly.',
        'Don\'t rush, Singapore still there.',
        'Must save money, always have CPF.'
      ]
    };

    const options = dialogues[behavior] || [typeData.singlish];
    return options[Math.floor(Math.random() * options.length)];
  }

  showDialogBubble(npc, text) {
    const bubble = document.createElement('div');
    bubble.style.cssText = `
      position: absolute;
      left: ${npc.location.x + 100}px;
      top: ${npc.location.z - 20}px;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      padding: 8px 12px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 11px;
      max-width: 200px;
      pointer-events: none;
      z-index: 1000;
      animation: floatUp 3s ease-out forwards;
    `;
    bubble.textContent = text;
    document.body.appendChild(bubble);

    setTimeout(() => bubble.remove(), 3000);
  }

  checkNPCInteractions(npc) {
    if (!this.game.player || !this.isPlayerNearby(npc)) return;

    if (this.game.wantedSystem && this.game.wantedSystem.getHeat() > 0) {
      npc.state.suspicion += 5;
      
      if (npc.state.suspicion > 50 && !npc.ai.alerted) {
        npc.ai.alerted = true;
        this.alertPolice(npc);
      }
    }

    const playerMemory = this.npcMemory.get(this.game.player.id) || [];
    playerMemory.push({
      npcId: npc.id,
      time: Date.now(),
      interaction: npc.state.currentAction
    });
    
    this.npcMemory.set(this.game.player.id, playerMemory);
  }

  alertPolice(npc) {
    if (this.game.govComms) {
      this.game.govComms.broadcast({
        type: 'suspicious_person',
        location: npc.location,
        description: 'NPC ' + npc.type + ' reports suspicious activity'
      });
    }
  }

  startEventLoop() {
    setInterval(() => {
      this.checkDynamicEvents();
      this.spawnNPCs();
    }, 60000);
  }

  checkDynamicEvents() {
    if (Math.random() < 0.05) {
      this.triggerRandomEvent();
    }

    for (let i = this.activeEvents.length - 1; i >= 0; i--) {
      const event = this.activeEvents[i];
      const elapsed = Date.now() - event.startTime;
      
      if (elapsed > event.duration) {
        this.endEvent(event);
        this.activeEvents.splice(i, 1);
      } else {
        this.updateEvent(event);
      }
    }
  }

  triggerRandomEvent() {
    const eventTypes = Object.keys(DynamicEvents);
    const eventId = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const eventData = DynamicEvents[eventId];
    
    const event = {
      id: eventId,
      ...eventData,
      startTime: Date.now(),
      duration: eventData.duration
    };
    
    this.activeEvents.push(event);
    this.broadcastEvent(event);
    
    if (this.game.showNotification) {
      this.game.showNotification(
        'DYNAMIC EVENT',
        event.name + ' - ' + event.singlish
      );
    }
  }

  broadcastEvent(event) {
    this.npcs.forEach(npc => {
      this.reactToEvent(npc, event);
    });
    
    this.applyEventEffects(event);
  }

  reactToEvent(npc, event) {
    const npcType = NPCTypes[npc.type];
    if (!npcType) return;

    switch (event.id) {
      case 'mrt_disruption':
        if (npc.type === 'mrt_commuter') {
          npc.state.suspicion = 50;
          this.showDialogBubble(npc, 'MRT delayed! How to go work!');
        }
        break;
      
      case 'rain_storm':
        npc.state.currentAction = 'running_for_cover';
        break;
      
      case 'triad_territory_war':
        if (npc.type === 'triad_enforcer') {
          npc.state.currentAction = 'fighting';
        } else if (npc.type === 'office_worker') {
          npc.state.currentAction = 'avoid_area';
        }
        break;
    }
  }

  applyEventEffects(event) {
    // Modify game systems based on event
  }

  endEvent(event) {
    if (this.game.showNotification) {
      this.game.showNotification(
        'EVENT ENDED',
        event.name + ' has ended'
      );
    }
  }

  updateEvent(event) {
  }

  spawnNPCs() {
    const spawnLocations = [
      'hawker_centre',
      'mrt_station',
      'hdb_void_deck',
      'cbd_office',
      'park',
      'market'
    ];

    const spawnCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < spawnCount; i++) {
      const location = spawnLocations[Math.floor(Math.random() * spawnLocations.length)];
      const npcType = this.selectNPCForLocation(location);
      
      this.spawnNPC(npcType, location);
    }
  }

  selectNPCForLocation(location) {
    const locationNPCMap = {
      'hawker_centre': ['hawker_stall_owner', 'hawker_customer', 'elderly_void_deck'],
      'mrt_station': ['mrt_commuter', 'police_patrol', 'tourist'],
      'hdb_void_deck': ['elderly_void_deck', 'ns_man', 'hawker_customer'],
      'cbd_office': ['office_worker', 'delivery_rider'],
      'park': ['elderly_void_deck', 'tourist'],
      'market': ['hawker_stall_owner', 'hawker_customer', 'tourist']
    };

    const options = locationNPCMap[location] || ['mrt_commuter'];
    return options[Math.floor(Math.random() * options.length)];
  }

  getWaypointsForLocation(location) {
    return [];
  }

  updateFactionInfluence(npc) {
  }

  getNPCAtPosition(position, radius = 10) {
    return this.npcs.filter(npc => {
      return this.calculateDistance(npc.location, position) < radius;
    });
  }

  getSaveData() {
    return {
      npcCount: this.npcCount,
      activeEvents: this.activeEvents,
      factionTerritories: Array.from(this.factionTerritories.entries()),
      npcMemory: Array.from(this.npcMemory.entries())
    };
  }

  loadSaveData(data) {
    this.npcCount = data.npcCount || 0;
    this.activeEvents = data.activeEvents || [];
    this.factionTerritories = new Map(data.factionTerritories || []);
    this.npcMemory = new Map(data.npcMemory || []);
  }
}

if (typeof window !== 'undefined') {
  window.NPCLivingWorldSystem = NPCLivingWorldSystem;
  window.NPCTypes = NPCTypes;
  window.DynamicEvents = DynamicEvents;
}
