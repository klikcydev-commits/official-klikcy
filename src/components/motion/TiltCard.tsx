import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  const container = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!container.current || prefersReducedMotion) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = container.current.getBoundingClientRect();
    
    const x = clientX - left;
    const y = clientY - top;
    
    // Calculate rotation (-15 to 15 degrees)
    const rotateY = ((x / width) - 0.5) * 30;
    const rotateX = ((y / height) - 0.5) * -30;

    gsap.to(container.current, { 
      rotateX, 
      rotateY, 
      transformPerspective: 800,
      duration: 0.5, 
      ease: 'power2.out' 
    });
  };

  const handleMouseLeave = () => {
    if (!container.current || prefersReducedMotion) return;
    
    gsap.to(container.current, { 
      rotateX: 0, 
      rotateY: 0, 
      duration: 1, 
      ease: 'elastic.out(1, 0.5)' 
    });
  };

  return (
    <div 
      ref={container} 
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
