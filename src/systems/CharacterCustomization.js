/**
 * Character Customization System
 * GTA + Hitman style character creation
 */

export const CharacterOptions = {
    gender: ['male', 'female', 'non_binary'],
    height: { min: 150, max: 200, default: 170 }, // cm
    weight: { min: 40, max: 120, default: 70 }, // kg
    skinTone: {
        'very_light': 0xF5DEB3,
        'light': 0xEAC8A8,
        'medium_light': 0xD2A679,
        'medium': 0x8B7355,
        'medium_dark': 0x6B4423,
        'dark': 0x4A3728,
        'very_dark': 0x2C1810
    },
    hairStyles: {
        male: ['buzz', 'crew', 'flat', 'pompadour', 'mohawk', 'afro', 'mullet', 'ponytail', 'bald', 'spiky', 'slicked', 'curly'],
        female: ['long', 'short', 'bob', 'ponytail', 'bun', 'braids', 'curly', 'wavy', 'pixie', 'afro', 'dreadlocks', 'bangs']
    },
    hairColors: {
        'black': 0x1a1a1a,
        'brown': 0x5a3c22,
        'blonde': 0xd8b86a,
        'red': 0xa8482a,
        'grey': 0x8a8a90,
        'white': 0xf0f0f0,
        'blue': 0x0000FF,
        'green': 0x00FF00,
        'pink': 0xFF69B4,
        'purple': 0x800080
    },
    eyeColors: {
        'brown': 0x4a3728,
        'black': 0x1a1a1a,
        'blue': 0x0000FF,
        'green': 0x008000,
        'hazel': 0x8B7355,
        'grey': 0x808080
    },
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond', 'oblong'],
    clothes: {
        casual: {
            shirts: ['tshirt', 'polo', 'button_down', 'hoodie', 'tank_top'],
            pants: ['jeans', 'shorts', 'chinos', 'joggers', 'cargo'],
            shoes: ['sneakers', 'sandals', 'boots', 'flip_flops'],
            accessories: ['watch', 'sunglasses', 'cap', 'chain', 'earrings']
        },
        formal: {
            shirts: ['dress_shirt', 'blouse', 'suit_jacket'],
            pants: ['dress_pants', 'skirt', 'suit_pants'],
            shoes: ['dress_shoes', 'heels', 'loafers'],
            accessories: ['tie', 'watch', 'cufflinks', 'belt']
        },
        work: {
            shirts: ['uniform', 'polo', 'apron'],
            pants: ['work_pants', 'jeans'],
            shoes: ['work_boots', 'safety_shoes'],
            accessories: ['id_badge', 'helmet', 'gloves']
        },
        gang: {
            shirts: ['gang_colors', 'hoodie', 'tank_top'],
            pants: ['baggy_jeans', 'cargo', 'shorts'],
            shoes: ['sneakers', 'boots'],
            accessories: ['bandana', 'chain', 'cap', 'tattoo']
        }
    },
    tattoos: {
        locations: ['arm', 'neck', 'back', 'chest', 'leg', 'face'],
        designs: ['tribal', 'dragon', 'tiger', 'snake', 'skull', 'flower', 'text', 'geometric', 'sleeve']
    },
    accessories: {
        glasses: ['none', 'reading', 'sunglasses', 'aviator', 'round', 'square'],
        jewelry: ['none', 'chain', 'necklace', 'bracelet', 'ring', 'earrings'],
        hats: ['none', 'cap', 'fedora', 'beanie', 'bucket', 'bandana'],
        masks: ['none', 'surgical', 'n95', 'bandana', 'balaclava']
    }
};

export class CharacterCustomization {
    constructor(game) {
        this.game = game;
        this.character = {
            gender: 'male',
            height: 170,
            weight: 70,
            skinTone: 'medium',
            hairStyle: 'crew',
            hairColor: 'black',
            eyeColor: 'brown',
            faceShape: 'oval',
            clothes: {
                top: 'tshirt',
                bottom: 'jeans',
                shoes: 'sneakers',
                accessory: 'none'
            },
            tattoos: [],
            accessories: {
                glasses: 'none',
                jewelry: 'none',
                hat: 'none',
                mask: 'none'
            }
        };
        
        this.setupUI();
    }
    
    setupUI() {
        // Character creation panel
        this.panel = document.createElement('div');
        this.panel.id = 'character-customization';
        this.panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            max-height: 600px;
            overflow-y: auto;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #00ffff;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            display: none;
        `;
        document.body.appendChild(this.panel);
    }
    
    openCustomization() {
        this.panel.style.display = 'block';
        this.renderUI();
    }
    
    closeCustomization() {
        this.panel.style.display = 'none';
    }
    
    renderUI() {
        let html = '<h2 style="color: #00ffff; margin-bottom: 15px;">👤 CHARACTER CUSTOMIZATION</h2>';
        
        // Gender
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="color: #00ff00;">Gender:</label><br>';
        for (const g of CharacterOptions.gender) {
            html += `<button onclick="window.game.charCustom.setGender('${g}')" style="margin: 2px; padding: 4px 8px; background: ${this.character.gender === g ? '#00ffff' : '#333'}; color: ${this.character.gender === g ? '#000' : '#fff'}; border: none; border-radius: 4px; cursor: pointer;">${g}</button>`;
        }
        html += '</div>';
        
        // Height
        html += '<div style="margin-bottom: 15px;">';
        html += `<label style="color: #00ff00;">Height: ${this.character.height}cm</label><br>`;
        html += `<input type="range" min="${CharacterOptions.height.min}" max="${CharacterOptions.height.max}" value="${this.character.height}" onchange="window.game.charCustom.setHeight(this.value)" style="width: 100%;">`;
        html += '</div>';
        
        // Weight
        html += '<div style="margin-bottom: 15px;">';
        html += `<label style="color: #00ff00;">Weight: ${this.character.weight}kg</label><br>`;
        html += `<input type="range" min="${CharacterOptions.weight.min}" max="${CharacterOptions.weight.max}" value="${this.character.weight}" onchange="window.game.charCustom.setWeight(this.value)" style="width: 100%;">`;
        html += '</div>';
        
        // Skin Tone
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="color: #00ff00;">Skin Tone:</label><br>';
        for (const [tone, color] of Object.entries(CharacterOptions.skinTone)) {
            html += `<button onclick="window.game.charCustom.setSkinTone('${tone}')" style="margin: 2px; width: 30px; height: 30px; background: #${color.toString(16).padStart(6, '0')}; border: 2px solid ${this.character.skinTone === tone ? '#00ffff' : '#333'}; border-radius: 4px; cursor: pointer;"></button>`;
        }
        html += '</div>';
        
        // Hair Style
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="color: #00ff00;">Hair Style:</label><br>';
        const hairStyles = CharacterOptions.hairStyles[this.character.gender] || CharacterOptions.hairStyles.male;
        for (const style of hairStyles) {
            html += `<button onclick="window.game.charCustom.setHairStyle('${style}')" style="margin: 2px; padding: 4px 8px; background: ${this.character.hairStyle === style ? '#00ffff' : '#333'}; color: ${this.character.hairStyle === style ? '#000' : '#fff'}; border: none; border-radius: 4px; cursor: pointer; font-size: 10px;">${style}</button>`;
        }
        html += '</div>';
        
        // Hair Color
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="color: #00ff00;">Hair Color:</label><br>';
        for (const [color, hex] of Object.entries(CharacterOptions.hairColors)) {
            html += `<button onclick="window.game.charCustom.setHairColor('${color}')" style="margin: 2px; width: 25px; height: 25px; background: #${hex.toString(16).padStart(6, '0')}; border: 2px solid ${this.character.hairColor === color ? '#00ffff' : '#333'}; border-radius: 4px; cursor: pointer;"></button>`;
        }
        html += '</div>';
        
        // Eye Color
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="color: #00ff00;">Eye Color:</label><br>';
        for (const [color, hex] of Object.entries(CharacterOptions.eyeColors)) {
            html += `<button onclick="window.game.charCustom.setEyeColor('${color}')" style="margin: 2px; width: 25px; height: 25px; background: #${hex.toString(16).padStart(6, '0')}; border: 2px solid ${this.character.eyeColor === color ? '#00ffff' : '#333'}; border-radius: 4px; cursor: pointer;"></button>`;
        }
        html += '</div>';
        
        // Face Shape
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="color: #00ff00;">Face Shape:</label><br>';
        for (const shape of CharacterOptions.faceShapes) {
            html += `<button onclick="window.game.charCustom.setFaceShape('${shape}')" style="margin: 2px; padding: 4px 8px; background: ${this.character.faceShape === shape ? '#00ffff' : '#333'}; color: ${this.character.faceShape === shape ? '#000' : '#fff'}; border: none; border-radius: 4px; cursor: pointer; font-size: 10px;">${shape}</button>`;
        }
        html += '</div>';
        
        // Clothes
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="color: #00ff00;">Clothes:</label><br>';
        html += '<select onchange="window.game.charCustom.setClothes(\'top\', this.value)" style="margin: 2px; padding: 4px; background: #333; color: #fff; border: 1px solid #00ffff; border-radius: 4px;">';
        for (const item of CharacterOptions.clothes.casual.shirts) {
            html += `<option value="${item}" ${this.character.clothes.top === item ? 'selected' : ''}>${item}</option>`;
        }
        html += '</select>';
        html += '<select onchange="window.game.charCustom.setClothes(\'bottom\', this.value)" style="margin: 2px; padding: 4px; background: #333; color: #fff; border: 1px solid #00ffff; border-radius: 4px;">';
        for (const item of CharacterOptions.clothes.casual.pants) {
            html += `<option value="${item}" ${this.character.clothes.bottom === item ? 'selected' : ''}>${item}</option>`;
        }
        html += '</select>';
        html += '<select onchange="window.game.charCustom.setClothes(\'shoes\', this.value)" style="margin: 2px; padding: 4px; background: #333; color: #fff; border: 1px solid #00ffff; border-radius: 4px;">';
        for (const item of CharacterOptions.clothes.casual.shoes) {
            html += `<option value="${item}" ${this.character.clothes.shoes === item ? 'selected' : ''}>${item}</option>`;
        }
        html += '</select>';
        html += '</div>';
        
        // Accessories
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="color: #00ff00;">Accessories:</label><br>';
        html += '<select onchange="window.game.charCustom.setAccessory(\'glasses\', this.value)" style="margin: 2px; padding: 4px; background: #333; color: #fff; border: 1px solid #00ffff; border-radius: 4px;">';
        for (const item of CharacterOptions.accessories.glasses) {
            html += `<option value="${item}" ${this.character.accessories.glasses === item ? 'selected' : ''}>Glasses: ${item}</option>`;
        }
        html += '</select>';
        html += '<select onchange="window.game.charCustom.setAccessory(\'hat\', this.value)" style="margin: 2px; padding: 4px; background: #333; color: #fff; border: 1px solid #00ffff; border-radius: 4px;">';
        for (const item of CharacterOptions.accessories.hats) {
            html += `<option value="${item}" ${this.character.accessories.hat === item ? 'selected' : ''}>Hat: ${item}</option>`;
        }
        html += '</select>';
        html += '</div>';
        
        // Tattoos
        html += '<div style="margin-bottom: 15px;">';
        html += '<label style="color: #00ff00;">Tattoos:</label><br>';
        for (const design of CharacterOptions.tattoos.designs) {
            html += `<button onclick="window.game.charCustom.addTattoo('${design}')" style="margin: 2px; padding: 4px 8px; background: #333; color: #fff; border: 1px solid #ff00ff; border-radius: 4px; cursor: pointer; font-size: 10px;">${design}</button>`;
        }
        html += '</div>';
        
        // Save button
        html += '<div style="margin-top: 20px; text-align: center;">';
        html += '<button onclick="window.game.charCustom.saveCharacter()" style="padding: 10px 30px; background: linear-gradient(90deg, #00ffff, #ff00ff); color: #000; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Save Character</button>';
        html += '</div>';
        
        this.panel.innerHTML = html;
    }
    
    setGender(gender) {
        this.character.gender = gender;
        this.renderUI();
    }
    
    setHeight(height) {
        this.character.height = parseInt(height);
    }
    
    setWeight(weight) {
        this.character.weight = parseInt(weight);
    }
    
    setSkinTone(tone) {
        this.character.skinTone = tone;
        this.renderUI();
    }
    
    setHairStyle(style) {
        this.character.hairStyle = style;
        this.renderUI();
    }
    
    setHairColor(color) {
        this.character.hairColor = color;
        this.renderUI();
    }
    
    setEyeColor(color) {
        this.character.eyeColor = color;
        this.renderUI();
    }
    
    setFaceShape(shape) {
        this.character.faceShape = shape;
        this.renderUI();
    }
    
    setClothes(type, item) {
        this.character.clothes[type] = item;
    }
    
    setAccessory(type, item) {
        this.character.accessories[type] = item;
    }
    
    addTattoo(design) {
        if (!this.character.tattoos.includes(design)) {
            this.character.tattoos.push(design);
        }
    }
    
    saveCharacter() {
        localStorage.setItem('singapore-streets-character', JSON.stringify(this.character));
        if (this.game.showNotification) {
            this.game.showNotification('👤 CHARACTER SAVED', 'Your character has been saved!');
        }
        this.closeCustomization();
    }
    
    loadCharacter() {
        const saved = localStorage.getItem('singapore-streets-character');
        if (saved) {
            this.character = JSON.parse(saved);
            return true;
        }
        return false;
    }
    
    applyCharacterToMesh(mesh) {
        // Apply customization to 3D mesh
        // This would update the character model based on settings
        const skinColor = CharacterOptions.skinTone[this.character.skinTone];
        const hairColor = CharacterOptions.hairColors[this.character.hairColor];
        
        mesh.traverse((child) => {
            if (child.isMesh && child.material) {
                if (child.userData.part === 'skin') {
                    child.material.color.setHex(skinColor);
                }
                if (child.userData.part === 'hair') {
                    child.material.color.setHex(hairColor);
                }
            }
        });
        
        // Scale based on height
        const heightScale = this.character.height / 170;
        mesh.scale.y = heightScale;
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.CharacterCustomization = CharacterCustomization;
}
