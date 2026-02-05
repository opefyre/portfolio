import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Vibrant, bold color palette
                electric: {
                    blue: "#00D9FF",
                    cyan: "#0FF0FC",
                    purple: "#A855F7",
                    pink: "#EC4899",
                    violet: "#8B5CF6",
                },
                neon: {
                    green: "#10B981",
                    yellow: "#FBBF24",
                    orange: "#F97316",
                    red: "#EF4444",
                },
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
                display: ["var(--font-clash)", "system-ui", "sans-serif"],
            },
            fontSize: {
                // Dramatic scale
                "huge": ["clamp(4rem, 15vw, 12rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
                "giant": ["clamp(3rem, 10vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
                "mega": ["clamp(2.5rem, 8vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
                "massive": ["clamp(2rem, 6vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
            },
            spacing: {
                // Generous spacing system
                "18": "4.5rem",
                "22": "5.5rem",
                "26": "6.5rem",
                "30": "7.5rem",
                "34": "8.5rem",
                "38": "9.5rem",
                "42": "10.5rem",
                "section": "clamp(5rem, 15vh, 12rem)",
            },
            animation: {
                "float-slow": "floatSlow 8s ease-in-out infinite",
                "float-fast": "floatFast 4s ease-in-out infinite",
                "glow-pulse": "glowPulse 3s ease-in-out infinite",
                "shimmer-fast": "shimmer 1.5s linear infinite",
                "rotate-slow": "rotate 30s linear infinite",
                "bounce-slow": "bounceSlow 3s ease-in-out infinite",
                "fade-in-up": "fadeInUp 0.8s ease-out forwards",
                "slide-in-right": "slideInRight 0.6s ease-out forwards",
                "scale-bounce": "scaleBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
                "text-shimmer": "textShimmer 3s linear infinite",
            },
            keyframes: {
                floatSlow: {
                    "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
                    "50%": { transform: "translateY(-30px) rotate(5deg)" },
                },
                floatFast: {
                    "0%, 100%": { transform: "translateY(0) translateX(0)" },
                    "50%": { transform: "translateY(-20px) translateX(10px)" },
                },
                glowPulse: {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)",
                        filter: "brightness(1)"
                    },
                    "50%": {
                        boxShadow: "0 0 40px rgba(0, 217, 255, 0.8), 0 0 80px rgba(0, 217, 255, 0.5)",
                        filter: "brightness(1.2)"
                    },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                rotate: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                bounceSlow: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-15px)" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(60px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideInRight: {
                    "0%": { opacity: "0", transform: "translateX(-60px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                scaleBounce: {
                    "0%": { transform: "scale(0.8)", opacity: "0" },
                    "50%": { transform: "scale(1.05)" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                textShimmer: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-shimmer": "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            },
        },
    },
    plugins: [],
};

export default config;
