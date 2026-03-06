"use client";

import { useEffect, useState } from "react";

import { SidebarMenu, SidebarMenuLinkItem } from "@/components/sidebar-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type UnitSectionItem = {
  id: string;
  label: string;
  title: string;
};

type UnitSectionsSidebarProps = {
  sections: UnitSectionItem[];
  unitOrder: number;
  progressStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  progressPercentage: number;
};

const progressStatusLabel = {
  NOT_STARTED: "not started",
  IN_PROGRESS: "in progress",
  COMPLETED: "completed",
} as const;

export function UnitSectionsSidebar({
  sections,
  unitOrder,
  progressStatus,
  progressPercentage,
}: UnitSectionsSidebarProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const normalizedProgress = Math.min(100, Math.max(0, progressPercentage));

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
      <div className="sticky top-24 rounded-2xl p-3 w-[240px]">
        <div className="mb-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight">Unit {unitOrder}</h2>
            <Badge
              variant={progressStatus === "COMPLETED" ? "default" : progressStatus === "IN_PROGRESS" ? "secondary" : "outline"}
            >
              {progressStatusLabel[progressStatus]}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Accuracy</p>
              <p className="text-xs text-muted-foreground tracking-tight">{normalizedProgress}%</p>
            </div>
            <Progress value={normalizedProgress} className="h-2 bg-secondary/60" />
          </div>
        </div>

        <SidebarMenu title="Unit sections">
          {sections.map((section) => {
            const isActive = section.id === activeId;

            return (
              <SidebarMenuLinkItem
                key={section.id}
                href={`#${section.id}`}
                isActive={isActive}
                badge={section.label}
                title={section.title}
                onClick={() => setActiveId(section.id)}
              />
            );
          })}
        </SidebarMenu>
      </div>
    </aside>
  );
}
