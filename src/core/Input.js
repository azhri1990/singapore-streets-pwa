/**
 * Input.js - Input abstraction layer
 * Handles keyboard, mouse, touch, gamepad input
 * No global state - all input flows through Fdx
 */

export class Input {
    constructor(fdx) {
        this._fdx = fdx;
        this._keyMap = new Map();
        this._gamepadConnected = false;
        this._inputState = {
            keys: new Set(),
            gamepad: null,
            touch: { x: 0, y: 0, active: false }
        };
    }

    fdx() { return this._fdx; }

    // Register key mapping
    mapKey(keyCode, action) {
        this._keyMap.set(keyCode, action);
    }

    // Get current input state
    getState() {
        return {
            keys: Array.from(this._inputState.keys),
            gamepad: this._gamepadConnected ? this._inputState.gamepad : null,
            touch: this._inputState.touch
        };
    }

    // Update input state
    update() {
        // Update keys
        const keys = this._inputState.keys;
        this._inputState.keys = new Set();
        
        // Update gamepad
        if (this._gamepadConnected && this._inputState.gamepad) {
            const gp = this._inputState.gamepad;
            gp.buttons.forEach((button, index) => {
                if (button) {
                    const action = this._keyMap.get(`GP${index}`);
                    if (action) keys.add(action);
                }
            });
        }
    }

    // Gamepad handling
    connectGamepad(gamepad) {
        this._gamepadConnected = true;
        this._inputState.gamepad = gamepad;
        gamepad.on('button', (buttonIndex, isPressed) => {
            const action = this._keyMap.get(`GP${buttonIndex}`);
            if (action) this._inputState.keys.add(action);
        });
    }

    // Touch input
    setTouch(x, y, active) {
        this._inputState.touch = { x, y, active };
    }
}