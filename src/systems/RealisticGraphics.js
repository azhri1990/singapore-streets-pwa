/**
 * Realistic 8K Graphics System
 * PBR materials, HDR, post-processing, advanced lighting, GPU Path Tracing
 * Integrates: three-mesh-bvh (accelerated raycasting), three-gpu-pathtracer (WebGPU path tracing)
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { MeshBVH, acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

// Optional WebGPU path tracer (requires WebGPU support) - lazily loaded
let WebGPUPathTracer = null;
let BlurredEnvMapGenerator = null;

// Extend Three.js with BVH acceleration
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

async function loadWebGPUPathTracer() {
    try {
        const pathtracer = await import('three-gpu-pathtracer/webgpu');
        WebGPUPathTracer = pathtracer.WebGPUPathTracer;
        BlurredEnvMapGenerator = pathtracer.BlurredEnvMapGenerator;
        return true;
    } catch (e) {
        console.info('three-gpu-pathtracer not available (WebGPU not supported or not installed)');
        return false;
    }
}

export class RealisticGraphics {
    constructor(game) {
        this.game = game;
        this.webGPURenderer = null;
        this.webGPUPathTracer = null;
        this.pathtracerEnabled = false;

        this.setupRenderer();
        this.setupLighting();
        this.setupPostProcessing();
        this.setupEnvironment();
        this.setupLOD();
        this.setupShadows();
    }

    async initWebGPUPathTracer() {
        if (this.pathtracerEnabled) return;
        await loadWebGPUPathTracer();
        if (!WebGPUPathTracer) return;
        try {
            const { WebGPURenderer } = await import(/* @vite-ignore */ 'three/webgpu');

            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                console.info('WebGPU adapter not available');
                return;
            }
            const device = await adapter.requestDevice();
            this.webGPURenderer = new WebGPURenderer();
            this.webGPURenderer.toneMapping = THREE.ACESFilmicToneMapping;
            await this.webGPURenderer.init();
            this.webGPUPathTracer = new WebGPUPathTracer(this.webGPURenderer);
            this.webGPUPathTracer.setScene(this.game.scene, this.game.camera);
            this.pathtracerEnabled = true;
            console.log('GPU Path Tracer initialized');
        } catch (e) {
            console.info('WebGPU path tracer init failed:', e.message);
        }
    }

    renderWebGPU() {
        if (this.pathtracerEnabled && this.webGPUPathTracer && this.webGPURenderer) {
            this.webGPUPathTracer.renderSample();
            this.webGPURenderer.render(this.game.scene, this.game.camera);
        }
    }

    async setupRenderer() {
        const renderer = this.game.renderer;
        const quality = this.game.qualityManager?.get() || { dpr: 2, shadows: true, antialias: true, msaa: false };

        // Quality-adaptive settings
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = quality.pbr ? THREE.ACESFilmicToneMapping : THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.shadowMap.enabled = quality.shadows;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.shadowMap.autoUpdate = true;
        renderer.setPixelRatio(Math.min(quality.dpr, window.devicePixelRatio));
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setupLighting() {
        const scene = this.game.scene;

        // Remove old lights
        scene.children.filter(c => c.isLight).forEach(l => scene.remove(l));

        // HDR Environment (procedural sky)
        const pmremGenerator = new THREE.PMREMGenerator(this.game.renderer);
        pmremGenerator.compileEquirectangularShader();

        // Create procedural HDR environment
        const envScene = new THREE.Scene();
        const envLight = new THREE.DirectionalLight(0xffffff, 1.5);
        envLight.position.set(1, 1, 1);
        envScene.add(envLight);

        const envTexture = pmremGenerator.fromScene(envScene).texture;
        scene.environment = envTexture;
        scene.environmentIntensity = 1.0;

        // Sun (directional light with shadows)
        const sun = new THREE.DirectionalLight(0xFFF5E6, 2.5);
        sun.position.set(100, 150, 100);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 8192;
        sun.shadow.mapSize.height = 8192;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 1000;
        sun.shadow.camera.left = -500;
        sun.shadow.camera.right = 500;
        sun.shadow.camera.top = 500;
        sun.shadow.camera.bottom = -500;
        sun.shadow.bias = -0.0001;
        sun.shadow.normalBias = 0.02;
        scene.add(sun);

        // Ambient light
        const ambient = new THREE.AmbientLight(0xE8F4F8, 0.4);
        scene.add(ambient);

        // Hemisphere light for sky/ground
        const hemi = new THREE.HemisphereLight(0x87CEEB, 0x8B7355, 0.6);
        scene.add(hemi);

        // Fill light (opposite sun)
        const fill = new THREE.DirectionalLight(0xB0C4DE, 0.5);
        fill.position.set(-100, 50, -100);
        scene.add(fill);
    }

    setupPostProcessing() {
        const scene = this.game.scene;
        const renderer = this.game.renderer;

        // EffectComposer
        this.composer = new EffectComposer(renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);

        // Render Pass
        this.renderPass = new RenderPass(scene, renderer);
        this.composer.addPass(this.renderPass);

        // Bloom
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.8,
            1.0,
            0.5
        );
        this.composer.addPass(this.bloomPass);

        // SSAO
        this.ssaoPass = new SSAOPass(scene, renderer, 2.0);
        this.composer.addPass(this.ssaoPass);

        // SMAA antialiasing
        this.smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
        this.composer.addPass(this.smaaPass);
    }

    resize() {
        if (this.composer) {
            this.composer.setSize(window.innerWidth, window.innerHeight);
        }
        window.dispatchEvent(new Event('resize'));
    }

    setupEnvironment() {
        const scene = this.game.scene;

        // Set background to sky color (will be replaced with skybox)
        scene.background = new THREE.Color(0x87CEEB);

        // Fog for depth
        scene.fog = new THREE.FogExp2(0x87CEEB, 0.005);
    }

    // Create PBR material for buildings
    static createPBRMaterial(options = {}) {
        const material = new THREE.MeshStandardMaterial({
            color: options.color || 0x808080,
            roughness: options.roughness || 0.7,
            metalness: options.metalness || 0.1,
            envMapIntensity: options.envMapIntensity || 1.0,
            roughnessMap: options.roughnessMap,
            metalnessMap: options.metalnessMap,
            normalMap: options.normalMap,
            normalScale: new THREE.Vector2(1, 1),
            aoMap: options.aoMap,
            aoMapIntensity: 1.0
        });

        return material;
    }

    // Create procedural texture with realistic noise
    static createProceduralTexture(type, size = 512) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        switch (type) {
            case 'concrete':
                ctx.fillStyle = '#808080';
                ctx.fillRect(0, 0, size, size);
                // Add subtle noise pattern
                for (let i = 0; i < 15000; i++) {
                    const x = Math.random() * size;
                    const y = Math.random() * size;
                    const intensity = 100 + Math.random() * 30;
                    ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 0.2})`;
                    ctx.fillRect(x, y, 2, 2);
                }
                break;

            case 'brick':
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(0, 0, size, size);
                const brickW = size / 8;
                const brickH = size / 16;
                for (let y = 0; y < size; y += brickH) {
                    for (let x = 0; x < size; x += brickW) {
                        const offset = (Math.floor(y / brickH) % 2) * (brickW / 2);
                        ctx.fillStyle = `rgb(${139 + Math.random() * 20}, ${69 + Math.random() * 20}, ${19 + Math.random() * 20})`;
                        ctx.fillRect(x + offset, y, brickW - 2, brickH - 2);
                    }
                }
                break;

            case 'asphalt':
                ctx.fillStyle = '#333333';
                ctx.fillRect(0, 0, size, size);
                for (let i = 0; i < 5000; i++) {
                    const x = Math.random() * size;
                    const y = Math.random() * size;
                    const brightness = 40 + Math.random() * 30;
                    ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
                    ctx.fillRect(x, y, 1, 1);
                }
                break;

            case 'grass':
                ctx.fillStyle = '#228B22';
                ctx.fillRect(0, 0, size, size);
                for (let i = 0; i < 20000; i++) {
                    const x = Math.random() * size;
                    const y = Math.random() * size;
                    const brightness = 34 + Math.random() * 30;
                    ctx.fillStyle = `rgb(${brightness}, ${brightness + 50}, ${brightness})`;
                    ctx.fillRect(x, y, 1, 2);
                }
                break;

            case 'glass':
                ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
                ctx.fillRect(0, 0, size, size);
                // Add reflection lines
                for (let i = 0; i < 10; i++) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(Math.random() * size, 0);
                    ctx.lineTo(Math.random() * size, size);
                    ctx.stroke();
                }
                break;
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 16;
        texture.needsUpdate = true;
        return texture;
    }

    // Create normal map from texture
    static createNormalMap(texture, strength = 1.0) {
        // Simplified - would use actual normal map generation in production
        return texture;
    }

    // Upgrade existing materials to PBR
    upgradeMaterials() {
        const scene = this.game.scene;

        scene.traverse((obj) => {
            if (obj.isMesh && obj.material) {
                if (obj.material.isMeshLambertMaterial || obj.material.isMeshBasicMaterial) {
                    const oldColor = obj.material.color ? obj.material.color.clone() : new THREE.Color(0x808080);
                    const newMaterial = new THREE.MeshStandardMaterial({
                        color: oldColor,
                        roughness: 0.7,
                        metalness: 0.1,
                        envMapIntensity: 1.0,
                        roughnessMap: obj.material.roughnessMap,
                        metalnessMap: obj.material.metalnessMap,
                        normalMap: obj.material.normalMap,
                        normalScale: new THREE.Vector2(1, 1),
                        aoMap: obj.material.aoMap,
                        aoMapIntensity: 1.0
                    });
                    obj.material = newMaterial;
                }
            }
        });
    }

    // Add bloom effect
    addBloom() {
        // Already implemented via UnrealBloomPass in post processing
    }

    // Add SSAO (Screen Space Ambient Occlusion)
    addSSAO() {
        // Already implemented via SSAOPass in post processing
    }

    // Create high-quality shadow
    setupShadows() {
        const renderer = this.game.renderer;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Increase shadow quality
        this.game.scene.traverse((obj) => {
            if (obj.isLight && obj.castShadow) {
                obj.shadow.mapSize.width = 8192;
                obj.shadow.mapSize.height = 8192;
                obj.shadow.bias = -0.0001;
                obj.shadow.normalBias = 0.02;
            }
        });
    }

    // Update graphics settings
    update(delta) {
        // Dynamic quality adjustment based on FPS
    }
}

export default RealisticGraphics;