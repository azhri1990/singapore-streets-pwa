// FPSTthrottlingAgent.js - Specialized agent for Android Game Mode FPS throttling
// Based on: https://developer.android.com/games/optimize/adpf/gamemode/fps-throttling
// Integrates FPS throttling intervention for performance/battery modes
// Available Android 13+ (API level 33+)

export class FPSTthrottlingAgent {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.isSupported = false; // API level 33+
        this.apiLevel = typeof android !== 'undefined' ? android.os.Build.VERSION.SDK_INT : 34;
        this.throttleMode = 'standard'; // standard | performance | battery
        this.targetFps = 60;
        this.fpsInterventionActive = false;
        this.throttleStats = {
            currentFps: 60,
            targetFps: 60,
            powerReductionPercent: 0,
            isThrottled: false,
            mode: 'standard'
        };
        this.healingLog = [];
        this.lastFpsCheck = 0;
        this.fpsCheckInterval = 3000;

        this.initialize();
    }

    initialize() {
        // FPS throttling available on Android 13+ (API level 33+)
        this.isSupported = this.apiLevel >= 33;

        // Detect current game mode
        this.throttleMode = this.game?.getGameMode || (() => 'standard')();

        // Set up FPS monitoring
        this.fpsMonitorInterval = setInterval(() => {
            this.monitorFPS();
        }, this.fpsCheckInterval);

        console.log(`[FPSTthrottlingAgent] Initialized - Supported: ${this.isSupported}, Mode: ${this.throttleMode}`);
    }

    monitorFPS() {
        const now = Date.now();
        const currentFps = this.game?.getFPS || (() => 60)();

        this.throttleStats.currentFps = currentFps;

        // Apply throttling based on mode
        const targetFps = this.getTargetFpsForMode(this.throttleMode);
        this.throttleStats.targetFps = targetFps;

        if (currentFps > targetFps && !this.fpsInterventionActive) {
            this.applyFPSTthrottling(targetFps);
        }

        // Update power reduction estimate
        if (this.fpsInterventionActive) {
            this.throttleStats.powerReductionPercent = this.calculatePowerReduction(targetFps);
        }

        this.lastFpsCheck = now;
    }

    getTargetFpsForMode(mode) {
        const modes = {
            performance: 120,
            standard: 60,
            battery: 30
        };
        return modes[mode] || 60;
    }

    applyFPSTthrottling(targetFps) {
        if (!this.isSupported) {
            console.log('[FPSTthrottlingAgent] FPS throttling not supported on this device/API level');
            return;
        }

        console.log(`[FPSTthrottlingAgent] Applying FPS throttling to ${targetFps} FPS`);

        if (this.game?.setTargetFPS) {
            this.game.setTargetFPS(targetFps);
        }

        this.fpsInterventionActive = true;
        this.throttleStats.isThrottled = true;
        this.throttleStats.targetFps = targetFps;
        this.throttleStats.mode = this.throttleMode;

        this.healingLog.push({
            timestamp: Date.now(),
            action: 'fps_throttling_applied',
            targetFps,
            mode: this.throttleMode,
            status: 'applied'
        });
    }

    calculatePowerReduction(targetFps) {
        // Estimated power reduction based on FPS throttling
        const maxFps = 120;
        const reduction = (maxFps - targetFps) / maxFps;
        return Math.round(reduction * 100); // Percentage
    }

    setGameMode(mode) {
        if (!['standard', 'performance', 'battery'].includes(mode)) {
            console.warn(`[FPSTthrottlingAgent] Unsupported game mode: ${mode}`);
            return false;
        }

        this.throttleMode = mode;
        this.fpsInterventionActive = false;
        this.throttleStats.isThrottled = false;

        // Re-apply throttling for new mode
        const targetFps = this.getTargetFpsForMode(mode);
        if (this.game?.setTargetFPS) {
            this.game.setTargetFPS(targetFps);
        }

        this.throttleStats.currentFps = targetFps;
        this.throttleStats.targetFps = targetFps;
        this.throttleStats.mode = mode;

        console.log(`[FPSTthrottlingAgent] Game mode set to: ${mode} (target FPS: ${targetFps})`);
        return true;
    }

    getFPSThrottlingReport() {
        return {
            supported: this.isSupported,
            apiLevel: this.apiLevel,
            mode: this.throttleMode,
            targetFps: this.throttleStats.targetFps,
            currentFps: this.throttleStats.currentFps,
            powerReductionPercent: this.throttleStats.powerReductionPercent,
            isThrottled: this.throttleStats.isThrottled,
            healingLog: this.healingLog.slice(-10)
        };
    }

    triggerSelfHeal() {
        console.log('[FPSTthrottlingAgent] Self-heal triggered - resetting FPS throttling');

        this.fpsInterventionActive = false;
        this.throttleStats.isThrottled = false;
        this.throttleStats.currentFps = this.throttleStats.targetFps;

        this.healingLog.push({
            timestamp: Date.now(),
            action: 'fps_throttling_reset',
            status: 'applied'
        });
    }

    triggerSelfLearn() {
        console.log('[FPSTthrottlingAgent] Self-learn triggered - analyzing FPS throttling patterns');

        const learningData = {
            timestamp: Date.now(),
            mode: this.throttleMode,
            targetFps: this.throttleStats.targetFps,
            currentFps: this.throttleStats.currentFps,
            powerReductionPercent: this.throttleStats.powerReductionPercent,
            isThrottled: this.throttleStats.isThrottled,
            healingLog: this.healingLog.slice(-5)
        };

        if (this.game && typeof this.game.collectFPSLearningData === 'function') {
            this.game.collectFPSLearningData(learningData);
        }

        this.healingLog.push({
            timestamp: Date.now(),
            action: 'self_learn_fps_analysis',
            data: learningData,
            status: 'applied'
        });
    }

    cleanup() {
        if (this.fpsMonitorInterval) {
            clearInterval(this.fpsMonitorInterval);
        }
        console.log('[FPSTthrottlingAgent] Cleaned up');
    }
}

// Export for global use
export let globalFPSTthrottlingAgent = null;

export function getFPSTthrottlingAgent(game) {
    if (!globalFPSTthrottlingAgent && game) {
        globalFPSTthrottlingAgent = new FPSTthrottlingAgent(game);
    }
    return globalFPSTthrottlingAgent;
}
