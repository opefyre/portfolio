// React-PDF font registration. Uses the same four families as the website,
// loaded from @fontsource packages (which ship .woff next to their .woff2 —
// React-PDF supports .woff but not .woff2, so we point at the .woff files).
//
// Called once from scripts/generate-resume-pdf.tsx before the first render.
import path from "node:path";
import { Font } from "@react-pdf/renderer";

const file = (pkg: string, name: string) =>
    path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", name);

export function registerCvFonts() {
    Font.register({
        family: "Syne",
        fonts: [
            { src: file("syne", "syne-latin-500-normal.woff"), fontWeight: 500 },
            { src: file("syne", "syne-latin-600-normal.woff"), fontWeight: 600 },
            { src: file("syne", "syne-latin-700-normal.woff"), fontWeight: 700 },
        ],
    });

    Font.register({
        family: "InstrumentSerif",
        fonts: [
            {
                src: file("instrument-serif", "instrument-serif-latin-400-normal.woff"),
                fontWeight: 400,
                fontStyle: "normal",
            },
            {
                src: file("instrument-serif", "instrument-serif-latin-400-italic.woff"),
                fontWeight: 400,
                fontStyle: "italic",
            },
        ],
    });

    Font.register({
        family: "Manrope",
        fonts: [
            { src: file("manrope", "manrope-latin-400-normal.woff"), fontWeight: 400 },
            { src: file("manrope", "manrope-latin-500-normal.woff"), fontWeight: 500 },
            { src: file("manrope", "manrope-latin-600-normal.woff"), fontWeight: 600 },
            { src: file("manrope", "manrope-latin-700-normal.woff"), fontWeight: 700 },
        ],
    });

    Font.register({
        family: "JetBrainsMono",
        fonts: [
            { src: file("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"), fontWeight: 400 },
            { src: file("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff"), fontWeight: 500 },
        ],
    });

    // Disable React-PDF's built-in hyphenation — it inserts soft-hyphens mid-word
    // that look ugly in body copy. Words break only at natural whitespace.
    Font.registerHyphenationCallback((word) => [word]);
}
