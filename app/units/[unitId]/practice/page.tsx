import { notFound, redirect } from "next/navigation";

import { PracticePageLayout } from "@/components/practice/practice-page-layout";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPracticeMockData } from "@/lib/mock-practice";

function parseAnswersByItemId(value: string | null): Record<string, string> {
  if (!value) {
    return {};
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] => typeof entry[0] === "string" && typeof entry[1] === "string",
      ),
    );
  } catch {
    return {};
  }
}

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
  const attempts = await db.exerciseAttempt.findMany({
    where: {
      userId: session.user.id,
      unitId: unit.id,
    },
    select: {
      exerciseId: true,
      correct: true,
      answersByItemId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const latestAttemptByExerciseId = new Map<string, (typeof attempts)[number]>();
  for (const attempt of attempts) {
    if (!latestAttemptByExerciseId.has(attempt.exerciseId)) {
      latestAttemptByExerciseId.set(attempt.exerciseId, attempt);
    }
  }

  const initialCompletedExerciseIds = [...latestAttemptByExerciseId.values()]
    .filter((attempt) => attempt.correct)
    .map((attempt) => attempt.exerciseId);
  const initialAttemptsByExerciseId = Object.fromEntries(
    [...latestAttemptByExerciseId.entries()].map(([exerciseId, attempt]) => [
      exerciseId,
      {
        answersByItemId: parseAnswersByItemId(attempt.answersByItemId),
        isChecked: true,
      },
    ]),
  );

  return (
    <PracticePageLayout
      unitId={unit.id}
      data={mockData}
      topic={unit.topic}
      title={unit.title}
      estimatedMinutes={unit.estimatedMinutes}
      primaryActionHref={`/units/${unit.order}`}
      primaryActionLabel="Go back"
      primaryActionIcon="back"
      initialCompletedExerciseIds={initialCompletedExerciseIds}
      initialAttemptsByExerciseId={initialAttemptsByExerciseId}
    />
  );
}
