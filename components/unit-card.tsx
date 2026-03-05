"use client";

import { CheckCircle2, Circle, Timer } from "lucide-react";
import type { ProgressStatus, UnitItem } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/store/useAppStore";

type UnitCardProps = {
  unit: UnitItem;
  progress: {
    status: ProgressStatus;
    accuracy: number | null;
  };
};

const statusMeta: Record<
  ProgressStatus,
  { label: string; badgeVariant: "secondary" | "default" | "outline"; progressValue: number }
> = {
  NOT_STARTED: { label: "Not started", badgeVariant: "outline", progressValue: 0 },
  IN_PROGRESS: { label: "In progress", badgeVariant: "secondary", progressValue: 50 },
  COMPLETED: { label: "Completed", badgeVariant: "default", progressValue: 100 },
};

export function UnitCard({ unit, progress }: UnitCardProps) {
  const updateProgress = useAppStore((state) => state.updateProgress);
  const status = statusMeta[progress.status];

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">
            {unit.order}. {unit.title}
          </CardTitle>
          <Badge variant={status.badgeVariant}>{status.label}</Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Timer className="h-4 w-4" />
          {unit.estimatedMinutes} min
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={status.progressValue} />
        {progress.accuracy !== null && (
          <p className="text-sm text-muted-foreground">Last accuracy: {progress.accuracy}%</p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateProgress(unit.id, { status: "IN_PROGRESS" })}
        >
          <Circle className="h-4 w-4" />
          Practice
        </Button>
        <Button size="sm" onClick={() => updateProgress(unit.id, { status: "COMPLETED" })}>
          <CheckCircle2 className="h-4 w-4" />
          Mark complete
        </Button>
      </CardFooter>
    </Card>
  );
}
