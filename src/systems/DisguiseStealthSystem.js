/**
 * Disguise & Stealth System - Hitman-style for Singapore Streets
 * Social stealth, disguises, suspicion meter, behavior checks
 */

export const SingaporeDisguises = {
  // Uniform disguises
  'spf_officer': {
    name: 'SPF Police Officer',
    category: 'uniform',
    quality: { poor: 0.3, standard: 0.5, high: 0.7, perfect: 0.9 },
    baseSuspicion: 10,
    accessAreas: ['police_hq', 'neighbourhood_police_post', 'crime_scene', 'roadblock'],
    behaviorRules: [
      'walk_purposefully',
      'dont_run_unless_emergency',
      'salute_senior_officers',
      'dont_enter_restricted_without_reason',
      'respond_to_radio_calls'
    ],
    suspicionTriggers: {
      running: 15,
      trespassing: 25,
      wrong_area: 10,
      witnessed_crime: 50,
      body_found: 40,
      cctv_spotted: 20,
      civilian_report: 30
    },
    blowCondition: ['witnessed_crime', 'body_found_in_disguise', 'senior_officer_questions'],
    source: 'police_locker',
    cost: 5000,
    legalRisk: 'high'
  },

  'mrt_staff': {
    name: 'MRT Station Staff',
    category: 'uniform',
    quality: { poor: 0.4, standard: 0.6, high: 0.8, perfect: 0.95 },
    baseSuspicion: 5,
    accessAreas: ['mrt_station', 'staff_room', 'control_room', 'tunnel_access', 'depot'],
    behaviorRules: [
      'check_ezlink_cards',
      'announce_stations',
      'help_elderly_disabled',
      'patrol_platform',
      'respond_to_intercom'
    ],
    suspicionTriggers: {
      running: 10,
      trespassing: 20,
      wrong_area: 15,
      witnessed_crime: 40,
      body_found: 35,
      cctv_spotted: 15,
      civilian_report: 25
    },
    blowCondition: ['witnessed_crime', 'body_found_in_disguise', 'station_master_checks_roster'],
    source: 'uniform_vendor',
    cost: 3000,
    legalRisk: 'medium'
  },

  'food_delivery': {
    name: 'Food Delivery Rider (GrabFood/Foodpanda/Deliveroo)',
    category: 'uniform',
    quality: { poor: 0.5, standard: 0.7, high: 0.9, perfect: 1.0 },
    baseSuspicion: 2,
    accessAreas: ['condo_lobby', 'office_building', 'hawker_centre', 'restaurant_kitchen', 'mrt_station'],
    behaviorRules: [
      'wear_helmet_with_bag',
      'use_delivery_app_on_phone',
      'dont_loiter_at_destination',
      'follow_navigation',
      'call_customer_on_arrival'
    ],
    suspicionTriggers: {
      running: 5,
      trespassing: 10,
      wrong_area: 5,
      witnessed_crime: 30,
      body_found: 25,
      cctv_spotted: 10,
      civilian_report: 15
    },
    blowCondition: ['witnessed_crime', 'customer_reports_fake', 'restaurant_staff_checks_order'],
    source: 'delivery_bag_purchase',
    cost: 1500,
    legalRisk: 'low'
  },

  'cleaner': {
    name: 'Cleaner / Janitor',
    category: 'uniform',
    quality: { poor: 0.6, standard: 0.8, high: 0.95, perfect: 1.0 },
    baseSuspicion: 1,
    accessAreas: ['all_buildings', 'vents', 'roof_access', 'service_corridors', 'basement', 'bin_centre'],
    behaviorRules: [
      'push_cleaning_cart',
      'mop_floors',
      'empty_bins',
      'dont_talk_to_residents',
      'wear_earphones_pretend_music'
    ],
    suspicionTriggers: {
      running: 5,
      trespassing: 5,
      wrong_area: 5,
      witnessed_crime: 20,
      body_found: 30,
      cctv_spotted: 5,
      civilian_report: 10
    },
    blowCondition: ['witnessed_crime', 'body_found_in_disguise', 'supervisor_checks_schedule'],
    source: 'contractor_office',
    cost: 2000,
    legalRisk: 'low'
  },

  'security_guard': {
    name: 'Security Guard (Certis/G4S/Aetos)',
    category: 'uniform',
    quality: { poor: 0.4, standard: 0.6, high: 0.8, perfect: 0.9 },
    baseSuspicion: 8,
    accessAreas: ['condo', 'mall', 'construction_site', 'office_building', 'industrial_park'],
    behaviorRules: [
      'patrol_perimeter',
      'check_visitor_pass',
      'monitor_cctv',
      'log_incidents',
      'dont_leave_post'
    ],
    suspicionTriggers: {
      running: 15,
      trespassing: 20,
      wrong_area: 15,
      witnessed_crime: 45,
      body_found: 40,
      cctv_spotted: 20,
      civilian_report: 30
    },
    blowCondition: ['witnessed_crime', 'body_found_in_disguise', 'client_checks_roster', 'shift_change'],
    source: 'security_firm',
    cost: 4000,
    legalRisk: 'medium'
  },

  'construction_worker': {
    name: 'Construction Worker (Foreign Worker)',
    category: 'uniform',
    quality: { poor: 0.5, standard: 0.7, high: 0.9, perfect: 0.95 },
    baseSuspicion: 3,
    accessAreas: ['construction_site', 'mrt_tunnel', 'roadworks', 'renovation', 'scaffold'],
    behaviorRules: [
      'wear_helmet_vest_boots',
      'carry_tools',
      'work_in_group',
      'speak_little_english',
      'take_breaks_at_canteen'
    ],
    suspicionTriggers: {
      running: 10,
      trespassing: 10,
      wrong_area: 10,
      witnessed_crime: 25,
      body_found: 20,
      cctv_spotted: 10,
      civilian_report: 15
    },
    blowCondition: ['witnessed_crime', 'foreman_checks_roster', 'safety_officer_inspects'],
    source: 'labour_contractor',
    cost: 2500,
    legalRisk: 'low'
  },

  'nurse_paramedic': {
    name: 'Nurse / Paramedic (SCDF)',
    category: 'uniform',
    quality: { poor: 0.4, standard: 0.6, high: 0.85, perfect: 0.95 },
    baseSuspicion: 5,
    accessAreas: ['hospital', 'polyclinic', 'ambulance', 'emergency_dept', 'ward'],
    behaviorRules: [
      'carry_medical_bag',
      'push_stretcher',
      'wear_stethoscope',
      'check_patient_notes',
      'respond_to_code_blue'
    ],
    suspicionTriggers: {
      running: 20,
      trespassing: 25,
      wrong_area: 20,
      witnessed_crime: 50,
      body_found: 45,
      cctv_spotted: 25,
      civilian_report: 35
    },
    blowCondition: ['witnessed_crime', 'body_found_in_disguise', 'doctor_questions', 'shift_handover'],
    source: 'hospital_locker',
    cost: 6000,
    legalRisk: 'high'
  },

  'taxi_driver': {
    name: 'Taxi Driver (7 Companies)',
    category: 'uniform',
    quality: { poor: 0.5, standard: 0.7, high: 0.9, perfect: 1.0 },
    baseSuspicion: 3,
    accessAreas: ['taxi_stand', 'anywhere_driving', 'airport_holding_area', 'hotel_driveway'],
    behaviorRules: [
      'display_taxi_sign',
      'use_meter_or_app',
      'know_routes',
      'chat_with_passengers',
      'dont_refuse_fare'
    ],
    suspicionTriggers: {
      running: 10,
      trespassing: 5,
      wrong_area: 5,
      witnessed_crime: 35,
      body_found: 30,
      cctv_spotted: 15,
      civilian_report: 20
    },
    blowCondition: ['witnessed_crime', 'passenger_reports', 'lta_checks_license', 'accident'],
    source: 'taxi_stand_rental',
    cost: 3500,
    legalRisk: 'low'
  },

  'student': {
    name: 'Student (Poly/Uni/Secondary)',
    category: 'civilian',
    quality: { poor: 0.6, standard: 0.8, high: 0.95, perfect: 1.0 },
    baseSuspicion: 1,
    accessAreas: ['school', 'polytechnic', 'university', 'library', 'mrt', 'mall', 'hawker_centre'],
    behaviorRules: [
      'wear_uniform_or_casual',
      'carry_backpack',
      'use_phone_study',
      'hang_out_in_groups',
      'queue_properly'
    ],
    suspicionTriggers: {
      running: 5,
      trespassing: 15,
      wrong_area: 10,
      witnessed_crime: 20,
      body_found: 25,
      cctv_spotted: 10,
      civilian_report: 15
    },
    blowCondition: ['witnessed_crime', 'teacher_recognises', 'school_cctv', 'parent_called'],
    source: 'uniform_shop',
    cost: 1000,
    legalRisk: 'very_low'
  },

  'ns_man': {
    name: 'NS Man (Reservist)',
    category: 'uniform',
    quality: { poor: 0.4, standard: 0.6, high: 0.8, perfect: 0.9 },
    baseSuspicion: 8,
    accessAreas: ['army_camp', 'safra', 'ippt_venue', 'saf_day', 'medical_centre'],
    behaviorRules: [
      'wear_no4_or_pt_kit',
      'carry_field_pack',
      'book_in_out',
      'follow_sops',
      'address_seniors_properly'
    ],
    suspicionTriggers: {
      running: 20,
      trespassing: 30,
      wrong_area: 25,
      witnessed_crime: 50,
      body_found: 45,
      cctv_spotted: 25,
      civilian_report: 35
    },
    blowCondition: ['witnessed_crime', 'sgt_major_checks_ic', 'medical_officer_verifies', 'awol_check'],
    source: 'camp_locker',
    cost: 5000,
    legalRisk: 'high'
  }
};

// Social Stealth Zones
export const SocialStealthZones = {
  'hawker_centre': {
    name: 'Hawker Centre',
    blendFactor: 0.9, // 90% suspicion reduction
    requirements: ['order_food', 'sit_at_table', 'eat_visible'],
    duration: 300000, // 5 minutes max blend
    npcTypes: ['eater', 'cleaner', 'stall_owner', 'elderly_group', 'family'],
    activities: ['eating', 'chopping', 'drinking_kopi', 'reading_paper', 'chatting'],
    chopeSystem: true // Tissue packet reserves seat
  },

  'mrt_train': {
    name: 'MRT Train (Peak Hour)',
    blendFactor: 0.95,
    requirements: ['stand_hold_strap', 'face_forward', 'dont_make_eye_contact'],
    duration: 600000, // 10 minutes (ride duration)
    npcTypes: ['commuter', 'student', 'elderly', 'worker', 'tourist'],
    activities: ['phone_scrolling', 'sleeping', 'reading', 'listening_music'],
    peakHours: [[7, 9], [17, 20]] // 7-9am, 5-8pm
  },

  'mrt_platform': {
    name: 'MRT Platform',
    blendFactor: 0.8,
    requirements: ['stand_behind_yellow_line', 'tap_ezlink', 'wait_for_train'],
    duration: 180000,
    npcTypes: ['commuter', 'station_staff', 'security'],
    activities: ['waiting', 'checking_phone', 'reading_signage']
  },

  'void_deck': {
    name: 'HDB Void Deck',
    blendFactor: 0.85,
    requirements: ['sit_on_bench', 'dont_loiter_suspiciously'],
    duration: 600000,
    npcTypes: ['elderly_chess', 'grandma_chatting', 'kids_playing', 'cat_feeder', 'exercise_uncle'],
    activities: ['chinese_chess', 'chatting', 'exercise', 'feeding_cats', 'reading_news'],
    safeZone: true // Police rarely patrol
  },

  'queue': {
    name: 'Queue (Any)',
    blendFactor: 1.0, // Perfect blend
    requirements: ['stand_in_line', 'dont_cut', 'face_forward'],
    duration: Infinity, // As long as queue exists
    npcTypes: ['queuer'],
    activities: ['waiting', 'phone', 'chatting_quietly'],
    singaporeBehavior: 'chope' // Respect queue or gain heat
  },

  'office_lobby': {
    name: 'Office Building Lobby',
    blendFactor: 0.7,
    requirements: ['wear_office_attire', 'tap_access_card', 'walk_to_lift'],
    duration: 120000,
    npcTypes: ['office_worker', 'security', 'receptionist', 'delivery'],
    activities: ['rushing_to_meeting', 'coffee_in_hand', 'checking_badge']
  },

  'hospital': {
    name: 'Hospital / Polyclinic',
    blendFactor: 0.8,
    requirements: ['wear_mask', 'carry_appointment_slip', 'sit_in_waiting_area'],
    duration: 300000,
    npcTypes: ['patient', 'nurse', 'doctor', 'visitor', 'cleaner'],
    activities: ['waiting', 'consulting', 'collecting_meds', 'visiting_ward']
  }
};

export class DisguiseStealthSystem {
  constructor(game) {
    this.game = game;
    this.currentDisguise = null;
    this.disguiseQuality = 'standard';
    this.suspicion = 0;
    this.maxSuspicion = 100;
    this.isBlending = false;
    this.currentBlendZone = null;
    this.blendStartTime = 0;
    this.disguiseInventory = [];
    this.unlockedDisguises = ['civilian']; // Start with civilian clothes
    this.suspicionDecayRate = 1; // Per second when not doing suspicious things
    this.lastSuspicionChange = Date.now();
    this.behaviorViolations = [];
    this.cctvCoverage = new Map(); // Track CCTV exposure
    this.witnesses = new Set(); // NPCs who saw suspicious behavior
    
    this.setupUI();
  }

  setupUI() {
    // Suspicion meter UI
    this.ui = document.createElement('div');
    this.ui.id = 'disguise-stealth-ui';
    this.ui.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 280px;
      background: rgba(0, 0, 0, 0.9);
      border: 2px solid #ffff00;
      border-radius: 8px;
      padding: 15px;
      color: #fff;
      font-family: monospace;
      font-size: 11px;
      z-index: 10000;
      display: none;
    `;
    document.body.appendChild(this.ui);

    // Disguise indicator
    this.indicator = document.createElement('div');
    this.indicator.id = 'disguise-indicator';
    this.indicator.style.cssText = `
      position: fixed;
      top: 80px;
      left: 20px;
      background: rgba(0, 0, 0, 0.8);
      border: 1px solid #00ffff;
      border-radius: 6px;
      padding: 8px 12px;
      color: #00ffff;
      font-family: monospace;
      font-size: 11px;
      z-index: 10000;
    `;
    this.indicator.textContent = '👤 Civilian';
    document.body.appendChild(this.indicator);
  }

  // Wear a disguise
  wearDisguise(disguiseId, quality = 'standard') {
    const disguise = SingaporeDisguises[disguiseId];
    if (!disguise) return false;

    if (!this.unlockedDisguises.includes(disguiseId)) {
      if (this.game.showNotification) {
        this.game.showNotification('🔒 DISGUISE LOCKED', `Unlock ${disguise.name} first`);
      }
      return false;
    }

    // Check if player has the disguise item
    if (!this.hasDisguiseItem(disguiseId)) {
      if (this.game.showNotification) {
        this.game.showNotification('❌ NO DISGUISE', `Acquire ${disguise.name} first`);
      }
      return false;
    }

    this.currentDisguise = disguiseId;
    this.disguiseQuality = quality;
    this.suspicion = disguise.baseSuspicion * (1.5 - disguise.quality[quality]);
    this.updateUI();

    if (this.game.showNotification) {
      this.game.showNotification('🎭 DISGUISE ON', `${disguise.name} (${quality})`);
    }

    // Voice
    if (window.voiceSynth) {
      window.voiceSynth.speakSinglish(
        `Wearing ${disguise.name}, ${this.getSinglishReaction()}`,
        'chinese_singaporean'
      );
    }

    return true;
  }

  // Remove disguise
  removeDisguise() {
    if (this.currentDisguise) {
      const name = SingaporeDisguises[this.currentDisguise].name;
      if (this.game.showNotification) {
        this.game.showNotification('👤 DISGUISE OFF', `Removed ${name}`);
      }
    }
    this.currentDisguise = null;
    this.disguiseQuality = 'standard';
    this.suspicion = 0;
    this.updateUI();
  }

  // Check if player has disguise item
  hasDisguiseItem(disguiseId) {
    return this.disguiseInventory.includes(disguiseId);
  }

  // Add disguise to inventory
  addDisguise(disguiseId) {
    if (!this.disguiseInventory.includes(disguiseId)) {
      this.disguiseInventory.push(disguiseId);
      if (this.game.showNotification) {
        this.game.showNotification('🎭 DISGUISE ACQUIRED', SingaporeDisguises[disguiseId].name);
      }
    }
  }

  // Unlock disguise (permanent)
  unlockDisguise(disguiseId) {
    if (!this.unlockedDisguises.includes(disguiseId)) {
      this.unlockedDisguises.push(disguiseId);
      if (this.game.showNotification) {
        this.game.showNotification('🔓 DISGUISE UNLOCKED', SingaporeDisguises[disguiseId].name);
      }
    }
  }

  // Increase suspicion
  addSuspicion(amount, reason) {
    if (!this.currentDisguise) return; // No disguise = no suspicion system

    const disguise = SingaporeDisguises[this.currentDisguise];
    const multiplier = this.isBlending ? 0.3 : 1.0;
    const finalAmount = amount * multiplier * (1.5 - disguise.quality[this.disguiseQuality]);

    this.suspicion = Math.min(this.maxSuspicion, this.suspicion + finalAmount);
    this.behaviorViolations.push({ reason, amount: finalAmount, time: Date.now() });
    this.lastSuspicionChange = Date.now();

    // Check for blow
    if (this.suspicion >= 100) {
      this.blowDisguise(reason);
    } else if (this.suspicion >= 75) {
      if (this.game.showNotification) {
        this.game.showNotification('⚠️ HIGH SUSPICION', `${Math.round(this.suspicion)}% - Act natural!`);
      }
    } else if (this.suspicion >= 50) {
      if (this.game.showNotification) {
        this.game.showNotification('⚠️ SUSPICION RISING', `${Math.round(this.suspicion)}%`);
      }
    }

    this.updateUI();
  }

  // Disguise blown
  blowDisguise(reason) {
    if (this.game.showNotification) {
      this.game.showNotification('💥 COVER BLOWN', `Disguise compromised: ${reason}`);
    }

    // Immediate heat increase
    if (this.game.wantedSystem) {
      this.game.wantedSystem.addHeat(3);
    }

    // Alert nearby NPCs
    this.alertNearbyNPCs();

    // Remove disguise
    this.removeDisguise();

    // Voice
    if (window.voiceSynth) {
      window.voiceSynth.speakSinglish('Alamak! Cover blown!', 'chinese_singaporean');
    }
  }

  // Alert nearby NPCs
  alertNearbyNPCs() {
    // Find nearby NPCs and set them to alert/suspicious
    if (this.game.npcManager) {
      const nearby = this.game.npcManager.getNearbyNPCs(this.game.player.position, 30);
      nearby.forEach(npc => {
        npc.setAlert(true);
        npc.setSuspicious(this.game.player);
      });
    }
  }

  // Start blending in social stealth zone
  startBlending(zoneType) {
    const zone = SocialStealthZones[zoneType];
    if (!zone) return false;

    // Check requirements
    const canBlend = this.checkBlendRequirements(zone);
    if (!canBlend) {
      if (this.game.showNotification) {
        this.game.showNotification('❌ CANNOT BLEND', `Requirements not met for ${zone.name}`);
      }
      return false;
    }

    this.isBlending = true;
    this.currentBlendZone = zoneType;
    this.blendStartTime = Date.now();

    if (this.game.showNotification) {
      this.game.showNotification('🕵️ BLENDING IN', `${zone.name} - Suspicion reduced ${Math.round(zone.blendFactor * 100)}%`);
    }

    // Voice
    if (window.voiceSynth) {
      window.voiceSynth.speakSinglish('Act natural, lah', 'chinese_singaporean');
    }

    return true;
  }

  // Stop blending
  stopBlending() {
    if (this.isBlending) {
      const zone = SocialStealthZones[this.currentBlendZone];
      if (this.game.showNotification) {
        this.game.showNotification('🚶 STOPPED BLENDING', `Left ${zone?.name || 'zone'}`);
      }
      this.isBlending = false;
      this.currentBlendZone = null;
      this.blendStartTime = 0;
    }
  }

  // Check blend requirements
  checkBlendRequirements(zone) {
    // Simplified - in reality would check player state
    // e.g., has food item, is sitting, has EZ-Link, etc.
    return true;
  }

  // Behavior check - called when player does actions
  checkBehavior(action) {
    if (!this.currentDisguise) return;

    const disguise = SingaporeDisguises[this.currentDisguise];
    const triggers = disguise.suspicionTriggers;

    if (triggers[action] !== undefined) {
      this.addSuspicion(triggers[action], action);
    }

    // Check behavior rules
    if (!this.isBehaviorCorrect(action, disguise)) {
      this.addSuspicion(10, `wrong_behavior_${action}`);
    }
  }

  // Verify behavior is correct for disguise
  isBehaviorCorrect(action, disguise) {
    // Simplified - would check actual player behavior
    // e.g., running while disguised as cleaner = wrong
    const wrongBehaviors = {
      'spf_officer': ['running', 'loitering', 'entering_civilian_areas'],
      'mrt_staff': ['running', 'not_helping_elderly', 'wrong_platform'],
      'food_delivery': ['loitering', 'no_bag', 'wrong_building'],
      'cleaner': ['running', 'talking_to_residents', 'no_cart'],
      'security_guard': ['leaving_post', 'running', 'not_checking_passes'],
      'construction_worker': ['no_helmet', 'no_vest', 'speaking_good_english'],
      'nurse_paramedic': ['running_in_hallway', 'no_equipment', 'wrong_ward'],
      'taxi_driver': ['refusing_fare', 'no_taxi_sign', 'wrong_route'],
      'student': ['in_restricted_area', 'smoking', 'uniform_violation'],
      'ns_man': ['awol', 'no_ic', 'disrespect_senior', 'wrong_camp']
    };

    return !wrongBehaviors[this.currentDisguise]?.includes(action);
  }

  // CCTV exposure
  registerCCTVExposure(cameraId, position) {
    if (!this.currentDisguise) return;

    const now = Date.now();
    const lastExposure = this.cctvCoverage.get(cameraId) || 0;
    
    if (now - lastExposure > 5000) { // 5 second cooldown per camera
      this.cctvCoverage.set(cameraId, now);
      this.addSuspicion(5, 'cctv_spotted');
      
      // If disguise is poor quality, higher chance of being identified
      const disguise = SingaporeDisguises[this.currentDisguise];
      if (disguise.quality[this.disguiseQuality] < 0.6 && Math.random() < 0.3) {
        this.addSuspicion(20, 'cctv_identified');
      }
    }
  }

  // Witness reports player
  registerWitness(npcId) {
    if (!this.currentDisguise) return;
    
    this.witnesses.add(npcId);
    this.addSuspicion(15, 'civilian_report');
  }

  // Update loop
  update(delta) {
    const now = Date.now();

    // Suspicion decay
    if (this.suspicion > 0 && now - this.lastSuspicionChange > 5000) {
      this.suspicion = Math.max(0, this.suspicion - this.suspicionDecayRate * delta * 0.001);
      this.updateUI();
    }

    // Blend duration check
    if (this.isBlending && this.currentBlendZone) {
      const zone = SocialStealthZones[this.currentBlendZone];
      const elapsed = now - this.blendStartTime;
      
      if (elapsed > zone.duration) {
        this.stopBlending();
        if (this.game.showNotification) {
          this.game.showNotification('⏰ BLEND TIME OVER', 'Staying too long looks suspicious');
        }
      }
    }

    // Check if player left blend zone
    if (this.isBlending && this.game.player) {
      const inZone = this.checkPlayerInBlendZone();
      if (!inZone) {
        this.stopBlending();
      }
    }

    // CCTV coverage cleanup
    if (now % 10000 < delta) { // Every 10 seconds
      for (const [cameraId, time] of this.cctvCoverage) {
        if (now - time > 60000) { // 1 minute
          this.cctvCoverage.delete(cameraId);
        }
      }
    }
  }

  checkPlayerInBlendZone() {
    if (!this.currentBlendZone || !this.game.player) return false;
    
    const zone = SocialStealthZones[this.currentBlendZone];
    const playerPos = this.game.player.position;
    
    // Would check actual zone boundaries
    // Simplified: return true if near relevant POI
    return true; // Placeholder
  }

  updateUI() {
    // Update indicator
    if (this.currentDisguise) {
      const disguise = SingaporeDisguises[this.currentDisguise];
      const qualityColors = { poor: '#ff4444', standard: '#ffff00', high: '#00ff00', perfect: '#00ffff' };
      this.indicator.textContent = `🎭 ${disguise.name} (${this.disguiseQuality})`;
      this.indicator.style.borderColor = qualityColors[this.disguiseQuality];
      this.indicator.style.color = qualityColors[this.disguiseQuality];
    } else {
      this.indicator.textContent = '👤 Civilian';
      this.indicator.style.borderColor = '#00ffff';
      this.indicator.style.color = '#00ffff';
    }

    // Update detailed UI if open
    if (this.ui.style.display !== 'none') {
      this.renderUI();
    }
  }

  renderUI() {
    let html = '<h3 style="color: #ffff00; margin-bottom: 10px;">🎭 DISGUISE & STEALTH</h3>';
    
    // Suspicion meter
    const suspicionColor = this.suspicion < 30 ? '#00ff00' : this.suspicion < 60 ? '#ffff00' : this.suspicion < 90 ? '#ff8800' : '#ff0000';
    html += `<div style="margin-bottom: 10px;">Suspicion: <span style="color: ${suspicionColor}">${Math.round(this.suspicion)}%</span></div>`;
    html += `<div style="height: 10px; background: #333; border-radius: 5px; overflow: hidden; margin-bottom: 10px;">
      <div style="width: ${this.suspicion}%; height: 100%; background: ${suspicionColor}; transition: width 0.3s;"></div>
    </div>`;

    // Current disguise
    if (this.currentDisguise) {
      const d = SingaporeDisguises[this.currentDisguise];
      html += `<div style="margin-bottom: 10px; padding: 8px; background: rgba(255,255,0,0.1); border-radius: 4px;">`;
      html += `<strong>${d.name}</strong> (${this.disguiseQuality})<br>`;
      html += `<span style="font-size: 10px; color: #888;">Access: ${d.accessAreas.join(', ')}</span>`;
      html += `</div>`;
    }

    // Blend status
    if (this.isBlending) {
      const zone = SocialStealthZones[this.currentBlendZone];
      const elapsed = Date.now() - this.blendStartTime;
      const remaining = Math.max(0, zone.duration - elapsed);
      html += `<div style="color: #00ff00; margin-bottom: 10px;">🕵️ Blending: ${zone.name}</div>`;
      html += `<div style="font-size: 10px; color: #888;">Time: ${Math.round(remaining/1000)}s</div>`;
    }

    // Available disguises
    html += '<div style="margin-top: 10px;"><strong>Available Disguises:</strong></div>';
    for (const id of this.unlockedDisguises) {
      if (id === 'civilian') continue;
      const d = SingaporeDisguises[id];
      const has = this.hasDisguiseItem(id);
      html += `<button onclick="window.game.disguiseSystem.wearDisguise('${id}')" 
        style="display:block;width:100%;padding:6px;margin:3px 0;background:${has?'rgba(0,255,255,0.1)':'rgba(255,0,0,0.1)'};border:1px solid ${has?'#00ffff':'#ff4444'};color:${has?'#00ffff':'#ff4444'};border-radius:4px;cursor:pointer;font-size:10px;text-align:left;">
        ${d.name} ${has ? '' : '(Acquire first)'}
      </button>`;
    }

    // Social stealth zones
    html += '<div style="margin-top: 10px;"><strong>Social Stealth Zones:</strong></div>';
    for (const [id, zone] of Object.entries(SocialStealthZones)) {
      html += `<button onclick="window.game.disguiseSystem.startBlending('${id}')" 
        style="display:block;width:100%;padding:4px;margin:2px 0;background:rgba(0,255,0,0.1);border:1px solid #00ff00;color:#00ff00;border-radius:4px;cursor:pointer;font-size:10px;text-align:left;">
        ${zone.name} (${Math.round(zone.blendFactor*100)}% blend)
      </button>`;
    }

    html += '<div style="margin-top: 10px; color: #888; font-size: 10px;">Press D to close</div>';
    this.ui.innerHTML = html;
  }

  toggleUI() {
    this.ui.style.display = this.ui.style.display === 'none' ? 'block' : 'none';
    if (this.ui.style.display === 'block') {
      this.renderUI();
    }
  }

  getSinglishReaction() {
    const reactions = ['steady lah', 'act natural lor', 'don\'t play play', 'sure win one', 'confirm plus chop'];
    return reactions[Math.floor(Math.random() * reactions.length)];
  }

  // Get current disguise data
  getCurrentDisguise() {
    if (!this.currentDisguise) return null;
    return {
      ...SingaporeDisguises[this.currentDisguise],
      quality: this.disguiseQuality,
      suspicion: this.suspicion,
      isBlending: this.isBlending,
      blendZone: this.currentBlendZone
    };
  }

  // Save/Load
  getSaveData() {
    return {
      currentDisguise: this.currentDisguise,
      disguiseQuality: this.disguiseQuality,
      suspicion: this.suspicion,
      disguiseInventory: this.disguiseInventory,
      unlockedDisguises: this.unlockedDisguises,
      isBlending: this.isBlending,
      currentBlendZone: this.currentBlendZone
    };
  }

  loadSaveData(data) {
    this.currentDisguise = data.currentDisguise || null;
    this.disguiseQuality = data.disguiseQuality || 'standard';
    this.suspicion = data.suspicion || 0;
    this.disguiseInventory = data.disguiseInventory || [];
    this.unlockedDisguises = data.unlockedDisguises || ['civilian'];
    this.isBlending = data.isBlending || false;
    this.currentBlendZone = data.currentBlendZone || null;
    this.updateUI();
  }
}

if (typeof window !== 'undefined') {
  window.DisguiseStealthSystem = DisguiseStealthSystem;
  window.SingaporeDisguises = SingaporeDisguises;
  window.SocialStealthZones = SocialStealthZones;
}