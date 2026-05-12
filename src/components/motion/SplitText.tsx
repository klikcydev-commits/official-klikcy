import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SplitTextProps {
  children: string;
  type?: 'words' | 'chars' | 'lines';
  stagger?: number;
  duration?: number;
  trigger?: 'scroll' | 'immediate';
  className?: string;
  delay?: number;
}

export function SplitText({ 
  children, 
  type = 'words', 
  stagger = 0.05, 
  duration = 0.8, 
  trigger = 'scroll',
  className,
  delay = 0
}: SplitTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!container.current || prefersReducedMotion) return;

    // We apply overflow:hidden to words/lines directly in SplitType config if possible, 
    // or wrap them. SplitType handles lines, words, chars.
    const split = new SplitType(container.current, { types: type });
    
    // Select the units we animated based on type
    const targets = split[type] || split.words;
    
    if (!targets) return;

    // We don't need to manually wrap elements. Let's just animate opacity and y.
    // This avoids breaking inline block wrapping.
    gsap.fromTo(
      targets,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: 'cinematic',
        scrollTrigger: trigger === 'scroll' ? {
          trigger: container.current,
          start: 'top 85%',
        } : undefined
      }
    );

    return () => split.revert();
  }, { scope: container, dependencies: [children, prefersReducedMotion] });

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
