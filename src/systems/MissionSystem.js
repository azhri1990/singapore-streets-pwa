import * as THREE from 'three';

/** A compact, offline campaign with checkpoints, rewards and replay scores. */
export class MissionSystem {
    constructor(game) {
        this.game = game;
        this.reputation = 0;
        this.completed = 0;
        this.activeMission = null;
        this.missionMarker = null;
        this.bestScores = {};
        this.missions = [
            { id: 'airport-transfer', title: 'Airport Transfer', type: 'Ride service', description: 'Take the nearby taxi to the Changi terminal pickup point.', start: new THREE.Vector3(5, 0, 5), checkpoints: [new THREE.Vector3(100, 0, 80), new THREE.Vector3(220, 0, 160), new THREE.Vector3(300, 0, 200)], reward: 45, reputation: 5, requiredVehicle: 'singaporeTaxi' },
            { id: 'hawker-delivery', title: 'Hawker Delivery', type: 'Delivery', description: 'Bring a fresh order across the city before it gets cold.', start: new THREE.Vector3(5, 0, 5), checkpoints: [new THREE.Vector3(25, 0, 100), new THREE.Vector3(50, 0, 250)], reward: 35, reputation: 4 },
            { id: 'marina-photo', title: 'Marina Photo Walk', type: 'Tourism', description: 'Visit the Marina skyline and capture the city atmosphere.', start: new THREE.Vector3(5, 0, 5), checkpoints: [new THREE.Vector3(0, 0, 120), new THREE.Vector3(0, 0, 200)], reward: 30, reputation: 3 },
            { id: 'community-check', title: 'Community Check', type: 'Security', description: 'Check in at the neighbourhood hub and keep the district safe.', start: new THREE.Vector3(5, 0, 5), checkpoints: [new THREE.Vector3(-40, 0, -40), new THREE.Vector3(-80, 0, -80)], reward: 40, reputation: 5 }
        ];
        this.createHUD();
    }

    createHUD() {
        this.hud = document.createElement('div');
        this.hud.id = 'mission-hud';
        this.hud.style.cssText = 'position:fixed;left:16px;top:130px;z-index:1001;width:min(310px,calc(100vw - 32px));padding:12px;border:1px solid #00d9ff;border-radius:10px;background:rgba(5,15,28,.88);color:#fff;font:12px/1.45 Arial,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.35);';
        document.body.appendChild(this.hud);
        this.renderHUD();
    }

    getNextAvailableMission() {
        return this.missions.find((mission) => !this.bestScores[mission.id]) || this.missions[0];
    }

    renderHUD() {
        const mission = this.activeMission;
        const cash = Math.round(this.game.player?.money || 0);
        const vehicleHint = mission?.requiredVehicle && !this.hasRequiredVehicle()
            ? '<br><span style="color:#ffcf6d">Enter the nearby taxi to continue.</span>' : '';
        const status = mission
            ? `<strong style="color:#00e5ff">${mission.title}</strong><br><span>${mission.description}</span><br><span style="color:#ffd54a">Checkpoint ${mission.checkpointIndex + 1}/${mission.checkpoints.length}: ${this.distanceToTarget()} m</span>${vehicleHint}`
            : '<strong style="color:#00e5ff">City Campaign</strong><br><span>Visit a glowing start point or choose a mission below.</span>';
        const actions = mission ? '<button data-action="cancel">Cancel mission</button>' : this.missions.map((item) => `<button data-mission="${item.id}">${item.type}: ${item.title}${this.bestScores[item.id] ? ` · ★ ${this.bestScores[item.id].stars}` : ''}</button>`).join('');
        this.hud.innerHTML = `${status}<div style="margin:8px 0;color:#a8ffb0">Cash: SGD ${cash} · Reputation: ${this.reputation} · Completed: ${this.completed}</div><div style="display:grid;gap:5px">${actions}</div>`;
        this.hud.querySelectorAll('[data-mission]').forEach((button) => { button.style.cssText = this.buttonStyle(); button.onclick = () => this.start(button.dataset.mission); });
        const cancel = this.hud.querySelector('[data-action="cancel"]');
        if (cancel) { cancel.style.cssText = this.buttonStyle('#5c2430'); cancel.onclick = () => this.cancel(); }
    }

    buttonStyle(background = '#124d63') { return `padding:7px 8px;border:1px solid #30d5ff;border-radius:5px;background:${background};color:#fff;text-align:left;cursor:pointer;font:inherit;`; }

    start(id) {
        const template = this.missions.find((mission) => mission.id === id);
        if (!template || this.activeMission) return false;
        this.activeMission = { ...template, checkpointIndex: 0, startedAt: Date.now() };
        this.createMarker(this.activeMission.checkpoints[0]);
        this.renderHUD();
        this.game.showNotification?.(`🎯 ${template.title}`, `${template.description} Follow the checkpoint markers.`);
        return true;
    }

    createMarker(position) {
        this.removeMarker();
        const marker = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.15, 20), new THREE.MeshStandardMaterial({ 
    color: 0x00e5ff, 
    roughness: 0.9, 
    metalness: 0.0,
    transparent: true,
    opacity: 0.85
}));
        marker.position.copy(position); marker.position.y = 0.2; marker.userData.missionMarker = true;
        this.game.scene.add(marker); this.missionMarker = marker;
    }

    removeMarker() {
        if (!this.missionMarker) return;
        this.game.scene.remove(this.missionMarker); this.missionMarker.geometry.dispose(); this.missionMarker.material.dispose(); this.missionMarker = null;
    }

    distanceToTarget() {
        const target = this.activeMission?.checkpoints[this.activeMission.checkpointIndex];
        return target && this.game.player?.position ? Math.ceil(this.game.player.position.distanceTo(target)) : 0;
    }

    hasRequiredVehicle() {
        const required = this.activeMission?.requiredVehicle;
        if (!required) return true;
        return this.game.player?.isInVehicle && this.game.player.currentVehicle?.userData?.type === `Vehicle_${required}`;
    }

    update() {
        if (!this.activeMission) return;
        if (this.missionMarker) this.missionMarker.rotation.y += 0.03;
        if (this.distanceToTarget() <= 7 && this.hasRequiredVehicle()) this.reachCheckpoint();
        else if (Math.floor(performance.now() / 500) % 2 === 0) this.renderHUD();
    }

    reachCheckpoint() {
        const mission = this.activeMission;
        mission.checkpointIndex += 1;
        if (mission.checkpointIndex >= mission.checkpoints.length) return this.complete();
        this.createMarker(mission.checkpoints[mission.checkpointIndex]);
        this.renderHUD();
        this.game.showNotification?.('✓ CHECKPOINT', `Checkpoint ${mission.checkpointIndex}/${mission.checkpoints.length} reached.`);
    }

    complete() {
        const mission = this.activeMission;
        if (!mission) return;
        const seconds = Math.max(1, Math.round((Date.now() - mission.startedAt) / 1000));
        const prior = this.bestScores[mission.id];
        const stars = seconds <= 60 ? 3 : seconds <= 120 ? 2 : 1;
        const score = { seconds, stars };
        if (!prior || seconds < prior.seconds) this.bestScores[mission.id] = score;
        this.game.player.money = (this.game.player.money || 0) + mission.reward;
        this.reputation += mission.reputation; this.completed += 1; this.activeMission = null; this.removeMarker(); this.renderHUD();
        this.showScoreCard(mission, score, !prior || seconds < prior.seconds);
        this.game.saveSystem?.save();
    }

    showScoreCard(mission, score, isBest) {
        const card = document.createElement('div');
        card.style.cssText = 'position:fixed;inset:0;z-index:10050;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.6);font-family:Arial,sans-serif;';
        card.innerHTML = `<section style="width:min(360px,100%);padding:24px;border:1px solid #00e5ff;border-radius:14px;background:#0b1b2c;color:#fff;text-align:center;box-shadow:0 8px 30px #000"><h2 style="margin:0;color:#00e5ff">Mission Complete</h2><h3>${mission.title}</h3><div style="font-size:30px;color:#ffd54a">${'★'.repeat(score.stars)}${'☆'.repeat(3 - score.stars)}</div><p>Time: ${score.seconds}s${isBest ? ' · New best!' : ''}</p><p style="color:#a8ffb0">+SGD ${mission.reward} · +${mission.reputation} reputation</p><button style="padding:9px 18px;border:0;border-radius:6px;background:#00bcd4;color:#05131d;font-weight:bold;cursor:pointer">Continue</button></section>`;
        card.querySelector('button').onclick = () => card.remove(); document.body.appendChild(card);
    }

    cancel() { if (!this.activeMission) return; this.activeMission = null; this.removeMarker(); this.renderHUD(); this.game.showNotification?.('MISSION CANCELLED', 'No rewards were earned.'); }
    serialize() { return { reputation: this.reputation, completed: this.completed, bestScores: this.bestScores, activeMissionId: this.activeMission?.id || null, checkpointIndex: this.activeMission?.checkpointIndex || 0 }; }
    restore(data = {}) { this.reputation = Number(data.reputation) || 0; this.completed = Number(data.completed) || 0; this.bestScores = data.bestScores || {}; if (data.activeMissionId) { this.start(data.activeMissionId); if (this.activeMission) { this.activeMission.checkpointIndex = Math.min(Number(data.checkpointIndex) || 0, this.activeMission.checkpoints.length - 1); this.createMarker(this.activeMission.checkpoints[this.activeMission.checkpointIndex]); } } this.renderHUD(); }
    destroy() { this.removeMarker(); this.hud?.remove(); }
}
