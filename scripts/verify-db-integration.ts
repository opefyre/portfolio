import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { join } from "path";

async function verify() {
    try {
        console.log("🔍 Verifying Firestore Integration...");

        // Load credentials explicitly for this test script
        // In production, this comes from ENV
        const serviceAccountPath = join(process.cwd(), "abosh-portfolio-d6eeb942eef4.json");
        const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }

        const db = admin.firestore();
        console.log("✅ Firebase Admin Initialized");

        // Try to fetch Personal Info
        console.log("Attempting to fetch 'meta/personalInfo'...");
        const doc = await db.collection("meta").doc("personalInfo").get();

        if (doc.exists) {
            console.log("✅ SUCCESS: Data found in Firestore!");
            console.log("----------------------------------------");
            const data = doc.data();
            console.log(`Name: ${data?.name}`);
            console.log(`Title: ${data?.title}`);
            console.log(`Email: ${data?.email}`);
            console.log("----------------------------------------");
            console.log("The UI will display this data.");
        } else {
            console.error("❌ ERROR: Document 'meta/personalInfo' does not exist.");
        }

    } catch (error) {
        console.error("❌ VERIFICATION FAILED:", error);
    }
}

verify();
