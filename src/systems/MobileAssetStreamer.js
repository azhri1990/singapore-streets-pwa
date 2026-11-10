// MobileAssetStreamer.js - Asset loading strategy based on device capabilities
// Based on Millionaire Race progressive loading + SkyTether no-asset approach

export class MobileAssetStreamer {
    constructor(game) {
        this.game = game;
        this.deviceCapabilities = this.detectDeviceCapabilities();
        this.criticalAssets = [
            { key: 'player', isCritical: true, size: 'medium' },
            { key: 'vehicles_basic', isCritical: true, size: 'medium' },
            { key: 'terrain_basic', isCritical: true, size: 'large' },
            { key: 'weather', isCritical: true, size: 'small' }
        ];
        this.streamedAssets = [
            { key: 'buildings', priority: 'medium', size: 'large' },
            { key: 'props', priority: 'low', size: 'medium' },
            { key: 'effects', priority: 'low', size: 'small' },
            { key: 'vehicles_detailed', priority: 'medium', size: 'large' },
            { key: 'interiors', priority: 'low', size: 'medium' }
        ];
        
        this.assetCache = new Map();
        this.isLoading = false;
        this.preloadQueue = [];
        this.loadedAssets = new Set();
    }
    
    detectDeviceCapabilities() {
        const ua = navigator.userAgent.toLowerCase();
        const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
        const isTablet = /ipad|android(?!.*mobile)/i.test(ua);
        const isLowEndCPU = this.detectLowEndCPU();
        const isLimitedMemory = this.detectLowMemory();
        
        return {
            isMobile,
            isTablet,
            isLowEndCPU,
            isLimitedMemory,
            memoryEstimate: this.estimateMemory(),
            isLowEnd: isLowEndCPU || isLimitedMemory || isMobile,
            hasWebGL2: this.checkWebGL2(),
            maxTextureSize: this.getMaxTextureSize()
        };
    }
    
    detectLowEndCPU() {
        const ua = navigator.userAgent.toLowerCase();
        const mobileUA = /android|iphone|ipad|ipod/i.test(ua);
        const lowEndPattern = /pixel|redmi|miui|oneplus|oppo|realme|honor|xiaomi/ig;
        const isLowEnd = mobileUA && (lowEndPattern.test(ua) || this.isHardwareLimited());
        
        // Additional heuristics
        const isLowEndGPU = this.detectLowEndGPU();
        
        return isLowEnd || isLowEndGPU;
    }
    
    detectLowEndGPU() {
        // Check for common low-end GPU identifiers
        const gpu = (window.navigator.userAgent + (window.crypto?.getRandomValues ? '' : '')).toLowerCase();
        const lowEndGPUs = ['mali', 'adreno', 'powervr', 'intel iris', 'intel hd'];
        const isLowEnd = lowEndGPUs.some(gpuName => gpu.includes(gpuName));
        
        return isLowEnd;
    }
    
    isHardwareLimited() {
        const cores = navigator.hardwareConcurrency || 4;
        const memoryMB = (performance.memory?.totalJSHeapSize / 1048576) || 256;
        const isLimited = cores < 4 || memoryMB < 256;
        return isLimited;
    }
    
    estimateMemory() {
        const memory = performance.memory;
        if (memory) {
            const totalMB = memory.totalJSHeapSize / 1048576;
            const usedMB = memory.usedJSHeapSize / 1048576;
            const limitMB = memory.jsHeapSizeLimit / 1048576;
            return { totalMB, usedMB, limitMB };
        }
        return { totalMB: 256, usedMB: 128, limitMB: 256 };
    }
    
    checkWebGL2() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        return !!gl;
    }
    
    getMaxTextureSize() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        if (gl) {
            const textureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            canvas.getContext('webgl2', { preserveDrawingBuffer: false });
            return textureSize;
        }
        return 4096;
    }
    
    getQualityTier() {
        const caps = this.deviceCapabilities;
        if (caps.isLowEnd || caps.isLimitedMemory) {
            return 'low';
        }
        if (caps.isMobile && !caps.isLowEnd) {
            return 'medium';
        }
        return 'high';
    }
    
    getAssetStreamConfig() {
        const tier = this.getQualityTier();
        const budget = this.game?.batteryManager?.getPerformanceBudget?.() || 0.75;
        
        return {
            tier,
            budget,
            loadingStrategy: tier === 'low' ? 'deferred' : tier === 'medium' ? 'adaptive' : 'eager',
            maxCriticalAssets: tier === 'low' ? 2 : tier === 'medium' ? 4 : 6,
            maxStreamedAssets: tier === 'low' ? 1 : tier === 'medium' ? 3 : 5,
            textures: this.getTextureBudget(tier, budget)
        };
    }
    
    getTextureBudget(tier, budget) {
        const baseSizes = {
            low: { maxSize: 256, mipmaps: false, anisotropic: 1 },
            medium: { maxSize: 512, mipmaps: true, anisotropic: 4 },
            high: { maxSize: 2048, mipmaps: true, anisotropic: 8 }
        };
        const size = baseSizes[tier];
        
        return {
            ...size,
            maxTextureSize: size.maxSize * (budget > 0.9 ? 2 : 1),
            useCompressed: tier !== 'high' // Use compression for low/medium
        };
    }
    
    async preloadCriticalAssets() {
        const config = this.getAssetStreamConfig();
        console.log('[MobileAssetStreamer] Preloading critical assets for tier:', config.tier);
        
        // Preload critical assets in order based on device tier
        for (const asset of this.criticalAssets) {
            if (this.loadedAssets.has(asset.key)) continue;
            
            if (config.maxCriticalAssets > 0) {
                // Load critical asset
                try {
                    await this.loadAsset(asset.key);
                    this.loadedAssets.add(asset.key);
                } catch (error) {
                    console.warn('[MobileAssetStreamer] Failed to load critical asset:', asset.key, error);
                    if (asset.isCritical) {
                        // Critical asset failed - fallback mode
                        console.error('[MobileAssetStreamer] CRITICAL asset failed, enabling fallback:', asset.key);
                        this.enableFallbackMode();
                    }
                }
            }
        }
    }
    
    async loadAsset(key, priority = 'medium') {
        const cacheKey = `singapore_streets_${key}`;
        
        if (this.assetCache.has(cacheKey)) {
            return this.assetCache.get(cacheKey);
        }
        
        // Simulate asset loading with progress
        console.log(`[MobileAssetStreamer] Loading asset: ${key} (priority: ${priority})`);
        
        // Load actual asset from game
        const asset = await this.game.assetLoader?.loadAsset?.(key) || { key, loaded: true };
        
        this.assetCache.set(cacheKey, asset);
        this.loadedAssets.add(key);
        
        return asset;
    }
    
    enableFallbackMode() {
        console.warn('[MobileAssetStreamer] FALLBACK MODE ENABLED - reducing asset load for performance');
        // Enable fallback strategies
        if (this.game) {
            this.game.enableFallbackRendering();
            this.game.enableFallbackAssets();
        }
    }
    
    getLoadingStrategy() {
        const config = this.getAssetStreamConfig();
        return config.loadingStrategy;
    }
    
    shouldStreamAsset(asset) {
        const config = this.getAssetStreamConfig();
        if (config.tier === 'low') {
            // Low-end: only stream low-priority assets
            return asset.priority === 'low';
        }
        if (config.tier === 'medium') {
            // Medium-end: stream medium and low priority
            return asset.priority !== 'high';
        }
        return true; // High-end: stream all
    }
}

export function getMobileAssetStreamer(game) {
    return new MobileAssetStreamer(game);
}
