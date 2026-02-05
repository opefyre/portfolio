"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { FloatingGeometry } from "./FloatingGeometry";
import { Suspense } from "react";

export function Scene3D() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />
                    <FloatingGeometry />
                </Suspense>
            </Canvas>
        </div>
    );
}
