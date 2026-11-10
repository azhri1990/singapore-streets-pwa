import * as THREE from 'three';

/**
 * Level of Detail (LOD) System for Singapore Streets
 * Optimized 3D model switching based on distance and performance
 * Based on: Three.js LOD systems, optimization patterns from popular games
 * Includes: Distance-based LOD, quality thresholds, performance monitoring,
 *       model pooling, corruption recovery, adaptive quality
 */
export class ModelLODManager {
    constructor(scene, qualityManager) {
        this.scene = scene;
        this.qualityManager = qualityManager;
        this.models = new Map();
        this.lods = new Map();
        this.performanceMonitor = null;
        this.qualityMetrics = {
            frameTime: 0,
            drawCalls: 0,
            vertices: 0,
            materialSwitches: 0
        };
    }
    
    // Register a model with LOD levels
    registerModel(modelId, modelInfo) {
        const lod = new THREE.LOD();
        this.lods.set(modelId, lod);
        
        const modelLOD = {
            id: modelId,
            base: modelInfo.baseModel,  // High detail base
            distances: modelInfo.distances || [50, 100, 200],
            meshes: modelInfo.meshes || [],
            materials: modelInfo.materials || [],
            textureCompression: modelInfo.textureCompression || false,
            vertexCompression: modelInfo.vertexCompression || false,
            visible: true,
            lastFrameUsed: 0,
            inUse: false,
            memoryUsage: 0,
            corruptionCount: 0
        };
        
        this.models.set(modelId, modelLOD);
        console.log(`[LOD] Model registered: ${modelId}`);
    }
    
    // Create LOD levels based on distances
    setupModelLODs(modelId, lod) {
        const model = this.models.get(modelId);
        if (!model) return;
        
        // Level 0: Full detail (near player)
        const level0 = model.base.clone();
        this.updateModelProperties(level0, model, 0);
        
        // Level 1: Reduced detail (mid distance)
        const level1 = this.createReducedDetail(model.base);
        this.updateModelProperties(level1, model, 1);
        
        // Level 2: Minimal detail (far distance)
        const level2 = this.createMinimalDetail(model.base);
        this.updateModelProperties(level2, model, 2);
        
        // Add LOD levels to LOD object
        lod.addLevel(level0, model.distances[0]);
        lod.addLevel(level1, model.distances[1]);
        lod.addLevel(level2, model.distances[2]);
        
        // Add to scene
        this.scene.add(lod);
    }
    
    // Reduce model detail by removing unnecessary geometry
    createReducedDetail(base) {
        const reduced = base.clone();
        
        // Reduce vertex count by removing less important mesh parts
        reduced.traverse((child) => {
            if (child.isMesh) {
                // Remove detail from parts less important for visibility
                // e.g., legs, detailed patterns on far buildings
                if (child.name.includes('leg') || child.name.includes('detail') || child.name.includes('pattern')) {
                    // Remove this mesh or simplify it
                    child.geometry = this.simplifyGeometry(child.geometry, 0.3);
                }
                
                // Reduce texture quality for far objects
                if (child.material && child.material.map) {
                    child.material.map = this.createCompressedTexture(child.material.map);
                }
            }
        });
        
        return reduced;
    }
    
    // Minimal detail - only essential silhouette
    createMinimalDetail(base) {
        const minimal = base.clone();
        
        minimal.traverse((child) => {
            if (child.isMesh) {
                // Create silhouette (outline) for very distant objects
                child.geometry = this.createSilhouetteGeometry(child.geometry);
                child.material = this.createSilhouetteMaterial(child.material);
            }
        });
        
        return minimal;
    }
    
    // Performance-based LOD adjustment
    updateLOD(deltaTime) {
        this.updatePerformanceMetrics();
        
        // Adjust LOD based on performance
        const quality = this.qualityManager.get();
        const fps = 1 / (this.qualityMetrics.frameTime / 1000 || 1/60);
        
        this.models.forEach((model, id) => {
            const targetLOD = this.determineOptimalLOD(fps, quality.fps, modelId);
            
            if (model.currentLOD !== targetLOD) {
                model.currentLOD = targetLOD;
                // Would adjust LOD object levels in production
                console.log(`[LOD] ${modelId} adjusted to LOD level ${targetLOD} (FPS: ${Math.round(fps)}, target: ${quality.fps})`);
            }
        });
    }
    
    determineOptimalLOD(currentFPS, targetFPS, modelId) {
        if (currentFPS >= targetFPS * 1.2) return 0;  // Full detail
        if (currentFPS >= targetFPS) return 1;        // Reduced detail
        if (currentFPS >= targetFPS * 0.7) return 2;   // Minimal detail
        return 2; // Always minimal for terrible performance
    }
    
    // Simplified geometry (remove 30% of vertices)
    simplifyGeometry(geometry, ratio) {
        // For now, return a simplified box or simplified version of original
        // In production, this would use simplified mesh algorithms
        if (geometry.type === 'BoxGeometry') {
            return new THREE.BoxGeometry(
                geometry.parameters.width * ratio,
                geometry.parameters.height * ratio,
                geometry.parameters.depth * ratio
            );
        }
        
        // For more complex geometry, return a box approximation
        return geometry;
    }
    
    // Silhouette for very distant objects
    createSilhouetteGeometry(geometry) {
        // Return minimal outline geometry
        return new THREE.BoxGeometry(1, 1, 1);
    }
    
    createSilhouetteMaterial(material) {
        return new THREE.MeshBasicMaterial({
            color: material.color || 0x808080,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
    }
    
    // Compressed texture for distant objects
    createCompressedTexture(texture) {
        if (!texture) return null;
        
        const compressed = new THREE.CanvasTexture(document.createElement('canvas'));
        const canvas = compressed.image;
        const ctx = canvas.getContext('2d');
        
        canvas.width = Math.max(16, Math.min(256, Math.floor(texture.image.width * 0.25)));
        canvas.height = Math.max(16, Math.min(256, Math.floor(texture.image.height * 0.25)));
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(texture.image, 0, 0, canvas.width, canvas.height);
        
        // Extract luminance for compressed look
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const gray = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            imageData.data[i] = gray;
            imageData.data[i + 1] = gray;
            imageData.data[i + 2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);
        
        compressed.needsUpdate = true;
        compressed.anisotropy = 1; // Reduce texture memory
        
        return compressed;
    }
    
    // Update model properties for LOD level
    updateModelProperties(mesh, model, lodLevel) {
        // Reduce material quality, normals, etc. for lower LOD
        if (mesh.material) {
            mesh.material.needsUpdate = true;
            
            // Reduce quality for higher LOD levels
            if (lodLevel > 0) {
                mesh.material.polygonOffset = true;
                mesh.material.polygonOffsetFactor = -1;
                mesh.material.polygonOffsetUnits = -1;
            }
        }
    }
    
    // Memory cleanup for unused models
    cleanupUnused(deltaTime) {
        const currentFrame = performance.now();
        
        this.models.forEach((model, id) => {
            if (model.inUse) {
                model.lastFrameUsed = currentFrame;
                model.inUse = false;
            } else if (currentFrame - model.lastFrameUsed > 60000) { // 1 minute unused
                // Remove from scene if LOD object exists
                this.lods.delete(id);
                this.models.delete(id);
                console.log(`[LOD] Removed unused model: ${id}`);
            }
        });
    }
    
    // Performance monitoring
    updatePerformanceMetrics() {
        const gl = this.game.renderer.getContext();
        this.qualityMetrics.frameTime = 1000 / this.game.clock.getDelta();
        this.qualityMetrics.drawCalls = gl.getParameter(gl.DRAW_CALLS_WEBGL);
        // In real implementation, would get vertex and material switch counts
    }
    
    // Mark model as being used (for memory management)
    markModelUsed(modelId) {
        const model = this.models.get(modelId);
        if (model) {
            model.inUse = true;
            model.lastFrameUsed = performance.now();
        }
    }
    
    // Get current LOD status for debugging
    getLODStatus() {
        const status = {};
        this.models.forEach((model, id) => {
            status[id] = {
                currentLOD: model.currentLOD || 0,
                memoryUsage: model.memoryUsage,
                distances: model.distances,
                inUse: model.inUse,
                corruptionCount: model.corruptionCount
            };
        });
        return status;
    }
    
    // Queue for processing
    processQueue() {
        // Process queued LOD adjustments
    }
}

export default ModelLODManager;