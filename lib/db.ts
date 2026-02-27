import "server-only";
import * as admin from "firebase-admin";
import { cache } from "react";
import { unstable_cache } from "next/cache";

// Initialize Admin with credentials for build time
// Service account must be provided via env var in CI/CD (GitHub Secrets)
// Local dev can use .env.local
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error("🚨 CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is missing. The application requires Firebase to run.");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
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

export const getPersonalInfo = cache(async () => {
    return unstable_cache(
        async () => {
            const doc = await db.collection("meta").doc("personalInfoPublic").get();
            if (!doc.exists) throw new Error("PersonalInfoPublic doc not found in Firestore");
            return doc.data() as PersonalInfoPublic;
        },
        ["personal-info"],
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
                const data = d.data() as Project;
                data.id = d.id; // Include the Firestore document ID to allow UI interactions/referencing.
                return data;
            });
        },
        ["projects"],
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
            // Extracts the last 4-digit number (end year) from strings like "2012 - 2016" or "2020"
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
