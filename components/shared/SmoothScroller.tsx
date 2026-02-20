"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
    interface Window {
        __lenis?: Lenis;
    }
}

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // Expose globally so modals can pause/resume smooth scroll
        window.__lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            delete window.__lenis;
        };
    }, []);

    return <>{children}</>;
}
