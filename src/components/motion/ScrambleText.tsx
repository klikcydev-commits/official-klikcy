"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrambleTextProps {
  children: string;
  className?: string;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#_';

export function ScrambleText({ children, className }: ScrambleTextProps) {
  const [text, setText] = useState(children);
  const requestRef = useRef<number>();
  const prefersReducedMotion = useReducedMotion();
  const isAnimating = useRef(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | 'auto'>('auto');

  const scramble = () => {
    if (prefersReducedMotion || isAnimating.current) return;
    
    // Lock the width to prevent shifting siblings (shivering)
    if (spanRef.current) {
        setWidth(spanRef.current.getBoundingClientRect().width);
    }

    isAnimating.current = true;
    let frame = 0;
    const maxFrames = 18;
    const length = children.length;
    
    const animate = () => {
      let result = '';
      
      for (let i = 0; i < length; i++) {
        // As frame progresses, more of the original text is resolved left-to-right
        const progress = frame / maxFrames;
        const indexProgress = i / length;
        
        if (progress > indexProgress) {
          result += children[i];
        } else if (children[i] === ' ') {
          result += ' ';
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setText(result);
      
      if (frame < maxFrames) {
        frame++;
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setText(children);
        isAnimating.current = false;
        setWidth('auto'); // Release width
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <span 
      ref={spanRef}
      className={className} 
      onMouseEnter={scramble}
      style={{ display: 'inline-block', whiteSpace: 'nowrap', width: width === 'auto' ? 'auto' : `${width}px` }}
    >
      {text}
    </span>
  );
}
