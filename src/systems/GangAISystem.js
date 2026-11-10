/**
 * Gang AI System
 * Gang behaviors, territory control, AI
 */

export class GangAISystem {
    constructor(game) {
        this.game = game;
        this.gangs = {};
        this.territoryControl = {};
        this.activeGangWars = [];
        this.gangMembers = [];
    }

    registerGang(gangId, data) {
        this.gangs[gangId] = {
            id: gangId,
            name: data.name,
            color: data.color,
            territory: data.territory,
            members: [],
            reputation: 50,
            aggression: data.aggression || 0.5,
            wealth: 1000
        };
    }

    spawnGangMember(gangId, position) {
        const gang = this.gangs[gangId];
        if (!gang) return null;

        const member = {
            gangId: gangId,
            position: position.clone(),
            health: 100,
            weapon: this.getRandomWeapon(),
            state: 'patrol',
            target: null,
            lastAction: Date.now()
        };

        gang.members.push(member);
        this.gangMembers.push(member);

        return member;
    }

    getRandomWeapon() {
        const weapons = ['fists', 'bat', 'knife', 'parang', 'pistol'];
        return weapons[Math.floor(Math.random() * weapons.length)];
    }

    update(delta) {
        for (const member of this.gangMembers) {
            this.updateGangMember(member, delta);
        }

        // Check for gang wars
        this.checkGangWars();
    }

    updateGangMember(member, delta) {
        const gang = this.gangs[member.gangId];
        if (!gang) return;

        // State machine
        switch(member.state) {
            case 'patrol':
                this.patrol(member, gang);
                break;
            case 'attack':
                this.attack(member);
                break;
            case 'defend':
                this.defend(member, gang);
                break;
            case 'flee':
                this.flee(member);
                break;
        }
    }

    patrol(member, gang) {
        // Random patrol movement
        if (Math.random() < 0.02) {
            member.position.x += (Math.random() - 0.5) * 5;
            member.position.z += (Math.random() - 0.5) * 5;
        }

        // Check for enemies
        const enemy = this.findEnemy(member);
        if (enemy) {
            member.state = 'attack';
            member.target = enemy;
        }
    }

    attack(member) {
        if (!member.target) {
            member.state = 'patrol';
            return;
        }

        // Move toward target
        const dir = member.target.position.clone().sub(member.position).normalize();
        member.position.addScaledVector(dir, 0.1);

        // Attack if close
        const dist = member.position.distanceTo(member.target.position);
        if (dist < 2) {
            this.performAttack(member, member.target);
        }
    }

    defend(member, gang) {
        // Defend territory center
        const territory = gang.territory;
        if (territory) {
            const dir = territory.center.clone().sub(member.position).normalize();
            member.position.addScaledVector(dir, 0.05);
        }
    }

    flee(member) {
        // Run away from threat
        if (member.target) {
            const dir = member.position.clone().sub(member.target.position).normalize();
            member.position.addScaledVector(dir, 0.2);
        }
    }

    findEnemy(member) {
        for (const other of this.gangMembers) {
            if (other.gangId !== member.gangId && other.health > 0) {
                const dist = member.position.distanceTo(other.position);
                if (dist < 20) {
                    return other;
                }
            }
        }
        return null;
    }

    performAttack(attacker, target) {
        const damage = this.getWeaponDamage(attacker.weapon);
        target.health -= damage;

        if (target.health <= 0) {
            target.state = 'dead';
            // Gore effect
            if (this.game.goreSystem) {
                this.game.goreSystem.createMeleeGore(target.position, attacker.weapon);
            }
        }
    }

    getWeaponDamage(weapon) {
        const damages = {
            'fists': 5,
            'bat': 15,
            'knife': 20,
            'parang': 30,
            'pistol': 40
        };
        return damages[weapon] || 5;
    }

    checkGangWars() {
        // Check if any territories overlap
        for (const gang1 of Object.values(this.gangs)) {
            for (const gang2 of Object.values(this.gangs)) {
                if (gang1.id === gang2.id) continue;
                
                const dist = gang1.territory.center.distanceTo(gang2.territory.center);
                if (dist < gang1.territory.radius + gang2.territory.radius) {
                    // Potential war
                    if (Math.random() < 0.01) {
                        this.startGangWar(gang1, gang2);
                    }
                }
            }
        }
    }

    startGangWar(gang1, gang2) {
        const war = {
            gang1: gang1.id,
            gang2: gang2.id,
            active: true,
            startTime: Date.now()
        };
        this.activeGangWars.push(war);

        // Trigger all members to attack
        for (const member of this.gangMembers) {
            if (member.gangId === gang1.id || member.gangId === gang2.id) {
                member.state = 'attack';
            }
        }

        if (this.game.singaporeRealism) {
            this.game.singaporeRealism.triggerGangWar(
                this.game.singaporeRealism.gangTerritories.find(t => t.gang === gang1.name),
                this.game.singaporeRealism.gangTerritories.find(t => t.gang === gang2.name)
            );
        }
    }

    destroy() {
        this.gangs = {};
        this.gangMembers = [];
        this.activeGangWars = [];
    }
}

if (typeof window !== 'undefined') {
    window.GangAISystem = GangAISystem;
}