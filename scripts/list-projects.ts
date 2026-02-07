import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { join } from "path";

async function listProjects() {
    try {
        console.log("🔍 Fetching Projects from Firestore...");

        // Load credentials explicitly
        const serviceAccountPath = join(process.cwd(), "abosh-portfolio-d6eeb942eef4.json");
        const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }

        const db = admin.firestore();
        const snapshot = await db.collection("projects").get();

        if (snapshot.empty) {
            console.log("⚠️ No projects found in 'projects' collection.");
            return;
        }

        console.log(`✅ Found ${snapshot.size} projects:\n`);

        snapshot.docs.forEach((doc, index) => {
            const data = doc.data();
            console.log(`${index + 1}. ${data.title} (${data.category})`);
            console.log(`   ID: ${doc.id}`);
            console.log(`   Description: ${data.description}`);
            console.log(`   Tech Stack: ${data.tech_stack?.join(", ")}`);
            console.log(`   Impact: ${data.impact}`);
            console.log("---------------------------------------------------");
        });

    } catch (error) {
        console.error("❌ Failed to list projects:", error);
    }
}

listProjects();
