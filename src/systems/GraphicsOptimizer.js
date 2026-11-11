// GraphicsOptimizer.js - Specialized agent for graphics performance optimization
// Uses Vulkan/ANGLE optimization, shader compilation, texture management, and rendering pipeline optimization

import { getSelfLearnSystem } from './SelfLearnSystem.js';
import { getSelfHealSystem } from './SelfHealSystem.js';

export class GraphicsOptimizer {
    constructor(game) {
        this.game = game;
        this.selfLearnSystem = getSelfLearnSystem(game);
        this.selfHealSystem = getSelfHealSystem(game);
        this.isActive = true;
        this.learningData = [];
        this.healingLog = [];
        this.lastOptimization = 0;
        this.lastLearning = 0;
        this.lastHealing = 0;
        this.healingThreshold = 30000; // 30 seconds
        this.learningThreshold = 15000; // 15 seconds
        
        // Track graphics metrics
        this.graphicsMetrics = {
            frameRate: 0,
            renderTime: 0,
            shaderCompileTime: 0,
            textureLoadTime: 0,
            memoryUsage: 0,
            gpuUtilization: 0
        };
        
        // Initialize
        this.initialize();
    }
    
    initialize() {
        // Set up periodic monitoring
        this.frameMonitor = setInterval(() => {
            this.monitorGraphics();
        }, 1000);
        
        console.log('[GraphicsOptimizer] Initialized');
    }
    
    monitorGraphics() {
        // Collect current graphics metrics
        const metrics = this.collectGraphicsMetrics();
        this.graphicsMetrics = metrics;
        
        // Log healing events
        if (metrics.frameRate < 30) {
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'performance',
                metric: 'frameRate',
                value: metrics.frameRate,
                recommendation: 'reduce_graphics_quality'
            });
        }
        
        if (metrics.renderTime > 32) { // >30fps target
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'performance',
                metric: 'renderTime',
                value: metrics.renderTime,
                recommendation: 'optimize_shaders'
            });
        }
        
        // Trigger learning updates
        if (Date.now() - this.lastLearning > this.learningThreshold) {
            this.triggerLearningUpdate();
            this.lastLearning = Date.now();
        }
        
        // Trigger healing if needed
        if (Date.now() - this.lastHealing > this.healingThreshold) {
            this.triggerSelfHeal();
            this.lastHealing = Date.now();
        }
    }
    
    collectGraphicsMetrics() {
        const metrics = {
            frameRate: this.game.getFPS() || 60,
            renderTime: this.game.getRenderTime() || 16.67,
            shaderCompileTime: this.game.getShaderCompileTime() || 0,
            textureLoadTime: this.game.getTextureLoadTime() || 0,
            memoryUsage: this.game.getMemoryUsage() || 0,
            gpuUtilization: this.game.getGPUUtilization() || 0
        };
        
        return metrics;
    }
    
    triggerSelfHeal() {
        // Implement agent-specific healing strategies
        const agentSpecificHealing = {
            'graphics': () => this.optimizeGraphicsPipeline(),
            'memory': () => this.optimizeMemoryManagement(),
            'texture': () => this.optimizeTextureStreaming(),
            'shader': () => this.optimizeShaders()
        };
        
        const currentAgent = this.getCurrentAgentType();
        const strategy = agentSpecificHealing[currentAgent] || agentSpecificHealing['graphics'];
        
        try {
            strategy();
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'healing',
                action: 'auto_recovery',
                agent: currentAgent,
                status: 'success'
            });
            console.log(`[GraphicsOptimizer] Auto-healed ${currentAgent} graphics pipeline`);
        } catch (error) {
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'healing',
                action: 'auto_recovery',
                agent: currentAgent,
                status: 'failed',
                error: error.message
            });
            console.warn(`[GraphicsOptimizer] Auto-heal failed for ${currentAgent}:`, error.message);
        }
    }
    
    getCurrentAgentType() {
        // Determine which agent type is most stressed
        const metrics = this.graphicsMetrics;
        
        if (metrics.memoryUsage > 400) return 'memory';
        if (metrics.gpuUtilization > 80) return 'gpu';
        if (metrics.renderTime > 32) return 'performance';
        if (metrics.textureLoadTime > 100) return 'texture';
        if (metrics.shaderCompileTime > 500) return 'shader';
        
        return 'graphics';
    }
    
    optimizeGraphicsPipeline() {
        console.log('[GraphicsOptimizer] Optimizing graphics pipeline');
        
        // Apply graphics quality adjustments based on performance
        if (this.game.setGraphicsQuality) {
            const currentQuality = this.game.getGraphicsQuality() || 'medium';
            let newQuality = currentQuality;
            
            if (this.graphicsMetrics.frameRate < 30) newQuality = 'low';
            if (this.graphicsMetrics.frameRate < 15) newQuality = 'lowest';
            
            this.game.setGraphicsQuality(newQuality);
            console.log(`[GraphicsOptimizer] Changed graphics quality to ${newQuality}`);
        }
        
        if (this.game.setRenderScale) {
            const currentScale = this.game.getRenderScale() || 1.0;
            let newScale = currentScale;
            
            if (this.graphicsMetrics.renderTime > 32) newScale = 0.8;
            if (this.graphicsMetrics.renderTime > 45) newScale = 0.6;
            
            this.game.setRenderScale(newScale);
            console.log(`[GraphicsOptimizer] Changed render scale to ${newScale}`);
        }
    }
    
    optimizeMemoryManagement() {
        console.log('[GraphicsOptimizer] Optimizing memory management');
        
        if (this.game.cleanupUnusedAssets) {
            this.game.cleanupUnusedAssets();
            console.log('[GraphicsOptimizer] Cleaned up unused assets');
        }
        
        if (this.game.forceGC) {
            this.game.forceGC();
            console.log('[GraphicsOptimizer] Forced garbage collection');
        }
    }
    
    optimizeTextureStreaming() {
        console.log('[GraphicsOptimizer] Optimizing texture streaming');
        
        if (this.game.resetAssetStreaming) {
            this.game.resetAssetStreaming();
            console.log('[GraphicsOptimizer] Reset asset streaming');
        }
        
        if (this.game.setTextureMemoryBudget) {
            const budget = Math.min(512, this.graphicsMetrics.memoryUsage * 0.7); // 70% of current usage
            this.game.setTextureMemoryBudget(budget);
            console.log(`[GraphicsOptimizer] Set texture memory budget to ${budget}MB`);
        }
    }
    
    optimizeShaders() {
        console.log('[GraphicsOptimizer] Optimizing shaders');
        
        // This would involve analyzing shader compilation times and potentially
        // pre-compiling critical shaders or simplifying shader complexity
        console.log('[GraphicsOptimizer] Shader optimization attempted (stub implementation)');
    }
    
    triggerLearningUpdate() {
        // Collect data for learning
        const metrics = this.collectGraphicsMetrics();
        const learningData = {
            timestamp: Date.now(),
            metrics: metrics,
            recommendations: this.generateRecommendations()
        };
        
        this.learningData.push(learningData);
        
        // Apply learned optimizations
        this.applyLearnedOptimizations(learningData);
        
        // Log for debugging
        console.log(`[GraphicsOptimizer] Learning update: ${JSON.stringify(metrics)}`);
    }
    
    generateRecommendations() {
        const recommendations = [];
        
        const metrics = this.graphicsMetrics;
        
        if (metrics.frameRate < 30) {
            recommendations.push({
                type: 'graphics',
                action: 'reduce_quality',
                priority: 'high',
                reasoning: `Frame rate below 30 FPS (current: ${metrics.frameRate})`
            });
        }
        
        if (metrics.renderTime > 32) {
            recommendations.push({
                type: 'performance',
                action: 'optimize_render',
                priority: 'high',
                reasoning: `Render time above 32ms (current: ${metrics.renderTime}ms)`
            });
        }
        
        if (metrics.memoryUsage > 400) {
            recommendations.push({
                type: 'memory',
                action: 'memory_cleanup',
                priority: 'medium',
                reasoning: `Memory usage high (current: ${metrics.memoryUsage}MB)`
            });
        }
        
        if (metrics.textureLoadTime > 100) {
            recommendations.push({
                type: 'texture',
                action: 'optimize_textures',
                priority: 'medium',
                reasoning: `Texture load time high (current: ${metrics.textureLoadTime}ms)`
            });
        }
        
        return recommendations;
    }
    
    applyLearnedOptimizations(learningData) {
        if (!learningData.recommendations || !learningData.recommendations.length) return;
        
        for (const rec of learningData.recommendations) {
            switch(rec.action) {
                case 'reduce_quality':
                    if (this.game.setGraphicsQuality) {
                        this.game.setGraphicsQuality('low');
                        console.log('[GraphicsOptimizer] Applied quality reduction');
                    }
                    break;
                    
                case 'optimize_render':
                    if (this.game.setRenderScale) {
                        this.game.setRenderScale(0.8);
                        console.log('[GraphicsOptimizer] Applied render scale optimization');
                    }
                    break;
                    
                case 'memory_cleanup':
                    this.optimizeMemoryManagement();
                    break;
                    
                case 'optimize_textures':
                    this.optimizeTextureStreaming();
                    break;
                    
                case 'optimize_shaders':
                    this.optimizeShaders();
                    break;
            }
        }
    }
    
    // Cleanup
    cleanup() {
        if (this.frameMonitor) {
            clearInterval(this.frameMonitor);
        }
        console.log('[GraphicsOptimizer] Cleaned up');
    }
}

// Export for global use
export let globalGraphicsOptimizer = null;

export function getGraphicsOptimizer(game) {
    if (!globalGraphicsOptimizer && game) {
        globalGraphicsOptimizer = new GraphicsOptimizer(game);
    }
    return globalGraphicsOptimizer;
}