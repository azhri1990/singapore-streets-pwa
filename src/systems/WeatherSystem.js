import * as THREE from 'three';

/**
 * Simple weather state for Singapore Streets.
 * Provides what EnhancedVehiclePhysics needs: weather.isRaining / isWet.
 */
export class WeatherSystem {
    constructor() {
        this.isRaining = false;
        this.isWet = false;
        this.rainProbability = 0;
        this.temperature = 31; // typical Singapore afternoon
        this.humidity = 0.8;
    }

    // Advance weather (Singapore afternoon showers are common)
    update(timeOfDay = 14) {
        const hour = timeOfDay % 24;
        // Peak shower probability late afternoon / evening
        const diurnal = Math.max(0, Math.sin((hour - 6) * Math.PI / 12));
        this.rainProbability = Math.min(1, diurnal * 0.6);
        this.isRaining = Math.random() < this.rainProbability * 0.4;
        this.isWet = this.isRaining || (this.isWet && this.rainProbability > 0.3);
        this.temperature = 27 + (1 - diurnal) * 5;
        this.humidity = 0.7 + this.rainProbability * 0.25;
    }
}