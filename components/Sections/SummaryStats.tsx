"use client";

import { motion, useInView, useSpring, useTransform, useScroll, MotionValue, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Experience, Project, Certification, Education } from "@/lib/db";
import { Cpu, Briefcase, GraduationCap, Code } from "lucide-react";

// --- Animated Number Counter ---
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const springValue = useSpring(0, {
        mass: 1,
        stiffness: 50,
        damping: 15,
        duration: duration * 1000
    });

    const displayValue = useTransform(springValue, (current) => Math.floor(current));

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, value, springValue]);

    return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// --- Cylinder Data Panel ---
const CylinderPanel = ({
    value,
    label,
    icon: Icon,
    angle,
    rotationY,
    radius = 350
}: {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    angle: number;           // The fixed mathematical position of this panel on the cylinder (e.g. 0, 90, 180, 270)
    rotationY: MotionValue<number>;  // The dynamic animated rotation value of the parent cylinder
    radius?: number;         // Distance from the center axis (translateZ)
}) => {
    // We calculate the absolute rotation of this specific panel relative to the camera
    // taking the cylinder's rotation and adding the panel's fixed angle offset.
    // Example: If cylinder is at 45deg, and panel is at 90deg, panel absolute is 135deg.
    // Note: Since rotationY is a MotionValue, we use useTransform to calculate this reactively.
    const absoluteRotation = useTransform(rotationY, (cylRot: number) => {
        // Normalize the combined angle to 0-360
        let a = (cylRot + angle) % 360;
        if (a < 0) a += 360;
        return a;
    });

    // 0 is front-center, 180 is back-center
    const distanceFromFront = useTransform(absoluteRotation, (rot) => {
        const d = Math.min(rot, 360 - rot);
        return d; // 0 to 180
    });

    // Fade out panels as they rotate to the back
    const opacity = useTransform(distanceFromFront, [0, 90, 150, 180], [1, 0.5, 0.1, 0]);

    // Scale down panels as they rotate away
    const scale = useTransform(distanceFromFront, [0, 90, 180], [1, 0.8, 0.6]);

    // High intensity glow only when at the absolute front (0-20 degrees offset)
    const glowOpacity = useTransform(distanceFromFront, [0, 20, 60], [1, 0.5, 0]);

    // Extract number for AnimatedCounter
    const strValue = String(value);
    const numValue = parseInt(strValue.replace(/\D/g, ''));
    const isNumber = !isNaN(numValue) && strValue.match(/\d+/);
    const suffix = strValue.replace(/[\d\.]/g, '') || '';

    return (
        <motion.div
            style={{
                opacity,
                scale,
                // Position panel in 3D space:
                // 1. Rotate to its spot on the circle (angle)
                // 2. Push it outward from the center (translateZ)
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <div className="w-80 h-48 rounded-2xl bg-card/60 backdrop-blur-md border border-brand-blue/30 shadow-[0_0_30px_rgba(56,189,248,0.1)] flex flex-col justify-between p-6 overflow-hidden relative group">
                {/* Holographic Scanline (only highly visible when near the front) */}
                <motion.div
                    style={{ opacity: glowOpacity }}
                    className="absolute inset-0 bg-gradient-to-b from-brand-blue/0 via-brand-blue/10 to-brand-blue/0"
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Top Row: Icon & Ambient Glow */}
                <div className="flex justify-between items-start relative z-10 w-full">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    {/* Optional: Add a subtle grid/dot pattern or secondary detail here */}
                </div>

                {/* Bottom Row: The Data */}
                <div className="relative z-10">
                    <div className="text-5xl font-display font-medium text-white tracking-tight drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-baseline">
                        {isNumber ? (
                            <>
                                <AnimatedCounter value={numValue} />
                                <span className="text-3xl ml-1">{suffix}</span>
                            </>
                        ) : (
                            value
                        )}
                    </div>
                    <div className="text-brand-blue text-xs uppercase tracking-widest font-mono font-medium mt-2 opacity-80">
                        {label}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function SummaryStats({
    experiences,
    projects,
    certifications,
    education
}: {
    experiences: Experience[],
    projects: Project[],
    certifications: Certification[],
    education: Education[]
}) {
    // -- Data Processing (Authored identically to previous iteration) --
    let earliestYear = new Date().getFullYear();
    experiences.forEach(exp => {
        exp.positions.forEach(pos => {
            const match = pos.period.match(/\d{4}/);
            if (match) {
                const year = parseInt(match[0]);
                if (year < earliestYear) earliestYear = year;
            }
        });
    });
    const yearsExperience = new Date().getFullYear() - earliestYear;
    const totalRoles = experiences.reduce((acc, exp) => acc + exp.positions.length, 0);
    const totalCredentials = education.length + certifications.length;
    const credentialsDisplay = totalCredentials >= 10 ? '10+' : totalCredentials.toString();

    // -- 3D Cylinder Architecture --
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 1. Hook into the user's scroll position
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 2. Map scroll progress (0 -> 1) into a continuous rotation (0 -> 360, or more)
    // We add a massive multiplier so it spins multiple times as they scroll past
    const scrollRotation = useTransform(scrollYProgress, [0, 1], [-180, 540]);

    // 3. Create a secondary baseline infinite rotation (slowly turns even when not scrolling)
    // But we pause it when hovered by the user to allow them to read the data.
    const baselineRotation = useMotionValue(0);
    useEffect(() => {
        if (isHovered) return;

        let animationFrame: number;
        let lastTime: number;

        const animate = (time: number) => {
            if (!lastTime) lastTime = time;
            const delta = time - lastTime;
            // Rotate roughly 10 degrees per second
            baselineRotation.set(baselineRotation.get() + (delta * 0.01));
            lastTime = time;
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isHovered, baselineRotation]);

    // 4. Combine Scroll Rotation + Baseline Rotation into the final Y axis rotation value
    const totalRotationY = useTransform(() => scrollRotation.get() + baselineRotation.get());

    return (
        <section
            ref={containerRef}
            className="container-wide py-16 md:py-32 relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Ambient Background Starfield/Grid (Decorative) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[300px] bg-brand-blue/5 blur-[120px] rounded-full" />
            </div>

            <div className="w-full h-[400px] flex items-center justify-center relative perspective-[1200px] sm:perspective-[2000px]">
                {/* 
                  The Cylinder Core 
                  We rotate this entire container via Framer Motion.
                  The transform-style: preserve-3d ensures the children (panels) 
                  maintain their Z-axis offsets during rotation.
                */}
                <motion.div
                    style={{
                        rotateY: totalRotationY,
                        transformStyle: "preserve-3d"
                    }}
                    className="relative w-80 h-48" // The w/h matches the Panel dimensions
                >
                    {/* Panel 1: Front (0 deg) */}
                    <CylinderPanel
                        value={`${yearsExperience}+`}
                        label="Years Experience"
                        icon={Briefcase}
                        angle={0}
                        rotationY={totalRotationY}
                        radius={300}
                    />

                    {/* Panel 2: Right (90 deg) */}
                    <CylinderPanel
                        value={`${projects.length}+`}
                        label="Major Projects"
                        icon={Code}
                        angle={90}
                        rotationY={totalRotationY}
                        radius={300}
                    />

                    {/* Panel 3: Back (180 deg) */}
                    <CylinderPanel
                        value={`${totalRoles}`}
                        label="Distinct Roles"
                        icon={Cpu}
                        angle={180}
                        rotationY={totalRotationY}
                        radius={300}
                    />

                    {/* Panel 4: Left (270 deg) */}
                    <CylinderPanel
                        value={`${credentialsDisplay}`}
                        label="Verified Credentials"
                        icon={GraduationCap}
                        angle={270}
                        rotationY={totalRotationY}
                        radius={300}
                    />
                </motion.div>
            </div>

            {/* Hint text */}
            <div className="mt-8 text-center text-tertiary font-mono text-[10px] tracking-widest uppercase opacity-50 flex items-center justify-center gap-2">
                <div className="w-2 h-0.5 bg-brand-blue/50 rounded-full" />
                Scroll or Hover to Interact
                <div className="w-2 h-0.5 bg-brand-blue/50 rounded-full" />
            </div>
        </section>
    );
}
