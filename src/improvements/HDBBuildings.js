import * as THREE from 'three';

// HDB Building Generator based on real Singapore HDB data
export class HDBBuildingGenerator {
    static createHDBBlock(config = {}) {
        const group = new THREE.Group();

        // HDB block specifications
        const blockHeight = config.height || (15 + Math.random() * 25); // 15-40 stories
        const floors = Math.floor(blockHeight / 3);
        const width = config.width || (12 + Math.random() * 6);
        const depth = config.depth || (12 + Math.random() * 6);

        // HDB colors - typical Singapore HDB colors (concrete tones, brick colors)
        const hdbColors = [
            0xC9C2B6, 0x8B7F74, 0x9C8B7A, 0x7D756E, 0xB8B0A5,
            0xA08C78, 0x8C7F74, 0x9E9184, 0x7F796F, 0x8B7470
        ];

        const mainColor = hdbColors[Math.floor(Math.random() * hdbColors.length)];

        // Main building structure - with setback for realistic HDB architecture
        const buildingGeo = new THREE.BoxGeometry(width, blockHeight, depth);
        const buildingMat = new THREE.MeshStandardMaterial({
            color: mainColor,
            roughness: 0.9,
            metalness: 0.0,
            envMapIntensity: 0.8
        });
        const building = new THREE.Mesh(buildingGeo, buildingMat);
        building.position.y = blockHeight / 2;
        building.castShadow = true;
        building.receiveShadow = true;
        group.add(building);

        // Add setbacks - typical HDB step-back at upper floors
        const setbackSteps = config.setbacks || Math.floor(Math.random() * 2) + 1;
        const setbackAmounts = [];
        let remainingHeight = blockHeight;

        for (let i = 0; i < setbackSteps; i++) {
            const setback = (config.setbackAmount || 2 + Math.random() * 4);
            if (remainingHeight <= setback) break;
            remainingHeight -= setback;
            setbackAmounts.push({ amount: setback, cumulative: blockHeight - remainingHeight });
        }

        // Void deck (ground floor) - concrete platform
        if (blockHeight > 10) {
            const voidDeckGeo = new THREE.BoxGeometry(width + 2, 0.2, depth + 2);
            const voidDeckMat = new THREE.MeshStandardMaterial({ color: 0xB8B0A5, roughness: 0.95, metalness: 0 });
            const voidDeck = new THREE.Mesh(voidDeckGeo, voidDeckMat);
            voidDeck.position.y = 0.1;
            voidDeck.receiveShadow = true;
            group.add(voidDeck);

            // Void deck pillars
            const pillarMat = new THREE.MeshStandardMaterial({ color: 0x9C9184, roughness: 0.95, metalness: 0 });
            const pillarGeo = new THREE.CylinderGeometry(0.25, 0.25, 3);
            const pillarPositions = [
                [-width / 2 + 2, 1.5, -depth / 2 + 2],
                [width / 2 - 2, 1.5, -depth / 2 + 2],
                [-width / 2 + 2, 1.5, depth / 2 - 2],
                [width / 2 - 2, 1.5, depth / 2 - 2]
            ];
            pillarPositions.forEach(pos => {
                const pillar = new THREE.Mesh(pillarGeo, pillarMat);
                pillar.position.set(pos[0], pos[1], pos[2]);
                group.add(pillar);
            });
        }

        // Windows - realistic grid with frames
        const windowMat = new THREE.MeshStandardMaterial({
            color: 0xBFD6E8,
            roughness: 0.4,
            metalness: 0.1,
            envMapIntensity: 0.6
        });

        const windowSize = 1.0;
        const windowSpacing = 1.8;
        const windowHeight = 1.8;
        const windowsPerFloor = Math.floor(width / windowSpacing);
        const windowRows = floors;

        const addWindowsOnFace = (face) => {
            const rotationY = face === 'front' ? -Math.PI / 2 : face === 'back' ? Math.PI / 2 : 0;
            const normal = face === 'front' ? 1 : face === 'back' ? -1 : 0;
            const normalZ = face === 'left' ? -1 : face === 'right' ? 1 : 0;

            const faceWidth = face === 'front' || face === 'back' ? width : depth;
            const faceDepth = face === 'front' || face === 'back' ? depth : width;

            for (let floor = 0; floor < windowRows; floor++) {
                for (let win = 0; win < windowsPerFloor; win++) {
                    const x = (win - windowsPerFloor / 2) * windowSpacing + windowSpacing / 2;
                    const y = 2 + floor * 3 + windowHeight / 2;
                    const z = face === 'front' ? depth / 2 + 0.01 : face === 'back' ? -depth / 2 - 0.01 : faceDepth / 2 + 0.01;

                    if (Math.random() > 0.88) continue;

                    const winGeo = new THREE.PlaneGeometry(windowSize, windowHeight);
                    const winMesh = new THREE.Mesh(winGeo, windowMat);
                    winMesh.position.set(x, y, z);
                    winMesh.rotation.y = rotationY;
                    winMesh.castShadow = false;
                    group.add(winMesh);
                }
            }
        };

        // Add windows to all faces
        addWindowsOnFace('front');
        addWindowsOnFace('back');
        addWindowsOnFace('left');
        addWindowsOnFace('right');

        // Balconies - typical of Singapore HDB - with AC units
        if (blockHeight > 18) {
            const balconyMat = new THREE.MeshStandardMaterial({ color: 0xA89C8F, roughness: 0.95, metalness: 0 });
            const acMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.6, metalness: 0.2 });

            // Front balcony with AC units
            const balconyGeo = new THREE.BoxGeometry(width * 0.9, 0.4, depth * 0.9);
            const balcony = new THREE.Mesh(balconyGeo, balconyMat);
            balcony.position.set(0, blockHeight - 2, depth / 2 - depth * 0.05);
            balcony.rotation.y = -Math.PI / 2;
            balcony.receiveShadow = true;
            group.add(balcony);

            // AC units
            for (let i = 0; i < 6; i++) {
                const ac = new THREE.BoxGeometry(0.8, 0.9, 0.8);
                const acMesh = new THREE.Mesh(ac, acMat);
                acMesh.position.set((i - 3) * 1.5, blockHeight - 1.5, depth / 2 - depth * 0.05);
                acMesh.rotation.y = -Math.PI / 2;
                group.add(acMesh);
            }

            // Laundry poles
            const poleMat = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.8, metalness: 0 });
            for (let i = 0; i < 2; i++) {
                const poleGeo = new THREE.CylinderGeometry(0.03, 0.03, 2);
                const pole = new THREE.Mesh(poleGeo, poleMat);
                pole.position.set(width / 2 - 1, blockHeight * 0.7 + i * 6, depth / 2 + 0.51);
                group.add(pole);
            }
        }

        group.userData.type = 'hdb';
        group.userData.floors = floors;
        group.userData.height = blockHeight;

        return group;
    }

    static createShopHouse() {
        const group = new THREE.Group();

        const width = 5 + Math.random() * 3;
        const height = 8;
        const depth = 4;

        const shopColor = 0xD8CFC4;
        const shopMat = new THREE.MeshStandardMaterial({ color: shopColor, roughness: 0.8, metalness: 0 });

        const mainGeo = new THREE.BoxGeometry(width, height, depth);
        const main = new THREE.Mesh(mainGeo, shopMat);
        main.position.y = height / 2;
        main.castShadow = true;
        group.add(main);

        const windowGeo = new THREE.PlaneGeometry(width * 0.8, 2);
        const windowMat = new THREE.MeshStandardMaterial({ color: 0xBFD6E8, roughness: 0.3, metalness: 0.2, envMapIntensity: 0.5 });
        const window = new THREE.Mesh(windowGeo, windowMat);
        window.position.set(0, 2, depth / 2 + 0.01);
        window.rotation.y = -Math.PI / 2;
        group.add(window);

        const signGeo = new THREE.BoxGeometry(width * 0.9, 0.5, 0.1);
        const signMat = new THREE.MeshStandardMaterial({ color: 0xCC2222, roughness: 0.5, metalness: 0 });
        const sign = new THREE.Mesh(signGeo, signMat);
        sign.position.set(0, height - 0.5, depth / 2 + 0.06);
        group.add(sign);

        group.userData.type = 'shophouse';

        return group;
    }
}

export default HDBBuildingGenerator;
