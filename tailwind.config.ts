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
                primary: {
                    50: "#e6f0ff",
                    100: "#b3d1ff",
                    200: "#80b3ff",
                    300: "#4d94ff",
                    400: "#1a75ff",
                    500: "#0066ff",
                    600: "#0052cc",
                    700: "#003d99",
                    800: "#002966",
                    900: "#001433",
                },
                neon: {
                    blue: "#00f0ff",
                    purple: "#b000ff",
                    pink: "#ff006e",
                    green: "#00ff88",
                },
            },
            fontFamily: {
                sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
                display: ["var(--font-orbitron)", "system-ui", "sans-serif"],
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "shimmer": "shimmer 2.5s linear infinite",
                "rotate-slow": "rotate 20s linear infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-down": "slideDown 0.5s ease-out",
                "fade-in": "fadeIn 0.6s ease-out",
                "scale-in": "scaleIn 0.5s ease-out",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 5px #00f0ff, 0 0 10px #00f0ff" },
                    "100%": { boxShadow: "0 0 20px #00f0ff, 0 0 30px #00f0ff" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-1000px 0" },
                    "100%": { backgroundPosition: "1000px 0" },
                },
                rotate: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                slideUp: {
                    "0%": { transform: "translateY(100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};

export default config;
