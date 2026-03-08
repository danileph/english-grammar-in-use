import { useMemo } from "react";

function tokenize(value: string) {
  return value.toLowerCase().match(/[a-z]+/g) ?? [];
}

function isConsonant(char: string | undefined) {
  return typeof char === "string" && /[bcdfghjklmnpqrstvwxyz]/.test(char);
}

function generateVerbForms(baseWord: string) {
  const base = baseWord.toLowerCase();
  const forms = new Set<string>([base]);

  if (!base) {
    return forms;
  }

  if (base === "have") {
    forms.add("has");
    forms.add("had");
    forms.add("having");
    return forms;
  }

  forms.add(`${base}s`);
  forms.add(`${base}ed`);
  forms.add(`${base}ing`);

  if (base.endsWith("e")) {
    forms.add(`${base}d`);
    forms.add(`${base.slice(0, -1)}ing`);
  }

  const last = base[base.length - 1];
  const secondLast = base[base.length - 2];
  const thirdLast = base[base.length - 3];
  const isCvc =
    base.length >= 3 &&
    !isConsonant(secondLast) &&
    isConsonant(last) &&
    isConsonant(thirdLast) &&
    !/[wxy]/.test(last);

  if (isCvc) {
    forms.add(`${base}${last}ed`);
    forms.add(`${base}${last}ing`);
  }

  return forms;
}

function isWordEntryUsed(entry: string, answers: string[]) {
  const entryTokens = tokenize(entry);
  if (entryTokens.length === 0) {
    return false;
  }

  const [headToken, ...tailTokens] = entryTokens;
  if (!headToken) {
    return false;
  }

  const headForms = generateVerbForms(headToken);

  return answers.some((answer) => {
    const answerTokens = tokenize(answer);
    if (answerTokens.length < entryTokens.length) {
      return false;
    }

    for (let index = 0; index <= answerTokens.length - entryTokens.length; index += 1) {
      const candidateHead = answerTokens[index];
      const candidateTail = answerTokens.slice(index + 1, index + entryTokens.length);

      if (!headForms.has(candidateHead)) {
        continue;
      }

      let tailMatches = true;
      for (let tailIndex = 0; tailIndex < tailTokens.length; tailIndex += 1) {
        if (candidateTail[tailIndex] !== tailTokens[tailIndex]) {
          tailMatches = false;
          break;
        }
      }

      if (tailMatches) {
        return true;
      }
    }

    return false;
  });
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
