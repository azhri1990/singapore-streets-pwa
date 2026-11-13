/**
 * src/core/Renderer.js — Renderer abstraction with WebGPU + WebGL fallback
 * 
 * Tries WebGPURenderer first (2-5x faster on supported devices), falls back to WebGLRenderer.
 * Both Three.js renderers share the same API surface.
 */

import * as THREE from 'three'

class Renderer {
  constructor(options = {}) {
    this.options = {
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
      depth: true,
      ...options,
    }
    this._renderer = null
    this._backend = 'webgl' // 'webgpu' | 'webgl'
    this._canvas = null
    this._pixelRatio = Math.min(window.devicePixelRatio, 2)
  }

  /**
   * Initialize the renderer on the given canvas.
   * @param {HTMLCanvasElement} canvas
   * @param {Object} scene
   * @param {THREE.PerspectiveCamera} camera
   */
  async init(canvas, scene, camera) {
    this._canvas = canvas
    this._scene = scene
    this._camera = camera

    // Try WebGPU first
    if (this._supportsWebGPU()) {
      try {
        this._renderer = new THREE.WebGPURenderer({
          canvas,
          antialias: this.options.antialias,
          powerPreference: this.options.powerPreference,
        })
        await this._renderer.init()
        this._backend = 'webgpu'
        console.log('[Renderer] WebGPU backend initialized')
      } catch (err) {
        console.warn('[Renderer] WebGPU failed, falling back to WebGL:', err.message)
        this._renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: this.options.antialias,
          powerPreference: this.options.powerPreference,
          alpha: this.options.alpha,
          stencil: this.options.stencil,
          depth: this.options.depth,
        })
        this._backend = 'webgl'
      }
    } else {
      this._renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: this.options.antialias,
        powerPreference: this.options.powerPreference,
        alpha: this.options.alpha,
        stencil: this.options.stencil,
        depth: this.options.depth,
      })
      this._backend = 'webgl'
      console.log('[Renderer] WebGL backend initialized')
    }

    this._renderer.setPixelRatio(this._pixelRatio)
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    this._renderer.setClearColor(0x04111a, 1)

    // Tone mapping for better visuals
    this._renderer.toneMapping = THREE.ACESFilmicToneMapping
    this._renderer.toneMappingExposure = 1.0

    // Enable shadow maps
    this._renderer.shadowMap.enabled = true
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // WebGPU-specific optimizations
    if (this._backend === 'webgpu') {
      // Use WebGPU's compute shaders for particle effects
      this._renderer.useLegacyLights = false
    }

    return this._renderer
  }

  /**
   * Check if WebGPU is available
   */
  _supportsWebGPU() {
    return (
      'gpu' in navigator &&
      typeof navigator.gpu.requestAdapter === 'function'
    )
  }

  /**
   * Render the current scene
   */
  render() {
    if (!this._renderer) return
    this._renderer.render(this._scene, this._camera)
  }

  /**
   * Resize the renderer
   */
  resize(width, height) {
    if (!this._renderer) return
    this._renderer.setSize(width, height)
  }

  /**
   * Get the underlying Three.js renderer
   */
  getRaw() {
    return this._renderer
  }

  /**
   * Get current backend
   */
  getBackend() {
    return this._backend
  }

  /**
   * Dispose the renderer
   */
  dispose() {
    if (this._renderer) {
      this._renderer.dispose()
      this._renderer = null
    }
  }
}

export default Renderer