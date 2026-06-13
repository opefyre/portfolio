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

/** Submit a contact inquiry by writing directly to Firestore, guarded by firestore.rules validation. */
export const submitInquiryToFirestore = async (data: { name: string; email: string; message: string }) => {
    const db = getFirestore(app);
    const ref = await addDoc(collection(db, "inquiries"), {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
        createdAt: serverTimestamp(),
    });
    return { ok: true, id: ref.id };
};
