import * as THREE from 'three';
/**
 * Controller Support for Singapore Streets
 * Supports built-in and Bluetooth game controllers on Android
 * Enhanced with DualSense haptics, adaptive triggers, and light bar
 */

export class ControllerSupport {
    constructor(game) {
        this.game = game;
        this.controller = null;
        this.connected = false;
        this.deadzone = 0.15;
        
        // DualSense-specific features
        this.isDualSense = false;
        this.hapticActuators = null;
        this.vibrationActuator = null;
        this.leftTriggerActuator = null;
        this.rightTriggerActuator = null;
        this.lastHapticTime = 0;
        this.hapticCooldown = 50; // ms between haptic updates
        
        // WebHID device for direct DualSense access (light bar, advanced haptics)
        this.hidDevice = null;
        this.hidReportId = 1;
        
        // Light bar state
        this.lightBarColor = { r: 0, g: 255, b: 255 }; // default cyan (Singapore theme)
        this.lightBarMode = 'gameState'; // 'gameState' | 'solid' | 'pulse'
        
        // Adaptive trigger state
        this.triggerMode = 'driving'; // 'driving' | 'aiming' | 'off'
        this.lastTriggerUpdate = 0;
        
        this.setupControllerEvents();
        this.setupGamepadAPI();
        this.setupWebHID();
    }
    
    setupControllerEvents() {
        // Gamepad connected
        window.addEventListener('gamepadconnected', (e) => {
            console.log('Gamepad connected:', e.gamepad.id);
            this.controller = e.gamepad;
            this.connected = true;
            this.detectDualSense(e.gamepad);
            this.showNotification('🎮 CONTROLLER CONNECTED', e.gamepad.id);
        });
        
        // Gamepad disconnected
        window.addEventListener('gamepaddisconnected', (e) => {
            console.log('Gamepad disconnected:', e.gamepad.id);
            this.controller = null;
            this.connected = false;
            this.isDualSense = false;
            this.hapticActuators = null;
            this.showNotification('🎮 CONTROLLER DISCONNECTED', 'Switching to touch controls');
        });
    }
    
    setupGamepadAPI() {
        // Poll for controllers
        setInterval(() => {
            if (!this.controller) {
                const gamepads = navigator.getGamepads();
                for (let i = 0; i < gamepads.length; i++) {
                    if (gamepads[i]) {
                        this.controller = gamepads[i];
                        this.connected = true;
                        this.detectDualSense(gamepads[i]);
                        break;
                    }
                }
            }
        }, 1000);
    }
    
    async setupWebHID() {
        // Request DualSense via WebHID for advanced features (light bar, haptics)
        if (!navigator.hid) {
            console.log('[ControllerSupport] WebHID API not available (some browsers)')
            return
        }
        
        try {
            this.hidDevice = await navigator.hid.requestDevice({
                vendorId: 0x054c, // Sony vendor ID (1356)
                productId: 0x0ce6, // DualSense USB product ID (also try 0x0bce for Bluetooth)
            })
            
            // Verify it's a DualSense
            const productName = await this.hidDevice.getProductName()
            console.log('[ControllerSupport] WebHID DualSense acquired:', productName)
            
            // Set up event listeners for HID events
            this.hidDevice.onconnectedstatechange = async (e) => {
                console.log('[ControllerSupport] HID device connected state:', e.connected)
                this.isDualSense = e.connected
            }
            
            // Light bar control: HID Report 0x06, Data = RGB (3 bytes)
            this.setLightBarColor = (r, g, b) => {
                const data = new Uint8Array([0x06, r, g, b])
                this.hidDevice.sendReport(0x01, data).catch(err => {
                    console.warn('[ControllerSupport] Failed to set light bar:', err)
                })
            }
            
            // Advanced haptic effects: HID Report 0x08, Data = intensity (1 byte)
            this.triggerAdvancedHaptics = async (effect, params = {}) => {
                let reportId = 0x08
                let data
                
                switch (effect) {
                    case 'click':
                        data = new Uint8Array([reportId, 0x01, Math.round(params.intensity * 255) || 255])
                        break
                    case 'rumble':
                        data = new Uint8Array([reportId, 0x02, Math.round(params.low || 0) * 255, Math.round(params.high || 255) * 255, params.duration || 100])
                        break
                    case 'triggerClick':
                        data = new Uint8Array([reportId, 0x03, params.trigger === 'right' ? 0x01 : 0x02, params.intensity ? Math.round(params.intensity * 255) : 255])
                        break
                    case 'triggerEffect':
                        data = new Uint8Array([reportId, 0x04, params.trigger === 'right' ? 0x01 : 0x02, params.mode || 0, params.strength ? Math.round(params.strength * 255) : 255])
                        break
                    default:
                        return
                }
                
                try {
                    await this.hidDevice.sendReport(this.hidReportId, data)
                } catch (err) {
                    console.warn('[ControllerSupport] Failed to send haptic report:', err)
                }
            }
            
            console.log('[ControllerSupport] WebHID setup complete')
        } catch (err) {
            console.warn('[ControllerSupport] WebHID setup failed (user denied):', err)
        }
    }
    
    // Detect DualSense and initialize haptic actuators
    detectDualSense(gamepad) {
        const id = gamepad.id.toLowerCase();
        this.isDualSense = id.includes('dualsense') || id.includes('wireless controller') || 
                           (navigator.userAgent.includes('PlayStation') && id.includes('controller'));
        
        if (this.isDualSense && gamepad.hapticActuators) {
            this.hapticActuators = gamepad.hapticActuators;
            
            // Find vibration actuator (usually first)
            for (const actuator of this.hapticActuators) {
                if (actuator.type === 'vibration') {
                    this.vibrationActuator = actuator;
                } else if (actuator.type === 'trigger') {
                    // DualSense has two trigger actuators (left/right)
                    if (!this.leftTriggerActuator) {
                        this.leftTriggerActuator = actuator;
                    } else if (!this.rightTriggerActuator) {
                        this.rightTriggerActuator = actuator;
                    }
                }
            }
            
            console.log('[ControllerSupport] DualSense detected with haptics:', {
                vibration: !!this.vibrationActuator,
                leftTrigger: !!this.leftTriggerActuator,
                rightTrigger: !!this.rightTriggerActuator
            });
        }
    }
    
    // ============================================
    // HAPTIC FEEDBACK (Vibration)
    // ============================================
    
    // Play a vibration effect
    async playVibration(strongMagnitude, weakMagnitude, duration) {
        if (!this.isDualSense || !this.vibrationActuator) return;
        
        const now = performance.now();
        if (now - this.lastHapticTime < this.hapticCooldown) return;
        this.lastHapticTime = now;
        
        // Try WebHID advanced haptics first
        if (this.hidDevice) {
            try {
                await this.hidDevice.sendReport(0x08, new Uint8Array([
                    0x02,
                    Math.round(strongMagnitude * 255),
                    Math.round(weakMagnitude * 255),
                    duration
                ]))
            } catch (_) {}
        }
        
        // Fallback to gamepad vibration
        try {
            await this.vibrationActuator.pulse(strongMagnitude, duration);
            // weakMagnitude not directly supported in pulse(), but some browsers accept second param
        } catch (e) {
            // Fallback for older API
            try {
                await navigator.vibrate(duration);
            } catch (_) {}
        }
    }
    
    // Convenience methods for game events
    triggerCrashHaptic(intensity = 1.0) {
        const strong = Math.min(1.0, 0.6 * intensity);
        const weak = Math.min(1.0, 0.3 * intensity);
        return this.playVibration(strong, weak, 200 * intensity);
    }
    
    triggerGunshotHaptic(intensity = 1.0) {
        return this.playVibration(0.8 * intensity, 0.2 * intensity, 50);
    }
    
    triggerExplosionHaptic(intensity = 1.0) {
        return this.playVibration(1.0 * intensity, 0.5 * intensity, 400 * intensity);
    }
    
    triggerWantedLevelHaptic(level) {
        const intensity = Math.min(1.0, 0.2 + level * 0.15);
        return this.playVibration(intensity, intensity * 0.5, 150);
    }
    
    triggerHeartbeatHaptic() {
        return this.playVibration(0.4, 0.2, 100);
    }
    
    triggerCollectibleHaptic() {
        return this.playVibration(0.3, 0.4, 80);
    }
    
    triggerVehicleEngineHaptic(rpm) {
        // Subtle engine vibration based on RPM (0-1)
        const intensity = Math.min(1.0, 0.1 + rpm * 0.3);
        return this.playVibration(intensity, intensity * 0.8, 100);
    }
    
    // ============================================
    // ADAPTIVE TRIGGERS (L2/R2)
    // ============================================
    
    // Set adaptive trigger effect for left (L2) and right (R2) triggers
    async setAdaptiveTrigger(leftEffect, rightEffect) {
        if (!this.isDualSense) return;
        
        const now = performance.now();
        if (now - this.lastTriggerUpdate < 16) return; // ~60fps max
        this.lastTriggerUpdate = now;
        
        const effects = [];
        
        if (leftEffect && this.leftTriggerActuator) {
            effects.push(this.leftTriggerActuator.pulse(leftEffect.strong || 0, leftEffect.duration || 0));
        }
        if (rightEffect && this.rightTriggerActuator) {
            effects.push(this.rightTriggerActuator.pulse(rightEffect.strong || 0, rightEffect.duration || 0));
        }
        
        if (effects.length > 0) {
            try {
                await Promise.all(effects);
            } catch (e) {
                // Trigger haptics not supported or failed silently
            }
        }
    }
    
    // Update adaptive triggers based on game state (called each frame)
    updateAdaptiveTriggers() {
        if (!this.isDualSense || !this.leftTriggerActuator || !this.rightTriggerActuator) return;
        
        const player = this.game.player;
        if (!player) return;
        
        if (player.isInVehicle) {
            this.triggerMode = 'driving';
            this.updateDrivingTriggers(player);
        } else if (this.game.combatSystem?.isAiming) {
            this.triggerMode = 'aiming';
            this.updateAimingTriggers();
        } else {
            this.triggerMode = 'off';
            this.clearTriggers();
        }
    }
    
    // Driving: R2 = accelerator resistance, L2 = brake resistance
    updateDrivingTriggers(player) {
        // Get throttle/brake from action input
        const throttle = this.game.actionInput?.controllerDriving?.throttle || 0;
        const brake = this.game.actionInput?.controllerDriving?.brake || 0;
        const speed = Math.abs(player.velocity?.x || 0) + Math.abs(player.velocity?.z || 0);
        const maxSpeed = 50; // arbitrary max
        
        // R2 (accelerator): resistance increases at high RPM/speed
        const acceleratorResistance = Math.min(1.0, 0.2 + (speed / maxSpeed) * 0.6 + throttle * 0.2);
        
        // L2 (brake): firm resistance when braking
        const brakeResistance = Math.min(1.0, 0.1 + brake * 0.9);
        
        // Weapon mode: R2 has a "click" point for semi-auto
        // Driving mode: smooth resistance
        this.setAdaptiveTrigger(
            { strong: brakeResistance, duration: 16 },   // L2
            { strong: acceleratorResistance, duration: 16 } // R2
        );
    }
    
    // Aiming: R2 has resistance + click point for semi-auto
    updateAimingTriggers() {
        // R2: initial resistance, then "wall" at 50% press, then light to full
        // L2: light resistance for aim-down-sights
        this.setAdaptiveTrigger(
            { strong: 0.3, duration: 16 },  // L2 - light resistance
            { strong: 0.6, duration: 16 }   // R2 - medium resistance with click
        );
    }
    
    clearTriggers() {
        this.setAdaptiveTrigger(
            { strong: 0, duration: 16 },
            { strong: 0, duration: 16 }
        );
    }
    
    // ============================================
    // LIGHT BAR
    // ============================================
    
    // Set light bar color (uses gamepad API extension if available)
    setLightBarColor(r, g, b) {
        this.lightBarColor = { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
        
        // Try WebHID first (direct access)
        if (this.hidDevice) {
            try {
                this.hidDevice.sendReport(0x01, new Uint8Array([0x06, r, g, b]))
            } catch (_) {}
            return
        }
        
        // Fallback to gamepad extensions API
        if (this.controller && this.controller.extensions?.lightBar) {
            try {
                this.controller.extensions.lightBar.setColor(r, g, b);
            } catch (_) {}
        }
    }
    
    // Update light bar based on game state
    updateLightBar() {
        const player = this.game.player;
        if (!player) return;
        
        if (this.game.wantedSystem && this.game.wantedSystem.level > 0) {
            // Red pulsing for wanted level
            const intensity = 0.5 + Math.sin(performance.now() / 200) * 0.5;
            this.setLightBarColor(255, 0, 0);
        } else if (player.isInVehicle) {
            // Blue for police, green for civilian, orange for emergency
            const vehicle = player.currentVehicle;
            if (vehicle?.isPolice) {
                this.setLightBarColor(0, 0, 255);
            } else if (vehicle?.isEmergency) {
                this.setLightBarColor(255, 165, 0);
            } else {
                this.setLightBarColor(0, 255, 0);
            }
        } else if (player.health < 30) {
            // Red pulsing when low health
            const intensity = 0.5 + Math.sin(performance.now() / 300) * 0.5;
            this.setLightBarColor(255, Math.round(50 * intensity), 0);
        } else {
            // Default Singapore cyan
            this.setLightBarColor(0, 255, 255);
        }
    }
    
    // ============================================
    // MICROPHONE MUTE BUTTON (DualSense button 16/17)
    // ============================================
    
    handleMicMuteButton(gp) {
        // DualSense mic mute button is typically index 16 or 17
        const micMutePressed = gp.buttons[16]?.pressed || gp.buttons[17]?.pressed;
        if (micMutePressed && !this._micMuteWasPressed) {
            // Toggle voice chat or trigger push-to-talk
            if (this.game.voiceChat) {
                this.game.voiceChat.toggleMute();
            }
        }
        this._micMuteWasPressed = micMutePressed;
    }
    
    // Standard gamepad button mapping
    // 0: A/Cross, 1: B/Circle, 2: X/Square, 3: Y/Triangle
    // 4: L1/LB, 5: R1/RB, 6: L2/LT, 7: R2/RT
    // 8: Select/Share, 9: Start/Options, 10: L3, 11: R3
    // 12: D-pad Up, 13: D-pad Down, 14: D-pad Left, 15: D-pad Right
    
    update(delta) {
        if (!this.controller) return;
        
        // Get fresh gamepad state
        const gamepads = navigator.getGamepads();
        this.controller = gamepads[this.controller.index] || this.controller;
        
        const gp = this.controller;
        if (!gp) return;
        
        // DualSense haptics & adaptive triggers
        if (this.isDualSense) {
            this.updateAdaptiveTriggers();
            this.updateLightBar();
            this.handleMicMuteButton(gp);
        }
        
        // Left stick - movement
        const leftX = this.applyDeadzone(gp.axes[0]);
        const leftY = this.applyDeadzone(gp.axes[1]);
        
        if (this.game.player?.isInVehicle) {
            this.game.actionInput?.setControllerDriving({
                steer: leftX,
                throttle: Math.max(0, gp.buttons[7]?.value || (gp.buttons[7]?.pressed ? 1 : 0)),
                brake: Math.max(0, gp.buttons[6]?.value || (gp.buttons[6]?.pressed ? 1 : 0)),
                handbrake: Boolean(gp.buttons[4]?.pressed)
            });
        } else {
            this.game.actionInput?.setControllerDriving({ throttle: 0, brake: 0, steer: 0, handbrake: false });
        }

        if (this.game.player && !this.game.player.isInVehicle) {
            const player = this.game.player;
            const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, player.rotation.y, 0));
            const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, player.rotation.y, 0));
            
            const moveDir = new THREE.Vector3();
            moveDir.addScaledVector(forward, -leftY);
            moveDir.addScaledVector(right, leftX);
            
            const speed = player.isRunning ? player.runSpeed : player.walkSpeed;
            player.velocity.x = moveDir.x * speed;
            player.velocity.z = moveDir.z * speed;
        }
        
        // Right stick - camera
        const rightX = this.applyDeadzone(gp.axes[2]);
        const rightY = this.applyDeadzone(gp.axes[3]);
        
        if (this.game.player) {
            this.game.player.rotation.y -= rightX * 0.05;
            this.game.player.rotation.x -= rightY * 0.05;
            this.game.player.rotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, this.game.player.rotation.x));
        }
        
        // Buttons
        this.handleButtons(gp);
    }
    
    applyDeadzone(value) {
        if (Math.abs(value) < this.deadzone) return 0;
        return value;
    }
    
    handleButtons(gp) {
        const player = this.game.player;
        if (!player) return;
        
        // A button - Jump / Enter vehicle
        if (gp.buttons[0]?.pressed) {
            if (player.onGround && !player.isInVehicle) {
                player.jump();
            } else if (!player.isInVehicle) {
                this.game.interactionSystem?.interact();
            }
        }
        
        // B button - Exit vehicle / Cancel
        if (gp.buttons[1]?.pressed) {
            if (player.isInVehicle) {
                player.exitVehicle();
            }
        }
        
        // X button - Attack
        if (gp.buttons[2]?.pressed) {
            if (this.game.combatSystem) {
                this.game.combatSystem.attack();
            }
        }
        
        // Y button - Interact / Mission
        if (gp.buttons[3]?.pressed) {
            if (this.game.generateQuickMission) {
                this.game.generateQuickMission();
            }
        }
        
        // L1 - Aim
        if (gp.buttons[4]?.pressed) {
            if (this.game.combatSystem) {
                this.game.combatSystem.isAiming = true;
            }
        } else {
            if (this.game.combatSystem) {
                this.game.combatSystem.isAiming = false;
            }
        }
        
        // R1 - Sprint
        if (gp.buttons[5]?.pressed) {
            player.isRunning = true;
        } else {
            player.isRunning = false;
        }
        
        
        // D-pad - Quick actions
        if (gp.buttons[12]?.pressed) { // Up
            if (this.game.aiChatUI) this.game.aiChatUI.toggle();
        }
        if (gp.buttons[13]?.pressed) { // Down
            if (this.game.toggleRadio) this.game.toggleRadio();
        }
        if (gp.buttons[14]?.pressed) { // Left
            if (this.game.charCustom) this.game.charCustom.openCustomization();
        }
        if (gp.buttons[15]?.pressed) { // Right
            if (this.game.propertySystem) this.game.propertySystem.toggleUI();
        }
        
        // Select - Map/Menu
        if (gp.buttons[8]?.pressed) {
            // Toggle menu
        }
        
        // Start - Pause
        if (gp.buttons[9]?.pressed) {
            // Pause game
        }
        
        // L3 - Crouch
        if (gp.buttons[10]?.pressed) {
            // Crouch
        }
        
        // R3 - Camera reset
        if (gp.buttons[11]?.pressed) {
            if (this.game.player) {
                this.game.player.rotation.x = 0;
            }
        }
    }
    
    showNotification(title, message) {
        if (this.game.showNotification) {
            this.game.showNotification(title, message);
        }
    }
    
    // Controller status indicator
    createStatusIndicator() {
        this.indicator = document.createElement('div');
        this.indicator.id = 'controller-status';
        this.indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid #00ff00;
            border-radius: 8px;
            padding: 8px 12px;
            color: #00ff00;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
        `;
        this.indicator.textContent = '🎮 Controller: Disconnected';
        document.body.appendChild(this.indicator);
        
        // Update status
        setInterval(() => {
            if (this.connected) {
                this.indicator.textContent = '🎮 Controller: Connected';
                this.indicator.style.borderColor = '#00ff00';
                this.indicator.style.color = '#00ff00';
            } else {
                this.indicator.textContent = '🎮 Controller: Touch Mode';
                this.indicator.style.borderColor = '#666';
                this.indicator.style.color = '#666';
            }
        }, 1000);
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.ControllerSupport = ControllerSupport;
}
