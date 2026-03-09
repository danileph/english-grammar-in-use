import { notFound, redirect } from "next/navigation";

import { PracticePageLayout } from "@/components/practice/practice-page-layout";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPracticeMockData } from "@/lib/mock-practice";

export default async function UnitPracticePage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const isNumericUnitId = /^\d+$/.test(unitId);
  const unitOrder = isNumericUnitId ? Number.parseInt(unitId, 10) : Number.NaN;

  if (Number.isNaN(unitOrder) || unitOrder < 1) {
    notFound();
  }

  const unit = await db.unit.findUnique({
    where: { order: unitOrder },
    select: {
      id: true,
      topic: true,
      title: true,
      order: true,
      estimatedMinutes: true,
    },
  });

  if (!unit) {
    notFound();
  }

  const mockData = getPracticeMockData(unitOrder);

  return (
    <PracticePageLayout
      data={mockData}
      topic={unit.topic}
      title={unit.title}
      estimatedMinutes={unit.estimatedMinutes}
      primaryActionHref={`/units/${unit.order}`}
      primaryActionLabel="Go back"
      primaryActionIcon="back"
    />
  );
}
