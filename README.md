# abosh.io

The personal site of Abolfazl Shirkavand (Abosh): products, systems and companies.

The signature element is **the Abosh Lens**, a real-time glass object rendered with WebGL. It is a
deformed icosahedron with physical transmission, and it refracts content that actually exists in its
scene. The same object follows you through the site:

| Where | What the lens does |
| --- | --- |
| Home hero | Sits large beside the name, refracting an engraved calibration plate. It reacts to pointer position and velocity, to scroll, and deforms slowly while idle. |
| Things I'm building | Moves next to Vrolen, smaller and quieter. |
| Outside the job description / About | Becomes a literal lens. Each phrase has a second line rendered *only* into the glass's transmission buffer, so you can read it only through the lens (pointer, drag, tap or keyboard focus). |
| Case studies, Work, Archive | Settles smaller beside the page title. |
| Closing | Returns small, darker and simpler. |

The navigation is a Liquid Glass pill. It uses backdrop blur and saturation, specular highlights that
follow the pointer, and (in Chromium) real SVG displacement refraction. It adapts its tint to what's
underneath, contracts on scroll with shared-layout motion, and becomes an island on mobile.

---

## Run it locally

Requirements: **Node 22** (Next 16 needs ≥ 20.9) and npm. Content is read from Firestore **at build
time**, so you need read access to the `abosh-portfolio` Firebase project.

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
npm run dev            # → http://localhost:3000
```

Instead of ADC you can also set `FIREBASE_SERVICE_ACCOUNT_KEY` to a service-account JSON string, which
is what CI does.

### Production build (static export)

Export the two variables in the same shell command as the build, so every build worker sees them:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=$HOME/.config/gcloud/application_default_credentials.json \
       GOOGLE_CLOUD_PROJECT=abosh-portfolio && npm run build
```

The site is written to `out/` (70 static pages). To preview it with the real hosting headers
(CSP, redirects, 404):

```bash
npx firebase-tools emulators:start --only hosting --project abosh-portfolio
```

### Other commands

```bash
npm run lint           # ESLint (next/core-web-vitals + typescript)
npx tsc --noEmit       # type-check
npm run verify:headers # check security/cache headers on the live site
```

`/lab/lens` is a development-only bench for tuning the lens in isolation. Production builds exclude it,
and the route returns a 404.

---

## Editing content

| What | Where |
| --- | --- |
| Projects, experience, education, certifications, profile | Firestore (`projects`, `experiences`, `education`, `certifications`, `meta/personalInfoPublic`). Read at build time by `lib/data.ts`. |
| Homepage curation: hero, featured products, the six problems, path stages, lens fragments, **Now**, closing line | `content/site.ts` |
| Case-study galleries, display names, the Vrolen loop | `content/work.ts` |
| Notes | `content/notes/*.md` (frontmatter: `title`, `date`, `summary`, `status`) |

Rule for all of it: every fact must trace back to Firestore, LinkedIn or an asset in this repo. Invent
no metrics, clients or quotes. Content changes need a rebuild. Merging to `main` rebuilds and deploys
the site.

---

## How it's built

**Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind 4 (tokens and
utilities only) · three.js + React Three Fiber + drei · Motion · GSAP ScrollTrigger · Lenis · Base UI ·
Firebase Hosting.

```
app/                    routes: /, /work, /work/[slug], /archive, /notes, /notes/[slug], /about, 404,
                        sitemap.xml, robots.txt, OG image
components/lens/        the Abosh Lens
  LensStage.tsx         one persistent <Canvas>, anchor selection + spring physics, demand frameloop
  AboshLens.tsx         geometry + MeshTransmissionMaterial, GPU noise deformation (onBeforeCompile)
  LensRenderer.tsx      custom transmission pass: renders the buffer (scene + hidden layer), then the screen
  layers.ts             DEFAULT / SURFACE (screen only) / THROUGH (glass only)
  anchors.ts            DOM anchors that tell the single lens where to be, how big, how dark, how thick
  FragmentsLayer.tsx    troika SDF text mirrored from DOM boxes (surface text + hidden text)
  CalibrationPlate.tsx  engraved plate the lens refracts
components/glass/       Liquid Glass surface (blur, specular, Chromium displacement refraction)
components/nav/         Liquid Glass navigation
components/shell/       Lenis + GSAP ticker, View Transitions, hydration-safe reduced motion
components/home/        homepage sections
components/work/        problem list, archive filter
styles/home.css         homepage section styles
styles/pages.css        inner-page styles
```

**One canvas, many places.** The lens canvas is fixed behind the page. Each section places an invisible
`<LensAnchor>`. Every frame the stage scores the visible anchors, picks one with hysteresis, and springs
the same WebGL object to it. Nothing is re-mounted between sections or routes.

**Real refraction of real content.** The lens uses a custom transmission buffer rather than drei's
internal pass. The buffer contains the plate plus a `THROUGH` layer that the screen never renders. That
is how the hidden lines in *Outside the job description* and *About* are only visible through the glass.

**Transitions.** Project → case study uses the View Transitions API (`view-transition-name:
work-<slug>`), so the product image morphs into the case-study hero. Browsers without the API, or with
reduced motion, navigate normally.

---

## Accessibility & fallbacks

- **Reduced motion:** the lens becomes a still object (no idle deformation, springs snap), scroll-linked
  parallax and 3D settle are disabled, the horizontal Path pin becomes a grid, and View Transitions are
  skipped.
- **Reduced transparency / increased contrast:** glass surfaces become solid.
- **Keyboard:** skip link, visible focus everywhere, and lens fragments are real buttons. Focusing one
  moves the lens there, and the hidden line is exposed to screen readers. The Path dialog traps focus
  and returns it on close.
- **No WebGL** (no WebGL2, or the context is lost): a still render of the lens
  (`public/lens/lens-still.webp`, captured from the real renderer) replaces it in the hero. Fragment text
  becomes visible DOM with each hidden line printed underneath. This is the *only* place a static lens
  image is used.
- Automated checks (axe, WCAG 2.1 AA + best practices) pass on every page type.

## Performance

- One shared canvas, `frameloop="demand"`. Frames are only requested while an anchor is near the
  viewport, or while something is settling.
- Adaptive DPR: `PerformanceMonitor` steps resolution down when frames drop. Touch, small-screen and
  low-memory devices get a lighter lens: half the geometry detail, 4 transmission samples instead of 8,
  a smaller transmission buffer, and a 1.5× DPR cap.
- three.js loads after first paint through a client-only dynamic import. The text content renders
  without it.
- Measured on the production build while scrolling the full homepage for 12 s: p95 frame time ≈ 3 ms,
  3 frames over 33 ms (Apple-silicon GPU, headless Chrome).

## Hosting & security

`firebase.json` serves `out/` with a strict CSP. Two additions are deliberate:

- `script-src … blob:` and `worker-src 'self' blob:`: troika (WebGL text) builds glyph atlases in a
  Web Worker that loads its code from a `blob:` URL.
- `style-src … 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='`: the hash of an **empty**
  `<style>`. Motion's `AnimatePresence mode="popLayout"` inserts an empty style element and fills it via
  CSSOM. Any style with content is still blocked.

Old URLs redirect: `/contact` → `/about/` and `/resume.pdf` → `/about/`. Unknown paths get the real 404
page (there is no catch-all rewrite).

## Deploy

GitHub Actions (`.github/workflows/ci-cd.yml`) lints and builds every PR. Merging to `main` builds and
deploys to Firebase Hosting (`abosh-portfolio`, live channel). The only secret it needs is
`FIREBASE_SERVICE_ACCOUNT_KEY`.

Fonts: Funnel Display, Funnel Sans, Newsreader and Fragment Mono (SIL OFL; the WebGL copies and their
licences are in `public/fonts/`).
