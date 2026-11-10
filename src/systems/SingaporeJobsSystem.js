/**
 * Singapore Jobs System Manager
 * Handles job assignment, activities, and events
 */

import { SingaporeJobs, SingaporeActivities, SingaporeEvents, getJobsByLocation, getActivitiesByLocation } from './SingaporeJobs.js';

export class SingaporeJobsSystem {
    constructor(game) {
        this.game = game;
        this.currentJob = null;
        this.jobProgress = 0;
        this.jobTimer = 0;
        this.earnings = 0;
        this.completedJobs = 0;
        
        this.activeActivity = null;
        this.activityTimer = 0;
        
        this.activeEvents = [];
        
        this.setupUI();
    }
    
    setupUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'singapore-jobs-ui';
        this.ui.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.85);
            border: 1px solid #00ff00;
            border-radius: 8px;
            padding: 12px;
            color: #fff;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
            max-width: 320px;
            display: none;
        `;
        document.body.appendChild(this.ui);
    }
    
    // Start a job
    startJob(jobName) {
        const job = SingaporeJobs[jobName];
        if (!job) return false;
        
        this.currentJob = { name: jobName, ...job };
        this.jobProgress = 0;
        this.jobTimer = 0;
        this.earnings = 0;
        
        this.showJobUI();
        
        if (this.game.showNotification) {
            this.game.showNotification('💼 JOB STARTED', `${job.name} at ${job.location}`);
        }
        
        return true;
    }
    
    // Update job progress
    updateJob(delta) {
        if (!this.currentJob) return;
        
        this.jobTimer += delta;
        
        // Complete task every 30 seconds
        if (this.jobTimer >= 30) {
            this.jobTimer = 0;
            this.completeTask();
        }
    }
    
    completeTask() {
        if (!this.currentJob) return;
        
        const pay = this.currentJob.pay.min + Math.random() * (this.currentJob.pay.max - this.currentJob.pay.min);
        this.earnings += pay;
        this.jobProgress++;
        
        const task = this.currentJob.tasks[Math.floor(Math.random() * this.currentJob.tasks.length)];
        
        if (this.game.showNotification) {
            this.game.showNotification('✅ TASK COMPLETE', `${task.replace('_', ' ')} - Earned SGD ${pay.toFixed(2)}`);
        }
        
        // Check if job complete (10 tasks)
        if (this.jobProgress >= 10) {
            this.completeJob();
        }
    }
    
    completeJob() {
        if (!this.currentJob) return;
        
        const totalEarnings = this.earnings;
        if (this.game.player) {
            this.game.player.money = (this.game.player.money || 0) + totalEarnings;
        }
        
        this.completedJobs++;
        
        if (this.game.showNotification) {
            this.game.showNotification('🎉 JOB COMPLETE', `Earned SGD ${totalEarnings.toFixed(2)} total`);
        }
        
        this.currentJob = null;
        this.hideJobUI();
    }
    
    quitJob() {
        if (!this.currentJob) return;
        
        if (this.game.showNotification) {
            this.game.showNotification('❌ JOB QUIT', `Earned SGD ${this.earnings.toFixed(2)} before quitting`);
        }
        
        if (this.game.player) {
            this.game.player.money = (this.game.player.money || 0) + this.earnings;
        }
        
        this.currentJob = null;
        this.hideJobUI();
    }
    
    // Start activity
    startActivity(activityName) {
        const activity = SingaporeActivities[activityName];
        if (!activity) return false;
        
        this.activeActivity = { name: activityName, ...activity };
        this.activityTimer = 0;
        
        // Deduct cost
        const cost = activity.cost.min + Math.random() * (activity.cost.max - activity.cost.min);
        if (this.game.player) {
            this.game.player.money = (this.game.player.money || 0) - cost;
        }
        
        if (this.game.showNotification) {
            this.game.showNotification('🎯 ACTIVITY', `${activity.name} - SGD ${cost.toFixed(2)}`);
        }
        
        return true;
    }
    
    updateActivity(delta) {
        if (!this.activeActivity) return;
        
        this.activityTimer += delta;
        
        if (this.activityTimer >= this.activeActivity.duration) {
            this.completeActivity();
        }
    }
    
    completeActivity() {
        if (!this.activeActivity) return;
        
        // Apply effects
        this.activeActivity.effects.forEach(effect => {
            if (effect === '+health' && this.game.player) {
                this.game.player.health = Math.min(100, this.game.player.health + 10);
            }
            if (effect === '+happiness' && this.game.player) {
                this.game.player.happiness = (this.game.player.happiness || 50) + 10;
            }
            if (effect === '+energy' && this.game.player) {
                this.game.player.energy = (this.game.player.energy || 50) + 15;
            }
        });
        
        if (this.game.showNotification) {
            this.game.showNotification('✅ ACTIVITY COMPLETE', this.activeActivity.name);
        }
        
        this.activeActivity = null;
    }
    
    // Trigger Singapore event
    triggerEvent(eventName) {
        const event = SingaporeEvents[eventName];
        if (!event) return false;
        
        this.activeEvents.push({ name: eventName, ...event, startTime: Date.now() });
        
        if (this.game.showNotification) {
            this.game.showNotification(`🎉 EVENT: ${event.name}`, event.description);
        }
        
        return true;
    }
    
    updateEvents() {
        const now = Date.now();
        this.activeEvents = this.activeEvents.filter(event => {
            return (now - event.startTime) < (event.duration * 1000);
        });
    }
    
    showJobUI() {
        if (!this.currentJob) return;
        
        this.ui.style.display = 'block';
        this.ui.innerHTML = `
            <div style="color: #00ff00; font-weight: bold; margin-bottom: 8px;">
                💼 ${this.currentJob.name.toUpperCase()}
            </div>
            <div style="margin-bottom: 4px;">Location: ${this.currentJob.location}</div>
            <div style="margin-bottom: 4px;">Pay: SGD ${this.currentJob.pay.min}-${this.currentJob.pay.max}/${this.currentJob.pay.unit}</div>
            <div style="margin-bottom: 4px;">Progress: ${this.jobProgress}/10 tasks</div>
            <div style="margin-bottom: 8px;">Earnings: SGD ${this.earnings.toFixed(2)}</div>
            <div style="display: flex; gap: 8px;">
                <button onclick="window.game.jobsSystem.quitJob()" style="
                    background: #ff0000; color: white; border: none;
                    padding: 4px 8px; border-radius: 4px; cursor: pointer;
                ">Quit Job</button>
            </div>
        `;
    }
    
    hideJobUI() {
        this.ui.style.display = 'none';
    }
    
    update(delta) {
        this.updateJob(delta);
        this.updateActivity(delta);
        this.updateEvents();
    }
    
    // Get available jobs at location
    getAvailableJobs(location) {
        return getJobsByLocation(location);
    }
    
    // Get available activities at location
    getAvailableActivities(location) {
        return getActivitiesByLocation(location);
    }
}

// Make jobs system globally accessible
if (typeof window !== 'undefined') {
    window.SingaporeJobsSystem = SingaporeJobsSystem;
}
