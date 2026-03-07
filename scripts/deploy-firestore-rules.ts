/**
 * Deploy Firestore rules using the Firebase Rules REST API and a service account.
 * Run: FIREBASE_SERVICE_ACCOUNT_KEY="$(cat abosh-portfolio-*.json)" npx tsx scripts/deploy-firestore-rules.ts
 * Or: GOOGLE_APPLICATION_CREDENTIALS=./abosh-portfolio-06997cc863bd.json npx tsx scripts/deploy-firestore-rules.ts
 * (Script uses raw JWT for token; for GOOGLE_APPLICATION_CREDENTIALS you'd need google-auth-library.)
 */

import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";

const PROJECT_ID = "abosh-portfolio";
const RULES_PATH = "firestore.rules";
const RULES_API = "https://firebaserules.googleapis.com/v1";

async function getAccessToken(serviceAccountJson: {
  client_email: string;
  private_key: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccountJson.client_email,
    sub: serviceAccountJson.client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/firebase",
  };
  const header = { alg: "RS256", typ: "JWT" };
  const b64 = (s: string) => Buffer.from(s).toString("base64url");
  const signatureInput = `${b64(JSON.stringify(header))}.${b64(JSON.stringify(payload))}`;
  const sign = createSign("RSA-SHA256");
  sign.update(signatureInput);
  const signature = sign.sign(serviceAccountJson.private_key, "base64url");
  const jwt = `${signatureInput}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${t}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function main() {
  const keySource =
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY ||
    (process.env.GOOGLE_APPLICATION_CREDENTIALS &&
      readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"));
  if (!keySource) {
    console.error("Set FIREBASE_SERVICE_ACCOUNT_KEY (JSON string) or GOOGLE_APPLICATION_CREDENTIALS (path to JSON).");
    process.exit(1);
  }
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const serviceAccount = keyPath
    ? JSON.parse(readFileSync(keyPath, "utf8"))
    : JSON.parse(keySource);

  const rulesContent = readFileSync(RULES_PATH, "utf8");
  const token = await getAccessToken(serviceAccount);

  // 1) Create ruleset
  const createRes = await fetch(`${RULES_API}/projects/${PROJECT_ID}/rulesets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: {
        files: [{ name: "firestore.rules", content: rulesContent }],
      },
    }),
  });
  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Create ruleset failed: ${createRes.status} ${err}`);
  }
  const ruleset = (await createRes.json()) as { name: string };
  console.log("Created ruleset:", ruleset.name);

  // 2) Update release for Firestore (default database)
  const releaseName = `projects/${PROJECT_ID}/releases/cloud.firestore`;
  const patchRes = await fetch(`${RULES_API}/${releaseName}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      release: { name: releaseName, rulesetName: ruleset.name },
      updateMask: "rulesetName",
    }),
  });
  if (!patchRes.ok) {
    const err = await patchRes.text();
    throw new Error(`Update release failed: ${patchRes.status} ${err}`);
  }
  console.log("Release updated. Firestore rules are live.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
