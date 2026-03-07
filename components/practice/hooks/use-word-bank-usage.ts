import { useMemo } from "react";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildWordPattern(value: string) {
  const escaped = escapeRegExp(value.trim());
  return new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`, "i");
}

export function useWordBankUsage(wordBank: string[], answerTexts: string[]) {
  return useMemo(() => {
    const used = new Set<string>();

    for (const word of wordBank) {
      const matcher = buildWordPattern(word.toLowerCase());
      const isUsed = answerTexts.some((answer) => matcher.test(answer.toLowerCase()));

      if (isUsed) {
        used.add(word.toLowerCase());
      }
    }

    return used;
  }, [answerTexts, wordBank]);
}
