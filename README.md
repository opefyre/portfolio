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
