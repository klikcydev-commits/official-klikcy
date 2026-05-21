import fs from "fs";
import path from "path";

const sourcePath = "C:/Users/wassi/Desktop/project/project/src/pages/services/[slug].tsx";
const text = fs.readFileSync(sourcePath, "utf8");

const legacyToNew = {
  "web-development": "custom-website-development",
  "app-development": "mobile-app-development",
  "ui-ux-design": "ui-ux-design",
  "digital-marketing": "digital-marketing-strategy",
  "ai-automations": "ai-chatbot-development",
  "saas-application-development": "saas-development",
  "cro-seo": "conversion-rate-optimization",
  "e-commerce-development": "shopify-store-development",
};

function extractBlock(slug) {
  const start = text.indexOf(`"${slug}": {`);
  if (start < 0) return null;
  let depth = 0;
  let i = start + slug.length + 4;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }
  return null;
}

function parseStringField(block, field) {
  const re = new RegExp(`${field}:\\s*"([^"]*)"`);
  const m = block.match(re);
  return m ? m[1] : "";
}

function parseStringArray(block, field) {
  const re = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`, "m");
  const m = block.match(re);
  if (!m) return [];
  const inner = m[1];
  const items = [];
  const strRe = /"([^"]*)"/g;
  let sm;
  while ((sm = strRe.exec(inner))) items.push(sm[1]);
  return items;
}

function parseFaqs(block) {
  const faqs = [];
  const faqRe = /question:\s*"([^"]*)",\s*answer:\s*"([^"]*)"/g;
  let m;
  while ((m = faqRe.exec(block))) {
    faqs.push({ q: m[1], a: m[2] });
  }
  return faqs;
}

function parseApproach(block) {
  const phases = [];
  const phaseRe = /phase:\s*"([^"]*)",\s*description:\s*"([^"]*)"/g;
  let m;
  while ((m = phaseRe.exec(block))) {
    phases.push(`${m[1]}: ${m[2]}`);
  }
  return phases;
}

const out = {};

for (const [legacy, target] of Object.entries(legacyToNew)) {
  const block = extractBlock(legacy);
  if (!block) {
    console.error("Missing block:", legacy);
    continue;
  }
  out[target] = {
    legacySlug: legacy,
    title: parseStringField(block, "title"),
    description: parseStringField(block, "description"),
    whyMatters: parseStringField(block, "whyMatters"),
    keyTakeaways: parseStringArray(block, "keyTakeaways"),
    technology: parseStringArray(block, "technology"),
    commonMistakes: parseStringArray(block, "commonMistakes"),
    implementationChecklist: parseStringArray(block, "implementationChecklist"),
    approach: parseApproach(block),
    faqs: parseFaqs(block),
    metaTitle: parseStringField(block, "title") ? undefined : undefined,
  };
  const seoTitle = block.match(/seo:\s*\{[\s\S]*?title:\s*"([^"]*)"/);
  const seoDesc = block.match(/metaDescription:\s*"([^"]*)"/);
  const primaryKw = block.match(/primaryKeyword:\s*"([^"]*)"/);
  if (seoTitle) out[target].metaTitle = seoTitle[1];
  if (seoDesc) out[target].metaDescription = seoDesc[1];
  if (primaryKw) out[target].focusKeyword = primaryKw[1];
  const secKw = [];
  const secBlock = block.match(/secondaryKeywords:\s*\[([\s\S]*?)\]/);
  if (secBlock) {
    const strRe = /"([^"]*)"/g;
    let sm;
    while ((sm = strRe.exec(secBlock[1]))) secKw.push(sm[1]);
  }
  out[target].keywords = secKw;
}

const outPath = path.join(process.cwd(), "src/content/legacy-service-enrichment.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("Wrote", outPath, "keys:", Object.keys(out).length);
