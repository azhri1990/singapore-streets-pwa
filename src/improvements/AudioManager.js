/**
 * Audio Manager for Singapore Streets
 * Radio stations, engine sounds, ambient
 */

export class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.radioStations = {};
        this.currentStation = null;
        
        this.initializeAudio();
        this.setupSingaporeRadio();
    }
    
    async initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio not supported');
        }
    }
    
    setupSingaporeRadio() {
        // Import Singapore radio stations
        this.radioStations = {
            '988': { name: '988 NOW', frequency: '988 FM', genre: 'English Hits', dj: 'The Morning Show' },
            '875': { name: 'FM87', frequency: '87.5 FM', genre: 'Mandarin Hits', dj: '早安你好' },
            '913': { name: 'One FM 91.3', frequency: '91.3 FM', genre: 'Malay Hits', dj: 'Pagi Di Radio' },
            '950': { name: 'Class 95', frequency: '95.0 FM', genre: 'Gold Classics', dj: 'Class 95 Morning' },
            '938': { name: '938 NOW', frequency: '93.8 FM', genre: 'News/Talk', dj: 'Current Affairs' },
            '987': { name: '987FM', frequency: '98.7 FM', genre: 'Pop Hits', dj: '987 Breakfast' },
            '1035': { name: 'Channel U', frequency: '103.5 FM', genre: 'Mandarin Pop', dj: 'U FM' },
            '1003': { name: '100.3 FM', frequency: '100.3 FM', genre: 'Tamil Hits', dj: 'Vanakkam' }
        };
        // Singapore radio stations (simulated)

    }
    
    createEngineSound(vehicleType) {
        if (!this.audioContext) return null;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        // Engine characteristics based on vehicle
        const configs = {
            'singaporeTaxi': { baseFreq: 80, rpm: 2500 },
            'mpv': { baseFreq: 70, rpm: 2200 },
            'cityBus': { baseFreq: 60, rpm: 1800 },
            'singaporePolice': { baseFreq: 90, rpm: 2800 }
        };
        
        const config = configs[vehicleType] || { baseFreq: 75, rpm: 2400 };
        
        oscillator.frequency.value = config.baseFreq;
        filter.type = 'bandpass';
        filter.frequency.value = config.baseFreq * 4;
        filter.Q.value = 1;
        
        gainNode.gain.value = 0.1;
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        
        return {
            oscillator,
            gainNode,
            filter,
            setRPM: (rpm) => {
                const ratio = rpm / config.rpm;
                oscillator.frequency.value = config.baseFreq * ratio;
                filter.frequency.value = config.baseFreq * ratio * 4;
                gainNode.gain.value = 0.05 + (ratio * 0.1);
            }
        };
    }
    
    playHawkerAmbience() {
        if (!this.audioContext) return;
        // Ambient hawker center noise: light pink-ish noise via bandpass noise + bursts
        const bufferSize = this.audioContext.sampleRate * 0.8;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.02;
        }
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 400;
        filter.Q.value = 0.5;
        const gain = this.audioContext.createGain();
        gain.gain.value = 0.08;
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        noise.start();
        noise.stop(this.audioContext.currentTime + 0.8);
    }
    
    playSiren() {
        this.playPoliceSirens();
    }
    
    playPoliceSirens() {
        if (!this.audioContext) return;
        if (this.sirenOscillator) return; // Already playing
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.Q.value = 1;
        
        osc.type = 'sawtooth';
        osc.frequency.value = 600;
        gain.gain.value = 0.05;
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.start();
        this.sirenOscillator = osc;
        this.sirenGain = gain;
        this.sirenFilter = filter;
        
        // Siren sweep pattern
        const sweep = () => {
            const t = this.audioContext.currentTime;
            osc.frequency.setValueAtTime(600, t);
            osc.frequency.linearRampToValueAtTime(1000, t + 0.5);
            osc.frequency.linearRampToValueAtTime(600, t + 1.0);
            gain.gain.setValueAtTime(0.05, t);
            gain.gain.linearRampToValueAtTime(0.0, t + 0.9);
        };
        sweep();
        osc.stop(this.audioContext.currentTime + 0.9);
        this.sirenTimer = setInterval(() => {
            sweep();
            osc.stop(this.audioContext.currentTime + 0.9);
            osc.start(this.audioContext.currentTime + 0.9);
        }, 2000);
    }
    
    stopPoliceSirens() {
        if (this.sirenTimer) clearInterval(this.sirenTimer);
        if (this.sirenOscillator) {
            try { this.sirenOscillator.stop(); } catch (e) {}
            this.sirenOscillator = null;
        }
        this.sirenTimer = null;
        if (this.sirenGain) {
            try { this.sirenGain.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.05); } catch (e) {}
        }
    }
    
    toggleRadio(stationId) {
        if (this.currentStation === stationId) {
            this.stopRadio();
            return;
        }
        
        this.stopRadio();
        this.currentStation = stationId;
        const station = this.radioStations[stationId];
        
        // Play a subtle "tuning in" chime
        if (this.audioContext) {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.value = 880;
            gain.gain.value = 0.03;
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.15);
        }
        
        console.log(`Tuned to ${station.name} - ${station.frequency}`);
    }
    
    stopRadio() {
        if (this.currentStation) {
            console.log(`Stopped ${this.radioStations[this.currentStation].name}`);
            this.currentStation = null;
        }
    }
    
    playCollision(impactForce) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.frequency.value = 200 - (impactForce * 10);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    playHorn() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.frequency.value = 440;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }
}

export class SGVoiceOver {
    static phrases = {
        arrival: [
            'Welcome to Singapore Streets!',
            'Your open world awaits!',
            'Explore the Lion City'
        ],
        mission: [
            'Got a delivery at the hawker center',
            'Pickup at Orchard Road',
            'Race to Marina Bay'
        ],
        police: [
            'Slow down, the traffic police are watching',
            'ERP gantry ahead'
        ]
    };
    
    static getRandomPhrase(category) {
        const phrases = this.phrases[category] || [];
        return phrases[Math.floor(Math.random() * phrases.length)] || '';
    }
}
