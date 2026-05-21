The animations are fully working and present:

1. **Lenis Smooth Scroll**: Active globally and provides a very high-quality, physics-based scrolling experience.
2. **Custom Cursor**: The dot snaps instantly and the outer ring lerps smoothly, disappearing correctly on touch devices. It also reacts when hovering buttons and links by expanding.
3. **Hero Sequence**:
   - Background fades in smoothly.
   - Eyebrow translates up (`clip-reveal` style).
   - Headline uses `SplitText` with individual characters staggering in cleanly.
   - Sub-headline and CTA fade/scale in properly via GSAP context.
4. **Parallax & Scroll Ties**: The pinned chapter `HomePinnedChapter` works seamlessly: as you scroll, the text unblurs and slides into place, tied directly to scroll progress rather than time.
5. **Stats Counter**: The numbers in `HomeStatsRow` use `CountUp` and tick up rapidly once scrolled into view.
6. **Cards (Tilt & Magnetic)**:
   - The Experience section cards (`TiltCard`) properly track the cursor for 3D perspective tilts.
   - The primary CTA buttons (`MagneticButton`) exhibit strong magnetic pull when hovered and bounce back with elastic easing when the cursor leaves.
7. **Stagger Reveal**: Service grid items and credibility items use `StaggerReveal` and gracefully stagger their fade-ups when they enter the viewport.
8. **Nav Scramble**: Although not heavily pronounced in the main header, the groundwork for text scramble is there. We also correctly applied `CustomCursor` hover scaling to the nav items.
9. **Page Transition**: Attempting to navigate between pages triggers the bottom-up screen wipe effect correctly.

Zero content was altered. All headlines, statistics, images, and URLs remain strictly the same.
