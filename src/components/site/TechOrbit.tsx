import type { CSSProperties } from "react";

/**
 * Hero orbit: the tools we build with circling the Klikcy mark.
 * Pure CSS (styles in globals.css under "Tech orbit") — no client JavaScript, sizes scale
 * with the viewport, logos stay upright, the orbit pauses on hover, and it stands still
 * when the visitor prefers reduced motion. Logos are self-hosted in /public/brand/tech.
 */
const TOOLS = [
  { name: "Next.js", file: "nextdotjs.svg", bg: "#000000" },
  { name: "WordPress", file: "wordpress.svg", bg: "#21759B" },
  { name: "React", file: "react.svg", bg: "#61DAFB" },
  { name: "Figma", file: "figma.svg", bg: "#F24E1E" },
  { name: "MongoDB", file: "mongodb.svg", bg: "#47A248" },
  { name: "AWS", file: "aws.svg", bg: "#232F3E", scale: 0.62 },
  { name: "Vercel", file: "vercel.svg", bg: "#000000", scale: 0.42 },
  { name: "Cloudflare", file: "cloudflare.svg", bg: "#F38020" },
  { name: "Wix", file: "wix.svg", bg: "#0C6EFC" },
  { name: "Node.js", file: "nodedotjs.svg", bg: "#339933" },
  { name: "Shopify", file: "shopify.svg", bg: "#5E8E3E" },
];

export function TechOrbit() {
  return (
    <figure className="orbit" aria-label={`Tools we build with: ${TOOLS.map((t) => t.name).join(", ")}`}>
      <span className="orbit-ring orbit-ring--outer" aria-hidden />
      <span className="orbit-ring orbit-ring--inner" aria-hidden />

      <div className="orbit-rotator" aria-hidden>
        {TOOLS.map((tool, i) => (
          <div
            key={tool.name}
            className="orbit-item"
            style={{ "--angle": `${(i * 360) / TOOLS.length}deg` } as CSSProperties}
          >
            <div className="orbit-sat">
              <span className="orbit-icon" style={{ background: tool.bg }}>
                <img
                  src={`/brand/tech/${tool.file}`}
                  alt=""
                  width={24}
                  height={24}
                  decoding="async"
                  style={{ width: `${(tool.scale ?? 0.5) * 100}%`, height: "auto" }}
                />
              </span>
              <span className="orbit-tip">{tool.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="orbit-core">
        <img src="/brand/klikcy-logo.png" alt="" width={64} height={64} className="orbit-core__mark" />
        <span className="orbit-core__name">Klikcy</span>
        <span className="orbit-core__sub">Our tools</span>
      </div>
    </figure>
  );
}
