// MobileOptimization.js - Comprehensive mobile system orchestrator with Multi-Agent Architecture and Self-Heal/Self-Learn capabilities
// Integrates all mobile systems: PerformanceMonitor, BatteryManager, TouchSystem, AssetStreamer, UISystem
// Enhanced with AgentCoordinator, MobileSupervisor, SelfHealSystem, SelfLearnSystem, and SelfUpdateSystem

import { PerformanceMonitor, getPerformanceMonitor } from './MobilePerformanceMonitor.js';
import { initBatteryManager } from './MobileBatteryManager.js';
import { MobileTouchSystem } from './MobileTouchSystem.js';
import { getMobileAssetStreamer } from './MobileAssetStreamer.js';
import { MobileUISystem } from './MobileUISystem.js';
import { AgentCoordinator } from './AgentCoordinator.js';
import { MobileSupervisor } from './MobileSupervisor.js';
import { SelfHealSystem } from './SelfHealSystem.js';
import { SelfLearnSystem } from './SelfLearnSystem.js';
import { SelfUpdateSystem } from './SelfUpdateSystem.js';
import { getGraphicsOptimizer } from './GraphicsOptimizer.js';
import { getInputLatencyManager } from './InputLatencyManager.js';
import { getMemoryManager } from './MemoryManager.js';
import { getNetworkOptimizer } from './NetworkOptimizer.js';
import { getThermalManager } from './ThermalManager.js';
import { getMasterCoordinator } from './MasterCoordinator.js';
import { getFramePacingManager } from './FramePacingManager.js';
import { getTelemetryAgent } from './TelemetryAgent.js';
import { getGameModeManager } from './GameModeManager.js';
import { getMemoryAdviceManager } from './MemoryAdviceManager.js';
import { getShaderOptimizerAgent } from './ShaderOptimizerAgent.js';
import { getVulkanProfileAgent } from './VulkanProfileAgent.js';
import { getOboeAudioAgent } from './OboeAudioAgent.js';
import { getFPSTthrottlingAgent } from './FPSTthrottlingAgent.js';
import { getPageSizeAgent } from './PageSizeAgent.js';
import { getGameActivityAgent } from './GameActivityAgent.js';
import { getGameControllerAgent } from './GameControllerAgent.js';
import { getAGIInspectorAgent } from './AGIInspectorAgent.js';
import { getCPUPformanceHintsAgent } from './CPUPformanceHintsAgent.js';
import { getThermalStateMonitorAgent } from './ThermalStateMonitorAgent.js';
import { getHighRefreshRateAgent } from './HighRefreshRateAgent.js';
import { getAndroidPerformanceTunerAgent } from './AndroidPerformanceTunerAgent.js';

export class MobileOptimization {
    constructor(game) {
        this.game = game;
        this.isInitialized = false;

        this.performanceMonitor = null;
        this.batteryManager = null;
        this.touchSystem = null;
        this.assetStreamer = null;
        this.uiSystem = null;

        // Multi-Agent Architecture
        this.agentCoordinator = null;
        this.mobileSupervisor = null;
        this.selfHealSystem = null;
        this.selfLearnSystem = null;
        this.selfUpdateSystem = null;
        this.graphicsOptimizer = null;
        this.inputLatencyManager = null;
        this.memoryManager = null;
        this.networkOptimizer = null;
        this.thermalManager = null;
        this.masterCoordinator = null;
        this.framePacingManager = null;
        this.telemetryAgent = null;
        this.gameModeManager = null;
        this.memoryAdviceManager = null;
        this.shaderOptimizerAgent = null;
        this.vulkanProfileAgent = null;
        this.oboeAudioAgent = null;
        this.fpstThrottlingAgent = null;
        this.pageSizeAgent = null;
        this.gameActivityAgent = null;
        this.gameControllerAgent = null;
        this.agiInspectorAgent = null;
        this.cpuPerformanceHintsAgent = null;
        this.thermalStateMonitorAgent = null;
        this.highRefreshRateAgent = null;
        this.androidPerformanceTunerAgent = null;
        this.agentSystemEnabled = true;

        this.mobileCapabilities = this.detectMobileCapabilities();
        this.currentMode = 'balanced';

        this.initializeMobileSystems();
    }

    detectMobileCapabilities() {
        const ua = navigator.userAgent.toLowerCase();
        const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
        return {
            isMobile,
            isTablet: /ipad|android(?!.*mobile)/i.test(ua),
            isTouch: 'ontouchstart' in window,
            hasLowEndCPU: this.detectLowEndCPU(),
            hasLimitedMemory: this.detectLowMemory(),
            devicePixelRatio: window.devicePixelRatio || 1
        };
    }

    detectLowEndCPU() {
        const ua = navigator.userAgent.toLowerCase();
        const mobileUA = /android|iphone|ipad/i.test(ua);
        if (!mobileUA) return false;
        const lowEndPattern = /pixel|redmi|miui|oneplus|oppo|realme|xiaomi|honor|mediatek/;
        const cores = navigator.hardwareConcurrency || 4;
        if (cores < 4) return true;
        if (lowEndPattern.test(ua)) return true;
        return false;
    }

    detectLowMemory() {
        if (performance.memory) {
            const limitMB = performance.memory.jsHeapSizeLimit / 1048576;
            return limitMB < 512;
        }
        return false;
    }

    async initializeMobileSystems() {
        try {
            // Initialize core systems
            this.uiSystem = new MobileUISystem(this.game);
            this.touchSystem = new MobileTouchSystem(this.game);

            this.performanceMonitor = new PerformanceMonitor(this.game);
            this.assetStreamer = this.game.assetLoader ?
                getMobileAssetStreamer(this.game) : null;

            // Initialize battery manager (async)
            this.batteryManager = await initBatteryManager();

            // Initialize Multi-Agent Architecture
            if (this.agentSystemEnabled) {
                this.agentCoordinator = new AgentCoordinator(this.game);
                this.mobileSupervisor = new MobileSupervisor(this.game);
                this.selfHealSystem = new SelfHealSystem(this.game);
                this.selfLearnSystem = new SelfLearnSystem(this.game);
                this.selfUpdateSystem = new SelfUpdateSystem(this.game);
                this.graphicsOptimizer = getGraphicsOptimizer(this.game);
                this.inputLatencyManager = getInputLatencyManager(this.game);
                this.memoryManager = getMemoryManager(this.game);
                this.networkOptimizer = getNetworkOptimizer(this.game);
                this.thermalManager = getThermalManager(this.game);
                this.masterCoordinator = getMasterCoordinator(this.game);
                this.framePacingManager = getFramePacingManager(this.game);
                this.telemetryAgent = getTelemetryAgent(this.game);
                this.gameModeManager = getGameModeManager(this.game);
                this.memoryAdviceManager = getMemoryAdviceManager(this.game);
                this.shaderOptimizerAgent = getShaderOptimizerAgent(this.game);
                this.vulkanProfileAgent = getVulkanProfileAgent(this.game);
                this.oboeAudioAgent = getOboeAudioAgent(this.game);
                this.fpstThrottlingAgent = getFPSTthrottlingAgent(this.game);
                this.pageSizeAgent = getPageSizeAgent(this.game);
                this.gameActivityAgent = getGameActivityAgent(this.game);
                this.gameControllerAgent = getGameControllerAgent(this.game);
                this.agiInspectorAgent = getAGIInspectorAgent(this.game);
                this.cpuPerformanceHintsAgent = getCPUPformanceHintsAgent(this.game);
                this.thermalStateMonitorAgent = getThermalStateMonitorAgent(this.game);
                this.highRefreshRateAgent = getHighRefreshRateAgent(this.game);
                this.androidPerformanceTunerAgent = getAndroidPerformanceTunerAgent(this.game);

                // Set up supervisor integration
                this.setupSupervisorIntegration();

                console.log('[MobileOptimization] Multi-agent architecture with self-heal/self-learn initialized');
            }

            this.isInitialized = true;
            console.log('[MobileOptimization] All mobile systems initialized');

            // Signal game that mobile systems are ready
            if (typeof this.game.onMobileInit === 'function') {
                this.game.onMobileInit();
            }
        } catch (e) {
            console.warn('[MobileOptimization] Initialization partial:', e.message);
        }
    }

    setupSupervisorIntegration() {
        // Connect supervisor to game systems
        if (this.mobileSupervisor && this.game) {
            // Provide game methods for agent monitoring
            this.game.getFPS = () => this.performanceMonitor?.getFPS?.() || 60;
            this.game.getMemoryUsage = () => this.performanceMonitor?.getMemoryUsage?.() || 0;
            this.game.getLoadFactor = () => this.performanceMonitor?.getLoadFactor?.() || 0;
            this.game.getBatteryLevel = () => this.batteryManager?.getBatteryLevel?.() || 1.0;
            this.game.getBatteryHealth = () => this.batteryManager?.getBatteryHealth?.() || 1.0;
            this.game.getBatteryThreshold = () => this.batteryManager?.getThreshold?.() || 15;
            this.game.getTouchPoints = () => this.touchSystem?.getActiveTouchPoints?.() || 0;
            this.game.getTouchAccuracy = () => this.touchSystem?.getTouchAccuracy?.() || 1.0;
            this.game.getTouchResponseTime = () => this.touchSystem?.getResponseTime?.() || 0;
            this.game.getLoadedAssetsCount = () => this.assetStreamer?.getLoadedCount?.() || 0;
            this.game.getFailedAssetLoads = () => this.assetStreamer?.getFailedCount?.() || 0;
            this.game.getAssetLoadTime = () => this.assetStreamer?.getLoadTime?.() || 0;
            this.game.getUIElementsCount = () => this.uiSystem?.getUIElementsCount?.() || 0;
            this.game.getTouchTargetSize = () => this.uiSystem?.getTouchTargetSize?.() || 48;
            this.game.getLayoutScore = () => this.uiSystem?.getLayoutScore?.() || 1.0;
            this.game.getUIResponsiveness = () => this.uiSystem?.getResponsiveness?.() || 1.0;
            this.game.getFrameTime = () => this.performanceMonitor?.getFrameTime?.() || 16.67;
            this.game.getGCPause = () => this.performanceMonitor?.getGCPause?.() || 0;
            this.game.getRenderTime = () => this.performanceMonitor?.getRenderTime?.() || 0;
            this.game.getCPUUsage = () => this.performanceMonitor?.getCPUUsage?.() || 0;
        }
    }

    scheduleCoordination() {
        // Run coordination every 5 seconds
        setInterval(() => {
            if (this.agentCoordinator && this.agentCoordinator.isRunning === false) {
                this.agentCoordinator.run();

                // Run supervisor health checks
                if (this.mobileSupervisor && this.mobileSupervisor.isActive) {
                    this.mobileSupervisor.checkHealth();
                    this.mobileSupervisor.analyzeLearningData();
                }

                // Run self-heal and self-learn
                this.selfHealSystem?.triggerSelfHeal();
                this.selfLearnSystem?.triggerSelfLearn();
            }
        }, 5000);

        console.log('[MobileOptimization] Agent coordination scheduled');
    }

    update(deltaTime) {
        if (!this.isInitialized) return;

        // Update core mobile systems
        this.performanceMonitor?.update(deltaTime);
        this.batteryManager?.updateBatteryState?.();

        // Run agent coordination periodically
        if (this.agentSystemEnabled && this.agentCoordinator) {
            this.agentCoordinator.run();
        }

        // Run supervisor monitoring
        if (this.agentSystemEnabled && this.mobileSupervisor) {
            this.mobileSupervisor.run();
        }
    }

    applyBatteryScaling(budget, mode) {
        if (this.performanceMonitor && this.batteryManager) {
            this.performanceMonitor.throttleFactor = budget;
            this.performanceMonitor.applyThrottleSettings();
        }
    }

    onPerformanceThrottle(factor) {
        // Hook for further per-frame adjustments

        // Notify agent coordinator of throttle
        if (this.agentCoordinator) {
            console.log('[MobileOptimization] Performance throttle:', factor);
        }
    }

    getMobileStatus() {
        return {
            initialized: this.isInitialized,
            batteryLevel: this.batteryManager?.getBatteryLevel?.() || 1.0,
            mode: this.batteryManager?.getMode?.() || 'balanced',
            grade: this.performanceMonitor?.getPerformanceGrade?.() || 'N/A',
            // Multi-agent status
            agents: this.agentCoordinator?.getAgentStatus ? this.agentCoordinator.getAgentStatus() : {},
            supervisor: this.mobileSupervisor ? 'active' : 'inactive',
            selfHeal: this.selfHealSystem ? 'active' : 'inactive',
            selfLearn: this.selfLearnSystem ? 'active' : 'inactive',
            selfUpdate: this.selfUpdateSystem ? 'active' : 'inactive'
        };
    }

    // Multi-agent control methods
    enableAgentSystem(enabled = true) {
        this.agentSystemEnabled = enabled;
        console.log(`[MobileOptimization] Agent system ${enabled ? 'enabled' : 'disabled'}`);
    }

    getAgentCoordinator() {
        return this.agentCoordinator;
    }

    getMobileSupervisor() {
        return this.mobileSupervisor;
    }

    getSelfHealSystem() {
        return this.selfHealSystem;
    }

    getSelfLearnSystem() {
        return this.selfLearnSystem;
    }

    getSelfUpdateSystem() {
        return this.selfUpdateSystem;
    }

    // Self-heal trigger
    triggerSelfHeal() {
        if (this.selfHealSystem) {
            this.selfHealSystem.triggerSelfHeal();
        }
        if (this.mobileSupervisor) {
            this.mobileSupervisor.checkHealth();
        }
        console.log('[MobileOptimization] Self-heal triggered for all agents');
    }

    // Self-learn trigger
    triggerSelfLearn() {
        if (this.selfLearnSystem) {
            this.selfLearnSystem.triggerSelfLearn();
        }
        if (this.mobileSupervisor) {
            this.mobileSupervisor.analyzeLearningData();
        }
        console.log('[MobileOptimization] Self-learn triggered for all agents');
    }

    // Self-update trigger
    triggerSelfUpdate() {
        if (this.selfUpdateSystem) {
            this.selfUpdateSystem.triggerSelfUpdate();
        }
        console.log('[MobileOptimization] Self-update triggered');
    }

    // Self-heal and self-learn triggers
    triggerSelfHealAll() {
        if (this.selfHealSystem) {
            this.selfHealSystem.triggerSelfHeal();
        }
        if (this.mobileSupervisor) {
            this.mobileSupervisor.checkHealth();
        }
        console.log('[MobileOptimization] Self-heal triggered for all agents');
    }

    triggerSelfLearnAll() {
        if (this.selfLearnSystem) {
            this.selfLearnSystem.triggerSelfLearn();
        }
        if (this.mobileSupervisor) {
            this.mobileSupervisor.analyzeLearningData();
        }
        console.log('[MobileOptimization] Self-learn triggered for all agents');
    }

    // Self-update trigger
    triggerSelfUpdateAll() {
        if (this.selfUpdateSystem) {
            this.selfUpdateSystem.triggerSelfUpdate();
        }
        console.log('[MobileOptimization] Self-update triggered');
    }
}

// Export for global use
export let globalMobileOptimization = null;

export function getMobileOptimization(game) {
    if (!globalMobileOptimization && game) {
        globalMobileOptimization = new MobileOptimization(game);
    }
    return globalMobileOptimization;
}
