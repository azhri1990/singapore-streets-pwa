/**
 * Kung Fu Combat Styles System - Sleeping Dogs style with player choice
 * 6 martial arts styles, flow meter, environmental combat
 */

export const CombatStyles = {
  'wing_chun': {
    name: 'Wing Chun',
    origin: 'Southern China',
    focus: 'Close range, chain punches, centerline theory',
    description: 'Fast, efficient close-quarters combat. Emphasizes trapping and simultaneous attack/defense.',
    stats: {
      speed: 1.3,
      power: 0.9,
      reach: 0.8,
      counter: 1.2,
      defense: 1.0
    },
    flavor: 'The art of the wooden dummy. Quick hands, straight punches.',
    uniqueMechanics: [
      'Chain punches build flow meter rapidly',
      'Trapping hands disrupt enemy combos',
      'Centerline attacks bypass blocks',
      'Low stamina cost'
    ],
    unarmedOnly: true,
    preferredRange: 'close',
    singlishName: 'Wah! Hand fast fast!'
  },

  'muay_thai': {
    name: 'Muay Thai',
    origin: 'Thailand',
    focus: 'Clinch work, elbows, knees, low kicks',
    description: 'The art of eight limbs. Devastating close-range strikes with devastating power.',
    stats: {
      speed: 1.0,
      power: 1.4,
      reach: 1.0,
      counter: 1.0,
      defense: 1.1
    },
    flavor: 'Dance of death. Knees, elbows, and brutal clinch work.',
    uniqueMechanics: [
      'Clinch grapple for knee/elbow strikes',
      'Low kicks cripple enemy movement',
      'Elbow strikes devastating at close range',
      'High stamina consumption'
    ],
    unarmedOnly: true,
    preferredRange: 'close-mid',
    singlishName: 'Very solid one!'
  },

  'bjj': {
    name: 'Brazilian Jiu-Jitsu',
    origin: 'Brazil',
    focus: 'Ground control, submissions, sweeps, positional dominance',
    description: 'Ground fighting mastery. Bring enemies down and submit them.',
    stats: {
      speed: 0.9,
      power: 1.1,
      reach: 0.7,
      counter: 1.3,
      defense: 1.2
    },
    flavor: 'Position before submission. Control the position, control the fight.',
    uniqueMechanics: [
      'Takedowns to ground',
      'Submission holds (armbar, choke, triangle)',
      'Positional advancement',
      'Can neutralize larger opponents'
    ],
    unarmedOnly: true,
    preferredRange: 'grappling',
    singlishName: 'Jiujitsu, good for small ones'
  },

  'silat': {
    name: 'Silat',
    origin: 'Malaysia/Indonesia',
    focus: 'Weapon disarm, low stance, deceptive attacks, dirty fighting',
    description: 'Martial art of the Malay archipelago. Deceptive and ruthless.',
    stats: {
      speed: 1.1,
      power: 1.1,
      reach: 1.0,
      counter: 1.1,
      defense: 1.0
    },
    flavor: 'Flow like water, strike like lightning. Deception is key.',
    uniqueMechanics: [
      'Weapon disarm specializations',
      'Low stance evasion',
      'Deceptive feints',
      'Improvised weapon mastery'
    ],
    unarmedOnly: false,
    preferredRange: 'variable',
    singlishName: 'Ah! Silat one, very dangerous'
  },

  'boxing': {
    name: 'Boxing',
    origin: 'Western',
    focus: 'Footwork, head movement, combinations, counters',
    description: 'Scientific striking. Footwork and timing create perfect counters.',
    stats: {
      speed: 1.2,
      power: 1.0,
      reach: 1.1,
      counter: 1.4,
      defense: 1.2
    },
    flavor: 'Hit and don\'t get hit. Sweet science.',
    uniqueMechanics: [
      'Head movement dodges heavy attacks',
      'Perfect counters against telegraphed moves',
      'Footwork creates angles',
      'Rhythm-based combos'
    ],
    unarmedOnly: true,
    preferredRange: 'mid',
    singlishName: 'Boxer! Very steady footwork'
  },

  'krav_maga': {
    name: 'Krav Maga',
    origin: 'Israel',
    focus: 'Real world, groin strikes, eye gouges, improvised weapons',
    description: 'No rules, no mercy. The art of survival.',
    stats: {
      speed: 1.0,
      power: 1.3,
      reach: 0.9,
      counter: 1.0,
      defense: 0.9
    },
    flavor: 'Street fighting. No sport rules, only survival.',
    uniqueMechanics: [
      'Target weak points (groin, eyes, throat)',
      'Improvised weapon integration',
      'Multiple attackers tactics',
      'Aggressive forward pressure'
    ],
    unarmedOnly: false,
    preferredRange: 'close',
    singlishName: 'Krav maga! Very ham chili!'
  }
};

export const EnvironmentalWeapons = {
  // Hawker Centre
  'wok': {
    name: 'Wok',
    damage: 35,
    type: 'blunt',
    breakable: true,
    heatEffect: 'burn',
    availableAt: ['hawker_centre', 'restaurant_kitchen'],
    grabAngle: 120,
    singlish: 'Use wok smash!'
  },

  'chopping_board': {
    name: 'Chopping Board',
    damage: 25,
    type: 'blunt',
    breakable: true,
    availableAt: ['hawker_centre', 'kitchen'],
    singlish: 'Wooden board can also hurt'
  },

  'metal_tray': {
    name: 'Metal Tray',
    damage: 20,
    type: 'blunt',
    throwable: true,
    throwableDamage: 35,
    availableAt: ['hawker_centre', 'food_court'],
    singlish: 'Throw tray!'
  },

  'hot_soup': {
    name: 'Hot Soup',
    damage: 30,
    type: 'thermal',
    area: true,
    panic: true,
    availableAt: ['hawker_centre'],
    singlish: 'Hot soup attack!'
  },

  'chilli_sauce': {
    name: 'Chilli Sauce Bottle',
    damage: 15,
    type: 'chemical',
    blind: true,
    availableAt: ['hawker_centre', 'restaurant'],
    singlish: 'Chilli chilli, eyes cannot open'
  },

  // Construction
  'scaffold_pole': {
    name: 'Scaffold Pole',
    damage: 45,
    type: 'blunt',
    reach: 3,
    availableAt: ['construction_site'],
    singlish: 'Long pole can reach far'
  },

  'cement_bag': {
    name: 'Cement Bag',
    damage: 40,
    type: 'blunt',
    throwable: true,
    throwableDamage: 50,
    slowEffect: true,
    availableAt: ['construction_site'],
    singlish: 'Heavy cement can knock people'
  },

  'angle_grinder': {
    name: 'Angle Grinder',
    damage: 60,
    type: 'slash',
    fuel: true,
    fuelDuration: 30000,
    availableAt: ['construction_site', 'workshop'],
    singlish: 'Spinning blade very dangerous'
  },

  // MRT
  'fire_extinguisher': {
    name: 'Fire Extinguisher',
    damage: 30,
    type: 'blunt',
    spray: 'blind',
    availableAt: ['mrt_station', 'underground_station'],
    singlish: 'Powder can blind them'
  },

  'emergency_hammer': {
    name: 'Emergency Hammer',
    damage: 35,
    type: 'pierce',
    breakGlass: true,
    availableAt: ['mrt_train', 'mrt_platform'],
    singlish: 'Break glass to get out'
  },

  // Vehicles
  'car_door': {
    name: 'Car Door',
    damage: 40,
    type: 'blunt',
    detach: true,
    availableAt: ['vehicle'],
    singlish: 'Door can become weapon'
  },

  'motorcycle_helmet': {
    name: 'Motorcycle Helmet',
    damage: 25,
    type: 'blunt',
    wearable: true,
    availableAt: ['motorcycle'],
    singlish: 'Helm also can smash'
  },

  // Offices
  'office_chair': {
    name: 'Office Chair',
    damage: 30,
    type: 'blunt',
    wheelRoll: true,
    availableAt: ['office_building'],
    singlish: 'Rolling chair smash people'
  },

  'laptop': {
    name: 'Laptop',
    damage: 20,
    type: 'blunt',
    throwable: true,
    throwableDamage: 30,
    availableAt: ['office_building', 'cafe'],
    singlish: 'Throw laptop!'
  },

  // HDB
  'laundry_basket': {
    name: 'Laundry Basket',
    damage: 15,
    type: 'blunt',
    throwable: true,
    availableAt: ['hdb_void_deck', 'hdb_common_corridor'],
    singlish: 'Empty basket also can throw'
  },

  'mop': {
    name: 'Mop',
    damage: 20,
    type: 'blunt',
    reach: 2,
    availableAt: ['hdb_void_deck', 'commercial_building'],
    singlish: 'Mop pole very long'
  },

  // Street
  'shopping_cart': {
    name: 'Shopping Cart',
    damage: 50,
    type: 'blunt',
    area: true,
    availableAt: ['supermarket'],
    singlish: 'Cart roll people down'
  },

  'trash_can': {
    name: 'Trash Can',
    damage: 35,
    type: 'blunt',
    throwable: true,
    throwableDamage: 45,
    availableAt: ['street', 'hawker_centre'],
    singlish: 'Trash can smash!'
  }
};

export class CombatStylesSystem {
  constructor(game) {
    this.game = game;
    this.currentStyle = 'wing_chun'; // Default
    this.flowMeter = 0;
    this.maxFlow = 100;
    this.flowGeneration = 0;
    this.lastHitTime = 0;
    this.comboCount = 0;
    this.comboTimer = 0;
    this.environmentalWeapons = [];
    this.unkittedWeapons = new Set();
    this.styleProficiencies = {
      'wing_chun': 1,
      'muay_thai': 1,
      'bjj': 1,
      'silat': 1,
      'boxing': 1,
      'krav_maga': 1
    };
    this.styleXP = {
      'wing_chun': 0,
      'muay_thai': 0,
      'bjj': 0,
      'silat': 0,
      'boxing': 0,
      'krav_maga': 0
    };
    this.specialMovesUnlocked = new Set();
    this.flowMeterEasing = 0.95;
    this.comboWindow = 2000; // 2 seconds
    this.currentEnvironmentalWeapon = null;
    
    this.setupUI();
  }

  setupUI() {
    // Combat style indicator
    this.styleIndicator = document.createElement('div');
    this.styleIndicator.id = 'combat-style-indicator';
    this.styleIndicator.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 20px;
      background: rgba(0, 0, 0, 0.8);
      border: 2px solid #ff6600;
      border-radius: 8px;
      padding: 10px 15px;
      color: #ff6600;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      min-width: 200px;
    `;
    this.updateStyleUI();
    document.body.appendChild(this.styleIndicator);

    // Flow meter
    this.flowUI = document.createElement('div');
    this.flowUI.id = 'flow-meter-ui';
    this.flowUI.style.cssText = `
      position: fixed;
      bottom: 150px;
      left: 20px;
      width: 220px;
      background: rgba(0, 0, 0, 0.8);
      border: 1px solid #ff6600;
      border-radius: 6px;
      padding: 8px;
      color: #fff;
      font-family: monospace;
      font-size: 10px;
      z-index: 10000;
      display: none;
    `;
    document.body.appendChild(this.flowUI);
  }

  // Set combat style
  setCombatStyle(styleId) {
    if (!CombatStyles[styleId]) {
      console.error(`Combat style ${styleId} not found`);
      return false;
    }

    this.currentStyle = styleId;
    this.updateStyleUI();

    if (this.game.showNotification) {
      const style = CombatStyles[styleId];
      this.game.showNotification(
        '🥋 COMBAT STYLE CHANGED',
        `${style.name} - ${style.stats.speed}x speed, ${style.stats.power}x power`
      );
    }

    // Voice
    if (window.voiceSynth) {
      window.voiceSynth.speakSinglish(
        `Switch to ${CombatStyles[styleId].name}, steady one`,
        'chinese_singaporean'
      );
    }

    return true;
  }

  // Cycle through combat styles
  cycleCombatStyle(direction = 1) {
    const styles = Object.keys(CombatStyles);
    const currentIndex = styles.indexOf(this.currentStyle);
    const nextIndex = (currentIndex + direction + styles.length) % styles.length;
    this.setCombatStyle(styles[nextIndex]);
  }

  // Get style stats
  getCurrentStyleStats() {
    const style = CombatStyles[this.currentStyle];
    const proficiency = this.styleProficiencies[this.currentStyle];
    const xp = this.styleXP[this.currentStyle];
    
    return {
      ...style,
      stats: {
        speed: style.stats.speed * proficiency,
        power: style.stats.power * proficiency,
        reach: style.stats.reach * proficiency,
        counter: style.stats.counter * proficiency,
        defense: style.stats.defense * proficiency
      },
      proficiency,
      level: Math.floor(xp / 1000) + 1,
      xp,
      xpToNext: 1000 - (xp % 1000)
    };
  }

  // Combat action - punch/kick
  performAttack(target, attackType = 'strike') {
    const styleData = this.getCurrentStyleStats();
    const style = CombatStyles[this.currentStyle];
    
    // Base damage calculation
    let damage = 20 * styleData.stats.power * styleData.stats.speed;
    let flowGain = 5;
    let staminaCost = 10;

    // Style-specific bonuses
    switch (this.currentStyle) {
      case 'wing_chun':
        if (attackType === 'chain_punch') {
          damage *= 1.5;
          flowGain *= 2;
          staminaCost *= 0.8;
        }
        break;
      
      case 'muay_thai':
        if (attackType === 'clinch_knee') {
          damage *= 1.8;
          flowGain *= 1.5;
        }
        if (attackType === 'low_kick') {
          damage *= 1.3;
          flowGain *= 1.2;
        }
        break;
      
      case 'bjj':
        if (attackType === 'takedown') {
          damage *= 1.5;
          flowGain *= 1.8;
          staminaCost *= 1.5;
        }
        if (attackType === 'submission') {
          damage *= 2.0;
          flowGain *= 2.5;
        }
        break;
      
      case 'boxing':
        if (attackType === 'counter') {
          damage *= 2.2;
          flowGain *= 2.0;
        }
        if (attackType === 'combination') {
          damage *= 1.6;
          flowGain *= 1.5;
        }
        break;
      
      case 'krav_maga':
        if (attackType === 'groin_strike') {
          damage *= 1.7;
          flowGain *= 1.8;
        }
        if (attackType === 'eye_gouge') {
          damage *= 2.5;
          flowGain *= 2.0;
        }
        break;
    }

    // Environmental weapon bonus
    if (this.currentEnvironmentalWeapon) {
      const wep = this.currentEnvironmentalWeapon;
      damage += wep.damage;
      flowGain += 10;
    }

    // Apply damage
    target.takeDamage(damage);

    // Update flow meter
    this.generateFlow(flowGain);

    // Update combo
    this.updateCombo();

    // Gain XP
    this.gainXP(this.currentStyle, damage / 100);

    // Stamina cost
    if (this.game.player) {
      this.game.player.stamina = Math.max(0, (this.game.player.stamina || 100) - staminaCost);
    }

    return {
      damage,
      flowGain,
      style: this.currentStyle,
      combo: this.comboCount
    };
  }

  // Generate flow meter
  generateFlow(amount) {
    this.flowMeter = Math.min(this.maxFlow, this.flowMeter + amount);
    this.flowMeterEasing = amount;
    this.updateFlowUI();
  }

  // Spend flow for special move
  spendFlow(amount, moveName) {
    if (this.flowMeter >= amount) {
      this.flowMeter -= amount;
      this.performSpecialMove(moveName);
      this.updateFlowUI();
      return true;
    }
    return false;
  }

  // Special moves
  performSpecialMove(moveName) {
    const style = CombatStyles[this.currentStyle];
    
    const moves = {
      'wing_chun': {
        'chain_punch_combo': () => { /* Rapid chain punches */ },
        'trapping_hands': () => { /* Disrupt enemy combo */ },
        'centerline_strike': () => { /* Bypass blocks */ }
      },
      'muay_thai': {
        'elbow_flurry': () => { /* Rapid elbows */ },
        'knee_storm': () => { /* Knee strikes in clinch */ },
        'low_kick_spam': () => { /* Cripple legs */ }
      },
      'bjj': {
        'takedown_chain': () => { /* Multiple takedown attempts */ },
        'submission_rain': () => { /* Rapid submissions */ },
        'sweep_counter': () => { /* Counter takedowns */ }
      },
      'boxing': {
        'counter_combo': () => { /* Perfect counter */ },
        'footwork_flurry': () => { /* Dynamic angles */ },
        'uppercut_finish': () => { /* Finisher */ }
      },
      'krav_maga': {
        'pressure_point': () => { /* Target weak points */ },
        'weapon_integration': () => { /* Use env weapons */ },
        'multiple_attackers': () => { /* Defend against group */ }
      },
      'silat': {
        'deceptive_feint': () => { /* Feint then strike */ },
        'weapon_disarm': () => { /* Disarm opponent */ },
        'low_stance_evade': () => { /* Low profile */ }
      }
    };

    const styleMoves = moves[this.currentStyle];
    if (styleMoves && styleMoves[moveName]) {
      styleMoves[moveName]();
      
      if (this.game.showNotification) {
        this.game.showNotification('⚡ SPECIAL MOVE', moveName.replace('_', ' ').toUpperCase());
      }
    }
  }

  // Update combo
  updateCombo() {
    const now = Date.now();
    
    if (now - this.lastHitTime < this.comboWindow) {
      this.comboCount++;
      if (this.comboCount > 1) {
        // Combo bonus
        this.generateFlow(this.comboCount * 2);
      }
    } else {
      this.comboCount = 1;
    }
    
    this.lastHitTime = now;
    this.comboTimer = now;
  }

  // Update flow meter decay
  update(delta) {
    // Flow meter decay when not generating
    this.flowMeterEasing *= this.flowMeterEasing;
    
    // Combo decay
    if (Date.now() - this.comboTimer > this.comboWindow) {
      this.comboCount = 0;
    }

    // Update UI
    this.updateFlowUI();
    this.updateStyleUI();
  }

  // Pick up environmental weapon
  pickUpEnvironmentalWeapon(weaponId) {
    const weapon = EnvironmentalWeapons[weaponId];
    if (!weapon) return false;

    if (!weapon.availableAt.includes(this.getCurrentLocation())) {
      if (this.game.showNotification) {
        this.game.showNotification('❌ WRONG LOCATION', `${weapon.name} not available here`);
      }
      return false;
    }

    if (this.unkittedWeapons.has(weaponId)) {
      if (this.game.showNotification) {
        this.game.showNotification('🎒 ALREADY HAVE', `${weapon.name} in inventory`);
      }
      return false;
    }

    this.unkittedWeapons.add(weaponId);
    this.currentEnvironmentalWeapon = weapon;

    if (this.game.showNotification) {
      this.game.showNotification('🎒 PICKED UP', `${weapon.name} (${weapon.damage} dmg)`);
    }

    // Voice
    if (window.voiceSynth) {
      window.voiceSynth.speakSinglish(
        `Got ${weapon.name}, can smash them`,
        'chinese_singaporean'
      );
    }

    return true;
  }

  // Drop environmental weapon
  dropEnvironmentalWeapon() {
    if (this.currentEnvironmentalWeapon) {
      const name = this.currentEnvironmentalWeapon.name;
      this.currentEnvironmentalWeapon = null;
      if (this.game.showNotification) {
        this.game.showNotification('📤 DROPPED', `${name}`);
      }
    }
  }

  // Get current location type
  getCurrentLocation() {
    if (!this.game.player) return 'street';
    
    // Simplified - would check actual map
    return 'hawker_centre'; // Placeholder
  }

  // Gain XP in style
  gainXP(styleId, amount) {
    if (!this.styleXP[styleId]) this.styleXP[styleId] = 0;
    if (!this.styleProficiencies[styleId]) this.styleProficiencies[styleId] = 1;
    
    this.styleXP[styleId] += amount;
    
    // Level up check
    const xp = this.styleXP[styleId];
    const level = Math.floor(xp / 1000) + 1;
    
    if (level > Math.floor((xp - amount) / 1000) + 1) {
      // Level up!
      this.styleProficiencies[styleId] += 0.1;
      
      if (this.game.showNotification) {
        this.game.showNotification(
          '🥋 STYLE LEVEL UP',
          `${CombatStyles[styleId].name} Level ${level}!`
        );
      }
    }
  }

  // Update style UI
  updateStyleUI() {
    if (!this.styleIndicator) return;
    
    const styleData = this.getCurrentStyleStats();
    const style = CombatStyles[this.currentStyle];
    
    this.styleIndicator.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">🥋 ${style.name}</div>
      <div style="font-size: 10px; color: #ffaa00;">
        Level ${styleData.level} (${Math.round(styleData.xp)} XP)
      </div>
      <div style="font-size: 10px; color: #888; margin-top: 3px;">
        SPD ${styleData.stats.speed.toFixed(1)}x | PWR ${styleData.stats.power.toFixed(1)}x
      </div>
    `;
  }

  // Update flow UI
  updateFlowUI() {
    if (!this.flowUI) return;
    
    const percentage = (this.flowMeter / this.maxFlow) * 100;
    const color = percentage > 75 ? '#00ff00' : percentage > 50 ? '#ffff00' : percentage > 25 ? '#ff8800' : '#ff0000';
    
    this.flowUI.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">⚡ FLOW METER</div>
      <div style="height: 12px; background: #333; border-radius: 6px; overflow: hidden; margin-bottom: 5px;">
        <div style="width: ${percentage}%; height: 100%; background: ${color}; transition: width 0.2s;"></div>
      </div>
      <div style="font-size: 10px; color: #888;">
        Combo: ${this.comboCount}x | ${Math.round(this.flowMeter)}/${this.maxFlow}
      </div>
    `;
  }

  // Toggle flow UI visibility
  toggleFlowUI() {
    this.flowUI.style.display = this.flowUI.style.display === 'none' ? 'block' : 'none';
  }

  // Open combat styles menu
  openStylesMenu() {
    const menu = document.createElement('div');
    menu.id = 'combat-styles-menu';
    menu.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      max-height: 600px;
      background: rgba(10, 10, 10, 0.95);
      border: 2px solid #ff6600;
      border-radius: 12px;
      padding: 20px;
      color: #fff;
      font-family: monospace;
      font-size: 12px;
      z-index: 20000;
      overflow-y: auto;
    `;
    
    let html = `<h2 style="color: #ff6600; margin-bottom: 15px;">🥋 COMBAT STYLES</h2>`;
    html += `<div style="margin-bottom: 10px; color: #888;">Select style or cycle with 1-6 keys</div>`;
    
    for (const [id, style] of Object.entries(CombatStyles)) {
      const isActive = id === this.currentStyle;
      const proficiency = this.styleProficiencies[id];
      const xp = this.styleXP[id];
      const level = Math.floor(xp / 1000) + 1;
      
      html += `
        <div style="margin-bottom: 12px; padding: 10px; background: ${isActive ? 'rgba(255,102,0,0.2)' : 'rgba(255,255,255,0.05)'}; 
                    border: 1px solid ${isActive ? '#ff6600' : '#444'}; border-radius: 6px; cursor: pointer;"
             onclick="window.game.combatStyles.setCombatStyle('${id}')">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <strong style="color: ${isActive ? '#ff6600' : '#fff'};">${style.name}</strong>
            <span style="color: #888;">Level ${level} (${proficiency.toFixed(1)}x)</span>
          </div>
          <div style="font-size: 10px; color: #888; margin-bottom: 5px;">${style.description}</div>
          <div style="font-size: 10px;">
            <span style="color: #ffaa00;">SPD ${style.stats.speed}x</span> | 
            <span style="color: #ffaa00;">PWR ${style.stats.power}x</span> | 
            <span style="color: #ffaa00;">COUNTER ${style.stats.counter}x</span>
          </div>
          <div style="font-size: 10px; color: #666; margin-top: 3px;">
            🎯 ${style.preferredRange} range | ${style.singlishName}
          </div>
        </div>
      `;
    }
    
    html += '<div style="text-align: center; margin-top: 15px; color: #888; font-size: 10px;">Press ESC to close</div>';
    menu.innerHTML = html;
    document.body.appendChild(menu);
    
    // ESC to close
    const closeHandler = (e) => {
      if (e.key === 'Escape') {
        menu.remove();
        document.removeEventListener('keydown', closeHandler);
      }
    };
    document.addEventListener('keydown', closeHandler);
  }

  // Save/Load
  getSaveData() {
    return {
      currentStyle: this.currentStyle,
      flowMeter: this.flowMeter,
      comboCount: this.comboCount,
      styleProficiencies: this.styleProficiencies,
      styleXP: this.styleXP,
      specialMovesUnlocked: Array.from(this.specialMovesUnlocked),
      unkittedWeapons: Array.from(this.unkittedWeapons)
    };
  }

  loadSaveData(data) {
    this.currentStyle = data.currentStyle || 'wing_chun';
    this.flowMeter = data.flowMeter || 0;
    this.comboCount = data.comboCount || 0;
    this.styleProficiencies = data.styleProficiencies || this.styleProficiencies;
    this.styleXP = data.styleXP || this.styleXP;
    this.specialMovesUnlocked = new Set(data.specialMovesUnlocked || []);
    this.unkittedWeapons = new Set(data.unkittedWeapons || []);
    this.updateStyleUI();
  }

  // Get combat advice based on style
  getCombatAdvice() {
    const style = CombatStyles[this.currentStyle];
    const advice = {
      'wing_chun': 'Stay close, chain punches, trap their hands',
      'muay_thai': 'Clinch for knees, low kicks to cripple',
      'bjj': 'Takedowns to ground, submit them',
      'boxing': 'Footwork + counters, hit and don\'t get hit',
      'krav_maga': 'Target weak points, improvised weapons',
      'silat': 'Deceptive feints, weapon disarm'
    };
    return advice[this.currentStyle] || 'Fight smart, fight Singapore';
  }
}

if (typeof window !== 'undefined') {
  window.CombatStylesSystem = CombatStylesSystem;
  window.CombatStyles = CombatStyles;
  window.EnvironmentalWeapons = EnvironmentalWeapons;
}