import * as THREE from 'three';
/**
 * Controller Support for Singapore Streets
 * Supports built-in and Bluetooth game controllers on Android
 */

export class ControllerSupport {
    constructor(game) {
        this.game = game;
        this.controller = null;
        this.connected = false;
        this.deadzone = 0.15;
        
        this.setupControllerEvents();
        this.setupGamepadAPI();
    }
    
    setupControllerEvents() {
        // Gamepad connected
        window.addEventListener('gamepadconnected', (e) => {
            console.log('Gamepad connected:', e.gamepad.id);
            this.controller = e.gamepad;
            this.connected = true;
            this.showNotification('🎮 CONTROLLER CONNECTED', e.gamepad.id);
        });
        
        // Gamepad disconnected
        window.addEventListener('gamepaddisconnected', (e) => {
            console.log('Gamepad disconnected:', e.gamepad.id);
            this.controller = null;
            this.connected = false;
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
                        break;
                    }
                }
            }
        }, 1000);
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
