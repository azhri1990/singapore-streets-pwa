// MobilePerformanceMonitor.js - Performance monitoring for mobile devices
// Based on Millionaire Race frame pacing + SkyTether mobile patterns

export class PerformanceMonitor {
    constructor(game) {
        this.game = game;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.currentFPS = 60;
        this.frameTimes = [];
        this.maxFrameTimeSamples = 60;
        this.isThrottled = false;
        this.throttleFactor = 1.0;
        this.performanceHistory = [];
        this.lastReportTime = 0;
        this.reportInterval = 5000; // Report every 5 seconds
        
        // Performance thresholds for mobile
        this.TARGET_FPS = 60;
        this.MIN_ACCEPTABLE_FPS = 30;
        this.WARNING_FPS = 45;
        
        // Budget allocations per frame (milliseconds)
        this.frameBudget = {
            total: 16.67, // 60fps target
            rendering: 8.0,
            physics: 4.0,
            ai: 2.0,
            audio: 1.0,
            ui: 1.0,
            misc: 0.67
        };
    }

    update(deltaTime) {
        const now = performance.now();
        const frameTime = now - this.lastTime;
        this.lastTime = now;

        // Track frame times for moving average
        this.frameTimes.push(frameTime);
        if (this.frameTimes.length > this.maxFrameTimeSamples) {
            this.frameTimes.shift();
        }

        // Calculate current FPS
        this.currentFPS = 1000 / frameTime;

        // Store performance history
        this.performanceHistory.push({
            time: now,
            fps: this.currentFPS,
            frameTime: frameTime,
            drawCalls: this.getDrawCalls(),
            triangles: this.getTriangleCount()
        });
        if (this.performanceHistory.length > 120) {
            this.performanceHistory.shift();
        }

        // Determine if throttling is needed
        this.evaluateThrottling();

        // Periodic performance report
        if (now - this.lastReportTime > this.reportInterval) {
            this.generatePerformanceReport();
            this.lastReportTime = now;
        }

        this.frameCount++;
    }

    evaluateThrottling() {
        const avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
        const avgFPS = 1000 / avgFrameTime;

        // If below warning threshold, enable throttling
        if (avgFPS < this.WARNING_FPS) {
            if (!this.isThrottled) {
                this.isThrottled = true;
                this.throttleFactor = this.WARNING_FPS / avgFPS;
                console.log('[PerformanceMonitor] Throttling enabled:', this.throttleFactor.toFixed(2));
                this.applyThrottleSettings();
            }
        } else if (avgFPS >= this.TARGET_FPS) {
            // Restore full performance
            if (this.isThrottled) {
                this.isThrottled = false;
                this.throttleFactor = 1.0;
                console.log('[PerformanceMonitor] Full performance restored');
                this.applyThrottleSettings();
            }
        } else if (this.isThrottled && avgFPS >= this.MIN_ACCEPTABLE_FPS) {
            // Adjust throttle factor slightly upward
            this.throttleFactor = Math.min(1.0, this.throttleFactor * 1.05);
            this.applyThrottleSettings();
        }
    }

    applyThrottleSettings() {
        if (this.game && this.game.renderer) {
            // Adjust render target scale based on throttle factor
            const renderScale = Math.max(0.5, Math.min(1.0, this.throttleFactor));
            const pixelRatio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            
            this.game.renderer.setPixelRatio(pixelRatio * renderScale);
            
            // Adjust shadow map quality
            if (this.throttleFactor < 0.8) {
                this.game.renderer.shadowMap.enabled = false;
            } else {
                this.game.renderer.shadowMap.enabled = true;
            }
        }

        // Signal other systems to adjust
        if (this.game && typeof this.game.onPerformanceThrottle === 'function') {
            this.game.onPerformanceThrottle(this.throttleFactor);
        }
    }

    getAverageFPS() {
        if (this.frameTimes.length === 0) return this.TARGET_FPS;
        const avgTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
        return 1000 / avgTime;
    }

    getDrawCalls() {
        return this.game?.renderer?.info?.render?.drawCalls || 0;
    }

    getTriangleCount() {
        return this.game?.renderer?.info?.render?.triangles || 0;
    }

    getMemoryUsage() {
        return performance.memory ? {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        } : null;
    }

    generatePerformanceReport() {
        const report = {
            time: new Date().toISOString(),
            avgFPS: this.getAverageFPS(),
            currentFPS: this.currentFPS,
            drawCalls: this.getDrawCalls(),
            triangles: this.getTriangleCount(),
            memory: this.getMemoryUsage(),
            throttled: this.isThrottled,
            throttleFactor: this.throttleFactor,
            devicePixelRatio: window.devicePixelRatio || 1
        };

        console.log('[PerformanceMonitor]', JSON.stringify(report));
        return report;
    }

    getPerformanceGrade() {
        const avgFPS = this.getAverageFPS();
        if (avgFPS >= 55) return 'A';
        if (avgFPS >= 45) return 'B';
        if (avgFPS >= 30) return 'C';
        return 'D';
    }

    shouldReduceQuality() {
        return this.getAverageFPS() < this.MIN_ACCEPTABLE_FPS;
    }

    shouldIncreaseQuality() {
        return this.getAverageFPS() >= this.TARGET_FPS;
    }
}

// Singleton instance for global access
let globalPerformanceMonitor = null;

export function getPerformanceMonitor(game = null) {
    if (!globalPerformanceMonitor && game) {
        globalPerformanceMonitor = new PerformanceMonitor(game);
    }
    return globalPerformanceMonitor;
}
