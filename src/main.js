import { getMobileOptimization } from './systems/MobileOptimization.js';
import { SingaporeGame } from './game/SingaporeGame.js';

// Main entry point for mobile game initialization
let gameInstance = null;
let mobileOptimizationInstance = null;

async function initGame() {
    console.log('[Main] Initializing Singapore Streets...');
    
    // Initialize SingaporeGame
    gameInstance = new SingaporeGame({
        // Initialize with mobile context
        isMobile: true
    });
    
    // Initialize mobile optimization
    mobileOptimizationInstance = getMobileOptimization(gameInstance);
    
    // Set mobile optimization on game instance
    if (gameInstance && typeof gameInstance.setMobileOptimization === 'function') {
        gameInstance.setMobileOptimization(mobileOptimizationInstance);
        console.log('[Main] Mobile optimization system set on game instance');
    }
    
    // Initialize mobile systems
    await mobileOptimizationInstance.initializeMobileSystems();
    
    console.log('[Main] Game initialization complete');
    return gameInstance;
}

// Initialize the game
initGame().catch(error => {
    console.error('[Main] Game initialization failed:', error);
});

// Export for testing/debugging
export { getMobileOptimization, SingaporeGame, mobileOptimizationInstance };
