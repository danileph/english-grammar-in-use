import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";

const registerSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  name: z.string().trim().min(1).max(80).optional(),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid registration data." }, { status: 400 });
  }

  const { email, password, name } = parsed.data;

  const existingUser = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
  }

  const passwordHash = await hash(password, 12);

  const createdUser = await db.user.create({
    data: {
      email,
      name: name || email.split("@")[0],
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return NextResponse.json({ user: createdUser }, { status: 201 });
}
