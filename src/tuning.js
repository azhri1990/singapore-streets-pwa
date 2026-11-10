/**
 * AI Tuning Table
 * Central balance values for all AI systems
 */

export const TUNING = {
    // Player
    player: {
        walkSpeed: 5,
        runSpeed: 9,
        swimSpeed: 3,
        jumpForce: 6,
        gravity: -15,
        friction: 0.85,
        maxHealth: 100,
        maxArmor: 100
    },

    // Police
    police: {
        noticeRadius: 38,
        pursuitRadius: 60,
        helicopterThreshold: 4,
        searchTime: 30,
        responseTime: {
            low: 10,
            medium: 5,
            high: 3
        },
        accuracy: 0.7,
        fireRate: 0.5
    },

    // Gangs
    gangs: {
        patrolRadius: 20,
        attackRange: 2,
        fleeHealth: 20,
        warChance: 0.01,
        territoryRadius: 40
    },

    // Vehicles
    vehicles: {
        maxSpeed: 120,
        acceleration: 8,
        braking: 12,
        handling: 0.8,
        damageThreshold: 30
    },

    // Gore
    gore: {
        bloodParticleCount: 20,
        decalFadeTime: 30,
        maxParticles: 500,
        maxDecals: 100
    },

    // Singapore Realism
    singapore: {
        erp: {
            cbd: 3.5,
            orchard: 2.0,
            jurong: 1.5,
            tampines: 1.0
        },
        heatDecay: 0.05,
        policeResponse: {
            murder: 3,
            assault: 5,
            theft: 10
        }
    },

    // Quality
    quality: {
        low: { fpsCap: 30, dpr: 1, shadows: false },
        mid: { fpsCap: 45, dpr: 1.5, shadows: true },
        high: { fpsCap: 60, dpr: 2, shadows: true }
    },

    // Combat
    combat: {
        meleeRange: 2,
        gunshotRange: 100,
        headshotMultiplier: 2.5,
        bodyshotMultiplier: 1.0
    },

    // Mobile
    mobile: {
        touchZoneSize: 48,
        dpadZoneSize: 120,
        buttonSize: 80,
        minButtonSize: 48,
        renderScaleLow: 0.5,
        renderScaleMedium: 0.75,
        renderScaleHigh: 1.0,
        textureSizeLow: 256,
        textureSizeMedium: 512,
        textureSizeHigh: 2048,
        maxDrawCallsLow: 200,
        maxDrawCallsMedium: 500,
        maxDrawCallsHigh: 1000,
        maxTrianglesLow: 50000,
        maxTrianglesMedium: 150000,
        maxTrianglesHigh: 400000,
        batteryCriticalLevel: 0.15,
        batteryLowLevel: 0.30,
        batteryModerateLevel: 0.50,
        batteryHighLevel: 0.80
    }
};

export default TUNING;