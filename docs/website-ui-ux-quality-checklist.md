# Website UI/UX Quality Checklist

**Use before every website delivery. Every unchecked item is a problem to fix.**

---

## 🎯 FIRST IMPRESSION & CONVERSION

- [ ] The hero communicates the offer within 3 seconds — no guessing required
- [ ] The H1 is clear, specific, keyword-relevant, and written for humans
- [ ] There is one primary CTA visible without scrolling on desktop and mobile
- [ ] A secondary CTA (if present) is clearly less prominent than the primary
- [ ] Social proof appears in or immediately below the hero (rating, count, or client logos)
- [ ] Every section advances the user journey — no filler sections
- [ ] Testimonials or case study results appear before the final CTA
- [ ] A FAQ or objection-handling section is present on service/product pages
- [ ] The final CTA section feels distinct and urgent

---

## 🎨 VISUAL DESIGN & BRAND

- [ ] The design looks custom — not like a recognizable template
- [ ] A complete color system is defined: primary, secondary, accent, neutrals, surface, text, border
- [ ] Colors are psychologically appropriate for the brand and audience
- [ ] The font pairing is intentional and appropriate for the brand type
- [ ] Typography has clear hierarchy: Display → H1 → H2 → H3 → Body → Caption
- [ ] Heading sizes create strong visual contrast against body text
- [ ] The layout uses strategic asymmetry or visual tension — not just equal-column grids
- [ ] Sections alternate visually (light/dark backgrounds, spacing breaks) to create scroll rhythm
- [ ] Visual depth is present: shadows, overlapping elements, layered backgrounds
- [ ] No section feels empty, wasted, or purely decorative

---

## 📱 RESPONSIVE DESIGN

- [ ] Tested at 375px (iPhone SE) — no horizontal overflow
- [ ] All grids collapse correctly to 1 column on mobile
- [ ] Hero CTA button is full-width on mobile
- [ ] Navigation uses a mobile drawer — not a collapsing dropdown that shifts content
- [ ] Touch targets are minimum 44px × 44px
- [ ] Font sizes use `clamp()` or responsive classes — no tiny text on mobile
- [ ] Images do not overflow or get cropped incorrectly on mobile
- [ ] Section padding is halved on mobile vs. desktop

---

## ♿ ACCESSIBILITY

- [ ] One `<h1>` per page — correct H2 → H3 hierarchy throughout
- [ ] All images have meaningful `alt` text (decorative images have `alt=""`)
- [ ] All interactive elements are reachable and operable via keyboard
- [ ] Focus states are visible and clearly styled (not `outline: none` with nothing replacing it)
- [ ] All form inputs have visible labels (not placeholder-only)
- [ ] Form error messages are associated with their inputs via `aria-describedby`
- [ ] Semantic HTML elements used throughout (`<header>`, `<main>`, `<nav>`, `<footer>`, etc.)
- [ ] All text meets WCAG AA contrast ratio (4.5:1 for body, 3:1 for large text)
- [ ] `prefers-reduced-motion` CSS media query is implemented
- [ ] ARIA attributes are used only where native HTML is insufficient

---

## ⚡ PERFORMANCE

- [ ] All images are WebP or AVIF format
- [ ] All images below the fold use `loading="lazy"`
- [ ] Hero image is preloaded in `<head>` with `<link rel="preload">`
- [ ] All images have explicit `width` and `height` attributes to prevent CLS
- [ ] Fonts use `font-display: swap`
- [ ] Only the font weights actually used are loaded
- [ ] Unused JavaScript is removed or code-split
- [ ] No render-blocking scripts in `<head>`
- [ ] Animations use only `transform` and `opacity` (no `width`, `height`, `margin` animation)

---

## 🔍 SEO & AEO

- [ ] Every page has a unique, keyword-relevant `<title>` tag
- [ ] Every page has a unique, descriptive meta description (150–160 characters)
- [ ] One `<h1>` per page with the target keyword
- [ ] H2 structure covers secondary keywords and section topics
- [ ] Schema JSON-LD is implemented (Organization, WebPage, LocalBusiness, FAQ, or Article as appropriate)
- [ ] A FAQ section is present on service and product pages
- [ ] Canonical URL is set on every page
- [ ] Internal links connect related pages (services, blog posts, location pages)
- [ ] No text is rendered only inside images (must be crawlable HTML text)
- [ ] Open Graph tags are present for social sharing

---

## 🧩 CODE QUALITY

- [ ] Design tokens (colors, spacing, radius) are defined as CSS custom properties
- [ ] No inline `style={{}}` used for design values — Tailwind or CSS variables only
- [ ] Components are properly split (no single 500-line page component)
- [ ] TypeScript interfaces are defined for all component props
- [ ] No repeated class strings — extracted to reusable components
- [ ] `cn()` utility (clsx + tailwind-merge) used for conditional classes
- [ ] Framer Motion animations use `whileInView` with `{ once: true }` to prevent replay
- [ ] All placeholder content (Lorem ipsum) replaced with real or realistic content

---

## ✅ FINAL SIGN-OFF

Before delivery, confirm:

> "This website has a clear offer, a strong visual identity, works flawlessly on mobile, is accessible, performs well, and looks like a professional agency built it — not an AI template."

**If you cannot honestly confirm this — do not deliver. Fix it first.**

---

*Part of the Award-Winning Website UI/UX Design Skill system.*
