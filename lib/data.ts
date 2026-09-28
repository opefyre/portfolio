import "server-only";
import { cache } from "react";
import * as admin from "firebase-admin";

/**
 * Build-time content access. The site is a static export, so Firestore is
 * read once per build (CI uses FIREBASE_SERVICE_ACCOUNT_KEY, local builds use
 * gcloud Application Default Credentials via GOOGLE_APPLICATION_CREDENTIALS).
 *
 * Only the career history is read from Firestore; everything else the site
 * says is curated in content/site.ts.
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

export type Position = { title: string; period: string; achievements: string[] };
export type Experience = { id: string; company: string; location: string; order: number; positions: Position[] };

/** Most recent first. */
export const getExperiences = cache(async (): Promise<Experience[]> => {
  const snap = await db().collection("experiences").get();
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<Experience, "id">) }))
    .sort((a, b) => b.order - a.order);
});

export type Certification = { name: string };

export const getCertifications = cache(async (): Promise<Certification[]> => {
  const snap = await db().collection("certifications").get();
  return snap.docs.map((d) => d.data() as Certification).sort((a, b) => a.name.localeCompare(b.name));
});
