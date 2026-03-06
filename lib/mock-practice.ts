export type PracticeBlank = {
  id: string;
  placeholder: string;
  options: string[];
  value?: string;
};

export type PracticeExerciseItem = {
  id: string;
  label: string;
  parts: string[];
  blanks: PracticeBlank[];
};

export type PracticeExerciseStep = {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
};

export type PracticeMockData = {
  contextLine: string;
  pageTitle: string;
  lessonTitleLineOne: string;
  lessonTitleLineTwo: string;
  instruction: string;
  wordBankLabel: string;
  wordBank: string[];
  exerciseItems: PracticeExerciseItem[];
  steps: PracticeExerciseStep[];
  completedExercises: number;
  totalExercises: number;
  currentExerciseNumber: number;
};

export function getPracticeMockData(unitOrder: number): PracticeMockData {
  return {
    contextLine: `Advanced Grammar · Unit ${unitOrder}`,
    pageTitle: `Unit ${unitOrder}: Practice Exercises`,
    lessonTitleLineOne: "Present Continuous vs Present Simple:",
    lessonTitleLineTwo: "State Verbs & Performatives",
    instruction:
      "Complete each pair of sentences using the same verb (in a question or negative form if necessary). If the present continuous is not possible, use present simple. Use do, don't, am and isn't outside the gaps where needed.",
    wordBankLabel: "Words",
    wordBank: ["attract", "consist of", "doubt", "feel", "fit", "have", "like", "look", "measure", "sound"],
    completedExercises: 5,
    totalExercises: 10,
    currentExerciseNumber: 6,
    steps: [
      { id: "1", label: "1. Complete sentences", status: "completed" },
      { id: "2", label: "2. Cross out improbable answers", status: "current" },
      { id: "3", label: "3. Choose correct verb forms", status: "upcoming" },
      { id: "4", label: "4. Correct mistakes", status: "upcoming" },
      { id: "5", label: "5. Rewrite with contractions", status: "upcoming" },
    ],
    exerciseItems: [
      {
        id: "example",
        label: "0",
        parts: ["I ", " / I'm having your house repainted."],
        blanks: [{ id: "blank-0", placeholder: "have", options: ["have", "am having"], value: "have" }],
      },
      {
        id: "1a",
        label: "1a",
        parts: ["I thought this new dress totally ", " me. "],
        blanks: [{ id: "blank-1", placeholder: "...", options: ["suits", "is suiting", "fit", "looks"], value: "suits" }],
      },
      {
        id: "1b",
        label: "1b",
        parts: ["Are you still trying to find the wallet? It ", " right in front of you."],
        blanks: [{ id: "blank-2", placeholder: "...", options: ["lies", "is lying", "stands", "is standing"] }],
      },
      {
        id: "2a",
        label: "2a",
        parts: ["What's ", " the group doing by the hotel? It ", " like they are measuring the area."],
        blanks: [
          { id: "blank-3", placeholder: "...", options: ["that", "this", "those"] },
          { id: "blank-4", placeholder: "...", options: ["looks", "is looking", "sounds", "is sounding"] },
        ],
      },
      {
        id: "3a",
        label: "3a",
        parts: ["I'm glad the singer ", " whether he'll get another chance."],
        blanks: [{ id: "blank-5", placeholder: "...", options: ["doubts", "is doubting", "is wondering"] }],
      },
      {
        id: "4a",
        label: "4a",
        parts: ["Fiona's new work-measurement trousers ", " from her brightly coloured jackets."],
        blanks: [{ id: "blank-6", placeholder: "...", options: ["differ", "are differing", "look"] }],
      },
      {
        id: "5b",
        label: "5b",
        parts: ["Every child had been to a zoo? Well, at the ", ", all right?"],
        blanks: [{ id: "blank-7", placeholder: "...", options: ["very least", "minimum", "smallest"] }],
      },
      {
        id: "6a",
        label: "6a",
        parts: ["The boys ", " garage for garage today."],
        blanks: [{ id: "blank-8", placeholder: "...", options: ["measure", "are measuring", "have measured"] }],
      },
    ],
  };
}
