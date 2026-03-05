import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateProgressSchema } from "@/lib/validators/progress";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await db.progress.findMany({
    where: { userId: session.user.id },
    select: {
      unitId: true,
      status: true,
      accuracy: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ progress });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = updateProgressSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { unitId, status, accuracy } = parsed.data;

  const progress = await db.progress.upsert({
    where: {
      userId_unitId: {
        userId: session.user.id,
        unitId,
      },
    },
    update: {
      status,
      accuracy: accuracy ?? null,
    },
    create: {
      userId: session.user.id,
      unitId,
      status,
      accuracy: accuracy ?? null,
    },
    select: {
      unitId: true,
      status: true,
      accuracy: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ progress });
}
