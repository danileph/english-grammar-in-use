import { z } from "zod";

export const saveExerciseAttemptSchema = z.object({
  unitId: z.string().min(1),
  exerciseId: z.string().min(1),
  correctItems: z.number().int().min(0),
  totalItems: z.number().int().min(1),
  answersByItemId: z.record(z.string(), z.string()),
});

export type SaveExerciseAttemptInput = z.infer<typeof saveExerciseAttemptSchema>;
