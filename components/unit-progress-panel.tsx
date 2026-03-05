"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type UnitProgressPanelProps = {
  unitId: string;
  initialStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  initialAccuracy: number | null;
};

const statusLabel = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
} as const;

export function UnitProgressPanel({
  unitId,
  initialStatus,
  initialAccuracy,
}: UnitProgressPanelProps) {
  const [status, setStatus] = useState(initialStatus);
  const [accuracy, setAccuracy] = useState<number | null>(initialAccuracy);
  const [isLoading, setIsLoading] = useState(false);

  async function saveProgress(nextStatus: "IN_PROGRESS" | "COMPLETED") {
    setIsLoading(true);

    const nextAccuracy = nextStatus === "COMPLETED" ? accuracy ?? 90 : accuracy;
    const response = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        unitId,
        status: nextStatus,
        accuracy: nextAccuracy,
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      return;
    }

    setStatus(nextStatus);
    setAccuracy(nextAccuracy);
  }

  return (
    <div className="space-y-4 rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Progress</h3>
        <Badge variant={status === "COMPLETED" ? "default" : status === "IN_PROGRESS" ? "secondary" : "outline"}>
          {statusLabel[status]}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        {accuracy === null ? "No accuracy recorded yet." : `Last recorded accuracy: ${accuracy}%`}
      </p>
      <div className="flex gap-2">
        <Button
          disabled={isLoading}
          variant="outline"
          onClick={() => saveProgress("IN_PROGRESS")}
        >
          {isLoading ? "Saving..." : "Mark in progress"}
        </Button>
        <Button disabled={isLoading} onClick={() => saveProgress("COMPLETED")}>
          Mark completed
        </Button>
      </div>
    </div>
  );
}
