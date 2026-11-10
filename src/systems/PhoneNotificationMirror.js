/**
 * Phone Notification Mirror
 * Mirrors phone notifications to in-game in real-time
 */

export class PhoneNotificationMirror {
    constructor(game) {
        this.game = game;
        this.notifications = [];
        this.enabled = true;
        this.setupUI();
        this.setupNotificationListener();
    }
    
    setupUI() {
        // Notification container
        this.container = document.createElement('div');
        this.container.id = 'phone-notifications';
        this.container.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            width: 320px;
            z-index: 10001;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    }
    
    setupNotificationListener() {
        // Web Notifications API
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted');
                }
            });
        }
        
        // Listen for service worker messages (for push notifications)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'notification') {
                    this.handleNotification(event.data.notification);
                }
            });
        }
        
        // For Android/Capacitor, use native notification listener
        this.setupAndroidListener();
    }
    
    setupAndroidListener() {
        // In a real Android app, this would use a native plugin
        // For web, we'll simulate with periodic checks
        
        // Check for new notifications every second
        setInterval(() => {
            this.checkForNewNotifications();
        }, 1000);
    }
    
    checkForNewNotifications() {
        // In a real implementation, this would query the native notification service
        // For demo, we'll check localStorage for new notifications
        const stored = localStorage.getItem('phone_notifications');
        if (stored) {
            const notifs = JSON.parse(stored);
            const newNotifs = notifs.filter(n => !this.notifications.find(existing => existing.id === n.id));
            
            newNotifs.forEach(n => {
                this.handleNotification(n);
            });
        }
    }
    
    handleNotification(notification) {
        if (!this.enabled) return;
        
        const notif = {
            id: notification.id || Date.now().toString(),
            title: notification.title || 'Notification',
            body: notification.body || '',
            icon: notification.icon || null,
            app: notification.app || 'Unknown',
            timestamp: Date.now(),
            read: false
        };
        
        this.notifications.push(notif);
        this.showNotification(notif);
        
        // Play notification sound
        this.playNotificationSound();
        
        // Voice announcement (optional)
        if (window.voiceSynth && notification.announce) {
            window.voiceSynth.speak(`${notification.app}: ${notification.title}`, 'chinese_singaporean', { rate: 1.1 });
        }
    }
    
    showNotification(notif) {
        const div = document.createElement('div');
        div.id = `notif-${notif.id}`;
        div.style.cssText = `
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #00ffff;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 8px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            animation: slideInRight 0.3s ease;
            pointer-events: auto;
            cursor: pointer;
        `;
        
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                ${notif.icon ? `<img src="${notif.icon}" style="width: 20px; height: 20px; border-radius: 4px;">` : ''}
                <strong style="color: #00ffff;">${notif.app}</strong>
                <span style="font-size: 10px; color: #888; margin-left: auto;">${new Date(notif.timestamp).toLocaleTimeString()}</span>
            </div>
            <div style="font-weight: bold; margin-bottom: 2px;">${notif.title}</div>
            <div style="font-size: 11px; color: #ccc;">${notif.body}</div>
        `;
        
        div.onclick = () => {
            div.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => div.remove(), 300);
        };
        
        this.container.appendChild(div);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (div.parentNode) {
                div.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => div.remove(), 300);
            }
        }, 10000);
    }
    
    playNotificationSound() {
        if (!window.AudioContext) return;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.value = 0.2;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
    }
    
    // Simulate a notification (for testing)
    simulateNotification(app, title, body) {
        this.handleNotification({
            id: Date.now().toString(),
            app,
            title,
            body,
            icon: null,
            announce: false
        });
    }
    
    // Toggle notifications
    toggle() {
        this.enabled = !this.enabled;
        if (this.game.showNotification) {
            this.game.showNotification('🔔 NOTIFICATIONS', this.enabled ? 'Enabled' : 'Disabled');
        }
    }
    
    // Get notification history
    getHistory() {
        return this.notifications;
    }
    
    // Clear all notifications
    clearAll() {
        this.notifications = [];
        this.container.innerHTML = '';
    }
    
    update(delta) {
        // Update notification state
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.PhoneNotificationMirror = PhoneNotificationMirror;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
    from { opacity: 0; transform: translateX(100%); }
    to { opacity: 1; transform: translateX(0); }
}
@keyframes slideOutRight {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(100%); }
}
`;
document.head.appendChild(style);
