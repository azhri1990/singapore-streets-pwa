/**
 * AI Chat UI for Singapore Streets
 * In-game chat with AI Game Master
 */

export class AIChatUI {
    constructor(gameMaster) {
        this.gameMaster = gameMaster;
        this.isOpen = false;
        this.messages = [];
        this.createUI();
    }

    createUI() {
        this.container = document.createElement('div');
        this.container.id = 'ai-chat-ui';
        this.container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 380px;
            height: 500px;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #00ffff;
            border-radius: 12px;
            display: none;
            flex-direction: column;
            z-index: 10000;
            font-family: 'Courier New', monospace;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
            overflow: hidden;
        `;

        this.container.innerHTML = `
            <div style="
                background: linear-gradient(90deg, #00ffff, #ff00ff);
                padding: 12px;
                font-weight: bold;
                color: #000;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <span>🤖 AI Game Master</span>
                <button id="ai-chat-close" style="
                    background: none; border: none; color: #000;
                    font-size: 20px; cursor: pointer; padding: 0 8px;
                ">×</button>
            </div>
            <div id="ai-chat-messages" style="
                flex: 1; overflow-y: auto; padding: 12px;
                display: flex; flex-direction: column; gap: 8px;
            "></div>
            <div style="padding: 12px; border-top: 1px solid #333; display: flex; gap: 8px;">
                <select id="ai-chat-mode" style="
                    flex: 1; background: #1a1a2e; color: #00ffff;
                    border: 1px solid #00ffff; border-radius: 4px; padding: 8px;
                ">
                    <option value="mission">🎯 Generate Mission</option>
                    <option value="dialogue">💬 NPC Dialogue</option>
                    <option value="radio">📻 Radio Commentary</option>
                    <option value="event">🌍 World Event</option>
                    <option value="chat">💭 Free Chat</option>
                </select>
                <button id="ai-chat-send" style="
                    background: linear-gradient(90deg, #00ffff, #ff00ff);
                    border: none; color: #000; font-weight: bold;
                    padding: 8px 16px; border-radius: 4px; cursor: pointer;
                ">Send</button>
            </div>
            <div style="padding: 0 12px 12px; display: flex; gap: 8px;">
                <input type="text" id="ai-chat-input" placeholder="Ask anything about Singapore Streets..." style="
                    flex: 1; background: #1a1a2e; color: #fff;
                    border: 1px solid #333; border-radius: 4px; padding: 8px;
                    outline: none;
                ">
            </div>
        `;

        document.body.appendChild(this.container);

        // Event listeners
        document.getElementById('ai-chat-close').onclick = () => this.toggle();
        document.getElementById('ai-chat-send').onclick = () => this.sendMessage();
        document.getElementById('ai-chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick action buttons
        this.addQuickActions();
    }

    addQuickActions() {
        const quickActions = document.createElement('div');
        quickActions.style.cssText = `
            padding: 0 12px 12px; display: flex; flex-wrap: wrap; gap: 6px;
        `;
        
        const actions = [
            { label: '🎯 New Mission', mode: 'mission', prompt: 'Generate a new mission for me' },
            { label: '🚕 Taxi Uncle', mode: 'dialogue', prompt: 'Taxi driver dialogue' },
            { label: '🍚 Hawker Auntie', mode: 'dialogue', prompt: 'Hawker centre dialogue' },
            { label: '📻 Radio DJ', mode: 'radio', prompt: 'Radio commentary' },
            { label: '🌧️ Weather Event', mode: 'event', prompt: 'Random weather event' },
            { label: '🚨 Police', mode: 'dialogue', prompt: 'Police checkpoint dialogue' }
        ];

        actions.forEach(a => {
            const btn = document.createElement('button');
            btn.textContent = a.label;
            btn.style.cssText = `
                background: rgba(0, 255, 255, 0.1); border: 1px solid #00ffff;
                color: #00ffff; padding: 4px 8px; border-radius: 3px;
                font-size: 11px; cursor: pointer; transition: all 0.2s;
            `;
            btn.onmouseover = () => btn.style.background = 'rgba(0, 255, 255, 0.3)';
            btn.onmouseout = () => btn.style.background = 'rgba(0, 255, 255, 0.1)';
            btn.onclick = () => this.quickAction(a.mode, a.prompt);
            quickActions.appendChild(btn);
        });

        this.container.querySelector('#ai-chat-input').parentElement.parentElement.insertBefore(
            quickActions, 
            this.container.querySelector('#ai-chat-input').parentElement
        );
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.container.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen) {
            document.getElementById('ai-chat-input').focus();
        }
    }

    async sendMessage() {
        const input = document.getElementById('ai-chat-input');
        const mode = document.getElementById('ai-chat-mode').value;
        const text = input.value.trim();
        
        if (!text) return;
        
        input.value = '';
        this.addMessage('user', text);
        this.showTyping();

        try {
            let response;
            switch (mode) {
                case 'mission':
                    const mission = await this.gameMaster.generateMission({});
                    response = `🎯 **${mission.title}**\n${mission.description}\n\n📍 ${mission.location}\n💰 $${mission.reward.money} | ⭐ ${mission.reward.rep} rep\n⏱️ ${mission.timeLimit ? mission.timeLimit + 's' : 'No limit'}`;
                    break;
                case 'dialogue':
                    response = await this.gameMaster.generateNPCDialogue('hawker', text);
                    break;
                case 'radio':
                    response = await this.gameMaster.generateRadioCommentary({});
                    break;
                case 'event':
                    const event = await this.gameMaster.generateWorldEvent({});
                    response = `🌍 **${event.type.replace('_', ' ').toUpperCase()}** at ${event.location}\n${event.description}\n⏱️ ${event.duration}s\n🎮 Effects: ${event.effects.join(', ')}`;
                    break;
                default:
                    response = await this.gameMaster.callLLM(`You're the AI Game Master for Singapore Streets, a GTA-style open world game set in Singapore. Player asks: ${text}. Respond in character with Singapore flavor, keep it under 100 words.`);
            }
            this.hideTyping();
            this.addMessage('ai', response);
        } catch (e) {
            this.hideTyping();
            this.addMessage('ai', '⚠️ AI unavailable. Using local fallback.\n' + this.gameMaster.getFallbackDialogue('hawker'));
        }
    }

    async quickAction(mode, prompt) {
        document.getElementById('ai-chat-mode').value = mode;
        document.getElementById('ai-chat-input').value = prompt;
        this.sendMessage();
    }

    addMessage(sender, text) {
        const container = document.getElementById('ai-chat-messages');
        const div = document.createElement('div');
        div.style.cssText = `
            max-width: 85%; padding: 10px 14px; border-radius: 12px;
            font-size: 13px; line-height: 1.5; animation: slideIn 0.3s ease;
            ${sender === 'user' ? 
                'align-self: flex-end; background: linear-gradient(90deg, #00ffff, #ff00ff); color: #000;' : 
                'align-self: flex-start; background: rgba(0, 255, 255, 0.1); color: #00ffff; border: 1px solid rgba(0, 255, 255, 0.3);'
            }
        `;
        div.innerHTML = text.replace(/\n/g, '<br>');
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    showTyping() {
        const container = document.getElementById('ai-chat-messages');
        this.typingDiv = document.createElement('div');
        this.typingDiv.style.cssText = `
            align-self: flex-start; background: rgba(255, 0, 255, 0.1); color: #ff00ff;
            padding: 10px 14px; border-radius: 12px; font-size: 13px;
            border: 1px solid rgba(255, 0, 255, 0.3);
        `;
        this.typingDiv.innerHTML = '<span class="typing-dots">AI thinking</span>';
        container.appendChild(this.typingDiv);
        container.scrollTop = container.scrollHeight;
        
        // Animate dots
        let dots = '';
        this.typingInterval = setInterval(() => {
            dots = dots.length >= 3 ? '' : dots + '.';
            this.typingDiv.querySelector('.typing-dots').textContent = 'AI thinking' + dots;
        }, 400);
    }

    hideTyping() {
        if (this.typingDiv) {
            this.typingDiv.remove();
            clearInterval(this.typingInterval);
        }
    }
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);
