"use client";

import { useMemo, useState } from "react";

import type { PracticeExerciseItem } from "@/lib/mock-practice";

import { ExerciseItem } from "@/components/practice/exercise-item";
import { buildSentenceShell } from "@/components/practice/inputs/sentence-gap-input";
import { useWordBankUsage } from "@/components/practice/hooks/use-word-bank-usage";
import { WordBank } from "@/components/practice/word-bank";
import { Card } from "@/components/ui/card";

type ExerciseCardProps = {
  instruction: string;
  wordBankLabel: string;
  words: string[];
  items: PracticeExerciseItem[];
};

export function ExerciseCard({ instruction, wordBankLabel, words, items }: ExerciseCardProps) {
  const [answersByBlankId, setAnswersByBlankId] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};

    for (const item of items) {
      for (const [blankIndex, blank] of item.blanks.entries()) {
        const prefix = item.parts[blankIndex] ?? "";
        const suffix = item.parts[blankIndex + 1] ?? "";
        initial[blank.id] = buildSentenceShell(prefix, suffix, blank.placeholder || "..........");
      }
    }

    return initial;
  });

  const answerTexts = useMemo(() => Object.values(answersByBlankId), [answersByBlankId]);
  const usedWords = useWordBankUsage(words, answerTexts);

  const handleBlankValueChange = (blankId: string, value: string) => {
    setAnswersByBlankId((current) => ({
      ...current,
      [blankId]: value,
    }));
  };

  return (
    <Card className="rounded-2xl border bg-white/80 p-6 shadow-sm">
      <p className="text-sm leading-relaxed text-foreground/90">{instruction}</p>

      <div className="mt-5">
        <WordBank label={wordBankLabel} words={words} usedWords={usedWords} />
      </div>

      <div className="mt-5 max-h-[48vh] space-y-4 overflow-y-auto pr-1">
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
