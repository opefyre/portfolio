import "server-only";
import * as admin from "firebase-admin";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import {
    personalInfo as staticPersonalInfo,
    experiences as staticExperiences,
    projects as staticProjects,
    skills as staticSkills,
    education as staticEducation,
    certifications as staticCertifications,
    elixiaryVenture as staticElixiaryVenture
} from "./data";

// Initialize Admin with local credentials for build time
// Service account must be provided via env var in CI/CD (GitHub Secrets)
// Local dev can use .env.local
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

if (!admin.apps.length && serviceAccount) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (e) {
        console.error("Firebase Admin Init Failed (using fallback data):", e);
    }
}

let db: admin.firestore.Firestore | null = null;
try {
    db = admin.firestore();
} catch (e) {
    console.error("Firestore Init Failed (using fallback data):", e);
}

export const revalidate = 3600;

// Types (Mirrors lib/data.ts)
export interface Experience {
    company: string;
    location: string;
    positions: Position[];
}

export interface Position {
    title: string;
    period: string;
    achievements: string[];
}

export interface Project {
    title: string;
    description: string;
    impact: string;
    category: string;
    problem: string;
    solution: string;
    tech_stack: string[];
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

export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    summary: string;
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

// Helper for safe fetch
async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
    if (!db) return fallback;
    try {
        return await fn();
    } catch (error) {
        console.error("Firestore Fetch Error (using fallback):", error);
        return fallback;
    }
}

export const getPersonalInfo = cache(async () => {
    return unstable_cache(
        async () => safeFetch(async () => {
            const doc = await db!.collection("meta").doc("personalInfo").get();
            // If doc doesn't exist, throw to trigger fallback
            if (!doc.exists) throw new Error("Doc not found");
            return doc.data() as PersonalInfo;
        }, staticPersonalInfo),
        ["personal-info"],
        { tags: ["meta"] }
    )();
});

export const getElixiaryVenture = cache(async () => {
    return unstable_cache(
        async () => safeFetch(async () => {
            const doc = await db!.collection("meta").doc("elixiaryVenture").get();
            if (!doc.exists) throw new Error("Doc not found");
            return doc.data() as ElixiaryVenture; // Corrected type
        }, staticElixiaryVenture),
        ["elixiary-venture"],
        { tags: ["meta"] }
    )();
});

export const getExperiences = cache(async () => {
    return unstable_cache(
        async () => safeFetch(async () => {
            const snapshot = await db!.collection("experiences").get();
            if (snapshot.empty) throw new Error("Collection empty");
            return snapshot.docs.map(d => d.data() as Experience);
        }, staticExperiences),
        ["experiences"],
        { tags: ["content"] }
    )();
});

export const getProjects = cache(async () => {
    return unstable_cache(
        async () => safeFetch(async () => {
            const snapshot = await db!.collection("projects").get();
            if (snapshot.empty) throw new Error("Collection empty");
            return snapshot.docs.map(d => d.data() as Project);
        }, staticProjects),
        ["projects"],
        { tags: ["content"] }
    )();
});

export const getSkills = cache(async () => {
    return unstable_cache(
        async () => safeFetch(async () => {
            const snapshot = await db!.collection("skills").get();
            if (snapshot.empty) throw new Error("Collection empty");
            return snapshot.docs.map(d => d.data() as Skill);
        }, staticSkills),
        ["skills"],
        { tags: ["content"] }
    )();
});

export const getEducation = cache(async () => {
    return unstable_cache(
        async () => safeFetch(async () => {
            const snapshot = await db!.collection("education").get();
            if (snapshot.empty) throw new Error("Collection empty");
            return snapshot.docs.map(d => d.data() as Education);
        }, staticEducation),
        ["education"],
        { tags: ["content"] }
    )();
});

export const getCertifications = cache(async () => {
    return unstable_cache(
        async () => safeFetch(async () => {
            const snapshot = await db!.collection("certifications").get();
            if (snapshot.empty) throw new Error("Collection empty");
            return snapshot.docs.map(d => d.data() as Certification);
        }, staticCertifications),
        ["certifications"],
        { tags: ["content"] }
    )();
});
