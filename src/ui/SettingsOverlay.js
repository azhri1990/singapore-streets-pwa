/**
 * SettingsOverlay.js — 5-tab settings menu inspired by FrostFrontend
 * Tabs: Graphics, Sound, Controls, Touch, Updates
 * Uses localStorage for persistence, integrates with mobile systems
 */
export class SettingsOverlay {
    constructor(game) {
        this.game = game;
        this.isOpen = false;
        this.activeTab = 'graphics';
        this.tabs = ['graphics', 'sound', 'controls', 'touch', 'updates'];
        this.settings = this.load();
        this.touchLayout = this.loadTouchLayout();
        this.createUI();
        this.bindKeys();
    }

    load() {
        try {
            return {
                graphics: { quality: 'high', renderScale: 1.0, shadows: true, particles: true, fpsCap: 60, vsync: true, ...JSON.parse(localStorage.getItem('sg-graphics') || '{}') },
                sound: { master: 0.8, music: 0.7, sfx: 0.8, voice: 0.9, speakerTest: false, ...JSON.parse(localStorage.getItem('sg-sound') || '{}') },
                controls: { gamepad: true, gamepadDeadzone: 0.15, invertY: false, vibration: true, keyboardRemap: {}, ...JSON.parse(localStorage.getItem('sg-controls') || '{}') },
                touch: { joystickPos: { x: 30, y: 30 }, joystickSize: 120, joystickOpacity: 0.5, mirrorMode: false, buttonScale: 1.0, buttonOpacity: 0.7, ...JSON.parse(localStorage.getItem('sg-touch') || '{}') },
                updates: { autoCheck: true, lastCheck: 0, channel: 'stable', ...JSON.parse(localStorage.getItem('sg-updates') || '{}') }
            };
        } catch {
            return {
                graphics: { quality: 'high', renderScale: 1.0, shadows: true, particles: true, fpsCap: 60, vsync: true },
                sound: { master: 0.8, music: 0.7, sfx: 0.8, voice: 0.9, speakerTest: false },
                controls: { gamepad: true, gamepadDeadzone: 0.15, invertY: false, vibration: true, keyboardRemap: {} },
                touch: { joystickPos: { x: 30, y: 30 }, joystickSize: 120, joystickOpacity: 0.5, mirrorMode: false, buttonScale: 1.0, buttonOpacity: 0.7 },
                updates: { autoCheck: true, lastCheck: 0, channel: 'stable' }
            };
        }
    }

    loadTouchLayout() {
        try {
            return JSON.parse(localStorage.getItem('sg-touch-layout') || '{}');
        } catch {
            return {};
        }
    }

    save() {
        localStorage.setItem('sg-graphics', JSON.stringify(this.settings.graphics));
        localStorage.setItem('sg-sound', JSON.stringify(this.settings.sound));
        localStorage.setItem('sg-controls', JSON.stringify(this.settings.controls));
        localStorage.setItem('sg-touch', JSON.stringify(this.settings.touch));
        localStorage.setItem('sg-updates', JSON.stringify(this.settings.updates));
        this.applyAll();
    }

    applyAll() {
        this.applyGraphics();
        this.applySound();
        this.applyControls();
        this.applyTouch();
    }

    applyGraphics() {
        const g = this.settings.graphics;
        if (this.game.renderer) {
            this.game.renderer.setPixelRatio(Math.min(window.devicePixelRatio, g.renderScale));
        }
        if (this.game.setGraphicsQuality) this.game.setGraphicsQuality(g.quality);
        if (this.game.setRenderScale) this.game.setRenderScale(g.renderScale);
        if (this.game.mobileOptimization) {
            this.game.mobileOptimization.applyBatteryScaling(g.renderScale, g.quality);
        }
    }

    applySound() {
        const s = this.settings.sound;
        if (this.game.audioManager) {
            this.game.audioManager.setMasterVolume(s.master);
            this.game.audioManager.setMusicVolume(s.music);
            this.game.audioManager.setSFXVolume(s.sfx);
            this.game.audioManager.setVoiceVolume(s.voice);
        }
        if (s.speakerTest) this.runSpeakerTest();
    }

    applyControls() {
        const c = this.settings.controls;
        if (this.game.controllerSupport) {
            this.game.controllerSupport.deadzone = c.gamepadDeadzone;
            this.game.controllerSupport.enabled = c.gamepad;
            this.game.controllerSupport.vibration = c.vibration;
        }
    }

    applyTouch() {
        const t = this.settings.touch;
        if (this.game.mobileGTAControls) {
            this.game.mobileGTAControls.updateTouchSettings(t);
        }
        if (this.game.mobileTouchSystem) {
            this.game.mobileTouchSystem.updateSettings(t);
        }
    }

    runSpeakerTest() {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const playTone = (freq, pan, delay) => {
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const panner = ctx.createStereoPanner();
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.value = 0.1;
                panner.pan.value = pan;
                osc.connect(gain).connect(panner).connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            }, delay);
        };
        playTone(440, -1, 0);       // Left
        playTone(440, 1, 600);      // Right
        playTone(440, 0, 1200);     // Both
    }

    createUI() {
        this.container = document.createElement('div');
        this.container.id = 'settings-overlay';
        this.container.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 20000;
            display: none;
            background: rgba(0, 0, 0, 0.95);
            font-family: 'Arial', sans-serif;
            color: #fff;
            overflow: auto;
        `;

        this.container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; padding: 20px;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 2px solid #00ffff; margin-bottom: 20px;">
                    <h1 style="margin: 0; font-size: 28px; color: #00ffff;">SETTINGS</h1>
                    <button id="settings-close" style="width: 48px; height: 48px; border: 0; border-radius: 8px; background: rgba(255,0,0,0.3); color: #fff; font-size: 24px; cursor: pointer; touch-action: manipulation;">✕</button>
                </div>

                <!-- Tab Bar -->
                <div id="settings-tabs" style="display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 8px; flex-wrap: wrap;">
                    ${this.tabs.map(tab => `
                        <button class="settings-tab" data-tab="${tab}" style="
                            flex: 1; min-width: 120px; padding: 12px 16px;
                            border: 0; border-radius: 8px 8px 0 0;
                            background: ${tab === this.activeTab ? '#00ffff' : 'rgba(255,255,255,0.1)'};
                            color: ${tab === this.activeTab ? '#000' : '#fff'};
                            font-weight: bold; font-size: 14px;
                            cursor: pointer; touch-action: manipulation;
                        ">${tab.toUpperCase()}</button>
                    `).join('')}
                </div>

                <!-- Tab Panels -->
                <div id="settings-panels">
                    ${this.renderGraphicsTab()}
                    ${this.renderSoundTab()}
                    ${this.renderControlsTab()}
                    ${this.renderTouchTab()}
                    ${this.renderUpdatesTab()}
                </div>

                <!-- Footer -->
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #333; display: flex; gap: 12px; justify-content: flex-end;">
                    <button id="settings-reset" style="padding: 12px 24px; border: 1px solid #666; border-radius: 8px; background: transparent; color: #fff; cursor: pointer; touch-action: manipulation;">Reset to Defaults</button>
                    <button id="settings-save" style="padding: 12px 24px; border: 0; border-radius: 8px; background: #00ffff; color: #000; font-weight: bold; cursor: pointer; touch-action: manipulation;">Save & Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.container);
        this.bindEvents();
    }

    renderGraphicsTab() {
        const g = this.settings.graphics;
        return `
            <div class="settings-panel" data-panel="graphics" style="${this.activeTab === 'graphics' ? '' : 'display:none'}">
                <h2 style="color: #00ffff; margin-bottom: 16px;">Graphics</h2>
                <div style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Quality Preset</label>
                        <select id="gfx-quality" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #444; background: rgba(0,0,0,0.5); color: #fff;">
                            <option value="low" ${g.quality === 'low' ? 'selected' : ''}>Low</option>
                            <option value="medium" ${g.quality === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="high" ${g.quality === 'high' ? 'selected' : ''}>High</option>
                            <option value="ultra" ${g.quality === 'ultra' ? 'selected' : ''}>Ultra</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Render Scale <span id="gfx-render-value">${g.renderScale.toFixed(2)}×</span></label>
                        <input type="range" id="gfx-render" min="0.5" max="1.5" step="0.05" value="${g.renderScale}" style="width: 100%;">
                    </div>
                    <div>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="gfx-shadows" ${g.shadows ? 'checked' : ''} style="width: 20px; height: 20px;">
                            <span>Shadows</span>
                        </label>
                    </div>
                    <div>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="gfx-particles" ${g.particles ? 'checked' : ''} style="width: 20px; height: 20px;">
                            <span>Particles & Effects</span>
                        </label>
                    </div>
                    <div>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="gfx-vsync" ${g.vsync ? 'checked' : ''} style="width: 20px; height: 20px;">
                            <span>V-Sync</span>
                        </label>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">FPS Cap <span id="gfx-fps-value">${g.fpsCap}</span></label>
                        <input type="range" id="gfx-fps" min="30" max="120" step="1" value="${g.fpsCap}" style="width: 100%;" list="fps-ticks">
                        <datalist id="fps-ticks">
                            <option value="30"><option value="60"><option value="90"><option value="120">
                        </datalist>
                    </div>
                    <div style="grid-column: 1/-1; padding: 12px; background: rgba(0,255,255,0.1); border-radius: 8px; border: 1px solid #00ffff;">
                        <strong>GPU Info:</strong>
                        <span id="gfx-gpu-info">Detecting...</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderSoundTab() {
        const s = this.settings.sound;
        return `
            <div class="settings-panel" data-panel="sound" style="${this.activeTab === 'sound' ? '' : 'display:none'}">
                <h2 style="color: #00ffff; margin-bottom: 16px;">Sound</h2>
                <div style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Master Volume <span id="snd-master-value">${Math.round(s.master * 100)}%</span></label>
                        <input type="range" id="snd-master" min="0" max="1" step="0.05" value="${s.master}" style="width: 100%;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Music Volume <span id="snd-music-value">${Math.round(s.music * 100)}%</span></label>
                        <input type="range" id="snd-music" min="0" max="1" step="0.05" value="${s.music}" style="width: 100%;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">SFX Volume <span id="snd-sfx-value">${Math.round(s.sfx * 100)}%</span></label>
                        <input type="range" id="snd-sfx" min="0" max="1" step="0.05" value="${s.sfx}" style="width: 100%;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Voice Volume <span id="snd-voice-value">${Math.round(s.voice * 100)}%</span></label>
                        <input type="range" id="snd-voice" min="0" max="1" step="0.05" value="${s.voice}" style="width: 100%;">
                    </div>
                    <div style="grid-column: 1/-1;">
                        <h3 style="color: #ffaa00; margin: 16px 0 8px;">Speaker Test</h3>
                        <p style="color: #aaa; margin-bottom: 12px;">Test stereo output. Each tone plays for 0.5s.</p>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <button id="snd-test-left" style="flex: 1; min-width: 120px; padding: 12px; border: 0; border-radius: 8px; background: #0066cc; color: #fff; font-weight: bold; cursor: pointer; touch-action: manipulation;">Left Speaker</button>
                            <button id="snd-test-right" style="flex: 1; min-width: 120px; padding: 12px; border: 0; border-radius: 8px; background: #cc0066; color: #fff; font-weight: bold; cursor: pointer; touch-action: manipulation;">Right Speaker</button>
                            <button id="snd-test-both" style="flex: 1; min-width: 120px; padding: 12px; border: 0; border-radius: 8px; background: #6600cc; color: #fff; font-weight: bold; cursor: pointer; touch-action: manipulation;">Both Speakers</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderControlsTab() {
        const c = this.settings.controls;
        return `
            <div class="settings-panel" data-panel="controls" style="${this.activeTab === 'controls' ? '' : 'display:none'}">
                <h2 style="color: #00ffff; margin-bottom: 16px;">Controls</h2>
                <div style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                    <div>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="ctrl-gamepad" ${c.gamepad ? 'checked' : ''} style="width: 20px; height: 20px;">
                            <span>Enable Gamepad</span>
                        </label>
                    </div>
                    <div>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="ctrl-vibration" ${c.vibration ? 'checked' : ''} style="width: 20px; height: 20px;">
                            <span>Controller Vibration</span>
                        </label>
                    </div>
                    <div>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="ctrl-invertY" ${c.invertY ? 'checked' : ''} style="width: 20px; height: 20px;">
                            <span>Invert Y Axis (Camera)</span>
                        </label>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Gamepad Deadzone <span id="ctrl-dz-value">${(c.gamepadDeadzone * 100).toFixed(0)}%</span></label>
                        <input type="range" id="ctrl-deadzone" min="0.05" max="0.3" step="0.01" value="${c.gamepadDeadzone}" style="width: 100%;">
                    </div>
                    <div style="grid-column: 1/-1;">
                        <h3 style="color: #ffaa00; margin: 16px 0 8px;">Button Remapping</h3>
                        <p style="color: #aaa; margin-bottom: 12px;">Click a button to remap. Press Escape to cancel.</p>
                        <div id="ctrl-remap-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px;">
                            ${Object.entries({
                                'A / Cross': 'action', 'B / Circle': 'exit', 'X / Square': 'attack', 'Y / Triangle': 'mission',
                                'L1 / LB': 'aim', 'R1 / RB': 'sprint', 'L2 / LT': 'brake', 'R2 / RT': 'throttle',
                                'L3': 'crouch', 'R3': 'cameraReset', 'Start / Options': 'pause', 'Select / Share': 'menu',
                                'D-Pad Up': 'chat', 'D-Pad Down': 'radio', 'D-Pad Left': 'customize', 'D-Pad Right': 'property'
                            }).map(([label, action]) => `
                                <button class="remap-btn" data-action="${action}" style="padding: 10px; border: 1px solid #444; border-radius: 6px; background: rgba(255,255,255,0.05); color: #fff; cursor: pointer; touch-action: manipulation; text-align: left;">
                                    <span style="color: #00ffff;">${label}:</span> <span class="remap-value">${c.keyboardRemap[action] || 'default'}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <div style="grid-column: 1/-1; padding: 12px; background: rgba(255,170,0,0.1); border-radius: 8px; border: 1px solid #ffaa00;">
                        <strong>Connected:</strong> <span id="ctrl-gamepad-status" style="color: ${this.game?.controllerSupport?.connected ? '#0f0' : '#f44'}">${this.game?.controllerSupport?.connected ? 'Gamepad Connected' : 'No Gamepad'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderTouchTab() {
        const t = this.settings.touch;
        return `
            <div class="settings-panel" data-panel="touch" style="${this.activeTab === 'touch' ? '' : 'display:none'}">
                <h2 style="color: #00ffff; margin-bottom: 16px;">Touch Controls</h2>
                <div style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Joystick Size <span id="touch-joy-size-value">${t.joystickSize}px</span></label>
                        <input type="range" id="touch-joy-size" min="80" max="200" step="10" value="${t.joystickSize}" style="width: 100%;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Joystick Opacity <span id="touch-joy-op-value">${(t.joystickOpacity * 100).toFixed(0)}%</span></label>
                        <input type="range" id="touch-joy-op" min="0.2" max="1" step="0.05" value="${t.joystickOpacity}" style="width: 100%;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Button Scale <span id="touch-btn-scale-value">${t.buttonScale.toFixed(2)}×</span></label>
                        <input type="range" id="touch-btn-scale" min="0.7" max="1.5" step="0.05" value="${t.buttonScale}" style="width: 100%;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Button Opacity <span id="touch-btn-op-value">${(t.buttonOpacity * 100).toFixed(0)}%</span></label>
                        <input type="range" id="touch-btn-op" min="0.3" max="1" step="0.05" value="${t.buttonOpacity}" style="width: 100%;">
                    </div>
                    <div>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="touch-mirror" ${t.mirrorMode ? 'checked' : ''} style="width: 20px; height: 20px;">
                            <span>Mirror Mode (Left-handed)</span>
                        </label>
                    </div>
                    <div style="grid-column: 1/-1;">
                        <h3 style="color: #ffaa00; margin: 16px 0 8px;">Position Editor</h3>
                        <p style="color: #aaa; margin-bottom: 12px;">Drag controls to reposition. Tap Save Positions when done.</p>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <button id="touch-edit-pos" style="flex: 1; min-width: 140px; padding: 12px; border: 0; border-radius: 8px; background: #0066cc; color: #fff; font-weight: bold; cursor: pointer; touch-action: manipulation;">Edit Positions</button>
                            <button id="touch-save-pos" style="flex: 1; min-width: 140px; padding: 12px; border: 0; border-radius: 8px; background: #00cc66; color: #000; font-weight: bold; cursor: pointer; touch-action: manipulation; display: none;">Save Positions</button>
                            <button id="touch-reset-pos" style="flex: 1; min-width: 140px; padding: 12px; border: 0; border-radius: 8px; background: #cc0000; color: #fff; font-weight: bold; cursor: pointer; touch-action: manipulation;">Reset Positions</button>
                        </div>
                    </div>
                    <div style="grid-column: 1/-1; padding: 12px; background: rgba(0,255,255,0.1); border-radius: 8px; border: 1px solid #00ffff;">
                        <strong>Touch Target Minimum:</strong> 48×48px (enforced by MobileUISystem)
                    </div>
                </div>
            </div>
        `;
    }

    renderUpdatesTab() {
        const u = this.settings.updates;
        return `
            <div class="settings-panel" data-panel="updates" style="${this.activeTab === 'updates' ? '' : 'display:none'}">
                <h2 style="color: #00ffff; margin-bottom: 16px;">Updates</h2>
                <div style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                    <div>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="upd-auto" ${u.autoCheck ? 'checked' : ''} style="width: 20px; height: 20px;">
                            <span>Auto-check for updates</span>
                        </label>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px;">Update Channel</label>
                        <select id="upd-channel" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #444; background: rgba(0,0,0,0.5); color: #fff;">
                            <option value="stable" ${u.channel === 'stable' ? 'selected' : ''}>Stable</option>
                            <option value="beta" ${u.channel === 'beta' ? 'selected' : ''}>Beta</option>
                            <option value="nightly" ${u.channel === 'nightly' ? 'selected' : ''}>Nightly</option>
                        </select>
                    </div>
                    <div style="grid-column: 1/-1;">
                        <h3 style="color: #ffaa00; margin: 16px 0 8px;">Manual Check</h3>
                        <p style="color: #aaa; margin-bottom: 12px;">Checks GitHub releases for new versions.</p>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <button id="upd-check" style="flex: 1; min-width: 160px; padding: 14px; border: 0; border-radius: 8px; background: #00ffff; color: #000; font-weight: bold; cursor: pointer; touch-action: manipulation;">Check for Updates</button>
                        </div>
                        <div id="upd-result" style="margin-top: 12px; min-height: 24px; color: #0f0;"></div>
                    </div>
                    <div style="grid-column: 1/-1;">
                        <h3 style="color: #ffaa00; margin: 16px 0 8px;">Version Info</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; font-family: monospace; font-size: 13px;">
                            <div><span style="color: #888;">Current:</span> <span id="upd-current">1.0.0</span></div>
                            <div><span style="color: #888;">Build:</span> <span id="upd-build">Development</span></div>
                            <div><span style="color: #888;">Last Check:</span> <span id="upd-last">${u.lastCheck ? new Date(u.lastCheck).toLocaleString() : 'Never'}</span></div>
                            <div><span style="color: #888;">Channel:</span> <span id="upd-ch-display">${u.channel}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Close button
        this.container.querySelector('#settings-close').onclick = () => this.close();

        // Tab switching
        this.container.querySelectorAll('.settings-tab').forEach(btn => {
            btn.onclick = () => this.switchTab(btn.dataset.tab);
        });

        // Save/Reset
        this.container.querySelector('#settings-save').onclick = () => { this.save(); this.close(); };
        this.container.querySelector('#settings-reset').onclick = () => this.resetToDefaults();

        // Graphics tab
        this.bindGraphicsEvents();
        // Sound tab
        this.bindSoundEvents();
        // Controls tab
        this.bindControlsEvents();
        // Touch tab
        this.bindTouchEvents();
        // Updates tab
        this.bindUpdatesEvents();
    }

    bindGraphicsEvents() {
        const g = this.settings.graphics;
        const update = (key, val) => { g[key] = val; this.save(); this.applyGraphics(); };

        this.container.querySelector('#gfx-quality').onchange = e => update('quality', e.target.value);
        this.container.querySelector('#gfx-render').oninput = e => {
            const v = parseFloat(e.target.value);
            update('renderScale', v);
            this.container.querySelector('#gfx-render-value').textContent = v.toFixed(2) + '×';
        };
        this.container.querySelector('#gfx-shadows').onchange = e => update('shadows', e.target.checked);
        this.container.querySelector('#gfx-particles').onchange = e => update('particles', e.target.checked);
        this.container.querySelector('#gfx-vsync').onchange = e => update('vsync', e.target.checked);
        this.container.querySelector('#gfx-fps').oninput = e => {
            const v = parseInt(e.target.value);
            update('fpsCap', v);
            this.container.querySelector('#gfx-fps-value').textContent = v;
        };

        // GPU info
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
            this.container.querySelector('#gfx-gpu-info').textContent = renderer;
        }
    }

    bindSoundEvents() {
        const s = this.settings.sound;
        const update = (key, val) => { s[key] = val; this.save(); this.applySound(); };

        ['master', 'music', 'sfx', 'voice'].forEach(k => {
            const el = this.container.querySelector(`#snd-${k}`);
            if (el) {
                el.oninput = e => {
                    const v = parseFloat(e.target.value);
                    update(k, v);
                    this.container.querySelector(`#snd-${k}-value`).textContent = Math.round(v * 100) + '%';
                };
            }
        });

        this.container.querySelector('#snd-test-left').onclick = () => this.playTestTone(-1);
        this.container.querySelector('#snd-test-right').onclick = () => this.playTestTone(1);
        this.container.querySelector('#snd-test-both').onclick = () => this.playTestTone(0);
    }

    playTestTone(pan) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const panner = ctx.createStereoPanner();
        osc.frequency.value = 440;
        osc.type = 'sine';
        gain.gain.value = 0.15;
        panner.pan.value = pan;
        osc.connect(gain).connect(panner).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    }

    bindControlsEvents() {
        const c = this.settings.controls;
        const update = (key, val) => { c[key] = val; this.save(); this.applyControls(); };

        this.container.querySelector('#ctrl-gamepad').onchange = e => update('gamepad', e.target.checked);
        this.container.querySelector('#ctrl-vibration').onchange = e => update('vibration', e.target.checked);
        this.container.querySelector('#ctrl-invertY').onchange = e => update('invertY', e.target.checked);
        this.container.querySelector('#ctrl-deadzone').oninput = e => {
            const v = parseFloat(e.target.value);
            update('gamepadDeadzone', v);
            this.container.querySelector('#ctrl-dz-value').textContent = (v * 100).toFixed(0) + '%';
        };

        // Remap buttons
        this.container.querySelectorAll('.remap-btn').forEach(btn => {
            btn.onclick = () => this.startRemap(btn.dataset.action, btn);
        });

        // Update gamepad status
        if (this.game.controllerSupport) {
            const status = this.container.querySelector('#ctrl-gamepad-status');
            setInterval(() => {
                if (status) {
                    status.textContent = this.game.controllerSupport.connected ? 'Gamepad Connected' : 'No Gamepad';
                    status.style.color = this.game.controllerSupport.connected ? '#0f0' : '#f44';
                }
            }, 1000);
        }
    }

    startRemap(action, btnEl) {
        btnEl.textContent = 'Press a key...';
        btnEl.style.background = '#cc6600';

        const handler = (e) => {
            e.preventDefault();
            const key = e.code || e.key;
            this.settings.controls.keyboardRemap[action] = key;
            btnEl.querySelector('.remap-value').textContent = key;
            btnEl.textContent = `${action}: ${key}`;
            btnEl.style.background = '';
            document.removeEventListener('keydown', handler);
            this.save();
        };

        document.addEventListener('keydown', handler);
        // Timeout after 5s
        setTimeout(() => {
            document.removeEventListener('keydown', handler);
            btnEl.textContent = `${action}: ${this.settings.controls.keyboardRemap[action] || 'default'}`;
            btnEl.style.background = '';
        }, 5000);
    }

    bindTouchEvents() {
        const t = this.settings.touch;
        const update = (key, val) => { t[key] = val; this.save(); this.applyTouch(); };

        this.container.querySelector('#touch-joy-size').oninput = e => {
            const v = parseInt(e.target.value);
            update('joystickSize', v);
            this.container.querySelector('#touch-joy-size-value').textContent = v + 'px';
        };
        this.container.querySelector('#touch-joy-op').oninput = e => {
            const v = parseFloat(e.target.value);
            update('joystickOpacity', v);
            this.container.querySelector('#touch-joy-op-value').textContent = Math.round(v * 100) + '%';
        };
        this.container.querySelector('#touch-btn-scale').oninput = e => {
            const v = parseFloat(e.target.value);
            update('buttonScale', v);
            this.container.querySelector('#touch-btn-scale-value').textContent = v.toFixed(2) + '×';
        };
        this.container.querySelector('#touch-btn-op').oninput = e => {
            const v = parseFloat(e.target.value);
            update('buttonOpacity', v);
            this.container.querySelector('#touch-btn-op-value').textContent = Math.round(v * 100) + '%';
        };
        this.container.querySelector('#touch-mirror').onchange = e => {
            update('mirrorMode', e.target.checked);
            if (this.game.mobileGTAControls) this.game.mobileGTAControls.setMirrorMode(e.target.checked);
        };

        // Position editor
        this.editingPositions = false;
        this.container.querySelector('#touch-edit-pos').onclick = () => this.enterPositionEdit();
        this.container.querySelector('#touch-save-pos').onclick = () => this.exitPositionEdit(true);
        this.container.querySelector('#touch-reset-pos').onclick = () => this.resetTouchPositions();
    }

    enterPositionEdit() {
        this.editingPositions = true;
        this.container.querySelector('#touch-edit-pos').style.display = 'none';
        this.container.querySelector('#touch-save-pos').style.display = 'inline-block';

        // Make joystick and buttons draggable
        if (this.game.mobileGTAControls) {
            this.game.mobileGTAControls.enablePositionEdit(true);
        }
        if (this.game.mobileTouchSystem) {
            this.game.mobileTouchSystem.enablePositionEdit(true);
        }
    }

    exitPositionEdit(save) {
        this.editingPositions = false;
        this.container.querySelector('#touch-edit-pos').style.display = 'inline-block';
        this.container.querySelector('#touch-save-pos').style.display = 'none';

        if (this.game.mobileGTAControls) {
            const pos = this.game.mobileGTAControls.disablePositionEdit(save);
            if (save && pos) {
                this.settings.touch.joystickPos = pos.joystick;
                this.touchLayout = pos.layout;
                localStorage.setItem('sg-touch-layout', JSON.stringify(this.touchLayout));
                this.save();
            }
        }
        if (this.game.mobileTouchSystem) {
            this.game.mobileTouchSystem.disablePositionEdit(save);
        }
    }

    resetTouchPositions() {
        this.settings.touch.joystickPos = { x: 30, y: 30 };
        this.touchLayout = {};
        localStorage.setItem('sg-touch-layout', JSON.stringify({}));
        this.save();
        this.applyTouch();
    }

    bindUpdatesEvents() {
        const u = this.settings.updates;
        const update = (key, val) => { u[key] = val; this.save(); };

        this.container.querySelector('#upd-auto').onchange = e => update('autoCheck', e.target.checked);
        this.container.querySelector('#upd-channel').onchange = e => {
            update('channel', e.target.value);
            this.container.querySelector('#upd-ch-display').textContent = e.target.value;
        };
        this.container.querySelector('#upd-check').onclick = () => this.checkForUpdates();
    }

    async checkForUpdates() {
        const btn = this.container.querySelector('#upd-check');
        const result = this.container.querySelector('#upd-result');
        btn.disabled = true;
        btn.textContent = 'Checking...';
        result.textContent = 'Fetching latest release...';

        try {
            const response = await fetch('https://api.github.com/repos/azhri1990/singapore-streets-pwa/releases/latest');
            if (response.ok) {
                const data = await response.json();
                const latestVersion = data.tag_name.replace('v', '');
                const currentVersion = '1.0.0';
                this.settings.updates.lastCheck = Date.now();
                this.save();
                this.container.querySelector('#upd-last').textContent = new Date().toLocaleString();

                if (this.compareVersions(latestVersion, currentVersion) > 0) {
                    result.innerHTML = `<strong style="color: #ffaa00;">Update available: ${latestVersion}</strong><br><a href="${data.html_url}" target="_blank" style="color: #00ffff;">View Release</a>`;
                } else {
                    result.innerHTML = `<strong style="color: #0f0;">You're on the latest version (${currentVersion})</strong>`;
                }
                this.container.querySelector('#upd-current').textContent = currentVersion;
            } else {
                result.innerHTML = `<span style="color: #f44;">Failed to check: ${response.status}</span>`;
            }
        } catch (e) {
            result.innerHTML = `<span style="color: #f44;">Error: ${e.message}</span>`;
        } finally {
            btn.disabled = false;
            btn.textContent = 'Check for Updates';
        }
    }

    compareVersions(a, b) {
        const pa = a.split('.').map(Number);
        const pb = b.split('.').map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const na = pa[i] || 0, nb = pb[i] || 0;
            if (na > nb) return 1;
            if (na < nb) return -1;
        }
        return 0;
    }

    switchTab(tab) {
        this.activeTab = tab;
        this.container.querySelectorAll('.settings-tab').forEach(btn => {
            btn.style.background = btn.dataset.tab === tab ? '#00ffff' : 'rgba(255,255,255,0.1)';
            btn.style.color = btn.dataset.tab === tab ? '#000' : '#fff';
        });
        this.container.querySelectorAll('.settings-panel').forEach(panel => {
            panel.style.display = panel.dataset.panel === tab ? '' : 'none';
        });
    }

    resetToDefaults() {
        if (!confirm('Reset all settings to defaults?')) return;
        localStorage.removeItem('sg-graphics');
        localStorage.removeItem('sg-sound');
        localStorage.removeItem('sg-controls');
        localStorage.removeItem('sg-touch');
        localStorage.removeItem('sg-updates');
        localStorage.removeItem('sg-touch-layout');
        this.settings = this.load();
        this.touchLayout = {};
        this.save();
        this.applyAll();
        // Refresh UI
        this.container.remove();
        this.createUI();
        this.bindEvents();
    }

    bindKeys() {
        this.keyHandler = (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
            if (e.key === 'F1' || (e.key === ',' && e.ctrlKey)) this.toggle();
        };
        document.addEventListener('keydown', this.keyHandler);
    }

    toggle() {
        if (this.isOpen) this.close(); else this.open();
    }

    open() {
        this.isOpen = true;
        this.container.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Pause game if running
        if (this.game.pause) this.game.pause();
    }

    close() {
        this.isOpen = false;
        this.container.style.display = 'none';
        document.body.style.overflow = '';
        // Resume game
        if (this.game.resume) this.game.resume();
    }

    destroy() {
        document.removeEventListener('keydown', this.keyHandler);
        this.container?.remove();
    }
}

// Export for global access
if (typeof window !== 'undefined') {
    window.SettingsOverlay = SettingsOverlay;
}