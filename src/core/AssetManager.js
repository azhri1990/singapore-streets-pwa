/**
 * AssetManager.js - Asset loading and management
 * No steady-state allocation in frame loops
 * Prefer primitives and reusable storage
 */

export class AssetManager {
    constructor(fdx) {
        this._fdx = fdx;
        this._cache = new Map();
        this._loadPromises = new Map();
        this._loading = 0;
    }

    get fdx() { return this._fdx; }

    // Load asset with caching
    load(key, url, options = {}) {
        if (this._cache.has(key)) {
            return Promise.resolve(this._cache.get(key));
        }

        const existing = this._loadPromises.get(key);
        if (existing) return existing;

        this._loading++;
        const promise = fetch(url)
            .then(r => {
                if (!r.ok) throw new Error(`Failed to load ${url}: ${r.status}`);
                return options.type === 'json' ? r.json() : 
                       options.type === 'blob' ? r.blob() :
                       options.type === 'text' ? r.text() :
                       r.arrayBuffer();
            })
            .then(data => {
                this._cache.set(key, data);
                this._loading--;
                return data;
            })
            .catch(err => {
                this._loading--;
                this._loadPromises.delete(key);
                throw err;
            });

        this._loadPromises.set(key, promise);
        return promise;
    }

    // Get cached asset (returns null if not loaded)
    get(key) {
        return this._cache.get(key) || null;
    }

    // Check if asset is cached
    has(key) {
        return this._cache.has(key);
    }

    // Get loading count
    get loading() { return this._loading; }

    // Preload multiple assets
    preload(assets) {
        return Promise.all(assets.map(a => this.load(a.key, a.url, a.options)));
    }

    // Dispose - clear cache
    dispose() {
        this._cache.clear();
        this._loadPromises.clear();
        this._loading = 0;
    }
}