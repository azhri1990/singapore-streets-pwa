import * as THREE from 'three';

/**
 * Accessible arcade vehicle motion for the lightweight Three.js city.
 * It intentionally favours responsive controls over full rigid-body simulation.
 */
export class ArcadeVehicleController {
    constructor(game) {
        this.game = game;
        this.velocity = new THREE.Vector3();
        this.forward = new THREE.Vector3();
        this.right = new THREE.Vector3();
    }

    initialise(vehicle) {
        const state = vehicle.userData.drive || {};
        vehicle.userData.drive = {
            speed: 0,
            steering: 0,
            condition: 100,
            distance: 0,
            ...state
        };
    }

    update(delta) {
        const player = this.game.player;
        const vehicle = player?.currentVehicle;
        if (!player?.isInVehicle || !vehicle) return;
        this.initialise(vehicle);
        const state = vehicle.userData.drive;
        const spec = vehicle.userData.spec || { maxSpeed: 26, accel: 9, grip: 5, turn: 2 };
        const settings = player.drivingSettings || {};
        const input = this.game.actionInput?.getDrivingInput() || {};
        const maxSpeed = spec.maxSpeed * (state.condition <= 25 ? 0.72 : 1);
        const accel = spec.accel || 9;
        const brakePower = accel * 2.4;
        const drag = input.handbrake ? 5.2 : 1.15;

        if (input.throttle) state.speed += accel * delta;
        if (input.brake) {
            if (state.speed > 0.4) state.speed -= brakePower * delta;
            else state.speed -= accel * 0.62 * delta;
        }
        if (!input.throttle && !input.brake) state.speed = THREE.MathUtils.damp(state.speed, 0, drag, delta);
        state.speed = THREE.MathUtils.clamp(state.speed, -maxSpeed * 0.34, maxSpeed);
        if (Math.abs(state.speed) < 0.03) state.speed = 0;

        const speedRatio = Math.min(1, Math.abs(state.speed) / maxSpeed);
        const sensitivity = settings.steering ?? 1;
        const lowSpeedTurn = 1 - speedRatio * 0.58;
        const steeringTarget = (input.steer || 0) * sensitivity;
        const steerResponse = settings.assist === false ? 9 : 13;
        state.steering = THREE.MathUtils.damp(state.steering, steeringTarget, steerResponse, delta);
        const turnRate = (spec.turn || 2) * lowSpeedTurn;
        if (Math.abs(state.speed) > 0.06) vehicle.rotation.y -= state.steering * turnRate * delta * (state.speed < 0 ? -0.65 : 1);

        this.forward.set(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.rotation.y);
        this.right.set(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), vehicle.rotation.y);
        const desired = this.forward.multiplyScalar(state.speed);
        const traction = input.handbrake ? 2.4 : (settings.assist === false ? 5.5 : 10.5) + (spec.grip || 5) * 0.35;
        this.velocity.lerp(desired, Math.min(1, traction * delta));
        vehicle.position.addScaledVector(this.velocity, delta);
        vehicle.position.y = Math.max(0.5, vehicle.position.y);
        state.distance += Math.abs(state.speed) * delta;
        vehicle.userData.speed = state.speed;

        this.updateVisuals(vehicle, state, input);
        this.checkBounds(vehicle, state);
    }

    updateVisuals(vehicle, state, input) {
        vehicle.children.forEach((child) => {
            if (child.geometry?.type === 'CylinderGeometry' && child.position.y < 0.6) {
                child.rotation.z -= state.speed * 0.08;
                if (child.position.x > 0) child.rotation.y = -state.steering * 0.42;
            }
        });
        if (input.handbrake && Math.abs(state.speed) > 8) this.game.drivingSettings?.vibrate(10);
    }

    checkBounds(vehicle, state) {
        const limit = 490;
        const outside = Math.abs(vehicle.position.x) > limit || Math.abs(vehicle.position.z) > limit;
        if (!outside) return;
        vehicle.position.x = THREE.MathUtils.clamp(vehicle.position.x, -limit, limit);
        vehicle.position.z = THREE.MathUtils.clamp(vehicle.position.z, -limit, limit);
        state.speed *= -0.22;
        state.condition = Math.max(0, state.condition - 3);
        this.game.drivingSettings?.vibrate([20, 35, 20]);
    }
}
