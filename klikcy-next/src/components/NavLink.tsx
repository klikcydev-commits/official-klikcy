"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, href, ...props }, ref) => {
    const pathname = usePathname() ?? "/";
    const hrefStr = typeof href === "string" ? href : href.pathname ?? "";
    const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
    const normalizedHref = hrefStr.endsWith("/") ? hrefStr : `${hrefStr}/`;
    const isActive = normalizedPath === normalizedHref || normalizedPath === hrefStr;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName, pendingClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
