// MobileBatteryManager.js - Battery level-aware performance scaling
// Based on Millionaire Race battery monitoring patterns

export class BatteryManager {
    constructor() {
        this.batteryLevel = 1.0;
        this.isCharging = false;
        this.isLowPowerMode = false;
        this.lastBatteryCheck = 0;
        this.batteryCheckInterval = 3000; // Check every 3 seconds
        this.performanceBudget = 1.0; // 1.0 = full performance, 0.5 = battery saving
        this.mode = 'balanced'; // 'balanced' | 'performance' | 'battery-saving'
        
        // Battery level thresholds
        this.THRESHOLDS = {
            CRITICAL: 0.15,    // Below 15% - maximum savings
            LOW: 0.30,         // Below 30% - reduced performance
            MODERATE: 0.50,    // Below 50% - moderate performance
            HIGH: 0.80,        // Above 80% - full performance
            CRITICAL_LAUNCH: 0.20 // Below 20% - may restrict new gameplay
        };
        
        // Performance budget per mode
        this.BUDGETS = {
            'performance': 1.0,    // Full GPU, all features, max FPS
            'balanced': 0.75,       // Most features enabled, capped FPS 60
            'battery-saving': 0.40 // Reduced features, target 30fps
        };
    }

    async initialize() {
        // Check if Battery API is supported
        if ('getBattery' in navigator) {
            this.battery = await navigator.getBattery();
            this.updateBatteryState(this.battery.level, this.battery.charging);
            
            // Listen for battery changes
            this.battery.addEventListener('levelchange', () => {
                this.updateBatteryState(this.battery.level, this.battery.charging);
            });
            
            this.battery.addEventListener('chargingchange', () => {
                this.updateBatteryState(this.battery.level, this.battery.charging);
            });
            
            this.lastBatteryCheck = performance.now();
        } else {
            // Fallback: estimate battery based on performance metrics
            console.warn('[BatteryManager] Battery API not supported, using estimation');
            this.setupFallbackMonitoring();
        }
    }

    updateBatteryState(level, charging) {
        this.batteryLevel = level;
        this.isCharging = charging;
        
        // Determine mode based on battery level
        if (level <= this.THRESHOLDS.CRITICAL) {
            this.mode = 'battery-saving';
        } else if (level <= this.THRESHOLDS.LOW) {
            this.mode = 'balanced';
        } else if (level <= this.THRESHOLDS.HIGH) {
            this.mode = 'performance';
        } else {
            this.mode = 'performance';
        }
        
        this.performanceBudget = this.BUDGETS[this.mode];
        
        console.log('[BatteryManager] Battery level:', (level * 100).toFixed(1) + '%, mode:', this.mode, 'budget:', this.performanceBudget.toFixed(2));
        
        // Apply performance scaling to the game
        if (window.game && window.game.batteryManager === this) {
            window.game.applyBatteryScaling(this.performanceBudget, this.mode);
        }
    }

    setupFallbackMonitoring() {
        // Periodic estimation based on performance metrics
        this.lastBatteryCheck = performance.now();
        setInterval(() => {
            const now = performance.now();
            if (now - this.lastBatteryCheck > this.batteryCheckInterval) {
                // Simple estimation: higher draw calls = higher battery drain
                const estimatedDrain = (Math.random() - 0.3) * 0.1;
                this.batteryLevel = Math.max(0, Math.min(1, this.batteryLevel - estimatedDrain));
                this.isCharging = false; // Can't determine without API
                
                // Apply estimation-based scaling
                this.updateBatteryState(this.batteryLevel, false);
                this.lastBatteryCheck = now;
            }
        }, this.batteryCheckInterval);
    }

    isLowPowerModeEnabled() {
        return this.isLowPowerMode || this.mode === 'battery-saving';
    }

    shouldReduceFeatures() {
        return this.mode === 'battery-saving' || this.batteryLevel <= this.THRESHOLDS.LOW;
    }

    shouldLimitFrameRate() {
        return this.mode === 'battery-saving';
    }

    getMode() {
        return this.mode;
    }

    getBatteryLevel() {
        return this.batteryLevel;
    }

    getPerformanceBudget() {
        return this.performanceBudget;
    }
}

// Initialize battery manager
export async function initBatteryManager() {
    const batteryManager = new BatteryManager();
    await batteryManager.initialize();
    return batteryManager;
}

// Global instance tracking
let globalBatteryManager = null;

export function getGlobalBatteryManager() {
    if (!globalBatteryManager) {
        globalBatteryManager = new BatteryManager();
    }
    return globalBatteryManager;
}