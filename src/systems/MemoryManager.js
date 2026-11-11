// MemoryManager.js - Specialized agent for memory optimization and management
// Handles memory budgeting, cleanup, garbage collection, and memory leak prevention

export class MemoryManager {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.memoryMetrics = {
            heapTotal: 0,
            heapUsed: 0,
            heapTotalJS: 0,
            heapUsedJS: 0,
            arrayBufferTotal: 0,
            arrayBufferUsed: 0,
            lastGC: 0,
            gcCount: 0,
            memoryLeaksDetected: 0,
            memoryPressureLevel: 'low' // low, medium, high, critical
        };
        this.healingLog = [];
        this.memoryHistory = [];
        this.budget = 512; // MB budget target
        this.lastOptimization = 0;
        this.optimizationInterval = 5000; // 5 seconds

        this.initialize();
    }

    initialize() {
        // Set up periodic monitoring
        this.monitorInterval = setInterval(() => {
            this.monitorMemory();
        }, 1000);

        this.optimizationInterval = setInterval(() => {
            this.optimizeMemory();
        }, this.optimizationInterval);

        // Initial memory snapshot
        this.collectInitialMemory();

        console.log('[MemoryManager] Initialized');
    }

    collectInitialMemory() {
        const initial = this.collectMemoryMetrics();
        this.memoryHistory.push({
            timestamp: Date.now(),
            ...initial
        });

        // Keep last 50 entries
        if (this.memoryHistory.length > 50) {
            this.memoryHistory = this.memoryHistory.slice(-25);
        }

        console.log('[MemoryManager] Initial memory snapshot collected');
    }

    collectMemoryMetrics() {
        const metrics = {
            heapTotal: performance?.memory?.JSHeapSize || 0,
            heapUsed: performance?.memory?.usedJSHeapSize || 0,
            heapTotalJS: performance?.memory?.jsHeapSizeLimit || 0,
            heapUsedJS: performance?.memory?.totalJSHeapSize || performance?.memory?.usedJSHeapSize || 0,
            arrayBufferTotal: (performance?.memory?.totalBytes || 0) / (1024 * 1024),
            arrayBufferUsed: (performance?.memory?.usedBytes || 0) / (1024 * 1024),
            lastGC: Date.now(),
            gcCount: this.getGCCount(),
            memoryLeaksDetected: 0,
            memoryPressureLevel: this.calculateMemoryPressure()
        };

        return metrics;
    }

    getGCCount() {
        try {
            // Try to get GC count from various sources
            if (performance && performance.memory) {
                return performance.memory.gcCount || 0;
            }
        } catch (e) {
            // GC count not available
        }
        return 0;
    }

    calculateMemoryPressure() {
        const used = this.memoryMetrics.heapUsed;
        const limit = this.memoryMetrics.heapTotalJS;

        if (limit === 0) return 'low';

        const percentage = (used / limit) * 100;

        if (percentage > 90) return 'critical';
        if (percentage > 75) return 'high';
        if (percentage > 50) return 'medium';
        return 'low';
    }

    monitorMemory() {
        const currentMetrics = this.collectMemoryMetrics();

        // Store in history
        this.memoryHistory.push({
            timestamp: Date.now(),
            ...currentMetrics
        });

        if (this.memoryHistory.length > 50) {
            this.memoryHistory = this.memoryHistory.slice(-25);
        }

        // Update current metrics
        this.memoryMetrics = currentMetrics;

        // Check for pressure level changes
        const oldLevel = this.lastKnownPressureLevel || 'low';
        const newLevel = currentMetrics.memoryPressureLevel;

        if (oldLevel !== newLevel) {
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'pressure_change',
                oldLevel,
                newLevel,
                usedMB: Math.round(currentMetrics.heapUsed / 1024 / 1024),
                totalMB: Math.round(currentMetrics.heapTotalJS / 1024 / 1024)
            });
        }

        this.lastKnownPressureLevel = newLevel;

        // Trigger healing if pressure is high
        if (newLevel === 'critical' || newLevel === 'high') {
            this.triggerSelfHeal();
        }
    }

    optimizeMemory() {
        console.log('[MemoryManager] Optimizing memory management');

        const metrics = this.collectMemoryMetrics();
        const actionsTaken = [];

        // Check memory pressure
        if (metrics.memoryPressureLevel === 'critical') {
            // Emergency cleanup
            if (this.game.cleanupUnusedAssets) {
                this.game.cleanupUnusedAssets();
                actionsTaken.push('cleanup_assets');
                console.log('[MemoryManager] Emergency asset cleanup');
            }

            if (this.game.forceGC) {
                this.game.forceGC();
                actionsTaken.push('force_gc');
                console.log('[MemoryManager] Forced garbage collection');
            }

            this.memoryMetrics.memoryLeaksDetected++;
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'critical_healing',
                action: 'emergency_cleanup',
                pressure: 'critical'
            });
        } else if (metrics.memoryPressureLevel === 'high') {
            // Moderate cleanup
            if (this.game.cleanupUnusedAssets) {
                this.game.cleanupUnusedAssets();
                actionsTaken.push('cleanup_assets');
            }
            console.log('[MemoryManager] High pressure cleanup applied');
        } else if (metrics.heapUsed > this.budget * 1024 * 1024 * 0.8) {
            // Approaching budget
            if (this.game.trimMemory) {
                this.game.trimMemory('memory');
                actionsTaken.push('trim_memory');
            }
            console.log('[MemoryManager] Approaching budget - trimmed memory');
        }

        // Record optimization
        if (actionsTaken.length > 0) {
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'optimization',
                actions: actionsTaken,
                heapUsedMB: Math.round(metrics.heapUsed / 1024 / 1024)
            });
        }

        console.log(`[MemoryManager] Optimization complete. Heap: ${Math.round(metrics.heapUsed / 1024 / 1024)}MB / ${Math.round(metrics.heapTotalJS / 1024 / 1024)}MB`);
    }

    triggerSelfHeal() {
        console.log('[MemoryManager] Self-heal triggered for memory management');

        const metrics = this.collectMemoryMetrics();

        // Apply aggressive cleanup
        if (this.game.cleanupUnusedAssets) {
            this.game.cleanupUnusedAssets();
        }

        if (this.game.forceGC) {
            this.game.forceGC();
        }

        // Reduce graphics quality if also needed
        if (this.game.setGraphicsQuality && metrics.heapUsed > this.budget * 1024 * 1024 * 0.7) {
            this.game.setGraphicsQuality('low');
        }

        this.healingLog.push({
            timestamp: Date.now(),
            type: 'healing',
            action: 'memory_optimization',
            status: 'applied',
            heapUsedMB: Math.round(metrics.heapUsed / 1024 / 1024)
        });
    }

    // Public API
    getMemoryMetrics() {
        return this.memoryMetrics;
    }

    getHealingLog() {
        return this.healingLog.slice(-20);
    }

    getMemoryHistory() {
        return this.memoryHistory.slice(-10);
    }

    setBudget(budgetMB) {
        this.budget = budgetMB;
        console.log(`[MemoryManager] Memory budget set to ${budgetMB}MB`);
    }

    cleanup() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
        if (this.optimizationInterval) {
            clearInterval(this.optimizationInterval);
        }
        console.log('[MemoryManager] Cleaned up');
    }
}

// Export for global use
export let globalMemoryManager = null;

export function getMemoryManager(game) {
    if (!globalMemoryManager && game) {
        globalMemoryManager = new MemoryManager(game);
    }
    return globalMemoryManager;
}