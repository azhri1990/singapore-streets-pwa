/** Minimal driving telemetry for the active arcade vehicle. */
export class DrivingHUD {
    constructor(game) {
        this.game = game;
        this.element = document.createElement('div');
        this.element.id = 'driving-hud';
        this.element.style.cssText = 'position:fixed;right:16px;bottom:18px;z-index:1002;display:none;min-width:132px;padding:10px 12px;border:1px solid #00d9ff;border-radius:9px;background:rgba(5,15,28,.88);color:#fff;font:12px Arial,sans-serif;text-align:right;pointer-events:none;';
        document.body.appendChild(this.element);
    }

    update() {
        const vehicle = this.game.player?.currentVehicle;
        if (!this.game.player?.isInVehicle || !vehicle) {
            this.element.style.display = 'none';
            return;
        }
        const drive = vehicle.userData.drive || { speed: 0, condition: 100 };
        const kmh = Math.round(Math.abs(drive.speed) * 3.6);
        this.element.style.display = 'block';
        this.element.innerHTML = `<strong style="font-size:23px;color:#00e5ff">${kmh}</strong> km/h<br><span style="color:${drive.condition > 30 ? '#a8ffb0' : '#ff8b8b'}">Vehicle condition ${Math.round(drive.condition)}%</span><br><span style="color:#b4cbe0">WASD / arrows · Space brake · F exit</span>`;
    }

    destroy() { this.element?.remove(); }
}
