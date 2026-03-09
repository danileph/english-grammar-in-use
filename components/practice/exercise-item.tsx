import type { PracticeExerciseItem } from "@/lib/mock-practice";

import { SentenceGapInput } from "@/components/practice/inputs/sentence-gap-input";

type ExerciseItemProps = {
  item: PracticeExerciseItem;
  valuesByItemId: Record<string, string>;
  onItemValueChange: (itemId: string, value: string) => void;
  hideItemLabel?: boolean;
  showMistakes?: boolean;
  mistakesByItemId?: Record<string, { expectedSentences: string[]; userSentence: string }>;
};

export function ExerciseItem({
  item,
  valuesByItemId,
  onItemValueChange,
  hideItemLabel = false,
  showMistakes = false,
  mistakesByItemId,
}: ExerciseItemProps) {
  const gapMarkers = item.blanks.map((blank) => blank.placeholder || "..........");
  const mistake = mistakesByItemId?.[item.id];
  const hasMistakes = showMistakes && Boolean(mistake);

  return (
    <div className="flex items-start gap-3">
      {!hideItemLabel ? (
        <span className="mt-0.5 inline-flex min-h-6 min-w-6 items-center justify-center rounded-md border px-2 text-xs ">
          {item.label}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
          <SentenceGapInput
            id={`${item.id}-gaps`}
            parts={item.parts}
            gapMarkers={gapMarkers}
            value={valuesByItemId[item.id] ?? ""}
            onChange={(nextValue) => onItemValueChange(item.id, nextValue)}
            className="min-w-0 flex-1"
          />
        </div>
        {hasMistakes ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
            Correct sentence: {(mistake?.expectedSentences ?? []).join(" / ")}
          </div>
        ) : null}
      </div>
    </div>
  );
}
