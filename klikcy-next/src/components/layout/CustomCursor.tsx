"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { lerp } from "@/utils/math";

/**
 * Desktop-only custom cursor: dot + lerped ring. Disabled for touch / reduced motion.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)", false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useLayoutEffect(() => {
    const enabled = finePointer && !reduced;
    document.documentElement.classList.toggle("use-custom-cursor", enabled);
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    const loop = () => {
      pos.current.rx = lerp(pos.current.rx, pos.current.mx, 0.16);
      pos.current.ry = lerp(pos.current.ry, pos.current.my, 0.16);
      gsap.set(ring, { x: pos.current.rx, y: pos.current.ry });
      rafRef.current = requestAnimationFrame(loop);
    };

    pos.current.mx = window.innerWidth / 2;
    pos.current.my = window.innerHeight / 2;
    pos.current.rx = pos.current.mx;
    pos.current.ry = pos.current.my;

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("use-custom-cursor");
    };
  }, [finePointer, reduced]);

  if (reduced || !finePointer) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
