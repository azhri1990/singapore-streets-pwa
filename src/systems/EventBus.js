/**
 * Event Bus System
 * Decoupled system communication
 */

export class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    emit(event, data) {
        if (!this.listeners[event]) return;
        for (const cb of this.listeners[event]) {
            try {
                cb(data);
            } catch (e) {
                console.error('EventBus error:', event, e);
            }
        }
    }

    once(event, callback) {
        const unsubscribe = this.on(event, (data) => {
            callback(data);
            unsubscribe();
        });
        return unsubscribe;
    }

    clear() {
        this.listeners = {};
    }
}

// Global event bus
if (typeof window !== 'undefined') {
    window.EventBus = EventBus;
    window.eventBus = new EventBus();
}