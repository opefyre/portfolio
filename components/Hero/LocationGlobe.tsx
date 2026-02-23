"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";

export default function LocationGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollY } = useScroll(); // Get smooth scroll from framer motion
    const springScroll = useSpring(scrollY, { damping: 20, stiffness: 100 });

    useEffect(() => {
        let phi = 0;
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
            phi: 0,
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
                // Scroll-linked rotation plus ambient rotation
                phi += 0.005;
                state.phi = phi + (springScroll.get() * 0.003);

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
        <div className="absolute top-1/2 left-full translate-y-[-50%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] pointer-events-none z-[-1]">

            {/* Holographic Tether Line */}
            {/* The SVG starts at x=16 to give the pill border some breathing room, and runs into the globe */}
            <svg
                className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[calc(50%-24px)] md:w-[calc(50%-32px)] h-[20px] overflow-visible pointer-events-none z-10"
            >
                {/* Line connecting the pill to the sphere */}
                <line
                    x1="0" y1="10"
                    x2="100%" y2="10"
                    stroke="#ff006e"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="drop-shadow-[0_0_5px_rgba(255,0,110,0.8)] opacity-60"
                />
                <circle cx="100%" cy="10" r="3" fill="#ff006e" className="drop-shadow-[0_0_8px_rgba(255,0,110,1)]" />
            </svg>

            {/* Canvas Container */}
            <div className="w-full h-full relative z-0 mix-blend-screen drop-shadow-[0_0_30px_rgba(255,0,110,0.1)]">
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
