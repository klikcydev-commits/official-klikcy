/** Stable slug for FAQ/AEO accordion item IDs and in-page anchors. */
export function accordionItemId(kind: "faq" | "aeo", question: string): string {
  const slug = question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 72)
    .replace(/-$/, "");

  return `${kind}-${slug || "item"}`;
}
