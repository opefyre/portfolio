"use client";

import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export function CustomCursor() {
    const mousePosition = useMousePosition();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button");
            setIsHovering(!!isInteractive);
        };

        document.addEventListener("mouseover", handleMouseOver);
        return () => document.removeEventListener("mouseover", handleMouseOver);
    }, []);

    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null; // Don't show custom cursor on touch devices
    }

    return (
        <>
            {/* Cursor Dot */}
            <div
                className="cursor-dot pointer-events-none"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: isHovering ? "scale(1.5)" : "scale(1)",
                }}
            />

            {/* Cursor Outline */}
            <div
                className="cursor-outline pointer-events-none"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    width: isHovering ? "60px" : "40px",
                    height: isHovering ? "60px" : "40px",
                }}
            />
        </>
    );
}
