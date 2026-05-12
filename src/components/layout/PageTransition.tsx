import { useLayoutEffect, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Choreographed route wipe: scales in from bottom, exits from top. */
export function PageTransition() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const reduced = useReducedMotion();

  // Handle the "Reveal" animation when a new page loads
  useLayoutEffect(() => {
    if (reduced || !overlayRef.current) return;
    if (first.current) {
      first.current = false;
      return;
    }

    const el = overlayRef.current;
    ensureGsapPlugins();
    const ctx = gsap.context(() => {
      // The screen is currently covered (scaleY: 1). Wipe it up to reveal the new page.
      gsap.set(el, { transformOrigin: "top", scaleY: 1, pointerEvents: "auto" });
      gsap.to(el, {
        scaleY: 0,
        duration: 0.62,
        ease: "power3.inOut",
        onComplete: () => gsap.set(el, { pointerEvents: "none" }),
      });
    }, el);

    return () => ctx.revert();
  }, [pathname, reduced]);

  // Intercept internal link clicks to play the "Cover" animation before navigating
  useEffect(() => {
    if (reduced) return;

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a');
      if (!target || !target.href) return;
      
      const url = new URL(target.href);
      const isInternal = url.origin === window.location.origin;
      const isSamePage = url.pathname === window.location.pathname;
      const hasTarget = target.hasAttribute('target');

      if (isInternal && !isSamePage && !hasTarget && !e.ctrlKey && !e.metaKey) {
        // Stop React Router from navigating instantly
        e.preventDefault();
        e.stopPropagation();
        
        const el = overlayRef.current;
        if (!el) {
          navigate(url.pathname + url.search + url.hash);
          return;
        }

        // Cover the screen from the bottom
        gsap.set(el, { transformOrigin: "bottom", scaleY: 0, pointerEvents: "auto" });
        gsap.to(el, {
          scaleY: 1,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            // Once screen is covered, navigate. 
            // The useLayoutEffect above will then wipe it up to reveal the new page.
            navigate(url.pathname + url.search + url.hash);
            
            // Scroll to top instantly before reveal
            window.scrollTo(0, 0);
          }
        });
      }
    };

    // Use capture phase to intercept the click BEFORE React Router's <Link> gets it
    document.addEventListener('click', handleClick, { capture: true });
    
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [navigate, reduced]);

  return <div ref={overlayRef} className="page-transition-overlay" aria-hidden style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'hsl(var(--ink))', zIndex: 9999, transform: 'scaleY(0)', transformOrigin: 'bottom' }} />;
}
