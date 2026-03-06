import Image from "next/image";
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
  const isNumericUnitId = /^\d+$/.test(unitId);
  const unitOrder = isNumericUnitId ? Number.parseInt(unitId, 10) : Number.NaN;
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  if (Number.isNaN(unitOrder) || unitOrder < 1) {
    notFound();
  }

  const unit = await db.unit.findUnique({
    where: { order: unitOrder },
    select: {
      id: true,
      title: true,
      topic: true,
      order: true,
      estimatedMinutes: true,
    },
  });

  if (!unit) {
    notFound();
  }

  const progress = await db.progress.findUnique({
    where: {
      userId_unitId: {
        userId: session.user.id,
        unitId: unit.id,
      },
    },
    select: {
      status: true,
      accuracy: true,
    },
  });

  const sections: Array<{ id: string; label: string; title: string; body: string }> = [];
  const hasUnitContent = sections.length > 0;

  const sidebarProgressStatus = progress?.status ?? "NOT_STARTED";
  const sidebarProgressPercentage =
    sidebarProgressStatus === "COMPLETED"
      ? 100
      : sidebarProgressStatus === "IN_PROGRESS"
        ? progress?.accuracy ?? 35
        : 0;

  return (
    <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_232px] relative">
      <div className="space-y-5">
        <header className="border-b pb-4">
          <p className="text-sm font-medium text-muted-foreground">{unit.topic}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{unit.title}</h1>
          <p className="mt-2 text-muted-foreground">Estimated study time: {unit.estimatedMinutes} minutes.</p>
        </header>


        {hasUnitContent ? (
          sections.map((section) => (
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
          ))
        ) : (
          <>
            <div className="flex h-[calc(100vh-340px)] items-center justify-center">
              <div className="mx-auto max-w-[280px] xl:max-w-md text-center">
                <Image
                  src="/unit-coming-soon.svg"
                  alt="Unit coming soon"
                  width={520}
                  height={355}
                  className="mx-auto h-auto w-full"
                  priority
                />
                <h2 className="mt-6 text-2xl font-semibold tracking-tight">Unit comming soon</h2>
                <p className="mt-2 text-muted-foreground">Content for this unit is being prepared.</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="md:justify-self-end md:border-l h-(100%+24px) py-2 -my-6 md:-mr-6">
        <div className="md:sticky md:top-24 md:h-[calc(100vh-135px)] md:w-[240px] md:overflow-y-auto">
        <UnitSectionsSidebar
          unitOrder={unit.order}
          progressStatus={sidebarProgressStatus}
          progressPercentage={sidebarProgressPercentage}
          sections={sections.map((section) => ({
            id: section.id,
            label: section.label,
            title: section.title,
          }))}
        />
      </div>
      </div>
    </div>
  );
}
