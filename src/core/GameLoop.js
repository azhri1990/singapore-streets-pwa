/**
 * GameLoop.js - Fixed timestep game loop
 * No steady-state allocation - reuse objects per frame
 */

export class GameLoop {
    constructor(fdx, options = {}) {
        this._fdx = fdx;
        this._fpsCap = options.fpsCap || 60;
        this._maxDelta = 0.1; // Cap delta
        this._fixedTimestep = 1 / 60;
        this._running = false;
        this._animationFrameId = null;
        this._lastFrameTime = 0;
        this._accumulator = 0;
        this._state = null; // Will hold game state

        // Performance metrics
        this._frameCount = 0;
        this._frameTimes = [];
    }

    get fdx() { return this._fdx; }
    get fpsCap() { return this._fpsCap; }
    get running() { return this._running; }

    start() {
        if (this._running) return;
        this._running = true;
        this._animationFrameId = requestAnimationFrame((time) => this.tick(time));
    }

    stop() {
        this._running = false;
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
    }

    tick = (time) => {
        if (!this._running) return;
        this._animationFrameId = requestAnimationFrame((t) => this.tick(t));

        const now = time || performance.now();
        const elapsed = now - this._lastFrameTime;
        this._lastFrameTime = now;

        // FPS cap
        const frameInterval = 1000 / this._fpsCap;
        if (elapsed < frameInterval) return;
        this._lastFrameTime = now - (elapsed % frameInterval);

        // Fixed timestep
        this._accumulator = Math.min(this._accumulator + Math.min(elapsed, 100) / 1000, this._maxDelta);
        const delta = this._accumulator;
        let steps = 0;
        while (delta > 0 && steps < 4) {
            this._step(this._fixedTimestep);
            delta -= this._fixedTimestep;
            steps++;
        }

        // Render
        this._render();
    };

    _step(dt) {
        if (this._state) {
            this._state.update(dt);
        }
    }

    _render() {
        // Delegate rendering to backend/state
        if (this._state) {
            this._state.render();
        }
    }

    getStats() {
        return {
            frameCount: this._frameCount,
            averageFrameTime: this._frameTimes.length > 0 ? this._frameTimes.reduce((a, b) => a + b, 0) / this._frameTimes.length : 0
        };
    }
}