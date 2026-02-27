import * as admin from "firebase-admin";

interface PersonalInfoDoc {
  name?: string;
  title?: string;
  summary?: string;
  location?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is required.");
  }
  return JSON.parse(raw);
}

async function run() {
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(getServiceAccount()) });
  }

  const db = admin.firestore();
  const sourceRef = db.collection("meta").doc("personalInfo");
  const publicRef = db.collection("meta").doc("personalInfoPublic");
  const privateRef = db.collection("privateMeta").doc("personalContact");

  const sourceSnap = await sourceRef.get();
  if (!sourceSnap.exists) {
    console.log("No source meta/personalInfo found. Nothing to migrate.");
    return;
  }

  const source = sourceSnap.data() as PersonalInfoDoc;

  const publicPayload = {
    name: source.name ?? "",
    title: source.title ?? "",
    summary: source.summary ?? "",
    location: source.location ?? "",
    linkedin: source.linkedin ?? "",
    migratedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const privatePayload = {
    email: source.email ?? "",
    phone: source.phone ?? "",
    migratedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.runTransaction(async tx => {
    tx.set(publicRef, publicPayload, { merge: true });
    tx.set(privateRef, privatePayload, { merge: true });
    tx.update(sourceRef, {
      email: admin.firestore.FieldValue.delete(),
      phone: admin.firestore.FieldValue.delete(),
      migratedTo: "meta/personalInfoPublic + privateMeta/personalContact",
      migratedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  console.log("Migrated personalInfo -> personalInfoPublic/privateMeta and removed sensitive fields from meta/personalInfo.");
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
