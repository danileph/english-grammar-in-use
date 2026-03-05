import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const units = [
    {
      order: 1,
      title: "Present continuous vs present simple",
      topic: "Tenses",
      estimatedMinutes: 18,
    },
    {
      order: 2,
      title: "Using present continuous",
      topic: "Tenses",
      estimatedMinutes: 15,
    },
    {
      order: 3,
      title: "Present simple for habits",
      topic: "Tenses",
      estimatedMinutes: 14,
    },
    {
      order: 4,
      title: "Past simple vs past continuous",
      topic: "Tenses",
      estimatedMinutes: 19,
    },
    {
      order: 5,
      title: "Modals of obligation",
      topic: "Modals",
      estimatedMinutes: 16,
    },
    {
      order: 6,
      title: "Modals of deduction",
      topic: "Modals",
      estimatedMinutes: 17,
    },
    {
      order: 7,
      title: "Zero conditional",
      topic: "Conditionals",
      estimatedMinutes: 12,
    },
    {
      order: 8,
      title: "First conditional",
      topic: "Conditionals",
      estimatedMinutes: 13,
    },
  ];

  for (const unit of units) {
    await prisma.unit.upsert({
      where: { order: unit.order },
      update: unit,
      create: unit,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
