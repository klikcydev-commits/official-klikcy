import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0.2=far BG, 0.6=mid, 1.0=normal, 1.2=foreground
  className?: string;
}

export function ParallaxLayer({ children, speed = 1, className }: ParallaxLayerProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    gsap.fromTo(
      container.current,
      {
        y: () => -100 * (1 - speed),
      },
      {
        y: () => 100 * (1 - speed),
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
