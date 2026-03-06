"use client";

import { usePathname } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { SidebarMenuLinkItem } from "@/components/sidebar-menu";
import { Input } from "@/components/ui/input";

type SidebarUnit = {
  id: string;
  title: string;
  order: number;
  topic: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};

type UnitsSidebarProps = {
  groups: Array<{
    topic: string;
    units: SidebarUnit[];
  }>;
};

export function UnitsSidebar({ groups }: UnitsSidebarProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    if (!query.trim()) {
      return groups;
    }

    const normalizedQuery = query.toLowerCase().trim();

    return groups
      .map((group) => ({
        ...group,
        units: group.units.filter((unit) => unit.title.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((group) => group.units.length > 0);
  }, [groups, query]);

  return (
    <aside className="bg-white/85">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold tracking-tight">Units</h2>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search units..."
            className="rounded-xl border bg-background pl-9 text-base"
          />
        </div>
      </div>

      <div className="h-[calc(100vh-260px)] overflow-y-auto px-3 py-2">
        {filteredGroups.map((group) => (
          <section key={group.topic} className="border-b py-3 last:border-b-0">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{group.topic}</h3>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              {group.units.map((unit) => {
                const href = `/units/${unit.order}`;
                const isActive = pathname === href;
                return (
                  <SidebarMenuLinkItem
                    key={unit.id}
                    href={href}
                    isActive={isActive}
                    badge={unit.order}
                    title={unit.title}
                    className="px-3"
                    activeClassName=""
                    badgeClassName=""
                    activeBadgeClassName=""
                  />
                );
              })}
            </div>
          </section>
        ))}

        {filteredGroups.length === 0 && (
          <p className="px-3 py-4 text-sm text-muted-foreground">No units found for this search.</p>
        )}
      </div>
    </aside>
  );
}
