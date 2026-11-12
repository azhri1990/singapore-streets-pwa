/**
 * WebBackend.js - Web platform backend
 * Connects Fdx to browser/platform APIs
 * 
 * This implements the "backends" layer in libfdx 4-layer pattern
 */

export class WebBackend {
    constructor(fdx) {
        this._fdx = fdx;
        this._initPromise = this._initAsync();
    }

    fdx() { return this._fdx; }

    async _initAsync() {
        // Initialize WebGL context (handled by SceneGraph)
        // Setup browser APIs
        this._setupEventListeners();
        this._initKeyboard();
        this._initTouch();
        this._initGamepad();
    }

    _setupEventListeners() {
        window.addEventListener('resize', () => {
            if (this._fdx.scene()) this._fdx.scene().resize();
        });

        window.addEventListener('beforeunload', () => {
            if (this._fdx) this._fdx.dispose();
        });
    }

    _initKeyboard() {
        const keys = new Set();
        window.addEventListener('keydown', (e) => {
            keys.add(e.key.toLowerCase());
            this._notifyInput('key', { key: e.key, down: true });
        });
        window.addEventListener('keyup', (e) => {
            keys.delete(e.key.toLowerCase());
            this._notifyInput('key', { key: e.key, down: false });
        });
    }

    _initTouch() {
        let touchActive = false;
        window.addEventListener('touchstart', (e) => {
            touchActive = true;
            if (e.touches[0]) {
                this._notifyInput('touch', {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    down: true
                });
            }
        });
        window.addEventListener('touchmove', (e) => {
            if (touchActive) {
                this._notifyInput('touch', {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    down: true
                });
            }
        });
        window.addEventListener('touchend', (e) => {
            touchActive = false;
            this._notifyInput('touch', {
                x: e.changedTouches[0]?.clientX || 0,
                y: e.changedTouches[0]?.clientY || 0,
                down: false
            });
        });
    }

    _initGamepad() {
        // Gamepad support
        const controllers = [];
        window.addEventListener('gamepadconnected', (e) => {
            const gp = e.gamepad;
            controllers.push(gp);
            this._connectGamepad(gp);
        });
        window.addEventListener('gamepaddisconnected', (e) => {
            const index = controllers.indexOf(e.gamepad);
            if (index > -1) {
                controllers.splice(index, 1);
                this._disconnectGamepad(controllers[index]);
            }
        });
    }

    _connectGamepad(gp) {
        const gamepad = gp;
        gamepad.on('button', (buttonIndex, isPressed) => {
            const action = this._fdx.input()._keyMap.get(`GP${buttonIndex}`);
            if (action) this._fdx.input()._inputState.keys.add(action);
        });
        gamepad.on('axis', (axis, value) => {
            // Handle axis input
        });
    }

    // Public API for Fdx
    getInput() { return this._fdx.input(); }
    getScene() { return this._fdx.scene(); }
    getInputState() { return this._fdx.input()._inputState; }
}