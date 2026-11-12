/**
 * SceneGraph.js - Scene, camera, renderer abstraction
 * No global services - all owned by Fdx
 */

import * as THREE from 'three';

export class SceneGraph {
    constructor(fdx) {
        this._fdx = fdx;
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0x87CEEB);
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._camera.position.set(0, 5, 10);
        this._renderer = null;
        this._rendererReady = false;
    }

    fdx() { return this._fdx; }

    get scene() { return this._scene; }
    get camera() { return this._camera; }

    getRenderer() { return this._renderer; }

    async initRenderer(options = {}) {
        this._renderer = new THREE.WebGLRenderer({
            antialias: options.antialias !== false,
            powerPreference: options.powerPreference || 'high-performance'
        });
        this._renderer.setAnimationLoop(null);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.shadowMap.enabled = options.shadowMap !== false;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this._renderer.domElement);
        this._rendererReady = true;
        return this._renderer;
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        if (this._renderer) this._renderer.setSize(width, height);
    }

    render() {
        if (this._renderer) {
            this._renderer.render(this._scene, this._camera);
        }
    }

    dispose() {
        if (this._renderer) {
            this._renderer.dispose();
            if (this._renderer.domElement.parentNode) {
                this._renderer.domElement.parentNode.removeChild(this._renderer.domElement);
            }
        }
    }
}