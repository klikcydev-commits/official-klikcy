import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number; // In milliseconds
  className?: string;
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const container = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!container.current || prefersReducedMotion) return;

    gsap.fromTo(
      container.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay / 1000,
        ease: 'cinematic',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: container, dependencies: [delay, prefersReducedMotion] });

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
