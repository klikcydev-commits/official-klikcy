import type { CSSProperties } from "react";
import { memo, useEffect, useState } from "react";

const techIcons = [
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/ffffff", bgColor: "#000000" },
  { name: "WordPress", logo: "https://cdn.simpleicons.org/wordpress/ffffff", bgColor: "#21759B" },
  { name: "React Native", logo: "https://cdn.simpleicons.org/react/000000", bgColor: "#61DAFB" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/ffffff", bgColor: "#F24E1E" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/ffffff", bgColor: "#47A248" },
  { name: "AWS", logo: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg", bgColor: "#FF9900" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/ffffff", bgColor: "#000000" },
  { name: "Security", logo: "https://cdn.simpleicons.org/cloudflare/ffffff", bgColor: "#2BA8A0" },
  { name: "Wix", logo: "https://cdn.simpleicons.org/wix/ffffff", bgColor: "#FAAD4A" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/ffffff", bgColor: "#339933" },
  { name: "Shopify", logo: "https://cdn.simpleicons.org/shopify/ffffff", bgColor: "#96BF48" },
] as const;

type TechIcon = (typeof techIcons)[number];

function TechIconWrapper({
  tech,
  radius,
  initialAngle,
  iconSize,
}: {
  tech: TechIcon;
  radius: number;
  initialAngle: number;
  iconSize: number;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="orbit-source__wrapper"
      style={
        {
          "--orbit-start": `${initialAngle}deg`,
        } as CSSProperties
      }
    >
      <div
        className="orbit-source__satellite"
        style={{
          transform: `translateX(${radius}px) translateY(-50%)`,
        }}
      >
        <div
          className="orbit-source__icon"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            backgroundColor: tech.bgColor,
            border: "2px solid rgba(255,255,255,0.92)",
            padding: `${iconSize * 0.125}px`,
          }}
        >
          {!imageError ? (
            <img
              src={tech.logo}
              alt={tech.name}
              title={tech.name}
              width={iconSize * 0.5}
              height={iconSize * 0.5}
              className="object-contain"
              style={{
                width: `${iconSize * 0.5}px`,
                height: `${iconSize * 0.5}px`,
              }}
              onError={() => setImageError(true)}
            />
          ) : (
            <span
              className="text-white font-bold"
              style={{
                fontSize: `${iconSize * 0.25}px`,
              }}
            >
              {tech.name.charAt(0)}
            </span>
          )}
        </div>

        <div
          className="orbit-source__tooltip"
          style={{
            top: `-${iconSize + 16}px`,
          }}
        >
          {tech.name}
          <div className="orbit-source__tooltip-arrow" />
        </div>
      </div>
    </div>
  );
}

export const TechnologyOrbit = memo(function TechnologyOrbit() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const containerSize = isMobile ? 260 : isTablet ? 340 : 420;
  const radius = isMobile ? 84 : isTablet ? 112 : 146;
  const iconSize = isMobile ? 42 : isTablet ? 52 : 68;
  const containerHeight = isMobile ? "min-h-[18rem]" : isTablet ? "min-h-[22rem]" : "min-h-[28rem]";

  return (
    <div className={`relative w-full ${containerHeight} flex items-center justify-center overflow-visible`}>
      <div
        className="relative"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
        }}
      >
        <div className="absolute inset-[14%] rounded-full border border-[rgba(43,168,160,0.18)]" />
        <div className="absolute inset-[26%] rounded-full border border-[rgba(30,136,229,0.12)]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(43,168,160,0.08),transparent_62%)]" />

        <div
          className="absolute z-30 flex flex-col items-center justify-center rounded-full border border-[rgba(43,168,160,0.2)] bg-white/92 text-center shadow-[0_22px_52px_rgba(13,66,63,0.12)] backdrop-blur-sm"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            width: isMobile ? "112px" : isTablet ? "152px" : "188px",
            height: isMobile ? "112px" : isTablet ? "152px" : "188px",
          }}
        >
          <h3 className={`${isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"} font-bold gradient-text`}>
            Klikcy
          </h3>
          <p className={`${isMobile ? "text-[11px]" : isTablet ? "text-sm" : "text-base"} mt-2 max-w-[12ch] text-[#475569]`}>
            Digital Solutions
          </p>
        </div>

        {techIcons.map((tech, index) => {
          const initialAngle = (index * 360) / techIcons.length;
          return (
            <TechIconWrapper
              key={tech.name}
              tech={tech}
              radius={radius}
              initialAngle={initialAngle}
              iconSize={iconSize}
            />
          );
        })}
      </div>
    </div>
  );
});
