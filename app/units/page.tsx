import { redirect } from "next/navigation";

import { UnitsPageClient } from "@/components/units-page-client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import type { ProgressUnitRecord } from "@/types";

export default async function UnitsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const [units, progress] = await Promise.all([
    db.unit.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        topic: true,
        order: true,
        estimatedMinutes: true,
      },
    }),
    db.progress.findMany({
      where: { userId: session.user.id },
      select: {
        unitId: true,
        status: true,
        accuracy: true,
      },
    }),
  ]);

  const grouped = units.reduce<Array<{ topic: string; units: typeof units }>>((acc, unit) => {
    const existing = acc.find((group) => group.topic === unit.topic);

    if (existing) {
      existing.units.push(unit);
    } else {
      acc.push({ topic: unit.topic, units: [unit] });
    }

    return acc;
  }, []);

  const initialProgressByUnitId = Object.fromEntries(
    progress.map((item) => [item.unitId, { status: item.status, accuracy: item.accuracy }]),
  ) as ProgressUnitRecord;

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Grammar units</h1>
        <p className="text-muted-foreground">Study by topic and track progress as you complete each unit.</p>
      </div>
      <UnitsPageClient
        unitsByTopic={grouped.map((group) => ({ topic: group.topic, units: group.units }))}
        initialProgressByUnitId={initialProgressByUnitId}
      />
    </main>
  );
}
