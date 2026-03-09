import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { saveExerciseAttemptSchema } from "@/lib/validators/exercise-attempt";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = saveExerciseAttemptSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { unitId, exerciseId, correctItems, totalItems, answersByItemId } = parsed.data;
  const accuracy = Math.round((correctItems / totalItems) * 100);
  const isCompleted = accuracy >= 80;

  await db.exerciseAttempt.create({
    data: {
      userId: session.user.id,
      unitId,
      exerciseId,
      correct: isCompleted,
      correctItems,
      totalItems,
      accuracy,
      answersByItemId: JSON.stringify(answersByItemId),
    },
  });

  await db.progress.upsert({
    where: {
      userId_unitId: {
        userId: session.user.id,
        unitId,
      },
    },
    update: {
      status: isCompleted ? "COMPLETED" : "IN_PROGRESS",
      accuracy,
    },
    create: {
      userId: session.user.id,
      unitId,
      status: isCompleted ? "COMPLETED" : "IN_PROGRESS",
      accuracy,
    },
  });

  return NextResponse.json({ accuracy, isCompleted });
}
