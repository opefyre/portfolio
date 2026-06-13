/**
 * Firestore migration + seed for the redesign.
 *
 * 1. Reads the legacy `meta/personalInfo` document.
 * 2. Writes its public fields plus the new redesign fields to `meta/personalInfoPublic`.
 * 3. Splits sensitive fields (email, phone) into `privateMeta/personalContact`.
 * 4. Leaves the legacy `meta/personalInfo` doc in place for backward compatibility.
 *
 * Uses `merge: true` so already-set fields are preserved. Re-running is safe.
 *
 * Run:
 *   GOOGLE_APPLICATION_CREDENTIALS=./abosh-portfolio-06997cc863bd.json npx tsx scripts/seed-redesign-fields.ts
 */

import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

const redesignSeed = {
    headline: "Process Excellence & Digital Transformation — engineering measurable outcomes at enterprise scale.",
    signatureMetricValue: "40%",
    signatureMetricLabel: "avg cycle-time reduction across 70+ transformation programs",
    resumeUrl: "/resume.pdf",
};

async function main() {
    const legacyRef = db.collection("meta").doc("personalInfo");
    const publicRef = db.collection("meta").doc("personalInfoPublic");
    const privateRef = db.collection("privateMeta").doc("personalContact");

    const [legacySnap, publicSnap] = await Promise.all([legacyRef.get(), publicRef.get()]);

    const legacyData = (legacySnap.exists ? (legacySnap.data() ?? {}) : {}) as Record<string, unknown>;
    const existingPublic = (publicSnap.exists ? (publicSnap.data() ?? {}) : {}) as Record<string, unknown>;

    // Public fields — keep anything already set on publicInfoPublic; otherwise copy from legacy.
    const publicWrite: Record<string, unknown> = {};
    const PUBLIC_FIELDS = ["name", "title", "location", "linkedin", "summary"] as const;
    for (const f of PUBLIC_FIELDS) {
        if (existingPublic[f] === undefined && legacyData[f] !== undefined) {
            publicWrite[f] = legacyData[f];
        }
    }

    // Redesign-specific fields — fill where absent.
    for (const [k, v] of Object.entries(redesignSeed)) {
        if (existingPublic[k] === undefined || existingPublic[k] === "" || existingPublic[k] === null) {
            publicWrite[k] = v;
        }
    }

    if (Object.keys(publicWrite).length > 0) {
        console.log("Writing to meta/personalInfoPublic:", publicWrite);
        await publicRef.set(publicWrite, { merge: true });
        console.log("✓ meta/personalInfoPublic updated.");
    } else {
        console.log("meta/personalInfoPublic already populated. Nothing to write.");
    }

    // Private fields — move email/phone into privateMeta/personalContact if not already there.
    const privateSnap = await privateRef.get();
    const existingPrivate = (privateSnap.exists ? (privateSnap.data() ?? {}) : {}) as Record<string, unknown>;
    const privateWrite: Record<string, unknown> = {};
    for (const f of ["email", "phone"] as const) {
        if (existingPrivate[f] === undefined && legacyData[f] !== undefined) {
            privateWrite[f] = legacyData[f];
        }
    }
    if (Object.keys(privateWrite).length > 0) {
        console.log("Writing to privateMeta/personalContact:", privateWrite);
        await privateRef.set(privateWrite, { merge: true });
        console.log("✓ privateMeta/personalContact updated.");
    } else {
        console.log("privateMeta/personalContact already populated. Nothing to write.");
    }

    console.log("Done.");
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
