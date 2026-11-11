// SelfLearnSystem.js - Advanced self-learning system for mobile game optimization
// Uses pattern recognition, performance analytics, and adaptive strategies

export class SelfLearnSystem {
    constructor(game) {
        this.game = game;
        this.patterns = new Map();
        this.strategies = new Map();
        this.performanceHistory = [];
        this.adaptationRules = [];
        this.isActive = false;
        
        this.initialize();
    }
    
    initialize() {
        // Initialize default adaptation rules
        this.setupDefaultRules();
        
        // Start learning cycle
        this.startLearningCycle();
        
        console.log('[SelfLearnSystem] Initialized with default adaptation rules');
    }
    
    setupDefaultRules() {
        // Battery-based adaptation rules
        this.adaptationRules.push({
            id: 'battery_critical',
            condition: (metrics) => metrics.batteryLevel <= 15,
            action: 'extreme_power_saving',
            priority: 'critical',
            cooldown: 60000
        });
        
        this.adaptationRules.push({
            id: 'battery_low',
            condition: (metrics) => metrics.batteryLevel <= 30,
            action: 'power_saving',
            priority: 'high',
            cooldown: 120000
        });
        
        this.adaptationRules.push({
            id: 'battery_moderate',
            condition: (metrics) => metrics.batteryLevel <= 50,
            action: 'mild_power_saving',
            priority: 'medium',
            cooldown: 180000
        });
        
        // Performance-based adaptation rules
        this.adaptationRules.push({
            id: 'fps_critical',
            condition: (metrics) => metrics.frameRate < 20,
            action: 'drastic_graphics_reduction',
            priority: 'critical',
            cooldown: 30000
        });
        
        this.adaptationRules.push({
            id: 'fps_low',
            condition: (metrics) => metrics.frameRate < 30,
            action: 'graphics_reduction',
            priority: 'high',
            cooldown: 60000
        });
        
        this.adaptationRules.push({
            id: 'fps_moderate',
            condition: (metrics) => metrics.frameRate < 45,
            action: 'mild_graphics_reduction',
            priority: 'medium',
            cooldown: 120000
        });
        
        // Memory-based adaptation rules
        this.adaptationRules.push({
            id: 'memory_high',
            condition: (metrics) => metrics.memoryUsage > 400,
            action: 'memory_cleanup',
            priority: 'high',
            cooldown: 60000
        });
        
        // Touch responsiveness rules
        this.adaptationRules.push({
            id: 'touch_laggy',
            condition: (metrics) => metrics.touchResponseTime > 100,
            action: 'optimize_input_processing',
            priority: 'high',
            cooldown: 30000
        });
        
        // Thermal rules (ADPF-inspired)
        this.adaptationRules.push({
            id: 'thermal_high',
            condition: (metrics) => metrics.thermalState >= 3,
            action: 'thermal_throttle',
            priority: 'critical',
            cooldown: 10000
        });
    }
    
    startLearningCycle() {
        // Collect metrics and learn every 15 seconds
        this.learningInterval = setInterval(() => {
            this.collectAndLearn();
        }, 15000);
        
        // Analyze patterns every 60 seconds
        this.patternAnalysisInterval = setInterval(() => {
            this.analyzePatterns();
        }, 60000);
        
        this.isActive = true;
        console.log('[SelfLearnSystem] Learning cycle started');
    }
    
    collectAndLearn() {
        const metrics = this.collectMetrics();
        this.recordPerformance(metrics);
        
        // Evaluate adaptation rules
        this.evaluateRules(metrics);
    }
    
    collectMetrics() {
        const metrics = {
            timestamp: Date.now(),
            frameRate: this.getGameMetric('getFPS'),
            memoryUsage: this.getGameMetric('getMemoryUsage'),
            batteryLevel: this.getGameMetric('getBatteryLevel'),
            loadFactor: this.getGameMetric('getLoadFactor'),
            touchResponseTime: this.getGameMetric('getTouchResponseTime'),
            thermalState: this.getGameMetric('getThermalState'),
            assetLoadTime: this.getGameMetric('getAssetLoadTime'),
            uiResponsiveness: this.getGameMetric('getUIResponsiveness')
        };
        
        return metrics;
    }
    
    getGameMetric(methodName) {
        try {
            if (this.game && typeof this.game[methodName] === 'function') {
                return this.game[methodName]();
            }
        } catch (e) {
            return 0;
        }
        return 0;
    }
    
    recordPerformance(metrics) {
        this.performanceHistory.push(metrics);
        
        // Keep last 100 entries
        if (this.performanceHistory.length > 100) {
            this.performanceHistory = this.performanceHistory.slice(-50);
        }
    }
    
    evaluateRules(metrics) {
        const now = Date.now();
        
        for (const rule of this.adaptationRules) {
            // Check cooldown
            if (rule.lastTriggered && (now - rule.lastTriggered) < rule.cooldown) {
                continue;
            }
            
            // Evaluate condition
            if (rule.condition(metrics)) {
                this.triggerAdaptation(rule, metrics);
                rule.lastTriggered = now;
            }
        }
    }
    
    triggerAdaptation(rule, metrics) {
        console.log(`[SelfLearnSystem] Triggering adaptation: ${rule.action} (${rule.id})`);
        
        const adaptationActions = {
            'extreme_power_saving': () => this.applyExtremePowerSaving(),
            'power_saving': () => this.applyPowerSaving(),
            'mild_power_saving': () => this.applyMildPowerSaving(),
            'drastic_graphics_reduction': () => this.applyDrasticGraphicsReduction(),
            'graphics_reduction': () => this.applyGraphicsReduction(),
            'mild_graphics_reduction': () => this.applyMildGraphicsReduction(),
            'memory_cleanup': () => this.applyMemoryCleanup(),
            'optimize_input_processing': () => this.applyInputOptimization(),
            'thermal_throttle': () => this.applyThermalThrottle()
        };
        
        const action = adaptationActions[rule.action];
        if (action) {
            action();
        }
        
        // Record the adaptation for learning
        this.recordAdaptation(rule, metrics);
    }
    
    // Adaptation action implementations
    applyExtremePowerSaving() {
        if (this.game && this.game.setGraphicsQuality) {
            this.game.setGraphicsQuality('lowest');
        }
        if (this.game && this.game.enablePerformanceMode) {
            this.game.enablePerformanceMode(true);
        }
    }
    
    applyPowerSaving() {
        if (this.game && this.game.setGraphicsQuality) {
            this.game.setGraphicsQuality('low');
        }
        if (this.game && this.game.setRenderScale) {
            this.game.setRenderScale(0.7);
        }
    }
    
    applyMildPowerSaving() {
        if (this.game && this.game.setRenderScale) {
            this.game.setRenderScale(0.85);
        }
    }
    
    applyDrasticGraphicsReduction() {
        if (this.game && this.game.setGraphicsQuality) {
            this.game.setGraphicsQuality('lowest');
        }
        if (this.game && this.game.disableEffects) {
            this.game.disableEffects(true);
        }
    }
    
    applyGraphicsReduction() {
        if (this.game && this.game.setGraphicsQuality) {
            this.game.setGraphicsQuality('low');
        }
    }
    
    applyMildGraphicsReduction() {
        if (this.game && this.game.setGraphicsQuality) {
            this.game.setGraphicsQuality('medium');
        }
    }
    
    applyMemoryCleanup() {
        if (this.game && this.game.cleanupUnusedAssets) {
            this.game.cleanupUnusedAssets();
        }
        if (this.game && this.game.forceGC) {
            this.game.forceGC();
        }
    }
    
    applyInputOptimization() {
        if (this.game && this.game.optimizeTouchProcessing) {
            this.game.optimizeTouchProcessing(true);
        }
    }
    
    applyThermalThrottle() {
        if (this.game && this.game.enableThermalThrottling) {
            this.game.enableThermalThrottling(true);
        }
        this.applyExtremePowerSaving();
    }
    
    recordAdaptation(rule, metrics) {
        const adaptation = {
            timestamp: Date.now(),
            ruleId: rule.id,
            action: rule.action,
            metrics: { ...metrics }
        };
        
        this.patterns.set(rule.id, {
            lastTriggered: adaptation.timestamp,
            triggerCount: (this.patterns.get(rule.id)?.triggerCount || 0) + 1,
            averageMetrics: this.calculateAverageMetrics(rule.id, metrics)
        });
    }
    
    calculateAverageMetrics(ruleId, currentMetrics) {
        // Calculate average metrics for this rule
        const history = this.performanceHistory.filter(p => 
            Date.now() - p.timestamp < 300000 // Last 5 minutes
        );
        
        if (history.length === 0) return currentMetrics;
        
        return {
            frameRate: history.reduce((sum, p) => sum + p.frameRate, 0) / history.length,
            memoryUsage: history.reduce((sum, p) => sum + p.memoryUsage, 0) / history.length,
            batteryLevel: history.reduce((sum, p) => sum + p.batteryLevel, 0) / history.length
        };
    }
    
    analyzePatterns() {
        console.log('[SelfLearnSystem] Analyzing performance patterns...');
        
        // Find frequently triggered rules
        for (const [ruleId, pattern] of this.patterns.entries()) {
            if (pattern.triggerCount > 5) {
                console.log(`[SelfLearnSystem] Pattern detected: ${ruleId} triggered ${pattern.triggerCount} times`);
                this.optimizeRule(ruleId, pattern);
            }
        }
    }
    
    optimizeRule(ruleId, pattern) {
        // Adjust rule parameters based on pattern
        const rule = this.adaptationRules.find(r => r.id === ruleId);
        if (!rule) return;
        
        // If rule triggers too often, increase cooldown
        if (pattern.triggerCount > 10) {
            rule.cooldown = Math.min(rule.cooldown * 1.5, 300000);
            console.log(`[SelfLearnSystem] Increased cooldown for ${ruleId} to ${rule.cooldown}ms`);
        }
        
        // If pattern shows improvement, reduce sensitivity
        if (pattern.averageMetrics && pattern.averageMetrics.frameRate > 50) {
            rule.cooldown = Math.min(rule.cooldown * 1.2, 300000);
        }
    }
    
    // Public API
    addCustomRule(rule) {
        this.adaptationRules.push({
            ...rule,
            id: rule.id || `custom_${Date.now()}`,
            lastTriggered: 0
        });
        console.log(`[SelfLearnSystem] Added custom rule: ${rule.id}`);
    }
    
    removeRule(ruleId) {
        this.adaptationRules = this.adaptationRules.filter(r => r.id !== ruleId);
        this.patterns.delete(ruleId);
        console.log(`[SelfLearnSystem] Removed rule: ${ruleId}`);
    }
    
    getStatus() {
        return {
            active: this.isActive,
            rulesCount: this.adaptationRules.length,
            patternsTracked: this.patterns.size,
            historyLength: this.performanceHistory.length,
            recentAdaptations: Array.from(this.patterns.values()).slice(-5)
        };
    }
    
    stop() {
        if (this.learningInterval) {
            clearInterval(this.learningInterval);
        }
        if (this.patternAnalysisInterval) {
            clearInterval(this.patternAnalysisInterval);
        }
        this.isActive = false;
        console.log('[SelfLearnSystem] Stopped');
    }

    // New: trigger self-learn manually (delegates to collectAndLearn)
    triggerSelfLearn() {
        this.collectAndLearn();
        console.log('[SelfLearnSystem] Manual self-learn triggered');
    }
}

// Export for global use
export let globalSelfLearnSystem = null;

export function getSelfLearnSystem(game) {
    if (!globalSelfLearnSystem && game) {
        globalSelfLearnSystem = new SelfLearnSystem(game);
    }
    return globalSelfLearnSystem;
}