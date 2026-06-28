import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(enabled: boolean): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  return pos;
}
