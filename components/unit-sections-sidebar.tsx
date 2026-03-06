"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type UnitSectionItem = {
  id: string;
  label: string;
  title: string;
};

type UnitSectionsSidebarProps = {
  sections: UnitSectionItem[];
};

export function UnitSectionsSidebar({ sections }: UnitSectionsSidebarProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-24% 0px -56% 0px",
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 rounded-2xl border bg-white p-3 shadow-sm">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Unit sections
        </p>
        <nav className="space-y-1">
          {sections.map((section) => {
            const isActive = section.id === activeId;

            return (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-2 py-2 text-sm transition-colors",
                  "hover:bg-muted/70",
                  isActive ? "bg-muted text-foreground" : "text-muted-foreground",
                )}
                onClick={() => setActiveId(section.id)}
              >
                <span
                  className={cn(
                    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold",
                    isActive
                      ? "border-primary/35 bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground",
                  )}
                >
                  {section.label}
                </span>
                <span className="line-clamp-2 leading-tight">{section.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
