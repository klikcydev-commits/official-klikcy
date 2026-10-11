"use client";

import { Toaster } from "@/components/ui/sonner";

interface ClientProvidersProps {
  children: React.ReactNode;
}

/** Legacy URL redirects are handled at the edge (next.config.mjs → src/lib/redirects.mjs). */
export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
