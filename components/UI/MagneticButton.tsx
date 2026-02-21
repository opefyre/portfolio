"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    as?: "a" | "button" | "div";
    strength?: number;
    [key: string]: unknown;
}

export default function MagneticButton({
    children,
    className = "",
    as = "div",
    strength = 0.3,
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const Component = motion[as] as typeof motion.div;

    return (
        <Component
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            {...props}
        >
            {children}
        </Component>
    );
}
