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
                deep: "#030712",
                canvas: "#0B101B",
                silver: "#F8FAFC",
                muted: "#94A3B8",
                brand: {
                    blue: "#38BDF8",
                    purple: "#818CF8",
                },
            },
            fontFamily: {
                display: ["var(--font-display)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            animation: {
                "float": "float 8s ease-in-out infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
        },
    },
    plugins: [],
    darkMode: "class",
};

export default config;
