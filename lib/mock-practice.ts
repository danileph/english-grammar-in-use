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
  correctSentences?: string[];
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
  practiceSectionLabel?: string;
  wordBankLabel: string;
  wordBank: string[];
  exerciseItems: PracticeExerciseItem[];
  steps: PracticeExerciseStep[];
  completedExercises: number;
  totalExercises: number;
  currentExerciseNumber: number;
};

const unit1Exercise11: PracticeMockData = {
  contextLine: "Advanced Grammar in Use · Unit 1 · Exercise 1.1",
  pageTitle: "Unit 1: Exercise 1.1",
  lessonTitleLineOne: "State verbs and the present continuous",
  lessonTitleLineTwo: "Exercise 1.1",
  instruction:
    "Complete each pair of sentences using the same verb (in a question form or negative if necessary) from the box. Use the present continuous; if this is not possible, use the present simple. You may use any words outside the gap and contracted forms where appropriate.",
  practiceSectionLabel: "A & B",
  wordBankLabel: "A & B",
  wordBank: ["attract", "consist of", "doubt", "feel", "fit", "have", "like", "look", "measure", "sound"],
  completedExercises: 0,
  totalExercises: 1,
  currentExerciseNumber: 1,
  steps: [{ id: "1.1", label: "1.1 Complete each pair of sentences", status: "current" }],
  exerciseItems: [
    {
      id: "1a",
      label: "1a",
      parts: ["I hear you're having your house repainted. How ^ it ", " ? (or How ^ it ", " ?)"],
      blanks: [
        { id: "1a-blank-1", placeholder: "................", options: ["look"] },
        { id: "1a-blank-2", placeholder: "................", options: ["look"] },
      ],
      correctSentences: [
        "I hear you're having your house repainted. How does it look? (or How is it looking?)",
        "I hear you're having your house repainted. How's it looking? (or How does it look?)",
      ],
    },
    {
      id: "1b",
      label: "1b",
      parts: ["I bought this new dress today. How ^ it ", " ?"],
      blanks: [{ id: "1b-blank-1", placeholder: "................", options: ["look"] }],
      correctSentences: ["I bought this new dress today. How does it look?"],
    },
    {
      id: "2a",
      label: "2a",
      parts: ["A: What are you doing with that ruler? B: I ", " the area of the kitchen."],
      blanks: [{ id: "2a-blank-1", placeholder: "................", options: ["measure"] }],
      correctSentences: ["A: What are you doing with that ruler? B: I am measuring the area of the kitchen."],
    },
    {
      id: "2b",
      label: "2b",
      parts: ["The garden ", " 12 by 20 metres."],
      blanks: [{ id: "2b-blank-1", placeholder: "................", options: ["measure"] }],
      correctSentences: ["The garden measures 12 by 20 metres."],
    },
    {
      id: "3a",
      label: "3a",
      parts: ["I ", " whether I'll get another chance to retake the exam."],
      blanks: [{ id: "3a-blank-1", placeholder: "................", options: ["doubt"] }],
      correctSentences: ["I doubt whether I'll get another chance to retake the exam."],
    },
    {
      id: "3b",
      label: "3b",
      parts: ["I suppose she might be at home tonight, but I ", " it."],
      blanks: [{ id: "3b-blank-1", placeholder: "................", options: ["doubt"] }],
      correctSentences: ["I suppose she might be at home tonight, but I doubt it."],
    },
    {
      id: "4a",
      label: "4a",
      parts: ["The new science museum currently ", " 10,000 visitors a month."],
      blanks: [{ id: "4a-blank-1", placeholder: "................", options: ["attract"] }],
      correctSentences: ["The new science museum currently attracts 10,000 visitors a month."],
    },
    {
      id: "4b",
      label: "4b",
      parts: ["Flowers ", " bees with their brightly-coloured petals."],
      blanks: [{ id: "4b-blank-1", placeholder: "................", options: ["attract"] }],
      correctSentences: ["Flowers attract bees with their brightly-coloured petals."],
    },
    {
      id: "5a",
      label: "5a",
      parts: ["Carlos won't work at the top of the 20-storey building because he ", " heights."],
      blanks: [{ id: "5a-blank-1", placeholder: "................", options: ["like"] }],
      correctSentences: ["Carlos won't work at the top of the 20-storey building because he doesn't like heights."],
    },
    {
      id: "5b",
      label: "5b",
      parts: ["A: How's the new job? B: Well, at the moment, I ", " it at all."],
      blanks: [{ id: "5b-blank-1", placeholder: "................", options: ["like"] }],
      correctSentences: [
        "A: How's the new job? B: Well, at the moment, I don't like it at all.",
        "A: How's the new job? B: Well, at the moment, I'm not liking it at all.",
      ],
    },
    {
      id: "6a",
      label: "6a",
      parts: ["My car's in the garage today. They ", " new brakes."],
      blanks: [{ id: "6a-blank-1", placeholder: "................", options: ["fit"] }],
      correctSentences: ["My car's in the garage today. They are fitting new brakes."],
    },
    {
      id: "6b",
      label: "6b",
      parts: ["I bought this jumper for Anna, but it ", " her so I'll have to take it back."],
      blanks: [{ id: "6b-blank-1", placeholder: "................", options: ["fit"] }],
      correctSentences: ["I bought this jumper for Anna, but it doesn't fit her so I'll have to take it back."],
    },
    {
      id: "7a",
      label: "7a",
      parts: ["What's your shirt made from? It ", " like silk."],
      blanks: [{ id: "7a-blank-1", placeholder: "................", options: ["feel"] }],
      correctSentences: ["What's your shirt made from? It feels like silk."],
    },
    {
      id: "7b",
      label: "7b",
      parts: ["I won't be coming to work today. I ", " very well."],
      blanks: [{ id: "7b-blank-1", placeholder: "................", options: ["feel"] }],
      correctSentences: [
        "I won't be coming to work today. I don't feel very well.",
        "I won't be coming to work today. I'm not feeling very well.",
      ],
    },
    {
      id: "8a",
      label: "8a",
      parts: ["The roof of the house ", " only plastic sheets nailed down in a few places."],
      blanks: [{ id: "8a-blank-1", placeholder: "................", options: ["consist of"] }],
      correctSentences: ["The roof of the house consists of only plastic sheets nailed down in a few places."],
    },
    {
      id: "8b",
      label: "8b",
      parts: ["Their school uniform ", " black trousers and a dark green jumper."],
      blanks: [{ id: "8b-blank-1", placeholder: "................", options: ["consist of"] }],
      correctSentences: ["Their school uniform consists of black trousers and a dark green jumper."],
    },
    {
      id: "9a",
      label: "9a",
      parts: ["Simon's new song ", " quite good, but he doesn't think he's ready yet to perform it in public."],
      blanks: [{ id: "9a-blank-1", placeholder: "................", options: ["sound"] }],
      correctSentences: [
        "Simon's new song sounds quite good, but he doesn't think he's ready yet to perform it in public.",
      ],
    },
    {
      id: "9b",
      label: "9b",
      parts: ["A: What's that noise? B: It ", " like a bird stuck in the chimney."],
      blanks: [{ id: "9b-blank-1", placeholder: "................", options: ["sound"] }],
      correctSentences: ["A: What's that noise? B: It sounds like a bird stuck in the chimney."],
    },
    {
      id: "10a",
      label: "10a",
      parts: ["Poulson ", " treatment for a knee injury, but should be fit to play on Saturday."],
      blanks: [{ id: "10a-blank-1", placeholder: "................", options: ["have"] }],
      correctSentences: ["Poulson is having treatment for a knee injury, but should be fit to play on Saturday."],
    },
    {
      id: "10b",
      label: "10b",
      parts: ["My sister ", " long blonde hair. You're bound to recognise her."],
      blanks: [{ id: "10b-blank-1", placeholder: "................", options: ["have"] }],
      correctSentences: ["My sister has long blonde hair. You're bound to recognise her."],
    },
  ],
};

export function getPracticeMockData(unitOrder: number): PracticeMockData {
  if (unitOrder === 1) {
    return unit1Exercise11;
  }

  return unit1Exercise11;
}
