import * as admin from 'firebase-admin';
import { personalInfo, experiences, projects, education, certifications, skills, elixiaryVenture } from '../lib/data';
import * as fs from 'fs';
import * as path from 'path';

// Load Service Account
// We expect the json file in root
const SERVICE_ACCOUNT_PATH = path.resolve(process.cwd(), 'abosh-portfolio-d6eeb942eef4.json');

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`Service account not found at: ${SERVICE_ACCOUNT_PATH}`);
    process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function seed() {
    console.log('🌱 Starting Database Seed...');

    // 1. Meta (Single Documents)
    console.log('... Seeding Meta');
    await db.collection('meta').doc('personalInfo').set(personalInfo);
    await db.collection('meta').doc('elixiaryVenture').set(elixiaryVenture);

    // 2. Experiences
    console.log('... Seeding Experiences');
    const expBatch = db.batch();
    // Clear existing? For now we just overwrite by ID if we had IDs, but we don't.
    // We will generate IDs based on company/title to be idempotent
    for (const exp of experiences) {
        const id = exp.company.toLowerCase().replace(/\s+/g, '-');
        const ref = db.collection('experiences').doc(id);
        expBatch.set(ref, exp);
    }
    await expBatch.commit();

    // 3. Projects
    console.log('... Seeding Projects');
    const projBatch = db.batch();
    for (const proj of projects) {
        const id = proj.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
        const ref = db.collection('projects').doc(id);
        projBatch.set(ref, proj);
    }
    await projBatch.commit();

    // 4. Education
    console.log('... Seeding Education');
    const eduBatch = db.batch();
    for (const edu of education) {
        const id = (edu.degree + '-' + edu.institution).toLowerCase().replace(/\s+/g, '-').substring(0, 50);
        const ref = db.collection('education').doc(id);
        eduBatch.set(ref, edu);
    }
    await eduBatch.commit();

    // 5. Certifications
    console.log('... Seeding Certifications');
    const certBatch = db.batch();
    for (const cert of certifications) {
        const id = cert.name.toLowerCase().replace(/\s+/g, '-');
        const ref = db.collection('certifications').doc(id);
        certBatch.set(ref, cert);
    }
    await certBatch.commit();

    // 6. Skills
    console.log('... Seeding Skills');
    const skillBatch = db.batch();
    for (const skill of skills) {
        const id = skill.category.toLowerCase().replace(/\s+/g, '-');
        const ref = db.collection('skills').doc(id);
        skillBatch.set(ref, skill);
    }
    await skillBatch.commit();

    console.log('✅ Seeding Complete!');
}

seed().catch(console.error);
