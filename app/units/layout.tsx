import { redirect } from "next/navigation";

import { UnitsSidebar } from "@/components/units-sidebar";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function UnitsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      },
    }),
    db.progress.findMany({
      where: { userId: session.user.id },
      select: {
        unitId: true,
        status: true,
      },
    }),
  ]);

  const progressMap = new Map(progress.map((item) => [item.unitId, item.status]));
  const grouped = units.reduce<Array<{ topic: string; units: typeof units }>>((acc, unit) => {
    const existing = acc.find((group) => group.topic === unit.topic);

    if (existing) {
      existing.units.push(unit);
    } else {
      acc.push({ topic: unit.topic, units: [unit] });
    }

    return acc;
  }, []);

  const groups = grouped.map((group) => ({
    topic: group.topic,
    units: group.units.map((unit) => ({
      id: unit.id,
      order: unit.order,
      title: unit.title,
      topic: unit.topic,
      status: progressMap.get(unit.id) ?? "NOT_STARTED",
    })),
  }));

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-5">
      <div className="overflow-hidden rounded-[28px] border bg-white/70 shadow-sm">
        <div className="min-h-[calc(100vh-8.5rem)] flex flex-col lg:flex-row">
          <div className="lg:w-[260px] lg:shrink-0 lg:border-r">
            <UnitsSidebar groups={groups} />
          </div>
          <section className="min-h-[calc(100vh-8.5rem)] flex-1 border-t bg-white/55 p-4 sm:p-6 lg:border-t-0">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
