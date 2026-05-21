import type { CSSProperties } from "react";
import { memo, useEffect, useState } from "react";

const techIcons = [
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/ffffff", bgColor: "#000000" },
  { name: "WordPress", logo: "https://cdn.simpleicons.org/wordpress/ffffff", bgColor: "#21759B" },
  { name: "React Native", logo: "https://cdn.simpleicons.org/react/000000", bgColor: "#61DAFB" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/ffffff", bgColor: "#F24E1E" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/ffffff", bgColor: "#47A248" },
  { name: "AWS", logo: "/brand/tech/aws.svg", bgColor: "#232F3E", logoScale: 0.64 },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/ffffff", bgColor: "#000000" },
  { name: "Security", logo: "https://cdn.simpleicons.org/cloudflare/ffffff", bgColor: "#2BA8A0" },
  { name: "Wix", logo: "https://cdn.simpleicons.org/wix/ffffff", bgColor: "#FAAD4A" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/ffffff", bgColor: "#339933" },
  { name: "Shopify", logo: "https://cdn.simpleicons.org/shopify/ffffff", bgColor: "#96BF48" },
] as const;

type TechIcon = (typeof techIcons)[number] & { logoScale?: number };

function AwsOrbitMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="208 98 52 56"
      aria-hidden
      className="block shrink-0"
    >
      <path
        fill="#FF9900"
        d="M230.993 120.964c-27.888 20.599-68.408 31.534-103.247 31.534-48.827 0-92.821-18.056-126.05-48.064-2.628-2.373-.255-5.594 2.881-3.73c35.942 20.854 80.276 33.484 126.136 33.484 30.94 0 64.932-6.442 96.212-19.666 4.662-2.12 8.646 3.052 4.068 6.442m11.614-13.224c-3.56-4.577-23.566-2.204-32.636-1.102-2.713.34-3.137-2.034-.678-3.814c15.936-11.19 42.13-7.968 45.181-4.239 3.052 3.815-.848 30.008-15.767 42.554-2.288 1.95-4.492.933-3.475-1.61c3.39-8.393 10.935-27.296 7.375-31.789"
      />
    </svg>
  );
}

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
  const logoScale = tech.logoScale ?? 0.5;
  const logoPx = iconSize * logoScale;

  return (
    <div
      className="orbit-source__wrapper"
      style={
        {
          "--orbit-start": `${initialAngle}deg`,
          "--orbit-radius": `${radius}px`,
        } as CSSProperties
      }
    >
      <div className="orbit-source__satellite">
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
          {tech.name === "AWS" ? (
            <AwsOrbitMark size={logoPx} />
          ) : !imageError ? (
            <img
              src={tech.logo}
              alt={tech.name}
              title={tech.name}
              width={logoPx}
              height={logoPx}
              className="object-contain"
              decoding="async"
              referrerPolicy="no-referrer"
              style={{
                width: `${logoPx}px`,
                height: `${logoPx}px`,
              }}
              onError={() => setImageError(true)}
            />
          ) : (
            <span
              className="font-bold text-white"
              style={{
                fontSize: tech.name.length <= 3 ? `${iconSize * 0.2}px` : `${iconSize * 0.25}px`,
                letterSpacing: "-0.02em",
              }}
            >
              {tech.name.length <= 3 ? tech.name : tech.name.charAt(0)}
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
        <div className="absolute inset-[14%] rounded-full border border-[rgba(43,168,160,0.18)]" aria-hidden />
        <div className="absolute inset-[26%] rounded-full border border-[rgba(30,136,229,0.12)]" aria-hidden />
        <div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(43,168,160,0.08),transparent_62%)]"
          aria-hidden
        />

        {/* Single rotator — tech icons orbit; rings/gradient stay fixed */}
        <div className="orbit-rotator">
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
      </div>
    </div>
  );
});
