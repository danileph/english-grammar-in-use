import { useMemo } from "react";
import { matchesAnswerOption } from "@/lib/practice-answer-check";

function isWordEntryUsed(entry: string, answers: string[]) {
  return answers.some((answer) => matchesAnswerOption(answer, entry));
}

export function useWordBankUsage(wordBank: string[], answerTexts: string[]) {
  return useMemo(() => {
    const used = new Set<string>();

    for (const word of wordBank) {
      if (isWordEntryUsed(word, answerTexts)) {
        used.add(word.toLowerCase());
      }
    }

    return used;
  }, [answerTexts, wordBank]);
}
