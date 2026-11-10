/**
 * Singapore Law Enforcement System
 * Based on actual Singapore laws and regulations
 */

export class SingaporeLawSystem {
    constructor(game) {
        this.game = game;
        
        // Singapore Police Force structure
        this.policeUnits = {
            'spf': { name: 'Singapore Police Force', color: 0x2a4a8a, jurisdiction: 'general' },
            'tp': { name: 'Traffic Police', color: 0xffffff, jurisdiction: 'traffic' },
            'cnb': { name: 'Central Narcotics Bureau', color: 0x8B0000, jurisdiction: 'drugs' },
            'cpib': { name: 'CPIB', color: 0x1a1a1a, jurisdiction: 'corruption' }
        };
        
        // Singapore traffic laws
        this.trafficLaws = {
            speedLimits: {
                'expressway': 90,
                'arterial': 60,
                'residential': 50,
                'school_zone': 40,
                'hdb': 40
            },
            erpRates: {
                'orchard': { peak: 3.0, offPeak: 1.0 },
                'cbd': { peak: 2.5, offPeak: 0.8 },
                'cte': { peak: 2.0, offPeak: 0.6 },
                'pie': { peak: 1.5, offPeak: 0.5 }
            },
            demeritPoints: {
                'speeding': 4,
                'red_light': 12,
                'seatbelt': 3,
                'phone_usage': 6,
                'illegal_parking': 2,
                'dangerous_driving': 24,
                'drunk_driving': 24
            },
            fines: {
                'speeding': { min: 150, max: 1000, currency: 'SGD' },
                'red_light': { min: 400, max: 1000, currency: 'SGD' },
                'seatbelt': { min: 120, max: 120, currency: 'SGD' },
                'phone_usage': { min: 1000, max: 2000, currency: 'SGD' },
                'illegal_parking': { min: 70, max: 200, currency: 'SGD' },
                'littering': { min: 300, max: 2000, currency: 'SGD' },
                'jaywalking': { min: 50, max: 50, currency: 'SGD' },
                'smoking_public': { min: 200, max: 1000, currency: 'SGD' },
                'vandalism': { min: 2000, max: 2000, currency: 'SGD', additional: 'caning' },
                'chewing_gum': { min: 500, max: 1000, currency: 'SGD' }
            }
        };
        
        // Criminal penalties
        this.criminalPenalties = {
            'drug_trafficking': { penalty: 'death_penalty', mandatory: true },
            'drug_possession': { penalty: 'imprisonment', min: 1, max: 10, unit: 'years' },
            'murder': { penalty: 'death_penalty', mandatory: true },
            'armed_robbery': { penalty: 'imprisonment', min: 5, max: 20, unit: 'years', additional: 'caning' },
            'robbery': { penalty: 'imprisonment', min: 2, max: 14, unit: 'years', additional: 'caning' },
            'theft': { penalty: 'imprisonment', min: 0, max: 3, unit: 'years' },
            'vandalism': { penalty: 'imprisonment', min: 0, max: 2, unit: 'years', additional: 'caning' },
            'assault': { penalty: 'imprisonment', min: 0, max: 2, unit: 'years', additional: 'caning' },
            'drunk_driving': { penalty: 'imprisonment', min: 0, max: 1, unit: 'years', additional: 'fine' }
        };
        
        // Singapore-specific offenses
        this.singaporeOffenses = {
            'chewing_gum': { fine: 500, description: 'Import/sale of chewing gum (banned since 1992)' },
            'littering': { fine: 300, description: 'Littering in public (including cigarette butts)' },
            'jaywalking': { fine: 50, description: 'Crossing road within 50m of pedestrian crossing' },
            'smoking_public': { fine: 200, description: 'Smoking in prohibited areas' },
            'vandalism': { fine: 2000, caning: true, description: 'Vandalism (Michael Fay case precedent)' },
            'drunk_driving': { fine: 5000, license: 'suspension', description: 'Drink driving (zero tolerance)' },
            'phone_driving': { fine: 1000, demerit: 6, description: 'Using mobile phone while driving' },
            'seatbelt': { fine: 120, demerit: 3, description: 'Not wearing seatbelt' }
        };
        
        this.setupUI();
    }
    
    setupUI() {
        // Create law enforcement HUD
        this.ui = document.createElement('div');
        this.ui.id = 'singapore-law-ui';
        this.ui.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #ff0000;
            border-radius: 8px;
            padding: 12px;
            color: #fff;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
            max-width: 300px;
            display: none;
        `;
        document.body.appendChild(this.ui);
    }
    
    // Check if player is violating Singapore law
    checkViolation(player, action) {
        const violations = [];
        
        // Traffic violations
        if (action.type === 'speeding') {
            const limit = this.trafficLaws.speedLimits[player.currentRoadType] || 50;
            if (action.speed > limit) {
                violations.push({
                    type: 'speeding',
                    fine: this.calculateFine('speeding', action.speed - limit),
                    demerit: this.trafficLaws.demeritPoints.speeding,
                    description: `Speeding: ${action.speed}km/h in ${limit}km/h zone`
                });
            }
        }
        
        if (action.type === 'running_red_light') {
            violations.push({
                type: 'red_light',
                fine: this.trafficLaws.fines.red_light.min,
                demerit: this.trafficLaws.demeritPoints.red_light,
                description: 'Running red light'
            });
        }
        
        if (action.type === 'phone_usage') {
            violations.push({
                type: 'phone_usage',
                fine: this.trafficLaws.fines.phone_usage.min,
                demerit: this.trafficLaws.demeritPoints.phone_usage,
                description: 'Using mobile phone while driving'
            });
        }
        
        if (action.type === 'no_seatbelt') {
            violations.push({
                type: 'seatbelt',
                fine: this.trafficLaws.fines.seatbelt.min,
                demerit: this.trafficLaws.demeritPoints.seatbelt,
                description: 'Not wearing seatbelt'
            });
        }
        
        // Singapore-specific offenses
        if (action.type === 'littering') {
            violations.push({
                type: 'littering',
                fine: this.singaporeOffenses.littering.fine,
                description: 'Littering in public'
            });
        }
        
        if (action.type === 'jaywalking') {
            violations.push({
                type: 'jaywalking',
                fine: this.singaporeOffenses.jaywalking.fine,
                description: 'Jaywalking'
            });
        }
        
        if (action.type === 'smoking_public') {
            violations.push({
                type: 'smoking_public',
                fine: this.singaporeOffenses.smoking_public.fine,
                description: 'Smoking in prohibited area'
            });
        }
        
        if (action.type === 'chewing_gum') {
            violations.push({
                type: 'chewing_gum',
                fine: this.singaporeOffenses.chewing_gum.fine,
                description: 'Possession/sale of chewing gum'
            });
        }
        
        if (action.type === 'vandalism') {
            violations.push({
                type: 'vandalism',
                fine: this.singaporeOffenses.vandalism.fine,
                caning: true,
                description: 'Vandalism'
            });
        }
        
        // Criminal offenses
        if (action.type === 'drug_trafficking') {
            violations.push({
                type: 'drug_trafficking',
                penalty: 'death_penalty',
                description: 'Drug trafficking (mandatory death penalty)'
            });
        }
        
        if (action.type === 'murder') {
            violations.push({
                type: 'murder',
                penalty: 'death_penalty',
                description: 'Murder (mandatory death penalty)'
            });
        }
        
        return violations;
    }
    
    calculateFine(type, excess) {
        const fine = this.trafficLaws.fines[type];
        if (!fine) return 0;
        
        // Speeding fine based on excess
        if (type === 'speeding') {
            if (excess <= 20) return fine.min;
            if (excess <= 40) return Math.round(fine.min * 1.5);
            return fine.max;
        }
        
        return fine.min;
    }
    
    // ERP check
    checkERP(zone, time) {
        const hour = time.getHours();
        const isPeak = (hour >= 7 && hour < 9) || (hour >= 17 && hour < 20);
        const rate = this.trafficLaws.erpRates[zone];
        
        if (!rate) return 0;
        
        return isPeak ? rate.peak : rate.offPeak;
    }
    
    // Apply penalty
    applyPenalty(player, violation) {
        if (violation.fine) {
            player.money = (player.money || 0) - violation.fine;
            this.showPenalty(violation);
        }
        
        if (violation.demerit) {
            player.demeritPoints = (player.demeritPoints || 0) + violation.demerit;
            
            // License suspension at 24 points
            if (player.demeritPoints >= 24) {
                this.suspendLicense(player);
            }
        }
        
        if (violation.penalty === 'death_penalty') {
            this.executeDeathPenalty(player, violation);
        }
        
        if (violation.caning) {
            this.applyCaning(player, violation);
        }
    }
    
    suspendLicense(player) {
        player.licenseSuspended = true;
        if (this.game.showNotification) {
            this.game.showNotification('🚫 LICENSE SUSPENDED', 'Demerit points exceeded 24. License suspended.');
        }
    }
    
    executeDeathPenalty(player, violation) {
        if (this.game.showNotification) {
            this.game.showNotification('⚖️ DEATH PENALTY', `${violation.type.replace('_', ' ').toUpperCase()} - Mandatory death penalty under Singapore law`);
        }
        // In game, this could be game over or respawn
        player.health = 0;
    }
    
    applyCaning(player, violation) {
        if (this.game.showNotification) {
            this.game.showNotification('⚖️ CANING', `${violation.type.replace('_', ' ').toUpperCase()} - Caning sentence under Singapore law`);
        }
        player.health = Math.max(0, player.health - 30);
    }
    
    showPenalty(violation) {
        this.ui.style.display = 'block';
        this.ui.innerHTML = `
            <div style="color: #ff0000; font-weight: bold; margin-bottom: 8px;">
                ⚖️ SINGAPORE LAW VIOLATION
            </div>
            <div style="margin-bottom: 4px;">${violation.description}</div>
            ${violation.fine ? `<div style="color: #ffff00;">Fine: SGD ${violation.fine}</div>` : ''}
            ${violation.demerit ? `<div style="color: #ff8800;">Demerit Points: ${violation.demerit}</div>` : ''}
            ${violation.caning ? `<div style="color: #ff0000;">Additional: Caning</div>` : ''}
            ${violation.penalty === 'death_penalty' ? `<div style="color: #ff0000; font-weight: bold;">PENALTY: DEATH</div>` : ''}
        `;
        
        setTimeout(() => {
            this.ui.style.display = 'none';
        }, 5000);
    }
    
    // Check if action is legal in Singapore
    isLegal(action) {
        const illegal = [
            'drug_trafficking', 'murder', 'armed_robbery', 'vandalism',
            'chewing_gum', 'littering', 'jaywalking', 'smoking_public',
            'drunk_driving', 'phone_driving'
        ];
        return !illegal.includes(action.type);
    }
    
    // Get legal advice
    getLegalAdvice(action) {
        const advice = {
            'drug_trafficking': 'Drug trafficking carries mandatory death penalty in Singapore. Do not engage.',
            'murder': 'Murder carries mandatory death penalty in Singapore.',
            'vandalism': 'Vandalism can result in caning and fines up to SGD 2000.',
            'chewing_gum': 'Import and sale of chewing gum is banned in Singapore since 1992.',
            'littering': 'Littering fines start at SGD 300.',
            'jaywalking': 'Jaywalking fine is SGD 50.',
            'smoking_public': 'Smoking in prohibited areas: fine up to SGD 1000.',
            'drunk_driving': 'Drink driving: fine up to SGD 5000, license suspension, imprisonment.',
            'phone_driving': 'Using phone while driving: fine up to SGD 1000, 6 demerit points.',
            'seatbelt': 'Not wearing seatbelt: fine SGD 120, 3 demerit points.'
        };
        return advice[action.type] || 'This action may violate Singapore law.';
    }
}

// Export Singapore law constants
export const SINGAPORE_LAWS = {
    DRIVING_SIDE: 'left',
    SPEED_LIMIT_URBAN: 50,
    SPEED_LIMIT_EXPRESSWAY: 90,
    DRINK_DRIVING_LIMIT: 0.00, // Zero tolerance for new drivers
    GUN_CONTROL: 'strict', // No civilian firearms
    DEATH_PENALTY: ['drug_trafficking', 'murder', 'firearms_offenses'],
    CANING: ['vandalism', 'robbery', 'rape', 'drug_offenses'],
    CHEWING_GUM_BAN: true,
    LITTERING_FINE: 300,
    JAYWALKING_FINE: 50
};
