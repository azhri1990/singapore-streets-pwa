/**
 * Normalises keyboard, touch and controller driving input into game actions.
 * Sources may update independently; consumers read one predictable input object.
 */
export class ActionInput {
    constructor(game) {
        this.game = game;
        this.keys = new Set();
        this.touchDriving = { throttle: 0, brake: 0, steer: 0, handbrake: false };
        this.controllerDriving = { throttle: 0, brake: 0, steer: 0, handbrake: false };
        this.boundKeyDown = (event) => this.onKeyDown(event);
        this.boundKeyUp = (event) => this.keys.delete(event.code);
        window.addEventListener('keydown', this.boundKeyDown);
        window.addEventListener('keyup', this.boundKeyUp);
    }

    onKeyDown(event) {
        if (event.target.matches?.('input, textarea, select')) return;
        this.keys.add(event.code);
        if (event.code === 'KeyE' && !event.repeat) {
            event.preventDefault();
            this.game.interactionSystem?.interact();
        }
        if (event.code === 'KeyF' && !event.repeat && this.game.player?.isInVehicle) {
            event.preventDefault();
            this.game.player.exitVehicle();
        }
    }

    setTouchDriving(input) { Object.assign(this.touchDriving, input); }
    setControllerDriving(input) { Object.assign(this.controllerDriving, input); }

    getDrivingInput() {
        const keyboard = {
            throttle: this.keys.has('KeyW') || this.keys.has('ArrowUp') ? 1 : 0,
            brake: this.keys.has('KeyS') || this.keys.has('ArrowDown') ? 1 : 0,
            steer: (this.keys.has('KeyD') || this.keys.has('ArrowRight') ? 1 : 0) - (this.keys.has('KeyA') || this.keys.has('ArrowLeft') ? 1 : 0),
            handbrake: this.keys.has('Space')
        };
        return {
            throttle: Math.max(keyboard.throttle, this.touchDriving.throttle, this.controllerDriving.throttle),
            brake: Math.max(keyboard.brake, this.touchDriving.brake, this.controllerDriving.brake),
            steer: Math.max(-1, Math.min(1, keyboard.steer || this.touchDriving.steer || this.controllerDriving.steer)),
            handbrake: keyboard.handbrake || this.touchDriving.handbrake || this.controllerDriving.handbrake
        };
    }

    destroy() {
        window.removeEventListener('keydown', this.boundKeyDown);
        window.removeEventListener('keyup', this.boundKeyUp);
    }
}
