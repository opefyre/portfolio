"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as random from "maath/random/dist/maath-random.cjs";
import * as THREE from "three";

function StarField(props: React.ComponentProps<typeof Points>) {
    const ref = useRef<THREE.Points>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { radius: 1.5 }) as Float32Array);
    const mouse = useRef({ x: 0, y: 0 });
    const { size } = useThree();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / size.width - 0.5) * 2;
            mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [size]);

    useFrame((_, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x -= delta / 18;
        ref.current.rotation.y -= delta / 24;
        const targetRotX = mouse.current.y * 0.1;
        const targetRotZ = mouse.current.x * 0.07;
        ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * delta * 0.4;
        ref.current.rotation.z += (targetRotZ - ref.current.rotation.z) * delta * 0.4;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#38BDF8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function StarFieldCanvas() {
    return (
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
            <StarField />
        </Canvas>
    );
}
