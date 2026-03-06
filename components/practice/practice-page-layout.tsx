import type { PracticeMockData } from "@/lib/mock-practice";

import { ExerciseCard } from "@/components/practice/exercise-card";
import { ExerciseProgressSidebar } from "@/components/practice/exercise-progress-sidebar";
import { PracticeBottomBar } from "@/components/practice/practice-bottom-bar";
import { PracticeHeader } from "@/components/practice/practice-header";

type PracticePageLayoutProps = {
  data: PracticeMockData;
  topic: string;
  title: string;
  estimatedMinutes: number;
  practiceHref: string;
};

export function PracticePageLayout({
  data,
  topic,
  title,
  estimatedMinutes,
  practiceHref,
}: PracticePageLayoutProps) {
  return (
    <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-6">
        <PracticeHeader
          topic={topic}
          title={title}
          estimatedMinutes={estimatedMinutes}
          practiceHref={practiceHref}
        />

        <ExerciseCard
          instruction={data.instruction}
          wordBankLabel={data.wordBankLabel}
          words={data.wordBank}
          items={data.exerciseItems}
        />

        <PracticeBottomBar current={data.currentExerciseNumber} total={data.totalExercises} />
      </div>

      <div className="md:border-l md:-my-6 md:-mr-6 md:py-2 md:pl-2">
        <div className="md:sticky md:top-24">
          <ExerciseProgressSidebar
            completed={data.completedExercises}
            total={data.totalExercises}
            steps={data.steps}
          />
        </div>
      </div>
    </div>
  );
}
