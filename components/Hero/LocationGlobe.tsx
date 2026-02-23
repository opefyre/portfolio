"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";

export default function LocationGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollY } = useScroll(); // Get smooth scroll from framer motion
    const springScroll = useSpring(scrollY, { damping: 20, stiffness: 100 });

    useEffect(() => {
        let width = 0;

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener('resize', onResize);
        onResize();

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 3.5, // Rotate the starting position so Lisbon is visible on load
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.1, 0.1, 0.1], // Dark gray
            markerColor: [1, 0, 110 / 255], // #ff006e
            glowColor: [0.05, 0.05, 0.05], // Very dark glow
            markers: [
                { location: [38.7223, -9.1393], size: 0.08 }
            ],
            onRender: (state) => {
                // Scroll-linked rotation strictly, retaining the initial 3.5 offset
                state.phi = 3.5 + (springScroll.get() * 0.0015);

                // Keep dimensions exact
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, [springScroll]);

    return (
        <div className="absolute top-0 left-1/2 translate-x-[-20%] translate-y-[-60%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] pointer-events-none z-[-1]">
            {/* Canvas Container */}
            <div className="w-full h-full relative z-0 mix-blend-screen drop-shadow-[0_0_30px_rgba(255,0,110,0.1)] opacity-65">
                <canvas
                    ref={canvasRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        contain: "layout paint size"
                    }}
                />
            </div>
        </div>
    );
}
