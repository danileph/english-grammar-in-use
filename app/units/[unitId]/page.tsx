import { notFound, redirect } from "next/navigation";

import { UnitSectionsSidebar } from "@/components/unit-sections-sidebar";
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

  const sections = [
    {
      id: "section-a",
      label: "A",
      title: "Quick concept intro",
      body: "Start with the core idea in one short explanation, then highlight when this form is used in everyday English.",
    },
    {
      id: "section-b",
      label: "B",
      title: "Rule breakdown",
      body: "Show the grammar pattern with simple sentence structure notes and a few contrast examples for common mistakes.",
    },
    {
      id: "section-c",
      label: "C",
      title: "Practice tasks",
      body: "Add short drills and mini transformations so learners can apply the rule immediately and check understanding quickly.",
    },
    {
      id: "section-d",
      label: "D",
      title: "Review and recap",
      body: "Close with a compact summary and key reminders that learners can scan before moving to the next unit.",
    },
  ] as const;

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr),240px]">
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

        <UnitProgressPanel
          unitId={unit.id}
          initialStatus={progress?.status ?? "NOT_STARTED"}
          initialAccuracy={progress?.accuracy ?? null}
        />

        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <Card className="space-y-4 rounded-2xl border p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/50 text-sm font-semibold">
                  {section.label}
                </span>
                <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              </div>
              <p className="text-muted-foreground">{section.body}</p>
            </Card>
          </section>
        ))}
      </div>

      <UnitSectionsSidebar
        sections={sections.map((section) => ({
          id: section.id,
          label: section.label,
          title: section.title,
        }))}
      />
    </div>
  );
}
