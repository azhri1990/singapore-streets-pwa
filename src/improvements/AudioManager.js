/**
 * Audio Manager for Singapore Streets
 * Integrates: SpatialAudio 3D, SingaporeRadio, VoiceSynthesizer,
 *              engine/ambient sounds, collisions, horn, police sirens
 */

import { SpatialAudioSystem } from './SpatialAudio.js';
import { SingaporeRadioContent } from './SingaporeRadio.js';
import { VoiceSynthesizer } from './VoiceSynthesizer.js';
import { SingaporeVoiceProfiles } from './SingaporeVoices.js';

export class AudioManager {
    constructor() {
        this.audioContext = null;
        this.spatialAudio = null;
        this.radioStations = {};
        this.currentStation = null;
        this.voiceSynthesizer = null;
        this.voiceProfiles = SingaporeVoiceProfiles;
        this.init();
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Initialize SpatialAudio for 3D positional audio
            this.spatialAudio = new SpatialAudioSystem(this.game);
            // Initialize VoiceSynthesizer for NPC speech
            this.voiceSynthesizer = new VoiceSynthesizer();
            // Set up Singapore radio stations
            this.setupSingaporeRadio();
        } catch (e) {
            console.warn('Web Audio API not supported:', e);
        }
    }

    setGame(game) {
        this.game = game;
        if (this.spatialAudio) this.spatialAudio.game = game;
    }

    setupSingaporeRadio() {
        this.radioStations = {
            '988': {
                name: '988 NOW',
                frequency: '988 FM',
                genre: 'English Hits & Talk',
                dj: 'The Morning Show with John & Jill',
                songs: [
                    { artist: 'Taylor Swift', title: 'Anti-Hero', year: 2022 },
                    { artist: 'Ed Sheeran', title: 'Shape of You', year: 2017 },
                    { artist: 'The Weeknd', title: 'Blinding Lights', year: 2019 }
                ],
                commercials: [
                    'NTUC FairPrice - Everyday low prices for Singapore families',
                    'Singtel - The future is now, connect with Singtel 5G',
                    'DBS Bank - Live more, bank less with DBS digibank',
                    'Grab - Book your ride in seconds with Grab',
                    'McDonald\'s Singapore - I\'m lovin\' it, McDonald\'s',
                    'Starbucks Singapore - Your daily coffee ritual'
                ],
                trafficUpdates: [
                    'Heavy traffic on CTE towards city, accident at Braddell Road',
                    'PIE westbound clear, smooth flow to Tuas',
                    'ERP rates: Orchard $3.00, CBD $2.50 during peak hours',
                    'ECP eastbound moderate, expect delays near Changi'
                ],
                news: [
                    'Singapore GDP grew 3.2% in Q3, beating expectations',
                    'New MRT line to open next year, reducing commute times',
                    'HDB resale prices continue to rise in mature estates',
                    'National Day Parade 2026 preparations begin at Marina Bay'
                ]
            },
            '875': {
                name: 'FM87',
                frequency: '87.5 FM',
                genre: 'Mandarin Hits & Talk',
                dj: '早安你好 with 阿明 and 小丽',
                songs: [
                    { artist: '周杰伦 Jay Chou', title: '告白气球', year: 2016 },
                    { artist: '林俊杰 JJ Lin', title: '修炼爱情', year: 2013 },
                    { artist: '五月天 Mayday', title: '突然好想你', year: 2008 }
                ],
                commercials: [
                    'FairPrice - 新鲜好货，天天低价',
                    'Singtel - 5G网络，连接未来',
                    'DBS - 简单银行，智慧生活',
                    'Grab - 一键叫车，方便快捷',
                    '麦当劳 - 我就喜欢',
                    'Starbucks - 你的每日咖啡仪式'
                ],
                trafficUpdates: [
                    'CTE往市区方向车流量大，Braddell路发生事故',
                    'PIE西行顺畅，往Tuas方向无阻',
                    'ERP收费：Orchard $3.00，CBD $2.50 高峰时段',
                    'ECP东行适中，Changi附近有延误'
                ],
                news: [
                    '新加坡第三季度GDP增长3.2%，超出预期',
                    '新地铁线路明年开通，缩短通勤时间',
                    '组屋转售价格在成熟组屋区继续上涨',
                    '2026年国庆庆典准备在Marina Bay开始'
                ]
            },
            '913': {
                name: 'One FM 91.3',
                frequency: '91.3 FM',
                genre: 'Malay Hits & Talk',
                dj: 'Pagi Di Radio',
                songs: [
                    { artist: 'Siti Nurhaliza', title: 'Cintaku', year: 2018 },
                    { artist: 'M. Nasir', title: 'Balqis', year: 2015 },
                    { artist: 'Yuna', title: 'Lest We Forget', year: 2020 }
                ],
                commercials: [
                    'FairPrice - Baru bareng, harga lebih rendah',
                    'Maxis - Did anda tahu? Maxis 5G memukau',
                    'Grab - Sila Grab untuk kemudahan',
                    'Maybank - Jadual simpanan Anda',
                    'MCD - Citarasa makan yang sedap',
                    'ASTRO - Nonton drama tonton ASTRO'
                ],
                trafficUpdates: [
                    'Lebuhraya Abdullah Khalid padat, kecedera di Klang',
                    'Jalan Tun Razak lancar, arah selatan',
                    'Toll Plaza PLUS ramai pengguna',
                    'Jalan Kepong raya, laras sekali pun'
                ],
                news: [
                    'Berita terbaru dari dunia',
                    'Cuaca panas di Selat Malaka',
                    'KAKISTUDI meriah di Pekan Baru'
                ]
            },
            '950': {
                name: 'Class 95',
                frequency: '95.0 FM',
                genre: 'Gold Classics',
                dj: 'Class 95 Morning',
                songs: [
                    { artist: 'Elvis Presley', title: 'Can\'t Help Falling in Love', year: 1961 },
                    { artist: 'Frank Sinatra', title: 'My Way', year: 1969 },
                    { artist: 'The Beatles', title: 'Yesterday', year: 1965 }
                ],
                commercials: [
                    'Great Eastern - Protect what matters most',
                    'NTUC Income - Secure your family\'s future',
    'DBS Treasures - Wealth management for the discerning',
                    'Grab - Your premier ride experience'
                ],
                trafficUpdates: [
                    'Orchard Road moderately trafficked',
        'CBD expressway flowing smoothly',
                    'Marina Bay link clear'
                ],
                news: [
                    'Timeless classics remain popular',
                    'Community events this weekend',
                    'Retail sector holding steady'
                ]
            },
            '938': {
                name: '938 NOW',
                frequency: '93.8 FM',
                genre: 'News/Talk',
                dj: 'Current Affairs',
                songs: [
                    { artist: 'Billie Eilish', title: 'Bad Guy', year: 2019 },
                    { artist: 'Olivia Rodrigo', title: 'drivers license', year: 2021 },
                    { artist: 'Dua Lipa', title: 'Don\'t Start Now', year: 2020 }
                ],
                commercials: [
                    'SILA - Selamat datang di SILA',
                    'Gov.sg - Informasi terkini',
                    'Grab - Book your ride today',
                    'Singtel - 5G membawa masa depan'
                ],
                trafficUpdates: [
                    'Articulated lorries on AYE, expect delays',
                    'Cordon ERP in effect at Kallang',
                    'Marina Coastal Expressway clear'
                ],
                news: [
                    'Latest developments in parliament',
                    'Public transport upgrades',
                    'Weather update: afternoon showers possible'
                ]
            },
            '987': {
                name: '987FM',
                frequency: '98.7 FM',
                genre: 'Pop Hits',
                dj: '987 Breakfast',
                songs: [
                    { artist: 'Coldplay', title: 'Viva La Vida', year: 2008 },
                    { artist: 'Imagine Dragons', title: 'Believer', year: 2017 },
                    { artist: 'Billie Eilish', title: 'Bad Guy', year: 2019 }
                ],
                commercials: [
                    'Great Eastern - Protect what matters most',
                    'DBS Bank - Bank better',
                    'Grab - Book your ride',
                    'Singapore Pools - Play responsibly'
                ],
                trafficUpdates: [
                    'Smooth flow on the PAN Island',
                    'Buona Vista interchange moderate',
                    'East Coast Parkway clear'
                ],
                news: [
                    'Trending topics online',
                    'New releases this week',
                    'Chart topper updates'
                ]
            },
            '1035': {
                name: 'Channel U',
                frequency: '103.5 FM',
                genre: 'Mandarin Pop',
                dj: 'U FM',
                songs: [
                    { artist: 'Eason Chan', title: '告五輪', year: 2019 },
                    { artist: 'Jam Hsiao', title: '怎麼了', year: 2018 },
                    { artist: 'Na Jia', title: '愛的力量', year: 2020 }
                ],
                commercials: [
                    'FairPrice - 亲手挑选，品质保证',
                    'Singtel - 畅享5G',
                    'Grab - 一键叫车',
                    'DBS - 享生活'
                ],
                trafficUpdates: [
                    '实在北部高峰期',
                    '外环高速顺畅',
                    '淡马锡隧道人潮多'
                ],
                news: [
                    '娱乐圈动态',
                    '热门综艺',
                    '音乐榜单更新'
                ]
            },
            '1003': {
                name: '100.3 FM',
                frequency: '100.3 FM',
                genre: 'Tamil Hits',
                dj: 'Vanakkam',
                songs: [
                    { artist: 'Arjuna', title: 'Mannipaaya', year: 2018 },
                    { artist: 'Mala', title: 'Manasilaayo', year: 2019 },
                    { artist: 'Divine', title: 'Mersal Main Theme', year: 2018 }
                ],
                commercials: [
                    'FairPrice - Setiap hari harga terjangkau',
                    'Grab - Menjejaki kemudahan',
                    'DBS - Bank for the community',
                    'TSC - Taman Selatan Community'
                ],
                trafficUpdates: [
                    'Jalan Besar junction keruh',
                    'Rochor Canal Lane lancar',
                    'Kallang Wave Mall ramai pengunjung'
                ],
                news: [
                    'Komuniti mendengar',
                    'Acara komunitas ini minggu ini',
                    'Kenyataan terkini'
                ]
            }
        };
    }

    // ============ ENGINE SOUNDS ============

    createEngineSound(vehicleType, position = [0, 0, 0]) {
        if (!this.audioContext) return null;

        const config = {
            'singaporeTaxi': { baseFreq: 80, rpm: 2500, gain: 0.1 },
            'mpv': { baseFreq: 70, rpm: 2200, gain: 0.08 },
            'cityBus': { baseFreq: 60, rpm: 1800, gain: 0.12 },
            'singaporePolice': { baseFreq: 90, rpm: 2800, gain: 0.15 }
        }[vehicleType] || { baseFreq: 75, rpm: 2400, gain: 0.1 };

        // Register as a spatial sound source
        const source = this.spatialAudio?.registerSound(`engine_${vehicleType}`, {
            position,
            volume: config.gain,
            type: 'engine',
            refDistance: 10,
            maxDistance: 100
        }) || {
            gain: this.audioContext.createGain(),
            panner: this.audioContext.createPanner(),
            position,
            isPlaying: false
        };

        source.panner.positionX.setValueAtTime(position[0], this.audioContext.currentTime);
        source.panner.positionY.setValueAtTime(position[1], this.audioContext.currentTime);
        source.panner.positionZ.setValueAtTime(position[2], this.audioContext.currentTime);

        const osc = this.audioContext.createOscillator();
        const gainNode = source.gain;
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(config.baseFreq, this.audioContext.currentTime);
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(config.baseFreq * 4, this.audioContext.currentTime);
        filter.Q.value = 1;

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.gain.setValueAtTime(config.gain, this.audioContext.currentTime);
        gainNode.connect(this.audioContext.destination);

        // RPM-based frequency sweep
        osc.rpmPercent = 0;
        osc.updateRPM = (rpmPercent) => {
            osc.rpmPercent = rpmPercent;
            const ratio = Math.max(0, Math.min(1, rpmPercent));
            osc.frequency.setValueAtTime(config.baseFreq * (0.8 + ratio * 2), this.audioContext.currentTime);
            filter.frequency.setValueAtTime(config.baseFreq * 4 * ratio, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1 + ratio * 0.4, this.audioContext.currentTime);
        };

        osc.start();

        source.isPlaying = true;
        return { source, osc, updateRPM: osc.updateRPM };
    }

    setEngineRPM(vehicleId, rpmPercent) {
        const source = this.spatialAudio?.soundSources.get(vehicleId);
        if (source?.osc?.updateRPM) {
            source.osc.updateRPM(rpmPercent);
        }
    }

    stopEngineSound(vehicleId) {
        const source = this.spatialAudio?.soundSources.get(vehicleId);
        if (source?.isPlaying) {
            try { source.osc.stop?.(); } catch (e) {}
            source.isPlaying = false;
        }
        this.spatialAudio?.unregisterSound(vehicleId);
    }

    // ============ HAWKER AMBIENCE ============

    playHawkerAmbience(position = [0, 0, 0]) {
        if (!this.audioContext) return;

        // Register spatial ambient sound
        const source = this.spatialAudio?.registerSound('hawker_ambience', {
            position,
            volume: 0.08,
            type: 'ambient',
            loop: true
        }) || { gain: this.audioContext.createGain(), isPlaying: false };

        // Generate layered hawker noise
        const bufferSize = this.audioContext.sampleRate * 0.5;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.01;
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 0.7;

        const gain = source.gain;
        gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        noise.start();

        source.isPlaying = true;
    }

    stopHawkerAmbience() {
        this.spatialAudio?.unregisterSound('hawker_ambience');
    }

    // ============ POLICE SIRENS ============

    playPoliceSiren(position = [0, 0, 0]) {
        if (!this.audioContext) return;

        const source = this.spatialAudio?.registerSound('police_siren', {
            position,
            volume: 0.4,
            type: 'siren',
            looping: true
        }) || { gain: this.audioContext.createGain(), isPlaying: false };

        // Alternating siren pattern
        const now = this.audioContext.currentTime;
        const freq1 = 500;
        const freq2 = 1000;

        source.panner.positionX.setValueAtTime(position[0], now);
        source.panner.positionY.setValueAtTime(position[1], now);
        source.panner.positionZ.setValueAtTime(position[2], now);

        // Siren pattern: alternating 500Hz/1000Hz
        const pattern = [
            [freq1, 0], [freq2, 0.5], [freq1, 1.0], [freq2, 1.5], [freq1, 2.0]
        ];

        pattern.forEach(([freq, t]) => {
            source.panner.gain.setValueAtTime(0.4, now + t);
            // Create oscillator at this freq
            const osc = this.audioContext.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now + t);
            osc.connect(source.gain);
            osc.start(now + t);
            osc.stop(now + t + 0.1);
        });

        // Keep playing for 2.1s then fade out
        source.isPlaying = true;
        setTimeout(() => {
            try { source.gain.gain.setTargetAtTime(0, this.audioContext.currentTime + 2, 0.5); } catch (e) {}
            this.spatialAudio?.unregisterSound('police_siren');
        }, 2500);
    }

    // ============ COLLISION SOUNDS ============

    playCollision(impactForce, position = [0, 0, 0]) {
        if (!this.audioContext) return;

        const source = this.spatialAudio?.registerSound('collision', {
            position,
            volume: Math.min(0.5, impactForce * 0.05),
            type: 'impact',
            looping: false
        }) || { gain: this.audioContext.createGain(), isPlaying: false };

        const now = this.audioContext.currentTime;

        source.panner.positionX.setValueAtTime(position[0], now);
        source.panner.positionY.setValueAtTime(position[1], now);
        source.panner.positionZ.setValueAtTime(position[2], now);

        const osc = this.audioContext.createOscillator();
        const gainNode = source.gain;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(Math.max(20, 200 - impactForce * 10), now);
        gainNode.gain.setValueAtTime(Math.min(0.5, impactForce * 0.05), now);

        osc.connect(gainNode);
        gainNode.connect(this.compressor);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);

        source.isPlaying = true;
        setTimeout(() => this.spatialAudio?.unregisterSound('collision'), 400);
    }

    // ============ HORN ============

    playHorn(position = [0, 0, 0]) {
        if (!this.audioContext) return;

        const source = this.spatialAudio?.registerSound('horn', {
            position,
            volume: 0.3,
            type: 'horn',
            looping: false
        }) || { gain: this.audioContext.createGain(), isPlaying: false };

        const now = this.audioContext.currentTime;
        source.panner.positionX.setValueAtTime(position[0], now);
        source.panner.positionY.setValueAtTime(position[1], now);
        source.panner.positionZ.setValueAtTime(position[2], now);

        const osc = this.audioContext.createOscillator();
        const gainNode = source.gain;

        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        gainNode.gain.setValueAtTime(0.3, now);

        osc.connect(gainNode);
        gainNode.connect(this.compressor);

        osc.start(now);
        osc.stop(now + 0.5);

        source.isPlaying = true;
        setTimeout(() => this.spatialAudio?.unregisterSound('horn'), 700);
    }

    // ============ RADIO ============

    playRadioStation(stationId) {
        if (!this.audioContext || !this.radioStations[stationId]) return;

        const station = this.radioStations[stationId];

        // Play tuning chime
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

        this.currentStation = stationId;
        console.log(`Tuned to ${station.name} - ${station.frequency}`);

        // In a full implementation, would stream audio content
        // For now, display station info via UI
        return station;
    }

    stopRadio() {
        if (this.currentStation) {
            console.log(`Stopped ${this.radioStations[this.currentStation].name}`);
            this.currentStation = null;
        }
    }

    // ============ VOICE SYNTHESIS ============

    speak(text, profile = 'chinese_singaporean') {
        if (!this.voiceSynthesizer) return;

        const phrasesByProfile = {
            chinese_singaporean: [
                'Eh, you eat already or not?',
                'Wah, so expensive one!',
                'Cannot lah, too far.',
                'Don\'t worry lah, I help you.',
                'Aiyah, why like that?',
                'Can or not?',
                'No need lah, I can do myself.',
                'Shiok! Very nice.',
                'Sian, so boring.',
                'Bo jio! (didn\'t invite)',
                'Jialat, in trouble.',
                'Steady lah, confirm can.',
                'Kiasu, afraid to lose.',
                'Kiasi, afraid to die.',
                'Chope, reserve seat.'
            ],
            malay_singaporean: [
                'Assalamualaikum, apa khabar?',
                'Tak apa lah, no problem.',
                'Boleh or not?',
                'Sedap! Very delicious.',
                'Jangan lah, don\'t do that.',
                'Sabar, be patient.',
                'InsyaAllah, God willing.',
                'Makan already? Eat already?',
                'Jom, let\'s go!',
                'Best lah, very good.',
                'Tak kisah, doesn\'t matter.',
                'Buat apa? What are you doing?'
            ],
            indian_singaporean: [
                'Vanakkam, how are you?',
                'Aiyoh, what happened?',
                'No problem lah, can do.',
                'Very good ah!',
                'Don\'t worry da, I help you.',
                'What to do? No choice.',
                'So expensive lah!',
                'Come, let\'s go eat.',
                'Thambi, younger brother.',
                'Akka, older sister.',
                'Aiya, oh dear.',
                'Machi, bro.',
                'Super, very nice.'
            ]
        };

        const phrases = phrasesByProfile[profile] || phrasesByProfile.chinese_singaporean;
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

        this.voiceSynthesizer.speak(randomPhrase, profile);
    }

    sayArrival() {
        this.speak('Welcome to Singapore Streets!', 'chinese_singaporean');
    }

    sayMissionAccepted(missionTitle) {
        this.speak(`Got a delivery at the ${missionTitle}`, 'malay_singaporean');
    }

    sayPoliceWarning() {
        this.speak('Slow down, the traffic police are watching', 'chinese_singaporean');
    }
}

// Singleton for convenience
export const audioManager = new AudioManager();