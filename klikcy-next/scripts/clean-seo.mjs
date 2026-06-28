import fs from "fs";
import path from "path";

const pagesDir = path.resolve("src/pages");

for (const file of fs.readdirSync(pagesDir)) {
  if (!file.endsWith(".tsx")) continue;
  const full = path.join(pagesDir, file);
  let content = fs.readFileSync(full, "utf8");
  const original = content;

  content = content.replace(/import SEO from "@\/components\/SEO";\n/g, "");
  content = content.replace(/import \{ getHomeSeo \} from "@\/lib\/seo";\n/g, "");
  content = content.replace(/import \{ getAboutSeo \} from "@\/lib\/seo";\n/g, "");
  content = content.replace(/import \{ getContactSeo \} from "@\/lib\/seo";\n/g, "");
  content = content.replace(/import \{ getAllServicesSeo \} from "@\/lib\/seo";\n/g, "");
  content = content.replace(/import \{ getServiceAreasSeo \} from "@\/lib\/seo";\n/g, "");
  content = content.replace(/import \{ getCategorySeo \} from "@\/lib\/seo";\n/g, "");
  content = content.replace(/import \{ getNotFoundSeo \} from "@\/lib\/seo";\n/g, "");
  content = content.replace(/const \w+Seo = get\w+Seo\([^)]*\);\n/g, "");
  content = content.replace(/      <SEO[\s\S]*?      \/>\n/g, "");

  if (content !== original) fs.writeFileSync(full, content);
}

console.log("cleaned pages");
