"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollContainerProps {
    children: React.ReactNode;
}

export function HorizontalScrollContainer({ children }: HorizontalScrollContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);

    useEffect(() => {
        if (scrollRef.current) {
            const width = scrollRef.current.scrollWidth - window.innerWidth;
            setScrollWidth(width);
        }

        const handleResize = () => {
            if (scrollRef.current) {
                const width = scrollRef.current.scrollWidth - window.innerWidth;
                setScrollWidth(width);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [children]);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: `${scrollWidth + window.innerHeight}px` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div
                    ref={scrollRef}
                    className="flex h-full"
                    style={{ x }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
