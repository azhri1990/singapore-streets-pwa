import * as THREE from 'three';
/**
 * Singapore Gang System Manager
 * Manages gang territories, graffiti, hangouts, and interactions
 */

import { SingaporeGangs, GangTerritories, GangBehaviors, GangGraffiti, GangHangouts } from './SingaporeGangs.js';

export class SingaporeGangSystem {
    constructor(game) {
        this.game = game;
        this.activeGangs = Object.keys(SingaporeGangs);
        this.gangMembers = {};
        this.gangTerritories = GangTerritories;
        this.graffiti = {};
        
        this.setupGangs();
        this.setupUI();
    }
    
    setupGangs() {
        // Initialize gang members
        this.activeGangs.forEach(gangName => {
            this.gangMembers[gangName] = [];
        });
    }
    
    setupUI() {
        this.ui = document.createElement('div');
        this.ui.id = 'gang-ui';
        this.ui.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.85);
            border: 1px solid #ff00ff;
            border-radius: 8px;
            padding: 12px;
            color: #fff;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
            max-width: 300px;
            display: none;
        `;
        document.body.appendChild(this.ui);
    }
    
    // Get gang controlling a territory
    getGangForTerritory(territory) {
        const gangs = this.gangTerritories[territory] || [];
        return gangs.length > 0 ? gangs[0] : null;
    }
    
    // Check if player is in gang territory
    isInGangTerritory(playerPos) {
        // Simplified: check if near known hangout locations
        for (const [territory, gangs] of Object.entries(this.gangTerritories)) {
            // This would need actual position checking
        }
        return null;
    }
    
    // Spawn gang members
    spawnGangMembers(gangName, location, count = 3) {
        const gang = SingaporeGangs[gangName];
        if (!gang) return;
        
        for (let i = 0; i < count; i++) {
            const member = this.createGangMember(gangName, gang);
            member.position.set(
                location.x + (Math.random() - 0.5) * 10,
                0,
                location.z + (Math.random() - 0.5) * 10
            );
            this.game.scene.add(member);
            this.gangMembers[gangName].push(member);
        }
    }
    
    createGangMember(gangName, gang) {
        const group = new THREE.Group();
        
        // Body
        const bodyGeo = new THREE.CapsuleGeometry(0.3, 1.2, 8, 16);
        const bodyMat = new THREE.MeshStandardMaterial({ 
            color: gang.color, 
            roughness: 0.8, 
            metalness: 0.1 
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 0.9;
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);
        
        // Head
        const headGeo = new THREE.SphereGeometry(0.25, 16, 12);
        const headMat = new THREE.MeshStandardMaterial({ 
            color: 0xeac8a8, 
            roughness: 0.9, 
            metalness: 0.0 
        });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 1.7;
        head.castShadow = true;
        head.receiveShadow = true;
        group.add(head);
        
        // Bandana/accessory
        const bandanaGeo = new THREE.BoxGeometry(0.5, 0.1, 0.1);
        const bandanaMat = new THREE.MeshStandardMaterial({ 
            color: gang.color, 
            roughness: 0.8, 
            metalness: 0.1 
        });
        const bandana = new THREE.Mesh(bandanaGeo, bandanaMat);
        bandana.position.y = 1.85;
        bandana.castShadow = true;
        bandana.receiveShadow = true;
        group.add(bandana);
        
        // Tag on back
        const tagGeo = new THREE.PlaneGeometry(0.5, 0.3);
        const tagMat = new THREE.MeshStandardMaterial({ 
            color: gang.tagColor, 
            roughness: 0.9, 
            metalness: 0.0,
            transparent: true, 
            opacity: 0.8 
        });
        const tag = new THREE.Mesh(tagGeo, tagMat);
        tag.position.set(0, 1.2, -0.3);
        tag.rotation.y = Math.PI;
        group.add(tag);
        
        group.userData = {
            type: 'gang_member',
            gang: gangName,
            gangInfo: gang,
            health: 100,
            armed: Math.random() > 0.5
        };
        
        return group;
    }
    
    // Gang interaction
    interactWithGang(gangName, player) {
        const gang = SingaporeGangs[gangName];
        const behavior = GangBehaviors[gangName];
        if (!gang || !behavior) return;
        
        const reputation = player.gangReputation?.[gangName] || 0;
        
        let response;
        if (reputation > 50) {
            response = `${behavior.greeting} You one of us!`;
        } else if (reputation < -50) {
            response = `${behavior.threat} You not welcome here!`;
        } else {
            response = behavior.greeting;
        }
        
        if (this.game.showNotification) {
            this.game.showNotification(`🚫 ${gang.name}`, response);
        }
        
        // Voice
        if (window.voiceSynth) {
            const voiceProfiles = {
                chinese: 'chinese_singaporean',
                malay: 'malay_singaporean',
                indian: 'indian_singaporean',
                mixed: 'chinese_singaporean'
            };
            window.voiceSynth.speakSinglish(response, voiceProfiles[gang.ethnicity.toLowerCase()] || 'chinese_singaporean');
        }
    }
    
    // Gang war
    startGangWar(gang1, gang2) {
        const g1 = SingaporeGangs[gang1];
        const g2 = SingaporeGangs[gang2];
        
        if (!g1 || !g2) return;
        
        if (this.game.showNotification) {
            this.game.showNotification('⚔️ GANG WAR', `${g1.name} vs ${g2.name}!`);
        }
        
        // Spawn members from both gangs
        // This would be implemented with actual positions
    }
    
    // Tag territory
    tagTerritory(gangName, position) {
        const graffiti = GangGraffiti[gangName];
        if (!graffiti || graffiti.length === 0) return;
        
        const tag = graffiti[Math.floor(Math.random() * graffiti.length)];
        const gang = SingaporeGangs[gangName];
        
        // Create graffiti mesh
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, 256, 128);
        ctx.fillStyle = `#${gang.tagColor.toString(16).padStart(6, '0')}`;
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(tag, 128, 80);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshStandardMaterial({ 
    map: texture, 
    transparent: true,
    roughness: 0.9,
    metalness: 0.0 
});
        const geometry = new THREE.PlaneGeometry(2, 1);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        mesh.position.y = 1;
        this.game.scene.add(mesh);
        
        this.graffiti[position.x + '_' + position.z] = { gang: gangName, tag, mesh };
    }
    
    // Get gang info for UI
    getGangInfo(gangName) {
        const gang = SingaporeGangs[gangName];
        if (!gang) return null;
        
        return {
            name: gang.name,
            tag: gang.tag,
            territory: gang.territory,
            members: gang.members,
            ethnicity: gang.ethnicity,
            attitude: gang.attitude,
            behavior: gang.behavior,
            hangout: gang.hangout,
            rivals: gang.rivals,
            allies: gang.allies,
            crimes: gang.crimes
        };
    }
    
    // Show gang UI
    showGangUI(gangName) {
        const info = this.getGangInfo(gangName);
        if (!info) return;
        
        this.ui.style.display = 'block';
        this.ui.innerHTML = `
            <div style="color: #ff00ff; font-weight: bold; margin-bottom: 8px; font-size: 14px;">
                🚫 ${info.name}
            </div>
            <div style="margin-bottom: 4px;"><strong>Tag:</strong> ${info.tag}</div>
            <div style="margin-bottom: 4px;"><strong>Ethnicity:</strong> ${info.ethnicity}</div>
            <div style="margin-bottom: 4px;"><strong>Territory:</strong> ${info.territory.join(', ')}</div>
            <div style="margin-bottom: 4px;"><strong>Hangout:</strong> ${info.hangout}</div>
            <div style="margin-bottom: 4px;"><strong>Members:</strong> ${info.members}</div>
            <div style="margin-bottom: 4px;"><strong>Attitude:</strong> ${info.attitude}</div>
            <div style="margin-bottom: 8px;"><strong>Crimes:</strong> ${info.crimes.join(', ')}</div>
            <div style="font-size: 10px; color: #888;">
                Rivals: ${info.rivals.join(', ') || 'None'}<br>
                Allies: ${info.allies.join(', ') || 'None'}
            </div>
        `;
        
        setTimeout(() => {
            this.ui.style.display = 'none';
        }, 10000);
    }
    
    update(delta) {
        // Update gang member AI
        // This would handle gang member movement, interactions, etc.
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.SingaporeGangSystem = SingaporeGangSystem;
}
