// TelemetryAgent.js - Specialized agent for app telemetry and performance metrics collection
// Based on: Android Performance Tuner (APT) metrics for frame rate, loading times, loading abandonment
// Collects telemetry across frames, quality levels, load events, and device models

export class TelemetryAgent {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.telemetryEvents = [];
        this.frameMetrics = [];
        this.loadingMetrics = [];
        this.loadAbandonmentMetrics = [];
        this.deviceModelMetrics = {};
        this.qualityLevelMetrics = {};
        this.customAnnotations = [];
        this.isCollecting = false;
        this.collectInterval = 5000;
        this.lastCollect = 0;

        this.initialize();
    }

    initialize() {
        // Start telemetry collection
        this.collectIntervalHandle = setInterval(() => {
            this.collectTelemetry();
        }, this.collectInterval);

        console.log('[TelemetryAgent] Initialized - APT-style telemetry collection');

        // Collect initial data
        this.collectTelemetry();
    }

    collectTelemetry() {
        const now = Date.now();

        // Collect frame metrics
        const fps = this.game?.getFPS || (() => 60)();
        const frameTime = this.game?.getFrameTime || (() => 16.67)();
        const frameMetric = {
            timestamp: now,
            frameRate: fps,
            frameTime,
            cpuUsage: this.game?.getCPUUsage || (() => 0)(),
            gpuUsage: this.game?.getGPUUtilization || (() => 0)(),
            thermalState: this.game?.getThermalState || (() => 0)()
        };
        this.frameMetrics.push(frameMetric);

        if (this.frameMetrics.length > 1000) {
            this.frameMetrics = this.frameMetrics.slice(-500);
        }

        // Collect loading metrics
        const loadingData = this.game?.getAssetLoadTime ? {
            timestamp: now,
            loadTime: this.game.getAssetLoadTime(),
            assetCount: this.game?.getLoadedAssetsCount ? this.game.getLoadedAssetsCount() : 0,
            failedLoads: this.game?.getFailedAssetLoads ? this.game.getFailedAssetLoads() : 0
        } : null;

        if (loadingData) {
            this.loadingMetrics.push(loadingData);
        }

        // Update quality level metrics
        const qualityLevel = this.game?.getGraphicsQuality ? this.game.getGraphicsQuality() : 'medium';
        const key = qualityLevel;
        if (!this.qualityLevelMetrics[key]) {
            this.qualityLevelMetrics[key] = { count: 0, fpsSum: 0, loadTimes: [] };
        }
        this.qualityLevelMetrics[key].count++;
        this.qualityLevelMetrics[key].fpsSum += fps;

        // Check for loading abandonment
        // (In web context, we track if user closes during load)
        const abandonment = this.game?.getLoadAbandonmentRate ? this.game.getLoadAbandonmentRate() : 0;
        if (abandonment > 0.3) { // >30% abandonment
            this.loadAbandonmentMetrics.push({
                timestamp: now,
                abandonmentRate: abandonment,
                qualityLevel
            });
        }
    }

    addCustomAnnotation(annotation) {
        this.customAnnotations.push({
            ...annotation,
            timestamp: Date.now()
        });
    }

    getTelemetrySummary() {
        const summary = {
            frameMetrics: this.frameMetrics.slice(-100),
            loadingMetrics: this.loadingMetrics.slice(-50),
            loadAbandonment: this.loadAbandonmentMetrics.slice(-20),
            qualityLevels: this.qualityLevelMetrics,
            customAnnotations: this.customAnnotations,
            eventCount: this.telemetryEvents.length,
            lastCollect: this.lastCollect
        };

        return summary;
    }

    getFramePerformanceStats() {
        const recentFrames = this.frameMetrics.slice(-100);
        const avgFps = recentFrames.length > 0 ?
            recentFrames.reduce((sum, f) => sum + f.frameRate, 0) / recentFrames.length : 60;

        const fpsBelow30 = recentFrames.filter(f => f.frameRate < 30).length;
        const fpsBelow60 = recentFrames.filter(f => f.frameRate < 60).length;

        return {
            averageFps: avgFps,
            framesBelow30: fpsBelow30,
            framesBelow60: fpsBelow60,
            samples: recentFrames.length,
            needsQualityAdjustment: fpsBelow60 > recentFrames.length * 0.5
        };
    }

    stop() {
        if (this.collectIntervalHandle) {
            clearInterval(this.collectIntervalHandle);
        }
        console.log('[TelemetryAgent] Stopped');
    }

    triggerSelfHeal() {
        console.log('[TelemetryAgent] Self-heal triggered - resetting telemetry buffers');

        // Reset telemetry buffers
        this.frameMetrics = [];
        this.loadingMetrics = [];
        this.loadAbandonmentMetrics = [];
        this.deviceModelMetrics = {};
        this.qualityLevelMetrics = {};
        this.customAnnotations = [];
        this.lastCollect = 0;

        this.healingLog = this.healingLog || [];
        this.healingLog.push({
            timestamp: Date.now(),
            action: 'telemetry_reset',
            status: 'applied'
        });
    }

    triggerSelfLearn() {
        console.log('[TelemetryAgent] Self-learn triggered - analyzing telemetry patterns');

        const learningData = {
            timestamp: Date.now(),
            totalEvents: this.telemetryEvents.length,
            frameMetricsCount: this.frameMetrics.length,
            loadingMetricsCount: this.loadingMetrics.length,
            qualityLevelMetrics: this.qualityLevelMetrics,
            averageFps: this.getFramePerformanceStats().averageFps,
            needsQualityAdjustment: this.getFramePerformanceStats().needsQualityAdjustment
        };

        if (this.game && typeof this.game.collectTelemetryData === 'function') {
            this.game.collectTelemetryData(learningData);
        }

        this.healingLog = this.healingLog || [];
        this.healingLog.push({
            timestamp: Date.now(),
            action: 'telemetry_learning',
            data: learningData,
            status: 'applied'
        });
    }

    cleanup() {
        if (this.collectIntervalHandle) {
            clearInterval(this.collectIntervalHandle);
        }
        console.log('[TelemetryAgent] Cleaned up');
    }
}

// Export for global use
export let globalTelemetryAgent = null;

export function getTelemetryAgent(game) {
    if (!globalTelemetryAgent && game) {
        globalTelemetryAgent = new TelemetryAgent(game);
    }
    return globalTelemetryAgent;
}
