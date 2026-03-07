"use client";

import { useMemo, useState } from "react";

import type { PracticeExerciseItem } from "@/lib/mock-practice";

import { ExerciseItem } from "@/components/practice/exercise-item";
import { buildSentenceShell, extractGapValueFromSentence } from "@/components/practice/inputs/sentence-gap-input";
import { useWordBankUsage } from "@/components/practice/hooks/use-word-bank-usage";
import { WordBank } from "@/components/practice/word-bank";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type ExerciseCardProps = {
  exerciseNumber?: string;
  instruction: string;
  practiceSectionLabel?: string;
  wordBankLabel: string;
  words: string[];
  items: PracticeExerciseItem[];
};

export function ExerciseCard({
  exerciseNumber,
  instruction,
  practiceSectionLabel,
  wordBankLabel,
  words,
  items,
}: ExerciseCardProps) {
  const blankContexts = useMemo(
    () =>
      items.flatMap((item) =>
        item.blanks.map((blank, blankIndex) => ({
          blankId: blank.id,
          prefix: item.parts[blankIndex] ?? "",
          suffix: item.parts[blankIndex + 1] ?? "",
          gapMarker: blank.placeholder || "..........",
        })),
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
        {items.map((item) => (
          <ExerciseItem
            key={item.id}
            item={item}
            valuesByBlankId={answersByBlankId}
            onBlankValueChange={handleBlankValueChange}
          />
        ))}
      </div>
    </Card>
  );
}
