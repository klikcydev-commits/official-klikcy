import { useRef, type ReactNode } from "react";
import { useLayoutEffect } from "react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/** 3D perspective tilt from pointer position (disabled on touch / reduced motion). */
export function TiltCard({ children, className, maxTilt = 10 }: TiltCardProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)", false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced || !finePointer) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = (-py * maxTilt).toFixed(2);
      const ry = (px * maxTilt * 2).toFixed(2);
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [finePointer, maxTilt, reduced]);

  return (
    <div
      ref={root}
      className={cn(
        "transform-gpu transition-[transform] duration-200 ease-out will-change-transform",
        className,
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
