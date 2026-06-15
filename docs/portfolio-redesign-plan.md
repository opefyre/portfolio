# Portfolio Redesign — Working Plan

> Locked decisions from the audit + grilling session. This is the source of truth for the dev-mode rebuild. Once signed off, execution proceeds in **Path V** order (visible cuts → hero → foundations → projects → a11y/perf).

---

## 1. Locked decisions

| # | Decision | Choice | Implication |
|---|---|---|---|
| 1 | **Primary audience** | Recruiters / talent partners | Scan-speed > storytelling. Desktop hero matters most. Keyword-driven copy. |
| 2 | **Primary conversion** | Download Résumé (PDF) + Connect on LinkedIn | Contact form de-emphasized. Need a maintained `/public/resume.pdf`. |
| 3 | **Target role band** | Head / Director / VP — Digital Innovation & Transformation | Lead hero with *impact + scope*, not a single job title. |
| 4 | **Hero signature metric** | % cycle-time / process improvement | Six Sigma / process-excellence framing. **Actual number TBD by user.** |
| 5 | **Elixiary venture** | Stay prominent — accept founder-flight-risk filter | Featured section remains. Tradeoff acknowledged: some corp recruiters will read this as flight risk; others as differentiator. |
| 6 | **Style cuts** | Cut cyberpunk green terminal + macOS browser chrome | 4 cohabiting moods → 2. Largest single coherence lift. |
| 7 | **Working model** | Dev-mode iteration until 100% aligned → continuous monitoring phase | No prod deploy until aligned. Foundations work pays forward. |
| 8 | **Content source** | New Firestore fields (Path A) | Adds `headline`, `signatureMetric{Value,Label}` to `meta/personalInfoPublic`; adds `outcomeShort` and optional `thumbnail` to `projects/*`. |
| 9 | **Sequencing** | Working doc → sign-off → Path V (visible cuts first) | This doc is the sign-off artifact. |

---

## 2. What gets killed

Cutting deliberately. Each removal is a vote *for* coherence and scan-speed.

- **Cyberpunk green terminal** in `SummaryStats` (the `>_` block with `#00ff41`). Replaced with a brand-aligned variant.
- **macOS browser-chrome dots + URL bar** on the Elixiary screenshot card. Replaced with clean bezel-less frame.
- **Rotating identity ticker** (12 phrases cycling every 3s in `SummaryStats`). Replaced with a single positioning line from Firestore `headline`.
- **Hard-coded stats** in `SummaryStats` (`"10+", "70+", "7", "10+"`). Replaced with computed values from passed props, plus the new `signatureMetric` lifted into the hero.
- **Hero perpetual animations**: `animate-pulse` glow, avatar float loop, conic-gradient spinning ring, scroll-bob. Reduced to one entrance reveal.
- **Hover-only Problem/Tech-Stack panel** on desktop project cards (`DesktopProjectCard`). Replaced with a default-visible `outcomeShort` line + "View case study" affordance opening the modal.
- **`alert()` failure path** in contact form. Replaced with inline `role="alert"` banner.
- **Honeypot via `className="hidden"`**. Moved to `position:absolute; left:-9999px`.
- **`CustomCursor`** (not currently mounted, but file exists). Delete or guard behind `prefers-reduced-motion` + `pointer:fine`.
- **Dead `submitInquiry`/App Check path** in `lib/firebase-client.ts`. Delete (we use the direct-Firestore path).

## 3. What stays — by intent

- **Cosmic / glassmorphism mood** (hero stars, ambient orbs, expertise terminal). Anchor aesthetic.
- **Editorial brutalist typography** (Experience timeline numbers, SectionHeader word-stagger). Counterweight.
- **Elixiary featured section**, with the browser-chrome cut and motion intensity dialed back.
- **Floating pill navigation** — refactored to use `IntersectionObserver` and update the URL hash.
- **3D star-field hero** — wrapped in `next/dynamic({ ssr:false })` and gated by `prefers-reduced-motion`.
- **Firestore as content backbone**. No data-layer migration in scope.

## 4. New Firestore fields (Path A)

```ts
// meta/personalInfoPublic — extend existing doc
interface PersonalInfoPublic {
  name: string;
  title: string;            // existing — current job title
  location: string;
  linkedin: string;
  summary: string;          // existing — repurpose or keep
  // NEW
  headline: string;         // 1-sentence positioning, ≤14 words. Hero subtitle.
  signatureMetricValue: string;  // e.g. "40%"
  signatureMetricLabel: string;  // e.g. "average cycle-time reduction across 70+ programs"
  resumeUrl: string;        // public path or absolute URL, default "/resume.pdf"
}

// projects/{id} — extend each project doc
interface Project {
  // existing: id, title, description, impact, category, problem, solution, skills
  // NEW
  outcomeShort: string;     // ≤90 chars. e.g. "Cut order-to-cash time 38% across 4 regions"
  thumbnail?: string;       // optional public path to a project image
}
```

Code changes confined to `lib/db.ts` (interface + fallback in cache fn) and the rendering components.

## 5. The execution order (Path V)

Each step is a small, reviewable commit in dev. After each, we eyeball results before moving on.

### Phase A — Visible cuts (validate direction)
1. **Cut green terminal** in `SummaryStats`. Replace with calm brand-aligned single-line role descriptor. *~30 min*
2. **Cut browser chrome** on Elixiary screenshot. Replace with bezel-less rounded frame + subtle inner ring. *~30 min*
3. **Real stats** in `SummaryStats`: compute from props (`experiences.length`, projects, positions, certs+education), add `font-variant-numeric: tabular-nums`. *~30 min*

### Phase B — Hero rebuild (biggest perception lift)
4. **Add Firestore fields** in `lib/db.ts` + a doc update in Firestore (you'll fill in `headline`, `signatureMetricValue`, `signatureMetricLabel`, `resumeUrl`). *~30 min for code; you fill content*
5. **Rebuild `DigitalHero`**: signature metric line, positioning headline (from Firestore), primary CTA "Download Résumé," secondary "Connect on LinkedIn," scope/location pills. Strip perpetual animations. *~2 h*
6. **Drop a `/public/resume.pdf`** (you supply, or I'll script a Firestore-to-PDF generator separately if you want one).

### Phase C — Foundations (invisible, pays forward)
7. **`lib/motion.ts`**: easings, durations, springs, `useReducedMotion` hook. Sweep components to import from there. *~2 h*
8. **Type scale tokens** in `globals.css`: 6-step scale as CSS vars. Sweep replacements; kill every `text-[10px]` to a 12px-floor mono utility. Tabular-nums utility. *~1.5 h*
9. **Contrast fix**: promote `text-tertiary` to `#94a3b8`, `text-secondary` to `#d4dae3`. Validate AA against `bg-section-tinted`. *~30 min*

### Phase D — Projects upgrade
10. **Add `outcomeShort` and optional `thumbnail` to project docs in Firestore** (you fill in). Update `lib/db.ts` interface and migrate. *~30 min code; you fill content*
11. **Rebuild `DesktopProjectCard`**: default-visible outcome line, thumbnail, soften 3D hover (12°→4°, scale 1.05→1.02), no more hover-only panel. *~2 h*
12. **Modal a11y**: focus trap, `Esc` close, return focus to invoking card, `role="dialog" aria-modal aria-labelledby`. *~1 h*

### Phase E — Accessibility + Contact form
13. **Skip-to-content link** in `layout.tsx`. *~10 min*
14. **`FloatingInput` focus-visible ring**. Inline validation on blur. `aria-invalid`/`aria-describedby` error linkage. *~1 h*
15. **Contact form failure UX**: replace `alert()` with `role="alert"` banner; move focus on submit success/error; honeypot to off-screen position. *~45 min*
16. **Remove dead `submitInquiry`/App Check path**. *~10 min*

### Phase F — Performance & assets
17. **`scripts/optimize-images.ts`** (sharp): generate AVIF + WebP variants for `/public/elixiary/*` and hero photo. Replace `<Image>` sources. *~1.5 h*
18. **`next/dynamic` for hero `Canvas`** with `ssr:false`. Lazy-load cobe globe and Elixiary screenshots. *~45 min*
19. **`IntersectionObserver` scroll-spy** in `FloatingNav` + update `window.location.hash` for deep-linking. *~45 min*
20. **Motion budget audit**: kill ProjectGallery's 15-particle marquee. Reduce blur-orb count. Confirm `prefers-reduced-motion` short-circuits R3F. *~45 min*

### Phase G — Monitoring (continuous)
- After we agree it's ready, prod deploy.
- Periodic Lighthouse + Pa11y + a fresh-eyes review. Land small fixes in the existing pattern.

**Total estimate: 16–22 hours of focused dev time** spread across as many sessions as you want.

## 6. Open items I need from you

Before Phase B kicks off:
- [ ] Headline positioning sentence (≤14 words). I'll draft 3 options if you want; you pick or edit.
- [ ] Signature cycle-time metric — actual value + label.
- [ ] PDF résumé in `/public/resume.pdf` (or your call to script-generate one).

Before Phase D kicks off:
- [ ] One `outcomeShort` line per project (≤90 chars each). I'll draft from the existing `impact` field if you'd like; you approve.
- [ ] Optional: thumbnail image per project.

## 7. Explicitly out of scope

- Light mode (brand is dark; recruiters mostly view on screen, not print).
- Blog / writing section.
- More 3D effects.
- i18n.
- Replacing Firestore.
- Re-architecting Firebase Functions or rules (current setup is solid).

## 8. Risks acknowledged

- **Elixiary prominence ↔ corporate-recruiter read**: deliberately keeping the section visible costs you some conservative roles. You said yes; logging the tradeoff.
- **Path A Firestore fields require a one-time content fill**: if you don't fill in `headline`/`signatureMetric`, the hero will fall back to current state via the legacy field reader. Not blocking but visible.
- **Dev-mode iteration depends on you actually running `npm run dev`** between my changes. If that loop is slow for you, tell me and I'll bundle larger commits.

---

**Sign-off question:** anything above you'd change, remove, or add before I start Phase A?
