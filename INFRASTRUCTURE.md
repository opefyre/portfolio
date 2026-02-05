# Infrastructure & Operations

## Tech Stack

### Frontend Framework
- **Next.js 16.1.6** - React framework with static export
- **React 19.2.3** - Latest React
- **TypeScript 5** - Type safety

### Styling & Animations
- **Tailwind CSS 4** - Utility-first CSS framework
- **Three.js 0.182.0** - 3D graphics engine
- **@react-three/fiber 9.5.0** - React renderer for Three.js
- **@react-three/drei 10.7.7** - Three.js helpers
- **GSAP 3.14.2** - Animation library with ScrollTrigger
- **Framer Motion 12.31.2** - React animations

### Fonts
- **Space Grotesk** - Body text (via Google Fonts)
- **Orbitron** - Display headings (via Google Fonts)

---

## Hosting & Deployment

### Firebase Hosting
- **Project ID:** `abosh-portfolio`
- **Project Number:** `543912616090`
- **Live URL:** https://abosh-portfolio.web.app
- **Service Account:** `firebase-adminsdk-fbsvc@abosh-portfolio.iam.gserviceaccount.com`
- **Credentials File:** `abosh-portfolio-d6eeb942eef4.json` (gitignored)

### Deployment Process
```bash
# Build static export
npm run build

# Deploy to Firebase
npm run deploy
# or
firebase deploy --only hosting
```

### Build Output
- Output directory: `out/`
- Total files: 42 static files
- Build time: ~2 seconds
- Export type: Static HTML/CSS/JS

---

## Repository

### GitHub
- **Repository:** https://github.com/aboshifb/portfolio
- **Branch:** `main`
- **Visibility:** Private

### Git Configuration
- **Author:** Abolfazl Shirkavand
- **Email:** abolfazl.shirkavand73@gmail.com

---

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Runs on http://localhost:3000

### Build for Production
```bash
npm run build
```
Generates static export in `out/` directory

### Lint
```bash
npm run lint
```

---

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero/             # 3D hero section
│   ├── Navigation/       # Navbar
│   ├── About/            # About section
│   ├── Experience/       # Timeline
│   ├── Skills/           # Skills grid
│   ├── Projects/         # Projects showcase
│   ├── Contact/          # Contact section
│   └── shared/           # Shared components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & data
├── firebase.json         # Firebase config
├── .firebaserc          # Firebase project
├── next.config.ts       # Next.js config
└── tailwind.config.ts   # Tailwind config
```

---

## Environment & Security

### Ignored Files (.gitignore)
- `node_modules/`
- `.next/`
- `out/`
- Service account JSON: `abosh-portfolio-d6eeb942eef4.json`
- `.firebase/`
- `.env*`

### Firebase Service Account
- **Location:** Project root (gitignored)
- **Usage:** Deployment authentication
- **Format:** JSON key file

---

## Performance

### Static Export
- No server-side rendering
- All pages pre-rendered at build time
- Full client-side interactivity

### Assets
- Optimized images (unoptimized in config for static export)
- Code splitting via Next.js
- CSS bundling via Tailwind

### Caching
- Static assets cached with max-age header
- JavaScript and CSS files: 1 year cache
- Images: 1 year cache

---

## Dependencies

### Production
- `next`: 16.1.6
- `react`: 19.2.3
- `react-dom`: 19.2.3
- `three`: 0.182.0
- `@react-three/fiber`: 9.5.0
- `@react-three/drei`: 10.7.7
- `gsap`: 3.14.2
- `framer-motion`: 12.31.2

### Development
- `typescript`: ^5
- `@types/node`: ^20
- `@types/react`: ^19
- `@types/react-dom`: ^19
- `@types/three`: 0.182.0
- `tailwindcss`: ^4
- `@tailwindcss/postcss`: ^4
- `eslint`: ^9
- `eslint-config-next`: 16.1.6
- `firebase-tools`: Latest

---

## Configuration Files

### next.config.ts
- Static export enabled (`output: 'export'`)
- Image optimization disabled (required for static export)
- Trailing slashes enabled

### tailwind.config.ts
- Custom color palette (neon blue, purple, pink, green)
- Custom animations (float, glow, shimmer)
- Extended font families

### firebase.json
- Hosting configuration
- Public directory: `out`
- Rewrites for SPA routing
- Cache headers for static assets

---

## Contact Information

**Owner:** Abolfazl Shirkavand  
**Email:** abolfazl.shirkavand73@gmail.com  
**Phone:** +351 964 450 951  
**Location:** Lisbon, Portugal  
**LinkedIn:** https://www.linkedin.com/in/abolfazl-shirkavand/
