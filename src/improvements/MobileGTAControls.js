import * as THREE from 'three';
/**
 * Mobile GTA-Style Controls for Singapore Streets
 * Touch-based controls optimized for mobile gameplay
 */

export class MobileGTAControls {
    constructor(game) {
        this.game = game;
        this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (this.isMobile) {
            this.setupMobileControls();
        }
    }
    
    setupMobileControls() {
        this.createJoystick();
        this.createDrivingControls();
        this.createActionButtons();
        this.createWeaponWheel();
        this.createCameraControl();
        this.setupTouchEvents();
    }
    
    createJoystick() {
        // Virtual joystick for movement
        this.joystick = document.createElement('div');
        this.joystick.id = 'mobile-joystick';
        this.joystick.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 120px;
            height: 120px;
            background: rgba(0, 0, 0, 0.5);
            border: 2px solid rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            z-index: 1000;
            touch-action: none;
        `;
        
        this.joystickKnob = document.createElement('div');
        this.joystickKnob.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            background: rgba(0, 255, 255, 0.7);
            border-radius: 50%;
            transition: all 0.1s;
        `;
        this.joystick.appendChild(this.joystickKnob);
        document.body.appendChild(this.joystick);
        
        this.joystickActive = false;
        this.joystickInput = { x: 0, y: 0 };
    }
    
    createDrivingControls() {
        this.drivingButtons = {};
        const pad = document.createElement('div');
        pad.id = 'mobile-driving-controls';
        pad.style.cssText = 'position:fixed;right:26px;bottom:30px;z-index:1002;display:none;grid-template-columns:repeat(2,58px);gap:8px;touch-action:none;';
        const addButton = (label, action) => {
            const button = document.createElement('button');
            button.textContent = label;
            button.style.cssText = 'width:58px;height:58px;border:2px solid rgba(0,229,255,.55);border-radius:50%;background:rgba(0,0,0,.72);color:#fff;font-size:18px;touch-action:none;';
            const set = (active) => { this.drivingButtons[action] = active; button.style.background = active ? 'rgba(0,188,212,.75)' : 'rgba(0,0,0,.72)'; };
            button.addEventListener('touchstart', (event) => { event.preventDefault(); set(true); }, { passive: false });
            button.addEventListener('touchend', (event) => { event.preventDefault(); set(false); }, { passive: false });
            button.addEventListener('touchcancel', () => set(false));
            pad.appendChild(button);
        };
        addButton('◀', 'left'); addButton('▲', 'throttle'); addButton('▼', 'brake'); addButton('⏹', 'handbrake');
        document.body.appendChild(pad);
        this.drivingPad = pad;
    }

    createCameraControl() {
        // Right side camera control area
        this.cameraArea = document.createElement('div');
        this.cameraArea.id = 'mobile-camera';
        this.cameraArea.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            width: 50%;
            height: 70%;
            z-index: 999;
            touch-action: none;
        `;
        document.body.appendChild(this.cameraArea);
        
        let lastTouch = null;
        this.cameraArea.addEventListener('touchstart', (e) => {
            lastTouch = e.touches[0];
        });
        
        this.cameraArea.addEventListener('touchmove', (e) => {
            if (!lastTouch) return;
            const touch = e.touches[0];
            const deltaX = touch.clientX - lastTouch.clientX;
            const deltaY = touch.clientY - lastTouch.clientY;
            
            if (this.game.player) {
                this.game.player.rotation.y -= deltaX * 0.005;
                this.game.player.rotation.x -= deltaY * 0.005;
                this.game.player.rotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, this.game.player.rotation.x));
            }
            
            lastTouch = touch;
        });
        
        this.cameraArea.addEventListener('touchend', () => {
            lastTouch = null;
        });
    }
    
    createActionButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'mobile-action-buttons';
        buttonContainer.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        `;
        
        // Jump button
        const jumpBtn = this.createButton('⬆️', 'jump', () => {
            if (this.game.player && this.game.player.onGround) {
                this.game.player.jump();
            }
        });
        
        // Context action: vehicle, mission, food, transit, or other nearby use.
        const enterBtn = this.createButton('✋', 'interact', () => {
            this.game.interactionSystem?.interact();
        });
        
        // Attack button
        const attackBtn = this.createButton('⚔️', 'attack', () => {
            if (this.game.combatSystem) {
                this.game.combatSystem.attack();
            }
        });
        
        // Sprint button (hold)
        const sprintBtn = this.createButton('🏃', 'sprint', null, true);
        sprintBtn.addEventListener('touchstart', () => {
            if (this.game.player) this.game.player.isRunning = true;
            sprintBtn.style.background = 'rgba(255, 0, 255, 0.8)';
        });
        sprintBtn.addEventListener('touchend', () => {
            if (this.game.player) this.game.player.isRunning = false;
            sprintBtn.style.background = 'rgba(0, 0, 0, 0.7)';
        });
        
        buttonContainer.appendChild(jumpBtn);
        enterBtn.title = 'Interact';
        buttonContainer.appendChild(enterBtn);
        buttonContainer.appendChild(attackBtn);
        buttonContainer.appendChild(sprintBtn);
        
        document.body.appendChild(buttonContainer);
    }
    
    createButton(emoji, id, onClick, isHold = false) {
        const btn = document.createElement('button');
        btn.id = `mobile-btn-${id}`;
        btn.textContent = emoji;
        btn.style.cssText = `
            width: 60px;
            height: 60px;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            font-size: 24px;
            color: white;
            cursor: pointer;
            touch-action: manipulation;
            user-select: none;
            -webkit-user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        if (onClick) {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                onClick();
                btn.style.background = 'rgba(0, 255, 255, 0.5)';
            });
            btn.addEventListener('touchend', () => {
                btn.style.background = 'rgba(0, 0, 0, 0.7)';
            });
        }
        
        return btn;
    }
    
    createWeaponWheel() {
        // Weapon selection wheel
        this.weaponWheel = document.createElement('div');
        this.weaponWheel.id = 'mobile-weapon-wheel';
        this.weaponWheel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid rgba(255, 0, 255, 0.5);
            border-radius: 50%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            touch-action: manipulation;
        `;
        this.weaponWheel.textContent = '⚔️';
        this.weaponWheel.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.game.combatSystem) {
                this.game.combatSystem.cycleWeapon(1);
            }
        });
        document.body.appendChild(this.weaponWheel);
    }
    
    setupTouchEvents() {
        // Joystick touch handling
        let joystickTouch = null;
        const joystickRect = this.joystick.getBoundingClientRect();
        const centerX = joystickRect.left + joystickRect.width / 2;
        const centerY = joystickRect.top + joystickRect.height / 2;
        const maxDist = 40;
        
        this.joystick.addEventListener('touchstart', (e) => {
            e.preventDefault();
            joystickTouch = e.touches[0];
            this.joystickActive = true;
        });
        
        this.joystick.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!joystickTouch) return;
            
            const touch = e.touches[0];
            const dx = touch.clientX - centerX;
            const dy = touch.clientY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const clampedDist = Math.min(dist, maxDist);
            const angle = Math.atan2(dy, dx);
            
            const knobX = Math.cos(angle) * clampedDist;
            const knobY = Math.sin(angle) * clampedDist;
            
            this.joystickKnob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;
            
            // Normalize input (-1 to 1)
            this.joystickInput.x = (knobX / maxDist);
            this.joystickInput.y = (knobY / maxDist);
        });
        
        this.joystick.addEventListener('touchend', (e) => {
            e.preventDefault();
            joystickTouch = null;
            this.joystickActive = false;
            this.joystickInput = { x: 0, y: 0 };
            this.joystickKnob.style.transform = 'translate(-50%, -50%)';
        });
    }
    
    update(delta) {
        if (!this.isMobile || !this.game.player) return;
        
        const player = this.game.player;
        const driving = player.isInVehicle;
        if (this.drivingPad) this.drivingPad.style.display = driving ? 'grid' : 'none';
        if (driving) {
            this.game.actionInput?.setTouchDriving({
                throttle: this.drivingButtons.throttle ? 1 : 0,
                brake: this.drivingButtons.brake ? 1 : 0,
                steer: (this.drivingButtons.right ? 1 : 0) - (this.drivingButtons.left ? 1 : 0),
                handbrake: Boolean(this.drivingButtons.handbrake)
            });
            return;
        }
        this.game.actionInput?.setTouchDriving({ throttle: 0, brake: 0, steer: 0, handbrake: false });
        // Apply joystick input to on-foot movement.
        if (this.joystickActive) {
            const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, player.rotation.y, 0));
            const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, player.rotation.y, 0));
            const moveDir = new THREE.Vector3();
            moveDir.addScaledVector(forward, -this.joystickInput.y);
            moveDir.addScaledVector(right, this.joystickInput.x);
            const speed = player.isRunning ? player.runSpeed : player.walkSpeed;
            player.velocity.x = moveDir.x * speed;
            player.velocity.z = moveDir.z * speed;
        }
    }
    
    // Quick action buttons for AI features
    createAIButtons() {
        const aiContainer = document.createElement('div');
        aiContainer.id = 'mobile-ai-buttons';
        aiContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 1000;
        `;
        
        const aiBtn = this.createSmallButton('🤖', 'AI Chat', () => {
            if (this.game.aiChatUI) this.game.aiChatUI.toggle();
        });
        
        const missionBtn = this.createSmallButton('🎯', 'Mission', () => {
            if (this.game.generateQuickMission) this.game.generateQuickMission();
        });
        
        const radioBtn = this.createSmallButton('📻', 'Radio', () => {
            if (this.game.toggleRadio) this.game.toggleRadio();
        });
        
        const saveBtn = this.createSmallButton('💾', 'Save', () => {
            if (this.game.saveSystem) this.game.saveSystem.save();
        });
        
        aiContainer.appendChild(aiBtn);
        aiContainer.appendChild(missionBtn);
        aiContainer.appendChild(radioBtn);
        aiContainer.appendChild(saveBtn);
        
        document.body.appendChild(aiContainer);
    }
    
    createSmallButton(emoji, label, onClick) {
        const btn = document.createElement('button');
        btn.style.cssText = `
            width: 45px;
            height: 45px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(0, 255, 255, 0.5);
            border-radius: 8px;
            font-size: 18px;
            color: white;
            cursor: pointer;
            touch-action: manipulation;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        btn.textContent = emoji;
        btn.title = label;
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            onClick();
            btn.style.background = 'rgba(0, 255, 255, 0.5)';
        });
        btn.addEventListener('touchend', () => {
            btn.style.background = 'rgba(0, 0, 0, 0.7)';
        });
        return btn;
    }
    
    // Mobile-specific UI elements
    createMobileHUD() {
        const hud = document.createElement('div');
        hud.id = 'mobile-hud';
        hud.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 1000;
            pointer-events: none;
        `;
        
        // Health bar
        const healthBar = document.createElement('div');
        healthBar.id = 'mobile-health';
        healthBar.style.cssText = `
            width: 100px;
            height: 12px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid #ff0000;
            border-radius: 6px;
            overflow: hidden;
        `;
        healthBar.innerHTML = '<div style="height: 100%; background: #ff0000; width: 100%;"></div>';
        
        // Armor bar
        const armorBar = document.createElement('div');
        armorBar.id = 'mobile-armor';
        armorBar.style.cssText = `
            width: 100px;
            height: 12px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid #0000ff;
            border-radius: 6px;
            overflow: hidden;
        `;
        armorBar.innerHTML = '<div style="height: 100%; background: #0000ff; width: 0%;"></div>';
        
        // Wanted stars
        const wanted = document.createElement('div');
        wanted.id = 'mobile-wanted';
        wanted.style.cssText = `
            display: flex;
            gap: 2px;
        `;
        
        hud.appendChild(healthBar);
        hud.appendChild(armorBar);
        hud.appendChild(wanted);
        
        document.body.appendChild(hud);
    }
    
    updateHUD() {
        if (!this.game.player) return;
        
        const healthFill = document.querySelector('#mobile-health > div');
        const armorFill = document.querySelector('#mobile-armor > div');
        
        if (healthFill) {
            healthFill.style.width = `${this.game.player.health}%`;
        }
        if (armorFill) {
            armorFill.style.width = `${this.game.player.armor}%`;
        }
    }
}

// Export for use in game
export function isMobileDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
