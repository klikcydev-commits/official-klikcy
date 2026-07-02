"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&";

export interface ScrambleLinkProps {
  to: string;
  children: string;
  className?: string;
  onClick?: () => void;
  title?: string;
}

/** Hover text scramble for navigation labels (skipped when reduced motion). */
export function ScrambleLink({ to, children, className, onClick, title }: ScrambleLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const frame = useRef<number>(0);
  const iterations = useRef(0);

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    iterations.current = 0;
    if (ref.current) ref.current.textContent = children;
  }, [children]);

  const scramble = useCallback(() => {
    if (reduced || !ref.current) return;
    const target = children;
    const len = target.length;
    iterations.current = 0;
    const maxIter = 10;

    const tick = () => {
      iterations.current += 1;
      const progress = iterations.current / maxIter;
      let out = "";
      for (let i = 0; i < len; i += 1) {
        const ch = target[i];
        if (ch === " ") {
          out += " ";
          continue;
        }
        out += progress * len > i ? ch : CHARSET[(Math.random() * CHARSET.length) | 0];
      }
      if (ref.current) ref.current.textContent = out;
      if (iterations.current < maxIter) {
        frame.current = requestAnimationFrame(tick);
      } else if (ref.current) {
        ref.current.textContent = target;
      }
    };
    frame.current = requestAnimationFrame(tick);
  }, [children, reduced]);

  return (
    <Link
      ref={ref}
      href={to}
      title={title}
      className={cn(className)}
      onMouseEnter={scramble}
      onMouseLeave={stop}
      onFocus={scramble}
      onBlur={stop}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
