# Turnstile setup guide

Follow these steps once. After that, the contact form will get a token automatically (no "paste token" field).

---

## 1. Cloudflare Turnstile (get Site Key and Secret Key)

1. **Open Turnstile in the Cloudflare dashboard**  
   Go to: **https://dash.cloudflare.com/** → sign in → in the left sidebar open **Turnstile**.

   Direct link (replace `:account` with your account ID if needed):  
   **https://dash.cloudflare.com/?to=/:account/turnstile**

2. **Create a widget**
   - Click **Add widget** (or **Create**).
   - **Widget name:** e.g. `Portfolio contact form`.
   - **Domain(s):** Add the domains where the site runs, for example:
     - `localhost` (for local dev)
     - Your production domain, e.g. `your-project.web.app` or your custom domain
   - **Widget mode:** Choose one:
     - **Managed** – small checkbox (one click).
     - **Invisible** – no visible widget; challenge runs in the background.
   - Click **Create**.

3. **Copy both keys**
   - **Site key** – public, used in the frontend (you’ll put this in GitHub and/or `.env.local`).
   - **Secret key** – private, used only on the server (you’ll set this in Firebase and optionally in GitHub).

   Store the **secret key** somewhere safe; you’ll need it for Firebase and optionally for GitHub.

---

## 2. GitHub Secrets (for the site key used at build time)

The Next.js app needs the **site key** at **build time** so it can be embedded in the client. Add it as a repository secret:

1. Open the repo: **https://github.com/opefyre/portfolio**
2. Go to **Settings** → **Secrets and variables** → **Actions**.
3. Click **New repository secret**.
4. **Name:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  
   **Value:** paste your Turnstile **site key** (not the secret).
5. Save.

CI already uses this secret in the build step (see `.github/workflows/ci-cd.yml`). No need to add the secret key here for the frontend; the **secret key** is only for the backend (Firebase, below).

---

## 3. Firebase (Secret Key for the Cloud Function)

Your Cloud Function verifies the token using **TURNSTILE_SECRET_KEY**. Set it in Firebase:

**Option A – Firebase Console (simplest)**

1. Open [Firebase Console](https://console.firebase.google.com/) → your project → **Functions**.
2. Go to the **Configuration** tab (or **Environment variables** / **Secrets** depending on UI).
3. Add an environment variable or secret: name **`TURNSTILE_SECRET_KEY`**, value = your Turnstile **secret key**.
4. Redeploy the function: run `firebase deploy --only functions` from the project root.

**Option B – Firebase CLI (Secret Manager)**

```bash
firebase functions:secrets:set TURNSTILE_SECRET_KEY
# When prompted, paste your Turnstile secret key.
firebase deploy --only functions
```

If the function still can’t see the secret (e.g. you use Secret Manager), the code in `functions/src/index.ts` may need to be updated to use Firebase’s `defineSecret()` and pass it into the function options. For most setups, Option A or B is enough.

---

## 4. Local development

Create or edit `.env.local` in the project root:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
```

Use the same **site key** as in GitHub. Do **not** put the secret key in `.env.local` (it’s only for the backend).

---

## Summary

| Key              | Where it’s used        | Where to set it                          |
|------------------|------------------------|------------------------------------------|
| **Site key**     | Next.js (contact page) | GitHub secret `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `.env.local` |
| **Secret key**   | Cloud Function only    | Firebase (e.g. `functions:secrets:set`)  |

After Cloudflare is set up, GitHub has the site key secret, and Firebase has the secret key, the contact form will work without any “paste token” field.
