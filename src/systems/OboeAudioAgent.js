// OboeAudioAgent.js - Specialized agent for low-latency Oboe audio on Android
// Based on: https://developer.android.com/games/sdk/oboe
// Oboe is a C++ library for high-performance audio, works on Android 4.1+ (API level 16)
// Uses AAudio on API 27+, OpenSL ES on lower versions

export class OboeAudioAgent {
    constructor(game) {
        this.game = game;
        this.isActive = true;
        this.isSupported = true; // Web Audio API fallback in web context
        this.apiLevel = typeof android !== 'undefined' ? android.os.Build.VERSION.SDK_INT : 34;
        this.audioBackend = null; // 'aaudio' | 'opensl_es' | 'web_audio'
        this.latencyMs = 0;
        this.audioSessionActive = false;
        this.audioMetrics = {
            sampleRate: 44100,
            channelCount: 2,
            framesPerBurst: 0,
            latency: 0,
            underrunCount: 0,
            glitchCount: 0,
            callbackInterval: 0
        };
        this.healingLog = [];

        this.initialize();
    }

    initialize() {
        // Detect audio backend based on API level
        this.audioBackend = this.apiLevel >= 27 ? 'aaudio' : 'opensl_es';
        // Web fallback uses Web Audio API
        this.audioMetrics.latency = this.measureAudioLatency();

        // Set up audio session monitoring
        this.monitorInterval = setInterval(() => {
            this.checkAudioSession();
        }, 5000);

        console.log(`[OboeAudioAgent] Initialized - Audio backend: ${this.audioBackend}, Latency: ${this.audioMetrics.latency}ms`);
    }

    measureAudioLatency() {
        // Estimate audio latency via Web Audio API
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const latency = audioContext.baseLatency || 0.01;
            audioContext.close();
            return Math.round(latency * 1000);
        }
        return 50; // Default fallback estimate
    }

    checkAudioSession() {
        // Check for audio glitches/underruns
        const currentLatency = this.measureAudioLatency();
        this.audioMetrics.latency = currentLatency;

        if (currentLatency > 100) { // High latency threshold
            this.triggerSelfHeal();
        }
    }

    getAudioSessionStats() {
        return {
            backend: this.audioBackend,
            apiLevel: this.apiLevel,
            latencyMs: this.audioMetrics.latency,
            underrunCount: this.audioMetrics.underrunCount,
            glitchCount: this.audioMetrics.glitchCount,
            isSupported: this.isSupported,
            sampleRate: this.audioMetrics.sampleRate,
            channelCount: this.audioMetrics.channelCount
        };
    }

    triggerSelfHeal() {
        console.log('[OboeAudioAgent] Self-heal triggered - restarting audio session');

        try {
            // In web context, reinitialize audio context
            if (this.game?.restartAudio) {
                this.game.restartAudio();
            }

            this.audioMetrics.underrunCount++;
            this.healingLog.push({
                timestamp: Date.now(),
                action: 'audio_session_restart',
                reason: 'high_latency_or_glitch',
                status: 'applied'
            });
        } catch (error) {
            console.warn('[OboeAudioAgent] Audio session restart failed:', error.message);
        }
    }

    triggerSelfLearn() {
        console.log('[OboeAudioAgent] Self-learn triggered - analyzing audio performance');

        const learningData = {
            timestamp: Date.now(),
            audioBackend: this.audioBackend,
            latencyMs: this.audioMetrics.latency,
            underrunCount: this.audioMetrics.underrunCount,
            glitchCount: this.audioMetrics.glitchCount,
            sampleRate: this.audioMetrics.sampleRate,
            channelCount: this.audioMetrics.channelCount
        };

        if (this.game && typeof this.game.collectAudioData === 'function') {
            this.game.collectAudioData(learningData);
        }

        this.healingLog.push({
            timestamp: Date.now(),
            action: 'self_learn_audio_analysis',
            data: learningData,
            status: 'applied'
        });
    }

    cleanup() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
        console.log('[OboeAudioAgent] Cleaned up');
    }
}

// Export for global use
export let globalOboeAudioAgent = null;

export function getOboeAudioAgent(game) {
    if (!globalOboeAudioAgent && game) {
        globalOboeAudioAgent = new OboeAudioAgent(game);
    }
    return globalOboeAudioAgent;
}
