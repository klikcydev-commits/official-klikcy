# Cinematic Plan

**Atmosphere & Theme:** Dark, premium, highly polished. Cinematic contrast between stark typography and subtle environmental lighting.

**Global Elements:**
*   **Color Temperature:** Cool, deep backgrounds (obsidian/midnight) with subtle, warm (amber/gold) radial highlights tracking the scroll.
*   **Motion Vocabulary:** `var(--ease-cinematic)` for reveals, `var(--ease-elastic)` for micro-interactions (buttons/cards).

**Scene 1: Hero Entrance ("The Void")**
*   **Purpose:** Establish premium feel immediately. Focus on the core value proposition.
*   **0% Scroll:**
    *   Background: Deep charcoal/obsidian gradient. Subtle noise grain visible.
    *   Content: Hidden.
*   **Entrance Choreography:**
    *   100ms: Eyebrow label clips up (`clip-reveal`).
    *   250ms: Headline words stagger in (`SplitText`, `fade-up`).
    *   500ms: Subheadline fades and slides up.
    *   650ms: Primary CTA scales in (`elastic`).
    *   800ms: Secondary CTA fades in.
    *   950ms: Navigation scrambles in (`ScrambleText`).
*   **Scroll Behavior (0-25%):**
    *   Headline slowly translates up (`speed 1.2`).
    *   Background layer dims slightly to prepare for next section.

**Scene 2: Core Services ("The Grid")**
*   **Purpose:** Present offerings with depth and interactivity.
*   **Scroll Trigger (25%):**
    *   Section background crossfades to slightly lighter surface color (`--c-surface`).
    *   Eyebrow and Headline reveal via `SplitText`.
*   **Content Display:**
    *   Service cards fade up sequentially (`FadeUp` with stagger).
    *   Cards wrap in `TiltCard` for 3D parallax on hover.
*   **Scroll Behavior (25-50%):**
    *   Cards move up at slightly different speeds (`ParallaxLayer` effects).

**Scene 3: The Impact ("The Data")**
*   **Purpose:** Build trust through numbers.
*   **Scroll Trigger (50%):**
    *   Background temperature shifts: subtle warm ambient glow appears from the bottom.
    *   Numbers trigger `CountUp` animation as they enter viewport.
*   **Content Display:**
    *   Stats labels fade in after numbers hit target.

**Scene 4: Call to Action ("The Horizon")**
*   **Purpose:** Final push for conversion.
*   **Scroll Trigger (75%):**
    *   Background shifts back to deep obsidian.
    *   Headline reveals (`SplitText`).
    *   CTA button drops in (`MagneticButton`).
*   **Scroll Behavior (75-100%):**
    *   Subtle zoom effect on the section background as user reaches bottom of page.
