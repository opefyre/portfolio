# Portfolio

Personal portfolio website showcasing Digital Transformation and Process Excellence expertise.

**Live:** [https://abosh-portfolio.web.app](https://abosh-portfolio.web.app)

## Deployment header management

Production caching and security headers are managed in `firebase.json` under `hosting.headers`.
Treat this file as the source of truth for deployed static content and route responses.
`middleware.ts` can remain as a local/dev fallback, but deploy-time header changes must be made in `firebase.json`.


### CSP rollout mode

- Production hosting (`**`) enforces `Content-Security-Policy` from `firebase.json`.
- Staging routes (`/staging/**`) emit `Content-Security-Policy-Report-Only` so violations can be collected before enforcement.
- For local/staging Next.js runtime checks, set `CSP_REPORT_ONLY=true` to switch middleware CSP to report-only.

### Verify deployed headers

Run the production header check after deploy (or in CI):

```bash
npm run verify:headers
```

You can also provide a target URL explicitly:

```bash
./verify-hosting-headers.sh https://your-site.web.app
```

## Secure inquiry intake pipeline

Inquiry writes now flow through a backend-only Cloud Function (`functions/src/index.ts`) instead of direct client Firestore writes.

### Required environment variables

Client (`.env.local`):
- `NEXT_PUBLIC_INTAKE_ENDPOINT` - HTTPS URL of `intakeInquiry` function.
- `NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY` - App Check reCAPTCHA v3 key.

Functions runtime config/secrets:
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret for server-side CAPTCHA verification.

### Security controls implemented

- Firestore rules deny all direct client writes to `inquiries`.
- App Check token verification on backend (`X-Firebase-AppCheck`).
- CAPTCHA verification (Turnstile) on backend.
- Request schema validation + body size limits.
- IP + fingerprint rate limiting persisted in Firestore.
- Structured function logs for monitoring and alerting.

See `monitoring/intake-alerting.md` for alert policy guidance.

## Firestore public/private profile schema

Public profile fields now live in `meta/personalInfoPublic` (`name`, `title`, `summary`, `location`, `linkedin`).
Sensitive contact fields live in `privateMeta/personalContact` (`email`, `phone`) and are not readable by clients.

To migrate existing data:

```bash
npm run migrate:personal-info
```

Requires `FIREBASE_SERVICE_ACCOUNT_KEY` in the environment.
