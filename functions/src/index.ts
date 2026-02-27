import { initializeApp } from "firebase-admin/app";
import { getAppCheck } from "firebase-admin/app-check";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { logger } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import { createHash } from "node:crypto";

initializeApp();

const db = getFirestore();

const MAX_BODY_BYTES = 8_192;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_IP = 8;
const MAX_PER_FINGERPRINT = 4;

interface InquiryPayload {
  name: string;
  email: string;
  message: string;
  fingerprint: string;
  captchaToken: string;
}

function sha(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    logger.error("Missing TURNSTILE_SECRET_KEY");
    return false;
  }

  const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: remoteIp,
    }),
  });

  if (!resp.ok) {
    logger.error("Turnstile verification request failed", { status: resp.status });
    return false;
  }

  const data = (await resp.json()) as { success?: boolean; "error-codes"?: string[] };
  if (!data.success) {
    logger.warn("Turnstile verification failed", { errorCodes: data["error-codes"] });
    return false;
  }

  return true;
}

async function verifyAppCheck(token?: string): Promise<boolean> {
  if (!token) {
    return false;
  }

  try {
    await getAppCheck().verifyToken(token);
    return true;
  } catch (error) {
    logger.warn("App Check token verification failed", { error });
    return false;
  }
}

function validatePayload(raw: unknown): InquiryPayload | null {
  if (!raw || typeof raw !== "object") return null;

  const payload = raw as Record<string, unknown>;
  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim().toLowerCase();
  const message = String(payload.message ?? "").trim();
  const fingerprint = String(payload.fingerprint ?? "").trim();
  const captchaToken = String(payload.captchaToken ?? "").trim();

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  if (
    name.length < 2 ||
    name.length > MAX_NAME ||
    !emailRegex.test(email) ||
    email.length > MAX_EMAIL ||
    message.length < 10 ||
    message.length > MAX_MESSAGE ||
    fingerprint.length < 16 ||
    fingerprint.length > 128 ||
    captchaToken.length < 20 ||
    captchaToken.length > 2048
  ) {
    return null;
  }

  return { name, email, message, fingerprint, captchaToken };
}

async function checkAndIncrementLimit(key: string, max: number): Promise<boolean> {
  const now = Date.now();
  const bucket = Math.floor(now / WINDOW_MS);
  const docId = `${bucket}_${sha(key)}`;
  const ref = db.collection("intakeRateLimits").doc(docId);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const current = snap.exists ? Number(snap.get("count") ?? 0) : 0;

    if (current >= max) {
      return false;
    }

    tx.set(
      ref,
      {
        count: current + 1,
        keyHash: sha(key),
        bucket,
        expiresAt: Timestamp.fromMillis(now + WINDOW_MS * 2),
        updatedAt: Timestamp.now(),
      },
      { merge: true },
    );

    return true;
  });
}

export const intakeInquiry = onRequest({
  region: "us-central1",
  cors: true,
  maxInstances: 20,
}, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const rawBodySize = Number(req.header("content-length") ?? "0");
  if (rawBodySize > MAX_BODY_BYTES) {
    res.status(413).json({ error: "Payload too large" });
    return;
  }

  const ip = (req.header("x-forwarded-for")?.split(",")[0] ?? req.ip ?? "unknown").trim();
  const appCheckToken = req.header("x-firebase-appcheck");

  const appCheckOk = await verifyAppCheck(appCheckToken);
  if (!appCheckOk) {
    logger.warn("Blocked request: invalid app check", { ip });
    res.status(401).json({ error: "App Check verification failed" });
    return;
  }

  const payload = validatePayload(req.body);
  if (!payload) {
    logger.warn("Blocked request: schema validation failed", { ip });
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const ipAllowed = await checkAndIncrementLimit(`ip:${ip}`, MAX_PER_IP);
  const fpAllowed = await checkAndIncrementLimit(`fp:${payload.fingerprint}`, MAX_PER_FINGERPRINT);
  if (!ipAllowed || !fpAllowed) {
    logger.warn("Blocked request: rate limit exceeded", { ip });
    res.status(429).json({ error: "Rate limit exceeded" });
    return;
  }

  const captchaValid = await verifyTurnstile(payload.captchaToken, ip);
  if (!captchaValid) {
    logger.warn("Blocked request: captcha verification failed", { ip });
    res.status(400).json({ error: "Captcha verification failed" });
    return;
  }

  try {
    const inquiryRef = await db.collection("inquiries").add({
      name: payload.name,
      email: payload.email,
      message: payload.message,
      fingerprintHash: sha(payload.fingerprint),
      ipHash: sha(ip),
      createdAt: Timestamp.now(),
      source: "intakeFunction",
    });

    logger.info("Inquiry accepted", { inquiryId: inquiryRef.id });
    res.status(201).json({ ok: true, id: inquiryRef.id });
  } catch (error) {
    logger.error("Inquiry write failure", { error });
    res.status(500).json({ error: "Failed to persist inquiry" });
  }
});
