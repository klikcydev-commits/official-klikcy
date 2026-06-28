import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import { ClientProviders } from "@/components/layout/ClientProviders";
import { GoogleTagManagerBody, GoogleTagManagerHead } from "@/components/analytics/GoogleTagManager";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.klikcy.com"),
  title: {
    template: "%s",
    default: "Klikcy | Nationwide Web Development, SEO & AI Automation Agency",
  },
  description:
    "Klikcy builds fast websites, SEO/AEO systems, AI automations, branding, and e-commerce solutions for businesses across the United States.",
  openGraph: {
    siteName: "Klikcy",
    locale: "en_US",
    type: "website",
  },
  ...(siteVerification ? { verification: { google: siteVerification } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        <GoogleTagManagerHead />
        <GoogleTagManagerBody />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
