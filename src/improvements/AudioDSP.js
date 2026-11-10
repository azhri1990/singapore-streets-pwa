/**
 * Advanced Audio DSP System for Singapore Streets
 * Location-aware spatial audio, convolution reverb, dynamic music
 * Based on: Web Audio API best practices, open source audio worklets research
 * Adds: Convolution reverb by room type, dynamic music state machine,
 *       procedural Singlish speech synthesis, 3D HRTF based positioning
 */
import { SpatialAudioSystem } from './SpatialAudio.js';

export class AudioDSP {
    constructor(game, spatial = null) {
        this.game = game;
        this.spatial = spatial || new SpatialAudioSystem(game);
        this.musicState = null;
        this.availableSounds = [];
        this.rooms = new Map(); // Room type -> reverb impulse response
        this.currentRoom = 'outdoor';
        this.intensity = 0;
        this.isRaining = false;
        this.isWet = false;
    }
    
    // --- Room Impulse Responses (Bass & Pink Noise Based) ---
    setupRooms() {
        // Generate different impulse responses for different Singapore environments
        const roomConfigs = {
            'mall': { decay: 3.0, preDelay: 0.008, mix: 0.6, lowCut: 80 },
            'restaurant': { decay: 2.0, preDelay: 0.012, mix: 0.7, lowCut: 100 },
            'hawker_center': { decay: 1.8, preDelay: 0.005, mix: 0.75, lowCut: 60 },
            'airport': { decay: 2.5, preDelay: 0.006, mix: 0.55, lowCut: 90 },
            'mrt_station': { decay: 3.5, preDelay: 0.010, mix: 0.5, lowCut: 120 },
            'office': { decay: 2.8, preDelay: 0.004, mix: 0.65, lowCut: 100 },
            'outdoor': { decay: 0.8, preDelay: 0.002, mix: 0.4, lowCut: 80 },
            'lobby': { decay: 4.0, preDelay: 0.003, mix: 0.6, lowCut: 90 },
            'wet': { decay: 0.5, preDelay: 0.001, mix: 0.35, lowCut: 50 },
            'tunnel': { decay: 4.5, preDelay: 0.005, mix: 0.45, lowCut: 200 },
            'bank': { decay: 3.2, preDelay: 0.008, mix: 0.55, lowCut: 110 },
            'police': { decay: 2.0, preDelay: 0.015, mix: 0.6, lowCut: 90 }
        };
        
        Object.entries(roomConfigs).forEach(([type, config]) => {
            this.generateImpulseResponse(type, config);
        });
    }
    
    generateImpulseResponse(roomType, config) {
        const length = Math.floor(config.decay * this.spatial.audioContext.sampleRate);
        const impulse = this.spatial.audioContext.createConvolver();
        const buffer = this.spatial.audioContext.createBuffer(2, length, this.spatial.audioContext.sampleRate);
        
        for (let ch = 0; ch < 2; ch++) {
            const channelData = buffer.getChannelData(ch);
            
            for (let i = 0; i < length; i++) {
                // Pink noise base
                const noise = (Math.random() * 2 - 1);
                
                // Early reflections based on config
                let sample = 0;
                if (i < 0.01 * this.spatial.audioContext.sampleRate) {
                    // Pre-delay silence or small reflection
                    sample = Math.pow(-10, Math.floor(i / (this.spatial.audioContext.sampleRate * 0.01))) * 0.01 * config.mix;
                } else {
                    // Decaying noise with exponential falloff
                    const decay = Math.exp(-i / (this.spatial.audioContext.sampleRate * config.decay));
                    sample = noise * decay * config.mix;
                }
                
                channelData[i] = sample;
            }
        }
        
        impulse.buffer = buffer;
        this.rooms.set(roomType, impulse);
    }
    
    setRoom(roomName) {
        const available = ['mall', 'restaurant', 'hawker_center', 'airport', 'mrt_station', 'office', 'outdoor', 'lobby', 'wet', 'tunnel', 'bank', 'police'];
        this.currentRoom = available.includes(roomName) ? roomName : 'outdoor';
        console.log(`[AudioDSP] Room changed to: ${this.currentRoom}`);
    }
    
    getReverbNode() {
        const convolver = this.spatial.audioContext.createConvolver();
        convolver.buffer = this.rooms.get(this.currentRoom) || this.rooms.get('outdoor');
        return convolver;
    }
    
    // --- Dynamic Music System ---
    setupMusic() {
        const states = [
            { id: 'menu', intensity: 0.0, scale: [261.63, 293.66, 329.63], tempo: 80 },     // C minor pentatonic
            { id: 'exploring', intensity: 0.4, scale: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00], tempo: 120 },
            { id: 'combat', intensity: 0.7, scale: [174.61, 196.00, 220.00, 261.63], tempo: 160 },  // Fast brass
            { id: 'driving', intensity: 0.5, scale: [130.81, 146.83, 164.81, 196.00, 220.00], tempo: 140 },  // Driving blues
            { id: 'nightlife', intensity: 0.8, scale: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 523.25], tempo: 100 },
            { id: 'upgrade', intensity: 0.6, scale: [220.00, 277.18, 329.63, 392.00, 440.00], tempo: 90 }
        ];
        
        this.musicState = states[0];
        this.musicEnabled = false;
        this.musicInstrument = null;
    }
    
    updateMusic(delta, context) {
        if (!this.musicEnabled) return;
        
        // Determine current music state from game
        let targetStateId = this.musicState.id;
        
        if (this.game.missionSystem && this.game.missionSystem.activeMission) {
            targetStateId = this.game.missionSystem.activeMission.state === 'combat' ? 'combat' : 'exploring';
        }
        if (this.game.gangSystem && this.game.gangSystem.combatLevel >= 3) {
            targetStateId = 'combat';
        }
        if (this.game.upgradeSystem) {
            targetStateId = 'upgrade';
        }
        
        // Smooth state transition
        const targetState = this.stateMap[targetStateId];
        if (targetState) {
            // Interpolate intensity
            const prevIntensity = this.musicState.intensity;
            const newIntensity = THREE.MathUtils.lerp(prevIntensity, targetState.intensity, delta * 0.1);
            
            if (newIntensity !== this.musicState.intensity) {
                this.transitionIntensity(prevIntensity, newIntensity);
            }
        }
        
        this.scheduleNextNote(context);
    }
    
    stateMap = {
        'menu': { intensity: 0.0, state: 'menu' },
        'exploring': { intensity: 0.4, state: 'exploring' },
        'combat': { intensity: 0.7, state: 'combat' },
        'driving': { intensity: 0.5, state: 'driving' },
        'nightlife': { intensity: 0.8, state: 'nightlife' },
        'upgrade': { intensity: 0.6, state: 'upgrade' }
    };
    
    transitionIntensity(from, to) {
        // Smooth transition would adjust oscillator gains
        this.musicState.intensity = to;
        // In a full implementation, this would crossfade between melodies
        // For now, just update
    }
    
    scheduleNextNote(context) {
        // Simplified melody scheduling
        const time = context.currentTime;
        const noteDuration = 0.5 * this.musicState.tempo / 60;
        const noteFrequency = this.musicState.scale[Math.floor(Math.random() * this.musicState.scale.length)];
        
        const osc = context.createOscillator();
        const gain = context.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = noteFrequency;
        
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.08 * this.musicState.intensity, time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, time + noteDuration);
        
        osc.connect(gain);
        gain.connect(context.destination);
        
        osc.start(time);
        osc.stop(time + noteDuration);
    }
    
    // --- Procedural Singapore Phonetics Speech Synthesis ---
    // Generates realistic Singapore speech patterns for NPC dialogue
    generateSingaporeDialogue(baseText, contextType, npcType) {
        const profile = {
            'hawker': { patterns: ['lah', 'leh', 'lor', 'meh', 'eh', 'also'], rhythm: 'short-medium' },
            'taxi': { patterns: ['lah', 'leh', 'lor', 'meh', 'early', 'yes'], rhythm: 'medium' },
            'police': { patterns: ['lah', 'kan', 'ah', 'exactly', 'right'], rhythm: 'fast' },
            'student': { patterns: ['lah', 'leh', 'sia', 'meh', 'now'], rhythm: 'medium' },
            'elderly': { patterns: ['ah', 'boy', 'lah', 'jia', 'early'], rhythm: 'slow-heavy' },
            'tourist': { patterns: [], rhythm: 'normal' }
        };
        
        const p = profile[npcType] || profile['hawker'];
        if (!p.patterns || p.patterns.length === 0) return baseText;
        
        // Insert Singlish particles at natural positions
        const text = baseText;
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            result += text[i];
            // Every few words, insert a particle at beginning or end of sentence
            if (i > 3 && Math.random() < 0.4) {
                const particle = p.patterns[Math.floor(Math.random() * p.patterns.length)];
                // Most particles go at sentence ends
                if (i % 4 === 0) result += ` ` + particle;
            }
        }
        
        return result;
    }
    
    // --- Voice Synthesis Enhancement ---
    enhanceVoice(rawSpeech, npcProfile) {
        const enhanceSteps = [
            (text) => text.replace(/yeh\b/g, 'yeah').replace(/stay\b/g, 'still'),
            (text) => text.replace(/makesure/g, 'make sure'),
            (text) => text.replace(/buddy\b/g, 'friend'),
            (text) => text.replace(/hellooo/g, 'hello there'),
        ];
        
        let enhanced = rawSpeech;
        enhanceSteps.forEach(step => enhanced = step(enhanced));
        
        // Add rhythm based on speaker type
        if (npcProfile && npcProfile.rhythm === 'fast') {
            enhanced = this.addRhythmFast(enhanced);
        } else if (npcProfile && npcProfile.rhythm === 'slow-heavy') {
            enhanced = this.addRhythmSlowHeavy(enhanced);
        }
        
        return enhanced;
    }
    
    addRhythmFast(text) {
        const words = text.split(/\s+/);
        const result = [];
        for (const w of words) {
            result.push(w[0].toUpperCase() + w.slice(1).toLowerCase());
        }
        return result.join(' ');
    }
    
    addRhythmSlowHeavy(text) {
        const words = text.split(/\s+/);
        const result = [];
        for (let i = 0; i < words.length; i++) {
            result.push(words[i]);
            if (i < words.length - 1 && Math.random() < 0.5) {
                result.push('lah');
            }
        }
        return result.join(' ');
    }
    
    // --- Ambient Layering ---
    playAmbientMix(position, weather) {
        weather = weather || {};
        this.isRaining = weather.rainProbability > 0.3 || weather.hasRain !== false;
        
        // Layer ambient sounds based on time of day and environment
        const timeOfDay = this.getCurrentTime();
        
        if (this.isRaining) {
            this.playAmbienceLayer(position, 'rain', 0.8);
        }
        
        if (timeOfDay === 'morning' || timeOfDay === 'late_morning') {
            this.playAmbienceLayer(position, 'birds', 0.3);
        }
        
        if (timeOfDay === 'afternoon') {
            this.playAmbienceLayer(position, 'car_horn', 0.1);
        }
        
        if (timeOfDay === 'evening' || timeOfDay === 'night') {
            this.playAmbienceLayer(position, 'street_siren', 0.2);
        }
    }
    
    getCurrentTime() {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        if (hour < 22) return 'evening';
        return 'night';
    }
    
    playAmbienceLayer(position, soundType, volume) {
        switch (soundType) {
            case 'rain':
                this.spatial.playRainAmbience(position, volume);
                break;
            case 'birds':
                this.spatial.playBirdCalls(position, volume);
                break;
            case 'car_horn':
                this.spatial.playCarHorns(position, volume);
                break;
            case 'street_siren':
                this.spatial.playStreetSound(position, 'siren', volume);
                break;
        }
    }
    
    // --- Event-Driven Sound Effects ---
    triggerEvent(eventName, position = [0, 0, 0], params = {}) {
        const effects = {
            'police_call': () => this.spatial.playPoliceCall(),
            'delivery_arrived': () => this.spatial.playDeliveryArrival(),
            'item_found': () => this.spatial.playItemFound(),
            'collision': () => this.spatial.playCollision(params.force || 100),
            'vehicle_pass': () => this.spatial.playVehiclePass(position),
            'ambulance': () => this.spatial.playAmbulance(position),
            'fire_alarm': () => this.spatial.playFireAlarm(position),
            'construction': () => this.spatial.playConstructionSounds(position)
        };
        
        const fn = effects[eventName];
        if (fn) {
            try {
                fn(params);
            } catch (e) {
                console.warn(`Audio event "${eventName}" failed:`, e);
            }
        }
    }
    
    // --- Setup for integration ---
    init() {
        this.setupRooms();
        this.setupMusic();
    }
    
    setEnabled(enabled) {
        this.spatial.audioContext = this.spatial.audioContext ? this.spatial.audioContext : null;
        if (!enabled) {
            this.spatial.dispose();
            this.musicEnabled = false;
        } else {
            this.spatial.init();
            this.musicEnabled = true;
        }
    }
}

export default AudioDSP;