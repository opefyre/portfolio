# Security Audit (2026-02-25)

## Scope
- Next.js app configuration and middleware hardening.
- Firestore client write path for `/contact` inquiries.
- Firestore security rules.
- Dependency vulnerability scan attempt.

## Findings

### 1) Inquiries collection allowed unrestricted writes (**High**)
**Previous risk:** Firestore rules allowed any write operation (`create`, `update`, `delete`) with any payload shape for `inquiries`. This enables spam, oversized payload abuse, and tampering with existing records.

**Fix applied:**
- Restricted writes to `create` only.
- Enforced strict schema for allowed fields (`name`, `email`, `message`, `createdAt`).
- Added type and length validation; blocked updates/deletes.

## 2) Client submission payload trusted raw form data (**Medium**)
**Previous risk:** Entire `FormData` object was sent directly to Firestore. Attackers could inject arbitrary extra fields.

**Fix applied:**
- Explicit allowlist payload mapping in client code.
- Trimmed and normalized user-controlled fields.
- Switched `createdAt` to Firestore `serverTimestamp()` to reduce timestamp spoofing risk.

## 3) Missing basic anti-bot controls on contact form (**Medium**)
**Previous risk:** No friction on automated submissions.

**Fix applied:**
- Added honeypot field (`website`) and reject logic.
- Added client-side length bounds for name/email/message inputs.

## 4) Incomplete security headers (**Medium**)
**Previous risk:** Security headers were present but lacked CSP and several defense-in-depth headers.

**Fix applied:**
- Added strict `Content-Security-Policy` baseline.
- Added `X-DNS-Prefetch-Control`, `X-Permitted-Cross-Domain-Policies`, and `Cross-Origin-Resource-Policy`.

## Dependency scanning note
`npm audit` could not query advisories in this environment due to a 403 from the npm advisory endpoint, so package vulnerability status could not be fully verified from CI shell.

## Additional recommendations (not yet implemented)
1. Add a server-side endpoint (or Cloud Function) for contact submissions with:
   - IP-based rate limiting.
   - CAPTCHA/Turnstile verification.
   - Structured logging and abuse analytics.
2. Add Firestore TTL/index strategy for `inquiries` retention.
3. Add automated security checks in CI:
   - `npm audit --production` (or SCA alternative).
   - Semgrep or CodeQL.
4. Publish incident response contact and a `SECURITY.md` policy.
