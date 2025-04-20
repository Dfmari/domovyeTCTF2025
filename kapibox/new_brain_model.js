import { f13s2 } from './brain_fog.js';

document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const container = document.getElementById('brain-canvas');
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff6666, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;  

    camera.position.z = 5;

    function createBrain() {
        const brainGroup = new THREE.Group();
        
        const brainMaterial = new THREE.MeshPhongMaterial({
            color: 0xf0d0c0,
            specular: 0x444444,
            shininess: 15,
            transparent: false,
            opacity: 1.0,
            side: THREE.DoubleSide
        });
        
        const cerebrumGeometry = new THREE.SphereBufferGeometry(1.2, 32, 32);
        const cerebrumPositions = cerebrumGeometry.getAttribute('position');
        
        for (let i = 0; i < cerebrumPositions.count; i++) {
            const x = cerebrumPositions.getX(i);
            const y = cerebrumPositions.getY(i);
            const z = cerebrumPositions.getZ(i);
            
            const noise = 0.1 * Math.sin(5 * x) * Math.sin(5 * y) * Math.sin(5 * z);
            
            let modifiedY = y;
            if (y < 0) {
                modifiedY *= 0.8;
            }
            
            cerebrumPositions.setX(i, x + noise * x);
            cerebrumPositions.setY(i, modifiedY + noise * y);
            cerebrumPositions.setZ(i, z + noise * z);
        }
        
        cerebrumGeometry.computeVertexNormals();
        const cerebrum = new THREE.Mesh(cerebrumGeometry, brainMaterial);
        cerebrum.scale.set(1, 0.9, 1.5);
        brainGroup.add(cerebrum);
        
        const cerebellumGeometry = new THREE.SphereBufferGeometry(0.5, 32, 32);
        const cerebellumPositions = cerebellumGeometry.getAttribute('position');
        
        for (let i = 0; i < cerebellumPositions.count; i++) {
            const x = cerebellumPositions.getX(i);
            const y = cerebellumPositions.getY(i);
            const z = cerebellumPositions.getZ(i);
            
            const noise = 0.1 * Math.sin(10 * x) * Math.sin(10 * y) * Math.sin(10 * z);
            
            cerebellumPositions.setX(i, x + noise * x);
            cerebellumPositions.setY(i, y + noise * y);
            cerebellumPositions.setZ(i, z + noise * z);
        }
        
        cerebellumGeometry.computeVertexNormals();
        const cerebellum = new THREE.Mesh(cerebellumGeometry, brainMaterial);
        cerebellum.position.set(0, -0.7, -1.1);
        brainGroup.add(cerebellum);
        
        const stemGeometry = new THREE.CylinderBufferGeometry(0.15, 0.1, 0.7, 16);
        const stem = new THREE.Mesh(stemGeometry, brainMaterial);
        stem.position.set(0, -1.2, -0.8);
        stem.rotation.x = Math.PI / 4;
        brainGroup.add(stem);
        
        return brainGroup;
    }

    function createInternalObjects() {
        const objectsGroup = new THREE.Group();
        
        const starsGroup = new THREE.Group();
        
        function createStarShape() {
            const starShape = new THREE.Shape();
            const points = 5;  
            const outerRadius = 0.15;
            const innerRadius = 0.06;
            
            for (let i = 0; i < points * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i / (points * 2)) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                if (i === 0) {
                    starShape.moveTo(x, y);
                } else {
                    starShape.lineTo(x, y);
                }
            }
            starShape.closePath();
            return starShape;
        }

        for (let i = 0; i < 20; i++) {
            const starShape = createStarShape();
            const starGeometry = new THREE.ExtrudeGeometry(starShape, {
                depth: 0.01,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.01,
                bevelSegments: 3
            });

            const starMaterial = new THREE.MeshPhongMaterial({
                color: 0xffd700,
                emissive: 0xffd700,
                emissiveIntensity: 0.5,
                specular: 0xffffcc,
                shininess: 100,
                side: THREE.DoubleSide
            });

            const star = new THREE.Mesh(starGeometry, starMaterial);
            
            const radius = 1.8 + Math.random() * 0.4;  
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            star.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            star.userData = {
                moveSpeed: 0.2 + Math.random() * 0.3,
                spinSpeed: 0.03,
                timeOffset: Math.random() * 1000,
                amplitude: 0.5 + Math.random() * 0.5,
                frequency: {
                    x: 1.0 + Math.random() * 2.0,
                    y: 1.0 + Math.random() * 2.0,
                    z: 1.0 + Math.random() * 2.0
                },
                basePosition: star.position.clone(),
                sequentialDelay: i * 0.1  
            };

            star.visible = false;
            starsGroup.add(star);
        }

        objectsGroup.add(starsGroup);
        
        const thoughtGroup = new THREE.Group();

        const loader = new THREE.FontLoader();

        const chestGroup = new THREE.Group();
        
        const chestBaseGeometry = new THREE.BoxGeometry(0, 0, 0);
        const chestMaterial = new THREE.MeshPhongMaterial({
            color: 0xcd7f32,  
            emissive: 0xcd7f32,
            emissiveIntensity: 0.2,
            specular: 0xffd700,
            shininess: 100,
            metalness: 0.7,
            side: THREE.DoubleSide
        });
        const chestBase = new THREE.Mesh(chestBaseGeometry, chestMaterial);

        const interiorMaterial = new THREE.MeshPhongMaterial({
            color: 0x3d2314,  
            emissive: 0x000000,
            emissiveIntensity: 0,
            specular: 0x111111,
            shininess: 10,
            transparent: false,
            opacity: 1.0,
            side: THREE.BackSide  
        });
        
        const bottomGeometry = new THREE.BoxGeometry(0, 0, 0);
        const bottomPanel = new THREE.Mesh(bottomGeometry, interiorMaterial);
        bottomPanel.position.y = -0.145;  
        chestBase.add(bottomPanel);

        const paperGeometry = new THREE.PlaneGeometry(0.25, 0.2, 1, 1);  
        const paperMaterial = new THREE.MeshPhongMaterial({
            color: 0xf5f5dc,  
            emissive: 0xf5f5dc,
            emissiveIntensity: 0.1,
            side: THREE.DoubleSide
        });
        const paper = new THREE.Mesh(paperGeometry, paperMaterial);
        
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        
        context.fillStyle = '#f5f5dc';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        const fSize = 200;
        const fPadding = (canvas.width - fSize) / 2;
        
        context.fillStyle = '#000000';
        
        const cellSize = fSize / f13s2[0].length;
        
        for (let y = 0; y < f13s2.length; y++) {
            for (let x = 0; x < f13s2[y].length; x++) {
                if (f13s2[y][x] === 1) {
                    context.fillRect(
                        Math.floor(fPadding + x * cellSize), 
                        Math.floor(fPadding + y * cellSize), 
                        Math.ceil(cellSize), 
                        Math.ceil(cellSize)
                    );
                }
            }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        paperMaterial.map = texture;
        
        paper.position.set(0, 1, 0);  
        paper.rotation.x = -Math.PI / 2;  
        paper.rotation.z = Math.PI / 6;   
        chestBase.add(paper);
        
        for (let i = 0; i < 200; i++) {
            const symbolMaterial = new THREE.MeshPhongMaterial({
                color: 0x62688F,  
                emissive: 0x62688F,
                emissiveIntensity: 0.5,
                specular: 0xffffff,
                shininess: 100,
                side: THREE.BackSide  
            });
            
            const ethGroup = new THREE.Group();
            
            const sizeMultiplier = 1.0 + Math.random() * 0;
            
            const topPyramidGeometry = new THREE.ConeGeometry(0.025 * sizeMultiplier, 0.05 * sizeMultiplier, 6);
            const topPyramid = new THREE.Mesh(topPyramidGeometry, symbolMaterial);
            topPyramid.position.y = 0.025 * sizeMultiplier;
            ethGroup.add(topPyramid);
            
            const bottomPyramidGeometry = new THREE.ConeGeometry(0.025 * sizeMultiplier, 0.05 * sizeMultiplier, 6);
            const bottomPyramid = new THREE.Mesh(bottomPyramidGeometry, symbolMaterial);
            bottomPyramid.rotation.x = Math.PI;
            bottomPyramid.position.y = -0.025 * sizeMultiplier;
            ethGroup.add(bottomPyramid);
            
            const ethLineGeo1 = new THREE.BoxGeometry(0.015 * sizeMultiplier, 0.004, 0.004);
            const ethLine1 = new THREE.Mesh(ethLineGeo1, symbolMaterial);
            ethLine1.position.set(0, 0, 0);
            ethGroup.add(ethLine1);
            
            const ethLineGeo2 = new THREE.BoxGeometry(0.04 * sizeMultiplier, 0.004, 0.004);
            const ethLine2 = new THREE.Mesh(ethLineGeo2, symbolMaterial);
            ethLine2.position.set(0, -0.01 * sizeMultiplier, 0);
            ethGroup.add(ethLine2);
            
            let xPos, yPos, zPos;
            
            const coverPaper = i < 15; 
            
            if (coverPaper) {
                const gridSize = Math.ceil(Math.sqrt(15)); 
                const paperGridX = ((i % gridSize) - (gridSize/2 - 0.5)) * 0.04;  
                const paperGridZ = (Math.floor(i / gridSize) - (gridSize/2 - 0.5)) * 0.04;  
                
                xPos = paperGridX;
                yPos = 0.035 + (i % 3) * 0.02;  
                zPos = paperGridZ;
            } else {
                xPos = (Math.random() - 0.5) * 0.32;  
                yPos = 0.035 + Math.random() * 0.10;  
                zPos = (Math.random() - 0.5) * 0.22;  
            }
            
            xPos = Math.max(Math.min(xPos, 0.16), -0.16);
            zPos = Math.max(Math.min(zPos, 0.11), -0.11);
            
            ethGroup.position.set(xPos, yPos, zPos);
            
            ethGroup.rotation.x = Math.random() * Math.PI * 0.2 - Math.PI * 0.1;
            ethGroup.rotation.y = Math.random() * Math.PI * 2; 
            ethGroup.rotation.z = Math.random() * Math.PI * 0.2 - Math.PI * 0.1;
            
            const scale = 0.5 + Math.random() * 0.35;
            ethGroup.scale.set(scale, scale, scale);
            
            ethGroup.userData = {
                floatPhase: Math.random() * Math.PI * 2,
                floatSpeed: 0.2 + Math.random() * 0.3,
                floatAmplitude: 0.01 + Math.random() * 0.02,  
                rotateSpeed: 0.004 + Math.random() * 0.008,
                basePosition: ethGroup.position.clone()
            };
            
            chestBase.add(ethGroup);
            
            if (Math.random() > 0.3) {  
                const glowMaterial = new THREE.SpriteMaterial({
                    map: new THREE.CanvasTexture((() => {
                        const canvas = document.createElement('canvas');
                        canvas.width = 32;
                        canvas.height = 32;
                        const ctx = canvas.getContext('2d');
                        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
                        gradient.addColorStop(0, 'rgba(150, 160, 200, 1)');
                        gradient.addColorStop(1, 'rgba(150, 160, 200, 0)');
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, 32, 32);
                        return canvas;
                    })()),
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    opacity: 0.7
                });
                
                const glow = new THREE.Sprite(glowMaterial);
                glow.scale.set(0.1, 0.1, 1); 
                
                glow.userData = {
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.04 + Math.random() * 0.04
                };
                
                ethGroup.add(glow);
            }
        }

        const chestLidGeometry = new THREE.BoxGeometry(0.42, 0.15, 0.32);
        const chestLid = new THREE.Mesh(chestLidGeometry, chestMaterial);
        chestLid.position.y = 0.22;  
        
        const decorMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd700,  
            emissive: 0xffd700,
            emissiveIntensity: 0.3,
            specular: 0xffffcc,
            shininess: 200,
            metalness: 1.0,
            side: THREE.DoubleSide
        });

        const bandGeometry = new THREE.BoxGeometry(0.41, 0.05, 0.31);
        const topBand = new THREE.Mesh(bandGeometry, decorMaterial);
        topBand.position.y = 0.22;
        const bottomBand = new THREE.Mesh(bandGeometry, decorMaterial);
        bottomBand.position.y = 0;

        const lockGeometry = new THREE.BoxGeometry(0.1, 0.12, 0.05);
        const lock = new THREE.Mesh(lockGeometry, decorMaterial);
        lock.position.set(0, 0.15, 0.17);

        chestGroup.add(chestBase);
        chestGroup.add(chestLid);
        chestGroup.add(topBand);
        chestGroup.add(bottomBand);
        chestGroup.add(lock);

        chestGroup.position.set(0.5, 0.3, 0.4);  
        chestGroup.rotation.y = Math.PI / 6;  

        chestGroup.userData = {
            pulsePhase: 0,
            pulseSpeed: 0.02,
            floatPhase: 0,
            floatSpeed: 0.8,
            floatHeight: 0.05,  
            rotateSpeed: 0.005,
            isChest: true
        };

        objectsGroup.add(chestGroup);
        
        const thoughts = [
            { text: "УДАР", color: 0xff0000 },    
            { text: "УВОРОТ", color: 0xffd700 },    
            { text: "БЛОК", color: 0x4169e1 },    
            { text: "КОМБО", color: 0xff6b00 },    
            { text: "НОКАУТ", color: 0xff1493 }      
        ];

        loader.load('/static/fonts/Oswald_Regular.json', function(font) {
            thoughts.forEach((thought, index) => {
                const textGeometry = new THREE.TextGeometry(thought.text, {
                    font: font,
                    size: 0.12,
                    height: 0.02,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.01,
                    bevelSize: 0.005,
                    bevelOffset: 0,
                    bevelSegments: 5
                });

                const textMaterial = new THREE.MeshPhongMaterial({
                    color: thought.color,
                    emissive: thought.color,
                    emissiveIntensity: 0.5,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide
                });

                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                
                textGeometry.computeBoundingBox();
                const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
                
                const angle = (index / thoughts.length) * Math.PI * 2;
                const radius = 0.6;
                textMesh.position.set(
                    Math.cos(angle) * radius + centerOffset,
                    Math.sin(angle) * radius * 0.4,
                    Math.sin(angle) * radius
                );

                textMesh.lookAt(new THREE.Vector3(0, 0, 0));
                textMesh.rotateY(Math.PI / 2); 

                textMesh.userData = {
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.02 + Math.random() * 0.01,
                    originalPosition: textMesh.position.clone(),
                    floatAmplitude: 0.1,
                    floatSpeed: 0.5 + Math.random() * 0.5
                };

                thoughtGroup.add(textMesh);

                const beamGeometry = new THREE.CylinderBufferGeometry(0.01, 0.01, 0.7, 8);
                const beamMaterial = new THREE.MeshPhongMaterial({
                    color: thought.color,
                    emissive: thought.color,
                    emissiveIntensity: 0.3,
                    transparent: true,
                    opacity: 0.3,
                    side: THREE.DoubleSide
                });

                const beam = new THREE.Mesh(beamGeometry, beamMaterial);
                beam.position.copy(textMesh.position);
                beam.lookAt(new THREE.Vector3(0, 0, 0));
                beam.userData = {
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.03
                };
                thoughtGroup.add(beam);
            });
        });
        
        const coreGeometry = new THREE.IcosahedronGeometry(0.2, 1);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x4169E1,
            emissive: 0x4169E1,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        const thoughtCore = new THREE.Mesh(coreGeometry, coreMaterial);
        thoughtCore.userData = {
            pulsePhase: 0,
            pulseSpeed: 0.03
        };
        thoughtGroup.add(thoughtCore);

        for (let i = 0; i < 15; i++) {
            const pathGeometry = new THREE.CylinderBufferGeometry(0.015, 0.015, 0.6, 8);
            const pathMaterial = new THREE.MeshPhongMaterial({
                color: 0x4169E1,
                emissive: 0x4169E1,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
            });
            
            const path = new THREE.Mesh(pathGeometry, pathMaterial);
            path.position.set(
                (Math.random() - 0.5) * 0.6,
                (Math.random() - 0.5) * 0.6,
                (Math.random() - 0.5) * 0.6
            );
            path.lookAt(thoughtCore.position);
            path.userData = {
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.05 + Math.random() * 0.03
            };
            thoughtGroup.add(path);

            const nodeGeometry = new THREE.SphereBufferGeometry(0.04, 12, 12);
            const nodeMaterial = new THREE.MeshPhongMaterial({
                color: 0x87CEEB,
                emissive: 0x87CEEB,
                emissiveIntensity: 0.4,
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide
            });
            
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.copy(path.position);
            node.position.x += (Math.random() - 0.5) * 0.2;
            node.position.y += (Math.random() - 0.5) * 0.2;
            node.position.z += (Math.random() - 0.5) * 0.2;
            node.userData = {
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.04 + Math.random() * 0.03
            };
            thoughtGroup.add(node);

            for (let j = 0; j < 3; j++) {
                const particleGeometry = new THREE.SphereBufferGeometry(0.015, 8, 8);
                const particleMaterial = new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    emissive: 0xFFFFFF,
                    emissiveIntensity: 0.6,
                    transparent: true,
                    opacity: 0.5,
                    side: THREE.DoubleSide
                });
                
                const particle = new THREE.Mesh(particleGeometry, particleMaterial);
                particle.position.copy(node.position);
                particle.userData = {
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.07 + Math.random() * 0.05,
                    basePosition: node.position.clone(),
                    amplitude: 0.08
                };
                thoughtGroup.add(particle);
            }
        }

        thoughtGroup.position.set(0, 0.2, 0);
        thoughtGroup.scale.set(0.9, 0.9, 0.9);
        objectsGroup.add(thoughtGroup);
        
        return objectsGroup;
    }

    const brain = createBrain();
    const internalObjects = createInternalObjects();
    brain.add(internalObjects);
    scene.add(brain);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        brain.rotation.y += 0.001;
        
        internalObjects.children.forEach((group) => {
            group.children.forEach((object) => {
                if (object.userData.pulsePhase !== undefined) {
                    object.userData.pulsePhase += object.userData.pulseSpeed;
                    
                    const pulseScale = 1 + 0.2 * Math.sin(object.userData.pulsePhase);
                    object.scale.set(pulseScale, pulseScale, pulseScale);
                    
                    if (object.material.emissiveIntensity !== undefined) {
                        object.material.emissiveIntensity = 0.3 + 0.3 * Math.sin(object.userData.pulsePhase);
                    }
                    
                    if (object.userData.basePosition) {
                        const time = object.userData.pulsePhase;
                        const amplitude = object.userData.amplitude;
                        object.position.x = object.userData.basePosition.x + Math.sin(time) * amplitude;
                        object.position.y = object.userData.basePosition.y + Math.cos(time * 1.3) * amplitude;
                        object.position.z = object.userData.basePosition.z + Math.sin(time * 0.7) * amplitude;
                    }

                    if (object.userData.originalPosition && object.userData.floatAmplitude) {
                        const time = Date.now() * 0.001 * object.userData.floatSpeed;
                        const floatY = Math.sin(time) * object.userData.floatAmplitude;
                        object.position.y = object.userData.originalPosition.y + floatY;
                        
                        object.rotation.x = Math.sin(time * 0.5) * 0.1;
                        object.rotation.z = Math.cos(time * 0.3) * 0.1;
                    }
                }
                
                if (object.userData.moveSpeed !== undefined) {
                    const time = Date.now() * 0.001;
                    
                    if (!object.visible && time > object.userData.sequentialDelay) {
                        object.visible = true;
                    }
                    
                    const localTime = (time + object.userData.timeOffset) * object.userData.moveSpeed;
                    const amp = object.userData.amplitude;
                    const freq = object.userData.frequency;
                    const base = object.userData.basePosition;
                    
                    object.position.x = base.x + amp * Math.sin(localTime * freq.x) * Math.cos(localTime * 0.7);
                    object.position.y = base.y + amp * Math.sin(localTime * freq.y + Math.PI/3) * Math.cos(localTime * 0.9);
                    object.position.z = base.z + amp * Math.sin(localTime * freq.z + Math.PI/2) * Math.cos(localTime * 0.8);
                    
                    object.rotation.x += Math.sin(localTime * 0.5) * 0.02;
                    object.rotation.y += object.userData.spinSpeed;
                    object.rotation.z += Math.cos(localTime * 0.3) * 0.02;
                }

                if (object.userData.isChest) {
                    const time = Date.now() * 0.001;
                    
                    object.position.y = object.position.y + Math.sin(time * object.userData.floatSpeed) * object.userData.floatHeight;
                    
                    object.rotation.y += object.userData.rotateSpeed;
                    
                    const pulseScale = 1 + 0.05 * Math.sin(time * 2);
                    object.scale.set(pulseScale, pulseScale, pulseScale);
                    
                    object.children[0].children.forEach(child => {
                        if (child.userData.floatPhase !== undefined) {
                            child.userData.floatPhase += child.userData.floatSpeed * 0.01;
                            
                            const basePos = child.userData.basePosition;
                            if (basePos) {
                                child.position.y = basePos.y + Math.sin(child.userData.floatPhase) * child.userData.floatAmplitude;
                                
                                child.rotation.y += child.userData.rotateSpeed;
                                
                                child.rotation.x += Math.sin(child.userData.floatPhase * 0.5) * 0.002;
                                child.rotation.z += Math.cos(child.userData.floatPhase * 0.3) * 0.002;
                            }
                            
                            if (child.children && child.children.length > 0) {
                                child.children.forEach(subChild => {
                                    if (subChild.userData.pulsePhase !== undefined) {
                                        subChild.userData.pulsePhase += subChild.userData.pulseSpeed;
                                        
                                        subChild.material.opacity = 0.3 + 0.4 * Math.sin(subChild.userData.pulsePhase);
                                        
                                        const glowPulse = 0.7 + 0.3 * Math.sin(subChild.userData.pulsePhase);
                                        subChild.scale.set(0.08 * glowPulse, 0.08 * glowPulse, 1);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        });
        
        renderer.render(scene, camera);
    }
    animate();

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener('resize', onWindowResize);

    window.brainModel = brain;
    window.brainCamera = camera;
});