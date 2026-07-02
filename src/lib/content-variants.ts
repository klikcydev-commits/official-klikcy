import { stableHash } from "@/lib/metadata/hash";

/** Deterministic variant pick — same seed always returns the same item across builds. */
export function pickVariant<T>(seed: string, variants: readonly T[]): T {
  if (variants.length === 0) {
    throw new Error("pickVariant requires at least one variant");
  }
  const index = stableHash(seed) % variants.length;
  return variants[index]!;
}

export function pickVariantIndices(seed: string, count: number, poolSize: number): number[] {
  if (count > poolSize) {
    throw new Error("pickVariantIndices: count exceeds poolSize");
  }
  const indices: number[] = [];
  let offset = 0;
  while (indices.length < count) {
    const idx = stableHash(`${seed}:${offset}`) % poolSize;
    if (!indices.includes(idx)) indices.push(idx);
    offset += 1;
  }
  return indices.sort((a, b) => a - b);
}
