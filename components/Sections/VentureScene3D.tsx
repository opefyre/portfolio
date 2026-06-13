"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

interface VentureScene3DProps {
    images: string[];
    activeIndex: number;
}

/**
 * Mission-control holographic projection of the venture's screens.
 *
 *  - Floating textured planes arrange themselves in a 3D fan around the camera
 *  - Active plane lifts forward and brightens; siblings recede and dim
 *  - A wireframe icosahedron sigil rotates slowly above the stack
 *  - Particle field drifts in the background for depth
 *  - Mouse parallax tilts the whole scene
 */
function ScreenPlane({
    texture,
    targetPosition,
    targetRotation,
    targetScale,
    targetEmissive,
}: {
    texture: THREE.Texture;
    targetPosition: THREE.Vector3;
    targetRotation: THREE.Euler;
    targetScale: number;
    targetEmissive: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const matRef = useRef<THREE.MeshStandardMaterial>(null);
    const currentPos = useRef(targetPosition.clone());
    const currentRot = useRef(new THREE.Euler().copy(targetRotation));
    const currentScale = useRef(targetScale);
    const currentEmissive = useRef(targetEmissive);

    useFrame((_, delta) => {
        if (!meshRef.current || !matRef.current) return;
        const k = Math.min(1, delta * 4);
        currentPos.current.lerp(targetPosition, k);
        meshRef.current.position.copy(currentPos.current);

        currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, targetRotation.x, k);
        currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, targetRotation.y, k);
        currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, targetRotation.z, k);
        meshRef.current.rotation.copy(currentRot.current);

        currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, k);
        meshRef.current.scale.setScalar(currentScale.current);

        currentEmissive.current = THREE.MathUtils.lerp(currentEmissive.current, targetEmissive, k);
        matRef.current.emissiveIntensity = currentEmissive.current;
    });

    return (
        <mesh ref={meshRef} position={targetPosition} rotation={targetRotation} scale={targetScale}>
            <planeGeometry args={[2.4, 1.6]} />
            <meshStandardMaterial
                ref={matRef}
                map={texture}
                emissive="#38BDF8"
                emissiveIntensity={targetEmissive}
                roughness={0.4}
                metalness={0.3}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function Sigil() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((_, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.x += delta * 0.18;
        groupRef.current.rotation.y += delta * 0.26;
    });

    return (
        <group ref={groupRef} position={[2.0, 1.4, 0.5]}>
            <mesh>
                <icosahedronGeometry args={[0.45, 0]} />
                <meshBasicMaterial color="#38BDF8" wireframe />
            </mesh>
            <mesh>
                <icosahedronGeometry args={[0.62, 1]} />
                <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.18} />
            </mesh>
        </group>
    );
}

function Particles({ count = 220 }: { count?: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    // Lazy initializer pattern — runs once, satisfies React 19's purity rule
    // (useMemo and render bodies must be pure; useState initializers can be impure).
    const [positions] = useState<Float32Array>(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3 + 0] = (Math.random() - 0.5) * 14;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
        }
        return arr;
    });

    useFrame((_, delta) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y += delta * 0.04;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#38BDF8"
                size={0.025}
                sizeAttenuation
                transparent
                opacity={0.55}
                depthWrite={false}
            />
        </points>
    );
}

function CameraRig() {
    const target = useRef({ x: 0, y: 0 });
    useFrame((state, delta) => {
        target.current.x = state.pointer.x * 0.6;
        target.current.y = state.pointer.y * 0.4;
        const k = Math.min(1, delta * 3);
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, target.current.x, k);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, target.current.y, k);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

function ScreenFan({ images, activeIndex }: VentureScene3DProps) {
    const textures = useTexture(images);
    // Distribute screens around the active one. Index distance maps to spread.
    return (
        <group position={[-0.8, -0.1, 0]}>
            {textures.map((tex, i) => {
                const rel = i - activeIndex;
                // Normalise into shortest path around the cycle so screens don't fly across
                let r = rel;
                const half = textures.length / 2;
                if (r > half) r -= textures.length;
                if (r < -half) r += textures.length;

                const isActive = r === 0;
                // Fan layout: active forward at center, siblings to sides receding
                const x = r * 1.3;
                const y = -Math.abs(r) * 0.05;
                const z = isActive ? 0.6 : -Math.min(1.5, Math.abs(r) * 0.9);
                const rotY = -r * 0.35;
                const scale = isActive ? 1.0 : Math.max(0.55, 0.85 - Math.abs(r) * 0.12);
                const emissive = isActive ? 0.55 : 0.15;

                // Only render the closest siblings to keep draw count down
                if (Math.abs(r) > 2) return null;

                return (
                    <ScreenPlane
                        key={i}
                        texture={tex}
                        targetPosition={new THREE.Vector3(x, y, z)}
                        targetRotation={new THREE.Euler(0, rotY, 0)}
                        targetScale={scale}
                        targetEmissive={emissive}
                    />
                );
            })}
        </group>
    );
}

export default function VentureScene3D({ images, activeIndex }: VentureScene3DProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 4.6], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            className="!absolute inset-0"
        >
            <color attach="background" args={["#03070f"]} />
            <fog attach="fog" args={["#03070f", 5, 14]} />

            <ambientLight intensity={0.45} />
            <pointLight position={[3, 3, 4]} color="#38BDF8" intensity={1.4} />
            <pointLight position={[-4, -2, 2]} color="#818CF8" intensity={0.7} />

            <Particles />
            <ScreenFan images={images} activeIndex={activeIndex} />
            <Sigil />
            <CameraRig />
        </Canvas>
    );
}
