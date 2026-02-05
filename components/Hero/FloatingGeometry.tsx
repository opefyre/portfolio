"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Torus, Octahedron } from "@react-three/drei";
import * as THREE from "three";

export function FloatingGeometry() {
    const torusRef = useRef<THREE.Mesh>(null);
    const sphereRef = useRef<THREE.Mesh>(null);
    const octahedronRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Rotate and move the torus
        if (torusRef.current) {
            torusRef.current.rotation.x = time * 0.3;
            torusRef.current.rotation.y = time * 0.2;
            torusRef.current.position.y = Math.sin(time * 0.5) * 0.5;
        }

        // Rotate and move the sphere
        if (sphereRef.current) {
            sphereRef.current.rotation.x = time * 0.2;
            sphereRef.current.rotation.z = time * 0.3;
            sphereRef.current.position.y = Math.cos(time * 0.4) * 0.5;
        }

        // Rotate and move the octahedron
        if (octahedronRef.current) {
            octahedronRef.current.rotation.x = time * 0.4;
            octahedronRef.current.rotation.y = time * 0.3;
            octahedronRef.current.position.y = Math.sin(time * 0.6) * 0.3;
        }
    });

    return (
        <>
            {/* Main Distorted Sphere - represents continuous improvement cycles */}
            <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color="#00f0ff"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            {/* Torus - represents process flow */}
            <Torus
                ref={torusRef}
                args={[2, 0.5, 16, 100]}
                position={[-3, 0, -2]}
                scale={1.2}
            >
                <meshStandardMaterial
                    color="#b000ff"
                    wireframe={false}
                    roughness={0.3}
                    metalness={0.7}
                />
            </Torus>

            {/* Octahedron - represents structured systems */}
            <Octahedron ref={octahedronRef} args={[1.5]} position={[3, 0, -1]}>
                <meshStandardMaterial
                    color="#ff006e"
                    wireframe={false}
                    roughness={0.4}
                    metalness={0.6}
                />
            </Octahedron>

            {/* Ambient and directional lights */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#b000ff" />
            <pointLight position={[0, 5, 5]} intensity={1} color="#ff006e" />
        </>
    );
}
