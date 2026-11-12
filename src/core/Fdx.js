/**
 * Fdx.js - Typed runtime root for Singapore Streets
 * Finite, typed, backend-owned per libfdx pattern
 * 
 * This is the core runtime that all systems depend on.
 * It provides:
 * - Typed access to core components
 * - Provider escape hatches via as() method
 * - Explicit ownership of resources
 * - No global services
 * - Finite lifecycle (disposal pattern)
 */

import { AssetManager } from './AssetManager.js';
import { Input } from './Input.js';
import { SceneGraph } from './SceneGraph.js';
import { GameLoop } from './GameLoop.js';

export class Fdx {
    constructor(options = {}) {
        // Backend provider (Web, Android, etc.)
        this._backend = options.backend || null;
        // Core components - all owned by Fdx
        this._assets = options.assets || new AssetManager(this);
        this._input = options.input || new Input(this);
        this._scene = options.scene || new SceneGraph(this);
        this._loop = options.loop || new GameLoop(this);
        this._services = new Map();  // Registered services
        this._disposed = false;
    }

    // Core accessors (typed, explicit ownership)
    backend() { return this._backend; }
    setBackend(backend) { this._backend = backend; return this; }
    assets() { return this._assets; }
    input() { return this._input; }
    scene() { return this._scene; }
    loop() { return this._loop; }
    services() { return this._services; }
    isDisposed() { return this._disposed; }

    // Provider escape hatch - like libfdx's as()
    as(providerName) {
        return this._backend;
    }

    // Lifecycle methods
    init() {
        // Initialize backend if not already done
        if (this._backend) {
            this._backend.init();
        }
        return Promise.resolve(this);
    }

    dispose() {
        if (this._disposed) return;
        this._disposed = true;
        // Dispose all services
        for (const [key, service] of this._services) {
            if (typeof service.dispose === 'function') {
                try { service.dispose(); } catch (e) { console.warn(`Dispose error for ${key}:`, e); }
            }
        }
        this._services.clear();
        console.log('[Fdx] disposed');
    }

    // Register a service with explicit ownership
    registerService(name, service) {
        if (this._disposed) throw new Error('Cannot register service on disposed Fdx');
        this._services.set(name, service);
        return this;
    }

    // Get a registered service
    getService(name) {
        if (this._disposed) throw new Error('Cannot access service on disposed Fdx');
        return this._services.get(name);
    }

    // Get a service by type (for dependency injection)
    get(type) {
        if (this._disposed) throw new Error('Cannot access service on disposed Fdx');
        // This is a placeholder - actual implementation would map types to services
        return null;
    }
}