import * as THREE from 'three';
import { RealisticGraphics } from '../systems/RealisticGraphics.js';
import { QualityManager } from '../systems/QualityManager.js';
import { SingaporeCurrentState, getCurrentNews, getCurrentEvents } from '../systems/SingaporeCurrentState.js';
import { SingaporeMapData, findNearestLocation, getRoadAt, getERPAt, getNearestMRT } from '../world/SingaporeMap.js';
import { World } from '../world/World.js';
import { SingaporeDetails } from '../world/SingaporeDetails.js';
import { RoadSigns } from '../world/RoadSigns.js';
import { Player } from '../entities/Player.js';
import { VehicleManager } from '../entities/VehicleManager.js';
import { SingaporeVehicleFactory } from '../improvements/SingaporeVehicles.js';
import { HDBBuildingGenerator } from '../improvements/HDBBuildings.js';
import { SingaporeAtmosphere } from '../improvements/SingaporeAtmosphere.js';
import { ProceduralCBD } from '../improvements/ProceduralCBD.js';
import { MobileControls, MobileUI } from '../improvements/MobileControls.js';
import { MobileGTAControls, isMobileDevice } from '../improvements/MobileGTAControls.js';
import { ControllerSupport } from '../improvements/ControllerSupport.js';
import { SpotifyIntegration } from '../systems/SpotifyIntegration.js';
import { SingaporeFoodSystem } from '../systems/SingaporeFoodSystem.js';
import { MRTTravelSystem } from '../systems/MRTTravelSystem.js';
import { PhoneNotificationMirror } from '../systems/PhoneNotificationMirror.js';
// Lazy-loaded systems (removed from static imports)
// import { DisguiseStealthSystem } from '../systems/DisguiseStealthSystem.js';
// import { CombatStylesSystem } from '../systems/CombatStylesSystem.js';
// import { SmartNationHackingSystem } from '../systems/SmartNationHackingSystem.js';
// import { NPCLivingWorldSystem } from '../systems/NPCLivingWorldSystem.js';
import { ProgressionSystem } from '../systems/ProgressionSystem.js';
import { AIGameMaster, AITrafficSystem, AIMissionDirector } from '../improvements/AIFeatures.js';
import { AIChatUI } from '../improvements/AIChatUI.js';
import { EnhancedVehiclePhysics } from '../improvements/EnhancedVehiclePhysics.js';
import { NPCPathfinding } from '../improvements/NPCPathfinding.js';
import { AudioDSP } from '../improvements/AudioDSP.js';
import { ModelLODManager } from '../improvements/ModelLODManager.js';
import { ParticleEffectsSystem } from '../improvements/ParticleEffects.js';
import { CharacterController } from '../entities/CharacterController.js';
import { DesktopControls } from '../controls/DesktopControls.js';
import { WantedSystem } from '../systems/WantedSystem.js';
import { EnhancedWantedSystem } from '../systems/EnhancedWantedSystem.js';
import { CombatSystem } from '../combat/CombatSystem.js';
import { VehicleTheft } from '../systems/VehicleTheft.js';
import { SaveSystem } from '../systems/SaveSystem.js';
import { ConsequenceSystem } from '../systems/ConsequenceSystem.js';
import { RandomEventsSystem } from '../systems/RandomEventsSystem.js';
import { CharacterCustomization } from '../systems/CharacterCustomization.js';
import { SexualContentSystem } from '../systems/SexualContentSystem.js';
import { GoreSystem } from '../systems/GoreSystem.js';
import { PhoneCallSystem } from '../systems/PhoneCallSystem.js';
import { PropertySystem } from '../systems/PropertySystem.js';
import { SingaporeGangSystem } from '../systems/SingaporeGangSystem.js';
import { SingaporeGovCommsSystem } from '../systems/SingaporeGovCommsSystem.js';
import { SingaporeJobsSystem } from '../systems/SingaporeJobsSystem.js';
import { EventBus } from '../systems/EventBus.js';
import TUNING from '../tuning.js';
import { SingaporeCrimesSystem } from '../systems/SingaporeCrimesSystem.js';
import { GangAISystem } from '../systems/GangAISystem.js';
import { SingaporeCultureSystem } from '../systems/SingaporeCultureSystem.js';
import { DrugEffectsSystem } from '../systems/DrugEffectsSystem.js';
import { RagdollSystem } from '../systems/RagdollSystem.js';
import { SingaporeAttractionsSystem } from '../systems/SingaporeAttractionsSystem.js';
import { ChangiAirportSystem } from '../systems/ChangiAirportSystem.js';
import { SingaporeAuthoritiesSystem } from '../systems/SingaporeAuthoritiesSystem.js';
import { SingaporeTrafficSystem } from '../systems/SingaporeTrafficSystem.js';
import { SingaporeNightlifeSystem } from '../systems/SingaporeNightlifeSystem.js';
import { SpatialHashGrid } from '../systems/SpatialHashGrid.js';
import { SingaporeRealismSystem } from '../systems/SingaporeRealismSystem.js';
import { SingaporeLawSystem } from '../systems/SingaporeLawSystem.js';
import { HawkerFoodSystem } from '../systems/HawkerFoodSystem.js';
import { SingaporeRidesSystem } from '../systems/SingaporeRidesSystem.js';
import { MissionSystem } from '../systems/MissionSystem.js';
import { InteractionSystem } from '../systems/InteractionSystem.js';
import { DrivingSettings } from '../systems/DrivingSettings.js';
import { ActionInput } from '../systems/ActionInput.js';
import { ArcadeVehicleController } from '../systems/ArcadeVehicleController.js';
import { DrivingHUD } from '../systems/DrivingHUD.js';

export class SingaporeGame {
    constructor() {
        console.log('[SingaporeGame] Starting initialization...');
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        console.log('[SingaporeGame] Scene created');
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 10); // Ensure camera has valid position
        console.log('[SingaporeGame] Camera created at', this.camera.position.toArray());
        
        try {
            this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
            console.log('[SingaporeGame] WebGL renderer created');
            console.log('[SingaporeGame] Renderer size:', window.innerWidth, window.innerHeight);
        } catch (error) {
            console.error('[SingaporeGame] WebGL renderer failed:', error);
            this.showWebGLFallback(error);
            return;
        }
        this.renderer.setAnimationLoop(null); // Use requestAnimationFrame instead
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
        console.log('[SingaporeGame] Renderer attached to DOM');
        
        // Add debug overlay for renderer
        const debugOverlay = document.createElement('div');
        debugOverlay.id = 'debug-info';
        debugOverlay.style.cssText = 'position: fixed; top: 10px; left: 10px; color: white; font-family: monospace; z-index: 10000; background: rgba(0,0,0,0.5); padding: 5px 10px;';
        debugOverlay.innerHTML = 'Scene: OK | Renderer: OK | FPS: N/A';
        document.body.appendChild(debugOverlay);
        
        // Initialize lazy systems container
        this._lazySystems = {
            disguiseSystem: null,
            combatStyles: null,
            smartNationHacking: null,
            npcLivingWorld: null
        };
        
        this.atmosphere = new SingaporeAtmosphere(this.scene);
        this.qualityManager = new QualityManager(this);
        this.realisticGraphics = new RealisticGraphics(this);
        this.progression = new ProgressionSystem(this);
        this.progression = new ProgressionSystem(this);
        console.log('[SingaporeGame] RealisticGraphics initialized');
        this.spatialHash = new SpatialHashGrid(10);
        this.eventBus = new EventBus();
        this.tuning = TUNING;
        this.audioDSP = new AudioDSP(this);
        this.audioDSP.init();
        
        // Model LOD management
        this.modelLODManager = new ModelLODManager(this.scene, this.qualityManager);
        
        // Initialize particle effects system (atmosphere, gameplay)
        this.particleEffects = new ParticleEffectsSystem(this.scene);
        
        // Make quality accessible globally for UI and debugging
        window.qualityManager = this.qualityManager;
        window.eventBus = this.eventBus;
        window.tuning = this.tuning;
        window.__game = this; // Debug API for automated testing (Playwright)
        window.__game.pump = (dt) => this.pump(dt);
        // Optional mature-content controls stay disabled by default and are not
        // exposed during normal play. This keeps the default release family-safe.
        this.desktopControls = new DesktopControls(this);
        this.aiGameMaster = new AIGameMaster(this);
        this.aiChatUI = new AIChatUI(this.aiGameMaster);
        this.aiTrafficSystem = new AITrafficSystem();
        this.aiMissionDirector = new AIMissionDirector(this.aiGameMaster);
        
        try {
            this.setupGame();
        } catch (e) {
            console.error('[SingaporeGame] Setup failed:', e);
            this.showErrorOverlay(e);
        }

        this.mobileOptimization = null;
    }

    // Set mobile optimization system (called from main.js after initialization)
    setMobileOptimization(mobileOptimization) {
        this.mobileOptimization = mobileOptimization;
    }

    // Lazy system loaders - load heavy systems on demand
    async loadDisguiseSystem() {
        if (!this._lazySystems.disguiseSystem) {
            const { DisguiseStealthSystem } = await import('../systems/DisguiseStealthSystem.js');
            this._lazySystems.disguiseSystem = new DisguiseStealthSystem(this);
        }
        return this._lazySystems.disguiseSystem;
    }

    async loadCombatStyles() {
        if (!this._lazySystems.combatStyles) {
            const { CombatStylesSystem } = await import('../systems/CombatStylesSystem.js');
            this._lazySystems.combatStyles = new CombatStylesSystem(this);
        }
        return this._lazySystems.combatStyles;
    }

    async loadSmartNationHacking() {
        if (!this._lazySystems.smartNationHacking) {
            const { SmartNationHackingSystem } = await import('../systems/SmartNationHackingSystem.js');
            this._lazySystems.smartNationHacking = new SmartNationHackingSystem(this);
        }
        return this._lazySystems.smartNationHacking;
    }

    async loadNPCLivingWorld() {
        if (!this._lazySystems.npcLivingWorld) {
            const { NPCLivingWorldSystem } = await import('../systems/NPCLivingWorldSystem.js');
            this._lazySystems.npcLivingWorld = new NPCLivingWorldSystem(this);
        }
        return this._lazySystems.npcLivingWorld;
    }

    // Synchronous accessors (returns null if not yet loaded)
    get disguiseSystem() { return this._lazySystems.disguiseSystem; }
    get combatStyles() { return this._lazySystems.combatStyles; }
    get smartNationHacking() { return this._lazySystems.smartNationHacking; }
    get npcLivingWorld() { return this._lazySystems.npcLivingWorld; }

    showWebGLFallback(error) {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
        const overlay = document.createElement('div');
        overlay.id = 'webgl-fallback';
        overlay.style.cssText = 'position:fixed;inset:0;background:linear-gradient(135deg,#101827,#1d3043);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10001;padding:24px;text-align:center;font-family:Arial,sans-serif;';
        overlay.innerHTML = `<h1 style="color:#00e5ff">Singapore Streets needs 3D graphics</h1><p style="max-width:520px;line-height:1.55">This device or browser could not start WebGL, the technology used to render the city. Try updating your browser, enabling hardware acceleration, closing other graphics-heavy apps, or using a newer device.</p><button style="margin-top:16px;padding:10px 18px;border:0;border-radius:6px;background:#00bcd4;color:#07131c;font-weight:bold;cursor:pointer">Try again</button>`;
        overlay.querySelector('button').onclick = () => location.reload();
        document.body.appendChild(overlay);
        console.warn('[SingaporeGame] WebGL unavailable:', error);
    }

    showErrorOverlay(error) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);color:#ff4444;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10000;font-family:monospace;padding:20px;text-align:center;';
        overlay.innerHTML = `<h2>Game Initialization Failed</h2><pre style="max-height:300px;overflow:auto;">${error.stack || error}</pre><button onclick="location.reload()" style="margin-top:20px;padding:10px 20px;font-size:16px;background:#ff4444;color:white;border:none;border-radius:4px;cursor:pointer;">Reload</button>`;
        document.body.appendChild(overlay);
    }

    setupGame() {
        // Setup lighting
        this.atmosphere.setupLighting();
        this.atmosphere.createHumidityHaze();
        
        // Create world
        this.world = new World(this.scene);
        
        // Populate spatial hash grid with buildings
        if (this.world && this.world.buildings) {
            for (const building of this.world.buildings) {
                this.spatialHash.insert(building, building.position.x, building.position.z);
            }
        }
        
        // Add Singapore details
        this.singaporeDetails = new SingaporeDetails(this.scene);
        this.roadSigns = new RoadSigns(this.scene);
        
        // Create neighborhoods
        this.createHDBNeighborhoods();
        
        // Create CBD skyline
        this.createCBD();
        
        // Add character controller (replaces simple player)
        this.player = new CharacterController(this.scene, this.camera);
        
        // Add GTA systems
        this.wantedSystem = new EnhancedWantedSystem(this);
        this.singaporeLaw = new SingaporeLawSystem(this);
        this.combatSystem = new CombatSystem(this);
        this.vehicleTheft = new VehicleTheft(this);
        this.saveSystem = new SaveSystem(this);
        this.jobsSystem = new SingaporeJobsSystem(this);
        this.gangSystem = new SingaporeGangSystem(this);
        this.govComms = new SingaporeGovCommsSystem(this);
        this.consequenceSystem = new ConsequenceSystem(this);
        this.randomEvents = new RandomEventsSystem(this);
        this.charCustom = new CharacterCustomization(this);
        this.goreSystem = new GoreSystem(this);
        this.sexualContent = new SexualContentSystem(this);
        this.singaporeRealism = new SingaporeRealismSystem(this);
        this.singaporeCrimes = new SingaporeCrimesSystem(this);
        this.gangAI = new GangAISystem(this);
        this.hawkerFood = new HawkerFoodSystem(this);
        this.singaporeCulture = new SingaporeCultureSystem(this);
        this.drugEffects = new DrugEffectsSystem(this);
        this.ragdoll = new RagdollSystem(this);
        this.attractions = new SingaporeAttractionsSystem(this);
        this.changiAirport = new ChangiAirportSystem(this);
        this.rides = new SingaporeRidesSystem(this);
        this.authorities = new SingaporeAuthoritiesSystem(this);
        this.singaporeTraffic = new SingaporeTrafficSystem(this);
        this.singaporeNightlife = new SingaporeNightlifeSystem(this);
        this.phoneSystem = new PhoneCallSystem(this);
        this.propertySystem = new PropertySystem(this);
        this.missionSystem = new MissionSystem(this);
        this.interactionSystem = new InteractionSystem(this);
        this.drivingSettings = new DrivingSettings(this);
        this.actionInput = new ActionInput(this);
        this.arcadeVehicleController = new ArcadeVehicleController(this);
        this.drivingHUD = new DrivingHUD(this);
        window.game = this; // Global access for debugging
        
        // Add vehicles
        this.createSingaporeVehicles();
        
        // Add vegetation
        this.atmosphere.createGreenery();
        
        // Initialize attractions, airport, rides
        this.attractions.initAttractions();
        this.changiAirport.initAirport();
        this.rides.initRides();
        
        // Create ERP gantries
        this.singaporeRealism.createERPGantry(new THREE.Vector3(0, 0, 50), 'cbd');
        this.singaporeRealism.createERPGantry(new THREE.Vector3(100, 0, 0), 'orchard');
        
        // Create red light district
        if (this.sexualContent.nsfwEnabled) {
            this.sexualContent.createRedLightDistrict(new THREE.Vector3(200, 0, -100));
        }
        
        // Mobile controls (primary input method)
        this.mobileGTAControls = new MobileGTAControls(this);
        this.controllerSupport = new ControllerSupport(this);
        this.spotify = new SpotifyIntegration(this);
        this.phoneNotifications = new PhoneNotificationMirror(this);
        this.foodSystem = new SingaporeFoodSystem(this);
        this.mrtSystem = new MRTTravelSystem(this);
        
        // Lazy loaded systems (initialized on first use)
        this._lazySystems = {
            disguiseSystem: null,
            combatStyles: null,
            smartNationHacking: null,
            npcLivingWorld: null
        };
        
        this.controllerSupport.createStatusIndicator();
        this.mobileGTAControls.createAIButtons();
        this.mobileGTAControls.createMobileHUD();
        
        // Setup controls
        this.setupControls();
        
        // Start AI loops
        this.startAILoops();
        
        // Load save if exists
        if (this.saveSystem.hasSave()) {
            this.saveSystem.load();
        }
        
        // Show GTA help
        this.showGTAHelp();
        
        // Create minimap
        this.createMinimap();
        
        this.animate();
    }

    createHDBNeighborhoods() {
        const positions = [
            [-80, -80], [80, -80], [-80, 80], [80, 80],
            [-40, -40], [40, -40], [-40, 40], [40, 40]
        ];
        
        positions.forEach(([x, z]) => {
            const hdb = HDBBuildingGenerator.createHDBBlock({
                height: 15 + Math.random() * 25,
                width: 12 + Math.random() * 6,
                depth: 12 + Math.random() * 6
            });
            hdb.position.set(x, 0, z);
            this.scene.add(hdb);
        });
    }

    createCBD() {
        const cbd = ProceduralCBD.createMarinaBaySkyline(new THREE.Vector3(0, 0, 200), 30);
        this.scene.add(cbd);
        
        const supertrees = ProceduralCBD.createSupertrees(new THREE.Vector3(200, 0, 150));
        this.scene.add(supertrees);
    }

    createSingaporeVehicles() {
        const vehicles = [
            { pos: [5, 0.5, 5], type: 'singaporeTaxi' },
            { pos: [-10, 0.5, -5], type: 'singaporePolice' },
            { pos: [15, 0.5, -15], type: 'cityBus' },
            { pos: [25, 0.5, 10], type: 'mpv' }
        ];
        
        vehicles.forEach(v => {
            const vehicle = SingaporeVehicleFactory.createVehicle(v.type);
            vehicle.position.set(...v.pos);
            vehicle.userData.type = 'Vehicle_' + v.type;
            vehicle.userData.health = 100;
            this.scene.add(vehicle);
            
            this.aiTrafficSystem.vehicles.push({
                ...vehicle.userData,
                mesh: vehicle,
                type: v.type,
                maxSpeed: vehicle.userData.spec.maxSpeed
            });
        });
    }

    setupControls() {
        this.boundResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            if (this.realisticGraphics && this.realisticGraphics.resize) {
                this.realisticGraphics.resize();
            }
        };
        window.addEventListener('resize', this.boundResize);
        
        this.boundKeyDown = (e) => {
            if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.metaKey && !e.target.matches('input, textarea')) {
                this.aiChatUI.toggle();
            }
            if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey && !e.target.matches('input, textarea')) {
                this.generateQuickMission();
            }
            if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey && !e.target.matches('input, textarea')) {
                this.toggleRadio();
            }
            if (e.code === 'Escape') {
                this.saveSystem.save();
            }
            if (e.code === 'KeyJ') {
                this.toggleJobsPanel();
            }
            if (e.code === 'KeyG') {
                this.toggleActivitiesPanel();
            }
            if (e.code === 'KeyB') {
                this.toggleGangPanel();
            }
            if (e.code === 'KeyL') {
                if (this.govComms) this.govComms.toggleDispatchLog();
            }
            if (e.code === 'KeyP') {
                if (this.govComms) this.govComms.toggleResponsePanel();
            }
            if (e.code === 'KeyU') {
                if (this.charCustom) this.charCustom.openCustomization();
            }
            if (e.code === 'KeyH') {
                if (this.propertySystem) this.propertySystem.toggleUI();
            }
            if (e.code === 'KeyY') {
                if (this.consequenceSystem) this.consequenceSystem.toggleUI();
            }
            if (e.code === 'KeyV') {
                this.toggleVoice();
            }
            if (e.code === 'KeyS') {
                if (this.spotify) this.spotify.toggleUI();
            }
            if (e.code === 'KeyN') {
                if (this.phoneNotifications) this.phoneNotifications.toggle();
            }
            if (e.code === 'KeyO') {
                if (this.foodSystem) this.foodSystem.toggleUI();
            }
            if (e.code === 'KeyT') {
                if (this.mrtSystem) this.mrtSystem.toggleUI();
            }
            if (e.code === 'KeyK' && !e.ctrlKey && !e.metaKey && !e.target.matches('input, textarea')) {
                this.missionSystem?.start(this.missionSystem.missions[0].id);
            }
        };
        window.addEventListener('keydown', this.boundKeyDown);
    }

    showGTAHelp() {
        const help = document.createElement('div');
        help.id = 'gta-help';
        help.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.85);
            color: #00ffff;
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
            border: 1px solid #00ffff;
            line-height: 1.8;
            max-width: 280px;
        `;
        help.innerHTML = `
            <strong>🎮 SINGAPORE STREETS - GTA MODE</strong><br>
            <hr style="border-color: #00ffff; margin: 8px 0;">
            <strong>MOVEMENT</strong><br>
            WASD - Walk/Drive<br>
            Mouse - Look around<br>
            Space - Jump<br>
            Shift - Run/Sprint<br>
            E - Enter/Steal Vehicle<br>
            F - Exit Vehicle | O - Food<br>
            <br>
            <strong>COMBAT</strong><br>
            Left Click - Attack/Shoot<br>
            Right Click - Aim<br>
            Q/E - Switch Weapon<br>
            R - Reload<br>
            <br>
            <strong>GAME</strong><br>
            C - 🤖 AI Game Master<br>
            M - 🎯 Quick Mission | K - City Mission<br>
            R - 📻 Radio DJ<br>
            Esc - 💾 Save Game<br>
            <br>
            <span style="color: #ff00ff;">Mobile: Touch + on-screen buttons</span><br>
            <br>
            <strong style="color: #ff0000;">⚖️ SINGAPORE LAW APPLIES</strong><br>
            <span style="font-size: 10px;">Left-hand driving, ERP gantries, strict penalties<br>
            Drugs: Death penalty | Vandalism: Caning | Littering: SGD 300 fine</span>
        `;
        document.body.appendChild(help);
        
        setTimeout(() => {
            help.style.opacity = '0';
            help.style.transition = 'opacity 1s';
            setTimeout(() => help.remove(), 1000);
        }, 15000);
    }

    async generateQuickMission() {
        const mission = await this.aiGameMaster.generateMission({
            playerLevel: 1,
            location: this.player.position ? 'Marina Bay' : 'Marina Bay',
            vehicle: this.player.currentVehicle?.type,
            time: new Date().getHours(),
            weather: this.player.currentWeather || 'clear'
        });
        
        this.showNotification(`🎯 NEW MISSION: ${mission.title}`, mission.description);
        
        mission.id = Date.now().toString();
        this.aiMissionDirector.activeMissions.push(mission);
    }

    async toggleRadio() {
        const commentary = await this.aiGameMaster.generateRadioCommentary({
            location: 'Marina Bay',
            time: new Date().getHours(),
            weather: this.player.currentWeather
        });
        this.showNotification('📻 RADIO', commentary);
    }

    showNotification(title, message) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid #00ffff;
            border-radius: 12px;
            padding: 20px 30px;
            color: #00ffff;
            font-family: monospace;
            z-index: 10000;
            max-width: 500px;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
            animation: slideDown 0.5s ease;
        `;
        notif.innerHTML = `<strong>${title}</strong><br><br>${message}`;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideUp 0.5s ease forwards';
            setTimeout(() => notif.remove(), 500);
        }, 8000);
    }

    startAILoops() {
        // AI world events every minute
        setInterval(async () => {
            if (Math.random() < 0.05) {
                const event = await this.aiGameMaster.generateWorldEvent({
                    playerLocation: 'Marina Bay',
                    time: new Date().getHours(),
                    activeMissions: this.aiMissionDirector.activeMissions.length
                });
                this.showNotification(`🌍 WORLD EVENT: ${event.type.replace('_', ' ').toUpperCase()}`, event.description);
            }
        }, 60000);
        
        setInterval(async () => {
            if (Math.random() < 0.1) {
                const commentary = await this.aiGameMaster.generateRadioCommentary({
                    location: 'Marina Bay',
                    time: new Date().getHours()
                });
                const radioEl = document.getElementById('radio-display');
                if (radioEl) radioEl.textContent = commentary.substring(0, 100) + '...';
            }
        }, 120000);
    }

    toggleJobsPanel() {
        if (!this.jobsPanel) {
            this.createJobsPanel();
        }
        this.jobsPanel.style.display = this.jobsPanel.style.display === 'none' ? 'block' : 'none';
    }

    createJobsPanel() {
        this.jobsPanel = document.createElement('div');
        this.jobsPanel.id = 'jobs-panel';
        this.jobsPanel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            max-height: 500px;
            overflow-y: auto;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #00ff00;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
        `;
        
        let html = '<h2 style="color: #00ff00; margin-bottom: 15px;">💼 SINGAPORE JOBS</h2>';
        html += '<div style="margin-bottom: 10px; color: #ffff00;">Press J to close</div>';
        
        const jobs = {
            'hawker_assistant': 'Hawker Assistant',
            'food_delivery': 'Food Delivery Rider',
            'taxi_driver': 'Taxi Driver',
            'bus_driver': 'Bus Driver',
            'grab_driver': 'Grab Driver',
            'retail_assistant': 'Retail Assistant',
            'convenience_store': 'Convenience Store',
            'office_admin': 'Office Admin',
            'it_support': 'IT Support',
            'construction_worker': 'Construction',
            'cleaner': 'Cleaner',
            'nurse': 'Nurse',
            'tuition_teacher': 'Tuition Teacher',
            'dj': 'Club DJ',
            'postman': 'Postman'
        };
        
        for (const [key, name] of Object.entries(jobs)) {
            html += `<button onclick="window.game.jobsSystem.startJob('${key}')" style="
                display: block; width: 100%; padding: 8px; margin-bottom: 5px;
                background: rgba(0, 255, 0, 0.1); border: 1px solid #00ff00;
                color: #00ff00; border-radius: 4px; cursor: pointer; text-align: left;
            ">${name}</button>`;
        }
        
        this.jobsPanel.innerHTML = html;
        document.body.appendChild(this.jobsPanel);
    }

    toggleActivitiesPanel() {
        if (!this.activitiesPanel) {
            this.createActivitiesPanel();
        }
        this.activitiesPanel.style.display = this.activitiesPanel.style.display === 'none' ? 'block' : 'none';
    }

    createActivitiesPanel() {
        this.activitiesPanel = document.createElement('div');
        this.activitiesPanel.id = 'activities-panel';
        this.activitiesPanel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            max-height: 500px;
            overflow-y: auto;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #ff00ff;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
        `;
        
        let html = '<h2 style="color: #ff00ff; margin-bottom: 15px;">🎯 SINGAPORE ACTIVITIES</h2>';
        html += '<div style="margin-bottom: 10px; color: #ffff00;">Press G to close</div>';
        
        const activities = {
            'hawker_eating': 'Eat at Hawker Centre',
            'shopping': 'Shopping',
            'gym': 'Gym Session',
            'park_visit': 'Visit Park',
            'movie': 'Watch Movie',
            'karaoke': 'Karaoke',
            'bubble_tea': 'Bubble Tea',
            'beer': 'Drink Beer',
            'mrt_ride': 'Take MRT',
            'bus_ride': 'Take Bus',
            'taxi_ride': 'Take Taxi'
        };
        
        for (const [key, name] of Object.entries(activities)) {
            html += `<button onclick="window.game.jobsSystem.startActivity('${key}')" style="
                display: block; width: 100%; padding: 8px; margin-bottom: 5px;
                background: rgba(255, 0, 255, 0.1); border: 1px solid #ff00ff;
                color: #ff00ff; border-radius: 4px; cursor: pointer; text-align: left;
            ">${name}</button>`;
        }
        
        this.activitiesPanel.innerHTML = html;
        document.body.appendChild(this.activitiesPanel);
    }

    toggleVoice() {
        window.voiceEnabled = !window.voiceEnabled;
        if (this.showNotification) {
            this.showNotification('🔊 VOICE', window.voiceEnabled ? 'Voice enabled' : 'Voice disabled');
        }
    }

    toggleGangPanel() {
        if (!this.gangPanel) {
            this.createGangPanel();
        }
        this.gangPanel.style.display = this.gangPanel.style.display === 'none' ? 'block' : 'none';
    }

    createGangPanel() {
        this.gangPanel = document.createElement('div');
        this.gangPanel.id = 'gang-panel';
        this.gangPanel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 450px;
            max-height: 600px;
            overflow-y: auto;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #ff00ff;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            font-family: monospace;
            font-size: 11px;
            z-index: 10000;
        `;
        
        const gangs = {
            'salakau': 'Salakau (369) - Geylang',
            'sio_kun_tong': 'Sio Kun Tong (SKT) - Toa Payoh',
            'sio_lian_tong': 'Sio Lian Tong (SLT) - Jurong',
            'ang_soon_tong': 'Ang Soon Tong (AST) - Chinatown',
            'gang_36': 'Gang 36 - Woodlands',
            'gang_24': 'Gang 24 - Tampines',
            'omega': 'Omega - Orchard',
            'sakai': 'Sakai - Geylang (Malay)',
            'indian_gang': 'Indian Gang - Little India'
        };
        
        let html = '<h2 style="color: #ff00ff; margin-bottom: 15px;">🚫 SINGAPORE GANGS</h2>';
        html += '<div style="margin-bottom: 10px; color: #ffff00;">Press B to close</div>';
        
        for (const [key, name] of Object.entries(gangs)) {
            html += `<button onclick="window.game.gangSystem.showGangUI('${key}')" style="
                display: block; width: 100%; padding: 8px; margin-bottom: 5px;
                background: rgba(255, 0, 255, 0.1); border: 1px solid #ff00ff;
                color: #ff00ff; border-radius: 4px; cursor: pointer; text-align: left;
            ">${name}</button>`;
        }
        
        this.gangPanel.innerHTML = html;
        document.body.appendChild(this.gangPanel);
    }

    createMinimap() {
        this.minimap = document.createElement('canvas');
        this.minimap.id = 'minimap';
        this.minimap.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #00ffff;
            border-radius: 8px;
            z-index: 1000;
            overflow: hidden;
        `;
        
        this.minimapCanvas = document.createElement('canvas');
        this.minimapCanvas.width = 200;
        this.minimapCanvas.height = 200;
        this.minimap.appendChild(this.minimapCanvas);
        document.body.appendChild(this.minimap);
        
        this.minimapCtx = this.minimapCanvas.getContext('2d');
    }

    updateMinimap() {
        const ctx = this.minimapCtx;
        const scale = 0.2;
        
        // Clear
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, 200, 200);
        
        // Draw districts
        for (const district of SingaporeMapData.districts) {
            const x = 100 + district.x * scale;
            const y = 100 + district.z * scale;
            const radius = district.radius * scale;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = district.color + '40';
            ctx.fill();
            ctx.strokeStyle = district.color;
            ctx.stroke();
        }
        
        // Draw roads
        ctx.strokeStyle = '#808080';
        ctx.lineWidth = 1;
        for (const road of [...SingaporeMapData.expressways, ...SingaporeMapData.majorRoads]) {
            ctx.beginPath();
            for (let i = 0; i < road.path.length; i++) {
                const [x, z] = road.path[i];
                const px = 100 + x * scale;
                const py = 100 + z * scale;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }
        
        // Draw player
        const px = 100 + this.player.position.x * scale;
        const py = 100 + this.player.position.z * scale;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff00';
        ctx.fill();
        
        // Draw direction
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + Math.sin(this.player.rotation.y) * 10, py + Math.cos(this.player.rotation.y) * 10);
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw MRT stations
        ctx.fillStyle = '#ff0000';
        for (const station of SingaporeMapData.mrtStations) {
            const sx = 100 + station.x * scale;
            const sy = 100 + station.z * scale;
            ctx.fillRect(sx - 2, sy - 2, 4, 4);
        }
    }

    animate() {
        if (this.destroyed) return;
        this.animationFrameId = requestAnimationFrame(() => this.animate());

        // FPS cap based on quality preset
        const fpsCap = this.qualityManager?.get()?.fpsCap || 60;
        const frameInterval = 1000 / fpsCap;

        const now = performance.now();
        if (!this.lastFrameTime) this.lastFrameTime = now;
        const elapsed = now - this.lastFrameTime;

        // Skip frame if under cap
        if (elapsed < frameInterval) return;
        this.lastFrameTime = now - (elapsed % frameInterval);

        // 60Hz fixed timestep
        const delta = Math.min(elapsed / 1000, 0.1);

        this.animateStep(delta);
    }

    // Apply battery scaling from mobile optimization
    applyBatteryScaling(budget, mode) {
        if (this.mobileOptimization && this.mobileOptimization.applyBatteryScaling) {
            this.mobileOptimization.applyBatteryScaling(budget, mode);
        }
    }

    // For backward compatibility with existing code
    onPerformanceThrottle(factor) {
        if (this.mobileOptimization && this.mobileOptimization.onPerformanceThrottle) {
            this.mobileOptimization.onPerformanceThrottle(factor);
        }
    }
    
    // Deterministic step for automated testing/recording
    pump(dt) {
        this.animateStep(dt || 1/60);
    }
    
    animateStep(delta) {
        const cappedDelta = Math.min(delta, 0.1); // Cap delta
        
        // Update mobile optimization system
        if (this.mobileOptimization) {
            this.mobileOptimization.update(cappedDelta);
        }
        
        // Update player and its arcade vehicle, if occupied.
        if (this.player && this.player.mesh) {
            this.player.update(cappedDelta);
        }
        if (this.arcadeVehicleController) {
            this.arcadeVehicleController.update(cappedDelta);
        }
        if (this.drivingHUD) {
            this.drivingHUD.update();
        }

        // Update desktop controls
        if (this.desktopControls) {
            this.desktopControls.update(cappedDelta);
        }
        
        // Update mobile controls
        if (this.mobileGTAControls) {
            this.mobileGTAControls.update(cappedDelta);
            this.mobileGTAControls.updateHUD();
        }
        
        if (this.controllerSupport) {
            this.controllerSupport.update(cappedDelta);
        }
        
        // Update GTA systems
        if (this.interactionSystem) {
            this.interactionSystem.update();
        }
        if (this.missionSystem) {
            this.missionSystem.update(cappedDelta);
        }
        if (this.wantedSystem) {
            this.wantedSystem.update(cappedDelta);
        }
        
        if (this.combatSystem) {
            this.combatSystem.update(cappedDelta);
        }
        
        if (this.vehicleTheft) {
            this.vehicleTheft.update(cappedDelta);
        }
        
        if (this.jobsSystem) {
            this.jobsSystem.update(cappedDelta);
        }
        
        if (this.gangSystem) {
            this.gangSystem.update(cappedDelta);
        }
        
        if (this.govComms) {
            this.govComms.update(cappedDelta);
        }
        
        if (this.randomEvents) {
            this.randomEvents.update(cappedDelta);
        }
        
        if (this.goreSystem) {
            this.goreSystem.update(cappedDelta);
        }
        
        if (this.singaporeCrimes) {
            this.singaporeCrimes.update(cappedDelta);
        }
        
        if (this.gangAI) {
            this.gangAI.update(cappedDelta);
        }
        
        if (this.singaporeCulture) {
            this.singaporeCulture.update(cappedDelta);
        }
        
        if (this.drugEffects) {
            this.drugEffects.update(cappedDelta);
        }
        
        if (this.ragdoll) {
            this.ragdoll.update(cappedDelta);
        }
        
        if (this.attractions) {
            this.attractions.update(cappedDelta);
        }
        
        if (this.changiAirport) {
            this.changiAirport.update(cappedDelta);
        }
        
        if (this.rides) {
            this.rides.update(cappedDelta);
        }
        
        if (this.authorities) {
            this.authorities.update(cappedDelta);
        }
        
        if (this.singaporeTraffic) {
            this.singaporeTraffic.update(cappedDelta);
        }
        
        if (this.singaporeNightlife) {
            this.singaporeNightlife.update(cappedDelta);
        }
        
        if (this.singaporeRealism) {
            this.singaporeRealism.update(cappedDelta);
        }
        
        if (this.sexualContent) {
            this.sexualContent.update(cappedDelta);
        }
        
        if (this.phoneSystem) {
            this.phoneSystem.update(delta);
        }
        
        // Update particle effects (atmosphere, weather, gameplay particles)
        if (this.particleEffects) {
            this.particleEffects.updateFPS(this.fps);
            if (this.atmosphere?.rain !== undefined) {
                const rainIntensity = this.atmosphere.rain ? this.atmosphere.intensity : 0;
                if (rainIntensity > 0) {
                    this.particleEffects.triggerRain(rainIntensity, 5);
                } else if (!this.particleEffects.rainSystem.visible) {
                    this.particleEffects.triggerRain(0, 0); // Hide rain
                }
            }
        }
        
        // Update adaptive particle budgets based on quality
        if (this.qualityManager) {
            this.qualityManager.update(cappedDelta);
        }
        
        // Update AI traffic
        if (this.aiTrafficSystem && this.player) {
            this.aiTrafficSystem.update(cappedDelta, {
                player: this.player,
                time: new Date().getHours(),
                weather: this.player.currentWeather
            });
        }
        
        // Update AI mission director
        if (this.aiMissionDirector && this.player) {
            this.aiMissionDirector.checkAndGenerateMissions(this.player);
        }
        
        this.updateMinimap();
        
        // Add debug overlay to show FPS
        if (this.fps !== this.lastFps) {
            const fpsEl = document.getElementById('fps-indicator');
            if (fpsEl) {
                fpsEl.textContent = `FPS: ${this.fps || 'N/A'}`;
            }
        }
        
        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        this.destroyed = true;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

        // Remove event listeners
        if (this.boundResize) {
            window.removeEventListener('resize', this.boundResize);
        }
        if (this.boundKeyDown) {
            window.removeEventListener('keydown', this.boundKeyDown);
        }
        
        // Destroy all systems that have destroy method
        const systems = [
            'player', 'world', 'atmosphere', 'qualityManager', 'realisticGraphics',
            'desktopControls', 'aiGameMaster', 'aiChatUI', 'aiTrafficSystem', 'aiMissionDirector',
            'mobileGTAControls', 'controllerSupport', 'spotify', 'phoneNotifications',
            'foodSystem', 'mrtSystem', 'disguiseSystem', 'combatStylesSystem',
            'randomEvents', 'charCustom', 'goreSystem', 'phoneSystem', 'propertySystem',
            'npcLivingWorld', 'trafficSystem', 'policeSystem', 'jobsSystem', 'gangSystem',
            'dialogueSystem', 'relationshipSystem', 'factionSystem', 'economySystem',
            'weatherSystem', 'timeSystem', 'hackingSystem', 'vehicleSystem',
            'wantedSystem', 'combatSystem', 'vehicleTheft', 'govComms', 'spotify',
            'aiTrafficSystem', 'aiMissionDirector', 'aiGameMaster', 'aiChatUI',
            'sexualContent', 'singaporeRealism', 'singaporeCrimes', 'gangAI', 'hawkerFood',
            'singaporeCulture', 'drugEffects', 'ragdoll', 'singaporeTraffic', 'singaporeNightlife',
            'attractions', 'changiAirport', 'rides', 'authorities', 'missionSystem', 'interactionSystem', 'drivingSettings',
            'actionInput', 'arcadeVehicleController', 'drivingHUD'
        ];
        
        for (const sysName of systems) {
            if (this[sysName] && typeof this[sysName].destroy === 'function') {
                try { this[sysName].destroy(); } catch(e) { console.warn('Destroy error:', sysName, e); }
            }
        }
        
        // Clean up renderer
        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }
        
        // Remove global references
        delete window.game;
        delete window.qualityManager;
    }
}

const style = document.createElement('style');
style.textContent = `
@keyframes slideDown {
    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes slideUp {
    from { opacity: 1; transform: translateX(-50%) translateY(0); }
    to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}
`;
document.head.appendChild(style);
