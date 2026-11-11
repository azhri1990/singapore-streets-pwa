// SelfHealSystem.js - Self-healing, self-learning, and self-updating system for mobile agents
// Integrates with MobileSupervisor and AgentCoordinator for autonomous recovery and optimization

import { AgentCoordinator } from './AgentCoordinator.js';

export class SelfHealSystem {
    constructor(game) {
        this.game = game;
        this.agents = new Map();
        this.agentHealth = new Map();
        this.healingLog = [];
        this.learningData = [];
        this.isActive = false;
        this.lastHealthCheck = Date.now();
        this.lastLearnUpdate = Date.now();
        
        this.initialize();
    }
    
    initialize() {
        // Initialize agent health tracking
        this.initAgentHealth();
        
        // Set up periodic monitoring
        this.startMonitoring();
        
        console.log('[SelfHealSystem] Initialized');
    }
    
    initAgentHealth() {
        // Register all mobile agents for health monitoring
        const agentTypes = [
            'mobile_optimization',
            'mobile_performance',
            'mobile_battery',
            'mobile_touch',
            'mobile_asset',
            'mobile_ui'
        ];
        
        for (const type of agentTypes) {
            this.agentHealth.set(type, {
                status: 'healthy',
                lastCheck: Date.now(),
                failureCount: 0,
                recoveryTime: 0,
                learningData: {}
            });
        }
    }
    
    startMonitoring() {
        // Health check every 10 seconds
        this.healthCheckInterval = setInterval(() => {
            this.performHealthCheck();
        }, 10000);
        
        // Learning update every 30 seconds
        this.learningUpdateInterval = setInterval(() => {
            this.performLearningUpdate();
        }, 30000);
        
        console.log('[SelfHealSystem] Monitoring started');
    }
    
    performHealthCheck() {
        if (!this.game) return;
        
        const results = [];
        
        // Check each agent's health
        for (const [agentType, health] of this.agentHealth.entries()) {
            const agentHealth = this.checkAgentHealth(agentType);
            
            if (agentHealth.status !== 'healthy') {
                results.push({
                    agentType,
                    status: agentHealth.status,
                    action: 'self-heal'
                });
                
                // Attempt self-healing
                this.selfHealAgent(agentType, agentHealth);
            }
        }
        
        // Log health check results
        this.healingLog.push({
            timestamp: Date.now(),
            checks: results.length,
            healthy: this.agentHealth.size - results.length
        });
        
        // Trim log to prevent memory issues
        if (this.healingLog.length > 100) {
            this.healingLog = this.healingLog.slice(-50);
        }
    }
    
    checkAgentHealth(agentType) {
        const health = this.agentHealth.get(agentType);
        if (!health) return { status: 'unknown' };
        
        // Check based on agent type and game state
        let status = 'healthy';
        const now = Date.now();
        const timeSinceLastCheck = now - health.lastCheck;
        
        if (timeSinceLastCheck > 60000) { // 1 minute without check
            status = 'degraded';
        }
        
        if (health.failureCount > 5) {
            status = 'critical';
        }
        
        health.lastCheck = now;
        return { status, health };
    }
    
    selfHealAgent(agentType, health) {
        console.warn(`[SelfHealSystem] Self-healing ${agentType} (status: ${health.status})`);
        
        // Recovery strategies based on agent type
        const recoveryStrategies = {
            'mobile_optimization': () => {
                // Reset optimization settings
                if (this.game && this.game.setGraphicsQuality) {
                    this.game.setGraphicsQuality('medium');
                }
            },
            'mobile_performance': () => {
                // Reset performance monitoring
                if (this.game && this.game.resetPerformanceMonitoring) {
                    this.game.resetPerformanceMonitoring();
                }
            },
            'mobile_battery': () => {
                // Reset battery thresholds
                if (this.game && this.game.resetBatteryThresholds) {
                    this.game.resetBatteryThresholds();
                }
            },
            'mobile_touch': () => {
                // Reset touch configuration
                if (this.game && this.game.resetTouchConfiguration) {
                    this.game.resetTouchConfiguration();
                }
            },
            'mobile_asset': () => {
                // Reset asset streaming
                if (this.game && this.game.resetAssetStreaming) {
                    this.game.resetAssetStreaming();
                }
            },
            'mobile_ui': () => {
                // Reset UI layout
                if (this.game && this.game.resetUILayout) {
                    this.game.resetUILayout();
                }
            }
        };
        
        const strategy = recoveryStrategies[agentType];
        if (strategy) {
            strategy();
            this.agentHealth.get(agentType).failureCount = 0;
            this.agentHealth.get(agentType).status = 'healed';
            console.log(`[SelfHealSystem] ${agentType} healed successfully`);
        } else {
            console.warn(`[SelfHealSystem] No recovery strategy for ${agentType}`);
        }
    }
    
    performLearningUpdate() {
        if (!this.game) return;
        
        // Collect performance metrics for learning
        const learningData = {
            timestamp: Date.now(),
            metrics: this.collectPerformanceMetrics(),
            recommendations: this.generateRecommendations()
        };
        
        this.learningData.push(learningData);
        
        // Trim learning data
        if (this.learningData.length > 50) {
            this.learningData = this.learningData.slice(-25);
        }
        
        // Apply learned optimizations
        this.applyLearnedOptimizations(learningData);
    }
    
    collectPerformanceMetrics() {
        const metrics = {
            frameRate: this.getGameMetric('getFPS'),
            memoryUsage: this.getGameMetric('getMemoryUsage'),
            batteryLevel: this.getGameMetric('getBatteryLevel'),
            loadFactor: this.getGameMetric('getLoadFactor'),
            touchResponseTime: this.getGameMetric('getTouchResponseTime')
        };
        
        return metrics;
    }
    
    getGameMetric(methodName) {
        try {
            if (this.game && typeof this.game[methodName] === 'function') {
                return this.game[methodName]();
            }
        } catch (e) {
            console.warn(`[SelfHealSystem] Failed to get metric ${methodName}:`, e.message);
        }
        return 0;
    }
    
    generateRecommendations() {
        const recommendations = [];
        
        // Generate recommendations based on performance metrics
        const metrics = this.collectPerformanceMetrics();
        
        if (metrics.frameRate < 30) {
            recommendations.push({
                type: 'performance',
                action: 'reduce_graphics_quality',
                priority: 'high',
                reasoning: 'Frame rate below 30 FPS'
            });
        }
        
        if (metrics.batteryLevel < 15) {
            recommendations.push({
                type: 'battery',
                action: 'enable_power_saving_mode',
                priority: 'critical',
                reasoning: 'Battery level below 15%'
            });
        }
        
        if (metrics.touchResponseTime > 50) {
            recommendations.push({
                type: 'touch',
                action: 'optimize_touch_processing',
                priority: 'medium',
                reasoning: 'Touch response time above 50ms'
            });
        }
        
        return recommendations;
    }
    
    applyLearnedOptimizations(learningData) {
        if (!learningData.recommendations.length) return;
        
        for (const rec of learningData.recommendations) {
            this.applyRecommendation(rec);
        }
    }
    
    applyRecommendation(recommendation) {
        console.log(`[SelfHealSystem] Applying recommendation: ${recommendation.action} (${recommendation.reasoning})`);
        
        const actions = {
            'reduce_graphics_quality': () => {
                if (this.game && this.game.setGraphicsQuality) {
                    this.game.setGraphicsQuality('low');
                }
            },
            'enable_power_saving_mode': () => {
                if (this.game && this.game.enablePowerSavingMode) {
                    this.game.enablePowerSavingMode(true);
                }
            },
            'optimize_touch_processing': () => {
                if (this.game && this.game.optimizeTouchProcessing) {
                    this.game.optimizeTouchProcessing(true);
                }
            }
        };
        
        const action = actions[recommendation.action];
        if (action) {
            action();
        }
    }
    
    // Public API for external control
    triggerSelfHeal() {
        this.performHealthCheck();
        console.log('[SelfHealSystem] Manual self-heal triggered');
    }
    
    triggerSelfLearn() {
        this.performLearningUpdate();
        console.log('[SelfHealSystem] Manual self-learn triggered');
    }
    
    getAgentStatus(agentType) {
        const health = this.agentHealth.get(agentType);
        if (!health) return 'unknown';
        return health.status;
    }
    
    getAllAgentStatus() {
        const status = {};
        for (const [agentType, health] of this.agentHealth.entries()) {
            status[agentType] = {
                status: health.status,
                lastCheck: health.lastCheck,
                failureCount: health.failureCount
            };
        }
        return status;
    }
    
    // Cleanup on shutdown
    stop() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
        if (this.learningUpdateInterval) {
            clearInterval(this.learningUpdateInterval);
        }
        this.isActive = false;
        console.log('[SelfHealSystem] Stopped');
    }
}

// Export for global use
export let globalSelfHealSystem = null;

export function getSelfHealSystem(game) {
    if (!globalSelfHealSystem && game) {
        globalSelfHealSystem = new SelfHealSystem(game);
    }
    return globalSelfHealSystem;
}