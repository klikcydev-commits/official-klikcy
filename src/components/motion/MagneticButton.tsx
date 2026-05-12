import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactElement;
  className?: string;
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const container = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!container.current || prefersReducedMotion) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = container.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    // Button moves x 0.35, text inside (if any) moves x 0.175
    gsap.to(container.current, { x: x * 0.35, y: y * 0.35, duration: 1, ease: 'power3.out' });
    
    // Attempt to move text if it's the first child (assuming standard button structure)
    const inner = container.current.children[0];
    if (inner) {
      gsap.to(inner, { x: x * 0.175, y: y * 0.175, duration: 1, ease: 'power3.out' });
    }
  };

  const handleMouseLeave = () => {
    if (!container.current || prefersReducedMotion) return;
    
    gsap.to(container.current, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' });
    
    const inner = container.current.children[0];
    if (inner) {
      gsap.to(inner, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' });
    }
  };

  const handleMouseDown = () => {
    if (!container.current || prefersReducedMotion) return;
    gsap.to(container.current, { scaleX: 1.08, scaleY: 0.92, duration: 0.2 });
  };

  const handleMouseUp = () => {
    if (!container.current || prefersReducedMotion) return;
    gsap.to(container.current, { scaleX: 1, scaleY: 1, duration: 1, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <div 
      ref={container} 
      className={`inline-block ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
}
