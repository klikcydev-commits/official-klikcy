import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import { ClientProviders } from "@/components/layout/ClientProviders";
import { GoogleTagManagerBody, GoogleTagManagerHead } from "@/components/analytics/GoogleTagManager";
import { SITE } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const siteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: "%s",
    default: "Klikcy | Web Development, SEO & AI Automation",
  },
  description: SITE.description,
  applicationName: "Klikcy",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    siteName: "Klikcy",
    locale: "en_US",
    type: "website",
  },
  formatDetection: { telephone: false },
  ...(siteVerification ? { verification: { google: siteVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0F232F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={archivo.variable}>
      <body>
        <GoogleTagManagerHead />
        <GoogleTagManagerBody />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
