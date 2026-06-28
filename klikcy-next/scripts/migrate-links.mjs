import fs from "fs";
import path from "path";

const root = path.resolve("src");

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.tsx?$/.test(entry.name)) processFile(full);
  }
}

function processFile(file) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;

  content = content.replace(/import \{ Link \} from "react-router-dom";/g, 'import Link from "next/link";');
  content = content.replace(
    /import \{ Link, useLocation, useMatch \} from "react-router-dom";/g,
    '"use client";\n\nimport Link from "next/link";\nimport { usePathname } from "next/navigation";',
  );
  content = content.replace(
    /import \{ useParams, Link, Navigate \} from "react-router-dom";/g,
    '"use client";\n\nimport Link from "next/link";',
  );
  content = content.replace(
    /import \{ useLocation, Link \} from "react-router-dom";/g,
    '"use client";\n\nimport Link from "next/link";',
  );
  content = content.replace(/\bto=\{/g, "href={");
  content = content.replace(/\bto="\//g, 'href="/');

  if (content !== original) fs.writeFileSync(file, content);
}

walk(root);
console.log("done");
