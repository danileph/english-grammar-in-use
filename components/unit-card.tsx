"use client";

import { BookOpen, Pencil, Timer } from "lucide-react";
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
        </div>
        <CardDescription className="flex items-center gap-1 justify-between">
          <div className="flex items-center gap-1">
            <Timer className="h-4 w-4" />
            {unit.estimatedMinutes} min
          </div>
          <Badge variant={status.badgeVariant}>{status.label}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">Accuracy</p>
        <Progress value={progress.accuracy ?? 0} />
        <p className="text-sm text-muted-foreground">%</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
            size="sm"
            className="w-full"
            onClick={() => updateProgress(unit.id, { status: "IN_PROGRESS" })}
        >
          <BookOpen className="h-4 w-4" />
          Learn
        </Button>
        <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => updateProgress(unit.id, { status: "COMPLETED" })}
        >
          <Pencil className="h-4 w-4" />
          Practice
        </Button>
      </CardFooter>
    </Card>
  );
}
