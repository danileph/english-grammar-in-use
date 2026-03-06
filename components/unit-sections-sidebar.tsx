"use client";

import { useEffect, useState } from "react";

import { SidebarMenu, SidebarMenuLinkItem } from "@/components/sidebar-menu";

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
      <div className="sticky top-24 rounded-2xl p-3 w-[240px]">
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
