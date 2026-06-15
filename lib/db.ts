import "server-only";
import * as admin from "firebase-admin";
import { cache } from "react";
import { unstable_cache } from "next/cache";

// Initialize Admin SDK. Supports two credential sources:
//   1. FIREBASE_SERVICE_ACCOUNT_KEY — the entire service-account JSON inlined as a string. Used by CI.
//   2. GOOGLE_APPLICATION_CREDENTIALS — a filesystem path to the service-account JSON. Recommended for
//      local dev because dotenv parsers mangle the `\n` escapes inside the private key when inlined.
if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // Admin SDK auto-reads GOOGLE_APPLICATION_CREDENTIALS when no credential is passed.
        admin.initializeApp();
    } else {
        throw new Error(
            "🚨 CRITICAL: No Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY (inline JSON) " +
            "or GOOGLE_APPLICATION_CREDENTIALS (file path) before running."
        );
    }
}

export const db = admin.firestore();

export const revalidate = 3600;

// Types
export interface Experience {
    company: string;
    location: string;
    order: number;
    positions: Position[];
}

export interface Position {
    title: string;
    period: string;
    achievements: string[];
}

export interface Project {
    id?: string;
    title: string;
    description: string;
    impact: string;
    category: string;
    problem: string;
    solution: string;
    skills: string[];
    /** ≤90 char outcome line shown on the card by default. Falls back to a truncation of `impact`. */
    outcomeShort: string;
    /** Optional public path or absolute URL to a project thumbnail. */
    thumbnail?: string;
}

export interface Skill {
    category: string;
    items: string[];
}

export interface Certification {
    name: string;
    issuer?: string;
    year?: string;
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
}

export interface PersonalInfoPublic {
    name: string;
    title: string;
    location: string;
    linkedin: string;
    summary: string;
    /** 1-sentence positioning headline, ≤14 words. Rendered prominently in the hero. */
    headline: string;
    /** e.g. "40%" — the leading numeric value shown in the hero metric strip. */
    signatureMetricValue: string;
    /** e.g. "average cycle-time reduction across 70+ programs" */
    signatureMetricLabel: string;
    /** Public path or absolute URL to the résumé PDF. Defaults to `/resume.pdf`. */
    resumeUrl: string;
}

export interface PersonalInfoPrivate {
    email: string;
    phone: string;
}

export interface ElixiaryVenture {
    title: string;
    tagline: string;
    description: string;
    modules: Array<{ name: string; url: string }>;
    techStack: string[];
    website: string;
    socials: {
        github: string;
        x: string;
        instagram: string;
        tiktok: string;
        email: string;
    };
    metrics?: Array<{ label: string; value: string }>;
}

const PERSONAL_INFO_FALLBACK = {
    headline: "Process Excellence & Digital Transformation — engineering measurable outcomes at enterprise scale.",
    signatureMetricValue: "40%",
    signatureMetricLabel: "avg cycle-time reduction across 70+ transformation programs",
    resumeUrl: "/resume.pdf",
} as const;

function shortenImpactForCard(impact: string | undefined, limit = 110): string {
    if (!impact) return "";
    const single = impact.replace(/\s+/g, " ").trim();
    if (single.length <= limit) return single;
    const cut = single.slice(0, limit);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?]*$/, "") + "…";
}

export const getPersonalInfo = cache(async () => {
    return unstable_cache(
        async () => {
            const publicDoc = await db.collection("meta").doc("personalInfoPublic").get();
            const raw: Partial<PersonalInfoPublic> = publicDoc.exists
                ? (publicDoc.data() as Partial<PersonalInfoPublic>)
                : await (async () => {
                    // Backward-compatible fallback for environments where migration has not run yet.
                    const legacyDoc = await db.collection("meta").doc("personalInfo").get();
                    if (!legacyDoc.exists) throw new Error("PersonalInfo public document not found in Firestore");
                    return legacyDoc.data() as Partial<PersonalInfoPublic>;
                })();

            return {
                name: raw.name ?? "",
                title: raw.title ?? "",
                location: raw.location ?? "",
                linkedin: raw.linkedin ?? "",
                summary: raw.summary ?? "",
                headline: raw.headline?.trim() || PERSONAL_INFO_FALLBACK.headline,
                signatureMetricValue: raw.signatureMetricValue?.trim() || PERSONAL_INFO_FALLBACK.signatureMetricValue,
                signatureMetricLabel: raw.signatureMetricLabel?.trim() || PERSONAL_INFO_FALLBACK.signatureMetricLabel,
                resumeUrl: raw.resumeUrl?.trim() || PERSONAL_INFO_FALLBACK.resumeUrl,
            };
        },
        ["personal-info-v2"],
        { tags: ["meta"] }
    )();
});

export const getElixiaryVenture = cache(async () => {
    return unstable_cache(
        async () => {
            const doc = await db.collection("meta").doc("elixiaryVenture").get();
            if (!doc.exists) throw new Error("ElixiaryVenture doc not found in Firestore");
            return doc.data() as ElixiaryVenture;
        },
        ["elixiary-venture"],
        { tags: ["meta"] }
    )();
});

export const getExperiences = cache(async () => {
    return unstable_cache(
        async () => {
            const snapshot = await db.collection("experiences").get();
            if (snapshot.empty) throw new Error("Experiences collection empty in Firestore");
            const experiences = snapshot.docs.map(d => d.data() as Experience);
            return experiences.sort((a, b) => b.order - a.order);
        },
        ["experiences"],
        { tags: ["content"] }
    )();
});

export const getProjects = cache(async () => {
    return unstable_cache(
        async () => {
            const snapshot = await db.collection("projects").get();
            if (snapshot.empty) throw new Error("Projects collection empty in Firestore");
            return snapshot.docs.map(d => {
                const raw = d.data() as Partial<Project>;
                const outcomeShort = raw.outcomeShort?.trim() || shortenImpactForCard(raw.impact);
                return {
                    id: d.id,
                    title: raw.title ?? "",
                    description: raw.description ?? "",
                    impact: raw.impact ?? "",
                    category: raw.category ?? "",
                    problem: raw.problem ?? "",
                    solution: raw.solution ?? "",
                    skills: raw.skills ?? [],
                    outcomeShort,
                    thumbnail: raw.thumbnail,
                } as Project;
            });
        },
        ["projects-v2"],
        { tags: ["content"] }
    )();
});

export const getSkills = cache(async () => {
    return unstable_cache(
        async () => {
            const snapshot = await db.collection("skills").get();
            if (snapshot.empty) throw new Error("Skills collection empty in Firestore");
            return snapshot.docs.map(d => d.data() as Skill);
        },
        ["skills"],
        { tags: ["content"] }
    )();
});

export const getEducation = cache(async () => {
    return unstable_cache(
        async () => {
            const snapshot = await db.collection("education").get();
            if (snapshot.empty) throw new Error("Education collection empty in Firestore");
            const docs = snapshot.docs.map(d => d.data() as Education);
            // Sort by period descending (newest at the top, oldest at the bottom)
            return docs.sort((a, b) => {
                const yearA = parseInt(a.period.match(/\d{4}/g)?.pop() || "0");
                const yearB = parseInt(b.period.match(/\d{4}/g)?.pop() || "0");
                return yearB - yearA;
            });
        },
        ["education"],
        { tags: ["content"] }
    )();
});

export const getCertifications = cache(async () => {
    return unstable_cache(
        async () => {
            const snapshot = await db.collection("certifications").get();
            if (snapshot.empty) throw new Error("Certifications collection empty in Firestore");
            return snapshot.docs.map(d => d.data() as Certification);
        },
        ["certifications"],
        { tags: ["content"] }
    )();
});
