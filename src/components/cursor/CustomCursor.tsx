import React, { useEffect, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const { x, y } = useMousePosition(true);
  const [isHovering, setIsHovering] = useState(false);
  const [hasTouch, setHasTouch] = useState(false);

  useEffect(() => {
    // Check if device supports touch (and doesn't have fine pointer)
    const matchMedia = window.matchMedia('(pointer: coarse)');
    setHasTouch(matchMedia.matches);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Add listeners to all links and buttons
    const interactables = document.querySelectorAll('a, button');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    // We also need a MutationObserver to catch dynamically added elements
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if(mutation.addedNodes.length) {
                const newInteractables = document.querySelectorAll('a, button');
                newInteractables.forEach((el) => {
                    // Remove first to avoid duplicates
                    el.removeEventListener('mouseenter', handleHoverStart);
                    el.removeEventListener('mouseleave', handleHoverEnd);
                    el.addEventListener('mouseenter', handleHoverStart);
                    el.addEventListener('mouseleave', handleHoverEnd);
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      observer.disconnect();
    };
  }, []);

  // Update classes for root to hide default cursor
  useEffect(() => {
      if(!hasTouch) {
          document.documentElement.classList.add('use-custom-cursor');
      } else {
          document.documentElement.classList.remove('use-custom-cursor');
      }
      return () => document.documentElement.classList.remove('use-custom-cursor');
  }, [hasTouch]);


  // Animating the ring with GSAP ticker for smooth lerping
  useEffect(() => {
    if (hasTouch || x === 0 && y === 0) return; // Don't animate if touch or initial state

    const ring = document.querySelector('.cursor-ring') as HTMLElement;
    if (!ring) return;

    let currentX = parseFloat(gsap.getProperty(ring, 'x') as string) || x;
    let currentY = parseFloat(gsap.getProperty(ring, 'y') as string) || y;

    const onTick = () => {
      // Lerp
      currentX += (x - currentX) * 0.1;
      currentY += (y - currentY) * 0.1;

      gsap.set(ring, {
        x: currentX,
        y: currentY,
        scale: isHovering ? 1.5 : 1
      });
    };

    gsap.ticker.add(onTick);
    
    // Dot snaps immediately
    const dot = document.querySelector('.cursor-dot');
    if(dot) {
         gsap.set(dot, { x, y, scale: isHovering ? 0 : 1 });
    }

    return () => gsap.ticker.remove(onTick);
  }, [x, y, isHovering, hasTouch]);

  if (hasTouch) return null;

  return (
    <>
      <div className="cursor-dot" style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: 9999 }} />
      <div className="cursor-ring" style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: 9998 }} />
    </>
  );
}
