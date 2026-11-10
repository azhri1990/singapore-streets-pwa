/**
 * Omniroute Passthrough Client for Singapore Streets
 * Browser-compatible implementation of the MYRA Omniroute passthrough patterns:
 * - Gateway-first with stdio fallback
 * - Circuit breaker pattern
 * - Request queue with retry logic
 * - Token compression (RTK+Caveman style)
 * - Health monitoring & auto-recovery
 */

// --- Types --- (removed for JS compatibility)
const OmnirouteConfig = {
    gatewayUrl: 'http://127.0.0.1:20128/v1',
    apiKey: '',
    useGateway: true,
    gatewayTimeoutMs: 10000,
    maxGatewayFailures: 3,
    stdioFallback: true,
    enableTokenCompression: false,
    maxTokensBeforeCompression: 8192,
    compressionAggressiveness: 0.7,
    healthProbeIntervalMs: 30000
};

const PassthroughResult = {
    ok: false,
    data: undefined,
    error: undefined,
    source: 'gateway',
    attempts: 0,
    latencyMs: 0,
    compressedTokens: undefined,
    originalTokens: undefined
};

const QueuedRequest = {
    id: '',
    endpoint: '',
    payload: undefined,
    resolve: () => {},
    reject: () => {},
    attempts: 0,
    priority: 5,
    timestamp: 0
};

// --- Circuit Breaker ---
class CircuitBreaker {
    constructor(threshold = 5, timeout = 30000, onStateChange) {
        this.failures = 0;
        this.lastFailure = 0;
        this.state = 'closed';
        this.threshold = threshold;
        this.timeout = timeout;
        this.onStateChange = onStateChange;
    }

    async execute(fn) {
        if (this.state === 'open') {
            if (Date.now() - this.lastFailure > this.timeout) {
                this.state = 'half-open';
                this.onStateChange?.('half-open');
            } else {
                throw new Error('Circuit breaker open');
            }
        }

        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (e) {
            this.onFailure();
            throw e;
        }
    }

    onSuccess() {
        this.failures = 0;
        if (this.state === 'half-open') {
            this.state = 'closed';
            this.onStateChange?.('closed');
        }
    }

    onFailure() {
        this.failures++;
        this.lastFailure = Date.now();
        if (this.failures >= this.threshold) {
            this.state = 'open';
            this.onStateChange?.('open');
        }
    }

    getState() {
        return this.state;
    }

    reset() {
        this.failures = 0;
        this.state = 'closed';
        this.onStateChange?.('closed');
    }
}

// --- Bounded Priority Queue ---
class RequestQueue {
    constructor(maxSize = 1000, concurrency = 3, processFn) {
        this.queue = [];
        this.processing = false;
        this.maxSize = maxSize;
        this.concurrency = concurrency;
        this.activeCount = 0;
        this.processFn = processFn;
    }

    enqueue(req) {
        if (this.queue.length >= this.maxSize) {
            // Drop lowest priority (highest number)
            this.queue.sort((a, b) => b.priority - a.priority);
            this.queue.pop();
        }
        this.queue.push(req);
        this.queue.sort((a, b) => a.priority - b.priority || a.timestamp - b.timestamp);
        this.process();
        return true;
    }

    async process() {
        if (this.processing || this.activeCount >= this.concurrency || this.queue.length === 0) return;

        this.processing = true;

        while (this.queue.length > 0 && this.activeCount < this.concurrency) {
            const req = this.queue.shift();
            if (!req) break;

            this.activeCount++;
            this.processFn(req)
                .then((result) => req.resolve(result))
                .catch((err) => req.reject(err))
                .finally(() => {
                    this.activeCount--;
                    this.process();
                });
        }

        this.processing = false;
    }

    getSize() {
        return this.queue.length;
    }

    clear() {
        this.queue = [];
    }
}

// --- Token Compression (RTK+Caveman inspired) ---
class TokenCompressor {
    static compress(text, aggressiveness = 0.7) {
        if (!text || text.length < 100) return text;

        const lines = text.split('\n');
        let compressed = lines;

        // Level 1: Remove whitespace
        if (aggressiveness > 0.2) {
            compressed = compressed.map(l => l.trim()).filter(l => l.length > 0);
        }

        // Level 2: Remove comments (lines starting with // or #)
        if (aggressiveness > 0.4) {
            compressed = compressed.filter(l => !l.startsWith('//') && !l.startsWith('#'));
        }

        // Level 3: Deduplicate similar lines
        if (aggressiveness > 0.6) {
            const seen = new Set();
            compressed = compressed.filter(l => {
                const key = l.substring(0, 50);
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
        }

        // Level 4: Truncate long lines
        if (aggressiveness > 0.8) {
            compressed = compressed.map(l => l.length > 200 ? l.substring(0, 200) + '...' : l);
        }

        const result = compressed.join('\n');
        return result.length < text.length * 0.8 ? result : text;
    }

    static estimateTokens(text) {
        return Math.ceil(text.length / 4);
    }
}

// --- Main Passthrough Client ---
export class OmniroutePassthrough {
    constructor(config = {}) {
        this.config = {
            gatewayUrl: config.gatewayUrl || OmnirouteConfig.gatewayUrl,
            apiKey: config.apiKey || OmnirouteConfig.apiKey,
            useGateway: config.useGateway !== undefined ? config.useGateway : OmnirouteConfig.useGateway,
            gatewayTimeoutMs: config.gatewayTimeoutMs || OmnirouteConfig.gatewayTimeoutMs,
            maxGatewayFailures: config.maxGatewayFailures || OmnirouteConfig.maxGatewayFailures,
            stdioFallback: config.stdioFallback !== undefined ? config.stdioFallback : OmnirouteConfig.stdioFallback,
            enableTokenCompression: config.enableTokenCompression || OmnirouteConfig.enableTokenCompression,
            maxTokensBeforeCompression: config.maxTokensBeforeCompression || OmnirouteConfig.maxTokensBeforeCompression,
            compressionAggressiveness: config.compressionAggressiveness || OmnirouteConfig.compressionAggressiveness,
            healthProbeIntervalMs: config.healthProbeIntervalMs || OmnirouteConfig.healthProbeIntervalMs
        };

        this.gatewayCircuitBreaker = new CircuitBreaker(
            this.config.maxGatewayFailures,
            30000,
            (state) => {
                this.gatewayHealthy = state === 'closed';
                console.log(`[Omniroute] Gateway circuit breaker: ${state}`);
            }
        );

        this.requestQueue = new RequestQueue(
            500,
            3,
            this.processRequest.bind(this)
        );

        this.cache = new Map();
        this.healthCheckInterval = null;
        this.gatewayHealthy = true;
        this.consecutiveFailures = 0;
        this.startHealthChecks();
    }

    // --- Main entry point ---
    async call(endpoint, payload, options = {}) {
        const cacheKey = `${endpoint}:${JSON.stringify(payload)}`;

        // Check cache first
        if (options.useCache && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < cached.ttl) {
                return {
                    ok: true,
                    data: cached.data,
                    source: 'cache',
                    attempts: 1,
                    latencyMs: 0
                };
            } else {
                this.cache.delete(cacheKey);
            }
        }

        // Apply token compression if enabled
        let processedPayload = payload;
        if (this.config.enableTokenCompression) {
            const tokenCount = TokenCompressor.estimateTokens(JSON.stringify(payload));
            if (tokenCount > this.config.maxTokensBeforeCompression) {
                processedPayload = this.compressPayload(payload);
            }
        }

        // Try gateway first
        if (this.config.useGateway && this.gatewayHealthy) {
            try {
                const result = await this.gatewayCircuitBreaker.execute(() => 
                    this.callGateway(endpoint, processedPayload)
                );

                if (result.ok && options.useCache && options.cacheTtl) {
                    this.cache.set(cacheKey, {
                        data: result.data,
                        timestamp: Date.now(),
                        ttl: options.cacheTtl
                    });
                }

                this.consecutiveFailures = 0;
                return result;
            } catch (e) {
                console.warn(`[Omniroute] Gateway failed: ${e.message}`);
                this.consecutiveFailures++;
                if (this.consecutiveFailures >= this.config.maxGatewayFailures) {
                    this.gatewayHealthy = false;
                }
            }
        }

        // Queue for retry
        return new Promise((resolve, reject) => {
            this.requestQueue.enqueue({
                id: crypto.randomUUID(),
                endpoint,
                payload: processedPayload,
                resolve,
                reject,
                attempts: 0,
                priority: options.priority || 5,
                timestamp: Date.now()
            });
        });
    }

    // --- Gateway call ---
    async callGateway(endpoint, payload) {
        const startTime = Date.now();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.gatewayTimeoutMs);

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (this.config.apiKey) {
                headers.Authorization = `Bearer ${this.config.apiKey}`;
            }

            const response = await fetch(`${this.config.gatewayUrl}${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return {
                ok: true,
                data,
                source: 'gateway',
                attempts: 1,
                latencyMs: Date.now() - startTime
            };
        } catch (e) {
            clearTimeout(timeoutId);
            throw e;
        }
    }

    // --- Queue processor ---
    async processRequest(req) {
        const maxAttempts = 3;
        let lastError = new Error('No fallback available');

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            req.attempts = attempt + 1;

            try {
                // Exponential backoff
                if (attempt > 0) {
                    const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
                    await new Promise(r => setTimeout(r, delay + Math.random() * 1000));
                }

                // Try gateway if healthy
                if (this.config.useGateway && this.gatewayHealthy) {
                    try {
                        return await this.gatewayCircuitBreaker.execute(() => 
                            this.callGateway(req.endpoint, req.payload)
                        );
                    } catch (e) {
                        this.consecutiveFailures++;
                        if (this.consecutiveFailures >= this.config.maxGatewayFailures) {
                            this.gatewayHealthy = false;
                        }
                        lastError = e;
                        continue;
                    }
                }

                // Fallback - return degraded response
                if (this.config.stdioFallback) {
                    return {
                        ok: false,
                        error: 'Gateway unavailable, using fallback',
                        source: 'fallback',
                        attempts: req.attempts,
                        latencyMs: 0
                    };
                }

                throw lastError || new Error('No fallback available');
            } catch (e) {
                lastError = e;
            }
        }

        // All attempts failed
        return {
            ok: false,
            error: lastError?.message || 'All attempts failed',
            source: 'queue',
            attempts: req.attempts,
            latencyMs: 0
        };
    }

    // --- Payload compression ---
    compressPayload(payload) {
        const compressed = { ...payload };
        if (compressed.messages) {
            compressed.messages = compressed.messages.map(msg => ({
                ...msg,
                content: TokenCompressor.compress(msg.content, this.config.compressionAggressiveness)
            }));
        }
        return compressed;
    }

    // --- Health checks ---
    startHealthChecks() {
        this.healthCheckInterval = setInterval(async () => {
            if (!this.config.useGateway) return;

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const headers = { 'Content-Type': 'application/json' };
                if (this.config.apiKey) {
                    headers.Authorization = `Bearer ${this.config.apiKey}`;
                }

                await fetch(`${this.config.gatewayUrl}/health`, {
                    method: 'GET',
                    headers,
                    signal: controller.signal
                });

                clearTimeout(timeoutId);
                this.gatewayHealthy = true;
                this.consecutiveFailures = 0;
                this.gatewayCircuitBreaker.reset();
            } catch {
                // Health check failed - gateway might be down
            }
        }, this.config.healthProbeIntervalMs);
    }

    // --- Public API ---
    getQueueSize() {
        return this.requestQueue.getSize();
    }

    getCacheSize() {
        return this.cache.size;
    }

    isGatewayHealthy() {
        return this.gatewayHealthy;
    }

    getCircuitBreakerState() {
        return this.gatewayCircuitBreaker.getState();
    }

    clearCache() {
        this.cache.clear();
    }

    destroy() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
        this.requestQueue.clear();
        this.cache.clear();
    }
}

// --- Singleton instance ---
let singleton = null;

export function getOmniroutePassthrough(config) {
    if (!singleton) {
        singleton = new OmniroutePassthrough(config);
    }
    return singleton;
}

// --- Export types ---
export const OmnirouteConfigExports = {
    // Export the config object for convenience
    gatewayUrl: OmnirouteConfig.gatewayUrl,
    apiKey: OmnirouteConfig.apiKey,
    useGateway: OmnirouteConfig.useGateway,
    gatewayTimeoutMs: OmnirouteConfig.gatewayTimeoutMs,
    maxGatewayFailures: OmnirouteConfig.maxGatewayFailures,
    stdioFallback: OmnirouteConfig.stdioFallback,
    enableTokenCompression: OmnirouteConfig.enableTokenCompression,
    maxTokensBeforeCompression: OmnirouteConfig.maxTokensBeforeCompression,
    compressionAggressiveness: OmnirouteConfig.compressionAggressiveness,
    healthProbeIntervalMs: OmnirouteConfig.healthProbeIntervalMs
};