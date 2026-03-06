import type { PracticeExerciseItem } from "@/lib/mock-practice";

import { ExerciseItem } from "@/components/practice/exercise-item";
import { WordBank } from "@/components/practice/word-bank";
import { Card } from "@/components/ui/card";

type ExerciseCardProps = {
  instruction: string;
  wordBankLabel: string;
  words: string[];
  items: PracticeExerciseItem[];
};

export function ExerciseCard({ instruction, wordBankLabel, words, items }: ExerciseCardProps) {
  return (
    <Card className="rounded-2xl border bg-white/80 p-6 shadow-sm">
      <p className="text-lg leading-relaxed text-foreground/90">{instruction}</p>

      <div className="mt-5">
        <WordBank label={wordBankLabel} words={words} />
      </div>

      <div className="mt-5 max-h-[48vh] space-y-4 overflow-y-auto pr-1">
        {items.map((item) => (
          <ExerciseItem key={item.id} item={item} />
        ))}
      </div>
    </Card>
  );
}
