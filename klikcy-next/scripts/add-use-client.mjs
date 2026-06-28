import fs from "fs";
import path from "path";

const clientFiles = [
  "src/components/layout/ThemeRoot.tsx",
  "src/components/layout/ThemeToggle.tsx",
  "src/components/layout/LenisGsapProvider.tsx",
  "src/components/layout/CustomCursor.tsx",
  "src/components/sections/HomeHero.tsx",
  "src/components/sections/HomeStatsRow.tsx",
  "src/components/ui/MagneticButton.tsx",
  "src/components/ui/TiltCard.tsx",
  "src/components/animations/ScrambleLink.tsx",
  "src/components/animations/StaggerReveal.tsx",
  "src/components/motion/SplitText.tsx",
  "src/components/motion/FadeUp.tsx",
  "src/components/motion/ScrambleText.tsx",
  "src/components/home/HomePackagesSection.tsx",
  "src/components/home/HomeTechnologySection.tsx",
  "src/components/home/HomeFaqSection.tsx",
  "src/components/home/TechnologyOrbit.tsx",
  "src/components/service/ServiceHero.tsx",
];

for (const rel of clientFiles) {
  const full = path.resolve(rel);
  if (!fs.existsSync(full)) continue;
  let content = fs.readFileSync(full, "utf8");
  if (content.startsWith('"use client"') || content.startsWith("'use client'")) continue;
  content = `"use client";\n\n${content}`;
  fs.writeFileSync(full, content);
}

console.log("added use client");
