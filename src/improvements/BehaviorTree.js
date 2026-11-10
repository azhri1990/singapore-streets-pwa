/**
 * Enhanced Behavior Tree System for NPCs
 * Port of efficient behavior tree patterns from game AI research repos.
 * Supports composite, decorator, and state-machine nodes with Singlish-aware context.
 */

// --- Core Node Types ---
export class BehaviorNode {
    constructor(type, options = {}) {
        this.name = options.name || type;
        this.type = type;
        this.children = options.children || [];
        this.parent = options.parent || null;
        this.condition = options.condition || null;
        this.decorator = options.decorator || null;
        this.timeout = options.timeout || 0; // ms, 0 = infinite
        this.priority = options.priority || 0;
        this.enabled = options.enabled !== false;
        this.lastRun = 0;
    }

    // Evaluate this node (returns 'active', 'inactive', 'success', 'fail', or 'error')
    evaluate(state) {
        if (!this.enabled) return 'inactive';

        // Check timeout
        if (this.timeout > 0 && Date.now() - this.lastRun > this.timeout) return 'inactive';

        // Check condition
        if (this.condition) {
            try {
                const result = this.condition(state);
                if (!result) return this._decideParent(state);
            } catch (e) {
                console.warn(`Condition error on node ${this.name}:`, e);
                return 'inactive';
            }
        }

        return this._decideParent(state);
    }

    _decideParent(state) {
        switch (this.type) {
            case 'sequence': return this._evaluateSequence(state);
            case 'selector': return this._evaluateSelector(state);
            case 'parallel': return this._evaluateParallel(state);
            case 'behavior': return this._evaluateBehavior(state);
            default: return this.children[0] ? 'active' : 'inactive';
        }
    }

    _evaluateSequence(state) {
        for (let i = 0; i < this.children.length; i++) {
            const result = this.children[i].evaluate(state);
            if (result === 'inactive') return 'inactive';
            if (result === 'error') return 'inactive';
            if (result === 'fail') return 'fail';
        }
        return 'success';
    }

    _evaluateSelector(state) {
        for (let i = 0; i < this.children.length; i++) {
            const result = this.children[i].evaluate(state);
            if (result !== 'inactive') return result;
        }
        return 'inactive';
    }

    _evaluateParallel(state) {
        const results = this.children.map(c => c.evaluate(state));
        const allSuccess = results.every(r => r === 'success');
        const anyFailure = results.some(r => r === 'fail');
        if (allSuccess) return 'success';
        if (anyFailure) return 'fail';
        return 'inactive';
    }

    _evaluateBehavior(state) {
        // Simple leaf behavior - just call callback
        if (this.callback) {
            try {
                this.callback(state);
            } catch (e) {
                console.warn(`Behavior callback error on ${this.name}:`, e);
            }
        }
        return 'success';
    }

    // Wrap child evaluation with decorator logic
    _withDecorator(childResult, state) {
        if (!this.decorator) return childResult;
        try {
            return this.decorator(childResult, state);
        } catch (e) {
            console.warn(`Decorator error on ${this.name}:`, e);
            return 'error';
        }
    }

    run(state) {
        this.lastRun = Date.now();
        return this.evaluate(state);
    }
}

// --- Decorators ---
export class DecoratorFactory {
    static AlwaysRunDecorator(result, state) {
        return result;
    }

    static NeverRunDecorator(result, state) {
        return 'inactive';
    }

    static InvertDecorator(result, state) {
        return result === 'success' ? 'fail' : 'inactive';
    }

    static NotDecorator(result, state) {
        return result === 'success' ? 'inactive' : 'success';
    }

    static PriorityDecorator(result, state) {
        return result;
    }
}

// Wrap a child node with a decorator
function decorateNode(decoratorFn, childNode) {
    const wrappedChild = new BehaviorNode('behavior', {
        name: `ChildDecorated`,
        type: 'behavior',
        callback: (state) => childNode.run(state)
    });

    const decorated = new BehaviorNode('behavior', {
        name: `Decorator(${decoratorFn.name || 'fn'})`,
        type: 'behavior',
        callback: (state) => decoratorFn(wrappedChild.run(state), state),
        children: [wrappedChild]
    });

    decorated.decorator = decoratorFn;
    return decorated;
}

// --- Tree Builder Functions ---
export const Builder = {
    sequence: function(...nodes) {
        const parent = new BehaviorNode('sequence', { children: nodes });
        nodes.forEach((n) => { n.parent = parent; });
        return parent;
    },

    selector: function(...nodes) {
        const parent = new BehaviorNode('selector', { children: nodes });
        nodes.forEach((n) => { n.parent = parent; });
        return parent;
    },

    parallel: function(...nodes) {
        const parent = new BehaviorNode('parallel', { children: nodes });
        nodes.forEach((n) => { n.parent = parent; });
        return parent;
    },

    behavior: function(callback, options = {}) {
        return new BehaviorNode('behavior', { name: options.name, type: 'behavior', callback, ...options });
    },

    loop: function(callback, iterations = -1, options = {}) {
        const node = new BehaviorNode('behavior', { name: (options.name || 'loop'), type: 'behavior', callback, ...options });
        node.iterations = iterations;
        node.iterationCount = 0;
        node.maxIterations = iterations;
        return node;
    },

    decorate: function(decoratorFn, childNode) {
        return decorateNode(decoratorFn, childNode);
    },

    alwaysRun: function(childNode) {
        return decorateNode(DecoratorFactory.AlwaysRunDecorator, childNode);
    },

    not: function(childNode) {
        return decorateNode(DecoratorFactory.NotDecorator, childNode);
    }
};

// --- Faction Awareness ---
export class FactionManager {
    constructor() {
        this.factions = new Map();
        this.entities = new Map();
    }

    addFaction(id, data) {
        this.factions.set(id, {
            ...data,
            members: [],
            territory: null,
            alignment: 0 // -1 (hostile) to +1 (ally)
        });
    }

    addEntityToFaction(entityId, factionId, data = {}) {
        const faction = this.factions.get(factionId);
        if (!faction) return;
        const entity_data = { entityId, ...data };
        faction.members.push(entity_data);
        this.entities.set(entityId, entity_data);
    }

    getEntitiesNear(playerPos, radius = 50) {
        const nearby = [];
        for (const [, entity] of this.entities) {
            const dist = Math.hypot(entity.pos[0] - playerPos[0], entity.pos[1] - playerPos[1]);
            if (dist < radius) nearby.push({ entity, distance: dist });
        }
        nearby.sort((a, b) => a.distance - b.distance);
        return nearby;
    }

    getEntity(entityId) {
        return this.entities.get(entityId);
    }
}

// --- NPC Context for Singlish AI ---
export const NPCContext = {
    makeFromNPCType(npcType) {
        const profiles = {
            'hawker': { speak: 'hawker', singlish: true, vocabulary: ['lah', 'leh', 'lor', 'meh'] },
            'taxi': { speak: 'taxi', singlish: true, vocabulary: ['lah', 'leh', 'lor', 'meh'] },
            'police': { speak: 'police', singlish: true, vocabulary: ['lah', 'le', 'kan', 'ah'] },
            'student': { speak: 'student', singlish: true, vocabulary: ['lah', 'leh', 'sia', 'meh'] },
            'office': { speak: 'office', singlish: false, vocabulary: [] },
            'elderly': { speak: 'elderly', singlish: true, vocabulary: ['ah', 'boy', 'lah', 'jia'] },
            'tourist': { speak: 'tourist', singlish: false, vocabulary: [] }
        };
        return profiles[npcType] || profiles.hawker;
    }
};

// --- Behavior Tree Examples ---
export const BehaviorTrees = {
    hawker_cooking: () => {
        // Hawker uncle cooking AI:
        // If rain → go home early
        // If customer approaches → cook
        // Else → prep
        const listenRain = Builder.behavior(
            (ctx) => ctx.weather && ctx.weather.rainProbability > 0.5,
            { name: 'listen_rain', timeout: 2000 }
        );
        const goHome = Builder.behavior(
            (ctx) => { ctx.aiState = 'go_home'; return 'success'; },
            { name: 'go_home', timeout: 2000 }
        );
        const checkCustomer = Builder.behavior(
            (ctx) => ctx.proximity && ctx.proximity.customerDist < 3,
            { name: 'check_customer', timeout: 2000 }
        );
        const cookAction = Builder.behavior(
            (ctx) => { ctx.aiState = 'cooking'; ctx.dialogue = 'Chew! Chicken rice!'; return 'success'; },
            { name: 'cook', timeout: 60000 }
        );
        const prepAction = Builder.behavior(
            (ctx) => { ctx.aiState = 'prep'; ctx.dialogue = 'Preparing special...'; return 'success'; },
            { name: 'prep', timeout: 1000 }
        );

        return Builder.selector([
            Builder.decorate(DecoratorFactory.NotDecorator, listenRain),
            Builder.selector([checkCustomer, cookAction]),
            Builder.selector([prepAction])
        ]);
    },

    traffic_driving: () => {
        // Traffic driving AI:
        // Near ERP → slow down & pay
        // Near junction → stop & wait
        // Else → follow carriageway
        const nearERP = Builder.behavior(
            (ctx) => ctx.navTarget && ctx.navTarget.erpZones.some(z => z.active && z.dist < 200),
            { name: 'near_erp', timeout: 1000 }
        );
        const slowDown = Builder.behavior(
            (ctx) => { ctx.currentSpeed *= 0.5; return 'success'; },
            { name: 'slow_down', timeout: 2000 }
        );
        const nearJunction = Builder.behavior(
            (ctx) => ctx.navTarget && ctx.navTarget.junctions.some(j => j.type === 'junction'),
            { name: 'near_junction', timeout: 2000 }
        );
        const stopAndWait = Builder.behavior(
            (ctx) => { ctx.stopTimer = 3; return 'success'; },
            { name: 'stop_wait', timeout: 2000 }
        );
        const followCarry = Builder.behavior(
            (ctx) => { ctx.currentSpeed = ctx.targetSpeed; return 'success'; },
            { name: 'follow', timeout: 2000 }
        );

        return Builder.selector([
            Builder.selector([nearERP, slowDown]),
            Builder.selector([nearJunction, stopAndWait]),
            Builder.selector([followCarry])
        ]);
    },

    delivery_rider: () => {
        // Delivery rider AI:
        // If order pending → navigate to pickup → deliver
        // If in traffic → wait & follow queue
        const orderPending = Builder.behavior(
            (ctx) => ctx.orders && ctx.orders.some(o => !o.completed && o.status === 'pending'),
            { name: 'order_pending', timeout: 5000 }
        );
        const navigatePickup = Builder.behavior(
            (ctx) => { const o = ctx.orders.find(o2 => !o2.completed); ctx.route = o.pickup; ctx.aiState = 'navigate'; return 'success'; },
            { name: 'navigate_pickup', timeout: 0 }
        );
        const navigateDelivery = Builder.behavior(
            (ctx) => { const o = ctx.orders.find(o2 => !o2.completed); ctx.route = o.deliverTo; ctx.aiState = 'navigate'; return 'success'; },
            { name: 'navigate_delivery', timeout: 0 }
        );
        const inTraffic = Builder.behavior(
            (ctx) => ctx.speed < 15,
            { name: 'in_traffic', timeout: 1000 }
        );
        const followQueue = Builder.behavior(
            (ctx) => { ctx.queueTimer++; return 'success'; },
            { name: 'follow_queue', timeout: 1000 }
        );
        const completeOrder = Builder.behavior(
            (ctx) => { ctx.orders = ctx.orders.map(o => o.completed ? o : { ...o, completed: true }); return 'success'; },
            { name: 'complete_order', timeout: 2000 }
        );

        return Builder.selector([
            Builder.selector([orderPending, navigatePickup, navigateDelivery, completeOrder]),
            Builder.selector([inTraffic, followQueue])
        ]);
    }
};
