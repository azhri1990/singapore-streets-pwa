/**
 * Property Buying System
 * Buy HDB, condo, landed property for passive income
 */

export const SingaporeProperties = {
    'hdb_3room': {
        name: 'HDB 3-Room Flat',
        type: 'hdb',
        price: 350000,
        rental: 1800,
        location: ['toa_payoh', 'ang_mo_kio', 'jurong'],
        description: '3-room HDB flat in mature estate'
    },
    'hdb_4room': {
        name: 'HDB 4-Room Flat',
        type: 'hdb',
        price: 500000,
        rental: 2200,
        location: ['toa_payoh', 'ang_mo_kio', 'jurong', 'tampines'],
        description: '4-room HDB flat'
    },
    'hdb_5room': {
        name: 'HDB 5-Room Flat',
        type: 'hdb',
        price: 650000,
        rental: 2800,
        location: ['toa_payoh', 'ang_mo_kio', 'jurong', 'tampines', 'punggol'],
        description: '5-room HDB flat'
    },
    'condo_studio': {
        name: 'Condo Studio',
        type: 'condo',
        price: 900000,
        rental: 2500,
        location: ['orchard', 'marina_bay', 'novena'],
        description: 'Studio apartment in condo'
    },
    'condo_2br': {
        name: 'Condo 2-Bedroom',
        type: 'condo',
        price: 1500000,
        rental: 3500,
        location: ['orchard', 'marina_bay', 'novena', 'river_valley'],
        description: '2-bedroom condo'
    },
    'condo_3br': {
        name: 'Condo 3-Bedroom',
        type: 'condo',
        price: 2200000,
        rental: 4500,
        location: ['orchard', 'marina_bay', 'sentosa'],
        description: '3-bedroom condo with facilities'
    },
    'landed_terrace': {
        name: 'Terrace House',
        type: 'landed',
        price: 3000000,
        rental: 6000,
        location: ['katong', 'siglap', 'serangoon_gardens'],
        description: 'Terrace house'
    },
    'landed_semi_d': {
        name: 'Semi-Detached',
        type: 'landed',
        price: 5000000,
        rental: 8000,
        location: ['katong', 'siglap', 'bukit_timah'],
        description: 'Semi-detached house'
    },
    'landed_bungalow': {
        name: 'Bungalow',
        type: 'landed',
        price: 10000000,
        rental: 15000,
        location: ['bukit_timah', 'sentosa', 'east_coast'],
        description: 'Luxury bungalow'
    },
    'shophouse': {
        name: 'Shophouse',
        type: 'commercial',
        price: 2000000,
        rental: 5000,
        location: ['chinatown', 'kampong_glam', 'tiong_bahru'],
        description: 'Heritage shophouse'
    },
    'shop_unit': {
        name: 'Shop Unit',
        type: 'commercial',
        price: 800000,
        rental: 3000,
        location: ['hdb_estate', 'shopping_mall'],
        description: 'Retail shop unit'
    }
};

export class PropertySystem {
    constructor(game) {
        this.game = game;
        this.ownedProperties = [];
        this.rentalIncome = 0;
        this.setupUI();
        this.startRentalLoop();
    }
    
    setupUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'property-ui';
        this.ui.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            max-height: 600px;
            overflow-y: auto;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #00ff00;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            display: none;
        `;
        document.body.appendChild(this.ui);
    }
    
    openPropertyPanel() {
        this.ui.style.display = 'block';
        this.renderUI();
    }
    
    closePropertyPanel() {
        this.ui.style.display = 'none';
    }
    
    renderUI() {
        let html = '<h2 style="color: #00ff00; margin-bottom: 15px;">🏠 PROPERTY MARKET</h2>';
        
        // Owned properties
        html += '<h3 style="color: #ffff00; margin: 10px 0 5px;">Your Properties</h3>';
        if (this.ownedProperties.length === 0) {
            html += '<div style="color: #888; margin-bottom: 15px;">No properties owned yet.</div>';
        } else {
            for (const prop of this.ownedProperties) {
                html += `<div style="background: rgba(0,255,0,0.1); padding: 8px; margin-bottom: 5px; border-radius: 4px;">
                    <strong>${prop.name}</strong> - ${prop.location}<br>
                    <span style="color: #00ff00;">Rental: $${prop.rental}/month</span>
                </div>`;
            }
            html += `<div style="margin-top: 10px; color: #00ffff;">Total Monthly Income: $${this.rentalIncome}</div>`;
        }
        
        // Available properties
        html += '<h3 style="color: #ffff00; margin: 15px 0 5px;">Available Properties</h3>';
        for (const [key, prop] of Object.entries(SingaporeProperties)) {
            const canAfford = (this.game.player?.money || 0) >= prop.price;
            html += `<div style="background: rgba(255,255,255,0.05); padding: 8px; margin-bottom: 5px; border-radius: 4px; border: 1px solid ${canAfford ? '#00ff00' : '#666'};">
                <strong>${prop.name}</strong> - $${prop.price.toLocaleString()}<br>
                <span style="color: #888; font-size: 10px;">${prop.description}</span><br>
                <span style="color: #00ff00;">Rental: $${prop.rental}/month</span> | 
                <span style="color: #ffff00;">Locations: ${prop.location.join(', ')}</span><br>
                <button onclick="window.game.propertySystem.buyProperty('${key}')" style="
                    margin-top: 5px; padding: 4px 12px;
                    background: ${canAfford ? '#00ff00' : '#666'};
                    color: ${canAfford ? '#000' : '#888'};
                    border: none; border-radius: 4px; cursor: ${canAfford ? 'pointer' : 'not-allowed'};
                ">Buy</button>
            </div>`;
        }
        
        this.ui.innerHTML = html;
    }
    
    buyProperty(propertyKey) {
        const prop = SingaporeProperties[propertyKey];
        if (!prop) return false;
        
        const player = this.game.player;
        if (!player || (player.money || 0) < prop.price) {
            if (this.game.showNotification) {
                this.game.showNotification('❌ INSUFFICIENT FUNDS', `Need $${prop.price.toLocaleString()}`);
            }
            return false;
        }
        
        player.money -= prop.price;
        this.ownedProperties.push({
            key: propertyKey,
            name: prop.name,
            type: prop.type,
            location: prop.location[0],
            rental: prop.rental,
            purchasePrice: prop.price,
            purchaseDate: Date.now()
        });
        
        this.calculateRentalIncome();
        
        if (this.game.showNotification) {
            this.game.showNotification('🏠 PROPERTY BOUGHT', `${prop.name} - $${prop.price.toLocaleString()}`);
        }
        
        this.renderUI();
        return true;
    }
    
    sellProperty(index) {
        if (index < 0 || index >= this.ownedProperties.length) return false;
        
        const prop = this.ownedProperties[index];
        const sellPrice = Math.round(prop.purchasePrice * (0.8 + Math.random() * 0.4));
        
        if (this.game.player) {
            this.game.player.money += sellPrice;
        }
        
        this.ownedProperties.splice(index, 1);
        this.calculateRentalIncome();
        
        if (this.game.showNotification) {
            this.game.showNotification('💰 PROPERTY SOLD', `${prop.name} - $${sellPrice.toLocaleString()}`);
        }
        
        this.renderUI();
        return true;
    }
    
    calculateRentalIncome() {
        this.rentalIncome = this.ownedProperties.reduce((sum, prop) => sum + prop.rental, 0);
    }
    
    startRentalLoop() {
        // Pay rental income every 5 minutes (simulating monthly)
        setInterval(() => {
            if (this.rentalIncome > 0 && this.game.player) {
                this.game.player.money += this.rentalIncome;
                if (this.game.showNotification) {
                    this.game.showNotification('💰 RENTAL INCOME', `+$${this.rentalIncome} from properties`);
                }
            }
        }, 300000); // 5 minutes
    }
    
    toggleUI() {
        this.ui.style.display = this.ui.style.display === 'none' ? 'block' : 'none';
        if (this.ui.style.display === 'block') {
            this.renderUI();
        }
    }
    
    save() {
        return {
            ownedProperties: this.ownedProperties,
            rentalIncome: this.rentalIncome
        };
    }
    
    load(data) {
        if (data) {
            this.ownedProperties = data.ownedProperties || [];
            this.rentalIncome = data.rentalIncome || 0;
        }
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.PropertySystem = PropertySystem;
}
