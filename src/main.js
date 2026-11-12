/**
 * main.js - Singapore Streets entry point (libfdx Launcher layer)
 * 
 * This is the launcher layer in the libfdx 4-layer pattern:
 * - Selects backend/provider stack
 * - Creates typed runtime root (Fdx)
 * - Initializes game
 * - Explicit ownership of all resources (no globals)
 */

import { SingaporeGame } from './game/SingaporeGame.js';
import { Fdx } from './core/Fdx.js';
import { WebBackend } from './platform/web/WebBackend.js';
import { AgentCoordinator } from './systems/AgentCoordinator.js';
import { MobileSupervisor } from './systems/MobileSupervisor.js';

let fdxInstance = null;
let gameInstance = null;
let backendInstance = null;

/**
 * Launcher function - assembles backend + runtime + game
 * Explicitly wires all layers together
 */
async function initGame() {
    console.log('[Launcher] Initializing Singapore Streets...');

    // Layer 3: Backend provider
    const backend = new WebBackend({ isMobile: true });

    // Layer 1: Typed runtime root
    const fdx = new Fdx({ backend });

    // Initialize backend
    await backend.init();
    await fdx.init();

    // Layer 2: Extensions - initialize agent systems via Fdx
    const agentCoordinator = new AgentCoordinator(fdx);
    const mobileSupervisor = new MobileSupervisor(fdx);

    // Register services explicitly
    fdx.registerService('agentCoordinator', agentCoordinator);
    fdx.registerService('mobileSupervisor', mobileSupervisor);

    // Layer 4: Launcher - create game with Fdx dependency injection
    const game = new SingaporeGame(fdx);

    // Store instances (explicitly owned, no globals)
    fdxInstance = fdx;
    gameInstance = game;
    backendInstance = backend;

    // Attach to Fdx for typed access
    fdx.registerService('game', game);

    console.log('[Launcher] Game initialization complete');
    return game;
}

// Initialize the game
initGame().catch((error) => {
    console.error('[Launcher] Game initialization failed:', error);
});

// Export for testing/debugging
export { fdxInstance, gameInstance, backendInstance, Fdx };