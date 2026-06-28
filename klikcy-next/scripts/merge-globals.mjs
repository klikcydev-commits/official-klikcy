import fs from "fs";

const index = fs.readFileSync("../src/index.css", "utf8");
const globalsTail = fs.readFileSync("src/styles/globals.css", "utf8").split("\n").slice(149).join("\n");
const tailwindBlock = index.replace('@import "./styles/globals.css";\n\n', "");
const out = `@tailwind base;
@tailwind components;
@tailwind utilities;

${tailwindBlock}

${globalsTail}`;

fs.writeFileSync("src/styles/globals.css", out);
console.log("globals.css merged");
