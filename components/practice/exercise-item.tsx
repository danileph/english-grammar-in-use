import { ChevronDown } from "lucide-react";

import type { PracticeExerciseItem } from "@/lib/mock-practice";

type ExerciseItemProps = {
  item: PracticeExerciseItem;
};

export function ExerciseItem({ item }: ExerciseItemProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex min-h-6 min-w-6 items-center justify-center rounded-md border bg-secondary/70 px-2 text-xs font-semibold text-primary">
        {item.label}
      </span>
      <p className="flex flex-wrap items-center gap-2 text-base leading-relaxed text-foreground/90 sm:text-lg">
        {item.parts.map((part, index) => (
          <span key={`${item.id}-part-${index}`} className="contents">
            {part}
            {item.blanks[index] ? <InlineBlank value={item.blanks[index].value ?? item.blanks[index].placeholder} /> : null}
          </span>
        ))}
      </p>
    </div>
  );
}

function InlineBlank({ value }: { value: string }) {
  return (
    <span className="inline-flex h-10 min-w-36 items-center justify-between rounded-lg border bg-background px-3 text-base text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] sm:h-11 sm:min-w-40 sm:text-lg">
      <span>{value}</span>
      <ChevronDown className="h-4 w-4" />
    </span>
  );
}
