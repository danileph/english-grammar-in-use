-- AlterTable
ALTER TABLE "ExerciseAttempt" ADD COLUMN "correctItems" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ExerciseAttempt" ADD COLUMN "totalItems" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "ExerciseAttempt" ADD COLUMN "accuracy" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ExerciseAttempt" ADD COLUMN "answersByItemId" TEXT;
