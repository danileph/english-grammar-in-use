import type { PracticeExerciseItem } from "@/lib/mock-practice";

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

export function matchesAnswerOption(answer: string, option: string) {
  const optionTokens = tokenize(option);
  if (optionTokens.length === 0) {
    return false;
  }

  const answerTokens = tokenize(answer);
  if (answerTokens.length < optionTokens.length) {
    return false;
  }

  const [headToken, ...tailTokens] = optionTokens;
  if (!headToken) {
    return false;
  }

  const headForms = generateVerbForms(headToken);

  for (let index = 0; index <= answerTokens.length - optionTokens.length; index += 1) {
    const candidateHead = answerTokens[index];
    if (!headForms.has(candidateHead)) {
      continue;
    }

    let tailMatches = true;
    for (let tailIndex = 0; tailIndex < tailTokens.length; tailIndex += 1) {
      if (answerTokens[index + 1 + tailIndex] !== tailTokens[tailIndex]) {
        tailMatches = false;
        break;
      }
    }

    if (tailMatches) {
      return true;
    }
  }

  return false;
}

function normalizeShellPart(value: string) {
  return value.replace(/\s*\^\s*/g, " ");
}

function buildSentenceFromParts(parts: string[], answers: string[]) {
  return parts.reduce((acc, part, index) => {
    const nextAnswer = answers[index] ?? "";
    return `${acc}${normalizeShellPart(part)}${nextAnswer}`;
  }, "");
}

function normalizeSentence(value: string) {
  return value
    .toLowerCase()
    .replace(/\s*\^\s*/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:?!)])/g, "$1")
    .replace(/([(])\s+/g, "$1")
    .trim();
}

export type ItemCheckResult = {
  itemId: string;
  userSentence: string;
  expectedSentences: string[];
  isAnswered: boolean;
  isCorrect: boolean;
};

export type ExerciseCheckResult = {
  byItemId: Record<string, ItemCheckResult>;
  totalItems: number;
  answeredItems: number;
  correctItems: number;
  incorrectItems: number;
};

export function checkExerciseAnswers(
  items: PracticeExerciseItem[],
  answersByItemId: Record<string, string>,
): ExerciseCheckResult {
  const byItemId: Record<string, ItemCheckResult> = {};
  let totalItems = 0;
  let answeredItems = 0;
  let correctItems = 0;

  for (const item of items) {
    totalItems += 1;
    const userSentence = answersByItemId[item.id] ?? "";
    const expectedSentences =
      item.correctSentences && item.correctSentences.length > 0
        ? item.correctSentences
        : [
            buildSentenceFromParts(
              item.parts,
              item.blanks.map((blank) => blank.options[0] ?? ""),
            ),
          ];

    const hasUnfilledPlaceholder = item.blanks.some((blank) =>
      userSentence.includes(blank.placeholder || ".........."),
    );
    const isAnswered = userSentence.trim().length > 0 && !hasUnfilledPlaceholder;

    if (isAnswered) {
      answeredItems += 1;
    }

    const normalizedUserSentence = normalizeSentence(userSentence);
    const isCorrect = expectedSentences.some(
      (expectedSentence) => normalizeSentence(expectedSentence) === normalizedUserSentence,
    );

    if (isCorrect) {
      correctItems += 1;
    }

    byItemId[item.id] = {
      itemId: item.id,
      userSentence,
      expectedSentences,
      isAnswered,
      isCorrect,
    };
  }

  return {
    byItemId,
    totalItems,
    answeredItems,
    correctItems,
    incorrectItems: totalItems - correctItems,
  };
}
