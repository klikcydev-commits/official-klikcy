import type { CategorySlug } from "@/lib/categories";

/**
 * Images shown on each practice in the homepage "What we do" section.
 *
 * TEMPORARY: these are free stock photos from Unsplash (Unsplash License, commercial use
 * allowed, no attribution required), added so the layout can be previewed. They are NOT
 * Klikcy client work, so the page must never caption or describe them as "our work" or
 * "case studies".
 *
 * To replace one: save a real project screenshot as public/images/practices/<slug>.webp
 * (about 900 x 560, under 120 KB), update `alt` to describe it, and set `stock: false`.
 */
export interface PracticeImage {
  src: string;
  alt: string;
  stock: boolean;
  /** Original source, kept for licensing records. */
  source?: string;
}

export const practiceImages: Record<CategorySlug, PracticeImage> = {
  "web-development": {
    src: "/images/practices/web-development.webp",
    alt: "Laptop on a desk showing an online store's product page",
    stock: true,
    source: "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
  },
  "seo-aeo": {
    src: "/images/practices/seo-aeo.webp",
    alt: "Laptop showing a website analytics dashboard with traffic charts",
    stock: true,
    source: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  "ai-automation": {
    src: "/images/practices/ai-automation.webp",
    alt: "An AI assistant screen offering to summarize text, write code, and brainstorm",
    stock: true,
    source: "https://images.unsplash.com/photo-1762340277219-17cba0c9bca0",
  },
  "app-software": {
    src: "/images/practices/app-software.webp",
    alt: "Hand holding a phone showing a mobile app dashboard",
    stock: true,
    source: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
  },
  ecommerce: {
    src: "/images/practices/ecommerce.webp",
    alt: "Small business owner checking an order on her phone next to packed boxes",
    stock: true,
    source: "https://images.unsplash.com/photo-1770013413878-2530e2c3d82b",
  },
  "branding-design": {
    src: "/images/practices/branding-design.webp",
    alt: "Designer sketching mobile app wireframes on paper",
    stock: true,
    source: "https://images.unsplash.com/photo-1576153192396-180ecef2a715",
  },
  "marketing-growth": {
    src: "/images/practices/marketing-growth.webp",
    alt: "Laptop showing marketing performance charts and a world map",
    stock: true,
    source: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
  },
  "technical-hosting": {
    src: "/images/practices/technical-hosting.webp",
    alt: "Network cables connected to servers in a data center rack",
    stock: true,
    source: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  },
};
