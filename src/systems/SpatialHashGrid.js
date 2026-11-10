/**
 * Spatial Hash Grid
 * O(1) spatial queries for collision detection
 * Based on PIXEL-CITY-CRIME-3D pattern
 */

export class SpatialHashGrid {
    constructor(cellSize = 10) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }

    // Get cell key for a position
    getKey(x, z) {
        const cx = Math.floor(x / this.cellSize);
        const cz = Math.floor(z / this.cellSize);
        return cx + ',' + cz;
    }

    // Insert an object into the grid
    insert(obj, x, z) {
        const key = this.getKey(x, z);
        if (!this.grid.has(key)) {
            this.grid.set(key, []);
        }
        this.grid.get(key).push(obj);
    }

    // Remove an object from the grid
    remove(obj, x, z) {
        const key = this.getKey(x, z);
        if (!this.grid.has(key)) return;
        const cell = this.grid.get(key);
        const idx = cell.indexOf(obj);
        if (idx !== -1) {
            cell.splice(idx, 1);
        }
        if (cell.length === 0) {
            this.grid.delete(key);
        }
    }

    // Update object position in grid
    update(obj, oldX, oldZ, newX, newZ) {
        const oldKey = this.getKey(oldX, oldZ);
        const newKey = this.getKey(newX, newZ);
        if (oldKey === newKey) return;
        this.remove(obj, oldX, oldZ);
        this.insert(obj, newX, newZ);
    }

    // Query objects near a position
    query(x, z, radius = 1) {
        const results = [];
        const cellRadius = Math.ceil(radius / this.cellSize);
        const cx = Math.floor(x / this.cellSize);
        const cz = Math.floor(z / this.cellSize);

        for (let i = -cellRadius; i <= cellRadius; i++) {
            for (let j = -cellRadius; j <= cellRadius; j++) {
                const key = (cx + i) + ',' + (cz + j);
                if (this.grid.has(key)) {
                    results.push(...this.grid.get(key));
                }
            }
        }
        return results;
    }

    // Query objects in a radius
    queryRadius(x, z, radius) {
        const results = this.query(x, z, radius);
        const r2 = radius * radius;
        return results.filter(obj => {
            const dx = obj.x - x;
            const dz = obj.z - z;
            return dx * dx + dz * dz <= r2;
        });
    }

    // Clear the grid
    clear() {
        this.grid.clear();
    }

    // Get all objects
    getAll() {
        const results = [];
        for (const cell of this.grid.values()) {
            results.push(...cell);
        }
        return results;
    }

    // Get grid stats
    getStats() {
        let totalObjects = 0;
        let maxCellSize = 0;
        for (const cell of this.grid.values()) {
            totalObjects += cell.length;
            maxCellSize = Math.max(maxCellSize, cell.length);
        }
        return {
            cells: this.grid.size,
            totalObjects,
            maxCellSize,
            avgCellSize: totalObjects / Math.max(1, this.grid.size)
        };
    }
}

// Line of Sight using spatial hash
export function hasLineOfSight(grid, from, to, checkFn) {
    const dx = to.x - from.x;
    const dz = to.z - from.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const steps = Math.ceil(dist / (grid.cellSize * 0.5));
    
    for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const x = from.x + dx * t;
        const z = from.z + dz * t;
        const nearby = grid.query(x, z, 1);
        for (const obj of nearby) {
            if (checkFn && checkFn(obj)) {
                return false; // Blocked
            }
        }
    }
    return true; // Clear
}

if (typeof window !== 'undefined') {
    window.SpatialHashGrid = SpatialHashGrid;
    window.hasLineOfSight = hasLineOfSight;
}