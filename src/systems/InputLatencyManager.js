// InputLatencyManager.js - Specialized agent for touch input optimization
// Optimizes touch response time, multi-touch handling, and input processing pipeline

export class InputLatencyManager {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.touchMetrics = {
            responseTime: 0,
            touchPoints: 0,
            accuracy: 1.0,
            droppedInputs: 0,
            processedInputs: 0,
            inputQueueLength: 0,
            hapticFeedbackEnabled: false
        };
        this.healingLog = [];
        this.lastOptimization = 0;
        this.optimizationInterval = 2000; // 2 seconds

        this.initialize();
    }

    initialize() {
        this.monitorInterval = setInterval(() => {
            this.monitorTouchPerformance();
        }, 1000);

        this.optimizationInterval = setInterval(() => {
            this.optimizeInputProcessing();
        }, this.optimizationInterval);

        console.log('[InputLatencyManager] Initialized');
    }

    monitorTouchPerformance() {
        this.touchMetrics = {
            responseTime: this.game.getTouchResponseTime?.() || 0,
            touchPoints: this.game.getTouchPoints?.() || 0,
            accuracy: this.game.getTouchAccuracy?.() || 1.0,
            droppedInputs: this.game.getDroppedInputs?.() || 0,
            processedInputs: this.game.getProcessedInputs?.() || 0,
            inputQueueLength: this.game.getInputQueueLength?.() || 0,
            hapticFeedbackEnabled: this.game.isHapticFeedbackEnabled?.() || false
        };

        // Check for issues
        if (this.touchMetrics.responseTime > 50) {
            this.healingLog.push({
                timestamp: Date.now(),
                issue: 'high_input_latency',
                value: this.touchMetrics.responseTime,
                action: 'optimize_input_processing'
            });
        }

        if (this.touchMetrics.droppedInputs > 0) {
            this.healingLog.push({
                timestamp: Date.now(),
                issue: 'dropped_inputs',
                value: this.touchMetrics.droppedInputs,
                action: 'increase_input_buffer'
            });
        }

        if (this.touchMetrics.accuracy < 0.9) {
            this.healingLog.push({
                timestamp: Date.now(),
                issue: 'low_input_accuracy',
                value: this.touchMetrics.accuracy,
                action: 'calibrate_touch_coordinates'
            });
        }
    }

    optimizeInputProcessing() {
        console.log('[InputLatencyManager] Optimizing input processing');

        // Apply optimizations based on current metrics
        if (this.touchMetrics.responseTime > 50) {
            this.applyInputLatencyOptimization();
        }

        if (this.touchMetrics.touchPoints > 5) {
            this.applyMultiTouchOptimization();
        }

        if (this.touchMetrics.accuracy < 0.9) {
            this.applyAccuracyOptimization();
        }

        // Log optimization attempt
        this.healingLog.push({
            timestamp: Date.now(),
            type: 'optimization',
            action: 'input_processing_optimized',
            status: 'applied'
        });
    }

    applyInputLatencyOptimization() {
        console.log('[InputLatencyManager] Applying input latency optimization');

        // Reduce input processing delay
        if (this.game.optimizeTouchProcessing) {
            this.game.optimizeTouchProcessing(true);
            console.log('[InputLatencyManager] Enabled optimized touch processing');
        }

        // Prioritize input events
        if (this.game.setInputPriority) {
            this.game.setInputPriority('high');
            console.log('[InputLatencyManager] Set input priority to high');
        }

        // Enable input buffering
        if (this.game.setInputBuffer) {
            this.game.setInputBuffer(16); // 1 frame at 60fps
            console.log('[InputLatencyManager] Set input buffer to 16ms');
        }
    }

    applyMultiTouchOptimization() {
        console.log('[InputLatencyManager] Applying multi-touch optimization');

        if (this.game.setMultiTouchLimit) {
            const limit = Math.min(10, this.touchMetrics.touchPoints + 2);
            this.game.setMultiTouchLimit(limit);
            console.log(`[InputLatencyManager] Set multi-touch limit to ${limit}`);
        }

        if (this.game.enableTouchPalmRejection) {
            this.game.enableTouchPalmRejection(true);
            console.log('[InputLatencyManager] Enabled touch palm rejection');
        }
    }

    applyAccuracyOptimization() {
        console.log('[InputLatencyManager] Applying accuracy optimization');

        if (this.game.calibrateTouchCoordinates) {
            this.game.calibrateTouchCoordinates(true);
            console.log('[InputLatencyManager] Calibrated touch coordinates');
        }

        if (this.game.enableTouchSmoothing) {
            this.game.enableTouchSmoothing(true);
            console.log('[InputLatencyManager] Enabled touch smoothing');
        }
    }

    // Public API for external control
    triggerInputOptimization() {
        this.optimizeInputProcessing();
    }

    getTouchMetrics() {
        return this.touchMetrics;
    }

    getHealingLog() {
        return this.healingLog.slice(-20); // Return last 20 entries
    }

    cleanup() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
        if (this.optimizationInterval) {
            clearInterval(this.optimizationInterval);
        }
        console.log('[InputLatencyManager] Cleaned up');
    }
}

// Export for global use
export let globalInputLatencyManager = null;

export function getInputLatencyManager(game) {
    if (!globalInputLatencyManager && game) {
        globalInputLatencyManager = new InputLatencyManager(game);
    }
    return globalInputLatencyManager;
}