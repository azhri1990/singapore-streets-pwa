import * as THREE from 'three';
import { WeatherSystem } from '../systems/WeatherSystem.js';

export class World {
    constructor(scene) {
        this.scene = scene;
        this.weather = new WeatherSystem();
        this.createGround();
        this.createRoads();
        this.createBuildings();
        this.createLandmarks();
        this.createVegetation();
    }

    // Ground height lookup used by vehicle physics for road slopes
    getGroundHeight(x, z) {
        // Our scene uses a flat ground plane at y = 0
        return 0;
    }

    createGround() {
        const groundGeo = new THREE.PlaneGeometry(500, 500);
        const groundMat = new THREE.MeshStandardMaterial({ 
            color: 0x3a5f0b, 
            roughness: 0.9, 
            metalness: 0.0 
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }

    createRoads() {
        // Main roads - Singapore style grid with wider roads
        const roadMat = new THREE.MeshStandardMaterial({ 
            color: 0x2a2a2a, 
            roughness: 0.95, 
            metalness: 0.0 
        });
        const lineMat = new THREE.MeshStandardMaterial({ 
            color: 0xFFFF00, 
            roughness: 0.9, 
            metalness: 0.0 
        });

        // Expressway running north-south
        const expresswayGeo = new THREE.PlaneGeometry(300, 20);
        const expressway = new THREE.Mesh(expresswayGeo, roadMat);
        expressway.rotation.x = -Math.PI / 2;
        expressway.position.set(0, 0.01, 0);
        expressway.receiveShadow = true;
        this.scene.add(expressway);

        // Road marking lines
        const lineGeo = new THREE.PlaneGeometry(300, 0.5);
        const centerLine = new THREE.Mesh(lineGeo, lineMat);
        centerLine.rotation.x = -Math.PI / 2;
        centerLine.position.set(0, 0.02, 0);
        this.scene.add(centerLine);

        // Expressway running east-west
        const crossExpresswayGeo = new THREE.PlaneGeometry(20, 300);
        const crossExpressway = new THREE.Mesh(crossExpresswayGeo, roadMat);
        crossExpressway.rotation.x = -Math.PI / 2;
        crossExpressway.position.set(0, 0.01, 0);
        crossExpressway.receiveShadow = true;
        this.scene.add(crossExpressway);

        // Cross road marking lines
        const crossLineGeo = new THREE.PlaneGeometry(0.5, 300);
        const crossCenterLine = new THREE.Mesh(crossLineGeo, lineMat);
        crossCenterLine.rotation.x = -Math.PI / 2;
        crossCenterLine.position.set(0, 0.02, 0);
        this.scene.add(crossCenterLine);
    }

    createBuildings() {
        // HDB blocks
        for (let i = 0; i < 50; i++) {
            const width = 20 + Math.random() * 10;
            const depth = 20 + Math.random() * 10;
            const height = 30 + Math.random() * 50;
            
            const buildingGeo = new THREE.BoxGeometry(width, height, depth);
            const buildingMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
            const building = new THREE.Mesh(buildingGeo, buildingMat);
            
            const x = -200 + Math.random() * 400;
            const z = -200 + Math.random() * 400;
            building.position.set(x, height / 2, z);
            building.castShadow = true;
            building.receiveShadow = true;
            this.scene.add(building);
        }

        // CBD skyscrapers
        for (let i = 0; i < 15; i++) {
            const width = 15 + Math.random() * 10;
            const depth = 15 + Math.random() * 10;
            const height = 80 + Math.random() * 120;
            
            const buildingGeo = new THREE.BoxGeometry(width, height, depth);
            const buildingMat = new THREE.MeshStandardMaterial({ color: 0x8888ff });
            const building = new THREE.Mesh(buildingGeo, buildingMat);
            
            const x = -100 + Math.random() * 200;
            const z = 100 + Math.random() * 200;
            building.position.set(x, height / 2, z);
            building.castShadow = true;
            building.receiveShadow = true;
            this.scene.add(building);
        }
    }

    createLandmarks() {
        // Marina Bay Sands style skyscraper
        const mbsGeo = new THREE.BoxGeometry(25, 150, 25);
        const mbsMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const mbs = new THREE.Mesh(mbsGeo, mbsMat);
        mbs.position.set(0, 75, 150);
        mbs.castShadow = true;
        mbs.receiveShadow = true;
        this.scene.add(mbs);

        // Supertree Grove
        for (let i = 0; i < 12; i++) {
            const trunkGeo = new THREE.CylinderGeometry(1, 1.5, 30, 8);
            const trunkMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
            const trunk = new THREE.Mesh(trunkGeo, trunkMat);
            
            const x = -300 + Math.random() * 100;
            const z = -100 + Math.random() * 100;
            trunk.position.set(x, 15, z);
            this.scene.add(trunk);
        }
    }

    createVegetation() {
        // Simple trees along roads
        for (let i = 0; i < 100; i++) {
            const treeGeo = new THREE.ConeGeometry(2, 8, 8);
            const treeMat = new THREE.MeshStandardMaterial({ color: 0x2d8a2d });
            const tree = new THREE.Mesh(treeGeo, treeMat);
            
            const x = -200 + Math.random() * 400;
            const z = -200 + Math.random() * 400;
            tree.position.set(x, 4, z);
            this.scene.add(tree);
        }
    }

    update(delta) {
        if (this.weather && this.weather.update) {
            this.weather.update(new Date().getHours());
        }
    }
}