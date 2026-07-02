"use client";

import { useEffect, useState } from "react";

interface ObfuscatedContactEmailProps {
  className?: string;
}

/** Assembles contact email client-side to avoid plaintext mailto in server HTML. */
export function ObfuscatedContactEmail({ className }: ObfuscatedContactEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const user = process.env.NEXT_PUBLIC_CONTACT_EMAIL_USER || "build";
    const domain = process.env.NEXT_PUBLIC_CONTACT_EMAIL_DOMAIN || "klikcy.com";
    setEmail(`${user}@${domain}`);
  }, []);

  if (!email) {
    return (
      <button type="button" className={className} onClick={() => setEmail("build@klikcy.com")}>
        Reveal email
      </button>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
