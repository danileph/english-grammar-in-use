"use client";

import { useEffect } from "react";
import type { ProgressStatus, UnitItem } from "@/types";

import { UnitCard } from "@/components/unit-card";
import { useAppStore } from "@/store/useAppStore";

type UnitsPageClientProps = {
  unitsByTopic: Array<{
    topic: string;
    units: UnitItem[];
  }>;
  initialProgressByUnitId: Record<string, { status: ProgressStatus; accuracy: number | null }>;
};

export function UnitsPageClient({
  unitsByTopic,
  initialProgressByUnitId,
}: UnitsPageClientProps) {
  const progressByUnitId = useAppStore((state) => state.progressByUnitId);
  const hydrateProgress = useAppStore((state) => state.hydrateProgress);

  useEffect(() => {
    hydrateProgress(initialProgressByUnitId);
  }, [hydrateProgress, initialProgressByUnitId]);

  return (
    <div className="space-y-8">
      {unitsByTopic.map((topicGroup) => (
        <section key={topicGroup.topic} className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">{topicGroup.topic}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topicGroup.units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                progress={progressByUnitId[unit.id] ?? { status: "NOT_STARTED", accuracy: null }}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
