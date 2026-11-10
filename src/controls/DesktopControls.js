// Desktop keyboard/mouse controls for Singapore Streets
// Works alongside MobileGTAControls

export class DesktopControls {
  constructor(game) {
    this.game = game;
    this.keys = {};
    this.mouseDown = false;
    this.isMouseDown = false;
    this.movement = { x: 0, z: 0 };
    this.enabled = this.isDesktop();
    this.boundKeyDown = this.onKeyDown.bind(this);
    this.boundKeyUp = this.onKeyUp.bind(this);
    this.boundMousedown = this.onMouseDown.bind(this);
    this.boundMouseup = this.onMouseUp.bind(this);
    this.boundMousemove = this.onMouseMove.bind(this);
    this.init();
  }

  isDesktop() {
    return !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  init() {
    if (!this.enabled) return;

    window.addEventListener('keydown', this.boundKeyDown);
    window.addEventListener('keyup', this.boundKeyUp);

    // Mouse look
    window.addEventListener('mousedown', this.boundMousedown);
    window.addEventListener('mouseup', this.boundMouseup);
    window.addEventListener('mousemove', this.boundMousemove);
  }

  onKeyDown(e) {
    this.keys[e.code] = true;
    
    // Quick actions
    if (e.code === 'Space') {
      e.preventDefault();
      if (this.game.player) this.game.player.jump?.();
    }
    if (e.code === 'KeyW' || e.code === 'ArrowUp') {
      this.game.player?.walk?.(0, 1);
    }
  }

  onKeyUp(e) {
    this.keys[e.code] = false;
  }

  onMouseDown() {
    this.isMouseDown = true;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onMouseMove(e) {
    if (!this.isMouseDown || !this.game.camera) return;
    this.game.camera.rotation.y -= e.movementX * 0.002;
    this.game.camera.rotation.x -= e.movementY * 0.002;
    this.game.camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.game.camera.rotation.x));
  }

  update(delta) {
    if (!this.enabled || !this.game.player) return;

    // Movement
    this.movement.x = 0;
    this.movement.z = 0;
    
    if (this.keys['KeyW'] || this.keys['ArrowUp']) this.movement.z -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) this.movement.z += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) this.movement.x -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) this.movement.x += 1;

    // Sprint
    const isSprinting = this.keys['ShiftLeft'] || this.keys['ShiftRight'];
    
    // Normalize diagonal
    const len = Math.hypot(this.movement.x, this.movement.z);
    if (len > 0) {
      this.movement.x /= len;
      this.movement.z /= len;
    }

    // Apply movement to player controller
    if (typeof this.game.player.setMoveInput === 'function') {
      this.game.player.setMoveInput(this.movement.x, this.movement.z, isSprinting);
    } else {
      // Fallback: clear external input if not supported
      this.game.player.clearExternalInput?.();
    }
  }

  destroy() {
    window.removeEventListener('keydown', this.boundKeyDown);
    window.removeEventListener('keyup', this.boundKeyUp);
    window.removeEventListener('mousedown', this.boundMousedown);
    window.removeEventListener('mouseup', this.boundMouseup);
    window.removeEventListener('mousemove', this.boundMousemove);
  }
}
