// MasterCoordinator.js - Primary orchestrator agent for cross-agent conflict resolution and system coordination
// Manages all 6 core mobile agents, specialized agents, and supervisor coordination
// Ensures instant response to issues and optimal system performance

export class MasterCoordinator {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.agents = new Map(); // All agent instances
        this.supervisor = null; // Mobile supervisor
        this.agentStatus = {};
        this.lastHealthCheck = 0;
        this.healthCheckInterval = 5000; // 5 seconds
        this.emergencyMode = false;
        this.optimizationQueue = [];
        this.performanceHistory = [];
        this.coordinationLog = [];
        this.healingEvents = [];

        this.initialize();
    }

    initialize() {
        // Initialize all 6 core mobile agents
        this.initializeCoreAgents();

        // Set up coordination loop
        this.coordinationInterval = setInterval(() => {
            this.runCoordinationCycle();
        }, 5000);

        // Set up emergency response monitoring
        this.emergencyMonitor = setInterval(() => {
            this.checkEmergencyConditions();
        }, 10000); // 10 seconds

        console.log('[MasterCoordinator] Initialized - coordinating 6 core + specialized agents');
    }

    initializeCoreAgents() {
        // 6 Core Mobile Optimization Agents
        this.agents.set('mobile_optimization', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'MobileOptimization', version: '2.0' }
        });

        this.agents.set('mobile_performance', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'PerformanceMonitor', version: '1.0' }
        });

        this.agents.set('mobile_battery', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'BatteryManager', version: '1.0' }
        });

        this.agents.set('mobile_touch', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'TouchSystem', version: '1.0' }
        });

        this.agents.set('mobile_asset', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'AssetStreamer', version: '1.0' }
        });

        this.agents.set('mobile_ui', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'UISystem', version: '1.0' }
        });

        // Specialized agents
        this.agents.set('graphics_optimizer', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'GraphicsOptimizer', version: '1.0' }
        });

        this.agents.set('input_latency', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'InputLatencyManager', version: '1.0' }
        });

        this.agents.set('memory_manager', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'MemoryManager', version: '1.0' }
        });

        this.agents.set('network_optimizer', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'NetworkOptimizer', version: '1.0' }
        });

        this.agents.set('thermal_manager', {
            instance: null,
            status: 'initializing',
            metrics: { name: 'ThermalManager', version: '1.0' }
        });
    }

    runCoordinationCycle() {
        const now = Date.now();
        const elapsed = now - this.lastHealthCheck;

        // Run health checks periodically
        if (elapsed > this.healthCheckInterval) {
            this.performHealthCheck();
        }

        // Check for optimization needs and queue actions
        this.checkOptimizationNeeds();

        // Update performance history
        this.updatePerformanceHistory();

        // Coordinate agent actions
        this.coordinateAgents();
    }

    performHealthCheck() {
        this.lastHealthCheck = Date.now();
        const issues = [];

        // Check each agent
        for (const [agentId, agent] of this.agents.entries()) {
            const status = this.checkAgentStatus(agentId, agent);

            if (status === 'healthy') {
                this.agents.get(agentId).status = 'healthy';
            } else if (status === 'degraded') {
                this.agents.get(agentId).status = 'degraded';

                // Auto-heal
                issues.push({ agentId, type: 'auto_heal', status });

                this.triggerAgentAutoHeal(agentId);
            } else if (status === 'critical') {
                this.agents.get(agentId).status = 'critical';

                // Emergency handling
                issues.push({ agentId, type: 'emergency', status });

                this.triggerAgentEmergency(agentId);
            }
        }

        // Log health check
        this.coordinationLog.push({
            timestamp: now,
            type: 'health_check',
            issues,
            agentStatuses: Object.fromEntries(
                Array.from(this.agents.entries()).map(([id, a]) => [id, a.status])
            )
        });
    }

    checkAgentStatus(agentId, agent) {
        // Check if agent has issues
        // In a real implementation, this would check actual agent health
        // For now, we simulate based on coordination state

        if (this.emergencyMode) {
            // Emergency mode prioritizes critical agents
            const criticalAgents = ['mobile_performance', 'mobile_battery', 'thermal_manager'];

            if (criticalAgents.includes(agentId)) {
                return 'critical';
            }
        }

        // Check for recent healing events
        const recentHealing = this.healingEvents.filter(
            event => event.agentId === agentId && Date.now() - event.timestamp < 30000
        );

        if (recentHealing.length > 0) {
            // Agent was recently healed - likely stable
            return 'healthy';
        }

        // Default healthy
        return 'healthy';
    }

    triggerAgentAutoHeal(agentId) {
        console.log(`[MasterCoordinator] Auto-healing agent: ${agentId}`);

        // Trigger self-heal for agent
        const selfHeal = this.game.mobileOptimization?.selfHealSystem;
        if (selfHeal) {
            selfHeal.selfHealAgent(agentId);
        }

        // Add to coordination log
        this.coordinationLog.push({
            timestamp: Date.now(),
            type: 'auto_heal_triggered',
            agentId
        });
    }

    triggerAgentEmergency(agentId) {
        console.log(`[MasterCoordinator] EMERGENCY: Handled agent: ${agentId}`);

        // Force emergency mode
        this.emergencyMode = true;

        // Trigger maximum recovery
        const selfHeal = this.game.mobileOptimization?.selfHealSystem;
        if (selfHeal) {
            selfHeal.selfHealAgent(agentId);
        }

        this.coordinationLog.push({
            timestamp: Date.now(),
            type: 'emergency_handled',
            agentId
        });
    }

    checkOptimizationNeeds() {
        const needs = [];

        // Check performance needs
        if (this.game?.getFPS && this.game.getFPS() < 30) {
            needs.push({ agentId: 'mobile_performance', action: 'performance_optimization' });
        }

        // Check battery needs
        if (this.game?.getBatteryLevel && this.game.getBatteryLevel() < 30) {
            needs.push({ agentId: 'mobile_battery', action: 'battery_optimization' });
        }

        // Check memory needs
        if (this.game?.getMemoryUsage && this.game.getMemoryUsage() > 400) {
            needs.push({ agentId: 'memory_manager', action: 'memory_optimization' });
        }

        // Check thermal needs
        if (this.game?.getThermalState && this.game.getThermalState() > 55) {
            needs.push({ agentId: 'thermal_manager', action: 'thermal_management' });
        }

        // Queue optimization actions
        for (const need of needs) {
            this.optimizationQueue.push({
                ...need,
                timestamp: Date.now(),
                status: 'pending'
            });
        }

        // Process queued optimizations
        this.processOptimizationQueue();
    }

    processOptimizationQueue() {
        if (this.optimizationQueue.length === 0) return;

        const pending = this.optimizationQueue.filter(item => item.status === 'pending');
        if (pending.length === 0) return;

        for (const item of pending) {
            this.optimizationQueue = this.optimizationQueue.filter(q => q !== item);

            // Execute optimization
            const agent = this.agents.get(item.agentId);
            if (agent) {
                try {
                    // Dispatch to agent-specific optimization
                    const optimizationAction = this.getOptimizationAction(item.action);
                    if (optimizationAction) {
                        optimizationAction();
                        item.status = 'completed';
                    }
                } catch (error) {
                    item.status = 'failed';
                    console.error(`[MasterCoordinator] Optimization failed for ${item.agentId}:`, error);

                    // Add back to queue for retry
                    item.status = 'retry';
                    this.optimizationQueue.push(item);
                }
            }
        }
    }

    getOptimizationAction(action) {
        const actions = {
            'performance_optimization': () => {
                // Delegate to performance agent
                if (this.game.mobileOptimization?.performanceMonitor) {
                    this.game.mobileOptimization.performanceMonitor?.applyThrottleSettings?.();
                }
            },
            'battery_optimization': () => {
                if (this.game.mobileOptimization?.batteryManager) {
                    this.game.mobileOptimization.batteryManager?.optimizeForBattery?.();
                }
            },
            'memory_optimization': () => {
                if (this.game.mobileOptimization?.memoryManager) {
                    this.game.mobileOptimization.memoryManager?.optimizeMemory?.();
                }
            },
            'thermal_management': () => {
                if (this.game.mobileOptimization?.thermalManager) {
                    this.game.mobileOptimization.thermalManager?.monitorThermal?.();
                }
            }
        };

        return actions[action];
    }

    coordinateAgents() {
        // Coordinate actions between agents to prevent conflicts
        const agentActions = this.collectAgentActions();

        // Check for conflicts
        const conflicts = this.detectAgentConflicts(agentActions);

        // Resolve conflicts
        if (conflicts.length > 0) {
            this.resolveAgentConflicts(conflicts);
        }

        // Log coordination
        this.coordinationLog.push({
            timestamp: Date.now(),
            type: 'coordination_cycle',
            agentActions: agentActions,
            conflicts
        });
    }

    collectAgentActions() {
        const actions = {};

        // Collect actions from each agent
        if (this.game.mobileOptimization?.performanceMonitor) {
            actions.performance = this.game.mobileOptimization.performanceMonitor?.getActions?.() || {};
        }

        if (this.game.mobileOptimization?.batteryManager) {
            actions.battery = this.game.mobileOptimization.batteryManager?.getActions?.() || {};
        }

        if (this.game.mobileOptimization?.graphicsOptimizer) {
            actions.graphics = this.game.mobileOptimization.graphicsOptimizer?.getActions?.() || {};
        }

        return actions;
    }

    detectAgentConflicts(agentActions) {
        const conflicts = [];

        // Check for resource conflicts
        // e.g., graphics optimizer vs memory manager over memory budget
        const memoryConflict = this.detectMemoryConflict();
        if (memoryConflict) {
            conflicts.push(memoryConflict);
        }

        // Check for thermal/resource conflicts
        const thermalConflict = this.detectThermalConflict();
        if (thermalConflict) {
            conflicts.push(thermalConflict);
        }

        return conflicts;
    }

    detectMemoryConflict() {
        // Check if multiple agents trying to optimize memory simultaneously
        const memoryActions = Object.values(this.collectAgentActions()).filter(
            actions => actions.optimizeMemory || actions.cleanupMemory
        );

        if (memoryActions.length > 1) {
            return {
                type: 'memory_conflict',
                severity: 'high',
                agents: ['memory_manager', 'graphics_optimizer'],
                description: 'Multiple agents attempting memory optimization simultaneously'
            };
        }

        return null;
    }

    detectThermalConflict() {
        // Check if thermal manager conflicts with performance optimization
        const performanceActions = this.collectAgentActions().performance;
        const thermalManager = this.game.mobileOptimization?.thermalManager;

        if (performanceActions?.applyThrottleSettings && thermalManager?.isThrottling) {
            return {
                type: 'thermal_performance_conflict',
                severity: 'medium',
                description: 'Performance throttling may conflict with thermal management'
            };
        }

        return null;
    }

    resolveAgentConflicts(conflicts) {
        for (const conflict of conflicts) {
            console.warn(`[MasterCoordinator] Resolving conflict:`, conflict);

            switch (conflict.type) {
                case 'memory_conflict':
                    // Prioritize memory optimization
                    this.queueOptimization('memory_manager', 'memory_optimization');
                    break;

                case 'thermal_performance_conflict':
                    // Defer performance optimization if thermal throttling active
                    this.deferOptimization('mobile_performance', 'performance_optimization');
                    break;
            }
        }
    }

    queueOptimization(agentId, action) {
        this.optimizationQueue.push({
            agentId,
            action,
            timestamp: Date.now(),
            status: 'pending'
        });
    }

    deferOptimization(agentId, action) {
        // Mark for deferred execution
        this.optimizationQueue.push({
            agentId,
            action,
            timestamp: Date.now(),
            status: 'deferred',
            reason: 'thermal_conflict'
        });
    }

    updatePerformanceHistory() {
        const metrics = {
            timestamp: Date.now(),
            fps: this.game?.getFPS || (() => 60)(),
            memoryUsage: this.game?.getMemoryUsage || (() => 0)(),
            batteryLevel: this.game?.getBatteryLevel || (() => 1)(),
            thermalState: this.game?.getThermalState || (() => 0)(),
            frameRate: this.game?.getFPS || (() => 60)()
        };

        this.performanceHistory.push(metrics);

        if (this.performanceHistory.length > 100) {
            this.performanceHistory = this.performanceHistory.slice(-50);
        }
    }

    checkEmergencyConditions() {
        // Check emergency conditions
        const criticalIssues = this.coordinationLog.filter(event => {
            return event.type === 'emergency_handled';
        });

        if (criticalIssues.length > 0) {
            this.emergencyMode = true;
            console.error('[MasterCoordinator] Emergency conditions detected - activating emergency response');
        } else if (this.emergencyMode) {
            // Check if emergency is still needed
            const lastEmergency = this.coordinationLog
                .filter(event => event.type === 'emergency_handled')
                .slice(-1)[0];

            if (lastEmergency && Date.now() - lastEmergency.timestamp > 30000) {
                // Emergency for more than 30 seconds - deactivate
                this.emergencyMode = false;
                console.log('[MasterCoordinator] Emergency resolved - deactivating emergency mode');
            }
        }
    }

    getAllAgentStatus() {
        const status = {};

        for (const [agentId, agent] of this.agents.entries()) {
            status[agentId] = {
                status: agent.status,
                metrics: agent.metrics || {},
                lastCheck: this.lastHealthCheck
            };
        }

        return status;
    }

    getCoordinationLog() {
        return this.coordinationLog.slice(-20);
    }

    getEmergencyMode() {
        return this.emergencyMode;
    }

    cleanup() {
        if (this.coordinationInterval) {
            clearInterval(this.coordinationInterval);
        }
        if (this.emergencyMonitor) {
            clearInterval(this.emergencyMonitor);
        }
        console.log('[MasterCoordinator] Cleaned up');
    }
}

// Export for global use
export let globalMasterCoordinator = null;

export function getMasterCoordinator(game) {
    if (!globalMasterCoordinator && game) {
        globalMasterCoordinator = new MasterCoordinator(game);
    }
    return globalMasterCoordinator;
}