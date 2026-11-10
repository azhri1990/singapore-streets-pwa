/** Centralises nearby actions for keyboard and touch players. */
export class InteractionSystem {
    constructor(game) {
        this.game = game;
        this.current = null;
        this.lastLabel = '';
        this.createPrompt();
    }

    createPrompt() {
        this.prompt = document.createElement('button');
        this.prompt.id = 'interaction-prompt';
        this.prompt.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:1100;display:none;padding:10px 14px;border:1px solid #00e5ff;border-radius:20px;background:rgba(5,15,28,.9);color:#fff;font:600 13px Arial,sans-serif;box-shadow:0 3px 14px #000;cursor:pointer;';
        this.prompt.onclick = () => this.interact();
        document.body.appendChild(this.prompt);
    }

    update() {
        const player = this.game.player;
        if (!player?.position) return;
        let best = null;
        const offer = (distance, label, action) => {
            if (distance <= 4 && (!best || distance < best.distance)) best = { distance, label, action };
        };

        if (player.isInVehicle) {
            offer(0, 'E  Exit vehicle', () => player.exitVehicle());
        } else {
            this.game.scene.traverse((object) => {
                if (object.userData?.type?.includes('Vehicle')) {
                    offer(player.position.distanceTo(object.position), 'E  Enter vehicle', () => player.enterVehicle(object));
                }
            });
        }
        const mission = this.game.missionSystem;
        if (!mission?.activeMission) {
            const available = mission?.getNextAvailableMission();
            if (available) offer(player.position.distanceTo(available.start), `E  Start: ${available.title}`, () => mission.start(available.id));
        }
        this.current = best;
        const label = best?.label || '';
        if (label !== this.lastLabel) {
            this.lastLabel = label;
            this.prompt.textContent = label.replace('E  ', '');
            this.prompt.style.display = label ? 'block' : 'none';
        }
    }

    interact() {
        this.current?.action?.();
    }

    destroy() {
        this.prompt?.remove();
    }
}
