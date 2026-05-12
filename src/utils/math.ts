/** Linear interpolation between `a` and `b` by factor `t` in [0, 1]. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
