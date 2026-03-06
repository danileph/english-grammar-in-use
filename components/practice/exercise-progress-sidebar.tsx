import { CheckCircle2, Circle } from "lucide-react";

import type { PracticeExerciseStep } from "@/lib/mock-practice";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ExerciseProgressSidebarProps = {
  completed: number;
  total: number;
  steps: PracticeExerciseStep[];
};

export function ExerciseProgressSidebar({ completed, total, steps }: ExerciseProgressSidebarProps) {
  const progressValue = total > 0 ? (completed / total) * 100 : 0;

  return (
    <aside className="rounded-2xl border bg-white/65 md:sticky md:top-24">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold tracking-tight">Exercises</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {completed}/{total} completed
        </p>
        <Progress value={progressValue} className="mt-4 h-2.5" />
      </div>

      <ol className="space-y-1 p-3">
        {steps.map((step) => {
          const isCurrent = step.status === "current";
          const isCompleted = step.status === "completed";

          return (
            <li
              key={step.id}
              className={cn(
                "flex items-start gap-3 rounded-xl px-3 py-3 text-base",
                isCurrent ? "bg-secondary/70 ring-1 ring-primary/30" : "hover:bg-muted/50",
              )}
            >
              <span className="mt-1 text-primary">
                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </span>
              <span className={cn("leading-snug text-foreground/90", isCurrent && "font-semibold")}>{step.label}</span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
