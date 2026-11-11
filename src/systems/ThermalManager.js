// ThermalManager.js - Specialized agent for thermal management and ADPF-inspired thermal optimization
// Monitors device thermal state (simulated), prevents overheating, and manages thermal throttling
// Based on Android ADPF (Android Dynamic Performance Framework) principles

export class ThermalManager {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.thermalMetrics = {
            thermalState: 0, // 0-4: normal, warm, hot, critical, emergency
            thermalPressure: 'normal', // normal, warm, hot, critical, emergency
            temperature: 0, // Simulated temperature in Celsius
            cpuFrequency: 1, // Normalized CPU frequency (1 = normal)
            currentUsage: 0, // CPU usage percentage
            thermalThrottlingActive: false,
            throttlingLevel: 1, // 1-4
            recommendedModes: ['balanced', 'performance', 'power_saving'],
            lastThermalCheck: 0,
            emergencyCount: 0,
            hysteresis: 5, // Temperature hysteresis to prevent rapid toggling
            lastTemperature: 0
        };
        this.healingLog = [];
        this.lastThermalCheck = 0;
        this.thermalCheckInterval = 3000; // 3 seconds
        this.throttlingThreshold = 50; // Temperature threshold for throttling
        this.emergencyThreshold = 70; // Emergency temperature threshold
        this.coolingThreshold = 40; // Temperature below which we can reduce throttling

        this.initialize();
    }

    initialize() {
        // Set up thermal monitoring
        this.monitorInterval = setInterval(() => {
            this.monitorThermal();
        }, this.thermalCheckInterval);

        // Start with a baseline check
        this.performInitialCheck();

        console.log('[ThermalManager] Initialized with ADPF-inspired thermal management');
    }

    performInitialCheck() {
        this.monitorThermal();
        console.log('[ThermalManager] Initial thermal check complete');
    }

    monitorThermal() {
        const now = Date.now();

        // Simulate thermal state based on performance metrics
        const cpuUsage = this.getCurrentCPUUsage();
        const currentTemp = this.calculateSimulatedTemperature(cpuUsage);

        // Update thermal metrics
        this.thermalMetrics = {
            thermalState: this.calculateThermalState(currentTemp),
            thermalPressure: this.calculatePressureLevel(currentTemp),
            temperature: currentTemp,
            cpuFrequency: this.calculateCPUFrequency(cpuUsage),
            currentUsage: cpuUsage,
            thermalThrottlingActive: this.shouldThrottle(currentTemp),
            throttlingLevel: this.calculateThrottlingLevel(currentTemp),
            recommendedModes: this.getRecommendedModes(currentTemp),
            lastThermalCheck: now,
            emergencyCount: this.thermalMetrics.emergencyCount,
            hysteresis: this.thermalMetrics.hysteresis,
            lastTemperature: this.thermalMetrics.lastTemperature
        };

        // Apply thermal throttling if needed
        this.applyThermalThrottling(currentTemp);

        // Log thermal events
        this.logThermalEvents(currentTemp);

        this.lastThermalCheck = now;
    }

    getCurrentCPUUsage() {
        try {
            if (this.game.getCPUUsage) {
                return this.game.getCPUUsage();
            }
        } catch (e) {
            // CPU usage not available
        }
        return 0;
    }

    calculateSimulatedTemperature(cpuUsage) {
        // Simulate temperature based on CPU usage and current time
        // Higher CPU usage = higher temperature
        // This is a simplified model for web-based thermal management

        const baseTemp = 30; // Base temperature
        const cpuTemp = cpuUsage * 0.8; // Each % CPU adds 0.8°C
        const timeVar = Math.sin(Date.now() / 60000) * 5; // Small variation over time

        return Math.min(baseTemp + cpuTemp + timeVar, 100); // Cap at 100°C
    }

    calculateThermalState(temp) {
        if (temp >= 85) return 4; // Emergency
        if (temp >= 70) return 3; // Critical
        if (temp >= 55) return 2; // Hot
        if (temp >= 40) return 1; // Warm
        return 0; // Normal
    }

    calculatePressureLevel(temp) {
        if (temp >= 85) return 'emergency';
        if (temp >= 70) return 'critical';
        if (temp >= 55) return 'hot';
        if (temp >= 40) return 'warm';
        return 'normal';
    }

    calculateCPUFrequency(cpuUsage) {
        // Simulate CPU frequency reduction based on usage
        const baseFreq = 1.0;
        const throttleFactor = Math.max(0.5, 1.0 - (cpuUsage / 100) * 0.5);
        return throttleFactor;
    }

    shouldThrottle(temp) {
        return temp >= this.throttlingThreshold || this.thermalMetrics.thermalThrottlingActive;
    }

    calculateThrottlingLevel(temp) {
        if (temp >= 85) return 4; // Emergency throttling
        if (temp >= 70) return 3; // Critical throttling
        if (temp >= 55) return 2; // Hot throttling
        if (temp >= 40) return 1; // Warm throttling
        return 0; // No throttling
    }

    getRecommendedModes(temp) {
        const modes = [];

        if (temp < 40) {
            modes.push('performance');
            modes.push('balanced');
        } else if (temp < 55) {
            modes.push('balanced');
            modes.push('power_saving');
        } else {
            modes.push('power_saving');
        }

        return modes;
    }

    applyThermalThrottling(temp) {
        const throttlingActive = this.shouldThrottle(temp);
        const throttlingLevel = this.calculateThrottlingLevel(temp);

        if (throttlingActive !== this.thermalMetrics.thermalThrottlingActive) {
            this.thermalMetrics.thermalThrottlingActive = throttlingActive;
            console.log(`[ThermalManager] Thermal throttling ${throttlingActive ? 'enabled' : 'disabled'}`);
        }

        if (throttlingLevel !== this.thermalMetrics.throttlingLevel) {
            this.thermalMetrics.throttlingLevel = throttlingLevel;

            // Apply throttling effects
            this.applyThrottlingEffects(throttlingLevel, temp);

            this.healingLog.push({
                timestamp: Date.now(),
                type: 'throttling',
                level: throttlingLevel,
                temperature: temp,
                action: 'thermal_throttle_applied'
            });
        }
    }

    applyThrottlingEffects(level, temp) {
        switch(level) {
            case 0: // No throttling
                this.applyNoThrottling();
                break;
            case 1: // Warm - minor reduction
                this.applyMinorThrottling();
                break;
            case 2: // Hot - moderate reduction
                this.applyModerateThrottling();
                break;
            case 3: // Critical - significant reduction
                this.applyCriticalThrottling();
                break;
            case 4: // Emergency - maximum reduction
                this.applyEmergencyThrottling();
                break;
        }
    }

    applyNoThrottling() {
        console.log('[ThermalManager] No throttling applied');
    }

    applyMinorThrottling() {
        if (this.game.setRenderScale) {
            this.game.setRenderScale(0.85);
            console.log('[ThermalManager] Minor throttling: render scale 0.85');
        }
        if (this.game.setGraphicsQuality) {
            this.game.setGraphicsQuality('medium');
        }
    }

    applyModerateThrottling() {
        if (this.game.setRenderScale) {
            this.game.setRenderScale(0.7);
            console.log('[ThermalManager] Moderate throttling: render scale 0.7');
        }
        if (this.game.setGraphicsQuality) {
            this.game.setGraphicsQuality('low');
        }
    }

    applyCriticalThrottling() {
        if (this.game.setRenderScale) {
            this.game.setRenderScale(0.5);
            console.log('[ThermalManager] Critical throttling: render scale 0.5');
        }
        if (this.game.setGraphicsQuality) {
            this.game.setGraphicsQuality('lowest');
        }
        if (this.game.disableEffects) {
            this.game.disableEffects(true);
        }
    }

    applyEmergencyThrottling() {
        console.log('[ThermalManager] Emergency throttling applied');

        // Emergency measures
        if (this.game.setRenderScale) {
            this.game.setRenderScale(0.3);
        }
        if (this.game.setGraphicsQuality) {
            this.game.setGraphicsQuality('lowest');
        }
        if (this.game.disableEffects) {
            this.game.disableEffects(true);
        }
        if (this.game.reduceFrameRate) {
            this.game.reduceFrameRate(30);
        }

        // Notify game
        if (this.game.onThermalEmergency) {
            this.game.onThermalEmergency(currentTemp);
        }
    }

    logThermalEvents(temp) {
        const pressure = this.thermalMetrics.thermalPressure;
        const oldPressure = this.lastKnownPressure || 'normal';

        if (pressure !== oldPressure) {
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'thermal_event',
                event: 'pressure_change',
                oldLevel: oldPressure,
                newLevel: pressure,
                temperature: temp,
                throttlingLevel: this.thermalMetrics.throttlingLevel
            });
        }

        this.lastKnownPressure = pressure;
    }

    // Public API
    getThermalMetrics() {
        return this.thermalMetrics;
    }

    getHealingLog() {
        return this.healingLog.slice(-20);
    }

    isThrottling() {
        return this.thermalMetrics.thermalThrottlingActive;
    }

    getThrottlingLevel() {
        return this.thermalMetrics.throttlingLevel;
    }

    forceCooling() {
        console.log('[ThermalManager] Force cooling initiated');
        this.applyEmergencyThrottling();
        this.thermalMetrics.thermalThrottlingActive = true;
    }

    releaseThrottling() {
        console.log('[ThermalManager] Release throttling');
        this.thermalMetrics.thermalThrottlingActive = false;
        this.thermalMetrics.throttlingLevel = 0;
        this.applyNoThrottling();
    }

    cleanup() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
        console.log('[ThermalManager] Cleaned up');
    }
}

// Export for global use
export let globalThermalManager = null;

export function getThermalManager(game) {
    if (!globalThermalManager && game) {
        globalThermalManager = new ThermalManager(game);
    }
    return globalThermalManager;
}