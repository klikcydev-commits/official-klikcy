import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Klikcy",
    short_name: "Klikcy",
    description:
      "Websites, search visibility, AI automation, and software for U.S. businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0F232F",
    icons: [
      {
        src: "/favicon-48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
