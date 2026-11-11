// GameControllerAgent.js - Specialized agent for Game Controller support
// Based on: https://developer.android.com/games/agdk/game-controller
// Manages game controllers, input data, device features, and connection state
// Integrates with MobileOptimization for controller-aware gameplay

export class GameControllerAgent {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.isSupported = true;
        this.controllers = [];
        this.connectedControllers = [];
        this.controllerStats = {
            totalControllers: 0,
            connectedCount: 0,
            lastCheck: 0,
            totalInputEvents: 0,
            buttonPresses: 0,
            axisMovements: 0
        };
        this.healingLog = [];
        this.lastControllerCheck = 0;
        
        this.initialize();
    }

    initialize() {
        // Detect game controller support
        this.detectControllerSupport();
        
        // Set up controller monitoring interval
        this.lastControllerCheck = Date.now();
        this.scheduleControllerChecks();
        
        console.log(`[GameControllerAgent] Initialized - Controller support detected`);
    }

    detectControllerSupport() {
        // Check for gamepad API support
        if (typeof navigator !== 'undefined' && navigator.getGamepads) {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            this.controllerStats.totalControllers = gamepads.filter(g => g).length;
            this.isSupported = true;
            console.log(`[GameControllerAgent] Gamepad API supported, ${this.controllerStats.totalControllers} controllers detected`);
        } else {
            this.isSupported = false;
            console.log('[GameControllerAgent] Gamepad API not supported');
        }
    }

    scheduleControllerChecks() {
        // Periodic controller check
        setInterval(() => {
            this.checkControllers();
        }, 5000);
        
        // Initial check
        this.checkControllers();
    }

    checkControllers() {
        const now = Date.now();
        const gamepads = typeof navigator !== 'undefined' && navigator.getGamepads ? navigator.getGamepads() : [];
        
        const newlyConnected = [];
        const newlyDisconnected = [];
        
        // Check for connected controllers
        for (const gp of gamepads) {
            if (gp && gp.index >= 0) {
                const alreadyConnected = this.connectedControllers.some(c => c.id === gp.id);
                
                if (!alreadyConnected && gp.axes && gp.axes.length > 0) {
                    newlyConnected.push(gp);
                }
            }
        }
        
        // Check for disconnected controllers
        for (const existing of this.connectedControllers) {
            const stillConnected = gamepads.some(gp => gp && gp.index >= 0 && gp.id === existing.id);
            if (!stillConnected) {
                newlyDisconnected.push(existing);
            }
        }
        
        // Handle newly connected
        for (const controller of newlyConnected) {
            this.connectedControllers.push({
                id: controller.id,
                mapping: controller.mapping,
                axes: controller.axes,
                buttons: controller.buttons
            });
            console.log('[GameControllerAgent] New controller connected:', controller.id);
        }
        
        // Handle disconnected
        for (const controller of newlyDisconnected) {
            console.log('[GameControllerAgent] Controller disconnected');
        }
        
        // Update stats
        this.controllerStats.connectedCount = this.connectedControllers.length;
        this.controllerStats.totalInputEvents = 0;
        
        if (this.connectedControllers.length === 0) {
            console.log('[GameControllerAgent] No controllers connected');
        }
    }

    getConnectedControllers() {
        return this.connectedControllers;
    }

    getControllerStats() {
        return {
            ...this.controllerStats,
            isSupported: this.isSupported,
            lastCheck: this.controllerStats.lastCheck
        };
    }

    triggerSelfHeal() {
        console.log('[GameControllerAgent] Self-heal triggered - re-detecting controllers');
        
        // Re-detect controllers
        this.detectControllerSupport();
        this.checkControllers();
        
        this.healingLog.push({
            timestamp: Date.now(),
            action: 'controller_re_detection',
            status: 'applied'
        });
    }

    triggerSelfLearn() {
        console.log('[GameControllerAgent] Self-learn triggered - analyzing controller input patterns');
        
        // Collect input data for learning
        if (this.connectedControllers.length > 0) {
            const controller = this.connectedControllers[0];
            const inputData = {
                timestamp: Date.now(),
                controllerId: controller.id,
                axisData: controller.axes,
                buttonStates: controller.buttons
            };
            
            if (this.game && typeof this.game.collectControllerData === 'function') {
                this.game.collectControllerData(inputData);
            }
        }
        
        this.healingLog.push({
            timestamp: Date.now(),
            action: 'controller_learning',
            status: 'applied'
        });
    }

    cleanup() {
        console.log('[GameControllerAgent] Cleaned up');
    }
}

// Export for global use
export let globalGameControllerAgent = null;

export function getGameControllerAgent(game) {
    if (!globalGameControllerAgent && game) {
        globalGameControllerAgent = new GameControllerAgent(game);
    }
    return globalGameControllerAgent;
}