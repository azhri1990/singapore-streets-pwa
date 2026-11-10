const STORAGE_KEY = 'singapore-streets-driving-settings';

/** Lightweight, persisted driving accessibility settings. */
export class DrivingSettings {
    constructor(game) {
        this.game = game;
        this.settings = this.load();
        this.createUI();
        this.apply();
    }

    load() {
        try {
            return { steering: 1, assist: true, haptics: true, camera: 'follow', ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
        } catch {
            return { steering: 1, assist: true, haptics: true, camera: 'follow' };
        }
    }

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    }

    apply() {
        if (this.game.player) this.game.player.drivingSettings = this.settings;
    }

    createUI() {
        this.button = document.createElement('button');
        this.button.id = 'driving-settings-toggle';
        this.button.textContent = '🚘';
        this.button.title = 'Driving settings';
        this.button.style.cssText = 'position:fixed;top:50px;right:70px;z-index:1001;width:32px;height:32px;border:0;border-radius:50%;background:rgba(0,0,0,.65);color:#fff;font-size:16px;cursor:pointer;';
        this.button.onclick = () => this.toggleMenu();
        document.body.appendChild(this.button);
    }

    toggleMenu() {
        if (this.menu) return this.closeMenu();
        this.menu = document.createElement('div');
        this.menu.style.cssText = 'position:fixed;top:90px;right:10px;z-index:1101;width:230px;padding:12px;border-radius:9px;background:rgba(15,22,35,.96);color:#fff;font:13px Arial,sans-serif;box-shadow:0 6px 24px #000;';
        this.menu.innerHTML = `
            <strong>Driving controls</strong>
            <label style="display:block;margin-top:10px">Steering sensitivity <span id="driving-steering-value">${this.settings.steering.toFixed(1)}×</span></label>
            <input id="driving-steering" type="range" min="0.5" max="1.5" step="0.1" value="${this.settings.steering}" style="width:100%">
            <label style="display:block;margin-top:8px"><input id="driving-assist" type="checkbox" ${this.settings.assist ? 'checked' : ''}> Steering assist</label>
            <label style="display:block;margin-top:6px"><input id="driving-haptics" type="checkbox" ${this.settings.haptics ? 'checked' : ''}> Vibration feedback</label>
            <label style="display:block;margin-top:8px">Vehicle camera
              <select id="driving-camera" style="float:right"><option value="follow">Follow</option><option value="close">Close</option></select>
            </label>`;
        this.menu.querySelector('#driving-camera').value = this.settings.camera;
        this.menu.querySelector('#driving-steering').oninput = (event) => {
            this.settings.steering = Number(event.target.value);
            this.menu.querySelector('#driving-steering-value').textContent = `${this.settings.steering.toFixed(1)}×`;
            this.commit();
        };
        this.menu.querySelector('#driving-assist').onchange = (event) => { this.settings.assist = event.target.checked; this.commit(); };
        this.menu.querySelector('#driving-haptics').onchange = (event) => { this.settings.haptics = event.target.checked; this.commit(); };
        this.menu.querySelector('#driving-camera').onchange = (event) => { this.settings.camera = event.target.value; this.commit(); };
        document.body.appendChild(this.menu);
    }

    commit() { this.save(); this.apply(); }
    closeMenu() { this.menu?.remove(); this.menu = null; }
    vibrate(pattern = 18) { if (this.settings.haptics && navigator.vibrate) navigator.vibrate(pattern); }
    destroy() { this.closeMenu(); this.button?.remove(); }
}
