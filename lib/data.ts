import "server-only";
import { cache } from "react";
import * as admin from "firebase-admin";

/**
 * Build-time content access. The site is a static export, so Firestore is
 * read once per build (CI uses FIREBASE_SERVICE_ACCOUNT_KEY, local builds use
 * gcloud Application Default Credentials via GOOGLE_APPLICATION_CREDENTIALS).
 */
function db() {
  if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)) });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.initializeApp({ projectId: process.env.GOOGLE_CLOUD_PROJECT || "abosh-portfolio" });
    } else {
      throw new Error(
        "No Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY (inline JSON) or GOOGLE_APPLICATION_CREDENTIALS (file path).",
      );
    }
  }
  return admin.firestore();
}

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  outcomeShort?: string;
  skills: string[];
  status?: string;
  link?: string;
  thumbnail?: string;
  order?: number;
};

export type Position = { title: string; period: string; achievements: string[] };
export type Experience = { id: string; company: string; location: string; order: number; positions: Position[] };
export type Education = { degree: string; institution: string; period: string };
export type Certification = { name: string };
export type Profile = {
  name: string;
  nickname?: string;
  title: string;
  headline: string;
  summary: string;
  location: string;
  linkedin: string;
  github?: string;
};

export type Venture = {
  title: string;
  tagline: string;
  description: string;
  website: string;
  techStack: string[];
};

export const getProjects = cache(async (): Promise<Project[]> => {
  const snap = await db().collection("projects").get();
  const rank = (o?: number) => (typeof o === "number" ? o : Number.MAX_SAFE_INTEGER);
  return snap.docs
    .map((d) => {
      const x = d.data();
      return {
        slug: d.id,
        title: String(x.title ?? ""),
        category: String(x.category ?? "Other"),
        description: String(x.description ?? ""),
        problem: String(x.problem ?? ""),
        solution: String(x.solution ?? ""),
        impact: String(x.impact ?? ""),
        outcomeShort: x.outcomeShort ? String(x.outcomeShort) : undefined,
        skills: Array.isArray(x.skills) ? x.skills.map(String) : [],
        status: x.status ? String(x.status) : undefined,
        link: x.link ? String(x.link) : undefined,
        thumbnail: x.thumbnail ? String(x.thumbnail) : undefined,
        order: typeof x.order === "number" ? x.order : undefined,
      } satisfies Project;
    })
    .sort((a, b) => rank(a.order) - rank(b.order) || a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
});

export const getProject = cache(async (slug: string) => (await getProjects()).find((p) => p.slug === slug));

export const getExperiences = cache(async (): Promise<Experience[]> => {
  const snap = await db().collection("experiences").get();
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<Experience, "id">) }))
    .sort((a, b) => b.order - a.order);
});

export const getEducation = cache(async (): Promise<Education[]> => {
  const snap = await db().collection("education").get();
  const endYear = (p: string) => Number(p.match(/\d{4}/g)?.pop() ?? 0);
  return snap.docs.map((d) => d.data() as Education).sort((a, b) => endYear(b.period) - endYear(a.period));
});

export const getCertifications = cache(async (): Promise<Certification[]> => {
  const snap = await db().collection("certifications").get();
  return snap.docs.map((d) => d.data() as Certification).sort((a, b) => a.name.localeCompare(b.name));
});

export const getProfile = cache(async (): Promise<Profile> => {
  const x = (await db().doc("meta/personalInfoPublic").get()).data() ?? {};
  return {
    name: String(x.name ?? "Abolfazl Shirkavand"),
    nickname: x.nickname ? String(x.nickname) : undefined,
    title: String(x.title ?? ""),
    headline: String(x.headline ?? ""),
    summary: String(x.summary ?? ""),
    location: String(x.location ?? ""),
    linkedin: String(x.linkedin ?? ""),
    github: x.github ? String(x.github) : undefined,
  };
});

export const getVenture = cache(async (): Promise<Venture | null> => {
  const x = (await db().doc("meta/elixiaryVenture").get()).data();
  if (!x) return null;
  return {
    title: String(x.title ?? ""),
    tagline: String(x.tagline ?? ""),
    description: String(x.description ?? ""),
    website: String(x.website ?? ""),
    techStack: Array.isArray(x.techStack) ? x.techStack.map(String) : [],
  };
});
