"use client";

import { useMemo, useState } from "react";

import type { PracticeExerciseItem } from "@/lib/mock-practice";

import { ExerciseItem } from "@/components/practice/exercise-item";
import { buildSentenceShell, extractGapValuesFromSentence } from "@/components/practice/inputs/sentence-gap-input";
import { useWordBankUsage } from "@/components/practice/hooks/use-word-bank-usage";
import { WordBank } from "@/components/practice/word-bank";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { checkExerciseAnswers } from "@/lib/practice-answer-check";

type ExerciseCardProps = {
  exerciseNumber?: string;
  instruction: string;
  practiceSectionLabel?: string;
  wordBankLabel: string;
  words: string[];
  items: PracticeExerciseItem[];
  checkAnswersSignal?: number;
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
  checkAnswersSignal = 0,
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

  const itemContexts = useMemo(
    () =>
      items.map((item) => ({
        itemId: item.id,
        parts: item.parts,
        blankIds: item.blanks.map((blank) => blank.id),
        gapMarkers: item.blanks.map((blank) => blank.placeholder || ".........."),
      })),
    [items],
  );

  const [answersByItemId, setAnswersByItemId] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};

    for (const itemContext of itemContexts) {
      initial[itemContext.itemId] = buildSentenceShell(itemContext.parts, itemContext.gapMarkers);
    }

    return initial;
  });
  const isChecked = checkAnswersSignal > 0;

  const answersByBlankId = useMemo(() => {
    const nextAnswersByBlankId: Record<string, string> = {};

    for (const itemContext of itemContexts) {
      const values = extractGapValuesFromSentence({
        value: answersByItemId[itemContext.itemId] ?? "",
        parts: itemContext.parts,
        gapMarkers: itemContext.gapMarkers,
      });

      itemContext.blankIds.forEach((blankId, index) => {
        nextAnswersByBlankId[blankId] = values[index] ?? "";
      });
    }

    return nextAnswersByBlankId;
  }, [answersByItemId, itemContexts]);

  const answerTexts = useMemo(
    () => items.flatMap((item) => item.blanks.map((blank) => answersByBlankId[blank.id] ?? "")),
    [answersByBlankId, items],
  );

  const checkResult = useMemo(() => checkExerciseAnswers(items, answersByItemId), [answersByItemId, items]);

  const mistakesByItemId = useMemo(() => {
    const mistakes: Record<string, { expectedSentences: string[]; userSentence: string }> = {};
    for (const [itemId, result] of Object.entries(checkResult.byItemId)) {
      if (result.isCorrect) {
        continue;
      }

      mistakes[itemId] = {
        expectedSentences: result.expectedSentences,
        userSentence: result.userSentence,
      };
    }

    return mistakes;
  }, [checkResult.byItemId]);

  const usedWords = useWordBankUsage(words, answerTexts);

  const handleItemValueChange = (itemId: string, value: string) => {
    setAnswersByItemId((current) => ({
      ...current,
      [itemId]: value,
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

      <div className="mt-5 space-y-4 pr-1">
        {groupedItems.map((group) => {
          if (!group.numberLabel) {
            const single = group.entries[0];

            return (
              <ExerciseItem
                key={single.item.id}
                item={single.item}
                valuesByItemId={answersByItemId}
                onItemValueChange={handleItemValueChange}
                showMistakes={isChecked}
                mistakesByItemId={mistakesByItemId}
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
                        valuesByItemId={answersByItemId}
                        onItemValueChange={handleItemValueChange}
                        hideItemLabel
                        showMistakes={isChecked}
                        mistakesByItemId={mistakesByItemId}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {isChecked ? (
        <div className="mt-5 rounded-xl border bg-muted/40 px-3 py-2 text-sm">
          {checkResult.correctItems}/{checkResult.totalItems} correct. Mistakes: {checkResult.incorrectItems}
        </div>
      ) : null}
    </Card>
  );
}
