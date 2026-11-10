/**
 * Singapore Food System
 * Hawker food, restaurants, food delivery, cooking
 */

export const SingaporeFood = {
    // Hawker Dishes
    'chicken_rice': { name: 'Chicken Rice', price: 4.50, health: 15, energy: 20, happiness: 10, location: 'hawker', description: 'Singapore\'s national dish' },
    'char_kway_teow': { name: 'Char Kway Teow', price: 5.00, health: 10, energy: 25, happiness: 15, location: 'hawker', description: 'Stir-fried flat noodles' },
    'laksa': { name: 'Laksa', price: 5.50, health: 12, energy: 22, happiness: 12, location: 'hawker', description: 'Spicy coconut curry noodles' },
    'roti_prata': { name: 'Roti Prata', price: 2.00, health: 8, energy: 15, happiness: 8, location: 'hawker', description: 'Indian flatbread' },
    'satay': { name: 'Satay', price: 0.80, health: 5, energy: 10, happiness: 8, location: 'hawker', unit: 'stick', description: 'Grilled meat skewers' },
    'bak_kut_teh': { name: 'Bak Kut Teh', price: 7.00, health: 18, energy: 20, happiness: 12, location: 'hawker', description: 'Pork rib soup' },
    'chilli_crab': { name: 'Chilli Crab', price: 45.00, health: 20, energy: 25, happiness: 20, location: 'restaurant', description: 'Singapore\'s famous crab' },
    'hokkien_mee': { name: 'Hokkien Mee', price: 5.00, health: 12, energy: 22, happiness: 10, location: 'hawker', description: 'Prawn noodles' },
    'fish_head_curry': { name: 'Fish Head Curry', price: 25.00, health: 18, energy: 20, happiness: 15, location: 'restaurant', description: 'Indian-Singaporean curry' },
    'nasi_lemak': { name: 'Nasi Lemak', price: 4.00, health: 12, energy: 20, happiness: 10, location: 'hawker', description: 'Coconut rice with sambal' },
    'mee_goreng': { name: 'Mee Goreng', price: 4.50, health: 10, energy: 22, happiness: 10, location: 'hawker', description: 'Fried noodles' },
    'kaya_toast': { name: 'Kaya Toast', price: 2.50, health: 5, energy: 10, happiness: 8, location: 'kopitiam', description: 'Toast with coconut jam' },
    'soft_boiled_eggs': { name: 'Soft Boiled Eggs', price: 1.50, health: 5, energy: 8, happiness: 5, location: 'kopitiam', description: 'Traditional breakfast' },
    'kopi': { name: 'Kopi', price: 1.50, health: 3, energy: 15, happiness: 5, location: 'kopitiam', description: 'Singapore coffee' },
    'teh': { name: 'Teh', price: 1.50, health: 3, energy: 15, happiness: 5, location: 'kopitiam', description: 'Singapore tea' },
    'milo': { name: 'Milo', price: 2.00, health: 5, energy: 20, happiness: 8, location: 'kopitiam', description: 'Malt drink' },
    'bubble_tea': { name: 'Bubble Tea', price: 4.50, health: 3, energy: 15, happiness: 12, location: 'mall', description: 'Milk tea with pearls' },
    'ice_kacang': { name: 'Ice Kacang', price: 3.00, health: 5, energy: 10, happiness: 12, location: 'hawker', description: 'Shaved ice dessert' },
    'cendol': { name: 'Cendol', price: 3.00, health: 5, energy: 10, happiness: 12, location: 'hawker', description: 'Coconut milk dessert' },
    'durian': { name: 'Durian', price: 15.00, health: 8, energy: 15, happiness: 15, location: 'fruit_stall', description: 'King of fruits' }
};

export const SingaporeFoodDelivery = {
    'grabfood': { name: 'GrabFood', color: 0x00B14F, deliveryFee: 3.00, minOrder: 0 },
    'foodpanda': { name: 'Foodpanda', color: 0xFF2B85, deliveryFee: 2.50, minOrder: 0 },
    'deliveroo': { name: 'Deliveroo', color: 0x00CCBC, deliveryFee: 3.50, minOrder: 0 }
};

export class SingaporeFoodSystem {
    constructor(game) {
        this.game = game;
        this.hunger = 100;
        this.thirst = 100;
        this.lastMeal = Date.now();
        this.setupUI();
        this.startHungerLoop();
    }
    
    setupUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'food-ui';
        this.ui.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 20px;
            width: 300px;
            background: rgba(0, 0, 0, 0.85);
            border: 1px solid #ff8800;
            border-radius: 8px;
            padding: 12px;
            color: #fff;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
            display: none;
        `;
        document.body.appendChild(this.ui);
    }
    
    startHungerLoop() {
        setInterval(() => {
            this.hunger = Math.max(0, this.hunger - 1);
            this.thirst = Math.max(0, this.thirst - 2);
            
            if (this.hunger < 20) {
                if (this.game.player) {
                    this.game.player.health = Math.max(1, this.game.player.health - 1);
                }
            }
        }, 60000); // Every minute
    }
    
    eat(foodName) {
        const food = SingaporeFood[foodName];
        if (!food) return false;
        
        if (this.game.player && (this.game.player.money || 0) < food.price) {
            if (this.game.showNotification) {
                this.game.showNotification('❌ NO MONEY', `Need $${food.price} for ${food.name}`);
            }
            return false;
        }
        
        if (this.game.player) {
            this.game.player.money -= food.price;
            this.game.player.health = Math.min(100, this.game.player.health + food.health);
            this.game.player.energy = (this.game.player.energy || 50) + food.energy;
            this.game.player.happiness = (this.game.player.happiness || 50) + food.happiness;
        }
        
        this.hunger = Math.min(100, this.hunger + food.energy);
        this.thirst = Math.min(100, this.thirst + 10);
        this.lastMeal = Date.now();
        
        if (this.game.showNotification) {
            this.game.showNotification('🍜 EATING', `${food.name} - $${food.price}`);
        }
        
        // Voice
        if (window.voiceSynth) {
            const reactions = ['Shiok!', 'Sedap!', 'Aroi!', 'Masarap!', 'Enak!'];
            window.voiceSynth.speakSinglish(reactions[Math.floor(Math.random() * reactions.length)], 'chinese_singaporean');
        }
        
        return true;
    }
    
    drink(drinkName) {
        const drink = SingaporeFood[drinkName];
        if (!drink) return false;
        
        if (this.game.player && (this.game.player.money || 0) < drink.price) {
            return false;
        }
        
        if (this.game.player) {
            this.game.player.money -= drink.price;
            this.game.player.energy = (this.game.player.energy || 50) + drink.energy;
        }
        
        this.thirst = Math.min(100, this.thirst + drink.energy);
        
        return true;
    }
    
    orderDelivery(service, foodName) {
        const delivery = SingaporeFoodDelivery[service];
        const food = SingaporeFood[foodName];
        if (!delivery || !food) return false;
        
        const totalCost = food.price + delivery.deliveryFee;
        if (this.game.player && (this.game.player.money || 0) < totalCost) {
            return false;
        }
        
        if (this.game.player) {
            this.game.player.money -= totalCost;
        }
        
        // Simulate delivery time
        setTimeout(() => {
            this.eat(foodName);
            if (this.game.showNotification) {
                this.game.showNotification('🛵 DELIVERED', `${food.name} from ${delivery.name}`);
            }
        }, 30000 + Math.random() * 30000);
        
        if (this.game.showNotification) {
            this.game.showNotification('🛵 ORDERING', `${food.name} via ${delivery.name} - $${totalCost.toFixed(2)}`);
        }
        
        return true;
    }
    
    openFoodPanel() {
        this.ui.style.display = 'block';
        this.renderUI();
    }
    
    closeFoodPanel() {
        this.ui.style.display = 'none';
    }
    
    renderUI() {
        let html = '<h3 style="color: #ff8800; margin-bottom: 10px;">🍜 SINGAPORE FOOD</h3>';
        html += `<div style="margin-bottom: 8px;">Hunger: ${this.hunger}% | Thirst: ${this.thirst}%</div>`;
        
        const categories = {
            'Hawker': ['chicken_rice', 'char_kway_teow', 'laksa', 'roti_prata', 'satay', 'bak_kut_teh', 'hokkien_mee', 'nasi_lemak', 'mee_goreng', 'ice_kacang', 'cendol'],
            'Restaurant': ['chilli_crab', 'fish_head_curry'],
            'Kopitiam': ['kaya_toast', 'soft_boiled_eggs', 'kopi', 'teh', 'milo'],
            'Mall': ['bubble_tea'],
            'Fruit': ['durian']
        };
        
        for (const [cat, items] of Object.entries(categories)) {
            html += `<div style="color: #ffff00; margin: 8px 0 4px; font-weight: bold;">${cat}</div>`;
            for (const item of items) {
                const food = SingaporeFood[item];
                html += `<button onclick="window.game.foodSystem.eat('${item}')" style="
                    display: block; width: 100%; padding: 6px; margin-bottom: 3px;
                    background: rgba(255, 136, 0, 0.1); border: 1px solid #ff8800;
                    color: #ff8800; border-radius: 4px; cursor: pointer; text-align: left; font-size: 11px;
                ">${food.name} - $${food.price} (+${food.health}HP +${food.energy}EN)</button>`;
            }
        }
        
        html += '<div style="margin-top: 10px; color: #888; font-size: 10px;">Press F to close</div>';
        this.ui.innerHTML = html;
    }
    
    toggleUI() {
        this.ui.style.display = this.ui.style.display === 'none' ? 'block' : 'none';
        if (this.ui.style.display === 'block') {
            this.renderUI();
        }
    }
    
    update(delta) {
        // Update hunger/thirst
    }
}

export function getFoodInfo(foodName) {
    return SingaporeFood[foodName] || null;
}
