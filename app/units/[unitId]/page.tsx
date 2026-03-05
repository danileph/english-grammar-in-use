import { notFound, redirect } from "next/navigation";

import { UnitProgressPanel } from "@/components/unit-progress-panel";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function UnitDetailPage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const [unit, progress] = await Promise.all([
    db.unit.findUnique({
      where: { id: unitId },
      select: {
        id: true,
        title: true,
        topic: true,
        order: true,
        estimatedMinutes: true,
      },
    }),
    db.progress.findUnique({
      where: {
        userId_unitId: {
          userId: session.user.id,
          unitId,
        },
      },
      select: {
        status: true,
        accuracy: true,
      },
    }),
  ]);

  if (!unit) {
    notFound();
  }

  return (
    <div className="space-y-5">
      <header className="border-b pb-4">
        <p className="text-sm font-medium text-muted-foreground">{unit.topic}</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Unit {unit.order}: {unit.title}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Estimated study time: {unit.estimatedMinutes} minutes.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.35fr,1fr]">
        <Card className="space-y-4 rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Unit Overview</h2>
          <p className="text-muted-foreground">
            This unit page is ready for full lesson content and interactive exercises.
            You can plug in grammar explanations, examples, and question blocks here.
          </p>
          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="font-medium">Suggested lesson structure</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Quick concept intro</li>
              <li>Rule breakdown with examples</li>
              <li>Practice tasks with instant feedback</li>
              <li>Review and bookmarks</li>
            </ul>
          </div>
        </Card>

        <UnitProgressPanel
          unitId={unit.id}
          initialStatus={progress?.status ?? "NOT_STARTED"}
          initialAccuracy={progress?.accuracy ?? null}
        />
      </div>
    </div>
  );
}
