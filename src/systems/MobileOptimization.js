// MobileOptimization.js - Comprehensive mobile system orchestrator
// Integrates all mobile systems: PerformanceMonitor, BatteryManager, TouchSystem, AssetStreamer, UISystem

import { PerformanceMonitor, getPerformanceMonitor } from './MobilePerformanceMonitor.js';
import { initBatteryManager } from './MobileBatteryManager.js';
import { MobileTouchSystem } from './MobileTouchSystem.js';
import { getMobileAssetStreamer } from './MobileAssetStreamer.js';
import { MobileUISystem } from './MobileUISystem.js';

export class MobileOptimization {
    constructor(game) {
        this.game = game;
        this.isInitialized = false;

        this.performanceMonitor = null;
        this.batteryManager = null;
        this.touchSystem = null;
        this.assetStreamer = null;
        this.uiSystem = null;

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
            this.uiSystem = new MobileUISystem(this.game);
            this.touchSystem = new MobileTouchSystem(this.game);

            this.performanceMonitor = new PerformanceMonitor(this.game);
            this.assetStreamer = this.game.assetLoader ?
                getMobileAssetStreamer(this.game) : null;

            // Initialize battery manager (async)
            this.batteryManager = await initBatteryManager();

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

    update(deltaTime) {
        if (!this.isInitialized) return;
        this.performanceMonitor?.update(deltaTime);
        this.batteryManager?.updateBatteryState?.();
    }

    applyBatteryScaling(budget, mode) {
        if (this.performanceMonitor && this.batteryManager) {
            this.performanceMonitor.throttleFactor = budget;
            this.performanceMonitor.applyThrottleSettings();
        }
    }

    onPerformanceThrottle(factor) {
        // Hook for further per-frame adjustments
    }

    getMobileStatus() {
        return {
            initialized: this.isInitialized,
            batteryLevel: this.batteryManager?.getBatteryLevel?.() || 1.0,
            mode: this.batteryManager?.getMode?.() || 'balanced',
            grade: this.performanceMonitor?.getPerformanceGrade?.() || 'N/A'
        };
    }
}

// Singleton instance for global access
let globalMobileOptimization = null;

export function getMobileOptimization(game = null) {
    if (!globalMobileOptimization && game) {
        globalMobileOptimization = new MobileOptimization(game);
    }
    return globalMobileOptimization;
}
