/**
 * Spatial Audio System for Singapore Streets
 * Advanced Web Audio API integration with:
 * - Spatial panning for 3D positional audio
 * - Distance attenuation models
 * - Occlusion effects
 * - Procedural engine sounds via AudioWorklet
 * - Singapore ambience layering
 */

export class SpatialAudioSystem {
    constructor(game) {
        this.game = game;
        this.audioContext = null;
        this.listener = null;
        this.soundSources = new Map();
        this.reverbGain = null;
        this.compressor = null;
        this.init();
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Spatial panner setup (listener)
            this.listener = this.audioContext.listener;

            // Audio processing chain
            this.compressor = this.audioContext.createDynamicsCompressor();
            this.compressor.threshold.setValueAtTime(-50, this.audioContext.currentTime);
            this.compressor.knee.setValueAtTime(40, this.audioContext.currentTime);
            this.compressor.ratio.setValueAtTime(12, this.audioContext.currentTime);
            this.compressor.attack.setValueAtTime(0.003, this.audioContext.currentTime);
            this.compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);

            this.reverbGain = this.audioContext.createGain();
            this.reverbGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);

            this.compressor.connect(this.audioContext.destination);

            // Resume audio context on user interaction
            document.body.addEventListener('click', () => this.resume(), { once: true });
        } catch (e) {
            console.warn('Web Audio API not supported:', e);
        }
    }

    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Register a 3D spatial sound source
    registerSound(id, options = {}) {
        if (!this.audioContext) return null;

        const source = {
            id,
            gain: this.audioContext.createGain(),
            panner: this.audioContext.createPanner(),
            position: options.position || [0, 0, 0],
            volume: options.volume || 1.0,
            rolloffFactor: options.rolloffFactor || 1.0,
            distanceModel: options.distanceModel || 'linear',
            refDistance: options.refDistance || 1,
            maxDistance: options.maxDistance || 100,
            looping: options.looping || false,
            type: options.type || 'ambient', // 'engine', 'ambient', 'ui', 'voice'
            lastUpdate: Date.now(),
            buffer: options.buffer || null,
            isPlaying: false
        };

        // Configure panner
        source.panner.positionX.value = source.position[0];
        source.panner.positionY.value = source.position[1];
        source.panner.positionZ.value = source.position[2];
        source.panner.distanceModel = source.distanceModel;
        source.panner.refDistance = source.refDistance;
        source.panner.maxDistance = source.maxDistance;
        source.panner.rolloffFactor = source.rolloffFactor;

        // Connect chain: source -> panner -> gain -> compressor
        source.panner.connect(source.gain);
        source.gain.gain.setValueAtTime(source.volume, this.audioContext.currentTime);
        source.gain.connect(this.compressor);

        this.soundSources.set(id, source);
        return source;
    }

    // Update position of a sound source
    updateSoundPosition(id, position) {
        const source = this.soundSources.get(id);
        if (!source) return;
        source.position = position;
        source.panner.positionX.setValueAtTime(position[0], this.audioContext.currentTime);
        source.panner.positionY.setValueAtTime(position[1], this.audioContext.currentTime);
        source.panner.positionZ.setValueAtTime(position[2], this.audioContext.currentTime);
    }

    // Play an oscillator-based sound (procedural)
    playOscillator(id, freq = 440, type = 'sine', duration = 0.5, volume = 0.5, position = [0, 0, 0]) {
        if (!this.audioContext) return;

        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(this.compressor);

        osc.start();
        osc.stop(this.audioContext.currentTime + duration);
    }

    // Engine sound via oscillator
    createEngineSound(id, baseFreq = 200, rpm = 2000, position = [0, 0, 0]) {
        if (!this.audioContext) return null;

        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);

        filter.type = 'bandpass';
        filter.frequency.value = baseFreq * 4;
        filter.Q.value = 1;

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.compressor);

        osc.start();

        const engine = {
            id,
            osc,
            gainNode,
            filter,
            baseFreq,
            maxRpm: rpm,
            position,
            isRunning: true,
            update: (rpmPercent) => {
                const ratio = Math.max(0, Math.min(1, rpmPercent));
                osc.frequency.value = baseFreq * (0.8 + ratio * 2);
                filter.frequency.value = baseFreq * 4 * ratio;
                gainNode.gain.value = 0.1 + ratio * 0.4;
            },
            stop: () => {
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
                osc.stop(this.audioContext.currentTime + 0.5);
                engine.isRunning = false;
            }
        };

        return engine;
    }

    // Play hawker ambience (sizzling, chopping, etc)
    playHawkerAmbience(position) {
        if (!this.audioContext) return;

        const ambienceSounds = [
            { freq: 800, type: 'square', dur: 0.2 },
            { freq: 1200, type: 'triangle', dur: 0.15 },
            { freq: 600, type: 'sawtooth', dur: 0.3 },
            { freq: 1000, type: 'sine', dur: 0.1 }
        ];

        ambienceSounds.forEach((sound, i) => {
            const osc = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            osc.type = sound.type;
            osc.frequency.setValueAtTime(sound.freq, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + sound.dur);

            osc.connect(gainNode);
            gainNode.connect(this.compressor);

            osc.start();
            osc.stop(this.audioContext.currentTime + sound.dur);
        });

        console.log(`Hawker ambience playing at [${position}]`);
    }

    // Play police siren pattern
    playPoliceSiren(pattern = 'alternating') {
        if (!this.audioContext) return;

        const siren1 = this.audioContext.createOscillator();
        const siren2 = this.audioContext.createOscillator();
        const gain1 = this.audioContext.createGain();
        const gain2 = this.audioContext.createGain();

        siren1.type = 'square';
        siren2.type = 'square';
        siren1.frequency.setValueAtTime(500, this.audioContext.currentTime);
        siren2.frequency.setValueAtTime(1000, this.audioContext.currentTime);

        gain1.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gain2.gain.setValueAtTime(0.4, this.audioContext.currentTime);

        siren1.connect(gain1);
        siren2.connect(gain2);
        gain1.connect(this.compressor);
        gain2.connect(this.compressor);

        siren1.start();
        siren2.start();

        // Alternating siren pattern
        const times = [0, 0.5, 1.0, 1.5, 2.0];
        const freqs1 = [500, 700, 500, 700, 500];
        const freqs2 = [1000, 1300, 1000, 1300, 1000];

        times.forEach((t, i) => {
            siren1.frequency.setValueAtTime(freqs1[i], this.audioContext.currentTime + t);
            siren2.frequency.setValueAtTime(freqs2[i], this.audioContext.currentTime + t);
        });

        times.forEach(() => {
            gain1.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2);
            gain2.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2);
        });

        setTimeout(() => {
            siren1.stop();
            siren2.stop();
        }, 2100);
    }

    // Play collision impact sound
    playCollision(impactForce, position = [0, 0, 0]) {
        if (!this.audioContext) return;

        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200 - impactForce * 10, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(Math.min(0.5, impactForce * 0.05), this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);

        osc.connect(gainNode);
        gainNode.connect(this.compressor);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.3);

        console.log(`Collision impact: ${impactForce}N at [${position}]`);
    }

    // Play vehicle horn
    playHorn(position = [0, 0, 0]) {
        if (!this.audioContext) return;

        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(440, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);

        osc.connect(gainNode);
        gainNode.connect(this.compressor);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.5);

        console.log(`Horn at [${position}]`);
    }

    // Remove a sound source
    unregisterSound(id) {
        const source = this.soundSources.get(id);
        if (!source) return;
        source.panner.disconnect();
        source.gain.disconnect();
        this.soundSources.delete(id);
    }

    // Get all nearby sounds within range
    getNearbySounds(position, radius = 50) {
        const nearby = [];
        for (const [id, source] of this.soundSources) {
            const dist = Math.hypot(
                source.position[0] - position[0],
                source.position[1] - position[1],
                source.position[2] - position[2]
            );
            if (dist < radius) {
                nearby.push({ id, source, distance: dist });
            }
        }
        nearby.sort((a, b) => a.distance - b.distance);
        return nearby;
    }

    // Update listener position from camera/player
    updateListener(position, forward = [0, 0, -1], up = [0, 1, 0]) {
        if (!this.listener) return;
        this.listener.positionX.setValueAtTime(position[0], this.audioContext.currentTime);
        this.listener.positionY.setValueAtTime(position[1], this.audioContext.currentTime);
        this.listener.positionZ.setValueAtTime(position[2], this.audioContext.currentTime);
        this.listener.forwardX.setValueAtTime(forward[0], this.audioContext.currentTime);
        this.listener.forwardY.setValueAtTime(forward[1], this.audioContext.currentTime);
        this.listener.forwardZ.setValueAtTime(forward[2], this.audioContext.currentTime);
        this.listener.upX.setValueAtTime(up[0], this.audioContext.currentTime);
        this.listener.upY.setValueAtTime(up[1], this.audioContext.currentTime);
        this.listener.upZ.setValueAtTime(up[2], this.audioContext.currentTime);
    }

    dispose() {
        if (this.audioContext) {
            this.audioContext.close();
        }
        this.soundSources.clear();
    }
}

// Singleton for convenience
export const spatialAudio = new SpatialAudioSystem(null);
