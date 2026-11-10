import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { World } from './world/World.js';
import { Player } from './entities/Player.js';
import { VehicleManager } from './entities/VehicleManager.js';
import { UI } from './ui/UI.js';
import { SingaporeDetails } from './world/SingaporeDetails.js';
import { RoadSigns } from './world/RoadSigns.js';

class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        this.scene.fog = new THREE.Fog(0x87CEEB, 50, 200);
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 5);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        document.body.appendChild(this.renderer.domElement);
        
        this.clock = new THREE.Clock();
        this.world = new World(this.scene);
        this.singaporeDetails = new SingaporeDetails(this.scene);
        this.roadSigns = new RoadSigns(this.scene);
        this.player = new Player(this.scene, this.camera);
        this.vehicles = new VehicleManager(this.scene);
        this.ui = new UI();
        
        this.setupLights();
        this.setupEvents();
        this.animate();
        
        document.getElementById('loading').style.display = 'none';
    }
    
    setupLights() {
        const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x8B7355, 0.6);
        this.scene.add(hemiLight);
        
        const dirLight = new THREE.DirectionalLight(0xFFF5E6, 1.0);
        dirLight.position.set(50, 100, 50);
        dirLight.castShadow = true;
        dirLight.shadow.camera.left = -50;
        dirLight.shadow.camera.right = 50;
        dirLight.shadow.camera.top = 50;
        dirLight.shadow.camera.bottom = -50;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);
    }
    
    setupEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();
        this.player.update(delta);
        this.vehicles.update(delta);
        this.ui.update(this.player, this.vehicles);
        this.renderer.render(this.scene, this.camera);
    }
}

new Game();

// Add Singapore details
import { SingaporeDetails } from './world/SingaporeDetails.js';
import { RoadSigns } from './world/RoadSigns.js';
// We'll add after world creation - modify approach
