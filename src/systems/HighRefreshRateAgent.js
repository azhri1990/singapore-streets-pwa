// HighRefreshRateAgent.js - Specialized agent for high refresh rate rendering support
// Based on: https://developer.android.com/games/sdk/frame-pacing (Swappy multi-refresh-rate support)
// Manages dynamic refresh rate switching for optimal performance and battery life
// Supports 60Hz, 90Hz, 120Hz displays with auto-adjustment

export class HighRefreshRateAgent {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.isSupported = true;
        this.currentRefreshRate = 60; // Hz
        this.supportedRefreshRates = [60, 90, 120];
        this.targetRefreshRate = 60;
        this.refreshRateStats = {
            current: 60,
            target: 60,
            supported: [60],
            autoAdjust: true,
            lastSwitch: 0,
            switchCount: 0
        };
        this.healingLog = [];
        this.lastRefreshCheck = 0;
        this.refreshCheckInterval = 5000;
        
        this.initialize();
    }

    initialize() {
        // Detect supported refresh rates
        this.detectSupportedRefreshRates();
        
        // Set up refresh rate monitoring
        this.scheduleRefreshRateChecks();
        
        console.log(`[HighRefreshRateAgent] Initialized - Current: ${this.currentRefreshRate}Hz, Supported: ${this.supportedRefreshRates.join(',')}Hz`);
    }

    detectSupportedRefreshRates() {
        // Detect display refresh rate support
        // In web context, use screen.refreshRate if available
        if (typeof screen !== 'undefined' && screen.refreshRate) {
            this.currentRefreshRate = screen.refreshRate;
            this.supportedRefreshRates = [60, 90, 120].filter(r => r <= screen.refreshRate || r === 60);
        } else {
            // Default to 60Hz
            this.supportedRefreshRates = [60];
            this.currentRefreshRate = 60;
        }
        
        this.refreshRateStats.current = this.currentRefreshRate;
        this.refreshRateStats.supported = this.supportedRefreshRates;
    }

    scheduleRefreshRateChecks() {
        setInterval(() => {
            this.checkRefreshRate();
        }, this.refreshCheckInterval);
        
        // Initial check
        this.checkRefreshRate();
    }

    checkRefreshRate() {
        const now = Date.now();
        this.lastRefreshCheck = now;
        
        // Re-detect refresh rate
        this.detectSupportedRefreshRates();
        
        // Auto-adjust based on game performance
        if (this.refreshRateStats.autoAdjust) {
            this.autoAdjustRefreshRate();
        }
    }

    autoAdjustRefreshRate() {
        const currentFps = this.game?.getFPS?.() || 60;
        const currentFrameTime = this.game?.getFrameTime?.() || 16.67;
        
        // If frame time is consistently below 16.67ms (60 FPS), try 90Hz
        if (currentFrameTime < 11.11 && this.supportedRefreshRates.includes(90)) { // 90 FPS
            this.setRefreshRate(90);
        } else if (currentFrameTime < 8.33 && this.supportedRefreshRates.includes(120)) { // 120 FPS
            this.setRefreshRate(120);
        } else if (currentFrameTime > 20 && this.currentRefreshRate > 60) {
            // If frame time is too high, drop to 60Hz
            this.setRefreshRate(60);
        }
    }

    setRefreshRate(rate) {
        if (!this.supportedRefreshRates.includes(rate)) {
            console.warn(`[HighRefreshRateAgent] Unsupported refresh rate: ${rate}Hz`);
            return false;
        }
        
        if (this.currentRefreshRate === rate) return true;
        
        const oldRate = this.currentRefreshRate;
        this.currentRefreshRate = rate;
        this.refreshRateStats.target = rate;
        this.refreshRateStats.lastSwitch = Date.now();
        this.refreshRateStats.switchCount++;
        
        // Notify game of refresh rate change
        if (this.game?.setRefreshRate) {
            this.game.setRefreshRate(rate);
        }
        
        console.log(`[HighRefreshRateAgent] Refresh rate changed: ${oldRate}Hz -> ${rate}Hz`);
        return true;
    }

    getRefreshRateStats() {
        return {
            ...this.refreshRateStats,
            current: this.currentRefreshRate,
            lastCheck: this.lastRefreshCheck
        };
    }

    triggerSelfHeal() {
        console.log('[HighRefreshRateAgent] Self-heal triggered - re-detecting refresh rates');
        
        this.detectSupportedRefreshRates();
        this.checkRefreshRate();
        
        this.healingLog.push({
            timestamp: Date.now(),
            action: 'refresh_rate_re_detection',
            status: 'applied'
        });
    }

    triggerSelfLearn() {
        console.log('[HighRefreshRateAgent] Self-learn triggered - analyzing refresh rate patterns');
        
        const learningData = {
            timestamp: Date.now(),
            currentRefreshRate: this.currentRefreshRate,
            targetRefreshRate: this.targetRefreshRate,
            supported: this.supportedRefreshRates,
            switchCount: this.refreshRateStats.switchCount
        };
        
        if (this.game && typeof this.game.collectRefreshRateData === 'function') {
            this.game.collectRefreshRateData(learningData);
        }
    }

    cleanup() {
        console.log('[HighRefreshRateAgent] Cleaned up');
    }
}

// Export for global use
export let globalHighRefreshRateAgent = null;

export function getHighRefreshRateAgent(game) {
    if (!globalHighRefreshRateAgent && game) {
        globalHighRefreshRateAgent = new HighRefreshRateAgent(game);
    }
    return globalHighRefreshRateAgent;
}