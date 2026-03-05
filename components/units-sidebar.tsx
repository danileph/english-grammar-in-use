"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, CircleArrowDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
        <h2 className="text-4xl font-semibold tracking-tight">Units</h2>
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search units..."
            className="h-12 rounded-2xl border bg-background pl-9 text-base"
          />
        </div>
      </div>

      <div className="max-h-[calc(100vh-13rem)] overflow-y-auto px-3 py-2">
        {filteredGroups.map((group) => (
          <section key={group.topic} className="border-b py-3 last:border-b-0">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[38px] font-semibold leading-none tracking-tight">{group.topic}</h3>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              {group.units.map((unit) => {
                const href = `/units/${unit.id}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={unit.id}
                    href={href}
                    className={cn(
                      "flex items-center gap-2 rounded-2xl px-3 py-2 transition-colors",
                      isActive ? "bg-secondary/70" : "hover:bg-muted/70",
                    )}
                  >
                    {unit.status === "IN_PROGRESS" ? (
                      <CircleArrowDown className="h-6 w-6 shrink-0 text-muted-foreground" />
                    ) : (
                      <span
                        className={cn(
                          "inline-flex h-7 min-w-7 items-center justify-center rounded-md border bg-background px-1 text-sm font-semibold text-muted-foreground",
                          isActive && "border-primary/30 bg-primary/15 text-primary",
                        )}
                      >
                        {unit.order}
                      </span>
                    )}
                    <span className="line-clamp-2 flex-1 text-xl leading-tight">{unit.title}</span>
                  </Link>
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
