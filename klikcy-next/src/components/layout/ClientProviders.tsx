"use client";

import dynamic from "next/dynamic";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeRoot } from "@/components/layout/ThemeRoot";
import { LegacyRedirect } from "@/components/layout/LegacyRedirect";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const LenisGsapProvider = dynamic(
  () => import("@/components/layout/LenisGsapProvider").then((m) => m.LenisGsapProvider),
  { ssr: false },
);

const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);

const PageTransition = dynamic(
  () => import("@/components/layout/PageTransition").then((m) => m.PageTransition),
  { ssr: false },
);

interface ClientProvidersProps {
  children: React.ReactNode;
}

/** Motion extras (Lenis, cursor, route transitions) load only on fine-pointer desktops to protect mobile CWV. */
function DesktopMotionExtras() {
  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)", false);
  if (!isDesktop) return null;

  return (
    <LenisGsapProvider>
      <CustomCursor />
      <PageTransition />
    </LenisGsapProvider>
  );
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeRoot>
      <DesktopMotionExtras />
      <LegacyRedirect />
      <TooltipProvider>
        <Sonner />
        {children}
      </TooltipProvider>
    </ThemeRoot>
  );
}
