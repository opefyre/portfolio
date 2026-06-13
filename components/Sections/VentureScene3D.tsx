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
 * Holographic projection of the venture's screens.
 *
 *  - Large active textured plane sits forward, centered, fills the canvas
 *  - Sibling planes flank it dimmed and recessed (just a hint of depth)
 *  - Particle field drifts in the background for atmosphere
 *  - Mouse parallax tilts the camera against the active screen
 */
function ScreenPlane({
    texture,
    targetPosition,
    targetRotation,
    targetScale,
    targetOpacity,
    targetEmissive,
}: {
    texture: THREE.Texture;
    targetPosition: THREE.Vector3;
    targetRotation: THREE.Euler;
    targetScale: number;
    targetOpacity: number;
    targetEmissive: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const matRef = useRef<THREE.MeshStandardMaterial>(null);
    const currentPos = useRef(targetPosition.clone());
    const currentRot = useRef(new THREE.Euler().copy(targetRotation));
    const currentScale = useRef(targetScale);
    const currentOpacity = useRef(targetOpacity);
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

        currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, targetOpacity, k);
        matRef.current.opacity = currentOpacity.current;

        currentEmissive.current = THREE.MathUtils.lerp(currentEmissive.current, targetEmissive, k);
        matRef.current.emissiveIntensity = currentEmissive.current;
    });

    return (
        <mesh ref={meshRef} position={targetPosition} rotation={targetRotation} scale={targetScale}>
            {/* Larger plane — fills most of the canvas at z≈0.6 */}
            <planeGeometry args={[4.4, 2.8]} />
            <meshStandardMaterial
                ref={matRef}
                map={texture}
                emissive="#38BDF8"
                emissiveIntensity={targetEmissive}
                roughness={0.35}
                metalness={0.25}
                transparent
                opacity={targetOpacity}
                side={THREE.DoubleSide}
                toneMapped={false}
            />
        </mesh>
    );
}

function Particles({ count = 240 }: { count?: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    const [positions] = useState<Float32Array>(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3 + 0] = (Math.random() - 0.5) * 16;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
        }
        return arr;
    });

    useFrame((_, delta) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y += delta * 0.035;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color="#38BDF8"
                size={0.025}
                sizeAttenuation
                transparent
                opacity={0.5}
                depthWrite={false}
            />
        </points>
    );
}

function CameraRig() {
    const targetX = useRef(0);
    const targetY = useRef(0);
    useFrame((state, delta) => {
        targetX.current = state.pointer.x * 0.55;
        targetY.current = state.pointer.y * 0.35;
        const k = Math.min(1, delta * 3);
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX.current, k);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY.current, k);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

function ScreenFan({ images, activeIndex }: VentureScene3DProps) {
    const textures = useTexture(images);

    return (
        <group>
            {textures.map((tex, i) => {
                // Shortest-path distance around the carousel
                let rel = i - activeIndex;
                const half = textures.length / 2;
                if (rel > half) rel -= textures.length;
                if (rel < -half) rel += textures.length;

                const isActive = rel === 0;
                const distance = Math.abs(rel);
                if (distance > 1) {
                    // Far siblings: tucked far behind, very faded — only render closest neighbours
                    if (distance > 2) return null;
                }

                // Active screen: front and center, big
                // Siblings: smaller, behind, off to the sides, dimmer
                const x = rel * 2.7;
                const y = isActive ? 0 : -0.15;
                const z = isActive ? 0.6 : -1.4 - (distance - 1) * 1.0;
                const rotY = -rel * 0.42;
                const scale = isActive ? 1.0 : 0.62 - Math.max(0, distance - 1) * 0.15;
                const opacity = isActive ? 1.0 : Math.max(0.18, 0.55 - (distance - 1) * 0.3);
                const emissive = isActive ? 0.6 : 0.1;

                return (
                    <ScreenPlane
                        key={i}
                        texture={tex}
                        targetPosition={new THREE.Vector3(x, y, z)}
                        targetRotation={new THREE.Euler(0, rotY, 0)}
                        targetScale={scale}
                        targetOpacity={opacity}
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
            camera={{ position: [0, 0, 4.6], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            className="!absolute inset-0"
        >
            <color attach="background" args={["#03070f"]} />
            <fog attach="fog" args={["#03070f", 6, 16]} />

            <ambientLight intensity={0.55} />
            <pointLight position={[3, 3, 4]} color="#38BDF8" intensity={1.5} />
            <pointLight position={[-4, -2, 2]} color="#818CF8" intensity={0.6} />

            <Particles />
            <ScreenFan images={images} activeIndex={activeIndex} />
            <CameraRig />
        </Canvas>
    );
}
