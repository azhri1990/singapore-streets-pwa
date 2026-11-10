/**
 * Mobile touch controls inspired by drive-game pad.html
 * Tilt controls, touch steering
 */

export class MobileControls {
    constructor(game) {
        this.game = game;
        this.isMobile = 'ontouchstart' in window;
        this.tiltEnabled = false;
        this.accelerometer = null;
        
        if (this.isMobile) {
            this.initializeMobileControls();
        }
    }
    
    initializeMobileControls() {
        // Touch steering wheel
        this.setupTouchSteering();
        
        // Accelerometer controls (like drive-game)
        this.setupTiltControls();
        
        // On-screen buttons
        this.setupTouchButtons();
        
        // Haptics
        this.setupHaptics();
    }
    
    setupTouchSteering() {
        let steeringTouch = null;
        
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const steeringZone = this.getSteeringZone(touch.clientX, touch.clientY);
            
            if (steeringZone) {
                steeringTouch = touch.identifier;
                this.game.player.steeringInput = 0;
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!steeringTouch) return;
            
            const touch = Array.from(e.touches).find(t => t.identifier === steeringTouch);
            if (!touch) return;
            
            // Calculate steering angle from touch position
            const centerX = window.innerWidth * 0.25;
            const centerY = window.innerHeight * 0.5;
            const deltaX = touch.clientX - centerX;
            const maxDelta = window.innerWidth * 0.25;
            
            this.game.player.steeringInput = Math.max(-1, Math.min(1, deltaX / maxDelta));
        });
        
        document.addEventListener('touchend', (e) => {
            steeringTouch = null;
            this.game.player.steeringInput = 0;
        });
    }
    
    setupTiltControls() {
        if ('DeviceOrientationEvent' in window) {
            window.addEventListener('deviceorientation', (e) => {
                if (!this.tiltEnabled) return;
                
                // Map tilt to steering
                const tiltX = e.gamma || 0; // -90 to 90
                const steer = tiltX / 90; // Normalize to -1 to 1
                
                this.game.player.steeringInput = steer;
                
                // Gas/brake based on tilt forward/backward
                const tiltZ = e.beta || 0; // -180 to 180
                this.game.player.throttleInput = (tiltZ + 90) / 180;
            });
        }
    }
    
    setupTouchButtons() {
        // Create on-screen gas/brake buttons
        const controls = document.createElement('div');
        controls.id = 'mobile-controls';
        controls.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            display: flex;
            justify-content: space-between;
            z-index: 1000;
            pointer-events: none;
        `;
        
        const leftButton = this.createButton('▲', 'flex: 2;');
        const rightButton = this.createButton('■', 'flex: 2;');
        
        controls.appendChild(leftButton);
        controls.appendChild(rightButton);
        document.body.appendChild(controls);
    }
    
    createButton(symbol, style) {
        const btn = document.createElement('button');
        btn.innerHTML = symbol;
        btn.style.cssText = `
            background: rgba(0,0,0,0.7);
            color: white;
            border: 2px solid white;
            border-radius: 20px;
            font-size: 48px;
            padding: 20px;
            pointer-events: auto;
            touch-action: manipulation;
            ${style}
        `;
        
        btn.addEventListener('touchstart', () => {
            btn.style.background = 'rgba(0,255,0,0.7)';
        });
        
        btn.addEventListener('touchend', () => {
            btn.style.background = 'rgba(0,0,0,0.7)';
        });
        
        return btn;
    }
    
    setupHaptics() {
        this.hapticPattern = {
            crash: [50, 30, 50],
            collect: [20],
            police: [30, 30, 30]
        };
    }
    
    triggerHaptic(pattern) {
        if ('vibrate' in navigator) {
            navigator.vibrate(this.hapticPattern[pattern] || 50);
        }
    }
    
    getSteeringZone(x, y) {
        // Left 40% of screen is steering zone
        return x < window.innerWidth * 0.4 && y > window.innerHeight * 0.3;
    }
    
    enableTilt() {
        this.tiltEnabled = true;
        if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission();
        }
    }
}

export class MobileUI {
    constructor() {
        this.createMobileOverlay();
    }
    
    createMobileOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'mobile-ui';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Speedometer
        const speedo = document.createElement('div');
        speedo.id = 'speedometer';
        speedo.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 24px;
            font-family: monospace;
        `;
        speedo.innerHTML = 'SPEED<br>0 km/h';
        overlay.appendChild(speedo);
        
        // Mini-map
        const minimap = document.createElement('div');
        minimap.id = 'minimap';
        minimap.style.cssText = `
            position: absolute;
            top: 20px;
            left: 20px;
            width: 150px;
            height: 150px;
            background: rgba(0,0,0,0.8);
            border: 2px solid white;
            border-radius: 10px;
        `;
        overlay.appendChild(minimap);
        
        document.body.appendChild(overlay);
    }
}
