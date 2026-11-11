// NetworkOptimizer.js - Specialized agent for network optimization
// Handles online/offline detection, asset bundle optimization, latency management, and offline support

export class NetworkOptimizer {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.networkMetrics = {
            online: navigator.onLine,
            downlink: 0, // Mbps
            rtt: 0, // Round-trip time in ms
            effectiveType: '4g', // 2g, 3g, 4g, 5g
            packetLoss: 0,
            connectionType: 'unknown', // wifi, cellular, ethernet, none
            isMetered: false,
            assetBundleCacheSize: 0,
            assetBundleCacheMax: 50 // MB
        };
        this.healingLog = [];
        this.lastOptimization = 0;
        this.optimizationInterval = 10000; // 10 seconds

        this.initialize();
    }

    initialize() {
        // Set up network change monitoring
        window.addEventListener('online', () => {
            this.networkMetrics.online = true;
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'connectivity',
                event: 'online',
                status: 'restored'
            });
            console.log('[NetworkOptimizer] Network restored (online)');
        });

        window.addEventListener('offline', () => {
            this.networkMetrics.online = false;
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'connectivity',
                event: 'offline',
                status: 'lost'
            });
            console.log('[NetworkOptimizer] Network lost (offline)');
        });

        // Check effective type
        this.updateConnectionType();

        console.log('[NetworkOptimizer] Initialized');
    }

    updateConnectionType() {
        if (!navigator.connection) {
            this.networkMetrics.connectionType = 'unknown';
            return;
        }

        const connection = navigator.connection;
        const effectiveType = connection.effectiveType || 'unknown';
        
        this.networkMetrics = {
            ...this.networkMetrics,
            downlink: connection.downlink || 0,
            rtt: connection.rtt || 0,
            effectiveType: effectiveType,
            connectionType: this.mapEffectiveType(effectiveType),
            isMetered: connection.metered === true || false
        };
    }

    mapEffectiveType(type) {
        const mapping = {
            '2g': 'cellular',
            '3g': 'cellular',
            '4g': 'cellular',
            '5g': 'cellular',
            'wifi': 'wifi',
            'ethernet': 'ethernet',
            'none': 'none'
        };
        return mapping[type] || 'unknown';
    }

    monitorNetwork() {
        this.updateConnectionType();

        const wasOnline = this.networkMetrics.online;
        const currentOnline = this.networkMetrics.online;

        if (currentOnline && !wasOnline) {
            // Just came back online
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'connectivity',
                event: 'came_online',
                action: 'resume_operations'
            });
            console.log('[NetworkOptimizer] Came online - resuming operations');
        } else if (!currentOnline && wasOnline) {
            // Just went offline
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'connectivity',
                event: 'went_offline',
                action: 'switch_to_offline_mode'
            });
            console.log('[NetworkOptimizer] Went offline - switching to offline mode');
        }
    }

    optimizeNetworkForGameplay() {
        console.log('[NetworkOptimizer] Optimizing network for gameplay');

        const actions = [];

        // If offline, disable network-dependent features
        if (!this.networkMetrics.online) {
            if (this.game.enableOfflineMode) {
                this.game.enableOfflineMode(true);
                actions.push('enabled_offline_mode');
                console.log('[NetworkOptimizer] Enabled offline mode');
            }
            return;
        }

        // If slow connection, optimize asset delivery
        if (this.networkMetrics.effectiveType === '2g' || this.networkMetrics.effectiveType === '3g') {
            if (this.game.setRenderScale) {
                this.game.setRenderScale(0.5);
                actions.push('reduced_render_scale');
                console.log('[NetworkOptimizer] Reduced render scale for slow connection');
            }
            if (this.game.enableTextureCompression) {
                this.game.enableTextureCompression(true);
                actions.push('enabled_texture_compression');
                console.log('[NetworkOptimizer] Enabled texture compression');
            }
        }
        // If moderate connection, medium optimization
        else if (this.networkMetrics.effectiveType === '4g') {
            if (this.game.setRenderScale) {
                this.game.setRenderScale(0.7);
                actions.push('medium_render_scale');
                console.log('[NetworkOptimizer] Set medium render scale');
            }
        }
        // If fast connection (wifi/5g), full features
        else if (this.networkMetrics.effectiveType === '5g' || this.networkMetrics.connectionType === 'wifi') {
            if (this.game.setRenderScale) {
                this.game.setRenderScale(1.0);
                actions.push('full_render_scale');
                console.log('[NetworkOptimizer] Set full render scale');
            }
        }

        // Log optimization
        if (actions.length > 0) {
            this.healingLog.push({
                timestamp: Date.now(),
                type: 'optimization',
                actions: actions,
                connectionType: this.networkMetrics.effectiveType
            });
        }
    }

    triggerSelfHeal() {
        console.log('[NetworkOptimizer] Self-heal triggered');

        // Check if we need to re-optimize based on connection changes
        this.updateConnectionType();
        this.optimizeNetworkForGameplay();

        this.healingLog.push({
            timestamp: Date.now(),
            type: 'healing',
            action: 'network_reoptimization',
            status: 'applied'
        });
    }

    // Public API
    getNetworkMetrics() {
        return this.networkMetrics;
    }

    getHealingLog() {
        return this.healingLog.slice(-20);
    }

    getIsOnline() {
        return this.networkMetrics.online;
    }

    cleanup() {
        // Note: We don't remove the event listeners to avoid
        // disconnecting our monitoring
        console.log('[NetworkOptimizer] Cleaned up');
    }
}

// Export for global use
export let globalNetworkOptimizer = null;

export function getNetworkOptimizer(game) {
    if (!globalNetworkOptimizer && game) {
        globalNetworkOptimizer = new NetworkOptimizer(game);
    }
    return globalNetworkOptimizer;
}