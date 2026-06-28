"use client";

import { useRef, type ReactNode } from "react";
import { useLayoutEffect } from "react";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

/** Primary CTA with magnetic pull (GSAP lerp) on fine pointers. */
export function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)", false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced || !finePointer) return;
    ensureGsapPlugins();

    const strength = 0.32;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.25, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.45)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [finePointer, reduced]);

  return (
    <span ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </span>
  );
}
