"use client";

import { useMemo, useState } from "react";

import type { PracticeExerciseItem } from "@/lib/mock-practice";

import { ExerciseItem } from "@/components/practice/exercise-item";
import { buildSentenceShell, extractGapValueFromSentence } from "@/components/practice/inputs/sentence-gap-input";
import { useWordBankUsage } from "@/components/practice/hooks/use-word-bank-usage";
import { WordBank } from "@/components/practice/word-bank";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function trimToGapSentence(prefix: string, suffix: string) {
  let nextPrefix = prefix;
  let nextSuffix = suffix;

  const lastSentenceBreak = Math.max(prefix.lastIndexOf(". "), prefix.lastIndexOf("? "), prefix.lastIndexOf("! "));
  if (lastSentenceBreak >= 0) {
    nextPrefix = prefix.slice(lastSentenceBreak + 2);
  }

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

type ExerciseCardProps = {
  exerciseNumber?: string;
  instruction: string;
  practiceSectionLabel?: string;
  wordBankLabel: string;
  words: string[];
  items: PracticeExerciseItem[];
};

type GroupedExerciseItems = {
  key: string;
  numberLabel: string | null;
  entries: Array<{ item: PracticeExerciseItem; subLabel: string | null }>;
};

function parseExerciseLabel(label: string) {
  const match = label.match(/^(\d+)([a-z])$/i);

  if (!match) {
    return null;
  }

  return {
    numberLabel: match[1],
    subLabel: match[2].toLowerCase(),
  };
}

export function ExerciseCard({
  exerciseNumber,
  instruction,
  practiceSectionLabel,
  wordBankLabel,
  words,
  items,
}: ExerciseCardProps) {
  const groupedItems = useMemo<GroupedExerciseItems[]>(() => {
    const groups = new Map<string, GroupedExerciseItems>();

    for (const item of items) {
      const parsed = parseExerciseLabel(item.label);
      const groupKey = parsed?.numberLabel ?? item.id;
      const currentGroup = groups.get(groupKey);

      if (currentGroup) {
        currentGroup.entries.push({ item, subLabel: parsed?.subLabel ?? null });
        continue;
      }

      groups.set(groupKey, {
        key: groupKey,
        numberLabel: parsed?.numberLabel ?? null,
        entries: [{ item, subLabel: parsed?.subLabel ?? null }],
      });
    }

    return [...groups.values()].map((group) => ({
      ...group,
      entries: [...group.entries].sort((a, b) => (a.subLabel ?? "").localeCompare(b.subLabel ?? "")),
    }));
  }, [items]);

  const blankContexts = useMemo(
    () =>
      items.flatMap((item) =>
        item.blanks.map((blank, blankIndex) => {
          const rawPrefix = item.parts[blankIndex] ?? "";
          const rawSuffix = item.parts[blankIndex + 1] ?? "";
          const { prefix, suffix } = trimToGapSentence(rawPrefix, rawSuffix);

          return {
            blankId: blank.id,
            prefix,
            suffix,
            gapMarker: blank.placeholder || "..........",
          };
        }),
      ),
    [items],
  );

  const [answersByBlankId, setAnswersByBlankId] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};

    for (const blank of blankContexts) {
      initial[blank.blankId] = buildSentenceShell(blank.prefix, blank.suffix, blank.gapMarker);
    }

    return initial;
  });

  const answerTexts = useMemo(
    () =>
      blankContexts.map((blank) =>
        extractGapValueFromSentence({
          value: answersByBlankId[blank.blankId] ?? "",
          prefix: blank.prefix,
          suffix: blank.suffix,
          gapMarker: blank.gapMarker,
        }),
      ),
    [answersByBlankId, blankContexts],
  );
  const usedWords = useWordBankUsage(words, answerTexts);

  const handleBlankValueChange = (blankId: string, value: string) => {
    setAnswersByBlankId((current) => ({
      ...current,
      [blankId]: value,
    }));
  };

  return (
    <Card className="rounded-2xl border bg-white/80 p-6 shadow-sm">
      <div className="flex flex-wrap items-start gap-2">
        {exerciseNumber ? (
          <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-xs font-semibold">
            {exerciseNumber}
          </Badge>
        ) : null}
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-foreground/90">
          {instruction}
          {practiceSectionLabel ? (
            <>
              {" "}
              <Badge
                variant="outline"
                className="inline-flex translate-y-[-1px] rounded-md border-none bg-primary/20 px-1.5 py-0.5 text-[11px] font-medium font-semibold uppercase text-primary"
              >
                {practiceSectionLabel}
              </Badge>
            </>
          ) : null}
        </p>
      </div>

      <div className="mt-5">
        <WordBank label={wordBankLabel} words={words} usedWords={usedWords} />
      </div>

      <div className="mt-5 space-y-4 overflow-y-auto pr-1">
        {groupedItems.map((group) => {
          if (!group.numberLabel) {
            const single = group.entries[0];

            return (
              <ExerciseItem
                key={single.item.id}
                item={single.item}
                valuesByBlankId={answersByBlankId}
                onBlankValueChange={handleBlankValueChange}
              />
            );
          }

          return (
            <div key={group.key} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex min-h-6 min-w-6 items-center justify-center rounded-md border px-2 text-xs">
                {group.numberLabel}
              </span>
              <div className="min-w-0 flex-1 space-y-4">
                {group.entries.map((entry) => (
                  <div key={entry.item.id} className="flex items-start gap-2">
                    {entry.subLabel ? (
                      <span className="pt-0.5 text-base font-medium text-foreground/90">{entry.subLabel})</span>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <ExerciseItem
                        item={entry.item}
                        valuesByBlankId={answersByBlankId}
                        onBlankValueChange={handleBlankValueChange}
                        hideItemLabel
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
