// MobileTouchSystem.js - Enhanced touch controls for Singapore Streets
// Based on MobileGTAControls + Millionaire Race touch patterns

export class MobileTouchSystem {
    constructor(game) {
        this.game = game;
        this.isMobile = this.detectMobileDevice();
        this.touchControls = new Map();
        this.gestureHandlers = new Map();
        this.touchZones = new Map();
        this.touchHandlers = new Map();
        this.touchData = {
            activeTouch: null,
            lastTouchTime: 0,
            gestureState: 'idle',
            swipeStart: null,
            swipeEnd: null,
            pinchStart: null,
            pinchEnd: null
        };
        
        this.initialize();
    }
    
    detectMobileDevice() {
        return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent) ||
               window.innerWidth < 768;
    }
    
    initialize() {
        // Initialize touch zone system
        this.createTouchZones();
        
        // Set up touch event handlers
        this.setupTouchEvents();
        
        // Initialize gesture handlers
        this.setupGestureHandlers();
        
        // Add debug info for touch system
        this.debugTouchSystem();
    }
    
    createTouchZones() {
        // Create D-pad zone
        const dpadZone = this.createTouchZone({
            name: 'dpad',
            position: { x: 50, y: 90 },
            size: 120,
            zones: ['up', 'down', 'left', 'right', 'center']
        });
        
        // Create action buttons
        this.createActionButtons();
        
        // Create camera controls
        this.createCameraControls();
    }
    
    createTouchZone(config) {
        const zone = {
            name: config.name,
            position: config.position,
            size: config.size,
            zones: config.zones || ['center'],
            element: null,
            isActive: false
        };
        
        // Create the element
        const element = document.createElement('div');
        element.className = 'touch-zone';
        element.style.position = 'absolute';
        element.style.width = `${config.size}px`;
        element.style.height = `${config.size}px`;
        element.style.left = `${config.position.x}px`;
        element.style.bottom = `${config.position.y}px`;
        element.style.background = 'rgba(255,255,255,0.1)';
        element.style.border = '2px solid rgba(255,255,255,0.3)';
        element.style.borderRadius = '50%';
        element.style.pointerEvents = 'auto';
        element.style.touchAction = 'manipulation';
        element.style.zIndex = '1000';
        
        // Add zone to element
        for (const zoneName of config.zones) {
            const zoneEl = document.createElement('div');
            zoneEl.className = `zone-${zoneName}`;
            zoneEl.style.position = 'absolute';
            zoneEl.style.width = '40px';
            zoneEl.style.height = '40px';
            zoneEl.style.borderRadius = '50%';
            zoneEl.style.background = 'rgba(255,255,255,0.3)';
            zoneEl.style.border = '1px solid rgba(255,255,255,0.5)';
            zoneEl.style.display = 'none';
            zoneEl.style.touchAction = 'none';
            
            // Position based on zone
            const positions = {
                up: { top: 0, left: 40, transform: 'translate(-50%, 0)' },
                down: { bottom: 0, left: 40, transform: 'translate(-50%, 0)' },
                left: { top: 20, left: 0, transform: 'translate(0, -50%)' },
                right: { top: 20, right: 0, transform: 'translate(0, -50%)' },
                center: { top: 20, left: 40, transform: 'translate(-50%, -50%)' }
            };
            
            zoneEl.style.position = positions[zoneName] || 'absolute';
            
            element.appendChild(zoneEl);
            zone.zones[zoneName] = zoneEl;
        }
        
        this.touchZones.set(config.name, zone);
        document.body.appendChild(element);
        return zone;
    }
    
    createActionButtons() {
        // Create directional buttons
        const buttons = ['accelerator', 'brake', 'camera', 'action', 'inventory'];
        
        buttons.forEach((name, i) => {
            const button = this.createButton({
                name: name,
                position: { x: 150 + i * 50, y: 90 },
                size: 80
            });
            this.touchControls.set(name, button);
        });
    }
    
    createButton(config) {
        const button = document.createElement('div');
        button.className = 'touch-button';
        button.style.position = 'absolute';
        button.style.width = `${config.size}px`;
        button.style.height = `${config.size}px`;
        button.style.left = `${config.position.x}px`;
        button.style.bottom = `${config.position.y}px`;
        button.style.background = 'rgba(255,255,255,0.2)';
        button.style.border = '2px solid rgba(255,255,255,0.3)';
        button.style.borderRadius = '10px';
        button.style.zIndex = '1000';
        button.style.pointerEvents = 'auto';
        button.style.touchAction = 'manipulation';
        
        // Add click/touch handlers
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleTouchStart(config.name, e);
        });
        
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleTouchEnd(config.name, e);
        });
        
        button.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleTouchMove(config.name, e);
        });
        
        document.body.appendChild(button);
        return button;
    }
    
    createCameraControls() {
        // Camera rotation controls
        const cameraButton = this.createButton({
            name: 'camera',
            position: { x: 250, y: 90 },
            size: 60
        });
    }
    
    setupTouchEvents() {
        // Touchstart - detect start of touch
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                const touch = e.changedTouches[0];
                const time = performance.now();
                
                // Check if this is on a touch zone
                const zone = this.getTouchZoneAtPosition(touch.clientX, touch.clientY);
                if (zone) {
                    this.handleTouchStart(zone.name, e);
                }
            }
        }, { passive: false });
        
        // Touchmove - handle movement
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.changedTouches[0];
                const time = performance.now();
                
                // Handle swipe gestures
                if (this.touchData.gestureState === 'swipe_start') {
                    this.touchData.swipeStart = {
                        x: touch.clientX,
                        y: touch.clientY,
                        time: time
                    };
                } else if (this.touchData.gestureState === 'swipe_end') {
                    // Reset
                    this.touchData.gestureState = 'idle';
                } else {
                    // Handle continuous movement
                    this.handleTouchMove('dpad', e);
                }
            }
        }, { passive: false });
        
        // Touchend - handle end of touch
        document.addEventListener('touchend', (e) => {
            if (e.touches.length === 0) {
                this.handleTouchEnd();
            }
        }, { passive: false });
        
        // Touchcancel - handle cancellation
        document.addEventListener('touchcancel', (e) => {
            this.handleTouchEnd();
        });
    }
    
    getTouchZoneAtPosition(x, y) {
        for (const [name, zone] of this.touchZones.entries()) {
            const rect = zone.element.getBoundingClientRect();
            if (
                x >= rect.left &&
                x <= rect.right &&
                y >= rect.bottom - zone.size &&
                y <= rect.bottom
            ) {
                return zone;
            }
        }
        return null;
    }
    
    handleTouchStart(zoneName, e) {
        const touch = e.changedTouches[0];
        const time = performance.now();
        
        if (zoneName === 'dpad') {
            this.touchData.activeTouch = 'up';
            this.touchData.lastTouchTime = time;
            this.touchData.gestureState = 'idle';
        } else if (zoneName === 'dpad' && this.touchData.gestureState === 'idle') {
            // Start swipe detection
            this.touchData.gestureState = 'swipe_start';
            this.touchData.swipeStart = {
                x: touch.clientX,
                y: touch.clientY,
                time: time
            };
        } else if (zoneName === 'dpad' && this.touchData.gestureState === 'swipe_start') {
            // Check if swipe distance > threshold
            const dx = Math.abs(touch.clientX - this.touchData.swipeStart.x);
            const dy = Math.abs(touch.clientY - this.touchData.swipeStart.y);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 50) {
                // Determine swipe direction
                if (dx > dy) {
                    if (touch.clientX > this.touchData.swipeStart.x) {
                        this.touchData.gestureState = 'swipe_right';
                        this.touchData.gestureState = 'swipe_end';
                        this.touchData.swipeEnd = {
                            x: touch.clientX,
                            y: touch.clientY,
                            time: time
                        };
                        this.handleSwipe('right');
                    } else {
                        this.touchData.gestureState = 'swipe_end';
                        this.touchData.swipeEnd = {
                            x: touch.clientX,
                            y: touch.clientY,
                            time: time
                        };
                        this.touchData.gestureState = 'idle';
                        this.handleSwipe('left');
                    }
                } else {
                    if (touch.clientY > this.touchData.swipeStart.y) {
                        this.touchData.gestureState = 'swipe_end';
                        this.touchData.gestureState = 'idle';
                        this.touchData.swipeEnd = {
                            x: touch.clientX,
                            y: touch.clientY,
                            time: time
                        };
                        this.handleSwipe('down');
                    } else {
                        this.touchData.gestureState = 'swipe_end';
                        this.touchData.gestureState = 'idle';
                        this.touchData.swipeEnd = {
                            x: touch.clientX,
                            y: touch.clientY,
                            time: time
                        };
                        this.touchData.gestureState = 'idle';
                        this.handleSwipe('up');
                    }
                }
            }
        } else {
            // Regular button press
            this.handleTouchStart(zoneName, e);
        }
    }
    
    handleTouchStart(zoneName, e) {
        const touch = e.changedTouches[0];
        this.touchData.activeTouch = zoneName;
        this.touchData.lastTouchTime = performance.now();
        
        if (zoneName === 'accelerator') {
            this.game.vehicleManager.accelerate();
        } else if (zoneName === 'brake') {
            this.game.vehicleManager.brake();
        } else if (zoneName === 'camera') {
            this.game.cameraControls.rotate(1);
        } else if (zoneName === 'action') {
            this.game.interactionSystem.triggerAction();
        } else if (zoneName === 'inventory') {
            this.game.inventorySystem.toggle();
        }
    }
    
    handleTouchMove(zoneName, e) {
        const touch = e.changedTouches[0];
        
        if (zoneName === 'dpad') {
            // Handle D-pad movement
            const dx = touch.clientX - this.touchData.startX || 0;
            const dy = touch.clientY - this.touchData.startY || 0;
            
            if (Math.abs(dx) > 20) {
                if (dx > 0) this.touchData.gestureState = 'swipe_right';
                else this.touchData.gestureState = 'swipe_left';
            }
            
            if (Math.abs(dy) > 20) {
                if (dy > 0) this.touchData.gestureState = 'swipe_down';
                else this.touchData.gestureState = 'swipe_up';
            }
            
            // Apply movement to player
            this.game.playerController.setMovement(dx, dy);
        }
    }
    
    handleTouchEnd() {
        // Reset touch state
        this.touchData.activeTouch = null;
        this.touchData.gestureState = 'idle';
        this.touchData.swipeStart = null;
        this.touchData.swipeEnd = null;
        this.touchData.pinchStart = null;
        this.touchData.pinchEnd = null;
        
        // Release any active controls
        if (this.touchData.activeTouch) {
            this.touchData.activeTouch = null;
            this.touchData.gestureState = 'idle';
        }
        
        // Release vehicle controls
        if (this.touchData.activeTouch === 'accelerator') {
            this.game.vehicleManager.releaseAccelerator();
        } else if (this.touchData.activeTouch === 'brake') {
            this.touchData.gestureState = 'idle';
        }
    }
    
    handleSwipe(direction) {
        // Handle swipe gestures
        console.log(`[TouchSystem] Swipe detected: ${direction}`);
        // Could trigger special actions based on swipe direction
    }
    
    debugTouchSystem() {
        // Add debug info display
        const debug = document.createElement('div');
        debug.id = 'touch-debug';
        debug.style.cssText = 'position: fixed; top: 10px; right: 10px; color: white; background: rgba(0,0,0,0.5); padding: 5px 10px; font-family: monospace; z-index: 10000;';
        debug.innerHTML = 'Touch System: OK';
        document.body.appendChild(debug);
    }
}