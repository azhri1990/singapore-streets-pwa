/**
 * Hawker Food System
 * Singapore hawker food items, eating, effects
 */

export class HawkerFoodSystem {
    constructor(game) {
        this.game = game;
        this.foodItems = {
            'chicken-rice': { name: 'Hainanese Chicken Rice', price: 4.50, health: 30, stamina: 20, spiciness: 0 },
            'laksa': { name: 'Laksa', price: 5.00, health: 25, stamina: 15, spiciness: 3 },
            'char-kway-teow': { name: 'Char Kway Teow', price: 4.00, health: 35, stamina: 25, spiciness: 2 },
            'satay': { name: 'Satay', price: 6.00, health: 20, stamina: 15, spiciness: 2 },
            'roti-prata': { name: 'Roti Prata', price: 3.50, health: 25, stamina: 20, spiciness: 1 },
            'bak-kut-teh': { name: 'Bak Kut Teh', price: 7.00, health: 40, stamina: 30, spiciness: 1 },
            'chili-crab': { name: 'Chili Crab', price: 25.00, health: 50, stamina: 40, spiciness: 4 },
            'fish-head-curry': { name: 'Fish Head Curry', price: 15.00, health: 45, stamina: 35, spiciness: 3 },
            'nasi-lemak': { name: 'Nasi Lemak', price: 4.50, health: 30, stamina: 25, spiciness: 2 },
            'mee-goreng': { name: 'Mee Goreng', price: 4.00, health: 30, stamina: 20, spiciness: 3 },
            'oyster-omelette': { name: 'Oyster Omelette', price: 6.00, health: 35, stamina: 25, spiciness: 1 },
            'ice-kacang': { name: 'Ice Kacang', price: 3.00, health: 15, stamina: 10, spiciness: 0 },
            'teh-tarik': { name: 'Teh Tarik', price: 1.50, health: 5, stamina: 15, spiciness: 0 },
            'kopi': { name: 'Kopi', price: 1.20, health: 5, stamina: 20, spiciness: 0 },
            'bandung': { name: 'Bandung', price: 2.00, health: 10, stamina: 15, spiciness: 0 }
        };
        this.eatenToday = [];
    }

    eat(foodId) {
        const food = this.foodItems[foodId];
        if (!food) return false;

        if (this.game.player) {
            this.game.player.health = Math.min(100, (this.game.player.health || 100) + food.health);
            this.game.player.stamina = Math.min(100, (this.game.player.stamina || 100) + food.stamina);
            this.game.player.money = (this.game.player.money || 0) - food.price;
            
            this.eatenToday.push(foodId);
            
            this.game.showNotification('Ate ' + food.name, '+Health +' + food.health + ' +Stamina +' + food.stamina);
            
            // Spiciness effect
            if (food.spiciness > 2) {
                this.applySpicinessEffect(food.spiciness);
            }
        }

        return true;
    }

    applySpicinessEffect(level) {
        // High spiciness causes temporary effects
        if (level >= 4) {
            // Chili crab - intense heat
            this.game.showNotification('Spicy!', 'Your mouth is on fire!');
        }
    }

    getFoodList() {
        return Object.entries(this.foodItems).map(([id, data]) => ({
            id,
            ...data
        }));
    }

    createHawkerUI() {
        const panel = document.createElement('div');
        panel.id = 'hawker-panel';
        panel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;max-height:500px;overflow-y:auto;background:rgba(10,10,30,0.95);border:2px solid #FFD700;border-radius:8px;padding:15px;z-index:10000;color:#fff;';

        let html = '<h2 style="color:#FFD700;margin-bottom:15px;">🍽️ HAWKER CENTRE</h2>';
        html += '<div style="margin-bottom:10px;color:#aaa;">Press F to close</div>';

        for (const [id, food] of Object.entries(this.foodItems)) {
            html += '<button onclick="window.game.hawkerFood.eat(\'' + id + '\')" style="display:block;width:100%;padding:8px;margin-bottom:5px;background:rgba(255,215,0,0.1);border:1px solid #FFD700;color:#FFD700;border-radius:4px;cursor:pointer;text-align:left;">';
            html += food.name + ' - $' + food.price.toFixed(2) + ' (+' + food.health + ' HP, +' + food.stamina + ' STA)';
            html += '</button>';
        }

        panel.innerHTML = html;
        document.body.appendChild(panel);
        return panel;
    }

    toggleUI() {
        if (!this.panel) {
            this.panel = this.createHawkerUI();
        }
        this.panel.style.display = this.panel.style.display === 'none' ? 'block' : 'none';
    }

    update(delta) {}

    destroy() {
        if (this.panel) {
            this.panel.remove();
        }
        this.eatenToday = [];
    }
}

if (typeof window !== 'undefined') {
    window.HawkerFoodSystem = HawkerFoodSystem;
}