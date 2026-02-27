import { initializeApp, getApps, getApp } from "firebase/app";
import { AppCheck, getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "abosh-portfolio",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const intakeEndpoint = process.env.NEXT_PUBLIC_INTAKE_ENDPOINT;
const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let appCheckInstance: AppCheck | null = null;

function ensureAppCheck() {
    if (appCheckInstance || typeof window === "undefined" || !recaptchaSiteKey) {
        return;
    }

    appCheckInstance = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true,
    });
}

export const submitInquiry = async (data: Record<string, unknown>) => {
    if (!intakeEndpoint) {
        throw new Error("Missing NEXT_PUBLIC_INTAKE_ENDPOINT");
    }

    ensureAppCheck();

    const appCheckToken = appCheckInstance ? (await getToken(appCheckInstance)).token : "";

    const response = await fetch(intakeEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(appCheckToken ? { "X-Firebase-AppCheck": appCheckToken } : {}),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Inquiry submission failed");
    }

    return response.json();
};
