/**
 * Content QA for the service catalog, categories, and states.
 * Run: node scripts/check-content.cjs
 */
const path = require("node:path");
const jiti = require("jiti")(__filename, { alias: { "@": path.join(__dirname, "..", "src") }, interopDefault: true });

const { services } = jiti("../src/lib/services.ts");
const errors = [];
const warn = [];
const slugs = new Set();

for (const s of services) {
  if (slugs.has(s.slug)) errors.push(`duplicate slug ${s.slug}`);
  slugs.add(s.slug);
}
for (const s of services) {
  for (const r of s.related) if (!slugs.has(r)) errors.push(`${s.slug}: unknown related ${r}`);
  if (s.related.includes(s.slug)) errors.push(`${s.slug}: relates to itself`);
  if (s.metaTitle.length > 60) errors.push(`${s.slug}: title ${s.metaTitle.length} chars "${s.metaTitle}"`);
  if (s.metaDescription.length < 120 || s.metaDescription.length > 160)
    warn.push(`${s.slug}: description ${s.metaDescription.length} chars`);
  if (s.faqs.length < 4) errors.push(`${s.slug}: only ${s.faqs.length} FAQs`);
  const words = [s.intro, ...s.overview, ...s.signs, ...s.included, ...s.process.flatMap((p) => [p.title, p.detail]), s.timeline, ...s.costFactors, ...s.pitfalls, ...s.faqs.flatMap((f) => [f.q, f.a])]
    .join(" ")
    .split(/\s+/).length;
  if (words < 380) warn.push(`${s.slug}: ${words} words`);
  s._words = words;
}
const titles = new Map();
for (const s of services) {
  if (titles.has(s.metaTitle)) errors.push(`duplicate title: ${s.slug} & ${titles.get(s.metaTitle)}`);
  titles.set(s.metaTitle, s.slug);
}

const banned = /\b(seamless(ly)?|leverag(e|ing)|robust|elevate|unlock|empower|cutting-edge|game-?changer|synergy|delve|holistic|in today's)\b/i;
for (const s of services) {
  const text = JSON.stringify(s);
  const m = text.match(banned);
  if (m) warn.push(`${s.slug}: cliché "${m[0]}"`);
  const dashes = (text.match(/—/g) || []).length;
  if (dashes > 2) warn.push(`${s.slug}: ${dashes} em dashes`);
}

const { categories } = jiti("../src/lib/categories.ts");
for (const c of categories) {
  if (c.metaTitle.length > 60) errors.push(`category ${c.slug}: title ${c.metaTitle.length} chars`);
  if (c.metaDescription.length < 120 || c.metaDescription.length > 160) warn.push(`category ${c.slug}: description ${c.metaDescription.length} chars`);
  if (!services.some((s) => s.category === c.slug)) errors.push(`category ${c.slug} has no services`);
}
for (const s of services) if (!categories.some((c) => c.slug === s.category)) errors.push(`${s.slug}: unknown category ${s.category}`);

const { states } = jiti("../src/lib/states.ts");
const { unknownIndustryKeys, getTimeZone } = jiti("../src/lib/state-details.ts");
for (const st of states) {
  const unknown = unknownIndustryKeys(st);
  if (unknown.length) errors.push(`state ${st.slug}: no industry entry for ${unknown.join(", ")}`);
  if (getTimeZone(st) === "your local time zone") errors.push(`state ${st.slug}: missing time zone`);
  const title = `Web Development & SEO for ${st.name} Businesses | Klikcy`;
  if (title.length > 60) errors.push(`state ${st.slug}: title ${title.length} chars`);
}
const { localMarkets } = jiti("../src/content/local-markets.ts");
const { getCity } = jiti("../src/lib/cities.ts");
const marketTitles = new Set();
for (const m of localMarkets) {
  const key = `${m.state}/${m.city}`;
  if (!getCity(m.state, m.city)) errors.push(`market ${key}: city not in states.ts`);
  if (m.metaTitle.length > 60) errors.push(`market ${key}: title ${m.metaTitle.length} chars`);
  if (m.metaDescription.length < 120 || m.metaDescription.length > 160) warn.push(`market ${key}: description ${m.metaDescription.length} chars`);
  if (marketTitles.has(m.metaTitle) || titles.has(m.metaTitle)) errors.push(`market ${key}: duplicate title`);
  marketTitles.add(m.metaTitle);
  for (const n of m.needs) for (const slug of n.services) if (!slugs.has(slug)) errors.push(`market ${key}: unknown service ${slug}`);
  if (m.faqs.length < 3) errors.push(`market ${key}: needs 3+ FAQs`);
}
console.log(`local markets: ${localMarkets.length}`);
console.log(`categories: ${categories.length}, states: ${states.length}`);
console.log(`services: ${services.length}`);
const w = services.map((s) => s._words);
console.log(`words per service: min ${Math.min(...w)}, avg ${Math.round(w.reduce((a, b) => a + b, 0) / w.length)}, max ${Math.max(...w)}`);
if (warn.length) console.log("WARN\n  " + warn.join("\n  "));
if (errors.length) {
  console.error("ERRORS\n  " + errors.join("\n  "));
  process.exit(1);
}
console.log("OK");
