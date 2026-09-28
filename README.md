# abosh.io

The personal site of Abolfazl Shirkavand (Abosh): a few great works, real numbers, and a blog.

The signature element is **the Abosh Lens**, a real-time glass object rendered with WebGL. The same
object travels through the site and refracts what is actually in the scene behind it:

| Where | What the lens does |
| --- | --- |
| Hero | Sits large beside the name, over an engraved plate. It reacts to pointer position and velocity and to scroll, and deforms slowly while idle. |
| Work | Rides the corner of each featured screenshot and refracts it. The screenshots are WebGL planes, not DOM images. Below them, an index of more work: hovering a row brings its screenshot up as a WebGL card that trails the cursor. |
| Results | Shows the "before": move it over "2 months" and the glass shows "5 months", struck through. Pointer, touch and keyboard focus all move it. |
| Case studies, About | Sits on the hero image and refracts it. |
| Footer | Returns small and dark. |

Product screenshots are WebGL planes synced to their DOM boxes in the same frame. They reveal with an
uneven light front, bend with scroll speed, press toward the pointer, and carry parallax. Clicking a
work flies the same image into the case study hero while the page content fades and re-forms.

---

## Run it locally

Requirements: **Node 22** (Next 16 needs 20.9 or later) and npm. The career list on About is read from
Firestore **at build time**, so you need read access to the `abosh-portfolio` Firebase project.

```bash
# 1. Install
npm ci

# 2. Authenticate once (Application Default Credentials)
gcloud auth application-default login
gcloud auth application-default set-quota-project abosh-portfolio

# 3. Point the app at those credentials
cat > .env.local <<'EOF'
GOOGLE_APPLICATION_CREDENTIALS=/Users/<you>/.config/gcloud/application_default_credentials.json
GOOGLE_CLOUD_PROJECT=abosh-portfolio
EOF

# 4. Develop
npm run dev            # http://localhost:3000
```

CI uses `FIREBASE_SERVICE_ACCOUNT_KEY` (a service-account JSON string) instead of ADC.

### Production build (static export)

Export both variables in the same shell command as the build, so every build worker sees them:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=$HOME/.config/gcloud/application_default_credentials.json \
       GOOGLE_CLOUD_PROJECT=abosh-portfolio && npm run build
```

The site is written to `out/`. To preview it with the real hosting headers (CSP, redirects, 404):

```bash
npx firebase-tools emulators:start --only hosting --project abosh-portfolio
```

### Checks

```bash
npm run lint           # ESLint (next/core-web-vitals + typescript)
npx tsc --noEmit       # type-check
npm run verify:headers # security and cache headers on the live site
```

`/lab/lens` is a development-only bench for the lens. Production builds leave it out (it 404s).

---

## Editing content

| What | Where |
| --- | --- |
| Hero line, all works (copy, stats, screenshots; `featured: true` for a full homepage block, otherwise the hover index), results, About text, closing line | `content/site.ts` |
| Notes | `content/notes/*.md` (frontmatter: `title`, `date`, `summary`, `status`) |
| Career list on About | Firestore `experiences` collection |

Rules: every fact traces back to Firestore, LinkedIn or an asset in this repo. Real numbers over
adjectives. No filler copy, no em dashes. Merging to `main` rebuilds and deploys.

---

## How it's built

**Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind 4 (tokens only) ·
three.js, React Three Fiber, drei · Motion · GSAP ScrollTrigger · Lenis · Base UI · Firebase Hosting.
Type: Funnel Display for headlines and figures, Funnel Sans for text.

```
app/                   /, /work/[slug] (10), /notes, /notes/[slug], /about, 404, sitemap, robots, OG image
components/lens/       the WebGL scene: one persistent canvas for the whole site
  LensStage.tsx        canvas, anchor selection and spring physics, render loop on GSAP's ticker
  AboshLens.tsx        deformed icosahedron + MeshTransmissionMaterial, GPU noise deformation
  LensRenderer.tsx     custom transmission pass (buffer: scene + hidden layer, then screen)
  GLImagesLayer.tsx    screenshot planes: reveal, scroll bend, pointer press, parallax, page-to-page flight
  FragmentsLayer.tsx   WebGL text for the results; the "before" exists only inside the glass
  anchors.ts           DOM anchors telling the one lens where to be, how big, how thick, how dark
components/media/      GLImage: DOM <img> that hands over to a WebGL plane
components/motion/     SplitChars (letter choreography), CountUp (real figures)
components/home/       Hero, Works, WorksIndex, Results, HomeNotes
components/shell/      Lenis + GSAP ticker, page transitions, hydration-safe reduced motion
```

**No scroll shimmer.** Lenis, ScrollTrigger and the WebGL render all run on GSAP's ticker in that
order, so the DOM and the planes behind it always describe the same scroll position. Nothing on the
page changes layout on hover (the old site did, which caused jumps while scrolling).

**One object across pages.** The canvas lives in the root layout and never unmounts. The lens
springs to each page's anchor; a clicked screenshot keeps its WebGL plane and flies into the next
page's hero while the DOM fades out and back in.

---

## Accessibility and fallbacks

- **Reduced motion:** native scrolling (no Lenis), a still lens, no scroll-linked motion, images
  appear without reveals, instant page changes.
- **Reduced transparency / increased contrast:** glass surfaces become solid.
- **Keyboard:** skip link, visible focus, every lens figure is a real button (focus moves the lens
  onto it, and the before/after values are in its accessible name).
- **Touch devices:** screenshots stay as DOM images (native touch scrolling is asynchronous), with a
  CSS reveal. The lens is still WebGL.
- **No WebGL:** a still render of the lens (`public/lens/lens-still.webp`, captured from the real
  renderer) in the hero, DOM images, and the figures printed with their old values struck through.
- axe (WCAG 2.1 AA and best practices) passes on every page.

## Performance

- One shared canvas. It renders only while an anchor or image is near the viewport.
- Adaptive DPR via `PerformanceMonitor`; touch, small-screen and low-memory devices get a lighter
  lens (half the geometry, 4 transmission samples, smaller buffer, 1.5x DPR cap).
- three.js loads after first paint; text content never waits for it.
- Wheel-scrolling the whole homepage on the production build: every frame 16.7 ms, zero layout
  shifts.

## Hosting and security

`firebase.json` serves `out/` with a strict CSP. One deliberate allowance: `script-src … blob:` and
`worker-src 'self' blob:`, because troika (WebGL text) builds glyphs in a worker loaded from a
`blob:` URL.

Redirects: `/contact` and `/resume.pdf` to `/about/`; `/work` and `/archive` to `/#work`. Unknown
paths get the real 404 page.

## Deploy

GitHub Actions lints and builds every PR; merging to `main` deploys to Firebase Hosting
(`abosh-portfolio`). The only secret it needs is `FIREBASE_SERVICE_ACCOUNT_KEY`.

Fonts: Funnel Display and Funnel Sans (SIL OFL; the WebGL copy and its licence are in
`public/fonts/`).
