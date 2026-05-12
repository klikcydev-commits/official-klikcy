import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ 
  end, 
  suffix = '', 
  prefix = '', 
  duration = 2,
  className
}: CountUpProps) {
  const container = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!container.current) return;
    
    if (prefersReducedMotion) {
      container.current.innerText = `${prefix}${end}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: end,
      duration: duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        if (container.current) {
          container.current.innerText = `${prefix}${Math.round(obj.val)}${suffix}`;
        }
      }
    });
  }, { scope: container, dependencies: [end, prefix, suffix, prefersReducedMotion] });

  return (
    <span ref={container} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
