/**
 * Singapore Voice Synthesizer
 * Uses Web Speech API with Singapore voice profiles
 */

export class VoiceSynthesizer {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentVoice = null;
        
        this.loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.loadVoices();
        }
    }
    
    loadVoices() {
        this.voices = this.synth.getVoices();
    }
    
    // Find best voice for a profile
    findVoice(profile) {
        const params = {
            chinese_singaporean: { lang: 'zh-SG', fallback: 'en-SG' },
            malay_singaporean: { lang: 'ms-SG', fallback: 'en-SG' },
            indian_singaporean: { lang: 'ta-SG', fallback: 'en-SG' },
            eurasian_singaporean: { lang: 'en-SG', fallback: 'en-GB' },
            filipino: { lang: 'fil-PH', fallback: 'en-PH' },
            indonesian: { lang: 'id-ID', fallback: 'en-SG' },
            malaysian: { lang: 'ms-MY', fallback: 'en-MY' },
            bangladeshi: { lang: 'bn-BD', fallback: 'en-GB' },
            thai: { lang: 'th-TH', fallback: 'en-SG' },
            myanmar: { lang: 'my-MM', fallback: 'en-SG' }
        };
        
        const config = params[profile] || { lang: 'en-SG', fallback: 'en-GB' };
        
        // Try exact language match
        let voice = this.voices.find(v => v.lang === config.lang);
        if (voice) return voice;
        
        // Try fallback
        voice = this.voices.find(v => v.lang === config.fallback);
        if (voice) return voice;
        
        // Try any voice with the right language prefix
        voice = this.voices.find(v => v.lang.startsWith(config.lang.split('-')[0]));
        if (voice) return voice;
        
        // Default to first available
        return this.voices[0] || null;
    }
    
    // Speak with a specific profile
    speak(text, profile = 'chinese_singaporean', options = {}) {
        if (!this.synth) return;
        
        // Cancel any ongoing speech
        this.synth.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = this.findVoice(profile);
        
        if (voice) {
            utterance.voice = voice;
        }
        
        // Apply profile-specific params
        const params = {
            chinese_singaporean: { pitch: 1.1, rate: 1.1 },
            malay_singaporean: { pitch: 1.0, rate: 1.0 },
            indian_singaporean: { pitch: 1.05, rate: 1.15 },
            eurasian_singaporean: { pitch: 1.0, rate: 1.0 },
            filipino: { pitch: 1.15, rate: 1.1 },
            indonesian: { pitch: 1.0, rate: 1.0 },
            malaysian: { pitch: 1.0, rate: 1.05 },
            bangladeshi: { pitch: 0.95, rate: 0.95 },
            thai: { pitch: 1.1, rate: 0.95 },
            myanmar: { pitch: 1.0, rate: 0.9 }
        };
        
        const p = params[profile] || { pitch: 1.0, rate: 1.0 };
        utterance.pitch = options.pitch || p.pitch;
        utterance.rate = options.rate || p.rate;
        utterance.volume = options.volume || 1.0;
        
        this.synth.speak(utterance);
        return utterance;
    }
    
    // Speak with Singlish particles
    speakSinglish(text, profile = 'chinese_singaporean') {
        // Add Singlish particles based on profile
        const particles = {
            chinese_singaporean: ['lah', 'leh', 'lor', 'meh', 'sia'],
            malay_singaporean: ['lah', 'leh', 'kan', 'je'],
            indian_singaporean: ['lah', 'leh', 'da', 'ya'],
            eurasian_singaporean: ['lah', 'leh', 'lor'],
            filipino: ['po', 'opo', 'ba', 'naman'],
            indonesian: ['sih', 'dong', 'deh', 'aja'],
            malaysian: ['lah', 'leh', 'lor', 'kan'],
            bangladeshi: ['na', 'to', 'ki'],
            thai: ['ka', 'krub', 'na', 'ja'],
            myanmar: ['na', 'le', 'de', 'ba']
        };
        
        const p = particles[profile] || ['lah'];
        const particle = p[Math.floor(Math.random() * p.length)];
        
        // Add particle to end of sentence if not already there
        if (!text.endsWith(particle) && !text.endsWith('!') && !text.endsWith('?')) {
            text += ' ' + particle;
        }
        
        return this.speak(text, profile);
    }
    
    // Stop speaking
    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
    }
    
    // Check if speaking
    isSpeaking() {
        return this.synth ? this.synth.speaking : false;
    }
    
    // Get available voices
    getAvailableVoices() {
        return this.voices.map(v => ({ name: v.name, lang: v.lang }));
    }
}

// Create global instance
export const voiceSynth = new VoiceSynthesizer();
