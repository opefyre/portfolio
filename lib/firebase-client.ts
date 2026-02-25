import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "abosh-portfolio",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const clientDb = getFirestore(app);

/**
 * Route a contact submission securely to Firestore via the Web SDK,
 * natively supporting NextJS Static Exports ('output: export').
 */
export const submitInquiry = async (data: Record<string, unknown>) => {
    // If the Firebase Client config isn't fully set up yet in the user's .env.local, 
    // gracefully simulate the database write so the UI continues functioning beautifully. 
    if (!firebaseConfig.apiKey) {
        console.warn("Client Firebase API Key not found. Simulating Firestore write for demonstration.");

        // Simulate network transit time
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate a secure-looking ID locally
        const hexChars = '0123456789ABCDEF';
        const randomHex = (len: number) => Array.from({ length: len }).map(() => hexChars[Math.floor(Math.random() * 16)]).join('');
        const fakeId = `REQ-${randomHex(4)}-${randomHex(2)}`;

        return { id: fakeId };
    }

    try {
        const payload = {
            name: String(data.name ?? "").trim(),
            email: String(data.email ?? "").trim().toLowerCase(),
            message: String(data.message ?? "").trim(),
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(clientDb, "inquiries"), payload);
        return { id: docRef.id };
    } catch (e) {
        console.error("Firestore Write Failed:", e);
        throw e;
    }
};
