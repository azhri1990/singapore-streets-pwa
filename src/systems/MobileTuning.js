// MobileTuning.js - Tunable parameters for mobile optimization
// Adjusted for different device tiers to balance performance and quality

export const MOBILE_TUNING = {
    lowTier: {
        rendererPixelRatio: 1.0,
        shadowsEnabled: false,
        textureSize: 256,
        mipmap: false,
        anisotropic: 1,
        maxDrawCalls: 200,
        maxTriangles: 50000,
        targetFPS: 30,
        qualityLevel: 'low',
        accentAdjustment: true
    },
    mediumTier: {
        rendererPixelRatio: 1.5,
        shadowsEnabled: true,
        textureSize: 512,
        mipmap: true,
        anisotropic: 4,
        maxDrawCalls: 500,
        maxTriangles: 150000,
        targetFPS: 60,
        qualityLevel: 'medium',
        accentAdjustment: true
    },
    highTier: {
        rendererPixelRatio: 2.0,
        shadowsEnabled: true,
        textureSize: 2048,
        mipmap: true,
        anisotropic: 8,
        maxDrawCalls: 1000,
        maxTriangles: 400000,
        targetFPS: 60,
        qualityLevel: 'high',
        accentAdjustment: true
    },

    touchZoneConfig: {
        dpadSize: 120,
        buttonSize: 80,
        tapThreshold: 20
    },

    batteryBudget: {
        criticalLevel: 0.15,
        lowLevel: 0.30,
        moderateLevel: 0.50,
        highLevel: 0.80
    }
};

export function getMobileTuningTier() {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad/i.test(ua);
    if (!isMobile) return null;

    const cores = navigator.hardwareConcurrency || 4;
    if (cores < 4) return 'low';

    if (performance && performance.memory) {
        const limitMB = performance.memory.jsHeapSizeLimit / 1048576;
        if (limitMB < 512) return 'low';
    }

    return 'medium';
}
