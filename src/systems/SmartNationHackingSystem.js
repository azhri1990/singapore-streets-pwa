/**
 * Smart Nation Hacking System - Watch Dogs style for Singapore Streets
 * Hackable city infrastructure, Smart Nation systems, ctOS-SG
 */

export const HackableSystems = {
  // TRANSPORTATION
  'MRT_Signaling': {
    name: 'MRT Signaling System',
    category: 'transportation',
    location: ['mrt_depot', 'mrt_control_room', 'mrt_station'],
    difficulty: 60,
    cost: 50,
    effects: {
      'delay_trains': {
        name: 'Delay Trains',
        description: 'Add 5-10 minute delays to all trains',
        duration: 600000, // 10 minutes
        heat: 2,
        requires: ['access_control_room'],
        singlish: 'Make trains slow slow one'
      },
      'reroute_trains': {
        name: 'Reroute Trains',
        description: 'Redirect trains to maintenance depot',
        duration: 300000,
        heat: 3,
        requires: ['mrt_expertise'],
        singlish: 'Train go wrong place!'
      },
      'emergency_brake': {
        name: 'Emergency Brake',
        description: 'Emergency stop for target train',
        duration: 60000,
        heat: 4,
        requires: ['real_time_access'],
        singlish: 'Brake brake!'
      },
      'ghost_train': {
        name: 'Ghost Train',
        description: 'Make train invisible on display boards',
        duration: 600000,
        heat: 2,
        singlish: 'Train disappear!'
      }
    },
    security: {
      'cctv': true,
      'biometric': true,
      'two_factor': true,
      'alert_lta': 30000
    },
    singlish: 'MRT one, can make people late for work'
  },

  'ERP_Gantry': {
    name: 'ERP Gantry System',
    category: 'transportation',
    location: ['erp_gantry', 'lta_control_centre'],
    difficulty: 40,
    cost: 30,
    effects: {
      'disable_charge': {
        name: 'Disable Charging',
        description: 'Free passage for all vehicles',
        duration: 1800000, // 30 minutes
        heat: 1,
        singlish: 'Free pass for all cars!'
      },
      'free_passage': {
        name: 'Free Passage List',
        description: 'Whitelist target vehicle',
        duration: 3600000,
        heat: 2,
        requires: ['vehicle_id'],
        singlish: 'This car can go free'
      },
      'redirect_traffic': {
        name: 'Redirect Traffic',
        description: 'Change gantry timing to alter traffic flow',
        duration: 600000,
        heat: 2,
        singlish: 'Make traffic jam elsewhere'
      },
      'fake_violation': {
        name: 'Fake Violation Ticket',
        description: 'Generate false ERP fines for target',
        duration: 0,
        heat: 3,
        requires: ['target_vehicle'],
        singlish: 'Make them pay more'
      }
    },
    security: {
      'cctv': true,
      'encryption': true,
      'alert_lta': 60000
    },
    singlish: 'ERP one, can save money'
  },

  'Traffic_Lights': {
    name: 'Traffic Light Control',
    category: 'transportation',
    location: ['junction', 'traffic_control_room'],
    difficulty: 20,
    cost: 20,
    effects: {
      'all_green': {
        name: 'All Green',
        description: 'Green light for all directions (chaos)',
        duration: 120000,
        heat: 3,
        singlish: 'Green everywhere, crash sure'
      },
      'all_red': {
        name: 'All Red',
        description: 'Red light all around (gridlock)',
        duration: 120000,
        heat: 2,
        singlish: 'All red, nobody can move'
      },
      'chaos_mode': {
        name: 'Chaos Mode',
        description: 'Random light changes',
        duration: 180000,
        heat: 4,
        singlish: 'All confused one'
      },
      'escort_green': {
        name: 'Escort Green Wave',
        description: 'Green lights for target route',
        duration: 600000,
        heat: 2,
        requires: ['target_route'],
        singlish: 'Make way for boss'
      }
    },
    security: {
      'local_control': true,
      'alert_traffic_police': 120000
    },
    singlish: 'Traffic light can make own game'
  },

  'Bus_Tracking': {
    name: 'Bus Arrival System',
    category: 'transportation',
    location: ['bus_stop', 'sbs_terminal', 'smrt_depot'],
    difficulty: 25,
    cost: 15,
    effects: {
      'ghost_buses': {
        name: 'Ghost Buses',
        description: 'Show false bus arrivals',
        duration: 600000,
        heat: 1,
        singlish: 'Bus come but no come'
      },
      'wrong_route': {
        name: 'Wrong Route Display',
        description: 'Show bus on wrong route',
        duration: 300000,
        heat: 1,
        singlish: 'Bus go wrong place'
      },
      'bunch_buses': {
        name: 'Bunch Buses',
        description: 'Make all buses arrive together',
        duration: 600000,
        heat: 2,
        singlish: 'Many buses come together'
      },
      'bus_detective': {
        name: 'Bus Detective',
        description: 'Track all buses in real-time',
        duration: 0,
        heat: 0,
        singlish: 'Know where all buses are'
      }
    },
    security: {
      'minimal': true,
      'alert_operator': 300000
    },
    singlish: 'Bus timing very important one'
  },

  // SURVEILLANCE
  'CCTV_Network': {
    name: 'Safe City CCTV Network',
    category: 'surveillance',
    location: ['street', 'mrt_station', 'mall', 'hdb_entrance', 'park'],
    difficulty: 45,
    cost: 40,
    effects: {
      'loop_feed': {
        name: 'Loop Feed',
        description: 'Replay old footage on loop',
        duration: 300000,
        heat: 2,
        singlish: 'Camera see same thing only'
      },
      'delete_footage': {
        name: 'Delete Footage',
        description: 'Erase recordings for time period',
        duration: 0,
        heat: 4,
        requires: ['admin_access'],
        singlish: 'Can delete evidence'
      },
      'track_target': {
        name: 'Track Target',
        description: 'Follow person across camera network',
        duration: 1800000,
        heat: 1,
        singlish: 'Can follow people'
      },
      'blind_spot': {
        name: 'Create Blind Spot',
        description: 'Make cameras offline',
        duration: 120000,
        heat: 3,
        singlish: 'Camera cannot see'
      }
    },
    security: {
      'cctv': true,
      'ai_monitoring': true,
      'alert_police': 60000
    },
    singlish: 'CCTV everywhere ah'
  },

  'Police_Radio': {
    name: 'SPF Police Radio Network',
    category: 'surveillance',
    location: ['police_station', 'police_patrol', 'mrt_police'],
    difficulty: 55,
    cost: 35,
    effects: {
      'false_dispatch': {
        name: 'False Dispatch',
        description: 'Send police to fake locations',
        duration: 600000,
        heat: 3,
        singlish: 'Police go wrong place'
      },
      'mislead_units': {
        name: 'Mislead Units',
        description: 'Give false info to police',
        duration: 600000,
        heat: 3,
        singlish: 'Tell police wrong thing'
      },
      'silent_alarm': {
        name: 'Silent Alarm',
        description: 'Mute police calls in area',
        duration: 300000,
        heat: 4,
        singlish: 'Police cannot call for help'
      },
      'listen_in': {
        name: 'Listen In',
        description: 'Monitor police communications',
        duration: 1800000,
        heat: 2,
        singlish: 'Can hear police talk'
      }
    },
    security: {
      'encryption': true,
      'biometric': true,
      'alert_cpf': 30000
    },
    singlish: 'Police radio can hear'
  },

  'Safe_City_Cameras': {
    name: 'Safe City Camera System',
    category: 'surveillance',
    location: ['street', 'mrt', 'park', 'hdb'],
    difficulty: 50,
    cost: 45,
    effects: {
      'face_blur': {
        name: 'Face Blur',
        description: 'Make faces unrecognizable',
        duration: 600000,
        heat: 2,
        singlish: 'Face cannot recognize'
      },
      'fake_alert': {
        name: 'Fake Alert',
        description: 'Trigger false alarms',
        duration: 0,
        heat: 3,
        singlish: 'Make police think got crime'
      },
      'camera_spoof': {
        name: 'Camera Spoof',
        description: 'Show false activity',
        duration: 300000,
        heat: 3,
        singlish: 'Camera show fake scene'
      }
    },
    security: {
      'ai_monitoring': true,
      'alert_police': 45000
    },
    singlish: 'Safe city cameras everywhere'
  },

  // INFRASTRUCTURE
  'Power_Grid': {
    name: 'SP Group Power Grid',
    category: 'infrastructure',
    location: ['substation', 'power_plant', 'grid_control_room'],
    difficulty: 70,
    cost: 60,
    effects: {
      'blackout_district': {
        name: 'Blackout District',
        description: 'Cut power to selected area',
        duration: 600000,
        heat: 5,
        singlish: 'Power trip!'
      },
      'surge_damage': {
        name: 'Power Surge',
        description: 'Damage electronics in area',
        duration: 60000,
        heat: 4,
        singlish: 'Make electronics spoil'
      },
      'emergency_lights': {
        name: 'Emergency Lights Only',
        description: 'Dim all lights, emergency on',
        duration: 300000,
        heat: 3,
        singlish: 'All dark dark'
      },
      'grid_overload': {
        name: 'Grid Overload Warning',
        description: 'Fake overload alert',
        duration: 120000,
        heat: 2,
        singlish: 'Make people panic'
      }
    },
    security: {
      'biometric': true,
      'two_factor': true,
      'air_gapped': true,
      'alert_sp_group': 15000
    },
    singlish: 'Power grid one, very important'
  },

  'Water_Supply': {
    name: 'PUB Water Supply',
    category: 'infrastructure',
    location: ['waterworks', 'reservoir', 'pumphouse'],
    difficulty: 65,
    cost: 50,
    effects: {
      'pressure_drop': {
        name: 'Pressure Drop',
        description: 'Reduce water pressure',
        duration: 600000,
        heat: 3,
        singlish: 'Water weak weak'
      },
      'contamination_alert': {
        name: 'Contamination Alert',
        description: 'Trigger false contamination warning',
        duration: 0,
        heat: 4,
        singlish: 'Make people scared to drink'
      },
      'shut_off_building': {
        name: 'Shut Off Building',
        description: 'Cut water to building',
        duration: 1800000,
        heat: 3,
        singlish: 'No water to drink'
      }
    },
    security: {
      'biometric': true,
      'alert_pub': 30000
    },
    singlish: 'Water one, life one'
  },

  'Telecoms': {
    name: 'Singtel/StarHub/M1 Telecoms',
    category: 'infrastructure',
    location: ['telecoms_central', 'mast', 'exchange'],
    difficulty: 60,
    cost: 40,
    effects: {
      'jam_comms': {
        name: 'Jam Communications',
        description: 'Disable phones in area',
        duration: 300000,
        heat: 4,
        singlish: 'Phone cannot use'
      },
      'intercept_calls': {
        name: 'Intercept Calls',
        description: 'Listen to calls',
        duration: 1800000,
        heat: 3,
        singlish: 'Can hear people talk'
      },
      'spoof_sms': {
        name: 'Spoof SMS',
        description: 'Send fake SMS',
        duration: 0,
        heat: 2,
        singlish: 'Send fake message'
      },
      'data_throttle': {
        name: 'Data Throttle',
        description: 'Slow down internet',
        duration: 600000,
        heat: 2,
        singlish: 'Internet very slow'
      }
    },
    security: {
      'encryption': true,
      'alert_imda': 60000
    },
    singlish: 'Internet very important'
  },

  // FINANCIAL
  'PayNow': {
    name: 'PayNow Payment System',
    category: 'financial',
    location: ['bank', 'payment_terminal', 'online'],
    difficulty: 75,
    cost: 55,
    effects: {
      'transfer_funds': {
        name: 'Transfer Funds',
        description: 'Move money between accounts',
        duration: 0,
        heat: 5,
        requires: ['target_account'],
        singlish: 'Can move money'
      },
      'freeze_account': {
        name: 'Freeze Account',
        description: 'Lock account temporarily',
        duration: 3600000,
        heat: 4,
        singlish: 'Account cannot use'
      },
      'fake_payment': {
        name: 'Fake Payment',
        description: 'Create false payment records',
        duration: 0,
        heat: 4,
        singlish: 'Make it look like pay'
      },
      'spend_tracking': {
        name: 'Track Spending',
        description: 'Monitor spending patterns',
        duration: 1800000,
        heat: 1,
        singlish: 'Know what people buy'
      }
    },
    security: {
      'bank_grade': true,
      'two_factor': true,
      'alert_imas': 30000
    },
    singlish: 'PayNow very popular'
  },

  'CPF_System': {
    name: 'CPF Board System',
    category: 'financial',
    location: ['cpf_board', 'online_portal'],
    difficulty: 80,
    cost: 70,
    effects: {
      'check_balance': {
        name: 'Check Balance',
        description: 'View CPF balances',
        duration: 0,
        heat: 3,
        singlish: 'Can see how much money'
      },
      'fake_withdrawal': {
        name: 'Fake Withdrawal',
        description: 'Simulate withdrawal request',
        duration: 0,
        heat: 5,
        singlish: 'Make it look like withdraw'
      },
      'medishield_alert': {
        name: 'MediShield Alert',
        description: 'Trigger insurance review',
        duration: 0,
        heat: 4,
        singlish: 'Make them check health'
      }
    },
    security: {
      'government_level': true,
      'biometric': true,
      'air_gapped': true,
      'alert_moh': 15000
    },
    singlish: 'CPF is big one'
  }
};

export class SmartNationHackingSystem {
  constructor(game) {
    this.game = game;
    this.hackingSkill = 1;
    this.hackingXP = 0;
    this.knownSystems = [];
    this.activeHacks = [];
    this.hackingTools = {
      'script_kiddie_tools': false,
      'mrt_access_card': false,
      'erp_bypass_device': false,
      'cctv_blinder': false,
      'police_radio_scanner': false,
      'smart_nation_admin': false
    };
    this.hackAttempts = new Map(); // prevent spamming
    this.hackCooldown = 0;
    this.minigameActive = false;
    this.currentHack = null;
    
    this.setupUI();
  }

  setupUI() {
    // Hacking UI
    this.ui = document.createElement('div');
    this.ui.id = 'smart-nation-hacking-ui';
    this.ui.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 700px;
      max-height: 80vh;
      overflow-y: auto;
      background: rgba(5, 5, 20, 0.95);
      border: 2px solid #00ffff;
      border-radius: 12px;
      padding: 20px;
      color: #fff;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      display: none;
    `;
    document.body.appendChild(this.ui);

    // Hacking indicator
    this.indicator = document.createElement('div');
    this.indicator.id = 'hacking-indicator';
    this.indicator.style.cssText = `
      position: fixed;
      top: 60px;
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
    this.indicator.textContent = '⚡ Smart Nation Hacker Lv.1';
    document.body.appendChild(this.indicator);
  }

  // Attempt to hack a system
  attemptHack(systemId, effectId) {
    if (!HackableSystems[systemId]) {
      if (this.game.showNotification) {
        this.game.showNotification('❌ SYSTEM NOT FOUND', `Unknown system ${systemId}`);
      }
      return false;
    }

    const system = HackableSystems[systemId];
    const effect = system.effects[effectId];
    
    if (!effect) {
      if (this.game.showNotification) {
        this.game.showNotification('❌ EFFECT NOT FOUND', `Unknown effect ${effectId}`);
      }
      return false;
    }

    // Check if system is in location
    if (!this.isSystemInLocation(system)) {
      if (this.game.showNotification) {
        this.game.showNotification('❌ WRONG LOCATION', `Must be near ${system.location.join(', ')}`);
      }
      return false;
    }

    // Check cooldown
    if (this.hackCooldown > 0) {
      if (this.game.showNotification) {
        this.game.showNotification('⏳ COOLDOWN', `${Math.ceil(this.hackCooldown / 1000)}s remaining`);
      }
      return false;
    }

    // Check if too difficult
    const difficulty = system.difficulty;
    const skill = this.hackingSkill * 10;
    
    if (skill < difficulty * 0.5) {
      if (this.game.showNotification) {
        this.game.showNotification('❌ TOO DIFFICULT', `Requires skill ${difficulty}, you have ${skill}`);
      }
      return false;
    }

    // Start hacking minigame
    this.startHackingMinigame(system, effect);
    return true;
  }

  // Start hacking minigame
  startHackingMinigame(system, effect) {
    this.minigameActive = true;
    this.currentHack = { system, effect, startTime: Date.now() };
    
    // Create minigame UI
    const minigame = document.createElement('div');
    minigame.id = 'hacking-minigame';
    minigame.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 400px;
      background: rgba(0, 0, 0, 0.98);
      border: 2px solid #00ffff;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10001;
    `;

    const difficulty = system.difficulty;
    const nodes = Math.floor(difficulty / 10) + 3;
    const iceNodes = Math.floor(difficulty / 15);
    
    let html = `
      <h2 style="color: #00ffff; margin-bottom: 20px;">⚡ HACKING ${system.name.toUpperCase()}</h2>
      <div style="margin-bottom: 10px; color: #888;">Difficulty: ${difficulty}/100 | Nodes: ${nodes} | ICE: ${iceNodes}</div>
      <div style="margin-bottom: 20px; color: #fff;">Effect: ${effect.name}</div>
    `;

    // Node grid
    html += '<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 20px;">';
    
    for (let i = 0; i < nodes; i++) {
      const isICE = i < iceNodes;
      const isTarget = i === nodes - 1;
      
      html += `
        <div id="node-${i}" 
             style="width: 60px; height: 60px; border: 2px solid ${isICE ? '#ff4444' : isTarget ? '#00ffff' : '#444'}; 
                    border-radius: 8px; display: flex; align-items: center; justify-content: center; 
                    background: ${isICE ? 'rgba(255,0,0,0.2)' : isTarget ? 'rgba(0,255,255,0.2)' : 'rgba(255,255,255,0.05)'}; 
                    cursor: pointer; font-weight: bold;">
          ${isICE ? '🛡️' : isTarget ? '🎯' : '○'}
        </div>
      `;
    }
    
    html += '</div>';
    html += '<div style="margin-top: 20px; color: #888; text-align: center;">Connect nodes in order. Avoid ICE! Time: 30s</div>';
    
    minigame.innerHTML = html;
    document.body.appendChild(minigame);

    // Minigame logic
    let currentNode = -1;
    let timeLeft = 30000;
    
    const timer = setInterval(() => {
      timeLeft -= 100;
      if (timeLeft <= 0) {
        clearInterval(timer);
        this.failHack(minigame);
      }
    }, 100);

    // Node click handlers
    for (let i = 0; i < nodes; i++) {
      const node = document.getElementById(`node-${i}`);
      if (node) {
        node.onclick = () => {
          if (i === currentNode + 1) {
            // Correct node
            node.style.background = '#00ff00';
            node.innerHTML = '✓';
            currentNode++;
            
            if (currentNode >= nodes - 1) {
              // Success!
              clearInterval(timer);
              this.succeedHack(minigame, system, effect);
            }
          } else if (i < iceNodes) {
            // Hit ICE
            node.style.background = '#ff0000';
            node.innerHTML = '💥';
            clearInterval(timer);
            this.failHack(minigame, 'ICE triggered');
          } else {
            // Wrong node
            node.style.background = '#ff8800';
            setTimeout(() => {
              node.style.background = 'rgba(255,255,255,0.05)';
            }, 300);
          }
        };
      }
    }
  }

  // Success hack
  succeedHack(minigame, system, effect) {
    minigame.remove();
    this.minigameActive = false;
    
    // Apply effect
    this.applyHackEffect(system, effect);
    
    // Gain XP
    this.gainHackingXP(system.difficulty);
    
    // Learn system
    if (!this.knownSystems.includes(system)) {
      this.knownSystems.push(system);
    }
    
    // Cooldown
    this.hackCooldown = 30000;
    
    if (this.game.showNotification) {
      this.game.showNotification(
        '✅ HACK SUCCESSFUL',
        `${system.name}: ${effect.name}`
      );
    }
    
    // Voice
    if (window.voiceSynth) {
      window.voiceSynth.speakSinglish(
        'Hacked, can use now',
        'chinese_singaporean'
      );
    }
    
    this.currentHack = null;
  }

  // Fail hack
  failHack(minigame, reason = 'Time expired') {
    minigame.remove();
    this.minigameActive = false;
    
    // Alert system
    if (this.currentHack) {
      const system = this.currentHack.system;
      const securityAlertTime = system.security.alert_lta || 60000;
      
      // Heat increase
      if (this.game.wantedSystem) {
        this.game.wantedSystem.addHeat(2);
      }
      
      // Alert authorities
      setTimeout(() => {
        if (this.game.showNotification) {
          this.game.showNotification(
            '🚨 ALERT TRIGGERED',
            `LTA detected intrusion attempt!`
          );
        }
      }, securityAlertTime);
    }
    
    if (this.game.showNotification) {
      this.game.showNotification('❌ HACK FAILED', reason);
    }
    
    // Cooldown
    this.hackCooldown = 60000;
    this.currentHack = null;
  }

  // Apply hack effect
  applyHackEffect(system, effect) {
    const duration = effect.duration;
    
    // Track active hack
    const hackEntry = {
      system: system.name,
      effect: effect.name,
      startTime: Date.now(),
      duration,
      heat: effect.heat
    };
    
    this.activeHacks.push(hackEntry);
    
    // Apply specific effects
    switch (system.name) {
      case 'MRT Signaling System':
        this.hackMRT(effect);
        break;
      case 'ERP Gantry System':
        this.hackERP(effect);
        break;
      // Add more systems
    }
    
    // Auto-remove expired hacks
    if (duration > 0) {
      setTimeout(() => {
        this.activeHacks = this.activeHacks.filter(h => h !== hackEntry);
        if (this.game.showNotification) {
          this.game.showNotification(
            '⏰ HACK EXPIRED',
            `${system.name} hack ended`
          );
        }
      }, duration);
    }
  }

  // Hack MRT
  hackMRT(effect) {
    if (effect.name === 'Delay Trains') {
      if (this.game.showNotification) {
        this.game.showNotification('🚇 MRT DELAYED', 'Trains arriving late... 5-10 min delay');
      }
    } else if (effect.name === 'Emergency Brake') {
      if (this.game.showNotification) {
        this.game.showNotification('🚨 EMERGENCY BRAKE', 'Train stopped suddenly!');
      }
    } else if (effect.name === 'Ghost Train') {
      if (this.game.showNotification) {
        this.game.showNotification('👻 GHOST TRAIN', 'TRAIN NOT SHOWING ON BOARDS');
      }
    }
  }

  // Hack ERP
  hackERP(effect) {
    if (effect.name === 'Disable Charging') {
      if (this.game.showNotification) {
        this.game.showNotification('💰 FREE ERP', 'Gantries disabled! Drive free!');
      }
    } else if (effect.name === 'Free Passage List') {
      if (this.game.showNotification) {
        this.game.showNotification('✅ WHITELISTED', 'Your vehicle is ERP-free');
      }
    }
  }

  // Check if system is in location
  isSystemInLocation(system) {
    if (!this.game.player) return false;
    
    const playerPos = this.game.player.position;
    // Simplified - would check actual location
    return true;
  }

  // Gain hacking XP
  gainHackingXP(amount) {
    this.hackingXP += amount;
    
    const oldLevel = this.hackingSkill;
    const newLevel = Math.floor(this.hackingXP / 1000) + 1;
    
    if (newLevel > oldLevel) {
      this.hackingSkill = newLevel;
      if (this.game.showNotification) {
        this.game.showNotification(
          '⚡ HACKER LEVEL UP',
          `Smart Nation Hacker Lv.${newLevel}!`
        );
      }
      this.updateUI();
    }
  }

  // Update UI
  updateUI() {
    if (this.indicator) {
      this.indicator.textContent = `⚡ Smart Nation Hacker Lv.${this.hackingSkill}`;
    }
  }

  // Update loop
  update(delta) {
    // Cooldown decay
    if (this.hackCooldown > 0) {
      this.hackCooldown -= delta;
      if (this.hackCooldown < 0) this.hackCooldown = 0;
    }
    
    // Clean expired hacks
    const now = Date.now();
    this.activeHacks = this.activeHacks.filter(hack => {
      if (hack.duration > 0 && now - hack.startTime > hack.duration) {
        return false;
      }
      return true;
    });
  }

  // Open hacking menu
  openHackingMenu() {
    this.ui.style.display = 'block';
    this.renderUI();
  }

  renderUI() {
    let html = `<h2 style="color: #00ffff; margin-bottom: 15px;">⚡ SMART NATION HACKING</h2>`;
    
    // Skill level
    html += `
      <div style="margin-bottom: 15px; padding: 10px; background: rgba(0,255,255,0.1); border-radius: 6px;">
        <strong>Level ${this.hackingSkill} Hacker</strong><br>
        XP: ${this.hackingXP}/1000<br>
        <span style="color: #888;">Known Systems: ${this.knownSystems.length}</span>
      </div>
    `;

    // Active hacks
    if (this.activeHacks.length > 0) {
      html += '<h3 style="color: #ffaa00; margin: 10px 0;">Active Hacks:</h3>';
      this.activeHacks.forEach(hack => {
        const elapsed = Date.now() - hack.startTime;
        const remaining = Math.max(0, hack.duration - elapsed);
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        
        html += `
          <div style="margin-bottom: 8px; padding: 8px; background: rgba(0,255,0,0.1); border-radius: 4px;">
            <strong>${hack.system}</strong><br>
            ${hack.effect} - ${minutes}:${seconds.toString().padStart(2, '0')}
          </div>
        `;
      });
    }

    // Hackable systems
    html += '<h3 style="color: #ffaa00; margin: 15px 0 10px;">Hackable Systems:</h3>';
    
    for (const [id, system] of Object.entries(HackableSystems)) {
      const known = this.knownSystems.includes(system);
      const canHack = this.hackingSkill * 10 >= system.difficulty * 0.5;
      
      html += `
        <div style="margin-bottom: 10px; padding: 10px; 
                    background: ${known ? 'rgba(0,255,255,0.1)' : 'rgba(255,255,255,0.05)'}; 
                    border: 1px solid ${canHack ? '#00ffff' : '#444'}; 
                    border-radius: 6px;">
          <strong style="color: ${canHack ? '#00ffff' : '#888'};">${system.name}</strong>
          <span style="float: right; color: #888;">Diff: ${system.difficulty}</span>
          <div style="font-size: 10px; color: #888; margin-top: 5px;">
            ${system.category} | ${system.location.join(', ')}<br>
            ${system.singlish}
          </div>
          
          ${known ? `
            <div style="margin-top: 8px;">
              ${Object.entries(system.effects).map(([eid, effect]) => `
                <button onclick="window.game.smartNationHacking.attemptHack('${id}', '${eid}')"
                        style="display: inline-block; margin: 2px; padding: 4px 8px; background: rgba(0,255,255,0.1); 
                               border: 1px solid #00ffff; color: #00ffff; border-radius: 4px; cursor: pointer; font-size: 10px;">
                  ${effect.name}
                </button>
              `).join('')}
            </div>
          ` : `<div style="color: #888; font-size: 10px; margin-top: 5px;">Unknown system</div>`}
        </div>
      `;
    }

    html += '<div style="text-align: center; margin-top: 15px; color: #888; font-size: 10px;">Press H to close</div>';
    this.ui.innerHTML = html;
  }

  toggleUI() {
    this.ui.style.display = this.ui.style.display === 'none' ? 'block' : 'none';
    if (this.ui.style.display === 'block') {
      this.renderUI();
    }
  }

  // Save/Load
  getSaveData() {
    return {
      hackingSkill: this.hackingSkill,
      hackingXP: this.hackingXP,
      knownSystems: this.knownSystems,
      hackingTools: this.hackingTools,
      activeHacks: this.activeHacks.map(h => ({
        ...h,
        startTime: Date.now() - (Date.now() - h.startTime)
      }))
    };
  }

  loadSaveData(data) {
    this.hackingSkill = data.hackingSkill || 1;
    this.hackingXP = data.hackingXP || 0;
    this.knownSystems = data.knownSystems || [];
    this.hackingTools = data.hackingTools || this.hackingTools;
    this.updateUI();
  }
}

if (typeof window !== 'undefined') {
  window.SmartNationHackingSystem = SmartNationHackingSystem;
  window.HackableSystems = HackableSystems;
}