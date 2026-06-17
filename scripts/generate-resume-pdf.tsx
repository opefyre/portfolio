// Build-time CV/résumé generator.
//
// Reads the same Firestore data the site uses (meta/personalInfoPublic +
// privateMeta/personalContact for the email + the experiences/projects/skills/
// education/certifications collections) and writes a print-ready PDF to
// public/resume.pdf. Wired into npm's `prebuild` so it runs automatically
// before `next build` in both local and CI.
//
// Credentials: same env vars as lib/db.ts — FIREBASE_SERVICE_ACCOUNT_KEY
// (inline JSON, CI) or GOOGLE_APPLICATION_CREDENTIALS (file path, local).
//
// Run manually:
//   GOOGLE_APPLICATION_CREDENTIALS=./abosh-portfolio-06997cc863bd.json \
//     npx tsx scripts/generate-resume-pdf.tsx

import { promises as fs } from "node:fs";
import path from "node:path";
import * as admin from "firebase-admin";
import { renderToFile } from "@react-pdf/renderer";
import React from "react";
import {
    CvDocument,
    type CvData,
    type CvExperience,
    type CvSkill,
    type CvCertification,
    type CvEducation,
    type CvProject,
} from "../lib/cv/document.js";
import { registerCvFonts } from "../lib/cv/fonts.js";

const OUTPUT_PATH = path.resolve("public/resume.pdf");

function initAdmin() {
    if (admin.apps.length) return;
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        const json = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        admin.initializeApp({ credential: admin.credential.cert(json) });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        admin.initializeApp();
    } else {
        throw new Error(
            "[generate-resume-pdf] No Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY (inline JSON) " +
                "or GOOGLE_APPLICATION_CREDENTIALS (file path)."
        );
    }
}

// Lightweight version of shortenImpactForCard from lib/db.ts (which is
// `server-only` so we can't import it here). Falls back when a project
// doc has no outcomeShort but has an impact line.
function shortImpact(impact: string | undefined, limit = 110): string {
    if (!impact) return "";
    const single = impact.replace(/\s+/g, " ").trim();
    if (single.length <= limit) return single;
    const cut = single.slice(0, limit);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?]*$/, "") + "…";
}

async function fetchData(db: FirebaseFirestore.Firestore): Promise<CvData> {
    const [pubSnap, privSnap, expSnap, skillSnap, certSnap, eduSnap, projSnap] = await Promise.all([
        db.collection("meta").doc("personalInfoPublic").get(),
        db.collection("privateMeta").doc("personalContact").get(),
        db.collection("experiences").get(),
        db.collection("skills").get(),
        db.collection("certifications").get(),
        db.collection("education").get(),
        db.collection("projects").get(),
    ]);

    if (!pubSnap.exists) throw new Error("meta/personalInfoPublic missing in Firestore");
    const pub = pubSnap.data() ?? {};
    const priv = privSnap.exists ? privSnap.data() ?? {} : {};

    const personalInfo = {
        name: String(pub.name ?? ""),
        title: String(pub.title ?? ""),
        location: String(pub.location ?? ""),
        linkedin: String(pub.linkedin ?? ""),
        headline: String(pub.headline ?? ""),
        signatureMetricValue: String(pub.signatureMetricValue ?? ""),
        signatureMetricLabel: String(pub.signatureMetricLabel ?? ""),
        email: priv.email ? String(priv.email) : undefined,
        phone: priv.phone ? String(priv.phone) : undefined,
        portfolio: pub.portfolio ? String(pub.portfolio) : undefined,
    };

    const experiences: CvExperience[] = expSnap.docs
        .map((d) => d.data() as CvExperience)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const skills: CvSkill[] = skillSnap.docs
        .map((d) => d.data() as CvSkill & { order?: number })
        .sort((a, b) => ((a.order ?? 0) as number) - ((b.order ?? 0) as number));
    const certifications: CvCertification[] = certSnap.docs.map((d) => d.data() as CvCertification);
    const education: CvEducation[] = eduSnap.docs.map((d) => d.data() as CvEducation);
    const projects: CvProject[] = projSnap.docs.map((d) => {
        const raw = d.data() as { title?: string; category?: string; impact?: string; outcomeShort?: string };
        return {
            title: String(raw.title ?? ""),
            category: String(raw.category ?? ""),
            impact: String(raw.impact ?? ""),
            outcomeShort: raw.outcomeShort?.trim() || shortImpact(raw.impact),
        };
    });

    return { personalInfo, experiences, skills, certifications, education, projects };
}

async function main() {
    const t0 = Date.now();
    initAdmin();
    const db = admin.firestore();
    const data = await fetchData(db);
    console.log(
        `[generate-resume-pdf] Loaded: ${data.experiences.length} experiences, ` +
            `${data.skills.length} skill groups, ${data.certifications.length} certs, ` +
            `${data.education.length} education entries, ${data.projects.length} projects.`
    );

    registerCvFonts();

    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    // Cast: React-PDF's `renderToFile` is typed against react-pdf's own React types,
    // which can mismatch the host project's React 19 types depending on resolution.
    // The element is the same shape either way.
    await renderToFile(React.createElement(CvDocument, { data }) as never, OUTPUT_PATH);

    const stat = await fs.stat(OUTPUT_PATH);
    console.log(
        `[generate-resume-pdf] Wrote ${OUTPUT_PATH} — ${(stat.size / 1024).toFixed(1)} KB in ${Date.now() - t0}ms`
    );
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("[generate-resume-pdf] failed:", err);
        process.exit(1);
    });
