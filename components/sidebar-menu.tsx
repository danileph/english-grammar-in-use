"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SidebarMenuProps = {
  title?: string;
  className?: string;
  titleClassName?: string;
  navClassName?: string;
  children: ReactNode;
};

type SidebarMenuLinkItemProps = {
  href: string;
  badge: ReactNode;
  title: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  badgeClassName?: string;
  activeBadgeClassName?: string;
  inactiveBadgeClassName?: string;
  titleClassName?: string;
};

export function SidebarMenu({
  title,
  className,
  titleClassName,
  navClassName,
  children,
}: SidebarMenuProps) {
  return (
    <div className={className}>
      {title && (
        <p
          className={cn(
            "px-2 pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground",
            titleClassName,
          )}
        >
          {title}
        </p>
      )}
      <nav className={cn("space-y-1", navClassName)}>{children}</nav>
    </div>
  );
}

export function SidebarMenuLinkItem({
  href,
  badge,
  title,
  isActive = false,
  onClick,
  className,
  activeClassName,
  inactiveClassName,
  badgeClassName,
  activeBadgeClassName,
  inactiveBadgeClassName,
  titleClassName,
}: SidebarMenuLinkItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl px-2 py-2 text-sm transition-colors",
        isActive ? "text-foreground bg-secondary/70" : "text-muted-foreground hover:bg-muted/70",
        isActive && activeClassName,
        !isActive && inactiveClassName,
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold",
          isActive
            ? "text-primary min-w-7 px-1 text-sm border-primary/30 bg-primary/15"
            : "border-border bg-background text-muted-foreground",
          isActive && activeBadgeClassName,
          !isActive && inactiveBadgeClassName,
          badgeClassName,
        )}
      >
        {badge}
      </span>
      <span className={cn("line-clamp-2 leading-tight", titleClassName)}>{title}</span>
    </Link>
  );
}
