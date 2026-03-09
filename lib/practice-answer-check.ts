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

export type BlankCheckResult = {
  blankId: string;
  userAnswer: string;
  expectedOptions: string[];
  isAnswered: boolean;
  isCorrect: boolean;
};

export type ExerciseCheckResult = {
  byBlankId: Record<string, BlankCheckResult>;
  totalBlanks: number;
  answeredBlanks: number;
  correctBlanks: number;
  incorrectBlanks: number;
};

export function checkExerciseAnswers(
  items: PracticeExerciseItem[],
  answersByBlankId: Record<string, string>,
): ExerciseCheckResult {
  const byBlankId: Record<string, BlankCheckResult> = {};
  let totalBlanks = 0;
  let answeredBlanks = 0;
  let correctBlanks = 0;

  for (const item of items) {
    for (const blank of item.blanks) {
      totalBlanks += 1;
      const userAnswer = answersByBlankId[blank.id] ?? "";
      const isAnswered = userAnswer.trim().length > 0;

      if (isAnswered) {
        answeredBlanks += 1;
      }

      const isCorrect = blank.options.some((option) => matchesAnswerOption(userAnswer, option));
      if (isCorrect) {
        correctBlanks += 1;
      }

      byBlankId[blank.id] = {
        blankId: blank.id,
        userAnswer,
        expectedOptions: blank.options,
        isAnswered,
        isCorrect,
      };
    }
  }

  return {
    byBlankId,
    totalBlanks,
    answeredBlanks,
    correctBlanks,
    incorrectBlanks: totalBlanks - correctBlanks,
  };
}
