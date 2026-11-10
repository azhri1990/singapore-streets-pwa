import { SingaporeGame } from './game/SingaporeGame.js';
import { getMobileOptimization } from './systems/MobileOptimization.js';

// Mobile detection
if ('ontouchstart' in window) {
    document.body.classList.add('mobile');
}

// Initialize game + mobile optimization (called after age gate confirmation)
function startGame() {
    const loading = document.getElementById('loading');
    const progressBar = document.querySelector('.loading-progress');

    if (progressBar) progressBar.style.width = '0%';

    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        if (progressBar) progressBar.style.width = progress + '%';
    }, 200);

    setTimeout(() => {
        const game = new SingaporeGame();
        clearInterval(progressInterval);
        if (progressBar) progressBar.style.width = '100%';
        if (game.renderer && loading) loading.style.display = 'none';

        // Initialize mobile optimization system
        const mobileOptimization = getMobileOptimization(game);
        game.setMobileOptimization(mobileOptimization);
    }, 500);
}

// Age gate — user must confirm 18+ before starting game
const startBtn = document.getElementById('start-adult-game');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
        startGame();
    });
}

const confirmBtn = document.getElementById('confirm-18');
if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
        startGame();
    });
}

// Fallback: if there is no age-gate element, start immediately
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('confirm-18') && !document.getElementById('start-adult-game')) {
        startGame();
    }
});

// Handle mobile viewport - force landscape orientation for driving game
if (window.innerWidth < 768) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, landscape');
    }

    // Request landscape orientation lock
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {
            console.warn('Could not lock landscape orientation');
        });
    }
}

// Show landscape warning if user holds phone in portrait
function checkOrientation() {
    const body = document.body;
    if (window.innerWidth < window.innerHeight) {
        body.style.display = 'flex';
        body.style.justifyContent = 'center';
        body.style.alignItems = 'center';
        body.style.height = '100vh';
        body.style.flexDirection = 'column';
        body.innerHTML = `
            <div style="text-align:center; color: white; font-size: 24px; padding: 40px;">
                <h1 style="color:#ff0000">📱 LANDSCAPE MODE REQUIRED</h1>
                <p style="font-size:18px; margin-top:20px;">Rotate your phone horizontally to play</p>
                <p style="font-size:16px; opacity:0.8; margin-top:10px;">Singapore Streets is designed for landscape orientation</p>
            </div>
        `;
    }
}
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('resize', checkOrientation);
setTimeout(checkOrientation, 500);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// Prevent pull-to-refresh on mobile
document.body.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });
