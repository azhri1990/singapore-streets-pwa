// GameModeManager.js - Specialized agent for Android Game Mode API integration
// Based on: https://developer.android.com/games/optimize/adpf/gamemode
// Integrates Game Mode (STANDARD/PERFORMANCE/BATTERY) with game fidelity and frame rate settings

export class GameModeManager {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.supportedGameModes = ['standard', 'performance', 'battery'];
        this.currentGameMode = 'standard';
        this.isSupported = false; // Detect via capability probe
        this.modeConfig = {
            performance: {
                targetFps: 60,
                quality: 'high',
                renderScale: 1.0,
                batteryOptimization: false
            },
            battery: {
                targetFps: 30,
                quality: 'medium',
                renderScale: 0.85,
                batteryOptimization: true
            },
            standard: {
                targetFps: 60,
                quality: 'medium',
                renderScale: 0.9,
                batteryOptimization: false
            }
        };
        this.modeHistory = [];
        this.emergencyOverride = null;

        this.initialize();
    }

    initialize() {
        // Probe Game Mode support (Android 12+)
        const apiLevel = typeof android !== 'undefined' ? android.os.Build.VERSION.SDK_INT : 34;
        this.isSupported = apiLevel >= 31; // Android 12+

        // Load current mode from game or detect
        this.currentGameMode = this.game?.getGameMode || (() => 'standard')();

        console.log(`[GameModeManager] Initialized - Game Mode API supported: ${this.isSupported}`);

        // Set up mode change monitoring
        this.modeCheckInterval = setInterval(() => {
            this.checkGameMode();
        }, 5000);
    }

    checkGameMode() {
        const currentMode = this.game?.getGameMode ? this.game.getGameMode() : this.currentGameMode;

        if (currentMode !== this.currentGameMode) {
            this.currentGameMode = currentMode;
            this.applyGameModeSettings(currentMode);
            this.modeHistory.push({
                timestamp: Date.now(),
                mode: currentMode
            });
            console.log(`[GameModeManager] Game Mode changed to: ${currentMode}`);
        }
    }

    applyGameModeSettings(mode) {
        const config = this.modeConfig[mode] || this.modeConfig.standard;

        // Apply performance settings
        if (this.game?.setTargetFPS) {
            this.game.setTargetFPS(config.targetFps);
        }
        if (this.game?.setGraphicsQuality) {
            this.game.setGraphicsQuality(config.quality);
        }
        if (this.game?.setRenderScale) {
            this.game.setRenderScale(config.renderScale);
        }

        // Apply battery optimization
        if (config.batteryOptimization) {
            if (this.game?.enablePowerSavingMode) {
                this.game.enablePowerSavingMode(true);
            }
        }

        console.log(`[GameModeManager] Applied settings for mode: ${mode}`);
        return config;
    }

    setGameMode(mode) {
        if (!this.supportedGameModes.includes(mode)) {
            console.warn(`[GameModeManager] Unsupported game mode: ${mode}`);
            return false;
        }

        this.currentGameMode = mode;
        this.applyGameModeSettings(mode);
        this.modeHistory.push({
            timestamp: Date.now(),
            mode
        });

        console.log(`[GameModeManager] Game mode set to: ${mode}`);
        return true;
    }

    getRecommendedMode(thermalState, batteryLevel) {
        // Recommend best mode based on conditions
        if (thermalState >= 3) {
            return 'battery'; // Thermal emergency - battery saver
        }
        if (batteryLevel < 20) {
            return 'battery';
        }
        if (batteryLevel > 80) {
            return 'performance'; // Low battery but high charge - performance
        }

        return this.currentGameMode;
    }

    getGameModeReport() {
        return {
            currentMode: this.currentGameMode,
            supported: this.isSupported,
            supportedModes: this.supportedGameModes,
            history: this.modeHistory.slice(-10)
        };
    }

    triggerSelfHeal() {
        console.log('[GameModeManager] Self-heal triggered - resetting game mode to safe defaults');

        this.currentGameMode = 'standard';
        this.applyGameModeSettings('standard');
        this.emergencyOverride = null;

        this.modeHistory.push({
            timestamp: Date.now(),
            mode: this.currentGameMode,
            reason: 'self_heal_reset'
        });

        this.healingLog = this.healingLog || [];
        this.healingLog.push({
            timestamp: Date.now(),
            action: 'game_mode_reset',
            mode: 'standard',
            status: 'applied'
        });
    }

    triggerSelfLearn() {
        console.log('[GameModeManager] Self-learn triggered - analyzing mode history');

        const learningData = {
            timestamp: Date.now(),
            currentMode: this.currentGameMode,
            modeHistory: this.modeHistory.slice(-20),
            supported: this.isSupported,
            modeConfig: this.modeConfig
        };

        if (this.game && typeof this.game.collectGameModeData === 'function') {
            this.game.collectGameModeData(learningData);
        }

        this.healingLog = this.healingLog || [];
        this.healingLog.push({
            timestamp: Date.now(),
            action: 'mode_learning',
            data: learningData,
            status: 'applied'
        });
    }

    cleanup() {
        if (this.modeCheckInterval) {
            clearInterval(this.modeCheckInterval);
        }
        console.log('[GameModeManager] Cleaned up');
    }
}

// Export for global use
export let globalGameModeManager = null;

export function getGameModeManager(game) {
    if (!globalGameModeManager && game) {
        globalGameModeManager = new GameModeManager(game);
    }
    return globalGameModeManager;
}
