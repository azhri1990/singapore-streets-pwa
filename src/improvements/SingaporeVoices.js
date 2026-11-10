/**
 * Singapore Voice Dialects & Accents
 * Authentic speech patterns for Singapore's multicultural population
 */

export const SingaporeVoiceProfiles = {
    // Chinese Singaporean
    chinese_singaporean: {
        name: 'Chinese Singaporean',
        language: 'English (Singlish) + Mandarin/Cantonese/Hokkien/Teochew',
        speechPatterns: {
            particles: ['lah', 'leh', 'lor', 'meh', 'sia', 'ah', 'hor', 'mah'],
            intonation: 'rising at end of statements',
            pace: 'fast',
            volume: 'moderate',
            commonPhrases: [
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
            greetings: ['Eh, hello!', 'Hi ah!', 'Good morning!', 'Eh, long time no see!'],
            farewells: ['Bye lah!', 'See you!', 'Take care!', 'Later!'],
            food: ['chicken rice', 'char kway teow', 'laksa', 'bak kut teh', 'roti prata'],
            hawker: ['Uncle, one chicken rice!', 'Auntie, less rice please.', 'Wah, queue so long!'],
            work: ['OT again?', 'Boss ask work weekend', 'Salary not enough'],
            family: ['Mum cook what today?', 'Dad coming home late', 'Kids go tuition']
        }
    },
    
    // Malay Singaporean
    malay_singaporean: {
        name: 'Malay Singaporean',
        language: 'English (Singlish) + Malay',
        speechPatterns: {
            particles: ['lah', 'leh', 'kan', 'je', 'pun', 'saja'],
            intonation: 'melodic, rising',
            pace: 'moderate',
            volume: 'warm',
            commonPhrases: [
                'Assalamualaikum, apa khabar?',
                'Alhamdulillah, I\'m fine.',
                'Tak apa lah, no problem.',
                'Boleh or not?',
                'Sedap! Very delicious.',
                'Jangan lah, don\'t do that.',
                'Macam mana? How?',
                'Tak tahu lah, I don\'t know.',
                'Sabar, be patient.',
                'InsyaAllah, God willing.',
                'Makan already? Eat already?',
                'Jom, let\'s go!',
                'Best lah, very good.',
                'Tak kisah, doesn\'t matter.',
                'Buat apa? What are you doing?'
            ],
            greetings: ['Assalamualaikum!', 'Selamat pagi!', 'Hi, apa khabar?'],
            farewells: ['Selamat tinggal!', 'Jumpa lagi!', 'Bye lah!'],
            food: ['nasi lemak', 'mee goreng', 'roti prata', 'satay', 'mee rebus'],
            hawker: ['Uncle, satu nasi lemak!', 'Pedas sikit, less spicy.', 'Wah, sedap!'],
            work: ['Kerja penat', 'Boss garang', 'Gaji cukup tak?'],
            family: ['Anak dah balik sekolah?', 'Isteri masak apa?', 'Keluarga besar']
        }
    },
    
    // Indian Singaporean
    indian_singaporean: {
        name: 'Indian Singaporean',
        language: 'English (Singlish) + Tamil/Hindi/Punjabi',
        speechPatterns: {
            particles: ['lah', 'leh', 'ah', 'da', 'ya'],
            intonation: 'rhythmic, expressive',
            pace: 'fast',
            volume: 'loud',
            commonPhrases: [
                'Vanakkam, how are you?',
                'Aiyoh, what happened?',
                'No problem lah, can do.',
                'Seri, okay.',
                'Very good ah!',
                'Don\'t worry da, I help you.',
                'What to do? No choice.',
                'So expensive lah!',
                'Come, let\'s go eat.',
                'Thambi, younger brother.',
                'Akka, older sister.',
                'Aiya, oh dear.',
                'Machi, bro.',
                'Super, very nice.',
                'Check, verify.'
            ],
            greetings: ['Vanakkam!', 'Namaste!', 'Hi, how are you?', 'Good morning!'],
            farewells: ['Poitu varen!', 'Bye!', 'Take care!', 'See you!'],
            food: ['roti prata', 'fish head curry', 'biryani', 'dosa', 'thosai'],
            hawker: ['Uncle, one roti prata!', 'Curry more, please.', 'Wah, very spicy!'],
            work: ['Office work very tiring', 'Boss very strict', 'Salary increment when?'],
            family: ['Amma cooking what?', 'Appa coming late', 'Kids at tuition']
        }
    },
    
    // Eurasian Singaporean
    eurasian_singaporean: {
        name: 'Eurasian Singaporean',
        language: 'English (Singlish) + Portuguese/English',
        speechPatterns: {
            particles: ['lah', 'leh', 'lor'],
            intonation: 'casual, relaxed',
            pace: 'moderate',
            volume: 'moderate',
            commonPhrases: [
                'Eh, how\'s it going?',
                'Not bad lah, quite okay.',
                'Can lah, no problem.',
                'Wah, so nice one!',
                'Aiyoh, why like that?',
                'Steady lah, confirm can.',
                'Let\'s go eat, I\'m hungry.',
                'My grandmother\'s recipe, very special.',
                'Eurasian food best, you try.',
                'Family gathering this weekend.',
                'Suzy Q, very nice cake.',
                'Devil\'s curry, very spicy!',
                'Feng, traditional Eurasian dish.',
                'Braga, Portuguese sausage.',
                'Semur, beef stew.'
            ],
            greetings: ['Hi!', 'Hello!', 'Good morning!', 'How are you?'],
            farewells: ['Bye!', 'See you!', 'Take care!', 'Cheers!'],
            food: ['devil\'s curry', 'feng', 'braga', 'suzy q', 'semur'],
            hawker: ['Uncle, one devil\'s curry!', 'More rice please.', 'Wah, sedap!'],
            work: ['Work quite busy', 'Meeting at 3pm', 'Project deadline'],
            family: ['Family reunion this Sunday', 'Grandma\'s recipe', 'Portuguese heritage']
        }
    },
    
    // Filipino
    filipino: {
        name: 'Filipino',
        language: 'English (Tagalog-influenced) + Tagalog',
        speechPatterns: {
            particles: ['po', 'opo', 'ba', 'naman', 'kasi', 'lang'],
            intonation: 'rising, melodic',
            pace: 'fast',
            volume: 'warm',
            commonPhrases: [
                'Kumusta, how are you?',
                'Salamat, thank you.',
                'Oo, yes. Hindi, no.',
                'Pwede ba? Can I?',
                'Walang anuman, you\'re welcome.',
                'Gusto ko, I want.',
                'Sige, okay.',
                'Tara, let\'s go.',
                'Ang ganda, so beautiful.',
                'Pagod na ako, I\'m tired.',
                'Kain na tayo, let\'s eat.',
                'Masarap, delicious.',
                'Ingat, take care.',
                'Salamat po, thank you (respectful).',
                'Opo, yes (respectful).'
            ],
            greetings: ['Kumusta!', 'Hello po!', 'Good morning po!'],
            farewells: ['Paalam!', 'Ingat!', 'Bye po!'],
            food: ['adobo', 'sinigang', 'lechon', 'lumpia', 'halo-halo'],
            hawker: ['Uncle, one adobo!', 'Masarap!', 'Salamat po!'],
            work: ['Work hard, send money home', 'OFW life', 'Contract ending soon'],
            family: ['Miss my family', 'Remittance this month', 'Kids growing up']
        }
    },
    
    // Indonesian
    indonesian: {
        name: 'Indonesian',
        language: 'English (Bahasa-influenced) + Bahasa Indonesia',
        speechPatterns: {
            particles: ['sih', 'dong', 'kok', 'deh', 'aja', 'nih'],
            intonation: 'expressive',
            pace: 'moderate',
            volume: 'warm',
            commonPhrases: [
                'Halo, apa kabar?',
                'Terima kasih, thank you.',
                'Ya, yes. Tidak, no.',
                'Bisa, can.',
                'Mau, want.',
                'Jangan, don\'t.',
                'Sudah makan? Eat already?',
                'Enak, delicious.',
                'Cantik, beautiful.',
                'Ayo, let\'s go.',
                'Sabar, be patient.',
                'Gak apa-apa, no problem.',
                'Lagi apa? What are you doing?',
                'Mau ke mana? Where to go?',
                'Hati-hati, be careful.'
            ],
            greetings: ['Halo!', 'Selamat pagi!', 'Apa kabar?'],
            farewells: ['Selamat tinggal!', 'Hati-hati!', 'Bye!'],
            food: ['nasi goreng', 'satay', 'rendang', 'gado-gado', 'soto'],
            hawker: ['Uncle, one nasi goreng!', 'Pedas, spicy.', 'Enak!'],
            work: ['Kerja di Singapore', 'Gaji lebih tinggi', 'Mudah-mudahan dapat PR'],
            family: ['Kangen keluarga', 'Kirim uang ke Indonesia', 'Anak di kampung']
        }
    },
    
    // Malaysian
    malaysian: {
        name: 'Malaysian',
        language: 'English (Manglish) + Malay/Chinese/Tamil',
        speechPatterns: {
            particles: ['lah', 'leh', 'lor', 'meh', 'kan', 'je'],
            intonation: 'similar to Singlish but distinct',
            pace: 'moderate',
            volume: 'moderate',
            commonPhrases: [
                'Eh, you from Singapore ah?',
                'Wah, Singapore very clean one!',
                'Cannot lah, too expensive.',
                'Boleh or not?',
                'Sedap, very nice.',
                'Jom, let\'s go!',
                'Tak apa, no problem.',
                'Aiyoh, so hot weather.',
                'Kena go JB, cheaper there.',
                'Causeway jam again.',
                'Malaysia Boleh!',
                'Makan already?',
                'So many cars in Singapore.',
                'ERP so expensive lah.',
                'Better go JB eat, cheaper.'
            ],
            greetings: ['Hi!', 'Hello!', 'Apa khabar?'],
            farewells: ['Bye!', 'Jumpa lagi!', 'Take care!'],
            food: ['nasi lemak', 'char kway teow', 'bak kut teh', 'roti canai'],
            hawker: ['Uncle, one nasi lemak!', 'Less spicy.', 'Wah, sedap!'],
            work: ['Work in Singapore, live in JB', 'Causeway jam every day', 'Better pay in Singapore'],
            family: ['Family in Malaysia', 'Weekend go back JB', 'Kids studying in Singapore']
        }
    },
    
    // Bangladeshi
    bangladeshi: {
        name: 'Bangladeshi',
        language: 'English (Bengali-influenced) + Bengali',
        speechPatterns: {
            particles: ['na', 'to', 'ki', 'ei'],
            intonation: 'expressive',
            pace: 'moderate',
            volume: 'moderate',
            commonPhrases: [
                'Kemon achhen? How are you?',
                'Dhonnobad, thank you.',
                'Haan, yes. Na, no.',
                'Kora jabe, can do.',
                'Khabar kheyeche? Eat already?',
                'Bhalo, good.',
                'Jabo, let\'s go.',
                'Beshi dami, too expensive.',
                'Kothay jaben? Where to go?',
                'Bhalo lagche, feeling good.',
                'Ami bujhi, I understand.',
                'Ki korchen? What are you doing?',
                'Aste hobe, need to go.',
                'Dhire dhire, slowly.',
                'Shobai bhalo, everyone good.'
            ],
            greetings: ['Assalamu alaikum!', 'Kemon achhen?', 'Hello!'],
            farewells: ['Khoda hafez!', 'Bye!', 'Take care!'],
            food: ['biryani', 'curry', 'roti', 'dal', 'fish curry'],
            hawker: ['Uncle, one biryani!', 'Spicy, please.', 'Bhalo!'],
            work: ['Construction work hard', 'Send money to family', 'Work permit renewal'],
            family: ['Miss family in Bangladesh', 'Remittance every month', 'Children growing']
        }
    },
    
    // Thai
    thai: {
        name: 'Thai',
        language: 'English (Thai-influenced) + Thai',
        speechPatterns: {
            particles: ['ka', 'krub', 'na', 'la', 'ja'],
            intonation: 'tonal, melodic',
            pace: 'moderate',
            volume: 'soft',
            commonPhrases: [
                'Sawasdee, how are you?',
                'Khop khun, thank you.',
                'Chai, yes. Mai chai, no.',
                'Dai, can.',
                'Mai dai, cannot.',
                'Aroi, delicious.',
                'Pai, let\'s go.',
                'Mai pen rai, no problem.',
                'Phaeng, expensive.',
                'Suay, beautiful.',
                'Sabai, comfortable.',
                'Kin khao, eat rice.',
                'Yoo nai, where?',
                'Thao rai, how much?',
                'Khop khun mak, thank you very much.'
            ],
            greetings: ['Sawasdee ka!', 'Sawasdee krub!', 'Hello!'],
            farewells: ['La gon!', 'Bye!', 'Take care!'],
            food: ['pad thai', 'tom yum', 'green curry', 'mango sticky rice', 'som tam'],
            hawker: ['Uncle, one pad thai!', 'Spicy, please.', 'Aroi!'],
            work: ['Work in Singapore', 'Better pay', 'Send money home'],
            family: ['Miss family in Thailand', 'Remittance monthly', 'Children growing']
        },
    },
    // Myanmar (Burmese)
    myanmar: {
        name: 'Myanmar (Burmese)',
        language: 'English (Burmese-influenced) + Burmese',
        speechPatterns: {
            particles: ['na', 'le', 'de', 'ba'],
            intonation: 'gentle, soft',
            pace: 'moderate',
            volume: 'soft',
            commonPhrases: [
                'Mingalaba, how are you?',
                'Ce zu tin ba de, thank you.',
                'Ho de, yes. Ma ho bu, no.',
                'Shi de, can.',
                'Ma shi bu, cannot.',
                'A thar, delicious.',
                "Thwa, let's go.",
                'Ma yin bu, no problem.',
                'Kyi, expensive.',
                'Shwe, beautiful.',
                'Nyein, comfortable.',
                'Sa pi, eat rice.',
                'Ba, where?',
                'Beh lau, how much?',
                'Ce zu tin ba de, thank you very much.'
            ],
            greetings: ['Mingalaba!', 'Hello!', 'Good morning!'],
            farewells: ['Thwa mae!', 'Bye!', 'Take care!'],
            food: ['mohinga', 'laphet thoke', 'ohno khao swè', 'nan gyi thoke', 'mont lin ma yar'],
            hawker: ['Uncle, one mohinga!', 'Spicy, please.', 'A thar!'],
            work: ['Work in Singapore', 'Send money to family', 'Work permit renewal'],
            family: ['Miss family in Myanmar', 'Remittance monthly', 'Children growing']
        }
    }
};

export const VoiceSynthesisParams = {
    chinese_singaporean: { pitch: 1.1, rate: 1.1, lang: 'en-SG' },
    malay_singaporean: { pitch: 1.0, rate: 1.0, lang: 'en-SG' },
    indian_singaporean: { pitch: 1.05, rate: 1.15, lang: 'en-SG' },
    eurasian_singaporean: { pitch: 1.0, rate: 1.0, lang: 'en-SG' },
    filipino: { pitch: 1.15, rate: 1.1, lang: 'en-PH' },
    indonesian: { pitch: 1.0, rate: 1.0, lang: 'id-ID' },
    malaysian: { pitch: 1.0, rate: 1.05, lang: 'en-MY' },
    bangladeshi: { pitch: 0.95, rate: 0.95, lang: 'bn-BD' },
    thai: { pitch: 1.1, rate: 0.95, lang: 'th-TH' },
    myanmar: { pitch: 1.0, rate: 0.9, lang: 'my-MM' }
};

// Get random phrase for a voice profile
export function getRandomPhrase(profile, category = 'commonPhrases') {
    const phrases = SingaporeVoiceProfiles[profile]?.speechPatterns?.[category] || [];
    return phrases[Math.floor(Math.random() * phrases.length)] || '';
}

// Get greeting for a voice profile
export function getGreeting(profile) {
    const greetings = SingaporeVoiceProfiles[profile]?.speechPatterns?.greetings || ['Hello!'];
    return greetings[Math.floor(Math.random() * greetings.length)];
}

// Get farewell for a voice profile
export function getFarewell(profile) {
    const farewells = SingaporeVoiceProfiles[profile]?.speechPatterns?.farewells || ['Bye!'];
    return farewells[Math.floor(Math.random() * farewells.length)];
}

// Get food recommendation for a voice profile
export function getFoodRecommendation(profile) {
    const foods = SingaporeVoiceProfiles[profile]?.speechPatterns?.food || ['local food'];
    return foods[Math.floor(Math.random() * foods.length)];
}

// Get random voice profile
export function getRandomVoiceProfile() {
    const profiles = Object.keys(SingaporeVoiceProfiles);
    return profiles[Math.floor(Math.random() * profiles.length)];
}

// Get voice synthesis params
export function getVoiceParams(profile) {
    return VoiceSynthesisParams[profile] || { pitch: 1.0, rate: 1.0, lang: 'en-SG' };
}
