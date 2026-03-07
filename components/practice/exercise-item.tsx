import type { PracticeExerciseItem } from "@/lib/mock-practice";

import { SentenceGapInput } from "@/components/practice/inputs/sentence-gap-input";

type ExerciseItemProps = {
  item: PracticeExerciseItem;
  valuesByBlankId: Record<string, string>;
  onBlankValueChange: (blankId: string, value: string) => void;
};

export function ExerciseItem({ item, valuesByBlankId, onBlankValueChange }: ExerciseItemProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex min-h-6 min-w-6 items-center justify-center rounded-md border px-2 text-xs ">
        {item.label}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {item.blanks.map((blank, blankIndex) => {
          const prefix = item.parts[blankIndex] ?? "";
          const suffix = item.parts[blankIndex + 1] ?? "";

          return (
            <SentenceGapInput
              key={blank.id}
              id={`${item.id}-${blank.id}`}
              prefix={prefix}
              suffix={suffix}
              value={valuesByBlankId[blank.id] ?? ""}
              onChange={(nextValue) => onBlankValueChange(blank.id, nextValue)}
              gapMarker={blank.placeholder || ".........."}
            />
          );
        })}
      </div>
    </div>
  );
}
