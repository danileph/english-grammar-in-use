import { Bookmark, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UnitMetaBarProps = {
  estimatedMinutes: number;
  learnersLabel: string;
  className?: string;
};

export function UnitMetaBar({ estimatedMinutes, learnersLabel, className }: UnitMetaBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-3 bg-white/70", className)}>
      <div className="flex min-w-0 flex-wrap items-center gap-3 text-sm text-muted-foreground sm:text-base">
        <span className="inline-flex items-center gap-2">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          <span>Estimated time: {estimatedMinutes} min</span>
        </span>

        <span className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />

        <span className="inline-flex items-center gap-2">
          <Bookmark className="h-4 w-4" aria-hidden="true" />
          <span>{learnersLabel}</span>
        </span>
      </div>

      <div className="ml-auto flex w-full items-center justify-end gap-2 sm:w-auto">
        <Button className="rounded-xl px-6">Start practice</Button>
        <Button variant="ghost" className="rounded-xl border px-4 text-foreground">
          <Bookmark className="h-4 w-4" aria-hidden="true" />
          Bookmark
        </Button>
      </div>
    </div>
  );
}
