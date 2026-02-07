import "server-only";
import * as admin from "firebase-admin";

interface FirebaseAdminConfig {
    projectId: string;
    clientEmail: string;
    privateKey: string;
}

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(config: FirebaseAdminConfig) {
    try {
        if (admin.apps.length > 0) {
            return admin.app();
        }

        return admin.initializeApp({
            credential: admin.credential.cert({
                projectId: config.projectId,
                clientEmail: config.clientEmail,
                privateKey: formatPrivateKey(config.privateKey),
            }),
        });
    } catch (error) {
        console.error("Firebase Admin Initialization Error:", error);
        throw error;
    }
}

// Singleton instance for the app
// We will load credentials from process.env or a local file for build time
// For now, we assume standard firebase-admin logic or environment variables
// In the implementation plan, we decided to use the local json for build time if envs are missing
// But standard best practice is process.env for production
