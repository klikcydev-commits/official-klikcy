/** Deterministic string hash for stable metadata variation (not random per request). */
export function stableHash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pickIndex(seed: string, count: number): number {
  if (count <= 1) return 0;
  return stableHash(seed) % count;
}
