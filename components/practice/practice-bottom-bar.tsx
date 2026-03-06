import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type PracticeBottomBarProps = {
  current: number;
  total: number;
};

export function PracticeBottomBar({ current, total }: PracticeBottomBarProps) {
  const progressValue = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="sticky bottom-0 mt-6 rounded-2xl border bg-white/90 p-4 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" className="rounded-xl px-6">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex min-w-64 flex-1 items-center justify-center gap-3 px-2 sm:max-w-md">
          <Progress value={progressValue} className="h-2.5 bg-secondary/70" />
          <p className="w-16 text-center text-lg font-medium">
            {current}/{total}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="rounded-xl px-7">Check answers</Button>
          <Button variant="ghost" className="text-muted-foreground">
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
}
