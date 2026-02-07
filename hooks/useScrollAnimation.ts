"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function useScrollAnimation<T extends HTMLElement>(
    animationConfig: gsap.TweenVars
) {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;

        gsap.fromTo(
            element,
            { opacity: 0, y: 50 },
            {
                ...animationConfig,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    ...(animationConfig.scrollTrigger || {}),
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [animationConfig]);

    return elementRef;
}
