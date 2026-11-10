// Quality Manager for Singapore Streets
// Auto-detects device capability and applies low/mid/high presets

const STORAGE_KEY = 'singapore-streets-quality';

export class QualityManager {
  static PRESETS = {
    low: {
      dpr: 1,
      shadows: false,
      shadowMapSize: 1024,
      antialias: false,
      pbr: false,
      particles: false,
      postProcessing: false,
      fog: true,
      fpsCap: 30,
      textures: '512',
      lodDistance: 50,
      systems: ['core','world','player'],
      maxDrawCalls: 100
    },
    mid: {
      dpr: 1.5,
      shadows: true,
      shadowMapSize: 1024,
      antialias: true,
      pbr: true,
      particles: true,
      postProcessing: false,
      fog: true,
      fpsCap: 45,
      textures: '1024',
      lodDistance: 100,
      systems: ['core','world','player','jobs','combat'],
      maxDrawCalls: 250
    },
    high: {
      dpr: 2,
      shadows: true,
      shadowMapSize: 2048,
      antialias: true,
      pbr: true,
      particles: true,
      postProcessing: true,
      fog: true,
      fpsCap: 60,
      textures: '2048',
      lodDistance: 200,
      systems: 'all',
      maxDrawCalls: 500
    }
  };

  constructor(game) {
    this.game = game;
    const saved = this.loadQuality();
    this.quality = saved ? saved : this.detectQuality();
    this.preset = { ...QualityManager.PRESETS[this.quality] };
    this.brightness = 1.0;
    this.applyPreset();
    this.createUI();
  }

  loadQuality() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && QualityManager.PRESETS[saved]) {
        console.log('[QualityManager] Loaded quality from localStorage:', saved);
        return saved;
      }
    } catch (e) {
      console.warn('[QualityManager] localStorage unavailable:', e);
    }
    return null;
  }

  saveQuality(level) {
    try {
      localStorage.setItem(STORAGE_KEY, level);
      console.log('[QualityManager] Saved quality to localStorage:', level);
    } catch (e) {
      console.warn('[QualityManager] Failed to save quality:', e);
    }
  }

  detectQuality() {
    const hasMemory = typeof navigator.deviceMemory === 'number';
    const ram = hasMemory ? navigator.deviceMemory : 4;
    const cores = navigator.hardwareConcurrency || 4;
    const dpr = window.devicePixelRatio || 1;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isLowEnd = ram < 3 || cores <= 4 || (isMobile && dpr < 2);

    // WebGL capabilities
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    const supportsWebGL2 = !!gl;

    if (!supportsWebGL2 || ram < 2) return 'low';
    if (isLowEnd) return 'mid';
    return 'high';
  }

  applyPreset() {
    const preset = this.preset;
    const renderer = this.game.renderer;

    // Pixel ratio
    renderer.setPixelRatio(Math.min(preset.dpr, window.devicePixelRatio));

    // Shadows
    renderer.shadowMap.enabled = preset.shadows;
    if (!preset.shadows) {
      this.game.scene.traverse(obj => {
        if (obj.castShadow) obj.castShadow = false;
        if (obj.receiveShadow) obj.receiveShadow = false;
      });
    }

    // PBR materials
    if (!preset.pbr) {
      this.game.scene.traverse(obj => {
        if (obj.material && obj.material.isMeshStandardMaterial) {
          obj.material.metalness = 0;
          obj.material.roughness = 0.9;
        }
      });
    }

    console.log('[QualityManager] Applied preset:', this.quality, preset);
  }

  applyBrightness() {
    if (this.game && this.game.renderer) {
      this.game.renderer.toneMappingExposure = this.brightness;
    }
  }

  createUI() {
    // Quality indicator
    const indicator = document.createElement('div');
    indicator.id = 'quality-indicator';
    indicator.textContent = `Quality: ${this.quality.toUpperCase()}`;
    indicator.style.cssText = `
      position: fixed; top: 10px; right: 10px; z-index: 1000;
      background: rgba(0,0,0,0.6); color: white; padding: 4px 8px;
      font-size: 12px; border-radius: 4px; pointer-events: none;
    `;
    document.body.appendChild(indicator);

    // Quality toggle menu button
    const btn = document.createElement('button');
    btn.id = 'quality-toggle';
    btn.textContent = '⚙️';
    btn.style.cssText = `
      position: fixed; top: 10px; right: 70px; z-index: 1000;
      background: rgba(0,0,0,0.6); color: white; border: none;
      width: 32px; height: 32px; border-radius: 50%;
      font-size: 16px; cursor: pointer;
    `;
    btn.onclick = () => this.showMenu();
    document.body.appendChild(btn);
  }

  showMenu() {
    let menu = document.getElementById('quality-menu');
    if (menu) { menu.remove(); return; }

    menu = document.createElement('div');
    menu.id = 'quality-menu';
    menu.style.cssText = `
      position: fixed; top: 50px; right: 10px; z-index: 1001;
      background: rgba(20,20,30,0.95); color: white; padding: 12px;
      border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      font-family: Arial, sans-serif; min-width: 220px;
    `;

    const auto = this.detectQuality();
    menu.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px;">Graphics Quality</div>
      <button data-quality="low" style="width:100%; margin:2px 0; padding:6px; background:${this.quality==='low'?'#00ffff':'#333'}; color:black; border:none; border-radius:4px; cursor:pointer">Low</button>
      <button data-quality="mid" style="width:100%; margin:2px 0; padding:6px; background:${this.quality==='mid'?'#00ffff':'#333'}; color:black; border:none; border-radius:4px; cursor:pointer">Medium</button>
      <button data-quality="high" style="width:100%; margin:2px 0; padding:6px; background:${this.quality==='high'?'#00ffff':'#333'}; color:black; border:none; border-radius:4px; cursor:pointer">High</button>
      <div style="margin:10px 0 4px; font-size:12px;">Brightness</div>
      <input id="quality-brightness" type="range" min="0.5" max="1.5" step="0.05" value="${this.brightness||1}" style="width:100%">
      <div style="margin:10px 0 4px; font-size:12px;">FPS Cap <span id="fps-value">${this.preset.fpsCap}</span></div>
      <input id="quality-fps" type="range" min="30" max="60" step="5" value="${this.preset.fpsCap}" style="width:100%">
      <button id="quality-auto-reset" style="width:100%; margin:8px 0 2px; padding:6px; background:#555; color:white; border:none; border-radius:4px; cursor:pointer">Reset to Auto</button>
      <div style="font-size:11px; margin-top:8px; opacity:0.7;">Auto-detected: ${auto}</div>
    `;

    menu.querySelectorAll('button[data-quality]').forEach(btn => {
      btn.onclick = () => {
        this.setQuality(btn.dataset.quality);
        menu.remove();
      };
    });

    const brightnessInput = menu.querySelector('#quality-brightness');
    brightnessInput.oninput = (e) => {
      this.brightness = parseFloat(e.target.value);
      this.applyBrightness();
    };

    const fpsInput = menu.querySelector('#quality-fps');
    const fpsValue = menu.querySelector('#fps-value');
    fpsInput.oninput = (e) => {
      const val = parseInt(e.target.value);
      fpsValue.textContent = val;
      this.preset.fpsCap = val;
      this.saveQuality(this.quality);
    };

    menu.querySelector('#quality-auto-reset').onclick = () => {
      try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
      this.quality = this.detectQuality();
      this.preset = { ...QualityManager.PRESETS[this.quality] };
      this.applyPreset();
      this.updateIndicator();
      menu.remove();
    };

    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target) && e.target.id !== 'quality-toggle') {
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 0);

    document.body.appendChild(menu);
  }

  get() {
    return this.preset;
  }

  setQuality(level) {
    if (!QualityManager.PRESETS[level]) return;
    this.quality = level;
    // Clone the preset so per-user changes never mutate the shared defaults.
    this.preset = { ...QualityManager.PRESETS[level] };
    this.applyPreset();
    this.saveQuality(level);
    this.updateIndicator();
  }

  destroy() {
    document.getElementById('quality-indicator')?.remove();
    document.getElementById('quality-toggle')?.remove();
    document.getElementById('quality-menu')?.remove();
  }

  updateIndicator() {
    const existing = document.getElementById('quality-indicator');
    if (existing) existing.remove();
    const indicator = document.createElement('div');
    indicator.id = 'quality-indicator';
    indicator.textContent = `Quality: ${this.quality.toUpperCase()}`;
    indicator.style.cssText = `position: fixed; top: 10px; right: 10px; z-index: 1000; background: rgba(0,0,0,0.6); color: white; padding: 4px 8px; font-size: 12px; border-radius: 4px; pointer-events: none;`;
    document.body.appendChild(indicator);
  }
}
