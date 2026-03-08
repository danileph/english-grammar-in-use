import type { PracticeExerciseItem } from "@/lib/mock-practice";

import { normalizeShellPart, SentenceGapInput } from "@/components/practice/inputs/sentence-gap-input";

function trimToGapSentence(prefix: string, suffix: string) {
  let nextPrefix = prefix;
  let nextSuffix = suffix;

  // Keep only the sentence fragment nearest the gap.
  const lastSentenceBreak = Math.max(prefix.lastIndexOf(". "), prefix.lastIndexOf("? "), prefix.lastIndexOf("! "));
  if (lastSentenceBreak >= 0) {
    nextPrefix = prefix.slice(lastSentenceBreak + 2);
  }

  // If this is an "or" alternative, keep only the local option near the gap.
  const orIndex = nextPrefix.lastIndexOf("(or ");
  if (orIndex >= 0) {
    nextPrefix = nextPrefix.slice(orIndex + "(or ".length);
  }

  const suffixOrIndex = nextSuffix.indexOf("(or ");
  if (suffixOrIndex >= 0) {
    nextSuffix = nextSuffix.slice(0, suffixOrIndex);
  }

  return { prefix: nextPrefix, suffix: nextSuffix };
}

function getLeadingContext(rawPrefix: string, trimmedPrefix: string) {
  if (!trimmedPrefix || !rawPrefix.endsWith(trimmedPrefix)) {
    return "";
  }

  return normalizeShellPart(rawPrefix.slice(0, rawPrefix.length - trimmedPrefix.length)).trim();
}

type ExerciseItemProps = {
  item: PracticeExerciseItem;
  valuesByBlankId: Record<string, string>;
  onBlankValueChange: (blankId: string, value: string) => void;
  hideItemLabel?: boolean;
};

export function ExerciseItem({ item, valuesByBlankId, onBlankValueChange, hideItemLabel = false }: ExerciseItemProps) {
  return (
    <div className="flex items-start gap-3">
      {!hideItemLabel ? (
        <span className="mt-0.5 inline-flex min-h-6 min-w-6 items-center justify-center rounded-md border px-2 text-xs ">
          {item.label}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {item.blanks.map((blank, blankIndex) => {
          const rawPrefix = item.parts[blankIndex] ?? "";
          const rawSuffix = item.parts[blankIndex + 1] ?? "";
          const { prefix, suffix } = trimToGapSentence(rawPrefix, rawSuffix);
          const leadingContext = getLeadingContext(rawPrefix, prefix);

          return (
            <div key={blank.id} className="flex flex-wrap items-center gap-x-2 gap-y-2">
              {leadingContext ? <span className="text-base text-foreground/90">{leadingContext}</span> : null}
              <SentenceGapInput
                id={`${item.id}-${blank.id}`}
                prefix={prefix}
                suffix={suffix}
                value={valuesByBlankId[blank.id] ?? ""}
                onChange={(nextValue) => onBlankValueChange(blank.id, nextValue)}
                gapMarker={blank.placeholder || ".........."}
                className="shrink-0"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
