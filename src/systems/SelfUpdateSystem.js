// SelfUpdateSystem.js - Automatic update checking and rollback for mobile game
// Integrates with remote configuration and version management

export class SelfUpdateSystem {
    constructor(game) {
        this.game = game;
        this.currentVersion = '1.0.0';
        this.updateCheckInterval = null;
        this.isChecking = false;
        this.autoUpdateEnabled = false;
        this.updateHistory = [];
        this.lastCheck = null;
        
        this.initialize();
    }
    
    initialize() {
        // Load current version from config
        this.loadVersionConfig();
        
        console.log(`[SelfUpdateSystem] Initialized - Version: ${this.currentVersion}`);
    }
    
    loadVersionConfig() {
        // Try to load version from game or config
        if (this.game && this.game.getVersion) {
            this.currentVersion = this.game.getVersion();
        }
    }
    
    startUpdateChecks(intervalMs = 3600000) { // Default 1 hour
        this.stopUpdateChecks();
        
        this.updateCheckInterval = setInterval(() => {
            this.checkForUpdates();
        }, intervalMs);
        
        console.log(`[SelfUpdateSystem] Update checks enabled (interval: ${intervalMs}ms)`);
    }
    
    stopUpdateChecks() {
        if (this.updateCheckInterval) {
            clearInterval(this.updateCheckInterval);
            this.updateCheckInterval = null;
        }
    }
    
    async checkForUpdates() {
        if (this.isChecking) return;
        
        this.isChecking = true;
        this.lastCheck = Date.now();
        
        try {
            const updateInfo = await this.fetchUpdateInfo();
            
            if (updateInfo.available && updateInfo.version !== this.currentVersion) {
                console.log(`[SelfUpdateSystem] Update available: ${updateInfo.version}`);
                
                if (this.autoUpdateEnabled) {
                    await this.applyUpdate(updateInfo);
                } else {
                    console.log('[SelfUpdateSystem] Auto-update disabled. Manual update required.');
                }
            } else {
                console.log('[SelfUpdateSystem] No updates available');
            }
        } catch (error) {
            console.warn(`[SelfUpdateSystem] Update check failed:`, error.message);
        } finally {
            this.isChecking = false;
        }
    }
    
    async fetchUpdateInfo() {
        // Try to fetch update info from server
        // This would normally hit an API endpoint
        const endpoints = [
            '/api/update',
            '/manifest/version.json'
        ];
        
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint);
                if (response.ok) {
                    const data = await response.json();
                    return {
                        available: data.version !== this.currentVersion,
                        version: data.version || this.currentVersion,
                        changelog: data.changelog || '',
                        downloadUrl: data.downloadUrl || ''
                    };
                }
            } catch (e) {
                // Endpoint not available, try next
                continue;
            }
        }
        
        return {
            available: false,
            version: this.currentVersion,
            changelog: '',
            downloadUrl: ''
        };
    }
    
    async applyUpdate(updateInfo) {
        console.log(`[SelfUpdateSystem] Applying update: ${updateInfo.version}`);
        
        const previousVersion = this.currentVersion;
        
        // Record update attempt
        const updateRecord = {
            timestamp: Date.now(),
            fromVersion: previousVersion,
            toVersion: updateInfo.version,
            status: 'applying'
        };
        
        this.updateHistory.push(updateRecord);
        
        try {
            // If we have a download URL, trigger download
            if (updateInfo.downloadUrl) {
                await this.downloadUpdate(updateInfo.downloadUrl);
            }
            
            // Apply the update
            this.currentVersion = updateInfo.version;
            updateRecord.status = 'completed';
            
            console.log(`[SelfUpdateSystem] Update completed: ${updateInfo.version}`);
            
            // Notify game of version change
            if (this.game && this.game.onVersionUpdated) {
                this.game.onVersionUpdated(updateInfo.version);
            }
            
            return true;
        } catch (error) {
            console.error(`[SelfUpdateSystem] Update failed:`, error.message);
            updateRecord.status = 'failed';
            updateRecord.error = error.message;
            
            // Attempt rollback if configured
            await this.rollbackUpdate(previousVersion);
            
            return false;
        }
    }
    
    async downloadUpdate(downloadUrl) {
        // Download the update file
        // This is a placeholder - real implementation would depend on update format
        console.log(`[SelfUpdateSystem] Downloading update from: ${downloadUrl}`);
        
        // In a real implementation, this would download and verify checksums
        return true;
    }
    
    async rollbackUpdate(targetVersion) {
        console.log(`[SelfUpdateSystem] Rolling back to version: ${targetVersion}`);
        
        this.currentVersion = targetVersion;
        
        // Notify game of rollback
        if (this.game && this.game.onVersionRollback) {
            this.game.onVersionRollback(targetVersion);
        }
    }
    
    // Public API
    enableAutoUpdate(enabled = true) {
        this.autoUpdateEnabled = enabled;
        console.log(`[SelfUpdateSystem] Auto-update ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    forceUpdateCheck() {
        return this.checkForUpdates();
    }
    
    getVersion() {
        return this.currentVersion;
    }
    
    getUpdateHistory() {
        return this.updateHistory;
    }
    
    stop() {
        this.stopUpdateChecks();
        console.log('[SelfUpdateSystem] Stopped');
    }

    // New: trigger self-update manually (delegates to checkForUpdates)
    triggerSelfUpdate() {
        this.checkForUpdates();
        console.log('[SelfUpdateSystem] Manual self-update triggered');
    }
}

// Export for global use
export let globalSelfUpdateSystem = null;

export function getSelfUpdateSystem(game) {
    if (!globalSelfUpdateSystem && game) {
        globalSelfUpdateSystem = new SelfUpdateSystem(game);
    }
    return globalSelfUpdateSystem;
}