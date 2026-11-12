import * as THREE from 'three';
/**
 * Mobile GTA-Style Controls for Singapore Streets
 * Touch-based controls optimized for mobile gameplay
 * Enhanced with FrostFrontend-style settings and Skull-Kid persistent joystick
 */

export class MobileGTAControls {
    constructor(game) {
        this.game = game;
        this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this._settings = this.loadSettings();
        this._editingPosition = false;

        if (this.isMobile) {
            this.setupMobileControls();
        }
    }

    loadSettings() {
        try {
            return JSON.parse(localStorage.getItem('sg-touch') || '{}');
        } catch {
            return {};
        }
    }

    saveSettings() {
        localStorage.setItem('sg-touch', JSON.stringify(this._settings));
    }

    updateSettings(settings) {
        Object.assign(this._settings, settings);
        this.saveSettings();
        this.applySettings();
    }

    applySettings() {
        if (this.joystick) {
            const size = this._settings.joystickSize || 120;
            const opacity = this._settings.joystickOpacity ?? 0.5;
            const pos = this._settings.joystickPos || { x: 30, y: 30 };
            const mirror = this._settings.mirrorMode || false;

            this.joystick.style.width = `${size}px`;
            this.joystick.style.height = `${size}px`;
            this.joystick.style.background = `rgba(0, 0, 0, ${opacity})`;
            this.joystick.style.left = `${pos.x}px`;
            this.joystick.style.bottom = `${pos.y}px`;

            if (mirror) {
                this.joystick.style.left = 'auto';
                this.joystick.style.right = `${pos.x}px`;
            }
        }

        if (this.actionButtons) {
            const scale = this._settings.buttonScale || 1.0;
            const opacity = this._settings.buttonOpacity ?? 0.7;
            this.actionButtons.forEach(btn => {
                btn.style.width = `${60 * scale}px`;
                btn.style.height = `${60 * scale}px`;
                btn.style.background = `rgba(0, 0, 0, ${opacity})`;
            });
        }

        if (this.drivingPad) {
            const scale = this._settings.buttonScale || 1.0;
            const opacity = this._settings.buttonOpacity ?? 0.7;
            this.drivingPad.querySelectorAll('button').forEach(btn => {
                btn.style.width = `${58 * scale}px`;
                btn.style.height = `${58 * scale}px`;
                btn.style.background = `rgba(0, 0, 0, ${opacity})`;
            });
        }
    }

    setMirrorMode(mirror) {
        this._settings.mirrorMode = mirror;
        this.saveSettings();
        this.applySettings();
        if (this.actionButtons) {
            if (mirror) {
                this.actionButtons.style.left = '30px';
                this.actionButtons.style.right = 'auto';
            } else {
                this.actionButtons.style.left = 'auto';
                this.actionButtons.style.right = '30px';
            }
        }
    }

    enablePositionEdit(enabled) {
        this._editingPosition = enabled;
        if (enabled) {
            this.joystick.style.borderColor = '#ff00ff';
            this.joystick.style.borderWidth = '3px';
            this.setupDrag(this.joystick, 'joystick');
            if (this.actionButtons) {
                this.actionButtons.style.border = '2px dashed #ff00ff';
            }
        } else {
            this.joystick.style.borderColor = 'rgba(0, 255, 255, 0.5)';
            this.joystick.style.borderWidth = '2px';
        }
    }

    disablePositionEdit(save) {
        this._editingPosition = false;
        this.joystick.style.borderColor = 'rgba(0, 255, 255, 0.5)';
        this.joystick.style.borderWidth = '2px';
        if (save) {
            const pos = {
                x: parseInt(this.joystick.style.left) || 30,
                y: parseInt(this.joystick.style.bottom) || 30
            };
            this._settings.joystickPos = pos;
            this.saveSettings();
            return { joystick: pos, layout: this._settings };
        }
        return null;
    }

    setupDrag(element, id) {
        let startX, startY, initialLeft, initialBottom;
        const handleStart = (e) => {
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            startX = touch.clientX;
            startY = touch.clientY;
            initialLeft = parseInt(element.style.left) || 30;
            initialBottom = parseInt(element.style.bottom) || 30;
        };
        const handleMove = (e) => {
            if (!this._editingPosition) return;
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;
            element.style.left = `${initialLeft + dx}px`;
            element.style.bottom = `${initialBottom - dy}px`;
        };
        element.addEventListener('touchstart', handleStart, { passive: false });
        element.addEventListener('touchmove', handleMove, { passive: false });
        element.addEventListener('touchend', () => { startX = startY = initialLeft = initialBottom = 0; });
        element.addEventListener('mousedown', handleStart, { passive: false });
        document.addEventListener('mousemove', handleMove, { passive: false });
        document.addEventListener('mouseup', () => { startX = startY = initialLeft = initialBottom = 0; });
    }

    setupMobileControls() {
        this.createJoystick();
        this.createDrivingControls();
        this.createActionButtons();
        this.createWeaponWheel();
        this.createCameraControl();
        this.createSettingsButton();
        this.setupTouchEvents();
        this.applySettings();
    }

    createJoystick() {
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
        this.actionButtons = document.createElement('div');
        this.actionButtons.id = 'mobile-action-buttons';
        this.actionButtons.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        `;

        const jumpBtn = this.createButton('⬆️', 'jump', () => {
            if (this.game.player && this.game.player.onGround) {
                this.game.player.jump();
            }
        });

        const enterBtn = this.createButton('✋', 'interact', () => {
            this.game.interactionSystem?.interact();
        });

        const attackBtn = this.createButton('⚔️', 'attack', () => {
            if (this.game.combatSystem) {
                this.game.combatSystem.attack();
            }
        });

        const sprintBtn = this.createButton('🏃', 'sprint', null, true);
        sprintBtn.addEventListener('touchstart', () => {
            if (this.game.player) this.game.player.isRunning = true;
            sprintBtn.style.background = 'rgba(255, 0, 255, 0.8)';
        });
        sprintBtn.addEventListener('touchend', () => {
            if (this.game.player) this.game.player.isRunning = false;
            sprintBtn.style.background = 'rgba(0, 0, 0, 0.7)';
        });

        this.actionButtons.appendChild(jumpBtn);
        enterBtn.title = 'Interact';
        this.actionButtons.appendChild(enterBtn);
        this.actionButtons.appendChild(attackBtn);
        this.actionButtons.appendChild(sprintBtn);

        document.body.appendChild(this.actionButtons);
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

    createSettingsButton() {
        this.settingsButton = document.createElement('button');
        this.settingsButton.id = 'mobile-settings-btn';
        this.settingsButton.textContent = '⚙️';
        this.settingsButton.title = 'Settings';
        this.settingsButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 70px;
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            cursor: pointer;
            touch-action: manipulation;
        `;
        this.settingsButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.game.settingsOverlay) {
                this.game.settingsOverlay.toggle();
            }
        });
        document.body.appendChild(this.settingsButton);
    }

    setupTouchEvents() {
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

        const healthBar = document.createElement('div');
        healthBar.id = 'mobile-health';
        healthBar.style.cssText = `
            width: 100px;
            height: 12px;
            background: rgba(0,0,0,0.6);
            border: 1px solid #00ffff;
            border-radius: 6px;
            overflow: hidden;
        `;
        const healthFill = document.createElement('div');
        healthFill.id = 'mobile-health-fill';
        healthFill.style.cssText = 'width:100%;height:100%;background:#00ff00;transition:width .2s;';
        healthBar.appendChild(healthFill);
        hud.appendChild(healthBar);
        document.body.appendChild(hud);
    }
}

export function isMobileDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}