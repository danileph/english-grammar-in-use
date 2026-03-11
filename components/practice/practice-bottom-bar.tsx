import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type PracticeBottomBarProps = {
  current: number;
  total: number;
  progressCompleted?: number;
  progressTotal?: number;
  canCheckAnswers?: boolean;
  onCheckAnswers?: () => void;
};

export function PracticeBottomBar({
  current,
  total,
  progressCompleted = 0,
  progressTotal = 0,
  canCheckAnswers = false,
  onCheckAnswers,
}: PracticeBottomBarProps) {
  const progressValue = progressTotal > 0 ? (progressCompleted / progressTotal) * 100 : 0;

  return (
    <div className="sticky bottom-0 mt-6 rounded-2xl border bg-white/90 p-3 backdrop-blur sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="outline" className="shrink-0 rounded-xl px-3 sm:px-6">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex min-w-0 flex-1 items-center gap-2 px-1 sm:gap-3 sm:px-2">
          <Progress value={progressValue} className="h-2.5 bg-secondary/70" />
          <p className="w-12 text-center text-sm font-medium sm:w-16 sm:text-lg">
            {progressCompleted}/{progressTotal}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button className="rounded-xl px-3 sm:px-7" onClick={onCheckAnswers} disabled={!canCheckAnswers}>
            <span className="sm:hidden">Check</span>
            <span className="hidden sm:inline">Check answers</span>
          </Button>
          {current < total ? (
            <Button variant="ghost" className="px-2 text-muted-foreground sm:px-3">
              Next
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
