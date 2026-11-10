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
        // Ambient sounds for hawker centers
        const sounds = ['sizzle', 'chop', 'talk', 'clink'];
        sounds.forEach(s => console.log(`Playing ${s} sound`));
    }
    
    playPoliceSirens() {
        // Police siren pattern
        console.log('Police siren activated');
    }
    
    toggleRadio(stationId) {
        if (this.currentStation === stationId) {
            this.stopRadio();
            return;
        }
        
        this.stopRadio();
        this.currentStation = stationId;
        const station = this.radioStations[stationId];
        
        console.log(`Tuned to ${station.name} - ${station.frequency}`);
        // In production, would stream actual audio
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
