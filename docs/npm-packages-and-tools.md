# NPM Packages, Tools, and Dependencies

Audit of `package.json` for the **newklikcy** Vite + React + TypeScript SPA. **Source of truth** for dependency and dead-code cleanup (see `.cursor/rules/dependency-cleanup.mdc`).

Usage was verified by searching imports under `src/`, `server/`, `scripts/`, and config files. **Do not treat “unused” as safe to delete without `npm run build` and manual UI regression testing.**

**Last cleanup pass:** Removed verified-unused direct deps; wired Sonner to `ThemeRoot`; removed unused React Query provider and Radix toast mount; deleted dead motion/scroll files. Radix/shadcn scaffold **kept**.

**Lock file:** `package-lock.json` (npm). No `yarn.lock` or `pnpm-lock.yaml`.

---

## Project tools (non-NPM or toolchain)

| Tool | Config / entry | Role |
|------|----------------|------|
| **Vite** | `vite.config.ts`, `package.json` scripts | Dev server (port 8080), production bundle to `dist/`, `/api` proxy to contact server |
| **React 18** | `src/main.tsx`, `src/App.tsx` | UI runtime |
| **TypeScript** | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | Type-checking; app code in `src/`, Node tooling in `vite.config.ts` |
| **Tailwind CSS** | `tailwind.config.ts`, `src/index.css` | Utility-first styling, design tokens, animations |
| **PostCSS** | `postcss.config.js` | Runs Tailwind + Autoprefixer at build time |
| **ESLint 9 (flat)** | `eslint.config.js` | Lint for `**/*.{ts,tsx}` |
| **Vitest** | `vitest.config.ts`, `src/test/` | Unit tests (jsdom) |
| **React Router v6** | `src/App.tsx` | Client-side routes |
| **React Helmet Async** | `src/components/SEO.tsx`, `HelmetProvider` in `App.tsx` | Document `<head>` (title, meta, JSON-LD) |
| **shadcn-style UI** | `src/components/ui/*` | Radix primitives + Tailwind + CVA |
| **GSAP + Lenis + SplitType** | `src/lib/gsap.ts`, motion/layout components | Scroll, hero, and section animations |
| **Contact API (Node)** | `server/index.mjs` | Express + nodemailer (not bundled by Vite) |

---

## NPM scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Frontend dev server |
| `build` | `vite build` | Production static build |
| `build:dev` | `vite build --mode development` | Development-mode build |
| `preview` | `vite preview` | Serve `dist/` locally |
| `lint` | `eslint .` | ESLint across project |
| `test` | `vitest run` | Run tests once |
| `test:watch` | `vitest` | Watch mode |
| `server` | `node server/index.mjs` | Contact form API |
| `dev:all` | `concurrently` … | API + Vite together |
| `sitemap:generate` | `node scripts/generate-sitemaps.mjs` | Build sitemap from states/services |
| `sitemap:split` | `node scripts/split-sitemaps.mjs` | Split sitemap into child XML files |
| `seo:validate` | `node scripts/validate-seo.mjs` | Check `robots.txt` + `sitemap.xml` exist |

---

## Do Not Remove Without UI Regression Testing

Before removing any package listed as **Scaffold** or **Manual verify**:

1. Run `npm run build` and `npm run preview`.
2. Click through: `/`, `/contact`, `/services/custom-website-development`, a service+state+city URL, mobile nav, theme toggle, contact submit toast.
3. Confirm accordions, tooltips, and motion on homepage still work.
4. **Do not remove `@radix-ui/*`** unless you delete the matching `src/components/ui/*.tsx` and confirm no transitive imports remain.
5. **Do not remove** `postcss`, `autoprefixer`, `tailwindcss`, `vite`, `typescript`, `eslint`, `vitest`, or `@types/*` without replacing the toolchain.

---

## Production Dependency Audit Checklist

Monthly (or before each production deploy):

| Step | Command / action |
|------|------------------|
| Install lockfile | `npm install` |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Tests | `npm run test` |
| Security audit | `npm audit` (fix high/critical in direct deps) |
| Outdated review | `npm outdated` (plan upgrades, do not bulk-upgrade blindly) |
| Dependency tree | `npm ls` (unexpected duplicates) |
| Optional unused scan | `npx depcheck` (treat false positives per doc) |
| Sitemaps | `npm run sitemap:generate` && `npm run sitemap:split` |
| SEO assets | `npm run seo:validate` |
| Manual UI | Home, contact form, theme toggle, sample service/geo pages |

Document `depcheck` false positives here:

- `postcss`, `autoprefixer` — used in `postcss.config.js`
- `react-hook-form` — used by scaffold `form.tsx` even if pages use native forms
- Radix packages — used by `src/components/ui/*` scaffold not mounted on every route

---

## Scalable Cleanup Priority

| Priority | Action | Risk |
|----------|--------|------|
| P0 — Done | Remove direct deps with zero imports (`@hookform/resolvers`, `@testing-library/react`, `@tanstack/react-query`, `next-themes`) | Low after build |
| P0 — Done | Sonner uses `ThemeRoot`; single toast system (Sonner only in `App`) | Low |
| P0 — Done | Delete dead motion/scroll files; unify `MagneticButton` on `@/components/ui/MagneticButton` | Low |
| P1 | Remove `date-fns` from direct deps (may remain transitive via `react-day-picker`) | Low |
| P2 | Add real React Query usage or keep removed until API client needed | Medium |
| P3 | Prune unused `src/components/ui/*` files **then** matching Radix packages | High — full UI regression |
| P4 | Replace duplicate `MagneticButton` / shrink shadcn kit | Medium |

---

## Security Notes (summary)

| Area | Guidance |
|------|----------|
| **Secrets** | Keep `.env` gitignored; never commit SMTP passwords. Rotate if exposed. |
| **Contact API** | `express` + `zod` + rate limit in `server/index.mjs`; run API in production behind HTTPS reverse proxy. |
| **Client bundle** | `dotenv`, `express`, `nodemailer` are server-only — not imported from `src/`. |
| **Dependencies** | Run `npm audit` monthly; patch high/critical; review major upgrades in a branch. |
| **Supply chain** | Prefer `npm ci` in CI from lockfile; avoid unreviewed `npm install <pkg>`. |
| **SPA** | SEO head is client-rendered — prerender/SSR recommended for stronger crawler parity (see README). |

---

## Master dependency table

**Used?** meanings:

- **Yes** — Imported from app routes, `App.tsx`, `server/`, scripts, or required by build config.
- **Scaffold** — Only referenced inside `src/components/ui/*` (or other files) that are **not** imported by pages/`App.tsx`; kept for shadcn kit completeness.
- **No** — No import found in application or config (may still be a transitive peer).

| Package | Type | Used? | Where Used | Purpose | Safe to Remove? | Notes |
|---------|------|-------|------------|---------|-----------------|-------|
| `react` | Runtime dependency | Yes | `src/main.tsx`, all pages | UI library | No | Core — keep updated |
| `react-dom` | Runtime dependency | Yes | `src/main.tsx` (createRoot) | React DOM renderer | No | Core |
| `react-router-dom` | Runtime dependency | Yes | `src/App.tsx`, pages, `NavLink`, `Breadcrumbs` | Client routing | No | All URLs are SPA routes |
| `react-helmet-async` | SEO / metadata tool | Yes | `src/components/SEO.tsx`, `App.tsx` | Dynamic `<head>` tags | No | SEO titles, meta, JSON-LD |
| `@tanstack/react-query` | Runtime dependency | **Removed** | — | Was provider-only | — | **Removed** — re-add when using `useQuery` |
| `zod` | Form / validation tool | Yes | `src/pages/Contact.tsx`, `server/index.mjs` | Form + API validation | No | Server-side validation on API |
| `sonner` | UI library | Yes | `Contact.tsx`, `sonner.tsx`, `App.tsx` | Toast notifications | No | Themed via `ThemeRoot` |
| `lucide-react` | UI library | Yes | Pages, `Header`, `Footer`, UI icons | Icon set | No | Widely imported |
| `@fontsource-variable/syne` | Styling tool | Yes | `src/main.tsx` | Display font (variable) | No | Brand typography |
| `@fontsource/dm-sans` | Styling tool | Yes | `src/main.tsx` (400/500/700) | Body font | No | Brand typography |
| `gsap` | Animation library | Yes | `src/lib/gsap.ts`, motion, layout, `HomeStatsRow`, cursor | Timeline / scroll animations | No | Includes ScrollTrigger plugins |
| `@gsap/react` | Animation library | Yes | `FadeUp`, `SplitText` | React hooks for GSAP | No | |
| `lenis` | Animation library | Yes | `LenisGsapProvider.tsx` | Smooth scroll | No | Paired with GSAP ticker |
| `split-type` | Animation library | Yes | `src/components/motion/SplitText.tsx` | Split text for hero animations | No | |
| `class-variance-authority` | Utility library | Yes | `button`, `badge`, `alert`, `toggle`, `sidebar`, etc. | Component variants (`cva`) | No | shadcn pattern |
| `clsx` | Utility library | Yes | `src/utils/cn.ts` | Class name joining | No | |
| `tailwind-merge` | Utility library | Yes | `src/utils/cn.ts` | Merge Tailwind classes | No | Used via `cn()` everywhere |
| `tailwindcss-animate` | Styling tool | Yes | `tailwind.config.ts` plugins | `animate-in`, `accordion-down`, etc. | No | Used by UI primitives |
| `express` | Runtime dependency | Yes | `server/index.mjs` | Contact API HTTP server | No | Production mail endpoint |
| `cors` | Runtime dependency | Yes | `server/index.mjs` | CORS for `/api/contact` | No | |
| `nodemailer` | Runtime dependency | Yes | `server/index.mjs` | SMTP email | No | Hostinger mail |
| `dotenv` | Runtime dependency | Yes | `server/index.mjs`, `scripts/*.mjs` | Load `.env` | No | Not used by Vite client bundle |
| `next-themes` | UI library | **Removed** | — | Was Sonner theme | — | **Removed** — Sonner uses `useThemeMode()` |
| `react-hook-form` | Form / validation tool | Scaffold | `src/components/ui/form.tsx` only | shadcn Form wrapper | Do not remove until tested | Contact uses native form + Zod |
| `@hookform/resolvers` | Form / validation tool | **Removed** | — | Zod resolver for RHF | — | **Removed** — no imports |
| `@radix-ui/react-accordion` | UI library | Yes | `accordion.tsx` → pages, `HomeFaqSection` | FAQ accordions | No | Active on home, about, service pages |
| `@radix-ui/react-tooltip` | UI library | Yes | `tooltip.tsx` → `App.tsx` | Tooltips | No | `TooltipProvider` in `App` |
| `@radix-ui/react-toast` | UI library | Scaffold | `toast.tsx`, `toaster.tsx` (not in `App`) | Radix toast primitive | Do not remove until tested | — | **App uses Sonner only**; scaffold kept |
| `@radix-ui/react-slot` | UI library | Yes | `button`, `breadcrumb`, `form`, `sidebar` | `asChild` composition | No | |
| `@radix-ui/react-label` | UI library | Scaffold | `label.tsx`, `form.tsx` | Form labels | Do not remove until tested | Only via unused `form` |
| `@radix-ui/react-dialog` | UI library | Scaffold | `dialog.tsx`, `sheet.tsx`, `command.tsx` | Modals / sheets | Do not remove until tested | Not imported from pages |
| `@radix-ui/react-alert-dialog` | UI library | Scaffold | `alert-dialog.tsx` | Confirm dialogs | Do not remove until tested | |
| `@radix-ui/react-dropdown-menu` | UI library | Scaffold | `dropdown-menu.tsx` | Menus | Do not remove until tested | |
| `@radix-ui/react-popover` | UI library | Scaffold | `popover.tsx` | Popovers | Do not remove until tested | |
| `@radix-ui/react-select` | UI library | Scaffold | `select.tsx` | Select inputs | Do not remove until tested | Contact uses native `<select>` |
| `@radix-ui/react-tabs` | UI library | Scaffold | `tabs.tsx` | Tabs | Do not remove until tested | |
| `@radix-ui/react-checkbox` | UI library | Scaffold | `checkbox.tsx` | Checkboxes | Do not remove until tested | |
| `@radix-ui/react-radio-group` | UI library | Scaffold | `radio-group.tsx` | Radio groups | Do not remove until tested | |
| `@radix-ui/react-switch` | UI library | Scaffold | `switch.tsx` | Toggles | Do not remove until tested | |
| `@radix-ui/react-slider` | UI library | Scaffold | `slider.tsx` | Sliders | Do not remove until tested | |
| `@radix-ui/react-progress` | UI library | Scaffold | `progress.tsx` | Progress bars | Do not remove until tested | |
| `@radix-ui/react-scroll-area` | UI library | Scaffold | `scroll-area.tsx` | Custom scroll areas | Do not remove until tested | |
| `@radix-ui/react-separator` | UI library | Scaffold | `separator.tsx`, `sidebar.tsx` | Dividers | Do not remove until tested | |
| `@radix-ui/react-avatar` | UI library | Scaffold | `avatar.tsx` | Avatars | Do not remove until tested | |
| `@radix-ui/react-collapsible` | UI library | Scaffold | `collapsible.tsx` | Collapsible panels | Do not remove until tested | |
| `@radix-ui/react-aspect-ratio` | UI library | Scaffold | `aspect-ratio.tsx` | Aspect ratio box | Do not remove until tested | |
| `@radix-ui/react-hover-card` | UI library | Scaffold | `hover-card.tsx` | Hover cards | Do not remove until tested | |
| `@radix-ui/react-context-menu` | UI library | Scaffold | `context-menu.tsx` | Context menus | Do not remove until tested | |
| `@radix-ui/react-menubar` | UI library | Scaffold | `menubar.tsx` | Menu bars | Do not remove until tested | |
| `@radix-ui/react-navigation-menu` | UI library | Scaffold | `navigation-menu.tsx` | Nav menus | Do not remove until tested | Header uses custom nav |
| `@radix-ui/react-toggle` | UI library | Scaffold | `toggle.tsx`, `toggle-group.tsx` | Toggle buttons | Do not remove until tested | |
| `@radix-ui/react-toggle-group` | UI library | Scaffold | `toggle-group.tsx` | Toggle groups | Do not remove until tested | |
| `cmdk` | UI library | Scaffold | `command.tsx` | Command palette | Do not remove until tested | |
| `vaul` | UI library | Scaffold | `drawer.tsx` | Drawer component | Do not remove until tested | |
| `embla-carousel-react` | UI library | Scaffold | `carousel.tsx` | Carousel | Do not remove until tested | |
| `recharts` | UI library | Scaffold | `chart.tsx` | Charts | Do not remove until tested | |
| `react-day-picker` | UI library | Scaffold | `calendar.tsx` | Date picker UI | Do not remove until tested | |
| `date-fns` | Utility library | **Removed (direct)** | — | Date utilities | — | May remain transitive via `react-day-picker` |
| `input-otp` | UI library | Scaffold | `input-otp.tsx` | OTP inputs | Do not remove until tested | |
| `react-resizable-panels` | UI library | Scaffold | `resizable.tsx` | Split panels | Do not remove until tested | |
| `vite` | Build tool | Yes | `vite.config.ts`, npm scripts | Bundler | No | |
| `@vitejs/plugin-react-swc` | Build tool | Yes | `vite.config.ts`, `vitest.config.ts` | Fast React refresh (SWC) | No | |
| `typescript` | Build tool | Yes | `tsconfig*.json` | Type system | No | |
| `tailwindcss` | Styling tool | Yes | `tailwind.config.ts`, PostCSS | CSS framework | No | |
| `postcss` | Build tool | Yes | `postcss.config.js` | CSS pipeline | No | **depcheck false negative** |
| `autoprefixer` | Build tool | Yes | `postcss.config.js` | Vendor prefixes | No | **depcheck false negative** |
| `@tailwindcss/typography` | Styling tool | Yes | `tailwind.config.ts` plugins | Typography plugin | Do not remove until tested | Site uses custom `.prose-klikcy`, not `prose` class |
| `eslint` | Development dependency | Yes | `eslint.config.js`, `npm run lint` | Lint runner | No | |
| `@eslint/js` | Development dependency | Yes | `eslint.config.js` | ESLint recommended rules | No | |
| `typescript-eslint` | Development dependency | Yes | `eslint.config.js` | TS rules for ESLint | No | |
| `eslint-plugin-react-hooks` | Development dependency | Yes | `eslint.config.js` | Hooks lint rules | No | |
| `eslint-plugin-react-refresh` | Development dependency | Yes | `eslint.config.js` | Fast refresh warnings | No | |
| `globals` | Development dependency | Yes | `eslint.config.js` | Browser globals | No | |
| `vitest` | Testing tool | Yes | `vitest.config.ts`, `npm run test` | Test runner | No | |
| `jsdom` | Testing tool | Yes | `vitest.config.ts` | DOM environment | No | |
| `@testing-library/jest-dom` | Testing tool | Yes | `src/test/setup.ts` | DOM matchers | No | |
| `@testing-library/react` | Testing tool | **Removed** | — | Component testing | — | **Removed** — add back for RTL tests |
| `@types/node` | Development dependency | Yes | `vite.config.ts`, `path` | Node types | No | |
| `@types/react` | Development dependency | Yes | TS (implicit) | React types | No | |
| `@types/react-dom` | Development dependency | Yes | TS (implicit) | React DOM types | No | |
| `concurrently` | Development dependency | Yes | `npm run dev:all` | Run API + Vite | No | Dev workflow only |

---

## SEO and metadata (no extra NPM packages)

SEO is implemented in-app (not via `next-seo` or similar):

| Concern | Implementation |
|---------|----------------|
| Titles / descriptions / keywords | `src/lib/seo/generators.ts`, `src/lib/metadata/page-metadata.ts` |
| Canonical / OG / Twitter | `src/components/SEO.tsx` |
| JSON-LD | `src/lib/schema.ts` + page-level `jsonLd` arrays |
| Sitemaps | `public/sitemap*.xml`, `scripts/generate-sitemaps.mjs`, `scripts/split-sitemaps.mjs` |

---

## UI components: app vs scaffold

**Imported by pages / `App.tsx` (actively shipped):**

| Component | Package deps |
|-----------|----------------|
| `accordion` | `@radix-ui/react-accordion`, `tailwindcss-animate` |
| `MagneticButton`, `TiltCard` | `gsap`, hooks |
| `sonner`, `tooltip` | `sonner`, `ThemeRoot`, `@radix-ui/react-tooltip` |

**Present under `src/components/ui/` but not imported from routes** (full shadcn kit):  
`alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `switch`, `table`, `tabs`, `textarea`, `toggle`, `toggle-group`, etc.

**Motion / layout (active outside `ui/`):**  
`LenisGsapProvider`, `PageTransition`, `SplitText`, `FadeUp`, `StaggerReveal`, `HomeHero`, `HomeStatsRow`, `CustomCursor`, `ThemeRoot` / `ThemeToggle`.

**Removed dead code (cleanup pass):**  
`CountUp.tsx`, `ParallaxLayer.tsx`, `SmoothScrollProvider.tsx`, `HomePinnedChapter.tsx`, `motion/MagneticButton.tsx` (imports unified to `ui/MagneticButton`).

---

## Recommended dependency cleanup

### Removed in last pass (verified)

| Package / change | Reason |
|------------------|--------|
| `@hookform/resolvers` | No imports |
| `@testing-library/react` | Tests do not use RTL |
| `@tanstack/react-query` | Provider only; no queries |
| `next-themes` | Replaced with `ThemeRoot` in Sonner |
| `date-fns` | No direct imports (scaffold calendar only) |
| Radix `<Toaster />` in `App` | No `useToast()` calls in app; Sonner only |

### Do not remove without full UI regression pass

- Any `@radix-ui/*` package tied to `src/components/ui/*` (even if pages do not import that component today).
- `tailwindcss-animate`, `postcss`, `autoprefixer`, `tailwindcss`, `@tailwindcss/typography`.
- `react-hook-form` — remove only if you delete `form.tsx` or migrate forms to RHF.
- `next-themes` — either add `ThemeProvider` to `App.tsx` or replace `useTheme()` in `sonner.tsx` with `ThemeRoot` context.

### Keep (core product)

- **Vite + React + TS + Tailwind** — entire app.
- **react-router-dom**, **react-helmet-async** — routing and SEO head.
- **GSAP, Lenis, split-type** — homepage and marketing motion.
- **zod, express, nodemailer, cors, dotenv** — contact pipeline.
- **lucide-react**, **sonner**, **clsx**, **tailwind-merge**, **cva** — UI utilities in use.

### Consider later

| Current | Suggestion |
|---------|------------|
| `@tanstack/react-query` | Re-add when implementing API client + cached fetches |
| Large unused shadcn set | Delete unused `ui/*.tsx` files, then prune matching Radix packages (P3) |
| `react-hook-form` + `form.tsx` | Keep scaffold or migrate contact to RHF |

### Duplicates / overlap (resolved)

- **MagneticButton** — unified on `@/components/ui/MagneticButton`.
- **SmoothScrollProvider** — removed; **LenisGsapProvider** remains in `App.tsx`.

---

## Developer commands

```bash
npm install
npm run lint
npm run build
npm run test
npm run sitemap:generate
npm run sitemap:split
npm run seo:validate
npm ls
npx depcheck
npm audit
npm outdated
```

**Notes:**

- `depcheck` reported `postcss` and `autoprefixer` as unused — they are used in `postcss.config.js` (false positive).
- After removing packages: `npm install`, then `npm run build` and click through home, contact, service, and geo pages.

---

## Indirect dependencies (do not remove casually)

These are required by tools or other packages even if you never import them directly:

- `@swc/core` (via `@vitejs/plugin-react-swc`)
- `esbuild` (via Vite)
- Peer deps of Radix, Embla, Recharts, etc.
- Type packages (`@types/*`)

Use `npm ls <package>` to see why a package is installed.

---

## Related docs

- [README.md](../README.md) — stack overview and SEO system
- [seo/competitor-keyword-research.md](./seo/competitor-keyword-research.md) — metadata research workflow
